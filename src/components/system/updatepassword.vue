<template>
    <div v-loading="loading">

        <div style="border-bottom:1px #e5e5e5 solid;">
          <h3>修改密码
          </h3>
    </div>
<div style="margin-top:20px;">
 <el-form label-width="100px"  >
  <el-form-item  label="原密码：" >
					<el-input  style="max-width:400px;min-width:200px;" type="password" v-model="form.userPassword"></el-input>
				</el-form-item>
                  <el-form-item  label="新密码：" >
					<el-input  style="max-width:400px;min-width:200px;" type="password" v-model="form.newPassword"></el-input>
				</el-form-item>
                  <el-form-item  label="确认密码：">
					<el-input  style="max-width:400px;min-width:200px;"  type="password" v-model="form.renewPassword"></el-input>
				</el-form-item>
</el-form>
<div style="border-top:1px #e5e5e5 solid;     padding-top: 20px;
    padding-left: 20px;">
      <el-button
          size="small"
          type="primary" @click="doSubmit">保存</el-button>
</div>
</div>
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


    form={
        userPassword:'',
        newPassword:'',
        renewPassword:''
    }
loading =false
    doSubmit(){
        if((this.form.userPassword ||'')==''){
            this.$alert('请输入原密码');
            return
        }

     if((this.form.userPassword ||'')==''){
            this.$alert('请输入新密码');
            return
        }
     if(this.form.newPassword !==this.form.renewPassword ){
            this.$alert('两次输入的新密码不一致');
            return
        }

    this.loading = true
Object.assign(this.form,{userName:sessionStorage.loginName})
    indexApi.updatePassword(this.form).then(res => {
      if (res["retCode"]) {
   this.loading = false
        this.$message("保存成功,请重新登录")
        sessionStorage.clear()
           this.$router.replace("/login");
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });

    }


  mounted() {



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