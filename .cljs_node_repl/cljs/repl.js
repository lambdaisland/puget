// Compiled by ClojureScript 1.10.520 {:target :nodejs}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('goog.string');
goog.require('goog.string.format');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__4010){
var map__4011 = p__4010;
var map__4011__$1 = (((((!((map__4011 == null))))?(((((map__4011.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__4011.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4011):map__4011);
var m = map__4011__$1;
var n = cljs.core.get.call(null,map__4011__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__4011__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,(function (){var or__4131__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return [(function (){var temp__5720__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5720__auto__)){
var ns = temp__5720__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})());

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__4013_4045 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__4014_4046 = null;
var count__4015_4047 = (0);
var i__4016_4048 = (0);
while(true){
if((i__4016_4048 < count__4015_4047)){
var f_4049 = cljs.core._nth.call(null,chunk__4014_4046,i__4016_4048);
cljs.core.println.call(null,"  ",f_4049);


var G__4050 = seq__4013_4045;
var G__4051 = chunk__4014_4046;
var G__4052 = count__4015_4047;
var G__4053 = (i__4016_4048 + (1));
seq__4013_4045 = G__4050;
chunk__4014_4046 = G__4051;
count__4015_4047 = G__4052;
i__4016_4048 = G__4053;
continue;
} else {
var temp__5720__auto___4054 = cljs.core.seq.call(null,seq__4013_4045);
if(temp__5720__auto___4054){
var seq__4013_4055__$1 = temp__5720__auto___4054;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4013_4055__$1)){
var c__4550__auto___4056 = cljs.core.chunk_first.call(null,seq__4013_4055__$1);
var G__4057 = cljs.core.chunk_rest.call(null,seq__4013_4055__$1);
var G__4058 = c__4550__auto___4056;
var G__4059 = cljs.core.count.call(null,c__4550__auto___4056);
var G__4060 = (0);
seq__4013_4045 = G__4057;
chunk__4014_4046 = G__4058;
count__4015_4047 = G__4059;
i__4016_4048 = G__4060;
continue;
} else {
var f_4061 = cljs.core.first.call(null,seq__4013_4055__$1);
cljs.core.println.call(null,"  ",f_4061);


var G__4062 = cljs.core.next.call(null,seq__4013_4055__$1);
var G__4063 = null;
var G__4064 = (0);
var G__4065 = (0);
seq__4013_4045 = G__4062;
chunk__4014_4046 = G__4063;
count__4015_4047 = G__4064;
i__4016_4048 = G__4065;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_4066 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__4131__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_4066);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_4066)))?cljs.core.second.call(null,arglists_4066):arglists_4066));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Spec");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__4017_4067 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__4018_4068 = null;
var count__4019_4069 = (0);
var i__4020_4070 = (0);
while(true){
if((i__4020_4070 < count__4019_4069)){
var vec__4031_4071 = cljs.core._nth.call(null,chunk__4018_4068,i__4020_4070);
var name_4072 = cljs.core.nth.call(null,vec__4031_4071,(0),null);
var map__4034_4073 = cljs.core.nth.call(null,vec__4031_4071,(1),null);
var map__4034_4074__$1 = (((((!((map__4034_4073 == null))))?(((((map__4034_4073.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__4034_4073.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4034_4073):map__4034_4073);
var doc_4075 = cljs.core.get.call(null,map__4034_4074__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_4076 = cljs.core.get.call(null,map__4034_4074__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_4072);

cljs.core.println.call(null," ",arglists_4076);

if(cljs.core.truth_(doc_4075)){
cljs.core.println.call(null," ",doc_4075);
} else {
}


var G__4077 = seq__4017_4067;
var G__4078 = chunk__4018_4068;
var G__4079 = count__4019_4069;
var G__4080 = (i__4020_4070 + (1));
seq__4017_4067 = G__4077;
chunk__4018_4068 = G__4078;
count__4019_4069 = G__4079;
i__4020_4070 = G__4080;
continue;
} else {
var temp__5720__auto___4081 = cljs.core.seq.call(null,seq__4017_4067);
if(temp__5720__auto___4081){
var seq__4017_4082__$1 = temp__5720__auto___4081;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4017_4082__$1)){
var c__4550__auto___4083 = cljs.core.chunk_first.call(null,seq__4017_4082__$1);
var G__4084 = cljs.core.chunk_rest.call(null,seq__4017_4082__$1);
var G__4085 = c__4550__auto___4083;
var G__4086 = cljs.core.count.call(null,c__4550__auto___4083);
var G__4087 = (0);
seq__4017_4067 = G__4084;
chunk__4018_4068 = G__4085;
count__4019_4069 = G__4086;
i__4020_4070 = G__4087;
continue;
} else {
var vec__4036_4088 = cljs.core.first.call(null,seq__4017_4082__$1);
var name_4089 = cljs.core.nth.call(null,vec__4036_4088,(0),null);
var map__4039_4090 = cljs.core.nth.call(null,vec__4036_4088,(1),null);
var map__4039_4091__$1 = (((((!((map__4039_4090 == null))))?(((((map__4039_4090.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__4039_4090.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4039_4090):map__4039_4090);
var doc_4092 = cljs.core.get.call(null,map__4039_4091__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_4093 = cljs.core.get.call(null,map__4039_4091__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_4089);

cljs.core.println.call(null," ",arglists_4093);

if(cljs.core.truth_(doc_4092)){
cljs.core.println.call(null," ",doc_4092);
} else {
}


var G__4094 = cljs.core.next.call(null,seq__4017_4082__$1);
var G__4095 = null;
var G__4096 = (0);
var G__4097 = (0);
seq__4017_4067 = G__4094;
chunk__4018_4068 = G__4095;
count__4019_4069 = G__4096;
i__4020_4070 = G__4097;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5720__auto__ = cljs.spec.alpha.get_spec.call(null,cljs.core.symbol.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name.call(null,n)),cljs.core.name.call(null,nm)));
if(cljs.core.truth_(temp__5720__auto__)){
var fnspec = temp__5720__auto__;
cljs.core.print.call(null,"Spec");

var seq__4041 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__4042 = null;
var count__4043 = (0);
var i__4044 = (0);
while(true){
if((i__4044 < count__4043)){
var role = cljs.core._nth.call(null,chunk__4042,i__4044);
var temp__5720__auto___4098__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5720__auto___4098__$1)){
var spec_4099 = temp__5720__auto___4098__$1;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_4099));
} else {
}


var G__4100 = seq__4041;
var G__4101 = chunk__4042;
var G__4102 = count__4043;
var G__4103 = (i__4044 + (1));
seq__4041 = G__4100;
chunk__4042 = G__4101;
count__4043 = G__4102;
i__4044 = G__4103;
continue;
} else {
var temp__5720__auto____$1 = cljs.core.seq.call(null,seq__4041);
if(temp__5720__auto____$1){
var seq__4041__$1 = temp__5720__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4041__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__4041__$1);
var G__4104 = cljs.core.chunk_rest.call(null,seq__4041__$1);
var G__4105 = c__4550__auto__;
var G__4106 = cljs.core.count.call(null,c__4550__auto__);
var G__4107 = (0);
seq__4041 = G__4104;
chunk__4042 = G__4105;
count__4043 = G__4106;
i__4044 = G__4107;
continue;
} else {
var role = cljs.core.first.call(null,seq__4041__$1);
var temp__5720__auto___4108__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5720__auto___4108__$2)){
var spec_4109 = temp__5720__auto___4108__$2;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_4109));
} else {
}


var G__4110 = cljs.core.next.call(null,seq__4041__$1);
var G__4111 = null;
var G__4112 = (0);
var G__4113 = (0);
seq__4041 = G__4110;
chunk__4042 = G__4111;
count__4043 = G__4112;
i__4044 = G__4113;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol(null,"ExceptionInfo","ExceptionInfo",294935087,null):(((t instanceof EvalError))?new cljs.core.Symbol("js","EvalError","js/EvalError",1793498501,null):(((t instanceof RangeError))?new cljs.core.Symbol("js","RangeError","js/RangeError",1703848089,null):(((t instanceof ReferenceError))?new cljs.core.Symbol("js","ReferenceError","js/ReferenceError",-198403224,null):(((t instanceof SyntaxError))?new cljs.core.Symbol("js","SyntaxError","js/SyntaxError",-1527651665,null):(((t instanceof URIError))?new cljs.core.Symbol("js","URIError","js/URIError",505061350,null):(((t instanceof Error))?new cljs.core.Symbol("js","Error","js/Error",-1692659266,null):null
)))))))], null),(function (){var temp__5720__auto__ = cljs.core.ex_message.call(null,t);
if(cljs.core.truth_(temp__5720__auto__)){
var msg = temp__5720__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5720__auto__ = cljs.core.ex_data.call(null,t);
if(cljs.core.truth_(temp__5720__auto__)){
var ed = temp__5720__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})());
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__4114 = cljs.core.conj.call(null,via,t);
var G__4115 = cljs.core.ex_cause.call(null,t);
via = G__4114;
t = G__4115;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek.call(null,via);
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec.call(null,cljs.core.map.call(null,base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5720__auto__ = cljs.core.ex_message.call(null,root);
if(cljs.core.truth_(temp__5720__auto__)){
var root_msg = temp__5720__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5720__auto__ = cljs.core.ex_data.call(null,root);
if(cljs.core.truth_(temp__5720__auto__)){
var data = temp__5720__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5720__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data.call(null,o));
if(cljs.core.truth_(temp__5720__auto__)){
var phase = temp__5720__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})());
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__4118 = datafied_throwable;
var map__4118__$1 = (((((!((map__4118 == null))))?(((((map__4118.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__4118.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4118):map__4118);
var via = cljs.core.get.call(null,map__4118__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.call(null,map__4118__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.call(null,map__4118__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__4119 = cljs.core.last.call(null,via);
var map__4119__$1 = (((((!((map__4119 == null))))?(((((map__4119.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__4119.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4119):map__4119);
var type = cljs.core.get.call(null,map__4119__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.call(null,map__4119__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.call(null,map__4119__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__4120 = data;
var map__4120__$1 = (((((!((map__4120 == null))))?(((((map__4120.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__4120.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4120):map__4120);
var problems = cljs.core.get.call(null,map__4120__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.call(null,map__4120__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.call(null,map__4120__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__4121 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,via));
var map__4121__$1 = (((((!((map__4121 == null))))?(((((map__4121.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__4121.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4121):map__4121);
var top_data = map__4121__$1;
var source = cljs.core.get.call(null,map__4121__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.call(null,(function (){var G__4126 = phase;
var G__4126__$1 = (((G__4126 instanceof cljs.core.Keyword))?G__4126.fqn:null);
switch (G__4126__$1) {
case "read-source":
var map__4127 = data;
var map__4127__$1 = (((((!((map__4127 == null))))?(((((map__4127.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__4127.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4127):map__4127);
var line = cljs.core.get.call(null,map__4127__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__4127__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__4129 = cljs.core.merge.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,via)),top_data);
var G__4129__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__4129,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__4129);
var G__4129__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__4129__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__4129__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__4129__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__4129__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__4130 = top_data;
var G__4130__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__4130,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__4130);
var G__4130__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__4130__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__4130__$1);
var G__4130__$3 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__4130__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__4130__$2);
var G__4130__$4 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__4130__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__4130__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__4130__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__4130__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__4131 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__4131,(0),null);
var method = cljs.core.nth.call(null,vec__4131,(1),null);
var file = cljs.core.nth.call(null,vec__4131,(2),null);
var line = cljs.core.nth.call(null,vec__4131,(3),null);
var G__4134 = top_data;
var G__4134__$1 = (cljs.core.truth_(line)?cljs.core.assoc.call(null,G__4134,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__4134);
var G__4134__$2 = (cljs.core.truth_(file)?cljs.core.assoc.call(null,G__4134__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__4134__$1);
var G__4134__$3 = (cljs.core.truth_((function (){var and__4120__auto__ = source__$1;
if(cljs.core.truth_(and__4120__auto__)){
return method;
} else {
return and__4120__auto__;
}
})())?cljs.core.assoc.call(null,G__4134__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__4134__$2);
var G__4134__$4 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__4134__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__4134__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__4134__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__4134__$4;
}

break;
case "execution":
var vec__4135 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__4135,(0),null);
var method = cljs.core.nth.call(null,vec__4135,(1),null);
var file = cljs.core.nth.call(null,vec__4135,(2),null);
var line = cljs.core.nth.call(null,vec__4135,(3),null);
var file__$1 = cljs.core.first.call(null,cljs.core.remove.call(null,((function (vec__4135,source__$1,method,file,line,G__4126,G__4126__$1,map__4118,map__4118__$1,via,trace,phase,map__4119,map__4119__$1,type,message,data,map__4120,map__4120__$1,problems,fn,caller,map__4121,map__4121__$1,top_data,source){
return (function (p1__4117_SHARP_){
var or__4131__auto__ = (p1__4117_SHARP_ == null);
if(or__4131__auto__){
return or__4131__auto__;
} else {
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,p1__4117_SHARP_);
}
});})(vec__4135,source__$1,method,file,line,G__4126,G__4126__$1,map__4118,map__4118__$1,via,trace,phase,map__4119,map__4119__$1,type,message,data,map__4120,map__4120__$1,problems,fn,caller,map__4121,map__4121__$1,top_data,source))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__4131__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return line;
}
})();
var G__4138 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__4138__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.call(null,G__4138,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__4138);
var G__4138__$2 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__4138__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__4138__$1);
var G__4138__$3 = (cljs.core.truth_((function (){var or__4131__auto__ = fn;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var and__4120__auto__ = source__$1;
if(cljs.core.truth_(and__4120__auto__)){
return method;
} else {
return and__4120__auto__;
}
}
})())?cljs.core.assoc.call(null,G__4138__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__4131__auto__ = fn;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__4138__$2);
var G__4138__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.call(null,G__4138__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__4138__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__4138__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__4138__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__4126__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__4142){
var map__4143 = p__4142;
var map__4143__$1 = (((((!((map__4143 == null))))?(((((map__4143.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__4143.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4143):map__4143);
var triage_data = map__4143__$1;
var phase = cljs.core.get.call(null,map__4143__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.call(null,map__4143__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.call(null,map__4143__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__4143__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.call(null,map__4143__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.call(null,map__4143__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.call(null,map__4143__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.call(null,map__4143__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4131__auto__ = source;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4131__auto__ = line;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name.call(null,(function (){var or__4131__auto__ = class$;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__4145 = phase;
var G__4145__$1 = (((G__4145 instanceof cljs.core.Keyword))?G__4145.fqn:null);
switch (G__4145__$1) {
case "read-source":
return format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause);

break;
case "macro-syntax-check":
return format.call(null,"Syntax error macroexpanding %sat (%s).\n%s",(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,(cljs.core.truth_(spec)?(function (){var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__4146_4155 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__4147_4156 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__4148_4157 = true;
var _STAR_print_fn_STAR__temp_val__4149_4158 = ((function (_STAR_print_newline_STAR__orig_val__4146_4155,_STAR_print_fn_STAR__orig_val__4147_4156,_STAR_print_newline_STAR__temp_val__4148_4157,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});})(_STAR_print_newline_STAR__orig_val__4146_4155,_STAR_print_fn_STAR__orig_val__4147_4156,_STAR_print_newline_STAR__temp_val__4148_4157,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
;
cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__4148_4157;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__4149_4158;

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),((function (_STAR_print_newline_STAR__orig_val__4146_4155,_STAR_print_fn_STAR__orig_val__4147_4156,_STAR_print_newline_STAR__temp_val__4148_4157,_STAR_print_fn_STAR__temp_val__4149_4158,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (probs){
return cljs.core.map.call(null,((function (_STAR_print_newline_STAR__orig_val__4146_4155,_STAR_print_fn_STAR__orig_val__4147_4156,_STAR_print_newline_STAR__temp_val__4148_4157,_STAR_print_fn_STAR__temp_val__4149_4158,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (p1__4140_SHARP_){
return cljs.core.dissoc.call(null,p1__4140_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
});})(_STAR_print_newline_STAR__orig_val__4146_4155,_STAR_print_fn_STAR__orig_val__4147_4156,_STAR_print_newline_STAR__temp_val__4148_4157,_STAR_print_fn_STAR__temp_val__4149_4158,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
,probs);
});})(_STAR_print_newline_STAR__orig_val__4146_4155,_STAR_print_fn_STAR__orig_val__4147_4156,_STAR_print_newline_STAR__temp_val__4148_4157,_STAR_print_fn_STAR__temp_val__4149_4158,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
)
);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__4147_4156;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__4146_4155;
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
})():format.call(null,"%s\n",cause)));

break;
case "macroexpansion":
return format.call(null,"Unexpected error%s macroexpanding %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compile-syntax-check":
return format.call(null,"Syntax error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compilation":
return format.call(null,"Unexpected error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "read-eval-result":
return format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "print-eval-result":
return format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "execution":
if(cljs.core.truth_(spec)){
return format.call(null,"Execution error - invalid arguments to %s at (%s).\n%s",symbol,loc,(function (){var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__4150_4159 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__4151_4160 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__4152_4161 = true;
var _STAR_print_fn_STAR__temp_val__4153_4162 = ((function (_STAR_print_newline_STAR__orig_val__4150_4159,_STAR_print_fn_STAR__orig_val__4151_4160,_STAR_print_newline_STAR__temp_val__4152_4161,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});})(_STAR_print_newline_STAR__orig_val__4150_4159,_STAR_print_fn_STAR__orig_val__4151_4160,_STAR_print_newline_STAR__temp_val__4152_4161,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
;
cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__4152_4161;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__4153_4162;

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),((function (_STAR_print_newline_STAR__orig_val__4150_4159,_STAR_print_fn_STAR__orig_val__4151_4160,_STAR_print_newline_STAR__temp_val__4152_4161,_STAR_print_fn_STAR__temp_val__4153_4162,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (probs){
return cljs.core.map.call(null,((function (_STAR_print_newline_STAR__orig_val__4150_4159,_STAR_print_fn_STAR__orig_val__4151_4160,_STAR_print_newline_STAR__temp_val__4152_4161,_STAR_print_fn_STAR__temp_val__4153_4162,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (p1__4141_SHARP_){
return cljs.core.dissoc.call(null,p1__4141_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
});})(_STAR_print_newline_STAR__orig_val__4150_4159,_STAR_print_fn_STAR__orig_val__4151_4160,_STAR_print_newline_STAR__temp_val__4152_4161,_STAR_print_fn_STAR__temp_val__4153_4162,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
,probs);
});})(_STAR_print_newline_STAR__orig_val__4150_4159,_STAR_print_fn_STAR__orig_val__4151_4160,_STAR_print_newline_STAR__temp_val__4152_4161,_STAR_print_fn_STAR__temp_val__4153_4162,sb__4661__auto__,G__4145,G__4145__$1,loc,class_name,simple_class,cause_type,format,map__4143,map__4143__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
)
);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__4151_4160;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__4150_4159;
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
})());
} else {
return format.call(null,"Execution error%s at %s(%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__4145__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str.call(null,cljs.repl.ex_triage.call(null,cljs.repl.Error__GT_map.call(null,error)));
});

//# sourceMappingURL=repl.js.map
