webpackJsonp([16],{CSRs:function(e,t){},"c+aE":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("TToO"),s=n("7+uW"),i=n("c+8m"),r=n.n(i),a=n("FL7F"),u=n("P/kE"),l=(a.a,function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.AuthorityList=[],t.name="",t}return o.b(t,e),t.prototype.mounted=function(){this.getList()},t.prototype.doaddSubmit=function(){var e,t,n=this;(e={name:this.name,resourceType:"menu"},t={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId")},Object.assign(t,e),u.n("/authority/addpermission",t).then(function(e){return e})).then(function(e){e.retCode?n.getList():(e.islogin||n.$alert(e.message),console.error("数据查询错误"))})},t.prototype.dodelete=function(e,t){var n,o,s=this;(n={permissionId:t.permissionId},o={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId")},Object.assign(o,n),u.n("/authority/deletepermission",o).then(function(e){return e})).then(function(e){e.retCode?s.getList():(e.islogin||s.$alert(e.message),console.error("数据查询错误"))})},t.prototype.getList=function(){var e,t,n=this;(e={},t={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId")},Object.assign(t,e),u.n("/authority/getlistpermission",t).then(function(e){return e})).then(function(e){e.retCode?(console.log(e.data),n.AuthorityList=e.data.AuthorityList):(e.islogin||n.$alert(e.message),console.error("数据查询错误"))})},t=o.a([r()({props:{},components:{}})],t)}(s.default)),c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-input",{attrs:{placeholder:"权限",clearable:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),n("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){e.doaddSubmit()}}},[e._v("新增一个权限")]),e._v("\n"+e._s(e.dohavePermission("1"))+"\n      \n"),n("el-table",{staticStyle:{width:"100%","min-height":"500px"},attrs:{border:"",data:e.AuthorityList,stripe:""}},[n("el-table-column",{attrs:{prop:"permissionId",label:"权限ID",width:"210"}}),e._v(" "),n("el-table-column",{attrs:{prop:"name",label:"权限名",width:"210"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(n){e.dodelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1)},staticRenderFns:[]};var d=n("VU/8")(l,c,!1,function(e){n("CSRs")},"data-v-3543a2ad",null);t.default=d.exports}});
//# sourceMappingURL=16.903bd8e5daea9b0a741d.js.map