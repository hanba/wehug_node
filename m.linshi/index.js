var util=require("util"),T={html:function($data){var __="";with($data||{}){__+='<!DOCTYPE html> <html> <head> <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" /> <meta charset="utf-8" /> <meta name="format-detection" content="telephone=no" /> <meta name="api-base-url" content="'+(debug?"http://192.168.10.119:5556/api":"http://api.linshi.biz/v1.5.1")+'" /> <title>邻师，发现身边的好老师</title> <meta name="description" content="邻师是中国最专业最安全最智能的针对0-18岁学生(家长)和教师教育O2O平台,提供上海100%实名认证老师、课程(线上/线下)、问答、社区等学习服务,帮助老师和学生快速精准对接，同时为学生(家长)和教师提供高性价比的各项服务，以保证双方的多样性需求。 " /> <link href="'+(webresource+"images/style.css")+'" rel="stylesheet" type="text/css" /> ',debug&&(__+='<link href="'+(webresource+"images/anim.css")+'" rel="stylesheet" type="text/css" />'),__+=" ";for(var i=0;i<css.length;i++){var item=css[i];__+='<link href="'+util.encodeHTML(item)+'" rel="stylesheet" type="text/css"/>'}__+=' <script src="'+(webresource+(isDebugFramework?"js/seajs/sea.js":"slan.m.js?v"+Date.now()))+'"></script> ',debug&&(__+='<script src="'+util.encodeHTML(webresource)+'js/zepto.js"></script><script src="'+util.encodeHTML(webresource)+'js/extend/fx.js"></script><script src="'+util.encodeHTML(webresource)+'js/extend/touch.js"></script><script src="'+util.encodeHTML(webresource)+'js/extend/matchMedia.js"></script><script src="'+util.encodeHTML(webresource)+'js/extend/ortchange.js"></script><script src="'+util.encodeHTML(webresource)+'js/anim/default.js"></script>'),__+=" ";for(var i=0;i<js.length;i++){var item=js[i];__+='<script src="'+util.encodeHTML(item)+'"></script>'}__+=" </head> <body> <script> seajs.config({ alias: { \"$\": \"zepto\", 'animation': 'core/animation', 'activity': 'core/activity' } }); seajs.use(['$','util','core/app'],function($,util,App) { sl.isInApp=/linshiapp/ig.test(navigator.userAgent); sl.hasStatusBar=sl.isInApp&&util.ios&&util.osVersion>=7; sl.isDebug="+util.encodeHTML(debug)+"; sl.buildVersion="+util.encodeHTML(Date.now())+"; new App().mapRoute("+JSON.stringify(routes)+","+util.encodeHTML(debug)+").start(); }); window.callJS = function (data) { if (data.method=='setMember'){ seajs.use(['$','util'],function($,util){ util.store('member', data.params); }); } }; </script> </body> </html> "}return __},helpers:{}};T.template=T.html,module.exports=T;