define("template/index",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<header> <div sn-binding="class:menu"></div> <div class="head_search"><input placeholder="输入姓名或手机号搜索老师" sn-model="search" /></div> <div class="head_search_btn"><b class="btn_small js_search">搜索</b></div> </header> <div class="main"> <ul class="teacher_list"> <li class="teacher_item" sn-repeat="item in data" sn-binding="data-id:item.teacher_id"> <img sn-binding="src:item.head_photo" /> <div class="tli_info"> <!--<div class="tli_honor" sn-binding="html:item.honor"></div>--> <div class="tli_name" sn-binding="html:item.teacher_name|concat:\'—\':item.discipline"></div> </div> </li> </ul> </div> <div class="search_filters" style="display:none"> <ul class="filters_list"> <li sn-repeat="item in filters" sn-binding="html:item.name,data-forward:item.id|format:\'/search/q?course_category={0}\'"></li> </ul> </div>';return __},helpers:{}});return T.template=T.html,T});define("views/index",function(e,t,i){var s=e("$"),n=(e("util"),e("activity")),r=e("../widget/extend/loading"),l=e("../core/model"),o=e("../widget/scroll");e("animation");return n.extend({events:{tap:function(e){e.target==this.el&&this.back("/")},"tap .js_back,.search_filters":function(e){var t=s(e.target),i=this;return t.hasClass("js_back")||t.hasClass("search_filters")?(this.$searchFilters.hide(),setTimeout(function(){i.model.set("menu","head_menu")},0),!1):void 0},'tap [sn-repeat-name="data"][data-id]':function(e){this.forward("/teacher/"+e.currentTarget.getAttribute("data-id"))},"tap .js_search":function(e){var t=this.model.data.search;t?this.forward("/search/"+t):sl.tip("请输入搜索内容")},"tap .head_menu":function(e){this.forward("/menu")},'focus [sn-model="search"]':function(){this.model.set("menu","head_back js_back"),this.$searchFilters.show()}},swipeRightForwardAction:"/menu",onCreate:function(){var e=this,t=this.$(".main");this.$searchFilters=this.$(".search_filters"),this.model=new l.ViewModel(this.$el,{menu:"head_menu",filters:[{name:"小学",id:2},{name:"初中",id:3},{name:"高中",id:4},{name:"艺术",id:6},{name:"体育",id:5}],city:{name:"上海"}}),o.bind(t,{refresh:function(t,i){e.loading.reload({showLoading:!1},function(e,s){e?i(e):t(s)})}}),this.loading=new r({url:"/teacher/teacher_list",params:{sort:"member_id",order_by:"desc"},check:!1,$el:this.$el,$content:t.children(":first-child"),$scroll:t,success:function(t){t.data.length>=10&&(t.total=(this.pageIndex+1)*this.pageSize),e.model.set(t)},append:function(t){t.data.length>=10&&(t.total=(this.pageIndex+1)*this.pageSize),e.model.get("data").append(t.data)}}),this.loading.load()},onShow:function(){},onDestory:function(){}})});define("template/menu",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<div class="menu_hd">个人中心</div> <div class="menu_bd"> <div class="menu_user" sn-binding="data-back:memberUrl"> <img class="menu_avatars" sn-binding="src:avatars" /> <h1 class="menu_username" sn-binding="html:user_name"></h1> </div> <ul class="menu_list"> <li class="menu_home" data-back="/">首页</li> <li class="menu_settings" data-back="/settings">设置</li> <li class="menu_home" data-back="/find">发现</li> </ul> </div>';return __},helpers:{}});return T.template=T.html,T});define("views/menu",function(e,t,i){var s=e("$"),n=(e("util"),e("activity")),r=e("core/model"),o=(e("../widget/scroll"),e("../widget/extend/loading"));return n.extend({toggleAnim:"menu",className:"menu",events:{tap:function(e){}},swipeLeftBackAction:"/",onCreate:function(){var e=this;this.model=new r.ViewModel(this.$el,{memberUrl:"/member",user_name:"请登录"});var t=localStorage.getItem("member");t&&(this.member=t=JSON.parse(t),this.model.set({user_name:t.nick_name,memberUrl:"/member"}),"head_photo"in t?t.head_photo&&this.model.set({avatars:t.head_photo}):(this.loading=new o({url:"/user/get_member_info",check:!1,checkData:!1,params:{member_id:t.member_id},$el:this.$el,success:function(i){t=s.extend(t,i.data),localStorage.setItem("member",JSON.stringify(t)),e.model.set({avatars:t.head_photo+"?v="+localStorage.getItem("photo_ver"),user_name:t.nick_name})}}),this.loading.load()))},onShow:function(){var e=this;e.member&&e.model.set({avatars:e.member.head_photo+"?v="+localStorage.getItem("photo_ver")})},onDestory:function(){}})});define("template/about",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<header> <div class="head_back" sn-binding="data-back:back"></div> <div sn-binding="html:title" class="head_title"></div> </header> <div class="main"> <div class="aboutus"> 邻师是一个针对0～18岁学生（家长）和教师的教育资源整合平台，我们专门帮助小微培训机构，教师工作室及教师个人进行品牌塑造和市场推广，我们希望让老师能够招到更多的优质学生，让学生找到更合适自己的老师。 <img src="images/aboutus.jpg" /> <div class="aboutus_ver">发现身边好老师</div> </div> </div> ';return __},helpers:{}});return T.template=T.html,T});define("views/about",function(e,t,i){var n=(e("$"),e("util"),e("activity")),l=(e("../widget/extend/loading"),e("../core/model")),o=e("../widget/scroll");e("animation");return n.extend({events:{},swipeRightBackAction:"/settings",onCreate:function(){var t=this.$(".main");o.bind(t),this.model=new l.ViewModel(this.$el,{back:"/settings",title:"关于我们"})},onShow:function(){},onDestory:function(){}})});define("template/member",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<header> <div class="head_back" sn-binding="data-back:back"></div> <div sn-binding="html:title" class="head_title"></div> </header> <div class="main"> <div class="member"> <iframe style="top:-999px;left:-999px;position:absolute;display:none;" frameborder="0" width="0" height="0" name="__upload"></iframe> <form sn-binding="action:upload" method="post" class="member_avatars" enctype="multipart/form-data"> <input type="file" name="headPic" /> <input type="hidden" name="member_id" sn-binding="value:member.member_id" /> <img sn-binding="src:member.head_photo" /> </form> <ul class="member_info"> <li> <div>昵称</div> <div><input sn-binding="value:member.nick_name,readonly:nick_name.readonly" sn-model="nick_name.input" /></div> <b sn-binding="class:nick_name.edit,html:nick_name.value" sn-on="click:nick_name.click"></b> </li> <li class="member_one"> <div>性别：</div> <div> <span class="radio" member="gender" value="男" sn-binding="class:member.sex|case:\'男\':\'checked radio\':\'radio\'">男</span> <span class="radio" member="gender" value="女" sn-binding="class:member.sex|case:\'女\':\'checked radio\':\'radio\'">女</span> </div> </li> <li> <div>地址</div> <div><input sn-binding="value:member.address,readonly:address.readonly" sn-model="address.input" /></div> <b sn-binding="class:address.edit,html:address.value" sn-on="click:address.click"></b> </li> </ul> </div> </div> ';return __},helpers:{}});return T.template=T.html,T});define("views/member",function(e,t,i){var a=e("$"),n=(e("util"),e("activity")),r=e("core/model"),d=(e("../widget/scroll"),e("bridge")),o=e("../widget/extend/loading"),m=0;return n.extend({events:{'tap [member="gender"]':function(e){var t=e.currentTarget.getAttribute("value");this.model.get("member.sex")!=t&&this.setMemberInfo({member_id:this.model.get("member.member_id"),sex:t})},'change form input[type="file"]':function(e){m++;var t=this,s=(e.target.parentNode,new FileReader);s.onload=function(e){t.loading.showLoading(),a.post(d.url("/user/edit_photo"),{headPic:encodeURIComponent(e.target.result.replace(/^data\:image\/[a-z]+\;base64,/g,"")),member_id:t.member.member_id},function(e){if(0!=e.error_code)sl.tip(e.error_msg);else{var i=Date.now();localStorage.setItem("photo_ver",i),t.model.set("member",{head_photo:e.data.head_photo+"?v="+i})}t.loading.hideLoading()},"json")},s.readAsDataURL(e.target.files[0])}},swipeRightBackAction:"/",setMemberInfo:function(e){var t=this;this.loading.showLoading(),a.post(d.url("/user/edit_member_info"),e,function(i){0!=i.error_code?sl.tip(i.error_msg):t.model.set("member",e),t.loading.hideLoading()},"json")},onCreate:function(){var e=this;this.model=new r.ViewModel(this.$el,{title:"个人信息",back:"/",upload:d.url("/user/edit_photo")}),["nick_name","address"].forEach(function(t){e.model.set(t,{edit:"edit",value:"",readonly:!0,click:function(i){if("edit"==this.edit)e.model.set(t,{value:"确定",readonly:null,edit:"editing"}),e["$"+t].focus();else{if(e.model.data.member[t]!=this.input){var a={member_id:e.member.member_id};a[t]=this.input,e.setMemberInfo(a)}e.model.set(t,{readonly:!0,value:"",edit:"edit"})}}}),e["$"+t]=e.model.$el.find('[sn-model="'+t+'.input"]')})},onShow:function(){var e=this,t=localStorage.getItem("member");t?(e.member=t=JSON.parse(t),""===t.head_photo&&(t.head_photo=null),this.loading=new o({url:"/user/get_member_info",check:!1,checkData:!1,params:{member_id:t.member_id},$el:this.$el,success:function(i){e.member=t=a.extend(t,i.data),""===t.head_photo?t.head_photo=null:t.head_photo=t.head_photo+"?v="+localStorage.getItem("photo_ver"),localStorage.setItem("member",JSON.stringify(t)),e.model.set({member:t,"nick_name.input":t.nick_name,"address.input":t.address})}}),this.loading.load()):this.forward("/login")},onDestory:function(){}})});define("template/settings",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<header> <div class="head_back" sn-binding="data-back:back"></div> <div sn-binding="html:title" class="head_title"></div> </header> <div class="main"> <div class="settings"> <ul class="settings_list"> <li sn-repeat="item in settings" sn-binding="html:item.title,data-forward:item.href"></li> </ul> <div class="logout" sn-binding="html:logout">退出当前账号</div> </div> </div>';return __},helpers:{}});return T.template=T.html,T});define("views/settings",function(e,t,i){var n=(e("$"),e("util"),e("activity")),l=(e("../widget/extend/loading"),e("../core/model")),d=e("../widget/scroll");e("animation");return n.extend({events:{"tap .js_bind:not(.disabled)":function(){},"tap .logout":function(){localStorage.getItem("member")?(localStorage.removeItem("member"),this.back("/")):this.forward("/login")}},swipeRightBackAction:"/",onCreate:function(){var t=this.$(".main");d.bind(t),this.model=new l.ViewModel(this.$el,{back:"/",title:"设置",settings:[{title:"关于我们",href:"/about"}]});var i=localStorage.getItem("member");i?(i=JSON.stringify(i),this.model.set("logout","退出当前账号")):this.model.set("logout","立即登录")},onShow:function(){},onDestory:function(){}})});define("template/login",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<header> <div sn-binding="html:title" class="head_title"></div> <div class="head_back" sn-binding="data-back:back"></div> </header> <div class="main"> <div class="login_form"> <ul class="form"> <li><input placeholder="输入手机号" sn-model="mobile" /></li> <li><input placeholder="输入验证码" sn-model="password" type="text" /> <b class="js_valid" sn-binding="html:valid"></b></li> </ul> <div class="login_btn"><b class="btn_large js_bind">登录</b> </div> <div class="login_notice">新用户点击登陆即可完成注册</div> </div> </div> ';return __},helpers:{}});return T.template=T.html,T});define("template/search",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='\ufeff<header> <div class="head_back" data-back="/"></div> <div class="head_search"><input placeholder="输入姓名或手机号搜索老师" sn-model="keywords" /></div> <div class="head_search_btn"><b class="btn_small js_search">搜索</b></div> </header> <div class="main"> <ul class="search_list"> <li class="search_item" sn-repeat="item in data" sn-binding="data-id:item.teacher_id"> <div class="s_teacher"><img class="search_photo" sn-binding="src:item.head_photo" /> <ul class="s_teacher_basic"> <li><strong class="s_name" sn-binding="html:item.teacher_name"></strong><em sn-binding="html:item.discipline"></em><i sn-binding="html:item.price|round|concat:\'元/小时\'"></i></li> <li><span class="s_area" sn-binding="html:item.area"></span><span class="s_age" sn-binding="html:item.teaching_age|concat:\'教龄\'"></span></li> <li class="s_data"><span sn-binding="html:item.class_hours_number|concat:\'小时\'"></span><span sn-binding="html:item.students_number|concat:\'个\'"></span><span sn-binding="html:item.praise_rate"></span><span sn-binding="html:item.continue_rate"></span></li> </ul> </div> <!--<div class="s_honor" sn-binding="html:item.honor|format:\'获得荣誉：{0}\'"></div>--> <ul class="s_cert"> <li class="cert" sn-binding="display:item.certification_flag">身份认证</li> <li class="t_cert" sn-binding="display:item.teacher_certification_flag">教师资格认证</li> <li class="education" sn-binding="display:item.education_flag">学历认证</li> </ul> </li> </ul> </div> ';return __},helpers:{}});return T.template=T.html,T});define("views/login",function(e,i,t){var a=e("$"),s=e("util"),n=e("activity"),l=e("../widget/extend/loading"),d=e("../core/model"),r=e("../widget/scroll"),m=(e("animation"),e("bridge"));return n.extend({events:{"tap .js_bind:not(.disabled)":function(){var e=this.model.get("mobile"),i=this.model.get("password");return e&&s.validateMobile(e)?i?void this.loading.setParam({mobile:e,valid_code:i,type:7}).load():void sl.tip("请输入验证码"):void sl.tip("请输入正确的手机")},"tap .js_valid:not(.disabled)":function(e){var i=this.model.get("mobile");return i&&s.validateMobile(i)?(this.$valid.addClass("disabled"),this.valid.setParam({mobile:this.model.data.mobile}),void this.valid.load()):void sl.tip("请输入正确的手机")}},toggleAnim:"dialog",className:"login_view",validTimeout:function(){var e=this,i=localStorage.getItem("valid_time");if(i&&parseInt(i)>60){if(i=Math.round((new Date(parseInt(i)).getTime()-Date.now())/1e3),0>=i)return;e.$valid.addClass("disabled"),setTimeout(function(){0>=i?(e.$valid.removeClass("disabled"),e.model.set("valid","获取验证码"),localStorage.removeItem("valid_time")):(e.model.set("valid",i+"秒"),i--,setTimeout(arguments.callee,1e3))},1e3)}},onCreate:function(){var e=this,i=this.$(".main");r.bind(i),this.model=new d.ViewModel(this.$el,{title:"快速登录 / 注册",valid:"获取验证码",back:this.route.queries.from||"/"}),this.loading=new l({url:"/user/smslogin",method:"POST",check:!1,checkData:!1,$el:this.$el,xhrFields:{withCredentials:!0},success:function(i){if(i.error_msg)sl.tip(i.error_msg);else{var t={mobile:e.model.data.mobile,member_id:i.data.member_id,user_name:e.model.data.mobile};localStorage.setItem("member",JSON.stringify(t)),a.get(m.url("/user/get_member_info?member_id="+i.data.member_id),function(e){localStorage.setItem("member",JSON.stringify(a.extend(t,e.data)))},"json"),e.back(e.route.queries.success||"/")}},error:function(e){sl.tip(e.msg)}}),this.valid=new l({url:"/sms/send_valid_code",method:"POST",xhrFields:{withCredentials:!0},params:{mobile:e.model.data.mobile,type:7},check:!1,checkData:!1,$el:this.$el,success:function(i){1==i.error_code?sl.tip(i.error_msg):(localStorage.setItem("valid_time",Date.now()+6e4),e.validTimeout())}}),e.$valid=this.$(".js_valid"),e.validTimeout()},onShow:function(){},onDestory:function(){}})});define("views/search",function(e,i,t){var n=(e("$"),e("util"),e("activity")),l=e("../widget/extend/loading"),d=e("../core/model"),r=e("../widget/scroll");e("animation");return n.extend({events:{'tap [sn-repeat-name="data"][data-id]':function(e){this.forward("/teacher/"+e.currentTarget.getAttribute("data-id")+"?from="+this.route.url)},"tap .js_search":function(e){var i=this.getParam(this.model.data.keywords);this.loading.setParam(i).reload()}},getParam:function(e){var i={compare_field:"q"==e?"":e};return this.route.queries.course_category&&(i.course_category=this.route.queries.course_category),i},onCreate:function(){var e=this,i=this.$(".main");r.bind(i,{refresh:function(i,t){e.loading.reload({showLoading:!1},function(e,a){e?t(e):i(a)})}}),this.loading=new l({url:"/teacher/teacher_list",check:!1,checkData:!1,params:this.getParam(this.route.data.keywords),$el:this.$el,$content:i.children(":first-child"),$scroll:i,success:function(i){i.data.length>=10?i.total=(this.pageIndex+1)*this.pageSize:i.data&&i.data.length||this.showError({showReload:!1,msg:"搜索不到您要找的老师"}),e.model.set(i)},append:function(i){i.data.length>=10&&(i.total=(this.pageIndex+1)*this.pageSize),e.model.get("data").append(i.data)}}),this.model=new d.ViewModel(this.$el,{}),this.loading.load()},onShow:function(){},onDestory:function(){}})});define("template/teacher",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='\ufeff<header> <div class="head_back" sn-binding="data-back:back"></div> <div sn-binding="html:title" class="head_title"></div> </header> <div class="main teacherwrap"> <div class="teacher_info"> <div class="teacher_basic"> <img class="head_photo" sn-binding="src:basic_info.head_photo" /> <div class="tb_item"> <h1 class="teacher_name" sn-binding="html:basic_info.teacher_name"></h1> <div class="teacher_area" sn-binding="html:basic_info.area"></div> </div> <div class="tb_item"> <h2 class="discipline" sn-binding="html:basic_info.discipline"></h2> <div class="teaching_age" sn-binding="html:basic_info.teaching_age|concat:\'教龄\'"></div> </div> </div> <ul class="teacher_cert"> <li class="cert" sn-binding="display:basic_info.certification_flag">身份认证</li> <li class="t_cert" sn-binding="display:basic_info.teacher_certification_flag">教师资格认证</li> <li class="education" sn-binding="display:basic_info.education_flag">学历认证</li> </ul> <!-- <div class="teacher_honor" sn-binding="html:basic_info.honor"></div--> </div> <ul class="teacher_data"> <li sn-binding="html:basic_info.class_hours_number|concat:\'小时\'"></li> <li sn-binding="html:basic_info.students_number|concat:\'个\'"></li> <li sn-binding="html:basic_info.praise_rate"></li> <li sn-binding="html:basic_info.continue_rate"></li> </ul> <div class="tabs_nav"> <ul class="tabs_nav_con"> <li class="curr">经历</li> <li>评价</li> </ul> </div> <div class="tabs_content"> <div class="tabs_panel teacher_exp curr"> <h4>过往经历</h4> <dl sn-repeat="item in past_experience"> <dt sn-binding="html:item.date_area"></dt> <dd sn-binding="html:item.content"></dd> </dl> <h4>教学成果</h4> <dl sn-repeat="item in teaching_achievements"> <dt sn-binding="html:item.date_area"></dt> <dd sn-binding="html:item.content"></dd> </dl> </div> <div class="tabs_panel teacher_cmt"> <div class="teacher_cmt_item" sn-repeat="item in appraise_list"> <div class="name"> <b sn-binding="html:item.student_name"></b> <span class="class_time" sn-binding="html:item.class_time|format:\'{0}课时\'"></span> <div class="score"> <i></i><i></i><i></i><i></i><i></i> <div class="score_bd" sn-binding="style.width:item.score|precent"> <i></i><i></i><i></i><i></i><i></i> </div> </div> </div> <div class="comments" sn-binding="html:item.comments"></div> <div class="comments_sub" sn-binding="html:item.comment_type|concat:\' \':item.raw_add_time"></div> </div> </div> </div> </div> <footer class="bottom_bar"> <b class="btn_large" data-forward="/appointment">免费试听</b> </footer> ';return __},helpers:{}});return T.template=T.html,T});define("views/teacher",function(e,i,t){var a=e("$"),n=(e("util"),e("activity")),l=e("../widget/extend/loading"),d=e("../core/model"),r=e("../core/promise"),o=e("../widget/scroll");e("animation");return n.extend({events:{"tap .tabs_nav_con li:not(.curr)":function(e){var i=a(e.currentTarget);i.addClass("curr").siblings(".curr").removeClass("curr"),this.$panels.eq(i.index()).addClass("curr").siblings(".curr").removeClass("curr")}},onCreate:function(){var e=this;this.promise=new r,this.$main=this.$(".main"),o.bind(this.$main),this.$panels=this.$(".tabs_panel"),d.Filter.precent=function(e){return parseFloat(e)+"%"},this.model=new d.ViewModel(this.$el,{title:"老师详情页",back:this.route.queries.from||"/"}),this.loading=new l({url:"/teacher/teacher_info",params:{teacher_id:this.route.data.id},check:!1,checkData:!1,$el:this.$el,$content:this.$main.children(":first-child"),$scroll:this.$main,success:function(i){e.promise.then(function(){e.model.set(i.data)}),localStorage.setItem("teacher",JSON.stringify(i.data))}}),this.loading.load()},onLoad:function(){this.promise.resolve()},onDestory:function(){}})});define("template/appointment",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='\ufeff<header> <div class="head_back" sn-binding="data-back:back"></div> <div sn-binding="html:title" class="head_title"></div> </header> <div class="main"> <div class="apm_teacher"><img sn-binding="src:teacher.head_photo" /> <ul> <li sn-binding="html:teacher.discipline|format:\'科目：{0}\'"></li> <li sn-binding="html:teacher.teacher_name|format:\'教师：{0}老师\'"></li> </ul> </div> <div class="apm_member" sn-binding="html:userName"></div> <div class="apm_member" sn-binding="html:mobile"></div> <div class="apm_member_form"><input placeholder="输入验证码" sn-model="validCode" /> <b class="btn_large1 js_valid" sn-binding="html:valid"></b> </div> <div class="apm_member_form"><b class="btn_large1 js_submit">提交</b> </div> </div> ';return __},helpers:{}});return T.template=T.html,T});define("template/findlist",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<header> <div class="head_back js_back"></div> <div sn-binding="html:title" class="head_title"></div> <div class="head_share js_share"></div> </header> <div class="main"> <div class="pianolist"> <div class="pianolist_hd"> </div> <ul class="pianolist_bd"> <li sn-repeat="item in data" sn-binding="data-id:item.ID"> <img sn-binding="src:item.Pic" /> <div class="pianoli_con"> <h2 sn-binding="html:item.Title"></h2> <h3 sn-binding="html:item.SubTitle"></h3> <p sn-binding="html:item.Content"></p> <div class="pianoli_flag"> <i>￥</i> <div class="pianoli_price" sn-binding="html:item.SpecialPrice"> </div> <div class="pianoli_info"> <span sn-binding="html:item.TeachingAge|concat:\'教龄\'"></span> <span>一对一学生上门</span> <del sn-binding="html:item.Price|format:\'￥{0}起/小时\'"></del> </div> <div class="pianoli_praise_rate" sn-binding="html:item.PraiseRate"></div> </div> </div> <div class="btn_cart"></div> </li> </ul> </div> </div>';return __},helpers:{}});return T.template=T.html,T});define("views/findlist",function(e,i,t){var a=e("$"),s=e("util"),n=e("activity"),l=e("../widget/extend/loading"),d=e("../widget/extend/wxshare"),r=e("../core/model"),c=e("../widget/scroll"),h=(e("animation"),e("bridge"),{shareTitle:"邻师钢琴老师专场，狂潮来袭，首单一折",shareContent:"风格百变的邻师品牌老师馆，定期推出专场活动，挑选一位您喜欢的老师吧！"});return n.extend({events:{"tap .pianolist_bd>li[data-id]":function(e){var i=e.currentTarget.getAttribute("data-id"),t=s.first(this.model.data.data,function(e){return e.ID==i});s.store("find_data",t),this.forward("/find/"+(this.id?this.id+"/":"")+i)},"tap .js_back":function(){sl.isInApp?alert("linshi://"+JSON.stringify({method:"back"})):this.back("/")},"tap .js_share":function(e){alert("linshi://"+JSON.stringify({method:"share",params:a.extend(h,{shareUrl:location.href})}))}},swipeRightBackAction:sl.isInApp?null:"/",className:"piano_bg",onCreate:function(){var e=this;a(window).on("setMember",function(e,i){i&&i.member_id&&s.store("member",i)}),sl.hasStatusBar&&(this.$el.find("header").css({borderTop:"20px solid #f90","box-sizing":"content-box"}),this.$el.find(".main").css({top:67})),c.bind(this.$el.find(".main")),this.$share=this.$el.find(".js_share"),sl.isInApp||(this.$share.hide(),s.isInWechat&&d(h)),this.model=new r.ViewModel(this.$el,{title:"发现老师"}),this.loading=new l({$el:this.$el}),this.loading.showLoading(),this.id=this.route.data.id&&0!=this.route.data.id?this.route.data.id:"",this.id&&this.$(".pianolist_hd").css({backgroundImage:getComputedStyle(this.$(".pianolist_hd")[0]).backgroundImage.replace(".jpg",this.id+".jpg")}),a.get("data/find"+this.id+".json",function(i){e.model.set(i),e.loading.hideLoading()},"json")},onShow:function(){},onDestory:function(){}})});define("template/findlist",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<header> <div class="head_back js_back"></div> <div sn-binding="html:title" class="head_title"></div> <div class="head_share js_share"></div> </header> <div class="main"> <div class="pianolist"> <div class="pianolist_hd"> </div> <ul class="pianolist_bd"> <li sn-repeat="item in data" sn-binding="data-id:item.ID"> <img sn-binding="src:item.Pic" /> <div class="pianoli_con"> <h2 sn-binding="html:item.Title"></h2> <h3 sn-binding="html:item.SubTitle"></h3> <p sn-binding="html:item.Content"></p> <div class="pianoli_flag"> <i>￥</i> <div class="pianoli_price" sn-binding="html:item.SpecialPrice"> </div> <div class="pianoli_info"> <span sn-binding="html:item.TeachingAge|concat:\'教龄\'"></span> <span>一对一学生上门</span> <del sn-binding="html:item.Price|format:\'￥{0}起/小时\'"></del> </div> <div class="pianoli_praise_rate" sn-binding="html:item.PraiseRate"></div> </div> </div> <div class="btn_cart"></div> </li> </ul> </div> </div>';return __},helpers:{}});return T.template=T.html,T});define("views/appointment",function(i,e,t){var s=(i("$"),i("util")),n=i("activity"),l=i("../widget/extend/loading"),d=i("../core/model"),r=i("../widget/scroll");i("animation");return n.extend({events:{"tap .js_submit:not(.disabled)":function(i){return this.model.data.validCode?(this.$submit.addClass("disabled"),void this.loading.setParam({valid_code:this.model.data.validCode}).load()):void sl.tip("请输入验证码")},"tap .js_valid:not(.disabled)":function(i){this.$valid.addClass("disabled"),this.valid.load()}},onCreate:function(){var e=this.$(".main");r.bind(e);var t=localStorage.getItem("member"),a=JSON.parse(localStorage.getItem("teacher"));this.teacher=a,this.model=new d.ViewModel(this.$el,{title:"预约试听",back:"/teacher/"+a.basic_info.teacher_id,teacher:a.basic_info,valid:"获取验证码"}),t||this.forward("/login?success=/appointment&from=/teacher/"+a.basic_info.teacher_id)},validTimeout:function(){var i=this,e=localStorage.getItem("valid_time");if(e&&parseInt(e)>60){if(e=Math.round((new Date(parseInt(e)).getTime()-Date.now())/1e3),0>=e)return;i.$valid.addClass("disabled"),setTimeout(function(){0>=e?(i.$valid.removeClass("disabled"),i.model.set("valid","获取验证码"),localStorage.removeItem("valid_time")):(i.model.set("valid",e+"秒"),e--,setTimeout(arguments.callee,1e3))},1e3)}},onShow:function(){var i=this,e=localStorage.getItem("member"),t=this.teacher;return e?void(this.created||(this.created=!0,e=JSON.parse(e),this.model.set({mobile:e.mobile,userName:e.nick_name||e.user_name,member_id:e.member_id}),this.$submit=this.$(".js_submit"),this.$valid=this.$(".js_valid"),i.validTimeout(),this.loading=new l({url:"/student/appointment_teacher",method:"POST",xhrFields:{withCredentials:!0},params:{teacher_id:t.basic_info.teacher_id,student_id:this.model.data.member_id,discipline:t.basic_info.discipline,student_name:this.model.data.userName,student_mobile:this.model.data.mobile,teacher_name:t.basic_info.teacher_name,appointment_time:s.formatDate(new Date),valid_type:7},check:!1,checkData:!1,$el:this.$el,success:function(e){1==e.error_code?sl.tip(e.error_msg):(sl.tip(e.error_msg),i.back(i.model.data.back)),i.$submit.removeClass("disabled")}}),this.valid=new l({url:"/sms/send_valid_code",method:"POST",xhrFields:{withCredentials:!0},params:{mobile:i.model.data.mobile,type:7},check:!1,checkData:!1,$el:this.$el,success:function(e){1==e.error_code?sl.tip(e.error_msg):(localStorage.setItem("valid_time",Date.now()+6e4),i.validTimeout())}}))):void this.forward("/login?success=/appointment&from=/teacher/"+t.basic_info.teacher_id)},onDestory:function(){}})});define("views/findlist",function(i,e,t){var a=i("$"),s=i("util"),n=i("activity"),d=i("../widget/extend/loading"),l=i("../widget/extend/wxshare"),r=i("../core/model"),o=i("../widget/scroll"),h=(i("animation"),i("bridge"),{shareTitle:"邻师钢琴老师专场，狂潮来袭，首单一折",shareContent:"风格百变的邻师品牌老师馆，定期推出专场活动，挑选一位您喜欢的老师吧！"});return n.extend({events:{"tap .pianolist_bd>li[data-id]":function(i){var e=i.currentTarget.getAttribute("data-id"),t=s.first(this.model.data.data,function(i){return i.ID==e});s.store("find_data",t),this.forward("/find/"+(this.id?this.id+"/":"")+e)},"tap .js_back":function(){sl.isInApp?alert("linshi://"+JSON.stringify({method:"back"})):this.back("/")},"tap .js_share":function(i){alert("linshi://"+JSON.stringify({method:"share",params:a.extend(h,{shareUrl:location.href})}))}},swipeRightBackAction:sl.isInApp?null:"/",className:"piano_bg",onCreate:function(){var i=this;a(window).on("setMember",function(i,e){e&&e.member_id&&s.store("member",e)}),sl.hasStatusBar&&(this.$el.find("header").css({borderTop:"20px solid #f90","box-sizing":"content-box"}),this.$el.find(".main").css({top:67})),o.bind(this.$el.find(".main")),this.$share=this.$el.find(".js_share"),sl.isInApp||(this.$share.hide(),s.isInWechat&&l(h)),this.model=new r.ViewModel(this.$el,{title:"发现老师"}),this.loading=new d({$el:this.$el}),this.loading.showLoading(),this.id=this.route.data.id&&0!=this.route.data.id?this.route.data.id:"",this.id&&this.$(".pianolist_hd").css({backgroundImage:getComputedStyle(this.$(".pianolist_hd")[0]).backgroundImage.replace(".jpg",this.id+".jpg")}),a.get("data/find"+this.id+".json",function(e){i.model.set(e),i.loading.hideLoading()},"json")},onShow:function(){},onDestory:function(){}})});define("template/order",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='\ufeff<header> <div class="head_back" sn-binding="data-back:back"></div> <div sn-binding="html:title" class="head_title"></div> </header> <div class="main"> <div class="order"> <ul> <li sn-binding="html:data.subject"></li> <li sn-binding="html:data.teacherName"></li> <li sn-binding="html:data.order_code"></li> <li sn-binding="html:data.really_price"></li> </ul> <div class="order_pay"> <b class="btn_large js_pay">支付宝支付</b> </div> </div> </div>';return __},helpers:{}});return T.template=T.html,T});define("views/order",function(i,e,t){var s=(i("$"),i("util")),n=i("activity"),l=(i("../widget/extend/loading"),i("../core/model")),r=i("../widget/scroll");i("animation");return n.extend({events:{"tap .js_pay:not(.disabled)":function(){var i=this.model.data.data;location.href="http://"+(sl.isDebug?"front":"www")+".linshi.biz/alipay/index?out_trade_no="+i.order_code+"&return="+encodeURIComponent(location.href.replace(/#.+/,"#/find/"+i.id))+"&show="+encodeURIComponent(location.href.replace(/#.+/,"#/find/"+i.id))}},swipeRightBackAction:"/",onCreate:function(){var i=this,e=this.$(".main");r.bind(e);var t=s.store("orderInfo");this.swipeRightBackAction=this.route.queries.from||"/",i.model=new l.ViewModel(this.$el,{back:this.route.queries.from||"/",title:"订单支付",data:t})},onShow:function(){},onDestory:function(){}})});define("template/find",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<header> <div class="head_back js_back"></div> <div sn-binding="html:title" class="head_title"></div> <div class="head_share js_share"></div> </header> <div class="main"> <div class="piano"> <div class="piano_hd"> <img sn-binding="src:data.Pic1|or:data.Pic" /> <div class="piano_base"> <h1 sn-binding="html:data.Title"></h1> <h2 sn-binding="html:data.SubTitle"></h2> <p sn-binding="html:data.Content"></p> <div class="piano_price"> <del sn-binding="html:data.Price|format:\'￥{0}起/小时\'"></del> <i>￥</i> <h3 sn-binding="html:data.SpecialPrice"></h3> </div> </div> </div> <div class="piano_bd"> <h4>01<b>简介</b></h4> <div class="piano_con" sn-binding="html:data.Content1|htmlString"></div> <h4>02<b>寄语</b></h4> <div class="piano_con" sn-binding="html:data.Content2|htmlString"></div> <h4>03<b>经历</b></h4> <div class="piano_con" sn-binding="html:data.Content3|htmlString"></div> </div> </div> </div> <footer class="piano_ft"> <div class="btn_large js_buy">立即抢购</div> </footer>';return __},helpers:{}});return T.template=T.html,T});define("views/find",function(i,e,t){var a=i("$"),s=i("util"),n=i("activity"),d=i("../core/model"),l=i("../widget/extend/loading"),r=i("../widget/extend/wxshare"),c=(i("../core/promise"),i("../widget/scroll")),u=(i("animation"),i("bridge"),{shareTitle:"首单一折，邻师钢琴老师专场",shareContent:"风格百变的邻师品牌老师馆，定期推出专场活动，挑选一位您喜欢的老师吧！",shareUrl:location.href});return n.extend({events:{"tap .js_buy:not(.disabled)":function(i){var e=s.store("member");if(!e)return void this.forward("/login?success="+this.route.url+"&from="+this.route.url);var t=this.model.data.data,n=a(i.currentTarget);n.addClass("disabled"),this.loading.setParam({member_id:e.member_id,total_price:t.SpecialPrice,payment_price:t.SpecialPrice,total_time:1,course_id:t.RelativeID,class_method_id:1,coupon_id:11,coupon_price:t.Price-t.SpecialPrice,class_address:"",student_name:""}).load()},"tap .js_back":function(i){this.back(this.type?"/findlist/"+this.type:"/find")},"tap .js_share":function(i){alert("linshi://"+JSON.stringify({method:"share",params:u}))}},className:"piano_bg",onCreate:function(){var i=this;this.type=this.route.data.type&&0!=this.route.data.type?this.route.data.type:"",this.type&&(this.$(".piano_hd").css({backgroundImage:getComputedStyle(this.$(".piano_hd")[0]).backgroundImage.replace(".jpg",this.type+".jpg")}),this.$el.addClass("find"+this.type)),sl.hasStatusBar&&(this.$el.find("header").css({borderTop:"20px solid #f90","box-sizing":"content-box"}),this.$el.find(".main").css({top:67})),d.Filter.htmlString=function(i){return i&&i.replace(/\r\n/gm,"<br>").replace(/\n/gm,"<br>").replace(/\r/gm,"<br>")},c.bind(this.$el.find(".main")),this.$buy=this.$el.find(".js_buy"),this.$share=this.$el.find(".js_share"),sl.isInApp||(this.$share.hide(),s.isInWechat&&r(u)),this.model=new d.ViewModel(this.$el,{title:"老师详情",data:s.store("find_data")}),this.loading=new l({$el:this.$el,url:"/order/buy_course",method:"POST",check:!1,checkData:!1,success:function(e){i.$buy.removeClass("disabled");var t=i.model.data.data;if(1==e.error_code)sl.tip(e.error_msg);else{var a={order_code:e.data.order_code,really_price:t.SpecialPrice,subject:"钢琴",id:i.route.data.id,teacherName:t.Title};s.store("orderInfo",a),sl.isInApp?alert("linshi://"+JSON.stringify({method:"pay",params:a})):s.isInWechat?location.href="http://"+(sl.isDebug?"front":"www")+".linshi.biz/wxpay/index?out_trade_no="+e.data.order_code+"&return="+encodeURIComponent(location.href)+"&show="+encodeURIComponent(location.href):i.forward("/order/"+e.data.order_code+"?paytype=alipay&from="+i.route.url)}},error:function(){sl.tip("生成订单失败"),this.hideLoading(),i.$buy.removeClass("disabled")}})},onLoad:function(){},onDestory:function(){}})});define("template/find",function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<header> <div class="head_back js_back"></div> <div sn-binding="html:title" class="head_title"></div> <div class="head_share js_share"></div> </header> <div class="main"> <div class="piano"> <div class="piano_hd"> <img sn-binding="src:data.Pic1|or:data.Pic" /> <div class="piano_base"> <h1 sn-binding="html:data.Title"></h1> <h2 sn-binding="html:data.SubTitle"></h2> <p sn-binding="html:data.Content"></p> <div class="piano_price"> <del sn-binding="html:data.Price|format:\'￥{0}起/小时\'"></del> <i>￥</i> <h3 sn-binding="html:data.SpecialPrice"></h3> </div> </div> </div> <div class="piano_bd"> <h4>01<b>简介</b></h4> <div class="piano_con" sn-binding="html:data.Content1|htmlString"></div> <h4>02<b>寄语</b></h4> <div class="piano_con" sn-binding="html:data.Content2|htmlString"></div> <h4>03<b>经历</b></h4> <div class="piano_con" sn-binding="html:data.Content3|htmlString"></div> </div> </div> </div> <footer class="piano_ft"> <div class="btn_large js_buy">立即抢购</div> </footer>';return __},helpers:{}});return T.template=T.html,T});define("views/find",function(i,e,t){var a=i("$"),s=i("util"),n=i("activity"),d=i("../core/model"),l=i("../widget/extend/loading"),r=i("../widget/extend/wxshare"),c=(i("../core/promise"),i("../widget/scroll")),_=(i("animation"),i("bridge"),{shareTitle:"首单一折，邻师钢琴老师专场",shareContent:"风格百变的邻师品牌老师馆，定期推出专场活动，挑选一位您喜欢的老师吧！",shareUrl:location.href});return n.extend({events:{"tap .js_buy:not(.disabled)":function(i){var e=s.store("member");if(!e)return void this.forward("/login?success="+this.route.url+"&from="+this.route.url);var t=this.model.data.data,n=a(i.currentTarget);n.addClass("disabled"),this.loading.setParam({member_id:e.member_id,total_price:t.SpecialPrice,payment_price:t.SpecialPrice,total_time:1,course_id:t.RelativeID,class_method_id:1,coupon_id:11,coupon_price:t.Price-t.SpecialPrice,class_address:"",student_name:""}).load()},"tap .js_back":function(i){this.back(this.type?"/findlist/"+this.type:"/find")},"tap .js_share":function(i){alert("linshi://"+JSON.stringify({method:"share",params:_}))}},className:"piano_bg",onCreate:function(){var i=this;this.type=this.route.data.type&&0!=this.route.data.type?this.route.data.type:"",this.type&&(this.$(".piano_hd").css({backgroundImage:getComputedStyle(this.$(".piano_hd")[0]).backgroundImage.replace(".jpg",this.type+".jpg")}),this.$el.addClass("find"+this.type)),sl.hasStatusBar&&(this.$el.find("header").css({borderTop:"20px solid #f90","box-sizing":"content-box"}),this.$el.find(".main").css({top:67})),d.Filter.htmlString=function(i){return i&&i.replace(/\r\n/gm,"<br>").replace(/\n/gm,"<br>").replace(/\r/gm,"<br>")},c.bind(this.$el.find(".main")),this.$buy=this.$el.find(".js_buy"),this.$share=this.$el.find(".js_share"),sl.isInApp||(this.$share.hide(),s.isInWechat&&r(_)),this.model=new d.ViewModel(this.$el,{title:"老师详情",data:s.store("find_data")}),this.loading=new l({$el:this.$el,url:"/order/buy_course",method:"POST",check:!1,checkData:!1,success:function(e){i.$buy.removeClass("disabled");var t=i.model.data.data;if(1==e.error_code)sl.tip(e.error_msg);else{var a={order_code:e.data.order_code,really_price:t.SpecialPrice,subject:"钢琴",id:i.route.data.id,teacherName:t.Title};s.store("orderInfo",a),sl.isInApp?alert("linshi://"+JSON.stringify({method:"pay",params:a})):s.isInWechat?location.href="http://"+(sl.isDebug?"front":"www")+".linshi.biz/wxpay/index?out_trade_no="+e.data.order_code+"&return="+encodeURIComponent(location.href)+"&show="+encodeURIComponent(location.href):i.forward("/order/"+e.data.order_code+"?paytype=alipay&from="+i.route.url)}},error:function(){sl.tip("生成订单失败"),this.hideLoading(),i.$buy.removeClass("disabled")}})},onLoad:function(){},onDestory:function(){}})});