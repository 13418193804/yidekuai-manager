webpackJsonp([21],{"4nhA":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("TToO"),i=r("7+uW"),n=r("c+8m"),o=r.n(n),l=r("RXoh"),s=r("2oAx"),d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.detailInfo=[{name:"通用名称",key:"commonName"},{name:"商品名称",key:"productName"},{name:"供应商",key:"partnerName"},{name:"用法",key:"usages"},{name:"用量",key:"dosage"},{name:"频次",key:"frequency"},{name:"药品规格",key:"specification"},{name:"厂家",key:"manufacturer"},{name:"剂型",key:"dosageforms"},{name:"批准文号",key:"hisCode"},{name:"单位",key:"dosage"},{name:"价格",key:"sellingPrice"}],t.drugDetailModel=!1,t.drugDetailLoading=!1,t.drugDetail={},t.drugModel=!1,t.addDrug={},t.rules={usages:[{required:!0,message:"请输入用法",trigger:"blur"}],dosage:[{required:!0,message:"请输入用量",trigger:"blur"}],frequency:[{required:!0,message:"请输入频次",trigger:"blur"}]},t.page=0,t.pageSize=10,t.total=100,t.centerList=[],t.drugCenterId="",t}return a.b(t,e),t.prototype.getDetail=function(e,t){var r=this;this.drugDetailLoading=!0,this.drugDetail={},this.drugDetailModel=!0,l._6({id:t.id}).then(function(e){r.drugDetailLoading=!1,e.retCode?(console.log(e.data),r.drugDetail=e.data):(r.drugDetailModel=!1,e.islogin||r.$alert(e.message),console.error("数据查询错误"))})},t.prototype.insertDrugById=function(){var e=this;""!=(this.addDrug.usages||"")?""!=(this.addDrug.dosage||"")?""!=(this.addDrug.frequency||"")?(Object.assign(this.addDrug,{id:this.drugCenterId}),l._0(this.addDrug).then(function(t){t.retCode?(console.log(t.data),e.$message("添加成功"),e.queryDrugCenterList(),e.drugModel=!1):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})):this.$alert("请输入频次"):this.$alert("请输入用量"):this.$alert("请输入用法")},t.prototype.submitForm=function(e){var t=this;this.$refs[e].validate(function(e){return e?(t.insertDrugById(),!1):(console.log("error submit!!"),!1)}).catch(function(e){console.log(e)})},t.prototype.chengModel=function(){this.drugModel=!0,this.addDrug={}},t.prototype.deletePreDrug=function(e,t){var r=this;this.$confirm("是否删除该条用法用量?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l.w({id:t.id}).then(function(e){e.retCode?(r.$message("删除成功"),r.queryDrugCenterList()):(e.islogin||r.$alert(e.message),console.error("数据查询错误"))})}).catch(function(){r.$message({type:"info",message:"已取消操作"})})},t.prototype.onPageChange=function(e){this.page=e-1,this.queryDrugCenterList()},t.prototype.queryDrugCenterList=function(){var e=this;l._7({id:this.drugCenterId}).then(function(t){t.retCode?(e.centerList=t.data.list,e.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.mounted=function(){sessionStorage.drugCenterId||this.$router.replace("/drug"),this.drugCenterId=sessionStorage.drugCenterId,this.queryDrugCenterList()},t=a.a([o()({props:{},components:{filterdrug:s.a}})],t)}(i.default),u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h3",[e._v("用法用量管理")]),e._v(" "),r("div",{staticStyle:{padding:"20px"}},[r("div",[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){e.chengModel()}}},[e._v("添加用法用量")])],1)]),e._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.centerList,stripe:"",height:"500"}},[r("el-table-column",{attrs:{fixed:"left",prop:"usages",label:"用法"}}),e._v(" "),r("el-table-column",{attrs:{prop:"dosage",label:"用量"}}),e._v(" "),r("el-table-column",{attrs:{prop:"frequency",label:"频次"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",fixed:"right",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){e.getDetail(t.$index,t.row)}}},[e._v("详情")]),e._v(" "),r("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(r){e.deletePreDrug(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{attrs:{"current-page":e.page+1,layout:"prev, pager, next","page-size":e.pageSize,total:e.total},on:{"current-change":e.onPageChange}})],1),e._v(" "),r("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:e.drugModel,title:"添加用法用量"},on:{"update:visible":function(t){e.drugModel=t}}},[r("el-form",{ref:"ruleForm",attrs:{"label-width":"120px",model:e.addDrug,rules:e.rules}},[r("el-form-item",{attrs:{label:"用法：",prop:"usages"}},[r("el-input",{staticStyle:{"max-width":"400px","min-width":"200px"},attrs:{placeholder:"请输入用法"},model:{value:e.addDrug.usages,callback:function(t){e.$set(e.addDrug,"usages",t)},expression:"addDrug.usages"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"用量：",prop:"dosage"}},[r("el-input",{staticStyle:{"max-width":"400px","min-width":"200px"},attrs:{placeholder:"请输入用量"},model:{value:e.addDrug.dosage,callback:function(t){e.$set(e.addDrug,"dosage",t)},expression:"addDrug.dosage"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"频次：",prop:"frequency"}},[r("el-input",{staticStyle:{"max-width":"400px","min-width":"200px"},attrs:{placeholder:"请输入频次"},model:{value:e.addDrug.frequency,callback:function(t){e.$set(e.addDrug,"frequency",t)},expression:"addDrug.frequency"}})],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.drugModel=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1),e._v(" "),r("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,"append-to-body":!0,visible:e.drugDetailModel,title:"药品详情"},on:{"update:visible":function(t){e.drugDetailModel=t}}},[r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.drugDetailLoading,expression:"drugDetailLoading"}]},[r("div",{staticClass:"flex flex-warp-justify",staticStyle:{"marign-left":"20px"}},e._l(e.detailInfo,function(t,a){return r("div",{staticClass:"flex"},[r("div",{staticStyle:{height:"40px","line-height":"40px","min-width":"120px"}},[e._v("\n            "+e._s(t.name)+"：\n        ")]),e._v(" "),r("div",{staticStyle:{height:"40px","line-height":"40px","min-width":"240px"}},[e._v("\n            "+e._s(e.drugDetail[t.key])+"\n        ")])])}))])])],1)},staticRenderFns:[]};var g=r("VU/8")(d,u,!1,function(e){r("Aar0")},"data-v-3455a9c8",null);t.default=g.exports},Aar0:function(e,t){}});
//# sourceMappingURL=21.b57aadd393d2c737924e.js.map