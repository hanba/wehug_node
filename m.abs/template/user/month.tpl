﻿<header>
    <div class="head_back" data-back="{{back}}"></div>
    <div class="head_title">{{title}}</div>
</header>
<div class="main uc_month">
    <div sn-display="{{user.FreeMonths}}">
        <div class="uc_month_card">
            <div class="uc_month_card_user">
                <b>{{currentLevel}}</b>
                <span>({{ucCardAmounts}})</span>
                <p>
                    亲，不要忘记啦！<br />
                    您还有<em>{{user.FreeMonths}}</em>个月的会员礼可以领取哟！
                </p>
            </div>
            <div class="uc_month_val">
                <b>我的月礼</b>
                <span>({{user.FreeMonths}}/{{user.TotalMonths}})</span>
            </div>
        </div>
        <div class="uc_months_slider">
            <ul class="uc_month_slider_tit">
                <li>2014</li>
                <li class="curr">2015</li>
                <li>2016</li>
            </ul>
            <div class="uc_month_slider">
                <ul>
                    <li class="uc_month_item">
                        <p class="img canget">
                            <img src="{{item.FRE_TITLE_PIC}}" />
                        </p>
                        <span>10月</span>
                    </li>
                    <li class="uc_month_item">
                        <p class="img disable">
                            <img src="{{item.FRE_TITLE_PIC}}" />
                        </p>
                        <span>10月</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="my_nodata" sn-display="{{!user.FreeMonths}}" style="display:none">
        <div class="icon"></div>
        <div class="text">您目前还没有免费领取特权哦！</div>
        <div class="btn" sn-tap="open">去逛逛吧</div>
    </div>
</div>
