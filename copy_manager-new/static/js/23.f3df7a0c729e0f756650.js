webpackJsonp([23],{"97Bs":function(t,e){},"y+ZF":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("TToO"),o=n("7+uW"),l=n("c+8m"),r=n.n(l),i=n("RXoh"),s=n("PJh5"),c=n.n(s),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.bigIcon="",e.viewBig=!1,e.onlineList=[],e.startDate="",e.endDate="",e.keystr="",e.page=0,e.pageSize=10,e.total=0,e.loading=!1,e.moreObj={model:!1,loading:!1,page:0,pageSize:10,total:0,row:{},detailList:[],onPageChange:function(t){e.moreObj.page=t-1,e.getInterrDetail(e.moreObj.row)}},e}return a.b(e,t),e.prototype.viewBigIcon=function(t){this.bigIcon=t,this.viewBig=!0},e.prototype.onPageChange=function(t){this.page=t-1,this.queryOnlineList()},e.prototype.queryOnlineList=function(t){var e=this;void 0===t&&(t=null),t&&(this.page=0);var n="",a="";""!=(this.startDate||"")&&(n=c()(this.startDate).format("YYYY-MM-DD")+" 00:00:00"),""!=(this.endDate||"")&&(a=c()(this.endDate).format("YYYY-MM-DD")+" 23:59:59"),this.loading=!0,i._10(n,a,this.page,this.pageSize,this.keystr).then(function(t){e.loading=!1,t.retCode?(e.onlineList=t.data.list,e.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.cleangetInterrDetail=function(t){this.moreObj.page=0,this.getInterrDetail(t)},e.prototype.getInterrDetail=function(t){var e=this;this.moreObj.loading=!0,this.moreObj.model=!0,this.moreObj.row=t,i.W({interrid:t.interrogationId,page:this.moreObj.page,pageSize:this.moreObj.pageSize}).then(function(t){e.moreObj.loading=!1,t.retCode?(console.log(t.data),e.moreObj.detailList=t.data.list,e.moreObj.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.queryOnlineList()},e=a.a([r()({props:{},components:{}})],e)}(o.default),d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[n("div",{staticStyle:{"border-bottom":"1px #e5e5e5 solid"}},[n("h3",[t._v("在线咨询管理\n          ")]),t._v(" "),n("div",{staticStyle:{"padding-bottom":"20px"}},[n("el-row",{attrs:{gutter:10}},[n("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[n("el-input",{staticStyle:{"margin-bottom":"20px"},attrs:{placeholder:"请输入关键字",clearable:""},model:{value:t.keystr,callback:function(e){t.keystr=e},expression:"keystr"}})],1),t._v(" "),n("el-date-picker",{attrs:{type:"date",placeholder:"开始日期"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),n("el-date-picker",{attrs:{type:"date",placeholder:"结束日期"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}}),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.queryOnlineList(!0)}}},[t._v("查询")])],1)],1)]),t._v(" "),n("el-table",{staticStyle:{"min-height":"500px"},attrs:{border:"",data:t.onlineList,stripe:""}},[n("el-table-column",{attrs:{label:"医院",fixed:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n         "+t._s(e.row.hospitalName)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"医生账号",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.docterMobile)+"\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"医生姓名"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.doctername)+"\n\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"医生手机号",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.docterMobile)+"\n\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"患者姓名"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.memberName)+"\n\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"患者手机号",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.memberPhone)+"\n\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"身份证号码",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.idcard)+"\n\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"患者性别"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.sex)+"\n\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"付款金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.money)+"\n\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"付款状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s("PAY_FREE"==e.row.paystatus?"免费":"")+"\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"付款时间",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.paytime)+"\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"聊天内容",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.desccontent)+"\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"更新时间",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.updateTime)+"\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"创建时间",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(e.row.createtime)+"\n ")]}}])}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){t.cleangetInterrDetail(e.row)}}},[t._v("更多")])]}}])})],1),t._v(" "),n("el-col",{staticClass:"toolbar",attrs:{span:24}},[n("el-pagination",{attrs:{"current-page":t.page+1,layout:"prev, pager, next","page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1),t._v(" "),n("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.moreObj.model,title:"更多聊天记录"},on:{"update:visible":function(e){t.$set(t.moreObj,"model",e)}}},[n("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.moreObj.detailList,stripe:"",height:"600"}},[n("el-table-column",{attrs:{fixed:"left",prop:"inType",label:"发送者"}}),t._v(" "),n("el-table-column",{attrs:{fixed:"left",label:"聊天记录"},scopedSlots:t._u([{key:"default",fn:function(e){return["会员"==e.row.inType&&""==e.row.content?n("div",[n("img",{staticStyle:{cursor:"pointer",width:"100px",heigth:"100px"},attrs:{src:e.row.imaglist},on:{click:function(n){t.viewBigIcon(e.row.imaglist)}}})]):n("div",[t._v("\n"+t._s(e.row.content)+"\n        ")])]}}])}),t._v(" "),n("el-table-column",{attrs:{fixed:"left",prop:"createtime",label:"发送时间"}})],1),t._v(" "),n("el-col",{staticClass:"toolbar",attrs:{span:24}},[n("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.moreObj.page+1,"page-size":t.moreObj.pageSize,total:t.moreObj.total},on:{"current-change":t.moreObj.onPageChange}})],1)],1),t._v(" "),n("el-dialog",{attrs:{visible:t.viewBig},on:{"update:visible":function(e){t.viewBig=e}}},[n("img",{attrs:{src:t.bigIcon}})])],1)},staticRenderFns:[]};var p=n("VU/8")(u,d,!1,function(t){n("97Bs")},"data-v-28fc2374",null);e.default=p.exports}});
//# sourceMappingURL=23.f3df7a0c729e0f756650.js.map