webpackJsonp([19],{Vt1u:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("TToO"),l=o("7+uW"),r=o("c+8m"),n=o.n(r),s=o("RXoh"),a=o("EOM2"),c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.filterText="",t.loading=!1,t.roleForm={},t.checkboxGroup6=[],t.model=!1,t.modelType="add",t.primssRow={},t.primssLoading=!1,t.primssModel=!1,t.defaultProps={children:"children",label:"name"},t.roleList=[],t.keyword="",t.options=[],t.departmentId="",t.page=0,t.pageSize=10,t.total=0,t.allCount=0,t.AuthorityList=[],t}return i.b(t,e),t.prototype.watchCount=function(e,t){console.log("newVal",e,"oldVal",t),this.$refs.tree2.filter(e)},t.prototype.filterNode=function(e,t){return!e||-1!==t.name.indexOf(e)},t.prototype.handleDelete=function(e,t){var o=this;t.userNum>0?this.$alert("不可删除有用户的职位"):this.$confirm("此操作将删除该职位, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){console.log(t),s.z({roleId:t.roleId}).then(function(e){e.retCode?(o.$message("删除成功"),o.getRoleList()):(e.islogin||o.$alert(e.message),console.error("数据查询错误"))})}).catch(function(){o.$message({type:"info",message:"已取消删除"})})},t.prototype.handleCheckChange=function(e,t,o){console.log(e,t,o)},t.prototype.changeModel=function(e,t){if(this.modelType=e,this.roleForm={},t){var o={};Object.assign(o,t),this.roleForm=o,this.roleForm.role=this.roleForm.roleName,this.roleForm.description=this.roleForm.roleDescription,this.roleForm.role_id=this.roleForm.roleId}this.model=!0},t.prototype.showRolePrimss=function(e){var t={};Object.assign(t,e),this.primssRow=t,this.roleGetPrimss(e),this.primssModel=!0},t.prototype.roleGetPrimss=function(e){var t=this;s._17({roleId:e.roleId}).then(function(e){e.retCode?e.data.rolepermission.length>0&&(t.checkboxGroup6=e.data.permissionIdList):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},t.prototype.roleBindPrimss=function(){var e=this;this.primssLoading=!0,s._16({roleId:this.primssRow.roleId,permissionIdList:this.checkboxGroup6.join(",")}).then(function(t){e.primssLoading=!1,console.log("更新权限",t),t.retCode?(e.$message("保存成功"),e.primssModel=!1):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.doSubmit=function(){var e=this;""!=(this.roleForm.role||"")?""!=(this.roleForm.description||"")?"add"==this.modelType?s.c(this.roleForm).then(function(t){t.retCode?(e.$message("添加成功"),e.getRoleList(),e.roleForm.roleId=t.data.roleId,e.model=!1):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))}):s._23(this.roleForm).then(function(t){t.retCode?(e.$message("保存成功"),e.getRoleList(),e.model=!1):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))}):this.$alert("请输入职位描述"):this.$alert("请输入职位名称")},t.prototype.onPageChange=function(e){this.page=e-1,this.getRoleList()},t.prototype.getRoleList=function(e){var t=this;void 0===e&&(e=null),e&&(this.page=0);var o="";this.departmentId.length>0&&(o=this.departmentId[this.departmentId.length-1]),s._14({keyword:this.keyword,departmentId:o,page:this.page,pageSize:this.pageSize}).then(function(e){t.loading=!1,e.retCode?(t.roleList=e.data.roleList,t.total=e.data.page.total):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},t.prototype.getDepartment=function(){var e=this;s.P({}).then(function(t){console.log(t),t.retCode?(e.options=t.data.children,e.options.unshift({departmentId:"",label:"全部",name:"全部",value:""}),console.log("获取部门树",t.data)):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.alloCount=function(){var e=this;s.j().then(function(t){console.log(t),t.retCode?e.allCount=t.data.num:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.getPermission=function(){var e=this;s.X({}).then(function(t){t.retCode?e.AuthorityList=t.data.AuthorityList:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.mounted=function(){this.loading=!0,this.alloCount(),this.getRoleList(),this.getDepartment(),this.getPermission()},i.a([Object(a.Watch)("filterText"),i.c("design:type",Function),i.c("design:paramtypes",[Object,Object]),i.c("design:returntype",void 0)],t.prototype,"watchCount",null),t=i.a([n()({props:{},components:{}})],t)}(l.default),d={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[o("div",{staticStyle:{"border-bottom":"1px #e5e5e5 solid"}},[o("h3",[e._v("职位管理\n          ")]),e._v(" "),o("div",{staticStyle:{margin:"10px 0"}},[e._v("\n平台职位数量统计："+e._s(e.allCount)+"             \n            ")]),e._v(" "),o("div",{staticStyle:{"padding-bottom":"20px"}},[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:4}},[o("el-cascader",{staticStyle:{"margin-top":"20px"},attrs:{"change-on-select":"",options:e.options},model:{value:e.departmentId,callback:function(t){e.departmentId=t},expression:"departmentId"}})],1),e._v(" "),o("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[o("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入职位名称",clearable:""},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1),e._v(" "),o("el-col",{staticStyle:{"min-width":"100px"},attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getRoleList(!0)}}},[e._v("查询")])],1),e._v(" "),o("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:function(t){e.changeModel("add")}}},[e._v("添加职位")])],1)],1)],1)]),e._v(" "),o("el-table",{staticStyle:{width:"100%","min-height":"500px"},attrs:{border:"",data:e.roleList,stripe:""}},[o("el-table-column",{attrs:{fixed:"left",prop:"roleName",label:"职位名称"}}),e._v(" "),o("el-table-column",{attrs:{prop:"userNum",label:"用户数量"}}),e._v(" "),o("el-table-column",{attrs:{label:"职位状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tag",{attrs:{type:t.row.roleAvailable?"success":"info"}},[e._v("\n               "+e._s(t.row.roleAvailable?"启用中":"已停用"))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"roleDescription",label:"职位描述",width:"500"}}),e._v(" "),o("el-table-column",{attrs:{label:"操作",fixed:"right",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){e.showRolePrimss(t.row)}}},[e._v("角色权限")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){e.changeModel("edit",t.row)}}},[e._v("编辑")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(o){e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),o("el-col",{staticClass:"toolbar",attrs:{span:24}},[o("el-pagination",{attrs:{layout:"prev, pager, next","current-page":e.page+1,"page-size":e.pageSize,total:e.total},on:{"current-change":e.onPageChange}})],1),e._v(" "),o("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.primssLoading,expression:"primssLoading"}],attrs:{visible:e.primssModel,width:"1050px",center:"",size:"tiny",title:"角色权限","close-on-click-modal":!1,top:"40px"},on:{"update:visible":function(t){e.primssModel=t}}},[o("div",{staticStyle:{"min-height":"500px"}},[o("el-input",{staticStyle:{"margin-bottom":"20px"},attrs:{placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),e._v(" "),o("el-checkbox-group",{model:{value:e.checkboxGroup6,callback:function(t){e.checkboxGroup6=t},expression:"checkboxGroup6"}},[o("el-tree",{ref:"tree2",attrs:{props:e.defaultProps,data:e.AuthorityList,"node-key":"permissionId","default-expand-all":"","expand-on-click-node":!1,"filter-node-method":e.filterNode},on:{"check-change":e.handleCheckChange},scopedSlots:e._u([{key:"default",fn:function(t){t.node;var i=t.data;return o("span",{staticClass:"custom-tree-node"},[o("span",{staticStyle:{"font-size":"14px"}},[e._v("可见菜单:"+e._s(i.name))]),e._v(" "),o("span",{staticStyle:{position:"absolute",right:"0"}},[o("el-checkbox",{key:1,attrs:{label:i.permissionId}},[e._v("启用")])],1)])}}])})],1)],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.primssModel=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.roleBindPrimss}},[e._v("确 定")])],1)]),e._v(" "),o("el-dialog",{attrs:{visible:e.model,width:"1050px",center:"",size:"tiny",title:"add"==e.modelType?"添加职位":"编辑职位","close-on-click-modal":!1,top:"40px"},on:{"update:visible":function(t){e.model=t}}},[o("el-form",{attrs:{"label-width":"120px"}},[o("el-form-item",{attrs:{label:"职位名称"}},[o("el-input",{staticStyle:{"max-width":"400px"},model:{value:e.roleForm.role,callback:function(t){e.$set(e.roleForm,"role",t)},expression:"roleForm.role"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"职位描述"}},[o("el-input",{staticStyle:{"max-width":"400px"},model:{value:e.roleForm.description,callback:function(t){e.$set(e.roleForm,"description",t)},expression:"roleForm.description"}})],1)],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.model=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.doSubmit}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var p=o("VU/8")(c,d,!1,function(e){o("odsb")},"data-v-3162078a",null);t.default=p.exports},odsb:function(e,t){}});
//# sourceMappingURL=19.ad37f9d37a254b1507f4.js.map