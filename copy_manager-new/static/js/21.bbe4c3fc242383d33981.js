webpackJsonp([21],{"/vYN":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=i("TToO"),o=i("7+uW"),a=i("c+8m"),n=i.n(a),r=i("FL7F"),s=i("P/kE"),c=(r.a,function(t){var e={provinceId:t};return s.n("/address/querycity",e).then(function(t){return t})}),d=function(t){var e={cityId:t};return s.n("/address/querycountry",e).then(function(t){return t})},p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.keyname="",e.dialogFormVisible=!1,e.dialogFormVisible1=!1,e.detailsshow=!1,e.hospitallist=[],e.formLabelAlign={hospitalCode:"",hospitalName:"",affiliatedHospital:"",hospitalType:"",hospitalLevel:"",locatedCity:"",hospitalAddress:"",contactInformation:"",bak:"",hospitalId:"",locatedProvince:"",locatedArea:""},e.formLabelAlign1={hospitalName:"",hospitalAddress:"",hospitalCode:"",bak:"",affiliatedHospital:"",hospitalType:"",hospitalLevel:"",locatedCity:"",contactInformation:"",hospitalId:"",locatedProvince:"",locatedArea:""},e.formLabeldetails={},e.pageSize=10,e.total=0,e.currentPage=0,e.province="",e.city="",e.country="",e.addprovince="",e.addcity="",e.addcountry="",e.editprovince="",e.editcity="",e.editcountry="",e.provincelist=[],e.citylist=[],e.countrylist=[],e.addcitylist=[],e.addcountrylist=[],e.editcitylist=[],e.editcountrylist=[],e.hospitalcount=0,e}return l.b(e,t),e.prototype.handleEdit=function(t,e){this.dialogFormVisible1=!0,this.formLabelAlign1=e.data},e.prototype.onPageChange=function(t){this.currentPage=t-1,this.gethospitalList()},e.prototype.gethospitalList=function(){var t,e,i,l,o,a,n,r=this;(t=this.currentPage,e=this.pageSize,i=this.keyname,l=this.province,o=this.city,a=this.country,n={token:sessionStorage.getItem("token"),keyword:i,provinceId:l,cityId:o,areaId:a,page:t,pageSize:e},s.n("/hospital/findHospital",n).then(function(t){return t})).then(function(t){t.retCode?(r.hospitallist=t.data.hosipitalList,r.total=t.data.page.total):(t.islogin||r.$alert(t.message),console.error("数据查询错误"))})},e.prototype.addcancel=function(){this.dialogFormVisible=!1,this.formLabelAlign={hospitalCode:"",hospitalName:"",affiliatedHospital:"",hospitalType:"",hospitalLevel:"",locatedCity:"",hospitalAddress:"",contactInformation:"",bak:"",hospitalId:"",locatedProvince:"",locatedArea:""}},e.prototype.addhospital=function(){var t=this,e=this.provincelist.filter(function(e){return e.id==t.addprovince}),i=this.addcitylist.filter(function(e){return e.id==t.addcity}),l=this.addcountrylist.filter(function(e){return e.id==t.addcountry}),o=[];o.provinceid=this.addprovince,o.cityid=this.addcity,o.countryid=this.addcountry,o.provincename=e[0].name,o.cityname=i[0].name,o.countryname=l[0].name,function(t,e){var i={token:sessionStorage.getItem("token"),hospitalCode:t.hospitalCode,hospitalName:t.hospitalName,affiliatedHospital:t.affiliatedHospital,hospitalType:t.hospitalType,hospitalLevel:t.hospitalLevel,hospitalAddress:t.hospitalAddress,contactInformation:t.contactInformation,bak:t.bak,locatedProvince:e.provincename,provinceId:e.provinceid,locatedCity:e.cityname,cityId:e.cityid,locatedArea:e.countryname,areaId:e.countryid};return s.n("/hospital/addhospital",i).then(function(t){return t})}(this.formLabelAlign,o).then(function(e){e.retCode?(t.dialogFormVisible=!1,t.formLabelAlign={hospitalCode:"",hospitalName:"",affiliatedHospital:"",hospitalType:"",hospitalLevel:"",locatedCity:"",hospitalAddress:"",contactInformation:"",bak:"",hospitalId:"",locatedProvince:"",locatedArea:""},t.keyname="",t.province="",t.city="",t.country="",t.citylist=[],t.countrylist=[],t.currentPage=0,t.addprovince="",t.addcity="",t.addcountry="",t.gethospitalList(),t.getHospitalCount(),t.$message("添加成功")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.delethospital=function(t,e){var i=this;this.$confirm("是否删除该医院?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t,l;(t=e.hospitalId,l={token:sessionStorage.getItem("token"),hospitalId:t},s.n("/hospital/delethospital",l).then(function(t){return t})).then(function(t){t.retCode?(i.currentPage=0,i.gethospitalList(),i.getHospitalCount()):(t.islogin||i.$alert(t.message),console.error("数据查询错误"))})}).catch(function(){i.$message({type:"info",message:"已取消删除"})})},e.prototype.edithospital=function(t,e){this.dialogFormVisible1=!0,this.formLabelAlign1=e,this.editprovince=e.provinceId,this.editprovincechange(),this.editcity=e.cityId,this.editcitychange(),this.editcountry=e.areaId},e.prototype.updatecancel=function(){this.dialogFormVisible1=!1,this.formLabelAlign1={hospitalName:"",hospitalAddress:"",hospitalCode:"",bak:"",affiliatedHospital:"",hospitalType:"",hospitalLevel:"",locatedCity:"",contactInformation:"",hospitalId:"",locatedProvince:"",locatedArea:""}},e.prototype.updatehospital=function(){var t=this,e=this.provincelist.filter(function(e){return e.id==t.editprovince}),i=this.editcitylist.filter(function(e){return e.id==t.editcity}),l=this.editcountrylist.filter(function(e){return e.id==t.editcountry}),o=[];o.provinceid=this.editprovince,o.cityid=this.editcity,o.countryid=this.editcountry,o.provincename=e[0].name,o.cityname=i[0].name,o.countryname=l[0].name,function(t,e){var i={token:sessionStorage.getItem("token"),hospitalId:t.hospitalId,hospitalName:t.hospitalName,affiliatedHospital:t.affiliatedHospital,hospitalType:t.hospitalType,hospitalLevel:t.hospitalLevel,hospitalAddress:t.hospitalAddress,contactInformation:t.contactInformation,bak:t.bak,locatedProvince:e.provincename,provinceId:e.provinceid,locatedCity:e.cityname,cityId:e.cityid,locatedArea:e.countryname,areaId:e.countryid};return s.n("/hospital/updateuser",i).then(function(t){return t})}(this.formLabelAlign1,o).then(function(e){e.retCode?(t.dialogFormVisible1=!1,t.formLabelAlign1={hospitalName:"",hospitalAddress:"",hospitalCode:"",bak:"",affiliatedHospital:"",hospitalType:"",hospitalLevel:"",locatedCity:"",contactInformation:"",hospitalId:"",locatedProvince:"",locatedArea:""},t.keyname="",t.province="",t.city="",t.country="",t.citylist=[],t.countrylist=[],t.currentPage=0,t.gethospitalList(),t.$message("保存成功")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.detailshospital=function(t,e){this.detailsshow=!0,this.formLabeldetails=e},e.prototype.getprovince=function(){var t=this;s.n("/address/queryprovince",{}).then(function(t){return t}).then(function(e){e.retCode?t.provincelist=e.data.region:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.provincechange=function(){var t=this;this.city="",this.country="",this.citylist=[],this.countrylist=[],this.province&&c(this.province).then(function(e){e.retCode?t.citylist=e.data.region:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.addprovincechange=function(){var t=this;this.addcity="",this.addcountry="",this.addcitylist=[],this.addcountrylist=[],this.addprovince&&c(this.addprovince).then(function(e){e.retCode?t.addcitylist=e.data.region:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.editprovincechange=function(){var t=this;this.editcity="",this.editcountry="",this.editcitylist=[],this.editcountrylist=[],this.editprovince&&c(this.editprovince).then(function(e){e.retCode?t.editcitylist=e.data.region:(t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.citychange=function(){var t=this;this.country="",this.countrylist=[],this.city&&d(this.city).then(function(e){e.retCode?t.countrylist=e.data.region:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.addcitychange=function(){var t=this;this.addcountry="",this.addcountrylist=[],this.addcity&&d(this.addcity).then(function(e){e.retCode?t.addcountrylist=e.data.region:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.editcitychange=function(){var t=this;this.editcountry="",this.editcountrylist=[],this.editcity&&d(this.editcity).then(function(e){e.retCode?t.editcountrylist=e.data.region:(t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.getHospitalCount=function(){var t,e=this;(t={token:sessionStorage.getItem("token")},s.n("/hospital/findHospitalCount",t).then(function(t){return t})).then(function(t){t.retCode?e.hospitalcount=t.data.total:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.gethospitalList(),this.getHospitalCount(),this.getprovince()},e=l.a([n()({props:{},components:{}})],e)}(o.default),m={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{"border-bottom":"1px #e5e5e5 solid"}},[i("h3",[t._v("医院管理")]),t._v(" "),i("div",{staticStyle:{"border-bottom":"1px solid #E5E5E5","padding-bottom":"20px"}},[t._v("平台医院数量统计："+t._s(t.hospitalcount)+"个")]),t._v(" "),i("div",{staticStyle:{"margin-top":"20px"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogFormVisible=!0}}},[t._v("新增医院")])],1),t._v(" "),i("div",{staticStyle:{"padding-bottom":"20px"}},[i("el-row",{attrs:{gutter:10}},[i("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[i("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入医院名称",clearable:""},model:{value:t.keyname,callback:function(e){t.keyname=e},expression:"keyname"}})],1)],1),t._v(" "),i("el-row",{attrs:{gutter:10}},[i("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[i("el-select",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请选择省",clearable:""},on:{change:function(e){t.provincechange()},clear:function(e){t.provincechange()}},model:{value:t.province,callback:function(e){t.province=e},expression:"province"}},t._l(t.provincelist,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[i("el-select",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请选择市",clearable:""},on:{change:function(e){t.citychange()},clear:function(e){t.citychange()}},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}},t._l(t.citylist,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[i("el-select",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请选择区",clearable:""},model:{value:t.country,callback:function(e){t.country=e},expression:"country"}},t._l(t.countrylist,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[i("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.gethospitalList()}}},[t._v("查询")])],1)],1)],1)]),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.hospitallist,stripe:""}},[i("el-table-column",{attrs:{prop:"hospitalCode",label:"医院编码"}}),t._v(" "),i("el-table-column",{attrs:{prop:"hospitalName",label:"医院名称"}}),t._v(" "),i("el-table-column",{attrs:{prop:"YdkDoctorNum",label:"医生数量"}}),t._v(" "),i("el-table-column",{attrs:{prop:"PrescriptionNum",label:"处方数量"}}),t._v(" "),i("el-table-column",{attrs:{prop:"OrderNum",label:"订单数量"}}),t._v(" "),i("el-table-column",{attrs:{prop:"affiliatedHospital",label:"院区"}}),t._v(" "),i("el-table-column",{attrs:{prop:"hospitalLevel",label:"等级"}}),t._v(" "),i("el-table-column",{attrs:{prop:"locatedProvince",label:"所在省"}}),t._v(" "),i("el-table-column",{attrs:{prop:"locatedCity",label:"所在市"}}),t._v(" "),i("el-table-column",{attrs:{prop:"locatedArea",label:"所在区"}}),t._v(" "),i("el-table-column",{attrs:{prop:"hospitalAddress",label:"医院地址"}}),t._v(" "),i("el-table-column",{attrs:{prop:"contactInformation",width:"120",label:"联系电话"}}),t._v(" "),i("el-table-column",{attrs:{prop:"bak",label:"备注"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",fixed:"right",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){t.detailshospital(e.$index,e.row)}}},[t._v("查看详情")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){t.edithospital(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(i){t.delethospital(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("el-col",{staticClass:"toolbar",attrs:{span:24}},[i("el-pagination",{attrs:{layout:"prev, pager, next","page-size":t.pageSize,total:t.total},on:{"current-change":t.onPageChange}})],1),t._v(" "),i("el-dialog",{attrs:{title:"增加医院",visible:t.dialogFormVisible,width:"60%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{attrs:{"label-width":"100px",model:t.formLabelAlign}},[i("el-form-item",{attrs:{label:"医院编码"}},[i("el-input",{model:{value:t.formLabelAlign.hospitalCode,callback:function(e){t.$set(t.formLabelAlign,"hospitalCode",e)},expression:"formLabelAlign.hospitalCode"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"医院名称"}},[i("el-input",{model:{value:t.formLabelAlign.hospitalName,callback:function(e){t.$set(t.formLabelAlign,"hospitalName",e)},expression:"formLabelAlign.hospitalName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"所属院区"}},[i("el-input",{model:{value:t.formLabelAlign.affiliatedHospital,callback:function(e){t.$set(t.formLabelAlign,"affiliatedHospital",e)},expression:"formLabelAlign.affiliatedHospital"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"医院类型"}},[i("el-input",{model:{value:t.formLabelAlign.hospitalType,callback:function(e){t.$set(t.formLabelAlign,"hospitalType",e)},expression:"formLabelAlign.hospitalType"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"医院等级"}},[i("el-input",{model:{value:t.formLabelAlign.hospitalLevel,callback:function(e){t.$set(t.formLabelAlign,"hospitalLevel",e)},expression:"formLabelAlign.hospitalLevel"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"所在城市"}},[i("el-select",{attrs:{placeholder:"请选择省",clearable:""},on:{change:function(e){t.addprovincechange()},clear:function(e){t.addprovincechange()}},model:{value:t.addprovince,callback:function(e){t.addprovince=e},expression:"addprovince"}},t._l(t.provincelist,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),t._v(" "),i("el-select",{attrs:{placeholder:"请选择市",clearable:""},on:{change:function(e){t.addcitychange()},clear:function(e){t.addcitychange()}},model:{value:t.addcity,callback:function(e){t.addcity=e},expression:"addcity"}},t._l(t.addcitylist,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),t._v(" "),i("el-select",{attrs:{placeholder:"请选择区",clearable:""},model:{value:t.addcountry,callback:function(e){t.addcountry=e},expression:"addcountry"}},t._l(t.addcountrylist,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"医院地址"}},[i("el-input",{model:{value:t.formLabelAlign.hospitalAddress,callback:function(e){t.$set(t.formLabelAlign,"hospitalAddress",e)},expression:"formLabelAlign.hospitalAddress"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"联系方式"}},[i("el-input",{model:{value:t.formLabelAlign.contactInformation,callback:function(e){t.$set(t.formLabelAlign,"contactInformation",e)},expression:"formLabelAlign.contactInformation"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"备注"}},[i("el-input",{model:{value:t.formLabelAlign.bak,callback:function(e){t.$set(t.formLabelAlign,"bak",e)},expression:"formLabelAlign.bak"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.addcancel()}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addhospital()}}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"编辑",visible:t.dialogFormVisible1,width:"60%"},on:{"update:visible":function(e){t.dialogFormVisible1=e}}},[i("el-form",{attrs:{"label-width":"100px",model:t.formLabelAlign1}},[i("el-form-item",{attrs:{label:"医院名称"}},[i("el-input",{model:{value:t.formLabelAlign1.hospitalName,callback:function(e){t.$set(t.formLabelAlign1,"hospitalName",e)},expression:"formLabelAlign1.hospitalName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"院区"}},[i("el-input",{model:{value:t.formLabelAlign1.affiliatedHospital,callback:function(e){t.$set(t.formLabelAlign1,"affiliatedHospital",e)},expression:"formLabelAlign1.affiliatedHospital"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"等级"}},[i("el-input",{model:{value:t.formLabelAlign1.hospitalLevel,callback:function(e){t.$set(t.formLabelAlign1,"hospitalLevel",e)},expression:"formLabelAlign1.hospitalLevel"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"所在城市"}},[i("el-select",{attrs:{placeholder:"请选择省",clearable:""},on:{change:function(e){t.editprovincechange()},clear:function(e){t.editprovincechange()}},model:{value:t.editprovince,callback:function(e){t.editprovince=e},expression:"editprovince"}},t._l(t.provincelist,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),t._v(" "),i("el-select",{attrs:{placeholder:"请选择市",clearable:""},on:{change:function(e){t.editcitychange()},clear:function(e){t.editcitychange()}},model:{value:t.editcity,callback:function(e){t.editcity=e},expression:"editcity"}},t._l(t.editcitylist,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),t._v(" "),i("el-select",{attrs:{placeholder:"请选择区",clearable:""},model:{value:t.editcountry,callback:function(e){t.editcountry=e},expression:"editcountry"}},t._l(t.editcountrylist,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"医院地址"}},[i("el-input",{model:{value:t.formLabelAlign1.hospitalAddress,callback:function(e){t.$set(t.formLabelAlign1,"hospitalAddress",e)},expression:"formLabelAlign1.hospitalAddress"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"联系电话"}},[i("el-input",{model:{value:t.formLabelAlign1.contactInformation,callback:function(e){t.$set(t.formLabelAlign1,"contactInformation",e)},expression:"formLabelAlign1.contactInformation"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"备注"}},[i("el-input",{model:{value:t.formLabelAlign1.bak,callback:function(e){t.$set(t.formLabelAlign1,"bak",e)},expression:"formLabelAlign1.bak"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.updatecancel()}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.updatehospital()}}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{width:"70vw","close-on-click-modal":!1,visible:t.detailsshow},on:{"update:visible":function(e){t.detailsshow=e}}},[i("div",{staticStyle:{border:"1px #e5e5e5 solid"}},[i("h3",{staticStyle:{"text-align":"center"}},[t._v("医院详情")]),t._v(" "),i("el-form",{attrs:{"label-width":"100px",inline:!0}},[i("el-row",{attrs:{gutter:24}},[i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"医院名称："}},[t._v("\n                 "+t._s(t.formLabeldetails.hospitalName)+"\n\t\t\t\t")])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"医生数量："}},[t._v("\n                 "+t._s(t.formLabeldetails.YdkDoctorNum)+"\n\t\t\t\t")])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"处方数量："}},[t._v("\n                 "+t._s(t.formLabeldetails.PrescriptionNum)+"\n\t\t\t\t")])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"订单数量："}},[t._v("\n                 "+t._s(t.formLabeldetails.OrderNum)+"\n\t\t\t\t")])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"所在省："}},[t._v("\n                 "+t._s(t.formLabeldetails.locatedProvince)+"\n\t\t\t\t")])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"所在市："}},[t._v("\n                 "+t._s(t.formLabeldetails.locatedCity)+"\n\t\t\t\t")])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"所在区："}},[t._v("\n                 "+t._s(t.formLabeldetails.locatedArea)+"\n\t\t\t\t")])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"医院地址："}},[t._v("\n                 "+t._s(t.formLabeldetails.hospitalAddress)+"\n\t\t\t\t")])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"院区："}},[t._v("\n                 "+t._s(t.formLabeldetails.affiliatedHospital)+"\n\t\t\t\t")])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"等级："}},[t._v("\n                 "+t._s(t.formLabeldetails.hospitalLevel)+"\n\t\t\t\t")])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"联系电话："}},[t._v("\n                 "+t._s(t.formLabeldetails.contactInformation)+"\n\t\t\t\t")])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[i("el-form-item",{attrs:{label:"备注："}},[t._v("\n                 "+t._s(t.formLabeldetails.bak)+"\n\t\t\t\t")])],1)],1)],1)],1)])],1)},staticRenderFns:[]};var u=i("VU/8")(p,m,!1,function(t){i("5+gf")},"data-v-06ce5303",null);e.default=u.exports},"5+gf":function(t,e){}});
//# sourceMappingURL=21.bbe4c3fc242383d33981.js.map