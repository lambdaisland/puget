// Compiled by ClojureScript 1.10.520 {:target :nodejs}
goog.provide('puget.dispatch');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('goog.string');
/**
 * Builds a dispatcher which looks up a type by checking multiple dispatchers
 *   in order until a matching entry is found. Takes either a single collection of
 *   dispatchers or a variable list of dispatcher arguments. Ignores nil
 *   dispatchers in the sequence.
 */
puget.dispatch.chained_lookup = (function puget$dispatch$chained_lookup(var_args){
var G__1212 = arguments.length;
switch (G__1212) {
case 1:
return puget.dispatch.chained_lookup.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var args_arr__4751__auto__ = [];
var len__4730__auto___1214 = arguments.length;
var i__4731__auto___1215 = (0);
while(true){
if((i__4731__auto___1215 < len__4730__auto___1214)){
args_arr__4751__auto__.push((arguments[i__4731__auto___1215]));

var G__1216 = (i__4731__auto___1215 + (1));
i__4731__auto___1215 = G__1216;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((2)),(0),null));
return puget.dispatch.chained_lookup.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4752__auto__);

}
});

puget.dispatch.chained_lookup.cljs$core$IFn$_invoke$arity$1 = (function (dispatchers){
if(cljs.core.sequential_QMARK_.call(null,dispatchers)){
} else {
throw (new Error("Assert failed: (sequential? dispatchers)"));
}

var candidates = cljs.core.remove.call(null,cljs.core.nil_QMARK_,dispatchers);
var no_chain_lookup_provided_message = "chained-lookup must be provided at least one dispatch function to try.";
if(cljs.core.empty_QMARK_.call(null,candidates)){
throw no_chain_lookup_provided_message;
} else {
}

if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,candidates))){
return cljs.core.first.call(null,candidates);
} else {
return ((function (candidates,no_chain_lookup_provided_message){
return (function puget$dispatch$lookup(t){
return cljs.core.some.call(null,((function (candidates,no_chain_lookup_provided_message){
return (function (p1__1207_SHARP_){
return p1__1207_SHARP_.call(null,t);
});})(candidates,no_chain_lookup_provided_message))
,candidates);
});
;})(candidates,no_chain_lookup_provided_message))
}
});

puget.dispatch.chained_lookup.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,more){
return puget.dispatch.chained_lookup.call(null,cljs.core.list_STAR_.call(null,a,b,more));
});

/** @this {Function} */
puget.dispatch.chained_lookup.cljs$lang$applyTo = (function (seq1209){
var G__1210 = cljs.core.first.call(null,seq1209);
var seq1209__$1 = cljs.core.next.call(null,seq1209);
var G__1211 = cljs.core.first.call(null,seq1209__$1);
var seq1209__$2 = cljs.core.next.call(null,seq1209__$1);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__1210,G__1211,seq1209__$2);
});

puget.dispatch.chained_lookup.cljs$lang$maxFixedArity = (2);

/**
 * Builds a dispatcher which caches values returned for each type. This improves
 *   performance when the underlying dispatcher may need to perform complex
 *   lookup logic to determine the dispatched value.
 */
puget.dispatch.caching_lookup = (function puget$dispatch$caching_lookup(dispatch){
var cache = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
return ((function (cache){
return (function puget$dispatch$caching_lookup_$_lookup(t){
var memory = cljs.core.deref.call(null,cache);
if(cljs.core.contains_QMARK_.call(null,memory,t)){
return cljs.core.get.call(null,memory,t);
} else {
var v = dispatch.call(null,t);
cljs.core.swap_BANG_.call(null,cache,cljs.core.assoc,t,v);

return v;
}
});
;})(cache))
});
/**
 * Builds a dispatcher which looks up a type by checking the underlying lookup
 *   using the type's _symbolic_ name, rather than the class value itself. This is
 *   useful for checking configuration that must be created in situations where the
 *   classes themselves may not be loaded yet.
 */
puget.dispatch.symbolic_lookup = (function puget$dispatch$symbolic_lookup(dispatch){
return (function puget$dispatch$symbolic_lookup_$_lookup(t){
return dispatch.call(null,cljs.core.symbol.call(null,t.getName()));
});
});
/**
 * Returns the ancestry of the given class, starting with the class and
 *   excluding the `java.lang.Object` base class.
 */
puget.dispatch.lineage = (function puget$dispatch$lineage(cls){
return cljs.core.take_while.call(null,(function (p1__1217_SHARP_){
return (((!((p1__1217_SHARP_ == null)))) && (cljs.core.not_EQ_.call(null,puget.dispatch.Object,p1__1217_SHARP_)));
}),cljs.core.iterate.call(null,(function (p1__1218_SHARP_){
if(cljs.core.truth_(puget.dispatch.class_QMARK_.call(null,p1__1218_SHARP_))){
return p1__1218_SHARP_.getSuperclass();
} else {
return null;
}
}),cls));
});
/**
 * Resolves all of the interfaces implemented by a class, both direct (through
 *   class ancestors) and indirect (through other interfaces).
 */
puget.dispatch.find_interfaces = (function puget$dispatch$find_interfaces(cls){
var get_interfaces = (function (c){
return c.getInterfaces();
});
var direct_interfaces = cljs.core.mapcat.call(null,get_interfaces,puget.dispatch.lineage.call(null,cls));
var queue = cljs.core.vec.call(null,direct_interfaces);
var interfaces = cljs.core.PersistentHashSet.EMPTY;
while(true){
if(cljs.core.empty_QMARK_.call(null,queue)){
return interfaces;
} else {
var iface = cljs.core.first.call(null,queue);
var implemented = get_interfaces.call(null,iface);
var G__1219 = cljs.core.into.call(null,cljs.core.rest.call(null,queue),cljs.core.remove.call(null,interfaces,implemented));
var G__1220 = cljs.core.conj.call(null,interfaces,iface);
queue = G__1219;
interfaces = G__1220;
continue;
}
break;
}
});
/**
 * Builds a dispatcher which looks up a type by looking up the type itself,
 *   then attempting to look up its ancestor classes, implemented interfaces, and
 *   finally `java.lang.Object`.
 */
puget.dispatch.inheritance_lookup = (function puget$dispatch$inheritance_lookup(dispatch){
return (function puget$dispatch$inheritance_lookup_$_lookup(t){
var or__4131__auto__ = cljs.core.some.call(null,dispatch,puget.dispatch.lineage.call(null,t));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = (function (){var candidates = cljs.core.remove.call(null,cljs.core.comp.call(null,cljs.core.nil_QMARK_,cljs.core.first),cljs.core.map.call(null,cljs.core.juxt.call(null,dispatch,cljs.core.identity),puget.dispatch.find_interfaces.call(null,t)));
var wrong_number_of_candidates_message = "%d candidates found for interfaces on dispatch type %s: %s";
var G__1222 = cljs.core.count.call(null,candidates);
switch (G__1222) {
case (0):
return null;

break;
case (1):
return cljs.core.ffirst.call(null,candidates);

break;
default:
throw puget.dispatch.format.call(null,wrong_number_of_candidates_message,cljs.core.count.call(null,candidates),t,clojure.string.join.call(null,", ",cljs.core.map.call(null,cljs.core.second,candidates)));

}
})();
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return dispatch.call(null,Object);
}
}
});
});

//# sourceMappingURL=dispatch.js.map
