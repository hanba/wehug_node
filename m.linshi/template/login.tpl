﻿<header>
    <div class="head_back" sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>
<div class="main">
    <div class="login_form">
        <ul class="form">
            <li><input placeholder="手机号" sn-model="userName" /></li>
            <li><input placeholder="密码" sn-model="password" type="password" /></li>
        </ul>
        <div class="login_btn"><b class="btn_large js_bind">绑定</b> </div>
        <div class="login_notice">
            <div>温馨提示：<br>
                若无邻师账号，以当前手机号和密码注册。<br>
                若已有邻师账号，请直接输入账号密码。</div>
        </div>
    </div>
</div>
