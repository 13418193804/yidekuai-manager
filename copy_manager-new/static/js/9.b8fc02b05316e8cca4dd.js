webpackJsonp([9],{"8cAg":function(t,e){},le8E:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("TToO"),r=a("7+uW"),n=a("c+8m"),l=a.n(n),i=a("PJh5"),s=a.n(i),d=a("RXoh"),c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading=!1,e.bigIcon="",e.viewBig=!1,e.page=0,e.pageSize=10,e.orderByStr="",e.total=0,e.name="",e.drug="",e.userStatus="",e.startDate="",e.endDate="",e.YdkAdviser=[],e.payOrderMoney=0,e.orderMoney=0,e.prescriptionNum=0,e.payOrderNum=0,e.orderNum=0,e.allAdviserNum=0,e.drugNum=0,e.drugQuantityTotal=0,e.adviserObj={},e.type="add",e.adviserModel=!1,e.adviserTypeEnums="",e.userStatus1=!1,e.shelfModel=!1,e.shelfObj={DocterInfo:[],loading:!1,name:"",page:0,pageSize:10,total:0,startcreateDate:"",endcreateDate:"",onPageChange:function(t){e.shelfObj.page=t-1,e.consultantItemShelf(e.shelfObj.row)},row:{}},e.notBindDoctorObj={model:!1,loading:!1,addloading:!1,doctorObj:null,YdkDoctor:[],phone:"",labelList:[{label:"医生姓名",prop:"name"},{label:"电话号码",prop:"phone"},{label:"医疗机构代码",prop:"hspCode"},{label:"医院",prop:"hospitalName"},{label:"科室",prop:"hospitalDepartment"}],page:0,pageSize:10,total:0,onPageChange:function(t){e.notBindDoctorObj.page=t-1,e.openNotBindDoctorModel(e.notBindDoctorObj.row)},row:{}},e.drugObj={model:!1,DrugInfo:[],startcreateDate:"",endcreateDate:"",page:0,pageSize:10,total:0,onPageChange:function(t){e.drugObj.page=t-1,e.adviserGetDrug(e.drugObj.row)},row:{}},e.adviserCount=0,e.fontType="",e}return o.b(e,t),e.prototype.viewBigIcon=function(t){this.bigIcon=t,this.viewBig=!0},e.prototype.onPageChange=function(t){this.page=t-1,this.getConsultantList()},e.prototype.getConsultantList=function(t){var e=this;void 0===t&&(t=null),this.loading=!0,t&&(this.page=0);var a="",o="";""!=(this.startDate||"")&&(a=s()(this.startDate).format("YYYY-MM-DD")+" 00:00:00"),""!=(this.endDate||"")&&(o=s()(this.endDate).format("YYYY-MM-DD")+" 23:59:59");var r={page:this.page,pageSize:this.pageSize,userStatus:this.userStatus,name:this.name,drug:this.drug,startcreateDate:a,endcreateDate:o,orderByStr:this.orderByStr};d.P(r).then(function(t){if(!t.retCode)return t.islogin||e.$alert(t.message),void(e.loading=!1);e.YdkAdviser=t.data.AdviserInfo,e.total=t.data.page.total,e.loading=!1,t.data.TotalInfo.length>0&&(e.orderMoney=t.data.TotalInfo[0].orderMoney?t.data.TotalInfo[0].orderMoney:0,e.payOrderMoney=t.data.TotalInfo[0].payOrderMoney?t.data.TotalInfo[0].payOrderMoney:0,e.prescriptionNum=t.data.TotalInfo[0].prescriptionNum?t.data.TotalInfo[0].prescriptionNum:0,e.orderNum=t.data.TotalInfo[0].orderNum?t.data.TotalInfo[0].orderNum:0,e.payOrderNum=t.data.TotalInfo[0].payOrderNum?t.data.TotalInfo[0].payOrderNum:0,e.allAdviserNum=t.data.TotalInfo[0].allAdviserNum?t.data.TotalInfo[0].allAdviserNum:0,e.drugNum=t.data.TotalInfo[0].drugNum?t.data.TotalInfo[0].drugNum:0,e.drugQuantityTotal=t.data.TotalInfo[0].drugQuantityTotal?t.data.TotalInfo[0].drugQuantityTotal:0)})},e.prototype.changeModel=function(t,e){if(this.adviserTypeEnums="",this.type=t,"add"==t)this.adviserObj={};else{var a={};Object.assign(a,e),this.adviserObj=a,this.userStatus1="1"==this.adviserObj.userStatus,this.adviserTypeEnums=e.adviser_type}this.adviserModel=!0},e.prototype.doSubmit=function(){var t=this;""!=(this.adviserObj.adviserName||"")?""!=(this.adviserObj.userName||"")?""!=(this.adviserTypeEnums||"")?(this.loading=!0,this.adviserObj.userPassword="123456",this.adviserObj.userStatus=this.userStatus1?"1":"0",this.adviserObj.adviserTypeEnums=this.adviserTypeEnums,"add"==this.type&&(this.adviserObj.userStatus="",d.a(this.adviserObj).then(function(e){t.loading=!1,e.retCode?(t.adviserModel=!1,t.$message("新增成功"),t.getConsultantList()):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})),"edit"==this.type&&d._26(this.adviserObj).then(function(e){t.loading=!1,e.retCode?(t.adviserModel=!1,t.$message("保存成功"),t.getConsultantList()):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})):this.$alert("请选择顾问类型"):this.$alert("请填写顾问手机号码"):this.$alert("请填写顾问姓名")},e.prototype.submitForm=function(t){var e=this;this.$refs[t].validate(function(t){return t?(e.doSubmit(),!1):(console.log("error submit!!"),!1)}).catch(function(t){console.log(t)})},e.prototype.updateStatue=function(t,e){var a=this;if("status"==t){var o="1"==e.userStatus?"0":"1";this.updateCenter({adviserId:e.adviserId,userStatus:o},function(t){t&&a.getConsultantList()})}"password"==t&&this.$confirm("此操作将重置该顾问的密码, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.updateCenter({adviserId:e.adviserId,userPassword:"123456"},function(t){t&&(a.$alert("重置成功,初始化密码为：123456"),a.getConsultantList())})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},e.prototype.updateCenter=function(t,e){var a=this;d._26(t).then(function(t){a.loading=!1,t.retCode?e(!0):(e(!1),t.islogin||a.$alert(t.message))})},e.prototype.doDelete=function(t){var e=this;this.$confirm("此操作将删除该顾问, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d.u({adviserId:t.adviserId}).then(function(t){e.loading=!1,t.retCode?(e.$message("删除成功"),e.getConsultantList()):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},e.prototype.cleanConsultantItemShelf=function(t){this.shelfObj.startcreateDate=this.startDate,this.shelfObj.endcreateDate=this.endDate,this.shelfObj.name="",this.consultantItemShelf(t,!0)},e.prototype.consultantItemShelf=function(t,e){var a=this;void 0===e&&(e=null),this.shelfObj.loading=!0,this.shelfObj.row=t,e&&(this.shelfObj.page=0);var o="",r="";""!=(this.shelfObj.startcreateDate||"")&&(o=s()(this.shelfObj.startcreateDate).format("YYYY-MM-DD")+" 00:00:00"),""!=(this.shelfObj.endcreateDate||"")&&(r=s()(this.shelfObj.endcreateDate).format("YYYY-MM-DD")+" 23:59:59"),d.g({adviserId:t.adviserId,name:this.shelfObj.name,page:this.shelfObj.page,pageSize:this.shelfObj.pageSize,startcreateDate:o,endcreateDate:r}).then(function(t){a.shelfObj.loading=!1,a.shelfModel=!0,t.retCode?(a.shelfObj.DocterInfo=t.data.DocterInfo,a.shelfObj.total=t.data.page.total):(t.islogin||a.$alert(t.message),console.error("数据查询错误"))})},e.prototype.adviserNotBindDoctor=function(t){var e=this;this.$confirm("该操作对医生取消绑定状态, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.shelfObj.loading=!0,d.i({doctorId:t.doctorId,adviserTypeEnums:e.shelfObj.row.adviser_type}).then(function(t){e.shelfObj.loading=!1,t.retCode?(e.$message("取消绑定成功"),e.consultantItemShelf(e.shelfObj.row),e.getConsultantList()):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},e.prototype.cleanOpenNotBindDoctorModel=function(t){this.notBindDoctorObj.phone="",this.openNotBindDoctorModel(t)},e.prototype.openNotBindDoctorModel=function(t,e){var a=this;void 0===e&&(e=null),e&&(this.notBindDoctorObj.page=0),this.notBindDoctorObj.row=t,this.notBindDoctorObj.model=!0,this.notBindDoctorObj.loading=!0,d._8({phone:this.notBindDoctorObj.phone,adviserTypeEnums:t.adviser_type,page:this.notBindDoctorObj.page,pageSize:this.notBindDoctorObj.pageSize}).then(function(t){a.notBindDoctorObj.loading=!1,t.retCode?(a.notBindDoctorObj.YdkDoctor=t.data.YdkDoctor,a.notBindDoctorObj.total=t.data.page.total):t.islogin||a.$alert(t.message)})},e.prototype.addDoctorbind=function(t){var e=this;this.$confirm("是否绑定该医生?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.notBindDoctorObj.addloading=!0,d.f({adviserid:e.notBindDoctorObj.row.adviserId,doctorid:t.doctorId,adviserTypeEnums:e.notBindDoctorObj.row.adviser_type}).then(function(t){e.notBindDoctorObj.addloading=!1,t.retCode?(e.$message("绑定成功"),e.openNotBindDoctorModel(e.notBindDoctorObj.row),e.getConsultantList()):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})}).catch(function(){e.$message({type:"info",message:"已取消操作"})})},e.prototype.checkTime=function(t){this.fontType=t,this.adviserGetDrug(this.drugObj.row)},e.prototype.adviserGetDrugDoRow=function(t){this.fontType="",this.drugObj.startcreateDate=this.startDate,this.drugObj.endcreateDate=this.endDate,this.adviserGetDrug(t)},e.prototype.adviserGetDrug=function(t,e){var a=this;void 0===e&&(e=null),this.loading=!0,this.drugObj.row=t,e&&(this.drugObj.page=0,this.fontType="");var o="",r="";"day"==this.fontType?(o=this.getToday(),r=s()(new Date).format("YYYY-MM-DD")+" 23:59:59"):"week"==this.fontType?(o=this.getWeek(),r=s()(new Date).format("YYYY-MM-DD")+" 23:59:59"):"month"==this.fontType?(o=this.getMonth1(),r=s()(new Date).format("YYYY-MM-DD")+" 23:59:59"):(""!=(this.drugObj.startcreateDate||"")&&(o=s()(this.drugObj.startcreateDate).format("YYYY-MM-DD")+" 00:00:00"),""!=(this.drugObj.endcreateDate||"")&&(r=s()(this.drugObj.endcreateDate).format("YYYY-MM-DD")+" 23:59:59")),d.h({adviserId:t.adviserId,page:this.drugObj.page,pageSize:this.drugObj.pageSize,startcreateDate:o,endcreateDate:r}).then(function(t){a.loading=!1,a.drugObj.model=!0,t.retCode?(a.drugObj.DrugInfo=t.data.DrugInfo,a.drugObj.total=t.data.page.total):(t.islogin||a.$alert(t.message),console.error("数据查询错误"))})},e.prototype.getAdviserCount=function(){var t=this;d.O({}).then(function(e){e.retCode?t.adviserCount=e.data.num:e.islogin||t.$alert(e.message)})},e.prototype.getWeek=function(){var t=new Date,e=t.getDay(),a=1-e;0==e&&(a=-7);var o=7-e,r=t.getTime(),n=new Date(r+24*a*3600*1e3);new Date(r+24*o*3600*1e3);return this.transferDate(n)+" 00:00:00"},e.prototype.getToday=function(){return s()(new Date).format("YYYY-MM-DD")+" 00:00:00"},e.prototype.getMonth1=function(){var t=new Date;return t.setDate(1),this.transferDate(t)+" 00:00:00"},e.prototype.transferDate=function(t){var e=t.getFullYear(),a=t.getMonth()+1,o=t.getDate();return a>=1&&a<=9&&(a="0"+a),o>=0&&o<=9&&(o="0"+o),e+"-"+a+"-"+o},e.prototype.sortChange=function(t){t.column;var e=t.prop,a="";switch("descending"==t.order&&(a+=" desc"),e){case"doctorNum":this.orderByStr="doctor_num"+a;break;case"orderNum":this.orderByStr="order_num"+a;break;case"orderMoney":this.orderByStr="order_money"+a;break;case"prescriptionNum":this.orderByStr="prescription_num"+a;break;case"drugNum":this.orderByStr="drug_num"+a;break;default:this.orderByStr=""}this.getConsultantList(!0)},e.prototype.mounted=function(){this.getAdviserCount(),this.getConsultantList()},e=o.a([l()({props:{},components:{}})],e)}(r.default),p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[a("div",{},[a("h3",[t._v("顾问数据")]),t._v(" "),a("div",{staticStyle:{"padding-bottom":"20px"}},[a("span",{staticStyle:{"margin-right":"20px"}},[t._v("顾问人数："+t._s(t.adviserCount)+" 个")]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("药品成交金额："+t._s(t.payOrderMoney)+" 元")]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("处方数量："+t._s(t.prescriptionNum)+" ")]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("订单数量（已成交）"+t._s(t.payOrderNum)+" ")]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("药品销售数量："+t._s(t.drugQuantityTotal)+" ")])])]),t._v(" "),a("div",{staticStyle:{"padding-bottom":"20px","border-bottom":"1px #e5e5e5 solid"}},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"顾问姓名/医生姓名/手机号码",clearable:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),a("el-col",{attrs:{xs:8,sm:8,md:5,lg:4,xl:3}},[a("el-select",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请选择状态"},model:{value:t.userStatus,callback:function(e){t.userStatus=e},expression:"userStatus"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),a("el-option",{attrs:{label:"启用",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"停用",value:"0"}})],1)],1),t._v(" "),a("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"药品名/通用名",clearable:""},model:{value:t.drug,callback:function(e){t.drug=e},expression:"drug"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"470px"},attrs:{xs:16,sm:24,md:6,lg:8,xl:5}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"325px"},attrs:{xs:5,sm:5,md:3,lg:3,xl:2}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getConsultantList(!0)}}},[t._v("查询")]),t._v(" "),a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:function(e){t.changeModel("add")}}},[t._v("添加顾问")])],1)],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.YdkAdviser,stripe:"",height:"600"},on:{"sort-change":t.sortChange}},[a("el-table-column",{attrs:{fixed:"left",prop:"adviserName",label:"顾问姓名",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"doctorNum",sortable:"custom",label:"管理医生数量",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.doctorNum?e.row.doctorNum:0)+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"orderNum",sortable:"custom",label:"总订单数量",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.orderNum?e.row.orderNum:0)+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"orderMoney",sortable:"custom",label:"总订单金额",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.orderMoney?e.row.orderMoney:0)+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"prescriptionNum",sortable:"custom",label:"总处方数量",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.prescriptionNum?e.row.prescriptionNum:0)+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"drugNum",sortable:"custom",label:"药品种类数量",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.drugNum?e.row.drugNum:0)+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"顾问类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s("OUTSIDE"==e.row.adviser_type?"外部顾问":"")+"\n           "+t._s("INSIDE"==e.row.adviser_type?"内部顾问":"")+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"手机号",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"adviserAge",label:"年龄"}}),t._v(" "),a("el-table-column",{attrs:{prop:"adviserSex",label:"性别"}}),t._v(" "),a("el-table-column",{attrs:{label:"使用状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"1"==e.row.userStatus?"success":"info"}},[t._v("\n               "+t._s("1"==e.row.userStatus?"启用中":"已停用"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"400"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){t.cleanConsultantItemShelf(e.row)}}},[t._v("医生统计")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){t.openNotBindDoctorModel(e.row)}}},[t._v("分配医生")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){t.adviserGetDrugDoRow(e.row)}}},[t._v("药品统计")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){t.changeModel("edit",e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"text"},on:{click:function(a){t.viewBigIcon(e.row.qrcode)}}},[t._v("二维码")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){t.doDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.page+1,"page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1),t._v(" "),a("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.adviserModel,title:"add"==t.type?"新增顾问":"编辑顾问"},on:{"update:visible":function(e){t.adviserModel=e}}},[a("el-form",{ref:"ruleForm",attrs:{"label-width":"120px",model:t.adviserObj,rules:t.rules}},[a("el-form-item",{attrs:{label:"顾问姓名",prop:"adviserName"}},[a("el-input",{staticStyle:{"max-width":"400px","min-width":"200px"},attrs:{placeholder:"请输入顾问姓名"},model:{value:t.adviserObj.adviserName,callback:function(e){t.$set(t.adviserObj,"adviserName",e)},expression:"adviserObj.adviserName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号码",prop:"userName"}},["add"==t.type?a("el-input",{staticStyle:{"max-width":"400px","min-width":"200px"},attrs:{placeholder:"请输入手机号码"},model:{value:t.adviserObj.userName,callback:function(e){t.$set(t.adviserObj,"userName",e)},expression:"adviserObj.userName"}}):a("span",[t._v("\t"+t._s(t.adviserObj.userName))])],1),t._v(" "),a("el-form-item",{attrs:{label:"年龄",prop:"adviserAge"}},[a("el-input",{staticStyle:{"max-width":"400px","min-width":"200px"},attrs:{placeholder:"请输入年龄"},model:{value:t.adviserObj.adviserAge,callback:function(e){t.$set(t.adviserObj,"adviserAge",e)},expression:"adviserObj.adviserAge"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"性别",prop:"adviserSex"}},[a("el-radio",{attrs:{label:"男"},model:{value:t.adviserObj.adviserSex,callback:function(e){t.$set(t.adviserObj,"adviserSex",e)},expression:"adviserObj.adviserSex"}}),t._v(" "),a("el-radio",{attrs:{label:"女"},model:{value:t.adviserObj.adviserSex,callback:function(e){t.$set(t.adviserObj,"adviserSex",e)},expression:"adviserObj.adviserSex"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"类型",prop:"adviserTypeEnums"}},[a("el-radio",{attrs:{label:"INSIDE"},model:{value:t.adviserTypeEnums,callback:function(e){t.adviserTypeEnums=e},expression:"adviserTypeEnums"}},[t._v("内部顾问")]),t._v(" "),a("el-radio",{attrs:{label:"OUTSIDE"},model:{value:t.adviserTypeEnums,callback:function(e){t.adviserTypeEnums=e},expression:"adviserTypeEnums"}},[t._v("外部顾问")])],1),t._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{staticStyle:{"max-width":"400px","min-width":"200px"},attrs:{type:"textarea",placeholder:"备注",rows:4},model:{value:t.adviserObj.remark,callback:function(e){t.$set(t.adviserObj,"remark",e)},expression:"adviserObj.remark"}})],1),t._v(" "),"add"!==t.type?a("el-form-item",{attrs:{label:"状态"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.userStatus1,callback:function(e){t.userStatus1=e},expression:"userStatus1"}})],1):t._e()],1),t._v(" "),"add"!==t.type?a("div",{staticStyle:{"margin-left":"120px","margin-bottom":"10px"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.updateStatue("password",t.adviserObj)}}},[t._v("重置密码")])],1):t._e(),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.adviserModel=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",disabled:t.loading},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("保 存")])],1)],1),t._v(" "),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.shelfObj.loading,expression:"shelfObj.loading"}],attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.shelfModel,title:"医生统计"},on:{"update:visible":function(e){t.shelfModel=e}}},[a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:10}},[a("el-col",{staticStyle:{"min-width":"200px"},attrs:{xs:16,sm:24,md:6,lg:8,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px","max-width":"400px","min-width":"200px"},attrs:{clearable:"",placeholder:"请输入医生姓名/手机号码 "},model:{value:t.shelfObj.name,callback:function(e){t.$set(t.shelfObj,"name",e)},expression:"shelfObj.name"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"470px"},attrs:{xs:16,sm:24,md:6,lg:8,xl:5}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.shelfObj.startcreateDate,callback:function(e){t.$set(t.shelfObj,"startcreateDate",e)},expression:"shelfObj.startcreateDate"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.shelfObj.endcreateDate,callback:function(e){t.$set(t.shelfObj,"endcreateDate",e)},expression:"shelfObj.endcreateDate"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"225px"},attrs:{xs:5,sm:5,md:3,lg:3,xl:2}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.consultantItemShelf(t.shelfObj.row,!0)}}},[t._v("查询")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.shelfObj.DocterInfo,stripe:"",height:"600"}},[a("el-table-column",{attrs:{fixed:"left",prop:"name",label:"医生姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"orderMoney",label:"订单金额",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"prescriptionNum",label:"处方数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"drugNum",label:"药品种类"}}),t._v(" "),a("el-table-column",{attrs:{prop:"memberNum",label:"总患者数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"shelfNumber",label:"货架号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"电话号码",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"hspCode",label:"医疗机构代码"}}),t._v(" "),a("el-table-column",{attrs:{prop:"hospitalName",label:"医院",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"hospitalDepartment",label:"科室"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createrTime",label:"创建时间",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){t.adviserNotBindDoctor(e.row)}}},[t._v("取消绑定")])]}}])})],1),t._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.shelfObj.page+1,"page-size":t.shelfObj.pageSize,total:t.shelfObj.total},on:{"current-change":t.shelfObj.onPageChange}})],1)],1),t._v(" "),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.notBindDoctorObj.addloading,expression:"notBindDoctorObj.addloading"}],attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.notBindDoctorObj.model,title:"分配医生"},on:{"update:visible":function(e){t.$set(t.notBindDoctorObj,"model",e)}}},[a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:10}},[a("el-col",{staticStyle:{"min-width":"400px"},attrs:{xs:16,sm:24,md:6,lg:8,xl:5}},[a("el-input",{staticStyle:{"max-width":"400px","min-width":"200px"},attrs:{clearable:"",placeholder:"请输入姓名/手机号/医院"},model:{value:t.notBindDoctorObj.phone,callback:function(e){t.$set(t.notBindDoctorObj,"phone",e)},expression:"notBindDoctorObj.phone"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"225px"},attrs:{xs:5,sm:5,md:3,lg:3,xl:2}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.openNotBindDoctorModel(t.notBindDoctorObj.row,!0)}}},[t._v("查询")])],1)],1),t._v(" "),a("div",{staticStyle:{"min-height":"500px"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.notBindDoctorObj.YdkDoctor,stripe:"",height:"600"}},[a("el-table-column",{attrs:{fixed:"left",prop:"name",label:"医生姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"电话号码"}}),t._v(" "),a("el-table-column",{attrs:{prop:"hspCode",label:"医疗机构代码"}}),t._v(" "),a("el-table-column",{attrs:{prop:"hospitalName",label:"医院"}}),t._v(" "),a("el-table-column",{attrs:{prop:"hospitalDepartment",label:"科室"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){t.addDoctorbind(e.row)}}},[t._v("绑定")])]}}])})],1)],1),t._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.notBindDoctorObj.page+1,"page-size":t.notBindDoctorObj.pageSize,total:t.notBindDoctorObj.total},on:{"current-change":t.notBindDoctorObj.onPageChange}})],1)],1),t._v(" "),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.drugObj.model,title:"药品统计"},on:{"update:visible":function(e){t.$set(t.drugObj,"model",e)}}},[a("div",{staticClass:"flex"},[a("div",{staticClass:"fontfilter ",class:"day"==t.fontType?"filtercheck":"",on:{click:function(e){t.checkTime("day")}}},[t._v("本日")]),t._v(" "),a("div",{staticClass:"fontfilter",class:"week"==t.fontType?"filtercheck":"",on:{click:function(e){t.checkTime("week")}}},[t._v("本周")]),t._v(" "),a("div",{staticClass:"fontfilter",class:"month"==t.fontType?"filtercheck":"",on:{click:function(e){t.checkTime("month")}}},[t._v("本月")])]),t._v(" "),a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:10}},[a("el-col",{staticStyle:{"min-width":"470px"},attrs:{xs:16,sm:24,md:6,lg:8,xl:5}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.drugObj.startcreateDate,callback:function(e){t.$set(t.drugObj,"startcreateDate",e)},expression:"drugObj.startcreateDate"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.drugObj.endcreateDate,callback:function(e){t.$set(t.drugObj,"endcreateDate",e)},expression:"drugObj.endcreateDate"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"225px"},attrs:{xs:5,sm:5,md:3,lg:3,xl:2}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.adviserGetDrug(t.drugObj.row,!0)}}},[t._v("查询")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.drugObj.DrugInfo,stripe:"",height:"600"}},[a("el-table-column",{attrs:{fixed:"left",prop:"drugName",label:"通用名",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"productName",label:"商品名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"doctorNum",label:"货架号数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"memberNum",label:"购药人次"}}),t._v(" "),a("el-table-column",{attrs:{prop:"orderNum",label:"订单数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"totalMoney",label:"总金额"}})],1),t._v(" "),a("el-table-column",{attrs:{prop:"manufacturer",label:"生产厂家"}}),t._v(" "),a("el-table-column",{attrs:{prop:"specification",label:"规格"}}),t._v(" "),a("el-table-column",{attrs:{prop:"dosageforms",label:"剂型"}}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"单价"}}),t._v(" "),a("el-table-column",{attrs:{prop:"totalQuantity",label:"数量"}}),t._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.drugObj.page+1,"page-size":t.drugObj.pageSize,total:t.drugObj.total},on:{"current-change":t.drugObj.onPageChange}})],1)],1),t._v(" "),a("el-dialog",{attrs:{visible:t.viewBig,width:"400px"},on:{"update:visible":function(e){t.viewBig=e}}},[a("img",{staticStyle:{width:"400px",height:"400px",margin:"-55px -20px -40px"},attrs:{src:t.bigIcon}})])],1)},staticRenderFns:[]};var u=a("VU/8")(c,p,!1,function(t){a("8cAg")},"data-v-78e9db85",null);e.default=u.exports}});
//# sourceMappingURL=9.b8fc02b05316e8cca4dd.js.map