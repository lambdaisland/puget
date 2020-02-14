(ns puget.cljs.printer-test
  (:require [cljs.test :as t]
            [puget.printer :as printer]))

(defrecord TestRecord
  [foo bar])

(t/deftest canonical-primitives
  (let [local-printer (printer/canonical-printer)]
    (t/are [v text] (= text (printer/render-str local-printer v))
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

(t/deftest canonical-collections
  (let [local-printer (printer/canonical-printer)]
    (t/are [v text] (= text (printer/render-str local-printer v))
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

(t/deftest canonical-metadata
  (let [local-printer (printer/canonical-printer)
        value ^:foo [:bar]]
    (binding [*print-meta* true]
      (t/is (= "[:bar]" (printer/render-str local-printer value))
            "should not render metadata"))))

(t/deftest canonical-extensions
  (t/testing "tagged-handler construction"
    (t/is (thrown? ExceptionInfo (printer/tagged-handler "foo" str)))
    (t/is (thrown? ExceptionInfo (printer/tagged-handler 'foo "abcd")))
    (t/is (ifn? (printer/tagged-handler 'foo str)))))

(t/deftest pretty-primitives
  (t/are [v text] (= text (printer/pprint-str v))
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

(t/deftest pretty-collections
  (t/are [v text] (= text (printer/pprint-str v))
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

(t/deftest pretty-clojure-types
  (t/testing "records"
    (let [r (->TestRecord \x \y)]
      (t/is (= "#puget.cljs.printer-test/TestRecord\n{:bar \"y\", :foo \"x\"}"
             (printer/pprint-str r {:width 30}))
          "long record prints with form on new line")
      (t/is (= "#puget.cljs.printer-test/TestRecord {:bar \"y\", :foo \"x\"}"
             (printer/pprint-str r {:width 200})))))
  (t/testing "functions"
    (t/is (re-seq #"#<Fn@[0-9a-z]+ Function>"
                (printer/pprint-str printer/pretty-printer)))
    (t/is (re-seq #"#<Fn@[0-9a-z]+ Function>"
                (printer/pprint-str (printer/tagged-handler 'foo str)))))
  (t/testing "atom"
    (let [v (atom :foo)]
      (t/is (re-seq #"#<Atom@[0-9a-f]+ :foo>" (printer/pprint-str v)))))
  (t/testing "delay"
    (let [v (delay (+ 8 14))]
      (t/is (re-seq #"#<cljs.core/Delay@[0-9a-f]+ pending>" (printer/pprint-str v)))
      (t/is (= 22 @v))
      (t/is (re-seq #"#<cljs.core/Delay@[0-9a-f]+ 22>" (printer/pprint-str v))))))

(t/deftest pretty-metadata
  (t/testing "print-meta logic"
    (let [value ^:foo [:bar]]
      (binding [*print-meta* true]
        (t/is (= "^{:foo true}\n[:bar]" (printer/pprint-str value)))
        (t/is (= "[:bar]" (printer/pprint-str value {:print-meta false}))))
      (binding [*print-meta* false]
        (t/is (= "^{:foo true}\n[:bar]" (printer/pprint-str value {:print-meta true})))))))

(t/deftest pretty-collection-options
  (t/testing "collection key sorting"
    (let [set1 (set [:zeta :book])
          map1 (array-map :b 0 :a 1)
          map2 (array-map :z 2 :a 5 :m 8)]
      (t/testing "never sort"
        (printer/with-options {:sort-keys false}
          (t/is (= "#{:zeta :book}" (printer/pprint-str set1)))
          (t/is (= "{:b 0, :a 1}" (printer/pprint-str map1)))))
      (t/testing "sort at counted threshold"
        (printer/with-options {:sort-keys 2}
          (t/is (= "{:a 1, :b 0}" (printer/pprint-str map1))
              "collection smaller than threshold should be sorted")
          (t/is (= "{:z 2, :a 5, :m 8}" (printer/pprint-str map2))
              "collection larger than threshold should not be sorted")))
      (t/testing "always sort"
        (printer/with-options {:sort-keys true}
          (t/is (= "{:a 1, :b 0}" (printer/pprint-str map1)))
          (t/is (= "{:a 5, :m 8, :z 2}" (printer/pprint-str map2)))))
      (t/testing "sorted colls"
        (printer/with-options {:sort-keys true}
          (t/is (= "#{3 2 1}" (printer/pprint-str (sorted-set-by > 1 2 3)))
              "sorted collection should not be reordered")))))
  (t/testing "map delimiter"
    (t/is (= "{:a 0, :b 1}" (printer/pprint-str {:a 0, :b 1}))
        "default separator is a comma")
    (printer/with-options {:map-delimiter " <==>"}
      (t/is (= "{:a 0 <==> :b 1}" (printer/pprint-str {:a 0, :b 1})))))  
  (t/testing "namespace maps"
    (printer/with-options {:namespace-maps true}
      (t/is (= "{:b 3, :a/x 1, :a/y 2}" (printer/pprint-str {:a/x 1, :a/y 2, :b 3}))
          "any simple keys should prevent namespacing")
      (t/is (= "#:a {:x 1, :y 2}" (printer/pprint-str {:a/x 1, :a/y 2}))
          "map with all common qualified keys should be namespaced")
      (t/is (= "{:a/x 1, :b/x 2}" (printer/pprint-str {:a/x 1, :b/x 2}))
          "map with insufficiently common qualifiers should not be namespaced")
      (t/is (= "#:a {:x 1, :y 2, :b/x 3}" (printer/pprint-str {:a/x 1, :a/y 2, :b/x 3}))
          "common ns should be qualified even with other ns keys")
      (t/is (= "{\"a/x\" 1, :a/y 2}" (printer/pprint-str {"a/x" 1, :a/y 2}))
          "any non-ident keys should prevent namespacing")))
  (t/testing "lazy seq limits"
    (printer/with-options {:seq-limit 4}
      (t/is (= "(1 2 3)" (printer/pprint-str (map inc [0 1 2]))))
      (t/is (= "(0 1 2 3 ...)" (printer/pprint-str (range 100)))))))

(t/deftest pretty-color-options
  (let [value [nil 1.0 true "foo" :bar]
        bw-str (with-out-str (printer/pprint value))
        colored-str (with-out-str (printer/cprint value))
        thin-str (printer/cprint-str value {:width 5})]
    (t/is (> (count colored-str) (count bw-str)))
    (t/is (not= colored-str thin-str))
    (t/is (= "123" (printer/with-color (printer/color-text :frobble "123"))))
    (t/is (= "#{:baz}" (printer/pprint-str #{:baz})))
    (t/is (= (printer/cprint-str :foo)
           (printer/with-color (printer/color-text :keyword ":foo"))))))
