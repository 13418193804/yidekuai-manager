<template>
    <div>
    <h3 class="title" align="left" style="margin:20px;">提现管理</h3>

<!-- status -->

<div style="width:100%;background-color:#f7f7f7;padding:20px;display:flex;">
   
     <div  style="margin-right:20px;">
       <el-select v-model="status">
         <el-option  value="" label="全部"></el-option>
         <el-option  value="APPLY" label="未处理"></el-option>
         <el-option  value="ACCEPT" label="已提"></el-option>
         <el-option  value="REFUSE" label="拒绝"></el-option>
       </el-select>
    </div>

 <div  style="margin-right:20px;">
       <el-button @click="queryList(true)"></el-button>
    </div>


</div>


     <el-table border
    ref="multipleTable"
    :data="recordList"
    tooltip-effect="dark"
    >
   
    <el-table-column  fixed="left"
      label="昵称" header-align="center">
      <template slot-scope="scope">{{ scope.row.nickName }}</template>
    </el-table-column>
       <el-table-column
      label="昵称" header-align="center">
      <template slot-scope="scope">
        	<img :src="scope.row.userIcon" style="width:80px;height:80px;">
      </template>
    </el-table-column>

    <el-table-column
      label="手机" header-align="center" width="200">
      <template slot-scope="scope">{{ scope.row.mobile }}</template>
    </el-table-column>

     <el-table-column
      label="金额" header-align="center">
      <template slot-scope="scope">{{ scope.row.amount }}</template>
    </el-table-column>
    <el-table-column
      label="状态" header-align="center">
      <template slot-scope="scope" >
        <span :style="scope.row.status == 'ACCEPT'?'':'color:red'">{{formatStatus(scope.row.status)  }}</span>
      </template>
    </el-table-column>

    <el-table-column header-align="center"
      prop="createTime"
      label="提交时间"
      width="200">
    </el-table-column>
   

	<el-table-column label="操作"  header-align="center" v-if="dohavePermission('提现审核')">
				<template slot-scope="scope">
						<el-button size="mini" type="info" @click="doAccpset( [scope.row.id])" plain >处理</el-button>
				</template>
			</el-table-column>



  </el-table>





<el-col :span="24" class="toolbar">

			<el-pagination layout="prev, pager, next" :current-page="page+1" :page-size="pageSize" :total="24" @current-change="onPageChange">
			</el-pagination>
		</el-col>



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
  recordList = [];
  recordIds = [];
  pageSize = 10;
  total = 0;
  currentPage = 0;
  formatStatus(status){
    switch(status){
      case 'APPLY':
      return '未处理';
         case 'ACCEPT':
      return '已提';
         case 'REFUSE':
      return '拒绝';
      default : 
      return '';
    }
  }
  onPageChange(currentPage: number) {
  
    this.currentPage = currentPage-1;
    this.queryList();
  }
  doAccpset(recordIds) {
    this.$confirm("确认受理？", "提示", {
      confirmButtonText: "同意提现",
      cancelButtonText: "拒绝提现",
      type: "warning",
        center: true
    })
      .then(() => {
        UserApi.doAccpset(recordIds.join(","),'ACCEPT').then(res => {
          if (res["retCode"]) {
            this.$message("处理成功");
            this.queryList();
          } else {
            console.error("数据错误");
          }
        });
      })
      .catch(e => {
        console.log(e);

 UserApi.doAccpset(recordIds.join(","),'REFUSE').then(res => {
          if (res["retCode"]) {
            this.$message("已拒绝");
            this.queryList();
          } else {
            console.error("数据错误");
          }
        });


      });




  }
  status=''
  queryList(filter=null) {
    if(filter){
      this.currentPage = 0
    }
    UserApi.getRecordList(this.currentPage,this.status).then(res => {
      if (res["retCode"]) {

        console.log(res.data.page.total)
        this.total = res.data.page.total;
        this.recordList = res.data.recordList;
      } else {
        console.error("数据错误");
      }
    });
    console.log("列表");
  }

  mounted() {
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