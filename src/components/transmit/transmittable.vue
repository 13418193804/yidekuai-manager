<template>
    <div >

<el-table border
    :data="table"
    stripe height="500"
    style="width: 100%;">


   <el-table-column  fixed="left"
      label="状态" width="150">
      <template slot-scope="scope">
      {{handleStatus(scope.row.presState)}}
      </template>
   </el-table-column>

  <el-table-column
      prop="createDate"
      label="开方时间"  width="170">
   </el-table-column>

   <el-table-column
      prop="docterName"
      label="开方医生" width="150">
   </el-table-column>

   <el-table-column
      prop="doctorMobile"
      label="开方医生手机号" width="170">
   </el-table-column>

   
      <el-table-column
      prop="hospitalName"
      label="医院" width="190">
   </el-table-column>

      <el-table-column
      prop="docterDept"
      label="科室" width="130">
   </el-table-column>
   <el-table-column
      prop="memberName"
      label="患者姓名" width="150">
   </el-table-column>
    <el-table-column
      prop="patientSex"
      label="患者性别" width="150">
   </el-table-column>
 <el-table-column
      prop="memberAge"
      label="患者年龄" width="150">
   </el-table-column>
  <el-table-column
      prop="memberPhone"
      label="患者手机号" width="170">
   </el-table-column>
     <el-table-column
      prop="consigneeAddress"
      label="患者地址" width="200">
   </el-table-column>
  <el-table-column
      prop="patientRemake"
      label="医生给患者备注"  width="170">
   </el-table-column>

   <el-table-column
      prop="remark"
      label="医生给转方备注"  width="170">
   </el-table-column>


   <el-table-column
      prop="transDocName"
      label="转方医生" width="150">
   </el-table-column>
   <el-table-column
      prop="transDate"
      label="转方时间" width="170">
   </el-table-column>
  <el-table-column
      prop="transRemark"
      label="转方备注" width="220">
   </el-table-column>
  <el-table-column
      prop="auditingName"
      label="审方医生" width="150">
   </el-table-column>
  <el-table-column 
      prop="auditingDate"
      label="审方时间" width="170">
   </el-table-column>

  <el-table-column
      prop="diagnose"
      label="诊断" width="220">
   </el-table-column>


  <el-table-column
      prop="presId"
      label="处方编号" width="210">
   </el-table-column>


   <el-table-column label="操作" fixed="right"  width="200">
      <template slot-scope="scope">

 
        <el-button
          size="mini"
          type="text"
          @click="changeModel(scope.$index, scope.row)" >处方详情</el-button>
       
        <el-button
          size="mini"
          type="primary"
          @click="handleransmit(scope.$index, scope.row)" 
          v-if="(scope.row.presState == 'NOT_TRANSLATED_PRESCRIPTION' || scope.row.presState == 'REJECT_AUDIT_PRESCRIPTION'|| scope.row.presState == 'FAIL_TRANSLATED_PRESCRIPTION') &&$route.path !== '/audit' "> 
          {{scope.row.presState !== 'NOT_TRANSLATED_PRESCRIPTION' ?'重新转方':'转方'}}</el-button>
          
        <el-button
          size="mini"
          type="primary"
          @click="audit(scope.$index, scope.row)" v-if=" $route.path == '/audit' && (scope.row.presState == 'ALREADY_TRANSLATED_PRESCRIPTION' || scope.row.presState == 'FAIL_AUDIT_PRESCRIPTION')">{{ scope.row.presState == 'FAIL_AUDIT_PRESCRIPTION'?'重新审方':'审方'}}</el-button>
       
   

      
  <!-- <el-button
          size="mini"
          type="primary"
          @click="handleransmit(scope.$index, scope.row)" v-if="prescriptionEnums == 'ALREADY_AUDIT_PRESCRIPTION'">退回审方</el-button>
        -->

      </template>
    </el-table-column>
</el-table>



<prescriptioninfo ref="prescriptioninfo" :row="prescriptioninfoObj" ></prescriptioninfo>



	
    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Prop } from "vue-property-decorator";
import * as indexApi from "../../api/indexApi";
import  prescriptioninfo from "../transmit/prescriptioninfo";
@Component({
  props: {},
  components: {
    // categoryView,
    prescriptioninfo
  }
})
export default class AddGoods extends Vue {
  @Prop({ required: false })
  table: any;
  @Prop({ required: false })
  prescriptionEnums: any;
  @Prop({ required: false })
  operationType: any;


checkPrefor(presId,callback){
 indexApi.checkPrefor({
            preId: presId
          })
          .then(res => {
            if (res["retCode"]) {
                callback(true)
                console.log('这里是要检查',res.data)
            } else {
              if (!res["islogin"]) {
                callback(false)
                
              }
              console.error("数据查询错误");
            }
          });
}
  handleransmit(index, row) {
           sessionStorage.presId = row.presId;
    this.$router.push("/handleransmit");


// this.checkPrefor(row.presId,res=>{
//     if(res){
//         sessionStorage.presId = row.presId;
//     this.$router.push("/handleransmit");
//     }else{
//                 this.$message('该处方被占用');
//     }
// })
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
  audit(index, row) {
    sessionStorage.presId = row.presId;
    this.$router.push("/saveaudit");
  }
  row = {};
  model = false;

  prescriptioninfoObj = {}



  preImageList = [];
  changeModel(index, row) {
    this.row = row;
    this.prescriptioninfoObj = row
let a:any = this.$refs.prescriptioninfo
a.getInfo();
  }


  preDrugList = [];

  

  rejectTranslation() {}

  mounted() {
    console.log("this.prescriptionEnums", this.prescriptionEnums);
    console.log("this.table", this.table);
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