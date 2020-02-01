// Compiled by ClojureScript 1.10.520 {:target :nodejs}
goog.provide('arrangement.core');
goog.require('cljs.core');
/**
 * Ordered sequence of predicates to test to determine the relative ordering of
 *   various data types.
 */
arrangement.core.type_predicates = new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.nil_QMARK_,cljs.core.false_QMARK_,cljs.core.true_QMARK_,cljs.core.number_QMARK_,cljs.core.char_QMARK_,cljs.core.string_QMARK_,cljs.core.keyword_QMARK_,cljs.core.symbol_QMARK_,cljs.core.list_QMARK_,cljs.core.vector_QMARK_,cljs.core.set_QMARK_,cljs.core.map_QMARK_], null);
/**
 * Determines a numeric priority for the given value based on its general
 *   type. See `type-predicates` for the ordering.
 */
arrangement.core.type_priority = (function arrangement$core$type_priority(x){
var i = (0);
while(true){
if((i < cljs.core.count.call(null,arrangement.core.type_predicates))){
var p = cljs.core.nth.call(null,arrangement.core.type_predicates,i);
if(cljs.core.truth_(p.call(null,x))){
return i;
} else {
var G__1336 = (i + (1));
i = G__1336;
continue;
}
} else {
return i;
}
break;
}
});
/**
 * True if the values in a certain priority class are directly comparable.
 */
arrangement.core.directly_comparable_QMARK_ = (function arrangement$core$directly_comparable_QMARK_(p){
return ((((3) <= p)) && ((p <= (7))));
});
/**
 * Get the type of the given object as a string. For Clojure, gets the name of
 *   the class of the object. For ClojureScript, gets either the `name` attribute
 *   or the protocol name if the `name` attribute doesn't exist.
 */
arrangement.core.type_name = (function arrangement$core$type_name(x){
var t = cljs.core.type.call(null,x);
var n = t.name;
if(cljs.core.empty_QMARK_.call(null,n)){
return cljs.core.pr_str.call(null,t);
} else {
return n;
}
});
/**
 * Compare sequences using the given comparator. If any element of the
 *   sequences orders differently, it determines the ordering. Otherwise, if the
 *   prefix matches, the longer sequence sorts later.
 */
arrangement.core.compare_seqs = (function arrangement$core$compare_seqs(xs,ys){
var xs__$1 = xs;
var ys__$1 = ys;
while(true){
if(((cljs.core.seq.call(null,xs__$1)) && (cljs.core.seq.call(null,ys__$1)))){
var x = cljs.core.first.call(null,xs__$1);
var y = cljs.core.first.call(null,ys__$1);
var o = arrangement.core.rank.call(null,x,y);
if((o === (0))){
var G__1337 = cljs.core.next.call(null,xs__$1);
var G__1338 = cljs.core.next.call(null,ys__$1);
xs__$1 = G__1337;
ys__$1 = G__1338;
continue;
} else {
return o;
}
} else {
return (cljs.core.count.call(null,xs__$1) - cljs.core.count.call(null,ys__$1));
}
break;
}
});
/**
 * Comparator function that provides a total ordering of EDN values. Values of
 *   different types sort in order of their types, per `type-priority`. `false`
 *   is before `true`, numbers are ordered by magnitude regardless of type, and
 *   characters, strings, keywords, and symbols are ordered lexically.
 * 
 *   Sequential collections are sorted by comparing their elements one at a time.
 *   If the sequences have equal leading elements, the longer one is ordered later.
 *   Sets are compared by cardinality first, then elements in sorted order.
 *   Finally, maps are compared by their entries in sorted order of their keys.
 * 
 *   All other types are sorted by class name. If the class implements
 *   `Comparable`, the instances of it are compared using `compare`. Otherwise, the
 *   values are ordered by print representation. This has the default behavior of
 *   ordering by hash code if the type does not implement a custom print format.
 */
arrangement.core.rank = (function arrangement$core$rank(a,b){
if((a === b)){
return (0);
} else {
var pri_a = arrangement.core.type_priority.call(null,a);
var pri_b = arrangement.core.type_priority.call(null,b);
if((pri_a < pri_b)){
return (-1);
} else {
if((pri_a > pri_b)){
return (1);
} else {
if(arrangement.core.directly_comparable_QMARK_.call(null,pri_a)){
return cljs.core.compare.call(null,a,b);
} else {
if(cljs.core.map_QMARK_.call(null,a)){
return arrangement.core.compare_seqs.call(null,cljs.core.sort_by.call(null,cljs.core.key,arrangement.core.rank,cljs.core.seq.call(null,a)),cljs.core.sort_by.call(null,cljs.core.key,arrangement.core.rank,cljs.core.seq.call(null,b)));
} else {
if(cljs.core.set_QMARK_.call(null,a)){
var size_diff = (cljs.core.count.call(null,a) - cljs.core.count.call(null,b));
if((size_diff === (0))){
return arrangement.core.compare_seqs.call(null,a,b);
} else {
return size_diff;
}
} else {
if(cljs.core.coll_QMARK_.call(null,a)){
return arrangement.core.compare_seqs.call(null,a,b);
} else {
var class_diff = cljs.core.compare.call(null,arrangement.core.type_name.call(null,a),arrangement.core.type_name.call(null,b));
if((class_diff === (0))){
return cljs.core.compare.call(null,a,b);
} else {
return class_diff;
}

}
}
}
}
}
}
}
});

//# sourceMappingURL=core.js.map
