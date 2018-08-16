<template>
    <div style="    text-align: initial;padding: 20px;">
    <h3 class="title">会员详情</h3>

<div>




<div style="    padding:5px;display: flex; align-items: center;">
<span class="el-form-item__label" style="width:120px;">用户名：</span>
    <span class="el-form-item__content"> 
{{userInfo.nickName}}
    </span>
</div>



<div style="    padding:5px;display: flex; align-items: center;">
<span class="el-form-item__label" style="width:120px;">用户头像：</span>
    <span class="el-form-item__content"> 
<img v-if="userInfo.userIcon" :src="userInfo.userIcon" style="width:80px;height:80px;"  @click="viewBigIcon(userInfo.userIcon)">
 					<img v-else src="../../assets/userIcon.png" style="width:80px;height:80px;"  @click="viewBigIcon(scope.row.userIcon)">

    </span>
</div>


<div style="    padding:5px;display: flex; align-items: center;">
<span class="el-form-item__label" style="width:120px;">二维码：</span>
<img :src="userInfo.qrCode" style="width:80px;height:80px;"  @click="viewBigIcon(userInfo.qrCode)">
</div>



<div style="    padding:5px;display: flex; align-items: center;">
<span class="el-form-item__label" style="width:120px;">手机号码：</span>
    <span class="el-form-item__content"> 
{{userInfo.loginName}}
    </span>
</div>




<div style="    padding:5px;display: flex; align-items: center;">
<span class="el-form-item__label" style="width:120px;">创建时间：</span>
    <span class="el-form-item__content"> 
{{userInfo.createTime}}
    </span>
</div>


<div style="    padding:5px;display: flex; align-items: center;">
<span class="el-form-item__label" style="width:120px;">更新时间：</span>
    <span class="el-form-item__content"> 
{{userInfo.updateTime}}
    </span>
</div>

</div>


<div >
    <h3>地址信息</h3>
   
        <el-table
    :data="addressList"
    style="width: 100%"
    height="250">
   
    <el-table-column  header-align="center" align="center"
      fixed
      label="联系人"
      width="120">
      		<template slot-scope="scope">
					<span>
                        {{scope.row.contactname}}
                    </span>
				</template>
    </el-table-column>
    <el-table-column  header-align="center" align="center"
      fixed
      label="联系号码"
      width="150">
      		<template slot-scope="scope">
					<span>
                        {{scope.row.contactmobile}}
                    </span>
				</template>
    </el-table-column>
     <el-table-column  header-align="center" align="center"
      fixed
      label="是否默认"
      width="80">
      		<template slot-scope="scope">
					<span>
                        {{scope.row.isdefault?'是':'否'}}
                    </span>
				</template>
    </el-table-column>
        <el-table-column  header-align="center" align="center"
      label="地址"
      width="320">
      	<template slot-scope="scope">
				{{scope.row.province}}{{scope.row.city}}{{scope.row.country}}{{scope.row.address}}
				</template>
    </el-table-column>
  </el-table>    
	
</div>



 <div>  
      <h3>收藏信息</h3>

  
        <el-table
    :data="goodsList"
    style="width: 100%"
    height="250">
   <el-table-column  header-align="center" align="center" prop="goodsId" label="产品id" width="100">
    </el-table-column>
    	<el-table-column  header-align="center" align="center" prop="logo_url" label="商品图片" width="120">
				<template slot-scope="scope">
					<img :src="getImageUrl(scope.row.goodsImg)" style="width:80px;height:80px;">
				</template>
			</el-table-column>
    <el-table-column  header-align="center" align="center" prop="goodsName" label="产品名称" width="180">
    </el-table-column>
    <!-- <el-table-column  header-align="center" align="center" prop="goodsCode" label="商品编号" width="120">
    </el-table-column> -->

    <el-table-column  header-align="center" align="center" prop="marketPrice" label="销售价格" >
    </el-table-column>
  <el-table-column  header-align="center" align="center"  label="状态" >
    
    
				<template slot-scope="scope">
			{{scope.row.onlineStatus?'上架':'下架'}}
				</template>
    </el-table-column>
    <el-table-column  header-align="center" align="center" prop="createTime" label="创建时间">
    </el-table-column>
  </el-table>    

		<el-col :span="24" class="toolbar">

			<el-pagination layout="prev, pager, next" :current-page="page+1" :page-size="pageSize" :total="favtotal" @current-change="onfavPageChange">
			</el-pagination>
		</el-col>
</div>


     <el-dialog  :visible.sync="viewBig" width="400px">
      <img :src="bigIcon" style="width:400px;height:400px;margin:-55px -20px -40px" >
    </el-dialog>


    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as UserApi from "../../api/UserApi";
class addressList {}
@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  userInfo = {
    token: "",
    userId: ""
  };
  addressList = [];
  goodsList = [];
  favPage = 0;
  favtotal = 0;
  pageSize = 20;
  bigIcon = "";
  viewBig = false;
  onfavPageChange(page) {
    this.favPage = page - 1;
    this.queryFav();
  }
  getImageUrl(url: string) {
    if (url == null) {
      return "";
    }
    let arrayUrl = url.split(",");
    if (arrayUrl.length > 0) {
      return arrayUrl[0];
    }

    return url;
  }
  queryUserAddress() {
    UserApi.queryUserAddress({
      token: this.userInfo.token,
      userId: this.userInfo.userId
    }).then(res => {
      if (res["retCode"]) {
        this.addressList = res.data.addressList;
        console.log(res);
      } else {
        console.error("数据查询错误");
      }
    });
  }
  queryFav() {
    UserApi.queryFav({
      token: this.userInfo.token,
      userId: this.userInfo.userId,
      page: this.favPage,
      pageSize: 20
    }).then(res => {
      if (res["retCode"]) {
        console.log("收藏", res);
        this.favtotal = res.data.page.total;
        this.goodsList = res.data.goodsList;
      } else {
        console.error("数据查询错误");
      }
    });
  }
  viewBigIcon(url) {
    this.bigIcon = url;
    this.viewBig = true;
  }
  mounted() {
    if ((sessionStorage.member || "") != "") {
      this.userInfo = JSON.parse(sessionStorage.member);
      console.log(this.userInfo);
    } else {
      this.$alert("找不到该会员");
      this.$router.go(-1);
      return;
    }
    this.userInfo.token = this.userInfo.token;
    this.userInfo.userId = this.userInfo.userId;

    this.queryUserAddress();
    this.queryFav();
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

<style  >
</style>