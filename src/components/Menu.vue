<template>
<div>

 <el-menu
      default-active="2"
       :style="styleString"
      :collapse="collapsed"
      router=“true” style="border-right: 1px solid #c30d23;"
      >
      

     
          <el-menu-item index="/" >
          <img v-if="$route.path == '/'" src="../assets/menu/首页 (1).png" style="height:24px;width:24px;margin-right:5px;"/>
          <img v-else src="../assets/menu/首页.png" style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == '/'?handleSelectColor():'color:#fff'"> 主页</span>
            </el-menu-item>

<el-menu-item index="/hospital" v-if="dohavePermission('PER3ca7dae514ae42e9b37658ee48ef9165')">
          <img v-if="$route.path == '/hospital'" src="../assets/menu/医院.png" style="height:24px;width:24px;margin-right:5px;"/>
          <img v-else src="../assets/menu/商店.png" style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == '/hospital'?handleSelectColor():'color:#fff'"> 医院管理</span>
            </el-menu-item>
            
<el-menu-item index="/department" v-if="dohavePermission('PERc351e16134a645c0a4ef1ca0f2aab418')">
  <img v-if="$route.path == '/department'" src="../assets/menu/科室.png" style="height:24px;width:24px;margin-right:5px;"/>
          <img v-else src="../assets/menu/全科.png" style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == '/department'?handleSelectColor():'color:#fff'"> 科室管理</span>
            </el-menu-item>


<el-menu-item index="/doctor" v-if="dohavePermission('PER713760ecaf194ac7928b703eda25a119')">
         <img v-if="$route.path == '/doctor'" src="../assets/menu/医生 (1).png" style="height:24px;width:24px;margin-right:5px;"/>
          <img v-else src="../assets/menu/医生 (2).png" style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == '/doctor'?handleSelectColor():'color:#fff'"> 医生管理</span>
            </el-menu-item>

<el-menu-item index="/patient" v-if="dohavePermission('PER3ffb4a78d039460ba2e5637c6bfbfea7')">
       <img v-if="$route.path == '/patient'" src="../assets/menu/患者.png" style="height:24px;width:24px;margin-right:5px;"/>
          <img v-else src="../assets/menu/我的.png" style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == '/patient'?handleSelectColor():'color:#fff'"> 患者管理</span>
            </el-menu-item>





      <el-submenu index="1"  v-if="dohavePermission('PER71e6d509dd0c42a39603c381fd855f33') || dohavePermission('PER7bc70b8eb9fe496f876ba8ee7c5ec841')">
        <template slot="title">
          <img v-if="$route.path == '/transmit'||$route.path == '/audit'" src="../assets/menu/处方.png" style="height:24px;width:24px;margin-right:5px;"/>
          <img v-else src="../assets/menu/处方2.png" style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == '/transmit'||$route.path == '/audit'?handleSelectColor():'color:#fff'"> 处方管理</span>
        </template>

          <el-menu-item index="/transmit" v-if="dohavePermission('PER71e6d509dd0c42a39603c381fd855f33')">
            <span :style="$route.path == '/transmit'?handleSelectColor():'color:#fff'"> 转方管理</span>
            </el-menu-item>
          <el-menu-item index="/audit" v-if="dohavePermission('PER7bc70b8eb9fe496f876ba8ee7c5ec841')">
            <span :style="$route.path == '/audit'?handleSelectColor():'color:#fff'">审方管理</span>
          </el-menu-item>
     </el-submenu>
     

      <el-submenu index="3"  v-if="dohavePermission('PER79bc93beb8a44e8bb3c82d1a1a4771f6') || dohavePermission('PERe9d8deb13d6641d4aeaf062588e28412')">
        <template slot="title" >
          <img v-if="$route.path == '/reminder'||$route.path == '/afterorder'" src="../assets/menu/订单 (1).png" style="height:24px;width:24px;margin-right:5px;"/>
          <img v-else src="../assets/menu/订单.png" style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == '/reminder'||$route.path == '/afterorder'?handleSelectColor():'color:#fff'"> 订单管理</span>
        </template>
          <el-menu-item index="/reminder"  v-if="dohavePermission('PER79bc93beb8a44e8bb3c82d1a1a4771f6')">
            <span :style="$route.path == '/reminder'?handleSelectColor():'color:#fff'"> 催单客服</span>
            </el-menu-item>
          <el-menu-item index="/afterorder" v-if="dohavePermission('PERe9d8deb13d6641d4aeaf062588e28412')">
            <span :style="$route.path == '/afterorder'?handleSelectColor():'color:#fff'">售后客服</span>
          </el-menu-item>
     </el-submenu>

 <el-submenu index="10"  v-if="dohavePermission('PERe23db0fb4a70444389e26ce3dc899da6') || dohavePermission('PERd710cce272da4a8c8c39aabcfa635e60')|| dohavePermission('PER2d8b2d474b274da4b7c0a4d8d4a23b5c')">
        <template slot="title">
          <img v-if="$route.path == '/consultant'||$route.path == '/adviserdrug'||$route.path == '/doctordata'" src="../assets/menu/处方.png" style="height:24px;width:24px;margin-right:5px;"/>
          <img v-else src="../assets/menu/处方2.png" style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == '/consultant'||$route.path == '/adviserdrug'||$route.path == '/doctordata'?handleSelectColor():'color:#fff'">顾问管理</span>
        </template>

          <el-menu-item index="/consultant"  v-if="dohavePermission('PERe23db0fb4a70444389e26ce3dc899da6')">
            <span :style="$route.path == '/consultant'?handleSelectColor():'color:#fff'">顾问数据</span>
            </el-menu-item>
          <el-menu-item index="/adviserdrug" v-if="dohavePermission('PERd710cce272da4a8c8c39aabcfa635e60')">
            <span :style="$route.path == '/adviserdrug'?handleSelectColor():'color:#fff'">药品数据</span>
          </el-menu-item>
                 <el-menu-item index="/doctordata"  v-if="dohavePermission('PER2d8b2d474b274da4b7c0a4d8d4a23b5c')">
            <span :style="$route.path == '/doctordata'?handleSelectColor():'color:#fff'">医生数据</span>
          </el-menu-item>
     </el-submenu>


  <el-submenu index="2" v-if="dohavePermission('00')">
        <template slot="title">
  <img v-if="$route.path == '/department1'||$route.path == '/role'||$route.path == '/user'" src="../assets/menu/账户.png" style="height:24px;width:24px;margin-right:5px;"/>
          <img v-else src="../assets/menu/账户 (2).png" style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == '/department1'||$route.path == '/role'||$route.path == '/user'?handleSelectColor():'color:#fff'"> 账户管理</span>
        </template>
        
             <!-- <el-menu-item index="/system">
             <span >权限</span>
             </el-menu-item> -->

             
          <el-menu-item index="/department1">
             <span :style="$route.path == '/department1'?handleSelectColor():'color:#fff'">部门管理</span>
             </el-menu-item>

          <el-menu-item index="/role">
             <span :style="$route.path == '/role'?handleSelectColor():'color:#fff'">职位管理</span>
          </el-menu-item>
          <el-menu-item index="/user">
             <span :style="$route.path == '/user'?handleSelectColor():'color:#fff'">用户管理</span>
          </el-menu-item>
     </el-submenu>
     





<el-menu-item index="/drug" v-if="dohavePermission('PERecc2af8eb68a48fcb68bbc782bab1554')">
       <img v-if="$route.path == '/drug'" src="../assets/menu/药丸.png" style="height:24px;width:24px;margin-right:5px;"/>
          <img v-else src="../assets/menu/药丸 (1).png" style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == '/drug'?handleSelectColor():'color:#fff'"> 药品库管理</span>
            </el-menu-item>



<el-menu-item index="/online" v-if="dohavePermission('PER296d2b20d79c4601bad1408e09f687b6')">
         <img v-if="$route.path == '/online'" src="../assets/menu/咨询.png" style="height:24px;width:24px;margin-right:5px;"/>
          <img v-else src="../assets/menu/询问 (1).png" style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == '/online'?handleSelectColor():'color:#fff'"> 在线咨询管理</span>
            </el-menu-item>
         

       </el-menu>


				<!--导航菜单-折叠后-->
    </div>
    
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as sysApi from "../api/sysApi";

@Component
export default class Menu extends Vue {
  collapsed = false;
  sysUserAvatar = "";
  sysUserName = "";
  styleString = "230px";
handleSelectColor(){


    return ' color:#EA8D03'
}
  //退出登录
  logout() {
    this.$confirm("确认退出吗?", "提示", {
      //type: 'warning'
    })
      .then(() => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("merchantUserId");
        sessionStorage.removeItem("loginName");
        sessionStorage.removeItem("user");
        this.$router.push("/login");
      })
      .catch(() => {});
  }

  doCollapse() {
    console.log("do close...");
    this.collapsed = !this.collapsed;
  }

  doMe() {
    console.log("me");
    console.log(this.$refs.menuExpand);
  }
  onSubmit() {
    console.log("submit!");
  }


  
  roleId ='';
  mounted() {

   this.roleId = sessionStorage.roleId
    
console.log(' Vue.prototype.PermissionList',Vue.prototype.PermissionList )
if(Vue.prototype.PermissionList.length==0&& (sessionStorage.roleId || "") !== ""){

      sysApi
        .queryPermissionIds({
          roleId: sessionStorage.roleId
        })
        .then(res => {
          if (res["retCode"]) {
            Vue.prototype.PermissionList = [];
            res.data.forEach((item, index) => {
              Vue.prototype.PermissionList.push(item.permissionId);
            });
            sessionStorage.PermissionList = Vue.prototype.PermissionList.join(
              ","
            );
          
          } else {
            if(!res['islogin']){this.$alert(res["message"]);}
            console.error("数据查询错误");
          }
        });
}


  }
}
</script>



