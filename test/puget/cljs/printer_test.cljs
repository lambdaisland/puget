(ns puget.cljs.printer-test
  (:require [cljs.test :refer [are deftest is testing]]
            [puget.printer :as printer]))

(defn- build-namespace-with-type
  "Private function to build a namespace with type"
  [input-type]
  (str (apply str (drop-last 2 (str `_))) "/" input-type))

(defrecord TestRecord
  [foo bar])

(deftest get-type-names
  (are [input expected] (= expected (printer/get-type-name input))
    "LambdaIsland"                   "String"
    (atom 1)                         "cljs.core/Atom"
    (fn [x] x)                       "Function"
    '(1 2 3)                         "cljs.core/List"
    [1 2 3]                          "cljs.core/PersistentVector"
    #{1 2 3}                         "cljs.core/PersistentHashSet"
    true                             "Boolean"
    1234N                            "Number"
    :k                               "cljs.core/Keyword"
    'A                               "cljs.core/Symbol"
    {:a 1 :b 2}                      "cljs.core/PersistentArrayMap"
    (js/Date.)                       "Date"
    (lazy-seq [:x])                  "cljs.core/LazySeq"
    (TestRecord. "Lambda"  "Island") (build-namespace-with-type "TestRecord")
    (js/Object.)                     "Object"))

(deftest get-identity-hashcode
  (are [input expected] (= expected (printer/get-identity-hashcode input))
    nil 0
    "LambdaIsland" 228802569))

(deftest canonical-primitives
  (let [local-printer (printer/canonical-printer)]
    (are [v text] (= text (printer/render-str local-printer v))
      nil     "nil"
      true    "true"
      false   "false"
      0       "0"
      1234N   "1234"
      2.718   "2.718"
      3.14M   "3.14"
      \a      "\"a\""
      \space  "\" \""
      "foo"   "\"foo\""
      :key    ":key"
      :ns/key ":ns/key"
      'sym    "sym"
      'ns/sym "ns/sym")))

(deftest canonical-collections
  (let [local-printer (printer/canonical-printer)]
    (are [v text] (= text (printer/render-str local-printer v))
      '()                    "()"
      '(foo :bar)            "(foo :bar)"
      '(1 2 3)               "(1 2 3)"
      []                     "[]"
      [4 "five" 6.0]         "[4 \"five\" 6]"
      {}                     "{}"
      {:foo 8, :bar 'baz}    "{:bar baz :foo 8}"
      #{}                    "#{}"
      #{:omega :alpha :beta} "#{:alpha :beta :omega}"
      (lazy-seq [:x])        "(:x)"
      (map inc [0 1 2])      "(1 2 3)")))

(deftest canonical-metadata
  (let [local-printer (printer/canonical-printer)
        value ^:foo [:bar]]
    (binding [*print-meta* true]
      (is (= "[:bar]" (printer/render-str local-printer value))
            "should not render metadata"))))

(deftest canonical-extensions
  (testing "tagged-handler construction"
    (is (thrown? ExceptionInfo (printer/tagged-handler "foo" str)))
    (is (thrown? ExceptionInfo (printer/tagged-handler 'foo "abcd")))
    (is (ifn? (printer/tagged-handler 'foo str)))))

(deftest pretty-primitives
  (are [v text] (= text (printer/pprint-str v))
    nil     "nil"
    true    "true"
    false   "false"
    0       "0"
    1234N   "1234"
    2.718   "2.718"
    3.14M   "3.14"
    \a      "\"a\""
    \space  "\" \""
    "foo"   "\"foo\""
    :key    ":key"
    :ns/key ":ns/key"
    'sym    "sym"
    'ns/sym "ns/sym"))

(deftest pretty-collections
  (are [v text] (= text (printer/pprint-str v))
    '()                    "()"
    '(foo :bar)            "(foo :bar)"
    '(1 2 3)               "(1 2 3)"
    []                     "[]"
    [4 "five" 6.0]         "[4 \"five\" 6]"
    {}                     "{}"
    {:foo 8 :bar 'baz}     "{:bar baz, :foo 8}"     ; gets sorted
    #{}                    "#{}"
    #{:omega :alpha :beta} "#{:alpha :beta :omega}" ; also sorted
    (lazy-seq [:x])        "(:x)"))

(deftest pretty-clojure-types
  (testing "records"
    (let [r (->TestRecord \x \y)]
      (is (= "#puget.cljs.printer-test/TestRecord\n{:bar \"y\", :foo \"x\"}"
             (printer/pprint-str r {:width 30}))
          "long record prints with form on new line")
      (is (= "#puget.cljs.printer-test/TestRecord {:bar \"y\", :foo \"x\"}"
             (printer/pprint-str r {:width 200})))))
  (testing "functions"
    (is (re-seq #"#<Fn@[0-9a-z]+ Function>"
                (printer/pprint-str printer/pretty-printer)))
    (is (re-seq #"#<Fn@[0-9a-z]+ Function>"
                (printer/pprint-str (printer/tagged-handler 'foo str)))))
  (testing "atom"
    (let [v (atom :foo)]
      (is (re-seq #"#<Atom@[0-9a-f]+ :foo>" (printer/pprint-str v)))))
  (testing "delay"
    (let [v (delay (+ 8 14))]
      (is (re-seq #"#<cljs.core/Delay@[0-9a-f]+ pending>" (printer/pprint-str v)))
      (is (= 22 @v))
      (is (re-seq #"#<cljs.core/Delay@[0-9a-f]+ 22>" (printer/pprint-str v))))))

(deftest pretty-metadata
  (testing "print-meta logic"
    (let [value ^:foo [:bar]]
      (binding [*print-meta* true]
        (is (= "^{:foo true}\n[:bar]" (printer/pprint-str value)))
        (is (= "[:bar]" (printer/pprint-str value {:print-meta false}))))
      (binding [*print-meta* false]
        (is (= "^{:foo true}\n[:bar]" (printer/pprint-str value {:print-meta true})))))))

(deftest pretty-collection-options
  (testing "collection key sorting"
    (let [set1 (set [:zeta :book])
          map1 (array-map :b 0 :a 1)
          map2 (array-map :z 2 :a 5 :m 8)]
      (testing "never sort"
        (printer/with-options {:sort-keys false}
          (is (= "#{:zeta :book}" (printer/pprint-str set1)))
          (is (= "{:b 0, :a 1}" (printer/pprint-str map1)))))
      (testing "sort at counted threshold"
        (printer/with-options {:sort-keys 2}
          (is (= "{:a 1, :b 0}" (printer/pprint-str map1))
              "collection smaller than threshold should be sorted")
          (is (= "{:z 2, :a 5, :m 8}" (printer/pprint-str map2))
              "collection larger than threshold should not be sorted")))
      (testing "always sort"
        (printer/with-options {:sort-keys true}
          (is (= "{:a 1, :b 0}" (printer/pprint-str map1)))
          (is (= "{:a 5, :m 8, :z 2}" (printer/pprint-str map2)))))
      (testing "sorted colls"
        (printer/with-options {:sort-keys true}
          (is (= "#{3 2 1}" (printer/pprint-str (sorted-set-by > 1 2 3)))
              "sorted collection should not be reordered")))))
  (testing "map delimiter"
    (is (= "{:a 0, :b 1}" (printer/pprint-str {:a 0, :b 1}))
        "default separator is a comma")
    (printer/with-options {:map-delimiter " <==>"}
      (is (= "{:a 0 <==> :b 1}" (printer/pprint-str {:a 0, :b 1})))))
  (testing "namespace maps"
    (printer/with-options {:namespace-maps true}
      (is (= "{:b 3, :a/x 1, :a/y 2}" (printer/pprint-str {:a/x 1, :a/y 2, :b 3}))
          "any simple keys should prevent namespacing")
      (is (= "#:a {:x 1, :y 2}" (printer/pprint-str {:a/x 1, :a/y 2}))
          "map with all common qualified keys should be namespaced")
      (is (= "{:a/x 1, :b/x 2}" (printer/pprint-str {:a/x 1, :b/x 2}))
          "map with insufficiently common qualifiers should not be namespaced")
      (is (= "#:a {:x 1, :y 2, :b/x 3}" (printer/pprint-str {:a/x 1, :a/y 2, :b/x 3}))
          "common ns should be qualified even with other ns keys")
      (is (= "{\"a/x\" 1, :a/y 2}" (printer/pprint-str {"a/x" 1, :a/y 2}))
          "any non-ident keys should prevent namespacing")))
  (testing "lazy seq limits"
    (printer/with-options {:seq-limit 4}
      (is (= "(1 2 3)" (printer/pprint-str (map inc [0 1 2]))))
      (is (= "(0 1 2 3 ...)" (printer/pprint-str (range 100)))))))

(deftest pretty-color-options
  (let [value [nil 1.0 true "foo" :bar]
        bw-str (with-out-str (printer/pprint value))
        colored-str (with-out-str (printer/cprint value))
        thin-str (printer/cprint-str value {:width 5})]
    (is (> (count colored-str) (count bw-str)))
    (is (not= colored-str thin-str))
    (is (= "123" (printer/with-color (printer/color-text :frobble "123"))))
    (is (= "#{:baz}" (printer/pprint-str #{:baz})))
    (is (= (printer/cprint-str :foo)
           (printer/with-color (printer/color-text :keyword ":foo"))))))
