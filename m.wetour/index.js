var util=require("util"),T={html:function($data){var __="";with($data||{}){__+='\ufeff<!DOCTYPE html> <html> <head> <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" /> <meta charset="utf-8" /> <meta name="format-detection" content="telephone=no" /> <meta name="api-base-url" content="'+(debug?"http://127.0.0.1:5558":"http://api.linshi.biz/v1.5.0")+'" /> <title></title> ';for(var key in css){var item,items=css[key];if(debug){"string"==typeof items&&(items=[item]);for(var i=0,len=items.length;len>i;i++){var item=items[i];__+='<link href="'+util.encodeHTML(webresource)+util.encodeHTML(item)+'" rel="stylesheet" type="text/css"/>'}}else __+='<link href="'+util.encodeHTML(webresource)+util.encodeHTML(key)+'" rel="stylesheet" type="text/css"/>'}__+=' <script src="'+util.encodeHTML(webresource)+(isDebugFramework?"js/seajs/sea.js":"slan.m.js")+'"></script> ',debug&&(__+='<script src="'+util.encodeHTML(webresource)+'js/zepto.js"></script><script src="'+util.encodeHTML(webresource)+'js/extend/fx.js"></script><script src="'+util.encodeHTML(webresource)+'js/extend/touch.js"></script><script src="'+util.encodeHTML(webresource)+'js/extend/matchMedia.js"></script><script src="'+util.encodeHTML(webresource)+'js/extend/ortchange.js"></script><script src="'+util.encodeHTML(webresource)+'js/anim/default.js"></script>'),__+=" ";for(var key in js){var item,items=js[key];if(debug){"string"==typeof items&&(items=[item]);for(var i=0,len=items.length;len>i;i++){var item=items[i];__+='<script src="'+util.encodeHTML(webresource)+util.encodeHTML(item)+'.js"></script>'}}else __+='<script src="'+util.encodeHTML(webresource)+util.encodeHTML(key)+'"></script>'}__+=" </head> <body> <script> seajs.config({ alias: { \"$\": \"zepto\", 'animation': 'core/animation', 'activity': 'core/activity' } }); seajs.use(['$','core/app'],function($,App) { new App().mapRoute("+JSON.stringify(routes)+","+util.encodeHTML(debug)+").start(); }); </script> </body> </html> "}return __},helpers:{}};T.template=T.html,module.exports=T;