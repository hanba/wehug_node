﻿<header>
    <div sn-binding="html:title" class="head_title"></div>
    <div class="head_back" sn-binding="data-back:back"></div>
</header>
<div class="main">
    <div class="login_form">
        <ul class="form">
            <li><input placeholder="原始密码" sn-model="orig_password" type="password" /></li>
            <li><input placeholder="输入新密码" sn-model="password" type="password" /></li>
            <li><input placeholder="再次输入新密码" sn-model="password1" type="password" /></li>
        </ul>
        <div class="login_btn"><b class="btn_large js_bind">确定修改</b> </div>
    </div>
</div>
