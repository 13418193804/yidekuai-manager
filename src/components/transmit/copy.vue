<template>
    <div>
       
       <div style="border-bottom:1px #e5e5e5 solid;display:flex;    align-items: center;padding:20px 0;">

      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item >
      <span  style="font-weight: 600; font-size:20px;color:#2c3e50;">处方管理</span></el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/transmit' }" style="font-size:16px;line-height:20px;color:#2c3e50;"><span class="fllll" style="cursor: pointer;">转方管理</span></el-breadcrumb-item>
</el-breadcrumb>

 <div >
<span style="margin:0 20px;">总计 {{allprescription}} 个</span>             
<span style="margin-right:20px;">未转方 {{notCount}} 个</span>             
            </div>
        </div>



<el-row :gutter="24"  style="padding:20px 0;">
  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8">


      <div style="min-width:500px;display: flex;align-items: center;
    justify-content: center;    overflow: hidden;
   height: 60vh; ">
          <img :src="preImageList[preIndex].presImageUrl"/>
      </div>
<div style="width:100%;display: flex;margin:10px 0;      overflow: auto; " >
    <div  v-for="(item,index) in preImageList" style="display: flex;margin-right:20px;" @click="preIndex = index" class="" :class="preIndex == index ?'selectImage':'noselect'" >
          <img :src="item.presImageUrl" style="width:100px;height:100px;"/>
    </div>

</div>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="8">
	 <el-form label-width="120px">

                <el-form-item  >
                 <el-button size="medium" type="primary" @click="changeModel()">选择药品</el-button>
				</el-form-item>

				<el-form-item label="药品名称：" >
                  
                       <el-input v-model="drug.commonName"
  placeholder="请选择药品"   disabled
  clearable>
</el-input>
				</el-form-item>		
            
	<el-form-item label="药品规格：" >


                      <el-input v-model="drug.specification"
  placeholder="请输入药品规格"  
  clearable>
</el-input>



				</el-form-item>	


          
                  <el-form-item label="供应商：" >
                      <el-input v-model="drug.manufacturer"
  placeholder="请输入供应商"  
  clearable>
</el-input>
				</el-form-item>		




                  <el-form-item label="用法：" >
                      <el-input v-model="drug.usages"
  placeholder="请输入用法"  
  clearable>
</el-input>
				</el-form-item>		
            


            
         <el-form-item label="单次用量：" >
                      <el-input v-model="drug.dosage"
  placeholder="请输入单次用量"  
  clearable>
</el-input>
				</el-form-item>		
                     
                     
         <el-form-item label="频次：" >
                      <el-input v-model="drug.frequency"
  placeholder="请输入频次"  
  clearable>
</el-input>
				</el-form-item>	
                    <el-form-item label="数量：" >
                      <el-input v-model="drug.quantity"
  placeholder="请输入数量"  type="number"
  >
</el-input>
	</el-form-item>



  
      <el-form-item label="药品价格：" >
                      <el-input v-model="drug.price"
  placeholder="请输入药品价格"  
  clearable>
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
      prop="drugName"
      label="药品名称">
   </el-table-column>
  <el-table-column
      prop="partnerName"
      label="供应商">
   </el-table-column>
  <el-table-column
      prop="specification"
      label="药品规格">
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

<div style="text-align:center;padding:15px">
                 <el-button size="small" type="primary" @click="dotransmit()" >转方</el-button>
</div>


 <div style=" border: 1px #e5e5e5 solid;margin-top:20px;">
<h3 style="text-align:center">患者信息</h3>
	 <el-form label-width="100px" :inline="true" style="padding:20px 0;">

<el-row :gutter="24"  >
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item  label="姓名：">
                 {{prodetail.memberName}}
				</el-form-item>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="性别：">
                 {{prodetail.patientSex}}
				</el-form-item>
  </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="年龄：">
                 {{prodetail.memberAge}}
				</el-form-item>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="科室：">
                 {{prodetail.docterDept}}
				</el-form-item>
  </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="诊断：">
                 {{prodetail.diagnose}}
				</el-form-item>
  </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="地址/电话：">
                 {{prodetail.memberPhone}}
				</el-form-item>
  </el-col>

</el-row>

<el-row :gutter="24"  >

    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
   <el-form-item  label="医生姓名：">
                 {{prodetail.transDocName}}
				</el-form-item>
  </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
   <el-form-item  label="医生电话：">
                 {{prodetail.doctorMobile}}
				</el-form-item>
  </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
   <el-form-item  label="医生医院：">
                 {{prodetail.hospitalName}}
				</el-form-item>
  </el-col>
</el-row>
</el-form>


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

@Component({
  props: {},
  components: {
    filterdrug
  }
})
export default class AddGoods extends Vue {
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
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  get notCount() {
    return this.countPreByStatuObj["data1"]
      ? this.countPreByStatuObj["data1"].count
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

  loading = false;
  docreateDrug() {
    if (!this.drug["quantity"] || this.drug["quantity"] == 0) {
      this.$alert("请输入药品数量");
      return;
    }
    if (!this.drug["price"] || this.drug["price"] == 0) {
      this.$alert("请输入药品金额");
      return;
    }

    this.drug["partnerName"] = this.drug["manufacturer"];
    this.drug["preId"] = this.presId;
    this.drug["drugName"] = this.drug["commonName"];
    this.drug["guidance"] = this.drug["price"];
    this.loading = true;

    indexApi.docreateDrug(this.drug).then(res => {
      this.loading = false;
      if (res["retCode"]) {
        this.queryPresDrug();
        console.log(res);
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  preIndex = 0;
  preDrugList = [];
  queryPresDrug() {
    indexApi.queryPresDrug({ preId: this.presId }).then(res => {
      if (res["retCode"]) {
        this.preDrugList = res.data;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  dotransmit() {
    console.log("转方");

    console.log("药品数", this.preDrugList.length);

    if (this.preDrugList.length == 0) {
      this.$alert("至少添加一条药品信息");
      return;
    }

    this.$confirm("药品填写完成?现在开始转方?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        let temporaryPrescriptiondrugIds = [];
        this.preDrugList.forEach((item, index) => {
          temporaryPrescriptiondrugIds.push(item.prescriptionDrugId);
          if (temporaryPrescriptiondrugIds.length == this.preDrugList.length) {
            indexApi
              .dotransmit({
                temporaryPrescriptiondrugId: temporaryPrescriptiondrugIds.join(
                  ","
                ),
                prescriptionId: this.presId
              })
              .then(res => {
                if (res["retCode"]) {
                  this.$message("转方成功");
                  this.$router.push("/transmit");
                } else {
                  if(!res['islogin']){this.$alert(res["message"]);}
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
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
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
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  mounted() {
    this.presId = sessionStorage.presId;
    this.queryPresDrug();
    this.getPrePic();
    this.queryPresDetatil();
    this.countPreByStatu();
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