﻿<header>
    <div class="head_back" sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>
<ul class="mycard_hd">
    <li sn-binding="class:isOverdue|equal:false:'curr':''" sn-on="tap:isOverdue=false">抵用券</li>
    <li sn-binding="class:isOverdue|equal:false:'':'curr'" sn-on="tap:isOverdue=true">免邮卡</li>
</ul>
<div class="main mycard">
    <ul class="mycard_con js_not_overdue" sn-binding="display:isOverdue|not">
        <!-- <li class="free">
             <div class="name">免邮券</div>
             <div class="time"><div class="hd">有效期</div><div class="con">2015/07/30</div></div>
         </li>-->
        <li sn-repeat="item in data" sn-binding="class:item.VCA_DEDUCT_AMOUNT|cardClass:item.VCA_VCT_ID,class:item.isOverdue|equal:true:'dis':''">
            <div class="price" sn-binding="html:item.VCA_DEDUCT_AMOUNT|currency,display:item.VCA_VCT_ID|equal:4|not"></div>
            <div class="name" sn-binding="html:item.VCA_VCT_ID|equal:4:'免邮卡':item.VCA_NAME"><!--单笔订单满300可用--></div>
            <div class="time"><div class="hd">有效期</div><div class="con" sn-binding="html:item.CSV_START_DT|date:'yyyy/MM/dd'|concat:'至',display:item.isOverdue|not"></div><div class="con" sn-binding="html:item.CSV_END_DT|date:'yyyy/MM/dd',display:item.isOverdue|not"></div><div class="overdue" sn-binding="display:item.isOverdue" style="display:none">已过期</div></div>
        </li>
    </ul>
    <ul class="mycard_con js_overdue" sn-binding="display:isOverdue">
        <li sn-repeat="item in data1" sn-binding="class:item.VCA_VCT_ID|equal:4:'free':'',class:item.isOverdue|equal:true:'dis':''">
            <div class="price" sn-binding="html:item.VCA_DEDUCT_AMOUNT|currency,display:item.VCA_VCT_ID|equal:4|not"></div>
            <div class="name" sn-binding="html:item.VCA_VCT_ID|equal:4:'免邮卡':item.VCA_NAME"><!--单笔订单满300可用--></div>
            <div class="time"><div class="hd">有效期</div><div class="con" sn-binding="html:item.CSV_START_DT|date:'yyyy/MM/dd'|concat:'至',display:item.isOverdue|not"></div><div class="con" sn-binding="html:item.CSV_END_DT|date:'yyyy/MM/dd',display:item.isOverdue|not"></div><div class="overdue" sn-binding="display:item.isOverdue" style="display:none">已过期</div></div>
        </li>
    </ul>
    <div class="my_nodata" sn-binding="display:data|eval:'$1?!$2.length:!$0.length':isOverdue:data1" style="display:none">
        <div class="icon"></div>
        <div class="text">您目前还没有卡券哦</div>
        <div class="btn" sn-on="tap:open">去逛逛吧</div>
    </div>
</div>