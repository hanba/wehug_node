define("template/index",["util"],function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<style> .db_toolbar { position: fixed; top: 10px; left: 220px; right: 10px; height: 60px; } .db_con { margin-top: 60px; } .datatable { min-width: 100%; } </style> <div class="main"> <div class="db_toolbar"> <select sn-model="database" value="{{database}}"> <option sn-repeat="item in databases">{{item.Database}}</option> </select> </div> <div class="db_con"> <table class="datatable"> <thead> <tr> <th sn-repeat="item in columns">{{item}}</th> </tr> </thead> <tbody> <tr sn-repeat="data in result"> <th sn-repeat="item in columns">{{item}}</th> </tr> </tbody> </table> </div> </div> ';return __},helpers:{}});return T.template=T.html,T});define("views/login",["images/style.css","$","util","core/page","core/model2","components/form2"],function(e,t,i){var s=e("$"),n=(e("util"),e("core/page")),o=e("core/model2"),l=e("components/form2");return n.extend({events:{},onCreate:function(){var e=this;e.$el.siblings().hide(),this.model=new o.ViewModel(this.$el,{title:"连接服务器",selectConnection:function(e){var t=e.model;this.set({user:t.data})},buttons:[{value:"确认",click:function(){t.submit(function(t){t.success?(sl.tip("登录成功"),e.back("/")):sl.tip(t.msg)})}}]}),s.get("/api/mysql/config",function(t){t.success&&t.data&&e.model.set({user:t.data.currentConnection,connections:t.data.connections})},"json");var t=new l({model:this.model,name:"user",url:"/api/mysql/connect",enctype:"",fields:[{label:"主机",field:"host",emptyAble:!1,emptyText:"不可为空"},{label:"用户名",field:"user",emptyAble:!1,emptyText:"不可为空"},{label:"密码",field:"password",type:"password",emptyAble:!1,emptyText:"不可为空"}]});t.$el.insertBefore(this.$(".action"))},onShow:function(){},onDestory:function(){}})});define("views/index",["images/style.css","$","util","core/model2","core/page","common/menu","components/form","components/grid"],function(e,t,a){{var s=e("$"),i=e("util"),n=e("core/model2"),o=e("core/page"),r=e("common/menu");e("components/form"),e("components/grid")}return o.extend({events:{},onCreate:function(){var e=this;e.on("QueryChange",function(){e.route.query.database&&e.model.set({database:e.route.query.database}),e.route.query.table&&e.model.set({table:e.route.query.table})}),e.model=new n.ViewModel(this.$el,{table:"",database:""}),e.model.on("change:database",function(t,a){s.get("/api/mysql/use?database="+a,function(t){s.post("/api/mysql/query",{query:"show tables"},function(t){var n=[],o=s.extend(!0,[],e.model.data.databases);t.data.forEach(function(e){n.push({name:e["Tables_in_"+a]})});var r=i.first(o,function(e){return e.Database==a});r.children=n,e.menu.setDatabases(o)},"json")},"json")});e.model.on("change:table",function(t,a){a&&s.post("/api/mysql/query",{query:"select * from information_schema.COLUMNS where table_name=@p0 and table_schema=@p1",params:JSON.stringify([e.model.data.table,e.model.data.database])},function(e){},"json")}),s.get("/api/mysql/databases",function(t){e.model.set({databases:t.data,database:e.route.query.database||t.fields[0].db,table:e.route.query.table})},"json")},onShow:function(){this.menu=r.get("/"),this.$el.before(this.menu.$el)},onDestory:function(){}})});define("template/test",["util"],function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+="";return __},helpers:{}});return T.template=T.html,T});define("template/login",["util"],function(require){var T=(require("util"),{html:function($data){var __="";with($data||{})__+='<div class="main"> <h1>{{title}}</h1> <ul> <li sn-repeat="conn in connections" sn-click="selectConnection">{{conn.user}}@{{conn.host}}</li> </ul> <div class="action"> <b class="button" sn-repeat="button in buttons" sn-click="button.click"> <em class="{{button.ico}}"></em>{{button.value}} </b> </div> </div> ';return __},helpers:{}});return T.template=T.html,T});define("views/test",["images/style.css","$","util","core/page","core/model2","components/form2"],function(e,t,n){var i=e("$"),a=(e("util"),e("core/page")),o=e("core/model2"),l=e("components/form2");return a.extend({events:{},onCreate:function(){var e=this;e.$el.siblings().hide(),this.model=new o.ViewModel(this.$el,{title:"连接服务器",selectConnection:function(e){var t=e.model;this.set({user:t.data})},buttons:[{value:"确认",click:function(){t.submit(function(t){t.success?(sl.tip("登录成功"),e.back("/")):sl.tip(t.msg)})}}]}),i.get("/api/mysql/config",function(t){t.success&&t.data&&e.model.set({user:t.data.currentConnection,connections:t.data.connections})},"json");var t=new l({model:this.model,name:"user",url:"/api/mysql/connect",enctype:"",fields:[{label:"主机",field:"host",emptyAble:!1,emptyText:"不可为空"},{label:"用户名",field:"user",emptyAble:!1,emptyText:"不可为空"},{label:"密码",field:"password",type:"password",emptyAble:!1,emptyText:"不可为空"}]});t.$el.insertBefore(this.$(".action"))},onShow:function(){},onDestory:function(){}})});