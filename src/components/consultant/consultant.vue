<template>
    <div v-loading="loading">
    
        
         <div style="">
          <h3>顾问数据</h3>
 <div style="padding-bottom:20px;">
<span style="margin-right:20px;">顾问人数：{{adviserCount}} 个</span>             
<span style="margin-right:20px;">药品成交金额：{{payOrderMoney}} 元</span>       
<span style="margin-right:20px;">处方数量：{{prescriptionNum}} </span>       
<span style="margin-right:20px;">订单数量（已成交）{{payOrderNum}} </span>         
<span style="margin-right:20px;">药品数量：{{drugQuantityTotal}} </span>            
            </div>
        </div>
<div style="padding-bottom:20px;border-bottom:1px #e5e5e5 solid;">
<el-row :gutter="10">
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input v-model="name"
  placeholder="顾问姓名/医生姓名/手机号码" style="margin-top:20px;" 
  clearable>
</el-input>
  </el-col>
    <el-col :xs="8" :sm="8" :md="5" :lg="4" :xl="3">
  <el-select v-model="userStatus" placeholder="请选择状态" style="margin-top:20px;" >
                         <el-option label="全部"
                            value="">
                          </el-option>
                               <el-option
                            label="启用"
                            value="1">
                          </el-option>
                          <el-option
                            label="停用"
                            value="0">
                          </el-option>
  </el-select>
  </el-col>


  <!-- 状态 -->
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input v-model="drug"
  placeholder="药品名/通用名" style="margin-top:20px;" 
  clearable>
</el-input>
  </el-col>


 <el-col :xs="16" :sm="24" :md="6" :lg="8" :xl="5" style="min-width:470px;">
  	<el-date-picker v-model="startDate" type="date" placeholder="开始日期" style="margin-top:20px;"  >
						</el-date-picker>
						<el-date-picker v-model="endDate" type="date" placeholder="结束日期" style="margin-top:20px;"  >
						</el-date-picker>
  </el-col>




  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="    min-width: 325px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getConsultantList(true)">查询</el-button>
<el-button type="primary" style="margin-top:20px;" @click="changeModel('add')">添加顾问</el-button>
  </el-col>
</el-row>
</div>

<el-table border @sort-change="sortChange"
    :data="YdkAdviser"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="adviserName"
      label="顾问姓名"  width="150">
   </el-table-column>
   

 <el-table-column
      prop="doctorNum" sortable="custom"
      label="管理医生数量"  width="150">
                <template slot-scope="scope">
           {{scope.row.doctorNum?scope.row.doctorNum:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="orderNum" sortable="custom"
      label="总订单数量"  width="150" >
                <template slot-scope="scope">
           {{scope.row.orderNum?scope.row.orderNum:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="orderMoney" sortable="custom"
      label="总订单金额"  width="150">
             <template slot-scope="scope">
           {{scope.row.orderMoney?scope.row.orderMoney:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="prescriptionNum" sortable="custom"
      label="总处方数量"  width="150">
            <template slot-scope="scope">
           {{scope.row.prescriptionNum?scope.row.prescriptionNum:0}}
      </template>
   </el-table-column>
   
 <el-table-column
      prop="drugNum" sortable="custom"
      label="药品种类数量"  width="150">
              <template slot-scope="scope">
           {{scope.row.drugNum?scope.row.drugNum:0}}
      </template>
   </el-table-column>




 <el-table-column
      label="顾问类型">
      <template slot-scope="scope">
           {{scope.row.adviser_type=='OUTSIDE'?'外部顾问':''}}
           {{scope.row.adviser_type=='INSIDE'?'内部顾问':''}}
      </template>
   </el-table-column>
  <el-table-column
      prop="userName"
      label="手机号" width="150">
   </el-table-column>

 <el-table-column
      prop="adviserAge"
      label="年龄">
   </el-table-column>

 <el-table-column
      prop="adviserSex"
      label="性别">
   </el-table-column>
 

 <el-table-column
      label="使用状态">
      <template slot-scope="scope">
       <el-tag :type="scope.row.userStatus=='1' ?'success':'info'">
               {{scope.row.userStatus=='1' ?"启用中":"已停用"}}</el-tag>
      </template>
   </el-table-column>

 <el-table-column
      prop="remark"
      label="备注"  width="180">
   </el-table-column>

 <el-table-column label="操作" fixed="right"  width="400">
      <template slot-scope="scope">

             <el-button
          size="mini"
          type="text" @click="cleanConsultantItemShelf(scope.row)"
      >医生统计</el-button>

				<el-button size="small" type="text" @click="openNotBindDoctorModel(scope.row)" >分配医生</el-button>

                      <el-button
          size="mini"
          type="text" @click="adviserGetDrugDoRow(scope.row)"
        >药品统计</el-button>

        <el-button
          size="mini"
          type="text"
          @click="changeModel('edit',scope.row)" >编辑</el-button>
        <el-button type="text"  style="margin-top:20px;" @click="viewBigIcon(scope.row.qrcode)">二维码</el-button>

         <el-button @click="doDelete(scope.row)"
          size="mini"
          type="text"
        >删除</el-button>
      </template>
    </el-table-column>
</el-table>
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next"  :current-page="page+1" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>


<!--    ========================                    弹窗                ======================     -->
		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="adviserModel"  :title="type=='add'?'新增顾问':'编辑顾问'">

   <el-form label-width="120px" ref="ruleForm" :model="adviserObj"  :rules="rules">
				<el-form-item label="顾问姓名" prop="adviserName" >
              					<el-input v-model="adviserObj.adviserName"  placeholder="请输入顾问姓名" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>
                	<el-form-item label="手机号码" prop="userName" >
              					<el-input v-if="type=='add'" v-model="adviserObj.userName"  placeholder="请输入手机号码" style="max-width:400px;min-width:200px" ></el-input>
	<span v-else>	{{adviserObj.userName}}</span>
    
    		</el-form-item>

                		<el-form-item label="年龄" prop="adviserAge" >
              					<el-input v-model="adviserObj.adviserAge"  placeholder="请输入年龄" style="max-width:400px;min-width:200px" ></el-input>
			        	</el-form-item>	

		<el-form-item label="性别" prop="adviserSex" >
             <el-radio v-model="adviserObj.adviserSex" label="男"></el-radio>
  <el-radio v-model="adviserObj.adviserSex" label="女"></el-radio>
              					<!-- <el-input v-model="adviserObj.adviserAge"  placeholder="请输入年龄" style="max-width:400px;min-width:200px" ></el-input> -->
			        	</el-form-item>	


		<el-form-item label="类型" prop="adviserTypeEnums" >
             <el-radio v-model="adviserTypeEnums" label="INSIDE">内部顾问</el-radio>
  <el-radio v-model="adviserTypeEnums" label="OUTSIDE">外部顾问</el-radio>
              					<!-- <el-input v-model="adviserObj.adviserAge"  placeholder="请输入年龄" style="max-width:400px;min-width:200px" ></el-input> -->
			        	</el-form-item>	

                
                       
                        		<el-form-item label="备注" >
              					<el-input type="textarea" v-model="adviserObj.remark"  placeholder="备注"  :rows="4" style="max-width:400px;min-width:200px" ></el-input>
			        	</el-form-item>	
                
                
                
                  		<el-form-item label="状态"  v-if="type!=='add'">
                      <el-switch
  v-model="userStatus1"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
                         <!-- <el-select v-model="adviserObj.userStatus" placeholder="请选择状态">
                          <el-option
                            label="启用"
                            value="1">
                          </el-option>
                          <el-option
                            label="停用"
                            value="0">
                          </el-option>
                        </el-select> -->
			        	</el-form-item>	
                
                    </el-form >
                    	<div style="    margin-left: 120px;
    margin-bottom: 10px;" v-if="type!=='add'">
          <el-button
          size="mini"
          type="primary" @click="updateStatue('password',adviserObj)"
          >重置密码</el-button>
                <!-- <el-button
          size="mini"
          type="text" @click="updateStatue('status',adviserObj)"
          >{{adviserObj.userStatus=='1'?'停用':'启用'}}</el-button> -->
  </div>
			<span slot="footer" class="dialog-footer" >
				<el-button @click="adviserModel = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')" :disabled="loading">保 存</el-button>
			</span>
            </el-dialog>
             		<!-- <el-form-item label="医生姓名" >
              					<el-input   placeholder="请输入医生姓名" style="max-width:400px;min-width:200px" ></el-input>
			        	</el-form-item>	 -->

<!-- ==============         医生列表   ================================== -->
		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="shelfModel" v-loading="shelfObj.loading" title="医生统计">
    
    
<el-row :gutter="10" style="margin-bottom:20px;">



 <el-col :xs="16" :sm="24" :md="6" :lg="8" :xl="5" style="min-width:200px;">
  		<el-input clearable  v-model="shelfObj.name"  placeholder="请输入医生姓名/手机号码 " style="margin-top:20px;max-width:400px;min-width:200px" ></el-input>
  </el-col>

 <el-col :xs="16" :sm="24" :md="6" :lg="8" :xl="5" style="min-width:470px;">
  	<el-date-picker v-model="shelfObj.startcreateDate" type="date" placeholder="开始日期" style="margin-top:20px;"  >
						</el-date-picker>
						<el-date-picker v-model="shelfObj.endcreateDate" type="date" placeholder="结束日期" style="margin-top:20px;"  >
						</el-date-picker>
  </el-col>

  <!-- 状态、 注册时间  -->
  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="    min-width: 225px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="consultantItemShelf(shelfObj.row,true)">查询</el-button>
  </el-col>
</el-row>



<el-table border
    :data="shelfObj.DocterInfo"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="name"
      label="医生姓名">
   </el-table-column>
  <el-table-column
      prop="phone"
      label="电话号码" width="150">
   </el-table-column>
  <el-table-column
      prop="hspCode"
      label="医疗机构代码">
   </el-table-column>
     <el-table-column
      prop="hospitalName"
      label="医院" width="150">
   </el-table-column>
  <el-table-column
      prop="hospitalDepartment"
      label="科室">
   </el-table-column>
  <el-table-column
      prop="orderMoney"
      label="订单金额" width="150">
   </el-table-column>
  <el-table-column
      prop="prescriptionNum"
      label="处方数">
   </el-table-column>
  <el-table-column
      prop="drugNum"
      label="药品种类">
   </el-table-column>
  <el-table-column
      prop="memberNum"
      label="总患者数">
   </el-table-column>


     <el-table-column
      prop="createrTime"
      label="创建时间" width="150">
   </el-table-column>



    <el-table-column
      label="操作" fixed="right"  width="100">

     <template slot-scope="scope" >
        <el-button @click="adviserNotBindDoctor(scope.row)"
          size="mini"
          type="text"
         >取消绑定</el-button>
    
      </template>
   </el-table-column>


</el-table>

		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next"  :current-page="shelfObj.page+1" :page-size="shelfObj.pageSize" :total="shelfObj.total" @current-change="shelfObj.onPageChange">
			</el-pagination>
		</el-col>
            </el-dialog>



<!-- =============      添加绑定的医生   ================ -->
		<el-dialog width= "70vw" :close-on-click-modal="false" v-loading="notBindDoctorObj.addloading"  :append-to-body="true" :visible.sync="notBindDoctorObj.model"  title="分配医生">


 <el-row :gutter="10" style="margin-bottom:20px;">

 <el-col :xs="16" :sm="24" :md="6" :lg="8" :xl="5" style="min-width:400px;">
  		<el-input clearable  v-model="notBindDoctorObj.phone"  placeholder="请输入姓名/手机号/医院" style="max-width:400px;min-width:200px" ></el-input>
  </el-col>

  <!-- 状态、 注册时间  -->
  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="    min-width: 225px;">
<el-button type="primary" icon="el-icon-search"  style="" @click="openNotBindDoctorModel(notBindDoctorObj.row,true)">查询</el-button>
  </el-col>
</el-row>

<div style="min-height:500px;" >



<el-table border
    :data="notBindDoctorObj.YdkDoctor"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="name"
      label="医生姓名">
   </el-table-column>
 
   <el-table-column
      prop="phone"
      label="电话号码">
   </el-table-column>
 
  
   <el-table-column
      prop="hspCode"
      label="医疗机构代码">
   </el-table-column>
 

   <el-table-column
      prop="hospitalName"
      label="医院">
   </el-table-column>
   
   <el-table-column
      prop="hospitalDepartment"
      label="科室">
   </el-table-column>
 
    <el-table-column
      label="操作" fixed="right" width="100">

     <template slot-scope="scope" >
        <el-button @click="addDoctorbind(scope.row)"
          size="mini"
          type="text"
         >绑定</el-button>
    
      </template>
   </el-table-column>


</el-table>


</div>
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="notBindDoctorObj.page+1" :page-size="notBindDoctorObj.pageSize" :total="notBindDoctorObj.total" @current-change="notBindDoctorObj.onPageChange">
			</el-pagination>
		</el-col>
            </el-dialog>










<!-- ==============        顾问查药品   ================================== -->
		<el-dialog width= "70vw" :close-on-click-modal="false" v-loading="loading"  :append-to-body="true" :visible.sync="drugObj.model"  title="药品详情">

<div class="flex">

    <div class="fontfilter " :class="fontType=='day'?'filtercheck':''" @click="checkTime('day')">本日</div>
    <div class="fontfilter" :class="fontType=='week'?'filtercheck':''" @click="checkTime('week')">本周</div>
    <div class="fontfilter" :class="fontType=='month'?'filtercheck':''" @click="checkTime('month')">本月</div>

</div>

 <el-row :gutter="10" style="margin-bottom:20px;">

 <el-col :xs="16" :sm="24" :md="6" :lg="8" :xl="5" style="min-width:470px;">
  	<el-date-picker v-model="drugObj.startcreateDate" type="date" placeholder="开始日期" style="margin-top:20px;"  >
						</el-date-picker>
						<el-date-picker v-model="drugObj.endcreateDate" type="date" placeholder="结束日期" style="margin-top:20px;"  >
						</el-date-picker>
  </el-col>

  <!-- 状态、 注册时间  -->
  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="    min-width: 225px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="adviserGetDrug(drugObj.row,true)">查询</el-button>
  </el-col>
</el-row>

<el-table border
    :data="drugObj.DrugInfo"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="drugName"
      label="通用名"  width="180">
   </el-table-column>

  <el-table-column
      prop="productName"
      label="商品名">
   </el-table-column>

  <el-table-column
      prop="doctorNum"
      label="货架号数量">
   </el-table-column>
   
     <el-table-column
      prop="memberNum"
      label="购药人次">
   </el-table-column>
   
     <el-table-column
      prop="orderNum"
      label="订单数">
   </el-table-column>
      
     <el-table-column
      prop="totalMoney"
      label="总金额">
   </el-table-column>
</el-table>

  <el-table-column
      prop="manufacturer"
      label="生产厂家">
   </el-table-column>

  <el-table-column
      prop="specification"
      label="规格">
   </el-table-column>

  <el-table-column
      prop="dosageforms"
      label="剂型">
   </el-table-column>

  <el-table-column
      prop="price"
      label="单价">
   </el-table-column>


     <el-table-column
      prop="totalQuantity"
      label="数量">
   </el-table-column>

   
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="drugObj.page+1" :page-size="drugObj.pageSize" :total="drugObj.total" @current-change="drugObj.onPageChange">
			</el-pagination>
		</el-col>
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
import moment from "moment";
import * as indexApi from "../../api/indexApi";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  loading = false;
  viewBigIcon(qrcode) {
    this.bigIcon = qrcode;
    this.viewBig = true;
  }
  bigIcon = "";
  viewBig = false;
  page = 0;
  pageSize = 10;
  orderByStr = "";
  total = 0;
  name = "";
  drug = "";
  userStatus = "";
  onPageChange(page) {
    this.page = page - 1;
    this.getConsultantList();
  }
  startDate = "";
  endDate = "";
  YdkAdviser = [];
  getConsultantList(filter = null) {
    this.loading = true;
    if (filter) {
      this.page = 0;
    }

    let startDate = "";
    let endDate = "";
    if ((this.startDate || "") != "") {
      startDate = moment(this.startDate).format("YYYY-MM-DD") + " 00:00:00";
    }

    if ((this.endDate || "") != "") {
      endDate = moment(this.endDate).format("YYYY-MM-DD") + " 23:59:59";
    }

    let data = {
      page: this.page,
      pageSize: this.pageSize,
      userStatus: this.userStatus,
      name: this.name,
      drug: this.drug,
      startcreateDate: startDate,
      endcreateDate: endDate,
      orderByStr: this.orderByStr
    };
    indexApi.getConsultantList1(data).then(res => {
 
      if (res["retCode"]) {
        this.YdkAdviser = res.data.AdviserInfo;
        this.total = res.data.page.total;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
             this.loading = false;
   return
      }
    });
    this.ypStartcreateDate(data);
  }
  payOrderMoney = 0;
  orderMoney = 0;
  prescriptionNum = 0;
  payOrderNum = 0;
  orderNum = 0;
  allAdviserNum = 0;
  drugNum = 0;
  drugQuantityTotal = 0;
  ypStartcreateDate(data) {
    data.ypdStartcreateDate = data.startcreateDate;
    data.ypdEndcreateDate = data.endcreateDate;
    indexApi.ypStartcreateDate(data).then(res => {
      this.loading = false;
      if (res["retCode"]) {
        if (res.data.AdviserInfo.length > 0) {
          this.orderMoney = res.data.AdviserInfo[0].orderMoney
            ? res.data.AdviserInfo[0].orderMoney
            : 0;
          this.payOrderMoney = res.data.AdviserInfo[0].payOrderMoney
            ? res.data.AdviserInfo[0].payOrderMoney
            : 0;
          this.prescriptionNum = res.data.AdviserInfo[0].prescriptionNum
            ? res.data.AdviserInfo[0].prescriptionNum
            : 0;
          this.orderNum = res.data.AdviserInfo[0].orderNum
            ? res.data.AdviserInfo[0].orderNum
            : 0;
          this.payOrderNum = res.data.AdviserInfo[0].payOrderNum
            ? res.data.AdviserInfo[0].payOrderNum
            : 0;
          this.allAdviserNum = res.data.AdviserInfo[0].allAdviserNum
            ? res.data.AdviserInfo[0].allAdviserNum
            : 0;
          this.drugNum = res.data.AdviserInfo[0].drugNum
            ? res.data.AdviserInfo[0].drugNum
            : 0;
          this.drugQuantityTotal = res.data.AdviserInfo[0].drugQuantityTotal
            ? res.data.AdviserInfo[0].drugQuantityTotal
            : 0;
        }
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
           this.loading = false;
    });
  }
  adviserObj: any = {};
  type = "add";
  adviserModel = false;
  changeModel(type, row) {
    this.adviserTypeEnums = "";
    this.type = type;
    if (type == "add") {
      this.adviserObj = {};
    } else {
      let a = {};
      Object.assign(a, row);
      this.adviserObj = a;
      this.userStatus1 = this.adviserObj.userStatus == "1" ? true : false;
      this.adviserTypeEnums = row.adviser_type;
    }
    this.adviserModel = true;
  }
  adviserTypeEnums: string = "";
  userStatus1: boolean = false;
  doSubmit() {
    if ((this.adviserObj.adviserName || "") == "") {
      this.$alert("请填写顾问姓名");
      return;
    }
    if ((this.adviserObj.userName || "") == "") {
      this.$alert("请填写顾问手机号码");
      return;
    }
    if ((this.adviserTypeEnums || "") == "") {
      this.$alert("请选择顾问类型");
      return;
    }

    this.loading = true;
    this.adviserObj["userPassword"] = "123456";
    this.adviserObj.userStatus = this.userStatus1 ? "1" : "0";
    this.adviserObj.adviserTypeEnums = this.adviserTypeEnums;

    if (this.type == "add") {
      this.adviserObj["userStatus"] = "";
      indexApi.addConsultantItem(this.adviserObj).then(res => {
        this.loading = false;
        if (res["retCode"]) {
          this.adviserModel = false;
          this.$message("新增成功");
          this.getConsultantList();
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    }
    if (this.type == "edit") {
      indexApi.updateConsultantItem(this.adviserObj).then(res => {
        this.loading = false;
        if (res["retCode"]) {
          this.adviserModel = false;
          this.$message("保存成功");
          this.getConsultantList();
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    }
  }
  submitForm(formName) {
    let a: any = this.$refs[formName];
    a
      .validate(valid => {
        if (valid) {
          this.doSubmit();
          return false;
        } else {
          console.log("error submit!!");
          return false;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  updateStatue(status, row) {
    if (status == "status") {
      let a = row.userStatus == "1" ? "0" : "1";
      this.updateCenter(
        {
          adviserId: row.adviserId,
          userStatus: a
        },
        res => {
          if (res) {
            this.getConsultantList();
          }
        }
      );
    }

    if (status == "password") {
      this.$confirm("此操作将重置该顾问的密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateCenter(
            {
              adviserId: row.adviserId,
              userPassword: "123456"
            },
            res => {
              if (res) {
                this.$alert("重置成功,初始化密码为：123456");
                this.getConsultantList();
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }

    //   indexApi.updateConsultantItem(this.adviserObj).then(res => {
    //       this.loading = false;
    //       if (res["retCode"]) {
    //           this.adviserModel = false
    //           this.$message('保存成功');
    //     this.getConsultantList();
    //       } else {
    //         if (!res["islogin"]) {
    //           this.$alert(res["message"]);
    //         }
    //         console.error("数据查询错误");
    //       }
    //     });
  }
  updateCenter(obj, callback) {
    indexApi.updateConsultantItem(obj).then(res => {
      this.loading = false;
      if (res["retCode"]) {
        callback(true);
      } else {
        callback(false);
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
    });
  }

  doDelete(row) {
    this.$confirm("此操作将删除该顾问, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .deleteConsultantItem({
            adviserId: row.adviserId
          })
          .then(res => {
            this.loading = false;
            if (res["retCode"]) {
              this.$message("删除成功");
              this.getConsultantList();
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
          message: "已取消删除"
        });
      });
  }

  /**
   * consultantItemShelf  顾问查医生列表
   */

  shelfModel = false;
  shelfObj = {
    DocterInfo: [],
    loading: false,
    name: "",
    page: 0,
    pageSize: 10,
    total: 0,
    startcreateDate: "",
    endcreateDate: "",
    onPageChange: page => {
      this.shelfObj.page = page - 1;
      this.consultantItemShelf(this.shelfObj.row);
    },
    row: {}
  };
  cleanConsultantItemShelf(row) {
    this.shelfObj.startcreateDate = "";
    this.shelfObj.endcreateDate = "";
    this.shelfObj.name = "";
    this.consultantItemShelf(row);
  }
  consultantItemShelf(row, filter = null) {
    this.shelfObj.loading = true;
    this.shelfObj.row = row;
    if (filter) {
      this.shelfObj.page = 0;
    }
    let startCreatTime = "";
    let endCreatTime = "";
    if ((this.shelfObj.startcreateDate || "") != "") {
      startCreatTime =
        moment(this.shelfObj.startcreateDate).format("YYYY-MM-DD") +
        " 00:00:00";
    }
    if ((this.shelfObj.endcreateDate || "") != "") {
      endCreatTime =
        moment(this.shelfObj.endcreateDate).format("YYYY-MM-DD") + " 23:59:59";
    }

    indexApi
      .adviserGetDoctor({
        adviserId: row.adviserId,
        name: this.shelfObj.name,
        page: this.shelfObj.page,
        pageSize: this.shelfObj.pageSize,
        startcreateDate: startCreatTime,
        endcreateDate: endCreatTime
      })
      .then(res => {
        this.shelfObj.loading = false;
        this.shelfModel = true;
        if (res["retCode"]) {
          this.shelfObj.DocterInfo = res.data.DocterInfo;
          this.shelfObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  adviserNotBindDoctor(row) {
    this.$confirm("该操作对医生取消绑定状态, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.shelfObj.loading = true;

        indexApi
          .adviserNotBindDoctor({
            doctorId: row.doctorId
          })
          .then(res => {
            this.shelfObj.loading = false;
            if (res["retCode"]) {
              this.$message("取消绑定成功");
              this.consultantItemShelf(this.shelfObj.row);
              this.getConsultantList();
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
          message: "已取消删除"
        });
      });
  }

  /**
   * notBindDoctorModel
   *  未绑定医生 搜索 与 绑定
   */

  notBindDoctorObj = {
    model: false,
    loading: false,
    addloading: false,
    doctorObj: null,
    YdkDoctor: [],
    phone: "",
    labelList: [
      {
        label: "医生姓名",
        prop: "name"
      },
      {
        label: "电话号码",
        prop: "phone"
      },
      {
        label: "医疗机构代码",
        prop: "hspCode"
      },
      {
        label: "医院",
        prop: "hospitalName"
      },
      {
        label: "科室",
        prop: "hospitalDepartment"
      }
    ],
    page: 0,
    pageSize: 10,
    total: 0,
    onPageChange: page => {
      this.notBindDoctorObj.page = page - 1;
      this.openNotBindDoctorModel(this.notBindDoctorObj.row);
    },
    row: {}
  };

  cleanOpenNotBindDoctorModel(row) {
    this.notBindDoctorObj["phone"] = "";
    this.openNotBindDoctorModel(row);
  }
  openNotBindDoctorModel(row, filter = null) {
    if (filter) {
      this.notBindDoctorObj.page = 0;
    }
    this.notBindDoctorObj.row = row;
    this.notBindDoctorObj.model = true;
    this.notBindDoctorObj.loading = true;
    indexApi
      .notBindDoctor({
        phone: this.notBindDoctorObj["phone"],
        adviserTypeEnums:row.adviser_type,
        page: this.notBindDoctorObj.page,
        pageSize: this.notBindDoctorObj.pageSize
      })
      .then(res => {
        this.notBindDoctorObj.loading = false;
        if (res["retCode"]) {
          this.notBindDoctorObj.YdkDoctor = res.data.YdkDoctor;
          this.notBindDoctorObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
  }

  /**
   *
   * 分配医生
   */

  addDoctorbind(row) {
    this.$confirm("是否绑定该医生?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.notBindDoctorObj.addloading = true;
        indexApi
          .adviserBindDoctor({
            adviserid: this.notBindDoctorObj.row["adviserId"],
            doctorid: row["doctorId"],
            adviserTypeEnums:this.notBindDoctorObj.row['adviser_type']
          })
          .then(res => {
            this.notBindDoctorObj.addloading = false;
            if (res["retCode"]) {
              this.$message("绑定成功");
              this.openNotBindDoctorModel(this.notBindDoctorObj.row);
              this.getConsultantList();
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

  /**
   *
   * 顾问查药品
   */
  drugObj = {
    model: false,
    DrugInfo: [],
    startcreateDate: "",
    endcreateDate: "",
    page: 0,
    pageSize: 10,
    total: 0,

    onPageChange: page => {
      this.drugObj.page = page - 1;
      this.adviserGetDrug(this.drugObj.row);
    },
    row: {}
  };
  checkTime(fontType) {
    this.fontType = fontType;
    this.adviserGetDrug(this.drugObj.row);
  }

  adviserGetDrugDoRow(row) {
    this.fontType = "";
    this.drugObj.startcreateDate = "";
    this.drugObj.endcreateDate = "";
    this.adviserGetDrug(row);
  }
  adviserGetDrug(row, filter = null) {
    this.loading = true;
    this.drugObj.row = row;

    if (filter) {
      this.drugObj.page = 0;
      this.fontType = "";
    }
    let startCreatTime = "";
    let endCreatTime = "";
    if (this.fontType == "day") {
      startCreatTime = this.getToday();
      endCreatTime = moment(new Date()).format("YYYY-MM-DD") + " 23:59:59";
    } else if (this.fontType == "week") {
      startCreatTime = this.getWeek();
      endCreatTime = moment(new Date()).format("YYYY-MM-DD") + " 23:59:59";
    } else if (this.fontType == "month") {
      startCreatTime = this.getMonth1();
      endCreatTime = moment(new Date()).format("YYYY-MM-DD") + " 23:59:59";
    } else {
      if ((this.drugObj.startcreateDate || "") != "") {
        startCreatTime =
          moment(this.drugObj.startcreateDate).format("YYYY-MM-DD") +
          " 00:00:00";
      }
      if ((this.drugObj.endcreateDate || "") != "") {
        endCreatTime =
          moment(this.drugObj.endcreateDate).format("YYYY-MM-DD") + " 23:59:59";
      }
    }
    indexApi
      .adviserGetDrug({
        adviserId: row.adviserId,
        page: this.drugObj.page,
        pageSize: this.drugObj.pageSize,
        startcreateDate: startCreatTime,
        endcreateDate: endCreatTime
      })
      .then(res => {
        this.loading = false;
        this.drugObj.model = true;
        if (res["retCode"]) {
          this.drugObj.DrugInfo = res.data.DrugInfo;
          this.drugObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }
  adviserCount = 0;
  getAdviserCount() {
    indexApi.getAdviserCount({}).then(res => {
      if (res["retCode"]) {
        this.adviserCount = res.data.num;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
    });
  }

  getWeek() {
    //按周日为一周的最后一天计算
    var date = new Date();

    //今天是这周的第几天
    var today = date.getDay();

    //上周日距离今天的天数（负数表示）
    var stepSunDay = -today + 1;

    // 如果今天是周日
    if (today == 0) {
      stepSunDay = -7;
    }

    // 周一距离今天的天数（负数表示）
    var stepMonday = 7 - today;

    var time = date.getTime();

    var monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
    var sunday = new Date(time + stepMonday * 24 * 3600 * 1000);

    //本周一的日期 （起始日期）
    var startDate = this.transferDate(monday); // 日期变换

    return startDate + " 00:00:00";
  }

  getToday() {
    return moment(new Date()).format("YYYY-MM-DD") + " 00:00:00";
  }
  getMonth1() {
    // 获取当前月的第一天
    var start = new Date();
    start.setDate(1);
    var startDate = this.transferDate(start);
    return startDate + " 00:00:00";
  }
  transferDate(date) {
    // 年
    var year = date.getFullYear();
    // 月
    var month = date.getMonth() + 1;
    // 日
    var day = date.getDate();

    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }

    var dateString = year + "-" + month + "-" + day;

    return dateString;
  }
  fontType = "";
  /**
  排序
 */
  sortChange({ column, prop, order }) {
    let desc = "";
    if (order == "descending") {
      desc += " desc";
    }

    // 管理医生数量 doctor_num 、
    // 总订单数量 order_num 、
    // 总订单金额 order_money 、
    // 总处方数量 prescription_num 、
    // 药品种类数量 drug_num 。
    switch (prop) {
      case "doctorNum":
        this.orderByStr = "doctor_num" + desc;
        break;
      case "orderNum":
        this.orderByStr = "order_num" + desc;
        break;
      case "orderMoney":
        this.orderByStr = "order_money" + desc;
        break;
      case "prescriptionNum":
        this.orderByStr = "prescription_num" + desc;
        break;
      case "drugNum":
        this.orderByStr = "drug_num" + desc;
        break;
      default:
        this.orderByStr = "";
        break;
    }
    this.getConsultantList(true);
  }

  mounted() {
    this.getAdviserCount();
    this.getConsultantList();
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
.fontfilter {
  height: 26px;
  width: 40px;
  border: 1px rgb(229, 229, 229) solid;
  border-radius: 5px;
  text-align: center;
  line-height: 26px;
  margin-right: 15px;
}
.fontfilter:hover {
  color: rgb(255, 0, 0);
  border-color: rgb(255, 0, 0);
  cursor: pointer;
}
.filtercheck {
  color: rgb(255, 0, 0);
  border-color: rgb(255, 0, 0);
}
</style>