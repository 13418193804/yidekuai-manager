webpackJsonp([2],{OMez:function(t,e){},dIgF:function(t,e){},"gf/8":function(t,e,r){"use strict";var o=r("TToO"),a=r("7+uW"),i=r("c+8m"),l=r.n(i),n=r("k9eN"),s=r("H5nj"),d=r("CMXh"),c=r("vkqf"),p=r("EOM2"),u=r("FL7F"),m=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.g_news_url="",e.checkconsultingFee=function(t,e,r){if(!e)return r(new Error("咨询费用不能为空"));setTimeout(function(){e>=0?r():r(new Error("请输入正确的咨询费"))},1e3)},e.checkidcard=function(t,e,r){if(e){var o=e;n.b(o).then(function(t){t.retCode?r():(r(new Error("请输入正确的身份证")),console.error("数据查询错误"))})}},e.rules={phone:[{required:!0,message:"请填写登录帐号",trigger:"blur"}],name:[{required:!0,message:"请填写医生姓名",trigger:"blur"}],hospitalId:[{required:!0,message:"请选择医院",trigger:"change"}],departmentId:[{required:!0,message:"请选择科室",trigger:"change"}],doctorBrief:[{required:!0,message:"请填写简介",trigger:"blur"}],doctorTitle:[{required:!0,message:"请选择职称",trigger:"blur"}],consultingFee:[{required:!0,validator:e.checkconsultingFee,trigger:"blur"}]},e.dialogFormVisible1=!1,e.updateloading=!1,e.update="",e.formLabelAlign1={name:"",phone:"",hospitalId:"",hspCode:"",hospitalName:"",hospitalDepartment:"",departmentId:[],departmentName:"",doctorBrief:"",doctorGood:"",consultingFee:"",prescriptionNum:"",orderNum:"",orderMoney:"",doctorPatientNum:"",remark:"",doctorTitle:"",idCard:"",pharmacistCertificateNum:"",qualificationCertificateNum:"",sex:"",age:"",picture:""},e.doctortitlelist=[{id:"ASSISTANT_PHYSICIAN",name:"住院医师"},{id:"ATTENDING_DOCTOR",name:"主治医师"},{id:"DEPUTY_CHIEF_PHYSICIAN",name:"副主任医师"},{id:"CHIEF_PHYSICIAN",name:"主任医师"}],e.loading=!1,e.idCardFrontUrl="",e.idCardBackUrl="",e.pharmacistCertificateFrontUrl="",e.qualificationCertificateFrontUrl="",e.pictureUrl="",e}return o.b(e,t),e.prototype.updatedoctorrules=function(t){var e=this;this.$refs.formLabelAlign1.validate(function(t){return t?("update"==e.update&&e.updatedoctor(),"notPassUpdate"==e.update&&e.notPassupdatedoctor(),!0):(console.log("error submit!!"),!1)})},e.prototype.updatedoctor=function(){var t=this;console.log(this.hospitallist),console.log(this.formLabelAlign1.hospitalId);var e=this.hospitallist.filter(function(e){return e.hospitalCode==t.formLabelAlign1.hospitalId});console.log(e),this.loading=!0;var r=[];r.hospitalCode=e[0].hospitalCode,r.hospitalName=e[0].hospitalName;var o=[],a=this.formLabelAlign1.departmentId.length-1;o.departmentName=this.formLabelAlign1.departmentName,o.departmentId=this.formLabelAlign1.departmentId[a],this.formLabelAlign1.idCard?n.b(this.formLabelAlign1.idCard).then(function(e){e.retCode?(console.log(e.data),t.formLabelAlign1.sex=e.data.sex,t.formLabelAlign1.age=e.data.age,n.t(t.formLabelAlign1,r,o,t.idCardFrontUrl,t.idCardBackUrl,t.pharmacistCertificateFrontUrl,t.qualificationCertificateFrontUrl,t.pictureUrl).then(function(e){t.loading=!1,e.retCode?(t.dialogFormVisible1=!1,t.updateloading=!1,t.$emit("getdoctorList"),t.$message("保存成功")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})):(t.loading=!1,e.islogin||t.$alert(e.message),console.error("数据查询错误"))}):n.t(this.formLabelAlign1,r,o,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl,this.pictureUrl).then(function(e){t.loading=!1,e.retCode?(t.dialogFormVisible1=!1,t.updateloading=!1,t.$emit("getdoctorList"),t.$message("保存成功")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.notPassupdatedoctor=function(){var t=this;console.log(this.hospitallist),console.log(this.formLabelAlign1.hospitalId);var e=this.hospitallist.filter(function(e){return e.hospitalCode==t.formLabelAlign1.hospitalId});this.loading=!0;var r=[];console.log("1111",e),r.hospitalCode=e[0].hospitalCode,r.hospitalName=e[0].hospitalName;var o=[],a=this.formLabelAlign1.departmentId.length-1;o.departmentName=this.formLabelAlign1.departmentName,o.departmentId=this.formLabelAlign1.departmentId[a],this.formLabelAlign1.idCard?n.b(this.formLabelAlign1.idCard).then(function(e){e.retCode?(console.log(e.data),t.formLabelAlign1.sex=e.data.sex,t.formLabelAlign1.age=e.data.age,n.l(t.formLabelAlign1,r,o,t.idCardFrontUrl,t.idCardBackUrl,t.pharmacistCertificateFrontUrl,t.qualificationCertificateFrontUrl,t.pictureUrl).then(function(e){t.loading=!1,e.retCode?(t.dialogFormVisible1=!1,t.updateloading=!1,t.$emit("getDoctorExamineList"),t.$message("修改成功")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})):(t.loading=!1,e.islogin||t.$alert(e.message),console.error("数据查询错误"))}):n.l(this.formLabelAlign1,r,o,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl,this.pictureUrl).then(function(e){t.loading=!1,e.retCode?(t.dialogFormVisible1=!1,t.updateloading=!1,t.$emit("getDoctorExamineList"),t.$message("修改成功")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.handleEdit=function(t,e,r){this.update=r,this.dialogFormVisible1=!0,this.updateloading=!0,this.formLabelAlign1.doctorId=e.doctorId,this.formLabelAlign1.phone=e.phone,this.formLabelAlign1.hospitalId=e.hspCode,this.formLabelAlign1.hspCode=e.hspCode,this.formLabelAlign1.name=e.name,this.formLabelAlign1.doctorGood=e.doctorGood,this.formLabelAlign1.doctorBrief=e.doctorBrief,this.formLabelAlign1.remark=e.remark,this.formLabelAlign1.consultingFee=e.consultingFee,this.formLabelAlign1.doctorTitle=e.doctorTitle,this.idCardFrontUrl=e.idCardFront,this.idCardBackUrl=e.idCardBack,this.pharmacistCertificateFrontUrl=e.pharmacistCertificateFront,this.qualificationCertificateFrontUrl=e.qualificationCertificateFront,this.formLabelAlign1.idCard=e.idCard,this.formLabelAlign1.pharmacistCertificateNum=e.pharmacistCertificateNum,this.formLabelAlign1.qualificationCertificateNum=e.qualificationCertificateNum,this.pictureUrl=e.picture,0==e.consultingFee&&(this.formLabelAlign1.consultingFee="0"),this.finddeptree(e.departmentId)},e.prototype.finddeptree=function(t){var e=this;s.c(t).then(function(r){if(r.retCode){var o=[];r.data.forEach(function(t,e){t[0]&&o.push(t[0].departmentId)}),o.push(t),e.formLabelAlign1.departmentId=o,console.log("departmentId",e.formLabelAlign1.departmentId),e.changeupdatedepartmentId()}else e.$alert(r.message),console.error("数据查询错误")})},e.prototype.changeupdatedepartmentId=function(){var t=this;if(this.formLabelAlign1.departmentId.length>0){var e=this.formLabelAlign1.departmentId.length-1;n.i(this.formLabelAlign1.departmentId[e]).then(function(e){console.log(e),e.retCode?(t.formLabelAlign1.departmentName=e.data[0].departmentName,console.log("departmentName",t.formLabelAlign1.departmentName),t.updateloading=!1):(t.$alert(e.message),console.error("数据查询错误"))})}},e.prototype.updatecancel=function(t){this.$refs[t].resetFields(),this.dialogFormVisible1=!1,this.updateloading=!1,this.formLabelAlign1={name:"",phone:"",hospitalId:"",hospitalName:"",hospitalDepartment:"",departmentId:[],departmentName:"",doctorBrief:"",doctorGood:"",consultingFee:"",prescriptionNum:"",orderNum:"",orderMoney:"",doctorPatientNum:"",remark:"",doctorTitle:"",idCard:"",pharmacistCertificateNum:"",qualificationCertificateNum:""}},e.prototype.idCardFrontSuccess=function(t,e){this.idCardFrontUrl=t.data.filename},e.prototype.idCardBackSuccess=function(t,e){this.idCardBackUrl=t.data.filename},e.prototype.pharmacistCertificateFrontSuccess=function(t,e){this.pharmacistCertificateFrontUrl=t.data.filename},e.prototype.qualificationCertificateFrontSuccess=function(t,e){this.qualificationCertificateFrontUrl=t.data.filename},e.prototype.pictureSuccess=function(t,e){this.pictureUrl=t.data.filename},e.prototype.delUrl=function(t){"idCardFrontUrl"==t&&(this.idCardFrontUrl=""),"idCardBackUrl"==t&&(this.idCardBackUrl=""),"pharmacistCertificateFrontUrl"==t&&(this.pharmacistCertificateFrontUrl=""),"qualificationCertificateFrontUrl"==t&&(this.qualificationCertificateFrontUrl=""),"pictureUrl"==t&&(this.pictureUrl="")},e.prototype.mounted=function(){this.g_news_url=u.b},o.a([Object(p.Prop)({required:!1}),o.c("design:type",Object)],e.prototype,"tableTree",void 0),o.a([Object(p.Prop)({required:!1}),o.c("design:type",Object)],e.prototype,"hospitallist",void 0),e=o.a([l()({props:{},components:{prescriptioninfo:d.a,remindertable:c.a}})],e)}(a.default),g={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-dialog",{attrs:{title:"医生编辑",visible:t.dialogFormVisible1,"close-on-click-modal":!1,top:"5vh"},on:{"update:visible":function(e){t.dialogFormVisible1=e},close:function(e){t.updatecancel("formLabelAlign1")}}},[r("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:t.updateloading,expression:"updateloading"}]},[r("el-form",{ref:"formLabelAlign1",attrs:{"label-width":"140px",model:t.formLabelAlign1,rules:t.rules}},[r("el-form-item",{attrs:{label:"医生姓名",prop:"name"}},[r("el-input",{model:{value:t.formLabelAlign1.name,callback:function(e){t.$set(t.formLabelAlign1,"name",e)},expression:"formLabelAlign1.name"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"所属医院",prop:"hospitalId"}},[r("el-select",{attrs:{placeholder:"请选择医院",clearable:""},model:{value:t.formLabelAlign1.hospitalId,callback:function(e){t.$set(t.formLabelAlign1,"hospitalId",e)},expression:"formLabelAlign1.hospitalId"}},t._l(t.hospitallist,function(t){return r("el-option",{key:t.hospitalCode,attrs:{label:t.hospitalName,value:t.hospitalCode}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"所在科室",prop:"departmentId"}},[r("el-cascader",{attrs:{options:t.tableTree,"change-on-select":"",clearable:""},on:{change:function(e){t.changeupdatedepartmentId()}},model:{value:t.formLabelAlign1.departmentId,callback:function(e){t.$set(t.formLabelAlign1,"departmentId",e)},expression:"formLabelAlign1.departmentId"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"职称",prop:"doctorTitle"}},[r("el-select",{attrs:{placeholder:"请选择职称",clearable:""},model:{value:t.formLabelAlign1.doctorTitle,callback:function(e){t.$set(t.formLabelAlign1,"doctorTitle",e)},expression:"formLabelAlign1.doctorTitle"}},t._l(t.doctortitlelist,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"医生擅长"}},[r("el-input",{attrs:{type:"textarea",autosize:""},model:{value:t.formLabelAlign1.doctorGood,callback:function(e){t.$set(t.formLabelAlign1,"doctorGood",e)},expression:"formLabelAlign1.doctorGood"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"医生简介",prop:"doctorBrief"}},[r("el-input",{attrs:{type:"textarea",autosize:""},model:{value:t.formLabelAlign1.doctorBrief,callback:function(e){t.$set(t.formLabelAlign1,"doctorBrief",e)},expression:"formLabelAlign1.doctorBrief"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"咨询价格",prop:"consultingFee"}},[r("el-input",{model:{value:t.formLabelAlign1.consultingFee,callback:function(e){t.$set(t.formLabelAlign1,"consultingFee",e)},expression:"formLabelAlign1.consultingFee"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"医生备注"}},[r("el-input",{model:{value:t.formLabelAlign1.remark,callback:function(e){t.$set(t.formLabelAlign1,"remark",e)},expression:"formLabelAlign1.remark"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"身份证"}},[r("el-input",{model:{value:t.formLabelAlign1.idCard,callback:function(e){t.$set(t.formLabelAlign1,"idCard",e)},expression:"formLabelAlign1.idCard"}})],1),t._v(" "),r("div",{staticClass:"flex"},[r("div",{staticClass:"flex flex-1"},[r("div",{staticStyle:{width:"140px","text-align":"right","font-size":"14px",color:"#606266","line-height":"100px","padding-right":"12px","box-sizing":"border-box"}},[t._v("身份证正面")]),t._v(" "),r("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.g_news_url,"show-file-list":!1,"on-success":t.idCardFrontSuccess}},[t.idCardFrontUrl?r("img",{staticClass:"avatar",attrs:{src:t.idCardFrontUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v(" "),t.idCardFrontUrl?r("div",{staticStyle:{"font-size":"14px",color:"#ff0000","line-height":"100px","padding-left":"15px"},on:{click:function(e){t.delUrl("idCardFrontUrl")}}},[t._v("删除图片")]):t._e()],1),t._v(" "),r("div",{staticClass:"flex flex-1"},[r("div",{staticStyle:{width:"140px","text-align":"right","font-size":"14px",color:"#606266","line-height":"100px","padding-right":"12px","box-sizing":"border-box"}},[t._v("身份证背面")]),t._v(" "),r("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.g_news_url,"show-file-list":!1,"on-success":t.idCardBackSuccess}},[t.idCardBackUrl?r("img",{staticClass:"avatar",attrs:{src:t.idCardBackUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v(" "),t.idCardBackUrl?r("div",{staticStyle:{"font-size":"14px",color:"#ff0000","line-height":"100px","padding-left":"15px"},on:{click:function(e){t.delUrl("idCardBackUrl")}}},[t._v("删除图片")]):t._e()],1)]),t._v(" "),r("el-form-item",{attrs:{label:"医师资格证号"}},[r("el-input",{model:{value:t.formLabelAlign1.pharmacistCertificateNum,callback:function(e){t.$set(t.formLabelAlign1,"pharmacistCertificateNum",e)},expression:"formLabelAlign1.pharmacistCertificateNum"}})],1),t._v(" "),r("div",{staticClass:"flex"},[r("div",{staticStyle:{width:"140px","text-align":"right","font-size":"14px",color:"#606266","line-height":"100px","padding-right":"12px","box-sizing":"border-box"}},[t._v("医师资格证")]),t._v(" "),r("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.g_news_url,"show-file-list":!1,"on-success":t.pharmacistCertificateFrontSuccess}},[t.pharmacistCertificateFrontUrl?r("img",{staticClass:"avatar",attrs:{src:t.pharmacistCertificateFrontUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v(" "),t.pharmacistCertificateFrontUrl?r("div",{staticStyle:{"font-size":"14px",color:"#ff0000","line-height":"100px","padding-left":"15px"},on:{click:function(e){t.delUrl("pharmacistCertificateFrontUrl")}}},[t._v("删除图片")]):t._e()],1),t._v(" "),r("el-form-item",{attrs:{label:"医师执业证号"}},[r("el-input",{model:{value:t.formLabelAlign1.qualificationCertificateNum,callback:function(e){t.$set(t.formLabelAlign1,"qualificationCertificateNum",e)},expression:"formLabelAlign1.qualificationCertificateNum"}})],1),t._v(" "),r("div",{staticClass:"flex"},[r("div",{staticStyle:{width:"140px","text-align":"right","font-size":"14px",color:"#606266","line-height":"100px","padding-right":"12px","box-sizing":"border-box"}},[t._v("医师执业证")]),t._v(" "),r("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.g_news_url,"show-file-list":!1,"on-success":t.qualificationCertificateFrontSuccess}},[t.qualificationCertificateFrontUrl?r("img",{staticClass:"avatar",attrs:{src:t.qualificationCertificateFrontUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v(" "),t.qualificationCertificateFrontUrl?r("div",{staticStyle:{"font-size":"14px",color:"#ff0000","line-height":"100px","padding-left":"15px"},on:{click:function(e){t.delUrl("qualificationCertificateFrontUrl")}}},[t._v("删除图片")]):t._e()],1),t._v(" "),r("div",{staticClass:"flex"},[r("div",{staticStyle:{width:"140px","text-align":"right","font-size":"14px",color:"#606266","line-height":"100px","padding-right":"12px","box-sizing":"border-box"}},[t._v("医生头像：")]),t._v(" "),r("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.g_news_url,"show-file-list":!1,"on-success":t.pictureSuccess}},[t.pictureUrl?r("img",{staticClass:"avatar",attrs:{src:t.pictureUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v(" "),t.pictureUrl?r("div",{staticStyle:{"font-size":"14px",color:"#ff0000","line-height":"100px","padding-left":"15px"},on:{click:function(e){t.delUrl("pictureUrl")}}},[t._v("删除图片")]):t._e()],1)],1),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.updatecancel("formLabelAlign1")}}},[t._v("取 消")]),t._v(" "),r("el-button",{attrs:{type:"primary",disabled:t.loading},on:{click:function(e){t.updatedoctorrules("formLabelAlign1")}}},[t._v("确 定")])],1)],1)])],1)},staticRenderFns:[]};var f=r("VU/8")(m,g,!1,function(t){r("dIgF")},"data-v-fda4f1a2",null);e.a=f.exports},y6rf:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("TToO"),a=r("7+uW"),i=r("c+8m"),l=r.n(i),n=r("PJh5"),s=r.n(n),d=r("RXoh"),c=r("k9eN"),p=r("gf/8"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.hospitallist=[],e.tableTree=[],e.loading=!1,e.orderByStr="",e.page=0,e.pageSize=10,e.total=0,e.keyword="",e.phone="",e.DoctorInfo=[],e.pickerOptions2={shortcuts:[{text:"本月",onClick:function(t){t.$emit("pick",[window.mmvue.getMonth1(),s()(new Date).format("YYYY-MM-DD")+" 23:59:59"])}},{text:"本周",onClick:function(t){t.$emit("pick",[window.mmvue.getWeek(),s()(new Date).format("YYYY-MM-DD")+" 23:59:59"])}},{text:"本日",onClick:function(t){t.$emit("pick",[window.mmvue.getToday(),s()(new Date).format("YYYY-MM-DD")+" 23:59:59"])}}]},e.doctorStatus="",e.date=[],e.orderMoney=0,e.prescriptionNum=0,e.orderNum=0,e.allAdviserNum=0,e.drugNum=0,e.payOrderMoney=0,e.payOrderNum=0,e.drugQuantityTotal=0,e.giveupOrderNum=0,e.countDoctor=0,e.doctorObj={model:!1,loading:!1,YdkDrugList:[],page:0,pageSize:10,total:0,onPageChange:function(t){e.doctorObj.page=t-1,e.doctorGetDoctor(e.doctorObj.row)},row:{}},e.doctorAdviserObj={model:!1,loading:!1,AdviserInfo:[],page:0,pageSize:10,total:0,onPageChange:function(t){e.doctorAdviserObj.page=t-1,e.doctorGetAdviser(e.doctorAdviserObj.row)},row:{}},e}return o.b(e,t),e.prototype.handledoctorTitle=function(t){switch(t){case"ASSISTANT_PHYSICIAN":return"住院医师";case"ATTENDING_DOCTOR":return"主治医师";case"DEPUTY_CHIEF_PHYSICIAN":return"副主任医师";case"CHIEF_PHYSICIAN":return"主任医师";default:return""}},e.prototype.handleEdit=function(t,e,r){this.$refs.updatedoctor.handleEdit(t,e,r)},e.prototype.gethospitalList=function(){var t=this;c.o().then(function(e){e.retCode?t.hospitallist=e.data.hosipitalList:(t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.getdepartmenttree=function(){var t=this;c.p().then(function(e){e.retCode?t.tableTree=e.data.children:(t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.onPageChange=function(t){this.page=t-1,this.getDoctorList()},e.prototype.getDoctorList=function(t){var e=this;void 0===t&&(t=null),this.loading=!0,t&&(this.page=0);var r={page:this.page,pageSize:this.pageSize,keyword:this.keyword,phone:this.phone,startcreateDate:this.date&&this.date.length>0?s()(this.date[0]).format("YYYY-MM-DD")+" 00:00:00":"",endcreateDate:this.date&&this.date.length>0?s()(this.date[1]).format("YYYY-MM-DD")+" 23:59:59":"",doctorStatus:this.doctorStatus,orderByStr:this.orderByStr};d.X(r).then(function(t){if(!t.retCode)return t.islogin||e.$alert(t.message),void(e.loading=!1);console.log(t.data),e.DoctorInfo=t.data.DoctorInfo,e.total=t.data.page.total}),this.ypStartcreateDate(r)},e.prototype.ypStartcreateDate=function(t){var e=this;t.ydStartcreateDate=t.startcreateDate,t.ydEndcreateDate=t.endcreateDate,d._44(t).then(function(t){t.retCode?t.data.AdviserInfo.length>0&&(e.giveupOrderNum=t.data.AdviserInfo[0].giveupOrderNum?t.data.AdviserInfo[0].giveupOrderNum:0,e.orderMoney=t.data.AdviserInfo[0].orderMoney?t.data.AdviserInfo[0].orderMoney:0,e.prescriptionNum=t.data.AdviserInfo[0].prescriptionNum?t.data.AdviserInfo[0].prescriptionNum:0,e.orderNum=t.data.AdviserInfo[0].orderNum?t.data.AdviserInfo[0].orderNum:0,e.allAdviserNum=t.data.AdviserInfo[0].allAdviserNum?t.data.AdviserInfo[0].allAdviserNum:0,e.drugNum=t.data.AdviserInfo[0].drugNum?t.data.AdviserInfo[0].drugNum:0,e.payOrderMoney=t.data.AdviserInfo[0].payOrderMoney?t.data.AdviserInfo[0].payOrderMoney:0,e.payOrderNum=t.data.AdviserInfo[0].payOrderNum?t.data.AdviserInfo[0].payOrderNum:0,e.drugQuantityTotal=t.data.AdviserInfo[0].drugQuantityTotal?t.data.AdviserInfo[0].drugQuantityTotal:0):t.islogin||e.$alert(t.message),e.loading=!1})},e.prototype.getcountDoctor=function(){var t=this;d.r({}).then(function(e){e.retCode?t.countDoctor=e.data.num:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.doctorGetDoctor=function(t){var e=this;this.doctorObj.loading=!0,this.doctorObj.model=!0,this.doctorObj.row=t,d.K({docterId:t.doctorId}).then(function(t){e.doctorObj.loading=!1,t.retCode?(console.log(t.data),e.doctorObj.YdkDrugList=t.data.YdkDrugList,e.doctorObj.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.doctorGetAdviser=function(t){var e=this;this.doctorAdviserObj.loading=!0,this.doctorAdviserObj.model=!0,this.doctorAdviserObj.row=t,d.J({doctor_id:t.doctorId,page:this.doctorAdviserObj.page,pageSize:this.doctorAdviserObj.pageSize}).then(function(t){e.doctorAdviserObj.loading=!1,t.retCode?(console.log(t.data),e.doctorAdviserObj.AdviserInfo=t.data.AdviserInfo,e.doctorAdviserObj.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.doSubmitStatus=function(t,e){"USE"==e.doctorStatus&&this.handleSTOP(t,e),"STOP"==e.doctorStatus&&this.handleUSE(t,e)},e.prototype.handleSTOP=function(t,e){var r=this;this.$confirm("是否停用该医生?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){c.r(e.doctorId).then(function(t){t.retCode?(r.getDoctorList(),r.$message({type:"success",message:"停用成功!"})):(t.islogin||r.$alert(t.message),console.error("数据查询错误"))})}).catch(function(){r.$message({type:"info",message:"已取消停用"})})},e.prototype.handleUSE=function(t,e){var r=this;this.$confirm("是否启用该医生?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){c.s(e.doctorId).then(function(t){t.retCode?(r.getDoctorList(),r.$message({type:"success",message:"启用成功!"})):(t.islogin||r.$alert(t.message),console.error("数据查询错误"))})}).catch(function(){r.$message({type:"info",message:"已取消启用"})})},e.prototype.sortChange=function(t){t.column;var e=t.prop,r="";switch("descending"==t.order&&(r+=" desc"),e){case"prescriptionNum":this.orderByStr="prescription_num"+r;break;case"orderNum":this.orderByStr="order_num"+r;break;case"orderMoney":this.orderByStr="order_money"+r;break;case"memberNum":this.orderByStr="doctorPatientNum"+r;break;default:this.orderByStr=""}this.getDoctorList(!0)},e.prototype.getWeek=function(){var t=new Date,e=t.getDay(),r=1-e;0==e&&(r=-7);var o=7-e,a=t.getTime(),i=new Date(a+24*r*3600*1e3);new Date(a+24*o*3600*1e3);return this.transferDate(i)+" 00:00:00"},e.prototype.getToday=function(){return s()(new Date).format("YYYY-MM-DD")+" 00:00:00"},e.prototype.getMonth1=function(){var t=new Date;return t.setDate(1),this.transferDate(t)+" 00:00:00"},e.prototype.transferDate=function(t){var e=t.getFullYear(),r=t.getMonth()+1,o=t.getDate();return r>=1&&r<=9&&(r="0"+r),o>=0&&o<=9&&(o="0"+o),e+"-"+r+"-"+o},e.prototype.mounted=function(){this.date=[this.getMonth1(),s()(new Date).format("YYYY-MM-DD")+" 23:59:59"],window.mmvue=this,this.getDoctorList(),this.getcountDoctor(),this.getdepartmenttree(),this.gethospitalList()},e=o.a([l()({props:{},components:{updatedoctor:p.a}})],e)}(a.default),m={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:t.loading,expression:"loading"}]},[r("div",{},[r("h3",[t._v("医生数据")]),t._v(" "),r("div",{staticStyle:{"padding-bottom":"20px"}},[r("span",{staticStyle:{"margin-right":"20px"}},[t._v("平台医生数量："+t._s(t.countDoctor)+" 个")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("订单实收金额："+t._s(t.payOrderMoney)+" 元")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("处方数量："+t._s(t.prescriptionNum)+" ")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("实收订单数："+t._s(t.payOrderNum)+" ")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("全部顾问数量："+t._s(t.allAdviserNum)+" ")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("药品销售数量："+t._s(t.drugQuantityTotal)+" ")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("失败订单数量："+t._s(t.giveupOrderNum)+" ")])])]),t._v(" "),r("div",{staticStyle:{"padding-bottom":"20px","border-bottom":"1px #e5e5e5 solid"}},[r("el-row",{attrs:{gutter:10}},[r("el-col",{attrs:{xs:16,sm:12,md:10,lg:5,xl:3}},[r("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名",clearable:""},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),t._v(" "),r("el-col",{attrs:{xs:16,sm:12,md:10,lg:5,xl:3}},[r("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"手机号码",clearable:""},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),t._v(" "),r("el-col",{staticStyle:{"min-width":"360px"},attrs:{xs:2,sm:2,md:2,lg:2,xl:2}},[r("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions2},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),t._v(" "),r("el-col",{staticStyle:{"min-width":"230px"},attrs:{xs:8,sm:8,md:5,lg:5,xl:3}},[r("el-select",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请选择状态"},model:{value:t.doctorStatus,callback:function(e){t.doctorStatus=e},expression:"doctorStatus"}},[r("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),r("el-option",{attrs:{label:"启用",value:"1"}}),t._v(" "),r("el-option",{attrs:{label:"停用",value:"0"}})],1)],1),t._v(" "),r("el-col",{staticStyle:{"min-width":"225px"},attrs:{xs:5,sm:5,md:3,lg:3,xl:2}},[r("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getDoctorList(!0)}}},[t._v("查询")])],1)],1)],1),t._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.DoctorInfo,stripe:"",height:"600"},on:{"sort-change":t.sortChange}},[r("el-table-column",{attrs:{fixed:"left",prop:"name",label:"医生姓名"}}),t._v(" "),r("el-table-column",{attrs:{prop:"doctorStatus",label:"使用状态"},scopedSlots:t._u([{key:"default",fn:function(e){return["DINI"==e.row.doctorStatus?r("el-tag",{attrs:{type:"primary"}},[t._v("测试")]):t._e(),t._v(" "),"USE"==e.row.doctorStatus?r("el-tag",{attrs:{type:"success"}},[t._v("可用")]):t._e(),t._v(" "),"STOP"==e.row.doctorStatus?r("el-tag",{attrs:{type:"text"}},[t._v("停用")]):t._e()]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"prescriptionNum",label:"医生处方数量",sortable:"custom",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s(e.row.prescriptionNum?e.row.prescriptionNum:0)+"\n                ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"orderNum",label:"医生订单数量",sortable:"custom",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(e.row.orderNum?e.row.orderNum:0)+"\n              ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"orderMoney",label:"医生订单金额",sortable:"custom",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                 "+t._s(e.row.orderMoney?e.row.orderMoney:0)+"\n              ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"memberNum",label:"医生患者数量",sortable:"custom",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(e.row.memberNum?e.row.memberNum:0)+"\n             ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"creater_name",label:"外部顾问",width:"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"creater_phone",label:"外部顾问手机号",width:"150"}}),t._v(" "),r("el-table-column",{attrs:{prop:"up_adviser_name",label:"内部顾问",width:"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"up_adviser_phone",label:"内部顾问手机号",width:"150"}}),t._v(" "),r("el-table-column",{attrs:{prop:"hospitalName",label:"医院",width:"180"}}),t._v(" "),r("el-table-column",{attrs:{prop:"hospitalDepartment",label:"科室",width:"180"}}),t._v(" "),r("el-table-column",{attrs:{prop:"phone",label:"联系电话",width:"150"}}),t._v(" "),r("el-table-column",{attrs:{prop:"doctorTitle",label:"医生职称"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(t.handledoctorTitle(e.row.doctorTitle))+"\n      ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"resource_adviser_name",label:"来源顾问",width:"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"resource_adviser_phone",label:"来源顾问手机号",width:"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"createrTime",label:"注册日期",width:"180"}}),t._v(" "),r("el-table-column",{attrs:{label:"操作",fixed:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(r){t.doctorGetDoctor(e.row)}}},[t._v("查看药品")])]}}])})],1),t._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.page+1,"page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1),t._v(" "),r("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.doctorObj.model,title:"查看药品"},on:{"update:visible":function(e){t.$set(t.doctorObj,"model",e)}}},[r("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:t.doctorObj.loading,expression:"doctorObj.loading"}]},[r("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.doctorObj.YdkDrugList,stripe:"",height:"600"}},[r("el-table-column",{attrs:{fixed:"left",prop:"drugName",label:"通用名",width:"180"}}),t._v(" "),r("el-table-column",{attrs:{prop:"productName",label:"商品名"}}),t._v(" "),r("el-table-column",{attrs:{prop:"manufacturer",label:"生产厂家"}}),t._v(" "),r("el-table-column",{attrs:{prop:"specification",label:"规格"}}),t._v(" "),r("el-table-column",{attrs:{prop:"dosageforms",label:"剂型"}}),t._v(" "),r("el-table-column",{attrs:{prop:"hisCode",label:"批准文号"}}),t._v(" "),r("el-table-column",{attrs:{prop:"sumQuantity",label:"数量"}}),t._v(" "),r("el-table-column",{attrs:{prop:"price",label:"单价"}}),t._v(" "),r("el-table-column",{attrs:{prop:"orderMoney",label:"总金额"}})],1),t._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.doctorObj.page+1,"page-size":t.doctorObj.pageSize,total:t.doctorObj.total},on:{"current-change":t.doctorObj.onPageChange}})],1)],1)]),t._v(" "),r("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.doctorAdviserObj.model,title:"查看顾问"},on:{"update:visible":function(e){t.$set(t.doctorAdviserObj,"model",e)}}},[r("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:t.doctorAdviserObj.loading,expression:"doctorAdviserObj.loading"}]},[r("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.doctorAdviserObj.AdviserInfo,stripe:"",height:"600"}},[r("el-table-column",{attrs:{fixed:"left",prop:"adviserName",label:"顾问姓名"}}),t._v(" "),r("el-table-column",{attrs:{prop:"userName",label:"手机号",width:"150"}}),t._v(" "),r("el-table-column",{attrs:{prop:"adviserAge",label:"年龄"}}),t._v(" "),r("el-table-column",{attrs:{prop:"adviserSex",label:"性别"}})],1),t._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{attrs:{layout:"prev, pager, next","page-size":t.doctorAdviserObj.pageSize,total:t.doctorAdviserObj.total},on:{"current-change":t.doctorAdviserObj.onPageChange}})],1)],1)]),t._v(" "),r("updatedoctor",{ref:"updatedoctor",attrs:{tableTree:t.tableTree,hospitallist:t.hospitallist},on:{getdoctorList:t.getDoctorList}})],1)},staticRenderFns:[]};var g=r("VU/8")(u,m,!1,function(t){r("OMez")},"data-v-e32ea61a",null);e.default=g.exports}});
//# sourceMappingURL=2.f243cc7a22ee150a2a3e.js.map