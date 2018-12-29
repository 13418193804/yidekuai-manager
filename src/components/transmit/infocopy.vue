
<el-table border 
    :data="preDrugList"
    stripe 
    style="width: 100%">
 



  <el-table-column fixed="left"
      prop="drugName"
      :label="row.preDrugType == 'PASTE_PRESCRIPTION'||row.preDrugType == 'CHINESE_MEDICINE'?'药材名称': '通用名'">
   </el-table-column>

  <el-table-column
      prop="productName"
      :label="row.preDrugType == 'PASTE_PRESCRIPTION'||row.preDrugType == 'CHINESE_MEDICINE'?'别名': '商品名'">
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
      label="剂型" v-if="row.preDrugType !== 'CHINESE_MEDICINE'&&row.preDrugType !== 'PASTE_PRESCRIPTION'">
   </el-table-column>

  <el-table-column
      prop="specification"
      label="药品规格">
   </el-table-column>
 
   <el-table-column
      prop="decoctingType"
      label="煎煮方式" v-if="row.preDrugType == 'PASTE_PRESCRIPTION'||row.preDrugType == 'CHINESE_MEDICINE'">
   </el-table-column>

<el-table-column
      prop="chineseType"
      label="类型(普通、贵细、毒性)"  min-width="200"  v-if="row.preDrugType == 'PASTE_PRESCRIPTION'||row.preDrugType == 'CHINESE_MEDICINE'">
   </el-table-column>



     <el-table-column width="180" 
      prop="manufacturer"
      label="厂商" v-if="row.preDrugType !== 'CHINESE_MEDICINE'&&row.preDrugType !== 'PASTE_PRESCRIPTION'">
   </el-table-column>


 <el-table-column
      prop="usages" v-if="row.preDrugType !== 'CHINESE_MEDICINE'&&row.preDrugType !== 'PASTE_PRESCRIPTION'"
      label="用法">
   </el-table-column>
 
   
 <el-table-column
      prop="dosage" v-if="row.preDrugType !== 'CHINESE_MEDICINE'&&row.preDrugType !== 'PASTE_PRESCRIPTION'"
      label="用量">
   </el-table-column>

  <el-table-column
      prop="instructions"
      label="使用说明" v-if="row.preDrugType !== 'CHINESE_MEDICINE'&&row.preDrugType !== 'PASTE_PRESCRIPTION'">
   </el-table-column>

  <el-table-column
      prop="frequency"
      label="频次" v-if="row.preDrugType !== 'CHINESE_MEDICINE'&&row.preDrugType !== 'PASTE_PRESCRIPTION' ">
   </el-table-column>
   

  <el-table-column
      prop="quantity"
      label="数量">
   </el-table-column>

  <el-table-column
      prop="price"
      label="单价">
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