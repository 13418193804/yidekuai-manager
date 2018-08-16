<template>
    <div>

        <div style="border-bottom:1px #e5e5e5 solid;">
          <h3>处方管理
          </h3>
          
 <div style="10px;">
平台处方数量统计：{{allprescription}}              
            </div>
<div style="padding-bottom:20px;">
<el-row :gutter="10">
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input
  placeholder="请输入处方编号" style="margin-top:20px;"
  clearable>
</el-input>
  </el-col>
 <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input
  placeholder="请输入订单编号" style="margin-top:20px;"
  clearable>
</el-input>
  </el-col>


  <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">

<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getpatientList()">查询</el-button>
  </el-col>

</el-row>
</div>
        </div>



<el-table
    :data="prescriptionList"
    stripe
    style="width: 100%">

  <el-table-column
      prop="presId"
      label="处方编号">
   </el-table-column>
  <el-table-column
      prop="memberName"
      label="患者姓名">
   </el-table-column>
   
    <el-table-column
      prop="docterName"
      label="开方医生" width="150">
   </el-table-column>


   <el-table-column label="操作" fixed="right"  width="300">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          @click="handleDelete(scope.$index, scope.row)">查看处方</el-button>
          <el-button
          size="mini"
          type="text"
          @click="handleDelete(scope.$index, scope.row)">查看订单</el-button>
          <el-button
          size="mini"
          type="text"
          @click="changeModel(scope.row)">编辑</el-button>
          

          <el-button
          size="mini"
          type="text"
          @click="doUpdateStatus(scope.$index, scope.row)">{{scope.row.member_status == 'USE'?'停用':'启用'}}</el-button>
          
      </template>
    </el-table-column>
</el-table>



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
  allprescription = 0
  allPrescription (){
 indexApi.allPrescription().then(res => {
      if (res["retCode"]) {
        console.log(res.data);
        this.allprescription =res.data
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  prescriptionList = []
  getprescriptionList(){
    
     indexApi.prescriptionList({}).then(res => {
      if (res["retCode"]) {
        console.log(res.data);
        this.prescriptionList = res.data
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  mounted() {
this.allPrescription()
    this.getprescriptionList()
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