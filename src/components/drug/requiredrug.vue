<template>
    <div v-bouncing="loading">
      <div style="">
          <h3>找药管理
          </h3>
        </div>

 <div style="10px;">
找药数量统计：{{total}}              
            </div>

<div style="padding-bottom:20px;border-bottom:1px #e5e5e5 solid;">
<el-row :gutter="10">
  <el-col :xs="16" :sm="12" :md="8" :lg="5" :xl="5">
   <el-input
  placeholder="手机号码/姓名/药品名" style="margin-top:20px;" v-model="keyword"
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


    <el-col :xs="16" :sm="12" :md="8" :lg="5" :xl="5">
      <el-select v-model="dataType" placeholder="请选择药品归属" style="margin-top:20px;" >
        <el-option value="" label="全部"></el-option>
        <el-option value="TRUTH" label="药品库"></el-option>
        <el-option value="FICTITIOUS" label="虚拟库"></el-option>
        <el-option value="NONENTITY"  label="不在目录"></el-option>
      </el-select>
  </el-col>
  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" >
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="requireDrugList(true)">查询</el-button>
  </el-col>




 


</el-row>
        </div>


<el-table height="600" 
    :data="drugList"
    stripe border
    style="width: 100%;">
       <el-table-column   fixed="left"
      label="药品归属" width="150">
        <template slot-scope="scope">
    <el-tag :type="handledataType1(scope.row.dataType)">{{handledataType(scope.row.dataType)}}</el-tag>

      

      </template>
   </el-table-column>

  <el-table-column
      prop="productName"
      label="商品名" width="150">
   </el-table-column>

     <el-table-column 
      prop="commonName"
      label="通用名" width="150">
   </el-table-column>

     <el-table-column 
      prop="specification"
      label="规格" width="150">
   </el-table-column>


   <el-table-column 
      prop="packingUnit"
      label="包装" width="150">
   </el-table-column>
      <!-- <el-table-column 
      prop="packingQuantity"
      label="包装" width="150">
   </el-table-column> -->

      <el-table-column 
      prop="dosageforms"
      label="剂型" width="150">
   </el-table-column>

      <el-table-column 
      prop="sellingPrice"
      label="售价" width="150">
   </el-table-column>
   
         <el-table-column 
      prop="manufacturer"
      label="厂家" width="150">
   </el-table-column>  

   <el-table-column  
      label="医生/患者" width="150">
      <template slot-scope="scope">
      {{handledrugFlag(scope.row.memberFlag)}}
      </template>
   </el-table-column>

      <el-table-column 
      prop="name"
      label="姓名" width="150">
   </el-table-column>
        <el-table-column 
      prop="phone"
      label="电话" width="150">
   </el-table-column>
         <el-table-column 
      prop="remark" show-overflow-tooltip
      label="备注" width="150">
   </el-table-column>
         <el-table-column 
      prop="queryTime"
      label="创建时间" width="150">
   </el-table-column>
   <el-table-column label="操作" fixed="right"  width="100">
      <template slot-scope="scope">
        <el-button
          size="mini"
        type="text" 
          @click="selectDrug(scope.$index, scope.row)" >查看详情</el-button>
   </template>
    </el-table-column>

<!-- 列表：药品信息（商品名、通用名、规格、包装、剂型、售价、厂家、状态）姓名、手机号码、用户（医生、患者、顾问） -->

</el-table>



	<el-col :span="24" class="toolbar">
			<el-pagination :current-page="page+1" layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>

	<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="detailModel"  title="详情">

<div style="min-height:500px;" class="flex">
<div v-if="this.detail.row['picturesUrlList'] && this.detail.row['picturesUrlList'].length>0" class="flex-1">
  <corpperlabel ref="cropper" :preImageList="detail.row.picturesUrlList1"></corpperlabel>
</div>
<div class="flex-1">
<el-form   label-width="120px" :model="detail.row" class="demo-form-inline">
 <!-- <el-form-item  label="状态：" style="margin:0">
  {{detail.row.drugStatus=='USE'?'可用':'停用'}}
  </el-form-item> -->
   <el-form-item  label="商品名：" style="margin:0">
{{detail.row.productName}}
  </el-form-item>

   <el-form-item  label="通用名：" style="margin:0">
{{detail.row.commonName}}
  </el-form-item>
  
   <el-form-item  label="规格：" style="margin:0">
{{detail.row.specification}}
  </el-form-item>

  
   <el-form-item  label="包装：" style="margin:0">
{{detail.row.packingUnit}}
  </el-form-item>

  
   <el-form-item  label="剂型：" style="margin:0">
{{detail.row.dosageforms}}
  </el-form-item>


<el-form-item  label="厂家：" style="margin:0">
{{detail.row.manufacturer}}
  </el-form-item>

<el-form-item  label="医生/患者：" style="margin:0">
      {{handledrugFlag(detail.row.memberFlag)}}
  </el-form-item>
<el-form-item  label="姓名：" style="margin:0">
{{detail.row.name}}
  </el-form-item>
  <el-form-item  label="电话：" style="margin:0">
{{detail.row.phone}}
  </el-form-item>

  <el-form-item  label="创建时间：" style="margin:0">
{{detail.row.queryTime}}
  </el-form-item>


  <!-- <el-form-item  label="图片：" style="margin:0">
    <img v-for="(item,index) in detail.row.picturesUrlList" :key="item" :src="item" style=" cursor: pointer;margin-right: 10px;width:100px;height:100px;" @click="viewBigIcon(item)"/>
   </el-form-item> -->

</el-form>




<el-form label-width="120px" class="demo-form-inline">
            	<el-form-item label="备注：" prop="remark" >
              					<el-input v-model="detail.remark" type="textarea"  :rows="4" placeholder="请输入备注" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
            	<el-form-item  >
        <el-button
          size="mini"
        type="primary" 
          @click="doRemark()" >保存</el-button>
    		</el-form-item>	
         


</el-form>

</div>

</div>

</el-dialog>


 <el-dialog  :visible.sync="viewBig" width="400px">
      <img :src="bigIcon" style="width:400px;height:400px;margin:-55px -20px -40px" >
    </el-dialog>

    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import moment from "moment";

import corpperlabel from '../transmit/corpperlabel'

@Component({
  props: {},
  components: {
    corpperlabel
  }
})
export default class AddGoods extends Vue {

    viewBigIcon(qrcode) {
    this.bigIcon = qrcode;
    this.viewBig = true;
  }
  bigIcon = "";
  viewBig = false;
handledataType1(dataType){
  switch(dataType){
    case 'TRUTH':
    return 'success';
   case 'FICTITIOUS':
    return 'warning';  
    case 'NONENTITY':
    return 'danger';
    default: return ''
  }
}
handledataType(dataType){
  switch(dataType){
    case 'TRUTH':
    return '药品库';
   case 'FICTITIOUS':
    return '虚拟库';  
    case 'NONENTITY':
    return '不在目录';
    default: return ''
  }
}
  page = 0;
  loading = false;
  total = 0;
  drugList = [];
  pageSize = 10;
  keyword = "";
  onPageChange(page) {
    this.page = page - 1;
    this.requireDrugList();
  }
  date = []
  dataType=""
  requireDrugList(filter = null) {
    if (filter) {
      this.page = 0;
    }
    this.loading = true;
    indexApi
      .requireDrugList({
        keyword: this.keyword,
        startqueryTime:this.date[0]? moment(this.date[0]).format("YYYY-MM-DD") + " 00:00:00":"",
        endqueryTime:  this.date[1]? moment(this.date[1]).format("YYYY-MM-DD") + " 23:59:59":"",
        dataType:this.dataType,
        page: this.page,
        pageSize: this.pageSize
      })
      .then(res => {
        
        if (res["retCode"]) {
          this.drugList = res.data.InquireDrugsRecords;
          this.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
        this.loading = false;
      });
  }
  handledrugFlag(falg) {
    if (falg === "1") {
      return "医生";
    } else {
      return "患者";
    }
  }

  /**
   *
   * 详情
   */
  detailModel = false;
detail={
  row:{},
  remark:""
}
  selectDrug(index, row) {
    this.detail.row = row

    this.detail.row['picturesUrlList1'] = this.detail.row['picturesUrlList'].map(item=>{
      return {
        presImageUrl:item
      }
    })
    
  if(  this.detail.row['picturesUrlList'].length>0){
    (<any>this.$refs.cropper).changePreImageUrl(0)
  }

    this.detail.remark = row.remark;
    this.detailModel = !this.detailModel
  }

  doRemark(){
    this.loading = true
  indexApi
      .updateInquireDrugsRecords({
        allDrugId:this.detail.row['allDrugId'],
        remark: this.detail.remark
      })
      .then(res => {
    this.loading = false
        if (res["retCode"]) {
          this.$message('保存成功')
              this.detailModel = !this.detailModel
              this.requireDrugList()
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
        this.loading = false;
      });
    

  }

  mounted() {
    this.requireDrugList();
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