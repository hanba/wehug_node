@use './shop/cart' as cart
<header sn-display="{{isLogin}}">
    <div class="head_menu" sn-display="{{bottomTab==3}}" data-forward="/settings"></div>
    <ul class="head_tab" sn-display="{{bottomTab==0}}">
        <li class="{{tab==0?'curr':''}}">会员卡</li>
        <li class="{{tab==1?'curr':''}}">去购物</li>
        <i class="cursor"></i>
    </ul>
    <div class="head_title" style="display:{{bottomTab!=0?'block':'none'}}">{{bottomTab==1?'查找店铺':bottomTab==2?"购物车":"我"}}</div>
    <div class="head_msg" data-forward="/messages">
        <i sn-display="{{msg!=0}}">{{msg}}</i>
    </div>
</header>
<div sn-display="{{!isLogin}}">
    <div class="home_mask"></div>
    <div class="home_text" data-forward="/login">
        <h1></h1>
        <h2>让回家的灯，为爱亮起来。</h2>
        <h3>开启时尚居家之旅</h3>
        <h4>LIFE STARTS HERE</h4>
    </div>
    <div class="launch">
        <img src="images/launch0.jpg" />
        <img src="images/launch1.jpg" class="launch_hide" />
        <img src="images/launch2.jpg" class="launch_hide" />
    </div>
</div>
<div sn-display="{{isLogin}}">
    <div class="main hm_tab_con js_usescroll {{isLogin?"":"isnotlogin"}}" style="-webkit-transform:translate3d({{tab==0?0:-100}}%,0%,0);display:{{bottomTab==0?'block':'none'}}" data-index="0">
        <div class="hm_chart_wrap">
            <div class="hm_chart">
                <div class="hm_chart_con" sn-tap="chartType=1" sn-display="{{chartType==0}}">
                    <div class="hd">当前活力值</div>
                    <div class="bd">{{util.formatMoney(energyAnimNum)}}</div>
                    <div class="ft">目标 {{util.formatMoney(levelAmounts)}}</div>
                </div>
                <div class="hm_chart_con" style="padding-top:15px" sn-tap="chartType=2" sn-display="{{chartType==1}}">
                    <div class="hd">我的月礼</div>
                    <div class="bd">{{user.FreeMonths}}</div>
                </div>
                <div class="hm_chart_con" style="padding-top:15px" sn-tap="chartType=3" sn-display="{{chartType==2}}">
                    <div class="hd">我的卡券</div>
                    <div class="bd">{{user.FreeCouponsCount}}</div>
                </div>
                <div class="hm_chart_con" style="padding-top:15px" sn-tap="chartType=0" sn-display="{{chartType==3}}">
                    <div class="hd">积分钱包</div>
                    <div class="bd">{{user.Points}}</div>
                </div>
                <canvas class="hm_chart_canvas js_canvas"></canvas>
            </div>
            <div class="hm_chart_desc">{{currentLevel}}</div>
            <div class="hm_steward_link">您现在拥有<em>5</em>条爱管家记录啦！</div>
            <ul class="hm_chart_list">
                <li data-forward="/month"><i>我的月礼</i><em>{{user.FreeMonths}}</em></li>
                <li data-forward="/coupon"><i>我的卡券</i><em>{{user.FreeCouponsCount}}</em></li>
                <li data-forward="/mypoint"><i>积分钱包</i><em>{{user.Points}}</em></li>
            </ul>
        </div>
        <ul class="hm_cards">
            <li data-forward="/all"><i></i><p>NEW ARRIVAL</p><p>新品上市</p></li>
            <li data-forward="/list"><i></i><p>BEST BUYS</p><p>本周最热商品</p></li>
            <li data-forward="/list"><i></i><p>BIG SALE</p><p>季末特惠</p></li>
            <li data-forward="/list"><i></i><p>ONLINE ONLY</p><p>手机用户专享</p></li>
        </ul>
    </div>
    <div class="main hm_tab_con" style="-webkit-transform:translate3d({{tab==1?0:100}}%,0%,0);display:{{bottomTab==0?'block':'none'}}" data-index="1">
        <div class="hm_shop">
            <ul class="hm_shop_cate">
                <li data-forward="/all"><i></i>新品<br>上市</li>
                <li><i></i>本周最热<br>商品</li>
                <li><i></i>季末<br>清仓</li>
                <li><i></i>手机用户<br>专享</li>
            </ul>
            <div class="hm_shop_banner"><img src="" /></div>
            <ul class="hm_shop_list">
                <li class="hm_shop_list_item">
                    <img src="" />
                    <p class="price">￥99</p>
                    <p class="name">名称</p>
                </li>
                <li class="hm_shop_list_item">
                    <img src="" />
                    <p class="price">￥99</p>
                    <p class="name"></p>
                </li>
            </ul>
        </div>
    </div>
    <div class="main" style="display:{{bottomTab==1?'block':'none'}}">
        <div class="baiduMap" sn-html="{{baiduMap}}">
        </div>
    </div>
    <div class="main" style="display:{{bottomTab==2?'block':'none'}}">
        @cart.helpers.list()
    </div>
    <div class="main" style="display:{{bottomTab==3?'block':'none'}}" data-index="3">
        <div class="hm_my_card">
            <div class="vip_name">{{currentLevel}}</div>
            <div class="energy">
                当前活力值<span>{{util.formatMoney(energy)}}</span>
            </div>
            <div class="energy_bar">
                <span style="width:{{energyPercent}}"></span>
            </div>
            <div class="energy_val">
                <div class="energy_val_from">0</div>
                <div class="energy_val_to">1,000</div>
            </div>
        </div>
        <div class="hm_my_barcode">
            <div class="barcode" sn-html="{{barcode}}">
            </div>
            <div class="mobile">{{user.Mobile}}</div>
        </div>
        <ul class="hm_my_list">
            <li data-forward="/month">
                <b>我的月礼</b>
                <span><em>{{user.FreeMonths}}/{{user.TotalMonths}}</em>个月</span>
            </li>
            <li data-forward="/coupon">
                <b>我的卡券</b>
                <span><em>{{user.FreeCouponsCount}}</em>张</span>
            </li>
            <li data-forward="/mypoint">
                <b>积分钱包</b>
                <span><em>{{user.Points}}</em>分</span>
            </li>
            <li data-forward="/myorder">
                <b>购买记录</b>
                <span><em>{{user.OrderCount}}</em>条</span>
            </li>
            <li data-forward="/steward">
                <b>爱管家记录</b>
                <span><em>{{user.OrderCount}}</em>条</span>
            </li>
        </ul>
    </div>
    <div class="main js_offline" sn-display="{{isOffline}}">
        <div class="home_offline">
            <div class="ico"></div>
            <div class="txt">您的网络不太顺畅哦</div>
            <div class="txt_sub">请检查您的手机是否联网</div>
            <div class="btn">重新加载</div>
        </div>
    </div>
</div>
<ul class="footer" sn-display="{{isLogin}}">
    <li class="curr">首页</li>
    <li>附近门店</li>
    <li>购物车</li>
    <li>我</li>
</ul>
<div class="open_msg" style="display:none">
    <div class="msg_bd" sn-html="{{message}}"></div>
</div>
<div class="home_tip_mask" sn-display="{{isLogin&&isFirstOpen}}"></div>