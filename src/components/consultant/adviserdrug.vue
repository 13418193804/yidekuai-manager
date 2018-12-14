<template>
    <div v-bouncing="loading"> 
    
         <div style="">
          <h3>药品数据
          </h3>
          
 <div style="padding-bottom:20px;">
<span style="margin-right:20px;">药品总数：{{countDrug}} 个</span>    
<span style="margin-right:20px;">订单实收金额：{{payOrderMoney}} 元</span>       
<span style="margin-right:20px;">处方数量：{{prescriptionNum}} </span>       
<span style="margin-right:20px;">实收订单数：{{payOrderNum}} </span>       
<span style="margin-right:20px;">全部顾问数量：{{allAdviserNum}} </span>             
<span style="margin-right:20px;">药品销售数量：{{drugQuantityTotal}} </span>    
<span style="margin-right:20px;">失败订单数量：{{giveupOrderNum}} </span>               
       
            </div>
        </div>
     
       
<div style="padding-bottom:20px;">
<el-row :gutter="10">
  <el-col :xs="12" :sm="8" :md="5" :lg="6" :xl="5">
   <el-input v-model="drug"
  placeholder="药品名/通用名" style="margin-top:20px;" 
  clearable>
</el-input>
  </el-col>


  

  <el-col :xs="12" :sm="8" :md="5" :lg="6" :xl="5">
   <el-input v-model="name"
  placeholder="顾问姓名/医生姓名" style="margin-top:20px;" 
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
      end-placeholder="结束日期"
       :picker-options="pickerOptions2">
    </el-date-picker>
  </el-col>




  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="adviserdrug(true)">查询</el-button>
  </el-col>
  
  </el-row>
</div>

   <el-row>
<el-table border @sort-change="sortChange"
:data="DrugInfo"
   stripe height="600"
   style="width: 100%;">

  <el-table-column fixed="left"
      prop="drugName"
      label="通用名"  width="180">
   </el-table-column>
      <el-table-column
          prop="productName"
          label="商品名" width="170">
      </el-table-column>
           <el-table-column
      prop="doctorNum" sortable="custom"
      label="货架号数量" width="150">
           <template slot-scope="scope">
           {{scope.row.doctorNum?scope.row.doctorNum:0}}
      </template>
   </el-table-column>
   
  <el-table-column
      prop="adviserNum"
      label="顾问数量"  width="150">
          <template slot-scope="scope">
           {{scope.row.adviserNum?scope.row.adviserNum:0}}
      </template>
   </el-table-column>

        <el-table-column
      prop="memberNum" sortable="custom"
      label="购药人次"  width="150">
               <template slot-scope="scope">
           {{scope.row.memberNum?scope.row.memberNum:0}}
      </template>
   </el-table-column>
           <el-table-column
      prop="orderNum" sortable="custom"
      label="订单数"  width="150">
     <template slot-scope="scope">
           {{scope.row.orderNum?scope.row.orderNum:0}}
      </template>
   </el-table-column>
           <el-table-column
      prop="totalMoney" sortable="custom"
      label="总金额"  width="150">
               <template slot-scope="scope">
           {{scope.row.totalMoney?scope.row.totalMoney:0}}
      </template>
   </el-table-column>
      <el-table-column
      prop="totalQuantity"
      label="销售数量"  width="150">
             <template slot-scope="scope">
           {{scope.row.totalQuantity?scope.row.totalQuantity:0}}
      </template>
   </el-table-column>
  <el-table-column
      prop="shouldpay"
      label="销售金额"  width="150">
                <template slot-scope="scope">
           {{scope.row.shouldpay?scope.row.shouldpay:0}}
      </template>
   </el-table-column>

  <el-table-column
      prop="manufacturer"
      label="生产厂家"  width="150">
   </el-table-column>
     <el-table-column
      prop="specification"
      label="规格"  width="170">
   </el-table-column>
     <el-table-column
      prop="dosageforms"
      label="剂型">
   </el-table-column>
      <el-table-column
      prop="hisCode"
      label="批准文号"  width="150">
   </el-table-column>
     <el-table-column
      prop="price"
      label="单价">
   </el-table-column>

        <el-table-column
      label="操作" fixed="right"  width="170">

     <template slot-scope="scope" >
        <el-button
          size="mini"
          type="text"
          @click="drugGetAdviser(scope.row)" >查看顾问</el-button>
                <el-button
          size="mini"
          type="text"
         @click="drugGetDoctor(scope.row)" >查看医生</el-button>
      </template>

   </el-table-column>
        </el-table> 
        </el-row>
  

		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="page+1"  :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>







		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="drugAdvObj.model"  title="查看顾问">
<div v-bouncing="drugAdvObj.loading">
<el-table border
    :data="drugAdvObj.AdviserInfo"
    stripe height="600"
    style="width: 100%;">


  <el-table-column  fixed="left"
      prop="adviserName"
      label="顾问姓名">
   </el-table-column>
 <el-table-column
      prop="doctorNum"
      label="管理医生数量">
   </el-table-column>
 <el-table-column
      prop="orderNum"
      label="总订单数量">
   </el-table-column>
 <el-table-column
      prop="orderMoney"
      label="总订单金额">
   </el-table-column>
 <el-table-column
      prop="prescriptionNum"
      label="总处方数量">
   </el-table-column>
   
 <el-table-column
      prop="drugNum"
      label="药品种类数量">
   </el-table-column>
 
  <el-table-column
      prop="userName"
      label="手机号" width="150">
   </el-table-column>

 <el-table-column
      prop="adviserAge"
      label="年龄">
   </el-table-column>

 <el-table-column
      prop="adviserSex"
      label="性别">
   </el-table-column>
 

 <el-table-column
      prop="userStatus"
      label="使用状态">
      <template slot-scope="scope">
      {{scope.row.userStatus=='1'?'启用中':'已禁用'}}
      </template>
   </el-table-column>
   <el-table-column
      prop="remark"
      label="备注">
   </el-table-column>



</el-table> 

<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="drugAdvObj.page+1"  :page-size="drugAdvObj.pageSize" :total="drugAdvObj.total" @current-change="drugAdvObj.onPageChange">
			</el-pagination>
		</el-col>
</div>
</el-dialog>




   

		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="drugDocObj.model"  title="查看医生">
<div v-bouncing="drugDocObj.loading">
<el-table border
    :data="drugDocObj.DocterInfo"
    stripe height="600"
    style="width: 100%;">
  <el-table-column prop="name" label="医生姓名"  fixed="left"></el-table-column>
                  <el-table-column prop="prescriptionNum" label="医生处方数量"></el-table-column>
            <el-table-column prop="orderNum" label="医生订单数量"></el-table-column>
            <el-table-column prop="orderMoney" label="医生订单金额"></el-table-column>
            <el-table-column prop="drugNum" label="医生患者数量"></el-table-column>
            <el-table-column prop="hospitalName" label="所属医院" width="120"></el-table-column>
            <el-table-column prop="phone" label="账号" width="120"></el-table-column>
            <el-table-column prop="hospitalDepartment" label="所在科室"></el-table-column>
            <el-table-column prop="doctorGood" label="医生主治" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="doctorBrief" label="医生简介" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="consultingFee" label="咨询价格"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="doctorStatus" label="使用状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.doctorStatus=='DINI'" type="primary">测试</el-tag>
                    <el-tag v-if="scope.row.doctorStatus=='USE'" type="success">可用</el-tag>
                    <el-tag v-if="scope.row.doctorStatus=='STOP'" type="text">停用</el-tag>
                    <!-- <el-tag v-if="scope.row.doctorStatus=='HIDE'" type="info">隐藏</el-tag> -->
                </template>
            </el-table-column>

</el-table> 

<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="drugDocObj.page+1" :page-size="drugDocObj.pageSize" :total="drugDocObj.total" @current-change="drugDocObj.onPageChange">
			</el-pagination>
		</el-col>
</div>
</el-dialog>



    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import moment from "moment";
import * as indexApi from "../../api/indexApi";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class getDrugByKeyword extends Vue {
  loading = false;
  DrugInfo = [];
  page = 0;
  pageSize = 10;
  total = 0;
  onPageChange(page) {
    this.page = page - 1;
    this.adviserdrug();
  }

 pickerOptions2 = {
    shortcuts: [
      {
        text: "本月",
        onClick(picker) {
        picker.$emit("pick", [window['mmvue'].getMonth1(),moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"]);
        }
      },
      {
        text: "本周",
        onClick(picker) {
   
          picker.$emit("pick", [window['mmvue'].getWeek(),moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"]);
        }
      },
      {
        text: "本日",
        onClick(picker) {

          picker.$emit("pick", [window['mmvue'].getToday(),moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"]);
        }
      }
    ]
  };
  orderByStr = "";
date=[]
  name = "";
  drug = "";
  adviserdrug(filter = null) {
    this.loading = true;
    if (filter) {
      this.page = 0;
    }

    let data = {
      drug: this.drug,
      name: this.name,
      page: this.page,
      pageSize: this.pageSize,
      orderByStr: this.orderByStr,
        startcreateDate:this.date && this.date.length>0? moment(this.date[0]).format("YYYY-MM-DD") + " 00:00:00":"",
        endcreateDate:  this.date && this.date.length>0? moment(this.date[1]).format("YYYY-MM-DD") + " 23:59:59":"",
    };


    
new Promise(resolve=>{
     indexApi.getDrugByKeyword(data).then(res => {
       resolve()
      if (res["retCode"]) {
        this.DrugInfo = res.data.DrugInfo;
        this.total = res.data.page.total;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        this.loading = false;
        return;
      }
    });
}).then(()=>{
      this.ypStartcreateDate(data);
})

  }

  orderMoney = 0;
  prescriptionNum = 0;
  orderNum = 0;
  allAdviserNum = 0;
  drugNum = 0;
  payOrderMoney = 0;
  payOrderNum = 0;
  drugQuantityTotal = 0;
    giveupOrderNum = 0;
  ypStartcreateDate(data) {
    data.ypStartcreateDate = data.startcreateDate;
    data.ypEndcreateDate = data.endcreateDate;
    indexApi.ypStartcreateDate(data).then(res => {
      if (res["retCode"]) {
        if (res.data.AdviserInfo.length > 0) {
          this.orderMoney = res.data.AdviserInfo[0].orderMoney
            ? res.data.AdviserInfo[0].orderMoney
            : 0;
                  this.giveupOrderNum = res.data.AdviserInfo[0].giveupOrderNum
            ? res.data.AdviserInfo[0].giveupOrderNum
            : 0;
          this.prescriptionNum = res.data.AdviserInfo[0].prescriptionNum
            ? res.data.AdviserInfo[0].prescriptionNum
            : 0;
          this.orderNum = res.data.AdviserInfo[0].orderNum
            ? res.data.AdviserInfo[0].orderNum
            : 0;
          this.allAdviserNum = res.data.AdviserInfo[0].allAdviserNum
            ? res.data.AdviserInfo[0].allAdviserNum
            : 0;
          this.drugNum = res.data.AdviserInfo[0].drugNum
            ? res.data.AdviserInfo[0].drugNum
            : 0;
          this.payOrderMoney = res.data.AdviserInfo[0].payOrderMoney
            ? res.data.AdviserInfo[0].payOrderMoney
            : 0;
          this.payOrderNum = res.data.AdviserInfo[0].payOrderNum
            ? res.data.AdviserInfo[0].payOrderNum
            : 0;
          this.drugQuantityTotal = res.data.AdviserInfo[0].drugQuantityTotal
            ? res.data.AdviserInfo[0].drugQuantityTotal
            : 0;
        }
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
      this.loading = false;
    });
  }

  /**
   * 查顾问
   */

  drugAdvObj = {
    model: false,
    loading: false,
    AdviserInfo: [],
    page: 0,
    pageSize: 10,
    total: 0,
    onPageChange: page => {
      this.drugAdvObj.page = page - 1;
      this.drugGetAdviser(this.drugAdvObj.row);
    },
    row: {}
  };
  drugGetAdviser(row) {
    this.drugAdvObj.loading = true;
    this.drugAdvObj.model = true;
    this.drugAdvObj.row = row;

    indexApi
      .drugGetAdviser({
        manufacturer: row.manufacturer,
        specification: row.specification,
        productName: row.productName,
        packingUnit: row.packingUnit,
        drugName: row.drugName,
        partnerId: row.partnerId,
        price: row.price,
        page: this.drugAdvObj.page,
        pageSize: this.drugAdvObj.pageSize
      })
      .then(res => {
        this.drugAdvObj.loading = false;
        if (res["retCode"]) {
          console.log(res.data);
          this.drugAdvObj.AdviserInfo = res.data.AdviserInfo;
          this.drugAdvObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  /**
   *
   * 查看医生
   *
   */

  drugDocObj = {
    model: false,
    loading: false,
    DocterInfo: [],
    page: 0,
    pageSize: 10,
    total: 0,
    onPageChange: page => {
      this.drugDocObj.page = page - 1;
      this.drugGetDoctor(this.drugDocObj.row);
    },
    row: {}
  };

  drugGetDoctor(row) {
    this.drugDocObj.loading = true;
    this.drugDocObj.model = true;
    this.drugDocObj.row = row;

    indexApi
      .drugGetDoctor({
        manufacturer: row.manufacturer,
        specification: row.specification,
        productName: row.productName,
        packingUnit: row.packingUnit,
        drugName: row.drugName,
        partnerId: row.partnerId,
        price: row.price,
        page: this.drugDocObj.page,
        pageSize: this.drugDocObj.pageSize
      })
      .then(res => {
        this.drugDocObj.loading = false;
        if (res["retCode"]) {
          console.log(res.data);
          this.drugDocObj.DocterInfo = res.data.DocterInfo;
          this.drugDocObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  /**
   * 统计药品数
   */
  countDrug = 0;

  getcountDrug() {
    indexApi.countDrug({}).then(res => {
      if (res["retCode"]) {
        this.countDrug = res.data.num;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  /**
  排序
 */
  sortChange({ column, prop, order }) {
    let desc = "";
    if (order == "descending") {
      desc += " desc";
    }

    switch (prop) {
      case "doctorNum":
        this.orderByStr = "doctor_num" + desc;
        break;
      case "memberNum":
        this.orderByStr = "member_num" + desc;
        break;
      case "orderNum":
        this.orderByStr = "order_num" + desc;
        break;
      case "totalMoney":
        this.orderByStr = "total_money" + desc;
        break;
      default:
        this.orderByStr = "";
        break;
    }
    this.adviserdrug(true);
  }

  getWeek() {
    //按周日为一周的最后一天计算
    var date = new Date();

    //今天是这周的第几天
    var today = date.getDay();

    //上周日距离今天的天数（负数表示）
    var stepSunDay = -today + 1;

    // 如果今天是周日
    if (today == 0) {
      stepSunDay = -7;
    }

    // 周一距离今天的天数（负数表示）
    var stepMonday = 7 - today;

    var time = date.getTime();

    var monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
    var sunday = new Date(time + stepMonday * 24 * 3600 * 1000);

    //本周一的日期 （起始日期）
    var startDate = this.transferDate(monday); // 日期变换

    return startDate + " 00:00:00";
  }

  getToday() {
    return moment(new Date()).format("YYYY-MM-DD") + " 00:00:00";
  }
  getMonth1() {
    // 获取当前月的第一天
    var start = new Date();
    start.setDate(1);
    var startDate = this.transferDate(start);
    return startDate + " 00:00:00";
  }
  transferDate(date) {
    // 年
    var year = date.getFullYear();
    // 月
    var month = date.getMonth() + 1;
    // 日
    var day = date.getDate();

    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }

    var dateString = year + "-" + month + "-" + day;

    return dateString;
  }
  mounted() {
this.date = [this.getMonth1(),moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"]
  window['mmvue'] = this


    this.adviserdrug();
    this.getcountDrug();
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