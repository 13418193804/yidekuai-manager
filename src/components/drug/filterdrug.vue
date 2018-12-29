<template>
    <div >
<!-- v-bouncing="loading" -->

<div  v-if="drugType=='drug'">

<el-table border ref="table"
    :data="drugList"
    stripe height="600"
    style="width: 100%;">

  <el-table-column 
      prop="commonName"
      label="通用名称">
   </el-table-column>


  <el-table-column
      prop="productName"
      label="商品名称">
   </el-table-column>

<el-table-column
      prop="specification"
      label="药品规格">
   </el-table-column>
<el-table-column
      prop="packingUnit"
      label="包装单位">
   </el-table-column>


<el-table-column
      prop="partnerName"
      label="供应商">
   </el-table-column>
   
   
<el-table-column
      prop="department"
      label="科室">
   </el-table-column>
<el-table-column 
      prop="manufacturer"
      label="厂家">
   </el-table-column>
<el-table-column show-overflow-tooltip
      prop="adaptability"
      label="适应症">
   </el-table-column>
   

<el-table-column
      prop="dosageforms"
      label="剂型">
      
   </el-table-column>
<el-table-column
      prop="hisCode"
      label="批准文号">
   </el-table-column>



<el-table-column
      prop="sellingPrice"
      label="药品库价格">
   </el-table-column>
   
<el-table-column
      label="状态">
      <template slot-scope="scope">

             <el-tag :type="scope.row.drugStatus=='USE' ?'success':'info'">
               {{scope.row.drugStatus=='USE' ?"启用中":"已停用"}}</el-tag>

      </template>
   </el-table-column>

<el-table-column
      prop="instructions"
      label="使用说明" width="400">
   </el-table-column>

   <el-table-column label="操作" fixed="right"  width="250">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          @click="gocenter(scope.$index, scope.row)" >用法用量管理</el-button>
                             <el-button
          size="mini"
          type="text"
         @click="changeStatus(scope.row)" >{{scope.row.drugStatus == 'USE'?'停用':'启用'}}</el-button>

                <el-button
          size="mini"
          type="primary"
         @click="changeModel('edit', scope.row)" v-promiss.edit>编辑</el-button>
      </template>
    </el-table-column>
</el-table> 
</div>

<div v-if="drugType=='WESTERN'">
<el-table border ref="table"
    :data="drugList2"
    stripe height="600"
    style="width: 100%;">
   <el-table-column fixed="left"
      prop="codeId"  width="120"
      label="药品编码">
   </el-table-column>
  <el-table-column 
      prop="commonName"
      label="通用名称">
   </el-table-column>

  <el-table-column
      prop="productName"
      label="商品名称">
   </el-table-column>

<el-table-column
      prop="specification"
      label="药品规格">
   </el-table-column>
<el-table-column
      prop="packingUnit"
      label="包装单位">
   </el-table-column>


<el-table-column
      prop="partnerName"
      label="供应商">
   </el-table-column>
   
   
<el-table-column
      prop="department"
      label="科室">
   </el-table-column>

<el-table-column width="200px"
      prop="manufacturer"
      label="厂家">
   </el-table-column>

<el-table-column show-overflow-tooltip
      prop="adaptability"
      label="适应症">
   </el-table-column>
   

<el-table-column
      prop="dosageforms"
      label="剂型">
      
   </el-table-column>
<el-table-column
      prop="hisCode"
      label="批准文号">
   </el-table-column>


<el-table-column
      prop="takingUnit"
      label="计量单位">
   </el-table-column>


<el-table-column
      prop="sellingPrice"
      label="药品库价格">
   </el-table-column>

<el-table-column
      label="状态">
      <template slot-scope="scope">
             <el-tag :type="scope.row.drugStatus=='USE' ?'success':'info'">
               {{scope.row.drugStatus=='USE' ?"启用中":"已停用"}}</el-tag>
      </template>
   </el-table-column>

<el-table-column
      prop="instructions"
      label="使用说明" width="400">
   </el-table-column>

   <el-table-column label="操作" fixed="right"  width="250">
      <template slot-scope="scope">
       
                             <el-button
          size="mini"
          type="text"
         @click="changeStatus(scope.row)" >{{scope.row.drugStatus == 'USE'?'停用':'启用'}}</el-button>

                <el-button
          size="mini"
          type="primary"
         @click="change_WESTERN_Model('edit', scope.row)" v-promiss.edit>编辑</el-button>
      </template>
    </el-table-column>
</el-table> 
</div>
<div v-if="drugType=='CHINESE' ">
<el-table border ref="table"
    :data="drugList1"
    stripe height="600"
    style="width: 100%;">
   <el-table-column fixed="left"
      prop="codeId" width="120"
      label="药品编码">
   </el-table-column>
  <el-table-column 
      prop="commonName"
      label="药材名称">
   </el-table-column>
  <el-table-column
      prop="productName"
      label="别名">
   </el-table-column>
  <el-table-column
      prop="producingArea"
      label="产地" >
   </el-table-column>
<el-table-column
      prop="typeName"
      label="分类"  >
   </el-table-column>
<el-table-column
      prop="specification"
      label="药品规格">
   </el-table-column>
<el-table-column
      prop="packingUnit"
      label="单位">
   </el-table-column>
<el-table-column
      prop="manufacturer"
      label="供应商" min-width="200" >
   </el-table-column>
   <el-table-column
      prop="decoctingType"
      label="煎煮方式" >
   </el-table-column>
<el-table-column
      prop="chineseType"
      label="类型(普通、贵细、毒性)"  min-width="200">
   </el-table-column>
<el-table-column
      prop="sellingPrice"
      label="药品库价格">
   </el-table-column>

<el-table-column
      label="状态">
      <template slot-scope="scope">
             <el-tag :type="scope.row.drugStatus=='USE' ?'success':'info'">
               {{scope.row.drugStatus=='USE' ?"启用中":"已停用"}}</el-tag>
      </template>
   </el-table-column>

   <el-table-column label="操作" fixed="right"  width="250">
      <template slot-scope="scope">
                             <el-button
          size="mini"
          type="text"
         @click="changeStatus(scope.row)" >{{scope.row.drugStatus == 'USE'?'停用':'启用'}}</el-button>

                <el-button
          size="mini"
          type="primary"
         @click="change_CHINESE_Model('edit', scope.row)" v-promiss.edit>编辑</el-button>
      </template>
    </el-table-column>
</el-table>
</div>
   


   
		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="drugModel"  :title="type=='add'?'添加药品':'编辑药品'">
	 <el-form label-width="120px" ref="ruleForm" :model="addDrug"  :rules="rules">
				<el-form-item label="商品名称：" prop="productName" >
              					<el-input v-model="addDrug.productName"  placeholder="请输入商品名称" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
        		<el-form-item label="通用名称：" prop="commonName">
              					<el-input v-model="addDrug.commonName"  placeholder="请输入通用名称" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
      	<el-form-item label="供应商：" prop="partnerId">
         
  <el-select v-model="addDrug.partnerId"   @change="changePartner" filterable placeholder="请选择供应商" style="max-width:400px;min-width:200px">
    <el-option
      v-for="item in partnerList"
      :key="item.partnerId"
      :label="item.partnerName"
      :value="item.partnerId"
      >
    </el-option>
  </el-select>

  <el-button type="text" @click="openpartnerModel()" style="margin-left:20px;">新增供应商</el-button>


              					<!-- <el-input v-model="addDrug.partnerName"  placeholder="请输入供应商" style="max-width:400px;min-width:200px" ></el-input> -->
				</el-form-item>	
   <el-form-item label="科室" prop="department">
            <!-- <el-cascader
            v-model="addDrug.department"
            :options="tableTree"
            @change="changedepartmentId()"
            change-on-select
            clearable
            ></el-cascader> -->

              					<el-input v-model="addDrug.department"  placeholder="请输入科室" style="max-width:400px;min-width:200px" ></el-input>
            
        </el-form-item>

			<el-form-item label="批准文号："  prop="hisCode">
              					<el-input v-model="addDrug.hisCode"  placeholder="请输入批准文号" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	

			<el-form-item label="售价：" prop="sellingPrice">
              					<el-input v-model.number="addDrug.sellingPrice"  placeholder="请输入售价" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	

           	<el-form-item label="剂型：" prop="dosageforms">
              					<el-input v-model="addDrug.dosageforms"  placeholder="请输入剂型" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
	
    		<el-form-item label="药品规格："  prop="specification">
              					<el-input v-model="addDrug.specification"  placeholder="请输入药品规格" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
    
         		<el-form-item label="生产厂家：" prop="manufacturer">
              					<el-input v-model="addDrug.manufacturer"  placeholder="请输入生产厂家" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
<!-- 
        		<el-form-item label="指导价：" prop="guidance">
              					<el-input v-model="addDrug.guidance"  placeholder="请输入指导价" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	 -->

    		<el-form-item label="包装单位：" prop="packingUnit">
              					<el-input v-model="addDrug.packingUnit"  placeholder="请输入包装单位" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
        




            	<el-form-item label="使用方法：" prop="instructions" >
              					<el-input v-model="addDrug.instructions"  placeholder="请输入使用方法" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	


            	<el-form-item label="适应症：" prop="adaptability" >
              					<el-input v-model="addDrug.adaptability" type="textarea"  :rows="4" placeholder="请输入适应症" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	

         

                    </el-form >

			<span slot="footer" class="dialog-footer" >
				<el-button @click="drugModel = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')" :disabled="loading">确 定</el-button>
			</span>

</el-dialog>

		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="partnerObjModel.model "  title="新增供应商">
<div v-bouncing="partner_loading" >
	 <el-form label-width="120px" >

            	<el-form-item label="供应商：" >
              					<el-input v-model="partnerObj.partnerName"  placeholder="请输入供应商" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
      
            	<el-form-item label="供应商地址：" >
              					<el-input v-model="partnerObj.partnerAddress"  placeholder="请输入供应商地址" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	

            	<el-form-item label="联系人：" >
              					<el-input v-model="partnerObj.contactsName"  placeholder="请输入联系人" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
        
            	<el-form-item label="联系电话：" >
              					<el-input v-model="partnerObj.contactsPhone"  placeholder="请输入联系电话" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	

 	<el-form-item label="备注：" >
              					<el-input v-model="partnerObj.remake" type="textarea"  placeholder="请输入备注" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
                    </el-form >
</div>
			<span slot="footer" class="dialog-footer" >
				<el-button @click="partnerObjModel.model = false">取 消</el-button>
				<el-button type="primary" @click="doaddpartner" :disabled="loading">确 定</el-button>
			</span>
</el-dialog>

		<el-dialog width= "50vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="sellingPriceModel"  title="转方价格">

       <div style="    margin-bottom: 10px;">
        <el-button size="mini" type="primary" @click="changeaddsellingPriceModel">添加转方价格</el-button>

       </div>







<el-table border 
    :data="sellingPriceList"
    stripe
    style="width: 100%;">
  <el-table-column   width="120"
      prop="sellingPrice"
      label="转方价格">
   </el-table-column>
  <el-table-column
      prop="remarks"
      label="备注">
   </el-table-column>

   <el-table-column label="操作" fixed="right"  width="250">
      <template slot-scope="scope">
      
                <el-button
          size="mini"
          type="danger"
         @click="sumbitdeletesellingPrice(scope.row)" >删除</el-button>
      </template>
    </el-table-column>


</el-table>
    </el-dialog>

		<el-dialog width= "50vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="addsellingPriceModel"  title="添加转方价格">




	 <el-form label-width="120px" ref="CHINESE"  :model="addsellingPriceForm" >

 		<el-form-item label="转方价格：" >
              					<el-input v-model="addsellingPriceForm.sellingPrice"  placeholder="请输入转方价格" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	


 		<el-form-item label="备注：" >
              					<el-input v-model="addsellingPriceForm.remarks"  placeholder="备注" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
	 </el-form>


	<span slot="footer" class="dialog-footer" >
				<el-button @click="addsellingPriceModel = false">取 消</el-button>
				<el-button type="primary" @click="submitaddsellingPrice" :disabled="loading">确 定</el-button>
			</span>

    </el-dialog>




		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="CHINESE_Model"  :title="type=='add'?'添加中药':'编辑中药'">
<!-- :model="CHINESE_addDrug"  :rules="CHINESE_rules"  -->
	 <el-form label-width="120px" ref="CHINESE"  :model="CHINESE_addDrug"  :rules="CHINESE_rules">
			 	
             	<el-form-item label="药品编码" prop="codeId" >
              					<el-input v-model="CHINESE_addDrug.codeId"  placeholder="请输入药品编码" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
         	<el-form-item label="药材名称：" prop="commonName">
              					<el-input v-model="CHINESE_addDrug.commonName"  placeholder="请输入药材名称" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
      	<el-form-item label="别名：" prop="productName" >
              					<el-input v-model="CHINESE_addDrug.productName"  placeholder="请输入别名" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
 
   <el-form-item label="产地：" prop="producingArea">
              					<el-input v-model="CHINESE_addDrug.producingArea"  placeholder="请输入产地" style="max-width:400px;min-width:200px" ></el-input>
        </el-form-item>

			<el-form-item label="分类："  prop="typeName">
              					<el-input v-model="CHINESE_addDrug.typeName"  placeholder="请输入分类" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	

		<el-form-item label="药品规格："  prop="specification">
              					<el-input v-model="CHINESE_addDrug.specification"  placeholder="请输入药品规格" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	


			<el-form-item label="单位：" prop="packingUnit">
              					<el-input v-model.number="CHINESE_addDrug.packingUnit"  placeholder="请输入单位" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	


			<el-form-item label="克/份" prop="unitG">
              					<el-input v-model.number="CHINESE_addDrug.unitG"  placeholder="请输入克/份" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	



           	<el-form-item label="供应商：" prop="manufacturer">
              					<el-input v-model="CHINESE_addDrug.manufacturer"  placeholder="请输入供应商" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
	
    
    
         		<el-form-item label="煎煮方式：" prop="decoctingType">
              				<el-select  v-model="CHINESE_addDrug.decoctingType"  placeholder="请输入煎煮方式" style="max-width:400px;min-width:200px">
                        <el-option value="包煎" label="包煎"></el-option>
                        <el-option value="水煎" label="水煎"></el-option>
                      </el-select>
				</el-form-item>	
<!-- 
        		<el-form-item label="指导价：" prop="guidance">
              					<el-input v-model="CHINESE_addDrug.guidance"  placeholder="请输入指导价" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	 -->

    		<el-form-item label="类型：" prop="chineseType">

          <el-select v-model="CHINESE_addDrug.chineseType" placeholder="请选择类型" style="max-width:400px;min-width:200px">
    <el-option      label="普通"      value="普通">
    </el-option>
      <el-option      label="贵细"      value="贵细">
    </el-option>
      <el-option      label="毒性"      value="毒性">
    </el-option>
  </el-select>
        </el-form-item>	

            	<el-form-item label="药品库价格：" prop="sellingPrice" >
              					<el-input v-model="CHINESE_addDrug.sellingPrice"  placeholder="请输入药品库价格" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
        

            	<el-form-item label="同步原药品库："  v-if="type=='add'">
  <el-radio v-model="CHINESE_addDrug.synchronousFlag" label="1">是</el-radio>
  <el-radio v-model="CHINESE_addDrug.synchronousFlag" label="0">否</el-radio>
				</el-form-item>	

                    </el-form >
			<span slot="footer" class="dialog-footer" >
				<el-button @click="CHINESE_Model = false">取 消</el-button>
				<el-button type="primary" @click="new_submitForm('CHINESE')" :disabled="loading">确 定</el-button>
			</span>
</el-dialog>












		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="WESTERN_Model"  :title="type=='add'?'添加西药':'编辑西药'">

	 <el-form label-width="120px" ref="WESTERN" :model="WESTERN_addDrug"  :rules="WESTERN_rules" >
			 		<el-form-item label="通用名称：" prop="commonName">
              					<el-input v-model="WESTERN_addDrug.commonName"  placeholder="请输入通用名称" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
      	<el-form-item label="商品名称：" prop="productName" >
              					<el-input v-model="WESTERN_addDrug.productName"  placeholder="请输入商品名称" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
 
		<el-form-item label="药品规格："  prop="specification">
              					<el-input v-model="WESTERN_addDrug.specification"  placeholder="请输入药品规格" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	


			<el-form-item label="包装单位：" prop="packingUnit">
              					<el-input v-model.number="WESTERN_addDrug.packingUnit"  placeholder="请输入单位" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	

		<el-form-item label="供应商：" prop="partnerId">
         
  <el-select v-model="WESTERN_addDrug.partnerId"   @change="changePartner1" filterable placeholder="请选择供应商" style="max-width:400px;min-width:200px">
    <el-option
      v-for="item in partnerList"
      :key="item.partnerId"
      :label="item.partnerName"
      :value="item.partnerId"
      >
    </el-option>
  </el-select>

  <el-button type="text" @click="openpartnerModel()" style="margin-left:20px;">新增供应商</el-button>
				</el-form-item>	
    
    

           <el-form-item label="科室" prop="department">
            <!-- <el-cascader
            v-model="addDrug.department"
            :options="tableTree"
            @change="changedepartmentId()"
            change-on-select
            clearable
            ></el-cascader> -->

              					<el-input v-model="WESTERN_addDrug.department"  placeholder="请输入科室" style="max-width:400px;min-width:200px" ></el-input>
            
        </el-form-item>
       		<el-form-item label="厂家：" prop="manufacturer">
              					<el-input v-model="WESTERN_addDrug.manufacturer"  placeholder="请输入厂家" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	


        	
            	<el-form-item label="适应症：" prop="adaptability" >
              					<el-input v-model="WESTERN_addDrug.adaptability" type="textarea"  :rows="4" placeholder="请输入适应症" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	

<el-form-item label="剂型：" prop="dosageforms">
              					<el-input v-model="WESTERN_addDrug.dosageforms"  placeholder="请输入剂型" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	


			<el-form-item label="批准文号："  prop="hisCode">
              					<el-input v-model="WESTERN_addDrug.hisCode"  placeholder="请输入批准文号" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	


			<el-form-item label="计量单位："  prop="dosageCode">
              					<el-input v-model="WESTERN_addDrug.dosageCode"  placeholder="请输入计量单位" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	

        	<el-form-item label="药品库价格：" prop="sellingPrice" >
              					<el-input v-model="WESTERN_addDrug.sellingPrice"  placeholder="请输入药品库价格" style="max-width:400px;min-width:200px" ></el-input>
    <el-button @click="changesellingPriceModel" v-if="WESTERN_addDrug.drugId">转方价格</el-button>
      	</el-form-item>	
            	<el-form-item label="同步原药品库："  v-if="type=='add'">
  <el-radio v-model="WESTERN_addDrug.synchronousFlag" label="1">是</el-radio>
  <el-radio v-model="WESTERN_addDrug.synchronousFlag" label="0">否</el-radio>
				</el-form-item>	

                    </el-form >
			<span slot="footer" class="dialog-footer" >
				<el-button @click="WESTERN_Model = false">取 消</el-button>
				<el-button type="primary" @click="new_submitForm('WESTERN')" :disabled="loading">确 定</el-button>
			</span>
</el-dialog>


























		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="partnerObjModel.model "  title="新增供应商">
<div v-bouncing="partner_loading" >
	 <el-form label-width="120px" >

            	<el-form-item label="供应商：" >
              					<el-input v-model="partnerObj.partnerName"  placeholder="请输入供应商" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
      
            	<el-form-item label="供应商地址：" >
              					<el-input v-model="partnerObj.partnerAddress"  placeholder="请输入供应商地址" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	

            	<el-form-item label="联系人：" >
              					<el-input v-model="partnerObj.contactsName"  placeholder="请输入联系人" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
        
            	<el-form-item label="联系电话：" >
              					<el-input v-model="partnerObj.contactsPhone"  placeholder="请输入联系电话" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	

 	<el-form-item label="备注：" >
              					<el-input v-model="partnerObj.remake" type="textarea"  placeholder="请输入备注" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
                    </el-form >

</div>
			<span slot="footer" class="dialog-footer" >
				<el-button @click="partnerObjModel.model = false">取 消</el-button>
				<el-button type="primary" @click="doaddpartner" :disabled="loading">确 定</el-button>
			</span>


</el-dialog>















    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import * as doctorApi from "../../api/doctorApi";
import * as drugApi from "../../api/drugapi";
import { Prop } from "vue-property-decorator";

@Component({
  props: {},
  components: {}
})
export default class AddGoods extends Vue {
  @Prop({ required: false })
  transmitType: boolean;

  @Prop({ required: false })
  drugType: string;
  @Prop({ required: false })
  drugList;
  @Prop({ required: false })
  drugList1;
  @Prop({ required: false })
  drugList2;

  rules = {
    partnerName: [{ required: true, message: "请选择供应商", trigger: "blur" }],
    hisCode: [{ required: true, message: "请输入批准文号", trigger: "blur" }],
    sellingPrice: [
      { required: true, message: "请输入售价", trigger: "blur" },
      { type: "number", message: "售价必须为数字值" }
    ],
    productName: [
      { required: true, message: "请输入商品名称", trigger: "blur" }
    ],
    commonName: [
      { required: true, message: "请输入通用名称", trigger: "blur" }
    ],
    specification: [
      { required: true, message: "请输入药品规格", trigger: "blur" }
    ],
    partnerId: [{ required: true, message: "请选择供应商", trigger: "blur" }],
    manufacturer: [
      { required: true, message: "请输入生产厂家", trigger: "blur" }
    ],
    preparations: [
      { required: true, message: "请输入制剂类型", trigger: "blur" }
    ],
    dosageforms: [{ required: true, message: "请输入剂型", trigger: "blur" }]
  };

  CHINESE_rules = {
    partnerName: [{ required: true, message: "请选择供应商", trigger: "blur" }],
    hisCode: [{ required: true, message: "请输入批准文号", trigger: "blur" }],
    sellingPrice: [
      { required: true, message: "请输入药品库价格", trigger: "blur" }
      // { type: "number", message: "售价必须为数字值" }
    ],
    productName: [
      { required: true, message: "请输入商品名称", trigger: "blur" }
    ],
    commonName: [
      { required: true, message: "请输入通用名称", trigger: "blur" }
    ],
    unitG: [{ required: true, message: "请输入克/份", trigger: "blur" }],
    decoctingType: [
      { required: true, message: "请输入煎煮方式", trigger: "blur" }
    ],

    specification: [
      { required: true, message: "请输入药品规格", trigger: "blur" }
    ],
    producingArea: [{ required: true, message: "请输入产地", trigger: "blur" }],
    manufacturer: [
      { required: true, message: "请输入供应商", trigger: "blur" }
    ],
    preparations: [
      { required: true, message: "请输入制剂类型", trigger: "blur" }
    ],
    dosageforms: [{ required: true, message: "请输入剂型", trigger: "blur" }]
  };

  WESTERN_rules = {
    partnerName: [{ required: true, message: "请选择供应商", trigger: "blur" }],
    hisCode: [{ required: true, message: "请输入批准文号", trigger: "blur" }],
    sellingPrice: [
      { required: true, message: "请输入药品库价格", trigger: "blur" }
      // { type: "number", message: "售价必须为数字值" }
    ],
    productName: [
      { required: true, message: "请输入商品名称", trigger: "blur" }
    ],
    commonName: [
      { required: true, message: "请输入通用名称", trigger: "blur" }
    ],
    specification: [
      { required: true, message: "请输入药品规格", trigger: "blur" }
    ],
    partnerId: [{ required: true, message: "请选择供应商", trigger: "blur" }],
    manufacturer: [{ required: true, message: "请输入厂家", trigger: "blur" }],
    preparations: [
      { required: true, message: "请输入制剂类型", trigger: "blur" }
    ],
    dosageforms: [{ required: true, message: "请输入剂型", trigger: "blur" }]
  };

  CHINESE_addDrug: any = {};

  key = "";
  row = {};
  loading = false;
  addDrug: any = {};

  drugModel = false;
  partnerObj: any = {};
  partnerObjModel = {
    model: false,
    list: []
  };

  new_submitForm(formName) {
    let a: any = this.$refs[formName];
    a
      .validate(valid => {
        if (valid) {
          this.do_new_Submit(formName);
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

  do_new_Submit(drugType) {
    let obj = null;
    if (drugType === "CHINESE") {
      obj = this.CHINESE_addDrug;
    } else {
      obj = this.WESTERN_addDrug;
    }
    if (this.type === "add") {
      drugApi.addYdkDrugNew(obj).then(res => {
        this.loading = false;
        if (res["retCode"]) {
          this.$emit("getGrugList");
          this.$message("新增成功");

          this.CHINESE_Model = false;
          this.WESTERN_Model = false;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
    }

    if (this.type === "edit") {
      obj.synchronousFlag = "0";
      drugApi.updateYdkDrugNew(obj).then(res => {
        this.loading = false;
        if (res["retCode"]) {
          this.$emit("getGrugList");
          this.$message("修改成功");
          this.CHINESE_Model = false;
          this.WESTERN_Model = false;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
    }
  }
  partner_loading = false;
  doaddpartner() {
    this.partner_loading = true;

    indexApi.addDrugPartner(this.partnerObj).then(res => {
      this.partner_loading = false;

      if (res["retCode"]) {
        this.queryAllPartner();
        this.$message("新增成功");
        this.partnerObjModel.model = false;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
    });
  }
  openpartnerModel() {
    this.partnerObjModel.model = !this.partnerObjModel.model;
    this.partnerObj = {};
  }

  changePartner(id) {
    let a = this.partnerList.filter((item, index) => {
      return id == item.partnerId;
    });
    this.addDrug.partnerName = a[0].partnerName;
  }

  changePartner1(id) {
    let a = this.partnerList.filter((item, index) => {
      return id == item.partnerId;
    });
    this.WESTERN_addDrug.partnerName = a[0].partnerName;
  }

  deleteDrug(index, row) {
    this.$confirm("是否删除该药品?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .deleteDrugStore({
            id: row.id
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("删除成功");
              this.$emit("getGrugList");
              this.$emit("allDrug");
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
  gocenter(index, row) {
    if (!row.id) {
      this.$alert("找不到药品");
      return;
    }
    sessionStorage.drugCenterId = row.id;
    this.$router.push("/drugcenter");
  }
  type = "add";

  changeModel(type, row) {
    this.type = type;
    this.addDrug = {};
    this.queryAllPartner();
    this.drugModel = true;
    if (row) {
      let a = {};
      Object.assign(a, row);
      this.addDrug = a;
      this.addDrug.partnerName = this.partnerList.filter(item => {
        return item.partnerId == this.addDrug.partnerId;
      })[0].partnerName;
    }
  }

  CHINESE_Model = false;
  change_CHINESE_Model(type, row) {
    this.type = type;
    this.CHINESE_addDrug = { drugType: "CHINESE", synchronousFlag: "1" };
    this.CHINESE_Model = true;
    if (row) {
      let a = {};
      Object.assign(a, row);
      this.CHINESE_addDrug = a;
    }
  }

  WESTERN_addDrug: any = {};
  WESTERN_Model = false;
  change_WESTERN_Model(type, row) {
    this.type = type;
    this.WESTERN_addDrug = { drugType: "WESTERN", synchronousFlag: "1" };
    this.queryAllPartner();
    this.WESTERN_Model = true;
    if (row) {
      let a = {};
      Object.assign(a, row);
      this.WESTERN_addDrug = a;
      this.WESTERN_addDrug.partnerName = this.partnerList.filter(item => {
        return item.partnerId == this.WESTERN_addDrug.partnerId;
      })[0].partnerName;
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
  changeStatus(item) {
    let row = {};
    Object.assign(row, item);
    row["packingunit"] = row["packingUnit"];
    if (row["drugStatus"] == "USE") {
      row["drugStatus"] = "STOP";
    } else {
      row["drugStatus"] = "USE";
    }

    indexApi.updateDrugStore(row).then(res => {
      if (res["retCode"]) {
        this.$emit("getGrugList");
        this.$emit("allDrug");
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  doSubmit() {
    // 验证
    if (!this.addDrug.sellingPrice) {
      this.$alert("请输入售价");
      return;
    }
    let a = this.addDrug.sellingPrice > 0;
    if (!a) {
      this.$alert("请输入正确的售价");
      return;
    }
    // if(!this.addDrug.guidance ){
    //   this.$alert('请输入指导价')
    //   return
    // }
    // let b = this.addDrug.guidance >0
    // if(!b){
    //   this.$alert('请输入正确的指导价')
    //   return
    // }

    this.loading = true;

    if (this.type == "add") {
      indexApi.addDrugStore(this.addDrug).then(res => {
        this.loading = false;
        if (res["retCode"]) {
          this.$message("添加药品成功");
          this.drugModel = false;
          this.$emit("getGrugList");
          this.$emit("allDrug");
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    }
    if (this.type == "edit") {
      this.addDrug["packingunit"] = this.addDrug["packingUnit"];

      indexApi.updateDrugStore(this.addDrug).then(res => {
        this.loading = false;
        if (res["retCode"]) {
          this.$message("保存成功");
          this.drugModel = false;
          this.$emit("getGrugList");
          this.$emit("allDrug");
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    }
  }
  getTbalerow(index, row) {
    this.row = row;
    this.$emit("selectRow");
  }

  partnerList = [];
  queryAllPartner() {
    indexApi.queryAllPartner({}).then(res => {
      if (res["retCode"]) {
        console.log(res.data);
        this.partnerList = res.data;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  tableTree = [];
  getdepartmenttree() {
    doctorApi.querytree().then(res => {
      console.log(res);
      if (res["retCode"]) {
        this.tableTree = res.data.children;
        console.log("获取科室树", res.data);
      } else {
        this.$alert(res["message"]);
        console.error("数据查询错误");
      }
    });
  }
  sellingPriceModel = false;
  addsellingPriceModel = false;

  addsellingPriceForm = {
    sellingPrice: "",
    remarks: ""
  };

  sumbitdeletesellingPrice(row) {
    this.$confirm("是否删除该转方价格?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .sumbitdeletesellingPrice({
            priceId: row.priceId
          })
          .then(res => {
            if (res["retCode"]) {
              this.getsellingPriceList();
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

  sellingPriceList = [];
  changesellingPriceModel() {
    this.sellingPriceModel = true;
    this.getsellingPriceList();
  }
  changeaddsellingPriceModel() {
    this.addsellingPriceForm = {
      sellingPrice: "",
      remarks: ""
    };

    this.addsellingPriceModel = true;
  }
  submitaddsellingPrice() {
    if ((this.addsellingPriceForm.sellingPrice || "") === "") {
      this.$message.warning("请输入转方价格");
      return;
    }

    indexApi
      .addsellingPrice({
        drugId: this.WESTERN_addDrug.drugId,
        sellingPrice: this.addsellingPriceForm.sellingPrice,
        remarks: this.addsellingPriceForm.remarks
      })
      .then(res => {
        if (res["retCode"]) {
          console.log(res.data);
          this.addsellingPriceModel = false;
          this.getsellingPriceList();
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
  }
  getsellingPriceList() {
    indexApi
      .getsellingPriceList({
        drugId: this.WESTERN_addDrug.drugId,
        page: 0,
        pageSize: 500
      })
      .then(res => {
        if (res["retCode"]) {
          console.log(res.data);
          this.sellingPriceList = res.data.DrugPrice;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
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