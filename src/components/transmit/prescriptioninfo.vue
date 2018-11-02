<template>
    <div >
  
  <!-- class="min_box" -->
		<el-dialog width= "70vw" class="small_box" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="model"  title="处方详情">
<!-- 
<div class="min_title">
医患信息
</div> -->
<!-- v-model="activeNames" @change="handleChange" -->


<div style="font-size:15px;">

<div class="flex flex-warp-justify">
  <h4 style="margin:0">处方状态：</h4>
<div>
    {{ handleStatus(row.presState)  }}
</div>
  <h4 style="margin:0">处方类型：</h4>
<div>
    {{ handleprescriptionType(row.prescriptionType)  }}
</div>
</div>
<div  class="textLine">
    <div style=" margin-right:10px;" >
    开方时间：{{row.createDate}}
    </div>
     <div style=" margin-right:10px;" >
    医生给患者备注：{{row.patientRemake}}
    </div>
    <div style=" margin-right:10px;" >
    医生给转方备注：{{row.remark}}
    </div>
    </div>
<div  class="textLine">
     <div style=" margin-right:10px;" v-if=" row.presState !=  'NOT_TRANSLATED_PRESCRIPTION'">
    转方时间：{{row.transDate}}
    </div>
      <div style=" margin-right:10px;" v-if=" row.presState !=  'NOT_TRANSLATED_PRESCRIPTION'">
    转方医生：{{row.transDocName}}
    </div>
   <div style=" margin-right:10px;" v-if=" row.presState !=  'NOT_TRANSLATED_PRESCRIPTION'">
    转方备注：{{row.transRemark}}
    </div>
    </div>

<div  class="textLine">
      <div style=" margin-right:10px;" v-if=" row.presState ==  'REJECT_TRANSLATED_PRESCRIPTION'">
    转方退回时间：{{row.rejectTransTime}}
    </div>
  <div style=" margin-right:10px;" v-if=" row.presState ==  'REJECT_TRANSLATED_PRESCRIPTION'">
    转方退回医生：{{row.rejectTranName}}
    </div>

    
  <div style=" margin-right:10px;" v-if=" row.presState ==  'REJECT_TRANSLATED_PRESCRIPTION'">
    转方退回原因：{{row.returnReason}}
    </div>
    </div>

<div  class="textLine">
    <div style=" margin-right:10px;" v-if=" row.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && row.presState !=  'REJECT_AUDIT_PRESCRIPTION'  && row.presState != 'REJECT_TRANSLATED_PRESCRIPTION'&& row.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方时间：{{row.auditingDate}}
    </div>
   <div style=" margin-right:10px;" v-if=" row.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && row.presState != 'REJECT_AUDIT_PRESCRIPTION' &&  row.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方医生：{{row.auditingName}}
    </div>
    </div>

<div  class="textLine">
      <div style=" margin-right:10px;" v-if="row.presState == 'REJECT_AUDIT_PRESCRIPTION' ||row.rejectAuditTime">
    审方退回时间：{{row.rejectAuditTime}}
    </div>
   <div style=" margin-right:10px;" v-if="row.presState == 'REJECT_AUDIT_PRESCRIPTION' ||row.rejectAuditTime">
    审方退回医生：{{row.rejectAuditName}}
    </div>
   <div style=" margin-right:10px;" v-if="row.presState == 'REJECT_AUDIT_PRESCRIPTION' || row.rejectAuditTime">
    审方退回原因：{{row.rejectAuditReason}}
    </div>
    </div>
    </div>

 <!-- class="diy_collapse" -->


<el-collapse v-model="activeNames">

  
  <el-collapse-item title="处方图片" name="picture">
    <div style="width:100%;text-align:center">
<corpperlabel ref="cropper" :preImageList="preImageList"></corpperlabel>
</div>
  </el-collapse-item>
 
  <el-collapse-item   v-for="(center,index) in  detailInfo" :title="center.title" :name="center.title">

          <div v-for="(item,index) in center.children" class="flex" style="width:50%;margin-left:20px;">
        <div style="line-height:30px;min-width:100px;">
            {{item.name}}：
        </div>
        <div style="line-height:30px;min-width:180px;">
            {{row[item.key]}}
        </div>
    </div>

  </el-collapse-item>
</el-collapse>



<h4 v-if="row.presState != 'NOT_TRANSLATED_PRESCRIPTION'">药品信息</h4>
<el-table border v-if="row.presState != 'NOT_TRANSLATED_PRESCRIPTION'"
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

   
    </el-table>
<div style="text-align:right; margin-top:20px;    padding-top: 10px;">
<div>治疗服务费：<span style="color:red">￥{{row.serviceMoney}}</span></div>
<div >药品总价：<span style="color:red">￥{{row.presscriptionMoney?row.presscriptionMoney:0}}</span></div>
<div >合计：<span style="color:red">￥{{row.orderMoney?row.orderMoney:row.serviceMoney}}</span></div>
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
import corpperlabel from './corpperlabel'

@Component({
  props: {},
  components: {
    corpperlabel
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  @Prop({ required: false })
  prescriptionEnums: any;
  @Prop({ required: false })
  operationType: any;
  @Prop({ required: false })
    row

detailInfo= [
 {
   title:'患者信息',
   children:[
      {name:'姓名',key:'memberName'},
      {name:'性别',key:'patientSex'},
      {name:'年龄',key:'memberAge'},
      {name:'地址',key:'consigneeAddress'},
      {name:'手机号：',key:'memberPhone'},
      {name:'身份证',key:'memberIdcard'},
   ]
 },
 {
   title:'医生信息',
   children:[
      {name:'医生姓名',key:'docterName'},
      {name:'医生电话',key:'doctorMobile'},
      {name:'医生医院',key:'hospitalName'},
      {name:'科室',key:'docterDept'},
          {name:'诊断',key:'diagnose'},
   ]
 } 
]

model = false
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
  preIndex = 0;
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
        if (this.$route.path == "/audit") {
          return "已驳回转方";
        } else {
          return "审方退回";
        }
      default:
        return "";
    }
  }
  activeNames = ["picture","患者信息","医生信息"]
  preImageList = [];

getPrePic(presId) {
    indexApi.getPrePic({ preId: presId }).then(res => {
      if (res["retCode"]) {
        this.preImageList = res.data;
         if(res.data.length>0){
          let a:any =    this.$refs.cropper
     a.changePreImageUrl(0);
        }
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });

  }

  preDrugList = [];
  queryPresDrugback(presId) {

    if(this.row.presState =='REJECT_AUDIT_PRESCRIPTION' || this.row.presState =='REJECT_TRANSLATED_PRESCRIPTION'){
    indexApi.queryPresDrug({ preId: presId }).then(res => {
      if (res["retCode"]) {
        this.preDrugList = res.data.data;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
    }else{
       indexApi
      .queryPresDrugback({
        preId: presId
      })
      .then(res => {
        if (res["retCode"]) {
          console.log("处方id查询药品列表", res);
          this.preDrugList = res.data;
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      }); 
    }
  


  }

getInfo(){
    this.model = true;
    setTimeout(() => {
    this.preImageList = [];
    this.queryPresDrugback(this.row.presId);
    this.getPrePic(this.row.presId);
    },100)
}
  mounted() {


      
  }
}
</script>

<style  scoped>
.el-dialog__body{
  overflow: hidden;
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
.el-dialog__body{
  padding:10px 20px;
}
.textLine{margin-bottom:5px;
  font-size: 14.8px;display:flex;    flex-wrap: wrap;
}
</style>