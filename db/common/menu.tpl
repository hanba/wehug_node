﻿<div class="menu">
    <div class="menu_hd">
        菜单
    </div>
    <div class="menu_sub_hd"><a href="/login">退出系统</a></div>
    <div class="menu_bd">
        <dl sn-repeat="item in data">
            <dt class="{{item.current?'curr':''}}">
                <a href="{{item.url}}">{{item.title}}</a>
            </dt>
            <dd sn-repeat="child in item.children" class="{{child.current?'curr':''}}">
                <a href="{{child.url}}">{{child.title}}</a>
            </dd>
        </dl>
        <dl sn-repeat="item in databases">
            <dt class="{{item.current?'curr':''}}">
                <a href="/?database={{item.Database}}">{{item.Database}}</a>
            </dt>
            <dd sn-repeat="child in item.children" class="{{child.current?'curr':''}}">
                <a href="/?database={{item.Database}}&table={{child.name}}">{{child.name}}</a>
            </dd>
        </dl>
    </div>
</div>
