webpackJsonp([22],{"HM+o":function(t,e){},TG0H:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("TToO"),o=a("7+uW"),l=a("c+8m"),n=a.n(l),i=a("PJh5"),d=a.n(i),s=a("RXoh"),p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading=!1,e.DrugInfo=[],e.page=0,e.pageSize=10,e.total=0,e.startDate="",e.endDate="",e.name="",e.drug="",e.orderMoney=0,e.prescriptionNum=0,e.orderNum=0,e.allAdviserNum=0,e.drugNum=0,e.drugAdvObj={model:!1,loading:!1,AdviserInfo:[],page:0,pageSize:10,total:0,onPageChange:function(t){e.drugAdvObj.page=t-1,e.drugGetAdviser(e.drugAdvObj.row)},row:{}},e.drugDocObj={model:!1,loading:!1,DocterInfo:[],page:0,pageSize:10,total:0,onPageChange:function(t){e.drugDocObj.page=t-1,e.drugGetDoctor(e.drugDocObj.row)},row:{}},e.countDrug=0,e}return r.b(e,t),e.prototype.onPageChange=function(t){this.page=t-1,this.adviserdrug()},e.prototype.adviserdrug=function(t){var e=this;void 0===t&&(t=null),t&&(this.page=0);var a="",r="";""!=(this.startDate||"")&&(a=d()(this.startDate).format("YYYY-MM-DD")+" 00:00:00"),""!=(this.endDate||"")&&(r=d()(this.endDate).format("YYYY-MM-DD")+" 23:59:59");var o={drug:this.drug,name:this.name,page:this.page,pageSize:this.pageSize,startcreateDate:a,endcreateDate:r};s.S(o).then(function(t){t.retCode?(console.log("total"),e.DrugInfo=t.data.DrugInfo,e.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))}),this.ypStartcreateDate(o)},e.prototype.ypStartcreateDate=function(t){var e=this;t.ypStartcreateDate=t.startcreateDate,t.ypEndcreateDate=t.endcreateDate,s._25(t).then(function(t){e.loading=!1,t.retCode?t.data.AdviserInfo.length>0&&(e.orderMoney=t.data.AdviserInfo[0].orderMoney?t.data.AdviserInfo[0].orderMoney:0,e.prescriptionNum=t.data.AdviserInfo[0].prescriptionNum?t.data.AdviserInfo[0].prescriptionNum:0,e.orderNum=t.data.AdviserInfo[0].orderNum?t.data.AdviserInfo[0].orderNum:0,e.allAdviserNum=t.data.AdviserInfo[0].allAdviserNum?t.data.AdviserInfo[0].allAdviserNum:0,e.drugNum=t.data.AdviserInfo[0].drugNum?t.data.AdviserInfo[0].drugNum:0):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.drugGetAdviser=function(t){var e=this;this.drugAdvObj.loading=!0,this.drugAdvObj.model=!0,this.drugAdvObj.row=t,s.J({manufacturer:t.manufacturer,specification:t.specification,productName:t.productName,packingUnit:t.packingUnit,drugName:t.drugName,partnerId:t.partnerId,price:t.price,page:this.drugAdvObj.page,pageSize:this.drugAdvObj.pageSize}).then(function(t){e.drugAdvObj.loading=!1,t.retCode?(console.log(t.data),e.drugAdvObj.AdviserInfo=t.data.AdviserInfo,e.drugAdvObj.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.drugGetDoctor=function(t){var e=this;this.drugDocObj.loading=!0,this.drugDocObj.model=!0,this.drugDocObj.row=t,s.K({manufacturer:t.manufacturer,specification:t.specification,productName:t.productName,packingUnit:t.packingUnit,drugName:t.drugName,partnerId:t.partnerId,price:t.price,page:this.drugDocObj.page,pageSize:this.drugDocObj.pageSize}).then(function(t){e.drugDocObj.loading=!1,t.retCode?(console.log(t.data),e.drugDocObj.DocterInfo=t.data.DocterInfo,e.drugDocObj.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.getcountDrug=function(){var t=this;s.s({}).then(function(e){e.retCode?t.countDrug=e.data.num:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.adviserdrug(),this.getcountDrug()},e=r.a([n()({props:{},components:{}})],e)}(o.default),u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{},[a("h3",[t._v("药品数据\n          ")]),t._v(" "),a("div",{staticStyle:{"padding-bottom":"20px"}},[a("span",{staticStyle:{"margin-right":"20px"}},[t._v("药品总数："+t._s(t.countDrug)+" 个")]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("订单金额："+t._s(t.orderMoney)+" 元")]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("处方数量："+t._s(t.prescriptionNum)+" ")]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("订单数量："+t._s(t.orderNum)+" ")]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("全部顾问数量："+t._s(t.allAdviserNum)+" ")]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[t._v("药品数量："+t._s(t.drugNum)+" ")])])]),t._v(" "),a("div",{staticStyle:{"padding-bottom":"20px","border-bottom":"1px #e5e5e5 solid"}},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{xs:12,sm:8,md:5,lg:6,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"药品名/通用名",clearable:""},model:{value:t.drug,callback:function(e){t.drug=e},expression:"drug"}})],1),t._v(" "),a("el-col",{attrs:{xs:12,sm:8,md:5,lg:6,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"顾问姓名/医生姓名",clearable:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"470px"},attrs:{xs:16,sm:24,md:6,lg:8,xl:5}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),t._v(" "),a("el-col",{attrs:{xs:5,sm:5,md:3,lg:3,xl:2}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.adviserdrug(!0)}}},[t._v("查询")])],1)],1)],1),t._v(" "),a("el-row",[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.DrugInfo,stripe:"",height:"600"}},[a("el-table-column",{attrs:{fixed:"left",prop:"drugName",label:"通用名",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"productName",label:"商品名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"doctorNum",label:"货架号数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"memberNum",label:"购药人次"}}),t._v(" "),a("el-table-column",{attrs:{prop:"orderNum",label:"订单数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"totalMoney",label:"总金额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"totalQuantity",label:"销售数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"shouldpay",label:"销售金额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"doctorNum",label:"代理人数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"manufacturer",label:"生产厂家"}}),t._v(" "),a("el-table-column",{attrs:{prop:"specification",label:"规格"}}),t._v(" "),a("el-table-column",{attrs:{prop:"dosageforms",label:"剂型"}}),t._v(" "),a("el-table-column",{attrs:{prop:"hisCode",label:"批准文号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"单价"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"170"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){t.drugGetAdviser(e.row)}}},[t._v("查看顾问")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){t.drugGetDoctor(e.row)}}},[t._v("查看医生")])]}}])})],1)],1),t._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.page+1,"page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1),t._v(" "),a("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.drugAdvObj.model,title:"查看顾问"},on:{"update:visible":function(e){t.$set(t.drugAdvObj,"model",e)}}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.drugAdvObj.loading,expression:"drugAdvObj.loading"}]},[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.drugAdvObj.AdviserInfo,stripe:"",height:"600"}},[a("el-table-column",{attrs:{fixed:"left",prop:"adviserName",label:"顾问姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"doctorNum",label:"管理医生数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"orderNum",label:"总订单数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"orderMoney",label:"总订单金额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"prescriptionNum",label:"总处方数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"drugNum",label:"药品种类数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"手机号",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"adviserAge",label:"年龄"}}),t._v(" "),a("el-table-column",{attrs:{prop:"adviserSex",label:"性别"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userStatus",label:"使用状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n      "+t._s("1"==e.row.userStatus?"启用中":"已禁用")+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注"}})],1),t._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.drugAdvObj.page+1,"page-size":t.drugAdvObj.pageSize,total:t.drugAdvObj.total},on:{"current-change":t.drugAdvObj.onPageChange}})],1)],1)]),t._v(" "),a("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.drugDocObj.model,title:"查看医生"},on:{"update:visible":function(e){t.$set(t.drugDocObj,"model",e)}}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.drugDocObj.loading,expression:"drugDocObj.loading"}]},[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.drugDocObj.DocterInfo,stripe:"",height:"600"}},[a("el-table-column",{attrs:{prop:"name",label:"医生姓名",fixed:"left"}}),t._v(" "),a("el-table-column",{attrs:{prop:"prescriptionNum",label:"医生处方数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"orderNum",label:"医生订单数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"orderMoney",label:"医生订单金额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"drugNum",label:"医生患者数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"hospitalName",label:"所属医院",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"账号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"hospitalDepartment",label:"所在科室"}}),t._v(" "),a("el-table-column",{attrs:{prop:"doctorGood",label:"医生主治",width:"180","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"doctorBrief",label:"医生简介",width:"180","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"consultingFee",label:"咨询价格"}}),t._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注"}}),t._v(" "),a("el-table-column",{attrs:{prop:"doctorStatus",label:"使用状态"},scopedSlots:t._u([{key:"default",fn:function(e){return["DINI"==e.row.doctorStatus?a("el-tag",{attrs:{type:"primary"}},[t._v("测试")]):t._e(),t._v(" "),"USE"==e.row.doctorStatus?a("el-tag",{attrs:{type:"success"}},[t._v("可用")]):t._e(),t._v(" "),"STOP"==e.row.doctorStatus?a("el-tag",{attrs:{type:"text"}},[t._v("停用")]):t._e()]}}])})],1),t._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.drugDocObj.page+1,"page-size":t.drugDocObj.pageSize,total:t.drugDocObj.total},on:{"current-change":t.drugDocObj.onPageChange}})],1)],1)])],1)},staticRenderFns:[]};var c=a("VU/8")(p,u,!1,function(t){a("HM+o")},"data-v-23a4b3e4",null);e.default=c.exports}});
//# sourceMappingURL=22.b113bc5b04bc317618e9.js.map