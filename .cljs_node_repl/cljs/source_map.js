// Compiled by ClojureScript 1.10.520 {:target :nodejs}
goog.provide('cljs.source_map');
goog.require('cljs.core');
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.source_map.base64_vlq');
/**
 * Take a seq of source file names and return a map from
 * file number to integer index. For reverse source maps.
 */
cljs.source_map.indexed_sources = (function cljs$source_map$indexed_sources(sources){
return cljs.core.reduce.call(null,(function (m,p__4723){
var vec__4724 = p__4723;
var i = cljs.core.nth.call(null,vec__4724,(0),null);
var v = cljs.core.nth.call(null,vec__4724,(1),null);
return cljs.core.assoc.call(null,m,v,i);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.call(null,(function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),sources));
});
/**
 * Take a seq of source file names and return a comparator
 * that can be used to construct a sorted map. For reverse
 * source maps.
 */
cljs.source_map.source_compare = (function cljs$source_map$source_compare(sources){
var sources__$1 = cljs.source_map.indexed_sources.call(null,sources);
return ((function (sources__$1){
return (function (a,b){
return cljs.core.compare.call(null,sources__$1.call(null,a),sources__$1.call(null,b));
});
;})(sources__$1))
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__4727 = seg;
var gcol = cljs.core.nth.call(null,vec__4727,(0),null);
var source = cljs.core.nth.call(null,vec__4727,(1),null);
var line = cljs.core.nth.call(null,vec__4727,(2),null);
var col = cljs.core.nth.call(null,vec__4727,(3),null);
var name = cljs.core.nth.call(null,vec__4727,(4),null);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol,new cljs.core.Keyword(null,"source","source",-433931539),(goog.object.get(source_map,"sources")[source]),new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"name","name",1843675177),(function (){var temp__5720__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,seg));
if(cljs.core.truth_(temp__5720__auto__)){
var name__$1 = temp__5720__auto__;
return (goog.object.get(source_map,"names")[name__$1]);
} else {
return null;
}
})()], null);
});
/**
 * Combine a source map segment vector and a relative
 * source map segment vector and combine them to get
 * an absolute segment posititon information as a vector.
 */
cljs.source_map.seg_combine = (function cljs$source_map$seg_combine(seg,relseg){
var vec__4730 = seg;
var gcol = cljs.core.nth.call(null,vec__4730,(0),null);
var source = cljs.core.nth.call(null,vec__4730,(1),null);
var line = cljs.core.nth.call(null,vec__4730,(2),null);
var col = cljs.core.nth.call(null,vec__4730,(3),null);
var name = cljs.core.nth.call(null,vec__4730,(4),null);
var vec__4733 = relseg;
var rgcol = cljs.core.nth.call(null,vec__4733,(0),null);
var rsource = cljs.core.nth.call(null,vec__4733,(1),null);
var rline = cljs.core.nth.call(null,vec__4733,(2),null);
var rcol = cljs.core.nth.call(null,vec__4733,(3),null);
var rname = cljs.core.nth.call(null,vec__4733,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__4131__auto__ = source;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__4131__auto__ = line;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__4131__auto__ = col;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})() + rname)], null);
if(cljs.core.truth_(name)){
return cljs.core.with_meta.call(null,nseg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),(name + rname)], null));
} else {
return nseg;
}
});
/**
 * Helper for decode-reverse. Take a reverse source map and
 *   update it with a segment map.
 */
cljs.source_map.update_reverse_result = (function cljs$source_map$update_reverse_result(result,segmap,gline){
var map__4736 = segmap;
var map__4736__$1 = (((((!((map__4736 == null))))?(((((map__4736.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__4736.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4736):map__4736);
var gcol = cljs.core.get.call(null,map__4736__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__4736__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__4736__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__4736__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__4736__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gline","gline",-1086242431),gline,new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.call(null,((function (map__4736,map__4736__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.call(null,((function (map__4736,map__4736__$1,gcol,source,line,col,name,d,d__$1){
return (function (m__$1){
return cljs.core.update_in.call(null,m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.call(null,((function (map__4736,map__4736__$1,gcol,source,line,col,name,d,d__$1){
return (function (v){
return cljs.core.conj.call(null,v,d__$1);
});})(map__4736,map__4736__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__4736,map__4736__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});})(map__4736,map__4736__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var G__4739 = arguments.length;
switch (G__4739) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.call(null,goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.sorted_map_by.call(null,cljs.source_map.source_compare.call(null,sources));
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__4743 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__4747 = cljs.core.next.call(null,segs__$1);
var G__4748 = nrelseg;
var G__4749 = cljs.source_map.update_reverse_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__4747;
relseg__$1 = G__4748;
result__$1 = G__4749;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__4743,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__4743,(1),null);
var G__4750 = (gline + (1));
var G__4751 = cljs.core.next.call(null,lines__$1);
var G__4752 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__4753 = result__$1;
gline = G__4750;
lines__$1 = G__4751;
relseg = G__4752;
result = G__4753;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2;

/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__4755 = segmap;
var map__4755__$1 = (((((!((map__4755 == null))))?(((((map__4755.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__4755.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4755):map__4755);
var gcol = cljs.core.get.call(null,map__4755__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__4755__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__4755__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__4755__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__4755__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"source","source",-433931539),source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.call(null,((function (map__4755,map__4755__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.call(null,((function (map__4755,map__4755__$1,gcol,source,line,col,name,d,d__$1){
return (function (p1__4754_SHARP_){
return cljs.core.conj.call(null,p1__4754_SHARP_,d__$1);
});})(map__4755,map__4755__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__4755,map__4755__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var G__4758 = arguments.length;
switch (G__4758) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.call(null,goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__4762 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__4766 = cljs.core.next.call(null,segs__$1);
var G__4767 = nrelseg;
var G__4768 = cljs.source_map.update_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__4766;
relseg__$1 = G__4767;
result__$1 = G__4768;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__4762,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__4762,(1),null);
var G__4769 = (gline + (1));
var G__4770 = cljs.core.next.call(null,lines__$1);
var G__4771 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__4772 = result__$1;
gline = G__4769;
lines__$1 = G__4770;
relseg = G__4771;
result = G__4772;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode.cljs$lang$maxFixedArity = 2;

/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null));
return cljs.core.reduce.call(null,((function (relseg){
return (function (segs,cols){
cljs.core.swap_BANG_.call(null,relseg,((function (relseg){
return (function (p__4773){
var vec__4774 = p__4773;
var _ = cljs.core.nth.call(null,vec__4774,(0),null);
var source = cljs.core.nth.call(null,vec__4774,(1),null);
var line = cljs.core.nth.call(null,vec__4774,(2),null);
var col = cljs.core.nth.call(null,vec__4774,(3),null);
var name = cljs.core.nth.call(null,vec__4774,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
});})(relseg))
);

return cljs.core.conj.call(null,segs,cljs.core.reduce.call(null,((function (relseg){
return (function (cols__$1,p__4777){
var vec__4778 = p__4777;
var gcol = cljs.core.nth.call(null,vec__4778,(0),null);
var sidx = cljs.core.nth.call(null,vec__4778,(1),null);
var line = cljs.core.nth.call(null,vec__4778,(2),null);
var col = cljs.core.nth.call(null,vec__4778,(3),null);
var name = cljs.core.nth.call(null,vec__4778,(4),null);
var seg = vec__4778;
var offset = cljs.core.map.call(null,cljs.core._,seg,cljs.core.deref.call(null,relseg));
cljs.core.swap_BANG_.call(null,relseg,((function (offset,vec__4778,gcol,sidx,line,col,name,seg,relseg){
return (function (p__4781){
var vec__4782 = p__4781;
var _ = cljs.core.nth.call(null,vec__4782,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__4782,(1),null);
var ___$2 = cljs.core.nth.call(null,vec__4782,(2),null);
var ___$3 = cljs.core.nth.call(null,vec__4782,(3),null);
var lname = cljs.core.nth.call(null,vec__4782,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return lname;
}
})()], null);
});})(offset,vec__4778,gcol,sidx,line,col,name,seg,relseg))
);

return cljs.core.conj.call(null,cols__$1,cljs.source_map.base64_vlq.encode.call(null,offset));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,cols));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,lines);
});
/**
 * Take an internal source map representation represented as nested
 * sorted maps of file, line, column and return a source map v3 JSON
 * string.
 */
cljs.source_map.encode = (function cljs$source_map$encode(m,opts){
var lines = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null));
var names__GT_idx = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var name_idx = cljs.core.atom.call(null,(0));
var preamble_lines = cljs.core.take.call(null,(function (){var or__4131__auto__ = new cljs.core.Keyword(null,"preamble-line-count","preamble-line-count",-659949744).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.call(null,cljs.core.PersistentVector.EMPTY));
var info__GT_segv = ((function (lines,names__GT_idx,name_idx,preamble_lines){
return (function (info,source_idx,line,col){
var segv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gcol","gcol",309250807).cljs$core$IFn$_invoke$arity$1(info),source_idx,line,col], null);
var temp__5718__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__5718__auto__)){
var name = temp__5718__auto__;
var idx = (function (){var temp__5718__auto____$1 = cljs.core.get.call(null,cljs.core.deref.call(null,names__GT_idx),name);
if(cljs.core.truth_(temp__5718__auto____$1)){
var idx = temp__5718__auto____$1;
return idx;
} else {
var cidx = cljs.core.deref.call(null,name_idx);
cljs.core.swap_BANG_.call(null,names__GT_idx,cljs.core.assoc,name,cidx);

cljs.core.swap_BANG_.call(null,name_idx,cljs.core.inc);

return cidx;
}
})();
return cljs.core.conj.call(null,segv,idx);
} else {
return segv;
}
});})(lines,names__GT_idx,name_idx,preamble_lines))
;
var encode_cols = ((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (infos,source_idx,line,col){
var seq__4788 = cljs.core.seq.call(null,infos);
var chunk__4789 = null;
var count__4790 = (0);
var i__4791 = (0);
while(true){
if((i__4791 < count__4790)){
var info = cljs.core._nth.call(null,chunk__4789,i__4791);
var segv_5142 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_5143 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_5144 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_5143 > (lc_5144 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__4788,chunk__4789,count__4790,i__4791,segv_5142,gline_5143,lc_5144,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_5143 - (lc_5144 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_5142], null));
});})(seq__4788,chunk__4789,count__4790,i__4791,segv_5142,gline_5143,lc_5144,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__4788,chunk__4789,count__4790,i__4791,segv_5142,gline_5143,lc_5144,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_5143], null),cljs.core.conj,segv_5142);
});})(seq__4788,chunk__4789,count__4790,i__4791,segv_5142,gline_5143,lc_5144,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__5145 = seq__4788;
var G__5146 = chunk__4789;
var G__5147 = count__4790;
var G__5148 = (i__4791 + (1));
seq__4788 = G__5145;
chunk__4789 = G__5146;
count__4790 = G__5147;
i__4791 = G__5148;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__4788);
if(temp__5720__auto__){
var seq__4788__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4788__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__4788__$1);
var G__5149 = cljs.core.chunk_rest.call(null,seq__4788__$1);
var G__5150 = c__4550__auto__;
var G__5151 = cljs.core.count.call(null,c__4550__auto__);
var G__5152 = (0);
seq__4788 = G__5149;
chunk__4789 = G__5150;
count__4790 = G__5151;
i__4791 = G__5152;
continue;
} else {
var info = cljs.core.first.call(null,seq__4788__$1);
var segv_5153 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_5154 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_5155 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_5154 > (lc_5155 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__4788,chunk__4789,count__4790,i__4791,segv_5153,gline_5154,lc_5155,info,seq__4788__$1,temp__5720__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_5154 - (lc_5155 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_5153], null));
});})(seq__4788,chunk__4789,count__4790,i__4791,segv_5153,gline_5154,lc_5155,info,seq__4788__$1,temp__5720__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__4788,chunk__4789,count__4790,i__4791,segv_5153,gline_5154,lc_5155,info,seq__4788__$1,temp__5720__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_5154], null),cljs.core.conj,segv_5153);
});})(seq__4788,chunk__4789,count__4790,i__4791,segv_5153,gline_5154,lc_5155,info,seq__4788__$1,temp__5720__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__5156 = cljs.core.next.call(null,seq__4788__$1);
var G__5157 = null;
var G__5158 = (0);
var G__5159 = (0);
seq__4788 = G__5156;
chunk__4789 = G__5157;
count__4790 = G__5158;
i__4791 = G__5159;
continue;
}
} else {
return null;
}
}
break;
}
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
;
var seq__4792_5160 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__4793_5161 = null;
var count__4794_5162 = (0);
var i__4795_5163 = (0);
while(true){
if((i__4795_5163 < count__4794_5162)){
var vec__4968_5164 = cljs.core._nth.call(null,chunk__4793_5161,i__4795_5163);
var source_idx_5165 = cljs.core.nth.call(null,vec__4968_5164,(0),null);
var vec__4971_5166 = cljs.core.nth.call(null,vec__4968_5164,(1),null);
var __5167 = cljs.core.nth.call(null,vec__4971_5166,(0),null);
var lines_5168__$1 = cljs.core.nth.call(null,vec__4971_5166,(1),null);
var seq__4974_5169 = cljs.core.seq.call(null,lines_5168__$1);
var chunk__4975_5170 = null;
var count__4976_5171 = (0);
var i__4977_5172 = (0);
while(true){
if((i__4977_5172 < count__4976_5171)){
var vec__5016_5173 = cljs.core._nth.call(null,chunk__4975_5170,i__4977_5172);
var line_5174 = cljs.core.nth.call(null,vec__5016_5173,(0),null);
var cols_5175 = cljs.core.nth.call(null,vec__5016_5173,(1),null);
var seq__5019_5176 = cljs.core.seq.call(null,cols_5175);
var chunk__5020_5177 = null;
var count__5021_5178 = (0);
var i__5022_5179 = (0);
while(true){
if((i__5022_5179 < count__5021_5178)){
var vec__5029_5180 = cljs.core._nth.call(null,chunk__5020_5177,i__5022_5179);
var col_5181 = cljs.core.nth.call(null,vec__5029_5180,(0),null);
var infos_5182 = cljs.core.nth.call(null,vec__5029_5180,(1),null);
encode_cols.call(null,infos_5182,source_idx_5165,line_5174,col_5181);


var G__5183 = seq__5019_5176;
var G__5184 = chunk__5020_5177;
var G__5185 = count__5021_5178;
var G__5186 = (i__5022_5179 + (1));
seq__5019_5176 = G__5183;
chunk__5020_5177 = G__5184;
count__5021_5178 = G__5185;
i__5022_5179 = G__5186;
continue;
} else {
var temp__5720__auto___5187 = cljs.core.seq.call(null,seq__5019_5176);
if(temp__5720__auto___5187){
var seq__5019_5188__$1 = temp__5720__auto___5187;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5019_5188__$1)){
var c__4550__auto___5189 = cljs.core.chunk_first.call(null,seq__5019_5188__$1);
var G__5190 = cljs.core.chunk_rest.call(null,seq__5019_5188__$1);
var G__5191 = c__4550__auto___5189;
var G__5192 = cljs.core.count.call(null,c__4550__auto___5189);
var G__5193 = (0);
seq__5019_5176 = G__5190;
chunk__5020_5177 = G__5191;
count__5021_5178 = G__5192;
i__5022_5179 = G__5193;
continue;
} else {
var vec__5032_5194 = cljs.core.first.call(null,seq__5019_5188__$1);
var col_5195 = cljs.core.nth.call(null,vec__5032_5194,(0),null);
var infos_5196 = cljs.core.nth.call(null,vec__5032_5194,(1),null);
encode_cols.call(null,infos_5196,source_idx_5165,line_5174,col_5195);


var G__5197 = cljs.core.next.call(null,seq__5019_5188__$1);
var G__5198 = null;
var G__5199 = (0);
var G__5200 = (0);
seq__5019_5176 = G__5197;
chunk__5020_5177 = G__5198;
count__5021_5178 = G__5199;
i__5022_5179 = G__5200;
continue;
}
} else {
}
}
break;
}


var G__5201 = seq__4974_5169;
var G__5202 = chunk__4975_5170;
var G__5203 = count__4976_5171;
var G__5204 = (i__4977_5172 + (1));
seq__4974_5169 = G__5201;
chunk__4975_5170 = G__5202;
count__4976_5171 = G__5203;
i__4977_5172 = G__5204;
continue;
} else {
var temp__5720__auto___5205 = cljs.core.seq.call(null,seq__4974_5169);
if(temp__5720__auto___5205){
var seq__4974_5206__$1 = temp__5720__auto___5205;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4974_5206__$1)){
var c__4550__auto___5207 = cljs.core.chunk_first.call(null,seq__4974_5206__$1);
var G__5208 = cljs.core.chunk_rest.call(null,seq__4974_5206__$1);
var G__5209 = c__4550__auto___5207;
var G__5210 = cljs.core.count.call(null,c__4550__auto___5207);
var G__5211 = (0);
seq__4974_5169 = G__5208;
chunk__4975_5170 = G__5209;
count__4976_5171 = G__5210;
i__4977_5172 = G__5211;
continue;
} else {
var vec__5035_5212 = cljs.core.first.call(null,seq__4974_5206__$1);
var line_5213 = cljs.core.nth.call(null,vec__5035_5212,(0),null);
var cols_5214 = cljs.core.nth.call(null,vec__5035_5212,(1),null);
var seq__5038_5215 = cljs.core.seq.call(null,cols_5214);
var chunk__5039_5216 = null;
var count__5040_5217 = (0);
var i__5041_5218 = (0);
while(true){
if((i__5041_5218 < count__5040_5217)){
var vec__5048_5219 = cljs.core._nth.call(null,chunk__5039_5216,i__5041_5218);
var col_5220 = cljs.core.nth.call(null,vec__5048_5219,(0),null);
var infos_5221 = cljs.core.nth.call(null,vec__5048_5219,(1),null);
encode_cols.call(null,infos_5221,source_idx_5165,line_5213,col_5220);


var G__5222 = seq__5038_5215;
var G__5223 = chunk__5039_5216;
var G__5224 = count__5040_5217;
var G__5225 = (i__5041_5218 + (1));
seq__5038_5215 = G__5222;
chunk__5039_5216 = G__5223;
count__5040_5217 = G__5224;
i__5041_5218 = G__5225;
continue;
} else {
var temp__5720__auto___5226__$1 = cljs.core.seq.call(null,seq__5038_5215);
if(temp__5720__auto___5226__$1){
var seq__5038_5227__$1 = temp__5720__auto___5226__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5038_5227__$1)){
var c__4550__auto___5228 = cljs.core.chunk_first.call(null,seq__5038_5227__$1);
var G__5229 = cljs.core.chunk_rest.call(null,seq__5038_5227__$1);
var G__5230 = c__4550__auto___5228;
var G__5231 = cljs.core.count.call(null,c__4550__auto___5228);
var G__5232 = (0);
seq__5038_5215 = G__5229;
chunk__5039_5216 = G__5230;
count__5040_5217 = G__5231;
i__5041_5218 = G__5232;
continue;
} else {
var vec__5051_5233 = cljs.core.first.call(null,seq__5038_5227__$1);
var col_5234 = cljs.core.nth.call(null,vec__5051_5233,(0),null);
var infos_5235 = cljs.core.nth.call(null,vec__5051_5233,(1),null);
encode_cols.call(null,infos_5235,source_idx_5165,line_5213,col_5234);


var G__5236 = cljs.core.next.call(null,seq__5038_5227__$1);
var G__5237 = null;
var G__5238 = (0);
var G__5239 = (0);
seq__5038_5215 = G__5236;
chunk__5039_5216 = G__5237;
count__5040_5217 = G__5238;
i__5041_5218 = G__5239;
continue;
}
} else {
}
}
break;
}


var G__5240 = cljs.core.next.call(null,seq__4974_5206__$1);
var G__5241 = null;
var G__5242 = (0);
var G__5243 = (0);
seq__4974_5169 = G__5240;
chunk__4975_5170 = G__5241;
count__4976_5171 = G__5242;
i__4977_5172 = G__5243;
continue;
}
} else {
}
}
break;
}


var G__5244 = seq__4792_5160;
var G__5245 = chunk__4793_5161;
var G__5246 = count__4794_5162;
var G__5247 = (i__4795_5163 + (1));
seq__4792_5160 = G__5244;
chunk__4793_5161 = G__5245;
count__4794_5162 = G__5246;
i__4795_5163 = G__5247;
continue;
} else {
var temp__5720__auto___5248 = cljs.core.seq.call(null,seq__4792_5160);
if(temp__5720__auto___5248){
var seq__4792_5249__$1 = temp__5720__auto___5248;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4792_5249__$1)){
var c__4550__auto___5250 = cljs.core.chunk_first.call(null,seq__4792_5249__$1);
var G__5251 = cljs.core.chunk_rest.call(null,seq__4792_5249__$1);
var G__5252 = c__4550__auto___5250;
var G__5253 = cljs.core.count.call(null,c__4550__auto___5250);
var G__5254 = (0);
seq__4792_5160 = G__5251;
chunk__4793_5161 = G__5252;
count__4794_5162 = G__5253;
i__4795_5163 = G__5254;
continue;
} else {
var vec__5054_5255 = cljs.core.first.call(null,seq__4792_5249__$1);
var source_idx_5256 = cljs.core.nth.call(null,vec__5054_5255,(0),null);
var vec__5057_5257 = cljs.core.nth.call(null,vec__5054_5255,(1),null);
var __5258 = cljs.core.nth.call(null,vec__5057_5257,(0),null);
var lines_5259__$1 = cljs.core.nth.call(null,vec__5057_5257,(1),null);
var seq__5060_5260 = cljs.core.seq.call(null,lines_5259__$1);
var chunk__5061_5261 = null;
var count__5062_5262 = (0);
var i__5063_5263 = (0);
while(true){
if((i__5063_5263 < count__5062_5262)){
var vec__5102_5264 = cljs.core._nth.call(null,chunk__5061_5261,i__5063_5263);
var line_5265 = cljs.core.nth.call(null,vec__5102_5264,(0),null);
var cols_5266 = cljs.core.nth.call(null,vec__5102_5264,(1),null);
var seq__5105_5267 = cljs.core.seq.call(null,cols_5266);
var chunk__5106_5268 = null;
var count__5107_5269 = (0);
var i__5108_5270 = (0);
while(true){
if((i__5108_5270 < count__5107_5269)){
var vec__5115_5271 = cljs.core._nth.call(null,chunk__5106_5268,i__5108_5270);
var col_5272 = cljs.core.nth.call(null,vec__5115_5271,(0),null);
var infos_5273 = cljs.core.nth.call(null,vec__5115_5271,(1),null);
encode_cols.call(null,infos_5273,source_idx_5256,line_5265,col_5272);


var G__5274 = seq__5105_5267;
var G__5275 = chunk__5106_5268;
var G__5276 = count__5107_5269;
var G__5277 = (i__5108_5270 + (1));
seq__5105_5267 = G__5274;
chunk__5106_5268 = G__5275;
count__5107_5269 = G__5276;
i__5108_5270 = G__5277;
continue;
} else {
var temp__5720__auto___5278__$1 = cljs.core.seq.call(null,seq__5105_5267);
if(temp__5720__auto___5278__$1){
var seq__5105_5279__$1 = temp__5720__auto___5278__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5105_5279__$1)){
var c__4550__auto___5280 = cljs.core.chunk_first.call(null,seq__5105_5279__$1);
var G__5281 = cljs.core.chunk_rest.call(null,seq__5105_5279__$1);
var G__5282 = c__4550__auto___5280;
var G__5283 = cljs.core.count.call(null,c__4550__auto___5280);
var G__5284 = (0);
seq__5105_5267 = G__5281;
chunk__5106_5268 = G__5282;
count__5107_5269 = G__5283;
i__5108_5270 = G__5284;
continue;
} else {
var vec__5118_5285 = cljs.core.first.call(null,seq__5105_5279__$1);
var col_5286 = cljs.core.nth.call(null,vec__5118_5285,(0),null);
var infos_5287 = cljs.core.nth.call(null,vec__5118_5285,(1),null);
encode_cols.call(null,infos_5287,source_idx_5256,line_5265,col_5286);


var G__5288 = cljs.core.next.call(null,seq__5105_5279__$1);
var G__5289 = null;
var G__5290 = (0);
var G__5291 = (0);
seq__5105_5267 = G__5288;
chunk__5106_5268 = G__5289;
count__5107_5269 = G__5290;
i__5108_5270 = G__5291;
continue;
}
} else {
}
}
break;
}


var G__5292 = seq__5060_5260;
var G__5293 = chunk__5061_5261;
var G__5294 = count__5062_5262;
var G__5295 = (i__5063_5263 + (1));
seq__5060_5260 = G__5292;
chunk__5061_5261 = G__5293;
count__5062_5262 = G__5294;
i__5063_5263 = G__5295;
continue;
} else {
var temp__5720__auto___5296__$1 = cljs.core.seq.call(null,seq__5060_5260);
if(temp__5720__auto___5296__$1){
var seq__5060_5297__$1 = temp__5720__auto___5296__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5060_5297__$1)){
var c__4550__auto___5298 = cljs.core.chunk_first.call(null,seq__5060_5297__$1);
var G__5299 = cljs.core.chunk_rest.call(null,seq__5060_5297__$1);
var G__5300 = c__4550__auto___5298;
var G__5301 = cljs.core.count.call(null,c__4550__auto___5298);
var G__5302 = (0);
seq__5060_5260 = G__5299;
chunk__5061_5261 = G__5300;
count__5062_5262 = G__5301;
i__5063_5263 = G__5302;
continue;
} else {
var vec__5121_5303 = cljs.core.first.call(null,seq__5060_5297__$1);
var line_5304 = cljs.core.nth.call(null,vec__5121_5303,(0),null);
var cols_5305 = cljs.core.nth.call(null,vec__5121_5303,(1),null);
var seq__5124_5306 = cljs.core.seq.call(null,cols_5305);
var chunk__5125_5307 = null;
var count__5126_5308 = (0);
var i__5127_5309 = (0);
while(true){
if((i__5127_5309 < count__5126_5308)){
var vec__5134_5310 = cljs.core._nth.call(null,chunk__5125_5307,i__5127_5309);
var col_5311 = cljs.core.nth.call(null,vec__5134_5310,(0),null);
var infos_5312 = cljs.core.nth.call(null,vec__5134_5310,(1),null);
encode_cols.call(null,infos_5312,source_idx_5256,line_5304,col_5311);


var G__5313 = seq__5124_5306;
var G__5314 = chunk__5125_5307;
var G__5315 = count__5126_5308;
var G__5316 = (i__5127_5309 + (1));
seq__5124_5306 = G__5313;
chunk__5125_5307 = G__5314;
count__5126_5308 = G__5315;
i__5127_5309 = G__5316;
continue;
} else {
var temp__5720__auto___5317__$2 = cljs.core.seq.call(null,seq__5124_5306);
if(temp__5720__auto___5317__$2){
var seq__5124_5318__$1 = temp__5720__auto___5317__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5124_5318__$1)){
var c__4550__auto___5319 = cljs.core.chunk_first.call(null,seq__5124_5318__$1);
var G__5320 = cljs.core.chunk_rest.call(null,seq__5124_5318__$1);
var G__5321 = c__4550__auto___5319;
var G__5322 = cljs.core.count.call(null,c__4550__auto___5319);
var G__5323 = (0);
seq__5124_5306 = G__5320;
chunk__5125_5307 = G__5321;
count__5126_5308 = G__5322;
i__5127_5309 = G__5323;
continue;
} else {
var vec__5137_5324 = cljs.core.first.call(null,seq__5124_5318__$1);
var col_5325 = cljs.core.nth.call(null,vec__5137_5324,(0),null);
var infos_5326 = cljs.core.nth.call(null,vec__5137_5324,(1),null);
encode_cols.call(null,infos_5326,source_idx_5256,line_5304,col_5325);


var G__5327 = cljs.core.next.call(null,seq__5124_5318__$1);
var G__5328 = null;
var G__5329 = (0);
var G__5330 = (0);
seq__5124_5306 = G__5327;
chunk__5125_5307 = G__5328;
count__5126_5308 = G__5329;
i__5127_5309 = G__5330;
continue;
}
} else {
}
}
break;
}


var G__5331 = cljs.core.next.call(null,seq__5060_5297__$1);
var G__5332 = null;
var G__5333 = (0);
var G__5334 = (0);
seq__5060_5260 = G__5331;
chunk__5061_5261 = G__5332;
count__5062_5262 = G__5333;
i__5063_5263 = G__5334;
continue;
}
} else {
}
}
break;
}


var G__5335 = cljs.core.next.call(null,seq__4792_5249__$1);
var G__5336 = null;
var G__5337 = (0);
var G__5338 = (0);
seq__4792_5160 = G__5335;
chunk__4793_5161 = G__5336;
count__4794_5162 = G__5337;
i__4795_5163 = G__5338;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__5140 = ({"version": (3), "file": new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys.call(null,m);
var f = cljs.core.comp.call(null,((new cljs.core.Keyword(null,"source-map-timestamp","source-map-timestamp",1973015633).cljs$core$IFn$_invoke$arity$1(opts) === true)?((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__4785_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__4785_SHARP_),"?rel=",cljs.core.str.cljs$core$IFn$_invoke$arity$1((new Date()).valueOf())].join('');
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
:cljs.core.identity),((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__4786_SHARP_){
return cljs.core.last.call(null,clojure.string.split.call(null,p1__4786_SHARP_,/\//));
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
);
return cljs.core.into_array.call(null,cljs.core.map.call(null,f,paths));
})(), "lineCount": new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.call(null,";",cljs.core.map.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__4787_SHARP_){
return clojure.string.join.call(null,",",p1__4787_SHARP_);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,cljs.source_map.lines__GT_segs.call(null,cljs.core.concat.call(null,preamble_lines,cljs.core.deref.call(null,lines))))), "names": cljs.core.into_array.call(null,cljs.core.map.call(null,clojure.set.map_invert.call(null,cljs.core.deref.call(null,names__GT_idx)),cljs.core.range.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,names__GT_idx)))))});
if(cljs.core.truth_(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts))){
var G__5141 = G__5140;
goog.object.set(G__5141,"sourcesContent",cljs.core.into_array.call(null,new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts)));

return G__5141;
} else {
return G__5140;
}
})();
return JSON.stringify(source_map_file_contents);
});
/**
 * Merge an internal source map representation of a single
 * ClojureScript file mapping original to generated with a
 * second source map mapping original JS to generated JS.
 * The is to support source maps that work through multiple
 * compilation steps like Google Closure optimization passes.
 */
cljs.source_map.merge_source_maps = (function cljs$source_map$merge_source_maps(cljs_map,js_map){
var line_map_seq = cljs.core.seq.call(null,cljs_map);
var new_lines = cljs.core.sorted_map.call(null);
while(true){
if(line_map_seq){
var vec__5339 = cljs.core.first.call(null,line_map_seq);
var line = cljs.core.nth.call(null,vec__5339,(0),null);
var col_map = cljs.core.nth.call(null,vec__5339,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq.call(null,col_map);
var new_cols = cljs.core.sorted_map.call(null);
while(true){
if(col_map_seq){
var vec__5342 = cljs.core.first.call(null,col_map_seq);
var col = cljs.core.nth.call(null,vec__5342,(0),null);
var infos = cljs.core.nth.call(null,vec__5342,(1),null);
var G__5348 = cljs.core.next.call(null,col_map_seq);
var G__5349 = cljs.core.assoc.call(null,new_cols,col,cljs.core.reduce.call(null,((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__5342,col,infos,vec__5339,line,col_map){
return (function (v,p__5345){
var map__5346 = p__5345;
var map__5346__$1 = (((((!((map__5346 == null))))?(((((map__5346.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5346.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5346):map__5346);
var gline = cljs.core.get.call(null,map__5346__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol = cljs.core.get.call(null,map__5346__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
return cljs.core.into.call(null,v,cljs.core.get_in.call(null,js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__5342,col,infos,vec__5339,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__5348;
new_cols = G__5349;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__5350 = cljs.core.next.call(null,line_map_seq);
var G__5351 = cljs.core.assoc.call(null,new_lines,line,new_cols);
line_map_seq = G__5350;
new_lines = G__5351;
continue;
} else {
return new_lines;
}
break;
}
});
/**
 * Given a ClojureScript to JavaScript source map, invert it. Useful when
 * mapping JavaScript stack traces when environment support is unavailable.
 */
cljs.source_map.invert_reverse_map = (function cljs$source_map$invert_reverse_map(reverse_map){
var inverted = cljs.core.atom.call(null,cljs.core.sorted_map.call(null));
var seq__5352_5624 = cljs.core.seq.call(null,reverse_map);
var chunk__5353_5625 = null;
var count__5354_5626 = (0);
var i__5355_5627 = (0);
while(true){
if((i__5355_5627 < count__5354_5626)){
var vec__5490_5628 = cljs.core._nth.call(null,chunk__5353_5625,i__5355_5627);
var line_5629 = cljs.core.nth.call(null,vec__5490_5628,(0),null);
var columns_5630 = cljs.core.nth.call(null,vec__5490_5628,(1),null);
var seq__5493_5631 = cljs.core.seq.call(null,columns_5630);
var chunk__5494_5632 = null;
var count__5495_5633 = (0);
var i__5496_5634 = (0);
while(true){
if((i__5496_5634 < count__5495_5633)){
var vec__5527_5635 = cljs.core._nth.call(null,chunk__5494_5632,i__5496_5634);
var column_5636 = cljs.core.nth.call(null,vec__5527_5635,(0),null);
var column_info_5637 = cljs.core.nth.call(null,vec__5527_5635,(1),null);
var seq__5530_5638 = cljs.core.seq.call(null,column_info_5637);
var chunk__5531_5639 = null;
var count__5532_5640 = (0);
var i__5533_5641 = (0);
while(true){
if((i__5533_5641 < count__5532_5640)){
var map__5538_5642 = cljs.core._nth.call(null,chunk__5531_5639,i__5533_5641);
var map__5538_5643__$1 = (((((!((map__5538_5642 == null))))?(((((map__5538_5642.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5538_5642.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5538_5642):map__5538_5642);
var gline_5644 = cljs.core.get.call(null,map__5538_5643__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_5645 = cljs.core.get.call(null,map__5538_5643__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_5646 = cljs.core.get.call(null,map__5538_5643__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_5644], null),cljs.core.fnil.call(null,((function (seq__5530_5638,chunk__5531_5639,count__5532_5640,i__5533_5641,seq__5493_5631,chunk__5494_5632,count__5495_5633,i__5496_5634,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5538_5642,map__5538_5643__$1,gline_5644,gcol_5645,name_5646,vec__5527_5635,column_5636,column_info_5637,vec__5490_5628,line_5629,columns_5630,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_5645], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_5629,new cljs.core.Keyword(null,"col","col",-1959363084),column_5636,new cljs.core.Keyword(null,"name","name",1843675177),name_5646], null));
});})(seq__5530_5638,chunk__5531_5639,count__5532_5640,i__5533_5641,seq__5493_5631,chunk__5494_5632,count__5495_5633,i__5496_5634,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5538_5642,map__5538_5643__$1,gline_5644,gcol_5645,name_5646,vec__5527_5635,column_5636,column_info_5637,vec__5490_5628,line_5629,columns_5630,inverted))
,cljs.core.sorted_map.call(null)));


var G__5647 = seq__5530_5638;
var G__5648 = chunk__5531_5639;
var G__5649 = count__5532_5640;
var G__5650 = (i__5533_5641 + (1));
seq__5530_5638 = G__5647;
chunk__5531_5639 = G__5648;
count__5532_5640 = G__5649;
i__5533_5641 = G__5650;
continue;
} else {
var temp__5720__auto___5651 = cljs.core.seq.call(null,seq__5530_5638);
if(temp__5720__auto___5651){
var seq__5530_5652__$1 = temp__5720__auto___5651;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5530_5652__$1)){
var c__4550__auto___5653 = cljs.core.chunk_first.call(null,seq__5530_5652__$1);
var G__5654 = cljs.core.chunk_rest.call(null,seq__5530_5652__$1);
var G__5655 = c__4550__auto___5653;
var G__5656 = cljs.core.count.call(null,c__4550__auto___5653);
var G__5657 = (0);
seq__5530_5638 = G__5654;
chunk__5531_5639 = G__5655;
count__5532_5640 = G__5656;
i__5533_5641 = G__5657;
continue;
} else {
var map__5540_5658 = cljs.core.first.call(null,seq__5530_5652__$1);
var map__5540_5659__$1 = (((((!((map__5540_5658 == null))))?(((((map__5540_5658.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5540_5658.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5540_5658):map__5540_5658);
var gline_5660 = cljs.core.get.call(null,map__5540_5659__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_5661 = cljs.core.get.call(null,map__5540_5659__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_5662 = cljs.core.get.call(null,map__5540_5659__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_5660], null),cljs.core.fnil.call(null,((function (seq__5530_5638,chunk__5531_5639,count__5532_5640,i__5533_5641,seq__5493_5631,chunk__5494_5632,count__5495_5633,i__5496_5634,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5540_5658,map__5540_5659__$1,gline_5660,gcol_5661,name_5662,seq__5530_5652__$1,temp__5720__auto___5651,vec__5527_5635,column_5636,column_info_5637,vec__5490_5628,line_5629,columns_5630,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_5661], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_5629,new cljs.core.Keyword(null,"col","col",-1959363084),column_5636,new cljs.core.Keyword(null,"name","name",1843675177),name_5662], null));
});})(seq__5530_5638,chunk__5531_5639,count__5532_5640,i__5533_5641,seq__5493_5631,chunk__5494_5632,count__5495_5633,i__5496_5634,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5540_5658,map__5540_5659__$1,gline_5660,gcol_5661,name_5662,seq__5530_5652__$1,temp__5720__auto___5651,vec__5527_5635,column_5636,column_info_5637,vec__5490_5628,line_5629,columns_5630,inverted))
,cljs.core.sorted_map.call(null)));


var G__5663 = cljs.core.next.call(null,seq__5530_5652__$1);
var G__5664 = null;
var G__5665 = (0);
var G__5666 = (0);
seq__5530_5638 = G__5663;
chunk__5531_5639 = G__5664;
count__5532_5640 = G__5665;
i__5533_5641 = G__5666;
continue;
}
} else {
}
}
break;
}


var G__5667 = seq__5493_5631;
var G__5668 = chunk__5494_5632;
var G__5669 = count__5495_5633;
var G__5670 = (i__5496_5634 + (1));
seq__5493_5631 = G__5667;
chunk__5494_5632 = G__5668;
count__5495_5633 = G__5669;
i__5496_5634 = G__5670;
continue;
} else {
var temp__5720__auto___5671 = cljs.core.seq.call(null,seq__5493_5631);
if(temp__5720__auto___5671){
var seq__5493_5672__$1 = temp__5720__auto___5671;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5493_5672__$1)){
var c__4550__auto___5673 = cljs.core.chunk_first.call(null,seq__5493_5672__$1);
var G__5674 = cljs.core.chunk_rest.call(null,seq__5493_5672__$1);
var G__5675 = c__4550__auto___5673;
var G__5676 = cljs.core.count.call(null,c__4550__auto___5673);
var G__5677 = (0);
seq__5493_5631 = G__5674;
chunk__5494_5632 = G__5675;
count__5495_5633 = G__5676;
i__5496_5634 = G__5677;
continue;
} else {
var vec__5542_5678 = cljs.core.first.call(null,seq__5493_5672__$1);
var column_5679 = cljs.core.nth.call(null,vec__5542_5678,(0),null);
var column_info_5680 = cljs.core.nth.call(null,vec__5542_5678,(1),null);
var seq__5545_5681 = cljs.core.seq.call(null,column_info_5680);
var chunk__5546_5682 = null;
var count__5547_5683 = (0);
var i__5548_5684 = (0);
while(true){
if((i__5548_5684 < count__5547_5683)){
var map__5553_5685 = cljs.core._nth.call(null,chunk__5546_5682,i__5548_5684);
var map__5553_5686__$1 = (((((!((map__5553_5685 == null))))?(((((map__5553_5685.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5553_5685.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5553_5685):map__5553_5685);
var gline_5687 = cljs.core.get.call(null,map__5553_5686__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_5688 = cljs.core.get.call(null,map__5553_5686__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_5689 = cljs.core.get.call(null,map__5553_5686__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_5687], null),cljs.core.fnil.call(null,((function (seq__5545_5681,chunk__5546_5682,count__5547_5683,i__5548_5684,seq__5493_5631,chunk__5494_5632,count__5495_5633,i__5496_5634,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5553_5685,map__5553_5686__$1,gline_5687,gcol_5688,name_5689,vec__5542_5678,column_5679,column_info_5680,seq__5493_5672__$1,temp__5720__auto___5671,vec__5490_5628,line_5629,columns_5630,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_5688], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_5629,new cljs.core.Keyword(null,"col","col",-1959363084),column_5679,new cljs.core.Keyword(null,"name","name",1843675177),name_5689], null));
});})(seq__5545_5681,chunk__5546_5682,count__5547_5683,i__5548_5684,seq__5493_5631,chunk__5494_5632,count__5495_5633,i__5496_5634,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5553_5685,map__5553_5686__$1,gline_5687,gcol_5688,name_5689,vec__5542_5678,column_5679,column_info_5680,seq__5493_5672__$1,temp__5720__auto___5671,vec__5490_5628,line_5629,columns_5630,inverted))
,cljs.core.sorted_map.call(null)));


var G__5690 = seq__5545_5681;
var G__5691 = chunk__5546_5682;
var G__5692 = count__5547_5683;
var G__5693 = (i__5548_5684 + (1));
seq__5545_5681 = G__5690;
chunk__5546_5682 = G__5691;
count__5547_5683 = G__5692;
i__5548_5684 = G__5693;
continue;
} else {
var temp__5720__auto___5694__$1 = cljs.core.seq.call(null,seq__5545_5681);
if(temp__5720__auto___5694__$1){
var seq__5545_5695__$1 = temp__5720__auto___5694__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5545_5695__$1)){
var c__4550__auto___5696 = cljs.core.chunk_first.call(null,seq__5545_5695__$1);
var G__5697 = cljs.core.chunk_rest.call(null,seq__5545_5695__$1);
var G__5698 = c__4550__auto___5696;
var G__5699 = cljs.core.count.call(null,c__4550__auto___5696);
var G__5700 = (0);
seq__5545_5681 = G__5697;
chunk__5546_5682 = G__5698;
count__5547_5683 = G__5699;
i__5548_5684 = G__5700;
continue;
} else {
var map__5555_5701 = cljs.core.first.call(null,seq__5545_5695__$1);
var map__5555_5702__$1 = (((((!((map__5555_5701 == null))))?(((((map__5555_5701.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5555_5701.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5555_5701):map__5555_5701);
var gline_5703 = cljs.core.get.call(null,map__5555_5702__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_5704 = cljs.core.get.call(null,map__5555_5702__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_5705 = cljs.core.get.call(null,map__5555_5702__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_5703], null),cljs.core.fnil.call(null,((function (seq__5545_5681,chunk__5546_5682,count__5547_5683,i__5548_5684,seq__5493_5631,chunk__5494_5632,count__5495_5633,i__5496_5634,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5555_5701,map__5555_5702__$1,gline_5703,gcol_5704,name_5705,seq__5545_5695__$1,temp__5720__auto___5694__$1,vec__5542_5678,column_5679,column_info_5680,seq__5493_5672__$1,temp__5720__auto___5671,vec__5490_5628,line_5629,columns_5630,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_5704], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_5629,new cljs.core.Keyword(null,"col","col",-1959363084),column_5679,new cljs.core.Keyword(null,"name","name",1843675177),name_5705], null));
});})(seq__5545_5681,chunk__5546_5682,count__5547_5683,i__5548_5684,seq__5493_5631,chunk__5494_5632,count__5495_5633,i__5496_5634,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5555_5701,map__5555_5702__$1,gline_5703,gcol_5704,name_5705,seq__5545_5695__$1,temp__5720__auto___5694__$1,vec__5542_5678,column_5679,column_info_5680,seq__5493_5672__$1,temp__5720__auto___5671,vec__5490_5628,line_5629,columns_5630,inverted))
,cljs.core.sorted_map.call(null)));


var G__5706 = cljs.core.next.call(null,seq__5545_5695__$1);
var G__5707 = null;
var G__5708 = (0);
var G__5709 = (0);
seq__5545_5681 = G__5706;
chunk__5546_5682 = G__5707;
count__5547_5683 = G__5708;
i__5548_5684 = G__5709;
continue;
}
} else {
}
}
break;
}


var G__5710 = cljs.core.next.call(null,seq__5493_5672__$1);
var G__5711 = null;
var G__5712 = (0);
var G__5713 = (0);
seq__5493_5631 = G__5710;
chunk__5494_5632 = G__5711;
count__5495_5633 = G__5712;
i__5496_5634 = G__5713;
continue;
}
} else {
}
}
break;
}


var G__5714 = seq__5352_5624;
var G__5715 = chunk__5353_5625;
var G__5716 = count__5354_5626;
var G__5717 = (i__5355_5627 + (1));
seq__5352_5624 = G__5714;
chunk__5353_5625 = G__5715;
count__5354_5626 = G__5716;
i__5355_5627 = G__5717;
continue;
} else {
var temp__5720__auto___5718 = cljs.core.seq.call(null,seq__5352_5624);
if(temp__5720__auto___5718){
var seq__5352_5719__$1 = temp__5720__auto___5718;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5352_5719__$1)){
var c__4550__auto___5720 = cljs.core.chunk_first.call(null,seq__5352_5719__$1);
var G__5721 = cljs.core.chunk_rest.call(null,seq__5352_5719__$1);
var G__5722 = c__4550__auto___5720;
var G__5723 = cljs.core.count.call(null,c__4550__auto___5720);
var G__5724 = (0);
seq__5352_5624 = G__5721;
chunk__5353_5625 = G__5722;
count__5354_5626 = G__5723;
i__5355_5627 = G__5724;
continue;
} else {
var vec__5557_5725 = cljs.core.first.call(null,seq__5352_5719__$1);
var line_5726 = cljs.core.nth.call(null,vec__5557_5725,(0),null);
var columns_5727 = cljs.core.nth.call(null,vec__5557_5725,(1),null);
var seq__5560_5728 = cljs.core.seq.call(null,columns_5727);
var chunk__5561_5729 = null;
var count__5562_5730 = (0);
var i__5563_5731 = (0);
while(true){
if((i__5563_5731 < count__5562_5730)){
var vec__5594_5732 = cljs.core._nth.call(null,chunk__5561_5729,i__5563_5731);
var column_5733 = cljs.core.nth.call(null,vec__5594_5732,(0),null);
var column_info_5734 = cljs.core.nth.call(null,vec__5594_5732,(1),null);
var seq__5597_5735 = cljs.core.seq.call(null,column_info_5734);
var chunk__5598_5736 = null;
var count__5599_5737 = (0);
var i__5600_5738 = (0);
while(true){
if((i__5600_5738 < count__5599_5737)){
var map__5605_5739 = cljs.core._nth.call(null,chunk__5598_5736,i__5600_5738);
var map__5605_5740__$1 = (((((!((map__5605_5739 == null))))?(((((map__5605_5739.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5605_5739.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5605_5739):map__5605_5739);
var gline_5741 = cljs.core.get.call(null,map__5605_5740__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_5742 = cljs.core.get.call(null,map__5605_5740__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_5743 = cljs.core.get.call(null,map__5605_5740__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_5741], null),cljs.core.fnil.call(null,((function (seq__5597_5735,chunk__5598_5736,count__5599_5737,i__5600_5738,seq__5560_5728,chunk__5561_5729,count__5562_5730,i__5563_5731,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5605_5739,map__5605_5740__$1,gline_5741,gcol_5742,name_5743,vec__5594_5732,column_5733,column_info_5734,vec__5557_5725,line_5726,columns_5727,seq__5352_5719__$1,temp__5720__auto___5718,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_5742], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_5726,new cljs.core.Keyword(null,"col","col",-1959363084),column_5733,new cljs.core.Keyword(null,"name","name",1843675177),name_5743], null));
});})(seq__5597_5735,chunk__5598_5736,count__5599_5737,i__5600_5738,seq__5560_5728,chunk__5561_5729,count__5562_5730,i__5563_5731,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5605_5739,map__5605_5740__$1,gline_5741,gcol_5742,name_5743,vec__5594_5732,column_5733,column_info_5734,vec__5557_5725,line_5726,columns_5727,seq__5352_5719__$1,temp__5720__auto___5718,inverted))
,cljs.core.sorted_map.call(null)));


var G__5744 = seq__5597_5735;
var G__5745 = chunk__5598_5736;
var G__5746 = count__5599_5737;
var G__5747 = (i__5600_5738 + (1));
seq__5597_5735 = G__5744;
chunk__5598_5736 = G__5745;
count__5599_5737 = G__5746;
i__5600_5738 = G__5747;
continue;
} else {
var temp__5720__auto___5748__$1 = cljs.core.seq.call(null,seq__5597_5735);
if(temp__5720__auto___5748__$1){
var seq__5597_5749__$1 = temp__5720__auto___5748__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5597_5749__$1)){
var c__4550__auto___5750 = cljs.core.chunk_first.call(null,seq__5597_5749__$1);
var G__5751 = cljs.core.chunk_rest.call(null,seq__5597_5749__$1);
var G__5752 = c__4550__auto___5750;
var G__5753 = cljs.core.count.call(null,c__4550__auto___5750);
var G__5754 = (0);
seq__5597_5735 = G__5751;
chunk__5598_5736 = G__5752;
count__5599_5737 = G__5753;
i__5600_5738 = G__5754;
continue;
} else {
var map__5607_5755 = cljs.core.first.call(null,seq__5597_5749__$1);
var map__5607_5756__$1 = (((((!((map__5607_5755 == null))))?(((((map__5607_5755.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5607_5755.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5607_5755):map__5607_5755);
var gline_5757 = cljs.core.get.call(null,map__5607_5756__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_5758 = cljs.core.get.call(null,map__5607_5756__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_5759 = cljs.core.get.call(null,map__5607_5756__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_5757], null),cljs.core.fnil.call(null,((function (seq__5597_5735,chunk__5598_5736,count__5599_5737,i__5600_5738,seq__5560_5728,chunk__5561_5729,count__5562_5730,i__5563_5731,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5607_5755,map__5607_5756__$1,gline_5757,gcol_5758,name_5759,seq__5597_5749__$1,temp__5720__auto___5748__$1,vec__5594_5732,column_5733,column_info_5734,vec__5557_5725,line_5726,columns_5727,seq__5352_5719__$1,temp__5720__auto___5718,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_5758], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_5726,new cljs.core.Keyword(null,"col","col",-1959363084),column_5733,new cljs.core.Keyword(null,"name","name",1843675177),name_5759], null));
});})(seq__5597_5735,chunk__5598_5736,count__5599_5737,i__5600_5738,seq__5560_5728,chunk__5561_5729,count__5562_5730,i__5563_5731,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5607_5755,map__5607_5756__$1,gline_5757,gcol_5758,name_5759,seq__5597_5749__$1,temp__5720__auto___5748__$1,vec__5594_5732,column_5733,column_info_5734,vec__5557_5725,line_5726,columns_5727,seq__5352_5719__$1,temp__5720__auto___5718,inverted))
,cljs.core.sorted_map.call(null)));


var G__5760 = cljs.core.next.call(null,seq__5597_5749__$1);
var G__5761 = null;
var G__5762 = (0);
var G__5763 = (0);
seq__5597_5735 = G__5760;
chunk__5598_5736 = G__5761;
count__5599_5737 = G__5762;
i__5600_5738 = G__5763;
continue;
}
} else {
}
}
break;
}


var G__5764 = seq__5560_5728;
var G__5765 = chunk__5561_5729;
var G__5766 = count__5562_5730;
var G__5767 = (i__5563_5731 + (1));
seq__5560_5728 = G__5764;
chunk__5561_5729 = G__5765;
count__5562_5730 = G__5766;
i__5563_5731 = G__5767;
continue;
} else {
var temp__5720__auto___5768__$1 = cljs.core.seq.call(null,seq__5560_5728);
if(temp__5720__auto___5768__$1){
var seq__5560_5769__$1 = temp__5720__auto___5768__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5560_5769__$1)){
var c__4550__auto___5770 = cljs.core.chunk_first.call(null,seq__5560_5769__$1);
var G__5771 = cljs.core.chunk_rest.call(null,seq__5560_5769__$1);
var G__5772 = c__4550__auto___5770;
var G__5773 = cljs.core.count.call(null,c__4550__auto___5770);
var G__5774 = (0);
seq__5560_5728 = G__5771;
chunk__5561_5729 = G__5772;
count__5562_5730 = G__5773;
i__5563_5731 = G__5774;
continue;
} else {
var vec__5609_5775 = cljs.core.first.call(null,seq__5560_5769__$1);
var column_5776 = cljs.core.nth.call(null,vec__5609_5775,(0),null);
var column_info_5777 = cljs.core.nth.call(null,vec__5609_5775,(1),null);
var seq__5612_5778 = cljs.core.seq.call(null,column_info_5777);
var chunk__5613_5779 = null;
var count__5614_5780 = (0);
var i__5615_5781 = (0);
while(true){
if((i__5615_5781 < count__5614_5780)){
var map__5620_5782 = cljs.core._nth.call(null,chunk__5613_5779,i__5615_5781);
var map__5620_5783__$1 = (((((!((map__5620_5782 == null))))?(((((map__5620_5782.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5620_5782.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5620_5782):map__5620_5782);
var gline_5784 = cljs.core.get.call(null,map__5620_5783__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_5785 = cljs.core.get.call(null,map__5620_5783__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_5786 = cljs.core.get.call(null,map__5620_5783__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_5784], null),cljs.core.fnil.call(null,((function (seq__5612_5778,chunk__5613_5779,count__5614_5780,i__5615_5781,seq__5560_5728,chunk__5561_5729,count__5562_5730,i__5563_5731,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5620_5782,map__5620_5783__$1,gline_5784,gcol_5785,name_5786,vec__5609_5775,column_5776,column_info_5777,seq__5560_5769__$1,temp__5720__auto___5768__$1,vec__5557_5725,line_5726,columns_5727,seq__5352_5719__$1,temp__5720__auto___5718,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_5785], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_5726,new cljs.core.Keyword(null,"col","col",-1959363084),column_5776,new cljs.core.Keyword(null,"name","name",1843675177),name_5786], null));
});})(seq__5612_5778,chunk__5613_5779,count__5614_5780,i__5615_5781,seq__5560_5728,chunk__5561_5729,count__5562_5730,i__5563_5731,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5620_5782,map__5620_5783__$1,gline_5784,gcol_5785,name_5786,vec__5609_5775,column_5776,column_info_5777,seq__5560_5769__$1,temp__5720__auto___5768__$1,vec__5557_5725,line_5726,columns_5727,seq__5352_5719__$1,temp__5720__auto___5718,inverted))
,cljs.core.sorted_map.call(null)));


var G__5787 = seq__5612_5778;
var G__5788 = chunk__5613_5779;
var G__5789 = count__5614_5780;
var G__5790 = (i__5615_5781 + (1));
seq__5612_5778 = G__5787;
chunk__5613_5779 = G__5788;
count__5614_5780 = G__5789;
i__5615_5781 = G__5790;
continue;
} else {
var temp__5720__auto___5791__$2 = cljs.core.seq.call(null,seq__5612_5778);
if(temp__5720__auto___5791__$2){
var seq__5612_5792__$1 = temp__5720__auto___5791__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5612_5792__$1)){
var c__4550__auto___5793 = cljs.core.chunk_first.call(null,seq__5612_5792__$1);
var G__5794 = cljs.core.chunk_rest.call(null,seq__5612_5792__$1);
var G__5795 = c__4550__auto___5793;
var G__5796 = cljs.core.count.call(null,c__4550__auto___5793);
var G__5797 = (0);
seq__5612_5778 = G__5794;
chunk__5613_5779 = G__5795;
count__5614_5780 = G__5796;
i__5615_5781 = G__5797;
continue;
} else {
var map__5622_5798 = cljs.core.first.call(null,seq__5612_5792__$1);
var map__5622_5799__$1 = (((((!((map__5622_5798 == null))))?(((((map__5622_5798.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__5622_5798.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__5622_5798):map__5622_5798);
var gline_5800 = cljs.core.get.call(null,map__5622_5799__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_5801 = cljs.core.get.call(null,map__5622_5799__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_5802 = cljs.core.get.call(null,map__5622_5799__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_5800], null),cljs.core.fnil.call(null,((function (seq__5612_5778,chunk__5613_5779,count__5614_5780,i__5615_5781,seq__5560_5728,chunk__5561_5729,count__5562_5730,i__5563_5731,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5622_5798,map__5622_5799__$1,gline_5800,gcol_5801,name_5802,seq__5612_5792__$1,temp__5720__auto___5791__$2,vec__5609_5775,column_5776,column_info_5777,seq__5560_5769__$1,temp__5720__auto___5768__$1,vec__5557_5725,line_5726,columns_5727,seq__5352_5719__$1,temp__5720__auto___5718,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_5801], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_5726,new cljs.core.Keyword(null,"col","col",-1959363084),column_5776,new cljs.core.Keyword(null,"name","name",1843675177),name_5802], null));
});})(seq__5612_5778,chunk__5613_5779,count__5614_5780,i__5615_5781,seq__5560_5728,chunk__5561_5729,count__5562_5730,i__5563_5731,seq__5352_5624,chunk__5353_5625,count__5354_5626,i__5355_5627,map__5622_5798,map__5622_5799__$1,gline_5800,gcol_5801,name_5802,seq__5612_5792__$1,temp__5720__auto___5791__$2,vec__5609_5775,column_5776,column_info_5777,seq__5560_5769__$1,temp__5720__auto___5768__$1,vec__5557_5725,line_5726,columns_5727,seq__5352_5719__$1,temp__5720__auto___5718,inverted))
,cljs.core.sorted_map.call(null)));


var G__5803 = cljs.core.next.call(null,seq__5612_5792__$1);
var G__5804 = null;
var G__5805 = (0);
var G__5806 = (0);
seq__5612_5778 = G__5803;
chunk__5613_5779 = G__5804;
count__5614_5780 = G__5805;
i__5615_5781 = G__5806;
continue;
}
} else {
}
}
break;
}


var G__5807 = cljs.core.next.call(null,seq__5560_5769__$1);
var G__5808 = null;
var G__5809 = (0);
var G__5810 = (0);
seq__5560_5728 = G__5807;
chunk__5561_5729 = G__5808;
count__5562_5730 = G__5809;
i__5563_5731 = G__5810;
continue;
}
} else {
}
}
break;
}


var G__5811 = cljs.core.next.call(null,seq__5352_5719__$1);
var G__5812 = null;
var G__5813 = (0);
var G__5814 = (0);
seq__5352_5624 = G__5811;
chunk__5353_5625 = G__5812;
count__5354_5626 = G__5813;
i__5355_5627 = G__5814;
continue;
}
} else {
}
}
break;
}

return cljs.core.deref.call(null,inverted);
});

//# sourceMappingURL=source_map.js.map
