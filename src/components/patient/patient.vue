<template>
    <div v-bouncing="loading">

        <div style="border-bottom:1px #e5e5e5 solid;">
          <h3>患者管理
          </h3>
 <div style="10px;">
平台患者数量统计：{{userCount}} 人              
            </div>
<div style="padding-bottom:20px;">
<el-row :gutter="10">
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input
  placeholder="请输入患者姓名/身份证号/手机号码" style="margin-top:20px;" v-model="keyname"
  clearable>
</el-input>
  </el-col>
  <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getpatientList(true)">查询</el-button>
  </el-col>
</el-row>
</div>
        </div>
<el-table height="600" @sort-change="sortChange"
    :data="patientList"
    stripe border
    style="width: 100%;">

  <el-table-column fixed="left"
      prop="name"
      label="患者姓名" width="150">
   </el-table-column>

      <el-table-column
      prop="maxCreateDate" sortable="custom"
      label="最新处方创建时间" width="180">
   </el-table-column>
   
  <el-table-column
      prop="sex"
      label="患者性别"  width="120">
   </el-table-column>
   
    <el-table-column
      prop="id_card"
      label="患者身份证号" width="170">
   </el-table-column>

       <el-table-column
      prop="age"
      label="患者年龄"  width="150">
   </el-table-column>

  <el-table-column
      prop="phone"
      label="患者手机号码" width="180">
   </el-table-column>
  <el-table-column
      prop="phone"
      label="患者账号"  width="150">
   </el-table-column>







 <el-table-column
      prop="member_status"
      label="使用状态"  width="100">

                                  <template slot-scope="scope">
       <el-tag :type="scope.row.member_status=='USE' ?'success':'info'">
               {{scope.row.member_status=='USE' ?"启用中":"已停用"}}</el-tag>
                                           </template>
   </el-table-column>

  <el-table-column
      prop="#"
      label="患者多地址信息" width="150">
               <template slot-scope="scope">

                    <el-button
          size="mini"
          type="primary"
          @click="addressManager(scope.$index, scope.row)">地址管理</el-button>
                                           </template>
   </el-table-column>


 <el-table-column
      prop="ordercount"
      label="患者订单数量">
   </el-table-column>


 <el-table-column
      prop="precount"
      label="患者处方数量">
   </el-table-column>



   
 <el-table-column
      prop="remark"
      label="备注" width="180">
   </el-table-column>


    
 <el-table-column
      prop="register_date"
      label="注册日期" width="180">
   </el-table-column>

   
   <el-table-column label="操作" fixed="right"  width="300">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          @click="changePreModel(scope.$index, scope.row)">查看处方</el-button>
          <el-button
          size="mini"
          type="text"
          @click="changeOrderModel(scope.$index, scope.row)">查看订单</el-button>


              <el-button
          size="mini"
          type="text" @click="memberGetDoctor(scope.row)"
      >查看医生</el-button>


          <el-button
          size="mini"
          type="text"
          @click="changeModel(scope.row)" v-promiss.edit >编辑</el-button>
          

          <el-button
          size="mini"
          type="text"
          @click="doUpdateStatus(scope.$index, scope.row)">{{scope.row.member_status == 'USE'?'停用':'启用'}}</el-button>
          
      </template>
    </el-table-column>
</el-table>
	<el-col :span="24" class="toolbar">

			<el-pagination :current-page="page+1" layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>
    <el-dialog :visible.sync="updateModel" width="1050px" center size="tiny"  title="编辑患者信息" :close-on-click-modal="false" top="40px">
  	 <el-form label-width="120px" v-model="form">
	<el-form-item label="患者姓名" style="max-width:400px">
					<el-input placeholder="请输入患者姓名" v-model="form.name" ></el-input>
				</el-form-item>

	<el-form-item label="患者性别" style="max-width:400px">
      <el-radio v-model="form.sex" label="男">男</el-radio>
  <el-radio v-model="form.sex" label="女">女</el-radio>
  </el-form-item>

  
	<el-form-item label="患者身份证号" style="max-width:400px">
					<el-input placeholder="请输入患者身份证号" v-model="form.id_card" ></el-input>
  </el-form-item>
  
  
	<el-form-item label="患者年龄" style="max-width:400px">
					<el-input placeholder="请输入患者年龄" v-model="form.age" ></el-input>
  </el-form-item>
  
	<el-form-item label="患者手机号码" style="max-width:400px">
				{{form.phone}}
  </el-form-item>
		  
	<el-form-item label="患者备注" style="max-width:400px">
					<el-input placeholder="请输入患者备注" v-model="form.remark" ></el-input>
  </el-form-item>
</el-form>
		<span slot="footer" class="dialog-footer" >
				<el-button @click="updateModel = false">取 消</el-button>
				<el-button type="primary" @click="doSubmit">保存</el-button>
			</span>
      </el-dialog>




  <el-dialog :visible.sync="doctorObj.model" width="1050px" center size="tiny"  title="查看医生" :close-on-click-modal="false" top="40px">
<el-table border
    :data="doctorObj.doctorList"
    stripe height="500"
    style="width: 100%;">
 <el-table-column prop="name" label="医生姓名" ></el-table-column>
            <el-table-column prop="hospitalName" label="所属医院" width="120"></el-table-column>
            <el-table-column prop="phone" label="账号" width="120"></el-table-column>
            <el-table-column prop="hospitalDepartment" label="所在科室"></el-table-column>
            <el-table-column prop="doctorGood" label="医生擅长" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="doctorBrief" label="医生简介" width="180" show-overflow-tooltip></el-table-column>   
    

    </el-table>


	<el-col :span="24" class="toolbar">
			<el-pagination :current-page="doctorObj.page+1" layout="prev, pager, next" :page-size="doctorObj.pageSize" :total="doctorObj.total" @current-change="doctorObj.onPageChange">
			</el-pagination>
		</el-col>
      </el-dialog>





  <el-dialog :visible.sync="preModel" width="1050px" center size="tiny"  title="患者处方" :close-on-click-modal="false" top="40px">
  	
          
<el-table border
    :data="prescriptionList"
    stripe 
    style="width: 100%;min-height:500px">

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
      label="医院"  width="150">
   </el-table-column>

      <el-table-column
      prop="docterDept"
      label="科室"  width="150">
   </el-table-column>


   <el-table-column
      prop="memberName"
      label="患者姓名"  width="150">
   </el-table-column>
    <el-table-column
      prop="patientSex"
      label="患者性别"  width="150">
   </el-table-column>
 <el-table-column
      prop="memberAge"
      label="患者年龄">
   </el-table-column>
  <el-table-column
      prop="memberPhone"
      label="患者手机号" width="170">
   </el-table-column>
     <el-table-column
      prop="consigneeAddress"
      label="患者地址">
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
      label="转方医生">
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
      label="审方医生">
   </el-table-column>
  <el-table-column 
      prop="auditingDate"
      label="审方时间" width="170">
   </el-table-column>
  <!-- <el-table-column
      prop="auditingRemake"
      label="审方备注" width="220">
   </el-table-column> -->
  <el-table-column
      prop="presId"
      label="处方编号" width="210">
   </el-table-column>
   <el-table-column label="操作" fixed="right"  width="120">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          @click="getprescriptioninfo(scope.$index, scope.row)" >处方详情</el-button>
         </template>
    </el-table-column>
</el-table>
	<el-col :span="24" class="toolbar">
			<el-pagination :current-page="prepage+1" layout="prev, pager, next" :page-size="prepageSize" :total="pretotal" @current-change="onprePageChange">
			</el-pagination>
		</el-col>
      </el-dialog>



<prescriptioninfo ref="prescriptioninfo" :row="prescriptioninfoObj" ></prescriptioninfo>

  <el-dialog :visible.sync="orderModel" width="1050px" center size="tiny"  title="患者订单" :close-on-click-modal="false" top="40px">



<remindertable ref="remindertable" :orderList="patientOrderList" @getOrderList="getOrderList"  pagetype="patient"></remindertable>

			<el-pagination :current-page="orderpage+1"  layout="prev, pager, next" :page-size="orderageSize" :total="ordertotal" @current-change="onorderPageChange">
			</el-pagination>


      </el-dialog>


    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as patientApi from "../../api/patientApi";
import * as indexApi from "../../api/indexApi";
import  prescriptioninfo from "../transmit/prescriptioninfo";
import  remindertable from "../order/remindertable";

@Component({
  props: {},
  components: {
    // categoryView,
    prescriptioninfo,remindertable
  }
})
export default class AddGoods extends Vue {



doctorObj={
  model:false,
  page:0,
  pageSize:10,
row:{},
total:0,
doctorList :[],
onPageChange(page) {
    this.doctorObj.page = page - 1;
    this.memberGetDoctor(this.doctorObj.row);
  }
}


memberGetDoctor(row){
  this.loading = true
  this.doctorObj.model = true
  this.doctorObj.row = row;
   indexApi
      .memberGetDoctor({
memberid:row.member_id,
page : this.doctorObj.page,
pageSize: this.doctorObj.pageSize
      })
      .then(res => {
  this.loading = false
        if (res["retCode"]) {
this.doctorObj.doctorList  = res.data.list ;
this.doctorObj.total = res.data.page.total;
       console.log(res.data)
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });

}





orderModel=false
patientOrderList= []

  orderpage=0

orderageSize = 10
ordertotal = 0



onorderPageChange(page) {
    this.orderpage = page - 1;
    this.getOrderList();
  }
member_id = ''
changeOrderModel(index,row){
this.orderModel = true
this.member_id = row.member_id
this.getOrderList();
}
getOrderList() {

//   let startCreatTime = "";
//     let endCreatTime = "";
//     if ((this.startDate || "") != "") {
//       startCreatTime =
//         moment(this.startDate).format("YYYY-MM-DD")  + " 00:00:00";
//     }
//     if ((this.endDate || "") != "") {
//       endCreatTime = moment(this.endDate).format("YYYY-MM-DD")  + " 23:59:59";
//     }
// this.reminderVEnums == 'PENDING'

    indexApi
      .gerOrderList({
memberId:this.member_id,
page : this.orderpage,
pageSize: this.orderageSize
      })
      .then(res => {
        if (res["retCode"]) {
          this.patientOrderList = res.data.data;
          this.ordertotal = res.data.page.total;
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
  }



    preModel= false
prescriptioninfoObj = {}
getprescriptioninfo(index,row){
this.prescriptioninfoObj = row
let a:any = this.$refs.prescriptioninfo
a.getInfo();
}

prescriptionList = []
  prepage=0
    prepageSize = 10;
  pretotal = 0;
  onprePageChange(page) {
    this.prepage = page - 1;
    this.getPrescription();
  }
prescriptionItem = {}
changePreModel(index,row){
  this.prescriptionItem = row
  this.preModel = true
    this.getPrescription();
  
}
getPrescription(){
//查询患者处方
indexApi.prescriptionList({
patientId : this.prescriptionItem['member_id'],
page : this.prepage,
pageSize: this.prepageSize

}).then(res => {
      if (res["retCode"]) {
        console.log('prescriptionList',res)
        this.prescriptionList = res.data.list
        this.pretotal = res.data.page.total
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
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


  keyname = "";
  doUpdateStatus(index, row) {
    console.log(row);
    let memstatus = row.member_status == "USE" ? "STOP" : "USE";
    patientApi.updateUserStatus(row.member_id, memstatus,).then(res => {
      if (res["retCode"]) {
        this.getpatientList();
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }

addressManager(index,row){
  sessionStorage.member_id = row.member_id
this.$router.push('/address')
}

doSubmit(){
this.form.idnumber = this.form.id_card
this.form.memberid = this.form.member_id 
patientApi.saveUser(this.form).then(res => {
      if (res["retCode"]) {
        this.$message('保存成功');
        this.getpatientList();
this.updateModel = false
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });


}

  form:any = {
  name: '',
  sex: '',
  id_card: '',
  age: '',
  phone: '',
  memberId: '',
  remark:''
};
  updateModel = false;
  changeModel(row) {
    this.updateModel = !this.updateModel;
  let form = {}
  Object.assign(form,row);
  this.form = form
    // this.form.name = row.name;
    // this.form.sex = row.sex;
    // this.form.id_card = row.id_card;
    // this.form.age = row.age;
    // this.form.phone = row.phone;
    // this.form.memberId = row.memberId;
  }
loading = false
orderByStr = "";
  getpatientList(filter=null) {
    if(filter){
      this.page = 0
    }
    this.loading = true
    patientApi.queryUserList(this.page,this.pageSize, this.keyname,this.orderByStr).then(res => {
      if (res["retCode"]) {
        this.patientList = res.data.list;
                    this.total = res.data.page.total
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
      }
      this.loading = false
    });
  }
  patientList = [];
  page=0
    pageSize = 10;
  total = 0;
  onPageChange(page) {
    this.page = page - 1;
    this.getpatientList();
  }
  userCount = 0;
  allUserCount() {
    patientApi.allUserCount().then(res => {
      if (res["retCode"]) {
        this.userCount = res.data.count;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
   /**
  排序
 */
  sortChange({ column, prop, order }) {
    let desc = "";
    if (order == "descending") {
      desc += " desc";
    }

    // 医生处方数量 prescription_num 、
    // 医生订单数量order_num、
    // 医生订单金额order_money、
    // 医生患者数量doctorPatientNum、
    // 时间null

    switch (prop) {
      case "maxCreateDate":
        this.orderByStr = "maxCreateDate" + desc;
        break;
    
      default:
        this.orderByStr = "";
        break;
    }
    this.getpatientList(true);
  }

  mounted() {
    console.log(this.$route)
    this.getpatientList();
    this.allUserCount();
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

</style>