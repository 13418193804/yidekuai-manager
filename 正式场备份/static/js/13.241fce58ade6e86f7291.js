webpackJsonp([13],{Bi6r:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("TToO"),l=a("7+uW"),s=a("c+8m"),n=a.n(s),i=a("RXoh"),o=a("vkqf"),c=a("PJh5"),d=a.n(c),p=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.reminderVEnums="PENDING",t.allprescription=0,t.key="",t.page=0,t.pageSize=10,t.total=100,t.orderList=[],t.startDate="",t.endDate="",t.consigneeAddress="",t.rderStatus="",t.PENDING=0,t}return r.b(t,e),t.prototype.handleOrderStatus=function(e){switch(e){case"ORDER_INIT":return"订单初始化";case"ORDER_WAIT_PAY":return"等待支付";case"ORDER_PAY_ONDEV":return"货到付款";case"ORDER_CANCEL_PAY":return"取消支付";case"ORDER_WAIT_SENDGOODS":return"待发货";case"ORDER_WAIT_RECVGOODS":return"待收货";case"ORDER_END_GOODS":return"完成";default:return""}},t.prototype.getOrderExcel=function(){var e=this;i.B({}).then(function(t){t.retCode?(console.log(t.data),"ALREADY_EXISTED"==t.data.info?(window.open(t.data.downurl),e.doResult()):e.$alert("暂无可导出数据")):t.islogin||e.$alert(t.message)})},t.prototype.doResult=function(){var e=this;i.I({}).then(function(t){t.retCode?(console.log(t.data),e.$message("导出成功")):t.islogin||e.$alert(t.message)})},t.prototype.onPageChange=function(e){this.page=e-1,this.getOrderList()},t.prototype.handleClick=function(e){this.rderStatus="",this.getOrderList()},t.prototype.getOrderList=function(){var e=this,t="",a="";""!=(this.startDate||"")&&(t=d()(this.startDate).format("YYYY-MM-DD")+" 00:00:00"),""!=(this.endDate||"")&&(a=d()(this.endDate).format("YYYY-MM-DD")+" 23:59:59"),this.reminderVEnums,i.y({reminderVEnums:this.reminderVEnums,key:this.key,consigneeAddress:this.consigneeAddress,startCreatTime:t,endCreatTime:a,rderStatus:this.rderStatus,page:this.page,pageSize:this.pageSize}).then(function(t){t.retCode?(console.log("-----",t.data),e.orderList=t.data.data,e.total=t.data.page.total,console.log(t.data.page.total)):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.queryOrderCount=function(){var e=this;i.L({}).then(function(t){t.retCode?(e.PENDING=t.data.PENDING,e.allprescription=t.data.all):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.mounted=function(){this.getOrderList(),this.queryOrderCount()},t=r.a([n()({props:{},components:{remindertable:o.a}})],t)}(l.default),u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{}},[a("h3",[e._v("催单管理\n          ")]),e._v(" "),a("div",{staticStyle:{margin:"10px 0"}},[e._v("\n平台订单数量统计："+e._s(e.allprescription)+" 单  平台待催订单数量统计："+e._s(e.PENDING)+" 单\n            ")])]),e._v(" "),a("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.reminderVEnums,callback:function(t){e.reminderVEnums=t},expression:"reminderVEnums"}},[a("el-tab-pane",{attrs:{label:"待催单",name:"PENDING"}},[a("div",{staticStyle:{"padding-bottom":"20px"}},[a("el-row",{staticStyle:{"padding-left":"80px"},attrs:{gutter:10}},[a("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入关键字",clearable:""},model:{value:e.key,callback:function(t){e.key=t},expression:"key"}})],1),e._v(" "),a("el-col",{attrs:{xs:9,sm:9,md:6,lg:6,xl:6}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入收货地址",clearable:""},model:{value:e.consigneeAddress,callback:function(t){e.consigneeAddress=t},expression:"consigneeAddress"}})],1),e._v(" "),a("el-col",{staticStyle:{"min-width":"500px"},attrs:{xs:16,sm:16,md:10,lg:10,xl:10}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}}),e._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}})],1),e._v(" "),a("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getOrderList()}}},[e._v("查询")])],1)],1)],1),e._v(" "),a("remindertable",{ref:"remindertable",attrs:{orderList:e.orderList,pagetype:"reminder"},on:{getOrderList:e.getOrderList}})],1),e._v(" "),a("el-tab-pane",{attrs:{label:"全部",name:"ALL"}},[a("div",{staticStyle:{"padding-bottom":"20px"}},[a("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:10}},[a("el-form",{attrs:{"label-width":"80px",inline:!0}},[a("el-col",{attrs:{xs:24,sm:14,md:12,lg:12,xl:12}},[a("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"状态"}},[a("el-select",{model:{value:e.rderStatus,callback:function(t){e.rderStatus=t},expression:"rderStatus"}},[a("el-option",{attrs:{value:"",label:"全部"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_PAY",label:"等待支付"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_PAY_ONDEV",label:"货到付款"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_CANCEL_PAY",label:"取消支付"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_SENDGOODS",label:"待发货"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_WAIT_RECVGOODS",label:"待收货"}}),e._v(" "),a("el-option",{attrs:{value:"ORDER_END_GOODS",label:"已完成"}})],1)],1)],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{"padding-left":"80px"},attrs:{gutter:10}},[a("el-col",{attrs:{xs:8,sm:8,md:5,lg:3,xl:5}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入关键字",clearable:""},model:{value:e.key,callback:function(t){e.key=t},expression:"key"}})],1),e._v(" "),a("el-col",{attrs:{xs:9,sm:9,md:6,lg:5,xl:6}},[a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入收货地址",clearable:""},model:{value:e.consigneeAddress,callback:function(t){e.consigneeAddress=t},expression:"consigneeAddress"}})],1),e._v(" "),a("el-col",{staticStyle:{"min-width":"500px"},attrs:{xs:16,sm:16,md:10,lg:10,xl:10}},[a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}}),e._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px"},attrs:{type:"date",placeholder:"结束日期"},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}})],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:8,lg:6,xl:5}},[a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getOrderList()}}},[e._v("查询")]),e._v(" "),a("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:function(t){e.getOrderExcel()}}},[e._v("订单导出")])],1)],1)],1),e._v(" "),a("remindertable",{ref:"remindertable",attrs:{orderList:e.orderList,pagetype:"reminder"},on:{getOrderList:e.getOrderList}})],1)],1),e._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{attrs:{layout:"prev, pager, next","page-size":e.pageSize,total:e.total},on:{"current-change":e.onPageChange}})],1)],1)},staticRenderFns:[]};var m=a("VU/8")(p,u,!1,function(e){a("z4T+")},"data-v-3fc89732",null);t.default=m.exports},"z4T+":function(e,t){}});
//# sourceMappingURL=13.241fce58ade6e86f7291.js.map