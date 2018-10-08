<template>
    <!-- <div v-bouncing="loading"> -->

      <div v-bouncing="loading" >
    <div style="font-size:14px;color:#666;">
  
  
        <div style="border-bottom:1px #e5e5e5 solid;margin-bottom:50px;">
          <h3>主页
          </h3>
          </div>
        <div style="display:flex;align-items:center;margin-bottom:30px;">
<div class="block">
    <span class="demonstration">时间</span>
    <el-date-picker
      v-model="date"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
    </el-date-picker>
  </div>
<el-button style="margin-left:20px;" @click="doQuery()">查询</el-button>   
</div>
      

              </div>

<el-row :gutter="24" v-if="model">
  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
    <el-card shadow="always" style="padding:0;margin:0 10px 30px;">
      <div slot="header" class="clearfix" style="text-align:center;font-size: 16px;color: #303133;">
    <span>新增处方</span>
  </div>
    <div class="el-card__body" style="text-align:center; font-size: 30px;color: #303133;">
      {{preCreatTime}}
      </div>
    </el-card>
  </el-col>



  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
    <el-card shadow="always" style="padding:0;margin:0 10px 30px;">
      <div slot="header" class="clearfix" style="text-align:center;font-size: 16px;color: #303133;">
    <span>新增订单</span>
  </div>
    <div class="el-card__body" style="text-align:center; font-size: 30px;color: #303133;">
      {{preAuditing}}
      </div>
    </el-card>
  </el-col>

  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
    <el-card shadow="always" style="padding:0;margin:0 10px 30px;">
      <div slot="header" class="clearfix" style="text-align:center;font-size: 16px;color: #303133;">
    <span>医生入驻</span>
  </div>
    <div class="el-card__body" style="text-align:center; font-size: 30px;color: #303133;">
      {{creatDoctorTime}}
      </div>
    </el-card>
  </el-col>
  
    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
    <el-card shadow="always" style="padding:0;margin:0 10px 30px;">
      <div slot="header" class="clearfix" style="text-align:center;font-size: 16px;color: #303133;">
    <span>患者入驻</span>
  </div>
    <div class="el-card__body" style="text-align:center; font-size: 30px;color: #303133;">
      {{patientRegisterDate}}
      </div>
    </el-card>
  </el-col>





</el-row>



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
export default class AddGoods extends Vue {
  date = [];
  model = false;
  pickerOptions2 = {
    shortcuts: [
      {
        text: "最近一周",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit("pick", [start, end]);
        }
      },
      {
        text: "最近一个月",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit("pick", [start, end]);
        }
      },
      {
        text: "最近三个月",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit("pick", [start, end]);
        }
      }
    ]
  };
creatDoctorTime = 0
patientRegisterDate=0
preCreatTime=0
 preAuditing = 0
 loading= false
  doQuery() {


    if (!this.date || this.date.length !== 2) {
      this.$message("请选择时间");
      return;
    }

    let starttime = moment(this.date[0]).format("YYYY-MM-DD") + " 00:00:00";
    let endtime = moment(this.date[1]).format("YYYY-MM-DD") + " 23:59:59";
   this.loading = true

    indexApi
      .doQueryData({
        startTimeStr: starttime,
        endTimeStr: endtime
      })
      .then(res => {
    this.loading= false
        
        // console.log('首页测登陆')
        if (res["retCode"]) {
          this.model = true

        this.creatDoctorTime =res.data.creatDoctorTime
this.patientRegisterDate=res.data.patientRegisterDate
this.preCreatTime=res.data.preCreatTime
this.preAuditing = res.data.preAuditing

        } else {
          console.log(res)
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
  }

  mounted() {
    this.date = [new Date(),new Date()]
    this.doQuery()

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