<template>
    <div v-loading="backLoad">
      

     
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


 


<div v-for="(item,index) in prodeInfo">
<h4 style="margin: 10px 0;">{{index == 0?'患者信息':'医生信息'}}</h4>
<div style="display:flex;    flex-wrap: wrap;margin-bottom:10px;" >
  <div style=" margin-top:10px;margin-right:10px;" v-for="items in item">
<span>{{items.title}}</span>
<span>{{prodetail[items.value]}}</span>
</div>
</div>
</div>



<el-row :gutter="24"  style="padding:20px 0;">
  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
    <corpperlabel ref="cropper" :preImageList="preImageList"></corpperlabel>
      </el-col>

  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
   
<el-table border
    :data="preDrugList"
    stripe :height="500"
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
</el-table>
<div style="padding:10px;font-size:14.8px;">
  <div>药品合计：<span style="color:red" >￥{{prodetail.presscriptionMoney}}</span></div>
  <div>服务费：<span style="color:red" >￥{{prodetail.serviceMoney}}</span></div>
  <div>合计：<span style="color:red" >￥{{prodetail.orderMoney}}</span></div>
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

	

    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Prop } from "vue-property-decorator";
import * as indexApi from "../../api/indexApi";
import corpperlabel from '../transmit/corpperlabel'

@Component({
  props: {},
  components: {corpperlabel}
})
export default class AddGoods extends Vue {

  prodeInfo=[
  [
    {title:'姓名：',value:'memberName'},
    {title:'性别：',value:'patientSex'},
    {title:'年龄：',value:'memberAge'},
    {title:'手机号：',value:'memberPhone'},
    {title:'地址：',value:'consigneeAddress'},
],
  [  {title:'医生医院：',value:'hospitalName'},
    {title:'科室：',value:'docterDept'},
    {title:'医生姓名：',value:'docterName'},
    {title:'医生电话：',value:'doctorMobile'},
              {title:'诊断：',value:'diagnose'},
              ]
  ]
 

  auditingRemake = "";
  presId = "";
  preDrugList = [];
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
  backLoad = false;
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
  checkPre() {




    
    this.$confirm("是否同意审方？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
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
              this.auditingRemake = '';

   if(res.data.nextPresId){
          this.getCountForList("xia", res.data.nextPresId);
          }else{
            this.$router.push("/audit");
          }

            } else {
              if(!res['islogin']){this.$alert(res["message"]);}
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
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }

  rejectContext = "";

  //审方把处方退回给转方
  doSubmit() {

    this.$confirm("确定要退回审方？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
    this.backLoad = true;
    indexApi
      .doKillPreAudit({
        prescriptionId: this.presId,
        auditingName:sessionStorage.name,
        rejectContext: this.auditingRemake
      })
      .then(res => {
        if (res["retCode"]) {
          this.backLoad = false;
          this.$message("退回成功");
          this.auditingRemake = '';

console.log(res)
          if(res.data.nextPresId){
          this.getCountForList("xia", res.data.nextPresId);
          }else{
            this.$router.push("/audit");
          }
          
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
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
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
  }

  preIndex = 0;
  preImageList = [];
  getPrePic() {
    indexApi.getPrePic({ preId: this.presId }).then(res => {
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
  prodetail = {};
  queryPresDetatil() {
    indexApi.queryPresDetatil({ preId: this.presId }).then(res => {
      if (res["retCode"]) {
        this.prodetail = res.data;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
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

     if(presId){
        sessionStorage.presId = presId
        this.init();
        return
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
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
        this.backLoad = false;
      }
    });
  }

  // auditObject
  init() {
    this.backLoad = true;
    console.log(sessionStorage.presId);

    this.presId = sessionStorage.presId;
    this.queryPresDrugback(); //药品列表
    this.getPrePic(); //图片
    this.queryPresDetatil(); //详情
    this.countPreByStatu(); //查各种状态
    this.allPrescription();

    this.backLoad = false;
    setTimeout(() => {
      if (this.backLoad) {
        this.backLoad = false;
      }
    }, 5000);
  }

  mounted() {
    this.presId = sessionStorage.presId;
    this.queryPresDrugback(); //药品列表
    this.getPrePic(); //图片
    this.queryPresDetatil(); //详情
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
</style>