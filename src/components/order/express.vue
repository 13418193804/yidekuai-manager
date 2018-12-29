<template>
    <div>
  
  <el-tabs v-model="send_active"  type="border-card" @tab-click="getExpressPackageDrug" id="send_active">
    <el-tab-pane   label="商品信息"  name="goods_detail" v-if="type =='detail' && send_obj.splitFlag == '1' ">
<div style=" margin-top:20px;    padding-top: 10px;">
  <div v-if="order.preDrugType == 'PASTE_PRESCRIPTION'">制作费：<span style="color:red">￥{{order.makeMoney}}</span></div>
<div v-if="order.preDrugType == 'CHINESE_MEDICINE'">代煎费：<span style="color:red">￥{{order.replaceDecoctingMoney}}</span></div>
<div>治疗服务费：<span >￥{{order.serviceMoney}}</span></div>
<div>药品总价：<span >￥{{order.presscriptionMoney}}</span></div>
<div>合计：<span >￥{{order.orderMoney}}</span></div>
</div>


  <el-tabs v-model="all_drugType" >
    <el-tab-pane  label="中药" name="CHINESE" v-if="order.SplitPrescription.CHINESE_MEDICINE && order.SplitPrescription.CHINESE_MEDICINE.drugs.length>0">

<el-table border
    :data="order.SplitPrescription.CHINESE_MEDICINE.drugs"
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
      <div style="text-align:right;">代煎费：<span style="color:red" >￥{{order.prescription.isReplaceDecocting===1?order.prescription.replaceDecoctingMoney:0}}</span></div>
          <div style="text-align:right;">中药药品合计：<span style="color:red" >￥{{order.SplitPrescription.CHINESE_MEDICINE.presscriptionMoney}}</span></div>


    </el-tab-pane>
    <el-tab-pane  label="西药" name="WESTERN" v-if="order.SplitPrescription.WESTERN_MEDICINE && order.SplitPrescription.WESTERN_MEDICINE.drugs.length>0">


<el-table border
    :data="order.SplitPrescription.WESTERN_MEDICINE.drugs"
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
      prop="createDate"
      label="提交时间">
   </el-table-column>
   </el-table>
    <div style="text-align:right;">西药药品合计：<span style="color:red" >￥{{order.SplitPrescription.WESTERN_MEDICINE.presscriptionMoney}}</span></div>

   </el-tab-pane>
    <el-tab-pane  label="膏方" name="PASTE_PRESCRIPTION" v-if="order.SplitPrescription.PASTE_PRESCRIPTION && order.SplitPrescription.PASTE_PRESCRIPTION.drugs.length>0">
<el-table border
    :data="order.SplitPrescription.PASTE_PRESCRIPTION.drugs"
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

   <div style="text-align:right;">制作费：<span style="color:red" >￥{{order.makeMoney}}</span></div>
      <div style="text-align:right;">膏方药品合计：<span style="color:red" >￥{{order.SplitPrescription.PASTE_PRESCRIPTION.presscriptionMoney}}</span></div>
    </el-tab-pane>
  </el-tabs>

      </el-tab-pane>





    <el-tab-pane   label="未发货"  name="send_goods" v-if="type =='send'">
        <div style="margin-top: 10px;">
 <div>
    <el-radio-group v-model="send_obj.splitFlag"  size="small" @change="splitFlagChange">
      <el-radio label="0" :disabled="send_obj.splitFlag == '1' && expressPackageList.length>0">普通订单</el-radio>
      <el-radio label="1">拆分订单</el-radio>
    </el-radio-group>
  </div>
  <div style="height:15px;"></div>
<div >
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


    
 <el-form label-width="100px"  :inline="true">
        <el-form-item  label="物流公司：">
					<el-select v-model="send_obj.logistics"  size="mini" filterable  style="max-width:400px;min-width:200px;">
						<el-option v-for="(item,index) in shipList" :value="item.comName" :label="item.comName" :key="index"></el-option>
					</el-select>
      	</el-form-item>
          <el-form-item  label="运单号：">
					<el-input v-model="send_obj.waybillNumber"   size="mini" style="max-width:400px;min-width:200px;"></el-input>
				</el-form-item>
        
</el-form>
 <el-form label-width="100px" >
      <el-form-item  label="包裹备注：">
					<el-input v-model="send_obj.remarks" placeholder="患者可见"  size="mini" style="max-width:400px;min-width:200px;"></el-input>
				</el-form-item>
</el-form>
      <div>




  <el-tabs v-model="drugType" >
    <el-tab-pane  label="中药" name="CHINESE" v-if="CHINESE_preDrugList.length>0">

<el-table border @selection-change="handleSelectionChange"
    :data="CHINESE_preDrugList"
    stripe
    style="width: 100%">
      <el-table-column fixed="left" v-if="send_obj.splitFlag == '1'"
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
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








      <div style="text-align:right;">代煎费：<span style="color:red" >￥{{order.prescription.isReplaceDecocting===1?order.prescription.replaceDecoctingMoney:0}}</span></div>
          <div style="text-align:right;">中药药品合计：<span style="color:red" >￥{{order.SplitPrescription.CHINESE_MEDICINE.presscriptionMoney}}</span></div>


    </el-tab-pane>
    <el-tab-pane  label="西药" name="WESTERN" v-if="WESTERN_preDrugList.length>0">


<el-table border @selection-change="handleSelectionChange"
    :data="WESTERN_preDrugList"
    stripe
    style="width: 100%">

      <el-table-column fixed="left" v-if="send_obj.splitFlag == '1'"
      type="selection"  width="55" >
    </el-table-column>
   
    <el-table-column  
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


<el-table-column width="150" 
      label="添加数量/剩余数量">
      <template slot-scope="scope">
        <div class="flex flex-align-center" >
          <div class="flex-1">
            <span v-if="send_obj.splitFlag == '1'" > 
        <el-input size="small"   v-model="scope.row.number" />
            </span>
            <span v-else style="float: right;">
                {{scope.row.surplusSend}}
            </span>
        </div>
        <div class="flex-1">&nbsp;/&nbsp;{{scope.row.surplusSend}}</div>
        </div>
      </template>
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
      prop="createDate"
      label="提交时间">
   </el-table-column>
   </el-table>
    <div style="text-align:right;">西药药品合计：<span style="color:red" >￥{{order.SplitPrescription.WESTERN_MEDICINE.presscriptionMoney}}</span></div>

   </el-tab-pane>
    <el-tab-pane  label="膏方" name="PASTE_PRESCRIPTION" v-if="PASTE_preDrugList.length>0">
<el-table border @selection-change="handleSelectionChange"
    :data="PASTE_preDrugList"
    stripe
    style="width: 100%">

     <el-table-column fixed="left"
      type="selection" v-if="send_obj.splitFlag == '1'"
      width="55">
    </el-table-column>
    <el-table-column  
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

   <div style="text-align:right;">制作费：<span style="color:red" >￥{{order.makeMoney}}</span></div>
      <div style="text-align:right;">膏方药品合计：<span style="color:red" >￥{{order.SplitPrescription.PASTE_PRESCRIPTION.presscriptionMoney}}</span></div>
    </el-tab-pane>
  </el-tabs>
    








    </div>

<div style="text-align:right; margin-top:20px;    padding-top: 10px;border-top: 1px #e5e5e5 solid;">
  <div v-if="order.preDrugType == 'PASTE_PRESCRIPTION'">制作费：<span style="color:red">￥{{order.makeMoney}}</span></div>
<div v-if="order.preDrugType == 'CHINESE_MEDICINE'">代煎费：<span style="color:red">￥{{order.replaceDecoctingMoney}}</span></div>
<div>治疗服务费：<span style="color:red">￥{{order.serviceMoney}}</span></div>
<div>药品总价：<span style="color:red">￥{{order.presscriptionMoney}}</span></div>
<div>合计：<span style="color:red">￥{{order.orderMoney}}</span></div>
				<el-button type="primary" size="mini" @click="doSend()">发 货</el-button>
</div>
        </div>
      </el-tab-pane>





















    <el-tab-pane   label="未发货"  name="send_detail"   v-if="type =='detail'">
      










  <el-tabs v-model="wait_drugType" >
    <el-tab-pane  label="中药" name="CHINESE" v-if="waitCHINESE_preDrugList.length>0">

<el-table border
    :data="waitCHINESE_preDrugList"
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
      <div style="text-align:right;">代煎费：<span style="color:red" >￥{{order.prescription.isReplaceDecocting===1?order.prescription.replaceDecoctingMoney:0}}</span></div>
          <div style="text-align:right;">中药药品合计：<span style="color:red" >￥{{order.SplitPrescription.CHINESE_MEDICINE.presscriptionMoney}}</span></div>


    </el-tab-pane>
    <el-tab-pane  label="西药" name="WESTERN" v-if="waitWESTERN_preDrugList.length>0">


<el-table border
    :data="waitWESTERN_preDrugList"
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
    <div style="text-align:right;">西药药品合计：<span style="color:red" >￥{{order.SplitPrescription.WESTERN_MEDICINE.presscriptionMoney}}</span></div>

   </el-tab-pane>
    <el-tab-pane  label="膏方" name="PASTE_PRESCRIPTION" v-if="waitPASTE_preDrugList.length>0">
<el-table border
    :data="waitPASTE_preDrugList"
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

   <div style="text-align:right;">制作费：<span style="color:red" >￥{{order.makeMoney}}</span></div>
      <div style="text-align:right;">膏方药品合计：<span style="color:red" >￥{{order.SplitPrescription.PASTE_PRESCRIPTION.presscriptionMoney}}</span></div>
    </el-tab-pane>
  </el-tabs>
    














      </el-tab-pane>

















<el-tab-pane v-for="(item,index) in expressPackageList"  :label="item. expressName"  :name="item.expressDetailId" >
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
包裹状态：{{handleShipStatus(item.shipStatus)}} 物流单号：{{ExpressDetailModel.waybillNumber}} 物流公司：{{ExpressDetailModel.logistics}}
 <span style="color: #409EFF;cursor: pointer;" @click="showShipInfo({waybillNumber:ExpressDetailModel.waybillNumber,logistics:ExpressDetailModel.logistics})">物流跟踪</span>
 <span v-if="item.shipStatus =='ORDER_WAIT_RECVGOODS'" style="color: #409EFF;    cursor: pointer;" @click="recvGood(item)">确认收货</span>
</div>

</div>
    </el-header>
    <el-main style="padding:10px;">
 <span style="color: #409EFF;    cursor: pointer;margin-left:10px;" @click="recallGood(item)">撤回包裹</span>
<div style="margin:0 10px;">
  药品总价：￥{{ExpressDetailModel.drugPrice}}
</div>
<div style="margin:0 10px;">
  包裹备注：{{item.remarks}}
</div>
<div style="margin:0 10px;">
  包裹发货时间：{{ExpressDetailModel.deliveryTime}}
</div>




















































      

  <el-tabs v-model="send_drugType" >
    <el-tab-pane  label="中药" name="CHINESE" v-if="send_CHINESE_preDrugList.length>0">

<el-table border
    :data="send_CHINESE_preDrugList"
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
      <!-- <div style="text-align:right;">代煎费：<span style="color:red" >￥{{order.prescription.isReplaceDecocting===1?order.prescription.replaceDecoctingMoney:0}}</span></div> -->
          <div style="text-align:right;">中药药品合计：<span style="color:red" >￥{{SplitPrescription.CHINESE_MEDICINE.presscriptionMoney}}</span></div>


    </el-tab-pane>
    <el-tab-pane  label="西药" name="WESTERN" v-if="send_WESTERN_preDrugList.length>0">


<el-table border
    :data="send_WESTERN_preDrugList"
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
      prop="createDate"
      label="提交时间">
   </el-table-column>
   </el-table>
    <div style="text-align:right;">西药药品合计：<span style="color:red" >￥{{SplitPrescription.WESTERN_MEDICINE.presscriptionMoney}}</span></div>

   </el-tab-pane>
    <el-tab-pane  label="膏方" name="PASTE_PRESCRIPTION" v-if="send_PASTE_preDrugList.length>0">
<el-table border
    :data="send_PASTE_preDrugList"
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

   <!-- <div style="text-align:right;">制作费：<span style="color:red" >￥{{order.makeMoney}}</span></div> -->
      <div style="text-align:right;">膏方药品合计：<span style="color:red" >￥{{SplitPrescription.PASTE_PRESCRIPTION.presscriptionMoney}}</span></div>
    </el-tab-pane>
  </el-tabs>

    </el-main>
  </el-container>




</el-tab-pane>

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

@Component({
  props: {},
  components: {}
})
export default class AddGoods extends Vue {
  @Prop({ required: false })
  order: any;
  @Prop({ required: false })
  type: string;
  @Prop({ required: false })
  shipList;
  @Prop({ required: false })
  expressPackageList = [];

  @Prop({ required: false })
  provinceList = [];

  @Prop({ required: false })
  waitCHINESE_preDrugList = [];
  @Prop({ required: false })
  waitPASTE_preDrugList = [];
  @Prop({ required: false })
  waitWESTERN_preDrugList = [];

  wait_drugType = "CHINESE";

  ExpressDrugDetailSumQuantityList = [];

  CHINESE_preDrugList = [];
  PASTE_preDrugList = [];
  WESTERN_preDrugList = [];

  send_CHINESE_preDrugList = [];
  send_PASTE_preDrugList = [];
  send_WESTERN_preDrugList = [];

  all_drugType = "CHINESE";

  drugType = "CHINESE";

  loading = false;
  send_obj = {
    splitFlag: "0"
  };
  send_active = "send_goods";
  addressObj = {};

  cityList = [];
  countryList = [];

  doSend() {
    let data = {
      presId: this.order.presId,
      waybillNumber: this.send_obj["waybillNumber"],
      logistics: this.send_obj["logistics"],
      splitFlag: this.send_obj.splitFlag,
      remarks: this.send_obj["remarks"]
    };

    if (this.send_obj.splitFlag == "1") {
      if (
        this.CHINESE_selection.length == 0 &&
        this.WESTERN_selection.length == 0 &&
        this.PASTE_selection.length == 0
      ) {
        this.$message.error("请选择需要发货的药品");
        return;
      }

      if (this.CHINESE_selection.length != 0) {
        if (this.CHINESE_preDrugList.length != this.CHINESE_selection.length) {
          this.$message.error("中药不可以分开发货");
          return;
        } else {
          Object.assign(data, { chineseExpressFlag: "1" });
        }
      }

      if (this.PASTE_selection.length != 0) {
        if (this.PASTE_preDrugList.length != this.PASTE_selection.length) {
          this.$message.error("膏方不可以分开发货");
          return;
        } else {
          Object.assign(data, { pasteExpressFlag: "1" });
        }
      }

      let PDrugQuantityListStr = [];

      for (let i = 0; i < this.WESTERN_selection.length; i++) {
        for (let j = 0; j < this.WESTERN_preDrugList.length; j++) {
          if (
            this.WESTERN_selection[i] ==
              this.WESTERN_preDrugList[j].prescriptionDrugId &&
            !this.WESTERN_preDrugList[j].number &&
            typeof !parseFloat(this.WESTERN_preDrugList[j].number)
          ) {
            this.$alert("请输入正确的数量");
            return;
          }

          if (
            this.WESTERN_preDrugList[j].number >
            this.WESTERN_preDrugList[j].surplusSend
          ) {
            this.$alert("发货数量超过剩余数量");
            return;
          }
          console.log(this.WESTERN_preDrugList[j]);
          if (
            this.WESTERN_selection[i] ==
            this.WESTERN_preDrugList[j].prescriptionDrugId
          ) {
            PDrugQuantityListStr.push(
              parseFloat(this.WESTERN_preDrugList[j].number)
            );
            break;
          }
        }
      }

      Object.assign(data, {
        PDrugIdListStr: this.WESTERN_selection.join(","),
        PDrugQuantityListStr: PDrugQuantityListStr.join(","),
        provinceid: this.addressObj["provinceId"],
        cityid: this.addressObj["cityid"],
        countryid: this.addressObj["countryId"],
        consigneeAddress: this.addressObj["address"],
        consigneeName: this.addressObj["contactName"],
        consigneePhone: this.addressObj["contactMobile"]
      });
    }

    //验证
    if ((this.send_obj["logistics"] || "") == "") {
      this.$alert("请填写物流公司");
      return;
    }
    if ((this.send_obj["waybillNumber"] || "") == "") {
      this.$alert("请填写物流单号");
      return;
    }
    this.$confirm("确认保存该发货信息?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi.doSend(data).then(res => {
          if (res["retCode"]) {
            this.$message("发货成功");
            if (this.send_obj.splitFlag == "0") {
              this.$emit("close");
            } else {
              this.$emit("getExpressPackage", this.order.presId, true);
            }
            this.$emit("doUpdate");
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
    this.addressObj["countryId"] = "";
    ApiOrder.queryCountryList(this.addressObj["cityId"]).then(res => {
      this.countryList = res.data.region;
    });
  }
  queryCityList() {
    this.addressObj["cityId"] = "";
    ApiOrder.queryCityList(this.addressObj["provinceId"]).then(res => {
      this.cityList = res.data.region;
    });
  }
  SendActive_type() {
    return this.type;
  }

  selection = [];
  CHINESE_selection = [];
  WESTERN_selection = [];
  PASTE_selection = [];
  handleSelectionChange(e) {
    let list = e.map(item => {
      return item.prescriptionDrugId;
    });
    switch (this.drugType) {
      case "CHINESE":
        this.CHINESE_selection = list;
        break;

      case "WESTERN":
        this.WESTERN_selection = list;
        break;

      case "PASTE_PRESCRIPTION":
        this.PASTE_selection = list;
        break;
    }

    // this.selection = e.map(item => {
    //   return item.prescriptionDrugId;
    // });
  }

  ExpressDetailModel: any = {};
  ExpressDrugDetailList = [];

  setaddress() {
    this.addressObj = {
      contactName: this.order.consigneeName,
      contactMobile: this.order.consigneePhone,
      address: this.order.consigneeAddress,
      provinceId: this.order.provinceid
    };
    this.queryCityList();
    this.addressObj["cityId"] = this.order.cityid;
    this.queryCountryList();
    this.addressObj["countryId"] = this.order.areaid;
  }

  //撤回包裹
  recallGood(item) {
    this.$confirm("确认撤回该包裹?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .recallGood({
            expressDetailId: item.expressDetailId
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("撤回成功");
              this.$emit("getExpressPackage", this.order.presId);
              this.$emit("doUpdate");
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

  splitFlagChange(val) {
    if (val == "0") {
    } else {
      this.setaddress();
    }
  }
  showShipInfo(obj) {
    this.$emit("showShipInfo", obj);
  }
  SplitPrescription = [];
  getExpressPackageDrug(expressDetailId) {
    // this.send_drugType = this.handleValue(
    //       this.send_CHINESE_preDrugList,
    //       this.send_WESTERN_preDrugList,
    //       this.send_PASTE_preDrugList
    //     );
    if (
      expressDetailId.name == "send_goods" ||
      expressDetailId.name == "goods_detail" ||
      expressDetailId.name == "send_detail"
    ) {
      return;
    }
    indexApi
      .getExpressPackageDrug({
        expressDetailId: expressDetailId.name
      })
      .then(res => {
        if (res["retCode"]) {
          this.ExpressDetailModel = res.data.ExpressDetailModel;
          this.ExpressDrugDetailList = res.data.ExpressDrugDetailList;
          this.SplitPrescription = res.data.SplitPrescription;

          this.send_CHINESE_preDrugList = res.data.ExpressDrugDetailList.filter(
            item => {
              return item.preDrugType == "CHINESE_MEDICINE";
            }
          );

          this.send_PASTE_preDrugList = res.data.ExpressDrugDetailList.filter(
            item => {
              return item.preDrugType == "PASTE_PRESCRIPTION";
            }
          );

          this.send_WESTERN_preDrugList = res.data.ExpressDrugDetailList.filter(
            item => {
              return item.preDrugType == "WESTERN_MEDICINE";
            }
          );

          this.send_drugType = this.handleValue(
            this.send_CHINESE_preDrugList,
            this.send_WESTERN_preDrugList,
            this.send_PASTE_preDrugList
          );
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

  handleShipStatus(status) {
    switch (status) {
      case "ORDER_WAIT_RECVGOODS":
        return "等待收货";
      case "ORDER_END_GOODS":
        return "已签收";
      default:
        return status;
    }
  }
  /**
   * 确认收货
   */
  recvGood(item) {
    // expressDetailId
    // console.log(item)
    this.$confirm("确认收货?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        let data = {
          expressDetailId: item.expressDetailId,
          waybill_number: item["waybillNumber"],
          ship_status: "ORDER_END_GOODS"
        };

        indexApi.dorecvGood(data).then(res => {
          if (res["retCode"]) {
            this.$message("已确认收货");
            this.$emit("getExpressPackage", this.order.presId);
            this.$emit("doUpdate");

            // this.$emit("getOrderList");
            // this.$emit("getOrderDetail", this.order.presId);
            // this.$emit("queryShipList");
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
  send_drugType = "";

  handleValue(CHINESE_preDrugList, WESTERN_preDrugList, PASTE_preDrugList) {
    if (CHINESE_preDrugList.length > 0) {
      return "CHINESE";
    }

    if (WESTERN_preDrugList.length > 0) {
      return "WESTERN";
    }

    if (PASTE_preDrugList.length > 0) {
      return "PASTE_PRESCRIPTION";
    }

    return "";
  }

  mounted() {}
}
</script>

<style  scoped>
</style>