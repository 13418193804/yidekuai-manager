<template>
  <div class="">

			<aside  :class="collapsed?'menu-collapsed':'menu-expanded'">
				<menu-component ref="menuCom"></menu-component>
			</aside>



    <div class="main ">

        	<div :class="ydkManager =='test'?'header1':'header'" >
			<!-- <el-col @click.prevent="doCollapse" :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col> -->
			<el-col :span="10">

        
 <!-- @click.prevent="doCollapse" -->
				<div class="tools">
					<i class="iconfont icon-caidan1 hamburger" :class="{'is-active':!collapsed}" style="    font-size: 25px;"></i>
				</div>

			</el-col>
      
			<el-col :span="4" class="userinfo" style="white-space: nowrap;">
      		<span >{{sysUserName}}</span>
				<el-dropdown trigger="hover">
          <img  class="el-dropdown-link userinfo-inner" src="../assets/menu/设置 (1).png" style="height:24px;width:24px;margin:0 10px;"/>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="updatepassword">修改密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</div>



			<section class="content-container">
					<el-col :span="24" class="content-wrapper" >
<div>{{getDateFun}} </div>
						<transition name="fade" mode="out-in">
							<router-view  @updateYdkPrescriptionStatusNum="updateYdkPrescriptionStatusNum"></router-view>
						</transition>
					</el-col>
			</section>
      </div>








  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Axios from "axios";
import moment from "moment";
import * as indexApi from "../api/indexApi";
import Breadcrumb from "../common/Breadcrumb/index.vue";
import MenuComponent from "./Menu.vue";

@Component({
  props: {},
  components: {
    "menu-component": MenuComponent,
    Breadcrumb
  }
})
export default class Home extends Vue {
  sysName = "医德快管理平台";
  collapsed = true;
  sysUserAvatar = "";
  sysUserName = sessionStorage.name;
  roleName = "";
  // sessionStorage.
  styleString = "230px";

  get userName(): string {
    return "admin";
  }

  get getDateFun() {
    return (
      "今天　" +
      moment(new Date()).format("YYYY/MM/DD") +
      "　星期" +
      "日一二三四五六".charAt(new Date().getDay())
    );
  }
  //退出登录
  logout() {
    this.$confirm("确认退出吗?", "提示", {
      //type: 'warning'
    })
      .then(() => {
        sessionStorage.clear();
        clearInterval((<any>this.$refs.menuCom).PrescriptionStatusNumtimer);
        // sessionStorage.removeItem("user");
        this.$router.replace("/login");
      })
      .catch(() => {});
  }
  updatepassword() {
    this.$router.push("/updatepassword");
  }
  //折叠导航栏
  doCollapse() {
    let dt: any = this.$refs["menuCom"];
    dt.doCollapse();
    this.collapsed = !this.collapsed;
  }

  getYdkPrescriptionStatusNum() {
    (<any>this.$refs.menuCom).getYdkPrescriptionStatusNum();
  }
  updateYdkPrescriptionStatusNum(blueSignal) {
    // NEW_PRESCRIPTION
    // NEW_ORDER
    indexApi
      .updateYdkPrescriptionStatusNum({ blueSignal: blueSignal })
      .then(res => {
        this.getYdkPrescriptionStatusNum();
      });
  }
  mounted() {
    console.info( this.$route.matched)
    var user = sessionStorage.getItem("user");
  }
}
</script>

<style scoped >
.container1 {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.header {
  height: 56px;
  line-height: 56px;
  background: #c30d23;
  color: #fff;
}

.header1 {
  height: 56px;
  line-height: 56px;
  background: #409eff;
  color: #fff;
}
.userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.userinfo-inner {
  cursor: pointer;
  color: #fff;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}

.logo {
  width: 230px;
  height: 60px;
  font-size: 22px;
  padding-left: 20px;
  padding-right: 20px;
  border-color: rgba(238, 241, 146, 0.3);
  border-right-width: 1px;
  border-right-style: solid;
}
img {
  width: 40px;
  float: left;
  margin: 10px 10px 10px 18px;
}
.txt {
  color: #fff;
}

.logo-width {
  width: 230px;
}
.logo-collapse-width {
  width: 60px;
}
.tools {
  padding: 0px 18px;
  width: 14px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}

.main {
  background: #f1f2f7;
  height: -webkit-fill-available;
  overflow: auto;
}
aside {
  float: left;
  height: -webkit-fill-available;
  flex: 0 0 230px;
  width: 230px;
  overflow-x: hidden;
  text-align: left;
}
.el-menu {
  height: 200%;
}
.expand {
  width: 220px;
}

.collapsed {
  width: 60px;
}
.item {
  position: relative;
}
.submenu {
  position: absolute;
  top: 0px;
  left: 60px;
  z-index: 99999;
  height: auto;
  display: none;
}

.menu-collapsed {
  flex: 0 0 60px;
  width: 60px;
}
.menu-expanded {
  flex: 0 0 230px;
  width: 230px;
}
.menu-expanded::-webkit-scrollbar {
  display: none;
}
.content-container {
  flex: 1;
  /* overflow-y: auto; */
  padding: 10px;
}
/* .content-container::-webkit-scrollbar {
  display: none;
} */
.breadcrumb-container {
}
.title {
  width: 200px;
  float: left;
  color: #475669;
}
.breadcrumb-inner {
  float: right;
}
.content-wrapper {
  background-color: #fff;
  min-height: 100%;
  margin-bottom: 10px;
  text-align: left;
  box-sizing: border-box;
  padding: 20px;
}
.hamburger {
	display: inline-block;
	cursor: pointer;
	transform: rotate(90deg);
	transition: .38s;
	transform-origin: 50% 50%;
}
.hamburger.is-active {
	transform: rotate(0deg);
}
</style>