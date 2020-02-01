// Compiled by ClojureScript 1.10.520 {:target :nodejs}
goog.provide('puget.color.ansi');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('puget.color');
/**
 * Map of symbols to numeric SGR (select graphic rendition) codes.
 */
puget.color.ansi.sgr_code = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"bold","bold",-116809535),new cljs.core.Keyword(null,"blink","blink",-271985917),new cljs.core.Keyword(null,"white","white",-483998618),new cljs.core.Keyword(null,"yellow","yellow",-881035449),new cljs.core.Keyword(null,"bg-red","bg-red",-1645498040),new cljs.core.Keyword(null,"bg-cyan","bg-cyan",-1582237015),new cljs.core.Keyword(null,"green","green",-945526839),new cljs.core.Keyword(null,"bg-green","bg-green",-138353590),new cljs.core.Keyword(null,"fg-reset","fg-reset",1908873578),new cljs.core.Keyword(null,"cyan","cyan",1118839274),new cljs.core.Keyword(null,"bg-black","bg-black",2110303851),new cljs.core.Keyword(null,"fg-256","fg-256",-255017013),new cljs.core.Keyword(null,"underline","underline",2018066703),new cljs.core.Keyword(null,"bg-magenta","bg-magenta",2073641232),new cljs.core.Keyword(null,"strike","strike",-1173815471),new cljs.core.Keyword(null,"bg-yellow","bg-yellow",-1293468429),new cljs.core.Keyword(null,"hidden","hidden",-312506092),new cljs.core.Keyword(null,"red","red",-969428204),new cljs.core.Keyword(null,"blue","blue",-622100620),new cljs.core.Keyword(null,"bg-white","bg-white",-1453241673),new cljs.core.Keyword(null,"bg-256","bg-256",1097886744),new cljs.core.Keyword(null,"magenta","magenta",1687937081),new cljs.core.Keyword(null,"bg-blue","bg-blue",-1747478308),new cljs.core.Keyword(null,"bg-reset","bg-reset",857739453),new cljs.core.Keyword(null,"none","none",1333468478),new cljs.core.Keyword(null,"reverse","reverse",-888455266),new cljs.core.Keyword(null,"black","black",1294279647)],[(1),(5),(37),(33),(41),(46),(32),(42),(39),(36),(40),(38),(3),(45),(9),(43),(8),(31),(34),(47),(48),(35),(44),(49),(0),(7),(30)]);
/**
 * Returns an ANSI escope string which will apply the given collection of SGR
 *   codes.
 */
puget.color.ansi.esc = (function puget$color$ansi$esc(codes){
var codes__$1 = cljs.core.map.call(null,puget.color.ansi.sgr_code,codes,codes);
var codes__$2 = clojure.string.join.call(null,";",codes__$1);
return ["\u001B","[",cljs.core.str.cljs$core$IFn$_invoke$arity$1(codes__$2),"m"].join('');
});
/**
 * Returns an ANSI escope string which will enact the given SGR codes.
 */
puget.color.ansi.escape = (function puget$color$ansi$escape(var_args){
var args__4736__auto__ = [];
var len__4730__auto___1311 = arguments.length;
var i__4731__auto___1312 = (0);
while(true){
if((i__4731__auto___1312 < len__4730__auto___1311)){
args__4736__auto__.push((arguments[i__4731__auto___1312]));

var G__1313 = (i__4731__auto___1312 + (1));
i__4731__auto___1312 = G__1313;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return puget.color.ansi.escape.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

puget.color.ansi.escape.cljs$core$IFn$_invoke$arity$variadic = (function (codes){
return puget.color.ansi.esc.call(null,codes);
});

puget.color.ansi.escape.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
puget.color.ansi.escape.cljs$lang$applyTo = (function (seq1310){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq1310));
});

/**
 * Wraps the given string with SGR escapes to apply the given codes, then reset
 *   the graphics.
 */
puget.color.ansi.sgr = (function puget$color$ansi$sgr(var_args){
var args__4736__auto__ = [];
var len__4730__auto___1316 = arguments.length;
var i__4731__auto___1317 = (0);
while(true){
if((i__4731__auto___1317 < len__4730__auto___1316)){
args__4736__auto__.push((arguments[i__4731__auto___1317]));

var G__1318 = (i__4731__auto___1317 + (1));
i__4731__auto___1317 = G__1318;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return puget.color.ansi.sgr.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});

puget.color.ansi.sgr.cljs$core$IFn$_invoke$arity$variadic = (function (string,codes){
return [puget.color.ansi.esc.call(null,codes),cljs.core.str.cljs$core$IFn$_invoke$arity$1(string),puget.color.ansi.escape.call(null,new cljs.core.Keyword(null,"none","none",1333468478))].join('');
});

puget.color.ansi.sgr.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
puget.color.ansi.sgr.cljs$lang$applyTo = (function (seq1314){
var G__1315 = cljs.core.first.call(null,seq1314);
var seq1314__$1 = cljs.core.next.call(null,seq1314);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__1315,seq1314__$1);
});

/**
 * Removes color codes from the given string.
 */
puget.color.ansi.strip = (function puget$color$ansi$strip(string){
return clojure.string.replace.call(null,string,/\u001b\[[0-9;]*[mK]/,"");
});
cljs.core._add_method.call(null,puget.color.document,new cljs.core.Keyword(null,"ansi","ansi",1415977390),(function (options,element,document){
var temp__5718__auto__ = cljs.core.seq.call(null,cljs.core.get.call(null,new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295).cljs$core$IFn$_invoke$arity$1(options),element));
if(temp__5718__auto__){
var codes = temp__5718__auto__;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pass","pass",1574159993),puget.color.ansi.esc.call(null,codes)], null),document,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pass","pass",1574159993),puget.color.ansi.escape.call(null,new cljs.core.Keyword(null,"none","none",1333468478))], null)], null);
} else {
return document;
}
}));
cljs.core._add_method.call(null,puget.color.text,new cljs.core.Keyword(null,"ansi","ansi",1415977390),(function (options,element,text){
var temp__5718__auto__ = cljs.core.seq.call(null,cljs.core.get.call(null,new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295).cljs$core$IFn$_invoke$arity$1(options),element));
if(temp__5718__auto__){
var codes = temp__5718__auto__;
return [puget.color.ansi.esc.call(null,codes),cljs.core.str.cljs$core$IFn$_invoke$arity$1(text),puget.color.ansi.escape.call(null,new cljs.core.Keyword(null,"none","none",1333468478))].join('');
} else {
return text;
}
}));

//# sourceMappingURL=ansi.js.map
