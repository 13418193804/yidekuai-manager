webpackJsonp([16],{"7PxF":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("TToO"),n=a("7+uW"),o=a("c+8m"),l=a.n(o),i=a("H5nj"),d=a("EOM2"),s=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.loading=!1,t.keyname="",t.dialogFormVisible=!1,t.dialogFormVisible1=!1,t.filterText="",t.tableTree=[],t.departmentlist=[],t.defaultProps={children:"children",label:"label"},t.departmentForm={departmentName:""},t.formLabelAlign1={departmentName:""},t.rules={departmentName:[{required:!0,message:"请填写科室名",trigger:"blur"}]},t.parentid="",t.updateparentid="",t.parentName="",t.updateparentName="",t.departmentcount=0,t.updatedepartmentId="",t}return r.b(t,e),t.prototype.watchCount=function(e,t){console.log("newVal",e,"oldVal",t),this.$refs.tree2.filter(e)},t.prototype.filterNode=function(e,t){return!e||-1!==t.label.indexOf(e)},t.prototype.getdepartmenttree=function(){var e=this;this.loading=!0,i.f().then(function(t){e.loading=!1,t.retCode?(e.tableTree=t.data.children,console.log("获取科室树",t.data)):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.doNodeClick=function(e){var t=this;i.e(e.departmentId).then(function(e){console.log(e),e.retCode?(t.departmentlist=e.data,console.log("点击科室",e.data)):(t.$alert(e.message),console.error("数据查询错误"))})},t.prototype.handleChange=function(e){var t=this;if(e.length>0){var a=e.length-1;i.e(this.parentid[a]).then(function(e){console.log(e),e.retCode?t.parentName=e.data[0].departmentName:(t.$alert(e.message),console.error("数据查询错误"))})}else this.parentName=""},t.prototype.updatehandleChange=function(e){var t=this;if(e.length>0){var a=e.length-1;i.e(this.updateparentid[a]).then(function(e){console.log(e),e.retCode?t.updateparentName=e.data[0].departmentName:(t.$alert(e.message),console.error("数据查询错误"))})}else this.updateparentName=""},t.prototype.adddepartment=function(e){var t=this;this.$refs.departmentForm.validate(function(e){if(e){t.loading=!0;var a=t.parentid.length-1;return i.a(t.departmentForm.departmentName,t.parentid[a],t.parentName).then(function(e){t.loading=!1,e.retCode?(t.dialogFormVisible=!1,t.departmentForm={departmentName:""},t.parentid=[],t.parentName="",t.departmentlist=[],t.getdepartmenttree(),t.$message("添加成功")):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))}),!0}return console.log("error submit!!"),!1})},t.prototype.getdepartmentcount=function(){var e=this;i.d().then(function(t){t.retCode?e.departmentcount=t.data:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.addcancel=function(e){this.$refs[e].resetFields(),this.dialogFormVisible=!1,this.departmentForm={departmentName:""},this.parentid=[]},t.prototype.doDelete=function(e,t){var a=this;this.$confirm("是否删除该科室?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",closeOnClickModal:!1}).then(function(){i.b(t.departmentId).then(function(e){e.retCode?(a.departmentlist=[],a.getdepartmenttree()):(a.$alert(e.message),console.error("数据查询错误"))})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},t.prototype.changeModel=function(e){this.updateparentid=[],this.dialogFormVisible1=!0;var t={};Object.assign(t,e),this.formLabelAlign1=t,this.updatedepartmentId=e.departmentId,e.superiorDepartmentId&&this.finddeptree(e.departmentId)},t.prototype.finddeptree=function(e){var t=this;i.c(e).then(function(e){if(e.retCode){var a=[];e.data.forEach(function(e,t){e[0]&&a.push(e[0].departmentId)}),t.updateparentid=a}else t.$alert(e.message),console.error("数据查询错误")})},t.prototype.updatecancel=function(e){this.$refs[e].resetFields(),this.dialogFormVisible1=!1,this.formLabelAlign1={departmentName:""},this.updateparentid=[]},t.prototype.updatedepartment=function(e){var t=this;this.$refs.formLabelAlign1.validate(function(e){if(e){var a=t.updateparentid.length-1;return t.updatedepartmentId==t.updateparentid[a]?(t.$alert("不可绑定本科室为上级科室"),!1):(t.loading=!0,i.g(t.updatedepartmentId,t.formLabelAlign1.departmentName,t.updateparentid[a],t.updateparentName).then(function(e){t.loading=!1,e.retCode?(t.dialogFormVisible1=!1,t.departmentlist=[],t.updatedepartmentId="",t.updateparentName="",t.updateparentid=[],t.getdepartmenttree(),t.$message("保存成功")):(t.$alert(e.message),console.error("数据查询错误"))}),!0)}return console.log("error submit!!"),!1})},t.prototype.mounted=function(){this.getdepartmenttree(),this.getdepartmentcount()},r.a([Object(d.Watch)("filterText"),r.c("design:type",Function),r.c("design:paramtypes",[Object,Object]),r.c("design:returntype",void 0)],t.prototype,"watchCount",null),t=r.a([l()({props:{},components:{}})],t)}(n.default),p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[a("div",[a("h3",[e._v("科室管理")]),e._v(" "),a("div",{staticStyle:{"border-bottom":"1px solid #E5E5E5","padding-bottom":"20px"}},[e._v("平台科室数量统计："+e._s(e.departmentcount)+"个")]),e._v(" "),a("div",{staticStyle:{padding:"20px 0"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("新增科室")])],1)]),e._v(" "),a("el-row",{staticStyle:{margin:"10px"},attrs:{gutter:24}},[a("el-col",{attrs:{xs:24,sm:24,md:24,lg:7,xl:10}},[a("div",{staticStyle:{border:"solid 1px #e5e5e5",padding:"10px"}},[a("el-input",{attrs:{placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),e._v(" "),a("el-tree",{ref:"tree2",staticClass:"filter-tree",attrs:{data:e.tableTree,props:e.defaultProps,"expand-on-click-node":!1,"default-expand-all":"","highlight-current":"","filter-node-method":e.filterNode},on:{"node-click":e.doNodeClick}})],1)]),e._v(" "),a("el-col",{attrs:{xs:24,sm:24,md:24,lg:15,xl:14}},[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:e.departmentlist,stripe:""}},[a("el-table-column",{attrs:{fixed:"left",prop:"departmentName",label:"科室名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"superiorDepartmentName",label:"上级科室"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sumDepar",label:"用户数量"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{size:"mini",type:"primary"},on:{click:function(a){e.changeModel(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{size:"mini",type:"text"},on:{click:function(a){e.doDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"增加科室",visible:e.dialogFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisible=t},close:function(t){e.addcancel("departmentForm")}}},[a("el-form",{ref:"departmentForm",attrs:{"label-width":"100px",model:e.departmentForm,rules:e.rules}},[a("el-form-item",{attrs:{label:"新增科室",prop:"departmentName"}},[a("el-input",{model:{value:e.departmentForm.departmentName,callback:function(t){e.$set(e.departmentForm,"departmentName",t)},expression:"departmentForm.departmentName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"上级科室"}},[a("el-cascader",{attrs:{clearable:"",options:e.tableTree,"change-on-select":""},on:{change:e.handleChange},model:{value:e.parentid,callback:function(t){e.parentid=t},expression:"parentid"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.addcancel("departmentForm")}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:e.loading},on:{click:function(t){e.adddepartment("departmentForm")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改科室",visible:e.dialogFormVisible1,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisible1=t},close:function(t){e.updatecancel("formLabelAlign1")}}},[a("el-form",{ref:"formLabelAlign1",attrs:{"label-width":"100px",model:e.formLabelAlign1,rules:e.rules}},[a("el-form-item",{attrs:{label:"科室名称",prop:"departmentName"}},[a("el-input",{model:{value:e.formLabelAlign1.departmentName,callback:function(t){e.$set(e.formLabelAlign1,"departmentName",t)},expression:"formLabelAlign1.departmentName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"上级科室"}},[a("el-cascader",{attrs:{clearable:"",options:e.tableTree,"change-on-select":""},on:{change:e.updatehandleChange},model:{value:e.updateparentid,callback:function(t){e.updateparentid=t},expression:"updateparentid"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.updatecancel("formLabelAlign1")}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:e.loading},on:{click:function(t){e.updatedepartment("formLabelAlign1")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(s,p,!1,function(e){a("QDxC")},"data-v-3cb02edf",null);t.default=m.exports},QDxC:function(e,t){}});
//# sourceMappingURL=16.9ebd2a8fb0f9b9756cc0.js.map