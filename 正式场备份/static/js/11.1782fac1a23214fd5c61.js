webpackJsonp([11],{A1SZ:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o("TToO"),i=o("7+uW"),l=o("c+8m"),c=o.n(l),n=o("P/kE"),s=o("K8i7"),a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.rowObject={userId:"",type:"add",addressId:"",showSendDialog:!1,contactName:"",contactMobile:"",provinceId:null,cityId:null,countryId:null,address:"",isDefault:!1,doSubmit:function(){console.log("提交"),""!=(e.rowObject.contactName||"")?""!=(e.rowObject.contactMobile||"")?""!=(e.rowObject.provinceId||"")&&""!=(e.rowObject.cityId||"")&&""!=(e.rowObject.countryId||"")?""!=(e.rowObject.address||"")?"add"==e.rowObject.type?s.d(e.rowObject).then(function(t){e.$message("添加成功"),e.rowObject.showSendDialog=!1,e.queryAddress(),console.log(t)}):s.e(e.rowObject).then(function(t){e.$message("修改成功"),e.rowObject.showSendDialog=!1,e.queryAddress(),console.log(t)}):e.$alert("请填写收货地址"):e.$alert("请选择地区"):e.$alert("请填写收货联系号码"):e.$alert("请填写收货联系人")}},e.provinceList=[],e.cityList=[],e.countryList=[],e.tableData=[],e.page=0,e.pageSize=10,e.total=100,e}return r.b(e,t),e.prototype.chengModel=function(t,e){this.rowObject.type=t,"add"==this.rowObject.type?(this.rowObject.contactName="",this.rowObject.contactMobile="",this.rowObject.provinceId=null,this.rowObject.cityId=null,this.rowObject.countryId=null,this.rowObject.address="",this.rowObject.isDefault=!1):(console.log(e),this.rowObject.isDefault=!!e.isdefault,this.rowObject.addressId=e.addressId,this.rowObject.contactName=e.contactName,this.rowObject.contactMobile=e.contactMobile,console.log(),this.rowObject.provinceId=e.provinceid,this.queryCityList(),this.rowObject.cityId=e.cityid,this.queryCountryList(),this.rowObject.countryId=e.countryid,this.rowObject.address=e.address),this.rowObject.showSendDialog=!0},e.prototype.deleteAddress=function(t){var e=this;console.log("删除地址"),n.a(this,"是否要删除该地址").then(function(o){o&&s.c(t.addressId).then(function(t){e.queryAddress()})})},e.prototype.setDefault=function(t){var e=this;s.t(t.addressId,this.rowObject.userId).then(function(t){e.$message("设置成功"),e.queryAddress()})},e.prototype.queryAddress=function(){var t=this;s.g(this.rowObject.userId,this.page,this.pageSize).then(function(e){t.tableData=e.data.list,t.total=e.data.page.total})},e.prototype.queryCountryList=function(){var t=this;this.rowObject.countryId="",s.j(this.rowObject.cityId).then(function(e){t.countryList=e.data.region})},e.prototype.queryCityList=function(){var t=this;console.log(),this.rowObject.cityId="",s.h(this.rowObject.provinceId).then(function(e){t.cityList=e.data.region})},e.prototype.queryProvinceList=function(){var t=this;s.k().then(function(e){t.provinceList=e.data.region})},e.prototype.onPageChange=function(t){this.page=t-1,this.queryAddress()},e.prototype.mounted=function(){if(""==(sessionStorage.member_id||""))return this.$alert("找不到该用户"),void this.$router.go(-1);this.rowObject.userId=sessionStorage.member_id,this.queryAddress(),this.queryProvinceList()},e=r.a([c.a],e)}(i.default),d={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("h2",[t._v("收货地址")]),t._v(" "),o("div",{staticStyle:{padding:"20px"}},[o("div",[o("el-button",{staticStyle:{float:"left"},attrs:{size:"small",type:"primary"},on:{click:function(e){t.chengModel("add")}}},[t._v("添加地址")])],1),t._v(" "),o("el-table",{ref:"singleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"highlight-current-row":"",height:"500"}},[o("el-table-column",{attrs:{type:"index",width:"50",fixed:"left"}}),t._v(" "),o("el-table-column",{attrs:{label:"是否默认",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isdefault?o("el-tag",{attrs:{type:"info",size:"small"}},[t._v("\n        默认地址\n               ")]):t._e()]}}])}),t._v(" "),o("el-table-column",{attrs:{property:"contactName",label:"联系人",width:"110"}}),t._v(" "),o("el-table-column",{attrs:{property:"contactMobile",label:"联系电话",width:"130"}}),t._v(" "),o("el-table-column",{attrs:{label:"地址",width:"210"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.province)+t._s(e.row.city)+t._s(e.row.country)+t._s(e.row.address)+"\n\t\t\t\t")]}}])}),t._v(" "),o("el-table-column",{attrs:{property:"createTime",label:"日期",width:"180"}}),t._v(" "),o("el-table-column",{attrs:{label:"操作",width:"280",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"small"},on:{click:function(o){t.setDefault(e.row)}}},[t._v("设为默认")]),t._v(" "),o("el-button",{attrs:{size:"small"},on:{click:function(o){t.deleteAddress(e.row)}}},[t._v("删除")]),t._v(" "),o("el-button",{attrs:{size:"small"},on:{click:function(o){t.chengModel("update",e.row)}}},[t._v("修改")])]}}])})],1),t._v(" "),o("el-col",{staticClass:"toolbar",attrs:{span:24}},[o("el-pagination",{attrs:{layout:"prev, pager, next","page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1)],1),t._v(" "),o("el-dialog",{attrs:{"close-on-click-modal":!1,visible:t.rowObject.showSendDialog,size:"small",title:"发货地址"},on:{"update:visible":function(e){t.$set(t.rowObject,"showSendDialog",e)}}},[o("el-form",{attrs:{"label-width":"120px"}},[o("el-form-item",{attrs:{label:"联系人名称"}},[o("el-input",{attrs:{maxlength:"10"},model:{value:t.rowObject.contactName,callback:function(e){t.$set(t.rowObject,"contactName",e)},expression:"rowObject.contactName"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"联系人号码"}},[o("el-input",{attrs:{maxlength:"20"},model:{value:t.rowObject.contactMobile,callback:function(e){t.$set(t.rowObject,"contactMobile",e)},expression:"rowObject.contactMobile"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"地区"}},[o("div",{staticStyle:{"white-space":"nowrap",overflow:"hidden"}},[o("el-row",{attrs:{gutter:24}},[o("el-col",{staticStyle:{"margin-bottom":"22px"},attrs:{xs:24,sm:12,md:8,lg:8,xl:6}},[o("el-select",{on:{change:function(e){t.queryCityList()}},model:{value:t.rowObject.provinceId,callback:function(e){t.$set(t.rowObject,"provinceId",e)},expression:"rowObject.provinceId"}},t._l(t.provinceList,function(t){return o("el-option",{attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),o("el-col",{staticStyle:{"margin-bottom":"22px"},attrs:{xs:24,sm:12,md:8,lg:8,xl:6}},[o("el-select",{on:{change:function(e){t.queryCountryList()}},model:{value:t.rowObject.cityId,callback:function(e){t.$set(t.rowObject,"cityId",e)},expression:"rowObject.cityId"}},t._l(t.cityList,function(t){return o("el-option",{attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),o("el-col",{staticStyle:{"margin-bottom":"22px"},attrs:{xs:24,sm:12,md:8,lg:8,xl:6}},[o("el-select",{model:{value:t.rowObject.countryId,callback:function(e){t.$set(t.rowObject,"countryId",e)},expression:"rowObject.countryId"}},t._l(t.countryList,function(t){return o("el-option",{attrs:{label:t.name,value:t.id}})}))],1)],1)],1)]),t._v(" "),o("el-form-item",{attrs:{label:"联系地址"}},[o("el-input",{attrs:{maxlength:"50"},model:{value:t.rowObject.address,callback:function(e){t.$set(t.rowObject,"address",e)},expression:"rowObject.address"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"是否默认"}},[o("div",{staticStyle:{float:"left"}},[o("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.rowObject.isDefault,callback:function(e){t.$set(t.rowObject,"isDefault",e)},expression:"rowObject.isDefault"}})],1)])],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.rowObject.showSendDialog=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.rowObject.doSubmit}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=o("VU/8")(a,d,!1,function(t){o("QgrS")},null,null);e.default=u.exports},QgrS:function(t,e){}});
//# sourceMappingURL=11.1782fac1a23214fd5c61.js.map