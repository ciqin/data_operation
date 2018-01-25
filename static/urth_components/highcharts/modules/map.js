/*
 Highmaps JS v5.0.14 (2017-07-28)
 Highmaps as a plugin for Highcharts 4.1.x or Highstock 2.1.x (x being the patch version of this file)

 (c) 2011-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(w){"object"===typeof module&&module.exports?module.exports=w:w(Highcharts)})(function(w){(function(a){var h=a.Axis,p=a.each,f=a.pick;a=a.wrap;a(h.prototype,"getSeriesExtremes",function(a){var e=this.isXAxis,x,t,u=[],l;e&&p(this.series,function(a,b){a.useMapGeometry&&(u[b]=a.xData,a.xData=[])});a.call(this);e&&(x=f(this.dataMin,Number.MAX_VALUE),t=f(this.dataMax,-Number.MAX_VALUE),p(this.series,function(a,b){a.useMapGeometry&&(x=Math.min(x,f(a.minX,x)),t=Math.max(t,f(a.maxX,t)),a.xData=u[b],
l=!0)}),l&&(this.dataMin=x,this.dataMax=t))});a(h.prototype,"setAxisTranslation",function(a){var q=this.chart,e=q.plotWidth/q.plotHeight,q=q.xAxis[0],f;a.call(this);"yAxis"===this.coll&&void 0!==q.transA&&p(this.series,function(a){a.preserveAspectRatio&&(f=!0)});if(f&&(this.transA=q.transA=Math.min(this.transA,q.transA),a=e/((q.max-q.min)/(this.max-this.min)),a=1>a?this:q,e=(a.max-a.min)*a.transA,a.pixelPadding=a.len-e,a.minPixelPadding=a.pixelPadding/2,e=a.fixTo)){e=e[1]-a.toValue(e[0],!0);e*=a.transA;
if(Math.abs(e)>a.minPixelPadding||a.min===a.dataMin&&a.max===a.dataMax)e=0;a.minPixelPadding-=e}});a(h.prototype,"render",function(a){a.call(this);this.fixTo=null})})(w);(function(a){var h=a.Axis,p=a.Chart,f=a.color,e,q=a.each,x=a.extend,t=a.isNumber,u=a.Legend,l=a.LegendSymbolMixin,c=a.noop,b=a.merge,m=a.pick,r=a.wrap;e=a.ColorAxis=function(){this.init.apply(this,arguments)};x(e.prototype,h.prototype);x(e.prototype,{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,
startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(h.prototype.keepProps),init:function(a,k){var d="vertical"!==a.options.legend.layout,g;this.coll="colorAxis";g=b(this.defaultColorAxisOptions,{side:d?2:1,reversed:!d},k,{opposite:!d,showEmpty:!1,title:null});
h.prototype.init.call(this,a,g);k.dataClasses&&this.initDataClasses(k);this.initStops();this.horiz=d;this.zoomEnabled=!1;this.defaultLegendLength=200},initDataClasses:function(a){var g=this.chart,d,n=0,v=g.options.chart.colorCount,c=this.options,m=a.dataClasses.length;this.dataClasses=d=[];this.legendItems=[];q(a.dataClasses,function(a,k){a=b(a);d.push(a);a.color||("category"===c.dataClassColor?(k=g.options.colors,v=k.length,a.color=k[n],a.colorIndex=n,n++,n===v&&(n=0)):a.color=f(c.minColor).tweenTo(f(c.maxColor),
2>m?.5:k/(m-1)))})},setTickPositions:function(){if(!this.dataClasses)return h.prototype.setTickPositions.call(this)},initStops:function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];q(this.stops,function(a){a.color=f(a[1])})},setOptions:function(a){h.prototype.setOptions.call(this,a);this.options.crosshair=this.options.marker},setAxisSize:function(){var a=this.legendSymbol,k=this.chart,d=k.options.legend||{},n,b;a?(this.left=d=a.attr("x"),this.top=n=a.attr("y"),
this.width=b=a.attr("width"),this.height=a=a.attr("height"),this.right=k.chartWidth-d-b,this.bottom=k.chartHeight-n-a,this.len=this.horiz?b:a,this.pos=this.horiz?d:n):this.len=(this.horiz?d.symbolWidth:d.symbolHeight)||this.defaultLegendLength},normalizedValue:function(a){this.isLog&&(a=this.val2lin(a));return 1-(this.max-a)/(this.max-this.min||1)},toColor:function(a,k){var d=this.stops,n,g,b=this.dataClasses,c,m;if(b)for(m=b.length;m--;){if(c=b[m],n=c.from,d=c.to,(void 0===n||a>=n)&&(void 0===d||
a<=d)){g=c.color;k&&(k.dataClass=m,k.colorIndex=c.colorIndex);break}}else{a=this.normalizedValue(a);for(m=d.length;m--&&!(a>d[m][0]););n=d[m]||d[m+1];d=d[m+1]||n;a=1-(d[0]-a)/(d[0]-n[0]||1);g=n.color.tweenTo(d.color,a)}return g},getOffset:function(){var a=this.legendGroup,b=this.chart.axisOffset[this.side];a&&(this.axisParent=a,h.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=b)},setLegendColor:function(){var a,
b=this.reversed;a=b?1:0;b=b?0:1;a=this.horiz?[a,0,b,0]:[0,b,0,a];this.legendColor={linearGradient:{x1:a[0],y1:a[1],x2:a[2],y2:a[3]},stops:this.stops}},drawLegendSymbol:function(a,b){var d=a.padding,n=a.options,g=this.horiz,k=m(n.symbolWidth,g?this.defaultLegendLength:12),c=m(n.symbolHeight,g?12:this.defaultLegendLength),l=m(n.labelPadding,g?16:30),n=m(n.itemDistance,10);this.setLegendColor();b.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,k,c).attr({zIndex:1}).add(b.legendGroup);this.legendItemWidth=
k+d+(g?n:l);this.legendItemHeight=c+d+(g?l:0)},setState:c,visible:!0,setVisible:c,getSeriesExtremes:function(){var a=this.series,b=a.length;this.dataMin=Infinity;for(this.dataMax=-Infinity;b--;)void 0!==a[b].valueMin&&(this.dataMin=Math.min(this.dataMin,a[b].valueMin),this.dataMax=Math.max(this.dataMax,a[b].valueMax))},drawCrosshair:function(a,b){var d=b&&b.plotX,n=b&&b.plotY,g,c=this.pos,k=this.len;b&&(g=this.toPixels(b[b.series.colorKey]),g<c?g=c-2:g>c+k&&(g=c+k+2),b.plotX=g,b.plotY=this.len-g,
h.prototype.drawCrosshair.call(this,a,b),b.plotX=d,b.plotY=n,this.cross&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.attr({fill:this.crosshair.color})))},getPlotLinePath:function(a,b,d,n,c){return t(c)?this.horiz?["M",c-4,this.top-6,"L",c+4,this.top-6,c,this.top,"Z"]:["M",this.left,c,"L",this.left-6,c+6,this.left-6,c-6,"Z"]:h.prototype.getPlotLinePath.call(this,a,b,d,n)},update:function(a,c){var d=this.chart,n=d.legend;q(this.series,function(a){a.isDirtyData=
!0});a.dataClasses&&n.allItems&&(q(n.allItems,function(a){a.isDataClass&&a.legendGroup&&a.legendGroup.destroy()}),d.isDirtyLegend=!0);d.options[this.coll]=b(this.userOptions,a);h.prototype.update.call(this,a,c);this.legendItem&&(this.setLegendColor(),n.colorizeItem(this,!0))},remove:function(){this.legendItem&&this.chart.legend.destroyItem(this);h.prototype.remove.call(this)},getDataClassLegendSymbols:function(){var b=this,k=this.chart,d=this.legendItems,n=k.options.legend,m=n.valueDecimals,r=n.valueSuffix||
"",e;d.length||q(this.dataClasses,function(n,g){var v=!0,y=n.from,f=n.to;e="";void 0===y?e="\x3c ":void 0===f&&(e="\x3e ");void 0!==y&&(e+=a.numberFormat(y,m)+r);void 0!==y&&void 0!==f&&(e+=" - ");void 0!==f&&(e+=a.numberFormat(f,m)+r);d.push(x({chart:k,name:e,options:{},drawLegendSymbol:l.drawRectangle,visible:!0,setState:c,isDataClass:!0,setVisible:function(){v=this.visible=!v;q(b.series,function(a){q(a.points,function(a){a.dataClass===g&&a.setVisible(v)})});k.legend.colorizeItem(this,v)}},n))});
return d},name:""});q(["fill","stroke"],function(b){a.Fx.prototype[b+"Setter"]=function(){this.elem.attr(b,f(this.start).tweenTo(f(this.end),this.pos),null,!0)}});r(p.prototype,"getAxes",function(a){var b=this.options.colorAxis;a.call(this);this.colorAxis=[];b&&new e(this,b)});r(u.prototype,"getAllItems",function(a){var b=[],d=this.chart.colorAxis[0];d&&d.options&&(d.options.showInLegend&&(d.options.dataClasses?b=b.concat(d.getDataClassLegendSymbols()):b.push(d)),q(d.series,function(a){a.options.showInLegend=
!1}));return b.concat(a.call(this))});r(u.prototype,"colorizeItem",function(a,b,d){a.call(this,b,d);d&&b.legendColor&&b.legendSymbol.attr({fill:b.legendColor})});r(u.prototype,"update",function(a){a.apply(this,[].slice.call(arguments,1));this.chart.colorAxis[0]&&this.chart.colorAxis[0].update({},arguments[2])})})(w);(function(a){var h=a.defined,p=a.each,f=a.noop,e=a.seriesTypes;a.colorPointMixin={isValid:function(){return null!==this.value},setVisible:function(a){var e=this,q=a?"show":"hide";p(["graphic",
"dataLabel"],function(a){if(e[a])e[a][q]()})},setState:function(e){a.Point.prototype.setState.call(this,e);this.graphic&&this.graphic.attr({zIndex:"hover"===e?1:0})}};a.colorSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:f,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:e.column.prototype.pointAttribs,translateColors:function(){var a=this,e=this.options.nullColor,
f=this.colorAxis,h=this.colorKey;p(this.data,function(l){var c=l[h];if(c=l.options.color||(l.isNull?e:f&&void 0!==c?f.toColor(c,l):l.color||a.color))l.color=c})},colorAttribs:function(a){var e={};h(a.color)&&(e[this.colorProp||"fill"]=a.color);return e}}})(w);(function(a){function h(a){a&&(a.preventDefault&&a.preventDefault(),a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)}function p(a){this.init(a)}var f=a.addEvent,e=a.Chart,q=a.doc,x=a.each,t=a.extend,u=a.merge,l=a.pick,c=a.wrap;p.prototype.init=
function(a){this.chart=a;a.mapNavButtons=[]};p.prototype.update=function(b){var c=this.chart,e=c.options.mapNavigation,g,k,d,n,v,q=function(a){this.handler.call(c,a);h(a)},y=c.mapNavButtons;b&&(e=c.options.mapNavigation=u(c.options.mapNavigation,b));for(;y.length;)y.pop().destroy();l(e.enableButtons,e.enabled)&&!c.renderer.forExport&&a.objectEach(e.buttons,function(a,b){g=u(e.buttonOptions,a);k=g.theme;k.style=u(g.theme.style,g.style);n=(d=k.states)&&d.hover;v=d&&d.select;a=c.renderer.button(g.text,
0,0,q,k,n,v,0,"zoomIn"===b?"topbutton":"bottombutton").addClass("highcharts-map-navigation").attr({width:g.width,height:g.height,title:c.options.lang[b],padding:g.padding,zIndex:5}).add();a.handler=g.onclick;a.align(t(g,{width:a.width,height:2*a.height}),null,g.alignTo);f(a.element,"dblclick",h);y.push(a)});this.updateEvents(e)};p.prototype.updateEvents=function(a){var b=this.chart;l(a.enableDoubleClickZoom,a.enabled)||a.enableDoubleClickZoomTo?this.unbindDblClick=this.unbindDblClick||f(b.container,
"dblclick",function(a){b.pointer.onContainerDblClick(a)}):this.unbindDblClick&&(this.unbindDblClick=this.unbindDblClick());l(a.enableMouseWheelZoom,a.enabled)?this.unbindMouseWheel=this.unbindMouseWheel||f(b.container,void 0===q.onmousewheel?"DOMMouseScroll":"mousewheel",function(a){b.pointer.onContainerMouseWheel(a);h(a);return!1}):this.unbindMouseWheel&&(this.unbindMouseWheel=this.unbindMouseWheel())};t(e.prototype,{fitToBox:function(a,c){x([["x","width"],["y","height"]],function(b){var g=b[0];
b=b[1];a[g]+a[b]>c[g]+c[b]&&(a[b]>c[b]?(a[b]=c[b],a[g]=c[g]):a[g]=c[g]+c[b]-a[b]);a[b]>c[b]&&(a[b]=c[b]);a[g]<c[g]&&(a[g]=c[g])});return a},mapZoom:function(a,c,e,g,k){var d=this.xAxis[0],b=d.max-d.min,v=l(c,d.min+b/2),m=b*a,b=this.yAxis[0],q=b.max-b.min,f=l(e,b.min+q/2),q=q*a,v=this.fitToBox({x:v-m*(g?(g-d.pos)/d.len:.5),y:f-q*(k?(k-b.pos)/b.len:.5),width:m,height:q},{x:d.dataMin,y:b.dataMin,width:d.dataMax-d.dataMin,height:b.dataMax-b.dataMin}),m=v.x<=d.dataMin&&v.width>=d.dataMax-d.dataMin&&v.y<=
b.dataMin&&v.height>=b.dataMax-b.dataMin;g&&(d.fixTo=[g-d.pos,c]);k&&(b.fixTo=[k-b.pos,e]);void 0===a||m?(d.setExtremes(void 0,void 0,!1),b.setExtremes(void 0,void 0,!1)):(d.setExtremes(v.x,v.x+v.width,!1),b.setExtremes(v.y,v.y+v.height,!1));this.redraw()}});c(e.prototype,"render",function(a){this.mapNavigation=new p(this);this.mapNavigation.update();a.call(this)})})(w);(function(a){var h=a.extend,p=a.pick,f=a.Pointer;a=a.wrap;h(f.prototype,{onContainerDblClick:function(a){var e=this.chart;a=this.normalize(a);
e.options.mapNavigation.enableDoubleClickZoomTo?e.pointer.inClass(a.target,"highcharts-tracker")&&e.hoverPoint&&e.hoverPoint.zoomTo():e.isInsidePlot(a.chartX-e.plotLeft,a.chartY-e.plotTop)&&e.mapZoom(.5,e.xAxis[0].toValue(a.chartX),e.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)},onContainerMouseWheel:function(a){var e=this.chart,f;a=this.normalize(a);f=a.detail||-(a.wheelDelta/120);e.isInsidePlot(a.chartX-e.plotLeft,a.chartY-e.plotTop)&&e.mapZoom(Math.pow(e.options.mapNavigation.mouseWheelSensitivity,
f),e.xAxis[0].toValue(a.chartX),e.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)}});a(f.prototype,"zoomOption",function(a){var e=this.chart.options.mapNavigation;p(e.enableTouchZoom,e.enabled)&&(this.chart.options.chart.pinchType="xy");a.apply(this,[].slice.call(arguments,1))});a(f.prototype,"pinchTranslate",function(a,f,p,h,u,l,c){a.call(this,f,p,h,u,l,c);"map"===this.chart.options.chart.type&&this.hasZoom&&(a=h.scaleX>h.scaleY,this.pinchTranslateDirection(!a,f,p,h,u,l,c,a?h.scaleX:h.scaleY))})})(w);
(function(a){var h=a.colorPointMixin,p=a.each,f=a.extend,e=a.isNumber,q=a.map,x=a.merge,t=a.noop,u=a.pick,l=a.isArray,c=a.Point,b=a.Series,m=a.seriesType,r=a.seriesTypes,g=a.splat,k=void 0!==a.doc.documentElement.style.vectorEffect;m("map","scatter",{allAreas:!0,animation:!1,nullColor:"#f7f7f7",borderColor:"#cccccc",borderWidth:1,marker:null,stickyTracking:!1,joinBy:"hc-key",dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},turboThreshold:0,
tooltip:{followPointer:!0,pointFormat:"{point.name}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{brightness:.2,halo:null},select:{color:"#cccccc"}}},x(a.colorSeriesMixin,{type:"map",getExtremesFromAll:!0,useMapGeometry:!0,forceDL:!0,searchPoint:t,directTouch:!0,preserveAspectRatio:!0,pointArrayMap:["value"],getBox:function(d){var b=Number.MAX_VALUE,c=-b,g=b,k=-b,l=b,m=b,f=this.xAxis,r=this.yAxis,q;p(d||[],function(d){if(d.path){"string"===typeof d.path&&(d.path=a.splitPath(d.path));
var n=d.path||[],v=n.length,f=!1,r=-b,y=b,h=-b,p=b,A=d.properties;if(!d._foundBox){for(;v--;)e(n[v])&&(f?(r=Math.max(r,n[v]),y=Math.min(y,n[v])):(h=Math.max(h,n[v]),p=Math.min(p,n[v])),f=!f);d._midX=y+(r-y)*u(d.middleX,A&&A["hc-middle-x"],.5);d._midY=p+(h-p)*u(d.middleY,A&&A["hc-middle-y"],.5);d._maxX=r;d._minX=y;d._maxY=h;d._minY=p;d.labelrank=u(d.labelrank,(r-y)*(h-p));d._foundBox=!0}c=Math.max(c,d._maxX);g=Math.min(g,d._minX);k=Math.max(k,d._maxY);l=Math.min(l,d._minY);m=Math.min(d._maxX-d._minX,
d._maxY-d._minY,m);q=!0}});q&&(this.minY=Math.min(l,u(this.minY,b)),this.maxY=Math.max(k,u(this.maxY,-b)),this.minX=Math.min(g,u(this.minX,b)),this.maxX=Math.max(c,u(this.maxX,-b)),f&&void 0===f.options.minRange&&(f.minRange=Math.min(5*m,(this.maxX-this.minX)/5,f.minRange||b)),r&&void 0===r.options.minRange&&(r.minRange=Math.min(5*m,(this.maxY-this.minY)/5,r.minRange||b)))},getExtremes:function(){b.prototype.getExtremes.call(this,this.valueData);this.chart.hasRendered&&this.isDirtyData&&this.getBox(this.options.data);
this.valueMin=this.dataMin;this.valueMax=this.dataMax;this.dataMin=this.minY;this.dataMax=this.maxY},translatePath:function(a){var d=!1,b=this.xAxis,c=this.yAxis,g=b.min,k=b.transA,b=b.minPixelPadding,l=c.min,m=c.transA,c=c.minPixelPadding,f,r=[];if(a)for(f=a.length;f--;)e(a[f])?(r[f]=d?(a[f]-g)*k+b:(a[f]-l)*m+c,d=!d):r[f]=a[f];return r},setData:function(d,c,k,m){var n=this.options,f=this.chart.options.chart,v=f&&f.map,r=n.mapData,h=n.joinBy,u=null===h,t=n.keys||this.pointArrayMap,B=[],w={},z=this.chart.mapTransforms;
!r&&v&&(r="string"===typeof v?a.maps[v]:v);u&&(h="_i");h=this.joinBy=g(h);h[1]||(h[1]=h[0]);d&&p(d,function(a,b){var c=0;if(e(a))d[b]={value:a};else if(l(a)){d[b]={};!n.keys&&a.length>t.length&&"string"===typeof a[0]&&(d[b]["hc-key"]=a[0],++c);for(var g=0;g<t.length;++g,++c)t[g]&&(d[b][t[g]]=a[c])}u&&(d[b]._i=b)});this.getBox(d);(this.chart.mapTransforms=z=f&&f.mapTransforms||r&&r["hc-transform"]||z)&&a.objectEach(z,function(a){a.rotation&&(a.cosAngle=Math.cos(a.rotation),a.sinAngle=Math.sin(a.rotation))});
if(r){"FeatureCollection"===r.type&&(this.mapTitle=r.title,r=a.geojson(r,this.type,this));this.mapData=r;this.mapMap={};for(z=0;z<r.length;z++)f=r[z],v=f.properties,f._i=z,h[0]&&v&&v[h[0]]&&(f[h[0]]=v[h[0]]),w[f[h[0]]]=f;this.mapMap=w;d&&h[1]&&p(d,function(a){w[a[h[1]]]&&B.push(w[a[h[1]]])});n.allAreas?(this.getBox(r),d=d||[],h[1]&&p(d,function(a){B.push(a[h[1]])}),B="|"+q(B,function(a){return a&&a[h[0]]}).join("|")+"|",p(r,function(a){h[0]&&-1!==B.indexOf("|"+a[h[0]]+"|")||(d.push(x(a,{value:null})),
m=!1)})):this.getBox(B)}b.prototype.setData.call(this,d,c,k,m)},drawGraph:t,drawDataLabels:t,doFullTranslate:function(){return this.isDirtyData||this.chart.isResizing||this.chart.renderer.isVML||!this.baseTrans},translate:function(){var a=this,b=a.xAxis,c=a.yAxis,g=a.doFullTranslate();a.generatePoints();p(a.data,function(d){d.plotX=b.toPixels(d._midX,!0);d.plotY=c.toPixels(d._midY,!0);g&&(d.shapeType="path",d.shapeArgs={d:a.translatePath(d.path)})});a.translateColors()},pointAttribs:function(a,b){a=
r.column.prototype.pointAttribs.call(this,a,b);k?a["vector-effect"]="non-scaling-stroke":a["stroke-width"]="inherit";return a},drawPoints:function(){var a=this,b=a.xAxis,c=a.yAxis,g=a.group,f=a.chart,e=f.renderer,l,m,h,q,u=this.baseTrans,t,x,z,w,G;a.transformGroup||(a.transformGroup=e.g().attr({scaleX:1,scaleY:1}).add(g),a.transformGroup.survive=!0);a.doFullTranslate()?(f.hasRendered&&p(a.points,function(b){b.shapeArgs&&(b.shapeArgs.fill=a.pointAttribs(b,b.state).fill)}),a.group=a.transformGroup,
r.column.prototype.drawPoints.apply(a),a.group=g,p(a.points,function(a){a.graphic&&(a.name&&a.graphic.addClass("highcharts-name-"+a.name.replace(/ /g,"-").toLowerCase()),a.properties&&a.properties["hc-key"]&&a.graphic.addClass("highcharts-key-"+a.properties["hc-key"].toLowerCase()))}),this.baseTrans={originX:b.min-b.minPixelPadding/b.transA,originY:c.min-c.minPixelPadding/c.transA+(c.reversed?0:c.len/c.transA),transAX:b.transA,transAY:c.transA},this.transformGroup.animate({translateX:0,translateY:0,
scaleX:1,scaleY:1})):(l=b.transA/u.transAX,m=c.transA/u.transAY,h=b.toPixels(u.originX,!0),q=c.toPixels(u.originY,!0),.99<l&&1.01>l&&.99<m&&1.01>m&&(m=l=1,h=Math.round(h),q=Math.round(q)),t=this.transformGroup,f.renderer.globalAnimation?(x=t.attr("translateX"),z=t.attr("translateY"),w=t.attr("scaleX"),G=t.attr("scaleY"),t.attr({animator:0}).animate({animator:1},{step:function(a,b){t.attr({translateX:x+(h-x)*b.pos,translateY:z+(q-z)*b.pos,scaleX:w+(l-w)*b.pos,scaleY:G+(m-G)*b.pos})}})):t.attr({translateX:h,
translateY:q,scaleX:l,scaleY:m}));k||a.group.element.setAttribute("stroke-width",a.options[a.pointAttrToOptions&&a.pointAttrToOptions["stroke-width"]||"borderWidth"]/(l||1));this.drawMapDataLabels()},drawMapDataLabels:function(){b.prototype.drawDataLabels.call(this);this.dataLabelsGroup&&this.dataLabelsGroup.clip(this.chart.clipRect)},render:function(){var a=this,c=b.prototype.render;a.chart.renderer.isVML&&3E3<a.data.length?setTimeout(function(){c.call(a)}):c.call(a)},animate:function(a){var b=this.options.animation,
d=this.group,c=this.xAxis,g=this.yAxis,k=c.pos,l=g.pos;this.chart.renderer.isSVG&&(!0===b&&(b={duration:1E3}),a?d.attr({translateX:k+c.len/2,translateY:l+g.len/2,scaleX:.001,scaleY:.001}):(d.animate({translateX:k,translateY:l,scaleX:1,scaleY:1},b),this.animate=null))},animateDrilldown:function(a){var b=this.chart.plotBox,d=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],c=d.bBox,g=this.chart.options.drilldown.animation;a||(a=Math.min(c.width/b.width,c.height/b.height),d.shapeArgs=
{scaleX:a,scaleY:a,translateX:c.x,translateY:c.y},p(this.points,function(a){a.graphic&&a.graphic.attr(d.shapeArgs).animate({scaleX:1,scaleY:1,translateX:0,translateY:0},g)}),this.animate=null)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,animateDrillupFrom:function(a){r.column.prototype.animateDrillupFrom.call(this,a)},animateDrillupTo:function(a){r.column.prototype.animateDrillupTo.call(this,a)}}),f({applyOptions:function(a,b){a=c.prototype.applyOptions.call(this,a,b);b=this.series;var d=
b.joinBy;b.mapData&&((d=void 0!==a[d[1]]&&b.mapMap[a[d[1]]])?(b.xyFromShape&&(a.x=d._midX,a.y=d._midY),f(a,d)):a.value=a.value||null);return a},onMouseOver:function(a){clearTimeout(this.colorInterval);if(null!==this.value||this.series.options.nullInteraction)c.prototype.onMouseOver.call(this,a);else this.series.onMouseOut(a)},zoomTo:function(){var a=this.series;a.xAxis.setExtremes(this._minX,this._maxX,!1);a.yAxis.setExtremes(this._minY,this._maxY,!1);a.chart.redraw()}},h))})(w);(function(a){var h=
a.seriesType,p=a.seriesTypes;h("mapline","map",{lineWidth:1,fillColor:"none"},{type:"mapline",colorProp:"stroke",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,e){a=p.map.prototype.pointAttribs.call(this,a,e);a.fill=this.options.fillColor;return a},drawLegendSymbol:p.line.prototype.drawLegendSymbol})})(w);(function(a){var h=a.merge,p=a.Point;a=a.seriesType;a("mappoint","scatter",{dataLabels:{enabled:!0,formatter:function(){return this.point.name},crop:!1,defer:!1,
overflow:!1,style:{color:"#000000"}}},{type:"mappoint",forceDL:!0},{applyOptions:function(a,e){a=void 0!==a.lat&&void 0!==a.lon?h(a,this.series.chart.fromLatLonToPoint(a)):a;return p.prototype.applyOptions.call(this,a,e)}})})(w);(function(a){var h=a.arrayMax,p=a.arrayMin,f=a.Axis,e=a.color,q=a.each,x=a.isNumber,t=a.noop,u=a.pick,l=a.pInt,c=a.Point,b=a.Series,m=a.seriesType,r=a.seriesTypes;m("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},
marker:{lineColor:null,lineWidth:1,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,pointAttribs:function(a,c){var d=u(this.options.marker.fillOpacity,
.5);a=b.prototype.pointAttribs.call(this,a,c);1!==d&&(a.fill=e(a.fill).setOpacity(d).get("rgba"));return a},getRadii:function(a,b,c,l){var d,g,k,e=this.zData,m=[],n=this.options,f="width"!==n.sizeBy,r=n.zThreshold,h=b-a;g=0;for(d=e.length;g<d;g++)k=e[g],n.sizeByAbsoluteValue&&null!==k&&(k=Math.abs(k-r),b=Math.max(b-r,Math.abs(a-r)),a=0),null===k?k=null:k<a?k=c/2-1:(k=0<h?(k-a)/h:.5,f&&0<=k&&(k=Math.sqrt(k)),k=Math.ceil(c+k*(l-c))/2),m.push(k);this.radii=m},animate:function(a){var b=this.options.animation;
a||(q(this.points,function(a){var c=a.graphic,d;c&&c.width&&(d={x:c.x,y:c.y,width:c.width,height:c.height},c.attr({x:a.plotX,y:a.plotY,width:1,height:1}),c.animate(d,b))}),this.animate=null)},translate:function(){var b,c=this.data,d,l,e=this.radii;r.scatter.prototype.translate.call(this);for(b=c.length;b--;)d=c[b],l=e?e[b]:0,x(l)&&l>=this.minPxSize/2?(d.marker=a.extend(d.marker,{radius:l,width:2*l,height:2*l}),d.dlBox={x:d.plotX-l,y:d.plotY-l,width:2*l,height:2*l}):d.shapeArgs=d.plotY=d.dlBox=void 0},
alignDataLabel:r.column.prototype.alignDataLabel,buildKDTree:t,applyZones:t},{haloPath:function(a){return c.prototype.haloPath.call(this,0===a?0:(this.marker?this.marker.radius||0:0)+a)},ttBelow:!1});f.prototype.beforePadding=function(){var a=this,b=this.len,c=this.chart,e=0,m=b,f=this.isXAxis,r=f?"xData":"yData",t=this.min,w={},H=Math.min(c.plotWidth,c.plotHeight),A=Number.MAX_VALUE,D=-Number.MAX_VALUE,E=this.max-t,C=b/E,F=[];q(this.series,function(b){var d=b.options;!b.bubblePadding||!b.visible&&
c.options.chart.ignoreHiddenSeries||(a.allowZoomOutside=!0,F.push(b),f&&(q(["minSize","maxSize"],function(a){var b=d[a],c=/%$/.test(b),b=l(b);w[a]=c?H*b/100:b}),b.minPxSize=w.minSize,b.maxPxSize=Math.max(w.maxSize,w.minSize),b=b.zData,b.length&&(A=u(d.zMin,Math.min(A,Math.max(p(b),!1===d.displayNegative?d.zThreshold:-Number.MAX_VALUE))),D=u(d.zMax,Math.max(D,h(b))))))});q(F,function(b){var c=b[r],d=c.length,l;f&&b.getRadii(A,D,b.minPxSize,b.maxPxSize);if(0<E)for(;d--;)x(c[d])&&a.dataMin<=c[d]&&c[d]<=
a.dataMax&&(l=b.radii[d],e=Math.min((c[d]-t)*C-l,e),m=Math.max((c[d]-t)*C+l,m))});F.length&&0<E&&!this.isLog&&(m-=b,C*=(b+e-m)/b,q([["min","userMin",e],["max","userMax",m]],function(b){void 0===u(a.options[b[0]],a[b[1]])&&(a[b[0]]+=b[2]/C)}))}})(w);(function(a){var h=a.merge,p=a.Point,f=a.seriesType,e=a.seriesTypes;e.bubble&&f("mapbubble","bubble",{animationLimit:500,tooltip:{pointFormat:"{point.name}: {point.z}"}},{xyFromShape:!0,type:"mapbubble",pointArrayMap:["z"],getMapData:e.map.prototype.getMapData,
getBox:e.map.prototype.getBox,setData:e.map.prototype.setData},{applyOptions:function(a,f){return a&&void 0!==a.lat&&void 0!==a.lon?p.prototype.applyOptions.call(this,h(a,this.series.chart.fromLatLonToPoint(a)),f):e.map.prototype.pointClass.prototype.applyOptions.call(this,a,f)},ttBelow:!1})})(w);(function(a){var h=a.colorPointMixin,p=a.each,f=a.merge,e=a.noop,q=a.pick,w=a.Series,t=a.seriesType,u=a.seriesTypes;t("heatmap","scatter",{animation:!1,borderWidth:0,nullColor:"#f7f7f7",dataLabels:{formatter:function(){return this.point.value},
inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{halo:!1,brightness:.2}}},f(a.colorSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,directTouch:!0,init:function(){var a;u.scatter.prototype.init.apply(this,arguments);a=this.options;a.pointRange=q(a.pointRange,a.colsize||1);this.yAxis.axisPointRange=a.rowsize||
1},translate:function(){var a=this.options,c=this.xAxis,b=this.yAxis,e=function(a,b,c){return Math.min(Math.max(b,a),c)};this.generatePoints();p(this.points,function(l){var g=(a.colsize||1)/2,k=(a.rowsize||1)/2,d=e(Math.round(c.len-c.translate(l.x-g,0,1,0,1)),-c.len,2*c.len),g=e(Math.round(c.len-c.translate(l.x+g,0,1,0,1)),-c.len,2*c.len),m=e(Math.round(b.translate(l.y-k,0,1,0,1)),-b.len,2*b.len),k=e(Math.round(b.translate(l.y+k,0,1,0,1)),-b.len,2*b.len);l.plotX=l.clientX=(d+g)/2;l.plotY=(m+k)/2;
l.shapeType="rect";l.shapeArgs={x:Math.min(d,g),y:Math.min(m,k),width:Math.abs(g-d),height:Math.abs(k-m)}});this.translateColors()},drawPoints:function(){u.column.prototype.drawPoints.call(this);p(this.points,function(a){a.graphic.attr(this.colorAttribs(a))},this)},animate:e,getBox:e,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,alignDataLabel:u.column.prototype.alignDataLabel,getExtremes:function(){w.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;
w.prototype.getExtremes.call(this)}}),h)})(w);(function(a){function h(a,c){var b,e,l,g=!1,k=a.x,d=a.y;a=0;for(b=c.length-1;a<c.length;b=a++)e=c[a][1]>d,l=c[b][1]>d,e!==l&&k<(c[b][0]-c[a][0])*(d-c[a][1])/(c[b][1]-c[a][1])+c[a][0]&&(g=!g);return g}var p=a.Chart,f=a.each,e=a.extend,q=a.format,w=a.merge,t=a.win,u=a.wrap;p.prototype.transformFromLatLon=function(e,c){if(void 0===t.proj4)return a.error(21),{x:0,y:null};e=t.proj4(c.crs,[e.lon,e.lat]);var b=c.cosAngle||c.rotation&&Math.cos(c.rotation),m=c.sinAngle||
c.rotation&&Math.sin(c.rotation);e=c.rotation?[e[0]*b+e[1]*m,-e[0]*m+e[1]*b]:e;return{x:((e[0]-(c.xoffset||0))*(c.scale||1)+(c.xpan||0))*(c.jsonres||1)+(c.jsonmarginX||0),y:(((c.yoffset||0)-e[1])*(c.scale||1)+(c.ypan||0))*(c.jsonres||1)-(c.jsonmarginY||0)}};p.prototype.transformToLatLon=function(e,c){if(void 0===t.proj4)a.error(21);else{e={x:((e.x-(c.jsonmarginX||0))/(c.jsonres||1)-(c.xpan||0))/(c.scale||1)+(c.xoffset||0),y:((-e.y-(c.jsonmarginY||0))/(c.jsonres||1)+(c.ypan||0))/(c.scale||1)+(c.yoffset||
0)};var b=c.cosAngle||c.rotation&&Math.cos(c.rotation),m=c.sinAngle||c.rotation&&Math.sin(c.rotation);c=t.proj4(c.crs,"WGS84",c.rotation?{x:e.x*b+e.y*-m,y:e.x*m+e.y*b}:e);return{lat:c.y,lon:c.x}}};p.prototype.fromPointToLatLon=function(e){var c=this.mapTransforms,b;if(c){for(b in c)if(c.hasOwnProperty(b)&&c[b].hitZone&&h({x:e.x,y:-e.y},c[b].hitZone.coordinates[0]))return this.transformToLatLon(e,c[b]);return this.transformToLatLon(e,c["default"])}a.error(22)};p.prototype.fromLatLonToPoint=function(e){var c=
this.mapTransforms,b,m;if(!c)return a.error(22),{x:0,y:null};for(b in c)if(c.hasOwnProperty(b)&&c[b].hitZone&&(m=this.transformFromLatLon(e,c[b]),h({x:m.x,y:-m.y},c[b].hitZone.coordinates[0])))return m;return this.transformFromLatLon(e,c["default"])};a.geojson=function(a,c,b){var m=[],h=[],g=function(a){var b,c=a.length;h.push("M");for(b=0;b<c;b++)1===b&&h.push("L"),h.push(a[b][0],-a[b][1])};c=c||"map";f(a.features,function(a){var b=a.geometry,k=b.type,b=b.coordinates;a=a.properties;var l;h=[];"map"===
c||"mapbubble"===c?("Polygon"===k?(f(b,g),h.push("Z")):"MultiPolygon"===k&&(f(b,function(a){f(a,g)}),h.push("Z")),h.length&&(l={path:h})):"mapline"===c?("LineString"===k?g(b):"MultiLineString"===k&&f(b,g),h.length&&(l={path:h})):"mappoint"===c&&"Point"===k&&(l={x:b[0],y:-b[1]});l&&m.push(e(l,{name:a.name||a.NAME,properties:a}))});b&&a.copyrightShort&&(b.chart.mapCredits=q(b.chart.options.credits.mapText,{geojson:a}),b.chart.mapCreditsFull=q(b.chart.options.credits.mapTextFull,{geojson:a}));return m};
u(p.prototype,"addCredits",function(a,c){c=w(!0,this.options.credits,c);this.mapCredits&&(c.href=null);a.call(this,c);this.credits&&this.mapCreditsFull&&this.credits.attr({title:this.mapCreditsFull})})})(w);(function(a){function h(a,c,e,g,k,d,f,h){return["M",a+k,c,"L",a+e-d,c,"C",a+e-d/2,c,a+e,c+d/2,a+e,c+d,"L",a+e,c+g-f,"C",a+e,c+g-f/2,a+e-f/2,c+g,a+e-f,c+g,"L",a+h,c+g,"C",a+h/2,c+g,a,c+g-h/2,a,c+g-h,"L",a,c+k,"C",a,c+k/2,a+k/2,c,a+k,c,"Z"]}var p=a.Chart,f=a.defaultOptions,e=a.each,q=a.extend,w=
a.merge,t=a.pick,u=a.Renderer,l=a.SVGRenderer,c=a.VMLRenderer;q(f.lang,{zoomIn:"Zoom in",zoomOut:"Zoom out"});f.mapNavigation={buttonOptions:{alignTo:"plotBox",align:"left",verticalAlign:"top",x:0,width:18,height:18,padding:5,style:{fontSize:"15px",fontWeight:"bold"},theme:{"stroke-width":1,"text-align":"center"}},buttons:{zoomIn:{onclick:function(){this.mapZoom(.5)},text:"+",y:0},zoomOut:{onclick:function(){this.mapZoom(2)},text:"-",y:28}},mouseWheelSensitivity:1.1};a.splitPath=function(a){var b;
a=a.replace(/([A-Za-z])/g," $1 ");a=a.replace(/^\s*/,"").replace(/\s*$/,"");a=a.split(/[ ,]+/);for(b=0;b<a.length;b++)/[a-zA-Z]/.test(a[b])||(a[b]=parseFloat(a[b]));return a};a.maps={};l.prototype.symbols.topbutton=function(a,c,e,g,f){return h(a-1,c-1,e,g,f.r,f.r,0,0)};l.prototype.symbols.bottombutton=function(a,c,e,g,f){return h(a-1,c-1,e,g,0,0,f.r,f.r)};u===c&&e(["topbutton","bottombutton"],function(a){c.prototype.symbols[a]=l.prototype.symbols[a]});a.Map=a.mapChart=function(b,c,e){var g="string"===
typeof b||b.nodeName,f=arguments[g?1:0],d={endOnTick:!1,visible:!1,minPadding:0,maxPadding:0,startOnTick:!1},h,l=a.getOptions().credits;h=f.series;f.series=null;f=w({chart:{panning:"xy",type:"map"},credits:{mapText:t(l.mapText,' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),mapTextFull:t(l.mapTextFull,"{geojson.copyright}")},tooltip:{followTouchMove:!1},xAxis:d,yAxis:w(d,{reversed:!0})},f,{chart:{inverted:!1,alignTicks:!1}});f.series=h;return g?new p(b,f,e):
new p(f,c)}})(w)});
