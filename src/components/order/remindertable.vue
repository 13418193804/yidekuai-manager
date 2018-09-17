<template>
    <div>


<el-table border height="500"
    :data="orderList"
    stripe 
    style="width: 100%;" v-if="pagetype !=='rework'">

 <el-table-column  fixed="left"
      label="订单状态" width="120">
<template slot-scope="scope">
<el-tag :type="handleOrderStatus(scope.row.orderStatue).type">
 {{handleOrderStatus(scope.row.orderStatue).title}}
</el-tag>
 
</template>
   </el-table-column>


<el-table-column v-if="payStatus!='ORDER_WAIT_PAY'"
      label="支付状态" width="120">
<template slot-scope="scope">
{{handlePayStatus(scope.row.payStatus)}} 
</template>
   </el-table-column>



<!-- v-if="patModel != 'PENDING'" -->
 <el-table-column v-if="payStatus!='ORDER_WAIT_PAY'"
      label="支付方式" width="120">
<template slot-scope="scope">
 <el-tag v-if="scope.row.orderStatue!=='ORDER_WAIT_PAY' || scope.row.orderStatue!=='ORDER_INIT'|| scope.row.orderStatue!=='ORDER_CANCEL_PAY'"  :type="handlePaymentMode(scope.row.paymentMode).type">{{handlePaymentMode(scope.row.paymentMode).title}}</el-tag>
</template>
   </el-table-column>
     
  <el-table-column
      prop="auditingDate"
      label="创建时间" width="180">
   </el-table-column>

    <el-table-column
      prop="memberName"
      label="患者姓名" width="150">
   </el-table-column>

   <el-table-column
      prop="docterName"
      label="开方医生" width="150">
   </el-table-column>
   
    <el-table-column
      prop="orderMoney"
      label="订单金额"  width="150">
   </el-table-column>


      <el-table-column
      label="订单类型"  width="150">
     <template slot-scope="scope">
     {{ handleOrderType(scope.row)}}
     </template>
   </el-table-column>


   <el-table-column
      prop="patientSex"
      label="患者性别"  width="150">
   </el-table-column>

    <el-table-column
      prop="memberPhone"
      label="患者手机号" width="150">
   </el-table-column>
      
    <el-table-column
      prop="memberIdcard"
      label="患者身份证" width="180">
   </el-table-column>

         <el-table-column
      prop="consigneeName"
      label="收货人" width="180">
   </el-table-column>
   <el-table-column
      prop="consigneePhone"
      label="收货手机号"  width="150">
   </el-table-column>
    <el-table-column
      label="收货地址" width="180">
      <template slot-scope="scope">
          {{`${scope.row.province?scope.row.province:''}${scope.row.city?scope.row.city:''}${scope.row.area?scope.row.area:''}${scope.row.consigneeAddress?scope.row.consigneeAddress:''}`}}
     </template>
   </el-table-column>
      <el-table-column
      prop="doctorMobile"
      label="医生手机号"  width="150">
   </el-table-column>

    <el-table-column
      prop="hospitalName"
      label="医院"  width="180">
   </el-table-column>

      <el-table-column
      prop="serviceMoney"
      label="治疗服务费"  width="180">
   </el-table-column>

       <el-table-column
      prop="presscriptionMoney"
      label="药品金额" width="180">
   </el-table-column>
       <el-table-column
      label="开票状态" width="150">
      <template slot-scope="scope">
<el-tag
  :type="handleInvoinStatus(scope.row).type">
        {{handleInvoinStatus(scope.row).title}}
</el-tag>
     </template>
   </el-table-column>
       <el-table-column
      prop="remark"
      label="开方医生备注"  width="180">
   </el-table-column>

  <el-table-column
      prop="orderid"
      label="订单编号"  width="200">
   </el-table-column>

  <el-table-column
      prop="presId"
      label="处方编号" width="200">
   </el-table-column>

   <el-table-column label="操作" fixed="right"  :width="handleWidth()" >
      <template slot-scope="scope">

        <el-button
          size="mini"
          type="text" @click="getorderInfo(scope.row)">订单详情</el-button>
          
        <!-- <el-button
          size="mini"
          type="text" @click="getInvoiceRecords(scope.$index, scope.row)" v-if="pagetype =='rework' ">发票信息</el-button> -->

        <el-button
          size="mini"
          type="text" @click="getTransmitInfo(scope.$index, scope.row)" >处方详情</el-button>

               <!-- <el-button
          size="mini"
          type="text" @click="updateInfo(scope.row)"  v-if="pagetype =='afterorder' ||pagetype =='reminder'" >编辑</el-button> -->
         
         
               <el-button
          size="mini"
          type="primary" @click="sendGoods(scope.row)"   v-if=" (pagetype =='rework'||pagetype =='afterorder'  ) && (scope.row.orderStatue == 'ORDER_WAIT_SENDGOODS' ||scope.row.orderStatue == 'SENDGOODS_UNFINISHED')" > 发货 </el-button>
         


               <el-button size="mini" 
          :type="scope.row.reminderFlag == 1?'primary':''" @click="doReminder(scope.row)" v-if="pagetype =='reminder' && scope.row.orderStatue =='ORDER_WAIT_PAY' && scope.row.presState !== 'GIVEUP_PRESCRIPTION'" :disabled="scope.row.reminderFlag !== 1"  >{{  scope.row.reminderFlag == 1?'催单':'已催单'}}</el-button>
         <el-button size="mini" 
          :type="scope.row.presState == 'GIVEUP_PRESCRIPTION'?'':'primary'" @click="doGiveup(scope.row)" v-if="pagetype =='reminder' && scope.row.orderStatue =='ORDER_WAIT_PAY'" :disabled="scope.row.presState == 'GIVEUP_PRESCRIPTION'"  >{{  scope.row.presState == 'GIVEUP_PRESCRIPTION'?'已弃单':'弃单'}}</el-button>
  

     </template>
    </el-table-column>
</el-table>

<el-table border height="500"
    :data="orderList"
    stripe 
    style="width: 100%;" v-else>


 <el-table-column fixed="left"
      label="开票状态" width="120">
<template slot-scope="scope">
    <el-tag
  :type="handleInvoinStatus(scope.row).type">
        {{handleInvoinStatus(scope.row).title}}
</el-tag>
</template>
   </el-table-column>
   
     <el-table-column
      label="收货人(开票)"  width="150">
<template  slot-scope="scope">
      {{scope.row.address.contactName}}
</template>
   </el-table-column>
  <el-table-column
      label="收货手机号(开票)"  width="150">
<template  slot-scope="scope">
      {{scope.row.address.contactMobile}}
</template>
   </el-table-column>

    <el-table-column
      label="收货地址(开票)" width="180">
<template  slot-scope="scope">
  {{scope.row.address.province}}{{scope.row.address.city}}{{scope.row.address.country}}{{scope.row.address.address}}</template>
   </el-table-column>

 <el-table-column 
      label="订单状态" width="100">
<template slot-scope="scope">
<el-tag :type="handleOrderStatus(scope.row.orderStatue).type">
 {{handleOrderStatus(scope.row.orderStatue).title}}
</el-tag>
 
</template>
   </el-table-column>


<el-table-column 
      label="支付状态" width="150">
<template slot-scope="scope">
{{handlePayStatus(scope.row.payStatus)}} 
</template>
   </el-table-column>


 <el-table-column 
      label="支付方式" width="150">
<template slot-scope="scope">
 <el-tag v-if="scope.row.orderStatue!=='ORDER_WAIT_PAY' || scope.row.orderStatue!=='ORDER_INIT'|| scope.row.orderStatue!=='ORDER_CANCEL_PAY'" :type="handlePaymentMode(scope.row.paymentMode).type">{{handlePaymentMode(scope.row.paymentMode).title}}</el-tag>
</template>
   </el-table-column>
     


  <el-table-column
      label="申请开票时间" width="180">
<template slot-scope="scope">
{{scope.row.invoiceRecords&&scope.row.invoiceRecords.length>0?scope.row.invoiceRecords[0].creatTime:''}}      
      </template>
   </el-table-column>

  <el-table-column
      prop="auditingDate"
      label="创建时间" width="180">
   </el-table-column>

    <el-table-column
      prop="memberName"
      label="患者姓名" width="150">
   </el-table-column>
    <el-table-column
      prop="memberPhone"
      label="患者手机号" width="150">
   </el-table-column>
       <el-table-column
      prop="memberIdcard"
      label="患者身份证" width="180">
   </el-table-column>
        <el-table-column
      prop="consigneeName"
      label="收货人" width="180">
   </el-table-column>
   <el-table-column
      prop="consigneePhone"
      label="收货手机号"  width="150">
   </el-table-column>
    <el-table-column
      label="收货地址" width="180">
     <template slot-scope="scope">
    {{`${scope.row.province?scope.row.province:''}${scope.row.city?scope.row.city:''}${scope.row.area?scope.row.area:''}${scope.row.consigneeAddress?scope.row.consigneeAddress:''}`}}
     </template>
   </el-table-column>
    <el-table-column
      prop="orderMoney"
      label="订单金额"  width="150">
   </el-table-column>



   <el-table-column
      prop="patientSex"
      label="患者性别"  width="150">
   </el-table-column>

   <el-table-column
      prop="docterName"
      label="开方医生" width="150">
   </el-table-column>
 
      <el-table-column
      prop="doctorMobile"
      label="医生手机号"  width="150">
   </el-table-column>


    <el-table-column
      prop="hospitalName"
      label="医院"  width="180">
   </el-table-column>


      <el-table-column
      prop="serviceMoney"
      label="治疗服务费"  width="180">
   </el-table-column>

       <el-table-column
      prop="presscriptionMoney"
      label="药品金额" width="180">
   </el-table-column>

       <el-table-column
      prop="remark"
      label="开方医生备注"  width="180">
   </el-table-column>

  <el-table-column
      prop="orderid"
      label="订单编号"  width="200">
   </el-table-column>


  <el-table-column
      prop="presId"
      label="处方编号" width="200">
   </el-table-column>

   <el-table-column label="操作" fixed="right"  width="220"  >
      <template slot-scope="scope">
         <el-button
          size="mini"
          type="text" @click="getorderInfo(scope.row)">订单详情</el-button>
               <el-button
          size="mini"
          type="text" @click="getTransmitInfo(scope.$index, scope.row)" >处方详情</el-button>

  <el-button
          size="mini"
          type="primary" @click="doRework(scope.$index, scope.row)" >开票</el-button>

             </template>
    </el-table-column>
</el-table>
<prescriptioninfo ref="prescriptioninfo" :row="prescriptioninfoObj" ></prescriptioninfo>
<updateorder ref="updateorder"  :provinceList="provinceList"
 @getOrderList="getOrderList" @getOrderDetail="getOrderDetail" @queryShipList="queryShipList" :shipList="shipList" 
  :pagetype="pagetype" :order="order" ></updateorder>

      
	<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="giveupModel"  title="弃单">
    	 <el-form label-width="120px" ref="ruleForm"  >
				<el-form-item label="备注原因：" prop="usages">
              					<el-input v-model="reason"  type="textarea"
  :rows="4"  placeholder="请输入备注原因" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
                
        </el-form >
			<span slot="footer" class="dialog-footer" >
				<el-button @click="giveupModel = false">取 消</el-button>
				<el-button type="primary" @click="doGiveupSubmit()" >确 定</el-button>
			</span>

</el-dialog>


    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import moment from "moment";
import { Prop } from "vue-property-decorator";
import prescriptioninfo from "../transmit/prescriptioninfo";
import updateorder from "./updateorder";

@Component({
  props: {},
  components: {
    prescriptioninfo,
    updateorder
  }
})
export default class AddGoods extends Vue {
  @Prop({ required: false })
  orderList: any;
  @Prop({ required: false })
  pagetype: string;
  @Prop({ required: false })
  patModel: string;
  @Prop({ required: false })
  provinceList;
  @Prop({ required: false })
payStatus
handleWidth(){
if(this.pagetype=='reminder'){
  return "290"
}
return "220"
}


handleInvoinStatus(row){
if(row.invoiceRecords && row.invoiceRecords.length>0&& row.invoiceRecords[0].shipStatus == 'HAVE_SIGNED_IN'){
  return {title:"开票完成",type:'success'}
}else if(row.isInvoicedShipped == '1'){
  return {title:"已开发票",type:'warning'}
}else if(row.isInvoiced == '1'){
  return {title:"新增开票",type:'danger'}
}else if(row.isInvoiced == '0'){
  return {title:"未开发票",type:'info'}
}else{
  return {title:"",type:''}
}
}


sendGoods(row){
    let a: any = this.$refs.updateorder;
    a.send_model = true;
        a.loading = true
    this.presId = row.presId
        sessionStorage.presId = row.presId
     this.getOrderDetail(row.presId);
     
}


  invoiceRecordsObj = {};
  invoiceRecordModel = false;
  getInvoiceRecords(index, row) {
    this.invoiceRecordsObj = row.invoiceRecords;
  }
  giveupModel = false;
  presId = "";
  reason = "";
  doGiveup(row) {
    this.presId = row.presId;
    this.reason = "";
    this.giveupModel = !this.giveupModel;
  }
  doGiveupSubmit() {
    this.$confirm("是否对该订单弃单?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        if ((this.reason || "") == "") {
          this.$message("请输入备注原因");
          return;
        }
        indexApi
          .doGiveup({
            preId: this.presId,
            reason: this.reason
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("已弃单");
              this.$emit("getOrderList");
              this.giveupModel = !this.giveupModel;
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
  order = {};
  doReminder(row) {
    // this.$confirm("确定要发送一次催单?", "提示", {
    //   confirmButtonText: "确定",
    //   cancelButtonText: "取消",
    //   type: "warning"
    // })
    //   .then(() => {
    indexApi
      .changeReminderStatus({
        presId: row.presId
      })
      .then(res => {
        if (res["retCode"]) {
          this.$message("已催单");
          this.$emit("getOrderList");
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    // })
    // .catch(() => {
    //   this.$message({
    //     type: "info",
    //     message: "已取消操作"
    //   });
    // });
  }

  getorderInfo(row) {
    let a: any = this.$refs.updateorder;
    a.model = true;
    a.loading = true
    this.presId = row.presId
    this.getOrderDetail(row.presId);

  }

  doRework(index,row){
      let a: any = this.$refs.updateorder;
    a.reworkModel = true;
    a.loading = true
        this.presId = row.presId
    this.getOrderDetail(row.presId);
  }

  
  handlePaymentMode(status) {
    switch (status) {
      case "ONLINE_PAYMENT":
        return {type:'success',title:"微信支付"};
      case "ORDER_PAY_ONDEV":
        return {type:'warning',title:"货到付款"};
      default:
        return {type:'',title:""};
    }
  }

  getOrderDetail(presId) {
    indexApi
      .getOrderInfo({
        presId: presId
      })
      .then(res => {
        if (res["retCode"]) {
          res.data.YdkOrderDetailList.forEach((item, index) => {
            item.logisticslabel = item.logistics;
            item.waybillNumberlabel = item.waybillNumber;
          });
          if (res.data.invoiceRecords && res.data.invoiceRecords.length > 0) {
            res.data.invoiceObj_logistics =
              res.data.invoiceRecords[0].logistics;
            res.data.invoiceObj_waybillNumber =
              res.data.invoiceRecords[0].waybillNumber;
          }
          this.order = res.data;
          (<any>this.$refs.updateorder).getExpressPackage(presId);
        } else {
               (<any>this.$refs.updateorder).loading = false
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
  }

  updateOrder = {};


  getOrderList() {
    this.$emit("getOrderList");
  }
  handlePayStatus(status) {
    switch (status) {
      case "PAY_WAIT":
        return "等待支付";
      case "PAY_SUCCESS":
        return "支付成功";
      default:
        return "";
    }
  }

  prescriptioninfoObj = {};
  preImageList = [];
  getTransmitInfo(index, row) {
    this.prescriptioninfoObj = row;
    let a: any = this.$refs.prescriptioninfo;
    a.getInfo();
  }

  handleOrderType(row){
  if( row.splitFlag==='1'){
    return "拆分订单"
  }
   if( row.splitFlag==='0'){
    return "普通订单"
  }
  return ""
  }
  handleOrderStatus(status) {
    switch (status) {
      case "ORDER_INIT":
        return {
          type:"info",
          title:"订单初始化"
          };
      case "ORDER_WAIT_PAY":
        return {
          type:"",
          title:"等待支付"
          };
      case "ORDER_PAY_ONDEV":
        return  {
          type:"warning",
          title:"货到付款"
          };
      case "ORDER_CANCEL_PAY":
        return {
          type:"info",
          title:"取消支付"
          };
      case "ORDER_WAIT_SENDGOODS":
        return {
          type:"danger",
          title:"待发货"
          }
      case "SENDGOODS_UNFINISHED":
        return   {
          type:"",
          title:"发货未完成"
          }; 
            case "ORDER_WAIT_RECVGOODS":
        return {
          type:"warning",
          title:"待收货"
          }; 
      case "ORDER_END_GOODS":
        return {
          type:"success",
          title:"完成"
          }; 
      default:
        return {  type:"",
          title:""};
    }
  }
  shipList = [];
  queryShipList() {
    indexApi.queryShipList({}).then(res => {
      if (res["retCode"]) {
        this.shipList = res.data.KuaibirdComTrans;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  mounted() {
    this.queryShipList();
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