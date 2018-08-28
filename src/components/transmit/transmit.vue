<template>
    <div v-loading="loading">

        <div style="">
          <h3>转方管理
          </h3>
 <!-- <div style="padding-bottom:20px;">
<span style="margin-right:20px;">平台处方数量统计：{{allprescription}} 个</span>             
<span style="margin-right:20px;">待转方数量：{{notCount}} 个</span>             
            </div> -->
        </div>
  <el-tabs v-model="prescriptionEnums1" type="card" @tab-click="handleClick">
    <el-tab-pane  :label="'未转方（'+notCount+'）'" name="name1">
<div style="padding-bottom:20px;">
<el-row :gutter="10" style="padding-left:80px;">
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input
  placeholder="姓名/处方号/手机号" style="margin-top:20px;"  v-model="key"
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
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getprescriptionList(true)">查询</el-button>
  </el-col>
</el-row>
</div>
<transmittable  :table="prescriptionList"  :operationType="operationType">
</transmittable>
    </el-tab-pane>
    <el-tab-pane :label="'全部（'+allprescription+'）'" name="name2">
<div style="padding-bottom:20px;">
<!-- NOT_TRANSLATED_PRESCRIPTION,            //未转方
ALREADY_TRANSLATED_PRESCRIPTION,        //已转方
FAIL_TRANSLATED_PRESCRIPTION,        //转方失败
REJECT_TRANSLATED_PRESCRIPTION,        //转方退回
ALREADY_TRANSLATED_PRESCRIPTION,        //已转方

ALREADY_AUDIT_PRESCRIPTION,             //已审方
FAIL_AUDIT_PRESCRIPTION,             //审方失败
REJECT_AUDIT_PRESCRIPTION,//审方退回 -->


<el-row :gutter="10" style="margin-top:20px;">
	 <el-form label-width="80px" :inline="true" >
  <el-col :xs="24" :sm="14" :md="12" :lg="12" :xl="12">
                <el-form-item  label="状态"  style="margin:0">
  <el-select v-model="prescriptionEnums"  >
      <el-option value="" label="全部"></el-option>
      <el-option value="NOT_TRANSLATED_PRESCRIPTION" label="未转方"></el-option>
      <el-option value="ALREADY_TRANSLATED_PRESCRIPTION" label="已转方"></el-option>
      <!-- <el-option value="FAIL_TRANSLATED_PRESCRIPTION" label="转方失败"></el-option> -->
            <el-option value="ALREADY_AUDIT_PRESCRIPTION" label="已审方"></el-option>
      <el-option value="REJECT_TRANSLATED_PRESCRIPTION" label="已驳回开方"></el-option>
      <el-option value="REJECT_AUDIT_PRESCRIPTION" label="审方退回"></el-option>
    </el-select>
				</el-form-item>

  </el-col>
        </el-form>
</el-row>





<el-row :gutter="10" style="padding-left:80px;">

 
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input
  placeholder="姓名/处方号/手机号" style="margin-top:20px;"  v-model="key"
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
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getprescriptionList(true)">查询</el-button>
  </el-col>

</el-row>
</div>

<transmittable  :table="prescriptionList" :operationType="operationType">
</transmittable>
    </el-tab-pane>

  </el-tabs>

  
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
import * as indexApi from "../../api/indexApi";
import transmittable from "./transmittable";
import moment from "moment";

@Component({
  props: {},
  components: {
    transmittable
    // categoryView,
  }
})
export default class AddGoods extends Vue {

  get notCount(){
    return this.countPreByStatuObj['data5']?this.countPreByStatuObj['data5'].count:0
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
  countPreByStatuObj = {}
countPreByStatu() {
    indexApi.countPreByStatu({}).then(res => {
      if (res["retCode"]) {
        this.countPreByStatuObj = res.data;
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
    this.getprescriptionList();
  }
  handleClick(e) {
    
    this.page = 0;
          if(this.prescriptionEnums1 == 'name2'){
       this.prescriptionEnums = ''
    }
    this.getprescriptionList();
  }

  prescriptionList = [];
  prescriptionEnums = "";
  prescriptionEnums1 = "name1";
  
  
  startDate = "";
  endDate = "";
  key = "";
  operationType= 'Translators'
     loading = false
  
  getprescriptionList(filter=null) {
    if(filter){
      this.page = 0
    }
   if(this.prescriptionEnums1 == 'name1'){
       this.prescriptionEnums = 'NOT_TRANSLATED_OR_REJECT_AUDIT_PRESCRIPTION'
    }

    let startCreatTime = "";
    let endCreatTime = "";
    if ((this.startDate || "") != "") {
      startCreatTime =
        moment(this.startDate).format("YYYY-MM-DD")  + " 00:00:00";
    }
    if ((this.endDate || "") != "") {
      endCreatTime = moment(this.endDate).format("YYYY-MM-DD")  + " 23:59:59";
    }
    let data = { 
        prescriptionEnums: this.prescriptionEnums,
      //  operationType :this.operationType,
        key: this.key,
        startCreatTime: startCreatTime,
        endCreatTime: endCreatTime,
      }
      sessionStorage.tranObject = JSON.stringify(data)
      Object.assign(data,{   page: this.page,
        pageSize: this.pageSize})

        this.loading = true
    indexApi
      .findPrescriptionByType(data)
      .then(res => {
        this.loading = false
        
        if (res["retCode"]) {
          console.log('-----',res.data);
          this.prescriptionList = res.data.list;
          this.total = res.data.page.total;
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
  }
  mounted() {

    this.allPrescription();
    this.getprescriptionList();
    this.countPreByStatu();
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