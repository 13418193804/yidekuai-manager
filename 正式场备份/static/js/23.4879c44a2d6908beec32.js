webpackJsonp([23],{YXlp:function(t,e){},xZAf:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("TToO"),r=a("7+uW"),o=a("c+8m"),s=a.n(o),n=a("RXoh"),l=a("YsZW"),p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.prodeInfo=[[{title:"姓名：",value:"memberName"},{title:"性别：",value:"patientSex"},{title:"年龄：",value:"memberAge"},{title:"手机号：",value:"memberPhone"},{title:"地址：",value:"consigneeAddress"}],[{title:"医生医院：",value:"hospitalName"},{title:"科室：",value:"docterDept"},{title:"医生姓名：",value:"docterName"},{title:"医生电话：",value:"doctorMobile"},{title:"诊断：",value:"diagnose"}]],e.auditingRemake="",e.presId="",e.preDrugList=[],e.allprescription=0,e.backLoad=!1,e.countPreByStatuObj={},e.rejectContext="",e.preIndex=0,e.preImageList=[],e.prodetail={},e.leftDis=!1,e.rightDis=!1,e}return i.b(e,t),e.prototype.allPrescription=function(){var t=this;n.m().then(function(e){e.retCode?(console.log(e.data),t.allprescription=e.data):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.handleStatus=function(t){switch(t){case"NOT_TRANSLATED_PRESCRIPTION":return"未转方";case"ALREADY_TRANSLATED_PRESCRIPTION":return"已转方";case"FAIL_TRANSLATED_PRESCRIPTION":return"转方失败";case"REJECT_TRANSLATED_PRESCRIPTION":return"已驳回开方";case"ALREADY_AUDIT_PRESCRIPTION":return"已审方";case"FAIL_AUDIT_PRESCRIPTION":return"审方失败";case"REJECT_AUDIT_PRESCRIPTION":return"已驳回转方";default:return""}},e.prototype.checkPre=function(){var t=this;this.$confirm("是否同意审方？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.backLoad=!0,n.p({prescriptionId:t.presId,auditingid:sessionStorage.userId,auditingName:sessionStorage.name,auditingRemake:t.auditingRemake}).then(function(e){t.backLoad=!1,e.retCode?(t.$message("审方成功"),t.auditingRemake="",e.data.nextPresId?t.getCountForList("xia",e.data.nextPresId):t.$router.push("/audit")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})}).catch(function(){t.$message({type:"info",message:"已取消操作"})})},Object.defineProperty(e.prototype,"notCount",{get:function(){return this.countPreByStatuObj.data2?this.countPreByStatuObj.data2.count:0},enumerable:!0,configurable:!0}),e.prototype.countPreByStatu=function(){var t=this;n.t({}).then(function(e){e.retCode?t.countPreByStatuObj=e.data:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.doSubmit=function(){var t=this;this.$confirm("确定要退回审方？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.backLoad=!0,n.B({prescriptionId:t.presId,auditingName:sessionStorage.name,rejectContext:t.auditingRemake}).then(function(e){e.retCode?(t.backLoad=!1,t.$message("退回成功"),t.auditingRemake="",console.log(e),e.data.nextPresId?t.getCountForList("xia",e.data.nextPresId):t.$router.push("/audit")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})}).catch(function(){t.$message({type:"info",message:"已取消操作"})})},e.prototype.queryPresDrugback=function(){var t=this;n._13({preId:this.presId}).then(function(e){e.retCode?(console.log("处方id查询药品列表",e),t.preDrugList=e.data):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.getPrePic=function(){var t=this;n.Y({preId:this.presId}).then(function(e){e.retCode?(t.preImageList=e.data,e.data.length>0&&t.$refs.cropper.changePreImageUrl(0)):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.queryPresDetatil=function(){var t=this;n._11({preId:this.presId}).then(function(e){e.retCode?t.prodetail=e.data:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.getCountForList=function(t,e){var a=this;if(this.backLoad=!0,!sessionStorage.auditObject||0==sessionStorage.auditObject.length)return this.backLoad=!1,this.leftDis=!0,this.rightDis=!0,void this.$message("请到审方客服页面刷新后再操作");var i=JSON.parse(sessionStorage.auditObject);Object.assign(i,{presId:sessionStorage.presId}),n.L(i).then(function(i){if(i.retCode){if(e)return sessionStorage.presId=e,void a.init();a.leftDis=!i.data.Frist,a.rightDis=!i.data.Third,"shang"==t&&i.data.Frist&&(sessionStorage.presId=i.data.Frist.presId,a.rightDis=!1),"xia"==t&&i.data.Third&&(sessionStorage.presId=i.data.Third.presId,a.leftDis=!1),a.init()}else i.islogin||a.$alert(i.message),console.error("数据查询错误"),a.backLoad=!1})},e.prototype.init=function(){var t=this;this.backLoad=!0,console.log(sessionStorage.presId),this.presId=sessionStorage.presId,this.queryPresDrugback(),this.getPrePic(),this.queryPresDetatil(),this.countPreByStatu(),this.allPrescription(),this.backLoad=!1,setTimeout(function(){t.backLoad&&(t.backLoad=!1)},5e3)},e.prototype.mounted=function(){this.presId=sessionStorage.presId,this.queryPresDrugback(),this.getPrePic(),this.queryPresDetatil(),this.countPreByStatu(),this.allPrescription()},e=i.a([s()({props:{},components:{corpperlabel:l.a}})],e)}(r.default),c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.backLoad,expression:"backLoad"}]},[a("div",{staticStyle:{display:"flex","align-items":"center",padding:"20px 0"}},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{staticStyle:{"font-weight":"600","font-size":"20px",color:"#2c3e50"},attrs:{to:{path:"/audit"}}},[a("span",{staticClass:"fllll",staticStyle:{cursor:"pointer"}},[t._v("审方管理")])]),t._v(" "),a("el-breadcrumb-item",{staticStyle:{"font-size":"16px","line-height":"20px",color:"#2c3e50"}},[a("span",{staticClass:"fllll"},[t._v("审方工作台")])])],1),t._v(" "),a("div",[a("span",{staticStyle:{"margin-right":"10px"}},[t._v("平台处方数量统计 "+t._s(t.allprescription)+" 个")]),t._v(" "),a("span",[t._v("  待审方数量 "+t._s(t.notCount)+" 个")])])],1),t._v(" "),a("div",{staticStyle:{"text-align":"right",float:"right"}},[a("el-button",{attrs:{size:"small",type:"primary",disabled:t.leftDis,icon:"el-icon-arrow-left"},on:{click:function(e){t.getCountForList("shang")}}},[t._v("上一条")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"primary",disabled:t.rightDis},on:{click:function(e){t.getCountForList("xia")}}},[t._v("下一条"),a("i",{staticClass:"el-icon-arrow-right"})])],1),t._v(" "),a("div",{staticClass:"flex flex-warp-justify",staticStyle:{"margin-top":"10px"}},[a("h4",{staticStyle:{margin:"0"}},[t._v("处方状态：")]),t._v(" "),a("div",[t._v("\n    "+t._s(t.handleStatus(t.prodetail.presState))+"\n")])]),t._v(" "),a("div",{staticStyle:{"font-size":"14.8px",display:"flex","flex-wrap":"wrap"}},[a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    开方时间："+t._s(t.prodetail.createDate)+"\n    ")]),t._v(" "),a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    医生给患者备注："+t._s(t.prodetail.patientRemake)+"\n    ")]),t._v(" "),a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    医生给转方备注："+t._s(t.prodetail.remark)+"\n    ")])]),t._v(" "),a("div",{staticStyle:{"font-size":"14.8px",display:"flex","flex-wrap":"wrap"}},["NOT_TRANSLATED_PRESCRIPTION"!=t.prodetail.presState?a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    转方时间："+t._s(t.prodetail.transDate)+"\n    ")]):t._e(),t._v(" "),"NOT_TRANSLATED_PRESCRIPTION"!=t.prodetail.presState?a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    转方医生："+t._s(t.prodetail.transDocName)+"\n    ")]):t._e(),t._v(" "),"NOT_TRANSLATED_PRESCRIPTION"!=t.prodetail.presState?a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    转方备注："+t._s(t.prodetail.transRemark)+"\n    ")]):t._e()]),t._v(" "),a("div",{staticStyle:{"font-size":"14.8px",display:"flex","flex-wrap":"wrap"}},["REJECT_TRANSLATED_PRESCRIPTION"==t.prodetail.presState?a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    转方退回时间："+t._s(t.prodetail.rejectTransTime)+"\n    ")]):t._e(),t._v(" "),"REJECT_TRANSLATED_PRESCRIPTION"==t.prodetail.presState?a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    转方退回医生："+t._s(t.prodetail.rejectTranName)+"\n    ")]):t._e(),t._v(" "),"REJECT_TRANSLATED_PRESCRIPTION"==t.prodetail.presState?a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    转方退回原因："+t._s(t.prodetail.returnReason)+"\n    ")]):t._e()]),t._v(" "),a("div",{staticStyle:{"font-size":"14.8px",display:"flex","flex-wrap":"wrap"}},["NOT_TRANSLATED_PRESCRIPTION"!=t.prodetail.presState&&"REJECT_AUDIT_PRESCRIPTION"!=t.prodetail.presState&&"REJECT_TRANSLATED_PRESCRIPTION"!=t.prodetail.presState&&"ALREADY_TRANSLATED_PRESCRIPTION"!=t.prodetail.presState?a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    审方时间："+t._s(t.prodetail.auditingDate)+"\n    ")]):t._e(),t._v(" "),"NOT_TRANSLATED_PRESCRIPTION"!=t.prodetail.presState&&"REJECT_AUDIT_PRESCRIPTION"!=t.prodetail.presState&&"ALREADY_TRANSLATED_PRESCRIPTION"!=t.prodetail.presState?a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    审方医生："+t._s(t.prodetail.transDocName)+"\n    ")]):t._e()]),t._v(" "),a("div",{staticStyle:{"font-size":"14.8px",display:"flex","flex-wrap":"wrap"}},["REJECT_AUDIT_PRESCRIPTION"==t.prodetail.presState||t.prodetail.rejectAuditTime?a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    审方退回时间："+t._s(t.prodetail.rejectAuditTime)+"\n    ")]):t._e(),t._v(" "),"REJECT_AUDIT_PRESCRIPTION"==t.prodetail.presState||t.prodetail.rejectAuditTime?a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    审方退回医生："+t._s(t.prodetail.rejectAuditName)+"\n    ")]):t._e(),t._v(" "),"REJECT_AUDIT_PRESCRIPTION"==t.prodetail.presState||t.prodetail.rejectAuditTime?a("div",{staticStyle:{"margin-top":"10px","margin-bottom":"10px","margin-right":"10px"}},[t._v("\n    审方退回原因："+t._s(t.prodetail.rejectAuditReason)+"\n    ")]):t._e()]),t._v(" "),t._l(t.prodeInfo,function(e,i){return a("div",[a("h4",{staticStyle:{margin:"10px 0"}},[t._v(t._s(0==i?"患者信息":"医生信息"))]),t._v(" "),a("div",{staticStyle:{display:"flex","flex-wrap":"wrap","margin-bottom":"10px"}},t._l(e,function(e){return a("div",{staticStyle:{"margin-top":"10px","margin-right":"10px"}},[a("span",[t._v(t._s(e.title))]),t._v(" "),a("span",[t._v(t._s(t.prodetail[e.value]))])])}))])}),t._v(" "),a("el-row",{staticStyle:{padding:"20px 0"},attrs:{gutter:24}},[a("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[a("corpperlabel",{ref:"cropper",attrs:{preImageList:t.preImageList}})],1),t._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.preDrugList,stripe:"",height:500}},[a("el-table-column",{attrs:{fixed:"left",prop:"hisCode",label:"批准文号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"drugName",label:"药品名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"partnerName",label:"供应商"}}),t._v(" "),a("el-table-column",{attrs:{prop:"packingUnit",label:"单位"}}),t._v(" "),a("el-table-column",{attrs:{prop:"dosageforms",label:"剂型"}}),t._v(" "),a("el-table-column",{attrs:{prop:"specification",label:"药品规格"}}),t._v(" "),a("el-table-column",{attrs:{prop:"usages",label:"用法"}}),t._v(" "),a("el-table-column",{attrs:{prop:"dosage",label:"用量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"instructions",label:"使用说明"}}),t._v(" "),a("el-table-column",{attrs:{prop:"frequency",label:"频次"}}),t._v(" "),a("el-table-column",{attrs:{prop:"quantity",label:"数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"药品价格"}}),t._v(" "),a("el-table-column",{attrs:{prop:"shouldpay",label:"药品合计"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createDate",label:"提交时间"}})],1),t._v(" "),a("div",{staticStyle:{padding:"10px","font-size":"14.8px"}},[a("div",[t._v("药品合计："),a("span",{staticStyle:{color:"red"}},[t._v("￥"+t._s(t.prodetail.presscriptionMoney))])]),t._v(" "),a("div",[t._v("服务费："),a("span",{staticStyle:{color:"red"}},[t._v("￥"+t._s(t.prodetail.serviceMoney))])]),t._v(" "),a("div",[t._v("合计："),a("span",{staticStyle:{color:"red"}},[t._v("￥"+t._s(t.prodetail.orderMoney))])])]),t._v(" "),a("div",{staticStyle:{"text-align":"right"}},[a("el-input",{attrs:{type:"textarea",rows:4,placeholder:"退回原因"},model:{value:t.auditingRemake,callback:function(e){t.auditingRemake=e},expression:"auditingRemake"}})],1),t._v(" "),a("div",{staticStyle:{display:"flex","justify-content":"space-between",padding:"10px"}},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.doSubmit()}}},[t._v("退回")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.checkPre()}}},[t._v("通过")])],1)],1)],1)],2)},staticRenderFns:[]};var d=a("VU/8")(p,c,!1,function(t){a("YXlp")},"data-v-24a7660d",null);e.default=d.exports}});
//# sourceMappingURL=23.4879c44a2d6908beec32.js.map