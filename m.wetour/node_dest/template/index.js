var util=require("util"),T={html:function($data){var __="";with($data||{})__+='<header> <div sn-binding="class:menu"></div> <div sn-binding="html:title,class:titleClass"></div> <div class="head_search_btn"><b class="btn_small js_comment" style="display:none">发表评论</b></div> </header> <div class="main" data-index="0"> <ul class="recommend_list js_comment_list"> <li class="recommend_item" sn-repeat="item in data0" sn-binding="data-id:item.ID,data-type:item.Type"> <img sn-binding="src:item.Pic" /> <div class="recommend_name" sn-binding="html:item.Name"></div> <div class="recommend_fav" sn-binding="html:item.Favorite"></div> </li> </ul> </div> <div class="main" style="display:none" data-index="1"> </div> <div class="main" style="display:none" data-index="2"> <ul class="recommend_list activity_list"> <li class="recommend_item" sn-repeat="item in data2" sn-binding="data-id:item.ID"> <a sn-binding="href:item.ID|format:\'/activity/{0}\'" forward> <img sn-binding="src:item.Pic" /> <div class="recommend_name" sn-binding="html:item.Name"></div> <div class="recommend_fav" sn-binding="html:item.Favorite"></div> </a> </li> </ul> </div> <div class="main" style="display:none" data-index="3"> <ul class="quan_list"> <li class="quan_item" sn-repeat="item in data3" sn-binding="data-id:item.ID"> <div class="quan_user"> <img sn-binding="src:item.Avatars" /> <div class="bd"> <h2 sn-binding="html:item.NickName|or:item.Mobile"></h2> <div class="time" sn-binding="html:item.InsertTime|date:\'MM-dd hh:ss\'"></div> </div> <div class="ft"> <span class="quanli_reply" sn-binding="html:item.Reply|length"></span> <span class="quanli_up" sn-binding="html:item.Up"></span> </div> </div> <div class="quan_con" sn-binding="html:item.Content"></div> <div class="quan_item quan_reply" sn-repeat="reply in item.Reply" sn-binding="data-id:item.ID,data-at:reply.NickName|or:reply.Mobile"> <div class="quan_user"> <img sn-binding="src:reply.Avatars" /> <div class="bd"> <h2 sn-binding="html:reply.NickName|or:reply.Mobile"></h2> <div class="time" sn-binding="html:reply.InsertTime|date:\'MM-dd hh:ss\'"></div> </div> <div class="ft"> <span class="quanli_reply"></span> </div> </div> <div class="quan_con" sn-binding="html:reply.Content"></div> </div> </li> </ul> </div> <ul class="footer"> <li class="curr">推荐</li> <li>目的地</li> <li>活动</li> <li>驴友圈</li> </ul>';return __},helpers:{}};T.template=T.html,module.exports=T;