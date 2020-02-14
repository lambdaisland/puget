(defproject mvxcvi/puget "1.2.1-SNAPSHOT"
  :description "Colorizing canonical Clojure printer for EDN values."
  :url "https://github.com/greglook/puget"
  :license {:name "Public Domain"
            :url "http://unlicense.org/"}

  :deploy-branches ["master"]
  :pedantic? :abort

  :plugins
  [[lein-cloverage "1.1.2"]]



  :dependencies
  [[org.clojure/clojure "1.10.1"]
   [org.clojure/clojurescript "1.10.520"
    :exclusions [[com.google.errorprone/error_prone_annotations]
                 [com.google.code.findbugs/jsr305]
                 ]]
   [lein-cljsbuild "1.1.7"]
   [mvxcvi/arrangement "1.2.0"]
   [fipp "0.6.22"]
   [funcool/promesa "5.0.0"]
   [com.andrewmcveigh/cljs-time "0.5.2"]
   [lambdaisland/kaocha-cljs "0.0-68"
    :exclusions [[com.cognitect/transit-java]
                 [org.clojure/java.classpath]
                 [org.clojure/tools.reader]
                 [com.cognitect/transit-clj]]]
   [lambdaisland/kaocha "0.0-590"
    :exclusions [;;[org.clojure/java.classpath]
                 [org.clojure/tools.reader]]]]
  
  :profiles {:dev {:plugins [[lein-difftest "2.0.0"]
                             [com.cemerick/clojurescript.test "0.3.3"]
                             [lein-cljsbuild "1.0.6"]]
                   :aliases {"cleantest" ["do" "clean," "once," "test," "cljsbuild" "test"]
                             "jar" ["do" "clean," "once," "jar"]
                             "deploy" ["do" "clean," "deploy" "clojars"]
                             "kaocha" ["with-profile" "+kaocha" "run" "-m" "kaocha.runner"]}}
             :kaocha {:dependencies [[lambdaisland/kaocha "0.0-590"]]}}

  :cljsbuild {:builds
              {:test {:source-paths ["target/classes" "target/test-classes"]
                      :compiler {:output-to "target/testable_code.js"
                                 :optimizations :none
                                 :cache-analysis true
                                 :source-map true
                                 :pretty-print true}}}
              :test-commands {"test" ["node" :node-runner "target/testable.js"]}}
  )

