webpackJsonp([9],{Bi6r:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("TToO"),l=a("7+uW"),s=a("c+8m"),n=a.n(s),i=a("RXoh"),o=a("vkqf"),d=a("PJh5"),c=a.n(d),p=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.paymentMode="",t.reminderVEnums="PENDING",t.date=[],t.allprescription=0,t.loading=!1,t.durl="",t.key="",t.page=0,t.pageSize=10,t.total=100,t.orderList=[],t.consigneeAddress="",t.rderStatus="",t.PENDING=0,t}return r.b(t,e),t.prototype.handleOrderStatus=function(e){switch(e){case"ORDER_INIT":return"订单初始化";case"ORDER_WAIT_PAY":return"等待支付";case"ORDER_PAY_ONDEV":return"货到付款";case"ORDER_CANCEL_PAY":return"交易关闭";case"ORDER_WAIT_SENDGOODS":return"待发货";case"SENDGOODS_UNFINISHED":return"发货未完成";case"ORDER_WAIT_RECVGOODS":return"待收货";case"ORDER_END_GOODS":return"订单已完成";default:return""}},t.prototype.getOrderExcel=function(){var e=this;this.loading=!0,i.Z({startCreateDate:this.date&&this.date.length>0?c()(this.date[0]).format("YYYY-MM-DD")+" 00:00:00":"",endCreateDate:this.date&&this.date.length>0?c()(this.date[1]).format("YYYY-MM-DD")+" 23:59:59":"",rderStatus:this.rderStatus,paymentMode:this.paymentMode}).then(function(t){t.retCode?(console.log(t.data),t.data.num>0?e.doResult(t.data.durl):(e.loading=!1,e.$alert("查询结果没有可导出数据"))):t.islogin||e.$alert(t.message)})},t.prototype.doDownLoad=function(){window.open(this.durl)},t.prototype.doResult=function(e){var t=this;i._19({}).then(function(a){t.loading=!1,a.retCode?(t.$message("导出成功"),t.durl=e):a.islogin||t.$alert(a.message)})},t.prototype.onPageChange=function(e){this.page=e-1,this.getOrderList()},t.prototype.handleClick=function(e){this.rderStatus="",this.key="",this.paymentMode="",this.consigneeAddress="",this.date=["",""],this.rderStatus="",this.page=0,this.getOrderList()},t.prototype.getOrderList=function(e){var t=this;void 0===e&&(e=null),e&&(this.page=0),this.reminderVEnums,this.loading=!0,i.R({paymentMode:this.paymentMode,reminderVEnums:this.reminderVEnums,key:this.key,consigneeAddress:this.consigneeAddress,startCreateDate:this.date&&this.date.length>0?c()(this.date[0]).format("YYYY-MM-DD")+" 00:00:00":"",endCreateDate:this.date&&this.date.length>0?c()(this.date[1]).format("YYYY-MM-DD")+" 23:59:59":"",rderStatus:this.rderStatus,page:this.page,pageSize:this.pageSize}).then(function(e){t.loading=!1,t.queryOrderCount(),e.retCode?(t.orderList=e.data.data,t.total=e.data.page.total):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},t.prototype.queryOrderCount=function(){var e=this;i._26({}).then(function(t){t.retCode?(e.PENDING=t.data.PENDING,e.allprescription=t.data.all):t.islogin||e.$alert(t.message)})},t.prototype.mounted=function(){this.getOrderList()},t=r.a([n()({props:{},components:{remindertable:o.a}})],t)}(l.default),u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:e.loading,expression:"loading"}]},[a("div",{staticStyle:{}},[a("h3",[e._v("催单管理\n          ")]),e._v(" "),a("div",{staticStyle:{margin:"10px 0"}},[e._v("\n平台订单数量统计："+e._s(e.allprescription)+" 单  平台待催订单数量统计："+e._s(e.PENDING)+" 单\n            ")])]),e._v(" "),a("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.reminderVEnums,callback:function(t){e.reminderVEnums=t},expression:"reminderVEnums"}},[a("el-tab-pane",{attrs:{label:"待催单（"+e.PENDING+"）",name:"PENDING"}},[a("div",{staticStyle:{"padding-bottom":"20px"}},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{xs:24,sm:12,md:8,lg:5,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名/手机号/身份证/处方编号",clearable:""},model:{value:e.key,callback:function(t){e.key=t},expression:"key"}})],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:10,lg:6,xl:6}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入收货地址",clearable:""},model:{value:e.consigneeAddress,callback:function(t){e.consigneeAddress=t},expression:"consigneeAddress"}})],1),e._v(" "),a("el-col",{staticStyle:{"min-width":"360px"},attrs:{xs:2,sm:2,md:2,lg:2,xl:2}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),a("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getOrderList(!0)}}},[e._v("查询")])],1)],1)],1),e._v(" "),a("remindertable",{ref:"remindertable",attrs:{orderList:e.orderList,pagetype:"reminder",patModel:"PENDING",payStatus:"ORDER_WAIT_PAY"},on:{getOrderList:e.getOrderList}})],1),e._v(" "),a("el-tab-pane",{attrs:{label:"全部（"+e.allprescription+"）",name:"ALL"}},[a("div",{staticStyle:{"padding-bottom":"20px"}},[a("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:10}},[a("el-form",{attrs:{"label-width":"80px",inline:!0}},[a("el-col",{staticStyle:{"min-width":"320px","margin-top":"10px"},attrs:{xs:2,sm:2,md:2,lg:2,xl:2}},[a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"状态"}},[a("el-select",{model:{value:e.rderStatus,callback:function(t){e.rderStatus=t},expression:"rderStatus"}},[a("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_PAY",label:"等待支付"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_CANCEL_PAY",label:"交易关闭"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_SENDGOODS",label:"待发货"}}),e._v(" "),a("el-option",{attrs:{value:"SENDGOODS_UNFINISHED",label:"发货未完成"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_RECVGOODS",label:"待收货"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_END_GOODS",label:"订单已完成"}})],1)],1)],1),e._v(" "),a("el-col",{staticStyle:{"min-width":"360px"},attrs:{xs:2,sm:2,md:2,lg:2,xl:2}},[a("el-date-picker",{staticStyle:{"margin-top":"10px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),a("el-col",{staticStyle:{"margin-top":"10px"},attrs:{xs:24,sm:12,md:8,lg:8,xl:7}},[a("div",{staticClass:"flex flex-align-center "},[a("div",{staticStyle:{"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis","min-width":"300px"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.getOrderExcel()}}},[e._v("生成导出文件")]),e._v(" "),e.durl?a("span",[e._v(e._s(e.durl))]):e._e()],1),e._v(" "),e.durl?a("div",[a("el-button",{attrs:{type:"text"},on:{click:function(t){e.doDownLoad()}}},[e._v("下载")])],1):e._e()])])],1)],1),e._v(" "),a("el-row",{attrs:{gutter:10}},[a("el-form",{attrs:{"label-width":"80px",inline:!0}},[a("el-col",{staticStyle:{"min-width":"320px","margin-top":"20px"},attrs:{xs:2,sm:2,md:2,lg:2,xl:2}},[a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"支付方式"}},[a("el-select",{model:{value:e.paymentMode,callback:function(t){e.paymentMode=t},expression:"paymentMode"}},[a("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),a("el-option",{attrs:{value:"ONLINE_PAYMENT",label:"微信支付"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_PAY_ONDEV",label:"货到付款"}})],1)],1)],1)],1),e._v(" "),a("el-col",{attrs:{xs:12,sm:9,md:6,lg:6,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"姓名/手机号/身份证/处方编号",clearable:""},model:{value:e.key,callback:function(t){e.key=t},expression:"key"}})],1),e._v(" "),a("el-col",{attrs:{xs:12,sm:9,md:6,lg:6,xl:6}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入收货地址",clearable:""},model:{value:e.consigneeAddress,callback:function(t){e.consigneeAddress=t},expression:"consigneeAddress"}})],1),e._v(" "),a("el-col",{attrs:{xs:1,sm:1,md:1,lg:1,xl:1}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getOrderList(!0)}}},[e._v("查询")])],1)],1)],1),e._v(" "),a("remindertable",{ref:"remindertable",attrs:{orderList:e.orderList,pagetype:"reminder",patModel:""},on:{getOrderList:e.getOrderList}})],1)],1),e._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{"current-page":e.page+1,layout:"prev, pager, next","page-size":e.pageSize,total:e.total},on:{"current-change":e.onPageChange}})],1)],1)},staticRenderFns:[]};var m=a("VU/8")(p,u,!1,function(e){a("v/9k")},"data-v-bad2f18a",null);t.default=m.exports},"v/9k":function(e,t){}});
//# sourceMappingURL=9.7474fd9200fbcd8379e8.js.map