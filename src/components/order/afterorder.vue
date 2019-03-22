<template>
    <div v-bouncing="loading">

        <div style="=">
          <h3>售后管理
          </h3>
           <div style="margin:10px 0;">
平台订单数量统计：{{allprescription}} 单  平台待发货订单数量统计：{{NEW_ORDER}} 单
            </div>
          </div>

<!-- type="card" -->
  <el-tabs v-model="reminderVEnums"  @tab-click="handleClick">
    <el-tab-pane   :label="'待发货订单（'+NEW_ORDER+'）'"  name="NEW_ORDER">
 <div style="padding-bottom:20px;">
<el-row :gutter="10" >
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

 <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="min-width:360px;">
   <el-date-picker style="margin-top:20px;"
      v-model="date"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-col>


  <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getOrderList(true)">查询</el-button>
  </el-col>
 
</el-row>
</div>


<remindertable @getSessionStatus="getSessionStatus"  ref="remindertable" :operateType="operateType" @setMultipleSelection="setMultipleSelection"  :cowWidth="260" :provinceList="provinceList" :orderList="orderList" @getOrderList="getOrderList" pagetype="afterorder"></remindertable>
    </el-tab-pane>

    <el-tab-pane   :label="'待收货订单（'+ORDER_WAIT_RECVGOODS+'）'"  name="ORDER_WAIT_RECVGOODS">

 <div style="padding-bottom:20px;">
<el-row :gutter="10" >
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
 <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="min-width:360px;">
   <el-date-picker style="margin-top:20px;"
      v-model="date"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-col>
  <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getOrderList(true)">查询</el-button>
  </el-col>
</el-row>
</div>
<remindertable @getSessionStatus="getSessionStatus"  ref="remindertable" :operateType="operateType" @setMultipleSelection="setMultipleSelection"  :cowWidth="200" :provinceList="provinceList" :orderList="orderList" @getOrderList="getOrderList" pagetype="afterorder"></remindertable>
    </el-tab-pane>
    <el-tab-pane   :label="'待付款订单（'+ORDER_WAIT_PAY+'）'"  name="ORDER_WAIT_PAY">
 <div style="padding-bottom:20px;">
<el-row :gutter="10" >
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

 <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="min-width:360px;">
   <el-date-picker style="margin-top:20px;"
      v-model="date"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-col>
  <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getOrderList(true)">查询</el-button>
  </el-col>
</el-row>
</div>
<remindertable @getSessionStatus="getSessionStatus"  ref="remindertable" :operateType="operateType" @setMultipleSelection="setMultipleSelection"  :cowWidth="200" :provinceList="provinceList" :orderList="orderList" @getOrderList="getOrderList" pagetype="afterorder" payStatus="ORDER_WAIT_PAY"></remindertable>
    </el-tab-pane>

    <el-tab-pane   :label="'待开发票（'+invoice+'）'"  name="rework" >
 <div style="padding-bottom:20px;">
<el-row :gutter="10" >
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input
  placeholder="姓名/手机号" style="margin-top:20px;"  v-model="key"
  clearable>
</el-input>
  </el-col>

 <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="min-width:360px;">
   <el-date-picker style="margin-top:20px;"
      v-model="date"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-col>
  <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getOrderList(true)">查询</el-button>
  </el-col>
 
</el-row>
</div>

<remindertable @getSessionStatus="getSessionStatus"   ref="remindertable" :cowWidth="260" :orderList="orderList" @getOrderList="getOrderList" pagetype="rework" ></remindertable>
  
    </el-tab-pane>


    <el-tab-pane   :label="'全部（'+allprescription+'）'" name="ALL">
          <div style="padding-bottom:20px;">
<el-row :gutter="10" style="margin-top:20px;">
	 <el-form label-width="80px" :inline="true" >
  <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="min-width: 320px;margin-top:10px;">
                <el-form-item  label="状态"  style="margin:0">
  <el-select v-model="rderStatus"  >
      <el-option value="" label="全部"></el-option>
      <el-option value="ORDER_WAIT_PAY" label="等待支付"></el-option>
      <el-option value="ORDER_CANCEL_PAY" label="交易关闭"></el-option>
      <el-option value="ORDER_WAIT_SENDGOODS" label="待发货"></el-option>
      <el-option value="SENDGOODS_UNFINISHED" label="发货未完成"></el-option>
      <el-option value="ORDER_WAIT_RECVGOODS" label="待收货"></el-option>
      <el-option value="ORDER_END_GOODS" label="订单已完成"></el-option>
    </el-select>
				</el-form-item>
  </el-col>

 <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="min-width:360px;">
   <el-date-picker style="margin-top:10px;"
      v-model="date"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-col>



  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="7" style="margin-top:10px;" v-promiss.export>
    <div class="flex flex-align-center ">
         <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width: 300px;">
<el-button type="primary"   @click="getOrderExcel()" >生成导出文件</el-button>
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
  <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="min-width: 320px;margin-top:20px;">
                <el-form-item  label="支付方式" style="margin:0;">
  <el-select v-model="paymentMode" >
      <el-option value="" label="全部"></el-option>
      <el-option value="ONLINE_PAYMENT" label="微信支付"></el-option>
      <el-option value="ORDER_PAY_ONDEV" label="货到付款"></el-option>
    </el-select>
				</el-form-item>
  </el-col>
        </el-form>
  <el-col :xs="12" :sm="9" :md="6" :lg="6" :xl="5">
   <el-input
  placeholder="姓名/手机号/身份证/处方编号" style="margin-top:20px;"  v-model="key"
  clearable>
</el-input>
  </el-col>

  <el-col :xs="12" :sm="9" :md="6" :lg="6" :xl="6">
   <el-input
  placeholder="请输入收货地址" style="margin-top:20px;"  v-model="consigneeAddress"
  clearable>
</el-input>
  </el-col>


  <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
<el-button type="primary" icon="el-icon-search"  @click="getOrderList(true)"  style="margin-top:20px;">查询</el-button>
  </el-col>

</el-row>
</div>

<remindertable @getSessionStatus="getSessionStatus"  ref="remindertable" :operateType="operateType" @setMultipleSelection="setMultipleSelection"  :cowWidth="260" :provinceList="provinceList" :orderList="orderList" @getOrderList="getOrderList" pagetype="afterorder"></remindertable>

   </el-tab-pane>

  </el-tabs>

		<el-col :span="24" class="toolbar flex flex-pack-justify" >
      
           <div >
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

        <el-date-picker v-if="operateType =='time_export'"  style="margin-left: 20px"
      v-model="exportTime" size="small"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>

      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>

			<el-pagination background :current-page="page+1"
       layout="total, sizes,prev, pager, next" 
       :page-size="pageSize"  @size-change="handleSizeChange"
        :page-sizes="[10,20,50,100]" 
        :total="total" @current-change="onPageChange">
			</el-pagination>


		</el-col>








    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import remindertable from "./remindertable";
import moment from "moment";
import * as ApiOrder from "../../api/orderapi";

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
        return "交易关闭";
      case "ORDER_WAIT_SENDGOODS":
        return "待发货";
          case "SENDGOODS_UNFINISHED":
        return "发货未完成";
      case "ORDER_WAIT_RECVGOODS":
        return "待收货";
      case "ORDER_END_GOODS":
        return "订单已完成";
      default:
        return "";
    }
  }
  provinceList = [];
  queryProvinceList() {
    ApiOrder.queryProvinceList().then(res => {
      this.provinceList = res.data.region;
    });
  }
  paymentMode = "";
  reminderVEnums = "NEW_ORDER";
  // reminderVEnums = "rework";
  
  allprescription = 0;
  loading = false;
  date=[]
  getOrderExcel() {
    this.loading = true;

    indexApi
      .getExcelUrl({
        startCreateDate: this.date && this.date.length>0? moment(this.date[0]).format("YYYY-MM-DD") + " 00:00:00":"",
        endCreateDate: this.date && this.date.length>0? moment(this.date[1]).format("YYYY-MM-DD") + " 23:59:59":"",
        orderStatusEnum: this.rderStatus,
        paymentMode: this.paymentMode
      })
      .then(res => {
        if (res["retCode"]) {
          if (res.data.num > 0) {
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
  durl = "";
  doDownLoad() {
    window.open(this.durl);
  }
  doResult(durl) {
    indexApi.orderDoResult({}).then(res => {
      this.loading = false;
      if (res["retCode"]) {
        this.$message("导出成功");
        this.durl = durl;
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
  handleSizeChange(size){
this.pageSize = size
    this.getOrderList();
}
  consigneeAddress = "";
  handleClick(e) {
   this.rderStatus = "";
    this.key= "";
this.paymentMode = "";
this.consigneeAddress ="";
this.date=["",""]
this.rderStatus ="";
 this.page = 0
    this.getOrderList(true);
  }
  rderStatus = "";
  getOrderList(filter = null) {
    if (filter) {
      this.page = 0;
    }
    let reminderVEnums = this.reminderVEnums;
    if (this.reminderVEnums == "rework") {
      this.loading = true;
      indexApi
        .getYdkPrescriptionAndInvoice({
          key: this.key,
          startCreateDate: this.date && this.date.length>0? moment(this.date[0]).format("YYYY-MM-DD") + " 00:00:00":"",
          endCreateDate: this.date && this.date.length>0? moment(this.date[1]).format("YYYY-MM-DD") + " 23:59:59":"",
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          this.loading = false;
          if (res["retCode"]) {
            this.orderList = res.data.data;
            this.total = res.data.page.total;
              this.handleScroll()
          } else {
            if (!res["islogin"]) {
              this.$alert(res["message"]);
            }
          }
        });
      return;
    }
    this.loading = true;
    indexApi
      .gerOrderList({
        paymentMode: this.paymentMode,
        reminderVEnums: reminderVEnums,
        key: this.key,
        consigneeAddress: this.consigneeAddress,
        startCreateDate: this.date && this.date.length>0? moment(this.date[0]).format("YYYY-MM-DD") + " 00:00:00":"",
        endCreateDate: this.date && this.date.length>0? moment(this.date[1]).format("YYYY-MM-DD") + " 23:59:59":"",
        orderStatusEnum: this.rderStatus,
        page: this.page,
        pageSize: this.pageSize
      })
      .then(res => {
        this.loading = false;
              // this.$emit('updateYdkPrescriptionStatusNum','NEW_ORDER');
            this.queryOrderCount();
        if (res["retCode"]) {
          this.orderList = res.data.data;
          this.total = res.data.page.total;
              this.handleScroll()
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
  }

getSessionStatus(callback){
callback({
  fatherStatus:this.reminderVEnums,
  page:this.page,
  scrollTop:document.getElementById('scrollView').scrollTop.toString(),
    flag:'after_'
})
}
handleScroll(){
    if((sessionStorage.after_scrollTop||'')!==''){
      this.$nextTick(()=>{
          document.getElementById('scrollView').scrollTop  = parseInt(sessionStorage.after_scrollTop)
          sessionStorage.removeItem('after_page')
          sessionStorage.removeItem('after_scrollTop')
          sessionStorage.removeItem('after_fatherStatus')
          })
    }
}
  invoice = 0;
  NEW_ORDER = 0;
  ORDER_WAIT_RECVGOODS= 0;
  ORDER_WAIT_PAY= 0;
  queryOrderCount() {
    indexApi.queryOrderCount({}).then(res => {
      if (res["retCode"]) {
        this.invoice = res.data.invoice;
        this.NEW_ORDER = res.data.NEW_ORDER;
        this.ORDER_WAIT_RECVGOODS = res.data.ORDER_WAIT_RECVGOODS
        this.ORDER_WAIT_PAY = res.data.ORDER_WAIT_PAY
        this.allprescription = res.data.all;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }


operateOptions =[
  {
    value:'export',
    label:"业务单导出（检索 + 选中）"
  },
   {
    value:'time_export',
    label:"业务单导出（时间）"
  }
]
operateType = ""
multipleSelection = []
setMultipleSelection(multipleSelection){
this.multipleSelection = multipleSelection
}

exportTime = []
  handleBatchOperate(){
if(this.operateType == 'export'){
  if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({  
            message: '请选择要操作的订单',
            type: 'warning',
            duration: 1000
          });
          return;
        }
 let presIds =   this.multipleSelection.map(item=>{
    return item.presId
  }).join(',')
 indexApi.getBatchOperateOrderExport(presIds);
}
if(this.operateType == 'time_export'  )
{

if(this.exportTime==null || this.exportTime.length == 0){
  this.$message({  
            message: '请指定时间',
            type: 'warning',
            duration: 1000
          });
          return;
}else{
     let startTime =      moment(this.exportTime[0]).format("YYYY-MM-DD") + " 00:00:00"
      let endTime =     moment(this.exportTime[1]).format("YYYY-MM-DD") + " 23:59:59"
 indexApi.getBatchOperateOrderExportByTime(startTime,endTime);


}


}
  }
  mounted() {
    // this.allPrescription();
    if((sessionStorage.after_fatherStatus||'') !== '' ){
      this.reminderVEnums = sessionStorage.after_fatherStatus
      this.page = parseInt(sessionStorage.after_page)
    }
    this.queryProvinceList();
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