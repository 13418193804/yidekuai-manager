webpackJsonp([14],{"58+u":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("TToO"),n=o("7+uW"),a=o("c+8m"),s=o.n(a),l=o("RXoh"),i=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.loading=!1,t.userList=[],t.userForm={},t.modelType="add",t.model=!1,t.page=0,t.pageSize=10,t.total=0,t.departmentModel=[],t.roleIdModel="",t.roleList=[],t.keyword="",t.options=[],t.departmentId="",t.Count=0,t}return r.b(t,e),t.prototype.changeModel=function(e,t){var o=this;if(this.departmentModel=[],this.roleIdModel=[],this.modelType=e,this.userForm={},t){var r={};Object.assign(r,t),this.userForm=r,t.UserDepartmentList.length>0&&this.queryDepartmentAtMySelf(t.UserDepartmentList[0].departmentId,function(e){e&&(o.departmentModel=e)}),t.SysRoleList.length>0&&(this.roleIdModel=[],t.SysRoleList.forEach(function(e,t){o.roleIdModel.push(e.roleId)}))}this.model=!0},t.prototype.queryDepartmentAtMySelf=function(e,t){var o=this;l._23({departmentId:e}).then(function(e){e.retCode?t(e.data.list):(t(null),e.islogin||o.$alert(e.message),console.error("数据查询错误"))})},t.prototype.bianli=function(e,t){e.filter(function(e,o){return e.departmentId==t})},t.prototype.onPageChange=function(e){this.page=e-1,this.getUserList()},t.prototype.getUserList=function(e){var t=this;void 0===e&&(e=null),e&&(this.page=0),l._12({keyword:this.keyword,page:this.page,pageSize:this.pageSize}).then(function(e){t.loading=!1,e.retCode?(t.userList=e.data.List,t.total=e.data.page.total):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},t.prototype.changeDepartment=function(e){e.length>0&&this.getRoleList(e[e.length-1])},t.prototype.handleRoleName=function(e){var t=[];return e.forEach(function(e,o){t.push(e.role)}),t.join(",")},t.prototype.handleDepartmentName=function(e){return e[0]?e[0].name:""},t.prototype.getRoleList=function(e){var t=this,o={};e&&Object.assign(o,{departmentId:e}),l._31(o).then(function(o){if(o.retCode)if(e){var r=[];o.data.roleList.forEach(function(e,t){r.push(e.roleId)}),t.roleIdModel=r}else t.roleList=o.data.roleList;else o.islogin||t.$alert(o.message),console.error("数据查询错误")})},t.prototype.getDepartment=function(){var e=this;l.W({}).then(function(t){console.log(t),t.retCode?e.options=t.data.children:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.doSubmit=function(){var e=this;""!=(this.userForm.userName||"")?""!=(this.userForm.name||"")?this.roleIdModel.length>0?("0"==this.userForm.adminState&&(this.departmentModel&&0!=this.departmentModel.length?this.userForm.departmentId=this.departmentModel[this.departmentModel.length-1]:this.userForm.departmentId=""),this.userForm.roleId=this.roleIdModel.join(","),"add"==this.modelType?(this.userForm.userPassword="123456",l.e(this.userForm).then(function(t){t.retCode?(e.$alert("添加成功,初始密码为：123456"),e.getUserList(),e.model=!1):t.islogin||e.$alert(t.message)})):l._43(this.userForm).then(function(t){t.retCode?(e.$message("保存成功"),e.getUserList(),e.model=!1):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})):this.$alert("请选择职位"):this.$alert("请输入姓名"):this.$alert("请输入账号")},t.prototype.doStop=function(e,t){var o=this;if("1"!=t.adminState){var r="1"==t.userStatus?"停用":"启用";this.$confirm("是否"+r+"该用户?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l._43({userId:t.userID,userStatus:"0"==t.userStatus?"1":"0"}).then(function(e){e.retCode?(o.$message("已停用"),o.getUserList()):(e.islogin||o.$alert(e.message),console.error("数据查询错误"))})}).catch(function(){o.$message({type:"info",message:"已取消操作"})})}else this.$alert("不可停用系统管理员账号")},t.prototype.doDelete=function(e,t){var o=this;"1"!=t.adminState?this.$confirm("是否删除该用户?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l.D({userId:t.userID}).then(function(e){e.retCode?(o.$message("已删除"),o.getUserList()):(e.islogin||o.$alert(e.message),console.error("数据查询错误"))})}).catch(function(){o.$message({type:"info",message:"已取消操作"})}):this.$alert("不可删除系统管理员账号")},t.prototype.initPassword=function(e){var t=this;this.$confirm("是否对此用户执行重置密码?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){l._43({userId:e.userId,userPassword:"123456"}).then(function(e){e.retCode?(t.$message("已重置"),t.getUserList()):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})}).catch(function(){t.$message({type:"info",message:"已取消操作"})})},t.prototype.allCount=function(){var e=this;l.l().then(function(t){console.log(t),t.retCode?e.Count=t.data.num:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.mounted=function(){this.loading=!0,this.allCount(),this.getUserList(),this.getDepartment(),this.getRoleList(!1)},t=r.a([s()({props:{},components:{}})],t)}(n.default),d={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{directives:[{name:"bouncing",rawName:"v-bouncing",value:e.loading,expression:"loading"}]},[o("div",{staticStyle:{"border-bottom":"1px #e5e5e5 solid"}},[o("h3",[e._v("用户管理\n          ")]),e._v(" "),o("div",{staticStyle:{margin:"10px 0"}},[e._v("\n平台用户数量统计："+e._s(e.Count)+" 人              \n            ")]),e._v(" "),o("div",{staticStyle:{"padding-bottom":"20px"}},[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[o("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入用户名字/用户账号/角色名字/部门名字",clearable:""},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1),e._v(" "),o("el-col",{staticStyle:{"min-width":"100px"},attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getUserList(!0)}}},[e._v("查询")])],1),e._v(" "),o("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:function(t){e.changeModel("add",!1)}}},[e._v("添加用户")])],1)],1)],1)]),e._v(" "),o("el-table",{staticStyle:{width:"100%","min-height":"500px"},attrs:{border:"",data:e.userList,stripe:""}},[o("el-table-column",{attrs:{fixed:"left",prop:"name",label:"姓名"}}),e._v(" "),o("el-table-column",{attrs:{prop:"userName",label:"账号"}}),e._v(" "),o("el-table-column",{attrs:{label:"密码"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n      ******\n      ")]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"用户类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s("1"==t.row.adminState?"系统管理员":"普通用户")+"\n      ")]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"role",label:"职位"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n      "+e._s(e.handleRoleName(t.row.SysRoleList))+"\n      ")]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"departmentName",label:"部门",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n      "+e._s(e.handleDepartmentName(t.row.UserDepartmentList))+"\n      ")]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tag",{attrs:{type:"1"==t.row.userStatus?"primary":"info"}},[e._v("\n               "+e._s("1"==t.row.userStatus?"启用中":"已停用"))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"160"}}),e._v(" "),o("el-table-column",{attrs:{prop:"remark",label:"备注"}}),e._v(" "),o("el-table-column",{attrs:{label:"操作",fixed:"right",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){e.initPassword(t.row)}}},[e._v("重置密码")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){e.changeModel("edit",t.row)}}},[e._v("编辑")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"1"==t.row.userStatus?"danger":"primary",disabled:"1"==t.row.adminState},on:{click:function(o){e.doStop(t.$index,t.row)}}},[e._v("\n         "+e._s("1"==t.row.userStatus?"停用":"启用")+"\n          ")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"text",disabled:"1"==t.row.adminState},on:{click:function(o){e.doDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),o("el-col",{staticClass:"toolbar",attrs:{span:24}},[o("el-pagination",{attrs:{layout:"prev, pager, next","current-page":e.page+1,"page-size":e.pageSize,total:e.total},on:{"current-change":e.onPageChange}})],1),e._v(" "),o("el-dialog",{attrs:{visible:e.model,width:"1050px",center:"",size:"tiny",title:"add"==e.modelType?"添加用户":"编辑用户","close-on-click-modal":!1,top:"40px"},on:{"update:visible":function(t){e.model=t}}},[o("el-form",{attrs:{"label-width":"120px"}},[o("el-form-item",{attrs:{label:"账号"}},[o("el-input",{staticStyle:{"max-width":"400px"},attrs:{placeholder:"请输入请输入6-12位账号"},model:{value:e.userForm.userName,callback:function(t){e.$set(e.userForm,"userName",t)},expression:"userForm.userName"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"姓名"}},[o("el-input",{staticStyle:{"max-width":"400px"},model:{value:e.userForm.name,callback:function(t){e.$set(e.userForm,"name",t)},expression:"userForm.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"备注"}},[o("el-input",{staticStyle:{"max-width":"400px"},model:{value:e.userForm.remark,callback:function(t){e.$set(e.userForm,"remark",t)},expression:"userForm.remark"}})],1),e._v(" "),"0"==e.userForm.adminState||"add"==e.modelType?o("div",[o("el-form-item",{attrs:{label:"部门"}},[o("el-cascader",{attrs:{"change-on-select":"",clearable:"",options:e.options,placeholder:"请选择部门"},on:{change:e.changeDepartment},model:{value:e.departmentModel,callback:function(t){e.departmentModel=t},expression:"departmentModel"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"职位"}},[o("el-checkbox-group",{attrs:{size:"mini"},model:{value:e.roleIdModel,callback:function(t){e.roleIdModel=t},expression:"roleIdModel"}},e._l(e.roleList,function(t,r){return o("el-checkbox",{key:r,attrs:{label:t.roleId,border:""}},[e._v(e._s(t.roleName))])}))],1)],1):e._e()],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.model=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.doSubmit}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=o("VU/8")(i,d,!1,function(e){o("YWmn")},"data-v-6bd583cf",null);t.default=u.exports},YWmn:function(e,t){}});
//# sourceMappingURL=14.903ba75785b7f0942e89.js.map