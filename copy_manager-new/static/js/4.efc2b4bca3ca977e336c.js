webpackJsonp([4],{"2kzB":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("TToO"),l=a("7+uW"),s=a("c+8m"),n=a.n(s),i=a("RXoh"),o=a("vkqf"),c=a("PJh5"),d=a.n(c),p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.reminderVEnums="NEW_ORDER",e.allprescription=0,e.key="",e.page=0,e.pageSize=10,e.total=100,e.orderList=[],e.startDate="",e.endDate="",e.consigneeAddress="",e.rderStatus="",e.NEW_ORDER=0,e}return r.b(e,t),e.prototype.handleOrderStatus=function(t){switch(t){case"ORDER_INIT":return"订单初始化";case"ORDER_WAIT_PAY":return"等待支付";case"ORDER_PAY_ONDEV":return"货到付款";case"ORDER_CANCEL_PAY":return"取消支付";case"ORDER_WAIT_SENDGOODS":return"待发货";case"ORDER_WAIT_RECVGOODS":return"待收货";case"ORDER_END_GOODS":return"完成";default:return""}},e.prototype.getOrderExcel=function(){var t=this;i.B({}).then(function(e){e.retCode?(console.log(e.data),"ALREADY_EXISTED"==e.data.info?(window.open(e.data.downurl),t.doResult()):t.$alert("暂无可导出数据")):e.islogin||t.$alert(e.message)})},e.prototype.doResult=function(){var t=this;i.I({}).then(function(e){e.retCode?(console.log(e.data),t.$message("导出成功")):e.islogin||t.$alert(e.message)})},e.prototype.onPageChange=function(t){this.page=t-1,this.getOrderList()},e.prototype.handleClick=function(t){this.rderStatus="",this.getOrderList()},e.prototype.getOrderList=function(){var t=this,e="",a="";""!=(this.startDate||"")&&(e=d()(this.startDate).format("YYYY-MM-DD")+" 00:00:00"),""!=(this.endDate||"")&&(a=d()(this.endDate).format("YYYY-MM-DD")+" 23:59:59"),this.reminderVEnums,i.y({reminderVEnums:this.reminderVEnums,key:this.key,consigneeAddress:this.consigneeAddress,startCreatTime:e,endCreatTime:a,rderStatus:this.rderStatus,page:this.page,pageSize:this.pageSize}).then(function(e){e.retCode?(console.log("-----",e.data),t.orderList=e.data.data,t.total=e.data.page.total):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.queryOrderCount=function(){var t=this;i.L({}).then(function(e){e.retCode?(t.NEW_ORDER=e.data.NEW_ORDER,t.allprescription=e.data.all):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.queryOrderCount(),this.getOrderList()},e=r.a([n()({props:{},components:{remindertable:o.a}})],e)}(l.default),u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{}},[a("h3",[t._v("售后管理\n          ")]),t._v(" "),a("div",{staticStyle:{margin:"10px 0"}},[t._v("\n平台订单数量统计："+t._s(t.allprescription)+" 单  平台新增订单数量统计："+t._s(t.NEW_ORDER)+" 单\n            ")])]),t._v(" "),a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.reminderVEnums,callback:function(e){t.reminderVEnums=e},expression:"reminderVEnums"}},[a("el-tab-pane",{attrs:{label:"新增订单",name:"NEW_ORDER"}},[a("div",{staticStyle:{"padding-bottom":"20px"}},[a("el-row",{staticStyle:{"padding-left":"80px"},attrs:{gutter:10}},[a("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入关键字",clearable:""},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),t._v(" "),a("el-col",{attrs:{xs:9,sm:9,md:6,lg:6,xl:6}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入收货地址",clearable:""},model:{value:t.consigneeAddress,callback:function(e){t.consigneeAddress=e},expression:"consigneeAddress"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"500px"},attrs:{xs:16,sm:16,md:10,lg:10,xl:10}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),t._v(" "),a("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getOrderList()}}},[t._v("查询")])],1)],1)],1),t._v(" "),a("remindertable",{ref:"remindertable",attrs:{orderList:t.orderList,pagetype:"afterorder"},on:{getOrderList:t.getOrderList}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"全部",name:"AFTERSALE_ALL"}},[a("div",{staticStyle:{"padding-bottom":"20px"}},[a("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:10}},[a("el-form",{attrs:{"label-width":"80px",inline:!0}},[a("el-col",{attrs:{xs:24,sm:14,md:12,lg:12,xl:12}},[a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"状态"}},[a("el-select",{model:{value:t.rderStatus,callback:function(e){t.rderStatus=e},expression:"rderStatus"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_PAY",label:"等待支付"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_PAY_ONDEV",label:"货到付款"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_CANCEL_PAY",label:"取消支付"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_SENDGOODS",label:"待发货"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_RECVGOODS",label:"待收货"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_END_GOODS",label:"已完成"}})],1),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getOrderExcel()}}},[t._v("订单导出")])],1)],1)],1)],1),t._v(" "),a("el-row",{staticStyle:{"padding-left":"80px"},attrs:{gutter:10}},[a("el-col",{attrs:{xs:8,sm:8,md:5,lg:3,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入关键字",clearable:""},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),t._v(" "),a("el-col",{attrs:{xs:9,sm:9,md:6,lg:5,xl:6}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入收货地址",clearable:""},model:{value:t.consigneeAddress,callback:function(e){t.consigneeAddress=e},expression:"consigneeAddress"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"500px"},attrs:{xs:16,sm:16,md:10,lg:10,xl:10}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),t._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6,xl:5}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getOrderList()}}},[t._v("查询")]),t._v(" "),a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:function(e){t.getOrderExcel()}}},[t._v("订单导出")])],1)],1)],1),t._v(" "),a("remindertable",{ref:"remindertable",attrs:{orderList:t.orderList,pagetype:"afterorder"},on:{getOrderList:t.getOrderList}})],1)],1),t._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{layout:"prev, pager, next","page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1)],1)},staticRenderFns:[]};var m=a("VU/8")(p,u,!1,function(t){a("NqdV")},"data-v-7734658a",null);e.default=m.exports},NqdV:function(t,e){}});
//# sourceMappingURL=4.efc2b4bca3ca977e336c.js.map