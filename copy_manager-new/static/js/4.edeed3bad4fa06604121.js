webpackJsonp([4],{QLus:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("TToO"),r=i("7+uW"),o=i("c+8m"),s=i.n(o),l=i("RXoh"),n=i("abZA"),c=i("PJh5"),p=i.n(c),d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.allprescription=0,t.DOC_HANDWORK=0,t.countPreByStatuObj={},t.page=0,t.pageSize=10,t.total=100,t.prescriptionList=[],t.prescriptionEnums="",t.prescriptionEnums1="name1",t.date=[],t.key="",t.operationType="Translators",t.loading=!1,t}return a.b(t,e),t.prototype.addPrescription=function(){this.$refs.transmittable.addPrescription("add")},Object.defineProperty(t.prototype,"notCount",{get:function(){return this.countPreByStatuObj.data5?this.countPreByStatuObj.data5.count:0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"online",{get:function(){return this.countPreByStatuObj.data6?this.countPreByStatuObj.data6.count:0},enumerable:!0,configurable:!0}),t.prototype.allPrescription=function(){var e=this;l.o().then(function(t){t.retCode?(console.log(t.data),e.allprescription=t.data.All,e.DOC_HANDWORK=t.data.DOC_HANDWORK):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.countPreByStatu=function(){var e=this;l.v({}).then(function(t){t.retCode?e.countPreByStatuObj=t.data:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.onPageChange=function(e){this.page=e-1,this.getprescriptionList()},t.prototype.handleClick=function(e){this.date=["",""],this.key="",this.page=0,"name1"!==this.prescriptionEnums1&&(this.prescriptionEnums=""),this.getprescriptionList()},t.prototype.getprescriptionList=function(e){var t=this;void 0===e&&(e=null),e&&(this.page=0),"name1"==this.prescriptionEnums1&&(this.prescriptionEnums="NOT_TRANSLATED_OR_REJECT_AUDIT_PRESCRIPTION");var i={prescriptionEnums:this.prescriptionEnums,key:this.key,startCreatTime:this.date&&this.date.length>0?p()(this.date[0]).format("YYYY-MM-DD")+" 00:00:00":"",endCreatTime:this.date&&this.date.length>0?p()(this.date[1]).format("YYYY-MM-DD")+" 23:59:59":""};"name2"==this.prescriptionEnums1&&Object.assign(i,{onlineFlag:1}),"name3"==this.prescriptionEnums1&&(i.preTypeEnum="DOC_HANDWORK"),sessionStorage.tranObject=JSON.stringify(i),Object.assign(i,{page:this.page,pageSize:this.pageSize}),this.loading=!0,l.R(i).then(function(e){t.loading=!1,t.countPreByStatu(),e.retCode?(t.prescriptionList=e.data.list,t.total=e.data.page.total):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},t.prototype.mounted=function(){this.allPrescription(),this.getprescriptionList()},t=a.a([s()({props:{},components:{transmittable:n.a}})],t)}(r.default),m={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:e.loading,expression:"loading"}]},[i("div",{},[i("h3",[e._v("转方管理\n          ")]),e._v(" "),i("div",{staticStyle:{"padding-bottom":"20px"}},[i("span",{staticStyle:{"margin-right":"20px"}},[e._v("平台处方数量统计："+e._s(e.allprescription)+" 个")]),e._v(" "),i("span",{staticStyle:{"margin-right":"20px"}},[e._v("待转方数量："+e._s(e.notCount)+" 个")]),e._v(" "),i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){e.addPrescription()}}},[e._v("线下订单")])],1)]),e._v(" "),i("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.prescriptionEnums1,callback:function(t){e.prescriptionEnums1=t},expression:"prescriptionEnums1"}},[i("el-tab-pane",{attrs:{label:"未转方（"+e.notCount+"）",name:"name1"}},[i("div",{staticStyle:{"padding-bottom":"20px"}},[i("el-row",{staticStyle:{"padding-left":"80px"},attrs:{gutter:10}},[i("el-col",{attrs:{xs:24,sm:16,md:8,lg:6,xl:6}},[i("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名/处方号/手机号",clearable:""},model:{value:e.key,callback:function(t){e.key=t},expression:"key"}})],1),e._v(" "),i("el-col",{staticStyle:{"min-width":"360px"},attrs:{xs:2,sm:2,md:2,lg:2,xl:2}},[i("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),i("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[i("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getprescriptionList(!0)}}},[e._v("查询")])],1)],1)],1),e._v(" "),i("transmittable",{ref:"transmittable",attrs:{table:e.prescriptionList,operationType:e.operationType},on:{getprescriptionList:e.getprescriptionList}})],1),e._v(" "),i("el-tab-pane",{attrs:{label:"直接开方（"+e.DOC_HANDWORK+"）",name:"name3"}},[i("div",{staticStyle:{"padding-bottom":"20px"}},[i("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:10}},[i("el-form",{attrs:{"label-width":"80px",inline:!0}},[i("el-col",{attrs:{xs:24,sm:14,md:12,lg:12,xl:12}},[i("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"状态"}},[i("el-select",{model:{value:e.prescriptionEnums,callback:function(t){e.prescriptionEnums=t},expression:"prescriptionEnums"}},[i("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),i("el-option",{attrs:{value:"NOT_TRANSLATED_PRESCRIPTION",label:"未转方"}}),e._v(" "),i("el-option",{attrs:{value:"ALREADY_TRANSLATED_PRESCRIPTION",label:"已转方"}}),e._v(" "),i("el-option",{attrs:{value:"ALREADY_AUDIT_PRESCRIPTION",label:"已审方"}}),e._v(" "),i("el-option",{attrs:{value:"REJECT_TRANSLATED_PRESCRIPTION",label:"已驳回开方"}}),e._v(" "),i("el-option",{attrs:{value:"REJECT_AUDIT_PRESCRIPTION",label:"审方退回"}})],1)],1)],1)],1)],1),e._v(" "),i("el-row",{staticStyle:{"padding-left":"80px"},attrs:{gutter:10}},[i("el-col",{attrs:{xs:24,sm:16,md:8,lg:6,xl:6}},[i("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名/处方号/手机号",clearable:""},model:{value:e.key,callback:function(t){e.key=t},expression:"key"}})],1),e._v(" "),i("el-col",{staticStyle:{"min-width":"360px"},attrs:{xs:2,sm:2,md:2,lg:2,xl:2}},[i("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),i("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[i("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getprescriptionList(!0)}}},[e._v("查询")])],1)],1)],1),e._v(" "),i("transmittable",{ref:"transmittable",attrs:{table:e.prescriptionList,operationType:e.operationType},on:{getprescriptionList:e.getprescriptionList}})],1),e._v(" "),i("el-tab-pane",{attrs:{label:"在线开方24h内（"+e.online+"）",name:"name2"}},[i("transmittable",{ref:"transmittable",attrs:{table:e.prescriptionList,operationType:e.operationType},on:{getprescriptionList:e.getprescriptionList}})],1),e._v(" "),i("el-tab-pane",{attrs:{label:"全部（"+e.allprescription+"）",name:"name4"}},[i("div",{staticStyle:{"padding-bottom":"20px"}},[i("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:10}},[i("el-form",{attrs:{"label-width":"80px",inline:!0}},[i("el-col",{attrs:{xs:24,sm:14,md:12,lg:12,xl:12}},[i("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"状态"}},[i("el-select",{model:{value:e.prescriptionEnums,callback:function(t){e.prescriptionEnums=t},expression:"prescriptionEnums"}},[i("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),i("el-option",{attrs:{value:"NOT_TRANSLATED_PRESCRIPTION",label:"未转方"}}),e._v(" "),i("el-option",{attrs:{value:"ALREADY_TRANSLATED_PRESCRIPTION",label:"已转方"}}),e._v(" "),i("el-option",{attrs:{value:"ALREADY_AUDIT_PRESCRIPTION",label:"已审方"}}),e._v(" "),i("el-option",{attrs:{value:"REJECT_TRANSLATED_PRESCRIPTION",label:"已驳回开方"}}),e._v(" "),i("el-option",{attrs:{value:"REJECT_AUDIT_PRESCRIPTION",label:"审方退回"}})],1)],1)],1)],1)],1),e._v(" "),i("el-row",{staticStyle:{"padding-left":"80px"},attrs:{gutter:10}},[i("el-col",{attrs:{xs:24,sm:16,md:8,lg:6,xl:6}},[i("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名/处方号/手机号",clearable:""},model:{value:e.key,callback:function(t){e.key=t},expression:"key"}})],1),e._v(" "),i("el-col",{staticStyle:{"min-width":"360px"},attrs:{xs:2,sm:2,md:2,lg:2,xl:2}},[i("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),i("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[i("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getprescriptionList(!0)}}},[e._v("查询")])],1)],1)],1),e._v(" "),i("transmittable",{ref:"transmittable",attrs:{table:e.prescriptionList,operationType:e.operationType},on:{getprescriptionList:e.getprescriptionList}})],1)],1),e._v(" "),i("el-col",{staticClass:"toolbar",attrs:{span:24}},[i("el-pagination",{attrs:{layout:"prev, pager, next","current-page":e.page+1,"page-size":e.pageSize,total:e.total},on:{"current-change":e.onPageChange}})],1)],1)},staticRenderFns:[]};var u=i("VU/8")(d,m,!1,function(e){i("bvMp")},"data-v-7a9ddf20",null);t.default=u.exports},REiQ:function(e,t){},abZA:function(e,t,i){"use strict";var a=i("TToO"),r=i("7+uW"),o=i("c+8m"),s=i.n(o),l=i("EOM2"),n=i("RXoh"),c=i("CMXh"),p=i("k9eN"),d=i("FL7F"),m=i("K8i7"),u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.filter_doctor=!1,t.filter_type="doctor",t.filter_model=!1,t.add_model=!1,t.add_model_loading=!1,t.cancelLoading=!1,t.add_footer_loading=!1,t.add_upload_loading=!1,t.noMessage_model=!1,t.noMessage_loading=!1,t.createForm={feeTypeEnum:"SHOW",preTypeEnum:"BACK_HANDWORK"},t.fileList=[],t.dialogImageUrl="",t.dialogVisible=!1,t.fileUploadUrl="",t.value="",t.options4=[],t.options5=[],t.add_model_type="add",t.mobile="",t.resultList=[],t.preIndex=0,t.row={},t.model=!1,t.prescriptioninfoObj={},t.preImageList=[],t.preDrugList=[],t.provinceList=[],t.cityList=[],t.countryList=[],t}return a.b(t,e),t.prototype.changefilter_box=function(e){this.filter_type=e,this.filter_model=!this.filter_model,this.resultList=[],this.mobile=""},t.prototype.submitForm=function(){var e=this;if(""===(this.createForm.doctorid||"")&&"add"==this.add_model_type||""===(this.createForm.docterId||"")&&"edit"==this.add_model_type)this.$message("请选择医生");else{if("add"==this.add_model_type){if(""===(this.createForm.memberName||""))return void this.$message("请输入患者姓名");if(""===(this.createForm.patientMobile||""))return void this.$message("请输入患者手机号")}else{if(""===(this.createForm.memberName||""))return void this.$message("请输入患者姓名");if(""===(this.createForm.patientMobile||""))return void this.$message("请输入患者手机号");if(""===(this.createForm.memberSex||""))return void this.$message("请选择患者性别");if(""===(this.createForm.memberAge||""))return void this.$message("请输入患者年龄");if(""===(this.createForm.memberIdcard||""))return void this.$message("请输入患者身份证")}if(""===(this.createForm.servicemoney||"")&&"add"==this.add_model_type||""===(this.createForm.serviceMoney||"")&&"edit"==this.add_model_type)this.$message("请输入治疗服务费");else{if(this.fileList.length>0&&"add"==this.add_model_type)this.createForm.photourl=this.fileList.map(function(e){return e.url}).join(",");else{if(!(this.fileList.length>0&&"edit"==this.add_model_type))return void this.$message("请上传处方图片");this.createForm.pictureIds=this.fileList.map(function(e){return e.url}).join(",")}var t=function(){e.add_model_loading=!0,e.add_footer_loading=!0,e.cancelLoading=!0},i=function(){e.add_model_loading=!1,e.add_footer_loading=!1,e.cancelLoading=!1};if("edit"===this.add_model_type){if(this.createForm.serviceMoney=this.createForm.servicemoney,this.createForm.feeHide=this.createForm.feeTypeEnum,""===(this.createForm.consigneeName||""))return void this.$message("请输入收件人");if(""===(this.createForm.consigneePhone||""))return void this.$message("请输入收件号码");if(""===(this.createForm.provinceid||"")||""===(this.createForm.cityid||"")||""===(this.createForm.areaid||""))return void this.$message("请选择收货地区");if(""===(this.createForm.consigneeAddress||""))return void this.$message("请输入收件地址");t(),n._46(this.createForm).then(function(t){i(),t.retCode?(e.$message("更新成功"),e.add_model=!1,e.$emit("getprescriptionList")):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})}else t(),n.w(this.createForm).then(function(t){i(),t.retCode?(e.$message("新增成功"),e.add_model=!1,e.$emit("getprescriptionList")):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})}}},t.prototype.changefeeTypeEnum=function(){"SHOW"!==this.createForm.feeTypeEnum?"HIDE"!==this.createForm.feeTypeEnum||(this.createForm.feeTypeEnum="SHOW"):this.createForm.feeTypeEnum="HIDE"},t.prototype.handleSuccess1=function(e,t,i){var a={name:"1.png",url:e.data.filename};this.fileList.push(a),this.add_upload_loading=!1},t.prototype.handleRemove=function(e,t){for(var i in this.fileList){if(this.fileList[i].url==e.url){console.log("find ..."),this.fileList.splice(i,1);break}}},t.prototype.handlePictureCardPreview=function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},t.prototype.beforeUpload=function(e){this.add_upload_loading=!0;var t=e.size/1024/1024<5;return t||this.$message.error("上传图片大小不能超过 5MB!"),t},t.prototype.addPrescription=function(e,t){var i=this;this.createForm={feeTypeEnum:"SHOW",preTypeEnum:"BACK_HANDWORK"},this.fileList=[],this.add_model_type=e,t?(this.add_model_loading=!0,this.add_footer_loading=!0,t.servicemoney=t.serviceMoney,t.feeTypeEnum=t.feeHide,this.getPrePic(t.presId,function(){var e={};Object.assign(e,t),i.createForm=e;var a=i.createForm.cityid,r=i.createForm.areaid;i.queryCityList(),i.createForm.cityid=a,i.queryCountryList(),i.createForm.areaid=r,i.add_model_loading=!1,i.add_footer_loading=!1}),this.add_model=!this.add_model):(sessionStorage.presId="",this.$router.push({name:"handleransmit",params:{pres_type:"BACK_HANDWORK"}}))},t.prototype.getPrePic=function(e,t){var i=this;n._12({preId:e}).then(function(e){e.retCode&&(i.fileList=e.data.map(function(e){return{name:"1.png",url:e.presImageUrl}})),t()})},t.prototype.select_item=function(e){e.doctorId&&(this.createForm.doctorid=e.doctorId,this.createForm.docterId=e.doctorId,this.createForm.docterName=e.name,this.createForm.doctorMobile=e.phone,this.createForm.hospitalName=e.hospitalName,this.createForm.docterDept=e.hospitalDepartment),e.memberId&&(this.createForm.memberId=e.memberId,this.createForm.memberid=e.memberId,this.createForm.memberName=e.name,this.createForm.patientMobile=e.phone,this.createForm.memberSex=e.sex,this.createForm.memberIdcard=e.idCard,this.createForm.memberAge=e.age,this.getMenberdefaultaddress(e.memberId)),this.filter_model=!1},t.prototype.getMenberdefaultaddress=function(e){var t=this;n._8({userId:e}).then(function(e){e.retCode?e.data.addressId&&(t.createForm.consigneeName=e.data.contactName,t.createForm.consigneePhone=e.data.contactMobile,t.createForm.consigneeAddress=e.data.address,t.createForm.provinceid=e.data.provinceid,t.queryCityList(),t.createForm.cityid=e.data.cityid,t.queryCountryList(),t.createForm.areaid=e.data.countryid):e.islogin||t.$alert(e.message)})},t.prototype.changeMember=function(e){var t=this.options5.filter(function(t){return e===t.memberId})[0];t.name&&(this.createForm.memberName=t.name),t.phone&&(this.createForm.phone=t.phone)},t.prototype.filtering=function(){var e=this;if(this.mobile){this.noMessage_model=!1,this.noMessage_loading=!0;var t=function(){e.noMessage_loading=!1},i=function(){0===e.resultList.length&&(e.noMessage_model=!0)};"doctor"===this.filter_type&&p.o(0,100,this.mobile,"").then(function(a){t(),a.retCode?(e.resultList=a.data.list,i()):a.islogin||e.$alert(a.message)}),"menber"===this.filter_type&&n.S({keyname:this.mobile,page:0,pageSize:100}).then(function(a){t(),a.retCode?(e.resultList=a.data.list,i()):a.islogin||e.$alert(a.message)})}},t.prototype.handleransmit=function(e,t){sessionStorage.presId=t.presId,this.$router.push({name:"handleransmit",params:"DOC_HANDWORK"===t.prescriptionType?{pres_type:"DOC_HANDWORK"}:null})},t.prototype.handleStatus=function(e){switch(e){case"NOT_TRANSLATED_PRESCRIPTION":return"未转方";case"ALREADY_TRANSLATED_PRESCRIPTION":return"已转方";case"FAIL_TRANSLATED_PRESCRIPTION":return"转方失败";case"REJECT_TRANSLATED_PRESCRIPTION":return"已驳回开方";case"ALREADY_AUDIT_PRESCRIPTION":return"已审方";case"FAIL_AUDIT_PRESCRIPTION":return"审方失败";case"GIVEUP_PRESCRIPTION":return"弃单";case"REJECT_AUDIT_PRESCRIPTION":return"/audit"==this.$route.path?"已驳回转方":"审方退回";default:return""}},t.prototype.handlepreDrugType=function(e){switch(e){case"CHINESE_MEDICINE":return{name:"中药",type:"success"};case"WESTERN_MEDICINE":return{name:"西药",type:"warning"};case"PASTE_PRESCRIPTION":return{name:"膏方",type:""};default:return{name:"",type:""}}},t.prototype.handleprescriptionType=function(e){switch(e){case"BACK_HANDWORK":return{name:"线下订单",type:"success"};case"ONLINE":return{name:"在线处方",type:"warning"};case"DOC_HANDWORK":return{name:"直接开方",type:"warning"};case"PHOTO":return{name:"普通单",type:""};default:return{name:"",type:""}}},t.prototype.audit=function(e,t){sessionStorage.presId=t.presId,this.$router.push("/saveaudit")},t.prototype.changeModel=function(e,t){this.row=t,this.prescriptioninfoObj=t,this.$refs.prescriptioninfo.getInfo()},t.prototype.queryCountryList=function(){var e=this;this.createForm.areaid="",m.f(this.createForm.cityid).then(function(t){e.countryList=t.data.region})},t.prototype.queryCityList=function(){var e=this;this.createForm.cityid="",this.createForm.areaid="",m.e(this.createForm.provinceid).then(function(t){e.cityList=t.data.region})},t.prototype.queryProvinceList=function(){var e=this;m.g().then(function(t){e.provinceList=t.data.region})},t.prototype.updated=function(){},t.prototype.mounted=function(){this.queryProvinceList(),this.fileUploadUrl=d.d},a.a([Object(l.Prop)({required:!0}),a.c("design:type",Object)],t.prototype,"table",void 0),a.a([Object(l.Prop)({required:!1}),a.c("design:type",Object)],t.prototype,"prescriptionEnums",void 0),a.a([Object(l.Prop)({required:!1}),a.c("design:type",Object)],t.prototype,"operationType",void 0),t=a.a([s()({props:{},components:{prescriptioninfo:c.a}})],t)}(r.default),_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.table,stripe:"",height:"500"}},[a("el-table-column",{attrs:{fixed:"left",label:"状态",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n      "+e._s(e.handleStatus(t.row.presState))+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"createDate",label:"开方时间",width:"170"}}),e._v(" "),a("el-table-column",{attrs:{prop:"docterName",label:"开方医生",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"doctorMobile",label:"开方医生手机号",width:"170"}}),e._v(" "),a("el-table-column",{attrs:{prop:"hospitalName",label:"医院",width:"190"}}),e._v(" "),a("el-table-column",{attrs:{prop:"docterDept",label:"科室",width:"130"}}),e._v(" "),a("el-table-column",{attrs:{prop:"memberName",label:"患者姓名",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"patientSex",label:"患者性别",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"memberAge",label:"患者年龄",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"memberPhone",label:"患者手机号",width:"170"}}),e._v(" "),a("el-table-column",{attrs:{prop:"consigneeAddress",label:"患者地址",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"patientRemake",label:"医生给患者备注",width:"170"}}),e._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"医生给转方备注",width:"170"}}),e._v(" "),a("el-table-column",{attrs:{prop:"transDocName",label:"转方医生",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"transDate",label:"转方时间",width:"170"}}),e._v(" "),a("el-table-column",{attrs:{label:"处方类型",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.preDrugType?a("div",e._l(t.row.preDrugType.split(","),function(t){return a("el-tag",{staticStyle:{"margin-right":"10px"},attrs:{type:e.handlepreDrugType(t).type}},[e._v("\n        "+e._s(e.handlepreDrugType(t).name)+"\n")])})):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"订单类型",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.prescriptionType?a("el-tag",{attrs:{type:e.handleprescriptionType(t.row.prescriptionType).type}},[e._v("\n        "+e._s(e.handleprescriptionType(t.row.prescriptionType).name)+"\n")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"transRemark",label:"转方备注",width:"220"}}),e._v(" "),a("el-table-column",{attrs:{prop:"auditingName",label:"审方医生",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"auditingDate",label:"审方时间",width:"170"}}),e._v(" "),a("el-table-column",{attrs:{prop:"diagnose",label:"诊断",width:"220"}}),e._v(" "),a("el-table-column",{attrs:{prop:"presId",label:"处方编号",width:"210"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){e.changeModel(t.$index,t.row)}}},[e._v("处方详情")]),e._v(" "),"NOT_TRANSLATED_PRESCRIPTION"!=t.row.presState&&"REJECT_AUDIT_PRESCRIPTION"!=t.row.presState&&"FAIL_TRANSLATED_PRESCRIPTION"!=t.row.presState||"/audit"===e.$route.path?e._e():a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){e.handleransmit(t.$index,t.row)}}},[e._v(" \n          "+e._s("NOT_TRANSLATED_PRESCRIPTION"!==t.row.presState?"重新转方":"转方"))]),e._v(" "),"/audit"!=e.$route.path||"ALREADY_TRANSLATED_PRESCRIPTION"!=t.row.presState&&"FAIL_AUDIT_PRESCRIPTION"!=t.row.presState?e._e():a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){e.audit(t.$index,t.row)}}},[e._v(e._s("FAIL_AUDIT_PRESCRIPTION"==t.row.presState?"重新审方":"审方"))])]}}])})],1),e._v(" "),a("prescriptioninfo",{ref:"prescriptioninfo",attrs:{row:e.prescriptioninfoObj}}),e._v(" "),a("el-dialog",{staticClass:"min_box",attrs:{width:"70vw","close-on-click-modal":!1,title:"add"==e.add_model_type?"新增线下订单":"完善手工单（"+e.handleprescriptionType(e.createForm.prescriptionType).name+"）","append-to-body":!0,visible:e.add_model},on:{"update:visible":function(t){e.add_model=t}}},[a("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:e.add_model_loading,expression:"add_model_loading"}],staticStyle:{"min-height":"500px"}},[a("el-form",{attrs:{"label-width":"100px"}},[a("div",{staticClass:"min_title"},[e._v("\n医患信息\n")]),e._v(" "),a("div",{staticClass:"flex",staticStyle:{margin:"15px"}},[a("div",{staticClass:" dashed_box",class:e.createForm.docterId&&!e.filter_doctor||"add"!=e.add_model_type?"":"opactiy",on:{mouseover:function(t){e.filter_doctor=!0},mouseout:function(t){e.filter_doctor=!1}}},[a("i",{staticClass:"iconfont icon-yisheng",staticStyle:{"font-size":"36px",position:"absolute",top:"6px",left:"0"}}),e._v(" "),e.createForm.docterId&&!e.filter_doctor||"add"!=e.add_model_type?e._e():a("div",{staticClass:"filter_min_box flex  flex-align-center flex-pack-center",on:{click:function(t){e.changefilter_box("doctor")}}},[a("i",{staticClass:"el-icon-plus",staticStyle:{"font-size":"27px"}})]),e._v(" "),a("div",{staticStyle:{"min-width":"220px","text-align":"center",height:"100%","border-radius":"11px"},style:e.createForm.docterId&&!e.filter_doctor||"add"!=e.add_model_type?"":"opacity: 0.3;"},[a("div",{staticStyle:{padding:"10px"}},[a("img",{staticStyle:{height:"110px",width:"110px",margin:"5px 10px"},attrs:{src:i("qoG6")}}),e._v(" "),a("div",[e._v(e._s(e.createForm.docterName?e.createForm.docterName:"-"))]),e._v(" "),a("div",[e._v(e._s(e.createForm.doctorMobile?e.createForm.doctorMobile:"-"))]),e._v(" "),a("div",{staticStyle:{"text-align":"left"}},[e._v("医院："),a("span",{staticStyle:{color:"#8492a6","font-size":"13px"}},[e._v(e._s(e.createForm.hospitalName?e.createForm.hospitalName:"-"))])]),e._v(" "),a("div",{staticStyle:{"text-align":"left"}},[e._v("科室："),a("span",{staticStyle:{color:"#8492a6","font-size":"13px"}},[e._v(e._s(e.createForm.docterDept?e.createForm.docterDept:"-"))])])])])]),e._v(" "),a("div",{staticClass:"flex-1",staticStyle:{"margin-left":"15px","border-radius":"11px"}},[a("div",{staticClass:" dashed_box"},[a("div",{staticClass:"flex   flex-pack-justify flex-align-center",staticStyle:{padding:"10px 10px 0"}},[a("i",{staticClass:"iconfont icon-huanzhe",staticStyle:{"font-size":"24px"}}),e._v(" "),a("div",{staticClass:"flex  flex-align-center opactiy",staticStyle:{cursor:"pointer"},on:{click:function(t){e.changefilter_box("menber")}}},[a("i",{staticClass:"iconfont icon-sousuo1"}),e._v(" "),a("div",[e._v("搜患者")])])]),e._v(" "),a("div",{staticStyle:{padding:"0 10px 10px"}},[a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"患者姓名："}},[a("el-input",{attrs:{size:"mini",placeholder:"请输入患者姓名",clearable:""},model:{value:e.createForm.memberName,callback:function(t){e.$set(e.createForm,"memberName",t)},expression:"createForm.memberName"}})],1),e._v(" "),a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"患者手机号："}},[a("el-input",{attrs:{size:"mini",placeholder:"请输入患者手机号",clearable:""},model:{value:e.createForm.patientMobile,callback:function(t){e.$set(e.createForm,"patientMobile",t)},expression:"createForm.patientMobile"}})],1),e._v(" "),a("div",[a("div",{staticClass:"flex"},[a("div",[a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"患者性别："}},[a("el-radio",{attrs:{label:"男"},model:{value:e.createForm.memberSex,callback:function(t){e.$set(e.createForm,"memberSex",t)},expression:"createForm.memberSex"}},[e._v("男")]),e._v(" "),a("el-radio",{attrs:{label:"女"},model:{value:e.createForm.memberSex,callback:function(t){e.$set(e.createForm,"memberSex",t)},expression:"createForm.memberSex"}},[e._v("女")])],1)],1),e._v(" "),a("div",{staticClass:"flex-1"},[a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"患者年龄："}},[a("el-input",{attrs:{size:"mini",placeholder:"请输入患者年龄",clearable:""},model:{value:e.createForm.memberAge,callback:function(t){e.$set(e.createForm,"memberAge",t)},expression:"createForm.memberAge"}})],1)],1)]),e._v(" "),a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"患者身份证："}},[a("el-input",{attrs:{size:"mini",placeholder:"请输入患者身份证",clearable:""},model:{value:e.createForm.memberIdcard,callback:function(t){e.$set(e.createForm,"memberIdcard",t)},expression:"createForm.memberIdcard"}})],1),e._v(" "),a("div",{staticStyle:{margin:"10px 0","border-top":"1px #FAFAFA solid"}}),e._v(" "),a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"收件人："}},[a("el-input",{attrs:{size:"mini",placeholder:"请输入收件人",clearable:""},model:{value:e.createForm.consigneeName,callback:function(t){e.$set(e.createForm,"consigneeName",t)},expression:"createForm.consigneeName"}})],1),e._v(" "),a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"收件号码："}},[a("el-input",{attrs:{size:"mini",placeholder:"请输入收件号码",clearable:""},model:{value:e.createForm.consigneePhone,callback:function(t){e.$set(e.createForm,"consigneePhone",t)},expression:"createForm.consigneePhone"}})],1),e._v(" "),a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"收货地区："}},[a("div",{staticStyle:{"white-space":"nowrap",overflow:"hidden"}},[a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{xs:24,sm:12,md:8,lg:8,xl:6}},[a("el-select",{attrs:{size:"mini"},on:{change:function(t){e.queryCityList()}},model:{value:e.createForm.provinceid,callback:function(t){e.$set(e.createForm,"provinceid",t)},expression:"createForm.provinceid"}},e._l(e.provinceList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:8,xl:6}},[a("el-select",{attrs:{size:"mini"},on:{change:function(t){e.queryCountryList()}},model:{value:e.createForm.cityid,callback:function(t){e.$set(e.createForm,"cityid",t)},expression:"createForm.cityid"}},e._l(e.cityList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:8,xl:6}},[a("el-select",{attrs:{size:"mini"},model:{value:e.createForm.areaid,callback:function(t){e.$set(e.createForm,"areaid",t)},expression:"createForm.areaid"}},e._l(e.countryList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1)],1)],1)]),e._v(" "),a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"收件地址："}},[a("el-input",{attrs:{placeholder:"请输入收件地址",maxlength:"50",size:"mini",clearable:""},model:{value:e.createForm.consigneeAddress,callback:function(t){e.$set(e.createForm,"consigneeAddress",t)},expression:"createForm.consigneeAddress"}})],1)],1)],1)])])]),e._v(" "),a("div",{staticClass:"min_title"},[e._v("\n处方图片\n")]),e._v(" "),a("div",{staticStyle:{padding:"15px"}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.add_upload_loading,expression:"add_upload_loading"}],staticStyle:{"margin-bottom":"22px"}},[a("el-upload",{ref:"upload",attrs:{accept:".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF",action:e.fileUploadUrl,"list-type":"picture-card","before-upload":e.beforeUpload,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"on-success":e.handleSuccess1,"file-list":e.fileList}},[a("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"治疗服务费："}},[a("el-input",{staticStyle:{"max-width":"400px","min-width":"200px"},attrs:{placeholder:"请输入治疗服务费",size:"small"},model:{value:e.createForm.servicemoney,callback:function(t){e.$set(e.createForm,"servicemoney",t)},expression:"createForm.servicemoney"}},[a("span",{staticStyle:{margin:"10px",cursor:"pointer","font-size":"12px"},style:"SHOW"==e.createForm.feeTypeEnum?"color:#000":"",attrs:{slot:"suffix"},on:{click:function(t){e.changefeeTypeEnum()}},slot:"suffix"},[e._v(e._s("SHOW"==e.createForm.feeTypeEnum?"已显示":"已隐藏"))])])],1)],1)])],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{disabled:e.cancelLoading},on:{click:function(t){e.add_model=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:e.add_footer_loading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确 定")])],1)]),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})]),e._v(" "),a("el-dialog",{staticClass:"filter_box",attrs:{width:"70vw","close-on-click-modal":!1,title:"搜索","append-to-body":!0,visible:e.filter_model},on:{"update:visible":function(t){e.filter_model=t}}},[a("div",[a("div",{staticClass:"filter_select",staticStyle:{padding:"10px","text-align":"left"}},[a("el-input",{staticClass:"input-with-select",staticStyle:{"min-width":"200px","max-width":"400px"},attrs:{placeholder:"请输入手机号",size:"small"},model:{value:e.mobile,callback:function(t){e.mobile=t},expression:"mobile"}},[a("el-select",{staticClass:"filter_select",attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:e.filter_type,callback:function(t){e.filter_type=t},expression:"filter_type"}},[a("el-option",{attrs:{label:"医生",value:"doctor",disabled:"edit"==e.add_model_type}}),e._v(" "),a("el-option",{attrs:{label:"患者",value:"menber"}})],1),e._v(" "),a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(t){e.filtering()}},slot:"append"})],1)],1),e._v(" "),a("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:e.noMessage_loading,expression:"noMessage_loading"}],staticStyle:{height:"500px",overflow:"auto"}},[e.noMessage_model?a("div",{staticClass:"flex flex-pack-center  flex-align-center",staticStyle:{height:"100%"}},[a("i",{staticClass:"iconfont icon-shangxin",staticStyle:{"font-size":"90px"}}),e._v(" "),a("div",[a("div",[e._v("搜索不到任何患者")]),e._v(" "),a("div",{staticStyle:{color:"#8492a6","font-size":"13px"}},[e._v("试试输入准确的信息吧~")])])]):e._e(),e._v(" "),a("div",{staticClass:"flex flex-warp-justify"},e._l(e.resultList,function(t,r){return a("div",{staticClass:"flex doctorCard textLabel",on:{click:function(i){e.select_item(t)}}},[t.doctorId?a("img",{staticStyle:{height:"80px",width:"80px",margin:"5px 10px"},attrs:{src:i("qoG6")}}):e._e(),e._v(" "),t.memberId?a("img",{staticStyle:{height:"80px",width:"80px",margin:"5px 10px"},attrs:{src:i("gAzu")}}):e._e(),e._v(" "),a("div",{staticClass:"textLabel",staticStyle:{"line-height":"20px"}},[a("div",{staticClass:"textLabel"},[e._v(e._s(t.name))]),e._v(" "),a("div",[e._v(e._s(t.phone))]),e._v(" "),t.docterId?a("div",[a("div",{staticClass:"textLabel",staticStyle:{"text-align":"left"}},[e._v("医院："),a("span",{staticStyle:{color:"#8492a6","font-size":"13px"}},[e._v(e._s(t.hospitalName))])]),e._v(" "),a("div",{staticClass:"textLabel",staticStyle:{"text-align":"left"}},[e._v("科室："),a("span",{staticStyle:{color:"#8492a6","font-size":"13px"}},[e._v(e._s(t.docterDept))])])]):a("div",[a("div",{staticClass:"textLabel",staticStyle:{"text-align":"left"}},[a("span",[e._v(" 性别："),a("span",{staticStyle:{color:"#8492a6","font-size":"13px"}},[e._v(e._s(t.sex?t.sex:"-"))])]),e._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[e._v("  年龄："),a("span",{staticStyle:{color:"#8492a6","font-size":"13px"}},[e._v(e._s(t.age?t.age:"-"))])])]),e._v(" "),a("div",{staticClass:"textLabel",staticStyle:{"text-align":"left"}},[e._v("身份证："),a("span",{staticStyle:{color:"#8492a6","font-size":"13px"}},[e._v(e._s(t.idCard?t.idCard:"-"))])])])])])}))])])])],1)},staticRenderFns:[]};var h=i("VU/8")(u,_,!1,function(e){i("REiQ")},"data-v-562e4f0c",null);t.a=h.exports},bvMp:function(e,t){}});
//# sourceMappingURL=4.edeed3bad4fa06604121.js.map