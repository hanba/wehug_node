﻿var express=require('express');
var app=express();
var args=process.argv;
var port=args.length>=3?parseInt(args[2]):5556;

var Tools=require('./../tools/tools');
var path=require('path');

var razor=require('./../core/razor');
var fs=require('fs');

app.get('/js/template/*.js',function (req,res) {
    fs.readFile('./static/template/'+req.params[0]+'.tpl',{
        encoding: 'utf-8'
    },function (err,text) {

        text=Tools.compressJs(razor.web(text));
        res.set('Content-Type','text/javascript');
        res.send(text);
    });
});


app.get('/captcha',require('./../util/captcha'));

app.use(express.static(path.join(__dirname,'./static')));

app.listen(port);

//require('./build');

console.log("start with",port,__dirname,process.argv);