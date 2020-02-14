(ns puget.cljs.html-test
  (:require
    [cljs.test :as t]
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


(t/deftest style-test
  (t/is (= "style=\"font-weight:bold;text-decoration:underline;color:red\""
         (html/style [:bold :underline :red]))))


(t/deftest html-test
  (t/testing "color-text"
    (t/testing "no color markup"
      (t/is (= ":inline>"
             (printer/color-text :keyword ":inline>")))
      (t/is (= ":classes<"
             (printer/color-text :keyword ":classes<"))))
    (t/testing "unrecognized element html color markup"
      (t/is (= "in&lt;line"
             (printer/with-options inline-color
               (printer/color-text :bogus "in<line"))))
      (t/is (= "<span class=\"bogus\">&quot;classes</span>"
             (printer/with-options classes-color
               (printer/color-text :bogus "\"classes")))))
    (t/testing "happy path html color markup"
      (t/is (= (str "<span style=\"font-weight:bold;color:yellow\">"
                  ":in&amp;line</span>")
             (printer/with-options inline-color
               (printer/color-text :keyword ":in&line"))))
      (t/is (= "<span class=\"keyword\">:classes&lt;&gt;</span>"
             (printer/with-options classes-color
               (printer/color-text :keyword ":classes<>")))))
    (t/testing "escaping empty content"
      (t/is (= [:span] (html/escape-html-document ""))))))

