<template>
    <div v-bouncing="loading">

        <div style="">
          <h3>审方管理
          </h3>
          
 <div style="padding-bottom:20px;">
<span style="margin-right:20px;">平台处方数量统计：{{allprescription}} 个</span>             
<span style="margin-right:20px;">待审方数量：{{notCount}} 个</span>             
            </div>



        </div>
        

<!-- type="card" -->
  <el-tabs v-model="prescriptionEnums1"  @tab-click="handleClick">
    
    <el-tab-pane  :label="'未审方（'+notCount+'）'" name="name1">


<div style="padding-bottom:20px;">
      
<el-row :gutter="10" style="padding-left:80px;">
  <el-col :xs="24" :sm="16" :md="8" :lg="6" :xl="6">
   <el-input
  placeholder="姓名/处方号/手机号" style="margin-top:20px;" v-model="key"
  clearable>
</el-input>
  </el-col>

<!--
ALREADY_TRANSLATED_PRESCRIPTION,        //已转方
ALREADY_AUDIT_PRESCRIPTION,             //已审方
FAIL_AUDIT_PRESCRIPTION,             //审方失败
REJECT_AUDIT_PRESCRIPTION,             //审方退回 -->


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
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getprescriptionList(true)">查询</el-button>
  </el-col>

</el-row>
 
</div>

<transmittable @getSessionStatus="getSessionStatus"  ref="transmittable" @getprescriptionList="getprescriptionList" :table="prescriptionList"  :operationType="operationType">
</transmittable>
    </el-tab-pane>
   <el-tab-pane :label="'在线开方24h内（'+online+'）'" name="name3">
      <transmittable @getSessionStatus="getSessionStatus"  @getprescriptionList="getprescriptionList" ref="transmittable"  :table="prescriptionList" :operationType="operationType">
</transmittable>

    </el-tab-pane>
  <el-tab-pane   :label="'全部（'+allprescription+'）'" name="name2"  >


<div style="padding-bottom:20px;">

  <el-row :gutter="10" style="margin-top:20px;">
	 <el-form label-width="80px" :inline="true" >
  <el-col :xs="24" :sm="14" :md="12" :lg="12" :xl="12">
                <el-form-item  label="状态" style="margin:0">
  <el-select v-model="prescriptionEnums"  >
       <el-option value="" label="全部"></el-option>
             <el-option value="NOT_TRANSLATED_PRESCRIPTION" label="未转方"></el-option>
     <el-option value="ALREADY_TRANSLATED_PRESCRIPTION" label="未审方"></el-option>
      <el-option value="ALREADY_AUDIT_PRESCRIPTION" label="已审方"></el-option>
      <!-- <el-option value="FAIL_AUDIT_PRESCRIPTION" label="审方失败"></el-option> -->
            <el-option value="REJECT_TRANSLATED_PRESCRIPTION" label="已驳回开方"></el-option>
      <el-option value="REJECT_AUDIT_PRESCRIPTION" label="已驳回转方"></el-option>
    </el-select>
				</el-form-item>

  </el-col>
        </el-form>
</el-row>

<el-row :gutter="10" style="padding-left:80px;">
  <el-col :xs="24" :sm="16" :md="8" :lg="6" :xl="6">
   <el-input
  placeholder="姓名/处方号/手机号" style="margin-top:20px;" v-model="key"
  clearable>
</el-input>
  </el-col>

<!--
ALREADY_TRANSLATED_PRESCRIPTION,        //已转方
ALREADY_AUDIT_PRESCRIPTION,             //已审方
FAIL_AUDIT_PRESCRIPTION,             //审方失败
REJECT_AUDIT_PRESCRIPTION,             //审方退回 -->


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
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getprescriptionList(true)">查询</el-button>
  </el-col>

</el-row>
 
</div>


<transmittable @getSessionStatus="getSessionStatus"  ref="transmittable" @getprescriptionList="getprescriptionList" :table="prescriptionList" :prescriptionEnums="prescriptionEnums" :operationType="operationType">
</transmittable>
    </el-tab-pane>


  </el-tabs>



		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" background :current-page="page+1" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>



    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import transmittable from "../transmit/transmittable";
import moment from "moment";

@Component({
  props: {},
  components: {
    transmittable
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  allprescription = 0;
  allPrescription() {
    indexApi.allPrescription().then(res => {
      if (res["retCode"]) {
        console.log(res.data);
        this.allprescription = res.data.All;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  get notCount() {
    return this.countPreByStatuObj["data2"]
      ? this.countPreByStatuObj["data2"].count
      : 0;
  }

  get online() {
    return this.countPreByStatuObj["data6"]
      ? this.countPreByStatuObj["data6"].count
      : 0;
  }
  countPreByStatuObj = {};
  countPreByStatu() {
    indexApi.countPreByStatu({}).then(res => {
      if (res["retCode"]) {
        this.countPreByStatuObj = res.data;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  prescriptionEnums1 = "name1";

  page = 0;
  pageSize = 10;
  total = 100;
  onPageChange(page) {
    this.page = page - 1;
    this.getprescriptionList();
  }
  handleClick(e) {
    this.page = 0;
    this.date = ["", ""];
    this.key = "";
    this.page = 0;
    if (this.prescriptionEnums1 == "name2") {
      this.prescriptionEnums = "";
    }
    this.getprescriptionList();
  }
  prescriptionList = [];
  prescriptionEnums = "";
  date = [];
  key = "";
  operationType = "Auditor";
  loading = false;
  getprescriptionList(filter = null) {
    if (filter) {
      this.page = 0;
    }

    let data = {
      startCreatTime:
        this.date && this.date.length > 0
          ? moment(this.date[0]).format("YYYY-MM-DD") + " 00:00:00"
          : "",
      endCreatTime:
        this.date && this.date.length > 0
          ? moment(this.date[1]).format("YYYY-MM-DD") + " 23:59:59"
          : "",
      key: this.key
    };

    if (this.prescriptionEnums1 == "name1") {
      this.prescriptionEnums = "ALREADY_TRANSLATED_PRESCRIPTION";
      Object.assign(data, {
        operationType: this.operationType
      });
    }

    if (this.prescriptionEnums1 == "name3") {
      Object.assign(data, { onlineFlag: 1 });
    }

    Object.assign(data, {
      prescriptionEnums: this.prescriptionEnums
    });

    sessionStorage.auditObject = JSON.stringify(data);
    Object.assign(data, {
      page: this.page,
      pageSize: this.pageSize
    });
    this.loading = true;
    indexApi.findPrescriptionByType(data).then(res => {
      this.loading = false;
      // this.$emit('updateYdkPrescriptionStatusNum','NEW_PRESCRIPTION');
      this.countPreByStatu();
      if (res["retCode"]) {
        console.log(res.data);
        this.prescriptionList = res.data.list;
        this.total = res.data.page.total;
                this.handleScroll()
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  getSessionStatus(callback){
callback({
  fatherStatus:this.prescriptionEnums1,
  page:this.page,
  scrollTop:document.getElementById('scrollView').scrollTop.toString(),
  flag:'audit_'
})
}
handleScroll(){
    if((sessionStorage.audit_scrollTop||'')!==''){
      this.$nextTick(()=>{
          document.getElementById('scrollView').scrollTop  = parseInt(sessionStorage.audit_scrollTop)
          sessionStorage.removeItem('audit_page')
          sessionStorage.removeItem('audit_scrollTop')
          sessionStorage.removeItem('audit_fatherStatus')
          })
    }
}


  mounted() {
          if((sessionStorage.audit_fatherStatus||'') !== '' ){
      this.prescriptionEnums1 = sessionStorage.audit_fatherStatus
      this.page = parseInt(sessionStorage.audit_page)
    }
    this.allPrescription();
    this.getprescriptionList();
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