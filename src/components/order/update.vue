

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


/**
script
 */



  handleUpdateOrder(updateOrder) {
    this.updateOrder = updateOrder;
  }

  









