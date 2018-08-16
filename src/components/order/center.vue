<template>
    <div>

        <div style="border-bottom:1px #e5e5e5 solid;">
          <h3>订单管理
          </h3>
           <div style="margin:10px 0;">
平台订单数量统计：{{allprescription}} 单
            </div>
            <div style="padding-bottom:20px;">
<!-- <el-row :gutter="10">
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input
  placeholder="请输入关键字" style="margin-top:20px;" v-model="keyword"
  clearable>
</el-input>
  </el-col>
 <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2" style="min-width:100px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getUserList()">查询</el-button>
  </el-col>
             <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
           <el-button
          type="primary" style="margin-top:20px;"
          @click="changeModel('add',false)">添加用户</el-button>
 </el-col>
</el-row> -->

          </div>
</div>







<el-table border
    :data="orderList"
    stripe 
    style="width: 100%;min-height:500px">

  <el-table-column  fixed="left"
      prop="presId"
      label="处方编号">
   </el-table-column>

 <el-table-column
      label="订单状态">
<template slot-scope="scope">
  {{handleOrderStatus(scope.row.orderStatue)}}
</template>
   </el-table-column>
   
    <el-table-column
      prop="memberName"
      label="患者姓名">
   </el-table-column>


   <el-table-column
      prop="docterName"
      label="开方医生" width="150">
   </el-table-column>

 <el-table-column
      prop="remark"
      label="备注">
   </el-table-column>
   
      
      








</el-table>



		<el-col :span="24" class="toolbar">
			<el-pagination :current-page="page+1" layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>





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

//   ORDER_INIT,//初始化状态
// ORDER_WAIT_PAY,//等待支付
// ORDER_PAY_ONDEV,//货到付款
// ORDER_CANCEL_PAY,//取消支付或者支付失败
// ORDER_WAIT_SENDGOODS,//等待发货
// ORDER_WAIT_RECVGOODS,//待收货
// ORDER_END_GOODS//完成

handleOrderStatus(status){
switch(status){
  case 'ORDER_INIT':
  return '订单初始化';
   case 'ORDER_WAIT_PAY':
  return '等待支付';
   case 'ORDER_PAY_ONDEV':
  return '货到付款';
   case 'ORDER_CANCEL_PAY':
  return '取消支付';
   case 'ORDER_WAIT_SENDGOODS':
  return '待发货';
     case 'ORDER_WAIT_RECVGOODS':
  return '待收货';
  case 'ORDER_END_GOODS':
  return '完成';
  default :
  return '';
}
}

  allprescription = 0;
  allPrescription() {
    indexApi.allPrescription().then(res => {
      if (res["retCode"]) {
        console.log(res.data);
        this.allprescription = res.data;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  page = 0;
  pageSize = 10;
  total = 100;
  onPageChange(page) {
    this.page = page - 1;
    this.getOrderList();
  }
  orderList = [];
  getOrderList() {
    indexApi
      .prescriptionList({
        page: this.page,
        pageSize: this.pageSize
      })
      .then(res => {
        if (res["retCode"]) {
          this.orderList = res.data.list;
          this.total = res.data.page.total;
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
  }

  mounted() {
    this.allPrescription();
    this.getOrderList();
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