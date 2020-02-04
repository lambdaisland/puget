// Compiled by ClojureScript 1.10.520 {:target :nodejs}
goog.provide('puget.printer');
goog.require('cljs.core');
goog.require('arrangement.core');
goog.require('clojure.string');
goog.require('fipp.engine');
goog.require('fipp.visit');
goog.require('puget.color');
goog.require('puget.color.ansi');
goog.require('puget.color.html');
goog.require('puget.dispatch');
goog.require('cljs_time.coerce');
/**
 * Get the type of the given object as a string. For Clojure, gets the name of
 *   the class of the object. For ClojureScript, gets either the `name` attribute
 *   or the protocol name if the `name` attribute doesn't exist.
 */
puget.printer.get_type_name = (function puget$printer$get_type_name(x){
var t = cljs.core.type.call(null,x);
var n = t.name;
if(cljs.core.empty_QMARK_.call(null,n)){
return cljs.core.pr_str.call(null,t);
} else {
return n;
}
});
/**
 * Get type of a given argument
 */
puget.printer.get_type = (function puget$printer$get_type(x){
return cljs.core.type.call(null,x);
});
/**
 * Get the hashcode for a given object o
 */
puget.printer.get_identity_hashcode = (function puget$printer$get_identity_hashcode(o){
return cljs.core.hash.call(null,o);
});
/**
 * Returns a hex representation of input-string
 */
puget.printer.to_hex_string = (function puget$printer$to_hex_string(input_string){
return input_string.toString((16));
});
/**
 * Verify if a promise is resolved
 */
puget.printer.is_resolved_multi = (function puget$printer$is_resolved_multi(promise){
return promesa.core.resolved_QMARK_.call(null,promise);
});
/**
 * Default options to use when constructing new printers.
 */
puget.printer._STAR_options_STAR_ = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"map-coll-separator","map-coll-separator",609661315),new cljs.core.Keyword(null,"namespace-maps","namespace-maps",-2037027128),new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295),new cljs.core.Keyword(null,"print-fallback","print-fallback",-1229211894),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"color-markup","color-markup",266742518),new cljs.core.Keyword(null,"print-color","print-color",722462614),new cljs.core.Keyword(null,"sort-keys","sort-keys",1311511993),new cljs.core.Keyword(null,"map-delimiter","map-delimiter",-671741092)],[" ",false,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"class-delimiter","class-delimiter",2013485793),new cljs.core.Keyword(null,"number","number",1570378438),new cljs.core.Keyword(null,"symbol","symbol",-1038572696),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),new cljs.core.Keyword(null,"function-symbol","function-symbol",-1336068270),new cljs.core.Keyword(null,"keyword","keyword",811389747),new cljs.core.Keyword(null,"nil","nil",99600501),new cljs.core.Keyword(null,"class-name","class-name",945142584),new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Keyword(null,"boolean","boolean",-1919418404),new cljs.core.Keyword(null,"character","character",380652989)],[new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"blue","blue",-622100620)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cyan","cyan",1118839274)], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bold","bold",-116809535),new cljs.core.Keyword(null,"magenta","magenta",1687937081)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bold","bold",-116809535),new cljs.core.Keyword(null,"red","red",-969428204)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bold","bold",-116809535),new cljs.core.Keyword(null,"blue","blue",-622100620)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bold","bold",-116809535),new cljs.core.Keyword(null,"yellow","yellow",-881035449)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bold","bold",-116809535),new cljs.core.Keyword(null,"black","black",1294279647)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bold","bold",-116809535),new cljs.core.Keyword(null,"blue","blue",-622100620)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"red","red",-969428204)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"green","green",-945526839)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bold","bold",-116809535),new cljs.core.Keyword(null,"magenta","magenta",1687937081)], null)]),new cljs.core.Keyword(null,"pretty","pretty",-1916372486),(80),new cljs.core.Keyword(null,"ansi","ansi",1415977390),false,(80),","]);
/**
 * Merges maps of printer options, taking care to combine the color scheme
 *   correctly.
 */
puget.printer.merge_options = (function puget$printer$merge_options(a,b){
var colors = cljs.core.merge.call(null,new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295).cljs$core$IFn$_invoke$arity$1(a),new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295).cljs$core$IFn$_invoke$arity$1(b));
return cljs.core.assoc.call(null,cljs.core.merge.call(null,a,b),new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295),colors);
});
var ret__4776__auto___1987 = (function (){
/**
 * Executes the given expressions with a set of options merged into the current
 *   option map.
 */
puget.printer.with_options = (function puget$printer$with_options(var_args){
var args__4736__auto__ = [];
var len__4730__auto___1988 = arguments.length;
var i__4731__auto___1989 = (0);
while(true){
if((i__4731__auto___1989 < len__4730__auto___1988)){
args__4736__auto__.push((arguments[i__4731__auto___1989]));

var G__1990 = (i__4731__auto___1989 + (1));
i__4731__auto___1989 = G__1990;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((3) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((3)),(0),null)):null);
return puget.printer.with_options.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__4737__auto__);
});

puget.printer.with_options.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,opts,body){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","binding","cljs.core/binding",2050379843,null),null,(1),null)),(new cljs.core.List(null,cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("puget.printer","*options*","puget.printer/*options*",-90579004,null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("puget.printer","merge-options","puget.printer/merge-options",-541300024,null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol("puget.printer","*options*","puget.printer/*options*",-90579004,null),null,(1),null)),(new cljs.core.List(null,opts,null,(1),null))))),null,(1),null)))))),null,(1),null)),body)));
});

puget.printer.with_options.cljs$lang$maxFixedArity = (3);

/** @this {Function} */
puget.printer.with_options.cljs$lang$applyTo = (function (seq1983){
var G__1984 = cljs.core.first.call(null,seq1983);
var seq1983__$1 = cljs.core.next.call(null,seq1983);
var G__1985 = cljs.core.first.call(null,seq1983__$1);
var seq1983__$2 = cljs.core.next.call(null,seq1983__$1);
var G__1986 = cljs.core.first.call(null,seq1983__$2);
var seq1983__$3 = cljs.core.next.call(null,seq1983__$2);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__1984,G__1985,G__1986,seq1983__$3);
});

return null;
})()
;
puget.printer.with_options.cljs$lang$macro = true;

var ret__4776__auto___1994 = (function (){
/**
 * Executes the given expressions with colored output enabled.
 */
puget.printer.with_color = (function puget$printer$with_color(var_args){
var args__4736__auto__ = [];
var len__4730__auto___1995 = arguments.length;
var i__4731__auto___1996 = (0);
while(true){
if((i__4731__auto___1996 < len__4730__auto___1995)){
args__4736__auto__.push((arguments[i__4731__auto___1996]));

var G__1997 = (i__4731__auto___1996 + (1));
i__4731__auto___1996 = G__1997;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((2) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((2)),(0),null)):null);
return puget.printer.with_color.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4737__auto__);
});

puget.printer.with_color.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,body){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Symbol("puget.printer","with-options","puget.printer/with-options",-1239052320,null),null,(1),null)),(new cljs.core.List(null,cljs.core.apply.call(null,cljs.core.array_map,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(new cljs.core.List(null,new cljs.core.Keyword(null,"print-color","print-color",722462614),null,(1),null)),(new cljs.core.List(null,true,null,(1),null)))))),null,(1),null)),body)));
});

puget.printer.with_color.cljs$lang$maxFixedArity = (2);

/** @this {Function} */
puget.printer.with_color.cljs$lang$applyTo = (function (seq1991){
var G__1992 = cljs.core.first.call(null,seq1991);
var seq1991__$1 = cljs.core.next.call(null,seq1991);
var G__1993 = cljs.core.first.call(null,seq1991__$1);
var seq1991__$2 = cljs.core.next.call(null,seq1991__$1);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__1992,G__1993,seq1991__$2);
});

return null;
})()
;
puget.printer.with_color.cljs$lang$macro = true;

/**
 * Produces text colored according to the active color scheme. This is mostly
 *   useful to clients which want to produce output which matches data printed by
 *   Puget, but which is not directly printed by the library. Note that this
 *   function still obeys the `:print-color` option.
 */
puget.printer.color_text = (function puget$printer$color_text(var_args){
var G__1999 = arguments.length;
switch (G__1999) {
case 2:
return puget.printer.color_text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return puget.printer.color_text.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

puget.printer.color_text.cljs$core$IFn$_invoke$arity$2 = (function (element,text){
return puget.printer.color_text.call(null,puget.printer._STAR_options_STAR_,element,text);
});

puget.printer.color_text.cljs$core$IFn$_invoke$arity$3 = (function (options,element,text){
return puget.color.text.call(null,options,element,text);
});

puget.printer.color_text.cljs$lang$maxFixedArity = 3;

/**
 * Takes a sequence of entries and checks the mode to determine whether to sort
 *   them. Returns an appropriately ordered sequence.
 */
puget.printer.order_collection = (function puget$printer$order_collection(mode,coll,sort_fn){
if((((!(cljs.core.sorted_QMARK_.call(null,coll)))) && (((mode === true) || (((typeof mode === 'number') && (cljs.core.counted_QMARK_.call(null,coll)) && ((mode >= cljs.core.count.call(null,coll))))))))){
return sort_fn.call(null,coll);
} else {
return cljs.core.seq.call(null,coll);
}
});
/**
 * Extract a common namespace from the keys in the map. Returns a tuple of the
 *   ns string and the stripped map, or nil if the keys are not keywords or there
 *   is no sufficiently common namespace.
 */
puget.printer.common_key_ns = (function puget$printer$common_key_ns(m){
if(cljs.core.every_QMARK_.call(null,cljs.core.every_pred.call(null,cljs.core.keyword_QMARK_,cljs.core.namespace),cljs.core.keys.call(null,m))){
var nsf = cljs.core.frequencies.call(null,cljs.core.map.call(null,cljs.core.namespace,cljs.core.keys.call(null,m)));
var vec__2001 = cljs.core.apply.call(null,cljs.core.max_key,cljs.core.val,nsf);
var common = cljs.core.nth.call(null,vec__2001,(0),null);
var n = cljs.core.nth.call(null,vec__2001,(1),null);
if(((cljs.core.count.call(null,m) / (2)) < n)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [common,cljs.core.into.call(null,cljs.core.empty.call(null,m),cljs.core.map.call(null,((function (nsf,vec__2001,common,n){
return (function puget$printer$common_key_ns_$_strip_common(p__2004){
var vec__2005 = p__2004;
var k = cljs.core.nth.call(null,vec__2005,(0),null);
var v = cljs.core.nth.call(null,vec__2005,(1),null);
var e = vec__2005;
if(cljs.core._EQ_.call(null,common,cljs.core.namespace.call(null,k))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,cljs.core.name.call(null,k)),v], null);
} else {
return e;
}
});})(nsf,vec__2001,common,n))
),m)], null);
} else {
return null;
}
} else {
return null;
}
});
/**
 * Renders common syntax doc for an unknown representation of a value.
 */
puget.printer.format_unknown = (function puget$printer$format_unknown(var_args){
var G__2009 = arguments.length;
switch (G__2009) {
case 2:
return puget.printer.format_unknown.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return puget.printer.format_unknown.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return puget.printer.format_unknown.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

puget.printer.format_unknown.cljs$core$IFn$_invoke$arity$2 = (function (printer,value){
return puget.printer.format_unknown.call(null,printer,value,cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});

puget.printer.format_unknown.cljs$core$IFn$_invoke$arity$3 = (function (printer,value,repr){
return puget.printer.format_unknown.call(null,printer,value,puget.printer.get_type_name.call(null,value),repr);
});

puget.printer.format_unknown.cljs$core$IFn$_invoke$arity$4 = (function (printer,value,tag,repr){
var sys_id = puget.printer.to_hex_string.call(null,puget.printer.get_identity_hashcode.call(null,value));
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),puget.color.document.call(null,printer,new cljs.core.Keyword(null,"class-delimiter","class-delimiter",2013485793),"#<"),puget.color.document.call(null,printer,new cljs.core.Keyword(null,"class-name","class-name",945142584),tag),puget.color.document.call(null,printer,new cljs.core.Keyword(null,"class-delimiter","class-delimiter",2013485793),"@"),sys_id,((cljs.core.not_EQ_.call(null,repr,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(tag),"@",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sys_id)].join('')))?(new cljs.core.List(null," ",(new cljs.core.List(null,repr,null,(1),null)),(2),null)):null),puget.color.document.call(null,printer,new cljs.core.Keyword(null,"class-delimiter","class-delimiter",2013485793),">")], null);
});

puget.printer.format_unknown.cljs$lang$maxFixedArity = 4;

/**
 * Formats a document without considering metadata.
 */
puget.printer.format_doc_STAR_ = (function puget$printer$format_doc_STAR_(printer,value){
var lookup = new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901).cljs$core$IFn$_invoke$arity$1(printer);
var handler = (function (){var and__4120__auto__ = lookup;
if(cljs.core.truth_(and__4120__auto__)){
return lookup.call(null,puget.printer.get_type.call(null,value));
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(handler)){
return handler.call(null,printer,value);
} else {
return fipp.visit.visit_STAR_.call(null,printer,value);
}
});
/**
 * Recursively renders a print document for the given value.
 */
puget.printer.format_doc = (function puget$printer$format_doc(printer,value){
var temp__5733__auto__ = cljs.core.meta.call(null,value);
if(cljs.core.truth_(temp__5733__auto__)){
var metadata = temp__5733__auto__;
return fipp.visit.visit_meta.call(null,printer,metadata,value);
} else {
return puget.printer.format_doc_STAR_.call(null,printer,value);
}
});
/**
 * Print handler which renders the value with `pr-str`.
 */
puget.printer.pr_handler = (function puget$printer$pr_handler(printer,value){
return cljs.core.pr_str.call(null,value);
});
/**
 * Print handler which renders the value using the printer's unknown type logic.
 */
puget.printer.unknown_handler = (function puget$printer$unknown_handler(printer,value){
return fipp.visit.visit_unknown.call(null,printer,value);
});
/**
 * Generates a print handler function which renders a tagged-literal with the
 *   given tag and a value produced by calling the function.
 */
puget.printer.tagged_handler = (function puget$printer$tagged_handler(tag,value_fn){
if((tag instanceof cljs.core.Symbol)){
} else {
throw cljs.core.ex_info.call(null,["Cannot create tagged handler with non-symbol tag ",cljs.core.pr_str.call(null,tag)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),tag,new cljs.core.Keyword(null,"value-fn","value-fn",544624790),value_fn], null));
}

if(cljs.core.ifn_QMARK_.call(null,value_fn)){
} else {
throw cljs.core.ex_info.call(null,["Cannot create tagged handler for ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(tag)," with non-function value transform"].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),tag,new cljs.core.Keyword(null,"value-fn","value-fn",544624790),value_fn], null));
}

return (function puget$printer$tagged_handler_$_handler(printer,value){
return puget.printer.format_doc.call(null,printer,cljs.core.tagged_literal.call(null,tag,value_fn.call(null,value)));
});
});
/**
 * Map of print handlers for Java types. This supports syntax for regular
 *   expressions, dates, UUIDs, and futures.
 */
puget.printer.java_handlers = cljs.core.PersistentArrayMap.createAsIfByAssoc([Object,(function puget$printer$class_handler(printer,value){
return puget.printer.format_unknown.call(null,printer,value,"Class",puget.printer.get_type_name.call(null,value));
}),Promise,(function puget$printer$future_handler(printer,value){
var doc = (cljs.core.truth_(puget.printer.is_resolved_multi.call(null,value))?puget.printer.format_doc.call(null,printer,cljs.core.deref.call(null,value)):puget.color.document.call(null,printer,new cljs.core.Keyword(null,"nil","nil",99600501),"pending"));
return puget.printer.format_unknown.call(null,printer,value,"Future",doc);
}),Date,puget.printer.tagged_handler.call(null,new cljs.core.Symbol(null,"inst","inst",-2008473268,null),(function (x){

var dt = cljs_time.coerce.from_date.call(null,x);
var date_formatter = cljs_time.format.formatter.call(null,"yyyy-MM-dd'T'HH:mm:ss.SSS-00:00");
return cljs_time.format.unparse.call(null,date_formatter,dt);
})),cljs.core.uuid,puget.printer.tagged_handler.call(null,new cljs.core.Symbol(null,"uuid","uuid",-504564192,null),cljs.core.str)]);
/**
 * Map of print handlers for 'primary' Clojure types. These should take
 *   precedence over the handlers in `clojure-interface-handlers`.
 */
puget.printer.clojure_handlers = cljs.core.PersistentArrayMap.createAsIfByAssoc([cljs.core.atom,(function puget$printer$atom_handler(printer,value){
return puget.printer.format_unknown.call(null,printer,value,"Atom",puget.printer.format_doc.call(null,printer,cljs.core.deref.call(null,value)));
}),clojure.lang.Delay,(function puget$printer$delay_handler(printer,value){
var doc = ((cljs.core.realized_QMARK_.call(null,value))?puget.printer.format_doc.call(null,printer,cljs.core.deref.call(null,value)):puget.color.document.call(null,printer,new cljs.core.Keyword(null,"nil","nil",99600501),"pending"));
return puget.printer.format_unknown.call(null,printer,value,"Delay",doc);
}),clojure.lang.ISeq,(function puget$printer$iseq_handler(printer,value){
return fipp.visit.visit_seq.call(null,printer,value);
})]);
/**
 * Fallback print handlers for other Clojure interfaces.
 */
puget.printer.clojure_interface_handlers = cljs.core.PersistentArrayMap.createAsIfByAssoc([clojure.lang.IPending,(function puget$printer$pending_handler(printer,value){
var doc = ((cljs.core.realized_QMARK_.call(null,value))?puget.printer.format_doc.call(null,printer,cljs.core.deref.call(null,value)):puget.color.document.call(null,printer,new cljs.core.Keyword(null,"nil","nil",99600501),"pending"));
return puget.printer.format_unknown.call(null,printer,value,doc);
}),clojure.lang.Fn,(function puget$printer$fn_handler(printer,value){
var doc = (function (){var vec__2013 = clojure.string.split.call(null,clojure.string.replace_first.call(null,puget.printer.get_type_name.call(null,value),"$","/"),/\$/);
var seq__2014 = cljs.core.seq.call(null,vec__2013);
var first__2015 = cljs.core.first.call(null,seq__2014);
var seq__2014__$1 = cljs.core.next.call(null,seq__2014);
var vname = first__2015;
var tail = seq__2014__$1;
if(cljs.core.seq.call(null,tail)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(vname),"[",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"/",cljs.core.map.call(null,((function (vec__2013,seq__2014,first__2015,seq__2014__$1,vname,tail){
return (function (p1__2012_SHARP_){
return cljs.core.first.call(null,clojure.string.split.call(null,p1__2012_SHARP_,/__/));
});})(vec__2013,seq__2014,first__2015,seq__2014__$1,vname,tail))
,tail))),"]"].join('');
} else {
return vname;
}
})();
return puget.printer.format_unknown.call(null,printer,value,"Fn",doc);
})]);
/**
 * Print handler dispatch combining Java and Clojure handlers with inheritance
 *   lookups. Provides a similar experience as the standard Clojure
 *   pretty-printer.
 */
puget.printer.common_handlers = puget.dispatch.chained_lookup.call(null,puget.dispatch.inheritance_lookup.call(null,puget.printer.java_handlers),puget.dispatch.inheritance_lookup.call(null,puget.printer.clojure_handlers),puget.dispatch.inheritance_lookup.call(null,puget.printer.clojure_interface_handlers));

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {fipp.visit.IVisitor}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
puget.printer.CanonicalPrinter = (function (print_handlers,__meta,__extmap,__hash){
this.print_handlers = print_handlers;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
puget.printer.CanonicalPrinter.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4385__auto__,k__4386__auto__){
var self__ = this;
var this__4385__auto____$1 = this;
return this__4385__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__4386__auto__,null);
});

puget.printer.CanonicalPrinter.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4387__auto__,k2018,else__4388__auto__){
var self__ = this;
var this__4387__auto____$1 = this;
var G__2022 = k2018;
var G__2022__$1 = (((G__2022 instanceof cljs.core.Keyword))?G__2022.fqn:null);
switch (G__2022__$1) {
case "print-handlers":
return self__.print_handlers;

break;
default:
return cljs.core.get.call(null,self__.__extmap,k2018,else__4388__auto__);

}
});

puget.printer.CanonicalPrinter.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4404__auto__,f__4405__auto__,init__4406__auto__){
var self__ = this;
var this__4404__auto____$1 = this;
return cljs.core.reduce.call(null,((function (this__4404__auto____$1){
return (function (ret__4407__auto__,p__2023){
var vec__2024 = p__2023;
var k__4408__auto__ = cljs.core.nth.call(null,vec__2024,(0),null);
var v__4409__auto__ = cljs.core.nth.call(null,vec__2024,(1),null);
return f__4405__auto__.call(null,ret__4407__auto__,k__4408__auto__,v__4409__auto__);
});})(this__4404__auto____$1))
,init__4406__auto__,this__4404__auto____$1);
});

puget.printer.CanonicalPrinter.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4399__auto__,writer__4400__auto__,opts__4401__auto__){
var self__ = this;
var this__4399__auto____$1 = this;
var pr_pair__4402__auto__ = ((function (this__4399__auto____$1){
return (function (keyval__4403__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__4400__auto__,cljs.core.pr_writer,""," ","",opts__4401__auto__,keyval__4403__auto__);
});})(this__4399__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__4400__auto__,pr_pair__4402__auto__,"#puget.printer.CanonicalPrinter{",", ","}",opts__4401__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901),self__.print_handlers],null))], null),self__.__extmap));
});

puget.printer.CanonicalPrinter.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__2017){
var self__ = this;
var G__2017__$1 = this;
return (new cljs.core.RecordIter((0),G__2017__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator.call(null,self__.__extmap):cljs.core.nil_iter.call(null))));
});

puget.printer.CanonicalPrinter.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4383__auto__){
var self__ = this;
var this__4383__auto____$1 = this;
return self__.__meta;
});

puget.printer.CanonicalPrinter.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__4380__auto__){
var self__ = this;
var this__4380__auto____$1 = this;
return (new puget.printer.CanonicalPrinter(self__.print_handlers,self__.__meta,self__.__extmap,self__.__hash));
});

puget.printer.CanonicalPrinter.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4389__auto__){
var self__ = this;
var this__4389__auto____$1 = this;
return (1 + cljs.core.count.call(null,self__.__extmap));
});

puget.printer.CanonicalPrinter.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__4381__auto__){
var self__ = this;
var this__4381__auto____$1 = this;
var h__4243__auto__ = self__.__hash;
if((!((h__4243__auto__ == null)))){
return h__4243__auto__;
} else {
var h__4243__auto____$1 = ((function (h__4243__auto__,this__4381__auto____$1){
return (function (coll__4382__auto__){
return (-418562843 ^ cljs.core.hash_unordered_coll.call(null,coll__4382__auto__));
});})(h__4243__auto__,this__4381__auto____$1))
.call(null,this__4381__auto____$1);
self__.__hash = h__4243__auto____$1;

return h__4243__auto____$1;
}
});

puget.printer.CanonicalPrinter.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this2019,other2020){
var self__ = this;
var this2019__$1 = this;
return (((!((other2020 == null)))) && ((this2019__$1.constructor === other2020.constructor)) && (cljs.core._EQ_.call(null,this2019__$1.print_handlers,other2020.print_handlers)) && (cljs.core._EQ_.call(null,this2019__$1.__extmap,other2020.__extmap)));
});

puget.printer.CanonicalPrinter.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4394__auto__,k__4395__auto__){
var self__ = this;
var this__4394__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901),null], null), null),k__4395__auto__)){
return cljs.core.dissoc.call(null,cljs.core._with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__4394__auto____$1),self__.__meta),k__4395__auto__);
} else {
return (new puget.printer.CanonicalPrinter(self__.print_handlers,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__4395__auto__)),null));
}
});

puget.printer.CanonicalPrinter.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4392__auto__,k__4393__auto__,G__2017){
var self__ = this;
var this__4392__auto____$1 = this;
var pred__2027 = cljs.core.keyword_identical_QMARK_;
var expr__2028 = k__4393__auto__;
if(cljs.core.truth_(pred__2027.call(null,new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901),expr__2028))){
return (new puget.printer.CanonicalPrinter(G__2017,self__.__meta,self__.__extmap,null));
} else {
return (new puget.printer.CanonicalPrinter(self__.print_handlers,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__4393__auto__,G__2017),null));
}
});

puget.printer.CanonicalPrinter.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4397__auto__){
var self__ = this;
var this__4397__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901),self__.print_handlers,null))], null),self__.__extmap));
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$ = cljs.core.PROTOCOL_SENTINEL;

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_record$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return this$__$1.fipp$visit$IVisitor$visit_unknown$arity$2(null,value);
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_meta$arity$3 = (function (this$,metadata,value){
var self__ = this;
var this$__$1 = this;
return puget.printer.format_doc_STAR_.call(null,this$__$1,value);
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_number$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return cljs.core.pr_str.call(null,value);
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_pattern$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return this$__$1.fipp$visit$IVisitor$visit_unknown$arity$2(null,value);
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_unknown$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
var not_defined_representation_message = ["No defined representation for ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(puget.printer.get_type.call(null,value)),": ",cljs.core.pr_str.call(null,value)].join('');
throw not_defined_representation_message;
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_symbol$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(value);
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_seq$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
if(cljs.core.seq.call(null,value)){
var entries = cljs.core.map.call(null,cljs.core.partial.call(null,puget.printer.format_doc,this$__$1),value);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"(",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null," ",entries)], null),")"], null);
} else {
return "()";
}
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_boolean$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(value);
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_tagged$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"tag","tag",-1290361223).cljs$core$IFn$_invoke$arity$1(value))].join('')," ",puget.printer.format_doc.call(null,this$__$1,new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(value))], null);
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_keyword$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(value);
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_map$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
if(cljs.core.seq.call(null,value)){
var entries = cljs.core.map.call(null,((function (this$__$1){
return (function (p1__2016_SHARP_){
return (new cljs.core.PersistentVector(null,4,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"span","span",1394872991),puget.printer.format_doc.call(null,this$__$1,cljs.core.key.call(null,p1__2016_SHARP_))," ",puget.printer.format_doc.call(null,this$__$1,cljs.core.val.call(null,p1__2016_SHARP_))],null));
});})(this$__$1))
,cljs.core.sort_by.call(null,cljs.core.first,arrangement.core.rank,value));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"{",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null," ",entries)], null),"}"], null);
} else {
return "{}";
}
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_nil$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return "nil";
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_character$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return cljs.core.pr_str.call(null,value);
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_string$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return cljs.core.pr_str.call(null,value);
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_var$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return this$__$1.fipp$visit$IVisitor$visit_unknown$arity$2(null,value);
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_set$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
if(cljs.core.seq.call(null,value)){
var entries = cljs.core.map.call(null,cljs.core.partial.call(null,puget.printer.format_doc,this$__$1),cljs.core.sort.call(null,arrangement.core.rank,value));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"#{",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null," ",entries)], null),"}"], null);
} else {
return "#{}";
}
});

puget.printer.CanonicalPrinter.prototype.fipp$visit$IVisitor$visit_vector$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
if(cljs.core.seq.call(null,value)){
var entries = cljs.core.map.call(null,cljs.core.partial.call(null,puget.printer.format_doc,this$__$1),value);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"[",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null," ",entries)], null),"]"], null);
} else {
return "[]";
}
});

puget.printer.CanonicalPrinter.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4384__auto__,G__2017){
var self__ = this;
var this__4384__auto____$1 = this;
return (new puget.printer.CanonicalPrinter(self__.print_handlers,G__2017,self__.__extmap,self__.__hash));
});

puget.printer.CanonicalPrinter.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4390__auto__,entry__4391__auto__){
var self__ = this;
var this__4390__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__4391__auto__)){
return this__4390__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.call(null,entry__4391__auto__,(0)),cljs.core._nth.call(null,entry__4391__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__4390__auto____$1,entry__4391__auto__);
}
});

puget.printer.CanonicalPrinter.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"print-handlers","print-handlers",-127526374,null)], null);
});

puget.printer.CanonicalPrinter.cljs$lang$type = true;

puget.printer.CanonicalPrinter.cljs$lang$ctorPrSeq = (function (this__4428__auto__){
return (new cljs.core.List(null,"puget.printer/CanonicalPrinter",null,(1),null));
});

puget.printer.CanonicalPrinter.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"puget.printer/CanonicalPrinter");
});

/**
 * Positional factory function for puget.printer/CanonicalPrinter.
 */
puget.printer.__GT_CanonicalPrinter = (function puget$printer$__GT_CanonicalPrinter(print_handlers){
return (new puget.printer.CanonicalPrinter(print_handlers,null,null,null));
});

/**
 * Factory function for puget.printer/CanonicalPrinter, taking a map of keywords to field values.
 */
puget.printer.map__GT_CanonicalPrinter = (function puget$printer$map__GT_CanonicalPrinter(G__2021){
var extmap__4424__auto__ = (function (){var G__2030 = cljs.core.dissoc.call(null,G__2021,new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901));
if(cljs.core.record_QMARK_.call(null,G__2021)){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,G__2030);
} else {
return G__2030;
}
})();
return (new puget.printer.CanonicalPrinter(new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901).cljs$core$IFn$_invoke$arity$1(G__2021),null,cljs.core.not_empty.call(null,extmap__4424__auto__),null));
});

/**
 * Constructs a new canonical printer with the given handler dispatch.
 */
puget.printer.canonical_printer = (function puget$printer$canonical_printer(var_args){
var G__2033 = arguments.length;
switch (G__2033) {
case 0:
return puget.printer.canonical_printer.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return puget.printer.canonical_printer.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

puget.printer.canonical_printer.cljs$core$IFn$_invoke$arity$0 = (function (){
return puget.printer.canonical_printer.call(null,null);
});

puget.printer.canonical_printer.cljs$core$IFn$_invoke$arity$1 = (function (handlers){
return cljs.core.assoc.call(null,(new puget.printer.CanonicalPrinter(handlers,null,null,null)),new cljs.core.Keyword(null,"width","width",-384071477),(0));
});

puget.printer.canonical_printer.cljs$lang$maxFixedArity = 1;


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {fipp.visit.IVisitor}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
puget.printer.PrettyPrinter = (function (width,print_meta,sort_keys,map_delimiter,map_coll_separator,namespace_maps,seq_limit,print_color,color_markup,color_scheme,print_handlers,print_fallback,__meta,__extmap,__hash){
this.width = width;
this.print_meta = print_meta;
this.sort_keys = sort_keys;
this.map_delimiter = map_delimiter;
this.map_coll_separator = map_coll_separator;
this.namespace_maps = namespace_maps;
this.seq_limit = seq_limit;
this.print_color = print_color;
this.color_markup = color_markup;
this.color_scheme = color_scheme;
this.print_handlers = print_handlers;
this.print_fallback = print_fallback;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
puget.printer.PrettyPrinter.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4385__auto__,k__4386__auto__){
var self__ = this;
var this__4385__auto____$1 = this;
return this__4385__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__4386__auto__,null);
});

puget.printer.PrettyPrinter.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4387__auto__,k2036,else__4388__auto__){
var self__ = this;
var this__4387__auto____$1 = this;
var G__2040 = k2036;
var G__2040__$1 = (((G__2040 instanceof cljs.core.Keyword))?G__2040.fqn:null);
switch (G__2040__$1) {
case "width":
return self__.width;

break;
case "print-meta":
return self__.print_meta;

break;
case "sort-keys":
return self__.sort_keys;

break;
case "map-delimiter":
return self__.map_delimiter;

break;
case "map-coll-separator":
return self__.map_coll_separator;

break;
case "namespace-maps":
return self__.namespace_maps;

break;
case "seq-limit":
return self__.seq_limit;

break;
case "print-color":
return self__.print_color;

break;
case "color-markup":
return self__.color_markup;

break;
case "color-scheme":
return self__.color_scheme;

break;
case "print-handlers":
return self__.print_handlers;

break;
case "print-fallback":
return self__.print_fallback;

break;
default:
return cljs.core.get.call(null,self__.__extmap,k2036,else__4388__auto__);

}
});

puget.printer.PrettyPrinter.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4404__auto__,f__4405__auto__,init__4406__auto__){
var self__ = this;
var this__4404__auto____$1 = this;
return cljs.core.reduce.call(null,((function (this__4404__auto____$1){
return (function (ret__4407__auto__,p__2041){
var vec__2042 = p__2041;
var k__4408__auto__ = cljs.core.nth.call(null,vec__2042,(0),null);
var v__4409__auto__ = cljs.core.nth.call(null,vec__2042,(1),null);
return f__4405__auto__.call(null,ret__4407__auto__,k__4408__auto__,v__4409__auto__);
});})(this__4404__auto____$1))
,init__4406__auto__,this__4404__auto____$1);
});

puget.printer.PrettyPrinter.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4399__auto__,writer__4400__auto__,opts__4401__auto__){
var self__ = this;
var this__4399__auto____$1 = this;
var pr_pair__4402__auto__ = ((function (this__4399__auto____$1){
return (function (keyval__4403__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__4400__auto__,cljs.core.pr_writer,""," ","",opts__4401__auto__,keyval__4403__auto__);
});})(this__4399__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__4400__auto__,pr_pair__4402__auto__,"#puget.printer.PrettyPrinter{",", ","}",opts__4401__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"width","width",-384071477),self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),self__.print_meta],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"sort-keys","sort-keys",1311511993),self__.sort_keys],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"map-delimiter","map-delimiter",-671741092),self__.map_delimiter],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"map-coll-separator","map-coll-separator",609661315),self__.map_coll_separator],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"namespace-maps","namespace-maps",-2037027128),self__.namespace_maps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"seq-limit","seq-limit",-1165916492),self__.seq_limit],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-color","print-color",722462614),self__.print_color],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"color-markup","color-markup",266742518),self__.color_markup],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295),self__.color_scheme],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901),self__.print_handlers],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-fallback","print-fallback",-1229211894),self__.print_fallback],null))], null),self__.__extmap));
});

puget.printer.PrettyPrinter.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__2035){
var self__ = this;
var G__2035__$1 = this;
return (new cljs.core.RecordIter((0),G__2035__$1,12,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),new cljs.core.Keyword(null,"sort-keys","sort-keys",1311511993),new cljs.core.Keyword(null,"map-delimiter","map-delimiter",-671741092),new cljs.core.Keyword(null,"map-coll-separator","map-coll-separator",609661315),new cljs.core.Keyword(null,"namespace-maps","namespace-maps",-2037027128),new cljs.core.Keyword(null,"seq-limit","seq-limit",-1165916492),new cljs.core.Keyword(null,"print-color","print-color",722462614),new cljs.core.Keyword(null,"color-markup","color-markup",266742518),new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295),new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901),new cljs.core.Keyword(null,"print-fallback","print-fallback",-1229211894)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator.call(null,self__.__extmap):cljs.core.nil_iter.call(null))));
});

puget.printer.PrettyPrinter.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4383__auto__){
var self__ = this;
var this__4383__auto____$1 = this;
return self__.__meta;
});

puget.printer.PrettyPrinter.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__4380__auto__){
var self__ = this;
var this__4380__auto____$1 = this;
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,self__.__extmap,self__.__hash));
});

puget.printer.PrettyPrinter.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4389__auto__){
var self__ = this;
var this__4389__auto____$1 = this;
return (12 + cljs.core.count.call(null,self__.__extmap));
});

puget.printer.PrettyPrinter.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__4381__auto__){
var self__ = this;
var this__4381__auto____$1 = this;
var h__4243__auto__ = self__.__hash;
if((!((h__4243__auto__ == null)))){
return h__4243__auto__;
} else {
var h__4243__auto____$1 = ((function (h__4243__auto__,this__4381__auto____$1){
return (function (coll__4382__auto__){
return (-1958210883 ^ cljs.core.hash_unordered_coll.call(null,coll__4382__auto__));
});})(h__4243__auto__,this__4381__auto____$1))
.call(null,this__4381__auto____$1);
self__.__hash = h__4243__auto____$1;

return h__4243__auto____$1;
}
});

puget.printer.PrettyPrinter.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this2037,other2038){
var self__ = this;
var this2037__$1 = this;
return (((!((other2038 == null)))) && ((this2037__$1.constructor === other2038.constructor)) && (cljs.core._EQ_.call(null,this2037__$1.width,other2038.width)) && (cljs.core._EQ_.call(null,this2037__$1.print_meta,other2038.print_meta)) && (cljs.core._EQ_.call(null,this2037__$1.sort_keys,other2038.sort_keys)) && (cljs.core._EQ_.call(null,this2037__$1.map_delimiter,other2038.map_delimiter)) && (cljs.core._EQ_.call(null,this2037__$1.map_coll_separator,other2038.map_coll_separator)) && (cljs.core._EQ_.call(null,this2037__$1.namespace_maps,other2038.namespace_maps)) && (cljs.core._EQ_.call(null,this2037__$1.seq_limit,other2038.seq_limit)) && (cljs.core._EQ_.call(null,this2037__$1.print_color,other2038.print_color)) && (cljs.core._EQ_.call(null,this2037__$1.color_markup,other2038.color_markup)) && (cljs.core._EQ_.call(null,this2037__$1.color_scheme,other2038.color_scheme)) && (cljs.core._EQ_.call(null,this2037__$1.print_handlers,other2038.print_handlers)) && (cljs.core._EQ_.call(null,this2037__$1.print_fallback,other2038.print_fallback)) && (cljs.core._EQ_.call(null,this2037__$1.__extmap,other2038.__extmap)));
});

puget.printer.PrettyPrinter.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4394__auto__,k__4395__auto__){
var self__ = this;
var this__4394__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 12, [new cljs.core.Keyword(null,"map-coll-separator","map-coll-separator",609661315),null,new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),null,new cljs.core.Keyword(null,"namespace-maps","namespace-maps",-2037027128),null,new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295),null,new cljs.core.Keyword(null,"print-fallback","print-fallback",-1229211894),null,new cljs.core.Keyword(null,"width","width",-384071477),null,new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901),null,new cljs.core.Keyword(null,"seq-limit","seq-limit",-1165916492),null,new cljs.core.Keyword(null,"color-markup","color-markup",266742518),null,new cljs.core.Keyword(null,"print-color","print-color",722462614),null,new cljs.core.Keyword(null,"sort-keys","sort-keys",1311511993),null,new cljs.core.Keyword(null,"map-delimiter","map-delimiter",-671741092),null], null), null),k__4395__auto__)){
return cljs.core.dissoc.call(null,cljs.core._with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__4394__auto____$1),self__.__meta),k__4395__auto__);
} else {
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__4395__auto__)),null));
}
});

puget.printer.PrettyPrinter.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4392__auto__,k__4393__auto__,G__2035){
var self__ = this;
var this__4392__auto____$1 = this;
var pred__2045 = cljs.core.keyword_identical_QMARK_;
var expr__2046 = k__4393__auto__;
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"width","width",-384071477),expr__2046))){
return (new puget.printer.PrettyPrinter(G__2035,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),expr__2046))){
return (new puget.printer.PrettyPrinter(self__.width,G__2035,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"sort-keys","sort-keys",1311511993),expr__2046))){
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,G__2035,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"map-delimiter","map-delimiter",-671741092),expr__2046))){
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,G__2035,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"map-coll-separator","map-coll-separator",609661315),expr__2046))){
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,G__2035,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"namespace-maps","namespace-maps",-2037027128),expr__2046))){
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,G__2035,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"seq-limit","seq-limit",-1165916492),expr__2046))){
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,G__2035,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"print-color","print-color",722462614),expr__2046))){
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,G__2035,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"color-markup","color-markup",266742518),expr__2046))){
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,G__2035,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295),expr__2046))){
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,G__2035,self__.print_handlers,self__.print_fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901),expr__2046))){
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,G__2035,self__.print_fallback,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__2045.call(null,new cljs.core.Keyword(null,"print-fallback","print-fallback",-1229211894),expr__2046))){
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,G__2035,self__.__meta,self__.__extmap,null));
} else {
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__4393__auto__,G__2035),null));
}
}
}
}
}
}
}
}
}
}
}
}
});

puget.printer.PrettyPrinter.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4397__auto__){
var self__ = this;
var this__4397__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"width","width",-384071477),self__.width,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),self__.print_meta,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"sort-keys","sort-keys",1311511993),self__.sort_keys,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"map-delimiter","map-delimiter",-671741092),self__.map_delimiter,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"map-coll-separator","map-coll-separator",609661315),self__.map_coll_separator,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"namespace-maps","namespace-maps",-2037027128),self__.namespace_maps,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"seq-limit","seq-limit",-1165916492),self__.seq_limit,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"print-color","print-color",722462614),self__.print_color,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"color-markup","color-markup",266742518),self__.color_markup,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295),self__.color_scheme,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901),self__.print_handlers,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"print-fallback","print-fallback",-1229211894),self__.print_fallback,null))], null),self__.__extmap));
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$ = cljs.core.PROTOCOL_SENTINEL;

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_record$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return this$__$1.fipp$visit$IVisitor$visit_tagged$arity$2(null,cljs.core.tagged_literal.call(null,cljs.core.symbol.call(null,puget.printer.get_type_name.call(null,value)),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,value)));
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_meta$arity$3 = (function (this$,metadata,value){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(self__.print_meta)){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"^"),puget.printer.format_doc.call(null,this$__$1,metadata)], null),new cljs.core.Keyword(null,"line","line",212345235),puget.printer.format_doc_STAR_.call(null,this$__$1,value)], null);
} else {
return puget.printer.format_doc_STAR_.call(null,this$__$1,value);
}
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_number$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"number","number",1570378438),cljs.core.pr_str.call(null,value));
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_pattern$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"#"),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"string","string",-1989541586),["\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"\""].join(''))], null);
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_unknown$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
var G__2048 = self__.print_fallback;
var G__2048__$1 = (((G__2048 instanceof cljs.core.Keyword))?G__2048.fqn:null);
switch (G__2048__$1) {
case "pretty":
return puget.printer.format_unknown.call(null,this$__$1,value);

break;
case "print":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),cljs.core.pr_str.call(null,value)], null);

break;
case "error":
throw ["No defined representation for ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(puget.printer.get_type.call(null,value)),": ",cljs.core.pr_str.call(null,value)].join('');

break;
default:
if(cljs.core.ifn_QMARK_.call(null,self__.print_fallback)){
return self__.print_fallback.call(null,this$__$1,value);
} else {
throw ["Unsupported value for print-fallback: ",cljs.core.pr_str.call(null,self__.print_fallback)].join('');
}

}
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_symbol$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"symbol","symbol",-1038572696),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_seq$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
if(cljs.core.seq.call(null,value)){
var vec__2049 = (cljs.core.truth_((function (){var and__4120__auto__ = self__.seq_limit;
if(cljs.core.truth_(and__4120__auto__)){
return (self__.seq_limit > (0));
} else {
return and__4120__auto__;
}
})())?(function (){var head = cljs.core.take.call(null,self__.seq_limit,value);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [head,(self__.seq_limit <= cljs.core.count.call(null,head))], null);
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.seq.call(null,value),false], null));
var values = cljs.core.nth.call(null,vec__2049,(0),null);
var trimmed_QMARK_ = cljs.core.nth.call(null,vec__2049,(1),null);
var elements = (function (){var G__2052 = (((cljs.core.first.call(null,values) instanceof cljs.core.Symbol))?cljs.core.cons.call(null,puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"function-symbol","function-symbol",-1336068270),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,values))),cljs.core.map.call(null,cljs.core.partial.call(null,puget.printer.format_doc,this$__$1),cljs.core.rest.call(null,values))):cljs.core.map.call(null,cljs.core.partial.call(null,puget.printer.format_doc,this$__$1),values));
if(cljs.core.truth_(trimmed_QMARK_)){
return cljs.core.concat.call(null,G__2052,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"nil","nil",99600501),"...")], null));
} else {
return G__2052;
}
})();
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"("),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null,new cljs.core.Keyword(null,"line","line",212345235),elements)], null),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),")")], null);
} else {
return puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"()");
}
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_boolean$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"boolean","boolean",-1919418404),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_tagged$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
var map__2053 = value;
var map__2053__$1 = (((((!((map__2053 == null))))?(((((map__2053.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__2053.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__2053):map__2053);
var tag = cljs.core.get.call(null,map__2053__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223));
var form = cljs.core.get.call(null,map__2053__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223),["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"tag","tag",-1290361223).cljs$core$IFn$_invoke$arity$1(value))].join('')),((cljs.core.coll_QMARK_.call(null,form))?new cljs.core.Keyword(null,"line","line",212345235):" "),puget.printer.format_doc.call(null,this$__$1,new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(value))], null);
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_keyword$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"keyword","keyword",811389747),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_map$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
if(cljs.core.seq.call(null,value)){
var vec__2055 = (cljs.core.truth_(self__.namespace_maps)?puget.printer.common_key_ns.call(null,value):null);
var common_ns = cljs.core.nth.call(null,vec__2055,(0),null);
var stripped = cljs.core.nth.call(null,vec__2055,(1),null);
var kvs = puget.printer.order_collection.call(null,self__.sort_keys,(function (){var or__4131__auto__ = stripped;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return value;
}
})(),cljs.core.partial.call(null,cljs.core.sort_by,cljs.core.first,arrangement.core.rank));
var entries = cljs.core.map.call(null,((function (vec__2055,common_ns,stripped,kvs,this$__$1){
return (function (p__2058){
var vec__2059 = p__2058;
var k = cljs.core.nth.call(null,vec__2059,(0),null);
var v = cljs.core.nth.call(null,vec__2059,(1),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),puget.printer.format_doc.call(null,this$__$1,k),((cljs.core.coll_QMARK_.call(null,v))?self__.map_coll_separator:" "),puget.printer.format_doc.call(null,this$__$1,v)], null);
});})(vec__2055,common_ns,stripped,kvs,this$__$1))
,kvs);
var map_doc = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"{"),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),self__.map_delimiter,new cljs.core.Keyword(null,"line","line",212345235)], null),entries)], null),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"}")], null);
if(cljs.core.truth_(common_ns)){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223),["#:",cljs.core.str.cljs$core$IFn$_invoke$arity$1(common_ns)].join('')),new cljs.core.Keyword(null,"line","line",212345235),map_doc], null);
} else {
return map_doc;
}
} else {
return puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"{}");
}
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_nil$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"nil","nil",99600501),"nil");
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_character$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"character","character",380652989),cljs.core.pr_str.call(null,value));
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_string$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"string","string",-1989541586),cljs.core.pr_str.call(null,value));
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_var$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"#'"),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"symbol","symbol",-1038572696),cljs.core.subs.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),(2)))], null);
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_set$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
if(cljs.core.seq.call(null,value)){
var entries = puget.printer.order_collection.call(null,self__.sort_keys,value,cljs.core.partial.call(null,cljs.core.sort,arrangement.core.rank));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"#{"),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null,new cljs.core.Keyword(null,"line","line",212345235),cljs.core.map.call(null,cljs.core.partial.call(null,puget.printer.format_doc,this$__$1),entries))], null),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"}")], null);
} else {
return puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"#{}");
}
});

puget.printer.PrettyPrinter.prototype.fipp$visit$IVisitor$visit_vector$arity$2 = (function (this$,value){
var self__ = this;
var this$__$1 = this;
if(cljs.core.seq.call(null,value)){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"["),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),cljs.core.interpose.call(null,new cljs.core.Keyword(null,"line","line",212345235),cljs.core.map.call(null,cljs.core.partial.call(null,puget.printer.format_doc,this$__$1),value))], null),puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"]")], null);
} else {
return puget.color.document.call(null,this$__$1,new cljs.core.Keyword(null,"delimiter","delimiter",-1766618000),"[]");
}
});

puget.printer.PrettyPrinter.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4384__auto__,G__2035){
var self__ = this;
var this__4384__auto____$1 = this;
return (new puget.printer.PrettyPrinter(self__.width,self__.print_meta,self__.sort_keys,self__.map_delimiter,self__.map_coll_separator,self__.namespace_maps,self__.seq_limit,self__.print_color,self__.color_markup,self__.color_scheme,self__.print_handlers,self__.print_fallback,G__2035,self__.__extmap,self__.__hash));
});

puget.printer.PrettyPrinter.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4390__auto__,entry__4391__auto__){
var self__ = this;
var this__4390__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__4391__auto__)){
return this__4390__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.call(null,entry__4391__auto__,(0)),cljs.core._nth.call(null,entry__4391__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__4390__auto____$1,entry__4391__auto__);
}
});

puget.printer.PrettyPrinter.getBasis = (function (){
return new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"width","width",1256460050,null),new cljs.core.Symbol(null,"print-meta","print-meta",-1620321171,null),new cljs.core.Symbol(null,"sort-keys","sort-keys",-1342923776,null),new cljs.core.Symbol(null,"map-delimiter","map-delimiter",968790435,null),new cljs.core.Symbol(null,"map-coll-separator","map-coll-separator",-2044774454,null),new cljs.core.Symbol(null,"namespace-maps","namespace-maps",-396495601,null),new cljs.core.Symbol(null,"seq-limit","seq-limit",474615035,null),new cljs.core.Symbol(null,"print-color","print-color",-1931973155,null),new cljs.core.Symbol(null,"color-markup","color-markup",1907274045,null),new cljs.core.Symbol(null,"color-scheme","color-scheme",736689232,null),new cljs.core.Symbol(null,"print-handlers","print-handlers",-127526374,null),new cljs.core.Symbol(null,"print-fallback","print-fallback",411319633,null)], null);
});

puget.printer.PrettyPrinter.cljs$lang$type = true;

puget.printer.PrettyPrinter.cljs$lang$ctorPrSeq = (function (this__4428__auto__){
return (new cljs.core.List(null,"puget.printer/PrettyPrinter",null,(1),null));
});

puget.printer.PrettyPrinter.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"puget.printer/PrettyPrinter");
});

/**
 * Positional factory function for puget.printer/PrettyPrinter.
 */
puget.printer.__GT_PrettyPrinter = (function puget$printer$__GT_PrettyPrinter(width,print_meta,sort_keys,map_delimiter,map_coll_separator,namespace_maps,seq_limit,print_color,color_markup,color_scheme,print_handlers,print_fallback){
return (new puget.printer.PrettyPrinter(width,print_meta,sort_keys,map_delimiter,map_coll_separator,namespace_maps,seq_limit,print_color,color_markup,color_scheme,print_handlers,print_fallback,null,null,null));
});

/**
 * Factory function for puget.printer/PrettyPrinter, taking a map of keywords to field values.
 */
puget.printer.map__GT_PrettyPrinter = (function puget$printer$map__GT_PrettyPrinter(G__2039){
var extmap__4424__auto__ = (function (){var G__2062 = cljs.core.dissoc.call(null,G__2039,new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),new cljs.core.Keyword(null,"sort-keys","sort-keys",1311511993),new cljs.core.Keyword(null,"map-delimiter","map-delimiter",-671741092),new cljs.core.Keyword(null,"map-coll-separator","map-coll-separator",609661315),new cljs.core.Keyword(null,"namespace-maps","namespace-maps",-2037027128),new cljs.core.Keyword(null,"seq-limit","seq-limit",-1165916492),new cljs.core.Keyword(null,"print-color","print-color",722462614),new cljs.core.Keyword(null,"color-markup","color-markup",266742518),new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295),new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901),new cljs.core.Keyword(null,"print-fallback","print-fallback",-1229211894));
if(cljs.core.record_QMARK_.call(null,G__2039)){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,G__2062);
} else {
return G__2062;
}
})();
return (new puget.printer.PrettyPrinter(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(G__2039),new cljs.core.Keyword(null,"print-meta","print-meta",1034114598).cljs$core$IFn$_invoke$arity$1(G__2039),new cljs.core.Keyword(null,"sort-keys","sort-keys",1311511993).cljs$core$IFn$_invoke$arity$1(G__2039),new cljs.core.Keyword(null,"map-delimiter","map-delimiter",-671741092).cljs$core$IFn$_invoke$arity$1(G__2039),new cljs.core.Keyword(null,"map-coll-separator","map-coll-separator",609661315).cljs$core$IFn$_invoke$arity$1(G__2039),new cljs.core.Keyword(null,"namespace-maps","namespace-maps",-2037027128).cljs$core$IFn$_invoke$arity$1(G__2039),new cljs.core.Keyword(null,"seq-limit","seq-limit",-1165916492).cljs$core$IFn$_invoke$arity$1(G__2039),new cljs.core.Keyword(null,"print-color","print-color",722462614).cljs$core$IFn$_invoke$arity$1(G__2039),new cljs.core.Keyword(null,"color-markup","color-markup",266742518).cljs$core$IFn$_invoke$arity$1(G__2039),new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295).cljs$core$IFn$_invoke$arity$1(G__2039),new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901).cljs$core$IFn$_invoke$arity$1(G__2039),new cljs.core.Keyword(null,"print-fallback","print-fallback",-1229211894).cljs$core$IFn$_invoke$arity$1(G__2039),null,cljs.core.not_empty.call(null,extmap__4424__auto__),null));
});

/**
 * Constructs a new printer from the given configuration.
 */
puget.printer.pretty_printer = (function puget$printer$pretty_printer(opts){
return puget.printer.map__GT_PrettyPrinter.call(null,cljs.core.reduce.call(null,puget.printer.merge_options,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),cljs.core._STAR_print_meta_STAR_,new cljs.core.Keyword(null,"print-handlers","print-handlers",-1768057901),puget.printer.common_handlers], null),puget.printer._STAR_options_STAR_,opts], null)));
});
/**
 * Prints a value using the given printer.
 */
puget.printer.render_out = (function puget$printer$render_out(printer,value){
var _STAR_print_meta_STAR__orig_val__2065 = cljs.core._STAR_print_meta_STAR_;
var _STAR_print_meta_STAR__temp_val__2066 = false;
cljs.core._STAR_print_meta_STAR_ = _STAR_print_meta_STAR__temp_val__2066;

try{return fipp.engine.pprint_document.call(null,puget.printer.format_doc.call(null,printer,value),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(printer)], null));
}finally {cljs.core._STAR_print_meta_STAR_ = _STAR_print_meta_STAR__orig_val__2065;
}});
/**
 * Renders a value to a string using the given printer.
 */
puget.printer.render_str = (function puget$printer$render_str(printer,value){
return clojure.string.trim_newline.call(null,(function (){var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__2067_2071 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__2068_2072 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__2069_2073 = true;
var _STAR_print_fn_STAR__temp_val__2070_2074 = ((function (_STAR_print_newline_STAR__orig_val__2067_2071,_STAR_print_fn_STAR__orig_val__2068_2072,_STAR_print_newline_STAR__temp_val__2069_2073,sb__4661__auto__){
return (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});})(_STAR_print_newline_STAR__orig_val__2067_2071,_STAR_print_fn_STAR__orig_val__2068_2072,_STAR_print_newline_STAR__temp_val__2069_2073,sb__4661__auto__))
;
cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__2069_2073;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__2070_2074;

try{puget.printer.render_out.call(null,printer,value);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__2068_2072;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__2067_2071;
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
})());
});
/**
 * Pretty-prints a value to *out*. Options may be passed to override the
 *   default *options* map.
 */
puget.printer.pprint = (function puget$printer$pprint(var_args){
var G__2076 = arguments.length;
switch (G__2076) {
case 1:
return puget.printer.pprint.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return puget.printer.pprint.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

puget.printer.pprint.cljs$core$IFn$_invoke$arity$1 = (function (value){
return puget.printer.pprint.call(null,value,null);
});

puget.printer.pprint.cljs$core$IFn$_invoke$arity$2 = (function (value,opts){
return puget.printer.render_out.call(null,puget.printer.pretty_printer.call(null,opts),value);
});

puget.printer.pprint.cljs$lang$maxFixedArity = 2;

/**
 * Pretty-print a value to a string.
 */
puget.printer.pprint_str = (function puget$printer$pprint_str(var_args){
var G__2079 = arguments.length;
switch (G__2079) {
case 1:
return puget.printer.pprint_str.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return puget.printer.pprint_str.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

puget.printer.pprint_str.cljs$core$IFn$_invoke$arity$1 = (function (value){
return puget.printer.pprint_str.call(null,value,null);
});

puget.printer.pprint_str.cljs$core$IFn$_invoke$arity$2 = (function (value,opts){
return puget.printer.render_str.call(null,puget.printer.pretty_printer.call(null,opts),value);
});

puget.printer.pprint_str.cljs$lang$maxFixedArity = 2;

/**
 * Like pprint, but turns on colored output.
 */
puget.printer.cprint = (function puget$printer$cprint(var_args){
var G__2082 = arguments.length;
switch (G__2082) {
case 1:
return puget.printer.cprint.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return puget.printer.cprint.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

puget.printer.cprint.cljs$core$IFn$_invoke$arity$1 = (function (value){
return puget.printer.cprint.call(null,value,null);
});

puget.printer.cprint.cljs$core$IFn$_invoke$arity$2 = (function (value,opts){
return puget.printer.pprint.call(null,value,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"print-color","print-color",722462614),true));
});

puget.printer.cprint.cljs$lang$maxFixedArity = 2;

/**
 * Pretty-prints a value to a colored string.
 */
puget.printer.cprint_str = (function puget$printer$cprint_str(var_args){
var G__2085 = arguments.length;
switch (G__2085) {
case 1:
return puget.printer.cprint_str.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return puget.printer.cprint_str.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

puget.printer.cprint_str.cljs$core$IFn$_invoke$arity$1 = (function (value){
return puget.printer.cprint_str.call(null,value,null);
});

puget.printer.cprint_str.cljs$core$IFn$_invoke$arity$2 = (function (value,opts){
return puget.printer.pprint_str.call(null,value,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"print-color","print-color",722462614),true));
});

puget.printer.cprint_str.cljs$lang$maxFixedArity = 2;


//# sourceMappingURL=printer.js.map
