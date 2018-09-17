webpackJsonp([19],{"8eLT":function(e,t){},EN0R:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("TToO"),a=r("7+uW"),n=r("c+8m"),i=r.n(n),l=r("FL7F"),s=r("P/kE"),p=(l.a,r("RXoh")),c=r("CMXh"),d=r("vkqf"),m=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.orderModel=!1,t.patientOrderList=[],t.orderpage=0,t.orderageSize=10,t.ordertotal=100,t.member_id="",t.preModel=!1,t.prescriptioninfoObj={},t.prescriptionList=[],t.prepage=0,t.prepageSize=10,t.pretotal=100,t.prescriptionItem={},t.keyname="",t.form={name:"",sex:"",id_card:"",age:"",phone:"",memberId:"",remark:""},t.updateModel=!1,t.patientList=[],t.page=0,t.pageSize=10,t.total=100,t.userCount=0,t}return o.b(t,e),t.prototype.onorderPageChange=function(e){this.prepage=e-1,this.getOrderList()},t.prototype.changeOrderModel=function(e,t){this.orderModel=!0,this.member_id=t.member_id,this.getOrderList()},t.prototype.getOrderList=function(){var e=this;p.v({memberId:this.member_id,page:this.orderpage,pageSize:this.orderageSize}).then(function(t){t.retCode?e.patientOrderList=t.data.data:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.getprescriptioninfo=function(e,t){this.prescriptioninfoObj=t,this.$refs.prescriptioninfo.getInfo()},t.prototype.onprePageChange=function(e){this.prepage=e-1,this.getPrescription()},t.prototype.changePreModel=function(e,t){this.prescriptionItem=t,this.preModel=!0,this.getPrescription()},t.prototype.getPrescription=function(){var e=this;p.E({patientId:this.prescriptionItem.member_id,page:this.prepage,pageSize:this.prepageSize}).then(function(t){t.retCode?(console.log("prescriptionList",t),e.prescriptionList=t.data.list,e.pretotal=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.handleStatus=function(e){switch(e){case"NOT_TRANSLATED_PRESCRIPTION":return"未转方";case"ALREADY_TRANSLATED_PRESCRIPTION":return"已转方";case"FAIL_TRANSLATED_PRESCRIPTION":return"转方失败";case"REJECT_TRANSLATED_PRESCRIPTION":return"已驳回开方";case"ALREADY_AUDIT_PRESCRIPTION":return"已审方";case"FAIL_AUDIT_PRESCRIPTION":return"审方失败";case"REJECT_AUDIT_PRESCRIPTION":return"已驳回转方";default:return""}},t.prototype.doUpdateStatus=function(e,t){var r=this;console.log(t);var o="USE"==t.member_status?"STOP":"USE";(function(e,t){var r={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),memberid:e,memstatus:t,source:"web"};return s.n("/api/member/setmemberstatus",r).then(function(e){return e})})(t.member_id,o).then(function(e){e.retCode?r.getpatientList():(e.islogin||r.$alert(e.message),console.error("数据查询错误"))})},t.prototype.addressManager=function(e,t){sessionStorage.member_id=t.member_id,this.$router.push("/address")},t.prototype.doSubmit=function(){var e,t,r=this;this.form.idnumber=this.form.id_card,this.form.memberid=this.form.member_id,(e=this.form,t={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),source:"web"},Object.assign(t,e),s.n("/api/member/savemember",t).then(function(e){return e})).then(function(e){e.retCode?(r.$message("保存成功"),r.getpatientList(),r.updateModel=!1):(e.islogin||r.$alert(e.message),console.error("数据查询错误"))})},t.prototype.changeModel=function(e){this.updateModel=!this.updateModel;var t={};Object.assign(t,e),this.form=t},t.prototype.getpatientList=function(){var e,t,r,o,a=this;(e=this.page,t=this.pageSize,r=this.keyname,o={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),keyname:r,page:e,pageSize:t},s.n("/api/member/findmember",o).then(function(e){return e})).then(function(e){e.retCode?(a.patientList=e.data.list,a.total=e.data.page.total):(e.islogin||a.$alert(e.message),console.error("数据查询错误"))})},t.prototype.onPageChange=function(e){this.page=e-1,this.getpatientList()},t.prototype.allUserCount=function(){var e,t=this;(e={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId")},s.n("/api/member/getmembercount",e).then(function(e){return e})).then(function(e){e.retCode?t.userCount=e.data.count:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},t.prototype.mounted=function(){this.getpatientList(),this.allUserCount()},t=o.a([i()({props:{},components:{prescriptioninfo:c.a,remindertable:d.a}})],t)}(a.default),u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticStyle:{"border-bottom":"1px #e5e5e5 solid"}},[r("h3",[e._v("患者管理\n          ")]),e._v(" "),r("div",{staticStyle:{}},[e._v("\n平台患者数量统计："+e._s(e.userCount)+" 人              \n            ")]),e._v(" "),r("div",{staticStyle:{"padding-bottom":"20px"}},[r("el-row",{attrs:{gutter:10}},[r("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[r("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入患者姓名/身份证号/手机号码",clearable:""},model:{value:e.keyname,callback:function(t){e.keyname=t},expression:"keyname"}})],1),e._v(" "),r("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[r("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getpatientList()}}},[e._v("查询")])],1)],1)],1)]),e._v(" "),r("el-table",{staticStyle:{width:"100%","min-height":"500px"},attrs:{data:e.patientList,stripe:""}},[r("el-table-column",{attrs:{prop:"name",label:"患者姓名"}}),e._v(" "),r("el-table-column",{attrs:{prop:"sex",label:"患者性别"}}),e._v(" "),r("el-table-column",{attrs:{prop:"id_card",label:"患者身份证号",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{prop:"age",label:"患者年龄"}}),e._v(" "),r("el-table-column",{attrs:{prop:"phone",label:"患者手机号码",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{prop:"phone",label:"患者账号"}}),e._v(" "),r("el-table-column",{attrs:{prop:"member_status",label:"使用状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tag",{attrs:{type:"USE"==t.row.member_status?"success":"info"}},[e._v("\n               "+e._s("USE"==t.row.member_status?"启用中":"已停用"))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"#",label:"患者多地址信息",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){e.addressManager(t.$index,t.row)}}},[e._v("地址管理")])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"ordercount",label:"患者订单数量"}}),e._v(" "),r("el-table-column",{attrs:{prop:"precount",label:"患者处方数量"}}),e._v(" "),r("el-table-column",{attrs:{prop:"#",label:"备注"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",fixed:"right",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(r){e.changePreModel(t.$index,t.row)}}},[e._v("查看处方")]),e._v(" "),r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(r){e.changeOrderModel(t.$index,t.row)}}},[e._v("查看订单")]),e._v(" "),r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(r){e.changeModel(t.row)}}},[e._v("编辑")]),e._v(" "),r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(r){e.doUpdateStatus(t.$index,t.row)}}},[e._v(e._s("USE"==t.row.member_status?"停用":"启用"))])]}}])})],1),e._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{attrs:{layout:"prev, pager, next","page-size":e.pageSize,total:e.total},on:{"current-change":e.onPageChange}})],1),e._v(" "),r("el-dialog",{attrs:{visible:e.updateModel,width:"1050px",center:"",size:"tiny",title:"编辑患者信息","close-on-click-modal":!1,top:"40px"},on:{"update:visible":function(t){e.updateModel=t}}},[r("el-form",{attrs:{"label-width":"120px"},model:{value:e.form,callback:function(t){e.form=t},expression:"form"}},[r("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者姓名"}},[r("el-input",{attrs:{placeholder:"请输入患者姓名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),r("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者性别"}},[r("el-radio",{attrs:{label:"男"},model:{value:e.form.sex,callback:function(t){e.$set(e.form,"sex",t)},expression:"form.sex"}},[e._v("男")]),e._v(" "),r("el-radio",{attrs:{label:"女"},model:{value:e.form.sex,callback:function(t){e.$set(e.form,"sex",t)},expression:"form.sex"}},[e._v("女")])],1),e._v(" "),r("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者身份证号"}},[r("el-input",{attrs:{placeholder:"请输入患者身份证号"},model:{value:e.form.id_card,callback:function(t){e.$set(e.form,"id_card",t)},expression:"form.id_card"}})],1),e._v(" "),r("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者年龄"}},[r("el-input",{attrs:{placeholder:"请输入患者年龄"},model:{value:e.form.age,callback:function(t){e.$set(e.form,"age",t)},expression:"form.age"}})],1),e._v(" "),r("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者手机号码"}},[e._v("\n\t\t\t\t"+e._s(e.form.phone)+"\n  ")]),e._v(" "),r("el-form-item",{staticStyle:{"max-width":"400px"},attrs:{label:"患者备注"}},[r("el-input",{attrs:{placeholder:"请输入患者备注"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.updateModel=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.doSubmit}},[e._v("保存")])],1)],1),e._v(" "),r("el-dialog",{attrs:{visible:e.preModel,width:"1050px",center:"",size:"tiny",title:"患者处方","close-on-click-modal":!1,top:"40px"},on:{"update:visible":function(t){e.preModel=t}}},[r("el-table",{staticStyle:{width:"100%","min-height":"500px"},attrs:{border:"",data:e.prescriptionList,stripe:""}},[r("el-table-column",{attrs:{prop:"presId",label:"处方编号",width:"210"}}),e._v(" "),r("el-table-column",{attrs:{label:"状态",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n      "+e._s(e.handleStatus(t.row.presState))+"\n      ")]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"createDate",label:"开方时间",width:"170"}}),e._v(" "),r("el-table-column",{attrs:{prop:"docterName",label:"开方医生",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{prop:"doctorMobile",label:"开方医生手机号",width:"170"}}),e._v(" "),r("el-table-column",{attrs:{prop:"hospitalName",label:"医院"}}),e._v(" "),r("el-table-column",{attrs:{prop:"docterDept",label:"科室"}}),e._v(" "),r("el-table-column",{attrs:{prop:"memberName",label:"患者姓名"}}),e._v(" "),r("el-table-column",{attrs:{prop:"patientSex",label:"患者性别"}}),e._v(" "),r("el-table-column",{attrs:{prop:"patientAge",label:"患者年龄"}}),e._v(" "),r("el-table-column",{attrs:{prop:"memberPhone",label:"患者手机号",width:"170"}}),e._v(" "),r("el-table-column",{attrs:{prop:"consigneeAddress",label:"患者地址"}}),e._v(" "),r("el-table-column",{attrs:{prop:"transDocName",label:"转方医生"}}),e._v(" "),r("el-table-column",{attrs:{prop:"transDate",label:"转方时间",width:"170"}}),e._v(" "),r("el-table-column",{attrs:{prop:"transRemark",label:"转方备注",width:"220"}}),e._v(" "),r("el-table-column",{attrs:{prop:"auditingName",label:"审方医生"}}),e._v(" "),r("el-table-column",{attrs:{prop:"auditingDate",label:"审方时间",width:"170"}}),e._v(" "),r("el-table-column",{attrs:{prop:"auditingRemake",label:"审方备注",width:"220"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",fixed:"right",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(r){e.getprescriptioninfo(t.$index,t.row)}}},[e._v("处方详情")])]}}])})],1),e._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{attrs:{layout:"prev, pager, next","page-size":e.prepageSize,total:e.pretotal},on:{"current-change":e.onprePageChange}})],1)],1),e._v(" "),r("prescriptioninfo",{ref:"prescriptioninfo",attrs:{row:e.prescriptioninfoObj}}),e._v(" "),r("el-dialog",{attrs:{visible:e.orderModel,width:"1050px",center:"",size:"tiny",title:"患者订单","close-on-click-modal":!1,top:"40px"},on:{"update:visible":function(t){e.orderModel=t}}},[r("remindertable",{ref:"remindertable",attrs:{orderList:e.patientOrderList,pagetype:"patient"},on:{getOrderList:e.getOrderList}}),e._v(" "),r("el-pagination",{attrs:{layout:"prev, pager, next","page-size":e.orderageSize,total:e.ordertotal},on:{"current-change":e.onorderPageChange}})],1)],1)},staticRenderFns:[]};var b=r("VU/8")(m,u,!1,function(e){r("8eLT")},"data-v-0e07244c",null);t.default=b.exports}});
//# sourceMappingURL=19.dc85389ce337e75dc068.js.map