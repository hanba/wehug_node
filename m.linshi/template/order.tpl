﻿<header>
    <div class="head_back" sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>
<div class="main">
    <div class="order">
        <ul>
            <li sn-binding="html:data.subject"></li>
            <li sn-binding="html:data.teacherName"></li>
            <li sn-binding="html:data.order_code"></li>
            <li sn-binding="html:data.really_price"></li>
        </ul>
        <div class="order_pay">
            <b class="btn_large js_pay">支付宝支付</b>
        </div>
    </div>
</div>