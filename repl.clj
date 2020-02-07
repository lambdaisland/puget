(require '[cljs.repl :as repl]
         '[cljs.repl.node :as node])

(repl/repl* (node/repl-env)
            {:output-to "target/testable_code.js"
             :optimizations :none
             :cache-analysis true
             :source-map true})


((requiring-resolve 'cljs.repl/repl*) ((requiring-resolve 'cljs.repl.node/repl-env)))
