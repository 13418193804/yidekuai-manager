<template>
    <div v-bouncing="loading">
         <div style="">
          <h3>医生数据</h3>
 <div style="padding-bottom:20px;">
<span style="margin-right:20px;">平台医生数量：{{countDoctor}} 个</span>
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
  <el-col :xs="16" :sm="12" :md="10" :lg="5" :xl="3">
   <el-input v-model="keyword"
  placeholder="姓名" style="margin-top:20px;" 
  clearable>
</el-input>
  </el-col>
  <el-col :xs="16" :sm="12" :md="10" :lg="5" :xl="3">
   <el-input v-model="phone"
  placeholder="手机号码" style="margin-top:20px;" 
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




    <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="3" style="min-width:230px;">
  <el-select v-model="doctorStatus" placeholder="请选择状态" style="margin-top:20px;" >
                         <el-option label="全部"
                            value="">
                          </el-option>
                               <el-option
                            label="启用"
                            value="1">
                          </el-option>
                          <el-option
                            label="停用"
                            value="0">
                          </el-option>
  </el-select>
  </el-col>

  <!-- 状态、 注册时间  -->
  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="    min-width: 225px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getDoctorList(true)">查询</el-button>
  </el-col>
</el-row>
</div>


<el-table border @sort-change="sortChange"
    :data="DoctorInfo"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="name"
      label="医生姓名">
   </el-table-column>

   <el-table-column prop="doctorStatus" label="使用状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.doctorStatus=='DINI'" type="primary">测试</el-tag>
                    <el-tag v-if="scope.row.doctorStatus=='USE'" type="success">可用</el-tag>
                    <el-tag v-if="scope.row.doctorStatus=='STOP'" type="text">停用</el-tag>
                    <!-- <el-tag v-if="scope.row.doctorStatus=='HIDE'" type="info">隐藏</el-tag> -->
                </template>
            </el-table-column>
               <el-table-column prop="prescriptionNum" label="处方数量" sortable="custom" width="150">
                <template slot-scope="scope">
                    {{scope.row.prescriptionNum?scope.row.prescriptionNum:0}}
                </template>
               </el-table-column>
            <el-table-column prop="orderNum" label="订单数量" sortable="custom" width="150">
            <template slot-scope="scope">
                {{scope.row.orderNum?scope.row.orderNum:0}}
              </template>
            </el-table-column>
            <el-table-column prop="orderMoney" label="订单金额" sortable="custom" width="150">
            <template slot-scope="scope">
                 {{scope.row.orderMoney?scope.row.orderMoney:0}}
              </template>
            </el-table-column>
            <el-table-column prop="memberNum" label="患者数量" sortable="custom" width="150">
               <template slot-scope="scope">
              {{scope.row.memberNum?scope.row.memberNum:0}}
             </template>
            </el-table-column>
 
  <!-- <el-table-column
      prop="creater_name"
      label="外部顾问"  width="120">
   </el-table-column>
     <el-table-column
      prop="creater_phone"
      label="外部顾问手机号" width="150">
   </el-table-column> -->

  <!-- <el-table-column
      prop="up_adviser_name"
      label="内部顾问"  width="120">
   </el-table-column>
     <el-table-column
      prop="up_adviser_phone"
      label="内部顾问手机号" width="150">
   </el-table-column> -->

  <el-table-column
      prop="hospitalName"
      label="医院" width="180">
   </el-table-column>
  <el-table-column
      prop="hospitalDepartment"
      label="科室" width="180">
   </el-table-column>
  <!-- <el-table-column
      prop="phone"
      label="联系电话" width="150">
   </el-table-column>

  <el-table-column
      prop="doctorTitle"
      label="医生职称">
     <template slot-scope="scope" >
{{handledoctorTitle(scope.row.doctorTitle)}}
      </template>

   </el-table-column> -->
     <!-- <el-table-column
      prop="resource_adviser_name"
      label="来源顾问"  width="120">
   </el-table-column>

     <el-table-column
      prop="resource_adviser_phone"
      label="来源顾问手机号"  width="120">
   </el-table-column> -->

  <!-- <el-table-column
      prop="createrTime"
      label="注册日期" width="180">
   </el-table-column> -->
    <el-table-column
      label="操作" fixed="right"  width="140">

     <template slot-scope="scope" >
        <!-- <el-button
          size="mini"
          type="text" @click="handleEdit(scope.$index, scope.row,'update')"
         >编辑</el-button> 
                <el-button size="mini" type="text" @click="doSubmitStatus(scope.$index, scope.row)">{{scope.row.doctorStatus =='USE' ?'停用':''}}{{scope.row.doctorStatus =='STOP' ?'启用':''}}</el-button> -->

             <el-button
          size="mini"
          type="text" @click="doctorGetDoctor(scope.row)"
         >查看药品</el-button>

         <!-- 查看顾问 -->
             <el-button
          size="mini"
          type="text" @click="doctorGetAdivser(scope.row)"
         >查看顾问</el-button>



       <!-- <el-button
          size="mini"
          type="text" @click="doctorGetAdviser(scope.row)"
         >查看代理</el-button> -->
      </template>
   </el-table-column>
  </el-table> 
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="page+1" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>

		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="doctorObj.model"  title="查看药品">
<div v-bouncing="doctorObj.loading">
<el-table border
    :data="doctorObj.YdkDrugList"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="drugName"
      label="通用名"  width="180">
   </el-table-column>
    <el-table-column
          prop="productName"
          label="商品名">
      </el-table-column>
<el-table-column
      prop="manufacturer"
      label="生产厂家">
   </el-table-column>
     <el-table-column
      prop="specification"
      label="规格">
   </el-table-column>
     <el-table-column
      prop="dosageforms"
      label="剂型">
   </el-table-column>

         <el-table-column
      prop="hisCode"
      label="批准文号">
   </el-table-column>

         <el-table-column
      prop="sumQuantity"
      label="数量">
   </el-table-column>

            <el-table-column
      prop="price"
      label="单价">
   </el-table-column>
   
         <el-table-column
      prop="orderMoney"
      label="总金额">
   </el-table-column>
   

</el-table> 

<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="doctorObj.page+1" :page-size="doctorObj.pageSize" :total="doctorObj.total" @current-change="doctorObj.onPageChange">
			</el-pagination>
		</el-col>
</div>
</el-dialog>


		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="doctorAdviserObj.model"  title="查看顾问">
<div v-bouncing="doctorAdviserObj.loading">
<el-table border
    :data="doctorAdviserObj.AdviserInfo
"
    stripe height="600"
    style="width: 100%;">


  <el-table-column  fixed="left"
      prop="adviserName"
      label="顾问姓名">
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
 

</el-table> 

<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :page-size="doctorAdviserObj.pageSize" :total="doctorAdviserObj.total" @current-change="doctorAdviserObj.onPageChange">
			</el-pagination>
		</el-col>
</div>
</el-dialog>

		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="AdviserListModel"  title="查看顾问">



<el-table border
    :data="AdviserList"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="Name"
      label="顾问名" >
   </el-table-column>
    <el-table-column
          prop="phone"
          label="顾问手机号">
      </el-table-column>
<el-table-column
      prop="platform"
      label="归属">
   </el-table-column>
     <el-table-column
      prop="type"
      label="类型">
   </el-table-column>

</el-table> 

</el-dialog>

<updatedoctor ref="updatedoctor" @getdoctorList="getDoctorList" :tableTree="tableTree" :hospitallist="hospitallist"></updatedoctor>



    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import moment from "moment";
import * as indexApi from "../../api/indexApi";
import * as doctorApi from "../../api/doctorApi";

import updatedoctor from "../doctor/updatedoctor";

@Component({
  props: {},
  components: {
    updatedoctor
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  handledoctorTitle(title) {
    switch (title) {
      case "ASSISTANT_PHYSICIAN":
        return "住院医师";
      case "ATTENDING_DOCTOR":
        return "主治医师";
      case "DEPUTY_CHIEF_PHYSICIAN":
        return "副主任医师";
      case "CHIEF_PHYSICIAN":
        return "主任医师";
      default:
        return "";
    }
  }

  handleEdit(index, row, state) {
    (<any>this.$refs.updatedoctor).handleEdit(index, row, state);
  }

  hospitallist = [];
  gethospitalList() {
    doctorApi.queryHospitalList().then(res => {
      if (res["retCode"]) {
        this.hospitallist = res.data.hosipitalList;
      } else {
        this.$alert(res["message"]);
        console.error("数据查询错误");
      }
    });
  }
  tableTree = [];
  getdepartmenttree() {
    doctorApi.querytree().then(res => {
      if (res["retCode"]) {
        this.tableTree = res.data.children;
      } else {
        this.$alert(res["message"]);
        console.error("数据查询错误");
      }
    });
  }

  loading = false;
  orderByStr = "";
  page = 0;
  pageSize = 10;
  total = 0;
  onPageChange(page) {
    this.page = page - 1;
    this.getDoctorList();
  }
  keyword = "";
  phone = "";
  DoctorInfo = [];

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
  doctorStatus = "";
  date=[]
  getDoctorList(filter = null) {

    this.loading = true;
    if (filter) {
      this.page = 0;
    }
    let data = {
      page: this.page,
      pageSize: this.pageSize,
      keyword: this.keyword,
      phone: this.phone,
              startcreateDate: this.date && this.date.length>0? moment(this.date[0]).format("YYYY-MM-DD") + " 00:00:00":"",
        endcreateDate:  this.date && this.date.length>0? moment(this.date[1]).format("YYYY-MM-DD") + " 23:59:59":"",
      doctorStatus: this.doctorStatus,
      orderByStr: this.orderByStr
    };

new Promise(resolve=>{
   indexApi.getDoctorList(data).then(res => {
     resolve()
      if (res["retCode"]) {
        console.log(res.data);
        this.DoctorInfo = res.data.DoctorInfo;
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
    data.ydStartcreateDate = data.startcreateDate;
    data.ydEndcreateDate = data.endcreateDate;
    indexApi.ypStartcreateDate(data).then(res => {
      if (res["retCode"]) {
        if (res.data.AdviserInfo.length > 0) {
             this.giveupOrderNum = res.data.AdviserInfo[0].giveupOrderNum
            ? res.data.AdviserInfo[0].giveupOrderNum
            : 0;
          this.orderMoney = res.data.AdviserInfo[0].orderMoney
            ? res.data.AdviserInfo[0].orderMoney
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
   * 医生数量
   */
  countDoctor = 0;
  getcountDoctor() {
    indexApi.countDoctor({}).then(res => {
      if (res["retCode"]) {
        this.countDoctor = res.data.num;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  /**
   * 医生查药品
   */

  doctorObj = {
    model: false,
    loading: false,
    YdkDrugList: [],
    page: 0,
    pageSize: 10,
    total: 0,
    onPageChange: page => {
      this.doctorObj.page = page - 1;
      this.doctorGetDoctor(this.doctorObj.row);
    },
    row: {}
  };

  doctorGetDoctor(row) {
    this.doctorObj.loading = true;
    this.doctorObj.model = true;
    this.doctorObj.row = row;

    indexApi
      .doctorGetDoctor({
        docterId: row.doctorId
      })
      .then(res => {
        this.doctorObj.loading = false;
        if (res["retCode"]) {
          console.log(res.data);
          this.doctorObj.YdkDrugList = res.data.YdkDrugList;
          this.doctorObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  /**
   * 医生查顾问
   */

  /**
   *
   * 查看医生
   *
   */

  doctorAdviserObj = {
    model: false,
    loading: false,
    AdviserInfo: [],
    page: 0,
    pageSize: 10,
    total: 0,
    onPageChange: page => {
      this.doctorAdviserObj.page = page - 1;
      this.doctorGetAdviser(this.doctorAdviserObj.row);
    },
    row: {}
  };

  doctorGetAdviser(row) {
    this.doctorAdviserObj.loading = true;
    this.doctorAdviserObj.model = true;
    this.doctorAdviserObj.row = row;

    indexApi
      .doctorGetAdviser({
        doctor_id: row.doctorId,
        page: this.doctorAdviserObj.page,
        pageSize: this.doctorAdviserObj.pageSize
      })
      .then(res => {
        this.doctorAdviserObj.loading = false;
        if (res["retCode"]) {
          console.log(res.data);
          this.doctorAdviserObj.AdviserInfo = res.data.AdviserInfo;
          this.doctorAdviserObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  /**
   * 停用启用
   */
  doSubmitStatus(index, row) {
    if (row.doctorStatus == "USE") {
      this.handleSTOP(index, row);
    }
    if (row.doctorStatus == "STOP") {
      this.handleUSE(index, row);
    }
  }

  handleSTOP(index, row) {
    this.$confirm("是否停用该医生?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        doctorApi.setDoctorSTOPstatus(row.doctorId).then(res => {
          if (res["retCode"]) {
            this.getDoctorList();
            this.$message({
              type: "success",
              message: "停用成功!"
            });
          } else {
            if (!res["islogin"]) {
              this.$alert(res["message"]);
            }
            console.error("数据查询错误");
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消停用"
        });
      });
  }

  handleUSE(index, row) {
    this.$confirm("是否启用该医生?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        doctorApi.setDoctorUSEstatus(row.doctorId).then(res => {
          if (res["retCode"]) {
            this.getDoctorList();
            this.$message({
              type: "success",
              message: "启用成功!"
            });
          } else {
            if (!res["islogin"]) {
              this.$alert(res["message"]);
            }
            console.error("数据查询错误");
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消启用"
        });
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
    // 医生处方数量 prescription_num 、
    // 医生订单数量order_num、
    // 医生订单金额order_money、
    // 医生患者数量doctorPatientNum、
    // 时间null
    switch (prop) {
      case "prescriptionNum":
        this.orderByStr = "prescription_num" + desc;
        break;
      case "orderNum":
        this.orderByStr = "order_num" + desc;
        break;
      case "orderMoney":
        this.orderByStr = "order_money" + desc;
        break;
      case "memberNum":
        this.orderByStr = "doctorPatientNum" + desc;
        break;
      default:
        this.orderByStr = "";
        break;
    }
    this.getDoctorList(true);
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
  AdviserList = []
AdviserListModel = false
doctorGetAdivser(row){
    this.AdviserList = []
this.AdviserListModel = true
        indexApi.getAdviserArrByDoctorId({doctorId:row.doctorId}).then(res => {
          if (res["retCode"]) {
            console.log(res.data)
    this.AdviserList = res.data
          } else {
            if (!res["islogin"]) {
              this.$alert(res["message"]);
            }
          }
        });



}

  mounted() {
this.date = [this.getMonth1(),moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"]
  window['mmvue'] = this

    this.getDoctorList();
    this.getcountDoctor();
    this.getdepartmenttree();
    this.gethospitalList();
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