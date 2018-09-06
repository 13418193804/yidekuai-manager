<template>
    <div>

		<el-dialog width= "70vw" :close-on-click-modal="false" :append-to-body="true" :visible.sync="model"  title="订单详情" v-loading="loading">

<div class="flex flex-warp-justify">
  <h4 style="margin:0">订单状态：</h4>
<div>
    {{ handleOrderStatus(order.orderStatue)}}
</div>
</div>

<div class="flex flex-warp-justify" style="margin-bottom:10px;" v-if="order.orderStatue !== 'ORDER_INIT' &&  order.orderStatue !== 'ORDER_WAIT_PAY' && order.orderStatue !== 'ORDER_CANCEL_PAY'">
  <h4 style="margin:0">支付方式：</h4>
<div>
    {{handlePaymentMode(order.paymentMode)}}
</div>
<div v-if="updateOrder.paymentMode == 'ONLINE_PAYMENT'" style="margin-left:20px;">
微信支付订单号：
</div>
<div>
{{updateOrder.transactionLogs&&updateOrder.transactionLogs.length>0?updateOrder.transactionLogs[0].weixinno:''}}
</div>
</div>

<el-collapse >
 <el-collapse-item title="患者信息" >
   <div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>患者姓名：</span>
  <span>{{order.memberName}}</span>
</div>
<div style="margin-right:10px;">
  <span>患者年龄：</span>
  <span>{{order.memberAge}}</span>
</div>
<div style="margin-right:10px;">
  <span>患者性别：</span>
  <span>{{order.patientSex}}</span>
</div>
<div style="margin-right:10px;">
  <span>患者身份证：</span>
  <span>{{order.memberIdcard}}</span>
</div>
<div style="margin-right:10px;">
  <span>患者手机号：</span>
  <span>{{order.memberPhone}}</span>
</div>
</div>
  </el-collapse-item>
 <el-collapse-item title="医生信息" >

<div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>开方医生：</span>
  <span>{{order.docterName}}</span>
</div>
<div style="margin-right:10px;">
  <span>医生手机号：</span>
  <span>{{order.doctorMobile}}</span>
</div>

<div style="margin-right:10px;">
  <span>医院：</span>
  <span>{{order.hospitalName}}</span>
</div>
</div>
  </el-collapse-item>
 <el-collapse-item title="详细信息" >
<div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>订单编号：</span>
  <span>{{order.presId}}</span>
</div>
<div style="margin-right:10px;">
  <span>收货人：</span>
  <span>{{order.consigneeName}}</span>
</div>

<div style="margin-right:10px;">
  <span>收货电话：</span>
  <span>{{order.consigneePhone}}</span>
</div>

<div style="margin-right:10px;">
  <span>收货地址：</span>
  <span>{{order.province}} &nbsp;&nbsp;{{order.city}} &nbsp;&nbsp;{{order.area}}  &nbsp;&nbsp;{{order.consigneeAddress}}</span>
</div>

<div style="margin-right:10px;">
  <span>创建时间：</span>
  <span>{{order.auditingDate}}</span>
</div>

<div style="margin-right:10px;">
  <span>付款时间：</span>
  <span>{{order.payTime}}</span>
</div>

<div style="margin-right:10px;">
  <span>付款状态：</span>
  <span>{{handlePayStatus(order.payStatus)}}</span>
</div>
</div>


<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;">
    <div style=" margin-right:10px;" >
    开方时间：{{order.createDate}}
    </div>
     <div style=" margin-right:10px;" >
    医生给患者备注：{{order.patientRemake}}
    </div>
    <div style=" margin-right:10px;" >
    医生给转方备注：{{order.remark}}
    </div>
    </div>

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;">
     <div style=" margin-right:10px;" v-if=" order.presState !=  'NOT_TRANSLATED_PRESCRIPTION'">
    转方时间：{{order.transDate}}
    </div>
      <div style=" margin-right:10px;" v-if=" order.presState !=  'NOT_TRANSLATED_PRESCRIPTION'">
    转方医生：{{order.transDocName}}
    </div>
   <div style=" margin-right:10px;" v-if=" order.presState !=  'NOT_TRANSLATED_PRESCRIPTION'">
    转方备注：{{order.transRemark}}
    </div>
    </div>

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;">
      <div style=" margin-right:10px;" v-if=" order.presState ==  'REJECT_TRANSLATED_PRESCRIPTION'">
    转方退回时间：{{order.rejectTransTime}}
    </div>
  <div style=" margin-right:10px;" v-if=" order.presState ==  'REJECT_TRANSLATED_PRESCRIPTION'">
    转方退回原因：{{order.returnReason}}
    </div>
    </div>

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;">
    <div style=" margin-right:10px;" v-if=" order.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && order.presState !=  'REJECT_AUDIT_PRESCRIPTION'  && order.presState != 'REJECT_TRANSLATED_PRESCRIPTION'&& order.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方时间：{{order.auditingDate}}
    </div>
   <div style=" margin-right:10px;" v-if=" order.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && order.presState != 'REJECT_AUDIT_PRESCRIPTION' &&  order.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方医生：{{order.auditingName}}
    </div>
   <!-- <div style=" margin-right:10px;" v-if=" order.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && order.presState != 'REJECT_AUDIT_PRESCRIPTION' &&  order.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
    审方备注：{{order.auditingRemake}}
    </div> -->
    </div>

<div  style=" font-size: 14.8px;display:flex;    flex-wrap: wrap;">
      <div style=" margin-right:10px;" v-if="order.presState == 'REJECT_AUDIT_PRESCRIPTION' ||order.rejectAuditTime">
    审方退回时间：{{order.rejectAuditTime}}
    </div>
   <div style=" margin-right:10px;" v-if="order.presState == 'REJECT_AUDIT_PRESCRIPTION' || order.rejectAuditTime">
    审方退回原因：{{order.rejectAuditReason}}
    </div>
    </div>
  </el-collapse-item>

 <el-collapse-item title="发票" v-if="order.invoiceRecords && order.invoiceRecords.length>0">
 <div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>抬头名称：</span>
  <span>{{order.invoiceRecords[0].invoiceName}}</span>
</div>
<div style="margin-right:10px;">
  <span>抬头类型：</span>
  <span>{{order.invoiceRecords[0].titleType =='PERSONAL'?'个人':'公司'}}</span>
</div>
<div style="margin-right:10px;">
  <span>申请开票时间：</span>
  <span>{{order.invoiceRecords[0].creatTime}}</span>
</div>
</div>


<div class="flex flex-warp-justify">
  <div style="margin-right:10px;">
  <span>　　姓名：</span>
  <span>{{order.address['contactName']}}</span>
</div>
<div style="margin-right:10px;">
  <span>联系电话：</span>
  <span>{{order.address['contactMobile']}}</span>
</div>
</div>
  <div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>收货地址：</span>
  <span>{{`${order.address.province}${order.address.city}${order.address.country}${order.address.address}`}}</span>
</div>
</div>
 <div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>发货状态：</span>
  <span>{{handleShipStatus(order.invoiceRecords[0].shipStatus)}}</span>
</div>
</div>





<div>
<div class="flex flex-warp-justify" style="">
  <h4 style="margin:0;height: 40px;display: flex;align-items: center;" v-if="order.isInvoiced == '1'">发票物流：</h4>
    <div >
      <span style="color:#999">
<div v-if="(pagetype == 'reminder' || pagetype == 'patient') && order.isInvoiced == '1' && order.isInvoicedShipped == '0' " style="line-height:40px;">暂无信息</div>
<span  v-if="(pagetype == 'afterorder' || pagetype=='rework') && order.invoiceRecords && order.invoiceRecords.length>0&& order.invoiceRecords[0].shipStatus !='HAVE_SIGNED_IN'">
 <el-form label-width="100px"  :inline="true">
        <el-form-item  label="物流公司：" style="margin:0">
					<el-select v-model="order.invoiceObj_logistics"  size="mini" filterable  style="max-width:400px;min-width:200px;">
						<el-option v-for="(item,index) in shipList" :value="item.comName" :label="item.comName" :key="index"></el-option>
					</el-select>
      	</el-form-item>
          <el-form-item  label="运单号：" style="margin:0">
					<el-input v-model="order.invoiceObj_waybillNumber"  size="mini" style="max-width:400px;min-width:200px;"></el-input>
				</el-form-item>
           <el-form-item  style="margin:0">
				<el-button type="primary" size="mini" @click="do_invoiceObjSend(order.presId)">保 存</el-button>
				</el-form-item>
            <el-form-item>
        		<el-button type="primary" size="mini" @click="recv_invoice(order)" v-if="(pagetype == 'afterorder' || pagetype=='rework') && order.invoiceRecords[0].shipStatus == 'ALREAD_SHIPPED' ">确认收货</el-button>
				</el-form-item>
</el-form>
</span>
      </span>
      </div>
      <div style="    line-height: 40px;" class="flex flex-warp-justify"  v-if="order.invoiceRecords && order.invoiceRecords.length>0 &&order.isInvoicedShipped == '1'">
<div style="margin-right:10px;">
  <span>物流单号：</span>
  <span>{{order.invoiceRecords[0].waybillNumber}}</span>
</div>
<div style="margin-right:10px;">
  <span>物流公司：</span>
  <span>{{order.invoiceRecords[0].logistics}}</span>
</div>

<div style="margin-right:10px;">
  <span>发货时间：</span>
  <span>{{order.invoiceRecords[0].deliveryTime}}</span>
</div>
<div style="margin-right:10px;">
				<el-button type="text" size="mini" @click="showShipInfo({waybillNumber:order.invoiceRecords[0].waybillNumber,logistics:order.invoiceRecords[0].logistics})">物流跟踪</el-button>
</div>
</div>
      </div>
      </div>
  </el-collapse-item>
</el-collapse>

<div v-for="(item,index) in order.YdkOrderDetailList" :key="index">
<div class="flex flex-warp-justify" style="margin-top:20px;">
  <h4 style="margin:0;height: 40px;display: flex;align-items: center;">订单物流：</h4>
    <div >
      <span style="color:#999">
<div v-if="(pagetype == 'reminder' ||pagetype == 'patient') && (item.shipStatus !== 'ORDER_WAIT_RECVGOODS' && item.shipStatus !==  'ORDER_END_GOODS')" style="line-height:40px;">暂无信息</div>

<span  v-if="pagetype == 'afterorder' && order.orderStatue !== 'ORDER_END_GOODS'">
 <el-form label-width="100px"  :inline="true">
        <el-form-item  label="物流公司：">
					<el-select v-model="item.logistics"  size="mini" filterable  style="max-width:400px;min-width:200px;">
						<el-option v-for="(item,index) in shipList" :value="item.comName" :label="item.comName" :key="index"></el-option>
					</el-select>
      	</el-form-item>
          <el-form-item  label="运单号：">
					<el-input v-model="item.waybillNumber"   size="mini" style="max-width:400px;min-width:200px;"></el-input>
				</el-form-item>
           <el-form-item  >
				<el-button type="primary" size="mini" @click="doSend(item,order.presId)">保 存</el-button>
				</el-form-item>
        <el-form-item>
        		<el-button type="primary" size="mini" @click="recvGood(item)" v-if="order.orderStatue == 'ORDER_WAIT_RECVGOODS' && pagetype =='afterorder'">确认收货</el-button>
				</el-form-item>
</el-form>
<!-- order.paymentMode =='ORDER_PAY_ONDEV' &&  -->
</span>
      </span>
      </div>


    <div v-if="item.shipStatus == 'ORDER_WAIT_RECVGOODS' || item.shipStatus ==  'ORDER_END_GOODS'" style="line-height:40px;" class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>物流单号：</span>
  <span>{{item.waybillNumberlabel}}</span>
</div>
<div style="margin-right:10px;">
  <span>物流公司：</span>
  <span>{{item.logisticslabel}}</span>
</div>

<div style="margin-right:10px;">
  <span>发货时间：</span>
  <span>{{item.deliveryTime}}</span>
</div>

<div style="margin-right:10px;">
				<el-button type="text" size="mini" @click="showShipInfo(item)">物流跟踪</el-button>
</div>
      </div>

</div>




<h4 style="margin:0 0 10px 0;">药品信息</h4>
<el-table border 
    :data="item.YdkPrescriptiondrugList"
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
    </div>

<div style="text-align:right; margin-top:20px;    padding-top: 10px;border-top: 1px #e5e5e5 solid;">
<div>治疗服务费：<span style="color:red">￥{{order.serviceMoney}}</span></div>
<div>药品总价：<span style="color:red">￥{{order.presscriptionMoney}}</span></div>
<div>合计：<span style="color:red">￥{{order.orderMoney}}</span></div>
</div>
        </el-dialog>



		<el-dialog width= "70vw" :close-on-click-modal="false" :visible.sync="formModel"  title="订单详情" v-loading="loading">
 
 

<div class="flex flex-warp-justify">
  <h4 style="margin:0">订单状态：</h4>
<div>
    {{ handleOrderStatus(updateOrder.orderStatue)  }}
</div>
				<!-- <el-button type="primary" size="mini" @click="recvGood" v-if="order.paymentMode =='paymentMode' &&  order.orderStatue == 'ORDER_WAIT_RECVGOODS' && (pagetype =='afterorder' ||pagetype =='reminder')">确认收货</el-button> -->
</div>



<div class="flex flex-warp-justify" style="margin-bottom:10px;" v-if="updateOrder.orderStatue !== 'ORDER_INIT' && updateOrder.orderStatue !== 'ORDER_WAIT_PAY' && updateOrder.orderStatue !== 'ORDER_CANCEL_PAY'  ">
  <h4 style="margin:0">支付方式：</h4>
<div>
    {{handlePaymentMode(updateOrder.paymentMode)}}
</div>
<div v-if="updateOrder.paymentMode == 'ONLINE_PAYMENT'" style="margin-left:20px;">
微信支付订单号：
</div>
<div>
{{updateOrder.transactionLogs&&updateOrder.transactionLogs.length>0?updateOrder.transactionLogs[0].weixinno:''}}
</div>
</div> 


<el-collapse >
 <el-collapse-item title="患者信息" >


<div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>患者姓名：</span>
  <span>{{updateOrder.memberName}}</span>
</div>
<div style="margin-right:10px;">
  <span>患者年龄：</span>
  <span>{{updateOrder.memberAge}}</span>
</div>




<div style="margin-right:10px;">
  <span>患者性别：</span>
  <span>{{updateOrder.patientSex}}</span>
</div>


<div style="margin-right:10px;">
  <span>患者身份证：</span>
  <span>{{updateOrder.memberIdcard}}</span>
</div>

<div style="margin-right:10px;">
  <span>患者手机号：</span>
  <span>{{updateOrder.memberPhone}}</span>
</div>

</div>

   </el-collapse-item>
 <el-collapse-item title="医生信息" >

<div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>开方医生：</span>
  <span>{{updateOrder.docterName}}</span>
</div>

<div style="margin-right:10px;">
  <span>医生账号：</span>
  <span>{{updateOrder.memberAge}}</span>
</div>

<div style="margin-right:10px;">
  <span>医生手机号：</span>
  <span>{{updateOrder.doctorMobile}}</span>
</div>

<div style="margin-right:10px;">
  <span>医院：</span>
  <span>{{updateOrder.hospitalName}}</span>
</div>
</div>

  </el-collapse-item>
 <el-collapse-item title="详细信息" >

<div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>订单编号：</span>
  <span>{{updateOrder.presId}}</span>
</div>

<div style="margin-right:10px;">
  <span>创建时间：</span>
  <span>{{updateOrder.auditingDate}}</span>
</div>

<div style="margin-right:10px;">
  <span>付款时间：</span>
  <span>{{updateOrder.payTime}}</span>
</div>
<div style="margin-right:10px;">
  <span>付款状态：</span>
  <span>{{handlePayStatus(updateOrder.payStatus)}}</span>
</div>
</div>

<div v-if="pagetype == 'afterorder'">
 <el-form label-width="100px">
  <el-form-item  label="收货人：" style="margin:0">
					<el-input v-model="updateOrder.consigneeName" size="mini" style="max-width:400px;min-width:200px;"></el-input>
				</el-form-item>
  <el-form-item  label="收货电话：" style="margin:0">
					<el-input v-model="updateOrder.consigneePhone" size="mini" style="max-width:400px;min-width:200px;"></el-input>
				</el-form-item>


		<el-form-item label="地区" style="margin:0">
<div style="    white-space: nowrap;overflow:hidden;    max-width: 400px;">
<el-row :gutter="24" >
  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" >
<el-select v-model="updateOrder.provinceid" @change="queryCityList(true)"  size="mini">
<el-option v-for="(n,index) in provinceList" :key="index" :label="n.name" :value="n.id" ></el-option>
</el-select>
  </el-col>
  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" >
        <el-select v-model="updateOrder.cityid" @change="queryCountryList(true)"  size="mini">
<el-option v-for="(n,index) in cityList" :key="index" :label="n.name" :value="n.id"></el-option>
</el-select>
  </el-col>
  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" >
        <el-select v-model="updateOrder.areaid"  size="mini">
<el-option v-for="(n,index) in countryList" :key="index" :label="n.name" :value="n.id"></el-option>
</el-select>
  </el-col>
</el-row>
		</div>
    		</el-form-item>




  <el-form-item  label="详细地址：" style="margin:0">
					<el-input v-model="updateOrder.consigneeAddress"  size="mini" style="max-width:400px;min-width:200px;"></el-input>
				</el-form-item>



          <el-form-item >
		<el-button type="primary" size="mini" @click="doSubmit">保 存</el-button>
				</el-form-item>
</el-form>
</div>


<div  v-else>


<div style="margin-right:10px;">
  <span>收货人：</span>
  <span>{{updateOrder.consigneeName}}</span>
</div>
<div style="margin-right:10px;">
  <span>收货电话：</span>
  <span>{{updateOrder.consigneePhone}}</span>
</div>
<div style="margin-right:10px;">
  <span>收货地址：</span>
  <span>{{updateOrder.consigneeAddress}}</span>
</div>



</div>
  </el-collapse-item>

 <el-collapse-item title="发票" v-if="order.invoiceRecords && order.invoiceRecords.length>0">
 <div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>抬头名称：</span>
  <span>{{order.invoiceRecords[0].invoiceName}}</span>
</div>
<div style="margin-right:10px;">
  <span>抬头类型：</span>
  <span>{{order.invoiceRecords[0].titleType =='PERSONAL'?'个人':'公司'}}</span>
</div>
<div style="margin-right:10px;">
  <span>申请开票时间：</span>
  <span>{{order.invoiceRecords[0].creatTime}}</span>
</div>
</div>


<div class="flex flex-warp-justify">
  <div style="margin-right:10px;">
  <span>　　姓名：</span>
  <span>{{order.address['contactName']}}</span>
</div>
<div style="margin-right:10px;">
  <span>联系电话：</span>
  <span>{{order.address['contactMobile']}}</span>
</div>
</div>
  <div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>收货地址：</span>
  <span>{{`${order.address.province}${order.address.city}${order.address.country}${order.address.address}`}}</span>
</div>
</div>
 <div class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>发货状态：</span>
  <span>{{handleShipStatus(order.invoiceRecords[0].shipStatus)}}</span>
</div>
</div>





<div>
<div class="flex flex-warp-justify" style="">
  <h4 style="margin:0;height: 40px;display: flex;align-items: center;" v-if="order.isInvoiced == '1'">发票物流：</h4>
    <div >
      <span style="color:#999">
<div v-if="(pagetype == 'reminder' || pagetype == 'patient') && order.isInvoiced == '1' && order.isInvoicedShipped == '0' " style="line-height:40px;">暂无信息</div>
<span  v-if="(pagetype == 'afterorder' || pagetype=='rework') && order.invoiceRecords && order.invoiceRecords.length>0&& order.invoiceRecords[0].shipStatus !='HAVE_SIGNED_IN'">
 <el-form label-width="100px"  :inline="true">
        <el-form-item  label="物流公司：" style="margin:0">
					<el-select v-model="order.invoiceObj_logistics"  size="mini" filterable  style="max-width:400px;min-width:200px;">
						<el-option v-for="(item,index) in shipList" :value="item.comName" :label="item.comName" :key="index"></el-option>
					</el-select>
      	</el-form-item>
          <el-form-item  label="运单号：" style="margin:0">
					<el-input v-model="order.invoiceObj_waybillNumber"  size="mini" style="max-width:400px;min-width:200px;"></el-input>
				</el-form-item>
           <el-form-item  style="margin:0">
				<el-button type="primary" size="mini" @click="do_invoiceObjSend(order.presId)">保 存</el-button>
				</el-form-item>
            <el-form-item>
        		<el-button type="primary" size="mini" @click="recv_invoice(order)" v-if="(pagetype == 'afterorder' || pagetype=='rework') && order.invoiceRecords[0].shipStatus == 'ALREAD_SHIPPED' ">确认收货</el-button>
				</el-form-item>
</el-form>
</span>
      </span>
      </div>
      <div style="    line-height: 40px;" class="flex flex-warp-justify"  v-if="order.invoiceRecords && order.invoiceRecords.length>0 &&order.isInvoicedShipped == '1'">
<div style="margin-right:10px;">
  <span>物流单号：</span>
  <span>{{order.invoiceRecords[0].waybillNumber}}</span>
</div>
<div style="margin-right:10px;">
  <span>物流公司：</span>
  <span>{{order.invoiceRecords[0].logistics}}</span>
</div>

<div style="margin-right:10px;">
  <span>发货时间：</span>
  <span>{{order.invoiceRecords[0].deliveryTime}}</span>
</div>
<div style="margin-right:10px;">
				<el-button type="text" size="mini" @click="showShipInfo({waybillNumber:order.invoiceRecords[0].waybillNumber,logistics:order.invoiceRecords[0].logistics})">物流跟踪</el-button>
</div>
</div>
      </div>
      </div>
  </el-collapse-item>
</el-collapse>

<div v-for="(item,index) in updateOrder.YdkOrderDetailList" :key="index">
<div class="flex flex-warp-justify" style="margin-top:20px;">
  <h4 style="margin:0;    height: 40px;
    display: flex;
    align-items: center;">订单物流：</h4>
    <div >
      <span style="color:#999">
        
<div v-if="(pagetype == 'reminder' || pagetype == 'patient') &&  (item.shipStatus !== 'ORDER_WAIT_RECVGOODS' && item.shipStatus !==  'ORDER_END_GOODS')" style="line-height:40px;">暂无信息</div>
<span  v-if="pagetype == 'afterorder'&& order.orderStatue !== 'ORDER_END_GOODS'">
 <el-form label-width="100px"  :inline="true">
        <el-form-item  label="物流公司：">
					<!-- <el-input v-model="item.logistics" size="mini" style="max-width:400px;min-width:200px;"></el-input> -->
						<el-select v-model="item.logistics"  size="mini" filterable  style="max-width:400px;min-width:200px;">
						<el-option v-for="(item,index) in shipList" :key="index" :value="item.comName" :label="item.comName"></el-option>
					</el-select>
        </el-form-item>
          <el-form-item  label="运单号：">
					<el-input v-model="item.waybillNumber"   size="mini" style="max-width:400px;min-width:200px;"></el-input>
				</el-form-item>
           <el-form-item  >
				<el-button type="primary" size="mini" @click="doSend(item,updateOrder.presId)">保 存</el-button>
				</el-form-item>
     <el-form-item>
        		<el-button type="primary" size="mini" @click="recvGood(item)" v-if="updateOrder.orderStatue == 'ORDER_WAIT_RECVGOODS' && pagetype =='afterorder'">确认收货</el-button>
				</el-form-item>
</el-form>
</span>
      </span>
      </div>


    <div v-if="item.shipStatus == 'ORDER_WAIT_RECVGOODS' || item.shipStatus ==  'ORDER_END_GOODS'" style="line-height:40px;" class="flex flex-warp-justify">
<div style="margin-right:10px;">
  <span>物流单号：</span>
  <span>{{item.waybillNumberlabel}}</span>
</div>
<div style="margin-right:10px;">
  <span>物流公司：</span>
  <span>{{item.logisticslabel}}</span>
</div>
<div style="margin-right:10px;">
  <span>发货时间：</span>
  <span>{{item.deliveryTime}}</span>
</div>
<div style="margin-right:10px;">
				<el-button type="text" size="mini" @click="showShipInfo(item)">物流跟踪</el-button>
</div>
      </div>
</div>

<h4 style="margin:0 0 10px 0;">药品信息</h4>
<el-table border 
    :data="item.YdkPrescriptiondrugList"
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
      prop="price"
      label="药品价格">
   </el-table-column>
    <el-table-column
      prop="createDate"
      label="提交时间">
      </el-table-column>
    </el-table>
    </div>
<div style="text-align:right; margin-top:20px;    padding-top: 10px;border-top: 1px #e5e5e5 solid;">
<div>治疗服务费：<span style="color:red">￥{{updateOrder.serviceMoney}}</span></div>
<div>药品总价：<span style="color:red">￥{{updateOrder.presscriptionMoney}}</span></div>
<div>合计：<span style="color:red">￥{{updateOrder.orderMoney}}</span></div>
</div>
</el-dialog>

		<el-dialog width= "70vw" :close-on-click-modal="false"   append-to-body :visible.sync="shipInfoModel"  title="物流追踪" >
         <div style="margin-left:20px;margin-bottom:10px;font-size:15px;height:500px;overflow: auto;" v-loading="shipInfoLoading">
            <div v-for="(item,index) in shipInfo" :key="index">
              {{item.AcceptStation}}{{item.AcceptTime}}
          </div>
          <div v-if="shipInfo.length==0" style="margin:40px 0;text-align:center;color:#999;font-size:14.8px">暂无物流信息</div>
         </div>
        
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
import * as ApiOrder from "../../api/orderapi";

@Component({
  props: {},
  components: {}
})

/**
 * order :  订单
 *
 *
 */
export default class AddGoods extends Vue {
  @Prop({ required: false })
  order: any;
  @Prop({ required: false })
  updateOrder: any;
  @Prop({ required: false })
  pagetype: string;
  @Prop({ required: false })
  shipList;

  @Prop({ required: false })
  provinceList;

  loading = false;
  /**
   *
   * 订单状态
   */

  handleShipStatus(shipStatus) {
    switch (shipStatus) {
      case "ALREAD_SHIPPED":
        return "已发货";
      case "UNSHIPPED_DELIVERY":
        return "未发货";
      case "HAVE_SIGNED_IN":
        return "已签收";
      default:
        return "";
    }
  }
  /**
   *开发票 发货
   */
  do_invoiceObjSend(presId) {
    this.$confirm("确认保存该发货信息?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .invoicedDeliver({
            logistics: this.order.invoiceObj_logistics,
            waybillNumber: this.order.invoiceObj_waybillNumber,
            preid: presId
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("发货成功");
              this.$emit("getOrderList");
              this.$emit("getOrderDetail", presId);
              this.$emit("queryShipList");
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
  /**
   * 发票 确认收货
   */
  recv_invoice(order) {
    this.$confirm("确认收货?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .invoicedSignInByid({
            invoiceid: order.invoiceRecords[0].invoiceRecordId
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("已确认收货");
              this.$emit("getOrderList");
              this.$emit("getOrderDetail", this.order.presId);
              this.$emit("queryShipList");
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

  countryList = [];
  cityList = [];

  handleUpdateOrder(updateOrder) {
    this.updateOrder = updateOrder;
  }
  queryCountryList(setNull = null) {
    if (setNull) {
      this.updateOrder.areaid = "";
    }
    ApiOrder.queryCountryList(this.updateOrder.cityid).then(res => {
      this.countryList = res.data.region;
    });
  }

  queryCityList(setNull = null) {
    if (setNull) {
      this.updateOrder.cityid = "";
    }
    ApiOrder.queryCityList(this.updateOrder.provinceid).then(res => {
      this.cityList = res.data.region;
    });
  }

  shipInfoLoading = false;
  shipInfoModel = false;
  shipInfo = [];
  showShipInfo(item) {
    this.shipInfo = [];
    this.shipInfoModel = true;
    this.shipInfoLoading = true;

    indexApi
      .showShipInfo({
        id: item.waybillNumber,
        comName: item.logistics
      })
      .then(res => {
        this.shipInfoLoading = false;
        if (res["retCode"]) {
          if (res.data.Success) {
            this.shipInfo = res.data.Traces;
          }
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }
  handlePaymentMode(status) {
    switch (status) {
      case "ONLINE_PAYMENT":
        return "微信支付";
      case "ORDER_PAY_ONDEV":
        return "货到付款";
      default:
        return "";
    }
  }

  recvGood(item) {
    this.$confirm("确认收货?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .doSend({
            //  pres_id:this.order.presId,
            order_detail_id: item.orderDetailId,
            ship_status: "ORDER_END_GOODS"
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("已确认收货");
              this.$emit("getOrderList");
              this.$emit("getOrderDetail", this.order.presId);
              this.$emit("queryShipList");
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
  sendModel = false;
  doSend(item, presId) {
    item.waybill_number = item.waybillNumber;
    //验证
    if ((item.logistics || "") == "") {
      this.$alert("请填写物流公司");
      return;
    }
    if ((item.waybill_number || "") == "") {
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
          .doSend({
            order_detail_id: item.orderDetailId,
            pres_id: presId,
            ship_status: "ORDER_WAIT_RECVGOODS",
            logistics: item.logistics,
            waybill_number: item.waybill_number
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("发货成功");
              this.$emit("getOrderList");
              this.$emit("getOrderDetail", presId);
              this.$emit("queryShipList");
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

  preDrugList = [];
  queryPresDrugback(presId) {
    indexApi
      .queryPresDrugback({
        preId: presId
      })
      .then(res => {
        if (res["retCode"]) {
          this.preDrugList = res.data;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  model = false;
  formModel = false;
  doSubmit() {
    //验证
    indexApi.updateOrder(this.updateOrder).then(res => {
      if (res["retCode"]) {
        this.$message("保存成功");
        this.formModel = false;
        this.$emit("getOrderList");
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  handleOrderStatus(status) {
    switch (status) {
      case "ORDER_INIT":
        return "订单初始化";
      case "ORDER_WAIT_PAY":
        return "等待支付";
      case "ORDER_PAY_ONDEV":
        return "货到付款";
      case "ORDER_CANCEL_PAY":
        return "取消支付";
      case "ORDER_WAIT_SENDGOODS":
        return "待发货";
      case "ORDER_WAIT_RECVGOODS":
        return "待收货";
      case "ORDER_END_GOODS":
        return "完成";
      default:
        return "";
    }
  }

  mounted() {}
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