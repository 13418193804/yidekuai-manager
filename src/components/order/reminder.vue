<template>
    <div v-loading="loading">

        <div style="=">
          <h3>催单管理
          </h3>
           <div style="margin:10px 0;">
平台订单数量统计：{{allprescription}} 单  平台待催订单数量统计：{{PENDING}} 单
            </div>
          </div>


  <el-tabs v-model="reminderVEnums" type="card" @tab-click="handleClick">

    <el-tab-pane label="待催单" name="PENDING">


 <div style="padding-bottom:20px;">
<el-row :gutter="10" style="padding-left:80px;">
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input
  placeholder="姓名/手机号/身份证/处方编号" style="margin-top:20px;"  v-model="key"
  clearable>
</el-input>
  </el-col>

  <el-col :xs="9" :sm="9" :md="6" :lg="6" :xl="6">
   <el-input
  placeholder="请输入收货地址" style="margin-top:20px;"  v-model="consigneeAddress"
  clearable>
</el-input>
  </el-col>


 <el-col :xs="16" :sm="16" :md="10" :lg="10" :xl="10" style="min-width:500px;">
  	<el-date-picker v-model="startDate" type="date" placeholder="开始日期" style="margin-top:20px;"  >
						</el-date-picker>
						<el-date-picker v-model="endDate" type="date" placeholder="结束日期" style="margin-top:20px;"  >
						</el-date-picker>
  </el-col>
  <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getOrderList(true)">查询</el-button>
  </el-col>
 
</el-row>
</div>


<remindertable ref="remindertable" :orderList="orderList" @getOrderList="getOrderList" pagetype="reminder" :patModel="'PENDING'"></remindertable>
    </el-tab-pane>
    <el-tab-pane label="全部" name="ALL">
       <div style="padding-bottom:20px;">
<el-row :gutter="10" style="margin-top:20px;">
	 <el-form label-width="80px" :inline="true" >
  <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="5" style="min-width: 360px;margin-top:10px;">
                <el-form-item  label="状态"  style="margin:0">
  <el-select v-model="rderStatus"  >
      <el-option value="" label="全部"></el-option>
      <el-option value="ORDER_WAIT_PAY" label="等待支付"></el-option>
      <el-option value="ORDER_CANCEL_PAY" label="取消支付"></el-option>
      <el-option value="ORDER_WAIT_SENDGOODS" label="待发货"></el-option>
      <el-option value="ORDER_WAIT_RECVGOODS" label="待收货"></el-option>
      <el-option value="ORDER_END_GOODS" label="已完成"></el-option>
    </el-select>
				</el-form-item>
  </el-col>
   <el-col :xs="17" :sm="17" :md="11" :lg="8" :xl="6" style="min-width:500px;margin-top:10px;" class="flex" >
  	<el-date-picker v-model="startDate" type="date" placeholder="开始日期"  class="flex-1" style="margin-right:5px">
						</el-date-picker>
						<el-date-picker v-model="endDate" type="date" placeholder="结束日期"  class="flex-1"   style="margin-left:5px">
						</el-date-picker>
  </el-col>

  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5" style="margin-top:10px;">
    <div class="flex flex-align-center">
         <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width: 300px;">
<el-button type="primary"   @click="getOrderExcel()" style="margin-left:80px">生成导出文件</el-button>
      <span v-if="durl">{{durl}}</span>
    </div>
       <div v-if="durl">
<el-button type="text"   @click="doDownLoad()"  >下载</el-button>
    </div>
    </div>
  </el-col>

        </el-form>
</el-row>



<el-row :gutter="10" >
	 <el-form label-width="80px" :inline="true" >
    <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="5" style="margin-top:20px;min-width: 380px;">
                <el-form-item  label="支付方式" >
  <el-select v-model="paymentMode" >
      <el-option value="" label="全部"></el-option>
      <el-option value="ONLINE_PAYMENT" label="微信支付"></el-option>
      <el-option value="ORDER_PAY_ONDEV" label="货到付款"></el-option>
    </el-select>
				</el-form-item>
  </el-col>
        </el-form>
  <el-col :xs="8" :sm="8" :md="5" :lg="3" :xl="5">
   <el-input
  placeholder="姓名/手机号/身份证/处方编号" style="margin-top:20px;"  v-model="key"
  clearable>
</el-input>
  </el-col>

  <el-col :xs="9" :sm="9" :md="6" :lg="5" :xl="6">
   <el-input
  placeholder="请输入收货地址" style="margin-top:20px;"  v-model="consigneeAddress"
  clearable>
</el-input>
  </el-col>


  <el-col :xs="24" :sm="12" :md="8" :lg="5" :xl="3">
<el-button type="primary" icon="el-icon-search"  @click="getOrderList()"  style="margin-top:20px;">查询</el-button>
  </el-col>

  
</el-row>
</div>

<remindertable ref="remindertable" :orderList="orderList" @getOrderList="getOrderList" pagetype="reminder" :patModel="''"></remindertable>

   </el-tab-pane>

  </el-tabs>

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
import * as Api from "../../api/api";
import remindertable from "./remindertable";
import moment from "moment";

@Component({
  props: {},
  components: {
    remindertable
  }
})
export default class AddGoods extends Vue {
  handleOrderStatus(status) {
    switch (status) {
      case "ORDER_INIT":
        return "订单初始化";
      case "ORDER_WAIT_PAY":
        return "等待支付";
      case "ORDER_PAY_ONDEV":
        return "货到付款";
      case "ORDER_CANCEL_PAY":
        return "取消支付";
      case "ORDER_WAIT_SENDGOODS":
        return "待发货";
      case "ORDER_WAIT_RECVGOODS":
        return "待收货";
      case "ORDER_END_GOODS":
        return "完成";
      default:
        return "";
    }
  }
paymentMode =''
  reminderVEnums = "PENDING";

  allprescription = 0;
  // allPrescription() {
  //   indexApi.allPrescription().then(res => {
  //     if (res["retCode"]) {
  //       console.log(res.data);

  //     } else {
  //       if(!res['islogin']){this.$alert(res["message"]);}
  //       console.error("数据查询错误");
  //     }
  //   });
  // }
  loading = false;
  getOrderExcel() {
    this.loading = true;

    let startCreatTime = "";
    let endCreatTime = "";
    if ((this.startDate || "") != "") {
      startCreatTime =
        moment(this.startDate).format("YYYY-MM-DD") + " 00:00:00";
    }
    if ((this.endDate || "") != "") {
      endCreatTime = moment(this.endDate).format("YYYY-MM-DD") + " 23:59:59";
    }
    
    indexApi.getExcelUrl({
    startCreateDate: startCreatTime,
        endCreateDate: endCreatTime,
        rderStatus: this.rderStatus,
                paymentMode:this.paymentMode
    }).then(res => {
      if (res["retCode"]) {

        console.log(res.data)

        if (res.data.num>0) {
          this.doResult(res.data.durl);
        } else {
        this.loading = false;
          this.$alert("查询结果没有可导出数据");
        }
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
    });
  }
durl =''
doDownLoad(){
  window.open(this.durl);
}
  doResult(durl) {

    indexApi.orderDoResult({}).then(res => {
        this.loading = false;
      if (res["retCode"]) {
        this.$message("导出成功");
          this.durl = durl
          // sessionStorage
          // 塞到缓存
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
    });
  }

  key = "";
  page = 0;
  pageSize = 10;
  total = 100;
  onPageChange(page) {
    this.page = page - 1;
    this.getOrderList();
  }
  orderList = [];
  startDate = "";
  endDate = "";

  consigneeAddress = "";
  handleClick(e) {
    this.rderStatus = "";
    this.getOrderList();
  }
  rderStatus = "";
  
  getOrderList(filter=null) {
    if(filter){
      this.page = 0
    }
    let startCreatTime = "";
    let endCreatTime = "";
    if ((this.startDate || "") != "") {
      startCreatTime =
        moment(this.startDate).format("YYYY-MM-DD") + " 00:00:00";
    }
    if ((this.endDate || "") != "") {
      endCreatTime = moment(this.endDate).format("YYYY-MM-DD") + " 23:59:59";
    }

    this.reminderVEnums == "ALL";
    this.loading = true
    indexApi
      .gerOrderList({
        paymentMode:this.paymentMode,
        reminderVEnums: this.reminderVEnums,
        key: this.key,
        consigneeAddress: this.consigneeAddress,
        startCreatTime: startCreatTime,
        endCreatTime: endCreatTime,
        rderStatus: this.rderStatus,
        page: this.page,
        pageSize: this.pageSize
      })
      .then(res => {
    this.loading = false
        if (res["retCode"]) {
          console.log("-----", res.data);
          this.orderList = res.data.data;
          this.total = res.data.page.total;
          console.log(res.data.page.total);
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  PENDING = 0;
  queryOrderCount() {
    indexApi.queryOrderCount({}).then(res => {
      if (res["retCode"]) {
        this.PENDING = res.data.PENDING;
        this.allprescription = res.data.all;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  mounted() {
    // this.allPrescription();
    this.getOrderList();
    this.queryOrderCount();
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