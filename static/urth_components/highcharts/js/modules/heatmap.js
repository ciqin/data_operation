/*
 Highcharts JS v5.0.14 (2017-07-28)

 (c) 2009-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(q){"object"===typeof module&&module.exports?module.exports=q:q(Highcharts)})(function(q){(function(b){var l=b.Axis,t=b.Chart,m=b.color,h,e=b.each,v=b.extend,w=b.isNumber,n=b.Legend,f=b.LegendSymbolMixin,x=b.noop,r=b.merge,u=b.pick,p=b.wrap;h=b.ColorAxis=function(){this.init.apply(this,arguments)};v(h.prototype,l.prototype);v(h.prototype,{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},
width:.01},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(l.prototype.keepProps),init:function(a,c){var d="vertical"!==a.options.legend.layout,k;this.coll="colorAxis";k=r(this.defaultColorAxisOptions,{side:d?2:1,reversed:!d},c,{opposite:!d,showEmpty:!1,title:null});l.prototype.init.call(this,a,k);c.dataClasses&&this.initDataClasses(c);this.initStops();
this.horiz=d;this.zoomEnabled=!1;this.defaultLegendLength=200},initDataClasses:function(a){var c,d=0,k=this.chart.options.chart.colorCount,g=this.options,b=a.dataClasses.length;this.dataClasses=c=[];this.legendItems=[];e(a.dataClasses,function(a,e){a=r(a);c.push(a);"category"===g.dataClassColor?(a.colorIndex=d,d++,d===k&&(d=0)):a.color=m(g.minColor).tweenTo(m(g.maxColor),2>b?.5:e/(b-1))})},setTickPositions:function(){if(!this.dataClasses)return l.prototype.setTickPositions.call(this)},initStops:function(){this.stops=
this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];e(this.stops,function(a){a.color=m(a[1])})},setOptions:function(a){l.prototype.setOptions.call(this,a);this.options.crosshair=this.options.marker},setAxisSize:function(){var a=this.legendSymbol,c=this.chart,d=c.options.legend||{},k,g;a?(this.left=d=a.attr("x"),this.top=k=a.attr("y"),this.width=g=a.attr("width"),this.height=a=a.attr("height"),this.right=c.chartWidth-d-g,this.bottom=c.chartHeight-k-a,this.len=this.horiz?g:a,this.pos=
this.horiz?d:k):this.len=(this.horiz?d.symbolWidth:d.symbolHeight)||this.defaultLegendLength},normalizedValue:function(a){this.isLog&&(a=this.val2lin(a));return 1-(this.max-a)/(this.max-this.min||1)},toColor:function(a,c){var d=this.stops,k,g,b=this.dataClasses,e,f;if(b)for(f=b.length;f--;){if(e=b[f],k=e.from,d=e.to,(void 0===k||a>=k)&&(void 0===d||a<=d)){c&&(c.dataClass=f,c.colorIndex=e.colorIndex);break}}else{a=this.normalizedValue(a);for(f=d.length;f--&&!(a>d[f][0]););k=d[f]||d[f+1];d=d[f+1]||
k;a=1-(d[0]-a)/(d[0]-k[0]||1);g=k.color.tweenTo(d.color,a)}return g},getOffset:function(){var a=this.legendGroup,c=this.chart.axisOffset[this.side];a&&(this.axisParent=a,l.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=c)},setLegendColor:function(){var a,c=this.reversed;a=c?1:0;c=c?0:1;a=this.horiz?[a,0,c,0]:[0,c,0,a];this.legendColor={linearGradient:{x1:a[0],y1:a[1],x2:a[2],y2:a[3]},stops:this.stops}},drawLegendSymbol:function(a,
c){var d=a.padding,b=a.options,g=this.horiz,f=u(b.symbolWidth,g?this.defaultLegendLength:12),e=u(b.symbolHeight,g?12:this.defaultLegendLength),h=u(b.labelPadding,g?16:30),b=u(b.itemDistance,10);this.setLegendColor();c.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,f,e).attr({zIndex:1}).add(c.legendGroup);this.legendItemWidth=f+d+(g?b:h);this.legendItemHeight=e+d+(g?h:0)},setState:x,visible:!0,setVisible:x,getSeriesExtremes:function(){var a=this.series,c=a.length;this.dataMin=Infinity;for(this.dataMax=
-Infinity;c--;)void 0!==a[c].valueMin&&(this.dataMin=Math.min(this.dataMin,a[c].valueMin),this.dataMax=Math.max(this.dataMax,a[c].valueMax))},drawCrosshair:function(a,c){var d=c&&c.plotX,b=c&&c.plotY,g,f=this.pos,e=this.len;c&&(g=this.toPixels(c[c.series.colorKey]),g<f?g=f-2:g>f+e&&(g=f+e+2),c.plotX=g,c.plotY=this.len-g,l.prototype.drawCrosshair.call(this,a,c),c.plotX=d,c.plotY=b,this.cross&&this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup))},getPlotLinePath:function(a,c,d,
b,g){return w(g)?this.horiz?["M",g-4,this.top-6,"L",g+4,this.top-6,g,this.top,"Z"]:["M",this.left,g,"L",this.left-6,g+6,this.left-6,g-6,"Z"]:l.prototype.getPlotLinePath.call(this,a,c,d,b)},update:function(a,c){var d=this.chart,b=d.legend;e(this.series,function(a){a.isDirtyData=!0});a.dataClasses&&b.allItems&&(e(b.allItems,function(a){a.isDataClass&&a.legendGroup&&a.legendGroup.destroy()}),d.isDirtyLegend=!0);d.options[this.coll]=r(this.userOptions,a);l.prototype.update.call(this,a,c);this.legendItem&&
(this.setLegendColor(),b.colorizeItem(this,!0))},remove:function(){this.legendItem&&this.chart.legend.destroyItem(this);l.prototype.remove.call(this)},getDataClassLegendSymbols:function(){var a=this,c=this.chart,d=this.legendItems,k=c.options.legend,g=k.valueDecimals,h=k.valueSuffix||"",p;d.length||e(this.dataClasses,function(k,l){var n=!0,r=k.from,m=k.to;p="";void 0===r?p="\x3c ":void 0===m&&(p="\x3e ");void 0!==r&&(p+=b.numberFormat(r,g)+h);void 0!==r&&void 0!==m&&(p+=" - ");void 0!==m&&(p+=b.numberFormat(m,
g)+h);d.push(v({chart:c,name:p,options:{},drawLegendSymbol:f.drawRectangle,visible:!0,setState:x,isDataClass:!0,setVisible:function(){n=this.visible=!n;e(a.series,function(a){e(a.points,function(a){a.dataClass===l&&a.setVisible(n)})});c.legend.colorizeItem(this,n)}},k))});return d},name:""});e(["fill","stroke"],function(a){b.Fx.prototype[a+"Setter"]=function(){this.elem.attr(a,m(this.start).tweenTo(m(this.end),this.pos),null,!0)}});p(t.prototype,"getAxes",function(a){var c=this.options.colorAxis;
a.call(this);this.colorAxis=[];c&&new h(this,c)});p(n.prototype,"getAllItems",function(a){var c=[],d=this.chart.colorAxis[0];d&&d.options&&(d.options.showInLegend&&(d.options.dataClasses?c=c.concat(d.getDataClassLegendSymbols()):c.push(d)),e(d.series,function(a){a.options.showInLegend=!1}));return c.concat(a.call(this))});p(n.prototype,"colorizeItem",function(a,c,d){a.call(this,c,d);d&&c.legendColor&&c.legendSymbol.attr({fill:c.legendColor})});p(n.prototype,"update",function(a){a.apply(this,[].slice.call(arguments,
1));this.chart.colorAxis[0]&&this.chart.colorAxis[0].update({},arguments[2])})})(q);(function(b){var l=b.defined,t=b.each,m=b.noop;b.colorPointMixin={isValid:function(){return null!==this.value},setVisible:function(b){var e=this,h=b?"show":"hide";t(["graphic","dataLabel"],function(b){if(e[b])e[b][h]()})},setState:function(h){b.Point.prototype.setState.call(this,h);this.graphic&&this.graphic.attr({zIndex:"hover"===h?1:0})}};b.colorSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],
optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:m,parallelArrays:["x","y","value"],colorKey:"value",translateColors:function(){var b=this,e=this.options.nullColor,l=this.colorAxis,m=this.colorKey;t(this.data,function(h){var f=h[m];if(f=h.options.color||(h.isNull?e:l&&void 0!==f?l.toColor(f,h):h.color||b.color))h.color=f})},colorAttribs:function(b){var e={};l(b.color)&&(e[this.colorProp||"fill"]=b.color);return e}}})(q);(function(b){var l=b.colorPointMixin,
t=b.each,m=b.merge,h=b.noop,e=b.pick,q=b.Series,w=b.seriesType,n=b.seriesTypes;w("heatmap","scatter",{animation:!1,borderWidth:0,dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{halo:!1,brightness:.2}}},m(b.colorSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,
directTouch:!0,init:function(){var b;n.scatter.prototype.init.apply(this,arguments);b=this.options;b.pointRange=e(b.pointRange,b.colsize||1);this.yAxis.axisPointRange=b.rowsize||1},translate:function(){var b=this.options,e=this.xAxis,h=this.yAxis,l=function(b,a,c){return Math.min(Math.max(a,b),c)};this.generatePoints();t(this.points,function(f){var a=(b.colsize||1)/2,c=(b.rowsize||1)/2,d=l(Math.round(e.len-e.translate(f.x-a,0,1,0,1)),-e.len,2*e.len),a=l(Math.round(e.len-e.translate(f.x+a,0,1,0,1)),
-e.len,2*e.len),k=l(Math.round(h.translate(f.y-c,0,1,0,1)),-h.len,2*h.len),c=l(Math.round(h.translate(f.y+c,0,1,0,1)),-h.len,2*h.len);f.plotX=f.clientX=(d+a)/2;f.plotY=(k+c)/2;f.shapeType="rect";f.shapeArgs={x:Math.min(d,a),y:Math.min(k,c),width:Math.abs(a-d),height:Math.abs(c-k)}});this.translateColors()},drawPoints:function(){n.column.prototype.drawPoints.call(this);t(this.points,function(b){b.graphic.css(this.colorAttribs(b))},this)},animate:h,getBox:h,drawLegendSymbol:b.LegendSymbolMixin.drawRectangle,
alignDataLabel:n.column.prototype.alignDataLabel,getExtremes:function(){q.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;q.prototype.getExtremes.call(this)}}),l)})(q)});
