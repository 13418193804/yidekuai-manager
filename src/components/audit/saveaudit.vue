<template>
    <div v-bouncing="backLoad">
      

     
       <div style="display:flex;    align-items: center;padding:20px 0;">

      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/audit' }" style="font-weight: 600; font-size:20px;color:#2c3e50;"><span class="fllll" style="cursor: pointer;">审方管理</span></el-breadcrumb-item>
  <el-breadcrumb-item  style="font-size:16px;line-height:20px;color:#2c3e50;"><span class="fllll" >审方工作台</span></el-breadcrumb-item>
</el-breadcrumb>
   <div >
<span style="margin-right:10px">平台处方数量统计 {{allprescription}} 个</span>             
<span >  待审方数量 {{notCount}} 个</span>    
            </div>

        </div>
<div style="text-align:right;float:right;">
                   <el-button size="small" type="primary" @click="getCountForList('shang')" :disabled="leftDis"  icon="el-icon-arrow-left">上一条</el-button>
                 <el-button size="small" type="primary" @click="getCountForList('xia')" :disabled="rightDis">下一条<i class="el-icon-arrow-right"></i></el-button>
</div>


  <div class="flex flex-warp-justify" style="margin-top:10px;line-height:28px;">
  <h4 style="margin:0">处方状态：</h4>
<div>
    {{ handleStatus(prodetail.presState)  }}
</div>
  <h4 style="margin:0;padding-left:10px;">订单类型1：</h4>
<div>
    {{ handleprescriptionType(prodetail.prescriptionType)  }}
</div>

<div class="flex flex-warp-justify"   v-if="pres_type === 'BACK_HANDWORK' || pres_type ==='DOC_HANDWORK'">
  <h4 style="margin:0;padding-left:10px;">支付状态：</h4>
<div>
    <el-select v-model="payModeEnum" size="mini" placeholder="请选择">
    <el-option
      label="未支付"
      value="PAY_WAIT">
    </el-option>
        <el-option
      label="已支付"
      value="PAY_SUCCESS">
    </el-option>
         <el-option
      label="货到付款"
      value="ORDER_PAY_ONDEV">
    </el-option>
  </el-select>
</div>
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
    </div>

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;">
    <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && prodetail.presState !=  'REJECT_AUDIT_PRESCRIPTION'  && prodetail.presState != 'REJECT_TRANSLATED_PRESCRIPTION'&& prodetail.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方时间：{{prodetail.auditingDate}}
    </div>
   <div style=" margin-top:10px;margin-bottom:10px;margin-right:10px;" v-if=" prodetail.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && prodetail.presState != 'REJECT_AUDIT_PRESCRIPTION' &&  prodetail.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方医生：{{prodetail.auditingName}}
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


 

<div v-if="pres_type !== 'BACK_HANDWORK' && pres_type !=='DOC_HANDWORK'">

<div v-for="(item,index) in prodeInfo" v-if="index!==1">
<h4 style="margin: 10px 0;">{{item.title+'信息'}}</h4>
<div style="display:flex;    flex-wrap: wrap;margin-bottom:10px;height:12px;" >
  <div style="margin-right:10px;line-height: 12px;" class=" flex  flex-align-center" v-for="items in item.list">
<span>{{items.title}}</span>
<span>{{prodetail[items.value]}}</span>
</div>
</div>
</div>
</div>

<div  v-else>


  <el-collapse v-model="activeNames"  class="diy_collapse">
     <el-collapse-item  v-for="(item,index) in prodeInfo" :title="item.title+'信息'" :name="index">
<div style="margin-left:20px;">
<!-- <div style="margin: 10px 0;" class="flex">
    <h4 style="margin:0;">{{item.title+'信息'}}</h4>
  </div> -->

   <div class="flex  flex-align-center opactiy" style="cursor: pointer;margin-left:15px;" @click="changefilter_box(index == 0?'menber':'doctor')" v-if="index  ==0 &&(  pres_type ==='BACK_HANDWORK' || pres_type =='DOC_HANDWORK')">
    <i class="iconfont icon-sousuo1"></i>
      <div>搜{{item.title}}</div>
   </div>


<div v-if="index ===1">
<div style="display:flex;flex-wrap: wrap;margin-bottom:10px;" >
  <div style="margin-right:10px;margin-top: 10px;line-height: 12px;" class=" flex  flex-align-center">
<span style="width:130px;white-space: nowrap;" >收件人：</span>
 <el-input  v-model="createForm.consigneeName" size="small" placeholder="请输入收件人"
 style="margin-right:10px;"/>
</div>
 <div style="margin-right:10px;margin-top: 10px;line-height: 12px;" class=" flex  flex-align-center">
<span style="width:130px;white-space: nowrap;" >收件号码：</span>
 <el-input  v-model="createForm.consigneePhone" size="small" placeholder="请输入收件号码"
 style="margin-right:10px;"/>
</div>
</div>

<div style="display:flex;flex-wrap: wrap;margin-bottom:10px;" >
  <div style="margin-right:10px;margin-top: 10px;line-height: 12px;" class=" flex  flex-align-center">
<span style="width:130px;white-space: nowrap;" >收货地区：</span>
 <div class="el-input el-input--small" style="margin-left: 10px;">
<el-select v-model="createForm.provinceid" @change="queryCityList()" size="small" >
<el-option v-for="(n,index) in provinceList" :key="index" :label="n.name" :value="n.id" ></el-option>
</el-select>
 </div>

 <div class="el-input el-input--small"  style="margin-left: 10px;">
        <el-select v-model="createForm.cityid" @change="queryCountryList()" size="small">
<el-option v-for="(n,index) in cityList" :key="index" :label="n.name" :value="n.id"></el-option>
</el-select>
 </div>

 <div class="el-input el-input--small"  style="margin-left: 10px;">
        <el-select v-model="createForm.areaid" size="small">
<el-option v-for="(n,index) in countryList" :key="index" :label="n.name" :value="n.id"></el-option>
</el-select>
 </div>
</div>
</div>

  <div style="margin-right:10px;margin-top: 10px;line-height: 12px;" class=" flex  flex-align-center">
 <div style="margin-right:10px;margin-top: 10px;line-height: 12px;" class=" flex  flex-align-center">
<span style="width:130px;white-space: nowrap;" >收件地址：</span>
 <el-input  v-model="createForm.consigneeAddress" size="small" placeholder="请输入收件地址"
 style="margin-right:10px;"/>
</div>
</div>
</div>

<div style="display:flex;    flex-wrap: wrap;margin-bottom:10px;" >
  <div style="margin-right:10px;margin-top: 10px;line-height: 12px;" class=" flex  flex-align-center" v-for="items in item.list" v-if="items.value !== 'consigneeAddress'">
<span style="width:130px;white-space: nowrap;" :class=" items.value === 'memberName' ||items.value==='memberPhone'  || items.model == 'diagnose'?'vaild_icon':''">{{items.title}}</span>
 <el-input :disabled="index ==2 "  v-model="createForm[items.model]" size="small" :placeholder="'请输入'+items.title.replace('：','')"
 style="margin-right:10px;"/>
</div>
</div>
</div>
  </el-collapse-item>
</el-collapse>

</div>



<el-row :gutter="24"  style="padding:20px 0;">
  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">

      <div style="position: relative;">

        <corpperlabel  ref="cropper" :preImageList="preImageList"  :haveDetele="true"></corpperlabel>




</div>
      </el-col>

  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
<el-table border
    :data="preDrugList"
    stripe :height="500"
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
</el-table>
<div style="padding:10px;font-size:14.8px;">
  
  
  <!-- <div v-if="pres_type =='DOC_HANDWORK' || pres_type == 'BACK_HANDWORK'">
    治疗服务费：
          <el-input    v-model="createForm.serviceMoney"  size="small" :rows="4"
  placeholder="请输入治疗服务费"   style="max-width:180px;"
  >      <template slot="append">元</template>
  </el-input>
  </div> -->
  <div >治疗服务费：<span style="color:red" >￥{{prodetail.serviceMoney}}</span></div>
  <div>药品合计：<span style="color:red" >￥{{prodetail.presscriptionMoney}}</span></div>
  <div >合计：<span style="color:red" >￥{{prodetail.orderMoney}}</span></div>
</div>

<div style="text-align:right;">
    <el-input
  type="textarea"
  :rows="4"
  placeholder="退回原因"
  v-model="auditingRemake" style=""/>
</div>

<div style=" display: flex;
    justify-content: space-between;padding:10px;">
                 <el-button  type="text" @click="doSubmit()">退回</el-button>
                 <el-button  type="primary" @click="checkPre()">通过</el-button>

</div>
  </el-col>


  </el-row>

	    <el-dialog  :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>


		<el-dialog class="filter_box" width= "70vw" :close-on-click-modal="false" title="搜索" :append-to-body="true" :visible.sync="filter_model"   >
<div >
<div style="padding: 10px;text-align: left;" class="filter_select">
 <el-input :placeholder="`请${filter_type === 'doctor' ? '医生':'患者' }输入姓名或手机号`" size="small" style="min-width:200px;max-width:400px;" v-model="mobile" class="input-with-select">
     <el-select v-model="filter_type" slot="prepend" placeholder="请选择" class="filter_select">
      <el-option label="医生" value="doctor" :disabled="pres_type=='DOC_HANDWORK'"></el-option>
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
    <img v-if="item.doctorId" :src="require('../../assets/876218396590085506.png')" style="height: 80px;width: 80px;margin: 5px 10px;"/>
    <img v-if="item.memberId" :src="require('../../assets/549155791089665584.png')" style="height: 80px;width: 80px;margin: 5px 10px;"/>
 
 
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
import corpperlabel from "../transmit/corpperlabel";
import * as doctorApi from "../../api/doctorApi";
import * as ApiOrder from "../../api/orderapi";
import * as Config from "../../api/conf";

@Component({
  props: {},
  components: { corpperlabel }
})
export default class AddGoods extends Vue {
  prodeInfo = [
    {
      title: "患者",
      list: [
        { title: "患者姓名：", value: "memberName", model: "memberName" },
        { title: "患者手机：", value: "memberPhone", model: "memberPhone" },
        { title: "患者性别：", value: "patientSex", model: "patientSex" },
        { title: "患者年龄：", value: "memberAge", model: "memberAge" },
        { title: "患者身份证：", value: "memberIdcard", model: "memberIdcard" },
        { title: "地址：", value: "consigneeAddress", model: "a" }
      ]
    },

    {
      title: "地址",
      list: []
    },
    {
      title: "医生",
      list: [
        { title: "医生姓名：", value: "docterName", model: "docterName" },
        { title: "医生电话：", value: "doctorMobile", model: "doctorMobile" },
        { title: "医生医院：", value: "hospitalName", model: "hospitalName" },
        { title: "科室：", value: "docterDept", model: "docterDept" },
        { title: "诊断：", value: "diagnose", model: "diagnose" }
      ]
    }
  ];
  activeNames = [0, 1, 2];
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

  auditingRemake = "";
  presId = "";
  preDrugList = [];
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
  backLoad = false;

  handleprescriptionType(prescriptionType) {
    switch (prescriptionType) {
      case "BACK_HANDWORK":
        return "线下订单";
      case "DOC_HANDWORK":
        return "直接开方";
      case "PHOTO":
        return "普通单";
      default:
        return "";
    }
  }
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
        return "已驳回转方";
      default:
        return "";
    }
  }

  doUpdatePre(type) {
    this.createForm.presId = this.presId;
    this.createForm.feeHide = this.createForm.feeTypeEnum;
    this.createForm.payModeEnum = this.payModeEnum;
    indexApi.updatePre(this.createForm).then(res => {
      if (res["retCode"]) {
        if (type === "back") {
          this.doBack();
        } else {
          this.checkPre1();
        }
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
    });
  }
  checkPre1() {
    this.backLoad = true;
    indexApi
      .checkPre({
        prescriptionId: this.presId,
        auditingid: sessionStorage.userId,
        auditingName: sessionStorage.name,
        auditingRemake: this.auditingRemake
      })
      .then(res => {
        this.backLoad = false;
        if (res["retCode"]) {
          this.$message("审方成功");
          this.auditingRemake = "";
          if (res.data.nextPresId) {
            this.getCountForList("xia", res.data.nextPresId);
          } else {
            this.$router.push("/audit");
          }
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
  }

  checkPhone = /^1[345789]\d{9}$/;
  checkPre() {
    if (
      (this.payModeEnum || "") === "" &&
      (this.pres_type === "BACK_HANDWORK" || this.pres_type === "DOC_HANDWORK")
    ) {
      this.$message("请选择支付状态");
      return;
    }

    if (
      this.pres_type === "BACK_HANDWORK" ||
      this.pres_type == "DOC_HANDWORK"
    ) {
      if ((this.createForm.memberName || "") === "") {
        this.$message("请输入患者姓名");
        return;
      } 
        let re = /^(?:[0-9][0-9]?|1[012][0-9]|130)$/;
        if ((this.createForm.memberAge || "") !== ""&& !re.test(this.createForm.memberAge)) {
          this.$message("请输入0-130岁的年龄");
          return;
        }
      if ((this.createForm.memberPhone || "") === "") {
        this.$message("请输入患者手机号");
        return;
      }
      if (!this.checkPhone.test(this.createForm.memberPhone)) {
        this.$message("请输入正确的患者手机号");
        return;
      }
      if ((this.createForm.memberIdcard || "") !== "") {
        this.vaild_memberIdcard(() => {
          this.after_vaild_doback();
        });
        return;
      } 
    }
        this.after_vaild_doback();
    
  }
  vaild_memberIdcard(callback) {
    indexApi.checkidcard({ idcard: this.createForm.memberIdcard }).then(res => {
      if (res["retCode"]) {
        callback();
        return;
      } else {
        if (!res["islogin"]) {
          this.$message(res["message"]);
        }
        return;
      }
    });
  }
  after_vaild_doback() {
    if (this.pres_type == "BACK_HANDWORK" || this.pres_type == "DOC_HANDWORK") {
      if ((<any>this.$refs.cropper).preImageList.length > 0) {
        this.createForm.pictureIds = (<any>this.$refs.cropper).preImageList
          .map(item => {
            return item.presImageUrl;
          })
          .join(",");
      } else {
        this.$message("请上传处方图片");
        return;
      }
    }

    this.$confirm("是否同意审方？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        if (
          this.pres_type == "BACK_HANDWORK" ||
          this.pres_type == "DOC_HANDWORK"
        ) {
          this.doUpdatePre("check");
        } else {
          this.checkPre1();
        }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
  }

  get notCount() {
    return this.countPreByStatuObj["data2"]
      ? this.countPreByStatuObj["data2"].count
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

  rejectContext = "";

  doBack() {
    this.backLoad = true;
    indexApi
      .doKillPreAudit({
        prescriptionId: this.presId,
        auditingName: sessionStorage.name,
        rejectContext: this.auditingRemake
      })
      .then(res => {
        if (res["retCode"]) {
          this.backLoad = false;
          this.$message("退回成功");
          this.auditingRemake = "";
          if ((res.data.nextPresId || "") !== "") {
            this.getCountForList("xia", res.data.nextPresId);
          } else {
            this.$router.push("/audit");
          }
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }
  //审方把处方退回给转方
  doSubmit() {
    // if (
    //   this.pres_type === "BACK_HANDWORK" ||
    //   this.pres_type == "DOC_HANDWORK"
    // ) {
    //   if ((this.createForm.memberName || "") === "") {
    //     this.$message("请输入患者姓名");
    //     return;
    //   }
    //     let re = /^(?:[0-9][0-9]?|1[012][0-9]|130)$/;
    //     if ((this.createForm.memberAge || "") !== ""&& !re.test(this.createForm.memberAge)) {
    //       this.$message("请输入0-130岁的年龄");
    //       return;
    //     }
    //   if ((this.createForm.memberPhone || "") === "") {
    //     this.$message("请输入患者手机号");
    //     return;
    //   }
    //   if (!this.checkPhone.test(this.createForm.memberPhone)) {
    //     this.$message("请输入正确的患者手机号");
    //     return;
    //   }

    //  if ((this.createForm.memberIdcard || "") !== "") {
    //     this.vaild_memberIdcard(() => {
    //       this.after_vaild();
    //     });
    //     return;
    //   }
    // }
        this.after_vaild();
    
  }
  after_vaild() {
    if (this.pres_type == "BACK_HANDWORK" || this.pres_type == "DOC_HANDWORK") {
      if ((<any>this.$refs.cropper).preImageList.length > 0) {
        this.createForm.pictureIds = (<any>this.$refs.cropper).preImageList
          .map(item => {
            return item.presImageUrl;
          })
          .join(",");
      } else {
        this.$message("请上传处方图片");
        return;
      }
    }

    this.$confirm("确定要退回审方？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        // if (
        //   this.pres_type == "BACK_HANDWORK" ||
        //   this.pres_type == "DOC_HANDWORK"
        // ) {
        //   this.doUpdatePre("back");
        // } else {
          this.doBack();
        // }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
  }

  queryPresDrugback() {
    indexApi
      .queryPresDrugback({
        preId: this.presId
      })
      .then(res => {
        if (res["retCode"]) {
          console.log("处方id查询药品列表", res);
          this.preDrugList = res.data;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  preIndex = 0;
  preImageList: any = [];
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
  prodetail = {};
  createForm: any = {};
  payModeEnum = "";
  queryPresDetatil() {
    indexApi.queryPresDetatil({ preId: this.presId }).then(res => {
      if (res["retCode"]) {
        this.prodetail = res.data;

        this.pres_type = this.prodetail["prescriptionType"];

        if (
          this.prodetail["prescriptionType"] === "DOC_HANDWORK" ||
          this.prodetail["prescriptionType"] == "BACK_HANDWORK"
        ) {
          this.createForm.memberId = this.prodetail["memberId"]
            ? this.prodetail["memberId"]
            : "";
          this.createForm.memberid = this.prodetail["memberId"]
            ? this.prodetail["memberId"]
            : "";
          this.createForm.memberName = this.prodetail["memberName"]
            ? this.prodetail["memberName"]
            : "";
          this.createForm.memberPhone = this.prodetail["memberPhone"]
            ? this.prodetail["memberPhone"]
            : "";
          this.createForm.patientSex = this.prodetail["patientSex"]
            ? this.prodetail["patientSex"]
            : "";
          this.createForm.memberIdcard = this.prodetail["memberIdcard"]
            ? this.prodetail["memberIdcard"]
            : "";
          this.createForm.memberAge = this.prodetail["memberAge"]
            ? this.prodetail["memberAge"]
            : "";
          //  this.pres_type ='DOC_HANDWORK'
          this.createForm.docterName = this.prodetail["docterName"];
          this.createForm.docterName = this.prodetail["docterName"];
          // this.createForm.serviceMoney = this.prodetail["serviceMoney"]
          //   ? this.prodetail["serviceMoney"]
          //   : "0";

          this.createForm.consigneeName = this.prodetail["consigneeName"];
          this.createForm.consigneePhone = this.prodetail["consigneePhone"];
          this.createForm.docterId = this.prodetail["docterId"];
          this.createForm.doctorMobile = this.prodetail["doctorMobile"];
          this.createForm.hospitalName = this.prodetail["hospitalName"];
          this.createForm.docterDept = this.prodetail["docterDept"];
          this.createForm.diagnose = this.prodetail["diagnose"];
          if ((this.prodetail["payStatus"] || "") !== "") {
            if (this.prodetail["payStatus"] === "PAY_ON_DELIVERY") {
              this.payModeEnum = "ORDER_PAY_ONDEV";
            } else {
              this.payModeEnum = this.prodetail["payStatus"];
            }
          }

          if ((this.prodetail["provinceid"] || "") !== "") {
            this.createForm.provinceid = this.prodetail["provinceid"];
            this.queryCityList();
          }
          if ((this.prodetail["cityid"] || "") !== "") {
            this.createForm.cityid = this.prodetail["cityid"];
            this.queryCountryList();
          }
          if (this.prodetail["areaid"]) {
            this.createForm.areaid = this.prodetail["areaid"];
          }
          this.createForm.consigneeAddress = this.prodetail["consigneeAddress"]
            ? this.prodetail["consigneeAddress"]
            : "";
        }
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
    });
  }
  mobile = "";
  filter_model = false;
  filter_type = "";
  resultList = [];
  noMessage_model = false;
  noMessage_loading = false;
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
      this.createForm.patientSex = item.sex;
      this.createForm.memberIdcard = item.idCard;
      this.createForm.memberAge = item.age;
      //查询默认收货地址
      // this.getMenberdefaultaddress(item.memberId);
    }
    this.filter_model = false;
  }

  filtering() {
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

  leftDis = false;
  rightDis = false;
  getCountForList(type, presId) {
    this.backLoad = true;
    if (!sessionStorage.auditObject || sessionStorage.auditObject.length == 0) {
      this.backLoad = false;
      this.leftDis = true;
      this.rightDis = true;
      this.$message("请到审方客服页面刷新后再操作");
      return;
    }

    let a = JSON.parse(sessionStorage.auditObject);
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

  // auditObject
  init() {
    this.backLoad = true;
    this.presId = sessionStorage.presId;
    this.queryPresDrugback(); //药品列表
    this.queryPresDetatil(); //详情
    this.getPrePic(); //图片
    this.countPreByStatu(); //查各种状态
    this.allPrescription();

    this.backLoad = false;
    setTimeout(() => {
      if (this.backLoad) {
        this.backLoad = false;
      }
    }, 5000);
  }

  provinceList = [];
  cityList = [];
  countryList = [];

  queryCountryList() {
    delete this.createForm.areaid;
    ApiOrder.queryCountryList(this.createForm.cityid).then(res => {
      this.countryList = res.data.region;
    });
  }
  queryCityList() {
    delete this.createForm.cityid;
    delete this.createForm.areaid;
    ApiOrder.queryCityList(this.createForm.provinceid).then(res => {
      this.cityList = res.data.region;
    });
  }

  queryProvinceList() {
    ApiOrder.queryProvinceList().then(res => {
      this.provinceList = res.data.region;
    });
  }
  pres_type = "";
  mounted() {
    this.fileUploadUrl = Config.g_upload_url;

    this.presId = sessionStorage.presId;
    this.queryProvinceList();

    this.queryPresDrugback(); //药品列表
    this.queryPresDetatil(); //详情
    this.getPrePic(); //图片
    this.countPreByStatu(); //查各种状态
    this.allPrescription();
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
.pre_update_upload {
  position: absolute;
  top: 0;
  height: 750px;
  min-width: 500px;
  background-color: #fff;
  width: 100%;
}

.vaild_icon::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>