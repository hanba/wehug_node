var util=require("util"),T={html:function($data){var __="";with($data||{})__+='<header> <div class="head_back" sn-binding="data-back:back"></div> <div sn-binding="html:title" class="head_title"></div> </header> <div class="main myorder"> <ul class="hd"> <li class="curr">全部</li> <li>待付款</li> <li>待发货</li> <li>配送中</li> <li>已完成</li> </ul> <ul class="con"> <li> <div class="hd"><b class="from">手机</b><span class="status">待收货</span></div> <div class="bd"> <img /> <div class="con"> <h2>商品名称</h2> <h3>颜色：</h3> <h4>尺寸：</h4> </div> <p class="priceinfo"> <span class="price">￥200</span> <span class="qty">x1</span> </p> </div> <div class="bd"> <img /> <div class="con"> <h2>商品名称</h2> <h3>颜色：</h3> <h4>尺寸：</h4> </div> <p class="priceinfo"> <span class="price">￥200</span> <span class="qty">x1</span> </p> </div> <div class="ft"> 总价：<span>￥000</span> <b class="btn_sml">查看物流</b> </div> </li> <li class="from1"> <div class="hd"><b class="from">门店</b><span class="status">待收货</span></div> <div class="bd"> <img /> <div class="con"> <h2>商品名称</h2> <h3>颜色：</h3> <h4>尺寸：</h4> </div> <p class="priceinfo"> <span class="price">￥200</span> <span class="qty">x1</span> </p> </div> <div class="ft"> 总价：<span>￥000</span> <b class="btn_sml">查看物流</b> </div> </li> </ul> </div>';return __},helpers:{}};T.template=T.html,module.exports=T;