﻿<header>
    <div class="head_back" sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>
<div class="main destwrap">
    <div class="destimg">
        <img sn-binding="src:data.MiddlePic" />
        <div class="destfav" sn-binding="html:data.Favorite,class:isFavorite|equal:true:'destfav fav_current':'destfav'"></div>
        <h1 sn-binding="html:data.Name"></h1>
    </div>
    <div class="destinfo">
        <h2>详情</h2>
        <div class="destcontent" sn-binding="html:data.Content"></div>
    </div>
    <div class="destinfo">
        <h2><span class="destcomment js_comment">发表评论</span>评论</h2>
        <div class="destcontent">
            <ul class="quan_list">
                <li class="quan_item" sn-repeat="item in comments" sn-binding="data-id:item.ID">
                    <div class="quan_user">
                        <img sn-binding="src:item.Avatars" />
                        <div class="bd">
                            <h2 sn-binding="html:item.NickName|or:item.Mobile"></h2>
                            <div class="time" sn-binding="html:item.CommentTime|date:'MM-dd hh:ss'"></div>
                        </div>
                    </div>
                    <div class="quan_con" sn-binding="html:item.Content"></div>
                </li>
            </ul>
        </div>
    </div>
</div>
