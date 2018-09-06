webpackJsonp([8],{"de+h":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("TToO"),i=r("7+uW"),s=r("c+8m"),o=r.n(s),n=r("RXoh"),l=r("2oAx"),c=r("YsZW"),d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.prodeInfo=[{title:"姓名：",value:"memberName"},{title:"性别：",value:"patientSex"},{title:"年龄：",value:"patientAge"},{title:"科室：",value:"docterDept"},{title:"地址：",value:"consigneeAddress"},{title:"医生姓名：",value:"transDocName"},{title:"医生电话：",value:"doctorMobile"},{title:"医生医院：",value:"hospitalName"}],e.usagesList=[],e.frequencyList=[],e.backLoad=!1,e.dosageList=[],e.filterdrugModel=!1,e.drug={},e.allprescription=0,e.instructions="",e.model=!1,e.countPreByStatuObj={},e.loading=!1,e.orderMoney=0,e.serviceMoney=0,e.preIndex=0,e.preDrugList=[],e.tranRemake="",e.preImageList=[],e.presId="",e.prodetail={},e.specificationList=[],e.partnerNameList=[],e.options4=[],e.value9=[],e.list=[],e.drugList=[],e.leftDis=!1,e.rightDis=!1,e}return a.b(e,t),e.prototype.selectDrug=function(t){var e=this.options4.filter(function(e){return t==e.drugId});this.drug.commonName=e[0].commonName,this.drug.hisCode=e[0].hisCode,this.commonList()},e.prototype.selectSpecification=function(){console.log("改变规格"),this.commonList()},e.prototype.changePartnerName=function(){console.log("改变供应商"),this.commonList()},e.prototype.commonList=function(){var t=this,e={commonName:this.drug.commonName};this.drug.specification&&Object.assign(e,{specification:this.drug.specification}),this.drug.partnerObj&&Object.assign(e,{partnerName:this.drug.partnerObj.partnerName}),n.z(e).then(function(e){e.retCode?(console.log(e.data),e.data.specificationList&&(t.specificationList=e.data.specificationList),e.data.partnerNameList&&(t.partnerNameList=e.data.partnerNameList),e.data.usagesList&&(t.usagesList=e.data.usagesList,t.drug.usages=e.data.usagesList[0]?e.data.usagesList[0]:""),e.data.dosageList&&(t.dosageList=e.data.dosageList,t.drug.dosage=e.data.dosageList[0]?e.data.dosageList[0]:""),e.data.frequencyList&&(t.frequencyList=e.data.frequencyList,t.drug.frequency=e.data.frequencyList[0]?e.data.frequencyList[0]:"")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.changeModel=function(){this.filterdrugModel=!this.filterdrugModel},e.prototype.allPrescription=function(){var t=this;n.g().then(function(e){e.retCode?(console.log(e.data),t.allprescription=e.data):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},Object.defineProperty(e.prototype,"notCount",{get:function(){return this.countPreByStatuObj.data5?this.countPreByStatuObj.data5.count:0},enumerable:!0,configurable:!0}),e.prototype.handleStatus=function(t){switch(t){case"NOT_TRANSLATED_PRESCRIPTION":return"未转方";case"ALREADY_TRANSLATED_PRESCRIPTION":return"已转方";case"FAIL_TRANSLATED_PRESCRIPTION":return"转方失败";case"REJECT_TRANSLATED_PRESCRIPTION":return"已驳回开方";case"ALREADY_AUDIT_PRESCRIPTION":return"已审方";case"FAIL_AUDIT_PRESCRIPTION":return"审方失败";case"REJECT_AUDIT_PRESCRIPTION":return"/saveaudit"==this.$route.path?"已驳回转方":"审方退回";default:return""}},e.prototype.doSubmit=function(){var t=this;this.$confirm("确定退回该处方给开方医生?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.backLoad=!0,n.p({prescriptionId:t.presId,rejectContext:t.tranRemake}).then(function(e){t.backLoad=!1,e.retCode?(t.$message("退回成功"),t.tranRemake="",t.getCountForList("xia",!0)):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})}).catch(function(){t.$message({type:"info",message:"已取消操作"})})},e.prototype.countPreByStatu=function(){var t=this;n.j({}).then(function(e){e.retCode?t.countPreByStatuObj=e.data:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.selectRow=function(){var t={};Object.assign(t,this.$refs.filterdrug.row),this.drug=t,this.drug.price=t.guidance,this.filterdrugModel=!1},e.prototype.deletePreDrug=function(t,e){var r=this;this.$confirm("把该药品从处方单中移除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.l({preDrugId:e.prescriptionDrugId}).then(function(t){t.retCode?(r.$message("已删除一条药品记录"),r.queryPresDrug()):(t.islogin||r.$alert(t.message),console.error("数据查询错误"))})}).catch(function(){r.$message({type:"info",message:"已取消操作"})})},e.prototype.docreateDrug=function(){var t=this;!this.drug.quantity||this.drug.quantity<=0?this.$alert("请输入药品数量"):-1==this.drug.quantity.indexOf(".")?!this.drug.price||this.drug.price<0?this.$alert("请输入药品金额"):(this.drug.partnerName=this.drug.partnerObj.partnerName,this.drug.partnerId=this.drug.partnerObj.partnerId,this.drug.preId=this.presId,this.drug.drugName=this.drug.commonName,this.drug.guidance=this.drug.price,this.drug.instructions=this.instructions,this.loading=!0,n.s(this.drug).then(function(e){t.loading=!1,e.retCode?(t.drug={},t.instructions="",t.queryPresDrug(),console.log(e)):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})):this.$alert("请输入正确的药品数量")},e.prototype.queryPresDrug=function(){var t=this;n.I({preId:this.presId}).then(function(e){e.retCode?(console.log(e.data),t.preDrugList=e.data.data,t.orderMoney=e.data.orderMoney,t.serviceMoney=e.data.serviceMoney):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.dotransmit=function(){var t=this;console.log("转方"),console.log("药品数",this.preDrugList.length),0!=this.preDrugList.length?this.$confirm("药品填写完成?现在开始转方?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.backLoad=!0;var e=[];t.preDrugList.forEach(function(r,a){e.push(r.prescriptionDrugId),e.length==t.preDrugList.length&&n.t({temporaryPrescriptiondrugId:e.join(","),prescriptionId:t.presId,tranRemake:t.tranRemake,changeName:sessionStorage.name,changeId:sessionStorage.merchantUserId}).then(function(e){t.backLoad=!1,e.retCode?(t.$message("转方成功"),t.tranRemake="",t.getCountForList("xia",!0)):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})})}).catch(function(){t.$message({type:"info",message:"已取消操作"})}):this.$alert("至少添加一条药品信息")},e.prototype.getPrePic=function(){var t=this;n.C({preId:this.presId}).then(function(e){e.retCode?(t.preImageList=e.data,e.data.length>0&&t.$refs.cropper.changePreImageUrl(0)):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.queryPresDetatil=function(){var t=this;n.H({preId:this.presId}).then(function(e){e.retCode?t.prodetail=e.data:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.remoteMethod=function(t){var e=this;void 0!=t&&null!=t&&(""!==t?(this.loading=!0,setTimeout(function(){e.loading=!1,e.getDrugList(t),console.log(t)},200)):this.options4=[])},e.prototype.getDrugList=function(t){var e=this;n.y({keyFName:t}).then(function(t){t.retCode?e.options4=t.data.list:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.getCountForList=function(t,e){var r=this;if(this.backLoad=!0,!sessionStorage.tranObject||0==sessionStorage.tranObject.length)return this.backLoad=!1,this.leftDis=!0,this.rightDis=!0,void this.$message("请到转方客服页面刷新后再操作");var a=JSON.parse(sessionStorage.tranObject);Object.assign(a,{presId:sessionStorage.presId}),n.u(a).then(function(a){a.retCode?(e&&(a.data.Third?t="xia":a.data.Frist?t="shang":r.$router.push("/transmit")),r.leftDis=!a.data.Frist,r.rightDis=!a.data.Third,"shang"==t&&a.data.Frist&&(sessionStorage.presId=a.data.Frist.presId,r.rightDis=!1),"xia"==t&&a.data.Third&&(sessionStorage.presId=a.data.Third.presId,r.leftDis=!1),r.init()):(a.islogin||r.$alert(a.message),console.error("数据查询错误"),r.backLoad=!1)})},e.prototype.init=function(){var t=this;this.backLoad=!0,console.log(sessionStorage.presId),this.presId=sessionStorage.presId,this.queryPresDrug(),this.getPrePic(),this.queryPresDetatil(),this.countPreByStatu(),this.allPrescription(),this.backLoad=!1,this.drug={},this.instructions="",setTimeout(function(){t.backLoad&&(t.backLoad=!1)},5e3)},e.prototype.mounted=function(){this.init()},e=a.a([o()({props:{},components:{filterdrug:l.a,corpperlabel:c.a}})],e)}(i.default),u={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.backLoad,expression:"backLoad"}]},[r("div",{staticStyle:{display:"flex","align-items":"center",padding:"20px 0"}},[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{staticStyle:{"font-weight":"600","font-size":"20px",color:"#2c3e50"},attrs:{to:{path:"/transmit"}}},[r("span",{staticClass:"fllll",staticStyle:{cursor:"pointer"}},[t._v("转方管理")])]),t._v(" "),r("el-breadcrumb-item",{staticStyle:{"font-size":"16px","line-height":"20px",color:"#2c3e50"}},[r("span",{staticClass:"fllll"},[t._v("转方工作台")])])],1)],1),t._v(" "),r("div",[r("span",{staticStyle:{"margin-right":"10px"}},[t._v("平台处方数量统计 "+t._s(t.allprescription)+" 个")]),t._v(" "),r("span",[t._v(" 待转方数量 "+t._s(t.notCount)+" 个")])]),t._v(" "),r("div",{staticStyle:{"text-align":"right",float:"right"}},[r("el-button",{attrs:{size:"small",type:"primary",disabled:t.leftDis,icon:"el-icon-arrow-left"},on:{click:function(e){t.getCountForList("shang")}}},[t._v("上一条")]),t._v(" "),r("el-button",{attrs:{size:"small",type:"primary",disabled:t.rightDis},on:{click:function(e){t.getCountForList("xia")}}},[t._v("下一条"),r("i",{staticClass:"el-icon-arrow-right"})])],1),t._v(" "),r("div",{staticStyle:{"margin-top":"20px"}},[r("div",{staticStyle:{display:"flex","flex-wrap":"wrap","margin-bottom":"10px"}},[r("div",{staticStyle:{"margin-top":"10px","margin-right":"10px"}},[t._v("\n处方状态："+t._s(t.handleStatus(t.prodetail.presState))+"\n")]),t._v(" "),r("div",{staticStyle:{"margin-top":"10px","margin-right":"10px"}},[t._v("\n    医生备注："+t._s(t.prodetail.remark)+"\n    ")]),t._v(" "),"REJECT_AUDIT_PRESCRIPTION"==t.prodetail.presState?r("div",{staticStyle:{"margin-top":"10px","margin-right":"10px"}},[t._v("审方退回原因："+t._s(t.prodetail.rejectAuditReason))]):t._e(),t._v(" "),"REJECT_AUDIT_PRESCRIPTION"==t.prodetail.presState?r("div",{staticStyle:{"margin-top":"10px","margin-right":"10px"}},[t._v("审方退回时间："+t._s(t.prodetail.rejectAuditTime))]):t._e()])]),t._v(" "),r("h4",{staticStyle:{margin:"10px 0"}},[t._v("患者信息")]),t._v(" "),r("div",{staticStyle:{display:"flex","flex-wrap":"wrap","margin-bottom":"10px"}},t._l(t.prodeInfo,function(e,a){return r("div",{staticStyle:{"margin-top":"10px","margin-right":"10px"}},[r("span",[t._v(t._s(e.title))]),t._v(" "),r("span",[t._v(t._s(t.prodetail[e.value]))])])})),t._v(" "),r("el-row",{staticStyle:{padding:"0 0 20px"},attrs:{gutter:24}},[r("el-col",{attrs:{xs:24,sm:24,md:12,lg:12,xl:12}},[r("corpperlabel",{ref:"cropper",attrs:{preImageList:t.preImageList}})],1),t._v(" "),r("el-col",{attrs:{xs:24,sm:24,md:12,lg:10,xl:8}},[r("el-form",{attrs:{"label-width":"120px"}},[r("el-form-item",{attrs:{label:"药品名称："}},[r("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",remote:"",placeholder:"请输入药品","remote-method":t.remoteMethod,loading:t.loading},on:{change:t.selectDrug},model:{value:t.drug.drugId,callback:function(e){t.$set(t.drug,"drugId",e)},expression:"drug.drugId"}},t._l(t.options4,function(t){return r("el-option",{key:t.drugId,attrs:{label:t.commonName+"/"+t.productName+"/"+t.specification+"/"+t.manufacturer,value:t.drugId}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"药品规格："}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请输入药品规格",loading:t.loading},on:{change:t.selectSpecification},model:{value:t.drug.specification,callback:function(e){t.$set(t.drug,"specification",e)},expression:"drug.specification"}},t._l(t.specificationList,function(t){return r("el-option",{key:t.specification,attrs:{label:t,value:t}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"供应商："}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请输入供应商",loading:t.loading},on:{change:t.changePartnerName},model:{value:t.drug.partnerObj,callback:function(e){t.$set(t.drug,"partnerObj",e)},expression:"drug.partnerObj"}},t._l(t.partnerNameList,function(t){return r("el-option",{key:t,attrs:{label:t.partnerName,value:t}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"用法："}},[r("el-input",{attrs:{placeholder:"请输入用法",clearable:""},model:{value:t.drug.usages,callback:function(e){t.$set(t.drug,"usages",e)},expression:"drug.usages"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"单次用量："}},[r("el-input",{attrs:{placeholder:"请输入单次用量",clearable:""},model:{value:t.drug.dosage,callback:function(e){t.$set(t.drug,"dosage",e)},expression:"drug.dosage"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"频次："}},[r("el-input",{attrs:{placeholder:"请输入频次",clearable:""},model:{value:t.drug.frequency,callback:function(e){t.$set(t.drug,"frequency",e)},expression:"drug.frequency"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"使用说明："}},[r("el-input",{staticStyle:{"max-width":"400px"},attrs:{type:"textarea",rows:4,placeholder:"请输入使用说明"},model:{value:t.instructions,callback:function(e){t.instructions=e},expression:"instructions"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"数量："}},[r("el-input",{attrs:{placeholder:"请输入数量",type:"number",min:1,value:1},model:{value:t.drug.quantity,callback:function(e){t.$set(t.drug,"quantity",e)},expression:"drug.quantity"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"药品价格："}},[r("el-input",{attrs:{placeholder:"请输入药品价格"},model:{value:t.drug.price,callback:function(e){t.$set(t.drug,"price",e)},expression:"drug.price"}})],1),t._v(" "),r("el-form-item",[r("el-button",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{size:"mini",type:"primary"},on:{click:function(e){t.docreateDrug()}}},[t._v("提交")])],1)],1)],1)],1),t._v(" "),r("div",{staticStyle:{"border-bottom":"1px #e5e5e5 solid",padding:"10px 0"}}),t._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.preDrugList,stripe:""}},[r("el-table-column",{attrs:{prop:"drugId",label:"药品编号"}}),t._v(" "),r("el-table-column",{attrs:{prop:"hisCode",label:"商品编码"}}),t._v(" "),r("el-table-column",{attrs:{prop:"drugName",label:"药品名称"}}),t._v(" "),r("el-table-column",{attrs:{prop:"partnerName",label:"供应商"}}),t._v(" "),r("el-table-column",{attrs:{prop:"specification",label:"药品规格"}}),t._v(" "),r("el-table-column",{attrs:{prop:"usages",label:"用法"}}),t._v(" "),r("el-table-column",{attrs:{prop:"dosage",label:"用量"}}),t._v(" "),r("el-table-column",{attrs:{prop:"instructions",label:"使用说明"}}),t._v(" "),r("el-table-column",{attrs:{prop:"frequency",label:"频次"}}),t._v(" "),r("el-table-column",{attrs:{prop:"quantity",label:"数量"}}),t._v(" "),r("el-table-column",{attrs:{prop:"price",label:"药品价格"}}),t._v(" "),r("el-table-column",{attrs:{prop:"createDate",label:"提交时间"}}),t._v(" "),r("el-table-column",{attrs:{label:"操作",fixed:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(r){t.deletePreDrug(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),r("div",{staticStyle:{"text-align":"right",padding:"15px"}},[r("el-input",{staticStyle:{"max-width":"400px"},attrs:{type:"textarea",rows:4,placeholder:"转方备注/退回原因"},model:{value:t.tranRemake,callback:function(e){t.tranRemake=e},expression:"tranRemake"}})],1),t._v(" "),r("div",{staticStyle:{"text-align":"right","margin-right":"20px"}},[r("div",[t._v("服务费："),r("span",{staticStyle:{color:"red"}},[t._v("￥"+t._s(t.serviceMoney))])]),t._v(" "),r("div",[t._v("合计："),r("span",{staticStyle:{color:"red"}},[t._v("￥"+t._s(t.orderMoney))])])]),t._v(" "),r("div",{staticStyle:{display:"flex","justify-content":"space-between",padding:"15px"}},[r("div",[r("el-button",{attrs:{type:"danger"},on:{click:function(e){t.doSubmit()}}},[t._v("退回")])],1),t._v(" "),r("div",[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dotransmit()}}},[t._v("转方")])],1)]),t._v(" "),r("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,visible:t.filterdrugModel,title:"选择药品"},on:{"update:visible":function(e){t.filterdrugModel=e}}},[r("filterdrug",{ref:"filterdrug",attrs:{transmitType:!0},on:{selectRow:function(e){t.selectRow()}}})],1)],1)},staticRenderFns:[]};var p=r("VU/8")(d,u,!1,function(t){r("m6tE")},"data-v-638b90d8",null);e.default=p.exports},m6tE:function(t,e){}});
//# sourceMappingURL=8.63a8929c48422a4ef2a2.js.map