// Compiled by ClojureScript 1.10.520 {:target :nodejs}
goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.tools.reader');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('cljs.source_map');
goog.require('goog.string.StringBuffer');
cljs.compiler.js_reserved = cljs.analyzer.js_reserved;
cljs.compiler.es5_GT__EQ_ = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.call(null,cljs.core.mapcat.call(null,(function (lang){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lang,cljs.core.keyword.call(null,clojure.string.replace.call(null,cljs.core.name.call(null,lang),/^ecmascript/,"es"))], null);
}))),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ecmascript5","ecmascript5",342717552),new cljs.core.Keyword(null,"ecmascript5-strict","ecmascript5-strict",888234811),new cljs.core.Keyword(null,"ecmascript6","ecmascript6",723864898),new cljs.core.Keyword(null,"ecmascript6-strict","ecmascript6-strict",-786049555),new cljs.core.Keyword(null,"ecmascript-2015","ecmascript-2015",-902254444),new cljs.core.Keyword(null,"ecmascript6-typed","ecmascript6-typed",-1978203054),new cljs.core.Keyword(null,"ecmascript-2016","ecmascript-2016",471574729),new cljs.core.Keyword(null,"ecmascript-2017","ecmascript-2017",620145058),new cljs.core.Keyword(null,"ecmascript-next","ecmascript-next",-1935155962)], null));
cljs.compiler._STAR_recompiled_STAR_ = null;
cljs.compiler._STAR_inputs_STAR_ = null;
cljs.compiler._STAR_source_map_data_STAR_ = null;
cljs.compiler._STAR_source_map_data_gen_col_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["deps.cljs",null], null), null);
/**
 * Gets the part up to the first `.` of a namespace.
 * Returns the empty string for nil.
 * Returns the entire string if no `.` in namespace
 */
cljs.compiler.get_first_ns_segment = (function cljs$compiler$get_first_ns_segment(ns){
var ns__$1 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
var idx = ns__$1.indexOf(".");
if(((-1) === idx)){
return ns__$1;
} else {
return cljs.core.subs.call(null,ns__$1,(0),idx);
}
});
cljs.compiler.find_ns_starts_with = (function cljs$compiler$find_ns_starts_with(needle){
return cljs.core.reduce_kv.call(null,(function (xs,ns,_){
if(cljs.core._EQ_.call(null,needle,cljs.compiler.get_first_ns_segment.call(null,ns))){
return cljs.core.reduced.call(null,needle);
} else {
return null;
}
}),null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
});
cljs.compiler.shadow_depth = (function cljs$compiler$shadow_depth(s){
var map__5817 = s;
var map__5817__$1 = (((((!((map__5817 == null))))?(((((map__5817.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5817.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5817):map__5817);
var name = cljs.core.get.call(null,map__5817__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__5817__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var d = (0);
var G__5820 = info;
var map__5821 = G__5820;
var map__5821__$1 = (((((!((map__5821 == null))))?(((((map__5821.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5821.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5821):map__5821);
var shadow = cljs.core.get.call(null,map__5821__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
var d__$1 = d;
var G__5820__$1 = G__5820;
while(true){
var d__$2 = d__$1;
var map__5825 = G__5820__$1;
var map__5825__$1 = (((((!((map__5825 == null))))?(((((map__5825.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5825.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5825):map__5825);
var shadow__$1 = cljs.core.get.call(null,map__5825__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
if(cljs.core.truth_(shadow__$1)){
var G__5827 = (d__$2 + (1));
var G__5828 = shadow__$1;
d__$1 = G__5827;
G__5820__$1 = G__5828;
continue;
} else {
if(cljs.core.truth_(cljs.compiler.find_ns_starts_with.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)))){
return (d__$2 + (1));
} else {
return d__$2;

}
}
break;
}
});
cljs.compiler.hash_scope = (function cljs$compiler$hash_scope(s){
return cljs.core.hash_combine.call(null,cljs.core._hash.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(s)),cljs.compiler.shadow_depth.call(null,s));
});
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__5829){
var map__5830 = p__5829;
var map__5830__$1 = (((((!((map__5830 == null))))?(((((map__5830.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5830.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5830):map__5830);
var name_var = map__5830__$1;
var name = cljs.core.get.call(null,map__5830__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__5830__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var name__$1 = clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"..","_DOT__DOT_");
var map__5832 = info;
var map__5832__$1 = (((((!((map__5832 == null))))?(((((map__5832.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5832.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5832):map__5832);
var ns = cljs.core.get.call(null,map__5832__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var fn_scope = cljs.core.get.call(null,map__5832__$1,new cljs.core.Keyword(null,"fn-scope","fn-scope",-865664859));
var scoped_name = cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null,"_$_",cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core.str,new cljs.core.Keyword(null,"name","name",1843675177)),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.call(null,cljs.compiler.munge.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),".","$")),"$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(scoped_name)].join('')));
});
cljs.compiler.munge_reserved = (function cljs$compiler$munge_reserved(reserved){
return (function (s){
if((!((cljs.core.get.call(null,reserved,s) == null)))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"$"].join('');
} else {
return s;
}
});
});
cljs.compiler.munge = (function cljs$compiler$munge(var_args){
var G__5835 = arguments.length;
switch (G__5835) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.call(null,s,cljs.compiler.js_reserved);
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
if(cljs.analyzer.cljs_map_QMARK_.call(null,s)){
var name_var = s;
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(name_var);
var field = new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(name_var);
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(name_var);
if((!((new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531).cljs$core$IFn$_invoke$arity$1(info) == null)))){
return cljs.compiler.fn_self_name.call(null,s);
} else {
var depth = cljs.compiler.shadow_depth.call(null,s);
var code = cljs.compiler.hash_scope.call(null,s);
var renamed = cljs.core.get.call(null,cljs.compiler._STAR_lexical_renames_STAR_,code);
var name__$1 = ((field === true)?["self__.",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''):(((!((renamed == null))))?renamed:name
));
var munged_name = cljs.compiler.munge.call(null,name__$1,reserved);
if(((field === true) || ((depth === (0))))){
return munged_name;
} else {
return cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(munged_name),"__$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(depth)].join(''));
}
}
} else {
var ss = clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"..","_DOT__DOT_");
var ss__$1 = clojure.string.replace.call(null,ss,(new RegExp("\\/(.)")),".$1");
var rf = cljs.compiler.munge_reserved.call(null,reserved);
var ss__$2 = cljs.core.map.call(null,rf,clojure.string.split.call(null,ss__$1,/\./));
var ss__$3 = clojure.string.join.call(null,".",ss__$2);
var ms = new cljs.core.Var(function(){return cljs.core.munge_str;},new cljs.core.Symbol("cljs.core","munge-str","cljs.core/munge-str",-301346665,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",-558947994),new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[true,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),new cljs.core.Symbol(null,"munge-str","munge-str",-2042069652,null),"cljs/core.cljs",(17),(1),(11478),(11478),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"name","name",-810760592,null)], null)),null,(cljs.core.truth_(cljs.core.munge_str)?cljs.core.munge_str.cljs$lang$test:null)])).call(null,ss__$3);
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.call(null,ms);
} else {
return ms;
}
}
});

cljs.compiler.munge.cljs$lang$maxFixedArity = 2;

cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.call(null,",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__5837 = cp;
switch (G__5837) {
case (34):
return "\\\"";

break;
case (92):
return "\\\\";

break;
case (8):
return "\\b";

break;
case (12):
return "\\f";

break;
case (10):
return "\\n";

break;
case (13):
return "\\r";

break;
case (9):
return "\\t";

break;
default:
if(((((31) < cp)) && ((cp < (127))))){
return c;
} else {
var unpadded = cp.toString((16));
var pad = cljs.core.subs.call(null,"0000",unpadded.length);
return ["\\u",cljs.core.str.cljs$core$IFn$_invoke$arity$1(pad),cljs.core.str.cljs$core$IFn$_invoke$arity$1(unpadded)].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__5839_5843 = cljs.core.seq.call(null,s);
var chunk__5840_5844 = null;
var count__5841_5845 = (0);
var i__5842_5846 = (0);
while(true){
if((i__5842_5846 < count__5841_5845)){
var c_5847 = cljs.core._nth.call(null,chunk__5840_5844,i__5842_5846);
sb.append(cljs.compiler.escape_char.call(null,c_5847));


var G__5848 = seq__5839_5843;
var G__5849 = chunk__5840_5844;
var G__5850 = count__5841_5845;
var G__5851 = (i__5842_5846 + (1));
seq__5839_5843 = G__5848;
chunk__5840_5844 = G__5849;
count__5841_5845 = G__5850;
i__5842_5846 = G__5851;
continue;
} else {
var temp__5720__auto___5852 = cljs.core.seq.call(null,seq__5839_5843);
if(temp__5720__auto___5852){
var seq__5839_5853__$1 = temp__5720__auto___5852;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5839_5853__$1)){
var c__4550__auto___5854 = cljs.core.chunk_first.call(null,seq__5839_5853__$1);
var G__5855 = cljs.core.chunk_rest.call(null,seq__5839_5853__$1);
var G__5856 = c__4550__auto___5854;
var G__5857 = cljs.core.count.call(null,c__4550__auto___5854);
var G__5858 = (0);
seq__5839_5843 = G__5855;
chunk__5840_5844 = G__5856;
count__5841_5845 = G__5857;
i__5842_5846 = G__5858;
continue;
} else {
var c_5859 = cljs.core.first.call(null,seq__5839_5853__$1);
sb.append(cljs.compiler.escape_char.call(null,c_5859));


var G__5860 = cljs.core.next.call(null,seq__5839_5853__$1);
var G__5861 = null;
var G__5862 = (0);
var G__5863 = (0);
seq__5839_5843 = G__5860;
chunk__5840_5844 = G__5861;
count__5841_5845 = G__5862;
i__5842_5846 = G__5863;
continue;
}
} else {
}
}
break;
}

return sb.toString();
});
cljs.compiler.wrap_in_double_quotes = (function cljs$compiler$wrap_in_double_quotes(x){
return ["\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),"\""].join('');
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_STAR_ = (function (){var method_table__4613__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit*"),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__5864_5869 = ast;
var map__5864_5870__$1 = (((((!((map__5864_5869 == null))))?(((((map__5864_5869.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5864_5869.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5864_5869):map__5864_5869);
var env_5871 = cljs.core.get.call(null,map__5864_5870__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core.truth_(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(env_5871))){
var map__5866_5872 = env_5871;
var map__5866_5873__$1 = (((((!((map__5866_5872 == null))))?(((((map__5866_5872.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5866_5872.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5866_5872):map__5866_5872);
var line_5874 = cljs.core.get.call(null,map__5866_5873__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_5875 = cljs.core.get.call(null,map__5866_5873__$1,new cljs.core.Keyword(null,"column","column",2078222095));
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,((function (map__5866_5872,map__5866_5873__$1,line_5874,column_5875,map__5864_5869,map__5864_5870__$1,env_5871){
return (function (m){
var minfo = (function (){var G__5868 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gcol","gcol",309250807),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"gline","gline",-1086242431),new cljs.core.Keyword(null,"gen-line","gen-line",589592125).cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"binding","binding",539932593),null,new cljs.core.Keyword(null,"var","var",-769682797),null,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),null,new cljs.core.Keyword(null,"local","local",-1497766724),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast)))){
return cljs.core.assoc.call(null,G__5868,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(ast))));
} else {
return G__5868;
}
})();
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-map","source-map",1706252311),(line_5874 - (1))], null),cljs.core.fnil.call(null,((function (minfo,map__5866_5872,map__5866_5873__$1,line_5874,column_5875,map__5864_5869,map__5864_5870__$1,env_5871){
return (function (line__$1){
return cljs.core.update_in.call(null,line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_5875)?(column_5875 - (1)):(0))], null),cljs.core.fnil.call(null,((function (minfo,map__5866_5872,map__5866_5873__$1,line_5874,column_5875,map__5864_5869,map__5864_5870__$1,env_5871){
return (function (column__$1){
return cljs.core.conj.call(null,column__$1,minfo);
});})(minfo,map__5866_5872,map__5866_5873__$1,line_5874,column_5875,map__5864_5869,map__5864_5870__$1,env_5871))
,cljs.core.PersistentVector.EMPTY));
});})(minfo,map__5866_5872,map__5866_5873__$1,line_5874,column_5875,map__5864_5869,map__5864_5870__$1,env_5871))
,cljs.core.sorted_map.call(null)));
});})(map__5866_5872,map__5866_5873__$1,line_5874,column_5875,map__5864_5869,map__5864_5870__$1,env_5871))
);
} else {
}
} else {
}

return cljs.compiler.emit_STAR_.call(null,ast);
});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var G__5884 = arguments.length;
switch (G__5884) {
case 0:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__4751__auto__ = [];
var len__4730__auto___5891 = arguments.length;
var i__4731__auto___5892 = (0);
while(true){
if((i__4731__auto___5892 < len__4730__auto___5891)){
args_arr__4751__auto__.push((arguments[i__4731__auto___5892]));

var G__5893 = (i__4731__auto___5892 + (1));
i__4731__auto___5892 = G__5893;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((5)),(0),null));
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4752__auto__);

}
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1 = (function (a){
if((a == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,a)){
cljs.compiler.emit.call(null,a);
} else {
if(cljs.analyzer.cljs_seq_QMARK_.call(null,a)){
cljs.core.apply.call(null,cljs.compiler.emits,a);
} else {
if(goog.isFunction(a)){
a.call(null);
} else {
var s_5894 = (function (){var G__5885 = a;
if((!(typeof a === 'string'))){
return G__5885.toString();
} else {
return G__5885;
}
})();
var temp__5724__auto___5895 = cljs.compiler._STAR_source_map_data_STAR_;
if((temp__5724__auto___5895 == null)){
} else {
var sm_data_5896 = temp__5724__auto___5895;
cljs.core.swap_BANG_.call(null,sm_data_5896,cljs.core.update,new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),((function (sm_data_5896,temp__5724__auto___5895,s_5894){
return (function (p1__5876_SHARP_){
return (p1__5876_SHARP_ + s_5894.length);
});})(sm_data_5896,temp__5724__auto___5895,s_5894))
);
}

cljs.core.print.call(null,s_5894);

}
}
}
}

return null;
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.call(null,a);

return cljs.compiler.emits.call(null,b);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

return cljs.compiler.emits.call(null,c);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

return cljs.compiler.emits.call(null,d);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

return cljs.compiler.emits.call(null,e);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

var seq__5886 = cljs.core.seq.call(null,xs);
var chunk__5887 = null;
var count__5888 = (0);
var i__5889 = (0);
while(true){
if((i__5889 < count__5888)){
var x = cljs.core._nth.call(null,chunk__5887,i__5889);
cljs.compiler.emits.call(null,x);


var G__5897 = seq__5886;
var G__5898 = chunk__5887;
var G__5899 = count__5888;
var G__5900 = (i__5889 + (1));
seq__5886 = G__5897;
chunk__5887 = G__5898;
count__5888 = G__5899;
i__5889 = G__5900;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__5886);
if(temp__5720__auto__){
var seq__5886__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5886__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__5886__$1);
var G__5901 = cljs.core.chunk_rest.call(null,seq__5886__$1);
var G__5902 = c__4550__auto__;
var G__5903 = cljs.core.count.call(null,c__4550__auto__);
var G__5904 = (0);
seq__5886 = G__5901;
chunk__5887 = G__5902;
count__5888 = G__5903;
i__5889 = G__5904;
continue;
} else {
var x = cljs.core.first.call(null,seq__5886__$1);
cljs.compiler.emits.call(null,x);


var G__5905 = cljs.core.next.call(null,seq__5886__$1);
var G__5906 = null;
var G__5907 = (0);
var G__5908 = (0);
seq__5886 = G__5905;
chunk__5887 = G__5906;
count__5888 = G__5907;
i__5889 = G__5908;
continue;
}
} else {
return null;
}
}
break;
}
});

/** @this {Function} */
cljs.compiler.emits.cljs$lang$applyTo = (function (seq5878){
var G__5879 = cljs.core.first.call(null,seq5878);
var seq5878__$1 = cljs.core.next.call(null,seq5878);
var G__5880 = cljs.core.first.call(null,seq5878__$1);
var seq5878__$2 = cljs.core.next.call(null,seq5878__$1);
var G__5881 = cljs.core.first.call(null,seq5878__$2);
var seq5878__$3 = cljs.core.next.call(null,seq5878__$2);
var G__5882 = cljs.core.first.call(null,seq5878__$3);
var seq5878__$4 = cljs.core.next.call(null,seq5878__$3);
var G__5883 = cljs.core.first.call(null,seq5878__$4);
var seq5878__$5 = cljs.core.next.call(null,seq5878__$4);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__5879,G__5880,G__5881,G__5882,G__5883,seq5878__$5);
});

cljs.compiler.emits.cljs$lang$maxFixedArity = (5);

cljs.compiler._emitln = (function cljs$compiler$_emitln(){
cljs.core.newline.call(null);

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,(function (p__5909){
var map__5910 = p__5909;
var map__5910__$1 = (((((!((map__5910 == null))))?(((((map__5910.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5910.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5910):map__5910);
var m = map__5910__$1;
var gen_line = cljs.core.get.call(null,map__5910__$1,new cljs.core.Keyword(null,"gen-line","gen-line",589592125));
return cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"gen-line","gen-line",589592125),(gen_line + (1)),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(0));
}));
} else {
}

return null;
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var G__5919 = arguments.length;
switch (G__5919) {
case 0:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__4751__auto__ = [];
var len__4730__auto___5925 = arguments.length;
var i__4731__auto___5926 = (0);
while(true){
if((i__4731__auto___5926 < len__4730__auto___5925)){
args_arr__4751__auto__.push((arguments[i__4731__auto___5926]));

var G__5927 = (i__4731__auto___5926 + (1));
i__4731__auto___5926 = G__5927;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((5)),(0),null));
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4752__auto__);

}
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1 = (function (a){
cljs.compiler.emits.call(null,a);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

var seq__5920_5928 = cljs.core.seq.call(null,xs);
var chunk__5921_5929 = null;
var count__5922_5930 = (0);
var i__5923_5931 = (0);
while(true){
if((i__5923_5931 < count__5922_5930)){
var x_5932 = cljs.core._nth.call(null,chunk__5921_5929,i__5923_5931);
cljs.compiler.emits.call(null,x_5932);


var G__5933 = seq__5920_5928;
var G__5934 = chunk__5921_5929;
var G__5935 = count__5922_5930;
var G__5936 = (i__5923_5931 + (1));
seq__5920_5928 = G__5933;
chunk__5921_5929 = G__5934;
count__5922_5930 = G__5935;
i__5923_5931 = G__5936;
continue;
} else {
var temp__5720__auto___5937 = cljs.core.seq.call(null,seq__5920_5928);
if(temp__5720__auto___5937){
var seq__5920_5938__$1 = temp__5720__auto___5937;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5920_5938__$1)){
var c__4550__auto___5939 = cljs.core.chunk_first.call(null,seq__5920_5938__$1);
var G__5940 = cljs.core.chunk_rest.call(null,seq__5920_5938__$1);
var G__5941 = c__4550__auto___5939;
var G__5942 = cljs.core.count.call(null,c__4550__auto___5939);
var G__5943 = (0);
seq__5920_5928 = G__5940;
chunk__5921_5929 = G__5941;
count__5922_5930 = G__5942;
i__5923_5931 = G__5943;
continue;
} else {
var x_5944 = cljs.core.first.call(null,seq__5920_5938__$1);
cljs.compiler.emits.call(null,x_5944);


var G__5945 = cljs.core.next.call(null,seq__5920_5938__$1);
var G__5946 = null;
var G__5947 = (0);
var G__5948 = (0);
seq__5920_5928 = G__5945;
chunk__5921_5929 = G__5946;
count__5922_5930 = G__5947;
i__5923_5931 = G__5948;
continue;
}
} else {
}
}
break;
}

return cljs.compiler._emitln.call(null);
});

/** @this {Function} */
cljs.compiler.emitln.cljs$lang$applyTo = (function (seq5913){
var G__5914 = cljs.core.first.call(null,seq5913);
var seq5913__$1 = cljs.core.next.call(null,seq5913);
var G__5915 = cljs.core.first.call(null,seq5913__$1);
var seq5913__$2 = cljs.core.next.call(null,seq5913__$1);
var G__5916 = cljs.core.first.call(null,seq5913__$2);
var seq5913__$3 = cljs.core.next.call(null,seq5913__$2);
var G__5917 = cljs.core.first.call(null,seq5913__$3);
var seq5913__$4 = cljs.core.next.call(null,seq5913__$3);
var G__5918 = cljs.core.first.call(null,seq5913__$4);
var seq5913__$5 = cljs.core.next.call(null,seq5913__$4);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__5914,G__5915,G__5916,G__5917,G__5918,seq5913__$5);
});

cljs.compiler.emitln.cljs$lang$maxFixedArity = (5);

cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__5949_5953 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__5950_5954 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__5951_5955 = true;
var _STAR_print_fn_STAR__temp_val__5952_5956 = ((function (_STAR_print_newline_STAR__orig_val__5949_5953,_STAR_print_fn_STAR__orig_val__5950_5954,_STAR_print_newline_STAR__temp_val__5951_5955,sb__4661__auto__){
return (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});})(_STAR_print_newline_STAR__orig_val__5949_5953,_STAR_print_fn_STAR__orig_val__5950_5954,_STAR_print_newline_STAR__temp_val__5951_5955,sb__4661__auto__))
;
cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__5951_5955;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__5952_5956;

try{cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__5950_5954;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__5949_5953;
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_constant_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_constant_STAR_ = (function (){var method_table__4613__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit-constant*"),cljs.core.type,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}









cljs.compiler.all_distinct_QMARK_ = (function cljs$compiler$all_distinct_QMARK_(xs){
return cljs.core.apply.call(null,cljs.core.distinct_QMARK_,xs);
});
cljs.compiler.emit_constant_no_meta = (function cljs$compiler$emit_constant_no_meta(x){
if(cljs.analyzer.cljs_seq_QMARK_.call(null,x)){
return cljs.compiler.emit_list.call(null,x,cljs.compiler.emit_constants_comma_sep);
} else {
if(cljs.core.record_QMARK_.call(null,x)){
var vec__5957 = cljs.analyzer.record_ns_PLUS_name.call(null,x);
var ns = cljs.core.nth.call(null,vec__5957,(0),null);
var name = cljs.core.nth.call(null,vec__5957,(1),null);
return cljs.compiler.emit_record_value.call(null,ns,name,((function (vec__5957,ns,name){
return (function (){
return cljs.compiler.emit_constant.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,x));
});})(vec__5957,ns,name))
);
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,x)){
return cljs.compiler.emit_map.call(null,cljs.core.keys.call(null,x),cljs.core.vals.call(null,x),cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_);
} else {
if(cljs.analyzer.cljs_vector_QMARK_.call(null,x)){
return cljs.compiler.emit_vector.call(null,x,cljs.compiler.emit_constants_comma_sep);
} else {
if(cljs.analyzer.cljs_set_QMARK_.call(null,x)){
return cljs.compiler.emit_set.call(null,x,cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_);
} else {
return cljs.compiler.emit_constant_STAR_.call(null,x);

}
}
}
}
}
});
cljs.compiler.emit_constant = (function cljs$compiler$emit_constant(v){
var m = cljs.analyzer.elide_irrelevant_meta.call(null,cljs.core.meta.call(null,v));
if((!((cljs.core.seq.call(null,m) == null)))){
return cljs.compiler.emit_with_meta.call(null,((function (m){
return (function (){
return cljs.compiler.emit_constant_no_meta.call(null,v);
});})(m))
,((function (m){
return (function (){
return cljs.compiler.emit_constant_no_meta.call(null,m);
});})(m))
);
} else {
return cljs.compiler.emit_constant_no_meta.call(null,v);
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,new cljs.core.Keyword(null,"default","default",-1987822328),(function (x){
throw cljs.core.ex_info.call(null,["failed compiling constant: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),"; ",cljs.core.pr_str.call(null,cljs.core.type.call(null,x))," is not a valid ClojureScript constant."].join(''),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"constant","constant",-379609303),x,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type.call(null,x),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,null,(function (x){
return cljs.compiler.emits.call(null,"null");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Number,(function (x){
if(cljs.core.truth_(isNaN(x))){
return cljs.compiler.emits.call(null,"NaN");
} else {
if(cljs.core.not.call(null,isFinite(x))){
return cljs.compiler.emits.call(null,(((x > (0)))?"Infinity":"-Infinity"));
} else {
return cljs.compiler.emits.call(null,"(",x,")");

}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,String,(function (x){
return cljs.compiler.emits.call(null,cljs.compiler.wrap_in_double_quotes.call(null,cljs.compiler.escape_string.call(null,x)));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Boolean,(function (x){
return cljs.compiler.emits.call(null,(cljs.core.truth_(x)?"true":"false"));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,RegExp,(function (x){
if(cljs.core._EQ_.call(null,"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x))){
return cljs.compiler.emits.call(null,"(new RegExp(\"\"))");
} else {
var vec__5960 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
var _ = cljs.core.nth.call(null,vec__5960,(0),null);
var flags = cljs.core.nth.call(null,vec__5960,(1),null);
var pattern = cljs.core.nth.call(null,vec__5960,(2),null);
return cljs.compiler.emits.call(null,pattern);
}
}));
cljs.compiler.emits_keyword = (function cljs$compiler$emits_keyword(kw){
var ns = cljs.core.namespace.call(null,kw);
var name = cljs.core.name.call(null,kw);
cljs.compiler.emits.call(null,"new cljs.core.Keyword(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,(cljs.core.truth_(ns)?[ns,"/",name].join(''):name));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,kw));

return cljs.compiler.emits.call(null,")");
});
cljs.compiler.emits_symbol = (function cljs$compiler$emits_symbol(sym){
var ns = cljs.core.namespace.call(null,sym);
var name = cljs.core.name.call(null,sym);
var symstr = (((!((ns == null))))?[ns,"/",name].join(''):name);
cljs.compiler.emits.call(null,"new cljs.core.Symbol(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,symstr);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,sym));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,null);

return cljs.compiler.emits.call(null,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.Keyword,(function (x){
var temp__5718__auto__ = (function (){var and__4120__auto__ = new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4120__auto__)){
return x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(temp__5718__auto__)){
var value = temp__5718__auto__;
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_keyword.call(null,x);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.Symbol,(function (x){
var temp__5718__auto__ = (function (){var and__4120__auto__ = new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4120__auto__)){
return x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(temp__5718__auto__)){
var value = temp__5718__auto__;
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_symbol.call(null,x);
}
}));
cljs.compiler.emit_constants_comma_sep = (function cljs$compiler$emit_constants_comma_sep(cs){
return (function (){
return cljs.core.doall.call(null,cljs.core.map_indexed.call(null,(function (i,m){
if(cljs.core.even_QMARK_.call(null,i)){
return cljs.compiler.emit_constant.call(null,m);
} else {
return cljs.compiler.emits.call(null,m);
}
}),cljs.compiler.comma_sep.call(null,cs)));
});
});
cljs.compiler.array_map_threshold = (8);
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Date,(function (date){
return cljs.compiler.emits.call(null,"new Date(",date.getTime(),")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.UUID,(function (uuid){
var uuid_str = uuid.toString();
return cljs.compiler.emits.call(null,"new cljs.core.UUID(\"",uuid_str,"\", ",cljs.core.hash.call(null,uuid_str),")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.tagged_literals.JSValue,(function (v){
var items = v.val;
if(cljs.core.map_QMARK_.call(null,items)){
return cljs.compiler.emit_js_object.call(null,items,((function (items){
return (function (p1__5963_SHARP_){
return ((function (items){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__5963_SHARP_);
});
;})(items))
});})(items))
);
} else {
return cljs.compiler.emit_js_array.call(null,items,cljs.compiler.emit_constants_comma_sep);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"no-op","no-op",-93046065),(function (m){
return null;
}));
cljs.compiler.emit_var = (function cljs$compiler$emit_var(p__5965){
var map__5966 = p__5965;
var map__5966__$1 = (((((!((map__5966 == null))))?(((((map__5966.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5966.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5966):map__5966);
var ast = map__5966__$1;
var info = cljs.core.get.call(null,map__5966__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var env = cljs.core.get.call(null,map__5966__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var form = cljs.core.get.call(null,map__5966__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var temp__5718__auto__ = new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292).cljs$core$IFn$_invoke$arity$1(ast);
if(cljs.core.truth_(temp__5718__auto__)){
var const_expr = temp__5718__auto__;
return cljs.compiler.emit.call(null,cljs.core.assoc.call(null,const_expr,new cljs.core.Keyword(null,"env","env",-1815813235),env));
} else {
var map__5968 = cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_);
var map__5968__$1 = (((((!((map__5968 == null))))?(((((map__5968.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5968.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5968):map__5968);
var cenv = map__5968__$1;
var options = cljs.core.get.call(null,map__5968__$1,new cljs.core.Keyword(null,"options","options",99638489));
var var_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.call(null,cenv,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-module-index","js-module-index",2072061931),cljs.core.name.call(null,var_name),new cljs.core.Keyword(null,"name","name",1843675177)], null));
var or__4131__auto__ = js_module_name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.name.call(null,var_name);
}
})():info);
if(cljs.core.truth_(new cljs.core.Keyword(null,"binding-form?","binding-form?",1728940169).cljs$core$IFn$_invoke$arity$1(ast))){
return cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,ast));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var reserved = (function (){var G__5970 = cljs.compiler.js_reserved;
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.compiler.es5_GT__EQ_.call(null,new cljs.core.Keyword(null,"language-out","language-out",334619882).cljs$core$IFn$_invoke$arity$1(options));
if(cljs.core.truth_(and__4120__auto__)){
return (!((cljs.core.namespace.call(null,var_name) == null)));
} else {
return and__4120__auto__;
}
})())){
return clojure.set.difference.call(null,G__5970,cljs.analyzer.es5_allowed);
} else {
return G__5970;
}
})();
var js_module = cljs.core.get_in.call(null,cenv,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-namespaces","js-namespaces",-471353612),(function (){var or__4131__auto__ = cljs.core.namespace.call(null,var_name);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.name.call(null,var_name);
}
})()], null));
var info__$2 = (function (){var G__5971 = info__$1;
if(cljs.core.not_EQ_.call(null,form,new cljs.core.Symbol("js","-Infinity","js/-Infinity",958706333,null))){
return cljs.compiler.munge.call(null,G__5971,reserved);
} else {
return G__5971;
}
})();
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

var G__5972_5973 = new cljs.core.Keyword(null,"module-type","module-type",1392760304).cljs$core$IFn$_invoke$arity$1(js_module);
var G__5972_5974__$1 = (((G__5972_5973 instanceof cljs.core.Keyword))?G__5972_5973.fqn:null);
switch (G__5972_5974__$1) {
case "commonjs":
if(cljs.core.truth_(cljs.core.namespace.call(null,var_name))){
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.namespace.call(null,var_name),reserved),"[\"default\"].",cljs.compiler.munge.call(null,cljs.core.name.call(null,var_name),reserved));
} else {
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.name.call(null,var_name),reserved),"[\"default\"]");
}

break;
case "es6":
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core.namespace.call(null,var_name);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core._EQ_.call(null,"default",cljs.core.name.call(null,var_name));
} else {
return and__4120__auto__;
}
})())){
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.namespace.call(null,var_name),reserved),"[\"default\"]");
} else {
cljs.compiler.emits.call(null,info__$2);
}

break;
default:
cljs.compiler.emits.call(null,info__$2);

}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"var","var",-769682797),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"binding","binding",539932593),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"local","local",-1497766724),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"the-var","the-var",1428415613),(function (p__5976){
var map__5977 = p__5976;
var map__5977__$1 = (((((!((map__5977 == null))))?(((((map__5977.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5977.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5977):map__5977);
var arg = map__5977__$1;
var env = cljs.core.get.call(null,map__5977__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var var$ = cljs.core.get.call(null,map__5977__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var sym = cljs.core.get.call(null,map__5977__$1,new cljs.core.Keyword(null,"sym","sym",-1444860305));
var meta = cljs.core.get.call(null,map__5977__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
if(cljs.analyzer.ast_QMARK_.call(null,sym)){
} else {
throw (new Error("Assert failed: (ana/ast? sym)"));
}

if(cljs.analyzer.ast_QMARK_.call(null,meta)){
} else {
throw (new Error("Assert failed: (ana/ast? meta)"));
}

var map__5979 = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(var$);
var map__5979__$1 = (((((!((map__5979 == null))))?(((((map__5979.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5979.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5979):map__5979);
var name = cljs.core.get.call(null,map__5979__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"new cljs.core.Var(function(){return ",cljs.compiler.munge.call(null,name),";},",sym,",",meta,")");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_with_meta = (function cljs$compiler$emit_with_meta(expr,meta){
return cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"with-meta","with-meta",-1566856820),(function (p__5981){
var map__5982 = p__5981;
var map__5982__$1 = (((((!((map__5982 == null))))?(((((map__5982.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5982.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5982):map__5982);
var expr = cljs.core.get.call(null,map__5982__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var meta = cljs.core.get.call(null,map__5982__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
var env = cljs.core.get.call(null,map__5982__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_with_meta.call(null,expr,meta);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
var keys__$1 = cljs.core.map.call(null,cljs.analyzer.unwrap_quote,keys);
return ((cljs.core.every_QMARK_.call(null,((function (keys__$1){
return (function (p1__5984_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__5984_SHARP_),new cljs.core.Keyword(null,"const","const",1709929842));
});})(keys__$1))
,keys__$1)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,keys__$1)),cljs.core.count.call(null,keys__$1))));
});
cljs.compiler.emit_map = (function cljs$compiler$emit_map(keys,vals,comma_sep,distinct_keys_QMARK_){
if((cljs.core.count.call(null,keys) === (0))){
return cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.EMPTY");
} else {
if((cljs.core.count.call(null,keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_(distinct_keys_QMARK_.call(null,keys))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,keys),", [",comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"], null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.createAsIfByAssoc([",comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"])");
}
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashMap.fromArrays([",comma_sep.call(null,keys),"],[",comma_sep.call(null,vals),"])");

}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"map","map",1371690461),(function (p__5985){
var map__5986 = p__5985;
var map__5986__$1 = (((((!((map__5986 == null))))?(((((map__5986.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5986.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5986):map__5986);
var env = cljs.core.get.call(null,map__5986__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var keys = cljs.core.get.call(null,map__5986__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.call(null,map__5986__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_map.call(null,keys,vals,cljs.compiler.comma_sep,cljs.compiler.distinct_keys_QMARK_);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_list = (function cljs$compiler$emit_list(items,comma_sep){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.List.EMPTY");
} else {
return cljs.compiler.emits.call(null,"cljs.core.list(",comma_sep.call(null,items),")");
}
});
cljs.compiler.emit_vector = (function cljs$compiler$emit_vector(items,comma_sep){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else {
var cnt = cljs.core.count.call(null,items);
if((cnt < (32))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentVector(null, ",cnt,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",comma_sep.call(null,items),"], null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",comma_sep.call(null,items),"], true)");
}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"vector","vector",1902966158),(function (p__5988){
var map__5989 = p__5988;
var map__5989__$1 = (((((!((map__5989 == null))))?(((((map__5989.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5989.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5989):map__5989);
var items = cljs.core.get.call(null,map__5989__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__5989__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_vector.call(null,items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
var items__$1 = cljs.core.map.call(null,cljs.analyzer.unwrap_quote,items);
return ((cljs.core.every_QMARK_.call(null,((function (items__$1){
return (function (p1__5991_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__5991_SHARP_),new cljs.core.Keyword(null,"const","const",1709929842));
});})(items__$1))
,items__$1)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,items__$1)),cljs.core.count.call(null,items__$1))));
});
cljs.compiler.emit_set = (function cljs$compiler$emit_set(items,comma_sep,distinct_constants_QMARK_){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else {
if(cljs.core.truth_(distinct_constants_QMARK_.call(null,items))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,items),", [",comma_sep.call(null,cljs.core.interleave.call(null,items,cljs.core.repeat.call(null,"null"))),"], null), null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.createAsIfByAssoc([",comma_sep.call(null,items),"])");

}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set","set",304602554),(function (p__5992){
var map__5993 = p__5992;
var map__5993__$1 = (((((!((map__5993 == null))))?(((((map__5993.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5993.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5993):map__5993);
var items = cljs.core.get.call(null,map__5993__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__5993__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_set.call(null,items,cljs.compiler.comma_sep,cljs.compiler.distinct_constants_QMARK_);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_js_object = (function cljs$compiler$emit_js_object(items,emit_js_object_val){
cljs.compiler.emits.call(null,"({");

var temp__5720__auto___6017 = cljs.core.seq.call(null,items);
if(temp__5720__auto___6017){
var items_6018__$1 = temp__5720__auto___6017;
var vec__5995_6019 = items_6018__$1;
var seq__5996_6020 = cljs.core.seq.call(null,vec__5995_6019);
var first__5997_6021 = cljs.core.first.call(null,seq__5996_6020);
var seq__5996_6022__$1 = cljs.core.next.call(null,seq__5996_6020);
var vec__5998_6023 = first__5997_6021;
var k_6024 = cljs.core.nth.call(null,vec__5998_6023,(0),null);
var v_6025 = cljs.core.nth.call(null,vec__5998_6023,(1),null);
var r_6026 = seq__5996_6022__$1;
cljs.compiler.emits.call(null,"\"",cljs.core.name.call(null,k_6024),"\": ",emit_js_object_val.call(null,v_6025));

var seq__6001_6027 = cljs.core.seq.call(null,r_6026);
var chunk__6002_6028 = null;
var count__6003_6029 = (0);
var i__6004_6030 = (0);
while(true){
if((i__6004_6030 < count__6003_6029)){
var vec__6011_6031 = cljs.core._nth.call(null,chunk__6002_6028,i__6004_6030);
var k_6032__$1 = cljs.core.nth.call(null,vec__6011_6031,(0),null);
var v_6033__$1 = cljs.core.nth.call(null,vec__6011_6031,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_6032__$1),"\": ",emit_js_object_val.call(null,v_6033__$1));


var G__6034 = seq__6001_6027;
var G__6035 = chunk__6002_6028;
var G__6036 = count__6003_6029;
var G__6037 = (i__6004_6030 + (1));
seq__6001_6027 = G__6034;
chunk__6002_6028 = G__6035;
count__6003_6029 = G__6036;
i__6004_6030 = G__6037;
continue;
} else {
var temp__5720__auto___6038__$1 = cljs.core.seq.call(null,seq__6001_6027);
if(temp__5720__auto___6038__$1){
var seq__6001_6039__$1 = temp__5720__auto___6038__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6001_6039__$1)){
var c__4550__auto___6040 = cljs.core.chunk_first.call(null,seq__6001_6039__$1);
var G__6041 = cljs.core.chunk_rest.call(null,seq__6001_6039__$1);
var G__6042 = c__4550__auto___6040;
var G__6043 = cljs.core.count.call(null,c__4550__auto___6040);
var G__6044 = (0);
seq__6001_6027 = G__6041;
chunk__6002_6028 = G__6042;
count__6003_6029 = G__6043;
i__6004_6030 = G__6044;
continue;
} else {
var vec__6014_6045 = cljs.core.first.call(null,seq__6001_6039__$1);
var k_6046__$1 = cljs.core.nth.call(null,vec__6014_6045,(0),null);
var v_6047__$1 = cljs.core.nth.call(null,vec__6014_6045,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_6046__$1),"\": ",emit_js_object_val.call(null,v_6047__$1));


var G__6048 = cljs.core.next.call(null,seq__6001_6039__$1);
var G__6049 = null;
var G__6050 = (0);
var G__6051 = (0);
seq__6001_6027 = G__6048;
chunk__6002_6028 = G__6049;
count__6003_6029 = G__6050;
i__6004_6030 = G__6051;
continue;
}
} else {
}
}
break;
}
} else {
}

return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_js_array = (function cljs$compiler$emit_js_array(items,comma_sep){
return cljs.compiler.emits.call(null,"[",comma_sep.call(null,items),"]");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-object","js-object",1830199158),(function (p__6052){
var map__6053 = p__6052;
var map__6053__$1 = (((((!((map__6053 == null))))?(((((map__6053.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6053.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6053):map__6053);
var keys = cljs.core.get.call(null,map__6053__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.call(null,map__6053__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env = cljs.core.get.call(null,map__6053__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_js_object.call(null,cljs.core.map.call(null,cljs.core.vector,keys,vals),cljs.core.identity);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-array","js-array",-1210185421),(function (p__6055){
var map__6056 = p__6055;
var map__6056__$1 = (((((!((map__6056 == null))))?(((((map__6056.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6056.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6056):map__6056);
var items = cljs.core.get.call(null,map__6056__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__6056__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_js_array.call(null,items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_record_value = (function cljs$compiler$emit_record_value(ns,name,items){
return cljs.compiler.emits.call(null,ns,".map__GT_",name,"(",items,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"quote","quote",-262615245),(function (p__6058){
var map__6059 = p__6058;
var map__6059__$1 = (((((!((map__6059 == null))))?(((((map__6059.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6059.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6059):map__6059);
var expr = cljs.core.get.call(null,map__6059__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
return cljs.compiler.emit.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"const","const",1709929842),(function (p__6061){
var map__6062 = p__6061;
var map__6062__$1 = (((((!((map__6062 == null))))?(((((map__6062.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6062.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6062):map__6062);
var form = cljs.core.get.call(null,map__6062__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var env = cljs.core.get.call(null,map__6062__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_constant.call(null,form);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(expr){
var map__6064 = cljs.analyzer.unwrap_quote.call(null,expr);
var map__6064__$1 = (((((!((map__6064 == null))))?(((((map__6064.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6064.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6064):map__6064);
var op = cljs.core.get.call(null,map__6064__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__6064__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var const_expr = cljs.core.get.call(null,map__6064__$1,new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292));
var or__4131__auto__ = (function (){var and__4120__auto__ = cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"const","const",1709929842));
if(and__4120__auto__){
var and__4120__auto____$1 = form;
if(cljs.core.truth_(and__4120__auto____$1)){
return (!(((((typeof form === 'string') && (cljs.core._EQ_.call(null,form,"")))) || (((typeof form === 'number') && ((form === (0))))))));
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var and__4120__auto__ = (!((const_expr == null)));
if(and__4120__auto__){
return cljs.compiler.truthy_constant_QMARK_.call(null,const_expr);
} else {
return and__4120__auto__;
}
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(expr){
var map__6066 = cljs.analyzer.unwrap_quote.call(null,expr);
var map__6066__$1 = (((((!((map__6066 == null))))?(((((map__6066.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6066.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6066):map__6066);
var op = cljs.core.get.call(null,map__6066__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__6066__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var const_expr = cljs.core.get.call(null,map__6066__$1,new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292));
var or__4131__auto__ = ((cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"const","const",1709929842))) && (((form === false) || ((form == null)))));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var and__4120__auto__ = (!((const_expr == null)));
if(and__4120__auto__){
return cljs.compiler.falsey_constant_QMARK_.call(null,const_expr);
} else {
return and__4120__auto__;
}
}
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag.call(null,env,e);
var or__4131__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"seq","seq",-177272256,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null], null), null).call(null,tag);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_.call(null,e);
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"if","if",-458814265),(function (p__6068){
var map__6069 = p__6068;
var map__6069__$1 = (((((!((map__6069 == null))))?(((((map__6069.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6069.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6069):map__6069);
var test = cljs.core.get.call(null,map__6069__$1,new cljs.core.Keyword(null,"test","test",577538877));
var then = cljs.core.get.call(null,map__6069__$1,new cljs.core.Keyword(null,"then","then",460598070));
var else$ = cljs.core.get.call(null,map__6069__$1,new cljs.core.Keyword(null,"else","else",-1508377146));
var env = cljs.core.get.call(null,map__6069__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var unchecked = cljs.core.get.call(null,map__6069__$1,new cljs.core.Keyword(null,"unchecked","unchecked",924418378));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not.call(null,(function (){var or__4131__auto__ = unchecked;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.compiler.safe_test_QMARK_.call(null,env,test);
}
})());
if(cljs.core.truth_(cljs.compiler.truthy_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,then);
} else {
if(cljs.core.truth_(cljs.compiler.falsey_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,else$);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"(",((checked)?"cljs.core.truth_":null),"(",test,")?",then,":",else$,")");
} else {
if(checked){
cljs.compiler.emitln.call(null,"if(cljs.core.truth_(",test,")){");
} else {
cljs.compiler.emitln.call(null,"if(",test,"){");
}

cljs.compiler.emitln.call(null,then,"} else {");

return cljs.compiler.emitln.call(null,else$,"}");
}

}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"case","case",1143702196),(function (p__6071){
var map__6072 = p__6071;
var map__6072__$1 = (((((!((map__6072 == null))))?(((((map__6072.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6072.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6072):map__6072);
var v = cljs.core.get.call(null,map__6072__$1,new cljs.core.Keyword(null,"test","test",577538877));
var nodes = cljs.core.get.call(null,map__6072__$1,new cljs.core.Keyword(null,"nodes","nodes",-2099585805));
var default$ = cljs.core.get.call(null,map__6072__$1,new cljs.core.Keyword(null,"default","default",-1987822328));
var env = cljs.core.get.call(null,map__6072__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"expr","expr",745722291))){
cljs.compiler.emitln.call(null,"(function(){");
} else {
}

var gs = cljs.core.gensym.call(null,"caseval__");
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"var ",gs,";");
} else {
}

cljs.compiler.emitln.call(null,"switch (",v,") {");

var seq__6074_6110 = cljs.core.seq.call(null,nodes);
var chunk__6075_6111 = null;
var count__6076_6112 = (0);
var i__6077_6113 = (0);
while(true){
if((i__6077_6113 < count__6076_6112)){
var map__6094_6114 = cljs.core._nth.call(null,chunk__6075_6111,i__6077_6113);
var map__6094_6115__$1 = (((((!((map__6094_6114 == null))))?(((((map__6094_6114.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6094_6114.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6094_6114):map__6094_6114);
var ts_6116 = cljs.core.get.call(null,map__6094_6115__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var map__6095_6117 = cljs.core.get.call(null,map__6094_6115__$1,new cljs.core.Keyword(null,"then","then",460598070));
var map__6095_6118__$1 = (((((!((map__6095_6117 == null))))?(((((map__6095_6117.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6095_6117.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6095_6117):map__6095_6117);
var then_6119 = cljs.core.get.call(null,map__6095_6118__$1,new cljs.core.Keyword(null,"then","then",460598070));
var seq__6098_6120 = cljs.core.seq.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"test","test",577538877),ts_6116));
var chunk__6099_6121 = null;
var count__6100_6122 = (0);
var i__6101_6123 = (0);
while(true){
if((i__6101_6123 < count__6100_6122)){
var test_6124 = cljs.core._nth.call(null,chunk__6099_6121,i__6101_6123);
cljs.compiler.emitln.call(null,"case ",test_6124,":");


var G__6125 = seq__6098_6120;
var G__6126 = chunk__6099_6121;
var G__6127 = count__6100_6122;
var G__6128 = (i__6101_6123 + (1));
seq__6098_6120 = G__6125;
chunk__6099_6121 = G__6126;
count__6100_6122 = G__6127;
i__6101_6123 = G__6128;
continue;
} else {
var temp__5720__auto___6129 = cljs.core.seq.call(null,seq__6098_6120);
if(temp__5720__auto___6129){
var seq__6098_6130__$1 = temp__5720__auto___6129;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6098_6130__$1)){
var c__4550__auto___6131 = cljs.core.chunk_first.call(null,seq__6098_6130__$1);
var G__6132 = cljs.core.chunk_rest.call(null,seq__6098_6130__$1);
var G__6133 = c__4550__auto___6131;
var G__6134 = cljs.core.count.call(null,c__4550__auto___6131);
var G__6135 = (0);
seq__6098_6120 = G__6132;
chunk__6099_6121 = G__6133;
count__6100_6122 = G__6134;
i__6101_6123 = G__6135;
continue;
} else {
var test_6136 = cljs.core.first.call(null,seq__6098_6130__$1);
cljs.compiler.emitln.call(null,"case ",test_6136,":");


var G__6137 = cljs.core.next.call(null,seq__6098_6130__$1);
var G__6138 = null;
var G__6139 = (0);
var G__6140 = (0);
seq__6098_6120 = G__6137;
chunk__6099_6121 = G__6138;
count__6100_6122 = G__6139;
i__6101_6123 = G__6140;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_6119);
} else {
cljs.compiler.emitln.call(null,then_6119);
}

cljs.compiler.emitln.call(null,"break;");


var G__6141 = seq__6074_6110;
var G__6142 = chunk__6075_6111;
var G__6143 = count__6076_6112;
var G__6144 = (i__6077_6113 + (1));
seq__6074_6110 = G__6141;
chunk__6075_6111 = G__6142;
count__6076_6112 = G__6143;
i__6077_6113 = G__6144;
continue;
} else {
var temp__5720__auto___6145 = cljs.core.seq.call(null,seq__6074_6110);
if(temp__5720__auto___6145){
var seq__6074_6146__$1 = temp__5720__auto___6145;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6074_6146__$1)){
var c__4550__auto___6147 = cljs.core.chunk_first.call(null,seq__6074_6146__$1);
var G__6148 = cljs.core.chunk_rest.call(null,seq__6074_6146__$1);
var G__6149 = c__4550__auto___6147;
var G__6150 = cljs.core.count.call(null,c__4550__auto___6147);
var G__6151 = (0);
seq__6074_6110 = G__6148;
chunk__6075_6111 = G__6149;
count__6076_6112 = G__6150;
i__6077_6113 = G__6151;
continue;
} else {
var map__6102_6152 = cljs.core.first.call(null,seq__6074_6146__$1);
var map__6102_6153__$1 = (((((!((map__6102_6152 == null))))?(((((map__6102_6152.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6102_6152.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6102_6152):map__6102_6152);
var ts_6154 = cljs.core.get.call(null,map__6102_6153__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var map__6103_6155 = cljs.core.get.call(null,map__6102_6153__$1,new cljs.core.Keyword(null,"then","then",460598070));
var map__6103_6156__$1 = (((((!((map__6103_6155 == null))))?(((((map__6103_6155.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6103_6155.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6103_6155):map__6103_6155);
var then_6157 = cljs.core.get.call(null,map__6103_6156__$1,new cljs.core.Keyword(null,"then","then",460598070));
var seq__6106_6158 = cljs.core.seq.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"test","test",577538877),ts_6154));
var chunk__6107_6159 = null;
var count__6108_6160 = (0);
var i__6109_6161 = (0);
while(true){
if((i__6109_6161 < count__6108_6160)){
var test_6162 = cljs.core._nth.call(null,chunk__6107_6159,i__6109_6161);
cljs.compiler.emitln.call(null,"case ",test_6162,":");


var G__6163 = seq__6106_6158;
var G__6164 = chunk__6107_6159;
var G__6165 = count__6108_6160;
var G__6166 = (i__6109_6161 + (1));
seq__6106_6158 = G__6163;
chunk__6107_6159 = G__6164;
count__6108_6160 = G__6165;
i__6109_6161 = G__6166;
continue;
} else {
var temp__5720__auto___6167__$1 = cljs.core.seq.call(null,seq__6106_6158);
if(temp__5720__auto___6167__$1){
var seq__6106_6168__$1 = temp__5720__auto___6167__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6106_6168__$1)){
var c__4550__auto___6169 = cljs.core.chunk_first.call(null,seq__6106_6168__$1);
var G__6170 = cljs.core.chunk_rest.call(null,seq__6106_6168__$1);
var G__6171 = c__4550__auto___6169;
var G__6172 = cljs.core.count.call(null,c__4550__auto___6169);
var G__6173 = (0);
seq__6106_6158 = G__6170;
chunk__6107_6159 = G__6171;
count__6108_6160 = G__6172;
i__6109_6161 = G__6173;
continue;
} else {
var test_6174 = cljs.core.first.call(null,seq__6106_6168__$1);
cljs.compiler.emitln.call(null,"case ",test_6174,":");


var G__6175 = cljs.core.next.call(null,seq__6106_6168__$1);
var G__6176 = null;
var G__6177 = (0);
var G__6178 = (0);
seq__6106_6158 = G__6175;
chunk__6107_6159 = G__6176;
count__6108_6160 = G__6177;
i__6109_6161 = G__6178;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_6157);
} else {
cljs.compiler.emitln.call(null,then_6157);
}

cljs.compiler.emitln.call(null,"break;");


var G__6179 = cljs.core.next.call(null,seq__6074_6146__$1);
var G__6180 = null;
var G__6181 = (0);
var G__6182 = (0);
seq__6074_6110 = G__6179;
chunk__6075_6111 = G__6180;
count__6076_6112 = G__6181;
i__6077_6113 = G__6182;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(default$)){
cljs.compiler.emitln.call(null,"default:");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",default$);
} else {
cljs.compiler.emitln.call(null,default$);
}
} else {
}

cljs.compiler.emitln.call(null,"}");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.call(null,"return ",gs,";})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"throw","throw",-1044625833),(function (p__6183){
var map__6184 = p__6183;
var map__6184__$1 = (((((!((map__6184 == null))))?(((((map__6184.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6184.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6184):map__6184);
var throw$ = cljs.core.get.call(null,map__6184__$1,new cljs.core.Keyword(null,"exception","exception",-335277064));
var env = cljs.core.get.call(null,map__6184__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emits.call(null,"(function(){throw ",throw$,"})()");
} else {
return cljs.compiler.emitln.call(null,"throw ",throw$,";");
}
}));
cljs.compiler.base_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 15, ["boolean",null,"object",null,"*",null,"string",null,"Object",null,"Number",null,"null",null,"Date",null,"number",null,"String",null,"RegExp",null,"...*",null,"Array",null,"array",null,"Boolean",null], null), null);
cljs.compiler.mapped_types = new cljs.core.PersistentArrayMap(null, 1, ["nil","null"], null);
cljs.compiler.resolve_type = (function cljs$compiler$resolve_type(env,t){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.base_types,t))){
return t;
} else {
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.mapped_types,t))){
return cljs.core.get.call(null,cljs.compiler.mapped_types,t);
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"!"))){
return ["!",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.resolve_type.call(null,env,cljs.core.subs.call(null,t,(1))))].join('');
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"{"))){
return t;
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"function"))){
var idx = t.lastIndexOf(":");
var vec__6187 = (((!(((-1) === idx))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.call(null,t,(0),idx),cljs.core.subs.call(null,t,(idx + (1)),cljs.core.count.call(null,t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.call(null,vec__6187,(0),null);
var rstr = cljs.core.nth.call(null,vec__6187,(1),null);
var ret_t = (cljs.core.truth_(rstr)?cljs.compiler.resolve_type.call(null,env,rstr):null);
var axstr = cljs.core.subs.call(null,fstr,(9),(cljs.core.count.call(null,fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_.call(null,axstr))?null:cljs.core.map.call(null,cljs.core.comp.call(null,((function (idx,vec__6187,fstr,rstr,ret_t,axstr){
return (function (p1__6186_SHARP_){
return cljs.compiler.resolve_type.call(null,env,p1__6186_SHARP_);
});})(idx,vec__6187,fstr,rstr,ret_t,axstr))
,clojure.string.trim),clojure.string.split.call(null,axstr,/,/)));
var G__6190 = ["function(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,",",args_ts)),")"].join('');
if(cljs.core.truth_(ret_t)){
return [G__6190,":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ret_t)].join('');
} else {
return G__6190;
}
} else {
if(cljs.core.truth_(goog.string.endsWith(t,"="))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.resolve_type.call(null,env,cljs.core.subs.call(null,t,(0),(cljs.core.count.call(null,t) - (1))))),"="].join('');
} else {
return cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.call(null,env,cljs.core.symbol.call(null,t)))));

}
}
}
}
}
}
});
cljs.compiler.resolve_types = (function cljs$compiler$resolve_types(env,ts){
var ts__$1 = cljs.core.subs.call(null,clojure.string.trim.call(null,ts),(1),(cljs.core.count.call(null,ts) - (1)));
var xs = clojure.string.split.call(null,ts__$1,/\|/);
return ["{",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"|",cljs.core.map.call(null,((function (ts__$1,xs){
return (function (p1__6191_SHARP_){
return cljs.compiler.resolve_type.call(null,env,p1__6191_SHARP_);
});})(ts__$1,xs))
,xs))),"}"].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find.call(null,/@param/,line))){
var vec__6192 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var seq__6193 = cljs.core.seq.call(null,vec__6192);
var first__6194 = cljs.core.first.call(null,seq__6193);
var seq__6193__$1 = cljs.core.next.call(null,seq__6193);
var p = first__6194;
var first__6194__$1 = cljs.core.first.call(null,seq__6193__$1);
var seq__6193__$2 = cljs.core.next.call(null,seq__6193__$1);
var ts = first__6194__$1;
var first__6194__$2 = cljs.core.first.call(null,seq__6193__$2);
var seq__6193__$3 = cljs.core.next.call(null,seq__6193__$2);
var n = first__6194__$2;
var xs = seq__6193__$3;
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core._EQ_.call(null,"@param",p);
if(and__4120__auto__){
var and__4120__auto____$1 = ts;
if(cljs.core.truth_(and__4120__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts),cljs.compiler.munge.call(null,n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find.call(null,/@return/,line))){
var vec__6195 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var seq__6196 = cljs.core.seq.call(null,vec__6195);
var first__6197 = cljs.core.first.call(null,seq__6196);
var seq__6196__$1 = cljs.core.next.call(null,seq__6196);
var p = first__6197;
var first__6197__$1 = cljs.core.first.call(null,seq__6196__$1);
var seq__6196__$2 = cljs.core.next.call(null,seq__6196__$1);
var ts = first__6197__$1;
var xs = seq__6196__$2;
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core._EQ_.call(null,"@return",p);
if(and__4120__auto__){
var and__4120__auto____$1 = ts;
if(cljs.core.truth_(and__4120__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts)], null),xs));
} else {
return line;
}
} else {
return line;

}
}
});
cljs.compiler.checking_types_QMARK_ = (function cljs$compiler$checking_types_QMARK_(){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"warning","warning",-1685650671),null,new cljs.core.Keyword(null,"error","error",-978969032),null], null), null).call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"closure-warnings","closure-warnings",1362834211),new cljs.core.Keyword(null,"check-types","check-types",-833794607)], null)));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var G__6200 = arguments.length;
switch (G__6200) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.call(null,null,doc,jsdoc);
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.call(null,docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.call(null,cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = ((function (docs,docs__$1,docs__$2){
return (function cljs$compiler$print_comment_lines(e){
var vec__6208 = cljs.core.map.call(null,((function (docs,docs__$1,docs__$2){
return (function (p1__6198_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_.call(null))){
return cljs.compiler.munge_param_return.call(null,env,p1__6198_SHARP_);
} else {
return p1__6198_SHARP_;
}
});})(docs,docs__$1,docs__$2))
,clojure.string.split_lines.call(null,e));
var seq__6209 = cljs.core.seq.call(null,vec__6208);
var first__6210 = cljs.core.first.call(null,seq__6209);
var seq__6209__$1 = cljs.core.next.call(null,seq__6209);
var x = first__6210;
var ys = seq__6209__$1;
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,x,"*/","* /"));

var seq__6211 = cljs.core.seq.call(null,ys);
var chunk__6212 = null;
var count__6213 = (0);
var i__6214 = (0);
while(true){
if((i__6214 < count__6213)){
var next_line = cljs.core._nth.call(null,chunk__6212,i__6214);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));


var G__6220 = seq__6211;
var G__6221 = chunk__6212;
var G__6222 = count__6213;
var G__6223 = (i__6214 + (1));
seq__6211 = G__6220;
chunk__6212 = G__6221;
count__6213 = G__6222;
i__6214 = G__6223;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__6211);
if(temp__5720__auto__){
var seq__6211__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6211__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__6211__$1);
var G__6224 = cljs.core.chunk_rest.call(null,seq__6211__$1);
var G__6225 = c__4550__auto__;
var G__6226 = cljs.core.count.call(null,c__4550__auto__);
var G__6227 = (0);
seq__6211 = G__6224;
chunk__6212 = G__6225;
count__6213 = G__6226;
i__6214 = G__6227;
continue;
} else {
var next_line = cljs.core.first.call(null,seq__6211__$1);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));


var G__6228 = cljs.core.next.call(null,seq__6211__$1);
var G__6229 = null;
var G__6230 = (0);
var G__6231 = (0);
seq__6211 = G__6228;
chunk__6212 = G__6229;
count__6213 = G__6230;
i__6214 = G__6231;
continue;
}
} else {
return null;
}
}
break;
}
});})(docs,docs__$1,docs__$2))
;
if(cljs.core.seq.call(null,docs__$2)){
cljs.compiler.emitln.call(null,"/**");

var seq__6215_6232 = cljs.core.seq.call(null,docs__$2);
var chunk__6216_6233 = null;
var count__6217_6234 = (0);
var i__6218_6235 = (0);
while(true){
if((i__6218_6235 < count__6217_6234)){
var e_6236 = cljs.core._nth.call(null,chunk__6216_6233,i__6218_6235);
if(cljs.core.truth_(e_6236)){
print_comment_lines.call(null,e_6236);
} else {
}


var G__6237 = seq__6215_6232;
var G__6238 = chunk__6216_6233;
var G__6239 = count__6217_6234;
var G__6240 = (i__6218_6235 + (1));
seq__6215_6232 = G__6237;
chunk__6216_6233 = G__6238;
count__6217_6234 = G__6239;
i__6218_6235 = G__6240;
continue;
} else {
var temp__5720__auto___6241 = cljs.core.seq.call(null,seq__6215_6232);
if(temp__5720__auto___6241){
var seq__6215_6242__$1 = temp__5720__auto___6241;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6215_6242__$1)){
var c__4550__auto___6243 = cljs.core.chunk_first.call(null,seq__6215_6242__$1);
var G__6244 = cljs.core.chunk_rest.call(null,seq__6215_6242__$1);
var G__6245 = c__4550__auto___6243;
var G__6246 = cljs.core.count.call(null,c__4550__auto___6243);
var G__6247 = (0);
seq__6215_6232 = G__6244;
chunk__6216_6233 = G__6245;
count__6217_6234 = G__6246;
i__6218_6235 = G__6247;
continue;
} else {
var e_6248 = cljs.core.first.call(null,seq__6215_6242__$1);
if(cljs.core.truth_(e_6248)){
print_comment_lines.call(null,e_6248);
} else {
}


var G__6249 = cljs.core.next.call(null,seq__6215_6242__$1);
var G__6250 = null;
var G__6251 = (0);
var G__6252 = (0);
seq__6215_6232 = G__6249;
chunk__6216_6233 = G__6250;
count__6217_6234 = G__6251;
i__6218_6235 = G__6252;
continue;
}
} else {
}
}
break;
}

return cljs.compiler.emitln.call(null," */");
} else {
return null;
}
});

cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3;

cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return ((typeof x === 'string') || (x === true) || (x === false) || (typeof x === 'number'));
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.Keyword(null,"options","options",99638489));
var and__4120__auto__ = cljs.core.some.call(null,((function (opts){
return (function (p1__6254_SHARP_){
return goog.string.startsWith(p1__6254_SHARP_,"@define");
});})(opts))
,jsdoc);
if(cljs.core.truth_(and__4120__auto__)){
var and__4120__auto____$1 = opts;
if(cljs.core.truth_(and__4120__auto____$1)){
var and__4120__auto____$2 = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"none","none",1333468478));
if(and__4120__auto____$2){
var define = cljs.core.get_in.call(null,opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"closure-defines","closure-defines",-1213856476),cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname)], null));
if(cljs.compiler.valid_define_value_QMARK_.call(null,define)){
return cljs.core.pr_str.call(null,define);
} else {
return null;
}
} else {
return and__4120__auto____$2;
}
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"def","def",-1043430536),(function (p__6255){
var map__6256 = p__6255;
var map__6256__$1 = (((((!((map__6256 == null))))?(((((map__6256.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6256.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6256):map__6256);
var doc = cljs.core.get.call(null,map__6256__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var jsdoc = cljs.core.get.call(null,map__6256__$1,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516));
var test = cljs.core.get.call(null,map__6256__$1,new cljs.core.Keyword(null,"test","test",577538877));
var init = cljs.core.get.call(null,map__6256__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
var name = cljs.core.get.call(null,map__6256__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.call(null,map__6256__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var export$ = cljs.core.get.call(null,map__6256__$1,new cljs.core.Keyword(null,"export","export",214356590));
var var$ = cljs.core.get.call(null,map__6256__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var var_ast = cljs.core.get.call(null,map__6256__$1,new cljs.core.Keyword(null,"var-ast","var-ast",1200379319));
if(cljs.core.truth_((function (){var or__4131__auto__ = init;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.call(null,name);
cljs.compiler.emit_comment.call(null,env,doc,cljs.core.concat.call(null,jsdoc,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516).cljs$core$IFn$_invoke$arity$1(init)));

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"return (");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,var$);

if(cljs.core.truth_(init)){
cljs.compiler.emits.call(null," = ",(function (){var temp__5718__auto__ = cljs.compiler.get_define.call(null,mname,jsdoc);
if(cljs.core.truth_(temp__5718__auto__)){
var define = temp__5718__auto__;
return define;
} else {
return init;
}
})());
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"; return (");

cljs.compiler.emits.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"the-var","the-var",1428415613),new cljs.core.Keyword(null,"env","env",-1815813235),cljs.core.assoc.call(null,env,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291))], null),var_ast));

cljs.compiler.emitln.call(null,");})()");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,")");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emitln.call(null,";");
}

if(cljs.core.truth_(export$)){
cljs.compiler.emitln.call(null,"goog.exportSymbol('",cljs.compiler.munge.call(null,export$),"', ",mname,");");
} else {
}

if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(and__4120__auto__){
return test;
} else {
return and__4120__auto__;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,";");
} else {
}

return cljs.compiler.emitln.call(null,var$,".cljs$lang$test = ",test,";");
} else {
return null;
}
} else {
return null;
}
}));
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__6258){
var map__6259 = p__6258;
var map__6259__$1 = (((((!((map__6259 == null))))?(((((map__6259.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6259.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6259):map__6259);
var name = cljs.core.get.call(null,map__6259__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__6259__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__6259__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,name)),"__delegate"].join('');
cljs.compiler.emitln.call(null,"(function (",arglist,"){");

var seq__6261_6285 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.drop_last.call(null,(2),params)));
var chunk__6262_6286 = null;
var count__6263_6287 = (0);
var i__6264_6288 = (0);
while(true){
if((i__6264_6288 < count__6263_6287)){
var vec__6271_6289 = cljs.core._nth.call(null,chunk__6262_6286,i__6264_6288);
var i_6290 = cljs.core.nth.call(null,vec__6271_6289,(0),null);
var param_6291 = cljs.core.nth.call(null,vec__6271_6289,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_6291);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");


var G__6292 = seq__6261_6285;
var G__6293 = chunk__6262_6286;
var G__6294 = count__6263_6287;
var G__6295 = (i__6264_6288 + (1));
seq__6261_6285 = G__6292;
chunk__6262_6286 = G__6293;
count__6263_6287 = G__6294;
i__6264_6288 = G__6295;
continue;
} else {
var temp__5720__auto___6296 = cljs.core.seq.call(null,seq__6261_6285);
if(temp__5720__auto___6296){
var seq__6261_6297__$1 = temp__5720__auto___6296;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6261_6297__$1)){
var c__4550__auto___6298 = cljs.core.chunk_first.call(null,seq__6261_6297__$1);
var G__6299 = cljs.core.chunk_rest.call(null,seq__6261_6297__$1);
var G__6300 = c__4550__auto___6298;
var G__6301 = cljs.core.count.call(null,c__4550__auto___6298);
var G__6302 = (0);
seq__6261_6285 = G__6299;
chunk__6262_6286 = G__6300;
count__6263_6287 = G__6301;
i__6264_6288 = G__6302;
continue;
} else {
var vec__6274_6303 = cljs.core.first.call(null,seq__6261_6297__$1);
var i_6304 = cljs.core.nth.call(null,vec__6274_6303,(0),null);
var param_6305 = cljs.core.nth.call(null,vec__6274_6303,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_6305);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");


var G__6306 = cljs.core.next.call(null,seq__6261_6297__$1);
var G__6307 = null;
var G__6308 = (0);
var G__6309 = (0);
seq__6261_6285 = G__6306;
chunk__6262_6286 = G__6307;
count__6263_6287 = G__6308;
i__6264_6288 = G__6309;
continue;
}
} else {
}
}
break;
}

if(((1) < cljs.core.count.call(null,params))){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,cljs.core.butlast.call(null,params)));

cljs.compiler.emitln.call(null," = cljs.core.first(",arglist,");");

cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.rest(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__6277_6310 = cljs.core.seq.call(null,params);
var chunk__6278_6311 = null;
var count__6279_6312 = (0);
var i__6280_6313 = (0);
while(true){
if((i__6280_6313 < count__6279_6312)){
var param_6314 = cljs.core._nth.call(null,chunk__6278_6311,i__6280_6313);
cljs.compiler.emit.call(null,param_6314);

if(cljs.core._EQ_.call(null,param_6314,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__6315 = seq__6277_6310;
var G__6316 = chunk__6278_6311;
var G__6317 = count__6279_6312;
var G__6318 = (i__6280_6313 + (1));
seq__6277_6310 = G__6315;
chunk__6278_6311 = G__6316;
count__6279_6312 = G__6317;
i__6280_6313 = G__6318;
continue;
} else {
var temp__5720__auto___6319 = cljs.core.seq.call(null,seq__6277_6310);
if(temp__5720__auto___6319){
var seq__6277_6320__$1 = temp__5720__auto___6319;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6277_6320__$1)){
var c__4550__auto___6321 = cljs.core.chunk_first.call(null,seq__6277_6320__$1);
var G__6322 = cljs.core.chunk_rest.call(null,seq__6277_6320__$1);
var G__6323 = c__4550__auto___6321;
var G__6324 = cljs.core.count.call(null,c__4550__auto___6321);
var G__6325 = (0);
seq__6277_6310 = G__6322;
chunk__6278_6311 = G__6323;
count__6279_6312 = G__6324;
i__6280_6313 = G__6325;
continue;
} else {
var param_6326 = cljs.core.first.call(null,seq__6277_6320__$1);
cljs.compiler.emit.call(null,param_6326);

if(cljs.core._EQ_.call(null,param_6326,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__6327 = cljs.core.next.call(null,seq__6277_6320__$1);
var G__6328 = null;
var G__6329 = (0);
var G__6330 = (0);
seq__6277_6310 = G__6327;
chunk__6278_6311 = G__6328;
count__6279_6312 = G__6329;
i__6280_6313 = G__6330;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
} else {
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.seq(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__6281_6331 = cljs.core.seq.call(null,params);
var chunk__6282_6332 = null;
var count__6283_6333 = (0);
var i__6284_6334 = (0);
while(true){
if((i__6284_6334 < count__6283_6333)){
var param_6335 = cljs.core._nth.call(null,chunk__6282_6332,i__6284_6334);
cljs.compiler.emit.call(null,param_6335);

if(cljs.core._EQ_.call(null,param_6335,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__6336 = seq__6281_6331;
var G__6337 = chunk__6282_6332;
var G__6338 = count__6283_6333;
var G__6339 = (i__6284_6334 + (1));
seq__6281_6331 = G__6336;
chunk__6282_6332 = G__6337;
count__6283_6333 = G__6338;
i__6284_6334 = G__6339;
continue;
} else {
var temp__5720__auto___6340 = cljs.core.seq.call(null,seq__6281_6331);
if(temp__5720__auto___6340){
var seq__6281_6341__$1 = temp__5720__auto___6340;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6281_6341__$1)){
var c__4550__auto___6342 = cljs.core.chunk_first.call(null,seq__6281_6341__$1);
var G__6343 = cljs.core.chunk_rest.call(null,seq__6281_6341__$1);
var G__6344 = c__4550__auto___6342;
var G__6345 = cljs.core.count.call(null,c__4550__auto___6342);
var G__6346 = (0);
seq__6281_6331 = G__6343;
chunk__6282_6332 = G__6344;
count__6283_6333 = G__6345;
i__6284_6334 = G__6346;
continue;
} else {
var param_6347 = cljs.core.first.call(null,seq__6281_6341__$1);
cljs.compiler.emit.call(null,param_6347);

if(cljs.core._EQ_.call(null,param_6347,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__6348 = cljs.core.next.call(null,seq__6281_6341__$1);
var G__6349 = null;
var G__6350 = (0);
var G__6351 = (0);
seq__6281_6331 = G__6348;
chunk__6282_6332 = G__6349;
count__6283_6333 = G__6350;
i__6284_6334 = G__6351;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
}

return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_fn_params = (function cljs$compiler$emit_fn_params(params){
var seq__6352 = cljs.core.seq.call(null,params);
var chunk__6353 = null;
var count__6354 = (0);
var i__6355 = (0);
while(true){
if((i__6355 < count__6354)){
var param = cljs.core._nth.call(null,chunk__6353,i__6355);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__6356 = seq__6352;
var G__6357 = chunk__6353;
var G__6358 = count__6354;
var G__6359 = (i__6355 + (1));
seq__6352 = G__6356;
chunk__6353 = G__6357;
count__6354 = G__6358;
i__6355 = G__6359;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__6352);
if(temp__5720__auto__){
var seq__6352__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6352__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__6352__$1);
var G__6360 = cljs.core.chunk_rest.call(null,seq__6352__$1);
var G__6361 = c__4550__auto__;
var G__6362 = cljs.core.count.call(null,c__4550__auto__);
var G__6363 = (0);
seq__6352 = G__6360;
chunk__6353 = G__6361;
count__6354 = G__6362;
i__6355 = G__6363;
continue;
} else {
var param = cljs.core.first.call(null,seq__6352__$1);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__6364 = cljs.core.next.call(null,seq__6352__$1);
var G__6365 = null;
var G__6366 = (0);
var G__6367 = (0);
seq__6352 = G__6364;
chunk__6353 = G__6365;
count__6354 = G__6366;
i__6355 = G__6367;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__6368){
var map__6369 = p__6368;
var map__6369__$1 = (((((!((map__6369 == null))))?(((((map__6369.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6369.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6369):map__6369);
var expr = cljs.core.get.call(null,map__6369__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var type = cljs.core.get.call(null,map__6369__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__6369__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__6369__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__6369__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__6369__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(function ",cljs.compiler.munge.call(null,name),"(");

cljs.compiler.emit_fn_params.call(null,params);

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emits.call(null,"})");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
/**
 * Emit code that copies function arguments into an array starting at an index.
 *   Returns name of var holding the array.
 */
cljs.compiler.emit_arguments_to_array = (function cljs$compiler$emit_arguments_to_array(startslice){
if((((startslice >= (0))) && (cljs.core.integer_QMARK_.call(null,startslice)))){
} else {
throw (new Error("Assert failed: (and (>= startslice 0) (integer? startslice))"));
}

var mname = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
var i = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__i"].join('');
var a = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__a"].join('');
cljs.compiler.emitln.call(null,"var ",i," = 0, ",a," = new Array(arguments.length -  ",startslice,");");

cljs.compiler.emitln.call(null,"while (",i," < ",a,".length) {",a,"[",i,"] = arguments[",i," + ",startslice,"]; ++",i,";}");

return a;
});
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__6371){
var map__6372 = p__6371;
var map__6372__$1 = (((((!((map__6372 == null))))?(((((map__6372.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6372.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6372):map__6372);
var f = map__6372__$1;
var expr = cljs.core.get.call(null,map__6372__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var max_fixed_arity = cljs.core.get.call(null,map__6372__$1,new cljs.core.Keyword(null,"fixed-arity","fixed-arity",1586445869));
var variadic = cljs.core.get.call(null,map__6372__$1,new cljs.core.Keyword(null,"variadic?","variadic?",584179762));
var type = cljs.core.get.call(null,map__6372__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__6372__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__6372__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__6372__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__6372__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

var name_6382__$1 = (function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_6383 = cljs.compiler.munge.call(null,name_6382__$1);
var delegate_name_6384 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_6383),"__delegate"].join('');
cljs.compiler.emitln.call(null,"(function() { ");

cljs.compiler.emits.call(null,"var ",delegate_name_6384," = function (");

var seq__6374_6385 = cljs.core.seq.call(null,params);
var chunk__6375_6386 = null;
var count__6376_6387 = (0);
var i__6377_6388 = (0);
while(true){
if((i__6377_6388 < count__6376_6387)){
var param_6389 = cljs.core._nth.call(null,chunk__6375_6386,i__6377_6388);
cljs.compiler.emit.call(null,param_6389);

if(cljs.core._EQ_.call(null,param_6389,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__6390 = seq__6374_6385;
var G__6391 = chunk__6375_6386;
var G__6392 = count__6376_6387;
var G__6393 = (i__6377_6388 + (1));
seq__6374_6385 = G__6390;
chunk__6375_6386 = G__6391;
count__6376_6387 = G__6392;
i__6377_6388 = G__6393;
continue;
} else {
var temp__5720__auto___6394 = cljs.core.seq.call(null,seq__6374_6385);
if(temp__5720__auto___6394){
var seq__6374_6395__$1 = temp__5720__auto___6394;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6374_6395__$1)){
var c__4550__auto___6396 = cljs.core.chunk_first.call(null,seq__6374_6395__$1);
var G__6397 = cljs.core.chunk_rest.call(null,seq__6374_6395__$1);
var G__6398 = c__4550__auto___6396;
var G__6399 = cljs.core.count.call(null,c__4550__auto___6396);
var G__6400 = (0);
seq__6374_6385 = G__6397;
chunk__6375_6386 = G__6398;
count__6376_6387 = G__6399;
i__6377_6388 = G__6400;
continue;
} else {
var param_6401 = cljs.core.first.call(null,seq__6374_6395__$1);
cljs.compiler.emit.call(null,param_6401);

if(cljs.core._EQ_.call(null,param_6401,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__6402 = cljs.core.next.call(null,seq__6374_6395__$1);
var G__6403 = null;
var G__6404 = (0);
var G__6405 = (0);
seq__6374_6385 = G__6402;
chunk__6375_6386 = G__6403;
count__6376_6387 = G__6404;
i__6377_6388 = G__6405;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,"var ",mname_6383," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):params)),"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",(cljs.core.count.call(null,params) - (1)),") {");

var a_6406 = cljs.compiler.emit_arguments_to_array.call(null,(cljs.core.count.call(null,params) - (1)));
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params)," = new cljs.core.IndexedSeq(",a_6406,",0,null);");

cljs.compiler.emitln.call(null,"} ");
} else {
}

cljs.compiler.emits.call(null,"return ",delegate_name_6384,".call(this,");

var seq__6378_6407 = cljs.core.seq.call(null,params);
var chunk__6379_6408 = null;
var count__6380_6409 = (0);
var i__6381_6410 = (0);
while(true){
if((i__6381_6410 < count__6380_6409)){
var param_6411 = cljs.core._nth.call(null,chunk__6379_6408,i__6381_6410);
cljs.compiler.emit.call(null,param_6411);

if(cljs.core._EQ_.call(null,param_6411,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__6412 = seq__6378_6407;
var G__6413 = chunk__6379_6408;
var G__6414 = count__6380_6409;
var G__6415 = (i__6381_6410 + (1));
seq__6378_6407 = G__6412;
chunk__6379_6408 = G__6413;
count__6380_6409 = G__6414;
i__6381_6410 = G__6415;
continue;
} else {
var temp__5720__auto___6416 = cljs.core.seq.call(null,seq__6378_6407);
if(temp__5720__auto___6416){
var seq__6378_6417__$1 = temp__5720__auto___6416;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6378_6417__$1)){
var c__4550__auto___6418 = cljs.core.chunk_first.call(null,seq__6378_6417__$1);
var G__6419 = cljs.core.chunk_rest.call(null,seq__6378_6417__$1);
var G__6420 = c__4550__auto___6418;
var G__6421 = cljs.core.count.call(null,c__4550__auto___6418);
var G__6422 = (0);
seq__6378_6407 = G__6419;
chunk__6379_6408 = G__6420;
count__6380_6409 = G__6421;
i__6381_6410 = G__6422;
continue;
} else {
var param_6423 = cljs.core.first.call(null,seq__6378_6417__$1);
cljs.compiler.emit.call(null,param_6423);

if(cljs.core._EQ_.call(null,param_6423,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__6424 = cljs.core.next.call(null,seq__6378_6417__$1);
var G__6425 = null;
var G__6426 = (0);
var G__6427 = (0);
seq__6378_6407 = G__6424;
chunk__6379_6408 = G__6425;
count__6380_6409 = G__6426;
i__6381_6410 = G__6427;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,");");

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,mname_6383,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emits.call(null,mname_6383,".cljs$lang$applyTo = ");

cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,new cljs.core.Keyword(null,"name","name",1843675177),name_6382__$1));

cljs.compiler.emitln.call(null,";");

cljs.compiler.emitln.call(null,mname_6383,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_6384,";");

cljs.compiler.emitln.call(null,"return ",mname_6383,";");

cljs.compiler.emitln.call(null,"})()");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"fn","fn",-1175266204),(function (p__6431){
var map__6432 = p__6431;
var map__6432__$1 = (((((!((map__6432 == null))))?(((((map__6432.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6432.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6432):map__6432);
var variadic = cljs.core.get.call(null,map__6432__$1,new cljs.core.Keyword(null,"variadic?","variadic?",584179762));
var name = cljs.core.get.call(null,map__6432__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.call(null,map__6432__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var methods$ = cljs.core.get.call(null,map__6432__$1,new cljs.core.Keyword(null,"methods","methods",453930866));
var max_fixed_arity = cljs.core.get.call(null,map__6432__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var recur_frames = cljs.core.get.call(null,map__6432__$1,new cljs.core.Keyword(null,"recur-frames","recur-frames",-307205196));
var loop_lets = cljs.core.get.call(null,map__6432__$1,new cljs.core.Keyword(null,"loop-lets","loop-lets",2036794185));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),cljs.core.filter.call(null,((function (map__6432,map__6432__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__6428_SHARP_){
var and__4120__auto__ = p1__6428_SHARP_;
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.deref.call(null,new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(p1__6428_SHARP_));
} else {
return and__4120__auto__;
}
});})(map__6432,map__6432__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,recur_frames)),cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),loop_lets))));
if(loop_locals){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"((function (",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,cljs.compiler.munge,loop_locals)),"){");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emits.call(null,"return ");
}
} else {
}

if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,methods$))){
if(cljs.core.truth_(variadic)){
cljs.compiler.emit_variadic_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
} else {
cljs.compiler.emit_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
}
} else {
var name_6485__$1 = (function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_6486 = cljs.compiler.munge.call(null,name_6485__$1);
var maxparams_6487 = cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,new cljs.core.Keyword(null,"params","params",710516235),methods$));
var mmap_6488 = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (name_6485__$1,mname_6486,maxparams_6487,loop_locals,map__6432,map__6432__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_6486),"__",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
});})(name_6485__$1,mname_6486,maxparams_6487,loop_locals,map__6432,map__6432__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,methods$));
var ms_6489 = cljs.core.sort_by.call(null,((function (name_6485__$1,mname_6486,maxparams_6487,mmap_6488,loop_locals,map__6432,map__6432__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__6429_SHARP_){
return cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,p1__6429_SHARP_)));
});})(name_6485__$1,mname_6486,maxparams_6487,mmap_6488,loop_locals,map__6432,map__6432__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,cljs.core.seq.call(null,mmap_6488));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"(function() {");

cljs.compiler.emitln.call(null,"var ",mname_6486," = null;");

var seq__6434_6490 = cljs.core.seq.call(null,ms_6489);
var chunk__6435_6491 = null;
var count__6436_6492 = (0);
var i__6437_6493 = (0);
while(true){
if((i__6437_6493 < count__6436_6492)){
var vec__6444_6494 = cljs.core._nth.call(null,chunk__6435_6491,i__6437_6493);
var n_6495 = cljs.core.nth.call(null,vec__6444_6494,(0),null);
var meth_6496 = cljs.core.nth.call(null,vec__6444_6494,(1),null);
cljs.compiler.emits.call(null,"var ",n_6495," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_6496))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_6496);
} else {
cljs.compiler.emit_fn_method.call(null,meth_6496);
}

cljs.compiler.emitln.call(null,";");


var G__6497 = seq__6434_6490;
var G__6498 = chunk__6435_6491;
var G__6499 = count__6436_6492;
var G__6500 = (i__6437_6493 + (1));
seq__6434_6490 = G__6497;
chunk__6435_6491 = G__6498;
count__6436_6492 = G__6499;
i__6437_6493 = G__6500;
continue;
} else {
var temp__5720__auto___6501 = cljs.core.seq.call(null,seq__6434_6490);
if(temp__5720__auto___6501){
var seq__6434_6502__$1 = temp__5720__auto___6501;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6434_6502__$1)){
var c__4550__auto___6503 = cljs.core.chunk_first.call(null,seq__6434_6502__$1);
var G__6504 = cljs.core.chunk_rest.call(null,seq__6434_6502__$1);
var G__6505 = c__4550__auto___6503;
var G__6506 = cljs.core.count.call(null,c__4550__auto___6503);
var G__6507 = (0);
seq__6434_6490 = G__6504;
chunk__6435_6491 = G__6505;
count__6436_6492 = G__6506;
i__6437_6493 = G__6507;
continue;
} else {
var vec__6447_6508 = cljs.core.first.call(null,seq__6434_6502__$1);
var n_6509 = cljs.core.nth.call(null,vec__6447_6508,(0),null);
var meth_6510 = cljs.core.nth.call(null,vec__6447_6508,(1),null);
cljs.compiler.emits.call(null,"var ",n_6509," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_6510))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_6510);
} else {
cljs.compiler.emit_fn_method.call(null,meth_6510);
}

cljs.compiler.emitln.call(null,";");


var G__6511 = cljs.core.next.call(null,seq__6434_6502__$1);
var G__6512 = null;
var G__6513 = (0);
var G__6514 = (0);
seq__6434_6490 = G__6511;
chunk__6435_6491 = G__6512;
count__6436_6492 = G__6513;
i__6437_6493 = G__6514;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,mname_6486," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_6487),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):maxparams_6487)),"){");

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,maxparams_6487));

cljs.compiler.emitln.call(null," = var_args;");
} else {
}

cljs.compiler.emitln.call(null,"switch(arguments.length){");

var seq__6450_6515 = cljs.core.seq.call(null,ms_6489);
var chunk__6451_6516 = null;
var count__6452_6517 = (0);
var i__6453_6518 = (0);
while(true){
if((i__6453_6518 < count__6452_6517)){
var vec__6460_6519 = cljs.core._nth.call(null,chunk__6451_6516,i__6453_6518);
var n_6520 = cljs.core.nth.call(null,vec__6460_6519,(0),null);
var meth_6521 = cljs.core.nth.call(null,vec__6460_6519,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_6521))){
cljs.compiler.emitln.call(null,"default:");

var restarg_6522 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_6522," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_6523 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_6522," = new cljs.core.IndexedSeq(",a_6523,",0,null);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_6520,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_6487)),(((cljs.core.count.call(null,maxparams_6487) > (1)))?", ":null),restarg_6522,");");
} else {
var pcnt_6524 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_6521));
cljs.compiler.emitln.call(null,"case ",pcnt_6524,":");

cljs.compiler.emitln.call(null,"return ",n_6520,".call(this",(((pcnt_6524 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_6524,maxparams_6487)),null,(1),null)),(2),null))),");");
}


var G__6525 = seq__6450_6515;
var G__6526 = chunk__6451_6516;
var G__6527 = count__6452_6517;
var G__6528 = (i__6453_6518 + (1));
seq__6450_6515 = G__6525;
chunk__6451_6516 = G__6526;
count__6452_6517 = G__6527;
i__6453_6518 = G__6528;
continue;
} else {
var temp__5720__auto___6529 = cljs.core.seq.call(null,seq__6450_6515);
if(temp__5720__auto___6529){
var seq__6450_6530__$1 = temp__5720__auto___6529;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6450_6530__$1)){
var c__4550__auto___6531 = cljs.core.chunk_first.call(null,seq__6450_6530__$1);
var G__6532 = cljs.core.chunk_rest.call(null,seq__6450_6530__$1);
var G__6533 = c__4550__auto___6531;
var G__6534 = cljs.core.count.call(null,c__4550__auto___6531);
var G__6535 = (0);
seq__6450_6515 = G__6532;
chunk__6451_6516 = G__6533;
count__6452_6517 = G__6534;
i__6453_6518 = G__6535;
continue;
} else {
var vec__6463_6536 = cljs.core.first.call(null,seq__6450_6530__$1);
var n_6537 = cljs.core.nth.call(null,vec__6463_6536,(0),null);
var meth_6538 = cljs.core.nth.call(null,vec__6463_6536,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_6538))){
cljs.compiler.emitln.call(null,"default:");

var restarg_6539 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_6539," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_6540 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_6539," = new cljs.core.IndexedSeq(",a_6540,",0,null);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_6537,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_6487)),(((cljs.core.count.call(null,maxparams_6487) > (1)))?", ":null),restarg_6539,");");
} else {
var pcnt_6541 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_6538));
cljs.compiler.emitln.call(null,"case ",pcnt_6541,":");

cljs.compiler.emitln.call(null,"return ",n_6537,".call(this",(((pcnt_6541 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_6541,maxparams_6487)),null,(1),null)),(2),null))),");");
}


var G__6542 = cljs.core.next.call(null,seq__6450_6530__$1);
var G__6543 = null;
var G__6544 = (0);
var G__6545 = (0);
seq__6450_6515 = G__6542;
chunk__6451_6516 = G__6543;
count__6452_6517 = G__6544;
i__6453_6518 = G__6545;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"}");

var arg_count_js_6546 = ((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"self__","self__",-153190816,null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.val.call(null,cljs.core.first.call(null,ms_6489)))))))?"(arguments.length - 1)":"arguments.length");
cljs.compiler.emitln.call(null,"throw(new Error('Invalid arity: ' + ",arg_count_js_6546,"));");

cljs.compiler.emitln.call(null,"};");

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.call(null,mname_6486,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emitln.call(null,mname_6486,".cljs$lang$applyTo = ",cljs.core.some.call(null,((function (name_6485__$1,mname_6486,maxparams_6487,mmap_6488,ms_6489,loop_locals,map__6432,map__6432__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__6430_SHARP_){
var vec__6466 = p1__6430_SHARP_;
var n = cljs.core.nth.call(null,vec__6466,(0),null);
var m = cljs.core.nth.call(null,vec__6466,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
});})(name_6485__$1,mname_6486,maxparams_6487,mmap_6488,ms_6489,loop_locals,map__6432,map__6432__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,ms_6489),".cljs$lang$applyTo;");
} else {
}

var seq__6469_6547 = cljs.core.seq.call(null,ms_6489);
var chunk__6470_6548 = null;
var count__6471_6549 = (0);
var i__6472_6550 = (0);
while(true){
if((i__6472_6550 < count__6471_6549)){
var vec__6479_6551 = cljs.core._nth.call(null,chunk__6470_6548,i__6472_6550);
var n_6552 = cljs.core.nth.call(null,vec__6479_6551,(0),null);
var meth_6553 = cljs.core.nth.call(null,vec__6479_6551,(1),null);
var c_6554 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_6553));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_6553))){
cljs.compiler.emitln.call(null,mname_6486,".cljs$core$IFn$_invoke$arity$variadic = ",n_6552,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_6486,".cljs$core$IFn$_invoke$arity$",c_6554," = ",n_6552,";");
}


var G__6555 = seq__6469_6547;
var G__6556 = chunk__6470_6548;
var G__6557 = count__6471_6549;
var G__6558 = (i__6472_6550 + (1));
seq__6469_6547 = G__6555;
chunk__6470_6548 = G__6556;
count__6471_6549 = G__6557;
i__6472_6550 = G__6558;
continue;
} else {
var temp__5720__auto___6559 = cljs.core.seq.call(null,seq__6469_6547);
if(temp__5720__auto___6559){
var seq__6469_6560__$1 = temp__5720__auto___6559;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6469_6560__$1)){
var c__4550__auto___6561 = cljs.core.chunk_first.call(null,seq__6469_6560__$1);
var G__6562 = cljs.core.chunk_rest.call(null,seq__6469_6560__$1);
var G__6563 = c__4550__auto___6561;
var G__6564 = cljs.core.count.call(null,c__4550__auto___6561);
var G__6565 = (0);
seq__6469_6547 = G__6562;
chunk__6470_6548 = G__6563;
count__6471_6549 = G__6564;
i__6472_6550 = G__6565;
continue;
} else {
var vec__6482_6566 = cljs.core.first.call(null,seq__6469_6560__$1);
var n_6567 = cljs.core.nth.call(null,vec__6482_6566,(0),null);
var meth_6568 = cljs.core.nth.call(null,vec__6482_6566,(1),null);
var c_6569 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_6568));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_6568))){
cljs.compiler.emitln.call(null,mname_6486,".cljs$core$IFn$_invoke$arity$variadic = ",n_6567,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_6486,".cljs$core$IFn$_invoke$arity$",c_6569," = ",n_6567,";");
}


var G__6570 = cljs.core.next.call(null,seq__6469_6560__$1);
var G__6571 = null;
var G__6572 = (0);
var G__6573 = (0);
seq__6469_6547 = G__6570;
chunk__6470_6548 = G__6571;
count__6471_6549 = G__6572;
i__6472_6550 = G__6573;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"return ",mname_6486,";");

cljs.compiler.emitln.call(null,"})()");
}

if(loop_locals){
return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else {
return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"do","do",46310725),(function (p__6574){
var map__6575 = p__6574;
var map__6575__$1 = (((((!((map__6575 == null))))?(((((map__6575.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6575.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6575):map__6575);
var statements = cljs.core.get.call(null,map__6575__$1,new cljs.core.Keyword(null,"statements","statements",600349855));
var ret = cljs.core.get.call(null,map__6575__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var env = cljs.core.get.call(null,map__6575__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(((cljs.core.seq.call(null,statements)) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)))){
cljs.compiler.emitln.call(null,"(function (){");
} else {
}

var seq__6577_6581 = cljs.core.seq.call(null,statements);
var chunk__6578_6582 = null;
var count__6579_6583 = (0);
var i__6580_6584 = (0);
while(true){
if((i__6580_6584 < count__6579_6583)){
var s_6585 = cljs.core._nth.call(null,chunk__6578_6582,i__6580_6584);
cljs.compiler.emitln.call(null,s_6585);


var G__6586 = seq__6577_6581;
var G__6587 = chunk__6578_6582;
var G__6588 = count__6579_6583;
var G__6589 = (i__6580_6584 + (1));
seq__6577_6581 = G__6586;
chunk__6578_6582 = G__6587;
count__6579_6583 = G__6588;
i__6580_6584 = G__6589;
continue;
} else {
var temp__5720__auto___6590 = cljs.core.seq.call(null,seq__6577_6581);
if(temp__5720__auto___6590){
var seq__6577_6591__$1 = temp__5720__auto___6590;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6577_6591__$1)){
var c__4550__auto___6592 = cljs.core.chunk_first.call(null,seq__6577_6591__$1);
var G__6593 = cljs.core.chunk_rest.call(null,seq__6577_6591__$1);
var G__6594 = c__4550__auto___6592;
var G__6595 = cljs.core.count.call(null,c__4550__auto___6592);
var G__6596 = (0);
seq__6577_6581 = G__6593;
chunk__6578_6582 = G__6594;
count__6579_6583 = G__6595;
i__6580_6584 = G__6596;
continue;
} else {
var s_6597 = cljs.core.first.call(null,seq__6577_6591__$1);
cljs.compiler.emitln.call(null,s_6597);


var G__6598 = cljs.core.next.call(null,seq__6577_6591__$1);
var G__6599 = null;
var G__6600 = (0);
var G__6601 = (0);
seq__6577_6581 = G__6598;
chunk__6578_6582 = G__6599;
count__6579_6583 = G__6600;
i__6580_6584 = G__6601;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emit.call(null,ret);

if(((cljs.core.seq.call(null,statements)) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)))){
return cljs.compiler.emitln.call(null,"})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"try","try",1380742522),(function (p__6602){
var map__6603 = p__6602;
var map__6603__$1 = (((((!((map__6603 == null))))?(((((map__6603.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6603.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6603):map__6603);
var try$ = cljs.core.get.call(null,map__6603__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var env = cljs.core.get.call(null,map__6603__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var catch$ = cljs.core.get.call(null,map__6603__$1,new cljs.core.Keyword(null,"catch","catch",1038065524));
var name = cljs.core.get.call(null,map__6603__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var finally$ = cljs.core.get.call(null,map__6603__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return finally$;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,"try{",try$,"}");

if(cljs.core.truth_(name)){
cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){",catch$,"}");
} else {
}

if(cljs.core.truth_(finally$)){
if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"const","const",1709929842),new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.unwrap_quote.call(null,finally$)))){
} else {
throw (new Error(["Assert failed: ","finally block cannot contain constant","\n","(not= :const (:op (ana/unwrap-quote finally)))"].join('')));
}

cljs.compiler.emits.call(null,"finally {",finally$,"}");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
} else {
return cljs.compiler.emits.call(null,try$);
}
}));
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__6605,is_loop){
var map__6606 = p__6605;
var map__6606__$1 = (((((!((map__6606 == null))))?(((((map__6606.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6606.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6606):map__6606);
var expr = cljs.core.get.call(null,map__6606__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var bindings = cljs.core.get.call(null,map__6606__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var env = cljs.core.get.call(null,map__6606__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var _STAR_lexical_renames_STAR__orig_val__6608_6622 = cljs.compiler._STAR_lexical_renames_STAR_;
var _STAR_lexical_renames_STAR__temp_val__6609_6623 = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),context))?cljs.core.map.call(null,((function (_STAR_lexical_renames_STAR__orig_val__6608_6622,context,map__6606,map__6606__$1,expr,bindings,env){
return (function (binding){
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope.call(null,binding),cljs.core.gensym.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"-"].join(''))],null));
});})(_STAR_lexical_renames_STAR__orig_val__6608_6622,context,map__6606,map__6606__$1,expr,bindings,env))
,bindings):null));
cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__temp_val__6609_6623;

try{var seq__6610_6624 = cljs.core.seq.call(null,bindings);
var chunk__6611_6625 = null;
var count__6612_6626 = (0);
var i__6613_6627 = (0);
while(true){
if((i__6613_6627 < count__6612_6626)){
var map__6618_6628 = cljs.core._nth.call(null,chunk__6611_6625,i__6613_6627);
var map__6618_6629__$1 = (((((!((map__6618_6628 == null))))?(((((map__6618_6628.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6618_6628.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6618_6628):map__6618_6628);
var binding_6630 = map__6618_6629__$1;
var init_6631 = cljs.core.get.call(null,map__6618_6629__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_6630);

cljs.compiler.emitln.call(null," = ",init_6631,";");


var G__6632 = seq__6610_6624;
var G__6633 = chunk__6611_6625;
var G__6634 = count__6612_6626;
var G__6635 = (i__6613_6627 + (1));
seq__6610_6624 = G__6632;
chunk__6611_6625 = G__6633;
count__6612_6626 = G__6634;
i__6613_6627 = G__6635;
continue;
} else {
var temp__5720__auto___6636 = cljs.core.seq.call(null,seq__6610_6624);
if(temp__5720__auto___6636){
var seq__6610_6637__$1 = temp__5720__auto___6636;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6610_6637__$1)){
var c__4550__auto___6638 = cljs.core.chunk_first.call(null,seq__6610_6637__$1);
var G__6639 = cljs.core.chunk_rest.call(null,seq__6610_6637__$1);
var G__6640 = c__4550__auto___6638;
var G__6641 = cljs.core.count.call(null,c__4550__auto___6638);
var G__6642 = (0);
seq__6610_6624 = G__6639;
chunk__6611_6625 = G__6640;
count__6612_6626 = G__6641;
i__6613_6627 = G__6642;
continue;
} else {
var map__6620_6643 = cljs.core.first.call(null,seq__6610_6637__$1);
var map__6620_6644__$1 = (((((!((map__6620_6643 == null))))?(((((map__6620_6643.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6620_6643.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6620_6643):map__6620_6643);
var binding_6645 = map__6620_6644__$1;
var init_6646 = cljs.core.get.call(null,map__6620_6644__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_6645);

cljs.compiler.emitln.call(null," = ",init_6646,";");


var G__6647 = cljs.core.next.call(null,seq__6610_6637__$1);
var G__6648 = null;
var G__6649 = (0);
var G__6650 = (0);
seq__6610_6624 = G__6647;
chunk__6611_6625 = G__6648;
count__6612_6626 = G__6649;
i__6613_6627 = G__6650;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__orig_val__6608_6622;
}
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"let","let",-1282412701),(function (ast){
return cljs.compiler.emit_let.call(null,ast,false);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"loop","loop",-395552849),(function (ast){
return cljs.compiler.emit_let.call(null,ast,true);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"recur","recur",-437573268),(function (p__6651){
var map__6652 = p__6651;
var map__6652__$1 = (((((!((map__6652 == null))))?(((((map__6652.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6652.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6652):map__6652);
var frame = cljs.core.get.call(null,map__6652__$1,new cljs.core.Keyword(null,"frame","frame",-1711082588));
var exprs = cljs.core.get.call(null,map__6652__$1,new cljs.core.Keyword(null,"exprs","exprs",1795829094));
var env = cljs.core.get.call(null,map__6652__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(frame);
var n__4607__auto___6654 = cljs.core.count.call(null,exprs);
var i_6655 = (0);
while(true){
if((i_6655 < n__4607__auto___6654)){
cljs.compiler.emitln.call(null,"var ",temps.call(null,i_6655)," = ",exprs.call(null,i_6655),";");

var G__6656 = (i_6655 + (1));
i_6655 = G__6656;
continue;
} else {
}
break;
}

var n__4607__auto___6657 = cljs.core.count.call(null,exprs);
var i_6658 = (0);
while(true){
if((i_6658 < n__4607__auto___6657)){
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_6658))," = ",temps.call(null,i_6658),";");

var G__6659 = (i_6658 + (1));
i_6658 = G__6659;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.call(null,"continue;");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"letfn","letfn",-2121022354),(function (p__6660){
var map__6661 = p__6660;
var map__6661__$1 = (((((!((map__6661 == null))))?(((((map__6661.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6661.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6661):map__6661);
var expr = cljs.core.get.call(null,map__6661__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var bindings = cljs.core.get.call(null,map__6661__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var env = cljs.core.get.call(null,map__6661__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var seq__6663_6675 = cljs.core.seq.call(null,bindings);
var chunk__6664_6676 = null;
var count__6665_6677 = (0);
var i__6666_6678 = (0);
while(true){
if((i__6666_6678 < count__6665_6677)){
var map__6671_6679 = cljs.core._nth.call(null,chunk__6664_6676,i__6666_6678);
var map__6671_6680__$1 = (((((!((map__6671_6679 == null))))?(((((map__6671_6679.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6671_6679.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6671_6679):map__6671_6679);
var binding_6681 = map__6671_6680__$1;
var init_6682 = cljs.core.get.call(null,map__6671_6680__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_6681)," = ",init_6682,";");


var G__6683 = seq__6663_6675;
var G__6684 = chunk__6664_6676;
var G__6685 = count__6665_6677;
var G__6686 = (i__6666_6678 + (1));
seq__6663_6675 = G__6683;
chunk__6664_6676 = G__6684;
count__6665_6677 = G__6685;
i__6666_6678 = G__6686;
continue;
} else {
var temp__5720__auto___6687 = cljs.core.seq.call(null,seq__6663_6675);
if(temp__5720__auto___6687){
var seq__6663_6688__$1 = temp__5720__auto___6687;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6663_6688__$1)){
var c__4550__auto___6689 = cljs.core.chunk_first.call(null,seq__6663_6688__$1);
var G__6690 = cljs.core.chunk_rest.call(null,seq__6663_6688__$1);
var G__6691 = c__4550__auto___6689;
var G__6692 = cljs.core.count.call(null,c__4550__auto___6689);
var G__6693 = (0);
seq__6663_6675 = G__6690;
chunk__6664_6676 = G__6691;
count__6665_6677 = G__6692;
i__6666_6678 = G__6693;
continue;
} else {
var map__6673_6694 = cljs.core.first.call(null,seq__6663_6688__$1);
var map__6673_6695__$1 = (((((!((map__6673_6694 == null))))?(((((map__6673_6694.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6673_6694.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6673_6694):map__6673_6694);
var binding_6696 = map__6673_6695__$1;
var init_6697 = cljs.core.get.call(null,map__6673_6695__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_6696)," = ",init_6697,";");


var G__6698 = cljs.core.next.call(null,seq__6663_6688__$1);
var G__6699 = null;
var G__6700 = (0);
var G__6701 = (0);
seq__6663_6675 = G__6698;
chunk__6664_6676 = G__6699;
count__6665_6677 = G__6700;
i__6666_6678 = G__6701;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,expr);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
}));
cljs.compiler.protocol_prefix = (function cljs$compiler$protocol_prefix(psym){
return cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(psym).replace((new RegExp("\\.","g")),"$").replace("/","$")),"$"].join(''));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"invoke","invoke",1145927159),(function (p__6704){
var map__6705 = p__6704;
var map__6705__$1 = (((((!((map__6705 == null))))?(((((map__6705.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6705.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6705):map__6705);
var expr = map__6705__$1;
var f = cljs.core.get.call(null,map__6705__$1,new cljs.core.Keyword(null,"fn","fn",-1175266204));
var args = cljs.core.get.call(null,map__6705__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__6705__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__4120__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4120__auto__){
var and__4120__auto____$1 = cljs.core.not.call(null,new cljs.core.Keyword(null,"dynamic","dynamic",704819571).cljs$core$IFn$_invoke$arity$1(info));
if(and__4120__auto____$1){
return new cljs.core.Keyword(null,"fn-var","fn-var",1086204730).cljs$core$IFn$_invoke$arity$1(info);
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})();
var protocol = new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__4120__auto__ = protocol;
if(cljs.core.truth_(and__4120__auto__)){
var and__4120__auto____$1 = tag;
if(cljs.core.truth_(and__4120__auto____$1)){
var or__4131__auto__ = (function (){var and__4120__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4120__auto____$2){
var and__4120__auto____$3 = protocol;
if(cljs.core.truth_(and__4120__auto____$3)){
return cljs.core._EQ_.call(null,tag,new cljs.core.Symbol(null,"not-native","not-native",-236392494,null));
} else {
return and__4120__auto____$3;
}
} else {
return and__4120__auto____$2;
}
})();
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var and__4120__auto____$2 = (function (){var or__4131__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
return new cljs.core.Keyword(null,"protocol-inline","protocol-inline",1550487556).cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__4120__auto____$2)){
var or__4131__auto____$1 = cljs.core._EQ_.call(null,protocol,tag);
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
var and__4120__auto____$3 = (!(cljs.core.set_QMARK_.call(null,tag)));
if(and__4120__auto____$3){
var and__4120__auto____$4 = cljs.core.not.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [new cljs.core.Symbol(null,"clj","clj",980036099,null),"null",new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),"null",new cljs.core.Symbol(null,"object","object",-1179821820,null),"null",new cljs.core.Symbol(null,"any","any",-948528346,null),"null",new cljs.core.Symbol(null,"js","js",-886355190,null),"null",new cljs.core.Symbol(null,"number","number",-1084057331,null),"null",new cljs.core.Symbol(null,"clj-or-nil","clj-or-nil",-2008798668,null),"null",new cljs.core.Symbol(null,"array","array",-440182315,null),"null",new cljs.core.Symbol(null,"string","string",-349010059,null),"null",new cljs.core.Symbol(null,"function","function",-486723946,null),"null",new cljs.core.Symbol(null,"clj-nil","clj-nil",1321798654,null),"null"], null), null).call(null,tag));
if(and__4120__auto____$4){
var temp__5720__auto__ = new cljs.core.Keyword(null,"protocols","protocols",-5615896).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var.call(null,env,tag));
if(cljs.core.truth_(temp__5720__auto__)){
var ps = temp__5720__auto__;
return ps.call(null,protocol);
} else {
return null;
}
} else {
return and__4120__auto____$4;
}
} else {
return and__4120__auto____$3;
}
}
} else {
return and__4120__auto____$2;
}
}
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})();
var opt_not_QMARK_ = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Symbol("cljs.core","not","cljs.core/not",100665144,null))) && (cljs.core._EQ_.call(null,cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr))),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null))));
var ns = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(info);
var js_QMARK_ = ((cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"js","js",-886355190,null))) || (cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"Math","Math",2033287572,null))));
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__4131__auto__ = cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"goog","goog",-70603925,null));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = (function (){var temp__5720__auto__ = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
if(cljs.core.truth_(temp__5720__auto__)){
var ns_str = temp__5720__auto__;
return cljs.core._EQ_.call(null,cljs.core.get.call(null,clojure.string.split.call(null,ns_str,/\./),(0),null),"goog");
} else {
return null;
}
})();
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return (!(cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),ns)));
}
}
})():null);
var keyword_QMARK_ = (function (){var or__4131__auto__ = cljs.core._EQ_.call(null,new cljs.core.Symbol("cljs.core","Keyword","cljs.core/Keyword",-451434488,null),cljs.analyzer.infer_tag.call(null,env,f));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var f__$1 = cljs.analyzer.unwrap_quote.call(null,f);
return ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1),new cljs.core.Keyword(null,"const","const",1709929842))) && ((new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(f__$1) instanceof cljs.core.Keyword)));
}
})();
var vec__6707 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
var variadic_QMARK_ = new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(info);
var mps = new cljs.core.Keyword(null,"method-params","method-params",-980792179).cljs$core$IFn$_invoke$arity$1(info);
var mfa = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(info);
if(((cljs.core.not.call(null,variadic_QMARK_)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,mps),(1))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__4120__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__4120__auto__)){
return (arity > mfa);
} else {
return and__4120__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__6705,map__6705__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,info__$1)),".cljs$core$IFn$_invoke$arity$variadic"].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__6705,map__6705__$1,expr,f,args,env){
return (function (p1__6702_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__6702_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__6705,map__6705__$1,expr,f,args,env))
);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__6705,map__6705__$1,expr,f,args,env))
),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543),mfa], null)], null);
} else {
var arities = cljs.core.map.call(null,cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.createAsIfByAssoc([arity]),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__6705,map__6705__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,info__$1)),".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__6705,map__6705__$1,expr,f,args,env){
return (function (p1__6703_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__6703_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__6705,map__6705__$1,expr,f,args,env))
);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__6705,map__6705__$1,expr,f,args,env))
),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.call(null,vec__6707,(0),null);
var variadic_invoke = cljs.core.nth.call(null,vec__6707,(1),null);
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.call(null,"(!(",cljs.core.first.call(null,args),"))");
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_6710 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,cljs.core.name.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info)))),"$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_6710,"(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",cljs.core.rest.call(null,args))),")");
} else {
if(keyword_QMARK_){
cljs.compiler.emits.call(null,f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count.call(null,args),"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_6711 = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_6711,args)),(((mfa_6711 === (0)))?null:","),"cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_6711,args)),"], 0))");
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = js_QMARK_;
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4120__auto__){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"var","var",-769682797),null,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),null,new cljs.core.Keyword(null,"local","local",-1497766724),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1));
} else {
return and__4120__auto__;
}
})())){
var fprop_6712 = [".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,args))].join('');
if(cljs.analyzer._STAR_fn_invoke_direct_STAR_){
cljs.compiler.emits.call(null,"(",f__$1,fprop_6712," ? ",f__$1,fprop_6712,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,"(",cljs.compiler.comma_sep.call(null,args),"))");
} else {
cljs.compiler.emits.call(null,"(",f__$1,fprop_6712," ? ",f__$1,fprop_6712,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
}
} else {
cljs.compiler.emits.call(null,f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
}

}
}
}
}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"new","new",-2085437848),(function (p__6713){
var map__6714 = p__6713;
var map__6714__$1 = (((((!((map__6714 == null))))?(((((map__6714.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6714.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6714):map__6714);
var ctor = cljs.core.get.call(null,map__6714__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var args = cljs.core.get.call(null,map__6714__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__6714__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set!","set!",-1389817006),(function (p__6716){
var map__6717 = p__6716;
var map__6717__$1 = (((((!((map__6717 == null))))?(((((map__6717.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6717.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6717):map__6717);
var target = cljs.core.get.call(null,map__6717__$1,new cljs.core.Keyword(null,"target","target",253001721));
var val = cljs.core.get.call(null,map__6717__$1,new cljs.core.Keyword(null,"val","val",128701612));
var env = cljs.core.get.call(null,map__6717__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,target," = ",val);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_global_export = (function cljs$compiler$emit_global_export(ns_name,global_exports,lib){
return cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_global_export.call(null,lib)," = goog.global",cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (prop){
return ["[\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop),"\"]"].join('');
}),clojure.string.split.call(null,cljs.core.name.call(null,(function (){var or__4131__auto__ = cljs.core.get.call(null,global_exports,cljs.core.symbol.call(null,lib));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.get.call(null,global_exports,cljs.core.name.call(null,lib));
}
})()),/\./))),";");
});
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads,deps,ns_name){
var map__6719 = cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_);
var map__6719__$1 = (((((!((map__6719 == null))))?(((((map__6719.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6719.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6719):map__6719);
var options = cljs.core.get.call(null,map__6719__$1,new cljs.core.Keyword(null,"options","options",99638489));
var js_dependency_index = cljs.core.get.call(null,map__6719__$1,new cljs.core.Keyword(null,"js-dependency-index","js-dependency-index",-1887042131));
var map__6720 = options;
var map__6720__$1 = (((((!((map__6720 == null))))?(((((map__6720.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6720.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6720):map__6720);
var target = cljs.core.get.call(null,map__6720__$1,new cljs.core.Keyword(null,"target","target",253001721));
var optimizations = cljs.core.get.call(null,map__6720__$1,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854));
var loaded_libs = cljs.compiler.munge.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null));
var loaded_libs_temp = cljs.compiler.munge.call(null,cljs.core.gensym.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null)));
var vec__6721 = (function (){var libs__$1 = cljs.core.remove.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,seen)),cljs.core.filter.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,libs)),deps));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"nodejs","nodejs",321212524),target)){
var map__6726 = cljs.core.group_by.call(null,cljs.analyzer.node_module_dep_QMARK_,libs__$1);
var map__6726__$1 = (((((!((map__6726 == null))))?(((((map__6726.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6726.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6726):map__6726);
var node_libs = cljs.core.get.call(null,map__6726__$1,true);
var libs_to_load = cljs.core.get.call(null,map__6726__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node_libs,libs_to_load], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,libs__$1], null);
}
})();
var node_libs = cljs.core.nth.call(null,vec__6721,(0),null);
var libs_to_load = cljs.core.nth.call(null,vec__6721,(1),null);
var global_exports_libs = cljs.core.filter.call(null,cljs.analyzer.dep_has_global_exports_QMARK_,libs_to_load);
if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set([\"cljs.core\"]);");

cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.set([\"cljs.core\"]);");
} else {
}

var seq__6728_6748 = cljs.core.seq.call(null,libs_to_load);
var chunk__6729_6749 = null;
var count__6730_6750 = (0);
var i__6731_6751 = (0);
while(true){
if((i__6731_6751 < count__6730_6750)){
var lib_6752 = cljs.core._nth.call(null,chunk__6729_6749,i__6731_6751);
if(((cljs.analyzer.foreign_dep_QMARK_.call(null,lib_6752)) && ((!(cljs.core.keyword_identical_QMARK_.call(null,optimizations,new cljs.core.Keyword(null,"none","none",1333468478))))))){
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_6752),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_6752),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_6752),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_6752),"', 'reload-all');");
} else {
if(cljs.core._EQ_.call(null,lib_6752,new cljs.core.Symbol(null,"goog","goog",-70603925,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_6752),"');");
}

}
}
}


var G__6753 = seq__6728_6748;
var G__6754 = chunk__6729_6749;
var G__6755 = count__6730_6750;
var G__6756 = (i__6731_6751 + (1));
seq__6728_6748 = G__6753;
chunk__6729_6749 = G__6754;
count__6730_6750 = G__6755;
i__6731_6751 = G__6756;
continue;
} else {
var temp__5720__auto___6757 = cljs.core.seq.call(null,seq__6728_6748);
if(temp__5720__auto___6757){
var seq__6728_6758__$1 = temp__5720__auto___6757;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6728_6758__$1)){
var c__4550__auto___6759 = cljs.core.chunk_first.call(null,seq__6728_6758__$1);
var G__6760 = cljs.core.chunk_rest.call(null,seq__6728_6758__$1);
var G__6761 = c__4550__auto___6759;
var G__6762 = cljs.core.count.call(null,c__4550__auto___6759);
var G__6763 = (0);
seq__6728_6748 = G__6760;
chunk__6729_6749 = G__6761;
count__6730_6750 = G__6762;
i__6731_6751 = G__6763;
continue;
} else {
var lib_6764 = cljs.core.first.call(null,seq__6728_6758__$1);
if(((cljs.analyzer.foreign_dep_QMARK_.call(null,lib_6764)) && ((!(cljs.core.keyword_identical_QMARK_.call(null,optimizations,new cljs.core.Keyword(null,"none","none",1333468478))))))){
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_6764),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_6764),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_6764),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_6764),"', 'reload-all');");
} else {
if(cljs.core._EQ_.call(null,lib_6764,new cljs.core.Symbol(null,"goog","goog",-70603925,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_6764),"');");
}

}
}
}


var G__6765 = cljs.core.next.call(null,seq__6728_6758__$1);
var G__6766 = null;
var G__6767 = (0);
var G__6768 = (0);
seq__6728_6748 = G__6765;
chunk__6729_6749 = G__6766;
count__6730_6750 = G__6767;
i__6731_6751 = G__6768;
continue;
}
} else {
}
}
break;
}

var seq__6732_6769 = cljs.core.seq.call(null,node_libs);
var chunk__6733_6770 = null;
var count__6734_6771 = (0);
var i__6735_6772 = (0);
while(true){
if((i__6735_6772 < count__6734_6771)){
var lib_6773 = cljs.core._nth.call(null,chunk__6733_6770,i__6735_6772);
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_node_lib.call(null,lib_6773)," = require('",lib_6773,"');");


var G__6774 = seq__6732_6769;
var G__6775 = chunk__6733_6770;
var G__6776 = count__6734_6771;
var G__6777 = (i__6735_6772 + (1));
seq__6732_6769 = G__6774;
chunk__6733_6770 = G__6775;
count__6734_6771 = G__6776;
i__6735_6772 = G__6777;
continue;
} else {
var temp__5720__auto___6778 = cljs.core.seq.call(null,seq__6732_6769);
if(temp__5720__auto___6778){
var seq__6732_6779__$1 = temp__5720__auto___6778;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6732_6779__$1)){
var c__4550__auto___6780 = cljs.core.chunk_first.call(null,seq__6732_6779__$1);
var G__6781 = cljs.core.chunk_rest.call(null,seq__6732_6779__$1);
var G__6782 = c__4550__auto___6780;
var G__6783 = cljs.core.count.call(null,c__4550__auto___6780);
var G__6784 = (0);
seq__6732_6769 = G__6781;
chunk__6733_6770 = G__6782;
count__6734_6771 = G__6783;
i__6735_6772 = G__6784;
continue;
} else {
var lib_6785 = cljs.core.first.call(null,seq__6732_6779__$1);
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_node_lib.call(null,lib_6785)," = require('",lib_6785,"');");


var G__6786 = cljs.core.next.call(null,seq__6732_6779__$1);
var G__6787 = null;
var G__6788 = (0);
var G__6789 = (0);
seq__6732_6769 = G__6786;
chunk__6733_6770 = G__6787;
count__6734_6771 = G__6788;
i__6735_6772 = G__6789;
continue;
}
} else {
}
}
break;
}

var seq__6736_6790 = cljs.core.seq.call(null,global_exports_libs);
var chunk__6737_6791 = null;
var count__6738_6792 = (0);
var i__6739_6793 = (0);
while(true){
if((i__6739_6793 < count__6738_6792)){
var lib_6794 = cljs.core._nth.call(null,chunk__6737_6791,i__6739_6793);
var map__6744_6795 = cljs.core.get.call(null,js_dependency_index,cljs.core.name.call(null,lib_6794));
var map__6744_6796__$1 = (((((!((map__6744_6795 == null))))?(((((map__6744_6795.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6744_6795.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6744_6795):map__6744_6795);
var global_exports_6797 = cljs.core.get.call(null,map__6744_6796__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
cljs.compiler.emit_global_export.call(null,ns_name,global_exports_6797,lib_6794);


var G__6798 = seq__6736_6790;
var G__6799 = chunk__6737_6791;
var G__6800 = count__6738_6792;
var G__6801 = (i__6739_6793 + (1));
seq__6736_6790 = G__6798;
chunk__6737_6791 = G__6799;
count__6738_6792 = G__6800;
i__6739_6793 = G__6801;
continue;
} else {
var temp__5720__auto___6802 = cljs.core.seq.call(null,seq__6736_6790);
if(temp__5720__auto___6802){
var seq__6736_6803__$1 = temp__5720__auto___6802;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6736_6803__$1)){
var c__4550__auto___6804 = cljs.core.chunk_first.call(null,seq__6736_6803__$1);
var G__6805 = cljs.core.chunk_rest.call(null,seq__6736_6803__$1);
var G__6806 = c__4550__auto___6804;
var G__6807 = cljs.core.count.call(null,c__4550__auto___6804);
var G__6808 = (0);
seq__6736_6790 = G__6805;
chunk__6737_6791 = G__6806;
count__6738_6792 = G__6807;
i__6739_6793 = G__6808;
continue;
} else {
var lib_6809 = cljs.core.first.call(null,seq__6736_6803__$1);
var map__6746_6810 = cljs.core.get.call(null,js_dependency_index,cljs.core.name.call(null,lib_6809));
var map__6746_6811__$1 = (((((!((map__6746_6810 == null))))?(((((map__6746_6810.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6746_6810.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6746_6810):map__6746_6810);
var global_exports_6812 = cljs.core.get.call(null,map__6746_6811__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
cljs.compiler.emit_global_export.call(null,ns_name,global_exports_6812,lib_6809);


var G__6813 = cljs.core.next.call(null,seq__6736_6803__$1);
var G__6814 = null;
var G__6815 = (0);
var G__6816 = (0);
seq__6736_6790 = G__6813;
chunk__6737_6791 = G__6814;
count__6738_6792 = G__6815;
i__6739_6793 = G__6816;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
return cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.into(",loaded_libs_temp,", ",loaded_libs,");");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"ns*","ns*",200417856),(function (p__6817){
var map__6818 = p__6817;
var map__6818__$1 = (((((!((map__6818 == null))))?(((((map__6818.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6818.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6818):map__6818);
var name = cljs.core.get.call(null,map__6818__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.call(null,map__6818__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.call(null,map__6818__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.call(null,map__6818__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.call(null,map__6818__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.call(null,map__6818__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.call(null,map__6818__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.load_libs.call(null,requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

cljs.compiler.load_libs.call(null,uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-env","repl-env",-1976503928).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.call(null,"'nil';");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"ns","ns",441598760),(function (p__6820){
var map__6821 = p__6820;
var map__6821__$1 = (((((!((map__6821 == null))))?(((((map__6821.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6821.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6821):map__6821);
var name = cljs.core.get.call(null,map__6821__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.call(null,map__6821__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.call(null,map__6821__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.call(null,map__6821__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.call(null,map__6821__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.call(null,map__6821__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.call(null,map__6821__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,name),"');");

if(cljs.core._EQ_.call(null,name,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('cljs.core');");

if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))))){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,cljs.analyzer.constants_ns_sym),"');");
} else {
}
}

cljs.compiler.load_libs.call(null,requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

return cljs.compiler.load_libs.call(null,uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"deftype","deftype",340294561),(function (p__6823){
var map__6824 = p__6823;
var map__6824__$1 = (((((!((map__6824 == null))))?(((((map__6824.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6824.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6824):map__6824);
var t = cljs.core.get.call(null,map__6824__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__6824__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__6824__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__6824__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__6824__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__6826_6850 = cljs.core.seq.call(null,protocols);
var chunk__6827_6851 = null;
var count__6828_6852 = (0);
var i__6829_6853 = (0);
while(true){
if((i__6829_6853 < count__6828_6852)){
var protocol_6854 = cljs.core._nth.call(null,chunk__6827_6851,i__6829_6853);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_6854)),"}");


var G__6855 = seq__6826_6850;
var G__6856 = chunk__6827_6851;
var G__6857 = count__6828_6852;
var G__6858 = (i__6829_6853 + (1));
seq__6826_6850 = G__6855;
chunk__6827_6851 = G__6856;
count__6828_6852 = G__6857;
i__6829_6853 = G__6858;
continue;
} else {
var temp__5720__auto___6859 = cljs.core.seq.call(null,seq__6826_6850);
if(temp__5720__auto___6859){
var seq__6826_6860__$1 = temp__5720__auto___6859;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6826_6860__$1)){
var c__4550__auto___6861 = cljs.core.chunk_first.call(null,seq__6826_6860__$1);
var G__6862 = cljs.core.chunk_rest.call(null,seq__6826_6860__$1);
var G__6863 = c__4550__auto___6861;
var G__6864 = cljs.core.count.call(null,c__4550__auto___6861);
var G__6865 = (0);
seq__6826_6850 = G__6862;
chunk__6827_6851 = G__6863;
count__6828_6852 = G__6864;
i__6829_6853 = G__6865;
continue;
} else {
var protocol_6866 = cljs.core.first.call(null,seq__6826_6860__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_6866)),"}");


var G__6867 = cljs.core.next.call(null,seq__6826_6860__$1);
var G__6868 = null;
var G__6869 = (0);
var G__6870 = (0);
seq__6826_6850 = G__6867;
chunk__6827_6851 = G__6868;
count__6828_6852 = G__6869;
i__6829_6853 = G__6870;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__6830_6871 = cljs.core.seq.call(null,fields__$1);
var chunk__6831_6872 = null;
var count__6832_6873 = (0);
var i__6833_6874 = (0);
while(true){
if((i__6833_6874 < count__6832_6873)){
var fld_6875 = cljs.core._nth.call(null,chunk__6831_6872,i__6833_6874);
cljs.compiler.emitln.call(null,"this.",fld_6875," = ",fld_6875,";");


var G__6876 = seq__6830_6871;
var G__6877 = chunk__6831_6872;
var G__6878 = count__6832_6873;
var G__6879 = (i__6833_6874 + (1));
seq__6830_6871 = G__6876;
chunk__6831_6872 = G__6877;
count__6832_6873 = G__6878;
i__6833_6874 = G__6879;
continue;
} else {
var temp__5720__auto___6880 = cljs.core.seq.call(null,seq__6830_6871);
if(temp__5720__auto___6880){
var seq__6830_6881__$1 = temp__5720__auto___6880;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6830_6881__$1)){
var c__4550__auto___6882 = cljs.core.chunk_first.call(null,seq__6830_6881__$1);
var G__6883 = cljs.core.chunk_rest.call(null,seq__6830_6881__$1);
var G__6884 = c__4550__auto___6882;
var G__6885 = cljs.core.count.call(null,c__4550__auto___6882);
var G__6886 = (0);
seq__6830_6871 = G__6883;
chunk__6831_6872 = G__6884;
count__6832_6873 = G__6885;
i__6833_6874 = G__6886;
continue;
} else {
var fld_6887 = cljs.core.first.call(null,seq__6830_6881__$1);
cljs.compiler.emitln.call(null,"this.",fld_6887," = ",fld_6887,";");


var G__6888 = cljs.core.next.call(null,seq__6830_6881__$1);
var G__6889 = null;
var G__6890 = (0);
var G__6891 = (0);
seq__6830_6871 = G__6888;
chunk__6831_6872 = G__6889;
count__6832_6873 = G__6890;
i__6833_6874 = G__6891;
continue;
}
} else {
}
}
break;
}

var seq__6834_6892 = cljs.core.seq.call(null,pmasks);
var chunk__6835_6893 = null;
var count__6836_6894 = (0);
var i__6837_6895 = (0);
while(true){
if((i__6837_6895 < count__6836_6894)){
var vec__6844_6896 = cljs.core._nth.call(null,chunk__6835_6893,i__6837_6895);
var pno_6897 = cljs.core.nth.call(null,vec__6844_6896,(0),null);
var pmask_6898 = cljs.core.nth.call(null,vec__6844_6896,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_6897,"$ = ",pmask_6898,";");


var G__6899 = seq__6834_6892;
var G__6900 = chunk__6835_6893;
var G__6901 = count__6836_6894;
var G__6902 = (i__6837_6895 + (1));
seq__6834_6892 = G__6899;
chunk__6835_6893 = G__6900;
count__6836_6894 = G__6901;
i__6837_6895 = G__6902;
continue;
} else {
var temp__5720__auto___6903 = cljs.core.seq.call(null,seq__6834_6892);
if(temp__5720__auto___6903){
var seq__6834_6904__$1 = temp__5720__auto___6903;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6834_6904__$1)){
var c__4550__auto___6905 = cljs.core.chunk_first.call(null,seq__6834_6904__$1);
var G__6906 = cljs.core.chunk_rest.call(null,seq__6834_6904__$1);
var G__6907 = c__4550__auto___6905;
var G__6908 = cljs.core.count.call(null,c__4550__auto___6905);
var G__6909 = (0);
seq__6834_6892 = G__6906;
chunk__6835_6893 = G__6907;
count__6836_6894 = G__6908;
i__6837_6895 = G__6909;
continue;
} else {
var vec__6847_6910 = cljs.core.first.call(null,seq__6834_6904__$1);
var pno_6911 = cljs.core.nth.call(null,vec__6847_6910,(0),null);
var pmask_6912 = cljs.core.nth.call(null,vec__6847_6910,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_6911,"$ = ",pmask_6912,";");


var G__6913 = cljs.core.next.call(null,seq__6834_6904__$1);
var G__6914 = null;
var G__6915 = (0);
var G__6916 = (0);
seq__6834_6892 = G__6913;
chunk__6835_6893 = G__6914;
count__6836_6894 = G__6915;
i__6837_6895 = G__6916;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"});");

return cljs.compiler.emit.call(null,body);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"defrecord","defrecord",-1367493418),(function (p__6917){
var map__6918 = p__6917;
var map__6918__$1 = (((((!((map__6918 == null))))?(((((map__6918.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__6918.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6918):map__6918);
var t = cljs.core.get.call(null,map__6918__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__6918__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__6918__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__6918__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__6918__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"__meta","__meta",-946752628,null),new cljs.core.Symbol(null,"__extmap","__extmap",-1435580931,null),new cljs.core.Symbol(null,"__hash","__hash",-1328796629,null)], null));
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__6920_6944 = cljs.core.seq.call(null,protocols);
var chunk__6921_6945 = null;
var count__6922_6946 = (0);
var i__6923_6947 = (0);
while(true){
if((i__6923_6947 < count__6922_6946)){
var protocol_6948 = cljs.core._nth.call(null,chunk__6921_6945,i__6923_6947);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_6948)),"}");


var G__6949 = seq__6920_6944;
var G__6950 = chunk__6921_6945;
var G__6951 = count__6922_6946;
var G__6952 = (i__6923_6947 + (1));
seq__6920_6944 = G__6949;
chunk__6921_6945 = G__6950;
count__6922_6946 = G__6951;
i__6923_6947 = G__6952;
continue;
} else {
var temp__5720__auto___6953 = cljs.core.seq.call(null,seq__6920_6944);
if(temp__5720__auto___6953){
var seq__6920_6954__$1 = temp__5720__auto___6953;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6920_6954__$1)){
var c__4550__auto___6955 = cljs.core.chunk_first.call(null,seq__6920_6954__$1);
var G__6956 = cljs.core.chunk_rest.call(null,seq__6920_6954__$1);
var G__6957 = c__4550__auto___6955;
var G__6958 = cljs.core.count.call(null,c__4550__auto___6955);
var G__6959 = (0);
seq__6920_6944 = G__6956;
chunk__6921_6945 = G__6957;
count__6922_6946 = G__6958;
i__6923_6947 = G__6959;
continue;
} else {
var protocol_6960 = cljs.core.first.call(null,seq__6920_6954__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_6960)),"}");


var G__6961 = cljs.core.next.call(null,seq__6920_6954__$1);
var G__6962 = null;
var G__6963 = (0);
var G__6964 = (0);
seq__6920_6944 = G__6961;
chunk__6921_6945 = G__6962;
count__6922_6946 = G__6963;
i__6923_6947 = G__6964;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__6924_6965 = cljs.core.seq.call(null,fields__$1);
var chunk__6925_6966 = null;
var count__6926_6967 = (0);
var i__6927_6968 = (0);
while(true){
if((i__6927_6968 < count__6926_6967)){
var fld_6969 = cljs.core._nth.call(null,chunk__6925_6966,i__6927_6968);
cljs.compiler.emitln.call(null,"this.",fld_6969," = ",fld_6969,";");


var G__6970 = seq__6924_6965;
var G__6971 = chunk__6925_6966;
var G__6972 = count__6926_6967;
var G__6973 = (i__6927_6968 + (1));
seq__6924_6965 = G__6970;
chunk__6925_6966 = G__6971;
count__6926_6967 = G__6972;
i__6927_6968 = G__6973;
continue;
} else {
var temp__5720__auto___6974 = cljs.core.seq.call(null,seq__6924_6965);
if(temp__5720__auto___6974){
var seq__6924_6975__$1 = temp__5720__auto___6974;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6924_6975__$1)){
var c__4550__auto___6976 = cljs.core.chunk_first.call(null,seq__6924_6975__$1);
var G__6977 = cljs.core.chunk_rest.call(null,seq__6924_6975__$1);
var G__6978 = c__4550__auto___6976;
var G__6979 = cljs.core.count.call(null,c__4550__auto___6976);
var G__6980 = (0);
seq__6924_6965 = G__6977;
chunk__6925_6966 = G__6978;
count__6926_6967 = G__6979;
i__6927_6968 = G__6980;
continue;
} else {
var fld_6981 = cljs.core.first.call(null,seq__6924_6975__$1);
cljs.compiler.emitln.call(null,"this.",fld_6981," = ",fld_6981,";");


var G__6982 = cljs.core.next.call(null,seq__6924_6975__$1);
var G__6983 = null;
var G__6984 = (0);
var G__6985 = (0);
seq__6924_6965 = G__6982;
chunk__6925_6966 = G__6983;
count__6926_6967 = G__6984;
i__6927_6968 = G__6985;
continue;
}
} else {
}
}
break;
}

var seq__6928_6986 = cljs.core.seq.call(null,pmasks);
var chunk__6929_6987 = null;
var count__6930_6988 = (0);
var i__6931_6989 = (0);
while(true){
if((i__6931_6989 < count__6930_6988)){
var vec__6938_6990 = cljs.core._nth.call(null,chunk__6929_6987,i__6931_6989);
var pno_6991 = cljs.core.nth.call(null,vec__6938_6990,(0),null);
var pmask_6992 = cljs.core.nth.call(null,vec__6938_6990,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_6991,"$ = ",pmask_6992,";");


var G__6993 = seq__6928_6986;
var G__6994 = chunk__6929_6987;
var G__6995 = count__6930_6988;
var G__6996 = (i__6931_6989 + (1));
seq__6928_6986 = G__6993;
chunk__6929_6987 = G__6994;
count__6930_6988 = G__6995;
i__6931_6989 = G__6996;
continue;
} else {
var temp__5720__auto___6997 = cljs.core.seq.call(null,seq__6928_6986);
if(temp__5720__auto___6997){
var seq__6928_6998__$1 = temp__5720__auto___6997;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6928_6998__$1)){
var c__4550__auto___6999 = cljs.core.chunk_first.call(null,seq__6928_6998__$1);
var G__7000 = cljs.core.chunk_rest.call(null,seq__6928_6998__$1);
var G__7001 = c__4550__auto___6999;
var G__7002 = cljs.core.count.call(null,c__4550__auto___6999);
var G__7003 = (0);
seq__6928_6986 = G__7000;
chunk__6929_6987 = G__7001;
count__6930_6988 = G__7002;
i__6931_6989 = G__7003;
continue;
} else {
var vec__6941_7004 = cljs.core.first.call(null,seq__6928_6998__$1);
var pno_7005 = cljs.core.nth.call(null,vec__6941_7004,(0),null);
var pmask_7006 = cljs.core.nth.call(null,vec__6941_7004,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_7005,"$ = ",pmask_7006,";");


var G__7007 = cljs.core.next.call(null,seq__6928_6998__$1);
var G__7008 = null;
var G__7009 = (0);
var G__7010 = (0);
seq__6928_6986 = G__7007;
chunk__6929_6987 = G__7008;
count__6930_6988 = G__7009;
i__6931_6989 = G__7010;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"});");

return cljs.compiler.emit.call(null,body);
}));
cljs.compiler.emit_dot = (function cljs$compiler$emit_dot(p__7011){
var map__7012 = p__7011;
var map__7012__$1 = (((((!((map__7012 == null))))?(((((map__7012.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__7012.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7012):map__7012);
var target = cljs.core.get.call(null,map__7012__$1,new cljs.core.Keyword(null,"target","target",253001721));
var field = cljs.core.get.call(null,map__7012__$1,new cljs.core.Keyword(null,"field","field",-1302436500));
var method = cljs.core.get.call(null,map__7012__$1,new cljs.core.Keyword(null,"method","method",55703592));
var args = cljs.core.get.call(null,map__7012__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__7012__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else {
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"host-field","host-field",-72662140),(function (ast){
return cljs.compiler.emit_dot.call(null,ast);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"host-call","host-call",1059629755),(function (ast){
return cljs.compiler.emit_dot.call(null,ast);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js","js",1768080579),(function (p__7014){
var map__7015 = p__7014;
var map__7015__$1 = (((((!((map__7015 == null))))?(((((map__7015.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__7015.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7015):map__7015);
var op = cljs.core.get.call(null,map__7015__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var env = cljs.core.get.call(null,map__7015__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var code = cljs.core.get.call(null,map__7015__$1,new cljs.core.Keyword(null,"code","code",1586293142));
var segs = cljs.core.get.call(null,map__7015__$1,new cljs.core.Keyword(null,"segs","segs",-1940299576));
var args = cljs.core.get.call(null,map__7015__$1,new cljs.core.Keyword(null,"args","args",1315556576));
if(cljs.core.truth_((function (){var and__4120__auto__ = code;
if(cljs.core.truth_(and__4120__auto__)){
return goog.string.startsWith(clojure.string.trim.call(null,code),"/*");
} else {
return and__4120__auto__;
}
})())){
return cljs.compiler.emits.call(null,code);
} else {
var env__2661__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.call(null,code);
} else {
cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null))));
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__2661__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,cljs.analyzer.constants_ns_sym),"');");

cljs.compiler.emitln.call(null,"goog.require('cljs.core');");

var seq__7021 = cljs.core.seq.call(null,table);
var chunk__7022 = null;
var count__7023 = (0);
var i__7024 = (0);
while(true){
if((i__7024 < count__7023)){
var vec__7031 = cljs.core._nth.call(null,chunk__7022,i__7024);
var sym = cljs.core.nth.call(null,vec__7031,(0),null);
var value = cljs.core.nth.call(null,vec__7031,(1),null);
var ns_7037 = cljs.core.namespace.call(null,sym);
var name_7038 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));

}
}

cljs.compiler.emits.call(null,";\n");


var G__7039 = seq__7021;
var G__7040 = chunk__7022;
var G__7041 = count__7023;
var G__7042 = (i__7024 + (1));
seq__7021 = G__7039;
chunk__7022 = G__7040;
count__7023 = G__7041;
i__7024 = G__7042;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__7021);
if(temp__5720__auto__){
var seq__7021__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7021__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__7021__$1);
var G__7043 = cljs.core.chunk_rest.call(null,seq__7021__$1);
var G__7044 = c__4550__auto__;
var G__7045 = cljs.core.count.call(null,c__4550__auto__);
var G__7046 = (0);
seq__7021 = G__7043;
chunk__7022 = G__7044;
count__7023 = G__7045;
i__7024 = G__7046;
continue;
} else {
var vec__7034 = cljs.core.first.call(null,seq__7021__$1);
var sym = cljs.core.nth.call(null,vec__7034,(0),null);
var value = cljs.core.nth.call(null,vec__7034,(1),null);
var ns_7047 = cljs.core.namespace.call(null,sym);
var name_7048 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));

}
}

cljs.compiler.emits.call(null,";\n");


var G__7049 = cljs.core.next.call(null,seq__7021__$1);
var G__7050 = null;
var G__7051 = (0);
var G__7052 = (0);
seq__7021 = G__7049;
chunk__7022 = G__7050;
count__7023 = G__7051;
i__7024 = G__7052;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_externs = (function cljs$compiler$emit_externs(var_args){
var G__7054 = arguments.length;
switch (G__7054) {
case 1:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 4:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1 = (function (externs){
return cljs.compiler.emit_externs.call(null,cljs.core.PersistentVector.EMPTY,externs,cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY),(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?new cljs.core.Keyword("cljs.analyzer","externs","cljs.analyzer/externs",893359239).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)):null));
});

cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4 = (function (prefix,externs,top_level,known_externs){
var ks = cljs.core.seq.call(null,cljs.core.keys.call(null,externs));
while(true){
if(ks){
var k_7059 = cljs.core.first.call(null,ks);
var vec__7055_7060 = cljs.core.conj.call(null,prefix,k_7059);
var top_7061 = cljs.core.nth.call(null,vec__7055_7060,(0),null);
var prefix_SINGLEQUOTE__7062 = vec__7055_7060;
if(((cljs.core.not_EQ_.call(null,new cljs.core.Symbol(null,"prototype","prototype",519166522,null),k_7059)) && ((cljs.core.get_in.call(null,known_externs,prefix_SINGLEQUOTE__7062) == null)))){
if((!(((cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,top_level),top_7061)) || (cljs.core.contains_QMARK_.call(null,known_externs,top_7061)))))){
cljs.compiler.emitln.call(null,"var ",clojure.string.join.call(null,".",cljs.core.map.call(null,cljs.compiler.munge,prefix_SINGLEQUOTE__7062)),";");

cljs.core.swap_BANG_.call(null,top_level,cljs.core.conj,top_7061);
} else {
cljs.compiler.emitln.call(null,clojure.string.join.call(null,".",cljs.core.map.call(null,cljs.compiler.munge,prefix_SINGLEQUOTE__7062)),";");
}
} else {
}

var m_7063 = cljs.core.get.call(null,externs,k_7059);
if(cljs.core.empty_QMARK_.call(null,m_7063)){
} else {
cljs.compiler.emit_externs.call(null,prefix_SINGLEQUOTE__7062,m_7063,top_level,known_externs);
}

var G__7064 = cljs.core.next.call(null,ks);
ks = G__7064;
continue;
} else {
return null;
}
break;
}
});

cljs.compiler.emit_externs.cljs$lang$maxFixedArity = 4;


//# sourceMappingURL=compiler.js.map
