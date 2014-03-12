(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if(typeof Object.create!=="function"){
Object.create=function(o){
function F(){
};
F.prototype=o;
return new F();
};
}
var ua={toString:function(){
return navigator.userAgent;
},test:function(s){
return this.toString().toLowerCase().indexOf(s.toLowerCase())>-1;
}};
ua.version=(ua.toString().toLowerCase().match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];
ua.webkit=ua.test("webkit");
ua.gecko=ua.test("gecko")&&!ua.webkit;
ua.opera=ua.test("opera");
ua.ie=ua.test("msie")&&!ua.opera;
ua.ie6=ua.ie&&document.compatMode&&typeof document.documentElement.style.maxHeight==="undefined";
ua.ie7=ua.ie&&document.documentElement&&typeof document.documentElement.style.maxHeight!=="undefined"&&typeof XDomainRequest==="undefined";
ua.ie8=ua.ie&&typeof XDomainRequest!=="undefined";
var domReady=function(){
var _1=[];
var _2=function(){
if(!arguments.callee.done){
arguments.callee.done=true;
for(var i=0;i<_1.length;i++){
_1[i]();
}
}
};
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",_2,false);
}
if(ua.ie){
(function(){
try{
document.documentElement.doScroll("left");
}
catch(e){
setTimeout(arguments.callee,50);
return;
}
_2();
})();
document.onreadystatechange=function(){
if(document.readyState==="complete"){
document.onreadystatechange=null;
_2();
}
};
}
if(ua.webkit&&document.readyState){
(function(){
if(document.readyState!=="loading"){
_2();
}else{
setTimeout(arguments.callee,10);
}
})();
}
window.onload=_2;
return function(fn){
if(typeof fn==="function"){
_1[_1.length]=fn;
}
return fn;
};
}();
var cssHelper=function(){
var _3={BLOCKS:/[^\s{][^{]*\{(?:[^{}]*\{[^{}]*\}[^{}]*|[^{}]*)*\}/g,BLOCKS_INSIDE:/[^\s{][^{]*\{[^{}]*\}/g,DECLARATIONS:/[a-zA-Z\-]+[^;]*:[^;]+;/g,RELATIVE_URLS:/url\(['"]?([^\/\)'"][^:\)'"]+)['"]?\)/g,REDUNDANT_COMPONENTS:/(?:\/\*([^*\\\\]|\*(?!\/))+\*\/|@import[^;]+;)/g,REDUNDANT_WHITESPACE:/\s*(,|:|;|\{|\})\s*/g,MORE_WHITESPACE:/\s{2,}/g,FINAL_SEMICOLONS:/;\}/g,NOT_WHITESPACE:/\S+/g};
var _4,_5=false;
var _6=[];
var _7=function(fn){
if(typeof fn==="function"){
_6[_6.length]=fn;
}
};
var _8=function(){
for(var i=0;i<_6.length;i++){
_6[i](_4);
}
};
var _9={};
var _a=function(n,v){
if(_9[n]){
var _b=_9[n].listeners;
if(_b){
for(var i=0;i<_b.length;i++){
_b[i](v);
}
}
}
};
var _c=function(_d,_e,_f){
if(ua.ie&&!window.XMLHttpRequest){
window.XMLHttpRequest=function(){
return new ActiveXObject("Microsoft.XMLHTTP");
};
}
if(!XMLHttpRequest){
return "";
}
var r=new XMLHttpRequest();
try{
r.open("get",_d,true);
r.setRequestHeader("X_REQUESTED_WITH","XMLHttpRequest");
}
catch(e){
_f();
return;
}
var _10=false;
setTimeout(function(){
_10=true;
},5000);
document.documentElement.style.cursor="progress";
r.onreadystatechange=function(){
if(r.readyState===4&&!_10){
if(!r.status&&location.protocol==="file:"||(r.status>=200&&r.status<300)||r.status===304||navigator.userAgent.indexOf("Safari")>-1&&typeof r.status==="undefined"){
_e(r.responseText);
}else{
_f();
}
document.documentElement.style.cursor="";
r=null;
}
};
r.send("");
};
var _11=function(_12){
_12=_12.replace(_3.REDUNDANT_COMPONENTS,"");
_12=_12.replace(_3.REDUNDANT_WHITESPACE,"$1");
_12=_12.replace(_3.MORE_WHITESPACE," ");
_12=_12.replace(_3.FINAL_SEMICOLONS,"}");
return _12;
};
var _13={mediaQueryList:function(s){
var o={};
var idx=s.indexOf("{");
var lt=s.substring(0,idx);
s=s.substring(idx+1,s.length-1);
var mqs=[],rs=[];
var qts=lt.toLowerCase().substring(7).split(",");
for(var i=0;i<qts.length;i++){
mqs[mqs.length]=_13.mediaQuery(qts[i],o);
}
var rts=s.match(_3.BLOCKS_INSIDE);
if(rts!==null){
for(i=0;i<rts.length;i++){
rs[rs.length]=_13.rule(rts[i],o);
}
}
o.getMediaQueries=function(){
return mqs;
};
o.getRules=function(){
return rs;
};
o.getListText=function(){
return lt;
};
o.getCssText=function(){
return s;
};
return o;
},mediaQuery:function(s,mql){
s=s||"";
var not=false,_14;
var exp=[];
var _15=true;
var _16=s.match(_3.NOT_WHITESPACE);
for(var i=0;i<_16.length;i++){
var _17=_16[i];
if(!_14&&(_17==="not"||_17==="only")){
if(_17==="not"){
not=true;
}
}else{
if(!_14){
_14=_17;
}else{
if(_17.charAt(0)==="("){
var _18=_17.substring(1,_17.length-1).split(":");
exp[exp.length]={mediaFeature:_18[0],value:_18[1]||null};
}
}
}
}
return {getList:function(){
return mql||null;
},getValid:function(){
return _15;
},getNot:function(){
return not;
},getMediaType:function(){
return _14;
},getExpressions:function(){
return exp;
}};
},rule:function(s,mql){
var o={};
var idx=s.indexOf("{");
var st=s.substring(0,idx);
var ss=st.split(",");
var ds=[];
var dts=s.substring(idx+1,s.length-1).split(";");
for(var i=0;i<dts.length;i++){
ds[ds.length]=_13.declaration(dts[i],o);
}
o.getMediaQueryList=function(){
return mql||null;
};
o.getSelectors=function(){
return ss;
};
o.getSelectorText=function(){
return st;
};
o.getDeclarations=function(){
return ds;
};
o.getPropertyValue=function(n){
for(var i=0;i<ds.length;i++){
if(ds[i].getProperty()===n){
return ds[i].getValue();
}
}
return null;
};
return o;
},declaration:function(s,r){
var idx=s.indexOf(":");
var p=s.substring(0,idx);
var v=s.substring(idx+1);
return {getRule:function(){
return r||null;
},getProperty:function(){
return p;
},getValue:function(){
return v;
}};
}};
var _19=function(el){
if(typeof el.cssHelperText!=="string"){
return;
}
var o={mediaQueryLists:[],rules:[],selectors:{},declarations:[],properties:{}};
var _1a=o.mediaQueryLists;
var ors=o.rules;
var _1b=el.cssHelperText.match(_3.BLOCKS);
if(_1b!==null){
for(var i=0;i<_1b.length;i++){
if(_1b[i].substring(0,7)==="@media "){
_1a[_1a.length]=_13.mediaQueryList(_1b[i]);
ors=o.rules=ors.concat(_1a[_1a.length-1].getRules());
}else{
ors[ors.length]=_13.rule(_1b[i]);
}
}
}
var oss=o.selectors;
var _1c=function(r){
var ss=r.getSelectors();
for(var i=0;i<ss.length;i++){
var n=ss[i];
if(!oss[n]){
oss[n]=[];
}
oss[n][oss[n].length]=r;
}
};
for(i=0;i<ors.length;i++){
_1c(ors[i]);
}
var ods=o.declarations;
for(i=0;i<ors.length;i++){
ods=o.declarations=ods.concat(ors[i].getDeclarations());
}
var ops=o.properties;
for(i=0;i<ods.length;i++){
var n=ods[i].getProperty();
if(!ops[n]){
ops[n]=[];
}
ops[n][ops[n].length]=ods[i];
}
el.cssHelperParsed=o;
_4[_4.length]=el;
return o;
};
var _1d=function(el,s){
el.cssHelperText=_11(s||el.innerHTML);
return _19(el);
};
var _1e=function(){
_5=true;
_4=[];
var _1f=[];
var _20=function(){
for(var i=0;i<_1f.length;i++){
_19(_1f[i]);
}
var _21=document.getElementsByTagName("style");
for(i=0;i<_21.length;i++){
_1d(_21[i]);
}
_5=false;
_8();
};
var _22=document.getElementsByTagName("link");
for(var i=0;i<_22.length;i++){
var _23=_22[i];
if(_23.getAttribute("rel").indexOf("style")>-1&&_23.href&&_23.href.length!==0&&!_23.disabled){
_1f[_1f.length]=_23;
}
}
if(_1f.length>0){
var c=0;
var _24=function(){
c++;
if(c===_1f.length){
_20();
}
};
var _25=function(_26){
var _27=_26.href;
_c(_27,function(_28){
_28=_11(_28).replace(_3.RELATIVE_URLS,"url("+_27.substring(0,_27.lastIndexOf("/"))+"/$1)");
_26.cssHelperText=_28;
_24();
},_24);
};
for(i=0;i<_1f.length;i++){
_25(_1f[i]);
}
}else{
_20();
}
};
var _29={mediaQueryLists:"array",rules:"array",selectors:"object",declarations:"array",properties:"object"};
var _2a={mediaQueryLists:null,rules:null,selectors:null,declarations:null,properties:null};
var _2b=function(_2c,v){
if(_2a[_2c]!==null){
if(_29[_2c]==="array"){
return (_2a[_2c]=_2a[_2c].concat(v));
}else{
var c=_2a[_2c];
for(var n in v){
if(v.hasOwnProperty(n)){
if(!c[n]){
c[n]=v[n];
}else{
c[n]=c[n].concat(v[n]);
}
}
}
return c;
}
}
};
var _2d=function(_2e){
_2a[_2e]=(_29[_2e]==="array")?[]:{};
for(var i=0;i<_4.length;i++){
_2b(_2e,_4[i].cssHelperParsed[_2e]);
}
return _2a[_2e];
};
domReady(function(){
var els=document.body.getElementsByTagName("*");
for(var i=0;i<els.length;i++){
els[i].checkedByCssHelper=true;
}
if(document.implementation.hasFeature("MutationEvents","2.0")||window.MutationEvent){
document.body.addEventListener("DOMNodeInserted",function(e){
var el=e.target;
if(el.nodeType===1){
_a("DOMElementInserted",el);
el.checkedByCssHelper=true;
}
},false);
}else{
setInterval(function(){
var els=document.body.getElementsByTagName("*");
for(var i=0;i<els.length;i++){
if(!els[i].checkedByCssHelper){
_a("DOMElementInserted",els[i]);
els[i].checkedByCssHelper=true;
}
}
},1000);
}
});
var _2f=function(d){
if(typeof window.innerWidth!="undefined"){
return window["inner"+d];
}else{
if(typeof document.documentElement!="undefined"&&typeof document.documentElement.clientWidth!="undefined"&&document.documentElement.clientWidth!=0){
return document.documentElement["client"+d];
}
}
};
return {addStyle:function(s,_30){
var el=document.createElement("style");
el.setAttribute("type","text/css");
document.getElementsByTagName("head")[0].appendChild(el);
if(el.styleSheet){
el.styleSheet.cssText=s;
}else{
el.appendChild(document.createTextNode(s));
}
el.addedWithCssHelper=true;
if(typeof _30==="undefined"||_30===true){
cssHelper.parsed(function(_31){
var o=_1d(el,s);
for(var n in o){
if(o.hasOwnProperty(n)){
_2b(n,o[n]);
}
}
_a("newStyleParsed",el);
});
}else{
el.parsingDisallowed=true;
}
return el;
},removeStyle:function(el){
return el.parentNode.removeChild(el);
},parsed:function(fn){
if(_5){
_7(fn);
}else{
if(typeof _4!=="undefined"){
if(typeof fn==="function"){
fn(_4);
}
}else{
_7(fn);
_1e();
}
}
},mediaQueryLists:function(fn){
cssHelper.parsed(function(_32){
fn(_2a.mediaQueryLists||_2d("mediaQueryLists"));
});
},rules:function(fn){
cssHelper.parsed(function(_33){
fn(_2a.rules||_2d("rules"));
});
},selectors:function(fn){
cssHelper.parsed(function(_34){
fn(_2a.selectors||_2d("selectors"));
});
},declarations:function(fn){
cssHelper.parsed(function(_35){
fn(_2a.declarations||_2d("declarations"));
});
},properties:function(fn){
cssHelper.parsed(function(_36){
fn(_2a.properties||_2d("properties"));
});
},broadcast:_a,addListener:function(n,fn){
if(typeof fn==="function"){
if(!_9[n]){
_9[n]={listeners:[]};
}
_9[n].listeners[_9[n].listeners.length]=fn;
}
},removeListener:function(n,fn){
if(typeof fn==="function"&&_9[n]){
var ls=_9[n].listeners;
for(var i=0;i<ls.length;i++){
if(ls[i]===fn){
ls.splice(i,1);
i-=1;
}
}
}
},getViewportWidth:function(){
return _2f("Width");
},getViewportHeight:function(){
return _2f("Height");
}};
}();
domReady(function enableCssMediaQueries(){
var _37;
var _38={LENGTH_UNIT:/[0-9]+(em|ex|px|in|cm|mm|pt|pc)$/,RESOLUTION_UNIT:/[0-9]+(dpi|dpcm)$/,ASPECT_RATIO:/^[0-9]+\/[0-9]+$/,ABSOLUTE_VALUE:/^[0-9]*(\.[0-9]+)*$/};
var _39=[];
var _3a=function(){
var id="css3-mediaqueries-test";
var el=document.createElement("div");
el.id=id;
var _3b=cssHelper.addStyle("@media all and (width) { #"+id+" { width: 1px !important; } }",false);
document.body.appendChild(el);
var ret=el.offsetWidth===1;
_3b.parentNode.removeChild(_3b);
el.parentNode.removeChild(el);
_3a=function(){
return ret;
};
return ret;
};
var _3c=function(){
_37=document.createElement("div");
_37.style.cssText="position:absolute;top:-9999em;left:-9999em;"+"margin:0;border:none;padding:0;width:1em;font-size:1em;";
document.body.appendChild(_37);
if(_37.offsetWidth!==16){
_37.style.fontSize=16/_37.offsetWidth+"em";
}
_37.style.width="";
};
var _3d=function(_3e){
_37.style.width=_3e;
var _3f=_37.offsetWidth;
_37.style.width="";
return _3f;
};
var _40=function(_41,_42){
var l=_41.length;
var min=(_41.substring(0,4)==="min-");
var max=(!min&&_41.substring(0,4)==="max-");
if(_42!==null){
var _43;
var _44;
if(_38.LENGTH_UNIT.exec(_42)){
_43="length";
_44=_3d(_42);
}else{
if(_38.RESOLUTION_UNIT.exec(_42)){
_43="resolution";
_44=parseInt(_42,10);
var _45=_42.substring((_44+"").length);
}else{
if(_38.ASPECT_RATIO.exec(_42)){
_43="aspect-ratio";
_44=_42.split("/");
}else{
if(_38.ABSOLUTE_VALUE){
_43="absolute";
_44=_42;
}else{
_43="unknown";
}
}
}
}
}
var _46,_47;
if("device-width"===_41.substring(l-12,l)){
_46=screen.width;
if(_42!==null){
if(_43==="length"){
return ((min&&_46>=_44)||(max&&_46<_44)||(!min&&!max&&_46===_44));
}else{
return false;
}
}else{
return _46>0;
}
}else{
if("device-height"===_41.substring(l-13,l)){
_47=screen.height;
if(_42!==null){
if(_43==="length"){
return ((min&&_47>=_44)||(max&&_47<_44)||(!min&&!max&&_47===_44));
}else{
return false;
}
}else{
return _47>0;
}
}else{
if("width"===_41.substring(l-5,l)){
_46=document.documentElement.clientWidth||document.body.clientWidth;
if(_42!==null){
if(_43==="length"){
return ((min&&_46>=_44)||(max&&_46<_44)||(!min&&!max&&_46===_44));
}else{
return false;
}
}else{
return _46>0;
}
}else{
if("height"===_41.substring(l-6,l)){
_47=document.documentElement.clientHeight||document.body.clientHeight;
if(_42!==null){
if(_43==="length"){
return ((min&&_47>=_44)||(max&&_47<_44)||(!min&&!max&&_47===_44));
}else{
return false;
}
}else{
return _47>0;
}
}else{
if("device-aspect-ratio"===_41.substring(l-19,l)){
return _43==="aspect-ratio"&&screen.width*_44[1]===screen.height*_44[0];
}else{
if("color-index"===_41.substring(l-11,l)){
var _48=Math.pow(2,screen.colorDepth);
if(_42!==null){
if(_43==="absolute"){
return ((min&&_48>=_44)||(max&&_48<_44)||(!min&&!max&&_48===_44));
}else{
return false;
}
}else{
return _48>0;
}
}else{
if("color"===_41.substring(l-5,l)){
var _49=screen.colorDepth;
if(_42!==null){
if(_43==="absolute"){
return ((min&&_49>=_44)||(max&&_49<_44)||(!min&&!max&&_49===_44));
}else{
return false;
}
}else{
return _49>0;
}
}else{
if("resolution"===_41.substring(l-10,l)){
var res;
if(_45==="dpcm"){
res=_3d("1cm");
}else{
res=_3d("1in");
}
if(_42!==null){
if(_43==="resolution"){
return ((min&&res>=_44)||(max&&res<_44)||(!min&&!max&&res===_44));
}else{
return false;
}
}else{
return res>0;
}
}else{
return false;
}
}
}
}
}
}
}
}
};
var _4a=function(mq){
var _4b=mq.getValid();
var _4c=mq.getExpressions();
var l=_4c.length;
if(l>0){
for(var i=0;i<l&&_4b;i++){
_4b=_40(_4c[i].mediaFeature,_4c[i].value);
}
var not=mq.getNot();
return (_4b&&!not||not&&!_4b);
}
};
var _4d=function(mql){
var mqs=mql.getMediaQueries();
var t={};
for(var i=0;i<mqs.length;i++){
if(_4a(mqs[i])){
t[mqs[i].getMediaType()]=true;
}
}
var s=[],c=0;
for(var n in t){
if(t.hasOwnProperty(n)){
if(c>0){
s[c++]=",";
}
s[c++]=n;
}
}
if(s.length>0){
_39[_39.length]=cssHelper.addStyle("@media "+s.join("")+"{"+mql.getCssText()+"}",false);
}
};
var _4e=function(_4f){
for(var i=0;i<_4f.length;i++){
_4d(_4f[i]);
}
if(ua.ie){
document.documentElement.style.display="block";
setTimeout(function(){
document.documentElement.style.display="";
},0);
setTimeout(function(){
cssHelper.broadcast("cssMediaQueriesTested");
},100);
}else{
cssHelper.broadcast("cssMediaQueriesTested");
}
};
var _50=function(){
for(var i=0;i<_39.length;i++){
cssHelper.removeStyle(_39[i]);
}
_39=[];
cssHelper.mediaQueryLists(_4e);
};
var _51=0;
var _52=function(){
var _53=cssHelper.getViewportWidth();
var _54=cssHelper.getViewportHeight();
if(ua.ie){
var el=document.createElement("div");
el.style.position="absolute";
el.style.top="-9999em";
el.style.overflow="scroll";
document.body.appendChild(el);
_51=el.offsetWidth-el.clientWidth;
document.body.removeChild(el);
}
var _55;
var _56=function(){
var vpw=cssHelper.getViewportWidth();
var vph=cssHelper.getViewportHeight();
if(Math.abs(vpw-_53)>_51||Math.abs(vph-_54)>_51){
_53=vpw;
_54=vph;
clearTimeout(_55);
_55=setTimeout(function(){
if(!_3a()){
_50();
}else{
cssHelper.broadcast("cssMediaQueriesTested");
}
},500);
}
};
window.onresize=function(){
var x=window.onresize||function(){
};
return function(){
x();
_56();
};
}();
};
var _57=document.documentElement;
_57.style.marginLeft="-32767px";
setTimeout(function(){
_57.style.marginTop="";
},20000);
return function(){
if(!_3a()){
cssHelper.addListener("newStyleParsed",function(el){
_4e(el.cssHelperParsed.mediaQueryLists);
});
cssHelper.addListener("cssMediaQueriesTested",function(){
if(ua.ie){
_57.style.width="1px";
}
setTimeout(function(){
_57.style.width="";
_57.style.marginLeft="";
},0);
cssHelper.removeListener("cssMediaQueriesTested",arguments.callee);
});
_3c();
_50();
}else{
_57.style.marginLeft="";
}
_52();
};
}());
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}


},{}],2:[function(require,module,exports){

    //<![CDATA[

    var tabLinks = new Array();
    var contentDivs = new Array();

    function init() {

      // Grab the tab links and content divs from the page
      var tabListItems = document.getElementById('modal_tabRow').childNodes;
      for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI" ) {
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
          var id = getHash( tabLink.getAttribute('href') );
          tabLinks[id] = tabLink;
          contentDivs[id] = document.getElementById( id );
        }
      }

      // Assign onclick events to the tab links, and
      // highlight the first tab
      var i = 0;

      for ( var id in tabLinks ) {
        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function() { this.blur() };
        if ( i == 0 ) tabLinks[id].className = 'selected';
        i++;
      }

      // Hide all content divs except the first
      var i = 0;

      for ( var id in contentDivs ) {
        if ( i != 0 ) contentDivs[id].className = ' hide';
        i++;
      }
    }

    function showTab() {
      var selectedId = getHash( this.getAttribute('href') );

      // Highlight the selected tab, and dim all others.
      // Also show the selected content div, and hide all others.
      for ( var id in contentDivs ) {
        if ( id == selectedId ) {
          tabLinks[id].className = 'selected';
          contentDivs[id].className = 'modal_tabContainer';
        } else {
          tabLinks[id].className = '';
          contentDivs[id].className = 'modal_tabContainer hide';
        }
      }

      // Stop the browser following the link
      return false;
    }

    function getFirstChildWithTagName( element, tagName ) {
      for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
      }
    }

    function getHash( url ) {
      var hashPos = url.lastIndexOf ( '#' );
      return url.substring( hashPos + 1 );
    }

    //]]>
  
},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaGF5YWJ1c2EvRGVza3RvcC9vYWEvZW1wdHlfb2FhL25vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaGF5YWJ1c2EvRGVza3RvcC9vYWEvZW1wdHlfb2FhL2Fzc2V0cy9qcy9jc3MzLW1lZGlhcXVlcmllcy5qcyIsIi9Vc2Vycy9oYXlhYnVzYS9EZXNrdG9wL29hYS9lbXB0eV9vYWEvYXNzZXRzL2pzL3RhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM3dCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpZih0eXBlb2YgT2JqZWN0LmNyZWF0ZSE9PVwiZnVuY3Rpb25cIil7XG5PYmplY3QuY3JlYXRlPWZ1bmN0aW9uKG8pe1xuZnVuY3Rpb24gRigpe1xufTtcbkYucHJvdG90eXBlPW87XG5yZXR1cm4gbmV3IEYoKTtcbn07XG59XG52YXIgdWE9e3RvU3RyaW5nOmZ1bmN0aW9uKCl7XG5yZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbn0sdGVzdDpmdW5jdGlvbihzKXtcbnJldHVybiB0aGlzLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHMudG9Mb3dlckNhc2UoKSk+LTE7XG59fTtcbnVhLnZlcnNpb249KHVhLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5tYXRjaCgvW1xcc1xcU10rKD86cnZ8aXR8cmF8aWUpW1xcLzogXShbXFxkLl0rKS8pfHxbXSlbMV07XG51YS53ZWJraXQ9dWEudGVzdChcIndlYmtpdFwiKTtcbnVhLmdlY2tvPXVhLnRlc3QoXCJnZWNrb1wiKSYmIXVhLndlYmtpdDtcbnVhLm9wZXJhPXVhLnRlc3QoXCJvcGVyYVwiKTtcbnVhLmllPXVhLnRlc3QoXCJtc2llXCIpJiYhdWEub3BlcmE7XG51YS5pZTY9dWEuaWUmJmRvY3VtZW50LmNvbXBhdE1vZGUmJnR5cGVvZiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0PT09XCJ1bmRlZmluZWRcIjtcbnVhLmllNz11YS5pZSYmZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50JiZ0eXBlb2YgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm1heEhlaWdodCE9PVwidW5kZWZpbmVkXCImJnR5cGVvZiBYRG9tYWluUmVxdWVzdD09PVwidW5kZWZpbmVkXCI7XG51YS5pZTg9dWEuaWUmJnR5cGVvZiBYRG9tYWluUmVxdWVzdCE9PVwidW5kZWZpbmVkXCI7XG52YXIgZG9tUmVhZHk9ZnVuY3Rpb24oKXtcbnZhciBfMT1bXTtcbnZhciBfMj1mdW5jdGlvbigpe1xuaWYoIWFyZ3VtZW50cy5jYWxsZWUuZG9uZSl7XG5hcmd1bWVudHMuY2FsbGVlLmRvbmU9dHJ1ZTtcbmZvcih2YXIgaT0wO2k8XzEubGVuZ3RoO2krKyl7XG5fMVtpXSgpO1xufVxufVxufTtcbmlmKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpe1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixfMixmYWxzZSk7XG59XG5pZih1YS5pZSl7XG4oZnVuY3Rpb24oKXtcbnRyeXtcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbChcImxlZnRcIik7XG59XG5jYXRjaChlKXtcbnNldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSw1MCk7XG5yZXR1cm47XG59XG5fMigpO1xufSkoKTtcbmRvY3VtZW50Lm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe1xuaWYoZG9jdW1lbnQucmVhZHlTdGF0ZT09PVwiY29tcGxldGVcIil7XG5kb2N1bWVudC5vbnJlYWR5c3RhdGVjaGFuZ2U9bnVsbDtcbl8yKCk7XG59XG59O1xufVxuaWYodWEud2Via2l0JiZkb2N1bWVudC5yZWFkeVN0YXRlKXtcbihmdW5jdGlvbigpe1xuaWYoZG9jdW1lbnQucmVhZHlTdGF0ZSE9PVwibG9hZGluZ1wiKXtcbl8yKCk7XG59ZWxzZXtcbnNldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwxMCk7XG59XG59KSgpO1xufVxud2luZG93Lm9ubG9hZD1fMjtcbnJldHVybiBmdW5jdGlvbihmbil7XG5pZih0eXBlb2YgZm49PT1cImZ1bmN0aW9uXCIpe1xuXzFbXzEubGVuZ3RoXT1mbjtcbn1cbnJldHVybiBmbjtcbn07XG59KCk7XG52YXIgY3NzSGVscGVyPWZ1bmN0aW9uKCl7XG52YXIgXzM9e0JMT0NLUzovW15cXHN7XVtee10qXFx7KD86W157fV0qXFx7W157fV0qXFx9W157fV0qfFtee31dKikqXFx9L2csQkxPQ0tTX0lOU0lERTovW15cXHN7XVtee10qXFx7W157fV0qXFx9L2csREVDTEFSQVRJT05TOi9bYS16QS1aXFwtXStbXjtdKjpbXjtdKzsvZyxSRUxBVElWRV9VUkxTOi91cmxcXChbJ1wiXT8oW15cXC9cXCknXCJdW146XFwpJ1wiXSspWydcIl0/XFwpL2csUkVEVU5EQU5UX0NPTVBPTkVOVFM6Lyg/OlxcL1xcKihbXipcXFxcXFxcXF18XFwqKD8hXFwvKSkrXFwqXFwvfEBpbXBvcnRbXjtdKzspL2csUkVEVU5EQU5UX1dISVRFU1BBQ0U6L1xccyooLHw6fDt8XFx7fFxcfSlcXHMqL2csTU9SRV9XSElURVNQQUNFOi9cXHN7Mix9L2csRklOQUxfU0VNSUNPTE9OUzovO1xcfS9nLE5PVF9XSElURVNQQUNFOi9cXFMrL2d9O1xudmFyIF80LF81PWZhbHNlO1xudmFyIF82PVtdO1xudmFyIF83PWZ1bmN0aW9uKGZuKXtcbmlmKHR5cGVvZiBmbj09PVwiZnVuY3Rpb25cIil7XG5fNltfNi5sZW5ndGhdPWZuO1xufVxufTtcbnZhciBfOD1mdW5jdGlvbigpe1xuZm9yKHZhciBpPTA7aTxfNi5sZW5ndGg7aSsrKXtcbl82W2ldKF80KTtcbn1cbn07XG52YXIgXzk9e307XG52YXIgX2E9ZnVuY3Rpb24obix2KXtcbmlmKF85W25dKXtcbnZhciBfYj1fOVtuXS5saXN0ZW5lcnM7XG5pZihfYil7XG5mb3IodmFyIGk9MDtpPF9iLmxlbmd0aDtpKyspe1xuX2JbaV0odik7XG59XG59XG59XG59O1xudmFyIF9jPWZ1bmN0aW9uKF9kLF9lLF9mKXtcbmlmKHVhLmllJiYhd2luZG93LlhNTEh0dHBSZXF1ZXN0KXtcbndpbmRvdy5YTUxIdHRwUmVxdWVzdD1mdW5jdGlvbigpe1xucmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XG59O1xufVxuaWYoIVhNTEh0dHBSZXF1ZXN0KXtcbnJldHVybiBcIlwiO1xufVxudmFyIHI9bmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG50cnl7XG5yLm9wZW4oXCJnZXRcIixfZCx0cnVlKTtcbnIuc2V0UmVxdWVzdEhlYWRlcihcIlhfUkVRVUVTVEVEX1dJVEhcIixcIlhNTEh0dHBSZXF1ZXN0XCIpO1xufVxuY2F0Y2goZSl7XG5fZigpO1xucmV0dXJuO1xufVxudmFyIF8xMD1mYWxzZTtcbnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbl8xMD10cnVlO1xufSw1MDAwKTtcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3I9XCJwcm9ncmVzc1wiO1xuci5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtcbmlmKHIucmVhZHlTdGF0ZT09PTQmJiFfMTApe1xuaWYoIXIuc3RhdHVzJiZsb2NhdGlvbi5wcm90b2NvbD09PVwiZmlsZTpcInx8KHIuc3RhdHVzPj0yMDAmJnIuc3RhdHVzPDMwMCl8fHIuc3RhdHVzPT09MzA0fHxuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJTYWZhcmlcIik+LTEmJnR5cGVvZiByLnN0YXR1cz09PVwidW5kZWZpbmVkXCIpe1xuX2Uoci5yZXNwb25zZVRleHQpO1xufWVsc2V7XG5fZigpO1xufVxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvcj1cIlwiO1xucj1udWxsO1xufVxufTtcbnIuc2VuZChcIlwiKTtcbn07XG52YXIgXzExPWZ1bmN0aW9uKF8xMil7XG5fMTI9XzEyLnJlcGxhY2UoXzMuUkVEVU5EQU5UX0NPTVBPTkVOVFMsXCJcIik7XG5fMTI9XzEyLnJlcGxhY2UoXzMuUkVEVU5EQU5UX1dISVRFU1BBQ0UsXCIkMVwiKTtcbl8xMj1fMTIucmVwbGFjZShfMy5NT1JFX1dISVRFU1BBQ0UsXCIgXCIpO1xuXzEyPV8xMi5yZXBsYWNlKF8zLkZJTkFMX1NFTUlDT0xPTlMsXCJ9XCIpO1xucmV0dXJuIF8xMjtcbn07XG52YXIgXzEzPXttZWRpYVF1ZXJ5TGlzdDpmdW5jdGlvbihzKXtcbnZhciBvPXt9O1xudmFyIGlkeD1zLmluZGV4T2YoXCJ7XCIpO1xudmFyIGx0PXMuc3Vic3RyaW5nKDAsaWR4KTtcbnM9cy5zdWJzdHJpbmcoaWR4KzEscy5sZW5ndGgtMSk7XG52YXIgbXFzPVtdLHJzPVtdO1xudmFyIHF0cz1sdC50b0xvd2VyQ2FzZSgpLnN1YnN0cmluZyg3KS5zcGxpdChcIixcIik7XG5mb3IodmFyIGk9MDtpPHF0cy5sZW5ndGg7aSsrKXtcbm1xc1ttcXMubGVuZ3RoXT1fMTMubWVkaWFRdWVyeShxdHNbaV0sbyk7XG59XG52YXIgcnRzPXMubWF0Y2goXzMuQkxPQ0tTX0lOU0lERSk7XG5pZihydHMhPT1udWxsKXtcbmZvcihpPTA7aTxydHMubGVuZ3RoO2krKyl7XG5yc1tycy5sZW5ndGhdPV8xMy5ydWxlKHJ0c1tpXSxvKTtcbn1cbn1cbm8uZ2V0TWVkaWFRdWVyaWVzPWZ1bmN0aW9uKCl7XG5yZXR1cm4gbXFzO1xufTtcbm8uZ2V0UnVsZXM9ZnVuY3Rpb24oKXtcbnJldHVybiBycztcbn07XG5vLmdldExpc3RUZXh0PWZ1bmN0aW9uKCl7XG5yZXR1cm4gbHQ7XG59O1xuby5nZXRDc3NUZXh0PWZ1bmN0aW9uKCl7XG5yZXR1cm4gcztcbn07XG5yZXR1cm4gbztcbn0sbWVkaWFRdWVyeTpmdW5jdGlvbihzLG1xbCl7XG5zPXN8fFwiXCI7XG52YXIgbm90PWZhbHNlLF8xNDtcbnZhciBleHA9W107XG52YXIgXzE1PXRydWU7XG52YXIgXzE2PXMubWF0Y2goXzMuTk9UX1dISVRFU1BBQ0UpO1xuZm9yKHZhciBpPTA7aTxfMTYubGVuZ3RoO2krKyl7XG52YXIgXzE3PV8xNltpXTtcbmlmKCFfMTQmJihfMTc9PT1cIm5vdFwifHxfMTc9PT1cIm9ubHlcIikpe1xuaWYoXzE3PT09XCJub3RcIil7XG5ub3Q9dHJ1ZTtcbn1cbn1lbHNle1xuaWYoIV8xNCl7XG5fMTQ9XzE3O1xufWVsc2V7XG5pZihfMTcuY2hhckF0KDApPT09XCIoXCIpe1xudmFyIF8xOD1fMTcuc3Vic3RyaW5nKDEsXzE3Lmxlbmd0aC0xKS5zcGxpdChcIjpcIik7XG5leHBbZXhwLmxlbmd0aF09e21lZGlhRmVhdHVyZTpfMThbMF0sdmFsdWU6XzE4WzFdfHxudWxsfTtcbn1cbn1cbn1cbn1cbnJldHVybiB7Z2V0TGlzdDpmdW5jdGlvbigpe1xucmV0dXJuIG1xbHx8bnVsbDtcbn0sZ2V0VmFsaWQ6ZnVuY3Rpb24oKXtcbnJldHVybiBfMTU7XG59LGdldE5vdDpmdW5jdGlvbigpe1xucmV0dXJuIG5vdDtcbn0sZ2V0TWVkaWFUeXBlOmZ1bmN0aW9uKCl7XG5yZXR1cm4gXzE0O1xufSxnZXRFeHByZXNzaW9uczpmdW5jdGlvbigpe1xucmV0dXJuIGV4cDtcbn19O1xufSxydWxlOmZ1bmN0aW9uKHMsbXFsKXtcbnZhciBvPXt9O1xudmFyIGlkeD1zLmluZGV4T2YoXCJ7XCIpO1xudmFyIHN0PXMuc3Vic3RyaW5nKDAsaWR4KTtcbnZhciBzcz1zdC5zcGxpdChcIixcIik7XG52YXIgZHM9W107XG52YXIgZHRzPXMuc3Vic3RyaW5nKGlkeCsxLHMubGVuZ3RoLTEpLnNwbGl0KFwiO1wiKTtcbmZvcih2YXIgaT0wO2k8ZHRzLmxlbmd0aDtpKyspe1xuZHNbZHMubGVuZ3RoXT1fMTMuZGVjbGFyYXRpb24oZHRzW2ldLG8pO1xufVxuby5nZXRNZWRpYVF1ZXJ5TGlzdD1mdW5jdGlvbigpe1xucmV0dXJuIG1xbHx8bnVsbDtcbn07XG5vLmdldFNlbGVjdG9ycz1mdW5jdGlvbigpe1xucmV0dXJuIHNzO1xufTtcbm8uZ2V0U2VsZWN0b3JUZXh0PWZ1bmN0aW9uKCl7XG5yZXR1cm4gc3Q7XG59O1xuby5nZXREZWNsYXJhdGlvbnM9ZnVuY3Rpb24oKXtcbnJldHVybiBkcztcbn07XG5vLmdldFByb3BlcnR5VmFsdWU9ZnVuY3Rpb24obil7XG5mb3IodmFyIGk9MDtpPGRzLmxlbmd0aDtpKyspe1xuaWYoZHNbaV0uZ2V0UHJvcGVydHkoKT09PW4pe1xucmV0dXJuIGRzW2ldLmdldFZhbHVlKCk7XG59XG59XG5yZXR1cm4gbnVsbDtcbn07XG5yZXR1cm4gbztcbn0sZGVjbGFyYXRpb246ZnVuY3Rpb24ocyxyKXtcbnZhciBpZHg9cy5pbmRleE9mKFwiOlwiKTtcbnZhciBwPXMuc3Vic3RyaW5nKDAsaWR4KTtcbnZhciB2PXMuc3Vic3RyaW5nKGlkeCsxKTtcbnJldHVybiB7Z2V0UnVsZTpmdW5jdGlvbigpe1xucmV0dXJuIHJ8fG51bGw7XG59LGdldFByb3BlcnR5OmZ1bmN0aW9uKCl7XG5yZXR1cm4gcDtcbn0sZ2V0VmFsdWU6ZnVuY3Rpb24oKXtcbnJldHVybiB2O1xufX07XG59fTtcbnZhciBfMTk9ZnVuY3Rpb24oZWwpe1xuaWYodHlwZW9mIGVsLmNzc0hlbHBlclRleHQhPT1cInN0cmluZ1wiKXtcbnJldHVybjtcbn1cbnZhciBvPXttZWRpYVF1ZXJ5TGlzdHM6W10scnVsZXM6W10sc2VsZWN0b3JzOnt9LGRlY2xhcmF0aW9uczpbXSxwcm9wZXJ0aWVzOnt9fTtcbnZhciBfMWE9by5tZWRpYVF1ZXJ5TGlzdHM7XG52YXIgb3JzPW8ucnVsZXM7XG52YXIgXzFiPWVsLmNzc0hlbHBlclRleHQubWF0Y2goXzMuQkxPQ0tTKTtcbmlmKF8xYiE9PW51bGwpe1xuZm9yKHZhciBpPTA7aTxfMWIubGVuZ3RoO2krKyl7XG5pZihfMWJbaV0uc3Vic3RyaW5nKDAsNyk9PT1cIkBtZWRpYSBcIil7XG5fMWFbXzFhLmxlbmd0aF09XzEzLm1lZGlhUXVlcnlMaXN0KF8xYltpXSk7XG5vcnM9by5ydWxlcz1vcnMuY29uY2F0KF8xYVtfMWEubGVuZ3RoLTFdLmdldFJ1bGVzKCkpO1xufWVsc2V7XG5vcnNbb3JzLmxlbmd0aF09XzEzLnJ1bGUoXzFiW2ldKTtcbn1cbn1cbn1cbnZhciBvc3M9by5zZWxlY3RvcnM7XG52YXIgXzFjPWZ1bmN0aW9uKHIpe1xudmFyIHNzPXIuZ2V0U2VsZWN0b3JzKCk7XG5mb3IodmFyIGk9MDtpPHNzLmxlbmd0aDtpKyspe1xudmFyIG49c3NbaV07XG5pZighb3NzW25dKXtcbm9zc1tuXT1bXTtcbn1cbm9zc1tuXVtvc3Nbbl0ubGVuZ3RoXT1yO1xufVxufTtcbmZvcihpPTA7aTxvcnMubGVuZ3RoO2krKyl7XG5fMWMob3JzW2ldKTtcbn1cbnZhciBvZHM9by5kZWNsYXJhdGlvbnM7XG5mb3IoaT0wO2k8b3JzLmxlbmd0aDtpKyspe1xub2RzPW8uZGVjbGFyYXRpb25zPW9kcy5jb25jYXQob3JzW2ldLmdldERlY2xhcmF0aW9ucygpKTtcbn1cbnZhciBvcHM9by5wcm9wZXJ0aWVzO1xuZm9yKGk9MDtpPG9kcy5sZW5ndGg7aSsrKXtcbnZhciBuPW9kc1tpXS5nZXRQcm9wZXJ0eSgpO1xuaWYoIW9wc1tuXSl7XG5vcHNbbl09W107XG59XG5vcHNbbl1bb3BzW25dLmxlbmd0aF09b2RzW2ldO1xufVxuZWwuY3NzSGVscGVyUGFyc2VkPW87XG5fNFtfNC5sZW5ndGhdPWVsO1xucmV0dXJuIG87XG59O1xudmFyIF8xZD1mdW5jdGlvbihlbCxzKXtcbmVsLmNzc0hlbHBlclRleHQ9XzExKHN8fGVsLmlubmVySFRNTCk7XG5yZXR1cm4gXzE5KGVsKTtcbn07XG52YXIgXzFlPWZ1bmN0aW9uKCl7XG5fNT10cnVlO1xuXzQ9W107XG52YXIgXzFmPVtdO1xudmFyIF8yMD1mdW5jdGlvbigpe1xuZm9yKHZhciBpPTA7aTxfMWYubGVuZ3RoO2krKyl7XG5fMTkoXzFmW2ldKTtcbn1cbnZhciBfMjE9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKTtcbmZvcihpPTA7aTxfMjEubGVuZ3RoO2krKyl7XG5fMWQoXzIxW2ldKTtcbn1cbl81PWZhbHNlO1xuXzgoKTtcbn07XG52YXIgXzIyPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcbmZvcih2YXIgaT0wO2k8XzIyLmxlbmd0aDtpKyspe1xudmFyIF8yMz1fMjJbaV07XG5pZihfMjMuZ2V0QXR0cmlidXRlKFwicmVsXCIpLmluZGV4T2YoXCJzdHlsZVwiKT4tMSYmXzIzLmhyZWYmJl8yMy5ocmVmLmxlbmd0aCE9PTAmJiFfMjMuZGlzYWJsZWQpe1xuXzFmW18xZi5sZW5ndGhdPV8yMztcbn1cbn1cbmlmKF8xZi5sZW5ndGg+MCl7XG52YXIgYz0wO1xudmFyIF8yND1mdW5jdGlvbigpe1xuYysrO1xuaWYoYz09PV8xZi5sZW5ndGgpe1xuXzIwKCk7XG59XG59O1xudmFyIF8yNT1mdW5jdGlvbihfMjYpe1xudmFyIF8yNz1fMjYuaHJlZjtcbl9jKF8yNyxmdW5jdGlvbihfMjgpe1xuXzI4PV8xMShfMjgpLnJlcGxhY2UoXzMuUkVMQVRJVkVfVVJMUyxcInVybChcIitfMjcuc3Vic3RyaW5nKDAsXzI3Lmxhc3RJbmRleE9mKFwiL1wiKSkrXCIvJDEpXCIpO1xuXzI2LmNzc0hlbHBlclRleHQ9XzI4O1xuXzI0KCk7XG59LF8yNCk7XG59O1xuZm9yKGk9MDtpPF8xZi5sZW5ndGg7aSsrKXtcbl8yNShfMWZbaV0pO1xufVxufWVsc2V7XG5fMjAoKTtcbn1cbn07XG52YXIgXzI5PXttZWRpYVF1ZXJ5TGlzdHM6XCJhcnJheVwiLHJ1bGVzOlwiYXJyYXlcIixzZWxlY3RvcnM6XCJvYmplY3RcIixkZWNsYXJhdGlvbnM6XCJhcnJheVwiLHByb3BlcnRpZXM6XCJvYmplY3RcIn07XG52YXIgXzJhPXttZWRpYVF1ZXJ5TGlzdHM6bnVsbCxydWxlczpudWxsLHNlbGVjdG9yczpudWxsLGRlY2xhcmF0aW9uczpudWxsLHByb3BlcnRpZXM6bnVsbH07XG52YXIgXzJiPWZ1bmN0aW9uKF8yYyx2KXtcbmlmKF8yYVtfMmNdIT09bnVsbCl7XG5pZihfMjlbXzJjXT09PVwiYXJyYXlcIil7XG5yZXR1cm4gKF8yYVtfMmNdPV8yYVtfMmNdLmNvbmNhdCh2KSk7XG59ZWxzZXtcbnZhciBjPV8yYVtfMmNdO1xuZm9yKHZhciBuIGluIHYpe1xuaWYodi5oYXNPd25Qcm9wZXJ0eShuKSl7XG5pZighY1tuXSl7XG5jW25dPXZbbl07XG59ZWxzZXtcbmNbbl09Y1tuXS5jb25jYXQodltuXSk7XG59XG59XG59XG5yZXR1cm4gYztcbn1cbn1cbn07XG52YXIgXzJkPWZ1bmN0aW9uKF8yZSl7XG5fMmFbXzJlXT0oXzI5W18yZV09PT1cImFycmF5XCIpP1tdOnt9O1xuZm9yKHZhciBpPTA7aTxfNC5sZW5ndGg7aSsrKXtcbl8yYihfMmUsXzRbaV0uY3NzSGVscGVyUGFyc2VkW18yZV0pO1xufVxucmV0dXJuIF8yYVtfMmVdO1xufTtcbmRvbVJlYWR5KGZ1bmN0aW9uKCl7XG52YXIgZWxzPWRvY3VtZW50LmJvZHkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpO1xuZm9yKHZhciBpPTA7aTxlbHMubGVuZ3RoO2krKyl7XG5lbHNbaV0uY2hlY2tlZEJ5Q3NzSGVscGVyPXRydWU7XG59XG5pZihkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKFwiTXV0YXRpb25FdmVudHNcIixcIjIuMFwiKXx8d2luZG93Lk11dGF0aW9uRXZlbnQpe1xuZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiRE9NTm9kZUluc2VydGVkXCIsZnVuY3Rpb24oZSl7XG52YXIgZWw9ZS50YXJnZXQ7XG5pZihlbC5ub2RlVHlwZT09PTEpe1xuX2EoXCJET01FbGVtZW50SW5zZXJ0ZWRcIixlbCk7XG5lbC5jaGVja2VkQnlDc3NIZWxwZXI9dHJ1ZTtcbn1cbn0sZmFsc2UpO1xufWVsc2V7XG5zZXRJbnRlcnZhbChmdW5jdGlvbigpe1xudmFyIGVscz1kb2N1bWVudC5ib2R5LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKTtcbmZvcih2YXIgaT0wO2k8ZWxzLmxlbmd0aDtpKyspe1xuaWYoIWVsc1tpXS5jaGVja2VkQnlDc3NIZWxwZXIpe1xuX2EoXCJET01FbGVtZW50SW5zZXJ0ZWRcIixlbHNbaV0pO1xuZWxzW2ldLmNoZWNrZWRCeUNzc0hlbHBlcj10cnVlO1xufVxufVxufSwxMDAwKTtcbn1cbn0pO1xudmFyIF8yZj1mdW5jdGlvbihkKXtcbmlmKHR5cGVvZiB3aW5kb3cuaW5uZXJXaWR0aCE9XCJ1bmRlZmluZWRcIil7XG5yZXR1cm4gd2luZG93W1wiaW5uZXJcIitkXTtcbn1lbHNle1xuaWYodHlwZW9mIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCE9XCJ1bmRlZmluZWRcIiYmdHlwZW9mIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCE9XCJ1bmRlZmluZWRcIiYmZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIT0wKXtcbnJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbXCJjbGllbnRcIitkXTtcbn1cbn1cbn07XG5yZXR1cm4ge2FkZFN0eWxlOmZ1bmN0aW9uKHMsXzMwKXtcbnZhciBlbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5lbC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJ0ZXh0L2Nzc1wiKTtcbmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChlbCk7XG5pZihlbC5zdHlsZVNoZWV0KXtcbmVsLnN0eWxlU2hlZXQuY3NzVGV4dD1zO1xufWVsc2V7XG5lbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKSk7XG59XG5lbC5hZGRlZFdpdGhDc3NIZWxwZXI9dHJ1ZTtcbmlmKHR5cGVvZiBfMzA9PT1cInVuZGVmaW5lZFwifHxfMzA9PT10cnVlKXtcbmNzc0hlbHBlci5wYXJzZWQoZnVuY3Rpb24oXzMxKXtcbnZhciBvPV8xZChlbCxzKTtcbmZvcih2YXIgbiBpbiBvKXtcbmlmKG8uaGFzT3duUHJvcGVydHkobikpe1xuXzJiKG4sb1tuXSk7XG59XG59XG5fYShcIm5ld1N0eWxlUGFyc2VkXCIsZWwpO1xufSk7XG59ZWxzZXtcbmVsLnBhcnNpbmdEaXNhbGxvd2VkPXRydWU7XG59XG5yZXR1cm4gZWw7XG59LHJlbW92ZVN0eWxlOmZ1bmN0aW9uKGVsKXtcbnJldHVybiBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbn0scGFyc2VkOmZ1bmN0aW9uKGZuKXtcbmlmKF81KXtcbl83KGZuKTtcbn1lbHNle1xuaWYodHlwZW9mIF80IT09XCJ1bmRlZmluZWRcIil7XG5pZih0eXBlb2YgZm49PT1cImZ1bmN0aW9uXCIpe1xuZm4oXzQpO1xufVxufWVsc2V7XG5fNyhmbik7XG5fMWUoKTtcbn1cbn1cbn0sbWVkaWFRdWVyeUxpc3RzOmZ1bmN0aW9uKGZuKXtcbmNzc0hlbHBlci5wYXJzZWQoZnVuY3Rpb24oXzMyKXtcbmZuKF8yYS5tZWRpYVF1ZXJ5TGlzdHN8fF8yZChcIm1lZGlhUXVlcnlMaXN0c1wiKSk7XG59KTtcbn0scnVsZXM6ZnVuY3Rpb24oZm4pe1xuY3NzSGVscGVyLnBhcnNlZChmdW5jdGlvbihfMzMpe1xuZm4oXzJhLnJ1bGVzfHxfMmQoXCJydWxlc1wiKSk7XG59KTtcbn0sc2VsZWN0b3JzOmZ1bmN0aW9uKGZuKXtcbmNzc0hlbHBlci5wYXJzZWQoZnVuY3Rpb24oXzM0KXtcbmZuKF8yYS5zZWxlY3RvcnN8fF8yZChcInNlbGVjdG9yc1wiKSk7XG59KTtcbn0sZGVjbGFyYXRpb25zOmZ1bmN0aW9uKGZuKXtcbmNzc0hlbHBlci5wYXJzZWQoZnVuY3Rpb24oXzM1KXtcbmZuKF8yYS5kZWNsYXJhdGlvbnN8fF8yZChcImRlY2xhcmF0aW9uc1wiKSk7XG59KTtcbn0scHJvcGVydGllczpmdW5jdGlvbihmbil7XG5jc3NIZWxwZXIucGFyc2VkKGZ1bmN0aW9uKF8zNil7XG5mbihfMmEucHJvcGVydGllc3x8XzJkKFwicHJvcGVydGllc1wiKSk7XG59KTtcbn0sYnJvYWRjYXN0Ol9hLGFkZExpc3RlbmVyOmZ1bmN0aW9uKG4sZm4pe1xuaWYodHlwZW9mIGZuPT09XCJmdW5jdGlvblwiKXtcbmlmKCFfOVtuXSl7XG5fOVtuXT17bGlzdGVuZXJzOltdfTtcbn1cbl85W25dLmxpc3RlbmVyc1tfOVtuXS5saXN0ZW5lcnMubGVuZ3RoXT1mbjtcbn1cbn0scmVtb3ZlTGlzdGVuZXI6ZnVuY3Rpb24obixmbil7XG5pZih0eXBlb2YgZm49PT1cImZ1bmN0aW9uXCImJl85W25dKXtcbnZhciBscz1fOVtuXS5saXN0ZW5lcnM7XG5mb3IodmFyIGk9MDtpPGxzLmxlbmd0aDtpKyspe1xuaWYobHNbaV09PT1mbil7XG5scy5zcGxpY2UoaSwxKTtcbmktPTE7XG59XG59XG59XG59LGdldFZpZXdwb3J0V2lkdGg6ZnVuY3Rpb24oKXtcbnJldHVybiBfMmYoXCJXaWR0aFwiKTtcbn0sZ2V0Vmlld3BvcnRIZWlnaHQ6ZnVuY3Rpb24oKXtcbnJldHVybiBfMmYoXCJIZWlnaHRcIik7XG59fTtcbn0oKTtcbmRvbVJlYWR5KGZ1bmN0aW9uIGVuYWJsZUNzc01lZGlhUXVlcmllcygpe1xudmFyIF8zNztcbnZhciBfMzg9e0xFTkdUSF9VTklUOi9bMC05XSsoZW18ZXh8cHh8aW58Y218bW18cHR8cGMpJC8sUkVTT0xVVElPTl9VTklUOi9bMC05XSsoZHBpfGRwY20pJC8sQVNQRUNUX1JBVElPOi9eWzAtOV0rXFwvWzAtOV0rJC8sQUJTT0xVVEVfVkFMVUU6L15bMC05XSooXFwuWzAtOV0rKSokL307XG52YXIgXzM5PVtdO1xudmFyIF8zYT1mdW5jdGlvbigpe1xudmFyIGlkPVwiY3NzMy1tZWRpYXF1ZXJpZXMtdGVzdFwiO1xudmFyIGVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5lbC5pZD1pZDtcbnZhciBfM2I9Y3NzSGVscGVyLmFkZFN0eWxlKFwiQG1lZGlhIGFsbCBhbmQgKHdpZHRoKSB7ICNcIitpZCtcIiB7IHdpZHRoOiAxcHggIWltcG9ydGFudDsgfSB9XCIsZmFsc2UpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG52YXIgcmV0PWVsLm9mZnNldFdpZHRoPT09MTtcbl8zYi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKF8zYik7XG5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbl8zYT1mdW5jdGlvbigpe1xucmV0dXJuIHJldDtcbn07XG5yZXR1cm4gcmV0O1xufTtcbnZhciBfM2M9ZnVuY3Rpb24oKXtcbl8zNz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXzM3LnN0eWxlLmNzc1RleHQ9XCJwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTk5OTllbTtsZWZ0Oi05OTk5ZW07XCIrXCJtYXJnaW46MDtib3JkZXI6bm9uZTtwYWRkaW5nOjA7d2lkdGg6MWVtO2ZvbnQtc2l6ZToxZW07XCI7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKF8zNyk7XG5pZihfMzcub2Zmc2V0V2lkdGghPT0xNil7XG5fMzcuc3R5bGUuZm9udFNpemU9MTYvXzM3Lm9mZnNldFdpZHRoK1wiZW1cIjtcbn1cbl8zNy5zdHlsZS53aWR0aD1cIlwiO1xufTtcbnZhciBfM2Q9ZnVuY3Rpb24oXzNlKXtcbl8zNy5zdHlsZS53aWR0aD1fM2U7XG52YXIgXzNmPV8zNy5vZmZzZXRXaWR0aDtcbl8zNy5zdHlsZS53aWR0aD1cIlwiO1xucmV0dXJuIF8zZjtcbn07XG52YXIgXzQwPWZ1bmN0aW9uKF80MSxfNDIpe1xudmFyIGw9XzQxLmxlbmd0aDtcbnZhciBtaW49KF80MS5zdWJzdHJpbmcoMCw0KT09PVwibWluLVwiKTtcbnZhciBtYXg9KCFtaW4mJl80MS5zdWJzdHJpbmcoMCw0KT09PVwibWF4LVwiKTtcbmlmKF80MiE9PW51bGwpe1xudmFyIF80MztcbnZhciBfNDQ7XG5pZihfMzguTEVOR1RIX1VOSVQuZXhlYyhfNDIpKXtcbl80Mz1cImxlbmd0aFwiO1xuXzQ0PV8zZChfNDIpO1xufWVsc2V7XG5pZihfMzguUkVTT0xVVElPTl9VTklULmV4ZWMoXzQyKSl7XG5fNDM9XCJyZXNvbHV0aW9uXCI7XG5fNDQ9cGFyc2VJbnQoXzQyLDEwKTtcbnZhciBfNDU9XzQyLnN1YnN0cmluZygoXzQ0K1wiXCIpLmxlbmd0aCk7XG59ZWxzZXtcbmlmKF8zOC5BU1BFQ1RfUkFUSU8uZXhlYyhfNDIpKXtcbl80Mz1cImFzcGVjdC1yYXRpb1wiO1xuXzQ0PV80Mi5zcGxpdChcIi9cIik7XG59ZWxzZXtcbmlmKF8zOC5BQlNPTFVURV9WQUxVRSl7XG5fNDM9XCJhYnNvbHV0ZVwiO1xuXzQ0PV80Mjtcbn1lbHNle1xuXzQzPVwidW5rbm93blwiO1xufVxufVxufVxufVxufVxudmFyIF80NixfNDc7XG5pZihcImRldmljZS13aWR0aFwiPT09XzQxLnN1YnN0cmluZyhsLTEyLGwpKXtcbl80Nj1zY3JlZW4ud2lkdGg7XG5pZihfNDIhPT1udWxsKXtcbmlmKF80Mz09PVwibGVuZ3RoXCIpe1xucmV0dXJuICgobWluJiZfNDY+PV80NCl8fChtYXgmJl80NjxfNDQpfHwoIW1pbiYmIW1heCYmXzQ2PT09XzQ0KSk7XG59ZWxzZXtcbnJldHVybiBmYWxzZTtcbn1cbn1lbHNle1xucmV0dXJuIF80Nj4wO1xufVxufWVsc2V7XG5pZihcImRldmljZS1oZWlnaHRcIj09PV80MS5zdWJzdHJpbmcobC0xMyxsKSl7XG5fNDc9c2NyZWVuLmhlaWdodDtcbmlmKF80MiE9PW51bGwpe1xuaWYoXzQzPT09XCJsZW5ndGhcIil7XG5yZXR1cm4gKChtaW4mJl80Nz49XzQ0KXx8KG1heCYmXzQ3PF80NCl8fCghbWluJiYhbWF4JiZfNDc9PT1fNDQpKTtcbn1lbHNle1xucmV0dXJuIGZhbHNlO1xufVxufWVsc2V7XG5yZXR1cm4gXzQ3PjA7XG59XG59ZWxzZXtcbmlmKFwid2lkdGhcIj09PV80MS5zdWJzdHJpbmcobC01LGwpKXtcbl80Nj1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGh8fGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG5pZihfNDIhPT1udWxsKXtcbmlmKF80Mz09PVwibGVuZ3RoXCIpe1xucmV0dXJuICgobWluJiZfNDY+PV80NCl8fChtYXgmJl80NjxfNDQpfHwoIW1pbiYmIW1heCYmXzQ2PT09XzQ0KSk7XG59ZWxzZXtcbnJldHVybiBmYWxzZTtcbn1cbn1lbHNle1xucmV0dXJuIF80Nj4wO1xufVxufWVsc2V7XG5pZihcImhlaWdodFwiPT09XzQxLnN1YnN0cmluZyhsLTYsbCkpe1xuXzQ3PWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHR8fGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xuaWYoXzQyIT09bnVsbCl7XG5pZihfNDM9PT1cImxlbmd0aFwiKXtcbnJldHVybiAoKG1pbiYmXzQ3Pj1fNDQpfHwobWF4JiZfNDc8XzQ0KXx8KCFtaW4mJiFtYXgmJl80Nz09PV80NCkpO1xufWVsc2V7XG5yZXR1cm4gZmFsc2U7XG59XG59ZWxzZXtcbnJldHVybiBfNDc+MDtcbn1cbn1lbHNle1xuaWYoXCJkZXZpY2UtYXNwZWN0LXJhdGlvXCI9PT1fNDEuc3Vic3RyaW5nKGwtMTksbCkpe1xucmV0dXJuIF80Mz09PVwiYXNwZWN0LXJhdGlvXCImJnNjcmVlbi53aWR0aCpfNDRbMV09PT1zY3JlZW4uaGVpZ2h0Kl80NFswXTtcbn1lbHNle1xuaWYoXCJjb2xvci1pbmRleFwiPT09XzQxLnN1YnN0cmluZyhsLTExLGwpKXtcbnZhciBfNDg9TWF0aC5wb3coMixzY3JlZW4uY29sb3JEZXB0aCk7XG5pZihfNDIhPT1udWxsKXtcbmlmKF80Mz09PVwiYWJzb2x1dGVcIil7XG5yZXR1cm4gKChtaW4mJl80OD49XzQ0KXx8KG1heCYmXzQ4PF80NCl8fCghbWluJiYhbWF4JiZfNDg9PT1fNDQpKTtcbn1lbHNle1xucmV0dXJuIGZhbHNlO1xufVxufWVsc2V7XG5yZXR1cm4gXzQ4PjA7XG59XG59ZWxzZXtcbmlmKFwiY29sb3JcIj09PV80MS5zdWJzdHJpbmcobC01LGwpKXtcbnZhciBfNDk9c2NyZWVuLmNvbG9yRGVwdGg7XG5pZihfNDIhPT1udWxsKXtcbmlmKF80Mz09PVwiYWJzb2x1dGVcIil7XG5yZXR1cm4gKChtaW4mJl80OT49XzQ0KXx8KG1heCYmXzQ5PF80NCl8fCghbWluJiYhbWF4JiZfNDk9PT1fNDQpKTtcbn1lbHNle1xucmV0dXJuIGZhbHNlO1xufVxufWVsc2V7XG5yZXR1cm4gXzQ5PjA7XG59XG59ZWxzZXtcbmlmKFwicmVzb2x1dGlvblwiPT09XzQxLnN1YnN0cmluZyhsLTEwLGwpKXtcbnZhciByZXM7XG5pZihfNDU9PT1cImRwY21cIil7XG5yZXM9XzNkKFwiMWNtXCIpO1xufWVsc2V7XG5yZXM9XzNkKFwiMWluXCIpO1xufVxuaWYoXzQyIT09bnVsbCl7XG5pZihfNDM9PT1cInJlc29sdXRpb25cIil7XG5yZXR1cm4gKChtaW4mJnJlcz49XzQ0KXx8KG1heCYmcmVzPF80NCl8fCghbWluJiYhbWF4JiZyZXM9PT1fNDQpKTtcbn1lbHNle1xucmV0dXJuIGZhbHNlO1xufVxufWVsc2V7XG5yZXR1cm4gcmVzPjA7XG59XG59ZWxzZXtcbnJldHVybiBmYWxzZTtcbn1cbn1cbn1cbn1cbn1cbn1cbn1cbn1cbn07XG52YXIgXzRhPWZ1bmN0aW9uKG1xKXtcbnZhciBfNGI9bXEuZ2V0VmFsaWQoKTtcbnZhciBfNGM9bXEuZ2V0RXhwcmVzc2lvbnMoKTtcbnZhciBsPV80Yy5sZW5ndGg7XG5pZihsPjApe1xuZm9yKHZhciBpPTA7aTxsJiZfNGI7aSsrKXtcbl80Yj1fNDAoXzRjW2ldLm1lZGlhRmVhdHVyZSxfNGNbaV0udmFsdWUpO1xufVxudmFyIG5vdD1tcS5nZXROb3QoKTtcbnJldHVybiAoXzRiJiYhbm90fHxub3QmJiFfNGIpO1xufVxufTtcbnZhciBfNGQ9ZnVuY3Rpb24obXFsKXtcbnZhciBtcXM9bXFsLmdldE1lZGlhUXVlcmllcygpO1xudmFyIHQ9e307XG5mb3IodmFyIGk9MDtpPG1xcy5sZW5ndGg7aSsrKXtcbmlmKF80YShtcXNbaV0pKXtcbnRbbXFzW2ldLmdldE1lZGlhVHlwZSgpXT10cnVlO1xufVxufVxudmFyIHM9W10sYz0wO1xuZm9yKHZhciBuIGluIHQpe1xuaWYodC5oYXNPd25Qcm9wZXJ0eShuKSl7XG5pZihjPjApe1xuc1tjKytdPVwiLFwiO1xufVxuc1tjKytdPW47XG59XG59XG5pZihzLmxlbmd0aD4wKXtcbl8zOVtfMzkubGVuZ3RoXT1jc3NIZWxwZXIuYWRkU3R5bGUoXCJAbWVkaWEgXCIrcy5qb2luKFwiXCIpK1wie1wiK21xbC5nZXRDc3NUZXh0KCkrXCJ9XCIsZmFsc2UpO1xufVxufTtcbnZhciBfNGU9ZnVuY3Rpb24oXzRmKXtcbmZvcih2YXIgaT0wO2k8XzRmLmxlbmd0aDtpKyspe1xuXzRkKF80ZltpXSk7XG59XG5pZih1YS5pZSl7XG5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuZGlzcGxheT1cImJsb2NrXCI7XG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuZGlzcGxheT1cIlwiO1xufSwwKTtcbnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbmNzc0hlbHBlci5icm9hZGNhc3QoXCJjc3NNZWRpYVF1ZXJpZXNUZXN0ZWRcIik7XG59LDEwMCk7XG59ZWxzZXtcbmNzc0hlbHBlci5icm9hZGNhc3QoXCJjc3NNZWRpYVF1ZXJpZXNUZXN0ZWRcIik7XG59XG59O1xudmFyIF81MD1mdW5jdGlvbigpe1xuZm9yKHZhciBpPTA7aTxfMzkubGVuZ3RoO2krKyl7XG5jc3NIZWxwZXIucmVtb3ZlU3R5bGUoXzM5W2ldKTtcbn1cbl8zOT1bXTtcbmNzc0hlbHBlci5tZWRpYVF1ZXJ5TGlzdHMoXzRlKTtcbn07XG52YXIgXzUxPTA7XG52YXIgXzUyPWZ1bmN0aW9uKCl7XG52YXIgXzUzPWNzc0hlbHBlci5nZXRWaWV3cG9ydFdpZHRoKCk7XG52YXIgXzU0PWNzc0hlbHBlci5nZXRWaWV3cG9ydEhlaWdodCgpO1xuaWYodWEuaWUpe1xudmFyIGVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5lbC5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCI7XG5lbC5zdHlsZS50b3A9XCItOTk5OWVtXCI7XG5lbC5zdHlsZS5vdmVyZmxvdz1cInNjcm9sbFwiO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG5fNTE9ZWwub2Zmc2V0V2lkdGgtZWwuY2xpZW50V2lkdGg7XG5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsKTtcbn1cbnZhciBfNTU7XG52YXIgXzU2PWZ1bmN0aW9uKCl7XG52YXIgdnB3PWNzc0hlbHBlci5nZXRWaWV3cG9ydFdpZHRoKCk7XG52YXIgdnBoPWNzc0hlbHBlci5nZXRWaWV3cG9ydEhlaWdodCgpO1xuaWYoTWF0aC5hYnModnB3LV81Myk+XzUxfHxNYXRoLmFicyh2cGgtXzU0KT5fNTEpe1xuXzUzPXZwdztcbl81ND12cGg7XG5jbGVhclRpbWVvdXQoXzU1KTtcbl81NT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5pZighXzNhKCkpe1xuXzUwKCk7XG59ZWxzZXtcbmNzc0hlbHBlci5icm9hZGNhc3QoXCJjc3NNZWRpYVF1ZXJpZXNUZXN0ZWRcIik7XG59XG59LDUwMCk7XG59XG59O1xud2luZG93Lm9ucmVzaXplPWZ1bmN0aW9uKCl7XG52YXIgeD13aW5kb3cub25yZXNpemV8fGZ1bmN0aW9uKCl7XG59O1xucmV0dXJuIGZ1bmN0aW9uKCl7XG54KCk7XG5fNTYoKTtcbn07XG59KCk7XG59O1xudmFyIF81Nz1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5fNTcuc3R5bGUubWFyZ2luTGVmdD1cIi0zMjc2N3B4XCI7XG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5fNTcuc3R5bGUubWFyZ2luVG9wPVwiXCI7XG59LDIwMDAwKTtcbnJldHVybiBmdW5jdGlvbigpe1xuaWYoIV8zYSgpKXtcbmNzc0hlbHBlci5hZGRMaXN0ZW5lcihcIm5ld1N0eWxlUGFyc2VkXCIsZnVuY3Rpb24oZWwpe1xuXzRlKGVsLmNzc0hlbHBlclBhcnNlZC5tZWRpYVF1ZXJ5TGlzdHMpO1xufSk7XG5jc3NIZWxwZXIuYWRkTGlzdGVuZXIoXCJjc3NNZWRpYVF1ZXJpZXNUZXN0ZWRcIixmdW5jdGlvbigpe1xuaWYodWEuaWUpe1xuXzU3LnN0eWxlLndpZHRoPVwiMXB4XCI7XG59XG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5fNTcuc3R5bGUud2lkdGg9XCJcIjtcbl81Ny5zdHlsZS5tYXJnaW5MZWZ0PVwiXCI7XG59LDApO1xuY3NzSGVscGVyLnJlbW92ZUxpc3RlbmVyKFwiY3NzTWVkaWFRdWVyaWVzVGVzdGVkXCIsYXJndW1lbnRzLmNhbGxlZSk7XG59KTtcbl8zYygpO1xuXzUwKCk7XG59ZWxzZXtcbl81Ny5zdHlsZS5tYXJnaW5MZWZ0PVwiXCI7XG59XG5fNTIoKTtcbn07XG59KCkpO1xudHJ5e1xuZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJCYWNrZ3JvdW5kSW1hZ2VDYWNoZVwiLGZhbHNlLHRydWUpO1xufVxuY2F0Y2goZSl7XG59XG5cbiIsIlxuICAgIC8vPCFbQ0RBVEFbXG5cbiAgICB2YXIgdGFiTGlua3MgPSBuZXcgQXJyYXkoKTtcbiAgICB2YXIgY29udGVudERpdnMgPSBuZXcgQXJyYXkoKTtcblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgICAgIC8vIEdyYWIgdGhlIHRhYiBsaW5rcyBhbmQgY29udGVudCBkaXZzIGZyb20gdGhlIHBhZ2VcbiAgICAgIHZhciB0YWJMaXN0SXRlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxfdGFiUm93JykuY2hpbGROb2RlcztcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHRhYkxpc3RJdGVtcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgaWYgKCB0YWJMaXN0SXRlbXNbaV0ubm9kZU5hbWUgPT0gXCJMSVwiICkge1xuICAgICAgICAgIHZhciB0YWJMaW5rID0gZ2V0Rmlyc3RDaGlsZFdpdGhUYWdOYW1lKCB0YWJMaXN0SXRlbXNbaV0sICdBJyApO1xuICAgICAgICAgIHZhciBpZCA9IGdldEhhc2goIHRhYkxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJykgKTtcbiAgICAgICAgICB0YWJMaW5rc1tpZF0gPSB0YWJMaW5rO1xuICAgICAgICAgIGNvbnRlbnREaXZzW2lkXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFzc2lnbiBvbmNsaWNrIGV2ZW50cyB0byB0aGUgdGFiIGxpbmtzLCBhbmRcbiAgICAgIC8vIGhpZ2hsaWdodCB0aGUgZmlyc3QgdGFiXG4gICAgICB2YXIgaSA9IDA7XG5cbiAgICAgIGZvciAoIHZhciBpZCBpbiB0YWJMaW5rcyApIHtcbiAgICAgICAgdGFiTGlua3NbaWRdLm9uY2xpY2sgPSBzaG93VGFiO1xuICAgICAgICB0YWJMaW5rc1tpZF0ub25mb2N1cyA9IGZ1bmN0aW9uKCkgeyB0aGlzLmJsdXIoKSB9O1xuICAgICAgICBpZiAoIGkgPT0gMCApIHRhYkxpbmtzW2lkXS5jbGFzc05hbWUgPSAnc2VsZWN0ZWQnO1xuICAgICAgICBpKys7XG4gICAgICB9XG5cbiAgICAgIC8vIEhpZGUgYWxsIGNvbnRlbnQgZGl2cyBleGNlcHQgdGhlIGZpcnN0XG4gICAgICB2YXIgaSA9IDA7XG5cbiAgICAgIGZvciAoIHZhciBpZCBpbiBjb250ZW50RGl2cyApIHtcbiAgICAgICAgaWYgKCBpICE9IDAgKSBjb250ZW50RGl2c1tpZF0uY2xhc3NOYW1lID0gJyBoaWRlJztcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dUYWIoKSB7XG4gICAgICB2YXIgc2VsZWN0ZWRJZCA9IGdldEhhc2goIHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykgKTtcblxuICAgICAgLy8gSGlnaGxpZ2h0IHRoZSBzZWxlY3RlZCB0YWIsIGFuZCBkaW0gYWxsIG90aGVycy5cbiAgICAgIC8vIEFsc28gc2hvdyB0aGUgc2VsZWN0ZWQgY29udGVudCBkaXYsIGFuZCBoaWRlIGFsbCBvdGhlcnMuXG4gICAgICBmb3IgKCB2YXIgaWQgaW4gY29udGVudERpdnMgKSB7XG4gICAgICAgIGlmICggaWQgPT0gc2VsZWN0ZWRJZCApIHtcbiAgICAgICAgICB0YWJMaW5rc1tpZF0uY2xhc3NOYW1lID0gJ3NlbGVjdGVkJztcbiAgICAgICAgICBjb250ZW50RGl2c1tpZF0uY2xhc3NOYW1lID0gJ21vZGFsX3RhYkNvbnRhaW5lcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFiTGlua3NbaWRdLmNsYXNzTmFtZSA9ICcnO1xuICAgICAgICAgIGNvbnRlbnREaXZzW2lkXS5jbGFzc05hbWUgPSAnbW9kYWxfdGFiQ29udGFpbmVyIGhpZGUnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFN0b3AgdGhlIGJyb3dzZXIgZm9sbG93aW5nIHRoZSBsaW5rXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Rmlyc3RDaGlsZFdpdGhUYWdOYW1lKCBlbGVtZW50LCB0YWdOYW1lICkge1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiAoIGVsZW1lbnQuY2hpbGROb2Rlc1tpXS5ub2RlTmFtZSA9PSB0YWdOYW1lICkgcmV0dXJuIGVsZW1lbnQuY2hpbGROb2Rlc1tpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIYXNoKCB1cmwgKSB7XG4gICAgICB2YXIgaGFzaFBvcyA9IHVybC5sYXN0SW5kZXhPZiAoICcjJyApO1xuICAgICAgcmV0dXJuIHVybC5zdWJzdHJpbmcoIGhhc2hQb3MgKyAxICk7XG4gICAgfVxuXG4gICAgLy9dXT5cbiAgIl19
