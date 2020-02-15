(ns puget.cljs.dispatch-test
  (:require [cljs.test :refer [deftest is testing]]
            [puget.dispatch :as dispatch]))

(def type-handlers-map
  {inst? (fn [x] (js/Date.))
   uuid? (fn [x] (uuid "Testing"))
   seq? (fn [x] x)})

(deftest predicate-lookup-test
  (let [local-dispatch (dispatch/predicate-lookup type-handlers-map)]
    (testing "nil result for not present predicates"
      (is (nil? (local-dispatch 1))))
    (testing "fn result for a present predicate"
      (is (fn? (local-dispatch '(1 2 3)))))
    (testing "inst type when we use an inst type as input"
      (is (inst? ((local-dispatch (js/Date.) js/Date.)))))
    (testing "uuid type when we use an uuid type as input"
      (is (uuid? ((local-dispatch (uuid "Testing")) (uuid "Testing")))))
    (testing "seq type when we use a seq type as input"
      (is (seq? ((local-dispatch '(1 2 3)) '(1 2 3)))))))
