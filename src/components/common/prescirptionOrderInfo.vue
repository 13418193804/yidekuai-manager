<template>
    <div v-bouncing="loading" class="detail-container">

<div style="height:20px;">
  <el-button size="mini" @click="back()">返回</el-button>
</div>
  
<div class="flex  flex-align-center flex-pack-center">


<div class="detail_title" :class="detailModel == 'prescirption'  ?'detail_title_active':''" @click="detailModel = 'prescirption'">
处方详情
</div>
<div class="detail_title" v-if="resource == 'order'" :class="detailModel == 'order'  ?'detail_title_active':''" @click="detailModel = 'order'">
订单详情
</div>

</div>




    <el-card shadow="never" style="margin-top: 15px" >
      <div class="operate-container">
                <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>

<span v-if="detailModel == 'prescirption'">处方状态：{{ handleStatus(prescription.presState)}}</span>
<span v-if="detailModel == 'order'">订单状态：{{ handleOrderStatus(order.orderStatue)}}</span>
<div class="operate-button-container">
  <el-button  size="mini" @click="previewModel=true"  v-if="detailModel == 'prescirption'&&prescription.preDrugType && (prescription.preDrugType.indexOf('CHINESE_MEDICINE') !=-1 || prescription.preDrugType.indexOf('WESTERN_MEDICINE') !=-1 || prescription.preDrugType.indexOf('PASTE_PRESCRIPTION') !=-1  || prescription.preDrugType.indexOf('INSTRUMENTS') !=-1  )">预览</el-button>
</div>
</div>
     
     <div style="margin-top: 20px">
        <!-- <svg-icon icon-class="marker" style="color: #606266"></svg-icon> -->
        <span class="font-small" style="color:red">
              {{ handleprescriptionType(prescription.prescriptionType)  }}
        </span>
      </div>

   <div class="table-layout">
   

  <el-row>
          <el-col :span="4" class="form-border form-left-bg font-small">治疗服务费</el-col>
          <el-col class="form-border font-small" :span="4"><span style="color:red">￥{{prescription.serviceMoney}}</span></el-col>
           <el-col :span="4" class="form-border form-left-bg font-small">药品总价</el-col>
          <el-col class="form-border font-small" :span="4"><span style="color:red">￥{{prescription.presscriptionMoney?prescription.presscriptionMoney:0}}</span></el-col>
           <el-col :span="4" class="form-border form-left-bg font-small">合计</el-col>
          <el-col class="form-border font-small" :span="4"><span style="color:red">￥{{prescription.orderMoney?prescription.orderMoney:prescription.serviceMoney}}</span></el-col>
      
      
        </el-row>



</div>



     <div style="margin-top: 20px">
        <!-- <svg-icon icon-class="marker" style="color: #606266"></svg-icon> -->
        <span class="font-small">基本信息</span>
        <span class="font-small" style="float:right" v-if=" detailModel == 'order'">订单编号：{{order.orderid}}</span>
      </div>
      

 <div class="form-container-border">

        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">处方类型</el-col>
          <el-col class="form-border font-small" :span="18">
              <span v-for="n in prescription.preDrugType ?prescription.preDrugType.split(','):'　'" style="margin-right: 10px;">{{handlepreDrugType(n)}}</span>
            </el-col>
    
        </el-row>

        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">开方时间</el-col>
          <el-col class="form-border font-small" :span="9">
            {{prescription.createDate}}
            </el-col>
          <el-col class="form-border font-small" :span="9">
           开方医生：{{prescription['docterName']}}
            </el-col>
        </el-row>
    <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">医生给患者备注</el-col>
          <el-col class="form-border font-small" :span="18">{{prescription.patientRemake||'　'}}</el-col>
        </el-row>
          <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">医生给转方备注</el-col>
          <el-col class="form-border font-small" :span="18">{{prescription.remark||'　'}}</el-col>
        </el-row>




     <el-row v-if=" prescription.presState !=  'NOT_TRANSLATED_PRESCRIPTION'">
          <el-col :span="6" class="form-border form-left-bg font-small">转方时间</el-col>
          <el-col class="form-border font-small" :span="9">
            {{prescription.transDate}}
            </el-col>
          <el-col class="form-border font-small" :span="9">
            转方医生：{{prescription.transDocName}}
            </el-col>

        </el-row>
    <el-row v-if=" prescription.presState !=  'NOT_TRANSLATED_PRESCRIPTION'">
          <el-col :span="6" class="form-border form-left-bg font-small">转方备注</el-col>
          <el-col class="form-border font-small" :span="18">{{prescription.transRemark||'　'}}</el-col>
        </el-row>
        

        
     <el-row v-if=" prescription.presState ==  'REJECT_TRANSLATED_PRESCRIPTION'">
          <el-col :span="6" class="form-border form-left-bg font-small">转方退回时间</el-col>
          <el-col class="form-border font-small" :span="9">
            {{prescription.rejectTransTime}}
            </el-col>
          <el-col class="form-border font-small" :span="9">
            操作人：{{prescription.rejectTranName}}
            </el-col>

        </el-row>
    <el-row v-if=" prescription.presState ==  'REJECT_TRANSLATED_PRESCRIPTION'">
          <el-col :span="6" class="form-border form-left-bg font-small">转方退回原因</el-col>
          <el-col class="form-border font-small" :span="18">{{prescription.returnReason||'　'}}</el-col>
        </el-row>
        



     <el-row v-if=" prescription.presState !=  'NOT_TRANSLATED_PRESCRIPTION' && prescription.presState !=  'REJECT_AUDIT_PRESCRIPTION'  && prescription.presState != 'REJECT_TRANSLATED_PRESCRIPTION'&& prescription.presState !='ALREADY_TRANSLATED_PRESCRIPTION'">
          <el-col :span="6" class="form-border form-left-bg font-small">审方时间</el-col>
          <el-col class="form-border font-small" :span="9">
            {{prescription.auditingDate}}
            </el-col>
          <el-col class="form-border font-small" :span="9">
            审方医生：{{prescription.auditingName}}
            </el-col>
        </el-row>
     <el-row v-if="detailModel === 'order'">
          <el-col :span="6" class="form-border form-left-bg font-small" :style="pagetype ==='reminder'?'line-height: 2.1;':''">付款状态</el-col>
          <el-col class="form-border font-small" :span="9" :style="pagetype ==='reminder'?'line-height: 2.1;':''">
<span  v-if="pagetype ==='reminder' && order.payStatus =='PAY_WAIT' "> 
   <el-select v-model="payModeEnum" size="mini" placeholder="请选择">
    <el-option
      label="未支付"
      value="PAY_WAIT">
    </el-option>
        <el-option
      label="已支付"
      value="PAY_SUCCESS">
    </el-option>
         <el-option
      label="货到付款"
      value="PAY_ON_DELIVERY">
    </el-option>
  </el-select>
<el-button size="mini" type="primary" @click="doChangePayModeEnum()">保存</el-button>
</span>
  <span v-else>{{handlePayStatus(order.payStatus).title}}</span>


            </el-col>
          <el-col class="form-border font-small" :span="9" :style="pagetype ==='reminder'?'line-height: 2.1;':''">
付款时间：{{order.payTime}}
            </el-col>
        </el-row>




    <el-row v-if=" order.presState ==  'GIVEUP_PRESCRIPTION'&& detailModel == 'order'">
          <el-col :span="6" class="form-border form-left-bg font-small">弃单备注</el-col>
          <el-col class="form-border font-small" :span="18">{{order.giveupReason||'　'}}</el-col>
        </el-row>







     <el-row v-if="prescription.presState == 'REJECT_AUDIT_PRESCRIPTION'">
          <el-col :span="6" class="form-border form-left-bg font-small">审方退回时间</el-col>
          <el-col class="form-border font-small" :span="9">
            {{prescription.rejectAuditTime||'　'}}
            </el-col>
          <el-col class="form-border font-small" :span="9">
            操作人：{{prescription.rejectAuditName||'　'}}
            </el-col>
        </el-row>
    <el-row v-if="prescription.presState == 'REJECT_AUDIT_PRESCRIPTION'">
          <el-col :span="6" class="form-border form-left-bg font-small">审方退回原因</el-col>
          <el-col class="form-border font-small" :span="18">{{prescription.rejectAuditReason||'　'}}</el-col>
        </el-row>


  <el-row v-if="prescription.preDrugType&& prescription.preDrugType.indexOf('CHINESE_MEDICINE')!==-1">
          <el-col :span="6" class="form-border form-left-bg font-small">中药用法用量</el-col>
          <el-col class="form-border font-small" :span="18">共{{prescription.allDosage}}剂，每日{{prescription.everydayDosage}}剂，1剂分{{prescription.everytimeDosage}}服用</el-col>
        </el-row>

  <el-row v-if="prescription.preDrugType&& prescription.preDrugType.indexOf('PASTE_PRESCRIPTION')!==-1">
          <el-col :span="6" class="form-border form-left-bg font-small">膏方用法用量</el-col>
          <el-col class="form-border font-small" :span="18">每日{{prescription.everydayTimes}}次，每次{{prescription.everytimesG}}克，约服{{prescription.howManyDay}}天</el-col>
        </el-row>


  <el-row v-if="prescription.preDrugType&& prescription.preDrugType.indexOf('PASTE_PRESCRIPTION')!==-1">
          <el-col :span="6" class="form-border form-left-bg font-small">膏方辅料</el-col>
          <!-- <el-col class="form-border font-small" :span="18">{{list2string(prescription.otherAccessories,prescription.aspartame,prescription.sugarType)}}</el-col> -->
        </el-row>
        
          <el-row v-if="prescription.prescriptionType != 'ONLINE'">
          <el-col :span="6" class="form-border form-left-bg font-small">处方图片</el-col>
          <el-col class="form-border font-small" :span="18">
            <el-button type="text" style="    padding: 0;" @click="chcangeCorpperModel()">查看详情</el-button>
       
          </el-col>
        </el-row>

</div>


<el-dialog 
  title="处方图片"
  :visible.sync="corpperModel"
  width="70%" >
    <div style="width:100%;text-align:center">

<corpperlabel ref="cropper" @getInfo="getInfo" :preImageList="preImageList" :presId="presId" :haveSave="true" :haveDetele="true" :temporary="true"
:notHaveAdd="prescription.presState == 'NOT_TRANSLATED_PRESCRIPTION' || prescription.presState == 'REJECT_AUDIT_PRESCRIPTION'|| prescription.presState == 'FAIL_TRANSLATED_PRESCRIPTION' || prescription.presState == 'GIVEUP_PRESCRIPTION'"
></corpperlabel>
</div>

</el-dialog>



     <div style="margin-top: 20px">
        <!-- <svg-icon icon-class="marker" style="color: #606266"></svg-icon> -->
        <span class="font-small">{{detailInfo[1].title}}</span>
      </div>

   <div class="table-layout">
        <el-row>
          <el-col v-for="(item,index) in detailInfo[1].children" :span="item.key =='diagnose'?8:4" class="table-cell-title"  > {{item.name}}</el-col>
        </el-row>
             <el-row>
          <el-col  v-for="(item,index) in detailInfo[1].children"  :span="item.key =='diagnose'?8:4" class="table-cell" >{{prescription[item.key] }}</el-col>
        </el-row>
</div>


     <div style="margin-top: 20px">
        <!-- <svg-icon icon-class="marker" style="color: #606266"></svg-icon> -->
        <span class="font-small">{{detailInfo[0].title}}</span>
      </div>

   <div class="table-layout">
        <el-row>
          <el-col v-for="(item,index) in detailInfo[0].children" :span="item.key =='diagnose'?8:4" class="table-cell-title"  > {{item.name}}</el-col>
        </el-row>
             <el-row>
          <el-col  v-for="(item,index) in detailInfo[0].children"  :span="item.key =='diagnose'?8:4" class="table-cell" >{{prescription[item.key] }}</el-col>
        </el-row>
</div>


<div　v-if=" detailModel == 'order'">
     <div style="margin-top: 20px">
        <!-- <svg-icon icon-class="marker" style="color: #606266"></svg-icon> -->
        <span class="font-small">收货信息</span>
      </div>

 <div class="table-layout">
        <el-row>
          <el-col  :span="5" class="table-cell-title"  >收货人</el-col>
          <el-col  :span="6" class="table-cell-title"  >收货电话</el-col>
          <el-col  :span="13" class="table-cell-title"  >收货地址</el-col>
        </el-row>
             <el-row>
          <el-col  :span="5" class="table-cell" >{{order.consigneeName||'　'}}</el-col>
          <el-col  :span="6" class="table-cell" >{{order.consigneePhone||'　'}}</el-col>
          <el-col  :span="13" class="table-cell" >{{order.province}}　{{order.city}}　{{order.area}} 　{{order.consigneeAddress}}</el-col>
       
        </el-row>

      </div>



<div　v-if=" detailModel == 'order' && order.invoiceRecords && order.invoiceRecords.length>0">
     <div style="margin-top: 20px">
        <!-- <svg-icon icon-class="marker" style="color: #606266"></svg-icon> -->
        <span class="font-small">发票信息</span>
      </div>

 <div class="table-layout">
        <el-row>
          <el-col  :span="5" class="table-cell-title"  >抬头名称</el-col>
          <el-col  :span="6" class="table-cell-title"  >抬头类型</el-col>
          <el-col  :span="13" class="table-cell-title"  >申请开票时间</el-col>
        </el-row>

             <el-row>
          <el-col  :span="5" class="table-cell" >{{order.invoiceRecords[0].invoiceName}}</el-col>
          <el-col  :span="6" class="table-cell" >{{order.invoiceRecords[0].titleType =='PERSONAL'?'个人':'公司'}}</el-col>
          <el-col  :span="13" class="table-cell">{{order.invoiceRecords[0].createTime}}</el-col>
        </el-row>


       <el-row v-if="order.invoiceRecords[0].shipStatus !== 'UNSHIPPED_DELIVERY'">
          <el-col  :span="5" class="table-cell-title"  >物流公司</el-col>
          <el-col  :span="6" class="table-cell-title"  >物流单号</el-col>
          <el-col  :span="13" class="table-cell-title" ><span style="visibility: hidden;">操作</span></el-col>
        </el-row>
      <el-row v-if="order.invoiceRecords[0].shipStatus !== 'UNSHIPPED_DELIVERY'">
          <el-col  :span="5" class="table-cell" >{{order.invoiceRecords[0].logistics}}</el-col>
          <el-col  :span="6" class="table-cell" >{{order.invoiceRecords[0].waybillNumber}}</el-col>
          <el-col  :span="13" class="table-cell" >
            <el-button type="text" style="padding:0;" @click="showShipInfo({
          waybillNumber:order.invoiceRecords[0].waybillNumber,
          logistics:order.invoiceRecords[0].logistics,
          consigneePhone:order.invoiceRecords[0].consigneePhone
        })">物流追踪</el-button>
        		<el-button type="text"  @click="recv_invoice(order)" v-if=" order.invoiceRecords[0].shipStatus == 'ALREAD_SHIPPED' ">确认收货</el-button>



          </el-col>
        </el-row>


      </div>
      </div>
      </div>


<!-- {{handleShipStatus(order.invoiceRecords[0].shipStatus)}} -->




 <md-card  >
  
    <md-card-media>
      <!-- swiper -->
      <swiper class="swiper-no-swiping" :options="swiperOption" style="height: auto">



        <swiper-slide v-if="CHINESE_preDrugList.length>0">
<div style="margin-bottom:40px;">
      <div style="margin-top: 20px">
        <span class="font-small">中药</span>
      </div>
 <div class="form-container-border">
    <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">代煎费</el-col>
          <el-col class="form-border font-small" :span="6"><span style="color:red">￥{{prescription.replaceDecoctingMoney}}</span></el-col>
          <el-col :span="6" class="form-border form-left-bg font-small" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">中药药品合计</el-col>
          <el-col class="form-border font-small" :span="6"><span style="color:red" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">￥{{SplitPrescription.CHINESE_MEDICINE?SplitPrescription.CHINESE_MEDICINE.presscriptionMoney:0}}</span></el-col>
        </el-row>
</div>

<el-table border
    :data="CHINESE_preDrugList"
    stripe
    style="width: 100%;margin-top: 20px;">


   <el-table-column show-overflow-tooltip
      label="药品" min-width="230">
<template slot-scope="scope">
<div>药品编码：{{scope.row.codeId}}</div>
<div>药材名称：{{scope.row.drugName}}</div>
<div>药材别名：{{scope.row.productName}}</div>
<div>类名：{{scope.row.typeName}}</div>
</template>
   </el-table-column>
   <el-table-column show-overflow-tooltip
       min-width="220">
<template slot-scope="scope">
<div>产地：{{scope.row.producingArea}}</div>
<div>供应商：{{scope.row.partnerName}}</div>
<div>提交时间：{{scope.row.createDate}}</div>
<div>使用说明：{{scope.row.instructions}}</div>
</template>
   </el-table-column>

   <el-table-column show-overflow-tooltip
      label="参数" min-width="180">
<template slot-scope="scope">
<div>单位：{{scope.row.packingUnit}}</div>
<div>单剂数量：{{scope.row.showQuantity}}</div>
<div>数量：{{scope.row.quantity}}</div>
<div>类型：{{scope.row.chineseType}} 煎煮方式：{{scope.row.decoctingType}}</div>
</template>
   </el-table-column>
   <el-table-column show-overflow-tooltip
      label="金额" min-width="140">
<template slot-scope="scope">
<div>药品价格：{{scope.row.price}}</div>
<div>药品合计：{{scope.row.shouldpay}}</div>
</template>
   </el-table-column>
</el-table>
</div>





        </swiper-slide>






        <swiper-slide v-if="WESTERN_preDrugList.length>0">




<div style="margin-bottom:40px;">

   <div style="margin-top: 20px">
        <span class="font-small">西药</span>
      </div>
   <div class="form-container-border">
    <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">西药药品合计</el-col>
          <el-col class="form-border font-small" :span="18"><span style="color:red" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">￥{{SplitPrescription.WESTERN_MEDICINE?SplitPrescription.WESTERN_MEDICINE.presscriptionMoney:0}}</span></el-col>
        </el-row>
</div>



<el-table border
    :data="WESTERN_preDrugList"
    stripe
    style="width: 100%;margin-top: 20px;">

  <el-table-column show-overflow-tooltip
      label="药品" min-width="230">
<template slot-scope="scope">
<div>药品编码：{{scope.row.codeId}}</div>
<div>通用名：{{scope.row.drugName}}</div>
<div>商品名：{{scope.row.productName}}</div>
<div>药品规格：{{scope.row.specification}}</div>
</template>
   </el-table-column>
   <el-table-column show-overflow-tooltip
       min-width="220">
<template slot-scope="scope">
<div>厂商：{{scope.row.manufacturer}}</div>
<div>供应商：{{scope.row.partnerName}}</div>
<div>提交时间：{{scope.row.createDate}}</div>
<div>使用说明：{{scope.row.instructions}}</div>
</template>
   </el-table-column>

  <el-table-column show-overflow-tooltip
      label="参数"  min-width="220">
<template slot-scope="scope">
<div>数量：{{scope.row.quantity}} 单位：{{scope.row.packingUnit}}</div>
<div>剂型：{{scope.row.dosageforms}}</div>
<div>用法：{{scope.row.usages}}  用量：{{scope.row.dosage}}</div>
<div>频次：{{scope.row.frequency}}</div>
</template>
   </el-table-column>
 <el-table-column show-overflow-tooltip
      label="金额" min-width="140">
<template slot-scope="scope">
<div>药品价格：{{scope.row.price}}</div>
<div>药品合计：{{scope.row.shouldpay}}</div>
</template>
   </el-table-column>



   </el-table>





</div>


        </swiper-slide>


        <swiper-slide v-if="PASTE_preDrugList.length>0">


<div style="margin-bottom:40px;">

   <div style="margin-top: 20px">
        <span class="font-small">膏方</span>
      </div>
 <div class="form-container-border">
    <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">制作费</el-col>
          <el-col class="form-border font-small" :span="6"><span style="color:red">￥{{prescription.makeMoney}}</span></el-col>
          <el-col :span="6" class="form-border form-left-bg font-small" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">中药药品合计</el-col>
          <el-col class="form-border font-small" :span="6"><span style="color:red" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">￥{{SplitPrescription.PASTE_PRESCRIPTION?SplitPrescription.PASTE_PRESCRIPTION.presscriptionMoney:0}}</span></el-col>
        </el-row>
</div>

<el-table border
    :data="PASTE_preDrugList"
    stripe
    style="width: 100%;margin-top: 20px;">

  
   <el-table-column show-overflow-tooltip
      label="药品" min-width="230">
<template slot-scope="scope">
<div>药品编码：{{scope.row.codeId}}</div>
<div>药材名称：{{scope.row.drugName}}</div>
<div>药材别名：{{scope.row.productName}}</div>
<div>类名：{{scope.row.typeName}}</div>
</template>
   </el-table-column>
   <el-table-column show-overflow-tooltip
       min-width="220">
<template slot-scope="scope">
<div>产地：{{scope.row.producingArea}}</div>
<div>供应商：{{scope.row.partnerName}}</div>
<div>提交时间：{{scope.row.createDate}}</div>
<div>使用说明：{{scope.row.instructions}}</div>
</template>
   </el-table-column>

   <el-table-column show-overflow-tooltip
      label="参数" min-width="180">
<template slot-scope="scope">
<div>单位：{{scope.row.packingUnit}}</div>
<div>单剂数量：{{scope.row.showQuantity}}</div>
<div>数量：{{scope.row.quantity}}</div>
<div>类型：{{scope.row.chineseType}} 煎煮方式：{{scope.row.decoctingType}}</div>
</template>
   </el-table-column>
   <el-table-column show-overflow-tooltip
      label="金额" min-width="140">
<template slot-scope="scope">
<div>药品价格：{{scope.row.price}}</div>
<div>药品合计：{{scope.row.shouldpay}}</div>
</template>
   </el-table-column>
</el-table>

</div>

        </swiper-slide>


        <swiper-slide v-if="INSTRUMENTS_preDrugList.length>0">


<div style="margin-bottom:40px;">

   <div style="margin-top: 20px">
        <span class="font-small">器械</span>
      </div>


<el-table border
    :data="INSTRUMENTS_preDrugList"
    stripe
    style="width: 100%;margin-top: 20px;">

     <el-table-column show-overflow-tooltip
      label="药品" min-width="230">
<template slot-scope="scope">
<div>药品编码：{{scope.row.codeId}}</div>
<div>药材名称：{{scope.row.drugName}}</div>
<div>药材别名：{{scope.row.productName}}</div>
<div>药品规格：{{scope.row.specification}}</div>
</template>
   </el-table-column>
 <el-table-column show-overflow-tooltip
       min-width="220">
<template slot-scope="scope">
<div>厂商：{{scope.row.manufacturer}}</div>
<div>供应商：{{scope.row.partnerName}}</div>
<div>提交时间：{{scope.row.createDate}}</div>
<div>使用说明：{{scope.row.instructions}}</div>
</template>
   </el-table-column>

      <el-table-column show-overflow-tooltip
      label="参数"  min-width="120">
<template slot-scope="scope">
<div>数量：{{scope.row.quantity}} </div>
<div>单位：{{scope.row.packingUnit}}</div>
</template>
   </el-table-column>

    <el-table-column show-overflow-tooltip
      label="金额" min-width="140">
<template slot-scope="scope">
<div>药品价格：{{scope.row.price}}</div>
<div>药品合计：{{scope.row.shouldpay}}</div>
</template>
   </el-table-column>


</el-table>
</div>

        </swiper-slide>


        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </md-card-media>
  </md-card>




<div v-if="ExpressDetailList &&  ExpressDetailList.length>0 && detailModel == 'order'">
      <div style="margin-top: 20px">
        <span class="font-small">物流信息</span>
      </div>
      <div v-for="item in ExpressDetailList">


<div class="form-container-border" >
    <el-row>
          <el-col :span="8" class="form-border form-left-bg font-small">
            {{OrderSplitFlag=='0'? '普通订单':''}}
            {{OrderSplitFlag=='1'? '拆分订单':''}}
            </el-col>
          <el-col class="form-border font-small" :span="8">物流公司：{{item.logistics}}</el-col>
          <el-col class="form-border font-small" :span="8">物流单号：{{item.waybillNumber}}</el-col>
        </el-row>
  <el-row>
          <el-col :span="8" class="form-border form-left-bg font-small" >{{item.createDate}}</el-col>
          <el-col class="form-border font-small" :span="8">备注：{{item.remarks}}</el-col>
          <el-col class="form-border font-small" :span="8"> 
            <el-button type="text" style="padding:0;" @click="recallGood(item.expressDetailId)" v-if="item.shipStatus !=='ORDER_END_GOODS'">撤回包裹</el-button>
            <el-button type="text" style="padding:0;" @click="showShipInfo({
          waybillNumber:item.waybillNumber,
          logistics:item.logistics,
          consigneePhone:item.consigneePhone
        })">物流追踪</el-button>
            <el-button type="text" style="padding:0;"  @click="recvGood(item.waybillNumber,item.expressDetailId)" v-if="item.shipStatus !=='ORDER_END_GOODS'">确认收货</el-button>
          </el-col>
        </el-row>
</div>



 <md-card  v-if="prescription.presState != 'NOT_TRANSLATED_PRESCRIPTION'">
  
    <md-card-media>
      <!-- swiper -->
      <swiper :options="swiperOption" style="height: auto">



        <swiper-slide v-if="item.CHINESE_preDrugList && item.CHINESE_preDrugList.length>0">
<div style="margin-bottom:40px;">
      <div style="margin-top: 20px">
        <span class="font-small">中药</span>
      </div>
 <!-- <div class="form-container-border">
    <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">代煎费</el-col>
          <el-col class="form-border font-small" :span="6"><span style="color:red">￥{{prescription.replaceDecoctingMoney}}</span></el-col>
          <el-col :span="6" class="form-border form-left-bg font-small" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">中药药品合计</el-col>
          <el-col class="form-border font-small" :span="6"><span style="color:red" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">￥{{SplitPrescription.CHINESE_MEDICINE.presscriptionMoney}}</span></el-col>
        </el-row>
</div> -->

<el-table border
    :data="item.CHINESE_preDrugList"
    stripe
    style="width: 100%;margin-top: 20px;">


   <el-table-column show-overflow-tooltip
      label="药品" min-width="230">
<template slot-scope="scope">
<div>药品编码：{{scope.row.codeId}}</div>
<div>药材名称：{{scope.row.drugName}}</div>
<div>药材别名：{{scope.row.productName}}</div>
<div>类名：{{scope.row.typeName}}</div>
</template>
   </el-table-column>
   <el-table-column show-overflow-tooltip
       min-width="220">
<template slot-scope="scope">
<div>产地：{{scope.row.producingArea}}</div>
<div>供应商：{{scope.row.partnerName}}</div>
<div>提交时间：{{scope.row.createDate}}</div>
<div>使用说明：{{scope.row.instructions}}</div>
</template>
   </el-table-column>

   <el-table-column show-overflow-tooltip
      label="参数" min-width="180">
<template slot-scope="scope">
<div>单位：{{scope.row.packingUnit}}</div>
<div>单剂数量：{{scope.row.showQuantity}}</div>
<div>数量：{{scope.row.quantity}}</div>
<div>类型：{{scope.row.chineseType}} 煎煮方式：{{scope.row.decoctingType}}</div>
</template>
   </el-table-column>
   <el-table-column show-overflow-tooltip
      label="金额" min-width="140">
<template slot-scope="scope">
<div>药品价格：{{scope.row.price}}</div>
<div>药品合计：{{scope.row.shouldpay}}</div>
</template>
   </el-table-column>
</el-table>
</div>





        </swiper-slide>






        <swiper-slide v-if="item.WESTERN_preDrugList && WESTERN_preDrugList.length>0">




<div style="margin-bottom:40px;">

   <div style="margin-top: 20px">
        <span class="font-small">西药</span>
      </div>
   <!-- <div class="form-container-border">
    <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">西药药品合计</el-col>
          <el-col class="form-border font-small" :span="18"><span style="color:red" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">￥{{SplitPrescription.WESTERN_MEDICINE.presscriptionMoney}}</span></el-col>
        </el-row>
</div> -->

<el-table border
    :data="item.WESTERN_preDrugList"
    stripe
    style="width: 100%;margin-top: 20px;">

  <el-table-column show-overflow-tooltip
      label="药品" min-width="230">
<template slot-scope="scope">
<div>药品编码：{{scope.row.codeId}}</div>
<div>通用名：{{scope.row.drugName}}</div>
<div>商品名：{{scope.row.productName}}</div>
<div>药品规格：{{scope.row.specification}}</div>
</template>
   </el-table-column>
   <el-table-column show-overflow-tooltip
       min-width="220">
<template slot-scope="scope">
<div>厂商：{{scope.row.manufacturer}}</div>
<div>供应商：{{scope.row.partnerName}}</div>
<div>提交时间：{{scope.row.createDate}}</div>
<div>使用说明：{{scope.row.instructions}}</div>
</template>
   </el-table-column>

  <el-table-column show-overflow-tooltip
      label="参数"  min-width="220">
<template slot-scope="scope">
<div>数量：{{scope.row.quantity}} 单位：{{scope.row.packingUnit}}</div>
<div>剂型：{{scope.row.dosageforms}}</div>
<div>用法：{{scope.row.usages}}  用量：{{scope.row.dosage}}</div>
<div>频次：{{scope.row.frequency}}</div>
</template>
   </el-table-column>
 <el-table-column show-overflow-tooltip
      label="金额" min-width="140">
<template slot-scope="scope">

<div>药品价格：{{scope.row.price}}</div>
<div>药品合计：{{scope.row.shouldpay}}</div>
<div>发货数量：{{scope.row.expressQuantity}}</div>
<div>发货合计：{{scope.row.expressPrice}}</div>
</template>
   </el-table-column>



   </el-table>





</div>


        </swiper-slide>


        <swiper-slide v-if="item.PASTE_preDrugList && PASTE_preDrugList.length>0">


<div style="margin-bottom:40px;">

   <div style="margin-top: 20px">
        <span class="font-small">膏方</span>
      </div>
 <!-- <div class="form-container-border">
    <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">制作费</el-col>
          <el-col class="form-border font-small" :span="6"><span style="color:red">￥{{prescription.makeMoney}}</span></el-col>
          <el-col :span="6" class="form-border form-left-bg font-small" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">中药药品合计</el-col>
          <el-col class="form-border font-small" :span="6"><span style="color:red" v-if="prescription.presState!='REJECT_AUDIT_PRESCRIPTION'">￥{{SplitPrescription.PASTE_PRESCRIPTION.presscriptionMoney}}</span></el-col>
        </el-row>
</div> -->

<el-table border
    :data="item.PASTE_preDrugList"
    stripe
    style="width: 100%;margin-top: 20px;">

  
   <el-table-column show-overflow-tooltip
      label="药品" min-width="230">
<template slot-scope="scope">
<div>药品编码：{{scope.row.codeId}}</div>
<div>药材名称：{{scope.row.drugName}}</div>
<div>药材别名：{{scope.row.productName}}</div>
<div>类名：{{scope.row.typeName}}</div>
</template>
   </el-table-column>
   <el-table-column show-overflow-tooltip
       min-width="220">
<template slot-scope="scope">
<div>产地：{{scope.row.producingArea}}</div>
<div>供应商：{{scope.row.partnerName}}</div>
<div>提交时间：{{scope.row.createDate}}</div>
<div>使用说明：{{scope.row.instructions}}</div>
</template>
   </el-table-column>

   <el-table-column show-overflow-tooltip
      label="参数" min-width="180">
<template slot-scope="scope">
<div>单位：{{scope.row.packingUnit}}</div>
<div>单剂数量：{{scope.row.showQuantity}}</div>
<div>数量：{{scope.row.quantity}}</div>
<div>类型：{{scope.row.chineseType}} 煎煮方式：{{scope.row.decoctingType}}</div>
</template>
   </el-table-column>
   <el-table-column show-overflow-tooltip
      label="金额" min-width="140">
<template slot-scope="scope">
<div>药品价格：{{scope.row.price}}</div>
<div>药品合计：{{scope.row.shouldpay}}</div>
</template>
   </el-table-column>
</el-table>

</div>

        </swiper-slide>


        <swiper-slide v-if="item.INSTRUMENTS_preDrugList && INSTRUMENTS_preDrugList.length>0">


<div style="margin-bottom:40px;">

   <div style="margin-top: 20px">
        <span class="font-small">器械</span>
      </div>


<el-table border
    :data="item.INSTRUMENTS_preDrugList"
    stripe
    style="width: 100%;margin-top: 20px;">

     <el-table-column show-overflow-tooltip
      label="药品" min-width="230">
<template slot-scope="scope">
<div>药品编码：{{scope.row.codeId}}</div>
<div>药材名称：{{scope.row.drugName}}</div>
<div>药材别名：{{scope.row.productName}}</div>
<div>药品规格：{{scope.row.specification}}</div>
</template>
   </el-table-column>
 <el-table-column show-overflow-tooltip
       min-width="220">
<template slot-scope="scope">
<div>厂商：{{scope.row.manufacturer}}</div>
<div>供应商：{{scope.row.partnerName}}</div>
<div>提交时间：{{scope.row.createDate}}</div>
<div>使用说明：{{scope.row.instructions}}</div>
</template>
   </el-table-column>

      <el-table-column show-overflow-tooltip
      label="参数"  min-width="120">
<template slot-scope="scope">
<div>数量：{{scope.row.quantity}} </div>
<div>单位：{{scope.row.packingUnit}}</div>
</template>
   </el-table-column>

    <el-table-column show-overflow-tooltip
      label="金额" min-width="140">
<template slot-scope="scope">
<div>药品价格：{{scope.row.price}}</div>
<div>药品合计：{{scope.row.shouldpay}}</div>
<div>发货数量：{{scope.row.expressQuantity}}</div>
<div>发货合计：{{scope.row.expressPrice}}</div>
</template>
   </el-table-column>


</el-table>
</div>

        </swiper-slide>


        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </md-card-media>
  </md-card>

</div>
</div>


</el-card>


		<el-dialog width= "500" class="small_box" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="previewModel"  title="处方详情" >
<div style="text-align:center;">
<div style="    padding: 0 50px;
    text-align: right;">
  
  
<el-button size="mini" type="warning" @click="preViewApi()" >下载</el-button>

</div>
<iframe width='480' height='750' frameborder='0' allowtransparency='true' :src="previewUrl+prescription.presId"></iframe>
</div>


</el-dialog>





		<el-dialog width= "70vw" :close-on-click-modal="false"   append-to-body :visible.sync="shipInfoModel"  title="物流追踪" >
<div >
         <div style="margin-left:20px;margin-bottom:10px;font-size:15px;height:500px;overflow: auto;" v-bouncing="shipInfoLoading">
            <div v-for="(item,index) in shipInfo" :key="index">
              {{item.AcceptStation}}{{item.AcceptTime}}
          </div>
          <div v-if="shipInfo.length==0" style="margin:40px 0;text-align:center;color:#999;font-size:14.8px">暂无物流信息</div>
         </div>
</div>
        </el-dialog>



    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import * as Api from "../../api/api";
import corpperlabel from "../transmit/corpperlabel";
import moment from "moment";
import { g_node_url, g_base_url } from "../../api/conf";


@Component({
  props: {},
  components: {
corpperlabel
  }
})
export default class AddGoods extends Vue {
 loading = false
resource = null
presId = null
order = null
payModeEnum = ""
  swiperOption= {
          autoHeight: true, //enable auto height
          spaceBetween: 20,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          noSwiping : true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
        ExpressDetailList = []
        OrderSplitFlag = null
  getOrderDetail(presId, send = null) {
    indexApi
      .getOrderInfo({
        presId: presId
      })
      .then(res => {
        if (res["retCode"]) {
          this.payModeEnum =  res.data.payStatus;
          // res.data.YdkOrderDetailList.forEach((item, index) => {
          //   item.logisticslabel = item.logistics;
          //   item.waybillNumberlabel = item.waybillNumber;
          // });
          // if (res.data.invoiceRecords && res.data.invoiceRecords.length > 0) {
          //   res.data.invoiceObj_logistics =
          //     res.data.invoiceRecords[0].logistics;
          //   res.data.invoiceObj_waybillNumber =
          //     res.data.invoiceRecords[0].waybillNumber;
          //   this.order = res.data;
          //   (<any>this.$refs.updateorder).payModeEnum = res.data.payStatus;
          //   (<any>this.$refs.updateorder).loading = false;
          //   (<any>this.$refs.updateorder).getExpressPackage(presId, send);
          //   return;
          // }
          this.order = res.data;
          // (<any>this.$refs.updateorder).payModeEnum = res.data.payStatus;
          // (<any>this.$refs.updateorder).getExpressPackage(presId, send);
      } else {
          // (<any>this.$refs.updateorder).loading = false;
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });

        indexApi
      .getExpressPackage({
        presId: presId
      })
      .then(res => {
        if (res["retCode"]) {
            this.ExpressDetailList = res.data.ExpressDetailList
            this.OrderSplitFlag = res.data.OrderSplitFlag
       
          if(this.OrderSplitFlag =='1'){
              this.ExpressDetailList.forEach((item,index)=>{
                  this.getExpressPackageDrug(item.expressDetailId,index)
           
           })

          }


        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });

  }
getExpressPackageDrug(expressDetailId,index){
      indexApi
                .getExpressPackageDrug({
                  expressDetailId:expressDetailId
                })
                .then(res => {
                  if (res["retCode"]) {
               this.ExpressDetailList[index].CHINESE_preDrugList = res.data.ExpressDrugDetailList.filter(item => {
      return item.preDrugType == "CHINESE_MEDICINE";
    });
    this.ExpressDetailList[index].PASTE_preDrugList = res.data.ExpressDrugDetailList.filter(item => {
      return item.preDrugType == "PASTE_PRESCRIPTION";
    });
    this.ExpressDetailList[index].WESTERN_preDrugList = res.data.ExpressDrugDetailList.filter(item => {
      return item.preDrugType == "WESTERN_MEDICINE";
    });
    this.ExpressDetailList[index].INSTRUMENTS_preDrugList = res.data.ExpressDrugDetailList.filter(item => {
      return item.preDrugType == "INSTRUMENTS";
    });
 this.ExpressDetailList.push()
                  } else {
                    if (!res["islogin"]) {
                      this.$alert(res["message"]);
                    }
                  }
                });

}

 formatStepStatus(value) {

          return 1;
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
      case "GIVEUP_PRESCRIPTION":
        return "弃单";
      case "REJECT_AUDIT_PRESCRIPTION":
    
          return "已驳回转方";
      default:
        return "";
    }
  }
 detailInfo = [
    {
      title: "患者信息",
      children: [
        { name: "姓名", key: "memberName" },
        { name: "性别", key: "patientSex" },
        { name: "年龄", key: "memberAge" },
        { name: "手机号", key: "memberPhone" },
        { name: "身份证", key: "memberIdcard" },
        { name: "地址", key: "consigneeAddress" },
      ]
    },
    {
      title: "医生信息",
      children: [
        { name: "医生姓名", key: "docterName" },
        { name: "医生电话", key: "doctorMobile" },
        { name: "医生医院", key: "hospitalName" },
        { name: "科室", key: "docterDept" },
        { name: "诊断", key: "diagnose" }
      ]
    }
  ];

prescription = null
  SplitPrescription = null;

    queryPresDetatil(callback = null) {
    indexApi.queryPresDetatil({ preId: this.presId }).then(res => {
      if (res["retCode"]) {
        this.prescription = res.data.prescription;     
           this.SplitPrescription = res.data.SplitPrescription;
           callback(res.data.prescription.presState)
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
    });
  }


  preDrugList = [];
  CHINESE_preDrugList = [];
  PASTE_preDrugList = [];
  WESTERN_preDrugList = [];
  INSTRUMENTS_preDrugList = [];
  queryPresDrugback(presId , presState){


 if (
      presState == "REJECT_AUDIT_PRESCRIPTION" || presState == "NOT_TRANSLATED_PRESCRIPTION" || 
      presState == "REJECT_TRANSLATED_PRESCRIPTION"
    ) {
      
      indexApi.queryPresDrug({ preId: presId }).then(res => {
        if (res["retCode"]) {
          this.preDrugList = res.data.data;
          
          this.CHINESE_preDrugList = res.data.data.filter(item => {
            return item.preDrugType == "CHINESE_MEDICINE";
          });

          this.PASTE_preDrugList = res.data.data.filter(item => {
            return item.preDrugType == "PASTE_PRESCRIPTION";
          });
          this.WESTERN_preDrugList = res.data.data.filter(item => {
            return item.preDrugType == "WESTERN_MEDICINE";
          });
          this.INSTRUMENTS_preDrugList = res.data.data.filter(item => {
            return item.preDrugType == "INSTRUMENTS";
          });

     
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    } else {
      console.log('--2',presState)
      
      indexApi
        .queryPresDrugback({
          preId: presId
        })
        .then(res => {
          if (res["retCode"]) {
            this.preDrugList = res.data;

            this.CHINESE_preDrugList = res.data.filter(item => {
              return item.preDrugType == "CHINESE_MEDICINE";
            });

            this.PASTE_preDrugList = res.data.filter(item => {
              return item.preDrugType == "PASTE_PRESCRIPTION";
            });

            this.WESTERN_preDrugList = res.data.filter(item => {
              return item.preDrugType == "WESTERN_MEDICINE";
            });
            this.INSTRUMENTS_preDrugList = res.data.filter(item => {
              return item.preDrugType == "INSTRUMENTS";
            });

          } else {
            if (!res["islogin"]) {
              this.$alert(res["message"]);
            }
            console.error("数据查询错误");
          }
        });
    }

  }
    list2string(...list) {
    let a = [];
    for (let n in list) {
      if (list[n]) {
        for (let j in JSON.parse(list[n])) {
          a.push(JSON.parse(list[n])[j]);
        }
      }
    }
    return a.join(",");
  }
corpperModel = false
preImageList = []
  getPrePic(presId) {
    indexApi.getPrePic({ preId: presId }).then(res => {
      if (res["retCode"]) {
        this.preImageList = res.data;
 
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
chcangeCorpperModel(){
  this.corpperModel= true
  this.$nextTick(()=>{
 let a: any = this.$refs.cropper;
          a.changePreImageUrl(0);
  })
}
  detailModel = 'prescirption'
  getInfo() {
    this.$nextTick(() => {
      this.preImageList = [];
    this.queryPresDetatil(presState=>{

this.queryPresDrugback(this.presId,presState)
  });
        this.getPrePic(this.presId);
    });
  }
    previewUrl = `${g_node_url}/?host=${g_base_url}&presId=`;
previewModel= false
  preViewApi() {
    indexApi.preViewApi(this.presId);
  }

handleprescriptionType(prescriptionType) {
    switch (prescriptionType) {
      case "BACK_HANDWORK":
        return "线下订单";
      case "DOC_HANDWORK":
        return "直接开方";
      case "ONLINE":
        return "在线处方";
      case "PHOTO":
        return "普通单";
      default:
        return "";
    }
  }
  handlepreDrugType(preDrugType) {
    switch (preDrugType) {
      case "CHINESE_MEDICINE":
        return "中药";
      case "WESTERN_MEDICINE":
        return "西药";
      case "PASTE_PRESCRIPTION":
        return "膏方";
      case "INSTRUMENTS":
        return "器械";
      default:
        return "";
    }
  }





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


 handlePayStatus(status) {
    switch (status) {
      case "PAY_WAIT":
        return {
          type: "danger",
          title: "未支付"
        };
      case "PAY_SUCCESS":
        return {
          type: "success",
          title: "已支付"
        };
      case "ORDER_PAY_ONDEV":
        return {
          type: "warning",
          title: "货到付款"
        };
          case "PAY_ON_DELIVERY":
        return {
          type: "warning",
          title: "货到付款"
        };
      default:
        return "";
    }
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
        return "交易关闭";
      case "ORDER_WAIT_SENDGOODS":
        return "待发货";
      case "SENDGOODS_UNFINISHED":
        return "发货未完成";
      case "ORDER_WAIT_RECVGOODS":
        return "待收货";
      case "ORDER_END_GOODS":
        return "订单已完成";
      default:
        return "";
    }
  }

pagetype:any = null

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
                           this.getOrderDetail(this.presId);

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
   * 确认收货
   */
  recvGood(waybillNumber,expressDetailId) {

      console.log(expressDetailId)
    // expressDetailId
    this.$confirm("确认收货?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        let data = {
          // pres_id: this.order.presId,
           expressDetailId:  expressDetailId,
          // waybill_number: waybillNumber,
          ship_status: "ORDER_END_GOODS"
        };

        indexApi.dorecvGood(data).then(res => {
          if (res["retCode"]) {
            this.$message("已确认收货");
                this.getOrderDetail(this.presId);
           
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

  //撤回包裹
  recallGood(expressDetailId) {
    this.$confirm("确认撤回该包裹?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .recallGood({
            expressDetailId: expressDetailId
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("撤回成功");
                this.getOrderDetail(this.presId);
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
        comName: item.logistics,
        consigneePhone:item.consigneePhone
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

  doChangePayModeEnum() {
    this.loading = true;
    indexApi
      .updatePrePayStatus({
        preId: this.order.presId,
        payStatusEnum: this.payModeEnum
      })
      .then(res => {
    this.loading = false;
        if (res["retCode"]) {
              this.$message("保存成功");
                         this.getOrderDetail(this.presId);

        } else {
          this.$alert(res["message"]);
        }
      });
  }
back(){
  this.$router.go(-1);
}
  mounted() {
      // resource = order 
      // presId = key
      if(this.$route.query.key){
this.resource = this.$route.query.resource 
this.presId = this.$route.query.key

this.getInfo()
    this.getOrderDetail(this.presId);
this.pagetype =  (<any>this.$route.query).t % 2 == 0 ? 'after':'reminder';
  }
  }
}
</script>

<style  scoped>
  .detail-container {
    width: 80%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
  }

  .operate-container {
    background: #F2F6FC;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
  }

  .operate-button-container {
    float: right;
    margin-right: 20px
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
    .form-border {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
  }

  .form-container-border {
        line-height: 1.15;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
    margin-top: 15px;
  }

  .form-left-bg {
    background: #F2F6FC;
  }
  .font-small {
  font-size: 14px;
  color: #606266;
}

  .swiper-container .swiper-slide {
  }
.detail_title{
  margin-right:20px;
    cursor: pointer;
    user-select:none;
}
.detail_title:hover{
  color:#c30d23
}
.detail_title_active{
  color:#c30d23
}
</style>