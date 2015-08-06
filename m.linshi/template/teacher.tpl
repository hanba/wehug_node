﻿<header>
    <div class="head_back" sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>
<div class="main teacherwrap">
    <div class="teacher_info">
        <div class="teacher_basic">
            <img class="head_photo" sn-binding="src:basic_info|avatar,onerror:basic_info|avatarError" />
            <div class="tb_item">
                <h1 class="teacher_name" sn-binding="html:basic_info.teacher_name"></h1>
                <div class="teacher_area" sn-binding="html:basic_info.area"></div>
            </div>
            <div class="tb_item">
                <h2 class="discipline" sn-binding="html:basic_info.discipline"></h2>
                <div class="teaching_age" sn-binding="html:basic_info.teaching_age|concat:'教龄'"></div>
            </div>
        </div>
        <ul class="teacher_cert">
            <li class="cert" sn-binding="display:basic_info.certification_flag">身份认证</li>
            <li class="t_cert" sn-binding="display:basic_info.teacher_certification_flag">教师资格认证</li>
            <li class="education" sn-binding="display:basic_info.education_flag">学历认证</li>
        </ul>
        <!-- <div class="teacher_honor" sn-binding="html:basic_info.honor"></div-->
    </div>
    <ul class="teacher_data">
        <li sn-binding="html:basic_info.class_hours_number|concat:'小时'"></li>
        <li sn-binding="html:basic_info.students_number|concat:'个'"></li>
        <li sn-binding="html:basic_info.praise_rate"></li>
        <li sn-binding="html:basic_info.continue_rate"></li>
    </ul>
    <div class="tabs_nav">
        <ul class="tabs_nav_con">
            <li class="curr">课程</li>
            <li>经历</li>
            <li>评价</li>
        </ul>
    </div>
    <div class="tabs_content">
        <div class="tabs_panel curr">
            <ul class="teacher_course">
                <li sn-repeat="item in course_list" class="js_course" sn-binding="data-id:item.course_id">
                    <span sn-binding="html:item.class_method_name"></span>
                    <span sn-binding="html:item.price|concat:'元'"></span>
                    <i class="ico_next"></i>
                </li>
            </ul>
        </div>
        <div class="tabs_panel teacher_exp">
            <h4>过往经历</h4>
            <dl sn-repeat="item in past_experience">
                <dt sn-binding="html:item.date_area"></dt>
                <dd sn-binding="html:item.content"></dd>
            </dl>
            <h4>教学成果</h4>
            <dl sn-repeat="item in teaching_achievements">
                <dt sn-binding="html:item.date_area"></dt>
                <dd sn-binding="html:item.content"></dd>
            </dl>
        </div>
        <div class="tabs_panel teacher_cmt">
            <div class="teacher_cmt_item" sn-repeat="item in appraise_list">
                <div class="name">
                    <b sn-binding="html:item.student_name"></b>
                    <span class="class_time" sn-binding="html:item.class_time|format:'{0}课时'"></span>
                    <div class="score">
                        <i></i><i></i><i></i><i></i><i></i>
                        <div class="score_bd" sn-binding="style.width:item.score|precent">
                            <i></i><i></i><i></i><i></i><i></i>
                        </div>
                    </div>
                </div>
                <div class="comments" sn-binding="html:item.comments"></div>
                <div class="comments_sub" sn-binding="html:item.comment_type|concat:' ':item.raw_add_time"></div>
            </div>
        </div>
    </div>
</div>
<footer class="bottom_bar">
    <a class="btn_large2" href="tel:4009658980">咨询客服</a>
    <b class="btn_large" data-forward="/buy">立即购买</b>
</footer>
