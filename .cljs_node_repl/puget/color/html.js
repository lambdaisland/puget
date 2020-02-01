// Compiled by ClojureScript 1.10.520 {:target :nodejs}
goog.provide('puget.color.html');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('puget.color');
/**
 * Map from keywords usable in a color-scheme value to vectors
 *   representing css style attributes
 */
puget.color.html.style_attribute = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"bold","bold",-116809535),new cljs.core.Keyword(null,"blink","blink",-271985917),new cljs.core.Keyword(null,"white","white",-483998618),new cljs.core.Keyword(null,"yellow","yellow",-881035449),new cljs.core.Keyword(null,"bg-red","bg-red",-1645498040),new cljs.core.Keyword(null,"bg-cyan","bg-cyan",-1582237015),new cljs.core.Keyword(null,"green","green",-945526839),new cljs.core.Keyword(null,"bg-green","bg-green",-138353590),new cljs.core.Keyword(null,"fg-reset","fg-reset",1908873578),new cljs.core.Keyword(null,"cyan","cyan",1118839274),new cljs.core.Keyword(null,"bg-black","bg-black",2110303851),new cljs.core.Keyword(null,"fg-256","fg-256",-255017013),new cljs.core.Keyword(null,"underline","underline",2018066703),new cljs.core.Keyword(null,"bg-magenta","bg-magenta",2073641232),new cljs.core.Keyword(null,"strike","strike",-1173815471),new cljs.core.Keyword(null,"bg-yellow","bg-yellow",-1293468429),new cljs.core.Keyword(null,"hidden","hidden",-312506092),new cljs.core.Keyword(null,"red","red",-969428204),new cljs.core.Keyword(null,"blue","blue",-622100620),new cljs.core.Keyword(null,"bg-white","bg-white",-1453241673),new cljs.core.Keyword(null,"bg-256","bg-256",1097886744),new cljs.core.Keyword(null,"magenta","magenta",1687937081),new cljs.core.Keyword(null,"bg-blue","bg-blue",-1747478308),new cljs.core.Keyword(null,"bg-reset","bg-reset",857739453),new cljs.core.Keyword(null,"none","none",1333468478),new cljs.core.Keyword(null,"reverse","reverse",-888455266),new cljs.core.Keyword(null,"black","black",1294279647)],[new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),"bold"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text-decoration","text-decoration",1836813207),"blink"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"color","color",1011675173),"white"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"color","color",1011675173),"yellow"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"red"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"cyan"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"color","color",1011675173),"green"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"green"], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"color","color",1011675173),"cyan"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"black"], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text-decoration","text-decoration",1836813207),"underline"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"magenta"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text-decoration","text-decoration",1836813207),"line-through"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"yellow"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"visibility","visibility",1338380893),"hidden"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"color","color",1011675173),"red"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"color","color",1011675173),"blue"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"white"], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"color","color",1011675173),"magenta"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"blue"], null),null,null,null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"color","color",1011675173),"black"], null)]);
/**
 * Returns a formatted style attribute for a span given a seq of
 *   keywords usable in a :color-scheme value
 */
puget.color.html.style = (function puget$color$html$style(codes){
var attributes = cljs.core.map.call(null,(function (p1__1321_SHARP_){
return cljs.core.get.call(null,puget.color.html.style_attribute,p1__1321_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"color","color",1011675173),cljs.core.name.call(null,p1__1321_SHARP_)], null));
}),codes);
return ["style=\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,";",cljs.core.map.call(null,((function (attributes){
return (function (p__1326){
var vec__1327 = p__1326;
var k = cljs.core.nth.call(null,vec__1327,(0),null);
var v = cljs.core.nth.call(null,vec__1327,(1),null);
return [cljs.core.name.call(null,k),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)].join('');
});})(attributes))
,attributes))),"\""].join('');
});
/**
 * Escapes special characters into HTML entities.
 */
puget.color.html.escape_html_text = (function puget$color$html$escape_html_text(text){
return clojure.string.escape.call(null,text,new cljs.core.PersistentArrayMap(null, 4, ["&","&amp;","<","&lt;",">","&gt;","\"","&quot;"], null));
});
/**
 * Applies HTML escaping to the node if it is a string. Returns a print
 *   document representing the escaped string, or the original node if not.
 */
puget.color.html.escape_html_node = (function puget$color$html$escape_html_node(node){
if(typeof node === 'string'){
var escaped_text = puget.color.html.escape_html_text.call(null,node);
var spans = clojure.string.split.call(null,escaped_text,/(?=&)/);
return cljs.core.reduce.call(null,((function (escaped_text,spans){
return (function (acc,span){
var G__1330 = cljs.core.first.call(null,span);
if(cljs.core._EQ_.call(null,null,G__1330)){
return acc;
} else {
if(cljs.core._EQ_.call(null,"&",G__1330)){
var vec__1331 = clojure.string.split.call(null,span,/(?<=;)/,(2));
var escaped = cljs.core.nth.call(null,vec__1331,(0),null);
var span__$1 = cljs.core.nth.call(null,vec__1331,(1),null);
var acc__$1 = cljs.core.conj.call(null,acc,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"escaped","escaped",-1007929769),escaped], null));
if(cljs.core.seq.call(null,span__$1)){
return cljs.core.conj.call(null,acc__$1,span__$1);
} else {
return acc__$1;
}
} else {
return cljs.core.conj.call(null,acc,span);

}
}
});})(escaped_text,spans))
,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991)], null),spans);
} else {
return node;
}
});
/**
 * Escapes special characters into fipp :span/:escaped nodes
 */
puget.color.html.escape_html_document = (function puget$color$html$escape_html_document(document){
return clojure.walk.postwalk.call(null,puget.color.html.escape_html_node,document);
});
cljs.core._add_method.call(null,puget.color.document,new cljs.core.Keyword(null,"html-inline","html-inline",1677224886),(function (options,element,document){
var temp__5718__auto__ = cljs.core.seq.call(null,cljs.core.get.call(null,new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295).cljs$core$IFn$_invoke$arity$1(options),element));
if(temp__5718__auto__){
var codes = temp__5718__auto__;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pass","pass",1574159993),"<span ",puget.color.html.style.call(null,codes),">"], null),puget.color.html.escape_html_document.call(null,document),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pass","pass",1574159993),"</span>"], null)], null);
} else {
return puget.color.html.escape_html_document.call(null,document);
}
}));
cljs.core._add_method.call(null,puget.color.text,new cljs.core.Keyword(null,"html-inline","html-inline",1677224886),(function (options,element,text){
var temp__5718__auto__ = cljs.core.seq.call(null,cljs.core.get.call(null,new cljs.core.Keyword(null,"color-scheme","color-scheme",-903842295).cljs$core$IFn$_invoke$arity$1(options),element));
if(temp__5718__auto__){
var codes = temp__5718__auto__;
return ["<span ",puget.color.html.style.call(null,codes),">",cljs.core.str.cljs$core$IFn$_invoke$arity$1(puget.color.html.escape_html_text.call(null,text)),"</span>"].join('');
} else {
return puget.color.html.escape_html_text.call(null,text);
}
}));
cljs.core._add_method.call(null,puget.color.document,new cljs.core.Keyword(null,"html-classes","html-classes",988605214),(function (options,element,document){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pass","pass",1574159993),"<span class=\"",cljs.core.name.call(null,element),"\">"], null),puget.color.html.escape_html_document.call(null,document),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pass","pass",1574159993),"</span>"], null)], null);
}));
cljs.core._add_method.call(null,puget.color.text,new cljs.core.Keyword(null,"html-classes","html-classes",988605214),(function (options,element,text){
return ["<span class=\"",cljs.core.name.call(null,element),"\">",cljs.core.str.cljs$core$IFn$_invoke$arity$1(puget.color.html.escape_html_text.call(null,text)),"</span>"].join('');
}));

//# sourceMappingURL=html.js.map
