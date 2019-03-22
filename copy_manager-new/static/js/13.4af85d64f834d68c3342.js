webpackJsonp([13],{"2kzB":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("TToO"),l=a("7+uW"),s=a("c+8m"),i=a.n(s),n=a("RXoh"),o=a("vkqf"),d=a("PJh5"),c=a.n(d),p=a("K8i7"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.provinceList=[],e.paymentMode="",e.reminderVEnums="NEW_ORDER",e.allprescription=0,e.loading=!1,e.durl="",e.key="",e.page=0,e.pageSize=10,e.total=100,e.orderList=[],e.startDate="",e.endDate="",e.consigneeAddress="",e.rderStatus="",e.invoice=0,e.NEW_ORDER=0,e}return r.b(e,t),e.prototype.handleOrderStatus=function(t){switch(t){case"ORDER_INIT":return"订单初始化";case"ORDER_WAIT_PAY":return"等待支付";case"ORDER_PAY_ONDEV":return"货到付款";case"ORDER_CANCEL_PAY":return"取消支付";case"ORDER_WAIT_SENDGOODS":return"待发货";case"ORDER_WAIT_RECVGOODS":return"待收货";case"ORDER_END_GOODS":return"完成";default:return""}},e.prototype.queryProvinceList=function(){var t=this;p.g().then(function(e){t.provinceList=e.data.region})},e.prototype.getOrderExcel=function(){var t=this;this.loading=!0;var e="",a="";""!=(this.startDate||"")&&(e=c()(this.startDate).format("YYYY-MM-DD")+" 00:00:00"),""!=(this.endDate||"")&&(a=c()(this.endDate).format("YYYY-MM-DD")+" 23:59:59"),n.U({startCreateDate:e,endCreateDate:a,rderStatus:this.rderStatus,paymentMode:this.paymentMode}).then(function(e){e.retCode?e.data.num>0?t.doResult(e.data.durl):(t.loading=!1,t.$alert("查询结果没有可导出数据")):e.islogin||t.$alert(e.message)})},e.prototype.doDownLoad=function(){window.open(this.durl)},e.prototype.doResult=function(t){var e=this;n._9({}).then(function(a){e.loading=!1,a.retCode?(e.$message("导出成功"),e.durl=t):a.islogin||e.$alert(a.message)})},e.prototype.onPageChange=function(t){this.page=t-1,this.getOrderList()},e.prototype.handleClick=function(t){this.rderStatus="",this.key="",this.paymentMode="",this.consigneeAddress="",this.startDate="",this.endDate="",this.rderStatus="",this.page=0,this.getOrderList(!0)},e.prototype.getOrderList=function(t){var e=this;void 0===t&&(t=null),t&&(this.page=0);var a="",r="";""!=(this.startDate||"")&&(a=c()(this.startDate).format("YYYY-MM-DD")+" 00:00:00"),""!=(this.endDate||"")&&(r=c()(this.endDate).format("YYYY-MM-DD")+" 23:59:59");var l=this.reminderVEnums;if("rework"==this.reminderVEnums)return this.loading=!0,void n._3({key:this.key,startCreateDate:a,endCreateDate:r,page:this.page,pageSize:this.pageSize}).then(function(t){e.loading=!1,t.retCode?(e.orderList=t.data.data,e.total=t.data.page.total):t.islogin||e.$alert(t.message)});this.loading=!0,n.N({paymentMode:this.paymentMode,reminderVEnums:l,key:this.key,consigneeAddress:this.consigneeAddress,startCreateDate:a,endCreateDate:r,rderStatus:this.rderStatus,page:this.page,pageSize:this.pageSize}).then(function(t){e.loading=!1,e.queryOrderCount(),t.retCode?(e.orderList=t.data.data,e.total=t.data.page.total):t.islogin||e.$alert(t.message)})},e.prototype.queryOrderCount=function(){var t=this;n._16({}).then(function(e){e.retCode?(t.invoice=e.data.invoice,t.NEW_ORDER=e.data.NEW_ORDER,t.allprescription=e.data.all):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.queryProvinceList(),this.getOrderList()},e=r.a([i()({props:{},components:{remindertable:o.a}})],e)}(l.default),m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[t._m(0),t._v(" "),a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.reminderVEnums,callback:function(e){t.reminderVEnums=e},expression:"reminderVEnums"}},[a("el-tab-pane",{attrs:{label:"新增订单（"+t.NEW_ORDER+"）",name:"NEW_ORDER"}},[a("div",{staticStyle:{"padding-bottom":"20px"}},[a("el-row",{staticStyle:{"padding-left":"80px"},attrs:{gutter:10}},[a("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名/手机号/身份证/处方编号",clearable:""},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),t._v(" "),a("el-col",{attrs:{xs:9,sm:9,md:6,lg:6,xl:6}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入收货地址",clearable:""},model:{value:t.consigneeAddress,callback:function(e){t.consigneeAddress=e},expression:"consigneeAddress"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"500px"},attrs:{xs:16,sm:16,md:10,lg:10,xl:10}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),t._v(" "),a("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getOrderList(!0)}}},[t._v("查询")])],1)],1)],1),t._v(" "),a("remindertable",{ref:"remindertable",attrs:{provinceList:t.provinceList,orderList:t.orderList,pagetype:"afterorder"},on:{getOrderList:t.getOrderList}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"待开发票（"+t.invoice+"）",name:"rework"}},[a("div",{staticStyle:{"padding-bottom":"20px"}},[a("el-row",{staticStyle:{"padding-left":"80px"},attrs:{gutter:10}},[a("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名/手机号",clearable:""},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),t._v(" "),a("el-col",{staticStyle:{"min-width":"500px"},attrs:{xs:16,sm:16,md:10,lg:10,xl:10}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),t._v(" "),a("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getOrderList(!0)}}},[t._v("查询")])],1)],1)],1),t._v(" "),a("remindertable",{ref:"remindertable",attrs:{orderList:t.orderList,pagetype:"rework"},on:{getOrderList:t.getOrderList}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"全部（"+t.allprescription+"）",name:"ALL"}},[a("div",{staticStyle:{"padding-bottom":"20px"}},[a("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:10}},[a("el-form",{attrs:{"label-width":"80px",inline:!0}},[a("el-col",{staticStyle:{"min-width":"360px","margin-top":"10px"},attrs:{xs:24,sm:8,md:8,lg:6,xl:5}},[a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"状态"}},[a("el-select",{model:{value:t.rderStatus,callback:function(e){t.rderStatus=e},expression:"rderStatus"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_PAY",label:"等待支付"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_CANCEL_PAY",label:"取消支付"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_SENDGOODS",label:"待发货"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_RECVGOODS",label:"待收货"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_END_GOODS",label:"已完成"}})],1)],1)],1),t._v(" "),a("el-col",{staticClass:"flex",staticStyle:{"min-width":"500px","margin-top":"10px"},attrs:{xs:17,sm:17,md:11,lg:8,xl:6}},[a("el-date-picker",{staticClass:"flex-1",staticStyle:{"margin-right":"5px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-date-picker",{staticClass:"flex-1",staticStyle:{"margin-left":"5px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1),t._v(" "),a("el-col",{staticStyle:{"margin-top":"10px"},attrs:{xs:24,sm:12,md:8,lg:6,xl:5}},[a("div",{staticClass:"flex flex-align-center"},[a("div",{staticStyle:{"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis","min-width":"300px"}},[a("el-button",{staticStyle:{"margin-left":"80px"},attrs:{type:"primary"},on:{click:function(e){t.getOrderExcel()}}},[t._v("生成导出文件")]),t._v(" "),t.durl?a("span",[t._v(t._s(t.durl))]):t._e()],1),t._v(" "),t.durl?a("div",[a("el-button",{attrs:{type:"text"},on:{click:function(e){t.doDownLoad()}}},[t._v("下载")])],1):t._e()])])],1)],1),t._v(" "),a("el-row",{attrs:{gutter:10}},[a("el-form",{attrs:{"label-width":"80px",inline:!0}},[a("el-col",{staticStyle:{"margin-top":"20px","min-width":"380px"},attrs:{xs:24,sm:8,md:8,lg:6,xl:5}},[a("el-form-item",{attrs:{label:"支付方式"}},[a("el-select",{model:{value:t.paymentMode,callback:function(e){t.paymentMode=e},expression:"paymentMode"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),a("el-option",{attrs:{value:"ONLINE_PAYMENT",label:"微信支付"}}),t._v(" "),a("el-option",{attrs:{value:"ORDER_PAY_ONDEV",label:"货到付款"}})],1)],1)],1)],1),t._v(" "),a("el-col",{attrs:{xs:8,sm:8,md:5,lg:3,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名/手机号/身份证/处方编号",clearable:""},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),t._v(" "),a("el-col",{attrs:{xs:9,sm:9,md:6,lg:5,xl:6}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入收货地址",clearable:""},model:{value:t.consigneeAddress,callback:function(e){t.consigneeAddress=e},expression:"consigneeAddress"}})],1),t._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:5,xl:3}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getOrderList(!0)}}},[t._v("查询")])],1)],1)],1),t._v(" "),a("remindertable",{ref:"remindertable",attrs:{provinceList:t.provinceList,orderList:t.orderList,pagetype:"afterorder"},on:{getOrderList:t.getOrderList}})],1)],1),t._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{"current-page":t.page+1,layout:"prev, pager, next","page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{}},[e("h3",[this._v("售后管理\n          ")])])}]};var g=a("VU/8")(u,m,!1,function(t){a("8xG9")},"data-v-5d2057ea",null);e.default=g.exports},"8xG9":function(t,e){}});
//# sourceMappingURL=13.4af85d64f834d68c3342.js.map