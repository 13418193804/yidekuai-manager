<template>
    <div v-bouncing="backLoad">
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
<div style="text-align:right;float:right;" v-if="pres_type !== 'BACK_HANDWORK'">
     <el-button size="small" type="primary" @click="getCountForList('shang')" :disabled="leftDis"  icon="el-icon-arrow-left">上一条</el-button>
                 <el-button size="small" type="primary" @click="getCountForList('xia')" :disabled="rightDis">下一条<i class="el-icon-arrow-right"></i></el-button>
</div>


    <div class="flex flex-warp-justify" style="margin-top:10px;" v-if="pres_type !== 'BACK_HANDWORK'">
 
 
  <h4 style="margin:0" v-if="pres_type !== 'BACK_HANDWORK'">处方状态：</h4>
<div >
    {{ handleStatus(prodetail.presState)  }}
</div>

  <h4 style="margin:0;padding-left:10px;">处方类型：</h4>
<div>
    {{ handleprescriptionType(prodetail.prescriptionType)  }}
</div>
</div>
    <div class="flex flex-warp-justify" style="margin-top:10px;" v-else>
  <h4 style="margin:0;">处方类型：</h4>
<div>
    直接开方
</div>
</div>


<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;" v-if="pres_type !== 'BACK_HANDWORK'">
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

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;" v-if="pres_type !== 'BACK_HANDWORK'">
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

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;" v-if="pres_type !== 'BACK_HANDWORK'">
    <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && prodetail.presState !=  'REJECT_AUDIT_PRESCRIPTION'  && prodetail.presState != 'REJECT_TRANSLATED_PRESCRIPTION'&& prodetail.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方时间：{{prodetail.auditingDate}}
    </div>
   <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && prodetail.presState != 'REJECT_AUDIT_PRESCRIPTION' &&  prodetail.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方医生：{{prodetail.transDocName}}
    </div>
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

<div v-if="pres_type !== 'BACK_HANDWORK'">
<div v-for="(item,index) in prodeInfo" >
<h4 style="margin: 10px 0;">{{index == 0?'患者信息':'医生信息'}}</h4>
<div style="display:flex;    flex-wrap: wrap;margin-bottom:10px;height:12px;" >
  <div style="margin-right:10px;line-height: 12px;" class=" flex  flex-align-center" v-for="items in item">
<span>{{items.title}}</span>
<span v-if="items.value !== 'diagnose'">{{prodetail[items.value]}}</span>
<span v-else>
 <el-input
  placeholder="诊断"
  v-model="diagnosis" style=""/>
</span>
</div>
</div>
</div>
</div>
<div  v-else>
<div v-for="(item,index) in prodeInfo">
<h4 style="margin: 10px 0;">{{index == 0?'患者信息':'医生信息'}} <span @click="changefilter_box(index == 0?'menber':'doctor')">选择已有的{{index == 0?'患者信息':'医生信息'}}</span></h4>
<div style="display:flex;    flex-wrap: wrap;margin-bottom:10px;" >
  <div style="margin-right:
  10px;margin-top: 10px;
  line-height: 12px;" class=" flex  flex-align-center" v-for="items in item" v-if="items.value !== 'consigneeAddress'">
<span style="width:120px;">{{items.title}}</span>

 <el-input :disabled="index ==1 " v-if="items.model !== 'diagnose'" v-model="createForm[items.model]" size="small" :placeholder="'请输入'+items.title.replace('：','')"
 style="margin-right:10px;  "/>
  <el-input  v-else v-model="diagnosis" size="small" :placeholder="'请输入'+items.title.replace('：','')"
 style="margin-right:10px;  "/>
 
</div>
</div>
</div>
</div>

<div style="height:20px;"></div>
<el-row :gutter="24"  style="padding:0 0 20px;">

  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
<corpperlabel ref="cropper" :preImageList="preImageList"></corpperlabel>
  <div style="margin-bottom:22px;" v-loading="add_upload_loading">
                <el-upload :action="fileUploadUrl" list-type="picture-card" ref="upload" :before-upload="beforeUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess1" :file-list="fileList">
                  <i class="el-icon-plus"></i>
                </el-upload>
</div>

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



                    <!-- <el-select style="width:100%;"
    placeholder="请输入供应商"
    :loading="loading" 
    @change="changePartnerName"
    >
    @change="selectSpecification"
    <el-option
      v-for="item in partnerNameList"
      :key="item"
      :label="item.partnerName"
      :value="item">
    </el-option>
    
  </el-select> -->


<el-autocomplete style="width:100%;"
      class="inline-input"
       v-model="drug.partnerObj"
      value-key="partnerName"

      :fetch-suggestions="querySearch4"
      placeholder="请输入供应商"
    ></el-autocomplete>


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
<div class="flex flex-1 flex-pack-justify" style="margin-left:120px;margin-bottom:25px">
  <el-radio v-model="drug.price" :label="drug.oldprice?drug.oldprice.toString():''" :disabled="!drug.id||!drug.oldprice">{{`上次售价：${drug.oldprice?drug.oldprice:''}`}}</el-radio>
  <el-radio v-model="drug.price" :label="drug.drugPrice?drug.drugPrice.toString():''" :disabled="!drug.id">{{`药品库价格：${drug.drugPrice?drug.drugPrice:''}`}}</el-radio>
</div>
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
                 <el-button size="mini" type="primary" @click="docreateDrug()" :disabled="loading">提交</el-button>
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

   

  <el-table-column fixed="left"
      prop="drugName"
      label="通用名">
   </el-table-column>

  <el-table-column
      prop="productName"
      label="商品名">
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

     <el-table-column width="180" 
      prop="manufacturer"
      label="厂商">
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

<!-- <div style="text-align:right;padding:15px">
 <el-input
  placeholder="诊断"
  v-model="diagnosis" style=""/>
</div> -->
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
    <el-dialog  :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
		<el-dialog class="filter_box" width= "70vw" :close-on-click-modal="false" title="搜索" :append-to-body="true" :visible.sync="filter_model"   >
<div >
<div style="padding: 10px;text-align: left;" class="filter_select">
 <el-input placeholder="请输入手机号" size="small" style="min-width:200px;max-width:400px;" v-model="mobile" class="input-with-select">
     <el-select v-model="filter_type" slot="prepend" placeholder="请选择" class="filter_select">
      <el-option label="医生" value="doctor" ></el-option>
      <el-option label="患者" value="menber"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="filtering()"></el-button>
  </el-input>
</div>


<div style="height:500px;    overflow: auto;" v-bouncing="noMessage_loading">

<div class="flex flex-pack-center  flex-align-center" style="height:100%" v-if="noMessage_model">
  <i class="iconfont icon-shangxin" style="font-size:90px"></i>
  <div>
    <div>搜索不到任何患者</div>
    <div style=" color: #8492a6; font-size: 13px">试试输入准确的信息吧~</div>
  </div>
</div>

<div class="flex flex-warp-justify" >
<div v-for="(item,index) in resultList" class="flex doctorCard textLabel" @click="select_item(item)">
    <img v-if="item.doctorId" src="../../assets/876218396590085506.png" style="height: 80px;width: 80px;margin: 5px 10px;"/>
    <img v-if="item.memberId" src="../../assets/549155791089665584.png" style="height: 80px;width: 80px;margin: 5px 10px;"/>
 
 
  <div  style="line-height: 20px;" class="textLabel">
    <div class="textLabel">{{item.name}}</div>
    <div>{{item.phone}}</div>
    <div v-if="item.docterId">
     <div class="textLabel" style="text-align:left;">医院：<span style=" color: #8492a6; font-size: 13px">{{item.hospitalName}}</span></div>
    <div class="textLabel" style="text-align:left;">科室：<span style=" color: #8492a6; font-size: 13px">{{item.docterDept}}</span></div>
</div>
<div v-else>
     <div class="textLabel" style="text-align:left;">
      <span> 性别：<span style=" color: #8492a6; font-size: 13px">{{item.sex?item.sex:'-'}}</span></span>
      <span  style="margin-left:10px;">  年龄：<span style=" color: #8492a6; font-size: 13px">{{item.age?item.age:'-'}}</span></span>
        </div>
    <div class="textLabel" style="text-align:left;">身份证：<span style=" color: #8492a6; font-size: 13px">{{item.idCard?item.idCard:'-'}}</span></div>
</div>
</div>
</div>
</div>

</div>
</div>


            </el-dialog>



    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Prop } from "vue-property-decorator";
import * as indexApi from "../../api/indexApi";
// import filterdrug from "../drug/filterdrug";
import corpperlabel from "./corpperlabel";
import * as Config from "../../api/conf";
import * as doctorApi from "../../api/doctorApi";

@Component({
  props: {},
  components: {
    // filterdrug,
    corpperlabel
  }
})

export default class AddGoods extends Vue {
  //供应商
  querySearch4(queryString, cb) {
    var restaurants = this.partnerNameList;
    var results = queryString
      ? restaurants.filter(this.createFilter(queryString))
      : restaurants;
    // 调用 callback 返回建议列表的数据
    let a = results.map(item => {
      return { value: item, partnerName: item.partnerName };
    });
    cb(a);
  }

  //频次建议
  querySearch3(queryString, cb) {
    var restaurants = this.frequencyList;
    var results = queryString
      ? restaurants.filter(queryString => {
          return restaurant => {
            return (
              restaurant.partnerName
                .toLowerCase()
                .indexOf(queryString.toLowerCase()) === 0
            );
          };
        })
      : restaurants;
    // 调用 callback 返回建议列表的数据
    let a = results.map(item => {
      return { value: item.partnerName, label: item.partnerName };
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

  editPrice = true;
  prodeInfo = [
    [
      { title: "患者姓名：", value: "memberName" ,model:"memberName"},
      { title: "患者手机：", value: "memberPhone",model:"memberPhone" },
      { title: "患者性别：", value: "patientSex" ,model:"patientSex"},
      { title: "患者年龄：", value: "memberAge",model:"memberAge" },
      { title: "患者身份证", value: "memberIdcard",model:"memberIdcard" },
      { title: "地址：", value: "consigneeAddress",model:"a" },
      
    ],
    [
      { title: "医生姓名：", value: "docterName",model:"docterName" },
      { title: "医生电话：", value: "doctorMobile" ,model:"doctorMobile"},
     { title: "医生医院：", value: "hospitalName",model:"hospitalName" },
      { title: "科室：", value: "docterDept",model:"docterDept" },
      { title: "诊断：", value: "diagnose" ,model:"diagnose"}
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
    this.drug["drugPrice"] = a[0].drugPrice;
    this.drug["primarykeyID"] = a[0].id;
    this.drug['manufacturer'] = a[0].manufacturer
    this.drug['oldprice'] = a[0].oldprice
    if(this.drug.oldprice){
    this.drug['price'] = a[0].oldprice.toString()
    }else{
    this.drug['price'] = a[0].drugPrice.toString()
    }
    //清空数据
    this.commonList();
  }
  // selectSpecification() {

  //   // 清空数据
  //   this.commonList();
  // }
  changePartnerName() {
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
      
    if (this.drug.manufacturer) {
      Object.assign(data, { manufacturer: this.drug.manufacturer });
    }

    if (this.drug.specification) {
      Object.assign(data, { specification: this.drug.specification });
    }

    if (this.drug.partnerObj) {
      Object.assign(data, { partnerName: this.drug.partnerObj });
    }
    indexApi.getGrugListZhuanFang(data).then(res => {
      if (res["retCode"]) {
        // this.options4 = res.data.YdkDrugList;
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
            this.drug.partnerObj = res.data.partnerNameList[0].partnerName;
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
            this.drug["dosage"] = res.data.dosageList[0];
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


  drug: any = {};
  allprescription = 0;
  allPrescription() {
    indexApi.allPrescription().then(res => {
      if (res["retCode"]) {
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
    return this.countPreByStatuObj["data5"]
      ? this.countPreByStatuObj["data5"].count
      : 0;
  }

    handleprescriptionType(prescriptionType){
switch(prescriptionType){
  case 'BACK_HANDWORK':
  return '直接开方'
   case 'DOC_HANDWORK':
  return '线下订单'
   case 'PHOTO':
  return '普通单'
        default:
        return  ""
}
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
    if (!this.drug["quantity"]) {
      this.$alert("请输入药品数量");
      return;
    }

    let b = this.drug["quantity"] > 0;

    if (!b) {
      this.$alert("请输入正确的药品数量");
      return;
    }

    if (!this.drug["price"]) {
      this.$alert("请输入药品金额");
      return;
    }
    let a = this.drug["price"] > 0;
    if (!a) {
      this.$alert("请输入正确的药品金额");
      return;
    }

    this.drug["partnerName"] = this.drug.partnerObj;
    // this.drug["partnerId"] = this.drug.partnerObj["partnerId"];
    this.drug["preId"] = this.presId;
    this.drug["drugName"] = this.drug["commonName"];
    this.drug["guidance"] = this.drug["price"];
    this.drug["instructions"] = this.instructions;
    this.loading = true;

    indexApi.docreateDrug(this.drug).then(res => {
      this.loading = false;
      if (res["retCode"]) {
          this.presId = res.data.prescriptionId
        this.drug = {};
        this.instructions = "";
        this.queryPresDrug();
        this.editPrice = true;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  presscriptionMoney = 0;
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
//修改时的验证要提过来这边判断

 if(this.pres_type === 'BACK_HANDWORK'){
  
    if (
      (this.createForm.docterId || "") === ""
    ) {
      this.$message("请选择医生");
      return;
    }
    
      if((this.createForm.memberName||'')  ===''){
            this.$message("请输入患者姓名");
      return;
        }

      if((this.createForm.memberPhone||'')  ===''){
            this.$message("请输入患者手机号");
      return;
        }




  //     if((this.createForm.patientSex||'')  ===''){
  //           this.$message("请选择患者性别");
  //     return;
  //       }

  //     if((this.createForm.memberAge||'')  ===''){
  //           this.$message("请输入患者年龄");
  //     return;
  //       }
  //  if((this.createForm.memberIdcard||'')  ===''){
  //           this.$message("请输入患者身份证");
  //     return;
  //       }


    }
  


if (this.fileList.length > 0 ) {
      this.createForm.pictureIds = this.fileList
        .map(item => {
          return item.url;
        })
        .join(",");
    } else {
      this.$message("请上传处方图片");
      return;
    }



    //验证
    if (this.preDrugList.length == 0) {
      this.$alert("至少添加一条药品信息");
      return;
    }
    if ((this.diagnosis || "") == "") {
      this.$alert("请填写诊断");
      return;
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
                diagnosis: this.diagnosis
                // serviceMoney:0,
              })
              .then(res => {
                this.backLoad = false;
                if (res["retCode"]) {
              
               this.createForm.presId = res.data.prescription.presId
              this.doUpdatePre()
          




                  // this.tranRemake = "";
                  // if (res.data.nextPresId) {
                  //   this.getCountForList("xia", res.data.nextPresId);
                  // } else {
                  //   this.$router.push("/transmit");
                  // }
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
        if( res.data){
        this.diagnosis = res.data.diagnose;
        }
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
        keyFName: query,
        preId :   this.presId 
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
  doUpdatePre(){
    
   
      
    // if (
    //   ((this.createForm.servicemoney || "") === "" &&
    //     this.add_model_type == "add") ||
    //   ((this.createForm.serviceMoney || "") === "" &&
    //     this.add_model_type == "edit")
    // ) {
    //   this.$message("请输入治疗服务费");
    //   return;
    // }
// let showLoading = ()=>{
//  this.add_model_loading = true
// this.add_footer_loading =  true
// this.cancelLoading = true
// }
// let closeLoading = ()=>{
//    this.add_model_loading = false
// this.add_footer_loading =  false
// this.cancelLoading = false
// }


//  this.createForm.presId = this.presId
      this.createForm.serviceMoney = this.createForm.servicemoney
            this.createForm.feeHide= this.createForm.feeTypeEnum ;
            this.createForm.consigneeName = this.createForm.memberName
            this.createForm.consigneePhone = this.createForm.memberPhone
            this.createForm.prescriptionType = "BACK_HANDWORK"
    //   if((this.createForm.consigneeName||'')===''){
    //    this.$message("请输入收件人");
    //   return;
    //   }
    // if((this.createForm.consigneeAddress||'')===''){
    //    this.$message("请输入收件号码");
    //   return;
    //   }
    //   if((this.createForm.provinceid||'')==='' || (this.createForm.cityid||'')==='' || (this.createForm.areaid||'')==='' ){
    //          this.$message("请选择收货地区");
    //   return;
    //   }
    //       if((this.createForm.consigneeAddress||'')===''){
    //    this.$message("请输入收件地址");
    //   return;
    //   }


// 改类型



      indexApi.updatePre(this.createForm).then(res => {
        if (res["retCode"]) {
              this.$message("转方成功");
          // this.$message("更新成功");
          //执行转方
      //  this.dotransmit()
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
      

  }
  mobile = ""
filter_model = false
filter_type = ""
resultList = []
noMessage_model = false
noMessage_loading = false
  changefilter_box(filter_type) {

    this.filter_type = filter_type;
    this.filter_model = !this.filter_model;
    this.resultList = [];
    this.mobile = "";
  }
  select_item(item) {
    if (item.doctorId) {
      this.createForm.doctorid = item.doctorId;
      this.createForm.docterId = item.doctorId;
      this.createForm.docterName = item.name;
      this.createForm.doctorMobile = item.phone;
      this.createForm.hospitalName = item.hospitalName;
      this.createForm.docterDept = item.hospitalDepartment;
    }
    if (item.memberId) {
      this.createForm.memberId = item.memberId;
      this.createForm.memberid = item.memberId;
      this.createForm.memberName = item.name;
      this.createForm.memberPhone = item.phone;
      this.createForm.memberSex = item.sex;
      this.createForm.memberIdcard = item.idCard;
      this.createForm.memberAge = item.age;
      //查询默认收货地址
      // this.getMenberdefaultaddress(item.memberId);
    }
    this.filter_model = false;
  }
  filtering() {
    console.log('-0')
    if (!this.mobile) {
      return;
    }
    this.noMessage_model = false;
    this.noMessage_loading = true;

    let closeStatus = () => {
      this.noMessage_loading = false;
    };
    let noMessage = () => {
      if (this.resultList.length === 0) {
        this.noMessage_model = true;
      }
    };

    if (this.filter_type === "doctor") {
      doctorApi.queryDoctorList(0, 100, this.mobile, "").then(res => {
        closeStatus();
        if (res["retCode"]) {
          this.resultList = res.data.list;
          noMessage();
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
    }
    if (this.filter_type === "menber") {
      indexApi
        .findmemberlike({
          keyname: this.mobile,
          page: 0,
          pageSize: 100
        })
        .then(res => {
          closeStatus();
          if (res["retCode"]) {
            this.resultList = res.data.list;
            noMessage();
          } else {
            if (!res["islogin"]) {
              this.$alert(res["message"]);
            }
          }
        });
    }
  }

  init() {



    this.backLoad = true;

    if(!this.presId){
    this.presId = sessionStorage.presId;
    }
    
    this.allPrescription();
    this.countPreByStatu();
    if((this.presId||'')!==''){
         this.queryPresDrug();
    this.getPrePic();
    this.queryPresDetatil();
    }
    this.backLoad = false;
    this.drug = {};
    this.instructions = "";
  
  }
createForm:any = {}


  dialogImageUrl = "";
  dialogVisible = false;
  handlePictureCardPreview(file) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }
  add_upload_loading = false;

  fileUploadUrl = "";
  beforeUpload(file) {
    this.add_upload_loading = true;
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      this.$message.error("上传图片大小不能超过 5MB!");
    }
    return isLt5M;
  }


  fileList: any = [];
  handleSuccess1(response, file, fileList) {
    let dt = {
      name: "1.png",
      url: response.data.filename
    };
    this.fileList.push(dt);
  this.preImageList =  this.fileList.map(
    item=>{
      return {
     pictureId:   item.url
      }
    }
  )
    this.add_upload_loading = false;
  }

  handleRemove(file, fileList) {
    for (let i in this.fileList) {
      let url = this.fileList[i].url;
      if (url == file.url) {
        console.log("find ...");
        this.fileList.splice(i, 1);
        break;
      }
    }
      this.preImageList =  this.fileList.map(
    item=>{
      return {
     pictureId:   item.url
      }
    }
  )
  }



pres_type = ""
  mounted() {


       this.fileUploadUrl = Config.g_upload_url;
       if((this.$route.params.pres_type||'')=='' && (sessionStorage.presId||'')===''){
         this.$router.replace('/transmit')       
         return 
         }

    this.pres_type = this.$route.params.pres_type

     


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
.noselect {
  border: 1px #e5e5e5 solid;
}

.selectImage {
  cursor: pointer;
  border: 1px #409eff solid;
}
.noselect:hover {
  cursor: pointer;
  border: 1px #409eff solid;
}
.textLabel {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.doctorCard {
  width: 300px;
  margin: 0 10px 10px;
  border: 1px #e5e5e5 dashed;
  border-radius: 5px;
  padding: 5px 0;
  cursor: pointer;
}

.doctorCard:hover {
}
.dashed_box {
  overflow: hidden;
  min-height: 385px;
  position: relative;
  border: 1px dashed rgb(204, 171, 171);
  border-radius: 11px;
}
.opactiy {
}
.opactiy:hover {
  opacity: 0.8;
}
.filter_min_box {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;

  z-index: 100;
}
.filter_min_box:hover {
}
</style>