// Compiled by ClojureScript 1.10.520 {:target :nodejs}
goog.provide('puget.color');
goog.require('cljs.core');
/**
 * Dispatches to coloring multimethods. Element should be a key from
 *   the color-scheme map.
 */
puget.color.dispatch = (function puget$color$dispatch(options,element,text){
if(cljs.core.truth_(new cljs.core.Keyword(null,"print-color","print-color",722462614).cljs$core$IFn$_invoke$arity$1(options))){
return new cljs.core.Keyword(null,"color-markup","color-markup",266742518).cljs$core$IFn$_invoke$arity$1(options);
} else {
return null;
}
});
if((typeof puget !== 'undefined') && (typeof puget.color !== 'undefined') && (typeof puget.color.document !== 'undefined')){
} else {
/**
 * Constructs a pretty print document, which may be colored if
 *   `:print-color` is true.
 */
puget.color.document = (function (){var method_table__4613__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"puget.color","document"),new cljs.core.Var(function(){return puget.color.dispatch;},new cljs.core.Symbol("puget.color","dispatch","puget.color/dispatch",161171474,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"puget.color","puget.color",-1419258851,null),new cljs.core.Symbol(null,"dispatch","dispatch",-1335098760,null),"/home/enyert/Projects/gaiwan/puget/src/puget/color.cljc",15,1,23,23,cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"options","options",1740170016,null),new cljs.core.Symbol(null,"element","element",-680416020,null),new cljs.core.Symbol(null,"text","text",-150030170,null)], null)),"Dispatches to coloring multimethods. Element should be a key from\n  the color-scheme map.",(cljs.core.truth_(puget.color.dispatch)?puget.color.dispatch.cljs$lang$test:null)])),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}
if((typeof puget !== 'undefined') && (typeof puget.color !== 'undefined') && (typeof puget.color.text !== 'undefined')){
} else {
/**
 * Produces text colored according to the active color scheme. This is mostly
 *   useful to clients which want to produce output which matches data printed by
 *   Puget, but which is not directly printed by the library. Note that this
 *   function still obeys the `:print-color` option.
 */
puget.color.text = (function (){var method_table__4613__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"puget.color","text"),new cljs.core.Var(function(){return puget.color.dispatch;},new cljs.core.Symbol("puget.color","dispatch","puget.color/dispatch",161171474,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"puget.color","puget.color",-1419258851,null),new cljs.core.Symbol(null,"dispatch","dispatch",-1335098760,null),"/home/enyert/Projects/gaiwan/puget/src/puget/color.cljc",15,1,23,23,cljs.core.list(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"options","options",1740170016,null),new cljs.core.Symbol(null,"element","element",-680416020,null),new cljs.core.Symbol(null,"text","text",-150030170,null)], null)),"Dispatches to coloring multimethods. Element should be a key from\n  the color-scheme map.",(cljs.core.truth_(puget.color.dispatch)?puget.color.dispatch.cljs$lang$test:null)])),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}
cljs.core._add_method.call(null,puget.color.document,null,(function (options,element,text){
return text;
}));
cljs.core._add_method.call(null,puget.color.text,null,(function (options,element,text){
return text;
}));

//# sourceMappingURL=color.js.map
