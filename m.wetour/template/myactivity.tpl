﻿<header>
    <div class="head_back" sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>
<div class="main">
    <ul class="myactivity">
        <li sn-repeat="item in data" sn-binding="data-id:item.ID">
            <div>
                <b sn-binding="html:item.Name"></b>
                <span sn-binding="html:item.JoinTime|date:'MM-dd hh:mm'"></span>
            </div>
            <em sn-binding="class:item.StatusID|format:'myact_status{0}',html:item.Status"></em>
        </li>
    </ul>
</div>