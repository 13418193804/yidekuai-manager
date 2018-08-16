<template>
    <div>
    <h3 class="title">后台用户</h3>

<div style="width:100%;background-color:#f7f7f7;padding:20px;display:flex;">
    <div style="margin-right:20px;">
      <el-input v-model="modelObj.loginName" placeholder="输入账号名称或手机号码"></el-input>
    </div>
     <div  style="margin-right:20px;">
       <el-select v-model="modelObj.roleId">
         <el-option  value="" label="全部"></el-option>
         
         <el-option v-for="n in roleList" :value="n.id" :label="n.roleName"></el-option>
       </el-select>
    </div>

 <div  style="margin-right:20px;">
       <el-button @click="queryList(true)">查询</el-button>
    </div>

 <div  style="margin-right:20px;">
     <el-button type="primary" @click="changeModel('add')">添加后台账号</el-button>
    </div>

</div>



 <el-table border
    ref="multipleTable"
    :data="merchantUserList"
    tooltip-effect="dark"
    style="width: 70%;min-height:500px;"
    >
   
    <el-table-column  fixed="left"
      label="备注" header-align="center">
      <template slot-scope="scope">{{ scope.row.nickName }}</template>
    </el-table-column>
      
    <el-table-column
      label="登录名" header-align="center">
      <template slot-scope="scope">{{ scope.row.loginName }}</template>
    </el-table-column>
      
          
    <el-table-column
      label="密码" header-align="center">
      <template slot-scope="scope">
        <!-- {{ scope.row.password }} -->
        ******
        </template>
    </el-table-column>
      
    <el-table-column
      label="角色" header-align="center">
      <template slot-scope="scope">{{ scope.row.role?scope.row.role.roleName:'' }}</template>
    </el-table-column>
      



	<el-table-column label="操作" width="300" header-align="center">
				<template slot-scope="scope">
          
						<el-button size="mini" type="info" @click="changeModel('edit',scope.row)" plain :disabled="!scope.row.role">编辑</el-button>
						<el-button size="mini" type="text" @click="doDelete(scope.row )" plain :disabled="!scope.row.role">删除</el-button>
				</template>
			</el-table-column>



  </el-table>





<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="page+1" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>










	<el-dialog :visible.sync="model" size="small" :title="type=='add'?'添加用户':'修改用户'" :close-on-click-modal="false">


      	 <el-form label-width="120px">
          

	<el-form-item label="备注" style="max-width:400px">
					<el-input placeholder="请输入备注" v-model="obj.nickName" maxlength="16"></el-input>
				</el-form-item>
				<el-form-item label="登录名" style="max-width:400px">
					<el-input placeholder="请输入登录名" v-model="obj.loginName" maxlength="22"></el-input>
				</el-form-item>

		<el-form-item label="密码" style="max-width:400px">
					<el-input placeholder="请输入登录密码" type="password" v-model="password" ></el-input>
				</el-form-item>

<el-form-item label="确认密码" style="max-width:400px">
					<el-input placeholder="确认登录密码" type="password" v-model="repassword" ></el-input>
				</el-form-item>


<el-form-item label="角色" style="max-width:400px;float:left;">
    <el-select v-model="obj.roleId">
         <el-option  value="" label="请选择"></el-option>
         <el-option v-for="n in roleList" :value="n.id" :label="n.roleName"></el-option>
       </el-select>
				</el-form-item>


</el-form>
			


			<span slot="footer" class="dialog-footer" >
				<el-button @click="model = false">取 消</el-button>
				<el-button type="primary" @click="doSubmit">{{type=='add'?'添加':'保存'}}</el-button>
			</span>

		</el-dialog>

    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as sysApi from "../../api/sysApi";
import * as Api from "../../api/api";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  merchantUserList = [];
  pageSize = 10;
  total = 100;
  currentPage = 0;
  model = false;
  password = "";
  repassword = "";
  obj = {};
  modelObj = {
    loginName: "",
    roleId: ""
  };

  doDelete(row) {
    Api.doConfirm(this, "是否删除该账户").then(res => {
      if (res) {
        sysApi.deleteUser({ userId: row.merchantUserId }).then(res => {
          if (res["retCode"]) {
            console.log(res);
            this.$message("删除成功");
            this.queryList();
          } else {
            if(!res['islogin']){this.$alert(res["message"]);}
            console.error("数据查询错误");
          }
        });
      }
    });
  }

  doSubmit() {
    console.log(this.obj);
    if ((this.obj["nickName"] || "") == "") {
      this.$message("请填写备注");
      return;
    }
    if ((this.obj["loginName"] || "") == "") {
      this.$message("请填写登录名");
      return;
    }
    if ((this.password || "") == "" || (this.repassword || "") == "") {
      this.$message("请填写密码或者两次密码不匹配");
      return;
    }
    if ((this.obj["roleId"] || "") == "") {
      this.$message("请选择一个角色");
      return;
    }

    this.obj["password"] = this.password;
    if (this.type == "add") {
      console.log("添加商户");
      sysApi.addUser(this.obj).then(res => {
        if (res["retCode"]) {
          console.log(res);
          this.$message("添加成功");
          this.changeModel(null, null);
          this.queryList();
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}

          console.error("数据查询错误");
        }
      });
    }

    if (this.type == "edit") {



  sysApi.updateUser(this.obj).then(res => {
        if (res["retCode"]) {
          console.log(res);
          this.$message("保存成功");
          this.changeModel(null, null);
          this.queryList();
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}

          console.error("数据查询错误");
        }
      });

    }

    // addUser
  }
  type = "add";
  changeModel(type, obj) {
    if (type == "add") {
      this.obj = {
        loginName: "",
        password: "",
        roleId: "",
        nickName: ""
      };
      this.password = "";
      this.repassword = "";

      this.type = type;
    } else if (type == "edit") {
      let a = {};
      Object.assign(a, obj);
      this.obj = a;
      this.password = obj.password;
      this.repassword = obj.password;
      this.type = type;
    }
    this.model = !this.model;
  }
  onPageChange(currentPage: number) {
    this.currentPage = currentPage;
    this.queryList();
  }
  queryList(filter=null) {
    if(filter){
      this.currentPage = 0
    }
    sysApi.queryUserList(this.currentPage, this.modelObj).then(res => {
      if (res["retCode"]) {
        this.merchantUserList = res.data.merchantUserList;
        this.total = res.data.page.total;

        console.log(res);
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}

        console.error("数据查询错误");
      }
    });
    console.log("查询列表");
  }
  roleList = [];
  queryRoleList() {
    sysApi.queryRoleList().then(res => {
      if (res["retCode"]) {
        console.log(res.data);
        this.roleList = res.data;
      } else {
        console.error("数据查询错误");
      }
    });
  }

  mounted() {
    this.queryRoleList();
    this.queryList();
    console.log("页面加载");
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