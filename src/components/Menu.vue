<template>
<div>

 <el-menu
      default-active="2"
       :style="styleString"
      :collapse="collapsed"
      :router="true" style="border-right: 1px solid #c30d23;min-height: 100vh;"
      >
      <div v-for="menu in menuOption" :key="menu.name"  v-if="menu.position=='menu'">
      <div v-for="(item,index) in menu.children" :key="item.name" v-if="(menu.menu_grade == 1 && dohavePermission(item.promissId)) || item.path == '/'">
          <el-menu-item  :index="item.path" >
          <img :src="$route.path == item.path ?item.select_icon :item.icon " style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="$route.path == item.path?handleSelectColor():'color:#fff'" v-if="!collapsed" style="position: relative;">{{item.name}}
             <div class="bluedot"  v-if="handlebluedot(item.path)" ></div>
           </span>
            </el-menu-item>
      </div>
<el-submenu :index="menu.path" v-if="menu.menu_grade ==2 && handlePromiss(menu)" :class="!collapsed?'':'iscollapsed'">
        <template slot="title">
          <img :src="handleSelectImage(menu)?menu.select_icon :menu.icon " style="height:24px;width:24px;margin-right:5px;"/>
           <span :style="handleSelectImage(menu)?handleSelectColor():'color:#fff'" v-if="!collapsed" style="position: relative;"> {{menu.name}} 
        
             <div class="bluedot"  v-if="(menu.path == '1' &&NEW_PRESCRIPTION >0) || (menu.path == '2' && NEW_ORDER>0)" ></div>

             </span>
        </template>
          <el-menu-item v-for="(items,indexs) in menu.children" :key="items.name"  :index="items.path" v-if="dohavePermission(items.promissId)" >
            <span :style="$route.path == items.path?handleSelectColor():'color:#fff'" style="position: relative;">{{items.name}}
             <div class="bluedot" v-if="handlebluedot(items.path)"   ></div>
            </span>
            
            </el-menu-item>
     </el-submenu>
      </div>
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
  collapsed = true;
  sysUserAvatar = "";
  sysUserName = "";
  styleString = "230px";
  handleSelectColor() {
    return " color:#EA8D03";
  }
  handlePromiss({ children }) {
    return (
      children.filter(item => {
        return Vue.prototype.dohavePermission(item.promissId);
      }).length > 0
    );
  }
  handleSelectImage(item) {
    return (
      item.children.filter((items, index) => {
        return items.path == this.$route.path;
      }).length > 0
    );
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

  menuOption = [];

  roleId = "";
  mounted() {
    // console.log(common);
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

    this.getYdkPrescriptionStatusNum();

    this.PrescriptionStatusNumtimer = setInterval(() => {
      this.getYdkPrescriptionStatusNum();
    }, 60000);
  }

  PrescriptionStatusNumtimer: any = {};
  handlebluedot(path) {
    if (this.UnauditedDoctorNum > 0 && path === "/doctor") {
      return true;
    }

    if (
      this.NotTranslatedOrRejectAuditPrescription > 0 &&
      path === "/transmit"
    ) {
      return true;
    }

    if (this.AlreadyTranslatedPrescription > 0 && path === "/audit") {
      return true;
    }

    if (this.RedReminder > 0 && path === "/reminder") {
      return true;
    }

    if (this.OrderWaitSendgoodsOrUnfinished > 0 && path === "/afterorder") {
      return true;
    }

    if (this.DoctorNotAnswerNum > 0 && path === "/online") {
      return true;
    }

    return false;
  }

  NEW_ORDER = 0;
  NEW_PRESCRIPTION = 0;
  UnauditedDoctorNum = 0;
  NotTranslatedOrRejectAuditPrescription = 0;
  AlreadyTranslatedPrescription = 0;
  RedReminder = 0;
  OrderWaitSendgoodsOrUnfinished = 0;
  DoctorNotAnswerNum = 0;
  // 小蓝点
  // UnauditedDoctorNum 医生管理
  // NEW_PRESCRIPTION 处方管理
  // NotTranslatedOrRejectAuditPrescription 转方管理
  // AlreadyTranslatedPrescription 审方管理
  // NEW_ORDER 订单管理
  // RedReminder 待催单
  // OrderWaitSendgoodsOrUnfinished 待发货
  // DoctorNotAnswerNum 在线咨询管理
  getYdkPrescriptionStatusNum() {
    indexApi.getYdkPrescriptionStatusNum({}).then(res => {
      if (res["retCode"]) {
        // console.log(JSON.stringify(res.data))

        this.NEW_ORDER = res.data.NEW_ORDER;
        this.NEW_PRESCRIPTION = res.data.NEW_PRESCRIPTION;
        this.UnauditedDoctorNum = res.data.UnauditedDoctorNum;
        this.NotTranslatedOrRejectAuditPrescription =
          res.data.NotTranslatedOrRejectAuditPrescription;
        this.AlreadyTranslatedPrescription =
          res.data.AlreadyTranslatedPrescription;
        this.RedReminder = res.data.RedReminder;
        this.OrderWaitSendgoodsOrUnfinished =
          res.data.OrderWaitSendgoodsOrUnfinished;
        this.DoctorNotAnswerNum = res.data.DoctorNotAnswerNum;
      }
    });
  }
}
</script>
<style>
.iscollapsed .el-submenu__icon-arrow {
  display: none;
}
.bluedot {
  width: 8px;
  height: 8px;
  background-color: #409eff;
  position: absolute;
  z-index: 999;
  border-radius: 50%;
  right: -30px;
  top: 5px;
}
</style>