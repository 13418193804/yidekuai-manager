webpackJsonp([16],{F3Wj:function(t,e){},x9BB:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("TToO"),i=r("7+uW"),n=r("c+8m"),l=r.n(n),o=r("RXoh"),s=r("2oAx"),g=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.alldrug=0,e.drugType="CHINESE",e.key="",e.loading=!1,e.pageSize=10,e.total=0,e.currentPage=0,e.drugList=[],e.drugList1=[],e.drugList2=[],e}return a.b(e,t),e.prototype.handleClick=function(){this.getGrugList(!0)},e.prototype.allDrug=function(){var t=this;o.n({}).then(function(e){e.retCode?t.alldrug=e.data:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.changeModel=function(t,e){this.$refs.filterdrug.changeModel(t,e)},e.prototype.change_CHINESE_Model=function(t,e){this.$refs.filterdrug.change_CHINESE_Model(t,e)},e.prototype.change_WESTERN_Model=function(t,e){this.$refs.filterdrug.change_WESTERN_Model(t,e)},e.prototype.onPageChange=function(t){this.currentPage=t-1,this.getGrugList()},e.prototype.getGrugList=function(t){var e=this;void 0===t&&(t=null),t&&(this.currentPage=0);var r={};Object.assign(r,{page:this.currentPage,pageSize:this.pageSize}),""!==(this.key||"")&&Object.assign(r,{key:this.key});var a="drug"==this.drugType?"":this.drugType;Object.assign(r,{drugType:a}),this.loading=!0,o._5(r).then(function(t){e.loading=!1,t.retCode?(e.$nextTick(function(){"drug"==e.drugType&&(e.drugList=t.data.list),"CHINESE"==e.drugType&&(e.drugList1=t.data.list),"WESTERN"==e.drugType&&(e.drugList2=t.data.list)}),e.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.allDrug(),this.getGrugList(!0)},e=a.a([l()({props:{},components:{filterdrug:s.a}})],e)}(i.default),u={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:t.loading,expression:"loading"}]},[r("div",[r("h3",[t._v("药品库管理\n          ")]),t._v(" "),r("div",{staticStyle:{}},[t._v("\n药品数量统计："+t._s(t.alldrug)+"\n            ")])]),t._v(" "),r("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.drugType,callback:function(e){t.drugType=e},expression:"drugType"}},[r("el-tab-pane",{attrs:{label:"中药",name:"CHINESE"}},[r("div",{staticStyle:{"padding-bottom":"20px"}},[r("el-row",{attrs:{gutter:10}},[r("el-col",{attrs:{xs:16,sm:12,md:8,lg:5,xl:5}},[r("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入商品名称",clearable:""},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),t._v(" "),r("el-col",{staticStyle:{"min-width":"250px"},attrs:{xs:5,sm:5,md:3,lg:3,xl:2}},[r("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getGrugList(!0)}}},[t._v("查询")]),t._v(" "),r("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:function(e){t.change_CHINESE_Model("add",!1)}}},[t._v("新增药品")])],1)],1)],1),t._v(" "),r("filterdrug",{ref:"filterdrug",attrs:{drugList1:t.drugList1,drugType:t.drugType},on:{getGrugList:t.getGrugList,allDrug:t.allDrug}})],1),t._v(" "),r("el-tab-pane",{attrs:{label:"西药",name:"WESTERN"}},[r("div",{staticStyle:{"padding-bottom":"20px"}},[r("el-row",{attrs:{gutter:10}},[r("el-col",{attrs:{xs:16,sm:12,md:8,lg:5,xl:5}},[r("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入商品名称",clearable:""},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}})],1),t._v(" "),r("el-col",{staticStyle:{"min-width":"250px"},attrs:{xs:5,sm:5,md:3,lg:3,xl:2}},[r("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.getGrugList(!0)}}},[t._v("查询")]),t._v(" "),r("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:function(e){t.change_WESTERN_Model("add",!1)}}},[t._v("新增药品")])],1)],1)],1),t._v(" "),r("filterdrug",{ref:"filterdrug",attrs:{drugList2:t.drugList2,drugType:t.drugType},on:{getGrugList:t.getGrugList,allDrug:t.allDrug}})],1)],1),t._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.page+1,"page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1)],1)},staticRenderFns:[]};var c=r("VU/8")(g,u,!1,function(t){r("F3Wj")},"data-v-4af3fb5c",null);e.default=c.exports}});
//# sourceMappingURL=16.fe67ed502ea46802396e.js.map