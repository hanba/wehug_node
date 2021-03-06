﻿<header>
    <div class="head_back" data-back="/"></div>
    <div class="head_search"><input placeholder="输入姓名或手机号搜索老师" sn-model="keywords" /></div>
    <div class="head_search_btn"><b class="btn_small js_search">搜索</b></div>
</header>
<div class="main">
    <ul class="search_list">
        <li class="search_item" sn-repeat="item in data" sn-binding="data-id:item.teacher_id">
            <div class="s_teacher"><img class="search_photo" sn-binding="src:item.head_photo" />
                <ul class="s_teacher_basic">
                    <li><strong class="s_name" sn-binding="html:item.teacher_name"></strong><em sn-binding="html:item.discipline"></em><i sn-binding="html:item.price|round|concat:'元/小时'"></i></li>
                    <li><span class="s_area" sn-binding="html:item.area"></span><span class="s_age" sn-binding="html:item.teaching_age|concat:'教龄'"></span></li>
                    <li class="s_data"><span sn-binding="html:item.class_hours_number|concat:'小时'"></span><span sn-binding="html:item.students_number|concat:'个'"></span><span sn-binding="html:item.praise_rate"></span><span sn-binding="html:item.continue_rate"></span></li>
                </ul>
            </div>
            <!--<div class="s_honor" sn-binding="html:item.honor|format:'获得荣誉：{0}'"></div>-->
            <ul class="s_cert">
                <li class="cert" sn-binding="display:item.certification_flag">身份认证</li>
                <li class="t_cert" sn-binding="display:item.teacher_certification_flag">教师资格认证</li>
                <li class="education" sn-binding="display:item.education_flag">学历认证</li>
            </ul>
        </li>
    </ul>
</div>
