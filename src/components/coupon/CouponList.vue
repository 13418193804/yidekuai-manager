<template>
    <div>
    <h3 class="title">优惠券</h3>
  
<div style="width:100%;background-color:#f7f7f7;padding:20px;display:flex;">
    <div style="margin-right:20px;">
      <el-input  placeholder="搜索名称" v-model="obj.keyword"></el-input>
    </div>
        <div style="margin-right:20px;">
          	 <el-select v-model="obj.status" placeholder="订单类型">
    					<el-option label="全部" value="">
    					</el-option>
              				<el-option label="生效中" :value="true">
    					</el-option>
              				<el-option label="已失效" :value="false">
    					</el-option>
  					</el-select>
    </div>
    <div style="margin-right:20px;">

     <!-- <el-date-picker  type="date" placeholder="开始日期" v-model="obj.beginDate">
						</el-date-picker>
						<el-date-picker  type="date" placeholder="结束日期" v-model="obj.endDate" >
						</el-date-picker> -->
    </div>
   
 <div  style="margin-right:20px;">
       <el-button @click="queryList(true)">查询</el-button>
    </div>

 <div  style="margin-right:20px;" v-if="dohavePermission('添加优惠券')">
     <el-button type="primary" @click="$router.push('/addcoupon')">添加优惠券</el-button>
    </div>
</div>
  
 <el-table border
    ref="multipleTable"
    :data="couponList"
    tooltip-effect="dark"
    style="width:90%;min-height:500px;"
    >
   
    <el-table-column  fixed="left"
      label="优惠券名称" header-align="center" width="180">
      <template slot-scope="scope">{{ scope.row.couponName }}</template>
    </el-table-column>
        <el-table-column
      label="面额" header-align="center">
      <template slot-scope="scope">{{ scope.row.couponDenomination }}</template>
    </el-table-column>
      
 <el-table-column
      label="满额使用" header-align="center">
      <template slot-scope="scope">{{ scope.row.fullDenomination }}</template>
    </el-table-column>
       <el-table-column
      label="添加时间" header-align="center" width="180">
      <template slot-scope="scope">{{ scope.row.createTime }}</template>
    </el-table-column>
      

             <el-table-column
      label="状态" header-align="center">
      <template slot-scope="scope">{{ scope.row.status?'生效中':'已失效' }}</template>
    </el-table-column>



	<el-table-column label="操作" width="300" header-align="center">
				<template slot-scope="scope">
						<!-- <el-button size="mini" type="info" @click="doUpdate(scope.row)" plain v-if="dohavePermission('编辑优惠券')">编辑</el-button> -->
						<el-button size="mini" type="text" @click="doDelete(scope.row )" plain v-if="dohavePermission('删除优惠券')">删除</el-button>
				</template>
			</el-table-column>



  </el-table>












    
    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as couponApi from "../../api/couponApi";
import moment from "moment";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  currentPage = 0;
  couponList = [];
  obj = {
    keyword: "",
    status: "",
    // beginDate: "",
    // endDate: ""
  };
  doUpdate(row) {
    console.log(row);

    this.$router.push({ name: "addcoupon", params: row });
  }
  queryList(filter=null) {
    if(filter){
      this.currentPage = 0
    }
    // console.log( moment(this.obj["beginDate"]).format("YYYY-MM-DD") + " 00:00:00")


  //  this.obj.beginDate = moment(this.obj["beginDate"]).format("YYYY-MM-DD") + " 00:00:00"
  //  this.obj.endDate = moment(this.obj["endDate"]).format("YYYY-MM-DD") + " 00:00:00"
   
    couponApi.queryCouponList(this.currentPage,this.obj).then(res => {
      if (res["retCode"]) {
        this.couponList = res.data.couponList;
      } else {
        this.$alert(res.message)
        console.error("数据查询错误");
      }
    });
  }
  doDelete(row) {
    this.$confirm("此操作将删除该优惠券, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        couponApi.deleteCouponItem({ couponId: row.id }).then(res => {
          if (res["retCode"]) {
            this.$message("删除成功");
            this.queryList();
          } else {
        this.$alert(res.message)
            
            console.error("数据查询错误");
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }

  mounted() {
    this.queryList();
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