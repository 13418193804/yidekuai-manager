<template>
    <div v-loading="backLoad">
       
       <div style="display:flex;    align-items: center;padding:20px 0;">

      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/transmit' }" style="font-weight: 600; font-size:20px;color:#2c3e50;"><span class="fllll" style="cursor: pointer;">转方管理</span></el-breadcrumb-item>
  <el-breadcrumb-item  style="font-size:16px;line-height:20px;color:#2c3e50;"><span class="fllll" >转方工作台</span></el-breadcrumb-item>
</el-breadcrumb>

        </div>
         <div >
<span style="margin-right:10px">平台处方数量统计 {{allprescription}} 个</span>             
<span > 待转方数量 {{notCount}} 个</span>    
            </div>



<div style="text-align:right;float:right;">
     <el-button size="small" type="primary" @click="getCountForList('shang')" :disabled="leftDis"  icon="el-icon-arrow-left">上一条</el-button>
                 <el-button size="small" type="primary" @click="getCountForList('xia')" :disabled="rightDis">下一条<i class="el-icon-arrow-right"></i></el-button>
</div>


    <div class="flex flex-warp-justify" style="margin-top:10px;">
  <h4 style="margin:0">处方状态：</h4>
<div>
    {{ handleStatus(prodetail.presState)  }}
</div>
</div>
<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;">
    <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" >
    开方时间：{{prodetail.createDate}}
    </div>
     <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" >
    医生给患者备注：{{prodetail.patientRemake}}
    </div>
    <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" >
    医生给转方备注：{{prodetail.remark}}
    </div>
    </div>

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;">
     <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState !=  'NOT_TRANSLATED_PRESCRIPTION'">
    转方时间：{{prodetail.transDate}}
    </div>
      <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState !=  'NOT_TRANSLATED_PRESCRIPTION'">
    转方医生：{{prodetail.transDocName}}
    </div>
   <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState !=  'NOT_TRANSLATED_PRESCRIPTION'">
    转方备注：{{prodetail.transRemark}}
    </div>
    </div> 

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;">
      <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState ==  'REJECT_TRANSLATED_PRESCRIPTION'">
    转方退回时间：{{prodetail.rejectTransTime}}
    </div>
      <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState ==  'REJECT_TRANSLATED_PRESCRIPTION'">
    转方退回医生：{{prodetail.rejectTranName}}
    </div>
    
  <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState ==  'REJECT_TRANSLATED_PRESCRIPTION'">
    转方退回原因：{{prodetail.returnReason}}
    </div>




<!-- 退回医生名字 -->

    
    </div>

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;">
    <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && prodetail.presState !=  'REJECT_AUDIT_PRESCRIPTION'  && prodetail.presState != 'REJECT_TRANSLATED_PRESCRIPTION'&& prodetail.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方时间：{{prodetail.auditingDate}}
    </div>
   <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && prodetail.presState != 'REJECT_AUDIT_PRESCRIPTION' &&  prodetail.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方医生：{{prodetail.transDocName}}
    </div>
   <!-- <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && prodetail.presState != 'REJECT_AUDIT_PRESCRIPTION' &&  prodetail.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方备注：{{prodetail.auditingRemake}}
    </div> -->
    </div>

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;">
      <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if="prodetail.presState == 'REJECT_AUDIT_PRESCRIPTION' ||prodetail.rejectAuditTime">
    审方退回时间：{{prodetail.rejectAuditTime}}
    </div>
   <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if="prodetail.presState == 'REJECT_AUDIT_PRESCRIPTION' ||prodetail.rejectAuditTime">
    审方退回医生：{{prodetail.rejectAuditName}}
    </div>
   <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if="prodetail.presState == 'REJECT_AUDIT_PRESCRIPTION' || prodetail.rejectAuditTime">
    审方退回原因：{{prodetail.rejectAuditReason}}
    </div>
    </div>


 





<div v-for="(item,index) in prodeInfo">
<h4 style="margin: 10px 0;">{{index == 0?'患者信息':'医生信息'}}</h4>
<div style="display:flex;    flex-wrap: wrap;margin-bottom:10px;" >
  <div style=" margin-top:10px;margin-right:10px;" v-for="items in item">
<span>{{items.title}}</span>
<span>{{prodetail[items.value]}}</span>
</div>
</div>
</div>

<el-row :gutter="24"  style="padding:0 0 20px;">
  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
<corpperlabel ref="cropper" :preImageList="preImageList"></corpperlabel>


      <!-- <div style="display: flex;align-items: center;height: 60vh;min-width:500px;
    justify-content: center;    overflow: hidden;
   ">
                   <img :src="preImageList[preIndex]?preImageList[preIndex].presImageUrl:''"/>

      </div> -->



  </el-col>
  <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
	 <el-form label-width="120px">

                <!-- <el-form-item  >
                 <el-button size="medium" type="primary" @click="changeModel()">选择药品</el-button>
				</el-form-item> -->

				<el-form-item label="药品：" >
 <el-select style="width:100%;"
    v-model="drug.id"
    filterable clearable
    remote
    placeholder="请输入药品"
    :remote-method="remoteMethod"
    :loading="loading" @change="selectDrug">
    <el-option
      v-for="item in options4"
      :key="item.id"
      :label="item.commonName +'/' +item.productName+'/'+item.specification +'/' +item.manufacturer "
      :value="item.id">
    </el-option>
  </el-select>



                       <!-- <el-input v-model="drug.commonName"
  placeholder="请选择药品"   disabled
  clearable>
</el-input> -->


				</el-form-item>		
            
	<!-- <el-form-item label="药品规格：" >
 <el-select style="width:100%;"
    v-model="drug.specification"
    placeholder="请输入药品规格"
    :loading="loading" 
    @change="selectSpecification">
    <el-option
      v-for="item in specificationList"
      :key="item.specification"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
				</el-form-item>	 -->
           <!-- <el-input v-model="drug.specification"
  placeholder="请输入药品规格"  
  clearable>
</el-input> -->
          
                  <el-form-item label="供应商：" >
                    <el-select style="width:100%;"
    v-model="drug.partnerObj"
    placeholder="请输入供应商"
    :loading="loading" @change="changePartnerName"
    >
    <!-- @change="selectSpecification" -->
    <el-option
      v-for="item in partnerNameList"
      :key="item"
      :label="item.partnerName"
      :value="item">
    </el-option>
    
  </el-select>



<!-- 
                      <el-input v-model="drug.manufacturer"
  placeholder="请输入供应商"  
  clearable>
</el-input> -->
				</el-form-item>		


               <el-form-item label="单位：" >
                    <el-select style="width:100%;"
    v-model="drug.packing_unit"
    placeholder="请输入单位"
    :loading="loading"
    >
    <!-- @change="selectSpecification" -->
    <el-option
      v-for="item in packingUnitList"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
    
  </el-select>



<!-- 
                      <el-input v-model="drug.manufacturer"
  placeholder="请输入供应商"  
  clearable>
</el-input> -->
				</el-form-item>		


       <el-form-item label="剂型：" >
                    <el-select style="width:100%;"
    v-model="drug.dosageforms"
    placeholder="请输入剂型"
    :loading="loading" 
    >
    <!-- @change="selectSpecification" -->
    <el-option
      v-for="item in dosageformsList"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
    
  </el-select>



<!-- 
                      <el-input v-model="drug.manufacturer"
  placeholder="请输入供应商"  
  clearable>
</el-input> -->
				</el-form-item>		


                  <el-form-item label="用法：" >

 <!-- <el-select
    v-model="drug.usages"
    filterable
        
    placeholder="请输入用法"
    :loading="loading" >
    <el-option
      v-for="item in usagesList"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select> -->




    <!-- <el-input v-model="drug.usages"
  placeholder="请输入用法"  
  clearable>
</el-input> -->

<el-autocomplete style="width:100%;"
      class="inline-input"
      v-model="drug.usages"
      :fetch-suggestions="querySearch1"
      placeholder="请输入用法"
    ></el-autocomplete>



				</el-form-item>		

         <el-form-item label="单次用量：" >
 <!-- <el-select
    v-model="drug.dosage"
    filterable     
    placeholder="请输入用量"
    :loading="loading" >
    <el-option
      v-for="item in dosageList"
      :key="item"
      :label="item"
      :value="item">dosage
    </el-option>
  </el-select> -->
  
                      <!-- <el-input v-model="drug.dosage"
  placeholder="请输入单次用量"  
  clearable>
</el-input> -->


<el-autocomplete style="width:100%;"
      class="inline-input"
      v-model="drug.dosage"
      :fetch-suggestions="querySearch2"
      placeholder="请输入单次用量"
    ></el-autocomplete>




				</el-form-item>		
         <el-form-item label="频次：" >
 <!-- <el-select
    v-model="drug.frequency"
    filterable     
    placeholder="请输入频次"
    :loading="loading" >
    <el-option
      v-for="item in frequencyList"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select> -->
           
                      <!-- <el-input v-model="drug.frequency"
  placeholder="请输入频次"  
  clearable>
</el-input> -->


<el-autocomplete style="width:100%;"
      class="inline-input"
      v-model="drug.frequency"
      :fetch-suggestions="querySearch3"
      placeholder="请输入频次" clearable
    ></el-autocomplete>



				</el-form-item>	



      
                    <el-form-item label="数量：" >
                      <el-input v-model="drug.quantity"
  placeholder="请输入数量"  >
</el-input>
	</el-form-item>

      <el-form-item label="药品价格：" >
                  <div style="display:flex;">
                  <div style="flex:1;margin-right:20px">
                    
                      <el-input v-model="drug.price"
  placeholder="请输入药品价格"  :disabled="editPrice"
  >
</el-input>
</div>
                 <el-button  style="" @click="editPrice =!editPrice" >{{editPrice ?'编辑':'保存'}}</el-button>
</div>
				</el-form-item>		



    <el-form-item label="使用说明：" >
                      <el-input    type="textarea" v-model="instructions"  :rows="4"
  placeholder="请输入使用说明"   style="max-width:400px;"
  >
</el-input>
				</el-form-item>	
  


                    <el-form-item >
                 <el-button size="mini" type="primary" @click="docreateDrug()" v-loading="loading">提交</el-button>
				</el-form-item>	
</el-form>
  </el-col>
  </el-row>
<div style="border-bottom:1px #e5e5e5 solid;padding:10px 0;">
</div>
<el-table border
    :data="preDrugList"
    stripe
    style="width: 100%">
 
 <el-table-column  fixed="left"
      prop="hisCode"
      label="批准文号">
   </el-table-column>
  <el-table-column
      prop="drugName"
      label="药品名称">
   </el-table-column>
  <el-table-column
      prop="partnerName"
      label="供应商">
   </el-table-column>

  <el-table-column
      prop="packingUnit"
      label="单位">
   </el-table-column>
   
  <el-table-column
      prop="dosageforms"
      label="剂型">
   </el-table-column>


  <el-table-column
      prop="specification"
      label="药品规格">
   </el-table-column>

 <el-table-column
      prop="usages"
      label="用法">
   </el-table-column>
 
   
 <el-table-column
      prop="dosage"
      label="用量">
   </el-table-column>

  <el-table-column
      prop="instructions"
      label="使用说明">
   </el-table-column>

  <el-table-column
      prop="frequency"
      label="频次">
   </el-table-column>

  <el-table-column
      prop="quantity"
      label="数量">
   </el-table-column>

  <el-table-column
      prop="price"
      label="药品价格">
   </el-table-column>
   
  <el-table-column
      prop="shouldpay"
      label="药品合计">
   </el-table-column>



  <el-table-column
      prop="createDate"
      label="提交时间">
   </el-table-column>



   <el-table-column label="操作" fixed="right"  width="100">
      <template slot-scope="scope">

        <el-button
          size="mini"
        type="text" icon="el-icon-delete" 
          @click="deletePreDrug(scope.$index, scope.row)" >删除</el-button>
   </template>
    </el-table-column>

</el-table>

<div style="text-align:right;padding:15px">

 <el-input
  type="textarea"
  :rows="4"
  placeholder="诊断"
  v-model="diagnosis" style=""/>
</div>
<div style="text-align:right;padding:15px">

 <el-input
  type="textarea"
  :rows="4"
  placeholder="转方备注/退回原因"
  v-model="tranRemake" style=""/>
</div>


  <div style="    text-align: right;
    margin-right: 20px;">
  <div>治疗服务费：<span style="color:red" >￥{{serviceMoney}}</span></div>
      <div>药品合计：<span style="color:red" >￥{{presscriptionMoney}}</span></div>
  <div>合计：<span style="color:red" >￥{{orderMoney}}</span></div>
</div>

<div style="    display: flex;
    justify-content: space-between;padding:15px">
<div>
  <el-button  type="text" @click="doSubmit()" >退回</el-button>
</div>
 
<div>
 
                 <el-button type="primary" @click="dotransmit()" >转方</el-button>
              
</div>

 
</div>




		<el-dialog width= "70vw" :close-on-click-modal="false" :visible.sync="filterdrugModel"  title="选择药品">
      <filterdrug ref="filterdrug" :transmitType="true" @selectRow="selectRow()"></filterdrug>
</el-dialog>









    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Prop } from "vue-property-decorator";
import * as indexApi from "../../api/indexApi";
import filterdrug from "../drug/filterdrug";
import corpperlabel from "./corpperlabel";

@Component({
  props: {},
  components: {
    filterdrug,
    corpperlabel
  }
})
export default class AddGoods extends Vue {

    
//频次建议
querySearch3(queryString, cb) {
    var restaurants = this.frequencyList;
    var results = queryString
      ? restaurants.filter(this.createFilter(queryString))
      : restaurants;
    // 调用 callback 返回建议列表的数据
    let a = results.map(item => {
      return { value: item, label: item };
    });
    cb(a);
  }
//单次用量建议
querySearch2(queryString, cb) {
    var restaurants = this.dosageList;
    var results = queryString
      ? restaurants.filter(this.createFilter(queryString))
      : restaurants;
    // 调用 callback 返回建议列表的数据
    let a = results.map(item => {
      return { value: item, label: item };
    });
    cb(a);
  }
//用法建议
  querySearch1(queryString, cb) {
    var restaurants = this.usagesList;
    var results = queryString
      ? restaurants.filter(this.createFilter(queryString))
      : restaurants;
    // 调用 callback 返回建议列表的数据
    let a = results.map(item => {
      return { value: item, label: item };
    });
    cb(a);
  }





  createFilter(queryString) {
    return restaurant => {
      return restaurant.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    };
  }
  handleSelect(item) {
    console.log(item);
  }
  editPrice = true;
  prodeInfo = [
    [
      { title: "姓名：", value: "memberName" },
      { title: "性别：", value: "patientSex" },
      { title: "年龄：", value: "memberAge" },
      { title: "手机号：", value: "memberPhone" },
      { title: "地址：", value: "consigneeAddress" }
    ],
    [
      { title: "医生医院：", value: "hospitalName" },
      { title: "科室：", value: "docterDept" },
      { title: "医生姓名：", value: "docterName" },
      { title: "医生电话：", value: "doctorMobile" },
         {title:'诊断：',value:'diagnose'},
    ]
  ];

  selectDrug(drugId) {
    this.drug = {};
    let a = this.options4.filter(item => {
      return drugId == item.id;
    });

    this.drug["id"] = a[0].id;
    this.drug["commonName"] = a[0].commonName;
    this.drug["hisCode"] = a[0].hisCode;
    this.drug["specification"] = a[0].specification;
    this.drug["price"] = a[0].sellingPrice;
    this.drug["primarykeyID"] = a[0].id;
    //清空数据
    this.commonList();
  }
  // selectSpecification() {

  //   // 清空数据
  //   this.commonList();
  // }
  changePartnerName() {
    console.log("改变供应商");
    // 清空数据
    this.commonList();
  }

  usagesList = [];
  frequencyList = [];
  backLoad = false;
  dosageList = [];
  packingUnitList = [];
  dosageformsList = [];
  commonList() {
    let data = {
      commonName: this.drug.commonName
    };
    if (this.drug.specification) {
      Object.assign(data, { specification: this.drug.specification });
    }

    if (this.drug.partnerObj) {
      Object.assign(data, { partnerName: this.drug.partnerObj.partnerName });
    }

    indexApi.getGrugListZhuanFang(data).then(res => {
      if (res["retCode"]) {
        // this.options4 = res.data.YdkDrugList;
        console.log(res.data);
        // //规格
        // if (res.data.specificationList) {
        //   // if(res.data.specificationList.length>0){
        //   // this.drug.specification = res.data.specificationList[0]
        //   // }
        //   this.specificationList = res.data.specificationList;
        // }

        // 供应商
        if (res.data.partnerNameList) {
          this.partnerNameList = res.data.partnerNameList;
          if (res.data.partnerNameList[0] && !this.drug.partnerObj) {
            this.drug.partnerObj = res.data.partnerNameList[0];
            this.commonList();
          }
        }

        // 单位
        if (res.data.packingUnitList) {
          this.packingUnitList = res.data.packingUnitList;
          if (res.data.packingUnitList[0]) {
            this.drug["packing_unit"] = res.data.packingUnitList[0];
          }
        }

        // 剂型
        if (res.data.dosageformsList) {
          this.dosageformsList = res.data.dosageformsList;
          if (res.data.dosageformsList[0]) {
            this.drug["dosageforms"] = res.data.dosageformsList[0];
          }
        }

        // 用法
        if (res.data.usagesList) {
          this.usagesList = res.data.usagesList;
          if (res.data.usagesList[0]) {
            this.drug["usages"] = res.data.usagesList[0];
          }
        }

        // 用量
        if (res.data.dosageList) {
          this.dosageList = res.data.dosageList;
          if (res.data.dosageList[0]) {
            console.log(this.drug);
            this.drug["dosage"] = res.data.dosageList[0];
            console.log(this.drug);
          }
        }

        // 频次
        if (res.data.frequencyList) {
          this.frequencyList = res.data.frequencyList;
          if (res.data.frequencyList[0]) {
            this.drug["frequency"] = res.data.frequencyList[0];
          }
        }
        this.drug = Object.assign({}, this.drug);
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  filterdrugModel = false;
  changeModel() {
    this.filterdrugModel = !this.filterdrugModel;
  }

  drug: any = {};

  allprescription = 0;

  allPrescription() {
    indexApi.allPrescription().then(res => {
      if (res["retCode"]) {
        console.log(res.data);
        this.allprescription = res.data;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  get notCount() {
    return this.countPreByStatuObj["data5"]
      ? this.countPreByStatuObj["data5"].count
      : 0;
  }
  instructions = "";
  handleStatus(status) {
    switch (status) {
      case "NOT_TRANSLATED_PRESCRIPTION":
        return "未转方";
      case "ALREADY_TRANSLATED_PRESCRIPTION":
        return "已转方";
      case "FAIL_TRANSLATED_PRESCRIPTION":
        return "转方失败";
      case "REJECT_TRANSLATED_PRESCRIPTION":
        return "已驳回开方";
      case "ALREADY_AUDIT_PRESCRIPTION":
        return "已审方";
      case "FAIL_AUDIT_PRESCRIPTION":
        return "审方失败";
      case "REJECT_AUDIT_PRESCRIPTION":
        if (this.$route.path == "/saveaudit") {
          return "已驳回转方";
        } else {
          return "审方退回";
        }
      default:
        return "";
    }
  }
  model = false;

  doSubmit() {
    this.$confirm("确定退回该处方给开方医生?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.backLoad = true;
        indexApi
          .doKillPreTransmit({
            prescriptionId: this.presId,
            transDocName: sessionStorage.name,
            rejectContext: this.tranRemake
          })
          .then(res => {
            this.backLoad = false;
            if (res["retCode"]) {
              this.$message("退回成功");
              this.tranRemake = "";

              if (res.data.nextPresId) {
                this.getCountForList("xia", res.data.nextPresId);
              } else {
                this.$router.push("/transmit");
              }
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
          message: "已取消操作"
        });
      });
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

  selectRow() {
    let a = {};
    Object.assign(a, this.$refs.filterdrug["row"]);
    this.drug = a;
    this.drug.price = a["guidance"];
    this.filterdrugModel = false;
  }

  deletePreDrug(index, row) {
    this.$confirm("把该药品从处方单中移除？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .deletePreDrug({ preDrugId: row.prescriptionDrugId })
          .then(res => {
            if (res["retCode"]) {
              this.$message("已删除一条药品记录");
              this.queryPresDrug();
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
          message: "已取消操作"
        });
      });
  }

  loading = false;
  docreateDrug() {



    if (!this.drug["quantity"] ) {
      this.$alert("请输入药品数量");
      return;
    }

   let b = this.drug["quantity"] >0
 
    if (!b ) {
      this.$alert("请输入正确的药品数量");
      return;
    }

    if (!this.drug["price"] ) {
      this.$alert("请输入药品金额");
      return;
    }
    let a = this.drug["price"] >0
    if (!a ) {
      this.$alert("请输入正确的药品金额");
      return;
    }
    

    this.drug["partnerName"] = this.drug.partnerObj["partnerName"];
    this.drug["partnerId"] = this.drug.partnerObj["partnerId"];
    this.drug["preId"] = this.presId;
    this.drug["drugName"] = this.drug["commonName"];
    this.drug["guidance"] = this.drug["price"];
    this.drug["instructions"] = this.instructions;
    this.loading = true;

    indexApi.docreateDrug(this.drug).then(res => {
      this.loading = false;
      if (res["retCode"]) {
        this.drug = {};
        this.instructions = "";
        this.queryPresDrug();
        this.editPrice = true
        console.log(res);
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  presscriptionMoney=0
  orderMoney = 0;
  serviceMoney = 0;
  preIndex = 0;
  preDrugList = [];
  queryPresDrug() {
    indexApi.queryPresDrug({ preId: this.presId }).then(res => {
      if (res["retCode"]) {
        this.preDrugList = res.data.data;
        this.presscriptionMoney = res.data.drugMoney;
        this.orderMoney = res.data.orderMoney;
        this.serviceMoney = res.data.serviceMoney;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  tranRemake = "";
diagnosis = "";
  dotransmit() {
    //验证

    console.log("转方");
    console.log("药品数", this.preDrugList.length);

    if (this.preDrugList.length == 0) {
      this.$alert("至少添加一条药品信息");
      return;
    }
if((this.diagnosis||'')==''){
  this.$alert('请填写诊断');
  return
}

  

    this.$confirm("药品填写完成?现在开始转方?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.backLoad = true;
        let temporaryPrescriptiondrugIds = [];
        this.preDrugList.forEach((item, index) => {
          temporaryPrescriptiondrugIds.push(item.prescriptionDrugId);
          if (temporaryPrescriptiondrugIds.length == this.preDrugList.length) {
            indexApi
              .dotransmit({
                temporaryPrescriptiondrugId: temporaryPrescriptiondrugIds.join(
                  ","
                ),
                prescriptionId: this.presId,
                tranRemake: this.tranRemake,
                changeName: sessionStorage.name,
                changeId: sessionStorage.merchantUserId,
                diagnosis:this.diagnosis
                // serviceMoney:0,
              })
              .then(res => {
                this.backLoad = false;

                if (res["retCode"]) {
                  this.$message("转方成功");
                  this.tranRemake = "";
                  if (res.data.nextPresId) {
                    this.getCountForList("xia", res.data.nextPresId);
                  } else {
                    this.$router.push("/transmit");
                  }
                } else {
                  if (!res["islogin"]) {
                    this.$alert(res["message"]);
                  }
                  console.error("数据查询错误");
                }
              });
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
  }

  preImageList = [];
  getPrePic() {
    indexApi.getPrePic({ preId: this.presId }).then(res => {
      if (res["retCode"]) {
        this.preImageList = res.data;
        if (res.data.length > 0) {
          let a: any = this.$refs.cropper;
          a.changePreImageUrl(0);
        }
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  presId = "";
  prodetail = {};
  queryPresDetatil() {
    indexApi.queryPresDetatil({ preId: this.presId }).then(res => {
      if (res["retCode"]) {
        this.prodetail = res.data;
        this.diagnosis = res.data.diagnose
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  specificationList = [];
  partnerNameList = [];
  remoteMethod(query) {
    if (query == undefined || query == null) {
      return;
    }
    if (query !== "") {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.getDrugList(query);
        console.log(query);
      }, 200);
    } else {
      this.options4 = [];
    }
  }

  options4 = [];
  value9 = [];
  list = [];

  drugList = [];

  getDrugList(query) {
    //  this.drug.commonName
    indexApi
      .getGrugList({
        keyFName: query
      })
      .then(res => {
        if (res["retCode"]) {
          this.options4 = res.data.list;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }
  leftDis = false;
  rightDis = false;

  getCountForList(type, presId) {
    this.backLoad = true;

    if (!sessionStorage.tranObject || sessionStorage.tranObject.length == 0) {
      this.backLoad = false;
      this.leftDis = true;
      this.rightDis = true;
      this.$message("请到转方客服页面刷新后再操作");
      return;
    }

    let a = JSON.parse(sessionStorage.tranObject);
    Object.assign(a, { presId: sessionStorage.presId });
    indexApi.findPrescriptionByType(a).then(res => {
      if (res["retCode"]) {
        if (presId) {
          sessionStorage.presId = presId;
          this.init();
          return;
        }

        this.leftDis = res.data.Frist ? false : true;
        this.rightDis = res.data.Third ? false : true;
        if (type == "shang" && res.data.Frist) {
          sessionStorage.presId = res.data.Frist.presId;
          this.rightDis = false;
        }
        if (type == "xia" && res.data.Third) {
          sessionStorage.presId = res.data.Third.presId;
          this.leftDis = false;
        }

        this.init();
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
        this.backLoad = false;
      }
    });
  }
  init() {
    this.backLoad = true;
    console.log(sessionStorage.presId);

    this.presId = sessionStorage.presId;
    this.queryPresDrug();
    this.getPrePic();
    this.queryPresDetatil();
    this.countPreByStatu();
    this.allPrescription();

    this.backLoad = false;
    this.drug = {};
    this.instructions = "";
    setTimeout(() => {
      if (this.backLoad) {
        this.backLoad = false;
      }
    }, 5000);
  }

  uncheckPrefor() {}

  //  beforeRouteLeave (to, from, next) {

  //   }

  mounted() {
    // 判断是否是锁单了
    this.init();
    // this.getDrugList()//获取默认药品列表
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
.fllll:hover {
  color: #c30d23;
}

.iconcropper {
  padding: 10px;
  cursor: pointer;
}
.iconcropper:active {
  opacity: 0.5;
}
</style>