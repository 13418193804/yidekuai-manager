<template>
    <div>
    <h3 class="title" align="left" style="margin:20px;">意见反馈</h3>
  

<div style="width:100%;background-color:#f7f7f7;padding:20px;display:flex;">
    <div style="margin-right:20px;">
      <el-input v-model="keyword" placeholder="输入账号"></el-input>
    </div>
  
    <div style="margin-right:20px;">
						<el-date-picker v-model="beginDate" type="date" placeholder="开始日期">
						</el-date-picker>
						<el-date-picker v-model="endDate" type="date" placeholder="结束日期">
						</el-date-picker>
    </div>


 <div  style="margin-right:20px;">
       <el-button @click="queryList(true)">查询</el-button>
    </div>

</div>


      <el-table border
    ref="multipleTable"
    :data="feedbackList"
    tooltip-effect="dark"
    style="width: 70%"
    >
  <el-table-column  fixed="left"
      label="账号" header-align="center">
      <template slot-scope="scope">{{ scope.row.userName }}</template>
    </el-table-column>



    <el-table-column
      label="昵称" header-align="center">
      <template slot-scope="scope">{{ scope.row.nickName }}</template>
    </el-table-column>

  

    <el-table-column
      label="内容" header-align="center" width="300">
      <template slot-scope="scope">
        <div style="display:flex;    align-items: center;" :style="lanNum== scope.row.id?'align-items:flex-end':''">
        <div :class="lanNum !== scope.row.id?'textLabel':''">{{ scope.row.content }}</div><el-button type="text" @click="changeModel(scope.row.id)" v-if="scope.row.content.length>20">{{lanNum!== scope.row.id?'展开':'收起'}}</el-button>
  </div>
  </template>
    </el-table-column>

    <el-table-column header-align="center"
      prop="createTime"
      label="提交时间"
      width="200">
    </el-table-column>
   


  </el-table>




    

<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="page+1" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>






    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as UserApi from "../../api/UserApi";
import moment from "moment";
@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  feedbackList = [];
  total = 0;
  pageSize = 20;
  currentPage = 0;
  keyword = "";
  lanNum: string = "";
  onPageChange(currentPage: number) {
    this.currentPage = currentPage - 1;
    this.queryList();
  }
  changeModel(id) {
    this.lanNum == id ? (this.lanNum = "") : (this.lanNum = id);
  }
beginDate= ''
endDate = ''
  queryList(filter=null) {
    if(filter){
      this.currentPage = 0
    }
      if ((this.beginDate || "") != "") {
     this.beginDate =
        moment(this.beginDate).format("YYYY-MM-DD") + " 00:00:00";
    }

    if ((this.endDate || "") != "") {
     this.endDate =
        moment(this.endDate).format("YYYY-MM-DD") + " 23:59:59";
    }
    
    UserApi.queryFeedBack(this.currentPage, this.keyword,this.beginDate,this.endDate).then(res => {
      if (res["retCode"]) {
        this.feedbackList = res.data.feedbackList;
        this.total = res.data.page.total;
      } else {
        console.error("数据查询错误");
      }
    });
    console.log("查询列表");
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
.textLabel {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>