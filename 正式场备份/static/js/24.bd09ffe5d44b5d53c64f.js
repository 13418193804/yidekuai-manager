webpackJsonp([24],{m3MD:function(t,e){},q2GA:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("TToO"),n=r("7+uW"),o=r("c+8m"),l=r.n(o),s=r("RXoh"),i=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.allprescription=0,e.page=0,e.pageSize=10,e.total=100,e.orderList=[],e}return a.b(e,t),e.prototype.handleOrderStatus=function(t){switch(t){case"ORDER_INIT":return"订单初始化";case"ORDER_WAIT_PAY":return"等待支付";case"ORDER_PAY_ONDEV":return"货到付款";case"ORDER_CANCEL_PAY":return"取消支付";case"ORDER_WAIT_SENDGOODS":return"待发货";case"ORDER_WAIT_RECVGOODS":return"待收货";case"ORDER_END_GOODS":return"完成";default:return""}},e.prototype.allPrescription=function(){var t=this;s.m().then(function(e){e.retCode?(console.log(e.data),t.allprescription=e.data):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.onPageChange=function(t){this.page=t-1,this.getOrderList()},e.prototype.getOrderList=function(){var t=this;s._5({page:this.page,pageSize:this.pageSize}).then(function(e){e.retCode?(t.orderList=e.data.list,t.total=e.data.page.total):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.allPrescription(),this.getOrderList()},e=a.a([l()({props:{},components:{}})],e)}(n.default),p={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticStyle:{"border-bottom":"1px #e5e5e5 solid"}},[r("h3",[t._v("订单管理\n          ")]),t._v(" "),r("div",{staticStyle:{margin:"10px 0"}},[t._v("\n平台订单数量统计："+t._s(t.allprescription)+" 单\n            ")]),t._v(" "),r("div",{staticStyle:{"padding-bottom":"20px"}})]),t._v(" "),r("el-table",{staticStyle:{width:"100%","min-height":"500px"},attrs:{border:"",data:t.orderList,stripe:""}},[r("el-table-column",{attrs:{fixed:"left",prop:"presId",label:"处方编号"}}),t._v(" "),r("el-table-column",{attrs:{label:"订单状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n  "+t._s(t.handleOrderStatus(e.row.orderStatue))+"\n")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"memberName",label:"患者姓名"}}),t._v(" "),r("el-table-column",{attrs:{prop:"docterName",label:"开方医生",width:"150"}}),t._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"备注"}})],1),t._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{attrs:{"current-page":t.page+1,layout:"prev, pager, next","page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1)],1)},staticRenderFns:[]};var c=r("VU/8")(i,p,!1,function(t){r("m3MD")},"data-v-08e5d734",null);e.default=c.exports}});
//# sourceMappingURL=24.bd09ffe5d44b5d53c64f.js.map