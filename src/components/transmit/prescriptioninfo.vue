<template>
    <div >
  
  <!-- class="min_box" -->
		<el-dialog width= "70vw" class="small_box" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="model"  title="处方详情" @close="prsinfoCancel()">
<!-- 
<div class="min_title">
医患信息
</div> -->
<!-- v-model="activeNames" @change="handleChange" -->
<el-button type="success" size="mini" @click="previewModel=true" style="float: right;" v-if="row.preDrugType == 'CHINESE_MEDICINE' || row.preDrugType == 'WESTERN_MEDICINE' || row.preDrugType == 'PASTE_PRESCRIPTION'">预览</el-button>

<div style="font-size:15px;">

<div class="flex flex-warp-justify" style="      line-height: 32px;  margin-bottom: 5px;">
  <h4 style="margin:0">处方状态：</h4>
<div style="margin-right:10px;">
    {{ handleStatus(row.presState)  }}
</div>


  <h4 style="margin:0" >处方类型：</h4>
  
<div style="margin-right:10px;" v-if="row.preDrugType">
  <el-tag v-for="n in row.preDrugType.split(',')" style="margin-right:10px;" :type="handlepreDrugType1(n).type">
        {{handlepreDrugType1(n).name}}
</el-tag>

</div>



  <h4 style="margin:0">订单类型：</h4>
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


<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;" v-if="row.preDrugType == 'CHINESE_MEDICINE'">
    <div style="     font-size: 15px;     margin-right:10px;">
    用法用量： 共{{row.allDosage}}剂，每日{{row.everydayDosage}}剂，1剂分{{row.everytimeDosage}}服用
    </div>
   </div>

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;" v-if="row.preDrugType == 'PASTE_PRESCRIPTION'">
    <div style="     font-size: 15px;     margin-right:10px;">
    用法用量：每日{{row.everydayTimes}}次，每次{{row.everytimesG}}克，约服{{row.howManyDay}}天
    </div>
   </div>

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;" v-if="row.preDrugType == 'PASTE_PRESCRIPTION'">
    <div style="     font-size: 15px;     margin-right:10px;">
    辅料：{{list2string(row.otherAccessories,row.aspartame,row.sugarType)}}
    </div>
   <div>
   </div>
    </div>

 <!-- class="diy_collapse" -->


<el-collapse v-model="activeNames">

  
  <el-collapse-item title="处方图片" name="picture" v-if="row.prescriptionType != 'ONLINE'">
    <div style="width:100%;text-align:center">
<corpperlabel ref="cropper" @getInfo="getInfo" :preImageList="preImageList" :presId="row.presId" :haveSave="true" :haveDetele="true" :temporary="true"
:notHaveAdd="row.presState == 'NOT_TRANSLATED_PRESCRIPTION' || row.presState == 'REJECT_AUDIT_PRESCRIPTION'|| row.presState == 'FAIL_TRANSLATED_PRESCRIPTION' || row.presState == 'GIVEUP_PRESCRIPTION'"
></corpperlabel>
</div>
  </el-collapse-item>
 
  <el-collapse-item   v-for="(center,index) in  detailInfo" :key="index" :title="center.title" :name="center.title">

          <div v-for="(item,index) in center.children" :key="index" class="flex" style="width:50%;margin-left:20px;">
        <div style="line-height:30px;min-width:100px;">
            {{item.name}}：
        </div>
        <div style="line-height:30px;min-width:180px;">
         <span v-if="item.key == 'consigneeAddress'">{{row.province}}{{row.city}}{{row.area}}</span>   {{row[item.key]}}
        </div>
    </div>

  </el-collapse-item>
</el-collapse>



<h4 v-if="row.presState != 'NOT_TRANSLATED_PRESCRIPTION'">药品信息</h4>


  <el-tabs v-model="drugType"  v-if="row.presState != 'NOT_TRANSLATED_PRESCRIPTION'">
    <el-tab-pane  label="中药" name="CHINESE" v-if="CHINESE_preDrugList.length>0">
<el-table border
    :data="CHINESE_preDrugList"
    stripe
    style="width: 100%">
    <el-table-column  fixed="left"
      prop="codeId"
      label="药品编码">
   </el-table-column>

  <el-table-column 
      prop="drugName"
      label="药材名称">
   </el-table-column>


  <el-table-column
      prop="productName"
      label="别名">
   </el-table-column>

  <el-table-column
      prop="producingArea"
      label="产地">
   </el-table-column>

  <el-table-column
      prop="typeName"
      label="类名">
   </el-table-column>
   
  <el-table-column
      prop="manufacturer"
      label="供应商">
   </el-table-column>


  <el-table-column
      prop="packingUnit"
      label="单位">
   </el-table-column>
   
  <el-table-column
      prop="decoctingType"
      label="煎煮方式">
   </el-table-column>

    <el-table-column
      prop="chineseType"
      label="类型">
   </el-table-column>


  <el-table-column
      prop="instructions"
      label="使用说明">
   </el-table-column>

  <el-table-column
      prop="showQuantity"
      label="单剂数量">
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

      <div style="text-align:right;">代煎费：<span style="color:red" >￥{{row.replaceDecoctingMoney}}</span></div>
          <div style="text-align:right;" v-if="row.presState!='REJECT_AUDIT_PRESCRIPTION'">中药药品合计：<span style="color:red" >￥{{SplitPrescription.CHINESE_MEDICINE.presscriptionMoney}}</span></div>


    </el-tab-pane>
    <el-tab-pane  label="西药" name="WESTERN" v-if="WESTERN_preDrugList.length>0">


<el-table border
    :data="WESTERN_preDrugList"
    stripe
    style="width: 100%">

       <el-table-column  fixed="left"
      prop="codeId"
      label="药品编码">
   </el-table-column>


  <el-table-column
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
    <div style="text-align:right;" v-if="row.presState!='REJECT_AUDIT_PRESCRIPTION'">西药药品合计：<span style="color:red" >￥{{SplitPrescription.WESTERN_MEDICINE.presscriptionMoney}}</span></div>

   </el-tab-pane>
    <el-tab-pane  label="膏方" name="PASTE_PRESCRIPTION" v-if="PASTE_preDrugList.length>0">
<el-table border
    :data="PASTE_preDrugList"
    stripe
    style="width: 100%">

   
    <el-table-column  fixed="left"
      prop="codeId"
      label="药品编码">
   </el-table-column>

  <el-table-column 
      prop="drugName"
      label="药材名称">
   </el-table-column>


  <el-table-column
      prop="productName"
      label="别名">
   </el-table-column>

  <el-table-column
      prop="producingArea"
      label="产地">
   </el-table-column>

  <el-table-column
      prop="typeName"
      label="类名">
   </el-table-column>
   
  <el-table-column
      prop="manufacturer"
      label="供应商">
   </el-table-column>


  <el-table-column
      prop="packingUnit"
      label="单位">
   </el-table-column>


    <el-table-column
      prop="chineseType"
      label="类型">
   </el-table-column>


  <el-table-column
      prop="instructions"
      label="使用说明">
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

   <div style="text-align:right;">制作费：<span style="color:red" >￥{{row.makeMoney}}</span></div>
      <div style="text-align:right;" v-if="row.presState!='REJECT_AUDIT_PRESCRIPTION'">膏方药品合计：<span style="color:red" >￥{{SplitPrescription.PASTE_PRESCRIPTION.presscriptionMoney}}</span></div>
    </el-tab-pane>

    <el-tab-pane  label="器械" name="INSTRUMENTS" v-if="INSTRUMENTS_preDrugList.length>0">



<el-table border
    :data="INSTRUMENTS_preDrugList"
    stripe
    style="width: 100%">
     <el-table-column  fixed="left"
      prop="codeId"
      label="药品编码">
   </el-table-column>
  <el-table-column 
      prop="drugName"
      label="药材名称">
   </el-table-column>
  <el-table-column
      prop="productName"
      label="别名">
   </el-table-column>
  <el-table-column
      prop="manufacturer"
      label="供应商">
   </el-table-column>
     <el-table-column
      prop="specification"
      label="药品规格">
   </el-table-column>
  <el-table-column
      prop="packingUnit"
      label="单位">
   </el-table-column>
  <el-table-column
      prop="instructions"
      label="使用说明">
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


    </el-tab-pane>
    
  </el-tabs>

<div style="text-align:right; margin-top:20px;    padding-top: 10px;">
  <div v-if="row.preDrugType == 'PASTE_PRESCRIPTION'">制作费：<span style="color:red">￥{{row.makeMoney}}</span></div>
<div v-if="row.preDrugType == 'CHINESE_MEDICINE'">代煎费：<span style="color:red">￥{{row.replaceDecoctingMoney}}</span></div>
<div>治疗服务费：<span style="color:red">￥{{row.serviceMoney}}</span></div>
<div >药品总价：<span style="color:red">￥{{row.presscriptionMoney?row.presscriptionMoney:0}}</span></div>
<div >合计：<span style="color:red">￥{{row.orderMoney?row.orderMoney:row.serviceMoney}}</span></div>
</div>
                            
</el-dialog>

		<el-dialog width= "500" class="small_box" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="previewModel"  title="处方详情" >
<div style="text-align:center;">
<div style="    padding: 0 50px;
    text-align: right;">
  
  
<el-button size="mini" type="warning" @click="preViewApi()" >下载</el-button>

</div>
<iframe width='480' height='750' frameborder='0' allowtransparency='true' :src="previewUrl+row.presId"></iframe>
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
import corpperlabel from "./corpperlabel";
import { g_node_url, g_base_url } from "../../api/conf";

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
  row;

  previewModel = false;
  detailInfo = [
    {
      title: "患者信息",
      children: [
        { name: "姓名", key: "memberName" },
        { name: "性别", key: "patientSex" },
        { name: "年龄", key: "memberAge" },
        { name: "地址", key: "consigneeAddress" },
        { name: "手机号", key: "memberPhone" },
        { name: "身份证", key: "memberIdcard" }
      ]
    },
    {
      title: "医生信息",
      children: [
        { name: "医生姓名", key: "docterName" },
        { name: "医生电话", key: "doctorMobile" },
        { name: "医生医院", key: "hospitalName" },
        { name: "科室", key: "docterDept" },
        { name: "诊断", key: "diagnose" }
      ]
    }
  ];
  list2string(...list) {
    let a = [];
    for (let n in list) {
      if (list[n]) {
        for (let j in JSON.parse(list[n])) {
          a.push(JSON.parse(list[n])[j]);
        }
      }
    }
    return a.join(",");
  }
  model = false;
  handleprescriptionType(prescriptionType) {
    switch (prescriptionType) {
      case "BACK_HANDWORK":
        return "线下订单";
      case "DOC_HANDWORK":
        return "直接开方";
      case "ONLINE":
        return "在线处方";
      case "PHOTO":
        return "普通单";
      default:
        return "";
    }
  }
  handlepreDrugType(preDrugType) {
    switch (preDrugType) {
      case "CHINESE_MEDICINE":
        return "中药";
      case "WESTERN_MEDICINE":
        return "西药";
      case "PASTE_PRESCRIPTION":
        return "膏方";
      case "INSTRUMENTS":
        return "器械";
      default:
        return "";
    }
  }
  handlepreDrugType1(preDrugType) {
    switch (preDrugType) {
      case "CHINESE_MEDICINE":
        return {
          name: "中药",
          type: "success"
        };
      case "WESTERN_MEDICINE":
        return {
          name: "西药",
          type: "warning"
        };
      case "PASTE_PRESCRIPTION":
        return {
          name: "膏方",
          type: ""
        };
      case "INSTRUMENTS":
        return {
          name: "器械",
          type: "danger"
        };
      default:
        return {
          name: "",
          type: ""
        };
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
      case "GIVEUP_PRESCRIPTION":
        return "弃单";
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
  activeNames = ["picture", "患者信息", "医生信息"];
  preImageList = [];

  getPrePic(presId) {
    indexApi.getPrePic({ preId: presId }).then(res => {
      if (res["retCode"]) {
        this.preImageList = res.data;
        if (res.data.length > 0) {
          console.log(this.$refs);
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

  preDrugList = [];
  CHINESE_preDrugList = [];
  PASTE_preDrugList = [];
  WESTERN_preDrugList = [];
  INSTRUMENTS_preDrugList = [];
  queryPresDrugback(presId) {
    if (
      this.row.presState == "REJECT_AUDIT_PRESCRIPTION" ||
      this.row.presState == "REJECT_TRANSLATED_PRESCRIPTION"
    ) {
      indexApi.queryPresDrug({ preId: presId }).then(res => {
        if (res["retCode"]) {
          this.preDrugList = res.data.data;

          this.CHINESE_preDrugList = res.data.data.filter(item => {
            return item.preDrugType == "CHINESE_MEDICINE";
          });

          this.PASTE_preDrugList = res.data.data.filter(item => {
            return item.preDrugType == "PASTE_PRESCRIPTION";
          });

          this.WESTERN_preDrugList = res.data.data.filter(item => {
            return item.preDrugType == "WESTERN_MEDICINE";
          });

          this.INSTRUMENTS_preDrugList = res.data.data.filter(item => {
            return item.preDrugType == "INSTRUMENTS";
          });

          this.drugType = this.handleValue(
            this.CHINESE_preDrugList,
            this.WESTERN_preDrugList,
            this.PASTE_preDrugList,
            this.INSTRUMENTS_preDrugList
          );
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    } else {
      indexApi
        .queryPresDrugback({
          preId: presId
        })
        .then(res => {
          if (res["retCode"]) {
            console.log("处方id查询药品列表", res);
            this.preDrugList = res.data;

            this.CHINESE_preDrugList = res.data.filter(item => {
              return item.preDrugType == "CHINESE_MEDICINE";
            });

            this.PASTE_preDrugList = res.data.filter(item => {
              return item.preDrugType == "PASTE_PRESCRIPTION";
            });

            this.WESTERN_preDrugList = res.data.filter(item => {
              return item.preDrugType == "WESTERN_MEDICINE";
            });
            this.INSTRUMENTS_preDrugList = res.data.filter(item => {
              return item.preDrugType == "INSTRUMENTS";
            });

            this.drugType = this.handleValue(
              this.CHINESE_preDrugList,
              this.WESTERN_preDrugList,
              this.PASTE_preDrugList,
              this.INSTRUMENTS_preDrugList
            );
          } else {
            if (!res["islogin"]) {
              this.$alert(res["message"]);
            }
            console.error("数据查询错误");
          }
        });
    }
  }

  handleValue(CHINESE_preDrugList, WESTERN_preDrugList, PASTE_preDrugList,INSTRUMENTS_preDrugList) {
    if (CHINESE_preDrugList.length > 0) {
      return "CHINESE";
    }

    if (WESTERN_preDrugList.length > 0) {
      return "WESTERN";
    }

    if (PASTE_preDrugList.length > 0) {
      return "PASTE_PRESCRIPTION";
    }

    if (INSTRUMENTS_preDrugList.length > 0) {
      return "INSTRUMENTS";
    }
    return "";
  }

  prsinfoCancel() {
    let a: any = this.$refs.cropper;
    a.fileList = [];
  }

  preViewApi() {
    indexApi.preViewApi(this.row.presId);
  }

  getInfo() {
    this.model = true;
    this.$nextTick(() => {
      this.preImageList = [];
      this.queryPresDrugback(this.row.presId);
      this.getPrePic(this.row.presId);
      this.queryPresDetatil();
    });
  }
  queryPresDetatil() {
    indexApi.queryPresDetatil({ preId: this.row.presId }).then(res => {
      if (res["retCode"]) {
        console.log(res);
        this.SplitPrescription = res.data.SplitPrescription;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
    });
  }
  drugType = "CHINESE";
  SplitPrescription = {};
  previewUrl = `${g_node_url}/?host=${g_base_url}&presId=`;
  mounted() {}
}
</script>

<style  scoped>
.el-dialog__body {
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
.el-dialog__body {
  padding: 10px 20px;
}
.textLine {
  margin-bottom: 5px;
  font-size: 14.8px;
  display: flex;
  flex-wrap: wrap;
}
</style>