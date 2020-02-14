(ns puget.cljs.dispatch-test
  (:require [cljs.test :as t]
            [puget.dispatch :as dispatch]))


(def type-handlers-map
  {inst? (fn [x] (js/Date.))
   uuid? (fn [x] (uuid "Testing"))
   seq? (fn [x] x)})
   
(t/deftest predicate-lookup-test
  (let [local-dispatch (dispatch/predicate-lookup type-handlers-map)]
    (t/testing "nil result for not present predicates"
      (t/is (nil? (local-dispatch 1))))
    (t/testing "fn result for a present predicate"
      (t/is (fn? (local-dispatch '(1 2 3)))))
    (t/testing "inst type when we use an inst type as input"
      (t/is (inst? ((local-dispatch (js/Date.) js/Date.)))))
    (t/testing "uuid type when we use an uuid type as input"
      (t/is (uuid? ((local-dispatch (uuid "Testing")) (uuid "Testing")))))
    (t/testing "seq type when we use a seq type as input"
      (t/is (seq? ((local-dispatch '(1 2 3)) '(1 2 3)))))))
