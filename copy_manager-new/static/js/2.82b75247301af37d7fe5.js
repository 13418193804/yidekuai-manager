webpackJsonp([2],{"7T2t":function(t,e){},TBf1:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("TToO"),n=a("7+uW"),i=a("c+8m"),o=a.n(i),l=a("RXoh"),s=a("abZA"),p=a("PJh5"),c=a.n(p),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.allprescription=0,e.countPreByStatuObj={},e.prescriptionEnums1="name1",e.page=0,e.pageSize=10,e.total=100,e.prescriptionList=[],e.prescriptionEnums="",e.startDate="",e.endDate="",e.key="",e.operationType="Auditor",e}return r.b(e,t),e.prototype.allPrescription=function(){var t=this;l.h().then(function(e){e.retCode?(console.log(e.data),t.allprescription=e.data):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},Object.defineProperty(e.prototype,"notCount",{get:function(){return this.countPreByStatuObj.data2?this.countPreByStatuObj.data2.count:0},enumerable:!0,configurable:!0}),e.prototype.countPreByStatu=function(){var t=this;l.m({}).then(function(e){e.retCode?t.countPreByStatuObj=e.data:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.onPageChange=function(t){this.page=t-1,this.getprescriptionList()},e.prototype.handleClick=function(t){this.page=0,"name2"==this.prescriptionEnums1&&(this.prescriptionEnums=""),this.getprescriptionList()},e.prototype.getprescriptionList=function(){var t=this,e="",a="";""!=(this.startDate||"")&&(e=c()(this.startDate).format("YYYY-MM-DD")+" 00:00:00"),""!=(this.endDate||"")&&(a=c()(this.endDate).format("YYYY-MM-DD")+" 23:59:59");var r={startCreatTime:e,endCreatTime:a,key:this.key};"name1"==this.prescriptionEnums1&&(this.prescriptionEnums="ALREADY_TRANSLATED_PRESCRIPTION",Object.assign(r,{operationType:this.operationType})),Object.assign(r,{prescriptionEnums:this.prescriptionEnums}),sessionStorage.auditObject=JSON.stringify(r),Object.assign(r,{page:this.page,pageSize:this.pageSize}),l.y(r).then(function(e){e.retCode?(console.log(e.data),t.prescriptionList=e.data.list,t.total=e.data.page.total):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.allPrescription(),this.getprescriptionList(),this.countPreByStatu()},e=r.a([o()({props:{},components:{transmittable:s.a}})],e)}(n.default),d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{},[a("h3",[t._v("审方管理\n          ")]),t._v(" "),a("div",{staticStyle:{"padding-bottom":"20px"}},[a("span",{staticStyle:{"margin-right":"20px"}},[t._v("平台处方数量统计："+t._s(t.allprescription)+" 个")]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("待审方数量："+t._s(t.notCount)+" 个")])])]),t._v(" "),a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.prescriptionEnums1,callback:function(e){t.prescriptionEnums1=e},expression:"prescriptionEnums1"}},[a("el-tab-pane",{attrs:{label:"未审方",name:"name1"}},[a("div",{staticStyle:{"padding-bottom":"20px"}},[a("el-row",{staticStyle:{"padding-left":"80px"},attrs:{gutter:10}},[a("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名/处方号/手机号",clearable:""},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"500px"},attrs:{xs:16,sm:16,md:10,lg:10,xl:10}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),t._v(" "),a("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getprescriptionList()}}},[t._v("查询")])],1)],1)],1),t._v(" "),a("transmittable",{attrs:{table:t.prescriptionList,operationType:t.operationType}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"全部",name:"name2"}},[a("div",{staticStyle:{"padding-bottom":"20px"}},[a("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:10}},[a("el-form",{attrs:{"label-width":"80px",inline:!0}},[a("el-col",{attrs:{xs:24,sm:14,md:12,lg:12,xl:12}},[a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"状态"}},[a("el-select",{model:{value:t.prescriptionEnums,callback:function(e){t.prescriptionEnums=e},expression:"prescriptionEnums"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),a("el-option",{attrs:{value:"NOT_TRANSLATED_PRESCRIPTION",label:"未转方"}}),t._v(" "),a("el-option",{attrs:{value:"ALREADY_TRANSLATED_PRESCRIPTION",label:"未审方"}}),t._v(" "),a("el-option",{attrs:{value:"ALREADY_AUDIT_PRESCRIPTION",label:"已审方"}}),t._v(" "),a("el-option",{attrs:{value:"REJECT_TRANSLATED_PRESCRIPTION",label:"已驳回开方"}}),t._v(" "),a("el-option",{attrs:{value:"REJECT_AUDIT_PRESCRIPTION",label:"已驳回转方"}})],1)],1)],1)],1)],1),t._v(" "),a("el-row",{staticStyle:{"padding-left":"80px"},attrs:{gutter:10}},[a("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名/处方号/手机号",clearable:""},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"500px"},attrs:{xs:16,sm:16,md:10,lg:10,xl:10}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),t._v(" "),a("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getprescriptionList()}}},[t._v("查询")])],1)],1)],1),t._v(" "),a("transmittable",{attrs:{table:t.prescriptionList,prescriptionEnums:t.prescriptionEnums,operationType:t.operationType}})],1)],1),t._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{layout:"prev, pager, next","page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1)],1)},staticRenderFns:[]};var m=a("VU/8")(u,d,!1,function(t){a("7T2t")},"data-v-1cd258af",null);e.default=m.exports},abZA:function(t,e,a){"use strict";var r=a("TToO"),n=a("7+uW"),i=a("c+8m"),o=a.n(i),l=a("EOM2"),s=a("RXoh"),p=a("CMXh"),c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.preIndex=0,e.row={},e.model=!1,e.prescriptioninfoObj={},e.preImageList=[],e.preDrugList=[],e}return r.b(e,t),e.prototype.checkPrefor=function(t,e){s.l({preId:t}).then(function(t){t.retCode?(e(!0),console.log("这里是要检查",t.data)):(t.islogin||e(!1),console.error("数据查询错误"))})},e.prototype.handleransmit=function(t,e){sessionStorage.presId=e.presId,this.$router.push("/handleransmit")},e.prototype.handleStatus=function(t){switch(t){case"NOT_TRANSLATED_PRESCRIPTION":return"未转方";case"ALREADY_TRANSLATED_PRESCRIPTION":return"已转方";case"FAIL_TRANSLATED_PRESCRIPTION":return"转方失败";case"REJECT_TRANSLATED_PRESCRIPTION":return"已驳回开方";case"ALREADY_AUDIT_PRESCRIPTION":return"已审方";case"FAIL_AUDIT_PRESCRIPTION":return"审方失败";case"REJECT_AUDIT_PRESCRIPTION":return"/audit"==this.$route.path?"已驳回转方":"审方退回";default:return""}},e.prototype.audit=function(t,e){sessionStorage.presId=e.presId,this.$router.push("/saveaudit")},e.prototype.changeModel=function(t,e){this.row=e,this.prescriptioninfoObj=e,this.$refs.prescriptioninfo.getInfo()},e.prototype.rejectTranslation=function(){},e.prototype.mounted=function(){console.log("this.prescriptionEnums",this.prescriptionEnums),console.log("this.table",this.table)},r.a([Object(l.Prop)({required:!1}),r.c("design:type",Object)],e.prototype,"table",void 0),r.a([Object(l.Prop)({required:!1}),r.c("design:type",Object)],e.prototype,"prescriptionEnums",void 0),r.a([Object(l.Prop)({required:!1}),r.c("design:type",Object)],e.prototype,"operationType",void 0),e=r.a([o()({props:{},components:{prescriptioninfo:p.a}})],e)}(n.default),u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{staticStyle:{width:"100%","min-height":"500px"},attrs:{border:"",data:t.table,stripe:""}},[a("el-table-column",{attrs:{label:"状态",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n      "+t._s(t.handleStatus(e.row.presState))+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"createDate",label:"开方时间",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"docterName",label:"开方医生",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"doctorMobile",label:"开方医生手机号",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"hospitalName",label:"医院",width:"190"}}),t._v(" "),a("el-table-column",{attrs:{prop:"docterDept",label:"科室",width:"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"memberName",label:"患者姓名",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patientSex",label:"患者性别",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"memberAge",label:"患者年龄",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"memberPhone",label:"患者手机号",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"consigneeAddress",label:"患者地址",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patientRemake",label:"医生给患者备注",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"医生给转方备注",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"transDocName",label:"转方医生",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"transDate",label:"转方时间",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"transRemark",label:"转方备注",width:"220"}}),t._v(" "),a("el-table-column",{attrs:{prop:"auditingName",label:"审方医生",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"auditingDate",label:"审方时间",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"presId",label:"处方编号",width:"210"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){t.changeModel(e.$index,e.row)}}},[t._v("处方详情")]),t._v(" "),"NOT_TRANSLATED_PRESCRIPTION"!=e.row.presState&&"REJECT_AUDIT_PRESCRIPTION"!=e.row.presState&&"FAIL_TRANSLATED_PRESCRIPTION"!=e.row.presState||"/audit"===t.$route.path?t._e():a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.handleransmit(e.$index,e.row)}}},[t._v(" \n          "+t._s("NOT_TRANSLATED_PRESCRIPTION"!==e.row.presState?"重新转方":"转方"))]),t._v(" "),"/audit"!=t.$route.path||"ALREADY_TRANSLATED_PRESCRIPTION"!=e.row.presState&&"FAIL_AUDIT_PRESCRIPTION"!=e.row.presState?t._e():a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.audit(e.$index,e.row)}}},[t._v(t._s("FAIL_AUDIT_PRESCRIPTION"==e.row.presState?"重新审方":"审方"))])]}}])})],1),t._v(" "),a("prescriptioninfo",{ref:"prescriptioninfo",attrs:{row:t.prescriptioninfoObj}})],1)},staticRenderFns:[]};var d=a("VU/8")(c,u,!1,function(t){a("rU/C")},"data-v-1e221341",null);e.a=d.exports},"rU/C":function(t,e){}});
//# sourceMappingURL=2.82b75247301af37d7fe5.js.map