webpackJsonp([1],{PlXh:function(t,e){},"fF/d":function(t,e){},"gf/8":function(t,e,o){"use strict";var r=o("TToO"),a=o("7+uW"),i=o("c+8m"),n=o.n(i),l=o("k9eN"),s=o("H5nj"),c=o("CMXh"),d=o("vkqf"),u=o("EOM2"),p=o("FL7F"),m=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.g_news_url="",e.checkconsultingFee=function(t,e,o){if(!e)return o(new Error("咨询费用不能为空"));setTimeout(function(){e>=0?o():o(new Error("请输入正确的咨询费"))},1e3)},e.rules={phone:[{required:!0,message:"请填写登录帐号",trigger:"blur"}],name:[{required:!0,message:"请填写医生姓名",trigger:"blur"}],hospitalId:[{required:!0,message:"请选择医院",trigger:"change"}],departmentId:[{required:!0,message:"请选择科室",trigger:"change"}],doctorGood:[{required:!0,message:"请填写主治",trigger:"blur"}],doctorTitle:[{required:!0,message:"请选择职称",trigger:"blur"}],consultingFee:[{required:!0,validator:e.checkconsultingFee,trigger:"blur"}]},e.dialogFormVisible1=!1,e.update="",e.formLabelAlign1={name:"",phone:"",hospitalId:"",hospitalName:"",hospitalDepartment:"",departmentId:[],departmentName:"",doctorBrief:"",doctorGood:"",consultingFee:"",prescriptionNum:"",orderNum:"",orderMoney:"",doctorPatientNum:"",remark:"",doctorTitle:"",idCard:"",pharmacistCertificateNum:"",qualificationCertificateNum:""},e.doctortitlelist=[{id:"ASSISTANT_PHYSICIAN",name:"住院医师"},{id:"ATTENDING_DOCTOR",name:"主治医师"},{id:"DEPUTY_CHIEF_PHYSICIAN",name:"副主任医师"},{id:"CHIEF_PHYSICIAN",name:"主任医师"}],e.loading=!1,e.idCardFrontUrl="",e.idCardBackUrl="",e.pharmacistCertificateFrontUrl="",e.qualificationCertificateFrontUrl="",e}return r.b(e,t),e.prototype.updatedoctorrules=function(t){var e=this;this.$refs.formLabelAlign1.validate(function(t){return t?("update"==e.update&&(console.log(111111),e.updatedoctor()),"notPassUpdate"==e.update&&(console.log(222222),e.notPassupdatedoctor()),!0):(console.log("error submit!!"),!1)})},e.prototype.updatedoctor=function(){var t=this,e=this.hospitallist.filter(function(e){return e.hospitalId==t.formLabelAlign1.hospitalId});console.log(e),this.loading=!0;var o=[];o.hospitalCode=e[0].hospitalCode,o.hospitalName=e[0].hospitalName;var r=[],a=this.formLabelAlign1.departmentId.length-1;r.departmentName=this.formLabelAlign1.departmentName,r.departmentId=this.formLabelAlign1.departmentId[a],l.q(this.formLabelAlign1,o,r,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl).then(function(e){t.loading=!1,e.retCode?(t.dialogFormVisible1=!1,t.$emit("getdoctorList"),t.$message("保存成功")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.notPassupdatedoctor=function(){var t=this,e=this.hospitallist.filter(function(e){return e.hospitalId==t.formLabelAlign1.hospitalId});this.loading=!0;var o=[];console.log("1111",e),o.hospitalCode=e[0].hospitalCode,o.hospitalName=e[0].hospitalName;var r=[],a=this.formLabelAlign1.departmentId.length-1;r.departmentName=this.formLabelAlign1.departmentName,r.departmentId=this.formLabelAlign1.departmentId[a],l.i(this.formLabelAlign1,o,r,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl).then(function(e){t.loading=!1,e.retCode?(t.dialogFormVisible1=!1,t.$emit("getDoctorExamineList"),t.$message("修改成功")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.handleEdit=function(t,e,o){this.update=o,this.dialogFormVisible1=!0,this.formLabelAlign1.doctorId=e.doctorId,this.formLabelAlign1.phone=e.phone,this.formLabelAlign1.hospitalId=e.hspCode,this.formLabelAlign1.name=e.name,this.formLabelAlign1.doctorGood=e.doctorGood,this.formLabelAlign1.doctorBrief=e.doctorBrief,this.formLabelAlign1.remark=e.remark,this.formLabelAlign1.consultingFee=e.consultingFee,this.formLabelAlign1.doctorTitle=e.doctorTitle,this.idCardFrontUrl=e.idCardFront,this.idCardBackUrl=e.idCardBack,this.pharmacistCertificateFrontUrl=e.pharmacistCertificateFront,this.qualificationCertificateFrontUrl=e.qualificationCertificateFront,this.formLabelAlign1.idCard=e.idCard,this.formLabelAlign1.pharmacistCertificateNum=e.pharmacistCertificateNum,this.formLabelAlign1.qualificationCertificateNum=e.qualificationCertificateNum,0==e.consultingFee&&(this.formLabelAlign1.consultingFee="0"),this.finddeptree(e.departmentId)},e.prototype.finddeptree=function(t){var e=this;s.c(t).then(function(o){if(o.retCode){var r=[];o.data.forEach(function(t,e){t[0]&&r.push(t[0].departmentId)}),r.push(t),e.formLabelAlign1.departmentId=r,console.log("departmentId",e.formLabelAlign1.departmentId),e.changeupdatedepartmentId()}else e.$alert(o.message),console.error("数据查询错误")})},e.prototype.changeupdatedepartmentId=function(){var t=this;if(console.log("22222222",this.formLabelAlign1.departmentId),this.formLabelAlign1.departmentId.length>0){var e=this.formLabelAlign1.departmentId.length-1;l.f(this.formLabelAlign1.departmentId[e]).then(function(e){console.log(e),e.retCode?(t.formLabelAlign1.departmentName=e.data[0].departmentName,console.log("departmentName",t.formLabelAlign1.departmentName)):(t.$alert(e.message),console.error("数据查询错误"))})}},e.prototype.updatecancel=function(t){this.$refs[t].resetFields(),this.dialogFormVisible1=!1,this.formLabelAlign1={name:"",phone:"",hospitalId:"",hospitalName:"",hospitalDepartment:"",departmentId:[],departmentName:"",doctorBrief:"",doctorGood:"",consultingFee:"",prescriptionNum:"",orderNum:"",orderMoney:"",doctorPatientNum:"",remark:"",doctorTitle:"",idCard:"",pharmacistCertificateNum:"",qualificationCertificateNum:""}},e.prototype.idCardFrontSuccess=function(t,e){this.idCardFrontUrl=t.data.filename},e.prototype.idCardBackSuccess=function(t,e){this.idCardBackUrl=t.data.filename},e.prototype.pharmacistCertificateFrontSuccess=function(t,e){this.pharmacistCertificateFrontUrl=t.data.filename},e.prototype.qualificationCertificateFrontSuccess=function(t,e){this.qualificationCertificateFrontUrl=t.data.filename},e.prototype.mounted=function(){this.g_news_url=p.b},r.a([Object(u.Prop)({required:!1}),r.c("design:type",Object)],e.prototype,"tableTree",void 0),r.a([Object(u.Prop)({required:!1}),r.c("design:type",Object)],e.prototype,"hospitallist",void 0),e=r.a([n()({props:{},components:{prescriptioninfo:c.a,remindertable:d.a}})],e)}(a.default),f={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[o("el-dialog",{attrs:{title:"医生编辑",visible:t.dialogFormVisible1,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogFormVisible1=e},close:function(e){t.updatecancel("formLabelAlign1")}}},[o("el-form",{ref:"formLabelAlign1",attrs:{"label-width":"140px",model:t.formLabelAlign1,rules:t.rules}},[o("el-form-item",{attrs:{label:"医生姓名",prop:"name"}},[o("el-input",{model:{value:t.formLabelAlign1.name,callback:function(e){t.$set(t.formLabelAlign1,"name",e)},expression:"formLabelAlign1.name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"所属医院",prop:"hospitalId"}},[o("el-select",{attrs:{placeholder:"请选择医院",clearable:""},model:{value:t.formLabelAlign1.hospitalId,callback:function(e){t.$set(t.formLabelAlign1,"hospitalId",e)},expression:"formLabelAlign1.hospitalId"}},t._l(t.hospitallist,function(t){return o("el-option",{key:t.hospitalId,attrs:{label:t.hospitalName,value:t.hospitalId}})}))],1),t._v(" "),o("el-form-item",{attrs:{label:"所在科室",prop:"departmentId"}},[o("el-cascader",{attrs:{options:t.tableTree,"change-on-select":"",clearable:""},on:{change:function(e){t.changeupdatedepartmentId()}},model:{value:t.formLabelAlign1.departmentId,callback:function(e){t.$set(t.formLabelAlign1,"departmentId",e)},expression:"formLabelAlign1.departmentId"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"职称",prop:"doctorTitle"}},[o("el-select",{attrs:{placeholder:"请选择职称",clearable:""},model:{value:t.formLabelAlign1.doctorTitle,callback:function(e){t.$set(t.formLabelAlign1,"doctorTitle",e)},expression:"formLabelAlign1.doctorTitle"}},t._l(t.doctortitlelist,function(t){return o("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),o("el-form-item",{attrs:{label:"医生擅长",prop:"doctorGood"}},[o("el-input",{attrs:{type:"textarea",autosize:""},model:{value:t.formLabelAlign1.doctorGood,callback:function(e){t.$set(t.formLabelAlign1,"doctorGood",e)},expression:"formLabelAlign1.doctorGood"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"医生简介"}},[o("el-input",{attrs:{type:"textarea",autosize:""},model:{value:t.formLabelAlign1.doctorBrief,callback:function(e){t.$set(t.formLabelAlign1,"doctorBrief",e)},expression:"formLabelAlign1.doctorBrief"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"咨询价格",prop:"consultingFee"}},[o("el-input",{model:{value:t.formLabelAlign1.consultingFee,callback:function(e){t.$set(t.formLabelAlign1,"consultingFee",e)},expression:"formLabelAlign1.consultingFee"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"医生备注"}},[o("el-input",{model:{value:t.formLabelAlign1.remark,callback:function(e){t.$set(t.formLabelAlign1,"remark",e)},expression:"formLabelAlign1.remark"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"身份证"}},[o("el-input",{model:{value:t.formLabelAlign1.idCard,callback:function(e){t.$set(t.formLabelAlign1,"idCard",e)},expression:"formLabelAlign1.idCard"}})],1),t._v(" "),o("div",{staticClass:"flex"},[o("div",{staticClass:"flex flex-1"},[o("div",{staticStyle:{width:"140px","text-align":"right","font-size":"14px",color:"#606266","line-height":"100px","padding-right":"12px","box-sizing":"border-box"}},[t._v("身份证正面")]),t._v(" "),o("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.g_news_url,"show-file-list":!1,"on-success":t.idCardFrontSuccess}},[t.idCardFrontUrl?o("img",{staticClass:"avatar",attrs:{src:t.idCardFrontUrl}}):o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),o("div",{staticClass:"flex flex-1"},[o("div",{staticStyle:{width:"140px","text-align":"right","font-size":"14px",color:"#606266","line-height":"100px","padding-right":"12px","box-sizing":"border-box"}},[t._v("身份证背面")]),t._v(" "),o("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.g_news_url,"show-file-list":!1,"on-success":t.idCardBackSuccess}},[t.idCardBackUrl?o("img",{staticClass:"avatar",attrs:{src:t.idCardBackUrl}}):o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)]),t._v(" "),o("el-form-item",{attrs:{label:"医师资格证号"}},[o("el-input",{model:{value:t.formLabelAlign1.pharmacistCertificateNum,callback:function(e){t.$set(t.formLabelAlign1,"pharmacistCertificateNum",e)},expression:"formLabelAlign1.pharmacistCertificateNum"}})],1),t._v(" "),o("div",{staticClass:"flex"},[o("div",{staticStyle:{width:"140px","text-align":"right","font-size":"14px",color:"#606266","line-height":"100px","padding-right":"12px","box-sizing":"border-box"}},[t._v("医师资格证")]),t._v(" "),o("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.g_news_url,"show-file-list":!1,"on-success":t.pharmacistCertificateFrontSuccess}},[t.pharmacistCertificateFrontUrl?o("img",{staticClass:"avatar",attrs:{src:t.pharmacistCertificateFrontUrl}}):o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),o("el-form-item",{attrs:{label:"执业药师资格证号"}},[o("el-input",{model:{value:t.formLabelAlign1.qualificationCertificateNum,callback:function(e){t.$set(t.formLabelAlign1,"qualificationCertificateNum",e)},expression:"formLabelAlign1.qualificationCertificateNum"}})],1),t._v(" "),o("div",{staticClass:"flex"},[o("div",{staticStyle:{width:"140px","text-align":"right","font-size":"14px",color:"#606266","line-height":"100px","padding-right":"12px","box-sizing":"border-box"}},[t._v("执业药师资格证")]),t._v(" "),o("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.g_news_url,"show-file-list":!1,"on-success":t.qualificationCertificateFrontSuccess}},[t.qualificationCertificateFrontUrl?o("img",{staticClass:"avatar",attrs:{src:t.qualificationCertificateFrontUrl}}):o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.updatecancel("formLabelAlign1")}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary",disabled:t.loading},on:{click:function(e){t.updatedoctorrules("formLabelAlign1")}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var g=o("VU/8")(m,f,!1,function(t){o("fF/d")},"data-v-55a29a66",null);e.a=g.exports},k9eN:function(t,e,o){"use strict";o.d(e,"k",function(){return i}),o.d(e,"o",function(){return n}),o.d(e,"p",function(){return l}),o.d(e,"n",function(){return s}),o.d(e,"a",function(){return c}),o.d(e,"q",function(){return d}),o.d(e,"g",function(){return u}),o.d(e,"l",function(){return p}),o.d(e,"m",function(){return m}),o.d(e,"f",function(){return f}),o.d(e,"d",function(){return g}),o.d(e,"c",function(){return h}),o.d(e,"b",function(){return b}),o.d(e,"e",function(){return v}),o.d(e,"j",function(){return C}),o.d(e,"h",function(){return I}),o.d(e,"i",function(){return _});var r=o("FL7F"),a=o("P/kE"),i=(r.a,function(t,e,o,r){var i={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),keyword:o,doctorEnums:r,page:t,pageSize:e};return a.n("/api/doctor/findDoctorList",i).then(function(t){return t})}),n=function(t){var e={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),doctorid:t,doctorEnums:"STOP",source:"weixin"};return a.n("/api/doctor/setmemberstatus",e).then(function(t){return t})},l=function(t){var e={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),doctorid:t,doctorEnums:"USE",source:"weixin"};return a.n("/api/doctor/setmemberstatus",e).then(function(t){return t})},s=function(t){var e={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),doctorid:t,doctorEnums:"HIDE",source:"weixin"};return a.n("/api/doctor/setmemberstatus",e).then(function(t){return t})},c=function(t,e,o,r,i,n,l){var s={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),name:t.name,phone:t.phone,hospitalname:e.hospitalName,hospitalcode:e.hospitalCode,derpartname:o.departmentName,derpartnameid:o.departmentId,doctorbrief:t.doctorBrief,doctorgood:t.doctorGood,consultingfee:t.consultingFee,doctorEnums:"USE",remark:t.remark,doctortitle:t.doctorTitle,idCard:t.idCard,idCardFront:r,idCardBack:i,pharmacistCertificateFront:n,pharmacistCertificateNum:t.pharmacistCertificateNum,qualificationCertificateFront:l,qualificationCertificateNum:t.qualificationCertificateNum};return a.n("/api/doctor/adddoctorother",s).then(function(t){return t})},d=function(t,e,o,r,i,n,l){var s={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),doctorid:t.doctorId,name:t.name,phone:t.phone,hospitalname:e.hospitalName,hospitalcode:e.hospitalCode,derpartname:o.departmentName,derpartnameid:o.departmentId,doctorbrief:t.doctorBrief,doctorgood:t.doctorGood,consultingfee:t.consultingFee,remark:t.remark,doctortitle:t.doctorTitle,idCard:t.idCard,idCardFront:r,idCardBack:i,pharmacistCertificateFront:n,pharmacistCertificateNum:t.pharmacistCertificateNum,qualificationCertificateFront:l,qualificationCertificateNum:t.qualificationCertificateNum};return a.n("/api/doctor/updatedoctor",s).then(function(t){return t})},u=function(){var t={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId")};return a.n("/api/doctor/getdoctorcount",t).then(function(t){return t})},p=function(){var t={token:sessionStorage.getItem("token")};return a.n("/hospital/findHospital",t).then(function(t){return t})},m=function(){var t={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId")};return a.n("/department/querytree",t).then(function(t){return t})},f=function(t){var e={token:sessionStorage.getItem("token"),userid:sessionStorage.getItem("userId"),departmentid:t};return a.n("/department/find",e).then(function(t){return t})},g=function(t,e,o){var r={token:sessionStorage.getItem("token"),doctorid:t,page:e,pageSize:o};return a.n("/api/doctor/doctoFindMyMemberr",r).then(function(t){return t})},h=function(t){var e={token:sessionStorage.getItem("token")};return Object.assign(e,t),a.n("/api/doctor/docAndMemFindPre",e).then(function(t){return t})},b=function(t){var e={token:sessionStorage.getItem("token")};return Object.assign(e,t),a.n("/api/doctor/docAndMemFindOrd",e).then(function(t){return t})},v=function(t,e){var o={token:sessionStorage.getItem("token"),page:t,pagesize:e};return a.n("/api/doctor/findDoctorExamineList",o).then(function(t){return t})},C=function(t){var e={token:sessionStorage.getItem("token"),doctorId:t};return a.n("/api/doctor/passDoctor",e).then(function(t){return t})},I=function(t){var e={token:sessionStorage.getItem("token"),doctorId:t};return a.n("/api/doctor/notPassDoctor",e).then(function(t){return t})},_=function(t,e,o,r,i,n,l){var s={doctorid:t.doctorId,name:t.name,phone:t.phone,hospitalname:e.hospitalName,hospitalcode:e.hospitalCode,derpartname:o.departmentName,derpartnameid:o.departmentId,doctorbrief:t.doctorBrief,doctorgood:t.doctorGood,consultingfee:t.consultingFee,remark:t.remark,doctortitle:t.doctorTitle,idCard:t.idCard,idCardFront:r,idCardBack:i,pharmacistCertificateFront:n,pharmacistCertificateNum:t.pharmacistCertificateNum,qualificationCertificateFront:l,qualificationCertificateNum:t.qualificationCertificateNum};return a.n("/api/doctor/adviserPerfectDoc",s).then(function(t){return t})}},y6rf:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o("TToO"),a=o("7+uW"),i=o("c+8m"),n=o.n(i),l=o("PJh5"),s=o.n(l),c=o("RXoh"),d=o("k9eN"),u=o("gf/8"),p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.hospitallist=[],e.tableTree=[],e.loading=!1,e.page=0,e.pageSize=10,e.total=0,e.keyword="",e.phone="",e.DoctorInfo=[],e.startDate="",e.endDate="",e.doctorStatus="",e.countDoctor=0,e.doctorObj={model:!1,loading:!1,YdkDrugList:[],page:0,pageSize:10,total:0,onPageChange:function(t){e.doctorObj.page=t-1,e.doctorGetDoctor(e.doctorObj.row)},row:{}},e.doctorAdviserObj={model:!1,loading:!1,AdviserInfo:[],page:0,pageSize:10,total:0,onPageChange:function(t){e.doctorAdviserObj.page=t-1,e.doctorGetAdviser(e.doctorAdviserObj.row)},row:{}},e}return r.b(e,t),e.prototype.handledoctorTitle=function(t){switch(t){case"ASSISTANT_PHYSICIAN":return"住院医师";case"ATTENDING_DOCTOR":return"主治医师";case"DEPUTY_CHIEF_PHYSICIAN":return"副主任医师";case"CHIEF_PHYSICIAN":return"主任医师";default:return""}},e.prototype.handleEdit=function(t,e,o){this.$refs.updatedoctor.handleEdit(t,e,o)},e.prototype.gethospitalList=function(){var t=this;d.l().then(function(e){e.retCode?t.hospitallist=e.data.hosipitalList:(t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.getdepartmenttree=function(){var t=this;d.m().then(function(e){e.retCode?t.tableTree=e.data.children:(t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.onPageChange=function(t){this.page=t-1,this.getDoctorList()},e.prototype.getDoctorList=function(t){var e=this;void 0===t&&(t=null),this.loading=!0,t&&(this.page=0);var o="",r="";""!=(this.startDate||"")&&(o=s()(this.startDate).format("YYYY-MM-DD")+" 00:00:00"),""!=(this.endDate||"")&&(r=s()(this.endDate).format("YYYY-MM-DD")+" 23:59:59"),c.R({page:this.page,pageSize:this.pageSize,keyword:this.keyword,phone:this.phone,startcreateDate:o,endcreateDate:r,doctorStatus:this.doctorStatus}).then(function(t){e.loading=!1,t.retCode?(console.log(t.data),e.DoctorInfo=t.data.DoctorInfo,e.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.getcountDoctor=function(){var t=this;c.r({}).then(function(e){e.retCode?t.countDoctor=e.data.num:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.doctorGetDoctor=function(t){var e=this;this.doctorObj.loading=!0,this.doctorObj.model=!0,this.doctorObj.row=t,c.H({docterId:t.doctorId}).then(function(t){e.doctorObj.loading=!1,t.retCode?(console.log(t.data),e.doctorObj.YdkDrugList=t.data.YdkDrugList,e.doctorObj.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.doctorGetAdviser=function(t){var e=this;this.doctorAdviserObj.loading=!0,this.doctorAdviserObj.model=!0,this.doctorAdviserObj.row=t,c.G({doctor_id:t.doctorId,page:this.doctorAdviserObj.page,pageSize:this.doctorAdviserObj.pageSize}).then(function(t){e.doctorAdviserObj.loading=!1,t.retCode?(console.log(t.data),e.doctorAdviserObj.AdviserInfo=t.data.AdviserInfo,e.doctorAdviserObj.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.doSubmitStatus=function(t,e){"USE"==e.doctorStatus&&this.handleSTOP(t,e),"STOP"==e.doctorStatus&&this.handleUSE(t,e)},e.prototype.handleSTOP=function(t,e){var o=this;this.$confirm("是否停用该医生?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d.o(e.doctorId).then(function(t){t.retCode?(o.getDoctorList(),o.$message({type:"success",message:"停用成功!"})):(t.islogin||o.$alert(t.message),console.error("数据查询错误"))})}).catch(function(){o.$message({type:"info",message:"已取消停用"})})},e.prototype.handleUSE=function(t,e){var o=this;this.$confirm("是否启用该医生?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d.p(e.doctorId).then(function(t){t.retCode?(o.getDoctorList(),o.$message({type:"success",message:"启用成功!"})):(t.islogin||o.$alert(t.message),console.error("数据查询错误"))})}).catch(function(){o.$message({type:"info",message:"已取消启用"})})},e.prototype.mounted=function(){this.getDoctorList(),this.getcountDoctor(),this.getdepartmenttree(),this.gethospitalList()},e=r.a([n()({props:{},components:{updatedoctor:u.a}})],e)}(a.default),m={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[o("div",{},[o("h3",[t._v("医生数据")]),t._v(" "),o("div",{staticStyle:{"padding-bottom":"20px"}},[o("span",{staticStyle:{"margin-right":"20px"}},[t._v("平台医生数量："+t._s(t.countDoctor)+" 个")])])]),t._v(" "),o("div",{staticStyle:{"padding-bottom":"20px","border-bottom":"1px #e5e5e5 solid"}},[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{xs:16,sm:12,md:10,lg:5,xl:3}},[o("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名",clearable:""},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),t._v(" "),o("el-col",{attrs:{xs:16,sm:12,md:10,lg:5,xl:3}},[o("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"手机号码",clearable:""},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),t._v(" "),o("el-col",{staticStyle:{"min-width":"470px"},attrs:{xs:16,sm:24,md:6,lg:8,xl:5}},[o("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),o("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),t._v(" "),o("el-col",{staticStyle:{"min-width":"230px"},attrs:{xs:8,sm:8,md:5,lg:5,xl:3}},[o("el-select",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请选择状态"},model:{value:t.doctorStatus,callback:function(e){t.doctorStatus=e},expression:"doctorStatus"}},[o("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),o("el-option",{attrs:{label:"启用",value:"1"}}),t._v(" "),o("el-option",{attrs:{label:"停用",value:"0"}})],1)],1),t._v(" "),o("el-col",{staticStyle:{"min-width":"225px"},attrs:{xs:5,sm:5,md:3,lg:3,xl:2}},[o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getDoctorList(!0)}}},[t._v("查询")])],1)],1)],1),t._v(" "),o("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.DoctorInfo,stripe:"",height:"600"}},[o("el-table-column",{attrs:{fixed:"left",prop:"name",label:"医生姓名"}}),t._v(" "),o("el-table-column",{attrs:{prop:"doctorStatus",label:"使用状态"},scopedSlots:t._u([{key:"default",fn:function(e){return["DINI"==e.row.doctorStatus?o("el-tag",{attrs:{type:"primary"}},[t._v("测试")]):t._e(),t._v(" "),"USE"==e.row.doctorStatus?o("el-tag",{attrs:{type:"success"}},[t._v("可用")]):t._e(),t._v(" "),"STOP"==e.row.doctorStatus?o("el-tag",{attrs:{type:"text"}},[t._v("停用")]):t._e()]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"countPre",label:"医生处方数量"}}),t._v(" "),o("el-table-column",{attrs:{prop:"countOrder",label:"医生订单数量"}}),t._v(" "),o("el-table-column",{attrs:{prop:"countTotalMoney",label:"医生订单金额"}}),t._v(" "),o("el-table-column",{attrs:{prop:"countPatient",label:"医生患者数量"}}),t._v(" "),o("el-table-column",{attrs:{prop:"oldAdviser",label:"注册顾问",width:"120"}}),t._v(" "),o("el-table-column",{attrs:{prop:"adviserPhone",label:"顾问手机号",width:"150"}}),t._v(" "),o("el-table-column",{attrs:{prop:"nowAdviser",label:"现任顾问",width:"120"}}),t._v(" "),o("el-table-column",{attrs:{prop:"hospitalName",label:"医院",width:"180"}}),t._v(" "),o("el-table-column",{attrs:{prop:"hospitalDepartment",label:"科室",width:"180"}}),t._v(" "),o("el-table-column",{attrs:{prop:"phone",label:"联系电话",width:"150"}}),t._v(" "),o("el-table-column",{attrs:{prop:"doctorTitle",label:"医生职称"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n"+t._s(t.handledoctorTitle(e.row.doctorTitle))+"\n      ")]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"createrTime",label:"注册日期",width:"180"}}),t._v(" "),o("el-table-column",{attrs:{label:"操作",fixed:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(o){t.doctorGetDoctor(e.row)}}},[t._v("查看药品")])]}}])})],1),t._v(" "),o("el-col",{staticClass:"toolbar",attrs:{span:24}},[o("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.page+1,"page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1),t._v(" "),o("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.doctorObj.model,title:"查看药品"},on:{"update:visible":function(e){t.$set(t.doctorObj,"model",e)}}},[o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.doctorObj.loading,expression:"doctorObj.loading"}]},[o("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.doctorObj.YdkDrugList,stripe:"",height:"600"}},[o("el-table-column",{attrs:{fixed:"left",prop:"drugName",label:"通用名",width:"180"}}),t._v(" "),o("el-table-column",{attrs:{prop:"productName",label:"商品名"}}),t._v(" "),o("el-table-column",{attrs:{prop:"manufacturer",label:"生产厂家"}}),t._v(" "),o("el-table-column",{attrs:{prop:"specification",label:"规格"}}),t._v(" "),o("el-table-column",{attrs:{prop:"dosageforms",label:"剂型"}}),t._v(" "),o("el-table-column",{attrs:{prop:"hisCode",label:"批准文号"}}),t._v(" "),o("el-table-column",{attrs:{prop:"sumQuantity",label:"数量"}}),t._v(" "),o("el-table-column",{attrs:{prop:"price",label:"单价"}}),t._v(" "),o("el-table-column",{attrs:{prop:"orderMoney",label:"总金额"}})],1),t._v(" "),o("el-col",{staticClass:"toolbar",attrs:{span:24}},[o("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.doctorObj.page+1,"page-size":t.doctorObj.pageSize,total:t.doctorObj.total},on:{"current-change":t.doctorObj.onPageChange}})],1)],1)]),t._v(" "),o("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.doctorAdviserObj.model,title:"查看顾问"},on:{"update:visible":function(e){t.$set(t.doctorAdviserObj,"model",e)}}},[o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.doctorAdviserObj.loading,expression:"doctorAdviserObj.loading"}]},[o("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.doctorAdviserObj.AdviserInfo,stripe:"",height:"600"}},[o("el-table-column",{attrs:{fixed:"left",prop:"adviserName",label:"顾问姓名"}}),t._v(" "),o("el-table-column",{attrs:{prop:"userName",label:"手机号",width:"150"}}),t._v(" "),o("el-table-column",{attrs:{prop:"adviserAge",label:"年龄"}}),t._v(" "),o("el-table-column",{attrs:{prop:"adviserSex",label:"性别"}})],1),t._v(" "),o("el-col",{staticClass:"toolbar",attrs:{span:24}},[o("el-pagination",{attrs:{layout:"prev, pager, next","page-size":t.doctorAdviserObj.pageSize,total:t.doctorAdviserObj.total},on:{"current-change":t.doctorAdviserObj.onPageChange}})],1)],1)]),t._v(" "),o("updatedoctor",{ref:"updatedoctor",attrs:{tableTree:t.tableTree,hospitallist:t.hospitallist},on:{getdoctorList:t.getDoctorList}})],1)},staticRenderFns:[]};var f=o("VU/8")(p,m,!1,function(t){o("PlXh")},"data-v-4b7c5940",null);e.default=f.exports}});
//# sourceMappingURL=1.f003f968b6991a25a946.js.map