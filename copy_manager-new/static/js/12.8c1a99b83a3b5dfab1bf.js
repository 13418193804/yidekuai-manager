webpackJsonp([12],{TG0H:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("TToO"),o=r("7+uW"),n=r("c+8m"),l=r.n(n),i=r("PJh5"),d=r.n(i),s=r("RXoh"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading=!1,e.DrugInfo=[],e.page=0,e.pageSize=10,e.total=0,e.pickerOptions2={shortcuts:[{text:"本月",onClick:function(t){t.$emit("pick",[window.mmvue.getMonth1(),d()(new Date).format("YYYY-MM-DD")+" 23:59:59"])}},{text:"本周",onClick:function(t){t.$emit("pick",[window.mmvue.getWeek(),d()(new Date).format("YYYY-MM-DD")+" 23:59:59"])}},{text:"本日",onClick:function(t){t.$emit("pick",[window.mmvue.getToday(),d()(new Date).format("YYYY-MM-DD")+" 23:59:59"])}}]},e.orderByStr="",e.date=[],e.name="",e.drug="",e.orderMoney=0,e.prescriptionNum=0,e.orderNum=0,e.allAdviserNum=0,e.drugNum=0,e.payOrderMoney=0,e.payOrderNum=0,e.drugQuantityTotal=0,e.giveupOrderNum=0,e.drugAdvObj={model:!1,loading:!1,AdviserInfo:[],page:0,pageSize:10,total:0,onPageChange:function(t){e.drugAdvObj.page=t-1,e.drugGetAdviser(e.drugAdvObj.row)},row:{}},e.drugDocObj={model:!1,loading:!1,DocterInfo:[],page:0,pageSize:10,total:0,onPageChange:function(t){e.drugDocObj.page=t-1,e.drugGetDoctor(e.drugDocObj.row)},row:{}},e.countDrug=0,e}return a.b(e,t),e.prototype.onPageChange=function(t){this.page=t-1,this.adviserdrug()},e.prototype.adviserdrug=function(t){var e=this;void 0===t&&(t=null),this.loading=!0,t&&(this.page=0);var r={drug:this.drug,name:this.name,page:this.page,pageSize:this.pageSize,orderByStr:this.orderByStr,startcreateDate:this.date&&this.date.length>0?d()(this.date[0]).format("YYYY-MM-DD")+" 00:00:00":"",endcreateDate:this.date&&this.date.length>0?d()(this.date[1]).format("YYYY-MM-DD")+" 23:59:59":""};s.Y(r).then(function(t){if(!t.retCode)return t.islogin||e.$alert(t.message),void(e.loading=!1);e.DrugInfo=t.data.DrugInfo,e.total=t.data.page.total}),this.ypStartcreateDate(r)},e.prototype.ypStartcreateDate=function(t){var e=this;t.ypStartcreateDate=t.startcreateDate,t.ypEndcreateDate=t.endcreateDate,s._44(t).then(function(t){t.retCode?t.data.AdviserInfo.length>0&&(e.orderMoney=t.data.AdviserInfo[0].orderMoney?t.data.AdviserInfo[0].orderMoney:0,e.giveupOrderNum=t.data.AdviserInfo[0].giveupOrderNum?t.data.AdviserInfo[0].giveupOrderNum:0,e.prescriptionNum=t.data.AdviserInfo[0].prescriptionNum?t.data.AdviserInfo[0].prescriptionNum:0,e.orderNum=t.data.AdviserInfo[0].orderNum?t.data.AdviserInfo[0].orderNum:0,e.allAdviserNum=t.data.AdviserInfo[0].allAdviserNum?t.data.AdviserInfo[0].allAdviserNum:0,e.drugNum=t.data.AdviserInfo[0].drugNum?t.data.AdviserInfo[0].drugNum:0,e.payOrderMoney=t.data.AdviserInfo[0].payOrderMoney?t.data.AdviserInfo[0].payOrderMoney:0,e.payOrderNum=t.data.AdviserInfo[0].payOrderNum?t.data.AdviserInfo[0].payOrderNum:0,e.drugQuantityTotal=t.data.AdviserInfo[0].drugQuantityTotal?t.data.AdviserInfo[0].drugQuantityTotal:0):t.islogin||e.$alert(t.message),e.loading=!1})},e.prototype.drugGetAdviser=function(t){var e=this;this.drugAdvObj.loading=!0,this.drugAdvObj.model=!0,this.drugAdvObj.row=t,s.N({manufacturer:t.manufacturer,specification:t.specification,productName:t.productName,packingUnit:t.packingUnit,drugName:t.drugName,partnerId:t.partnerId,price:t.price,page:this.drugAdvObj.page,pageSize:this.drugAdvObj.pageSize}).then(function(t){e.drugAdvObj.loading=!1,t.retCode?(console.log(t.data),e.drugAdvObj.AdviserInfo=t.data.AdviserInfo,e.drugAdvObj.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.drugGetDoctor=function(t){var e=this;this.drugDocObj.loading=!0,this.drugDocObj.model=!0,this.drugDocObj.row=t,s.O({manufacturer:t.manufacturer,specification:t.specification,productName:t.productName,packingUnit:t.packingUnit,drugName:t.drugName,partnerId:t.partnerId,price:t.price,page:this.drugDocObj.page,pageSize:this.drugDocObj.pageSize}).then(function(t){e.drugDocObj.loading=!1,t.retCode?(console.log(t.data),e.drugDocObj.DocterInfo=t.data.DocterInfo,e.drugDocObj.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.getcountDrug=function(){var t=this;s.s({}).then(function(e){e.retCode?t.countDrug=e.data.num:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.sortChange=function(t){t.column;var e=t.prop,r="";switch("descending"==t.order&&(r+=" desc"),e){case"doctorNum":this.orderByStr="doctor_num"+r;break;case"memberNum":this.orderByStr="member_num"+r;break;case"orderNum":this.orderByStr="order_num"+r;break;case"totalMoney":this.orderByStr="total_money"+r;break;default:this.orderByStr=""}this.adviserdrug(!0)},e.prototype.getWeek=function(){var t=new Date,e=t.getDay(),r=1-e;0==e&&(r=-7);var a=7-e,o=t.getTime(),n=new Date(o+24*r*3600*1e3);new Date(o+24*a*3600*1e3);return this.transferDate(n)+" 00:00:00"},e.prototype.getToday=function(){return d()(new Date).format("YYYY-MM-DD")+" 00:00:00"},e.prototype.getMonth1=function(){var t=new Date;return t.setDate(1),this.transferDate(t)+" 00:00:00"},e.prototype.transferDate=function(t){var e=t.getFullYear(),r=t.getMonth()+1,a=t.getDate();return r>=1&&r<=9&&(r="0"+r),a>=0&&a<=9&&(a="0"+a),e+"-"+r+"-"+a},e.prototype.mounted=function(){this.date=[this.getMonth1(),d()(new Date).format("YYYY-MM-DD")+" 23:59:59"],window.mmvue=this,this.adviserdrug(),this.getcountDrug()},e=a.a([l()({props:{},components:{}})],e)}(o.default),p={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:t.loading,expression:"loading"}]},[r("div",{},[r("h3",[t._v("药品数据\n          ")]),t._v(" "),r("div",{staticStyle:{"padding-bottom":"20px"}},[r("span",{staticStyle:{"margin-right":"20px"}},[t._v("药品总数："+t._s(t.countDrug)+" 个")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("订单实收金额："+t._s(t.payOrderMoney)+" 元")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("处方数量："+t._s(t.prescriptionNum)+" ")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("实收订单数："+t._s(t.payOrderNum)+" ")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("全部顾问数量："+t._s(t.allAdviserNum)+" ")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("药品销售数量："+t._s(t.drugQuantityTotal)+" ")]),t._v(" "),r("span",{staticStyle:{"margin-right":"20px"}},[t._v("失败订单数量："+t._s(t.giveupOrderNum)+" ")])])]),t._v(" "),r("div",{staticStyle:{"padding-bottom":"20px","border-bottom":"1px #e5e5e5 solid"}},[r("el-row",{attrs:{gutter:10}},[r("el-col",{attrs:{xs:12,sm:8,md:5,lg:6,xl:5}},[r("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"药品名/通用名",clearable:""},model:{value:t.drug,callback:function(e){t.drug=e},expression:"drug"}})],1),t._v(" "),r("el-col",{attrs:{xs:12,sm:8,md:5,lg:6,xl:5}},[r("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"顾问姓名/医生姓名",clearable:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),r("el-col",{staticStyle:{"min-width":"360px"},attrs:{xs:2,sm:2,md:2,lg:2,xl:2}},[r("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions2},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),t._v(" "),r("el-col",{attrs:{xs:5,sm:5,md:3,lg:3,xl:2}},[r("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.adviserdrug(!0)}}},[t._v("查询")])],1)],1)],1),t._v(" "),r("el-row",[r("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.DrugInfo,stripe:"",height:"600"},on:{"sort-change":t.sortChange}},[r("el-table-column",{attrs:{fixed:"left",prop:"drugName",label:"通用名",width:"180"}}),t._v(" "),r("el-table-column",{attrs:{prop:"productName",label:"商品名",width:"170"}}),t._v(" "),r("el-table-column",{attrs:{prop:"doctorNum",sortable:"custom",label:"货架号数量",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.doctorNum?e.row.doctorNum:0)+"\n      ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"adviserNum",label:"顾问数量",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.adviserNum?e.row.adviserNum:0)+"\n      ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"memberNum",sortable:"custom",label:"购药人次",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.memberNum?e.row.memberNum:0)+"\n      ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"orderNum",sortable:"custom",label:"订单数",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.orderNum?e.row.orderNum:0)+"\n      ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"totalMoney",sortable:"custom",label:"总金额",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.totalMoney?e.row.totalMoney:0)+"\n      ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"totalQuantity",label:"销售数量",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.totalQuantity?e.row.totalQuantity:0)+"\n      ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"shouldpay",label:"销售金额",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n           "+t._s(e.row.shouldpay?e.row.shouldpay:0)+"\n      ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"manufacturer",label:"生产厂家",width:"150"}}),t._v(" "),r("el-table-column",{attrs:{prop:"specification",label:"规格",width:"170"}}),t._v(" "),r("el-table-column",{attrs:{prop:"dosageforms",label:"剂型"}}),t._v(" "),r("el-table-column",{attrs:{prop:"hisCode",label:"批准文号",width:"150"}}),t._v(" "),r("el-table-column",{attrs:{prop:"price",label:"单价"}}),t._v(" "),r("el-table-column",{attrs:{label:"操作",fixed:"right",width:"170"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(r){t.drugGetAdviser(e.row)}}},[t._v("查看顾问")]),t._v(" "),r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(r){t.drugGetDoctor(e.row)}}},[t._v("查看医生")])]}}])})],1)],1),t._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.page+1,"page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1),t._v(" "),r("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.drugAdvObj.model,title:"查看顾问"},on:{"update:visible":function(e){t.$set(t.drugAdvObj,"model",e)}}},[r("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:t.drugAdvObj.loading,expression:"drugAdvObj.loading"}]},[r("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.drugAdvObj.AdviserInfo,stripe:"",height:"600"}},[r("el-table-column",{attrs:{fixed:"left",prop:"adviserName",label:"顾问姓名"}}),t._v(" "),r("el-table-column",{attrs:{prop:"doctorNum",label:"管理医生数量"}}),t._v(" "),r("el-table-column",{attrs:{prop:"orderNum",label:"总订单数量"}}),t._v(" "),r("el-table-column",{attrs:{prop:"orderMoney",label:"总订单金额"}}),t._v(" "),r("el-table-column",{attrs:{prop:"prescriptionNum",label:"总处方数量"}}),t._v(" "),r("el-table-column",{attrs:{prop:"drugNum",label:"药品种类数量"}}),t._v(" "),r("el-table-column",{attrs:{prop:"userName",label:"手机号",width:"150"}}),t._v(" "),r("el-table-column",{attrs:{prop:"adviserAge",label:"年龄"}}),t._v(" "),r("el-table-column",{attrs:{prop:"adviserSex",label:"性别"}}),t._v(" "),r("el-table-column",{attrs:{prop:"userStatus",label:"使用状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n      "+t._s("1"==e.row.userStatus?"启用中":"已禁用")+"\n      ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"备注"}})],1),t._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.drugAdvObj.page+1,"page-size":t.drugAdvObj.pageSize,total:t.drugAdvObj.total},on:{"current-change":t.drugAdvObj.onPageChange}})],1)],1)]),t._v(" "),r("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:t.drugDocObj.model,title:"查看医生"},on:{"update:visible":function(e){t.$set(t.drugDocObj,"model",e)}}},[r("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:t.drugDocObj.loading,expression:"drugDocObj.loading"}]},[r("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.drugDocObj.DocterInfo,stripe:"",height:"600"}},[r("el-table-column",{attrs:{prop:"name",label:"医生姓名",fixed:"left"}}),t._v(" "),r("el-table-column",{attrs:{prop:"prescriptionNum",label:"医生处方数量"}}),t._v(" "),r("el-table-column",{attrs:{prop:"orderNum",label:"医生订单数量"}}),t._v(" "),r("el-table-column",{attrs:{prop:"orderMoney",label:"医生订单金额"}}),t._v(" "),r("el-table-column",{attrs:{prop:"drugNum",label:"医生患者数量"}}),t._v(" "),r("el-table-column",{attrs:{prop:"hospitalName",label:"所属医院",width:"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"phone",label:"账号",width:"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"hospitalDepartment",label:"所在科室"}}),t._v(" "),r("el-table-column",{attrs:{prop:"doctorGood",label:"医生主治",width:"180","show-overflow-tooltip":""}}),t._v(" "),r("el-table-column",{attrs:{prop:"doctorBrief",label:"医生简介",width:"180","show-overflow-tooltip":""}}),t._v(" "),r("el-table-column",{attrs:{prop:"consultingFee",label:"咨询价格"}}),t._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"备注"}}),t._v(" "),r("el-table-column",{attrs:{prop:"doctorStatus",label:"使用状态"},scopedSlots:t._u([{key:"default",fn:function(e){return["DINI"==e.row.doctorStatus?r("el-tag",{attrs:{type:"primary"}},[t._v("测试")]):t._e(),t._v(" "),"USE"==e.row.doctorStatus?r("el-tag",{attrs:{type:"success"}},[t._v("可用")]):t._e(),t._v(" "),"STOP"==e.row.doctorStatus?r("el-tag",{attrs:{type:"text"}},[t._v("停用")]):t._e()]}}])})],1),t._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.drugDocObj.page+1,"page-size":t.drugDocObj.pageSize,total:t.drugDocObj.total},on:{"current-change":t.drugDocObj.onPageChange}})],1)],1)])],1)},staticRenderFns:[]};var c=r("VU/8")(u,p,!1,function(t){r("zFya")},"data-v-817b0dba",null);e.default=c.exports},zFya:function(t,e){}});
//# sourceMappingURL=12.8c1a99b83a3b5dfab1bf.js.map