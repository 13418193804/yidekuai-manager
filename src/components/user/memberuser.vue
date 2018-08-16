<template>
    <div>
    <h3 class="title">会员列表</h3>
        

        <!-- userList -->
        	<el-table border:data="userList"  style="width: 120%;margin:20px;">
	
			<el-table-column  fixed="left" header-align="center" align="center" prop="loginName" label="账号" width="120" sortable>
			</el-table-column>
      
      	<el-table-column header-align="center" align="center" label="头像" width="120">
				<template slot-scope="scope">
					<img v-if="scope.row.userIcon" :src="scope.row.userIcon" style="width:80px;height:80px;"  @click="viewBigIcon(scope.row.userIcon)">
					<img v-else src="../../assets/userIcon.png" style="width:80px;height:80px;"  @click="viewBigIcon(scope.row.userIcon)">
				</template>
			</el-table-column>
      		<el-table-column header-align="center" align="center" prop="nickName" label="昵称" width="120" sortable>
			</el-table-column>


 	<el-table-column header-align="center" align="center" label="二维码" width="120">
				<template slot-scope="scope">
					<img :src="scope.row.qrCode" style="width:80px;height:80px;"  @click="viewBigIcon(scope.row.qrCode)">
				</template>
			</el-table-column>
                

			<el-table-column header-align="center" align="center" prop="createTime" label="注册时间" width="180" sortable>
			</el-table-column>


	<el-table-column header-align="center" align="center" label="操作" width="380">
				<template slot-scope="scope">
					<el-button  @click="detail(scope.row)">详情</el-button>
        </template>
			</el-table-column>


		</el-table>
        

        	<el-col :span="24" class="toolbar">

			<el-pagination layout="prev, pager, next" :current-page="page+1" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>

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

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  userList = [];
  bigIcon = "";
  viewBig = false;
  pageSize = 20;
  total = 100;
  currentPage = 0;
  viewBigIcon(url) {
    this.bigIcon = url;
    this.viewBig = true;
  }
  detail(row) {
    sessionStorage.member = JSON.stringify(row);

    this.$router.push({ name: "会员详情", params: row });
  }
  queryUserList() {
    UserApi.queryUserList(this.currentPage).then(res => {
      if (res["retCode"]) {
        this.userList = res.data.userList;
        this.total = res.data.page.total;
      } else {
        console.error("数据查询错误");
      }
    });
  }
  onPageChange(page) {
    this.currentPage = page - 1;

    this.queryUserList();
  }
  mounted() {
    this.queryUserList();
    console.log();
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