webpackJsonp([13],{"+deT":function(t,e){},x50c:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o("TToO"),n=o("7+uW"),l=o("c+8m"),a=o.n(l),i=o("RXoh"),s=o("EOM2"),c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading=!1,e.model=!1,e.checkboxGroup6=[],e.parentId=[],e.departmentForm={},e.modelType="add",e.row={},e.currentObject={},e.filterText="",e.tableTree=[{id:1,label:"所有部门",value:"",children:{}}],e.defaultProps={children:"children",label:"label"},e.roleList=[],e.options=[],e}return r.b(e,t),e.prototype.watchCount=function(t,e){console.log("newVal",t,"oldVal",e),this.$refs.tree2.filter(t)},e.prototype.changeModel=function(t,e){var o=this;if(this.modelType=t,this.departmentForm={},this.checkboxGroup6=[],this.parentId=[],"edit"==t){var r={};Object.assign(r,e),this.departmentForm=r,this.row=e,e.roleList.forEach(function(t,e){o.checkboxGroup6.push(t.roleId)}),e.parentId?this.queryDepartmentAtMySelf(e.parentId,function(t){t&&(console.log("附上去的角色list",t),o.parentId=t,o.parentId.unshift(""))}):this.parentId=[""]}this.model=!0},e.prototype.getRoleList=function(t){var e=this,o={};t&&Object.assign(o,{departmentId:t}),i._15(o).then(function(o){if(o.retCode){if(t){var r=[];o.data.roleList.forEach(function(t,e){r.push(t.roleId)}),e.checkboxGroup6=r}}else o.islogin||e.$alert(o.message),console.error("数据查询错误")})},e.prototype.queryDepartmentAtMySelf=function(t,e){var o=this;i._7({departmentId:t}).then(function(t){t.retCode?e(t.data.list):(e(null),t.islogin||o.$alert(t.message),console.error("数据查询错误"))})},e.prototype.doDelete=function(t,e){var o=this;this.$confirm("删除该部门？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.v({departmentId:e.departmentId}).then(function(t){t.retCode?(o.$message("已删除一条部门记录"),o.getDepartmentAllList(o.row.departmentId),o.getDepartment()):(t.islogin||o.$alert(t.message),console.error("数据查询错误"))})}).catch(function(){o.$message({type:"info",message:"已取消操作"})})},e.prototype.doSubmit=function(){var t=this;this.departmentForm.parentId=this.parentId[this.parentId.length-1],this.departmentForm.roleId=this.checkboxGroup6.join(","),"add"==this.modelType?i.e(this.departmentForm).then(function(e){e.retCode?(t.$message("保存成功"),t.getDepartment(),t.getDepartmentAllList(t.row.departmentId),t.model=!1):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))}):i.n(this.departmentForm).then(function(e){e.retCode?(t.$message("保存成功"),t.getDepartment(),t.getDepartmentAllList(t.row.departmentId),t.model=!1):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.filterNode=function(t,e){return!t||-1!==e.label.indexOf(t)},e.prototype.doNodeClick=function(t,e,o){this.row=t,this.getDepartmentAllList(t.departmentId)},e.prototype.roletoString=function(t){var e=[];return t.forEach(function(t,o){e.push(t.roleName)}),e.join(",")},e.prototype.getDepartmentAllList=function(t){var e=this;i.Q({departmentId:t}).then(function(t){e.loading=!1,t.retCode?e.roleList=t.data.department:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},e.prototype.getDepartment=function(){var t=this;i.P({}).then(function(e){console.log(e),e.retCode?(t.tableTree[0].children=e.data.children,console.log("获取部门树",e.data)):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.getallRoleList=function(){var t=this;i._15({}).then(function(e){e.retCode?t.options=e.data.roleList:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.loading=!0,this.getDepartment(),this.getallRoleList(),this.getDepartmentAllList("")},r.a([Object(s.Watch)("filterText"),r.c("design:type",Function),r.c("design:paramtypes",[Object,Object]),r.c("design:returntype",void 0)],e.prototype,"watchCount",null),e=r.a([a()({props:{},components:{}})],e)}(n.default),d={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[o("div",{staticStyle:{"border-bottom":"1px #e5e5e5 solid"}},[o("h3",[t._v("部门管理\n          ")]),t._v(" "),o("el-row",{staticStyle:{margin:"20px 20px 0","min-width":"180px"},attrs:{gutter:24}},[o("el-col",{attrs:{xs:24,sm:24,md:24,lg:7,xl:6}},[o("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{size:"mini",type:"primary"},on:{click:function(e){t.changeModel("add")}}},[t._v("添加部门")])],1)],1)],1),t._v(" "),o("el-row",{staticStyle:{margin:"10px"},attrs:{gutter:24}},[o("el-col",{staticStyle:{"margin-top":"20px"},attrs:{xs:24,sm:24,md:24,lg:7,xl:10}},[o("div",{staticStyle:{border:"solid 1px #e5e5e5",padding:"10px"}},[o("el-input",{attrs:{placeholder:"输入关键字进行过滤"},model:{value:t.filterText,callback:function(e){t.filterText=e},expression:"filterText"}}),t._v(" "),o("el-tree",{ref:"tree2",staticClass:"filter-tree",attrs:{data:t.tableTree,props:t.defaultProps,"expand-on-click-node":!1,"default-expand-all":"","highlight-current":"","filter-node-method":t.filterNode},on:{"node-click":t.doNodeClick}})],1)]),t._v(" "),o("el-col",{staticStyle:{"margin-top":"20px"},attrs:{xs:24,sm:24,md:24,lg:15,xl:14}},[o("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.roleList,stripe:""}},[o("el-table-column",{attrs:{fixed:"left",prop:"name",label:"部门名称",width:"150"}}),t._v(" "),o("el-table-column",{attrs:{prop:"parentName",label:"上级部门"}}),t._v(" "),o("el-table-column",{attrs:{label:"部门角色"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t.roletoString(e.row.roleList))+"\n      ")]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"TotalUserNum",label:"用户数量"}}),t._v(" "),o("el-table-column",{attrs:{label:"操作",fixed:"right",width:"170"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{size:"mini",type:"primary"},on:{click:function(o){t.changeModel("edit",e.row)}}},[t._v("编辑")]),t._v(" "),o("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{size:"mini",type:"text"},on:{click:function(o){t.doDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1)],1)],1),t._v(" "),o("el-dialog",{attrs:{visible:t.model,width:"1050px",center:"",size:"tiny",title:"add"==t.modelType?"添加部门":"编辑部门","close-on-click-modal":!1,top:"40px"},on:{"update:visible":function(e){t.model=e}}},[o("el-form",{attrs:{"label-width":"120px"}},[o("el-form-item",{attrs:{label:"部门名称"}},[o("el-input",{staticStyle:{"max-width":"400px"},model:{value:t.departmentForm.name,callback:function(e){t.$set(t.departmentForm,"name",e)},expression:"departmentForm.name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"上级部门"}},[o("el-cascader",{attrs:{options:t.tableTree,"change-on-select":""},model:{value:t.parentId,callback:function(e){t.parentId=e},expression:"parentId"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"职位名称"}},[o("div",[o("el-checkbox-group",{attrs:{size:"mini"},model:{value:t.checkboxGroup6,callback:function(e){t.checkboxGroup6=e},expression:"checkboxGroup6"}},t._l(t.options,function(e,r){return o("el-checkbox",{attrs:{label:e.roleId,border:""}},[t._v(t._s(e.roleName))])}))],1)])],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.model=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.doSubmit}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var p=o("VU/8")(c,d,!1,function(t){o("+deT")},"data-v-3b74f62f",null);e.default=p.exports}});
//# sourceMappingURL=13.cf28bc4dd574b83fbfbc.js.map