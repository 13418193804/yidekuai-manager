webpackJsonp([7],{"58+u":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("TToO"),s=o("7+uW"),l=o("c+8m"),a=o.n(l),n=o("RXoh"),i=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.userList=[],t.userForm={},t.modelType="add",t.model=!1,t.page=0,t.pageSize=10,t.total=100,t.departmentModel=[],t.roleIdModel="",t.roleList=[],t.keyword="",t.options=[],t.departmentId="",t.Count=0,t}return r.b(t,e),t.prototype.changeModel=function(e,t){if(this.modelType=e,this.userForm={},t){var o={};Object.assign(o,t),this.userForm=o}this.model=!0},t.prototype.onPageChange=function(e){this.page=e-1,this.getUserList()},t.prototype.getUserList=function(){var e=this;n.D({keyword:this.keyword,page:this.page,pageSize:this.pageSize}).then(function(t){t.retCode?(console.log(t.data),e.userList=t.data.user,e.total=t.data.page.total):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.changeDepartment=function(e){this.roleIdModel="",this.getRoleList(e[e.length-1])},t.prototype.getRoleList=function(e){var t=this;n.K({departmentId:e}).then(function(e){e.retCode?t.roleList=e.data.roleList:(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},t.prototype.getDepartment=function(){var e=this;n.w({}).then(function(t){console.log(t),t.retCode?e.options=t.data.children:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.doSubmit=function(){var e=this;if(""!=(this.userForm.userName||"")){if("add"==this.modelType){if(!this.userForm.userPassword||this.userForm.userPassword.length<6)return void this.$alert("密码必须6位字符以上");if(""==(this.userForm.userPassword||""))return void this.$alert("请输入密码");if(this.userForm.userPassword!=this.userForm.re_user_password)return void this.$alert("两次密码必须一致")}this.departmentModel&&0!=this.departmentModel.length?""!=(this.roleIdModel||"")?(this.userForm.departmentId=this.departmentModel[this.departmentModel.length-1],this.userForm.roleId=this.roleIdModel,"add"==this.modelType?n.b(this.userForm).then(function(t){console.log(t),t.retCode?(e.$message("添加成功"),e.getUserList(),e.model=!1):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))}):n.P(this.userForm).then(function(t){t.retCode?(e.$message("添加成功"),e.getUserList(),e.model=!1):(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})):this.$alert("请选择职位"):this.$alert("请选择部门")}else this.$alert("请输入账号")},t.prototype.doDelete=function(e,t){var o=this;this.$confirm("是否删除该用户?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.n({userId:t.userID}).then(function(e){e.retCode?(o.$message("已删除"),o.getUserList()):(e.islogin||o.$alert(e.message),console.error("数据查询错误"))})}).catch(function(){o.$message({type:"info",message:"已取消操作"})})},t.prototype.initPassword=function(e){var t=this;this.$confirm("是否对此用户执行重置密码?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.P({userId:e.userID,userPassword:"123456"}).then(function(e){e.retCode?(t.$message("已重置"),t.getUserList()):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})}).catch(function(){t.$message({type:"info",message:"已取消操作"})})},t.prototype.allCount=function(){var e=this;n.e().then(function(t){console.log(t),t.retCode?e.Count=t.data.num:(t.islogin||e.$alert(t.message),console.error("数据查询错误"))})},t.prototype.mounted=function(){this.allCount(),this.getUserList(),this.getDepartment()},t=r.a([a()({props:{},components:{}})],t)}(s.default),u={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticStyle:{"border-bottom":"1px #e5e5e5 solid"}},[o("h3",[e._v("用户管理\n          ")]),e._v(" "),o("div",{staticStyle:{margin:"10px 0"}},[e._v("\n平台用户数量统计："+e._s(e.Count)+" 人              \n            ")]),e._v(" "),o("div",{staticStyle:{"padding-bottom":"20px"}},[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{xs:8,sm:8,md:5,lg:5,xl:5}},[o("el-input",{staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入用户名字/用户账号/角色名字/部门名字",clearable:""},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1),e._v(" "),o("el-col",{staticStyle:{"min-width":"100px"},attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getUserList()}}},[e._v("查询")])],1),e._v(" "),o("el-col",{attrs:{xs:5,sm:5,md:2,lg:2,xl:2}},[o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:function(t){e.changeModel("add",!1)}}},[e._v("添加用户")])],1)],1)],1)]),e._v(" "),o("el-table",{staticStyle:{width:"100%","min-height":"500px"},attrs:{border:"",data:e.userList,stripe:""}},[o("el-table-column",{attrs:{prop:"name",label:"姓名"}}),e._v(" "),o("el-table-column",{attrs:{prop:"userName",label:"账号"}}),e._v(" "),o("el-table-column",{attrs:{label:"密码"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n      ******\n      ")]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"用户类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.adminState?"系统管理员":"普通用户")+"\n      ")]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"role",label:"职位"}}),e._v(" "),o("el-table-column",{attrs:{prop:"departmentName",label:"部门"}}),e._v(" "),o("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tag",{attrs:{type:t.row.userStatus?"success":"info"}},[e._v("\n               "+e._s(t.row.userStatus?"启用中":"已停用"))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"createTime",label:"创建时间"}}),e._v(" "),o("el-table-column",{attrs:{prop:"remark",label:"备注"}}),e._v(" "),o("el-table-column",{attrs:{label:"操作",fixed:"right",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){e.initPassword(t.row)}}},[e._v("重置密码")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){e.changeModel("edit",t.row)}}},[e._v("编辑")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){e.doDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),o("el-col",{staticClass:"toolbar",attrs:{span:24}},[o("el-pagination",{attrs:{layout:"prev, pager, next","page-size":e.pageSize,total:e.total},on:{"current-change":e.onPageChange}})],1),e._v(" "),o("el-dialog",{attrs:{visible:e.model,width:"1050px",center:"",size:"tiny",title:"add"==e.modelType?"添加用户":"编辑用户","close-on-click-modal":!1,top:"40px"},on:{"update:visible":function(t){e.model=t}}},[o("el-form",{attrs:{"label-width":"120px"}},[o("el-form-item",{attrs:{label:"账号"}},[o("el-input",{staticStyle:{"max-width":"400px"},model:{value:e.userForm.userName,callback:function(t){e.$set(e.userForm,"userName",t)},expression:"userForm.userName"}})],1),e._v(" "),"add"==e.modelType?o("div",[o("el-form-item",{attrs:{label:"密码"}},[o("el-input",{staticStyle:{"max-width":"400px"},attrs:{type:"password"},model:{value:e.userForm.userPassword,callback:function(t){e.$set(e.userForm,"userPassword",t)},expression:"userForm.userPassword"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"确认密码"}},[o("el-input",{staticStyle:{"max-width":"400px"},attrs:{type:"password"},model:{value:e.userForm.re_user_password,callback:function(t){e.$set(e.userForm,"re_user_password",t)},expression:"userForm.re_user_password"}})],1)],1):e._e(),e._v(" "),o("el-form-item",{attrs:{label:"姓名"}},[o("el-input",{staticStyle:{"max-width":"400px"},model:{value:e.userForm.name,callback:function(t){e.$set(e.userForm,"name",t)},expression:"userForm.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"备注"}},[o("el-input",{staticStyle:{"max-width":"400px"},model:{value:e.userForm.remark,callback:function(t){e.$set(e.userForm,"remark",t)},expression:"userForm.remark"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"部门"}},[o("el-cascader",{attrs:{options:e.options,placeholder:"请选择部门"},on:{change:e.changeDepartment},model:{value:e.departmentModel,callback:function(t){e.departmentModel=t},expression:"departmentModel"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"职位"}},[o("el-select",{attrs:{placeholder:"请选择职位"},model:{value:e.roleIdModel,callback:function(t){e.roleIdModel=t},expression:"roleIdModel"}},e._l(e.roleList,function(e){return o("el-option",{key:e.roleId,attrs:{label:e.roleName,value:e.roleId}})}))],1)],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.model=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.doSubmit}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=o("VU/8")(i,u,!1,function(e){o("5l5H")},"data-v-63cb2deb",null);t.default=d.exports},"5l5H":function(e,t){}});
//# sourceMappingURL=7.47ccc63c62d05dcc2f80.js.map