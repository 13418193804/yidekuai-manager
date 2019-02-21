<template>
    <div >

<el-table border
    :data="table"
    stripe>


   <el-table-column  min-width="200"
      label="状态" >
      <template slot-scope="scope">


        <div>处方编号：{{scope.row.presId}}</div>
          <div>
     处方状态： {{handleStatus(scope.row.presState)}}
          </div>

          <div>
            订单类型：
               <el-tag v-if="scope.row.prescriptionType" size="mini"
  :type="handleprescriptionType(scope.row.prescriptionType).type">
        {{handleprescriptionType(scope.row.prescriptionType).name}}
</el-tag>
          </div>

    <div v-if="scope.row.preDrugType">
      处方类型：
  <el-tag size="mini" v-for="n in scope.row.preDrugType.split(',')" style="margin-right:10px;"
  :type="handlepreDrugType(n).type">
        {{handlepreDrugType(n).name}}
</el-tag>
    </div>



      </template>
   </el-table-column>

  <el-table-column
      label="操作时间"  width="240">
  <template slot-scope="scope">
          <div>
     开方时间： {{scope.row.createDate}}
          </div>
          <div>
转方医生：{{scope.row.transDocName}}
          </div>
          <div>
转方时间：{{scope.row.transDate}}
          </div>
                  <div>
审方时间：{{scope.row.auditingDate}}
          </div>
  <!-- <el-table-column
      prop="auditingName"
      label="审方医生" width="150">
   </el-table-column> -->
      </template>
   </el-table-column>


   <el-table-column
      label="医生" width="250">
  <template slot-scope="scope">
          <div>
     开方医生： {{scope.row.docterName}}
          </div>
          <div>
     手机号： {{scope.row.doctorMobile}}
          </div>   
                <div>
     医院： {{scope.row.hospitalName}}
          </div>   
           <div>
     科室： {{scope.row.docterDept}}
          </div>   
      </template>
   </el-table-column>

   <!-- <el-table-column
      prop="doctorMobile"
      label="开方医生手机号" width="170">
   </el-table-column> -->

   
      <!-- <el-table-column
      prop="hospitalName"
      label="医院" width="190">
   </el-table-column> -->

      <!-- <el-table-column
      prop="docterDept"
      label="科室" width="130">
   </el-table-column> -->

      <!-- prop="diagnose" -->

  <el-table-column width="250"
      label="备注" >
            <template slot-scope="scope">

<div>诊断：{{scope.row.diagnose}}</div>
<div>医生给患者备注：{{scope.row.patientRemake}}</div>
<div>医生给转方备注：{{scope.row.remark}}</div>
<div>转方备注：{{scope.row.transRemark}}</div>
      </template>
   </el-table-column>


   
   <el-table-column
      label="患者" width="250">
  <template slot-scope="scope">
          <div>
     患者姓名： {{scope.row.memberName}}
          </div>
          <div>
     性别： {{scope.row.patientSex}}  年龄： {{scope.row.memberAge}}
          </div>   
                <div>
     手机号： {{scope.row.memberPhone}}
          </div>   
           <div>
     患者地址： {{scope.row.consigneeAddress}}
             
          </div>   
      </template>
   </el-table-column>
<!-- 
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
   </el-table-column>-->


   


   <!-- <el-table-column
      prop="transDocName"
      label="转方医生" width="150">
   </el-table-column> -->
   <!-- <el-table-column
      prop="transDate"
      label="转方时间" width="170">
   </el-table-column> -->
   
        <!-- <el-table-column
      label="处方类型" width="200">
      <template slot-scope="scope">
    <div v-if="scope.row.preDrugType">
  <el-tag v-for="n in scope.row.preDrugType.split(',')" style="margin-right:10px;"
  :type="handlepreDrugType(n).type">
        {{handlepreDrugType(n).name}}
</el-tag>
    </div>
      </template>
   </el-table-column> -->


   <!-- <el-table-column  
      label="订单类型" width="150">
      <template slot-scope="scope">
    <el-tag v-if="scope.row.prescriptionType"
  :type="handleprescriptionType(scope.row.prescriptionType).type">
        {{handleprescriptionType(scope.row.prescriptionType).name}}
</el-tag>
      </template>
   </el-table-column> -->


<!-- 

  <el-table-column
      prop="patientRemake"
      label="医生给患者备注"  width="170">
   </el-table-column>

   <el-table-column
      prop="remark"
      label="医生给转方备注"  width="170">
   </el-table-column>
  <el-table-column
      prop="transRemark"
      label="转方备注" width="220">
   </el-table-column>


  <el-table-column
      prop="presId"
      label="处方编号" width="210">
   </el-table-column> -->


   <el-table-column label="操作"   width="220">
      <template slot-scope="scope">

 <!-- @click="changeModel(scope.$index, scope.row)"  -->
        <el-button
          size="mini"
           @click="goPrescirptionOrderInfo(scope.row)">处方详情</el-button>
        
   <!-- <el-button
          size="mini"
          type="text"
          @click="addPrescription('edit', scope.row)" v-if="scope.row.presState == 'NOT_TRANSLATED_PRESCRIPTION' && (scope.row.prescriptionType == 'BACK_HANDWORK' || scope.row.prescriptionType == 'DOC_HANDWORK'  )" v-promiss.edit>完善</el-button> -->

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


		<el-dialog class="min_box" width= "70vw" :close-on-click-modal="false" 
    :title="add_model_type == 'add' ?'新增线下订单':`完善手工单（${handleprescriptionType(createForm.prescriptionType).name}）`"
     :append-to-body="true" :visible.sync="add_model"   >

<div style="min-height:500px;" v-bouncing="add_model_loading">
 <el-form label-width="100px">
<div class="min_title">
医患信息
</div>

<div  style="
    margin: 15px;
    "  class="flex">
<div class=" dashed_box" :class="(!createForm.docterId || filter_doctor) && add_model_type =='add'?'opactiy':''" v-on:mouseover="filter_doctor = true" v-on:mouseout="filter_doctor =false">
  <i class="iconfont icon-yisheng" style="font-size: 36px;position: absolute;top: 0px;left: 0;"></i>

  <div class="filter_min_box flex  flex-align-center flex-pack-center" v-if="(!createForm.docterId || filter_doctor) && add_model_type =='add'" @click="changefilter_box('doctor')">
   <i class="el-icon-plus" style="font-size:27px;" ></i>
  </div>
  

  <div :style="(!createForm.docterId || filter_doctor) && add_model_type =='add'?'opacity: 0.3;':''" style="min-width:220px;text-align:center;height: 100%;border-radius: 11px;">
<div style="padding:10px;">
    <img src="../../assets/876218396590085506.png" style="height:110px;width: 110px;margin: 5px 10px;"/>
    <div>{{createForm.docterName?createForm.docterName:'-'}}</div>
    <div>{{createForm.doctorMobile?createForm.doctorMobile:'-'}}</div>
    <div style="text-align:left;">医院：<span style=" color: #8492a6; font-size: 13px">{{createForm.hospitalName?createForm.hospitalName:'-'}}</span></div>
    <div style="text-align:left;">科室：<span style=" color: #8492a6; font-size: 13px">{{createForm.docterDept?createForm.docterDept:'-'}}</span></div>
  </div>
  </div>
  </div>
  <div class="flex-1" style="margin-left:15px;border-radius: 11px;">
    <!-- <i class="iconfont icon-huanzhe" style="    font-size: 27px;"></i> -->
<div class=" dashed_box" style="">


<div class="flex   flex-pack-justify flex-align-center" style="padding: 10px 10px 0 ;">
   <i class="iconfont icon-huanzhe" style="font-size: 24px;"></i>
   <div class="flex  flex-align-center opactiy" style="cursor: pointer;" @click="changefilter_box('menber')">
    <i class="iconfont icon-sousuo1"></i>
      <div>搜患者</div>
   </div>
</div>

<div  style="padding:0 10px 10px;" >
     <!-- :style="!createForm.memberId?'opacity: 0.3;':''"  -->
       <!-- <div class="filter_min_box  flex  flex-align-center flex-pack-center"  v-if="!createForm.memberId"> -->
   <!-- <i class="el-icon-plus" style="font-size:39px;" ></i> -->
  <!-- </div> -->


     <el-form-item  label="患者姓名：" style="margin:0">
        <el-input size="mini"
              placeholder="请输入患者姓名"
              v-model="createForm.memberName"
              clearable>
              </el-input>
  			</el-form-item>
     <el-form-item  label="患者手机号：" style="margin:0">
        <el-input size="mini"
              placeholder="请输入患者手机号"
              v-model="createForm.patientMobile"
              clearable>
              </el-input>
  			</el-form-item>

  <div >

<div class="flex">
  <div>
     <el-form-item  label="患者性别：" style="margin:0">
  <el-radio v-model="createForm.memberSex" label="男">男</el-radio>
  <el-radio  v-model="createForm.memberSex"  label="女">女</el-radio>
  			</el-form-item>
</div>
  <div class="flex-1">

<el-form-item  label="患者年龄：" style="margin:0">
        <el-input size="mini"
              placeholder="请输入患者年龄"
              v-model="createForm.memberAge"
              clearable>
              </el-input>
  			</el-form-item>
</div>

</div>

   <el-form-item  label="患者身份证：" style="margin:0">
        <el-input size="mini"
              placeholder="请输入患者身份证"
              v-model="createForm.memberIdcard"
              clearable>
              </el-input>
  			</el-form-item>
<div style="margin: 10px 0;border-top: 1px #FAFAFA solid;"></div>
 <el-form-item  label="收件人：" style="margin:0">
        <el-input size="mini"
              placeholder="请输入收件人"
              v-model="createForm.consigneeName"
              clearable>
              </el-input>
  			</el-form-item>

     <el-form-item  label="收件号码：" style="margin:0">
        <el-input size="mini"
              placeholder="请输入收件号码"
              v-model="createForm.consigneePhone"
              clearable>
              </el-input>
  			</el-form-item>

		<el-form-item label="收货地区：" style="margin:0">
<div style="    white-space: nowrap;overflow:hidden;">
<el-row :gutter="24" >
  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" >
<el-select v-model="createForm.provinceid" @change="queryCityList()" size="mini">
<el-option v-for="(n,index) in provinceList" :key="index" :label="n.name" :value="n.id" ></el-option>
</el-select>
  </el-col>

  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" >


        <el-select v-model="createForm.cityid" @change="queryCountryList()" size="mini">
<el-option v-for="(n,index) in cityList" :key="index" :label="n.name" :value="n.id"></el-option>
</el-select>

  </el-col>

  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" >

        <el-select v-model="createForm.areaid" size="mini">
<el-option v-for="(n,index) in countryList" :key="index" :label="n.name" :value="n.id"></el-option>
</el-select>
  </el-col>
</el-row>
		</div>
    		</el-form-item>

		<el-form-item label="收件地址：" style="margin:0">
					<el-input v-model="createForm.consigneeAddress"  placeholder="请输入收件地址" maxlength="50" size="mini"  clearable></el-input>
				</el-form-item>


</div>


  </div>
</div>
</div>
  </div>
<div class="min_title">
处方图片
</div>
<div style="padding: 15px;">

  <div style="margin-bottom:22px;" v-loading="add_upload_loading">
                <el-upload   accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"  :action="fileUploadUrl" list-type="picture-card" ref="upload" :before-upload="beforeUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess1" :file-list="fileList">
                  <i class="el-icon-plus"></i>
                </el-upload>
</div>

        <el-form-item  label="治疗服务费：">
            <el-input v-model="createForm.servicemoney" placeholder="请输入治疗服务费" size="small" style="max-width:400px;min-width:200px;"  >
                <span slot="suffix" style="margin:10px;cursor: pointer;font-size: 12px;" :style="createForm.feeTypeEnum =='SHOW' ?'color:#000':''" @click="changefeeTypeEnum()">{{createForm.feeTypeEnum =='SHOW' ?'已显示':'已隐藏'}}</span>
            </el-input>
  			</el-form-item>
</div>
</el-form>

</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="add_model = false" :disabled="cancelLoading">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')" :disabled="add_footer_loading" >确 定</el-button>
			</span>
        </el-dialog>
	
         <el-dialog  :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

		<el-dialog class="filter_box" width= "70vw" :close-on-click-modal="false" title="搜索" :append-to-body="true" :visible.sync="filter_model"   >

<div >
<div style="padding: 10px;text-align: left;" class="filter_select">
 <el-input placeholder="请输入手机号" size="small" style="min-width:200px;max-width:400px;" v-model="mobile" class="input-with-select">
     <el-select v-model="filter_type" slot="prepend" placeholder="请选择" class="filter_select">
      <el-option label="医生" value="doctor" :disabled="add_model_type == 'edit'"></el-option>
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
import prescriptioninfo from "../transmit/prescriptioninfo";
import * as doctorApi from "../../api/doctorApi";
import * as Config from "../../api/conf";
import * as ApiOrder from "../../api/orderapi";

@Component({
  props: {},
  components: {
    // categoryView,
    prescriptioninfo
  }
})
export default class AddGoods extends Vue {
  @Prop({ required: true })
  table: any ;
  @Prop({ required: false })
  prescriptionEnums: any;
  @Prop({ required: false })
  operationType: any;

  changefilter_box(filter_type) {
    this.filter_type = filter_type;
    this.filter_model = !this.filter_model;
    this.resultList = [];
    this.mobile = "";
  }

  filter_doctor = false;
  filter_type = "doctor";
  filter_model = false;

  add_model = false;
  add_model_loading = false;
  cancelLoading = false;
  add_footer_loading = false;
  add_upload_loading = false;
  noMessage_model = false;
  noMessage_loading = false;

  createForm: any = {
    feeTypeEnum: "SHOW",
    preTypeEnum: "BACK_HANDWORK"
  };

  submitForm() {
    if (
      ((this.createForm.doctorid || "") === "" &&
        this.add_model_type == "add") ||
      ((this.createForm.docterId || "") === "" && this.add_model_type == "edit")
    ) {
      this.$message("请选择医生");
      return;
    }

    // 不判断患者Id

    // if (
    //   ((this.createForm.memberid || "") === "" &&
    //     this.add_model_type == "add") ||
    //   ((this.createForm.memberId || "") === "" && this.add_model_type == "edit")
    // ) {
    //   this.$message("请选择患者");
    //   return;
    // }

    if (this.add_model_type == "add") {
      if ((this.createForm.memberName || "") === "") {
        this.$message("请输入患者姓名");
        return;
      }
      if ((this.createForm.patientMobile || "") === "") {
        this.$message("请输入患者手机号");
        return;
      }
    } else {
      if ((this.createForm.memberName || "") === "") {
        this.$message("请输入患者姓名");
        return;
      }

      if ((this.createForm.patientMobile || "") === "") {
        this.$message("请输入患者手机号");
        return;
      }

      if ((this.createForm.memberSex || "") === "") {
        this.$message("请选择患者性别");
        return;
      }

      if ((this.createForm.memberAge || "") === "") {
        this.$message("请输入患者年龄");
        return;
      }
      if ((this.createForm.memberIdcard || "") === "") {
        this.$message("请输入患者身份证");
        return;
      }
    }
    if (
      ((this.createForm.servicemoney || "") === "" &&
        this.add_model_type == "add") ||
      ((this.createForm.serviceMoney || "") === "" &&
        this.add_model_type == "edit")
    ) {
      this.$message("请输入治疗服务费");
      return;
    }

    if (this.fileList.length > 0 && this.add_model_type == "add") {
      this.createForm.photourl = this.fileList
        .map(item => {
          return item.url;
        })
        .join(",");
    } else if (this.fileList.length > 0 && this.add_model_type == "edit") {
      this.createForm.pictureIds = this.fileList
        .map(item => {
          return item.url;
        })
        .join(",");
    } else {
      this.$message("请上传处方图片");
      return;
    }

    let showLoading = () => {
      this.add_model_loading = true;
      this.add_footer_loading = true;
      this.cancelLoading = true;
    };
    let closeLoading = () => {
      this.add_model_loading = false;
      this.add_footer_loading = false;
      this.cancelLoading = false;
    };
    if (this.add_model_type === "edit") {
      this.createForm.serviceMoney = this.createForm.servicemoney;
      this.createForm.feeHide = this.createForm.feeTypeEnum;
      if ((this.createForm.consigneeName || "") === "") {
        this.$message("请输入收件人");
        return;
      }
      if ((this.createForm.consigneePhone || "") === "") {
        this.$message("请输入收件号码");
        return;
      }
      if (
        (this.createForm.provinceid || "") === "" ||
        (this.createForm.cityid || "") === "" ||
        (this.createForm.areaid || "") === ""
      ) {
        this.$message("请选择收货地区");
        return;
      }
      if ((this.createForm.consigneeAddress || "") === "") {
        this.$message("请输入收件地址");
        return;
      }

      showLoading();
      indexApi.updatePre(this.createForm).then(res => {
        closeLoading();
        if (res["retCode"]) {
          this.$message("更新成功");
          this.add_model = false;
          this.$emit("getprescriptionList");
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    } else {
      showLoading();
      indexApi.createphotoprescription(this.createForm).then(res => {
        closeLoading();
        if (res["retCode"]) {
          this.$message("新增成功");
          this.add_model = false;
          this.$emit("getprescriptionList");
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    }
  }

  changefeeTypeEnum() {
    if (this.createForm.feeTypeEnum === "SHOW") {
      this.createForm.feeTypeEnum = "HIDE";
      return;
    }

    if (this.createForm.feeTypeEnum === "HIDE") {
      this.createForm.feeTypeEnum = "SHOW";
      return;
    }
  }

  fileList: any = [];
  handleSuccess1(response, file, fileList) {
    let dt = {
      name: "1.png",
      url: response.data.filename
    };
    this.fileList.push(dt);
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
  }

  dialogImageUrl = "";
  dialogVisible = false;
  handlePictureCardPreview(file) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }

  fileUploadUrl = "";
  beforeUpload(file) {
    this.add_upload_loading = true;
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      this.$message.error("上传图片大小不能超过 5MB!");
    }
    return isLt5M;
  }

  value = "";
  options4 = [];
  options5 = [];
  add_model_type = "add";

  //新增处方
  addPrescription(type, row) {
    this.createForm = {
      feeTypeEnum: "SHOW",
      preTypeEnum: "BACK_HANDWORK"
    };

    this.fileList = [];
    this.add_model_type = type;

    if (row) {
      this.add_model_loading = true;
      this.add_footer_loading = true;
      row.servicemoney = row.serviceMoney;

      row.feeTypeEnum = row.feeHide;
      this.getPrePic(row.presId, () => {
        let a = {};
        (<any>Object).assign(a, row);
        this.createForm = a;

        let cityid = this.createForm.cityid;
        let areaid = this.createForm.areaid;

        this.queryCityList();
        this.createForm.cityid = cityid;
        this.queryCountryList();
        this.createForm.areaid = areaid;
        this.add_model_loading = false;
        this.add_footer_loading = false;
      });
      this.add_model = !this.add_model;
    } else {
      // 清除缓存
      sessionStorage.presId = "";
      //跳去转方
      this.$router.push({
        name: "handleransmit",
        params: {
          pres_type: "BACK_HANDWORK"
        }
      });
    }
  }
  getPrePic(presId, callback) {
    indexApi.getPrePic({ preId: presId }).then(res => {
      if (res["retCode"]) {
        this.fileList = res.data.map(item => {
          return {
            name: "1.png",
            url: item.presImageUrl
          };
        });
      }
      callback();
    });
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
      this.createForm.patientMobile = item.phone;
      this.createForm.memberSex = item.sex;
      this.createForm.memberIdcard = item.idCard;
      this.createForm.memberAge = item.age;
      //查询默认收货地址
      this.getMenberdefaultaddress(item.memberId);
    }
    this.filter_model = false;
  }
  getMenberdefaultaddress(memberId) {
    indexApi
      .getMenberdefaultaddress({
        userId: memberId
      })
      .then(res => {
        if (res["retCode"]) {
          if (res.data.addressId) {
            this.createForm.consigneeName = res.data["contactName"];
            this.createForm.consigneePhone = res.data["contactMobile"];
            this.createForm.consigneeAddress = res.data["address"];
            this.createForm.provinceid = res.data["provinceid"];
            this.queryCityList();
            this.createForm.cityid = res.data["cityid"];
            this.queryCountryList();
            this.createForm.areaid = res.data["countryid"];
          }
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
  }
  changeMember(e) {
    let obj = this.options5.filter(item => {
      return e === item.memberId;
    })[0];

    if (obj.name) this.createForm.memberName = obj.name;
    if (obj.phone) this.createForm.phone = obj.phone;
  }

  mobile = "";

  resultList = [];

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

  handleransmit(index, row) {
    sessionStorage.presId = row.presId;
    //跳去转方
    this.$router.push({
      name: "handleransmit",
      params:
        row.prescriptionType === "DOC_HANDWORK"
          ? { pres_type: "DOC_HANDWORK" }
          : null
    });
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

  handlepreDrugType(preDrugType) {
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
  handleprescriptionType(prescriptionType) {
    switch (prescriptionType) {
      case "BACK_HANDWORK":
        return {
          name: "线下订单",
          type: "success"
        };
      case "ONLINE":
        return {
          name: "在线处方",
          type: "warning"
        };
      case "DOC_HANDWORK":
        return {
          name: "直接开方",
          type: "warning"
        };
      case "PHOTO":
        return {
          name: "普通单",
          type: ""
        };
      default:
        return {
          name: "",
          type: ""
        };
    }
  }
  audit(index, row) {
    sessionStorage.presId = row.presId;
    this.$router.push("/saveaudit");
  }
  row = {};
  model = false;
  prescriptioninfoObj = {};
  preImageList = [];


  changeModel(index, row) {
    this.row = row;
    this.prescriptioninfoObj = row;
    let a: any = this.$refs.prescriptioninfo;
    a.getInfo();
  }
  preDrugList = [];

  queryCountryList() {
    this.createForm.areaid = "";
    ApiOrder.queryCountryList(this.createForm.cityid).then(res => {
      this.countryList = res.data.region;
    });
  }
  queryCityList() {
    this.createForm.cityid = "";
    this.createForm.areaid = "";
    ApiOrder.queryCityList(this.createForm.provinceid).then(res => {
      this.cityList = res.data.region;
    });
  }

  queryProvinceList() {
    ApiOrder.queryProvinceList().then(res => {
      this.provinceList = res.data.region;
    });
  }
  provinceList = [];
  cityList = [];
  countryList = [];
  updated() {}


    goPrescirptionOrderInfo(row){
    
    let routeData = (<any>this.$router).resolve({
   name: "prescirptionOrderInfo",
   query:{resource:'prescirption',key: row.presId}
});
window.open(routeData.href, '_blank');
  }


  mounted() {
    console.log(this.table)
    this.queryProvinceList();
    this.fileUploadUrl = Config.g_upload_url;
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