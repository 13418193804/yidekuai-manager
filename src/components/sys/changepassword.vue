<template>
    <div>
       <h4> 修改密码</h4>
            <el-form ref="form"  label-width="100px" style="width: -webkit-fill-available;padding: 20px;min-width: 600px;text-align: initial;" size="small">
  <el-form-item label="新密码">
                    <el-input v-model="password" type="password" style="width:400px;"></el-input>
                </el-form-item>
  <el-form-item label="确认密码">
                    <el-input v-model="newpassword" type="password" style="width:400px;"></el-input>
                </el-form-item>


                <div class="submit">
  <el-button type="primary" @click="submit()">提交</el-button>
</div>
            </el-form>

    </div>

 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as sysApi from "../../api/sysApi";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  password = "";
  newpassword = "";

  submit() {
    if((this.password || "") == "" ){
      this.$message("密码不可为空");
      return 
    }
    if (this.newpassword != this.password) {
      this.$message("两次输入密码不一致");
      return;
    }

    sysApi
      .updateUser({
        loginName: sessionStorage.loginName,
        password: this.password
      })
      .then(res => {
        if (res["retCode"]) {
          this.$message("修改成功，请重新登录");
          this.$router.replace("/login");
        } else {

                    if(!res['islogin']){this.$alert(res["message"]);}

          console.error("数据查询错误");
        }
      });
    console.log("查询列表");
  }
  mounted() {
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
.submit {
  text-align: left;
  padding: 10px;
  border-top: 1px #e5e5e5 solid;
}
</style>