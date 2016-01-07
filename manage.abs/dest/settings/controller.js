define("template/form",["util"],function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='\ufeff<div class="main"> <h1 sn-binding="html:title"></h1> <div class="action"> <b class="button" sn-repeat="button in buttons" sn-on="click:button.click"> <em sn-binding="class:button.ico"></em><text sn-binding="html:button.value"></text> </b> </div> </div> ';return __},helpers:{}});return T.template=T.html,T});define("settings/views/set_update",["settings/settings/data","images/style.css"],function(t,e,n){var i=t("$"),s=(t("util"),t("core/model")),a=t("common/page"),o=t("common/menu"),l=t("components/form");t("../data/adtypes");return a.extend({events:{},onCreate:function(){var t=this;this.model=new s.ViewModel(this.$el,{title:"app版本管理",buttons:[{value:"确认",click:function(){e.submit(function(t){t.success?sl.tip("修改成功"):sl.tip(t.msg)})}}]});var e=new l({model:this.model,name:"data",useIframe:!0,url:"/api/manage/set_update",validator:"updateValid",enctype:"",fields:[{label:"版本号",field:"Version",emptyAble:!1,emptyText:"必填"},{label:"IOS下载链接",field:"IOSUrl",emptyAble:!1,emptyText:"必填"},{label:"apk下载链接",field:"AndroidUrl",emptyAble:!1,emptyText:"必填"},{label:"更新内容",field:"Content",vAlign:"top",type:"richTextBox"}]});this.model.before(".action",e.$el),i.get("/api/settings/get_update",function(e){e.success&&t.model.set("data",e.data)},"json")},onShow:function(){this.menu=o.get(this.route.path),this.$el.before(this.menu.$el)},onDestory:function(){}})});define("template/set_resource_mapping",["util"],function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='\ufeff<div class="main"> <h1 sn-binding="html:title"></h1> <div class="action js_action"> <b class="button" sn-repeat="button in buttons" sn-on="click:button.click"> <em sn-binding="class:button.ico"></em><text sn-binding="html:button.value"></text> </b> </div> <div class="js_data" style="padding:10px;word-break:break-all;"></div> <div class="action js_action1"> <b class="button" sn-repeat="button in buttons1" sn-on="click:button.click"> <em sn-binding="class:button.ico"></em><text sn-binding="html:button.value"></text> </b> </div> </div> ';return __},helpers:{}});return T.template=T.html,T});define("settings/views/set_resource_mapping",["settings/settings/data","images/style.css"],function(t,e,n){var s=(t("$"),t("util"),t("core/model")),a=t("common/page"),o=t("common/menu"),l=t("components/form"),c=t("models/api").API;t("../data/adtypes");return a.extend({events:{},onCreate:function(){var t=this;this.model=new s.ViewModel(this.$el,{title:"app资源管理",buttons:[{value:"确认",click:function(){e.submit(function(t){t.success?sl.tip("设置成功"):sl.tip(t.msg)})}}]});var e=new l({model:this.model,name:"mapping",useIframe:!0,url:c.url("/api/manage/set_resource_mapping"),validator:"updateValid",enctype:"",fields:[{label:"Key",field:"Key",emptyAble:!1,emptyText:"必填"},{label:"Value",field:"Value"}]});this.model.before(".js_action",e.$el);var n=new l({model:this.model,name:"upload",useIframe:!0,url:c.url("/api/manage/upload_resource"),validator:"updateValid",enctype:"",fields:[{label:"资源文件",field:"file",type:"file"}]});this.model.before(".js_action1",n.$el),this.model.set({buttons1:[{click:function(){n.submit(function(t){t.success?sl.tip("上传成功"):sl.tip(t.msg)})},value:"上传"}]}),new c({url:"/api/settings/resourceMapping",success:function(e){e.success&&e.data&&t.$(".js_data").html(JSON.stringify(e.data))}}).request()},onShow:function(){this.menu=o.get(this.route.path),this.$el.before(this.menu.$el)},onDestory:function(){}})});define("template/list",["util"],function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='\ufeff<div class="main"><h1 sn-binding="html:title"></h1> <div class="toolbar"> <b class="button" sn-repeat="button in toolbar" sn-on="click:button.click"> <em sn-binding="class:button.ico"></em><text sn-binding="html:button.value"></text> </b> </div> <div class="action"></div> </div> ';return __},helpers:{}});return T.template=T.html,T});define("settings/views/ad_list",["settings/settings/data","images/style.css"],function(t,e,n){var i=t("$"),r=t("util"),s=t("core/model"),a=t("common/page"),o=t("common/menu"),c=(t("components/form"),t("components/grid")),u=t("models/api").API,h=t("../data/adtypes");return a.extend({events:{"click .js_grid_delete":function(t){var e=t.currentTarget.getAttribute("data-id"),n=t.currentTarget.getAttribute("data-name"),r=this;window.confirm("确认删除？")&&i.post("/api/manage/delete_ad",{name:n,id:e},function(t){t.success?r.grid.load():sl.tip(t.msg)},"json")},"click .js_click":function(t){var e=t.currentTarget.getAttribute("data-id"),n=t.currentTarget.getAttribute("data-url");console.log(this.grid.data()),r.store("current_ad",r.first(this.grid.data(),function(t){return t.ID==e})),this.forward(n)}},onCreate:function(){var t=this;this.model=new s.ViewModel(this.$el,{title:"广告位管理"}),this.onResult("ad_change",function(){this.grid.load()}),this.grid=new c({search:{url:u.url("/api/settings/ad_list"),type:"GET",beforeSend:function(){},data:{name:{label:"广告位置",type:"select",options:h}}},onSelectRow:function(){},columns:[{text:"编号",bind:"ID",width:5},{text:"广告名称",bind:"Title",width:10},{text:"广告图片",bind:"Src",width:10,render:function(t){this.append('<a href="'+t.Src+'" target="_blank">'+t.Src+"</a>")}},{text:"操作",width:10,align:"center",valign:"center",render:function(e){var n=t.$('[name="name"]').val();this.append(i('<a href="javascript:;" class="js_click" data-id="'+e.ID+'" data-url="/settings/modify_ad/'+n+"/"+e.ID+'">[修改]</a>')),this.append(' <a href="javascript:;" data-id="'+e.ID+'" data-name="'+n+'" class="js_grid_delete">[删除]</a>')}}]}).search(),this.$el.find(".toolbar").after(this.grid.$el)},onShow:function(){this.menu=o.get("/"),this.$el.before(this.menu.$el)},onDestory:function(){}})});define("settings/views/add_ad",["settings/settings/data","images/style.css"],function(t,e,n){var s=(t("$"),t("util"),t("core/model")),a=t("common/page"),o=t("common/menu"),l=t("components/form"),c=t("../data/adtypes"),u=t("models/api").API;return a.extend({events:{},onCreate:function(){var t=this;this.model=new s.ViewModel(this.$el,{title:"添加广告",buttons:[{value:"确认",click:function(){e.submit(function(n){n.success?(sl.tip("添加成功"),t.setResult("ad_change"),t.back("/settings/ad_list"),e.reset()):sl.tip(n.msg)})}},{value:"重置",click:function(){e.reset()}}],user:{Sort:"0"}});var e=new l({model:this.model,name:"user",title:"test",useIframe:!0,url:u.url("/api/manage/add_ad"),validator:"userValid",enctype:"",fields:[{label:"广告位置",field:"Name",type:"select",emptyAble:!0,options:{data:c}},{label:"广告标题",field:"Title",emptyAble:!1,emptyText:"必填"},{label:"广告链接",field:"Url",emptyAble:!1,emptyText:"必填"},{label:"广告图片",field:"Src",type:"file",emptyAble:!1,emptyText:"不可为空"},{label:"广告详情",field:"Description",vAlign:"top",type:"richTextBox"},{label:"广告详情",field:"Sort",type:"number",label:"排序"}]});this.model.before(".action",e.$el)},onShow:function(){this.menu=o.get(this.route.path),this.$el.before(this.menu.$el)},onDestory:function(){}})});define("settings/views/modify_ad",["settings/settings/data","images/style.css"],function(t,e,n){var i=t("$"),r=t("util"),s=t("core/model"),a=t("common/page"),o=t("common/menu"),l=t("components/form"),c=t("../data/adtypes");return a.extend({events:{},onCreate:function(){var t=this;this.model=new s.ViewModel(this.$el,{title:"修改广告位",buttons:[{value:"确认",click:function(){e.submit(function(e){e.success?(sl.tip("修改成功"),t.setResult("ad_change"),t.back("/settings/ad_list"),t.form.reset()):sl.tip(e.msg)})}}]}),t.model.set("data",i.extend(r.store("current_ad"),{Name:this.route.data.name})),console.log(t.model.data.data);var e=new l({model:this.model,name:"data",title:"test",useIframe:!0,url:"/api/manage/modify_ad",validator:"userValid",enctype:"",fields:[{field:"ID",type:"hidden"},{label:"广告位置",field:"Name",type:"select",emptyAble:!0,options:{data:c}},{label:"广告标题",field:"Title",emptyAble:!1,emptyText:"必填"},{label:"广告链接",field:"Url",emptyAble:!1,emptyText:"必填"},{label:"广告图片",field:"Src",type:"file",emptyAble:!1,emptyText:"不可为空"},{label:"广告详情",field:"Description",vAlign:"top",type:"richTextBox"},{label:"广告详情",field:"Sort",type:"number",label:"排序"}]});this.model.before(".action",e.$el)},onShow:function(){this.menu=o.get(this.route.path),this.$el.before(this.menu.$el)},onDestory:function(){}})});define("settings/views/news_list",["settings/settings/data","images/style.css"],function(t,e,n){var i=t("$"),r=t("util"),s=t("core/model"),a=t("common/page"),o=t("common/menu"),c=(t("components/form"),t("components/grid")),u=t("models/api").API,d=t("../data/newstypes");return a.extend({events:{"click .js_grid_delete":function(t){var e=t.currentTarget.getAttribute("data-id"),n=t.currentTarget.getAttribute("data-name"),r=this;window.confirm("确认删除？")&&i.post("/api/manage/delete_news",{name:n,id:e},function(t){t.success?r.grid.load():sl.tip(t.msg)},"json")},"click .js_click":function(t){var e=t.currentTarget.getAttribute("data-id"),n=t.currentTarget.getAttribute("data-url");console.log(this.grid.data()),r.store("current_news",r.first(this.grid.data(),function(t){return t.ID==e})),this.forward(n)}},onCreate:function(){var t=this;this.model=new s.ViewModel(this.$el,{title:"活动页位管理"}),this.onResult("news_change",function(){this.grid.load()}),this.grid=new c({search:{url:u.url("/api/settings/news_list"),type:"POST",beforeSend:function(){},data:{name:{label:"活动页位置",type:"select",options:d}}},onSelectRow:function(){},columns:[{text:"编号",bind:"ID",width:5},{text:"活动页名称",bind:"Title",width:20},{text:"操作",width:10,align:"center",valign:"center",render:function(e){var n=t.$('[name="name"]').val();this.append(i('<a href="javascript:;" class="js_click" data-id="'+e.ID+'" data-url="/settings/modify_news/'+n+"/"+e.ID+'">[修改]</a>')),this.append(' <a href="javascript:;" data-id="'+e.ID+'" data-name="'+n+'" class="js_grid_delete">[删除]</a>')}}]}).search(),this.$el.find(".toolbar").after(this.grid.$el)},onShow:function(){this.menu=o.get("/"),this.$el.before(this.menu.$el)},onDestory:function(){}})});define("settings/views/add_news",["settings/settings/data","images/style.css"],function(t,e,n){var s=(t("$"),t("util"),t("core/model")),a=t("common/page"),o=t("common/menu"),l=t("components/form"),c=t("../data/newstypes"),u=t("models/api").API;return a.extend({events:{},onCreate:function(){var t=this;this.model=new s.ViewModel(this.$el,{title:"添加活动页",buttons:[{value:"确认",click:function(){e.submit(function(n){n.success?(sl.tip("添加成功"),t.setResult("news_change"),t.back("/settings/news_list"),e.reset()):sl.tip(n.msg)})}},{value:"重置",click:function(){e.reset()}}],user:{Sort:"0"}});var e=new l({model:this.model,name:"user",title:"test",useIframe:!0,url:u.url("/api/manage/add_news"),validator:"userValid",enctype:"",fields:[{label:"活动页类型",field:"Name",type:"select",emptyAble:!0,options:{data:c}},{label:"活动页标题",field:"Title",emptyAble:!1,emptyText:"必填"},{label:"活动页详情",field:"Content",vAlign:"top",type:"richTextBox"},{field:"Sort",type:"number",label:"排序"}]});this.model.before(".action",e.$el)},onShow:function(){this.menu=o.get(this.route.path),this.$el.before(this.menu.$el)},onDestory:function(){}})});define("settings/views/modify_news",["settings/settings/data","images/style.css"],function(t,e,n){var i=t("$"),r=t("util"),s=t("core/model"),a=t("common/page"),o=t("common/menu"),l=t("components/form"),c=t("../data/newstypes");return a.extend({events:{},onCreate:function(){var t=this;this.model=new s.ViewModel(this.$el,{title:"修改活动页",buttons:[{value:"确认",click:function(){e.submit(function(e){e.success?(sl.tip("修改成功"),t.setResult("news_change"),t.back("/settings/news_list"),t.form.reset()):sl.tip(e.msg)})}}]}),t.model.set("data",i.extend(r.store("current_news"),{Name:this.route.data.name})),t.model.set("data.Sort",t.model.data.data.Sort+""),console.log(t.model.data.data);var e=new l({model:this.model,name:"data",title:"test",useIframe:!0,url:"/api/manage/modify_news",validator:"userValid",enctype:"",fields:[{field:"ID",type:"hidden"},{label:"活动页类型",field:"Name",type:"select",emptyAble:!0,options:{data:c}},{label:"活动页标题",field:"Title",emptyAble:!1,emptyText:"必填"},{label:"活动页详情",field:"Content",vAlign:"top",type:"richTextBox"},{field:"Sort",type:"number",label:"排序"}]});this.model.before(".action",e.$el)},onShow:function(){this.menu=o.get(this.route.path),this.$el.before(this.menu.$el)},onDestory:function(){}})});