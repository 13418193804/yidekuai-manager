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


<el-table-column 
      label="支付状态" width="120">
<template slot-scope="scope">
{{handlePayStatus(scope.row.payStatus).title}} 
</template>
   </el-table-column>



<!-- v-if="patModel != 'PENDING'" -->
 <el-table-column 
      label="支付方式" width="120">
<template slot-scope="scope">
 <el-tag v-if="handlePaymentMode(scope.row.paymentMode).type !==''"
  :type="scope.row.prescriptionType==='BACK_HANDWORK' ||scope.row.prescriptionType=== 'DOC_HANDWORK' ? handlePayStatus(scope.row.payStatus).type  :handlePaymentMode(scope.row.paymentMode).type">
  {{ scope.row.prescriptionType==='BACK_HANDWORK' ||scope.row.prescriptionType=== 'DOC_HANDWORK' ?handlePayStatus(scope.row.payStatus).title :  handlePaymentMode(scope.row.paymentMode).title}}
  </el-tag>
</template>
   </el-table-column>
        <el-table-column  
      label="处方类型" width="150">
      <template slot-scope="scope">
    <el-tag v-if="scope.row.prescriptionType"
  :type="handleprescriptionType(scope.row.prescriptionType).type">
        {{handleprescriptionType(scope.row.prescriptionType).name}}
</el-tag>
      </template>
   </el-table-column>
        <!-- <el-table-column  
      label="订单类型" width="150">
      <template slot-scope="scope">
     {{scope.row.orderSplitFlag==='1'?'拆分订单':'普通订单'}}
      </template>
   </el-table-column> -->


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
          type="text"
          @click="changeModel('edit', scope.row)"  v-promiss.edit>完善</el-button>

               <el-button
          size="mini"
          type="primary" @click="sendGoods(scope.row)"   v-if=" (pagetype =='rework'||pagetype =='afterorder'  ) && (scope.row.orderStatue == 'ORDER_WAIT_SENDGOODS' ||scope.row.orderStatue == 'SENDGOODS_UNFINISHED'||scope.row.orderStatue =='ORDER_PAY_ONDEV')" > 发货 </el-button>
         


               <!-- <el-button size="mini" 
          :type="scope.row.reminderFlag == 1?'primary':''" @click="doReminder(scope.row)" v-if="pagetype =='reminder' && scope.row.orderStatue =='ORDER_WAIT_PAY' && scope.row.presState !== 'GIVEUP_PRESCRIPTION'" :disabled="scope.row.reminderFlag !== 1"  >{{  scope.row.reminderFlag == 1?'催单':'已催单'}}</el-button> -->
         <el-button size="mini" 
          :type="scope.row.presState == 'GIVEUP_PRESCRIPTION'?'':'primary'" @click="doGiveup(scope.row)" v-if="pagetype =='reminder'" :disabled="scope.row.presState == 'GIVEUP_PRESCRIPTION'"  >{{  scope.row.presState == 'GIVEUP_PRESCRIPTION'?'已弃单':'弃单'}}</el-button>
  

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
      {{scope.row.invoiceRecords && scope.row.invoiceRecords.length>0?scope.row.invoiceRecords[0].contactName:""}}
</template>
   </el-table-column>
 <el-table-column
      label="收货手机号(开票)"  width="150">
<template  slot-scope="scope">
      {{scope.row.invoiceRecords && scope.row.invoiceRecords.length>0?scope.row.invoiceRecords[0].contactMobile:""}}
</template>
   </el-table-column>
 
    <el-table-column
      label="收货地址(开票)" width="180">
<template  slot-scope="scope">
  <span v-if="scope.row.invoiceRecords && scope.row.invoiceRecords.length>0">
  {{scope.row.invoiceRecords[0].province}}{{scope.row.invoiceRecords[0].city}}{{scope.row.invoiceRecords[0].country}}{{scope.row.invoiceRecords[0].address}}
  </span>
  </template>
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
{{handlePayStatus(scope.row.payStatus).title}} 
</template>
   </el-table-column>


 <el-table-column 
      label="支付方式" width="120">
<template slot-scope="scope">
 <el-tag  v-if="handlePaymentMode(scope.row.paymentMode).type !==''"
  :type="scope.row.prescriptionType==='BACK_HANDWORK' ||scope.row.prescriptionType=== 'DOC_HANDWORK' ? handlePayStatus(scope.row.payStatus).type  :handlePaymentMode(scope.row.paymentMode).type">
  {{ scope.row.prescriptionType==='BACK_HANDWORK' ||scope.row.prescriptionType=== 'DOC_HANDWORK' ? handlePayStatus(scope.row.payStatus).title :  handlePaymentMode(scope.row.paymentMode).title}}
  </el-tag>
</template>
   </el-table-column>
     
   <el-table-column  
      label="处方类型" width="150">
      <template slot-scope="scope">
    <el-tag v-if="scope.row.prescriptionType"
  :type="handleprescriptionType(scope.row.prescriptionType).type">
        {{handleprescriptionType(scope.row.prescriptionType).name}}
</el-tag>
      </template>
   </el-table-column>
    <!-- <el-table-column  
      label="订单类型" width="150">
      <template slot-scope="scope">
     {{scope.row.orderSplitFlag==='1'?'拆分订单':'普通订单'}}
      </template>
   </el-table-column> -->

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

		<el-dialog class="min_box" width= "70vw" :close-on-click-modal="false" 
    :title="add_model_type == 'add' ?'完善':`完善（${handleprescriptionType(createForm.prescriptionType).name}）`"
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
  <i class="iconfont icon-yisheng" style="font-size: 36px;position: absolute;top: 6px;left: 0;"></i>

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
              v-model="createForm.memberPhone"
              clearable>
              </el-input>
  			</el-form-item>

  <div >

<div class="flex">
  <div>
     <el-form-item  label="患者性别：" style="margin:0">
  <el-radio v-model="createForm.patientSex" label="男">男</el-radio>
  <el-radio  v-model="createForm.patientSex"  label="女">女</el-radio>
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
                <el-upload   accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"  :action="fileUploadUrl"   list-type="picture-card"  ref="upload" :before-upload="beforeUpload"
                 :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess1" :file-list="fileList">
                  <i class="el-icon-plus"></i>
                </el-upload>
</div>

        <el-form-item  label="治疗服务费：">
            {{createForm.servicemoney}}
  			</el-form-item>
        <el-form-item >
              <el-button size="mini" 
          :type="createForm.reminderFlag == 1?'primary':''" @click="doReminder(createForm)" v-if="pagetype =='reminder' && createForm.orderStatue =='ORDER_WAIT_PAY' && createForm.presState !== 'GIVEUP_PRESCRIPTION'" :disabled="createForm.reminderFlag !== 1"  >{{  createForm.reminderFlag == 1?'催单':'已催单'}}</el-button>
  			</el-form-item>
</div>
</el-form>

</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="add_model = false" :disabled="cancelLoading">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')" :disabled="add_footer_loading" >确 定</el-button>
			</span>
        </el-dialog>
  <el-dialog  :visible.sync="dialogVisible" @opened="opened">
      <corpperlabel ref="dialogImage" :preImageList="dialogImageUrlList" :preImageUrlFlag="true"></corpperlabel>
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
import * as indexApi from "../../api/indexApi";
import moment from "moment";
import { Prop } from "vue-property-decorator";
import prescriptioninfo from "../transmit/prescriptioninfo";
import updateorder from "./updateorder";
import * as ApiOrder from "../../api/orderapi";
import * as Config from "../../api/conf";
import corpperlabel from "../transmit/corpperlabel";

@Component({
  props: {},
  components: {
    prescriptioninfo,
    updateorder,corpperlabel
  }
})
export default class AddGoods extends Vue {
  @Prop({ required: false })
  orderList: any;
  @Prop({ required: false })
  pagetype: string;
  @Prop({ required: false })
  patModel: string;
  // @Prop({ required: false })
  // provinceList;
  @Prop({ required: false })
payStatus




  filter_doctor = false;
  filter_type = "doctor";
  filter_model = false;

  add_model = false;
  add_model_loading = false;
  cancelLoading = false
  add_footer_loading = false;
  add_upload_loading = false;
  noMessage_model = false;
  noMessage_loading = false;
  
  mobile = "";

  resultList = [];


  checkPhone = /^1[345789]\d{9}$/;

  submitForm() {

    if (
      ((this.createForm.doctorid || "") === "" &&
        this.add_model_type == "add") ||
      ((this.createForm.docterId || "") === "" && this.add_model_type == "edit")
    ) {
      this.$message("请选择医生");
      return;
    }

      if ((this.createForm.memberName || "") === "") {
        this.$message("请输入患者姓名");
        return;
      }
  let re = /^(?:[0-9][0-9]?|1[012][0-9]|130)$/;
        if ((this.createForm.memberAge || "") === ""&& !re.test(this.createForm.memberAge)) {
          this.$message("请输入0-130岁的年龄");
          return;
        }

      if ((this.createForm.memberPhone || "") === "") {
        this.$message("请输入患者手机号");
        return;
      }
      if (!this.checkPhone.test(this.createForm.memberPhone)) {
        this.$message("请输入正确的患者手机号");
        return;
      }

      if((this.createForm.patientSex||'')  ===''){
            this.$message("请选择患者性别");
      return;
        }

      if((this.createForm.memberAge||'')  ===''){
            this.$message("请输入患者年龄");
      return;
        }
      if ((this.createForm.memberIdcard || "") !== "") {
        this.vaild_memberIdcard(() => {
          this.after_vaild();
        });
        return;
      } else {
        this.after_vaild();
        return;
      }
  }
  after_vaild(){





 if (this.fileList.length > 0) {
      this.createForm.pictureIds = this.fileList
        .map(item => {
          return item.url;
        })
        .join(",");
    } else {
      this.$message("请上传处方图片");
      return;
    }
 
 
let showLoading = ()=>{
 this.add_model_loading = true
this.add_footer_loading =  true
this.cancelLoading = true
}
let closeLoading = ()=>{
   this.add_model_loading = false
this.add_footer_loading =  false
this.cancelLoading = false
}

      // this.createForm.serviceMoney = this.createForm.servicemoney





      if((this.createForm.consigneeName||'')===''){
       this.$message("请输入收件人");
      return;
      }
    if((this.createForm.consigneePhone||'')===''){
       this.$message("请输入收件号码");
      return;
      }
      if((this.createForm.provinceid||'')==='' || (this.createForm.cityid||'')==='' || (this.createForm.areaid||'')==='' ){
             this.$message("请选择收货地区");
      return;
      }
          if((this.createForm.consigneeAddress||'')===''){
       this.$message("请输入收件地址");
      return;
      }

      showLoading()
      indexApi.updatePre(this.createForm).then(res => {
        closeLoading();
        if (res["retCode"]) {
          this.$message("更新成功");
          this.add_model = false;
          this.$emit("getOrderList");
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });

  }
   vaild_memberIdcard(callback) {
    indexApi.checkidcard({ idcard: this.createForm.memberIdcard }).then(res => {
      if (res["retCode"]) {
        callback();
        return;
      } else {
        if (!res["islogin"]) {
          this.$message(res["message"]);
        }
        return;
      }
    });
  }

 handleprescriptionType(prescriptionType) {
    switch (prescriptionType) {
      case "BACK_HANDWORK":
        return {
          name: "直接开方",
          type: "success"
        };
      case "DOC_HANDWORK":
        return {
          name: "线下订单",
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

  changefilter_box(filter_type) {
    this.filter_type = filter_type;
    this.filter_model = !this.filter_model;
    this.resultList = [];
    this.mobile = "";
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
  add_model_type = "add";

createForm:any = {}
changeModel(type, row) {

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
          this.createForm['reminderFlag'] = 0
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

              console.log('------')
          this.order = res.data;
               (<any>this.$refs.updateorder).loading = false

              return
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
        return {
          type:"danger",
          title:"未支付"
          };  
        case "PAY_SUCCESS":
        return  {
          type:"success",
          title:"已支付"
          };  
      case "ORDER_PAY_ONDEV":
        return {
          type:"warning",
          title:"货到付款"
          }; 
     case "PAY_ON_DELIVERY":
        return {
          type:"warning",
          title:"货到付款"
          }; 

          
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
          title:"交易关闭"
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
          title:"订单已完成"
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
  fileUploadUrl = "";
    dialogImageUrl = "";
  dialogVisible = false;
dialogImageUrlList=[]
dialogImageIndex = 0
  opened(){

(<any>this.$refs.dialogImage).changePreImageUrl(this.dialogImageIndex)
  }
  handlePictureCardPreview(file) {
    this.dialogImageUrlList = this.fileList.map((item,index)=> {
      if(file.url === item.url){
       this.dialogImageIndex =  index
      }
      return {presImageUrl:item.url}})
    this.dialogVisible = true;
  }

  mounted() {
    this.queryProvinceList();
    this.queryShipList();
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