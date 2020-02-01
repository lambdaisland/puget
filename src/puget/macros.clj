(ns puget.macros)

(defmacro current-ns []
  (str *ns*))
