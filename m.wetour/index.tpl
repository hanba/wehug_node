﻿<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="api-base-url" content="@html(debug?"http://127.0.0.1:5558":"http://lcgogogo.com")" />
    <title></title>
    @for(var key in css){
        var items=css[key],
            item;
        if (debug) {
            if (typeof items=='string')
                items=[items];
            for(var i=0,len=items.length;i<len;i++) {
                item=items[i];
                <link href="@(webresource)@item?v@(Date.now())" rel="stylesheet" type="text/css"/>
            }
        } else {
            <link href="@(webresource)@key?v@(Date.now())" rel="stylesheet" type="text/css"/>
        }
    }
    <script src="@(webresource)@html(isDebugFramework?'js/seajs/sea.js':'slan.m.js')?v@(Date.now())"></script>
    @if(debug){
    <script src="@(webresource)js/zepto.js"></script>
    <script src="@(webresource)js/extend/fx.js"></script>
    <script src="@(webresource)js/extend/touch.js"></script>
    <script src="@(webresource)js/extend/matchMedia.js"></script>
    <script src="@(webresource)js/extend/ortchange.js"></script>
    <script src="@(webresource)js/anim/default.js"></script>
    }
    @for(var key in js){
        var items=js[key],
            item;
        if (debug) {
            if (typeof items=='string')
                items=[item];
            for(var i=0,len=items.length;i<len;i++) {
                var item=items[i];
                <script src="@(webresource)@(item).js"></script>
            }
        } else {
            <script src="@(webresource)@(key).js"></script>
        }
    }
</head>
<body>
    <script>
        seajs.config({
            alias: {
                "$": "zepto",
                'animation': 'core/animation',
                'activity': 'core/activity'
            }
        });
        seajs.use(['$','core/app','util'],function($,App,util) {
            sl.isDebug=@debug;
            sl.buildVersion=@(Date.now());
            if (!util.store('global_area'))util.store('global_area',1);
            new App().mapRoute(@html(JSON.stringify(routes)),@debug).start();
        });
    </script>
</body>
</html>
