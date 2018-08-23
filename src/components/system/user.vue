<template>
    <div v-loading="loading">

        <div style="border-bottom:1px #e5e5e5 solid;">
          <h3>用户管理
          </h3>
           <div style="margin:10px 0;">
平台用户数量统计：{{Count}} 人              
            </div>          
            <div style="padding-bottom:20px;">
<el-row :gutter="10">
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input
  placeholder="请输入用户名字/用户账号/角色名字/部门名字" style="margin-top:20px;" v-model="keyword"
  clearable>
</el-input>
  </el-col>
 <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2" style="min-width:100px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getUserList(true)">查询</el-button>
  </el-col>
  
             <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
           <el-button
          type="primary" style="margin-top:20px;"
          @click="changeModel('add',false)">添加用户</el-button>
 </el-col>
</el-row>
          </div>
</div>

<el-table border
    :data="userList"
    stripe
    style="width: 100%;min-height:500px;">
  <el-table-column  fixed="left"
      prop="name"
      label="姓名">
   </el-table-column>
  <el-table-column
      prop="userName"
      label="账号">
   </el-table-column>
   <el-table-column label="密码"  >
      <template slot-scope="scope">
      ******
      </template>
    </el-table-column>
   <el-table-column label="用户类型"  >
      <template slot-scope="scope">
          {{scope.row.adminState == '1' ?'系统管理员':'普通用户'}}
      </template>
    </el-table-column>
  <el-table-column
      prop="role"
      label="职位">
          <template slot-scope="scope">
      {{handleRoleName(scope.row.SysRoleList)}}
      </template>
    </el-table-column>
 <el-table-column
      prop="departmentName"
      label="部门" width="140">
      
               <template slot-scope="scope">
      {{handleDepartmentName(scope.row.UserDepartmentList)}}
      </template>
   </el-table-column>
 <el-table-column
      label="状态">
      <template slot-scope="scope">
        
      <el-tag :type="scope.row.userStatus=='1' ?'primary':'info'">
               {{scope.row.userStatus =='1' ?"启用中":"已停用"}}</el-tag>
</template>
   </el-table-column>
 <el-table-column
      prop="createTime"
      label="创建时间" width="160">
   </el-table-column>

 <el-table-column
      prop="remark"
      label="备注">
   </el-table-column>
    



   <el-table-column label="操作" fixed="right"  width="300" >
      <template slot-scope="scope">
        
 
          <el-button
          size="mini"
          type="primary"
          @click="initPassword(scope.row)">重置密码</el-button>
          
          
          <el-button
          size="mini"
          type="primary"
          @click="changeModel('edit',scope.row)">编辑</el-button>
          
   <el-button
          size="mini"
          :type="scope.row.userStatus=='1' ?'danger':'primary'" 
          @click="doStop(scope.$index, scope.row)" :disabled="scope.row.adminState == '1'">
         {{ scope.row.userStatus=='1' ?'停用':'启用'}}
          </el-button>
          
          <el-button
          size="mini"
          type="text"
          @click="doDelete(scope.$index, scope.row)" :disabled="scope.row.adminState == '1'">删除</el-button>
      </template>
    </el-table-column>
</el-table>

		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="page+1" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>



  <el-dialog :visible.sync="model" width="1050px" center size="tiny"  :title="modelType =='add' ?'添加用户':'编辑用户'" :close-on-click-modal="false" top="40px">
    


 <el-form label-width="120px">
          

				<el-form-item label="账号">
					<el-input v-model="userForm.userName" style="max-width:400px;"  placeholder="请输入请输入6-12位账号" ></el-input>
				</el-form-item>

<!-- <div v-if="modelType =='add'">
				<el-form-item label="密码">
					<el-input v-model="userForm.userPassword" type="password" style="max-width:400px;"></el-input>
				</el-form-item>

	<el-form-item label="确认密码">
					<el-input v-model="userForm.re_user_password" type="password" style="max-width:400px;"></el-input>
				</el-form-item>
</div> -->



	<el-form-item label="姓名">
					<el-input v-model="userForm.name" style="max-width:400px;"></el-input>
				</el-form-item>




	<el-form-item label="备注">
					<el-input v-model="userForm.remark" style="max-width:400px;"></el-input>
				</el-form-item>
<div v-if="userForm['adminState'] == '0' || modelType =='add'">
	<el-form-item label="部门" >
  <el-cascader change-on-select  clearable
  :options="options"
  v-model="departmentModel"  placeholder="请选择部门"
   @change="changeDepartment"
></el-cascader>
				</el-form-item>


	<el-form-item label="职位">
<!-- <el-select  placeholder="请选择职位" v-model="roleIdModel">
  <el-option v-for="item in roleList" :label="item.roleName" :value="item.roleId" :key="item.roleId"></el-option>
  </el-select> -->
    <el-checkbox-group v-model="roleIdModel" size="mini" >
      <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.roleId" border>{{item.roleName}}</el-checkbox>
    </el-checkbox-group>


				</el-form-item>
</div>

</el-form>


			<span slot="footer" class="dialog-footer">
				<el-button @click="model = false">取 消</el-button>
				<el-button type="primary" @click="doSubmit">确 定</el-button>
			</span>

  </el-dialog>



    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  loading = false;
  userList = [];
  userForm = {};
  modelType = "add";
  model = false;
  changeModel(type, row) {
    this.departmentModel = [];
    this.roleIdModel = [];
    this.modelType = type;
    this.userForm = {};

    if (row) {
      let a = {};
      Object.assign(a, row);
      this.userForm = a;
      if (row.UserDepartmentList.length > 0) {
        this.queryDepartmentAtMySelf(
          row.UserDepartmentList[0].departmentId,
          res => {
            if (res) {
              this.departmentModel = res;
            }
          }
        );
      }
      if (row.SysRoleList.length > 0) {
        this.roleIdModel = [];
        row.SysRoleList.forEach((item, index) => {
          this.roleIdModel.push(item.roleId);
        });
      }
    }
    this.model = true;
  }

  queryDepartmentAtMySelf(departmentId, callback) {
    indexApi
      .queryDepartmentAtMySelf({
        departmentId: departmentId
      })
      .then(res => {
        if (res["retCode"]) {
          callback(res.data.list);
        } else {
          callback(null);
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  bianli(list, id) {
    list.filter((item, index) => {
      return item.departmentId == id;
    });
    return;
  }

  page = 0;
  pageSize = 10;
  total = 0;
  onPageChange(page) {
    this.page = page - 1;
    this.getUserList();
  }

  getUserList(filter=null) {
    if(filter){
      this.page = 0
    }
    indexApi
      .getUserList({
        keyword: this.keyword,
        page: this.page,
        pageSize: this.pageSize
      })
      .then(res => {
        this.loading = false;
        if (res["retCode"]) {
          this.userList = res.data.List;
          this.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  departmentModel: any = [];
  roleIdModel: any = "";

  changeDepartment(e) {
    if (e.length > 0) {
      this.getRoleList(e[e.length - 1]);
    }
  }

  handleRoleName(roleList) {
    let str = [];
    roleList.forEach((item, index) => {
      str.push(item.role);
    });
    return str.join(",");
  }

  handleDepartmentName(departmentList) {
    if (departmentList[0]) {
      return departmentList[0].name;
    } else {
      return "";
    }
  }
  roleList = [];
  getRoleList(departmentId) {
    let data = {};
    if (departmentId) {
      Object.assign(data, { departmentId: departmentId });
    }
    indexApi.queryRoleList(data).then(res => {
      if (res["retCode"]) {
        if (departmentId) {
          let roleIdModel: any = [];
          res.data.roleList.forEach((item, index) => {
            roleIdModel.push(item.roleId);
          });
          this.roleIdModel = roleIdModel;
        } else {
          this.roleList = res.data.roleList;
        }
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  keyword = "";
  options = [];
  departmentId = "";
  getDepartment() {
    indexApi.getDepartment({}).then(res => {
      console.log(res);
      if (res["retCode"]) {
        this.options = res.data.children;
        // this.options.unshift({
        //   departmentId:"",
        //   label:"全部",
        //   name:"全部",
        //   value:''
        // })
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  doSubmit() {
    if ((this.userForm["userName"] || "") == "") {
      this.$alert("请输入账号");
      return;
    }
    if ((this.userForm["name"] || "") == "") {
      this.$alert("请输入姓名");
      return;
    }
    let a = this.roleIdModel.length > 0;
    if (!a) {
      this.$alert("请选择职位");
      return;
    }

    if (this.userForm["adminState"] == "0") {
      if (!this.departmentModel || this.departmentModel.length == 0) {
        this.userForm["departmentId"] = "";
      } else {
        this.userForm["departmentId"] = this.departmentModel[
          this.departmentModel.length - 1
        ];
      }
    }
    this.userForm["roleId"] = this.roleIdModel.join(",");
    if (this.modelType == "add") {
      this.userForm["userPassword"] = "123456";
      indexApi.addSystemUserModel(this.userForm).then(res => {
        if (res["retCode"]) {
          this.$alert("添加成功,初始密码为：123456");
          this.getUserList();
          this.model = false;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
    } else {
      indexApi.updateSystemUserModel(this.userForm).then(res => {
        if (res["retCode"]) {
          this.$message("保存成功");
          this.getUserList();
          this.model = false;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    }
  }
  doStop(index, row) {
    if (row.adminState == "1") {
      this.$alert("不可停用系统管理员账号");
      return;
    }
    let status = row.userStatus == "1" ? "停用" : "启用";

    this.$confirm("是否" + status + "该用户?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .updateSystemUserModel({
            userId: row.userID,
            userStatus: row.userStatus == "0" ? "1" : "0"
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("已停用");
              this.getUserList();
            } else {
              if (!res["islogin"]) {
                this.$alert(res["message"]);
              }
              console.error("数据查询错误");
            }
          });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
  }
  doDelete(index, row) {
    if (row.adminState == "1") {
      this.$alert("不可删除系统管理员账号");
      return;
    }
    this.$confirm("是否删除该用户?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .deleteSystemUserModel({
            userId: row.userID
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("已删除");
              this.getUserList();
            } else {
              if (!res["islogin"]) {
                this.$alert(res["message"]);
              }
              console.error("数据查询错误");
            }
          });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
  }
  initPassword(row) {
    this.$confirm("是否对此用户执行重置密码?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .updateSystemUserModel({
            userId: row.userId,
            userPassword: "123456"
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("已重置");
              this.getUserList();
            } else {
              if (!res["islogin"]) {
                this.$alert(res["message"]);
              }
              console.error("数据查询错误");
            }
          });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
  }

  Count = 0;

  allCount() {
    indexApi.allCountuser().then(res => {
      console.log(res);
      if (res["retCode"]) {
        this.Count = res.data.num;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  mounted() {
    this.loading = true;

    this.allCount();
    this.getUserList();
    this.getDepartment();
    this.getRoleList(false);
  }
}
</script>

<style  scoped>
.flex-space {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
}
</style>