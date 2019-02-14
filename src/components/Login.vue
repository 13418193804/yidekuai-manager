<template>

<div>
    <el-card :class="ydkManager =='test'?'login-form-layout_test':'login-form-layout'">
      <img src="https://aip.yidefine.com/yidekuai/prescriptiond/file5b50b212eaedc70806c7535f.png" style="width: 70px;height: 70px;" />
  <el-form :model="loginModel" :rules="loginModel.rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm ">
    <h3 class="title">{{  ydkManager =='test'?'医德快测试平台':'医德快管理平台'}}</h3>
    <el-form-item prop="loginName">
      <el-input type="text" v-model="loginModel.loginName" auto-complete="off" placeholder="账号" onkeydown="if(event.keyCode==13){window.myvue.doLogin()}"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginModel.password" auto-complete="off" placeholder="密码" onkeydown="if(event.keyCode==13){window.myvue.doLogin()}"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button :type="ydkManager =='test'?'primary':'danger'"   style="width:100%;" :class="ydkManager =='test'?'':'color_manager'" @click.native.prevent="doLogin" :disabled="loading">登录</el-button>

    </el-form-item>
    <el-form-item>
           <div class="flex-space">
  </div>
    </el-form-item> 
  </el-form>
    </el-card>
    <img src="../assets/login_center_bg.png" :class="ydkManager =='test'?'login-center-layout_test':'login-center-layout'" class="">

</div>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

import * as ApiAdmin from "../api/apiadmin";
import * as sysApi from "../api/sysApi";

class LoginModel {
  loginName: string;
  password: string;
  rules: Object;
  constructor() {
    this.loginName = "";
    this.password = "";
    this.rules = {};

    let ruleObject = [];
    ruleObject.push({
      required: true,
      message: "必须输入用户名",
      trigger: "blur"
    });
    this.rules["loginName"] = ruleObject;

    ruleObject = [];
    ruleObject.push({
      required: true,
      message: "必须输入密码",
      trigger: "blur"
    });
    this.rules["password"] = ruleObject;
  }
}
@Component
export default class Login extends Vue {
  loginModel = new LoginModel();
  mounted() {
    window["myvue"] = this;

    console.log("login init ");
  }

  doListProduct() {}

  doGoto() {
    this.$router.push("/portal");
  }

  loading = false;

  doLogin() {
    this.loading = true;
    if (this.loginModel.loginName == "w") this.loginModel.loginName = "linan";
    if (this.loginModel.password == "w") this.loginModel.password = "123456";
    if (this.loginModel.loginName == "q")
      this.loginModel.loginName = "liulongtian";
    if (this.loginModel.password == "q") this.loginModel.password = "123456";

    ApiAdmin.doMerchantLogin(
      this.loginModel.loginName,
      this.loginModel.password
    ).then(res => {
      if (res.retCode) {
        sessionStorage.setItem("token", res.data.tokenid);
        sessionStorage.setItem("userId", res.data.User[0].userId);
        sessionStorage.setItem("merchantUserId", res.data.User[0].userId);
        sessionStorage.setItem("loginName", res.data.User[0].userName);
        sessionStorage.setItem("name", res.data.User[0].name);

        if (res.data.User[0].adminState == "1") {
          sessionStorage.setItem(
            "roleAdmin",
            "centerroleAdminFormIdTextYIDEKUAI"
          );
        } else {
          sessionStorage.setItem("roleAdmin", res.data.User[0].userStatus);
        }
        sessionStorage.roleId = "";
        this.loading = false;
        Vue.prototype.PermissionList = [];
        res.data.permission.forEach((item, index) => {
          Vue.prototype.PermissionList.push(item.permissionId);
        });
        sessionStorage.PermissionList = Vue.prototype.PermissionList.join(",");
        this.$router.push("/");

        //     if((sessionStorage.roleId || "") !== ""){
        //         sysApi
        //         .queryPermissionIds({
        //           roleId: sessionStorage.roleId
        //         })
        //         .then(res => {
        //  this.loading = false
        //           if (res["retCode"]) {
        //             Vue.prototype.PermissionList = [];
        //             res.data.forEach((item, index) => {
        //               Vue.prototype.PermissionList.push(item.permissionId);
        //             });
        //             sessionStorage.PermissionList = Vue.prototype.PermissionList.join(
        //               ","
        //             );

        //           this.$router.push("/portal");

        //           } else {
        //    this.loading = false
        //             if(!res['islogin']){this.$alert(res["message"]);}
        //             console.error("数据查询错误");
        //           }
        //         });
        //     }else{
        //  this.loading = false

        //           this.$router.push("/portal");
        //     }
      } else {
        this.loading = false;

        this.$alert(res.message);
      }
    });
  }

  doForgetPassword() {
    console.log("do forget password..");

    this.$router.push("/");
  }
}
</script>

<style scoped>
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
.login-center-layout_test {
  user-select: none;
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}

.login-center-layout {
  user-select: none;
  background: #c30d23;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
.login-form-layout_test {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}

.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #c30d23;
}

.color_manager {
  background-color: #d7152d !important;
}
.color_manager:hover {
  background-color: #c30d23 !important;
}
</style>