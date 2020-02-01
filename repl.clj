(require
  '[cljs.repl :as repl]
  '[cljs.repl.node :as node])

(repl/repl* (node/repl-env)
  {:output-to "target/testable_code.js"
   :optimizations :none
   :cache-analysis true
   :source-map true})

