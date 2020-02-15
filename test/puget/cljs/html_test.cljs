(ns puget.cljs.html-test
  (:require [cljs.test :refer [deftest is testing]]
    [puget.color.html :as html]
    [puget.printer :as printer]))

(def test-color-scheme
  {:delimiter [:green]
   :tag       [:bold :white]
   :nil       [:black]
   :boolean   [:cyan]
   :number    [:red]
   :string    [:magenta :underline]
   :character [:darkorange]
   :keyword   [:cyan]
   :symbol    nil
   :function-symbol [:bold :blue]
   :class-delimiter [:blue]
   :class-name      [:bold :blue]})

(def inline-color
  {:print-color true
   :color-markup :html-inline})

(def classes-color
  {:print-color true
   :color-markup :html-classes})

(deftest style-test
  (is (= "style=\"font-weight:bold;text-decoration:underline;color:red\""
         (html/style [:bold :underline :red]))))

(deftest html-test
  (testing "color-text"
    (testing "no color markup"
      (is (= ":inline>"
             (printer/color-text :keyword ":inline>")))
      (is (= ":classes<"
             (printer/color-text :keyword ":classes<"))))
    (testing "unrecognized element html color markup"
      (is (= "in&lt;line"
             (printer/with-options inline-color
               (printer/color-text :bogus "in<line"))))
      (is (= "<span class=\"bogus\">&quot;classes</span>"
             (printer/with-options classes-color
               (printer/color-text :bogus "\"classes")))))
    (testing "happy path html color markup"
      (is (= (str "<span style=\"font-weight:bold;color:yellow\">"
                  ":in&amp;line</span>")
             (printer/with-options inline-color
               (printer/color-text :keyword ":in&line"))))
      (is (= "<span class=\"keyword\">:classes&lt;&gt;</span>"
             (printer/with-options classes-color
               (printer/color-text :keyword ":classes<>")))))
    (testing "escaping empty content"
      (is (= [:span] (html/escape-html-document ""))))))
