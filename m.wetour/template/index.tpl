<header>
    <div sn-binding="class:menu"></div>
    <div sn-binding="html:title,class:titleClass"></div>
    <div class="head_search_btn"><b class="btn_small js_comment">发表评论</b></div>
</header>
<div class="main" data-index="0">
    <ul class="recommend_list js_comment_list">
        <li class="recommend_item" sn-repeat="item in data0" sn-binding="data-id:item.ID,data-type:item.Type">
            <img sn-binding="src:item.Pic" />
            <div class="recommend_name" sn-binding="html:item.Name"></div>
            <div class="recommend_fav" sn-binding="html:item.Favorite"></div>
        </li>
    </ul>
</div>
<div class="main" style="display:none" data-index="1">
    <ul class="recommend_list">
        <li class="recommend_item" sn-repeat="item in data1" sn-binding="data-id:item.ID">
            <img sn-binding="src:item.Pic" />
            <div class="recommend_name" sn-binding="html:item.Name"></div>
            <div class="recommend_fav" sn-binding="html:item.Favorite"></div>
        </li>
    </ul>
</div>
<div class="main" style="display:none" data-index="2">
    <ul class="recommend_list">
        <li class="recommend_item" sn-repeat="item in data2" sn-binding="data-id:item.ID">
            <a sn-binding="href:item.ID|format:'/activity/{0}'" forward>
                <img sn-binding="src:item.Pic" />
                <div class="recommend_name" sn-binding="html:item.Name"></div>
                <div class="recommend_fav" sn-binding="html:item.Favorite"></div>
            </a>
        </li>
    </ul>
</div>
<div class="main" style="display:none" data-index="3">
    <ul class="recommend_list">
        <li class="recommend_item" sn-repeat="item in data3" sn-binding="data-id:item.ID">
            <img sn-binding="src:item.Pic" />
            <div class="recommend_name" sn-binding="html:item.Name"></div>
            <div class="recommend_fav" sn-binding="html:item.Favorite"></div>
        </li>
    </ul>
</div>
<ul class="footer">
    <li class="curr">推荐</li>
    <li>目的地</li>
    <li>活动</li>
    <li>驴友圈</li>
</ul>