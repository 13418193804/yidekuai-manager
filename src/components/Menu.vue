<template>
<div>

 <el-menu
      default-active="2"
       :style="styleString"
      :collapse="collapsed"
      router=“true” style="border-right: 1px solid #c30d23;"
      >
      <block v-for="menu in menuOption" :key="menu"  v-if="menu.position=='menu'">
      <block v-for="(item,index) in menu.children" :key="index" v-if="menu.menu_grade == 1&& dohavePermission(item.promissId)">
          <el-menu-item  :index="item.path" >
          <img :src="$route.path == item.path ?item.select_icon :item.icon " style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == item.path?handleSelectColor():'color:#fff'" v-if="!collapsed">{{item.name}}</span>
            </el-menu-item>
      </block>
<el-submenu :index="menu.path" v-if="menu.menu_grade ==2 && handlePromiss(menu)" :class="!collapsed?'':'iscollapsed'">
        <template slot="title">
          <img :src="handleSelectImage(menu)?menu.select_icon :menu.icon " style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="handleSelectImage(menu)?handleSelectColor():'color:#fff'" v-if="!collapsed" style="position: relative;"> {{menu.name}} 
        
             <div class="bluedot" v-if="(menu.path == '1' && NEW_ORDER>0) || (menu.path == '2' && NEW_PRESCRIPTION>0)"></div>
<!-- 
             NEW_ORDER
NEW_PRESCRIPTION -->
             <!-- 最新处方或订单的状态 -->
             </span>
        </template>
          <el-menu-item v-for="(items,indexs) in menu.children" :key="indexs" :index="items.path" v-if="dohavePermission(items.promissId)" >
            <span :style="$route.path == items.path?handleSelectColor():'color:#fff'" >{{items.name}}</span>
            </el-menu-item>
     </el-submenu>
      </block>
       </el-menu>
				<!--导航菜单-折叠后-->
    </div>
    
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as sysApi from "../api/sysApi";
import menu from "../router";
import * as indexApi from "../api/indexApi";
@Component
export default class Menu extends Vue {
  collapsed = false;
  sysUserAvatar = "";
  sysUserName = "";
  styleString = "230px";
  handleSelectColor() {
    return " color:#EA8D03";
  }
  handlePromiss({children}){
 return children.filter(item=>{
 return Vue.prototype.dohavePermission(item.promissId)
}).length>0
  }
  handleSelectImage(item) {
  return   item.children.filter((items, index) => {
      return items.path == this.$route.path;
    }).length>0
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

  menuOption = [];

  roleId = "";
  mounted() {


    this.menuOption = menu["options"].routes;
    this.roleId = sessionStorage.roleId;
    if (
      Vue.prototype.PermissionList.length == 0 &&
      (sessionStorage.roleId || "") !== ""
    ) {
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
            if (!res["islogin"]) {
              this.$alert(res["message"]);
            }
            console.error("数据查询错误");
          }
        });
    }


//这里有处方或者订单权限时候再查

   this.getYdkPrescriptionStatusNum()

  //  setInterval(() => {
  //  this.getYdkPrescriptionStatusNum()
  //   }, 5000);

  }
  NEW_ORDER = 0
NEW_PRESCRIPTION = 0
getYdkPrescriptionStatusNum(){
      indexApi
          .getYdkPrescriptionStatusNum({})
          .then(res => {
            if (res["retCode"]) {
             this.NEW_ORDER = res.data.NEW_ORDER
             this.NEW_PRESCRIPTION  = res.data.NEW_PRESCRIPTION
            }
          });
}
}
</script>
<style>


.iscollapsed .el-submenu__icon-arrow{
  display:none
}
.bluedot{
  width:8px; height:8px;background-color:#409EFF;
      position: absolute;z-index:999;border-radius: 50%;
      right: -30px;top:5px;

}
</style>