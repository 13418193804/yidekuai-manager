webpackJsonp([14],{jRq4:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("TToO"),o=i("7+uW"),l=i("c+8m"),r=i.n(l),a=i("RXoh"),s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.allprescription=0,e.prescriptionList=[],e}return n.b(e,t),e.prototype.allPrescription=function(){var t=this;a.h().then(function(e){e.retCode?(console.log(e.data),t.allprescription=e.data):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.getprescriptionList=function(){var t=this;a.L({}).then(function(e){e.retCode?(console.log(e.data),t.prescriptionList=e.data):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.allPrescription(),this.getprescriptionList()},e=n.a([r()({props:{},components:{}})],e)}(o.default),c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{"border-bottom":"1px #e5e5e5 solid"}},[i("h3",[t._v("处方管理\n          ")]),t._v(" "),i("div",{staticStyle:{}},[t._v("\n平台处方数量统计："+t._s(t.allprescription)+"              \n            ")]),t._v(" "),i("div",{staticStyle:{"padding-bottom":"20px"}},[i("el-row",{attrs:{gutter:10}},[i("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[i("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入处方编号",clearable:""}})],1),t._v(" "),i("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[i("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入订单编号",clearable:""}})],1),t._v(" "),i("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[i("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getpatientList()}}},[t._v("查询")])],1)],1)],1)]),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.prescriptionList,stripe:""}},[i("el-table-column",{attrs:{prop:"presId",label:"处方编号"}}),t._v(" "),i("el-table-column",{attrs:{prop:"memberName",label:"患者姓名"}}),t._v(" "),i("el-table-column",{attrs:{prop:"docterName",label:"开方医生",width:"150"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",fixed:"right",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){t.handleDelete(e.$index,e.row)}}},[t._v("查看处方")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){t.handleDelete(e.$index,e.row)}}},[t._v("查看订单")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){t.changeModel(e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){t.doUpdateStatus(e.$index,e.row)}}},[t._v(t._s("USE"==e.row.member_status?"停用":"启用"))])]}}])})],1)],1)},staticRenderFns:[]};var p=i("VU/8")(s,c,!1,function(t){i("wDYM")},"data-v-4be66d1c",null);e.default=p.exports},wDYM:function(t,e){}});
//# sourceMappingURL=14.334ca69263ec20a6790e.js.map