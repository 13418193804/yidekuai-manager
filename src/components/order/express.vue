<template>
    <div v-loading="loading">
 
  <el-tabs v-model="send_active"  type="border-card" @tab-click="getExpressPackageDrug" id="send_active">
    <el-tab-pane   label="发货"  name="send_goods" v-if="type =='send'">
        <div style="margin-top: 10px;">
 <div>
    <el-radio-group v-model="send_obj.splitFlag"  size="small" @change="splitFlagChange">
      <el-radio label="0" :disabled="send_obj.splitFlag == '1' && expressPackageList.length>0">普通订单</el-radio>
      <el-radio label="1">拆分订单</el-radio>
    </el-radio-group>
  </div>

<div v-if="send_obj.splitFlag =='0'">
   <div>
收货人： {{order.consigneeName}}
</div>
      <div>
收货电话： {{order.consigneePhone}}
</div>
      <div>
收货地址：{{order.province}} &nbsp;&nbsp;{{order.city}} &nbsp;&nbsp;{{order.area}}  &nbsp;&nbsp;{{order.consigneeAddress}}
</div>
</div>
<div v-else>


			 <el-form label-width="100px" >
				<el-form-item label="联系人名称" style="margin-bottom: 10px;">
					<el-input v-model="addressObj.contactName" maxlength="10" size="mini" style="max-width:400px;"></el-input>
				</el-form-item>

				<el-form-item label="联系人号码" style="margin-bottom: 10px;">
					<el-input v-model="addressObj.contactMobile" maxlength="20" size="mini" style="max-width:400px;"></el-input>
				</el-form-item>


		<el-form-item label="地区" style="margin:0;">
<el-row :gutter="24" >
  <el-col :xs="24" :sm="8" :md="6" :lg="5" :xl="3" style=" padding-left:0;   margin-bottom: 10px;">
<el-select v-model="addressObj.provinceId" @change="queryCityList()" size="mini">
<el-option v-for="(n,index) in provinceList" :key="index" :label="n.name" :value="n.id" ></el-option>
</el-select>
  </el-col>
  <el-col :xs="24" :sm="8" :md="6" :lg="5" :xl="3" style="   padding-left:0; margin-bottom: 10px;">
        <el-select v-model="addressObj.cityId" @change="queryCountryList()" size="mini">
<el-option v-for="(n,index) in cityList" :key="index" :label="n.name" :value="n.id"></el-option>
</el-select>

  </el-col>

  <el-col :xs="24" :sm="8" :md="6" :lg="5" :xl="3" style=" padding-left:0;   margin-bottom: 10px;">

        <el-select v-model="addressObj.countryId" size="mini">
<el-option v-for="(n,index) in countryList" :key="index" :label="n.name" :value="n.id"></el-option>
</el-select>
  </el-col>
</el-row>

    		</el-form-item>


				<el-form-item label="联系地址">
					<el-input v-model="addressObj.address" maxlength="50" size="mini" style="max-width:650px;"></el-input>
				</el-form-item>



			</el-form>




</div>


    
 <el-form label-width="100px"  :inline="true">
        <el-form-item  label="物流公司：">
					<el-select v-model="send_obj.logistics"  size="mini" filterable  style="max-width:400px;min-width:200px;">
						<el-option v-for="(item,index) in shipList" :value="item.comName" :label="item.comName" :key="index"></el-option>
					</el-select>
      	</el-form-item>
          <el-form-item  label="运单号：">
					<el-input v-model="send_obj.waybillNumber"   size="mini" style="max-width:400px;min-width:200px;"></el-input>
				</el-form-item>
           <el-form-item  >
				</el-form-item>
        <!-- <el-form-item>
        		<el-button type="primary" size="mini" @click="recvGood(item)" v-if="order.orderStatue == 'ORDER_WAIT_RECVGOODS' && pagetype =='afterorder'">确认收货</el-button>
				</el-form-item> -->
</el-form>

      <div>
<el-table border   ref="multipleTable"
    :data="ExpressDrugDetailSumQuantityList"
    stripe    @selection-change="handleSelectionChange"
    style="width: 100%">
   <el-table-column
      type="selection"
      width="55">
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
      prop="surplusSend"
      label="剩余数量">
   </el-table-column>
<el-table-column width="150"  v-if="send_obj.splitFlag =='1'" 
      label="添加数量">
      <template slot-scope="scope">
        <el-input size="small"  v-model="scope.row.number" />
      </template>
   </el-table-column>
<el-table-column
      prop="quantity"
      label="数量">
   </el-table-column>

  <el-table-column
      prop="drugPrice"
      label="药品库价格">
   </el-table-column>

  <el-table-column
      prop="price"
      label="售价">
   </el-table-column>


    <el-table-column width="150"
      prop="createDate"
      label="提交时间">
      </el-table-column>

    </el-table>
    </div>




<div style="text-align:right; margin-top:20px;    padding-top: 10px;border-top: 1px #e5e5e5 solid;">
<div>治疗服务费：<span style="color:red">￥{{order.serviceMoney}}</span></div>
<div>药品总价：<span style="color:red">￥{{order.presscriptionMoney}}</span></div>
<div>合计：<span style="color:red">￥{{order.orderMoney}}</span></div>
				<el-button type="primary" size="mini" @click="doSend()">发 货</el-button>
</div>
        </div>
      </el-tab-pane>
<el-tab-pane v-for="(item,index) in expressPackageList"  :label="'包裹'+ ++index"  :name="item.expressDetailId" >
<el-container>
    <el-header style="height: 100px;">
      <div>
    
   <div>
收货人： {{ExpressDetailModel.consigneeName}}
</div>
      <div>
收货电话： {{ExpressDetailModel.consigneePhone}}
</div>
      <div>
收货地址：{{ExpressDetailModel.province}} &nbsp;&nbsp;{{ExpressDetailModel.city}} &nbsp;&nbsp;{{ExpressDetailModel.country}}  &nbsp;&nbsp;{{ExpressDetailModel.consigneeAddress}}
</div>
    <div>
物流单号：{{ExpressDetailModel.waybillNumber}} 物流公司：{{ExpressDetailModel.logistics}} <span style="color: #409EFF;    cursor: pointer;" @click="showShipInfo({waybillNumber:ExpressDetailModel.waybillNumber,logistics:ExpressDetailModel.logistics})">物流跟踪</span>
</div>
</div>
    </el-header>
    <el-main>
<div style="margin:0 10px;">
  药品总价：￥{{ExpressDetailModel.drugPrice}}
</div>
<div style="margin:0 10px;">
  创建时间：￥{{ExpressDetailModel.createDate}}
</div>


<el-table border 
    :data="ExpressDrugDetailList"
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
      prop="expressQuantity"
      label="发货数量">
   </el-table-column>
     <el-table-column
      prop="expressPrice"
      label="发货金额">
   </el-table-column>
  <el-table-column
      prop="drugPrice"
      label="药品库价格">
   </el-table-column>

  <el-table-column
      prop="price"
      label="售价">
   </el-table-column>

    <el-table-column
      prop="createDate"
      label="提交时间">
      </el-table-column>
    </el-table>

    </el-main>
  </el-container>
</el-container>



</el-tab-pane>
<!-- 
<el-tab-pane   label="包裹列表"  name="packlist">
<el-container>

  <el-container>
    <el-header style="height: 100px;">
      <div>
      <div>
收货人： 陈锷
</div>
      <div>
收货电话： 13632303429
</div>
      <div>
收货地址： 四川省   攀枝花市   米易县   这话
</div>
    <div>
物流单号：455034994161 物流公司：顺丰速递 <span style="color: #409EFF;    cursor: pointer;">物流跟踪</span>
</div>
</div>
    </el-header>
    <el-main>
<div style="margin: 10px;">
  药品总价：￥100.00
</div>
<el-table border 
    :data="order.YdkOrderDetailList[0].YdkPrescriptiondrugList"
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
      prop="drugPrice"
      label="药品库价格">
   </el-table-column>

  <el-table-column
      prop="price"
      label="售价">
   </el-table-column>

    <el-table-column
      prop="createDate"
      label="提交时间">
      </el-table-column>
    </el-table>

    </el-main>
  </el-container>
</el-container>

    </el-tab-pane> -->
  </el-tabs>







    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import * as Api from "../../api/api";
import { Prop } from "vue-property-decorator";
import * as ApiOrder from "../../api/orderapi";

import moment from "moment";

@Component({props: {},
  components: {
  }
})
export default class AddGoods extends Vue {
 @Prop({ required: false })
  order: any;
 @Prop({ required: false })
 type:string
 @Prop({ required: false })
shipList
 @Prop({ required: false })
expressPackageList = []

 @Prop({ required: false })
  provinceList = [];


ExpressDrugDetailSumQuantityList=[]

loading = false
send_obj = {
  splitFlag:'0',
}
send_active = "send_goods";
addressObj = {}

  cityList = [];
  countryList = [];
 doSend() {
  let data = {
presId:this.order.presId,
waybillNumber:this.send_obj['waybillNumber'],
logistics:this.send_obj['logistics'],
splitFlag:this.send_obj.splitFlag,
          }
    if(this.send_obj.splitFlag == '1'){
        let PDrugQuantityListStr = []
        for(let i = 0; i<this.selection.length; i++){
        for(let j = 0; j<this.ExpressDrugDetailSumQuantityList.length; j++){

            if(!this.ExpressDrugDetailSumQuantityList[j].number && typeof  !parseFloat(this.ExpressDrugDetailSumQuantityList[j].number )){
                this.$alert('请输入正确的数量')
                return 
            }

            if(this.ExpressDrugDetailSumQuantityList[j].number > this.ExpressDrugDetailSumQuantityList[j].surplusSend ){
                     this.$alert('发货数量超过剩余数量')
                return 
            }

              if(this.selection[i] == this.ExpressDrugDetailSumQuantityList[j].prescriptionDrugId)  {
                PDrugQuantityListStr.push(parseFloat(this.ExpressDrugDetailSumQuantityList[j].number))
                break;
              }
        }
        }
          Object.assign(data,
          {
              PDrugIdListStr:this.selection.join(','),
              PDrugQuantityListStr:PDrugQuantityListStr.join(','),
              provinceid:this.addressObj['provinceId'],
              cityid :this.addressObj['cityid'],
              countryid:this.addressObj['countryId'],
              consigneeAddress:this.addressObj['address'],
              consigneeName   :this.addressObj['contactName'],
              consigneePhone:this.addressObj['contactMobile']
          })
        }




    //验证
    if ((this.send_obj['logistics']|| "") == "") {
      this.$alert("请填写物流公司");
      return;
    }
    if ((this.send_obj['waybillNumber']|| "") == "") {
      this.$alert("请填写物流单号");
      return;
    }
    this.$confirm("确认保存该发货信息?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .doSend(data)
          .then(res => {
            if (res["retCode"]) {
              this.$message("发货成功");


           if(this.send_obj.splitFlag == '0'){
             this.$emit('close');
           }else{
           this.$emit('getExpressPackage',this.order.presId)
           }
             this.$emit('doUpdate');

            } else {
              if (!res["islogin"]) {
                this.$alert(res["message"]);
              }
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
  queryCountryList() {
    this.addressObj['countryId'] = "";
    ApiOrder.queryCountryList(this.addressObj['cityId']).then(res => {
      this.countryList = res.data.region;
    });
  }
  queryCityList() {
    this.addressObj['cityId'] = "";
    ApiOrder.queryCityList(this.addressObj['provinceId']).then(res => {
      this.cityList = res.data.region;
    });
  }
SendActive_type(){
    return this.type
}
selection = []
handleSelectionChange(e){
this.selection = e.map(item=>{
    return item.prescriptionDrugId
  })
}

ExpressDetailModel:any = {}
ExpressDrugDetailList=[]
setaddress(){
    this.addressObj = {
contactName:this.order.consigneeName,
contactMobile:this.order.consigneePhone,
address:this.order.consigneeAddress,
provinceId:this.order.provinceid,
    }
      this.queryCityList();
this.addressObj['cityId'] = this.order.cityid
      this.queryCountryList();
this.addressObj['countryId'] = this.order.areaid


}
splitFlagChange(val){


  if(val=='0'){

  }else{
this.setaddress()
  }


// <div v-if="send_obj.splitFlag =='0'">
//    <div>
// 收货人： {{order.consigneeName}}
// </div>
//       <div>
// 收货电话： {{order.consigneePhone}}
// </div>
//       <div>
// 收货地址：{{order.province}} &nbsp;&nbsp;{{order.city}} &nbsp;&nbsp;{{order.area}}  &nbsp;&nbsp;{{order.consigneeAddress}}
// </div>


}
showShipInfo(obj){
    this.$emit('showShipInfo',obj)
}

getExpressPackageDrug(expressDetailId){
if(expressDetailId.name == 'send_goods' ){
  return 
}
  indexApi
          .getExpressPackageDrug({
            expressDetailId: expressDetailId.name
          })
          .then(res => {
            if (res["retCode"]) {
                this.ExpressDetailModel = res.data.ExpressDetailModel
                this.ExpressDrugDetailList = res.data.ExpressDrugDetailList
  } else {
              if (!res["islogin"]) {
                this.$alert(res["message"]);
              }
            }
          });

}

// getExpressPackage(presId){
//   console.log('===========')
// this.send_active = 'send_goods'
// this.$emit('initExpressDrugDetailSumQuantityList',[])
//   indexApi
//           .getExpressPackage({
//             presId: presId
//           })
//           .then(res => {

//             if (res["retCode"]) {
// this.$emit('initOrderSplitFlag',res.data.OrderSplitFlag)
//            this.expressPackageList = res.data.ExpressDetailList;

//         //默认选中
//     //     if((<any>this.$refs.express).SendActive_type() =='detail' && this.expressPackageList.length>0 &&  this.OrderSplitFlag == '1'){
//     //   (<any>this.$refs.express).send_active = this.expressPackageList[0].expressDetailId;
//     //   (<any>this.$refs.express).getExpressPackageDrug({name:this.expressPackageList[0].expressDetailId})
//     //   }
//     // (<any>this.$refs.express).send_obj.splitFlag  = this.OrderSplitFlag 
// this.$emit('initExpressDrugDetailSumQuantityList',res.data.ExpressDrugDetailSumQuantityList)
//             } else {
//               if (!res["islogin"]) {
//                 this.$alert(res["message"]);
//               }
//             }
//           });
// }

  mounted() {

  }
}
</script>

<style  scoped>
</style>