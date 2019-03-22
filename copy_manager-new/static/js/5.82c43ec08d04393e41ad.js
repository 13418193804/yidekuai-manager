webpackJsonp([5],{EN0R:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o("TToO"),r=o("7+uW"),n=o("c+8m"),l=o.n(n),i=o("FL7F"),s=o("P/kE"),p=(i.a,o("RXoh")),c=o("CMXh"),m=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.preModel=!1,t.prescriptioninfoObj={},t.prescriptionList=[],t.prepage=0,t.prepageSize=10,t.pretotal=100,t.prescriptionItem={},t.keyname="",t.form={name:"",sex:"",id_card:"",age:"",phone:"",memberId:"",remark:""},t.updateModel=!1,t.patientList=[],t.page=0,t.pageSize=10,t.total=100,t.userCount=0,t}return a.b(t,e),t.prototype.getprescriptioninfo=function(e,t){this.prescriptioninfoObj=t,this.$refs.prescriptioninfo.getInfo()},t.prototype.onprePageChange=function(e){this.prepage=e-1,this.getPrescription()},t.prototype.changePreModel=function(e,t){this.prescriptionItem=t,this.preModel=!0,this.getPrescription()},t.prototype.getPrescription=function(){var e=this;p.E({patientId:this.prescriptionItem.member_id,page:this.prepage,pageSize:this.prepageSize}).then(function(t){t.retCode?(console.log("prescriptionList",t),e.prescriptionList=t.data.list,e.pretotal=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.handleStatus=function(e){switch(e){case"NOT_TRANSLATED_PRESCRIPTION":return"未转方";case"ALREADY_TRANSLATED_PRESCRIPTION":return"已转方";case"FAIL_TRANSLATED_PRESCRIPTION":return"转方失败";case"REJECT_TRANSLATED_PRESCRIPTION":return"已驳回开方";case"ALREADY_AUDIT_PRESCRIPTION":return"已审方";case"FAIL_AUDIT_PRESCRIPTION":return"审方失败";case"REJECT_AUDIT_PRESCRIPTION":return"已驳回转方";default:return""}},t.prototype.doUpdateStatus=function(e,t){var o=this;console.log(t);var a="USE"==t.member_status?"STOP":"USE";(function(e,t){var o={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),memberid:e,memstatus:t,source:"web"};return s.n("/api/member/setmemberstatus",o).then(function(e){return e})})(t.member_id,a).then(function(e){e.retCode?o.getpatientList():(e.islogin||o.$alert(e.message),console.error("数据查询错误"))})},t.prototype.addressManager=function(e,t){sessionStorage.member_id=t.member_id,this.$router.push("/address")},t.prototype.doSubmit=function(){var e,t,o=this;this.form.idnumber=this.form.id_card,this.form.memberid=this.form.member_id,(e=this.form,t={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),source:"web"},Object.assign(t,e),s.n("/api/member/savemember",t).then(function(e){return e})).then(function(e){e.retCode?(o.$message("保存成功"),o.getpatientList(),o.updateModel=!1):(e.islogin||o.$alert(e.message),console.error("数据查询错误"))})},t.prototype.changeModel=function(e){this.updateModel=!this.updateModel;var t={};Object.assign(t,e),this.form=t},t.prototype.getpatientList=function(){var e,t,o,a,r=this;(e=this.page,t=this.pageSize,o=this.keyname,a={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),keyname:o,page:e,pageSize:t},s.n("/api/member/findmember",a).then(function(e){return e})).then(function(e){e.retCode?(r.patientList=e.data.list,r.total=e.data.page.total):(e.islogin||r.$alert(e.message),console.error("数据查询错误"))})},t.prototype.onPageChange=function(e){this.page=e-1,this.getpatientList()},t.prototype.allUserCount=function(){var e,t=this;(e={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId")},s.n("/api/member/getmembercount",e).then(function(e){return e})).then(function(e){e.retCode?t.userCount=e.data.count:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},t.prototype.mounted=function(){this.getpatientList(),this.allUserCount()},t=a.a([l()({props:{},components:{prescriptioninfo:c.a}})],t)}(r.default),u={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticStyle:{"border-bottom":"1px #e5e5e5 solid"}},[o("h3",[e._v("患者管理\n          ")]),e._v(" "),o("div",{staticStyle:{}},[e._v("\n平台患者数量统计："+e._s(e.userCount)+" 人              \n            ")]),e._v(" "),o("div",{staticStyle:{"padding-bottom":"20px"}},[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[o("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入患者姓名/身份证号/手机号码",clearable:""},model:{value:e.keyname,callback:function(t){e.keyname=t},expression:"keyname"}})],1),e._v(" "),o("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getpatientList()}}},[e._v("查询")])],1)],1)],1)]),e._v(" "),o("el-table",{staticStyle:{width:"100%","min-height":"500px"},attrs:{data:e.patientList,stripe:""}},[o("el-table-column",{attrs:{prop:"name",label:"患者姓名"}}),e._v(" "),o("el-table-column",{attrs:{prop:"sex",label:"患者性别"}}),e._v(" "),o("el-table-column",{attrs:{prop:"id_card",label:"患者身份证号",width:"150"}}),e._v(" "),o("el-table-column",{attrs:{prop:"age",label:"患者年龄"}}),e._v(" "),o("el-table-column",{attrs:{prop:"phone",label:"患者手机号码",width:"150"}}),e._v(" "),o("el-table-column",{attrs:{prop:"phone",label:"患者账号"}}),e._v(" "),o("el-table-column",{attrs:{prop:"member_status",label:"使用状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tag",{attrs:{type:"USE"==t.row.member_status?"success":"info"}},[e._v("\n               "+e._s("USE"==t.row.member_status?"启用中":"已停用"))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"#",label:"患者多地址信息",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){e.addressManager(t.$index,t.row)}}},[e._v("地址管理")])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"ordercount",label:"患者订单数量"}}),e._v(" "),o("el-table-column",{attrs:{prop:"precount",label:"患者处方数量"}}),e._v(" "),o("el-table-column",{attrs:{prop:"#",label:"备注"}}),e._v(" "),o("el-table-column",{attrs:{label:"操作",fixed:"right",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(o){e.changePreModel(t.$index,t.row)}}},[e._v("查看处方")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(o){e.handleDelete(t.$index,t.row)}}},[e._v("查看订单")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(o){e.changeModel(t.row)}}},[e._v("编辑")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(o){e.doUpdateStatus(t.$index,t.row)}}},[e._v(e._s("USE"==t.row.member_status?"停用":"启用"))])]}}])})],1),e._v(" "),o("el-col",{staticClass:"toolbar",attrs:{span:24}},[o("el-pagination",{attrs:{layout:"prev, pager, next","page-size":e.pageSize,total:e.total},on:{"current-change":e.onPageChange}})],1),e._v(" "),o("el-dialog",{attrs:{visible:e.updateModel,width:"1050px",center:"",size:"tiny",title:"编辑患者信息","close-on-click-modal":!1,top:"40px"},on:{"update:visible":function(t){e.updateModel=t}}},[o("el-form",{attrs:{"label-width":"120px"},model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},[o("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者姓名"}},[o("el-input",{attrs:{placeholder:"请输入患者姓名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),o("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者性别"}},[o("el-radio",{attrs:{label:"男"},model:{value:e.form.sex,callback:function(t){e.$set(e.form,"sex",t)},expression:"form.sex"}},[e._v("男")]),e._v(" "),o("el-radio",{attrs:{label:"女"},model:{value:e.form.sex,callback:function(t){e.$set(e.form,"sex",t)},expression:"form.sex"}},[e._v("女")])],1),e._v(" "),o("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者身份证号"}},[o("el-input",{attrs:{placeholder:"请输入患者身份证号"},model:{value:e.form.id_card,callback:function(t){e.$set(e.form,"id_card",t)},expression:"form.id_card"}})],1),e._v(" "),o("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者年龄"}},[o("el-input",{attrs:{placeholder:"请输入患者年龄"},model:{value:e.form.age,callback:function(t){e.$set(e.form,"age",t)},expression:"form.age"}})],1),e._v(" "),o("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者手机号码"}},[e._v("\n\t\t\t\t"+e._s(e.form.phone)+"\n  ")]),e._v(" "),o("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者备注"}},[o("el-input",{attrs:{placeholder:"请输入患者备注"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.updateModel=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.doSubmit}},[e._v("保存")])],1)],1),e._v(" "),o("el-dialog",{attrs:{visible:e.preModel,width:"1050px",center:"",size:"tiny",title:"患者处方","close-on-click-modal":!1,top:"40px"},on:{"update:visible":function(t){e.preModel=t}}},[o("el-table",{staticStyle:{width:"100%","min-height":"500px"},attrs:{border:"",data:e.prescriptionList,stripe:""}},[o("el-table-column",{attrs:{prop:"presId",label:"处方编号",width:"210"}}),e._v(" "),o("el-table-column",{attrs:{label:"状态",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n      "+e._s(e.handleStatus(t.row.presState))+"\n      ")]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"createDate",label:"开方时间",width:"170"}}),e._v(" "),o("el-table-column",{attrs:{prop:"docterName",label:"开方医生",width:"150"}}),e._v(" "),o("el-table-column",{attrs:{prop:"doctorMobile",label:"开方医生手机号",width:"170"}}),e._v(" "),o("el-table-column",{attrs:{prop:"hospitalName",label:"医院"}}),e._v(" "),o("el-table-column",{attrs:{prop:"docterDept",label:"科室"}}),e._v(" "),o("el-table-column",{attrs:{prop:"memberName",label:"患者姓名"}}),e._v(" "),o("el-table-column",{attrs:{prop:"patientSex",label:"患者性别"}}),e._v(" "),o("el-table-column",{attrs:{prop:"patientAge",label:"患者年龄"}}),e._v(" "),o("el-table-column",{attrs:{prop:"memberPhone",label:"患者手机号",width:"170"}}),e._v(" "),o("el-table-column",{attrs:{prop:"consigneeAddress",label:"患者地址"}}),e._v(" "),o("el-table-column",{attrs:{prop:"transDocName",label:"转方医生"}}),e._v(" "),o("el-table-column",{attrs:{prop:"transDate",label:"转方时间",width:"170"}}),e._v(" "),o("el-table-column",{attrs:{prop:"transRemark",label:"转方备注",width:"220"}}),e._v(" "),o("el-table-column",{attrs:{prop:"auditingName",label:"审方医生"}}),e._v(" "),o("el-table-column",{attrs:{prop:"auditingDate",label:"审方时间",width:"170"}}),e._v("``\n  "),o("el-table-column",{attrs:{prop:"auditingRemake",label:"审方备注",width:"220"}}),e._v(" "),o("el-table-column",{attrs:{label:"操作",fixed:"right",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(o){e.getprescriptioninfo(t.$index,t.row)}}},[e._v("处方详情")])]}}])})],1),e._v(" "),o("el-col",{staticClass:"toolbar",attrs:{span:24}},[o("el-pagination",{attrs:{layout:"prev, pager, next","page-size":e.prepageSize,total:e.pretotal},on:{"current-change":e.onprePageChange}})],1)],1),e._v(" "),o("prescriptioninfo",{ref:"prescriptioninfo",attrs:{row:e.prescriptioninfoObj}})],1)},staticRenderFns:[]};var d=o("VU/8")(m,u,!1,function(e){o("XXoe")},"data-v-eb80a0ee",null);t.default=d.exports},XXoe:function(e,t){}});
//# sourceMappingURL=5.82c43ec08d04393e41ad.js.map