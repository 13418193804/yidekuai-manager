<template>
    <div v-bouncing="loading">
    
        
         <div style="">

          <h3>
            {{$route.path === '/consultant-manager'?'顾问管理':''}}
            {{$route.path === '/consultant'?'顾问数据':''}}
            </h3>

 <div style="padding-bottom:20px;">
<span style="margin-right:20px;">顾问人数：{{adviserCount}} 个</span>             
<span style="margin-right:20px;">订单实收金额：{{payOrderMoney}} 元</span>       
<span style="margin-right:20px;">处方数量：{{prescriptionNum}} </span>       
<span style="margin-right:20px;">实收订单数：{{payOrderNum}} </span>         
<span style="margin-right:20px;">药品销售数量：{{drugQuantityTotal}} </span>   
<span style="margin-right:20px;">失败订单数量：{{giveupOrderNum}} </span>               


            </div>
        </div>
<div style="margin-bottom:20px;">
<el-row :gutter="10">
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input v-model="name"
  placeholder="顾问姓名/医生姓名/手机号码" style="margin-top:20px;" 
  clearable>
</el-input>
  </el-col>
    <el-col :xs="8" :sm="8" :md="5" :lg="4" :xl="3">
  <el-select v-model="userStatus" placeholder="请选择状态" style="margin-top:20px;" >
                         <el-option label="全部"
                            value="">
                          </el-option>
                               <el-option
                            label="启用"
                            value="1">
                          </el-option>
                          <el-option
                            label="停用"
                            value="0">
                          </el-option>
  </el-select>
  </el-col>


  <!-- 状态 -->
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input v-model="drug"
  placeholder="药品名/通用名" style="margin-top:20px;" 
  clearable>
</el-input>
  </el-col>



 <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="min-width:360px;">
   <el-date-picker style="margin-top:20px;"
      v-model="date"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
       :picker-options="pickerOptions2">
    </el-date-picker>
  </el-col>


  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="    min-width: 325px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getConsultantList(true)">查询</el-button>
<el-button type="primary" style="margin-top:20px;" @click="changeModel('add')" v-if="$route.path === '/consultant-manager'">添加顾问</el-button>
  </el-col>
</el-row>
</div>

  <el-tabs v-model="adviserType" type="card" @tab-click="handleClick">
    <el-tab-pane v-for=" n in tabPaneList"  :label="n.label+'('+n.count+')'" :name="n.name" >
<el-table border @sort-change="sortChange"
    :data="YdkAdviser"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="adviserName"
      label="顾问姓名"  width="150">
   </el-table-column>
 <el-table-column
      prop="doctorNum" sortable="custom"
      label="管理医生数量"  width="150">
                <template slot-scope="scope">
           {{scope.row.doctorNum?scope.row.doctorNum:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="orderNum" sortable="custom"
      label="总订单数量"  width="150" >
                <template slot-scope="scope">
           {{scope.row.orderNum?scope.row.orderNum:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="orderMoney" sortable="custom"
      label="总订单金额"  width="150">
             <template slot-scope="scope">
           {{scope.row.orderMoney?scope.row.orderMoney:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="prescriptionNum" sortable="custom"
      label="总处方数量"  width="150">
            <template slot-scope="scope">
           {{scope.row.prescriptionNum?scope.row.prescriptionNum:0}}
      </template>
   </el-table-column>
   
 <el-table-column
      prop="drugNum" sortable="custom"
      label="药品种类数量"  width="150">
              <template slot-scope="scope">
           {{scope.row.drugNum?scope.row.drugNum:0}}
      </template>
   </el-table-column>
 <el-table-column
      label="顾问类型">
      <template slot-scope="scope">
           {{scope.row.adviser_type=='OUTSIDE'?'外部顾问':''}}
           {{scope.row.adviser_type=='INSIDE'?'内部顾问':''}}
      </template> 
   </el-table-column>
 <el-table-column
      label="顾问职位">
      <template slot-scope="scope">
           {{scope.row.director_state=='1'?'主管顾问':''}}
           {{scope.row.director_state=='0'?'普通顾问':''}}
      </template>
   </el-table-column>
   
     <el-table-column
      prop="up_adviser_name"
      label="上级顾问" width="150">
   </el-table-column>
      <el-table-column
      prop="up_adviser_phone"
      label="上级顾问手机号" width="150">
   </el-table-column>
  <el-table-column
      prop="userName"
      label="手机号" width="150">
   </el-table-column>

 <el-table-column
      prop="adviserAge"
      label="年龄">
   </el-table-column>

 <el-table-column
      prop="adviserSex"
      label="性别">
   </el-table-column>
 

 <el-table-column
      label="使用状态">
      <template slot-scope="scope">
       <el-tag :type="scope.row.userStatus=='1' ?'success':'info'">
               {{scope.row.userStatus=='1' ?"启用中":"已停用"}}</el-tag>
      </template>
   </el-table-column>

 <el-table-column
      prop="remark"
      label="备注"  width="180">
   </el-table-column> 
   
   <el-table-column
      prop="createDate"
      label="创建时间"  width="180">
   </el-table-column>




 <el-table-column label="操作" fixed="right"  :width="handleWidth(n.name)">
      <template slot-scope="scope">
             <el-button
          size="mini"
          type="text" @click="cleanConsultantItemShelf(scope.row)"
      >医生统计</el-button>
    
    		<el-button size="small" type="text" @click="openNotBindDoctorModel(scope.row)" v-if="$route.path === '/consultant-manager'">分配医生</el-button>
        <el-button
          size="mini"
          type="text" @click="adviserGetDrugDoRow(scope.row)"
        >药品统计</el-button>
        <el-button
          size="mini"
          type="text"
          @click="changeModel('edit',scope.row)" v-if="$route.path === '/consultant-manager'">编辑</el-button>
        <el-button type="text"  style="margin-top:20px;" @click="viewBigIcon(scope.row.qrcode,scope.row.adviserName ,scope.row.userName)">二维码</el-button>
         <el-button @click="doDelete(scope.row)"
          size="mini"
          type="text" v-if="$route.path === '/consultant-manager'"
        >删除</el-button>
              <el-button @click="getAdviserLeverObj(scope.row)"
          size="mini"
          type="text" v-if="n.name === 'DIRECTOR'"
        >查看顾问</el-button>




      </template>
    </el-table-column>
</el-table>
<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next"  :current-page="page+1" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>
    </el-tab-pane>
</el-tabs>


<!--    ========================                    弹窗                ======================     -->
		<el-dialog class="min_box" width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="adviserModel"  :title="type=='add'?'新增顾问':'编辑顾问'">


   <el-form label-width="100px" ref="ruleForm" :model="adviserObj"  :rules="rules">
				<el-form-item label="顾问姓名" prop="adviserName" >
              					<el-input v-model="adviserObj.adviserName"  placeholder="请输入顾问姓名" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>
                	<el-form-item label="手机号码" prop="userName" >
              					<el-input v-if="type=='add'" v-model="adviserObj.userName"  placeholder="请输入手机号码" style="max-width:400px;min-width:200px" ></el-input>
	<span v-else>	{{adviserObj.userName}}</span>
    
    		</el-form-item>

                		<el-form-item label="年龄" prop="adviserAge" >
              					<el-input v-model="adviserObj.adviserAge"  placeholder="请输入年龄" style="max-width:400px;min-width:200px" ></el-input>
			        	</el-form-item>	

		<el-form-item label="性别" prop="adviserSex" >
             <el-radio v-model="adviserObj.adviserSex" label="男"></el-radio>
  <el-radio v-model="adviserObj.adviserSex" label="女"></el-radio>
              					<!-- <el-input v-model="adviserObj.adviserAge"  placeholder="请输入年龄" style="max-width:400px;min-width:200px" ></el-input> -->
			        	</el-form-item>	


		<el-form-item label="类型" prop="adviserTypeEnums" >
             <el-radio v-model="adviserTypeEnums" label="INSIDE">内部顾问</el-radio>
  <el-radio v-model="adviserTypeEnums" label="OUTSIDE">外部顾问</el-radio>
              					<!-- <el-input v-model="adviserObj.adviserAge"  placeholder="请输入年龄" style="max-width:400px;min-width:200px" ></el-input> -->
			        	</el-form-item>	
		<el-form-item label="顾问职位" prop="adviserTypeEnums" >
  <el-radio v-model="adviserObj.directorState1" :label="true">主管顾问</el-radio>
  <el-radio v-model="adviserObj.directorState1" :label="false">普通顾问</el-radio>
			        	</el-form-item>	
		<el-form-item label="上级顾问" v-if="!adviserObj.directorState1" >
  <el-select v-model="adviserObj.adviserDirectorId"    filterable clearable placeholder="请选择上级顾问" >
    <el-option
      v-for="item in selectdirectorList"
      :key="item.adviserId"
      :label="item.adviserName+'/'+item.phone"
      :value="item.adviserId">
    </el-option>
  </el-select>

			        	</el-form-item>	
                
                     		<el-form-item label="备注" >
              					<el-input type="textarea" v-model="adviserObj.remark"  placeholder="备注"  :rows="4" style="max-width:400px;min-width:200px" ></el-input>
			        	</el-form-item>	
                  		<el-form-item label="状态"  v-if="type!=='add'">
                   <el-radio v-model="userStatus1" :label="true">启用</el-radio>
  <el-radio v-model="userStatus1" :label="false">停用</el-radio>
        <el-button
          size="mini"  v-if="type!=='add'" style="margin-left:20px;"
          type="primary" @click="updateStatue('password',adviserObj)"
          >重置密码</el-button>
                        
			        	</el-form-item>	
                
                    </el-form >
            
  

			<span slot="footer" class="dialog-footer" >
				<el-button @click="adviserModel = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')" :disabled="loading">保 存</el-button>
			</span>
            </el-dialog>
             		<!-- <el-form-item label="医生姓名" >
              					<el-input   placeholder="请输入医生姓名" style="max-width:400px;min-width:200px" ></el-input>
			        	</el-form-item>	 -->

<!-- ==============         医生列表   ================================== -->
		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="shelfModel"  title="医生统计">
    <div v-bouncing="shelfObj.loading">
    
<el-row :gutter="10" style="margin-bottom:20px;">



 <el-col :xs="16" :sm="24" :md="6" :lg="8" :xl="5" style="min-width:200px;">
  		<el-input clearable  v-model="shelfObj.name"  placeholder="请输入医生姓名/手机号码 " style="margin-top:20px;max-width:400px;min-width:200px" ></el-input>
  </el-col>

 <el-col :xs="16" :sm="24" :md="6" :lg="8" :xl="5" style="min-width:470px;">
  	<el-date-picker v-model="shelfObj.startcreateDate" type="date" placeholder="开始日期" style="margin-top:20px;"  >
						</el-date-picker>
						<el-date-picker v-model="shelfObj.endcreateDate" type="date" placeholder="结束日期" style="margin-top:20px;"  >
						</el-date-picker>
  </el-col>

  <!-- 状态、 注册时间  -->
  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="    min-width: 225px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="consultantItemShelf(shelfObj.row,true)">查询</el-button>
  </el-col>
</el-row>



<el-table border
    :data="shelfObj.DocterInfo"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="name"
      label="医生姓名">
   </el-table-column>

  <el-table-column
      prop="orderMoney"
      label="订单金额" width="150">
   </el-table-column>
  <el-table-column
      prop="prescriptionNum"
      label="处方数">
   </el-table-column>
  <el-table-column
      prop="drugNum"
      label="药品种类">
   </el-table-column>
  <el-table-column
      prop="memberNum"
      label="总患者数">
   </el-table-column>

     <el-table-column
      prop="shelfNumber"
      label="货架号">
   </el-table-column>

  <el-table-column
      prop="phone"
      label="电话号码" width="150">
   </el-table-column>
  <el-table-column
      prop="hspCode"
      label="医疗机构代码">
   </el-table-column>
     <el-table-column
      prop="hospitalName"
      label="医院" width="150">
   </el-table-column>
  <el-table-column
      prop="hospitalDepartment"
      label="科室">
   </el-table-column>



     <el-table-column
      prop="createrTime"
      label="创建时间" width="150">
   </el-table-column>



    <el-table-column
      label="操作" fixed="right"  width="100">

     <template slot-scope="scope" >
        <el-button @click="adviserNotBindDoctor(scope.row)"
          size="mini"
          type="text"
         >取消绑定</el-button>
    
      </template>
   </el-table-column>


</el-table>

		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next"  :current-page="shelfObj.page+1" :page-size="shelfObj.pageSize" :total="shelfObj.total" @current-change="shelfObj.onPageChange">
			</el-pagination>
		</el-col>
    </div>
            </el-dialog>



<!-- =============      添加绑定的医生   ================ -->
		<el-dialog width= "70vw" :close-on-click-modal="false" :append-to-body="true" :visible.sync="notBindDoctorObj.model"  title="分配医生">
 <div  v-bouncing="notBindDoctorObj.addloading" >

 <el-row :gutter="10" style="margin-bottom:20px;">

 <el-col :xs="16" :sm="24" :md="6" :lg="8" :xl="5" style="min-width:400px;">
  		<el-input clearable  v-model="notBindDoctorObj.phone"  placeholder="请输入姓名/手机号/医院" style="max-width:400px;min-width:200px" ></el-input>
  </el-col>

  <!-- 状态、 注册时间  -->
  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="    min-width: 225px;">
<el-button type="primary" icon="el-icon-search"  style="" @click="openNotBindDoctorModel(notBindDoctorObj.row,true)">查询</el-button>
  </el-col>
</el-row>

<div style="min-height:500px;" >



<el-table border
    :data="notBindDoctorObj.YdkDoctor"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="name"
      label="医生姓名">
   </el-table-column>
 
   <el-table-column
      prop="phone"
      label="电话号码">
   </el-table-column>
 
  
   <el-table-column
      prop="hspCode"
      label="医疗机构代码">
   </el-table-column>
 

   <el-table-column
      prop="hospitalName"
      label="医院">
   </el-table-column>
   
   <el-table-column
      prop="hospitalDepartment"
      label="科室">
   </el-table-column>
 
    <el-table-column
      label="操作" fixed="right" width="100">

     <template slot-scope="scope" >
        <el-button @click="addDoctorbind(scope.row)"
          size="mini"
          type="text"
         >绑定</el-button>
    
      </template>
   </el-table-column>
</el-table>
</div>
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="notBindDoctorObj.page+1" :page-size="notBindDoctorObj.pageSize" :total="notBindDoctorObj.total" @current-change="notBindDoctorObj.onPageChange">
			</el-pagination>
		</el-col>
    </div>
            </el-dialog>

		<el-dialog width= "70vw" :close-on-click-modal="false" :append-to-body="true" :visible.sync="notBandAdviserObj.model"  title="分配顾问">
<div  style="min-height:600px; "  v-bouncing="notBandAdviserObj.loading"  >

<el-table border 
    :data="notBandAdviserObj.list"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="adviserName"
      label="顾问姓名"  width="150">
   </el-table-column>
 <el-table-column
      prop="doctorNum" 
      label="管理医生数量"  width="150">
                <template slot-scope="scope">
           {{scope.row.doctorNum?scope.row.doctorNum:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="orderNum" 
      label="总订单数量"  width="150" >
                <template slot-scope="scope">
           {{scope.row.orderNum?scope.row.orderNum:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="orderMoney" 
      label="总订单金额"  width="150">
             <template slot-scope="scope">
           {{scope.row.orderMoney?scope.row.orderMoney:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="prescriptionNum" 
      label="总处方数量"  width="150">
            <template slot-scope="scope">
           {{scope.row.prescriptionNum?scope.row.prescriptionNum:0}}
      </template>
   </el-table-column>
   
 <el-table-column
      prop="drugNum"
      label="药品种类数量"  width="150">
              <template slot-scope="scope">
           {{scope.row.drugNum?scope.row.drugNum:0}}
      </template>
   </el-table-column>
 <el-table-column
      label="顾问类型">
      <template slot-scope="scope">
           {{scope.row.adviser_type=='OUTSIDE'?'外部顾问':''}}
           {{scope.row.adviser_type=='INSIDE'?'内部顾问':''}}
      </template> 
   </el-table-column>

  <el-table-column
      prop="userName"
      label="手机号" width="150">
   </el-table-column>

 <el-table-column
      prop="adviserAge"
      label="年龄">
   </el-table-column>

 <el-table-column
      prop="adviserSex"
      label="性别">
   </el-table-column>
 

 <el-table-column
      label="使用状态">
      <template slot-scope="scope">
       <el-tag :type="scope.row.userStatus=='1' ?'success':'info'">
               {{scope.row.userStatus=='1' ?"启用中":"已停用"}}</el-tag>
      </template>
   </el-table-column>

 <el-table-column
      prop="remark"
      label="备注"  width="180">
   </el-table-column>




   <el-table-column label="操作" fixed="right"  >
      <template slot-scope="scope">


       <el-button @click="adviserBindAdviser(scope.row)"
          size="mini"
          type="text"
         >绑定</el-button>
    
      </template>
    </el-table-column>
</el-table>
<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next"  :current-page="notBandAdviserObj.page+1" :page-size="notBandAdviserObj.pageSize" :total="notBandAdviserObj.total" @current-change="notBandAdviserObj.onPageChange">
			</el-pagination>
		</el-col>
</div>
            </el-dialog>




		<el-dialog width= "70vw" :close-on-click-modal="false" :append-to-body="true" :visible.sync="adviserLeverObj.model"  title="查看顾问">

    <el-button type="primary" size="mini" @click="getnotBandAdviserChangeModel()" style="margin-bottom: 15px;">分配顾问</el-button>

<div  style="min-height:600px; "  v-bouncing="adviserLeverObj.loading"  >
<el-table border 
    :data="adviserLeverObj.list"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="adviserName"
      label="顾问姓名"  width="150">
   </el-table-column>
 <el-table-column
      prop="doctorNum" 
      label="管理医生数量"  width="150">
                <template slot-scope="scope">
           {{scope.row.doctorNum?scope.row.doctorNum:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="orderNum" 
      label="总订单数量"  width="150" >
                <template slot-scope="scope">
           {{scope.row.orderNum?scope.row.orderNum:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="orderMoney" 
      label="总订单金额"  width="150">
             <template slot-scope="scope">
           {{scope.row.orderMoney?scope.row.orderMoney:0}}
      </template>
   </el-table-column>
 <el-table-column
      prop="prescriptionNum" 
      label="总处方数量"  width="150">
            <template slot-scope="scope">
           {{scope.row.prescriptionNum?scope.row.prescriptionNum:0}}
      </template>
   </el-table-column>
   
 <el-table-column
      prop="drugNum"
      label="药品种类数量"  width="150">
              <template slot-scope="scope">
           {{scope.row.drugNum?scope.row.drugNum:0}}
      </template>
   </el-table-column>
 <el-table-column
      label="顾问类型">
      <template slot-scope="scope">
           {{scope.row.adviser_type=='OUTSIDE'?'外部顾问':''}}
           {{scope.row.adviser_type=='INSIDE'?'内部顾问':''}}
      </template> 
   </el-table-column>

  <el-table-column
      prop="userName"
      label="手机号" width="150">
   </el-table-column>

 <el-table-column
      prop="adviserAge"
      label="年龄">
   </el-table-column>

 <el-table-column
      prop="adviserSex"
      label="性别">
   </el-table-column>
 

 <el-table-column
      label="使用状态">
      <template slot-scope="scope">
       <el-tag :type="scope.row.userStatus=='1' ?'success':'info'">
               {{scope.row.userStatus=='1' ?"启用中":"已停用"}}</el-tag>
      </template>
   </el-table-column>

 <el-table-column
      prop="remark"
      label="备注"  width="180">
   </el-table-column>




   <el-table-column label="操作" fixed="right"  >
      <template slot-scope="scope">


       <el-button @click="adviserNotBindAdviser(scope.row)"
          size="mini"
          type="text"
         >取消绑定</el-button>
    
      </template>
    </el-table-column>



</el-table>
<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next"  :current-page="adviserLeverObj.page+1" :page-size="adviserLeverObj.pageSize" :total="adviserLeverObj.total" @current-change="adviserLeverObj.onPageChange">
			</el-pagination>
		</el-col>
</div>

            </el-dialog>





<!-- ==============        顾问查药品   ================================== -->
		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="drugObj.model"  title="药品统计">

<div class="flex" v-bouncing="loading" >

    <div class="fontfilter " :class="fontType=='day'?'filtercheck':''" @click="checkTime('day')">本日</div>
    <div class="fontfilter" :class="fontType=='week'?'filtercheck':''" @click="checkTime('week')">本周</div>
    <div class="fontfilter" :class="fontType=='month'?'filtercheck':''" @click="checkTime('month')">本月</div>

</div>

 <el-row :gutter="10" style="margin-bottom:20px;">

 <el-col :xs="16" :sm="24" :md="6" :lg="8" :xl="5" style="min-width:470px;">
  	<el-date-picker v-model="drugObj.startcreateDate" type="date" placeholder="开始日期" style="margin-top:20px;"  >
						</el-date-picker>
						<el-date-picker v-model="drugObj.endcreateDate" type="date" placeholder="结束日期" style="margin-top:20px;"  >
						</el-date-picker>
  </el-col>

  <!-- 状态、 注册时间  -->
  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="    min-width: 225px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="adviserGetDrug(drugObj.row,true)">查询</el-button>
  </el-col>
</el-row>

<el-table border
    :data="drugObj.DrugInfo"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="drugName"
      label="通用名"  width="180">
   </el-table-column>

  <el-table-column
      prop="productName"
      label="商品名">
   </el-table-column>

  <el-table-column
      prop="doctorNum"
      label="货架号数量">
   </el-table-column>
   
     <el-table-column
      prop="memberNum"
      label="购药人次">
   </el-table-column>
   
     <el-table-column
      prop="orderNum"
      label="订单数">
   </el-table-column>
      
     <el-table-column
      prop="totalMoney"
      label="总金额">
   </el-table-column>
</el-table>

  <el-table-column
      prop="manufacturer"
      label="生产厂家">
   </el-table-column>

  <el-table-column
      prop="specification"
      label="规格">
   </el-table-column>

  <el-table-column
      prop="dosageforms"
      label="剂型">
   </el-table-column>

  <el-table-column
      prop="price"
      label="单价">
   </el-table-column>


     <el-table-column
      prop="totalQuantity"
      label="数量">
   </el-table-column>

   
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="drugObj.page+1" :page-size="drugObj.pageSize" :total="drugObj.total" @current-change="drugObj.onPageChange">
			</el-pagination>
		</el-col>
            </el-dialog>













 <el-dialog  :visible.sync="viewBig"  title="顾问二维码">
   <div style="text-align:center;">
   <img :src="bigIcon" style="width:300px;height:300px;" >
      <div style="    margin: 20px;font-size: 16px;">{{adviserObj1.adviserName}} {{adviserObj1.userName}}</div>

   </div>



    </el-dialog>
    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import moment from "moment";
import * as indexApi from "../../api/indexApi";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  loading = false;
  adviserObj1 :any={

  }
  viewBigIcon(qrcode,adviserName,userName) {
    this.bigIcon = qrcode;
    this.viewBig = true;
this.adviserObj1 = {
  adviserName:adviserName,userName:userName
}
  }
  bigIcon = "";
  viewBig = false;

  handleWidth(name) {
    if (this.$route.path === "/consultant-manager") {
      if (name === "DIRECTOR") {
        return "430";
      } else {
        return "400";
      }
    } else {
      if (name === "DIRECTOR") {
        return "280";
      } else {
        return "200";
      }
    }
  }

  pickerOptions2 = {
    shortcuts: [
      {
        text: "本月",
        onClick(picker) {
          picker.$emit("pick", [
            window["mmvue"].getMonth1(),
            moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"
          ]);
        }
      },
      {
        text: "本周",
        onClick(picker) {
          picker.$emit("pick", [
            window["mmvue"].getWeek(),
            moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"
          ]);
        }
      },
      {
        text: "本日",
        onClick(picker) {
          picker.$emit("pick", [
            window["mmvue"].getToday(),
            moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"
          ]);
        }
      }
    ]
  };

  adviserLeverObj: any = {
    model: false,
    row: {},
    page: 0,
    pageSize: 10,
    total: 0,
    list: [],
    loading: false,
    onPageChange: page => {
      this.shelfObj.page = page - 1;
      this.getAdviserLeverObjList(this.adviserLeverObj.row);
    }
  };
  getAdviserLeverObj(row) {
    this.adviserLeverObj.model = !this.adviserLeverObj.model;
    this.getAdviserLeverObjList(row, true);
  }
  getAdviserLeverObjList(row, filter = null) {
    this.adviserLeverObj.loading = true;
    this.adviserLeverObj.row = row;
    if (filter) {
      this.adviserLeverObj.page = 0;
    }
    indexApi
      .getConsultantList1({
        adviserDirectorId: this.adviserLeverObj.row.adviserId,
        page: this.adviserLeverObj.page,
        pageSize: this.adviserLeverObj.pageSize
      })
      .then(res => {
        this.adviserLeverObj.loading = false;

        if (res["retCode"]) {
          this.adviserLeverObj.list = res.data.AdviserInfo;
          this.adviserLeverObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          return;
        }
      });
  }

  tabPaneList = [
    {
      label: "内部顾问",
      name: "INSIDE",
      count:0
    },
    {
      label: "外部顾问",
      name: "OUTSIDE",
      count:0
    },
    {
      label: "主管顾问",
      name: "DIRECTOR",
      count:0
    }
  ];
  handleClick(e) {
    this.getConsultantList(true);
  }

  page = 0;
  pageSize = 10;
  orderByStr = "";
  total = 0;
  name = "";
  drug = "";
  userStatus = "";
  onPageChange(page) {
    this.page = page - 1;
    this.getConsultantList();
  }

  adviserType = "INSIDE";
  YdkAdviser = [];

  date = [];
outsideNum = 0;
insideNum = 0
directorNum = 0


  getConsultantList(filter = null) {
    if (filter) {
      this.page = 0;
    }

    let data = {
      page: this.page,
      pageSize: this.pageSize,
      adviserType: this.adviserType,
      userStatus: this.userStatus,
      name: this.name,
      drug: this.drug,
      startcreateDate:
        this.date && this.date.length > 0
          ? moment(this.date[0]).format("YYYY-MM-DD") + " 00:00:00"
          : "",
      endcreateDate:
        this.date && this.date.length > 0
          ? moment(this.date[1]).format("YYYY-MM-DD") + " 23:59:59"
          : "",
      orderByStr: this.orderByStr
    };
    this.loading = true;

    indexApi.getConsultantList1(data).then(res => {
      if (res["retCode"]) {
        this.YdkAdviser = res.data.AdviserInfo;
        this.total = res.data.page.total;
         this.tabPaneList[1].count = res.data.AdviserTypeTotalInfo.outsideNum? res.data.AdviserTypeTotalInfo.outsideNum:0
        this.tabPaneList[0].count = res.data.AdviserTypeTotalInfo.insideNum? res.data.AdviserTypeTotalInfo.insideNum:0
          this.tabPaneList[2].count = res.data.AdviserTypeTotalInfo.directorNum? res.data.AdviserTypeTotalInfo.directorNum:0

        this.loading = false;
        if (res.data.TotalInfo.length > 0) {
          this.orderMoney = res.data.TotalInfo[0].orderMoney
            ? res.data.TotalInfo[0].orderMoney
            : 0;
          this.payOrderMoney = res.data.TotalInfo[0].payOrderMoney
            ? res.data.TotalInfo[0].payOrderMoney
            : 0;
          this.prescriptionNum = res.data.TotalInfo[0].prescriptionNum
            ? res.data.TotalInfo[0].prescriptionNum
            : 0;
          this.orderNum = res.data.TotalInfo[0].orderNum
            ? res.data.TotalInfo[0].orderNum
            : 0;
          this.payOrderNum = res.data.TotalInfo[0].payOrderNum
            ? res.data.TotalInfo[0].payOrderNum
            : 0;
          this.allAdviserNum = res.data.TotalInfo[0].allAdviserNum
            ? res.data.TotalInfo[0].allAdviserNum
            : 0;
          this.drugNum = res.data.TotalInfo[0].drugNum
            ? res.data.TotalInfo[0].drugNum
            : 0;
          this.drugQuantityTotal = res.data.TotalInfo[0].drugQuantityTotal
            ? res.data.TotalInfo[0].drugQuantityTotal
            : 0;
          this.giveupOrderNum = res.data.AdviserInfo[0].giveupOrderNum
            ? res.data.AdviserInfo[0].giveupOrderNum
            : 0;
        }
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        this.loading = false;
        return;
      }
    });
  }
  payOrderMoney = 0;
  orderMoney = 0;
  prescriptionNum = 0;
  payOrderNum = 0;
  orderNum = 0;
  allAdviserNum = 0;
  drugNum = 0;
  drugQuantityTotal = 0;
  giveupOrderNum = 0;

  adviserObj: any = {};
  type = "add";
  adviserModel = false;

  changeModel(type, row) {
    this.getConsultantList1();
    this.adviserTypeEnums = "";
    this.type = type;
    if (type == "add") {
      this.adviserObj = {};
    } else {
      let a = {};
      if (!row.directorState1) {
        row.adviserDirectorId = row.upId;
      }

      row.directorState1 = row.director_state == "1" ? true : false;
      Object.assign(a, row);
      this.adviserObj = a;
      this.userStatus1 = this.adviserObj.userStatus == "1" ? true : false;
      this.adviserTypeEnums = row.adviser_type;
    }

    this.adviserModel = true;
  }

  selectdirectorList = [];
  getConsultantList1() {
    indexApi
      .getConsultantList1({
        adviserType: "DIRECTOR",
        page: 0,
        pageSize: 1000
      })
      .then(res => {
        if (res["retCode"]) {
          //列表

          this.selectdirectorList = res.data.AdviserInfo;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  adviserTypeEnums: string = "";
  userStatus1: boolean = false;
  doSubmit() {
    if ((this.adviserObj.adviserName || "") == "") {
      this.$message("请填写顾问姓名");
      return;
    }
    if ((this.adviserObj.userName || "") == "") {
      this.$message("请填写顾问手机号码");
      return;
    }
    if ((this.adviserTypeEnums || "") == "") {
      this.$message("请选择顾问类型");
      return;
    }

    this.adviserObj.userStatus = this.userStatus1 ? "1" : "0";
    if (this.adviserObj.directorState1 === false) {
      if ((this.adviserObj.adviserDirectorId || "") === "") {
        this.$message("请选择上级顾问");
        return;
      }
      this.adviserObj.directorState = "0";
    } else {
      this.adviserObj.directorState = "1";
    }

    this.adviserObj.adviserTypeEnums = this.adviserTypeEnums;

    this.loading = true;
    if (this.type == "add") {
      this.adviserObj["userPassword"] = "123456";
      this.adviserObj["userStatus"] = "";

      indexApi.addConsultantItem(this.adviserObj).then(res => {
        this.loading = false;
        if (res["retCode"]) {
          this.adviserModel = false;
          this.$message("新增成功");
          this.getConsultantList();
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    }
    if (this.type == "edit") {
      indexApi.updateConsultantItem(this.adviserObj).then(res => {
        this.loading = false;
        if (res["retCode"]) {
          this.adviserModel = false;
          this.$message("保存成功");
          this.getConsultantList();
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
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
  updateStatue(status, row) {
    if (status == "status") {
      let a = row.userStatus == "1" ? "0" : "1";
      this.updateCenter(
        {
          adviserId: row.adviserId,
          userStatus: a
        },
        res => {
          if (res) {
            this.getConsultantList();
          }
        }
      );
    }

    if (status == "password") {
      this.$confirm("此操作将重置该顾问的密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateCenter(
            {
              adviserId: row.adviserId,
              userPassword: "123456"
            },
            res => {
              if (res) {
                this.$alert("重置成功,初始化密码为：123456");
                this.getConsultantList();
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
  updateCenter(obj, callback) {
    indexApi.updateConsultantItem(obj).then(res => {
      this.loading = false;
      if (res["retCode"]) {
        callback(true);
      } else {
        callback(false);
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
    });
  }

  doDelete(row) {
    this.$confirm("此操作将删除该顾问, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        indexApi
          .deleteConsultantItem({
            adviserId: row.adviserId
          })
          .then(res => {
            this.loading = false;
            if (res["retCode"]) {
              this.$message("删除成功");
              this.getConsultantList();
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
          message: "已取消删除"
        });
      });
  }

  /**
   * consultantItemShelf  顾问查医生列表
   */

  shelfModel = false;
  shelfObj = {
    DocterInfo: [],
    loading: false,
    name: "",
    page: 0,
    pageSize: 10,
    total: 0,
    startcreateDate: "",
    endcreateDate: "",
    onPageChange: page => {
      this.shelfObj.page = page - 1;
      this.consultantItemShelf(this.shelfObj.row);
    },
    row: {}
  };
  cleanConsultantItemShelf(row) {


if(this.date&&this.date.length>0){
    this.shelfObj.startcreateDate = this.date[0];
    this.shelfObj.endcreateDate = this.date[1];
}

    this.shelfObj.name = "";
    this.consultantItemShelf(row, true);
  }
  consultantItemShelf(row, filter = null) {
    this.shelfObj.loading = true;
    this.shelfObj.row = row;
    if (filter) {
      this.shelfObj.page = 0;
    }
    let startCreatTime = "";
    let endCreatTime = "";
    if ((this.shelfObj.startcreateDate || "") != "") {
      startCreatTime =
        moment(this.shelfObj.startcreateDate).format("YYYY-MM-DD") +
        " 00:00:00";
    }
    if ((this.shelfObj.endcreateDate || "") != "") {
      endCreatTime =
        moment(this.shelfObj.endcreateDate).format("YYYY-MM-DD") + " 23:59:59";
    }

    indexApi
      .adviserGetDoctor({
        adviserId: row.adviserId,
        name: this.shelfObj.name,
        page: this.shelfObj.page,
        pageSize: this.shelfObj.pageSize,
        startcreateDate: startCreatTime,
        endcreateDate: endCreatTime
      })
      .then(res => {
        this.shelfObj.loading = false;
        this.shelfModel = true;
        if (res["retCode"]) {
          this.shelfObj.DocterInfo = res.data.DocterInfo;
          this.shelfObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }

  adviserNotBindDoctor(row) {
    this.$confirm("该操作对医生取消绑定状态, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.shelfObj.loading = true;

        indexApi
          .adviserNotBindDoctor({
            doctorId: row.doctorId,
            adviserTypeEnums: this.shelfObj.row["adviser_type"]
          })
          .then(res => {
            this.shelfObj.loading = false;
            if (res["retCode"]) {
              this.$message("取消绑定成功");
              this.consultantItemShelf(this.shelfObj.row);
              this.getConsultantList();
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
          message: "已取消删除"
        });
      });
  }

  /**
   * getConsultantList
   *  未绑定顾问 搜索 与 绑定
   *
   */
  notBandAdviserObj = {
    model:false,
    loading: false,
    list: [],
    page: 0,
    pageSize: 10,
    total: 0,
    onPageChange: page => {
      this.notBandAdviserObj.page = page - 1;
      this.getnotBandAdviserList();
    },
    row: {}
  };

  getnotBandAdviserChangeModel() {
      this.notBandAdviserObj.model = true
    this.getnotBandAdviserList(true);
  }

  getnotBandAdviserList(filter = null) {
    this.notBandAdviserObj.loading = true;

    if (filter) {
      this.notBandAdviserObj.page = 0;
    }
    indexApi
      .getConsultantList1({
        adviserType: "UNDISTRIBUTE",
        page: this.notBandAdviserObj.page,
        pageSize: this.notBandAdviserObj.pageSize
      })
      .then(res => {
        this.notBandAdviserObj.loading = false;
        if (res["retCode"]) {
          this.notBandAdviserObj.list = res.data.AdviserInfo;
          this.notBandAdviserObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          return;
        }
      });
  }

adviserBindAdviser(row){

    this.$confirm("是否绑定该顾问?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.notBandAdviserObj.loading = true;
        indexApi
          .updateConsultantItem({
            adviserId: row["adviserId"],
            adviserDirectorId: this.adviserLeverObj.row["adviserId"],
          })
          .then(res => {
            this.notBandAdviserObj.loading = false;
            if (res["retCode"]) {
              this.$message("绑定成功");
              this.getnotBandAdviserList();
              this.getAdviserLeverObjList(this.adviserLeverObj.row)
              this.getConsultantList();
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

  adviserNotBindAdviser(row) {
    this.$confirm("该操作取消绑定顾问上下级关系, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.adviserLeverObj.loading = true;
        indexApi
          .deleteAdviserDirector({
            adviserMemberId: row.adviserMemberId
          })
          .then(res => {
            this.adviserLeverObj.loading = false;
            if (res["retCode"]) {
              this.$message("取消绑定成功");
              this.getAdviserLeverObjList(this.adviserLeverObj.row);
              this.getConsultantList();
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
          message: "已取消删除"
        });
      });
  }

  /**
   * notBindDoctorModel
   *  未绑定医生 搜索 与 绑定
   */

  notBindDoctorObj = {
    model: false,
    loading: false,
    addloading: false,
    doctorObj: null,
    YdkDoctor: [],
    phone: "",
    labelList: [
      {
        label: "医生姓名",
        prop: "name"
      },
      {
        label: "电话号码",
        prop: "phone"
      },
      {
        label: "医疗机构代码",
        prop: "hspCode"
      },
      {
        label: "医院",
        prop: "hospitalName"
      },
      {
        label: "科室",
        prop: "hospitalDepartment"
      }
    ],
    page: 0,
    pageSize: 10,
    total: 0,
    onPageChange: page => {
      this.notBindDoctorObj.page = page - 1;
      this.openNotBindDoctorModel(this.notBindDoctorObj.row);
    },
    row: {}
  };

  cleanOpenNotBindDoctorModel(row) {
    this.notBindDoctorObj["phone"] = "";
    this.openNotBindDoctorModel(row);
  }
  openNotBindDoctorModel(row, filter = null) {
    if (filter) {
      this.notBindDoctorObj.page = 0;
    }
    this.notBindDoctorObj.row = row;
    this.notBindDoctorObj.model = true;
    this.notBindDoctorObj.loading = true;
    indexApi
      .notBindDoctor({
        phone: this.notBindDoctorObj["phone"],
        adviserTypeEnums: row.adviser_type,
        page: this.notBindDoctorObj.page,
        pageSize: this.notBindDoctorObj.pageSize
      })
      .then(res => {
        this.notBindDoctorObj.loading = false;
        if (res["retCode"]) {
          this.notBindDoctorObj.YdkDoctor = res.data.YdkDoctor;
          this.notBindDoctorObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
        }
      });
  }

  /**
   *
   * 分配医生
   */

  addDoctorbind(row) {
    this.$confirm("是否绑定该医生?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.notBindDoctorObj.addloading = true;
        indexApi
          .adviserBindDoctor({
            adviserid: this.notBindDoctorObj.row["adviserId"],
            doctorid: row["doctorId"],
            adviserTypeEnums: this.notBindDoctorObj.row["adviser_type"]
          })
          .then(res => {
            this.notBindDoctorObj.addloading = false;
            if (res["retCode"]) {
              this.$message("绑定成功");
              this.openNotBindDoctorModel(this.notBindDoctorObj.row);
              this.getConsultantList();
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

  /**
   *
   * 顾问查药品
   */
  drugObj = {
    model: false,
    DrugInfo: [],
    startcreateDate: "",
    endcreateDate: "",
    page: 0,
    pageSize: 10,
    total: 0,

    onPageChange: page => {
      this.drugObj.page = page - 1;
      this.adviserGetDrug(this.drugObj.row);
    },
    row: {}
  };
  checkTime(fontType) {
    this.fontType = fontType;
    this.adviserGetDrug(this.drugObj.row);
  }

  adviserGetDrugDoRow(row) {
    this.fontType = "";
if(this.date&&this.date.length>0){
    this.drugObj.startcreateDate = this.date[0];
    this.drugObj.endcreateDate = this.date[1];
}
    this.fontType = "month";
    this.adviserGetDrug(row);
  }
  adviserGetDrug(row, filter = null) {
    this.loading = true;
    this.drugObj.row = row;

    if (filter) {
      this.drugObj.page = 0;
      this.fontType = "";
    }
    let startCreatTime = "";
    let endCreatTime = "";
    if (this.fontType == "day") {
      startCreatTime = this.getToday();
      endCreatTime = moment(new Date()).format("YYYY-MM-DD") + " 23:59:59";
    } else if (this.fontType == "week") {
      startCreatTime = this.getWeek();
      endCreatTime = moment(new Date()).format("YYYY-MM-DD") + " 23:59:59";
    } else if (this.fontType == "month") {
      startCreatTime = this.getMonth1();
      endCreatTime = moment(new Date()).format("YYYY-MM-DD") + " 23:59:59";
    } else {
      if ((this.drugObj.startcreateDate || "") != "") {
        startCreatTime =
          moment(this.drugObj.startcreateDate).format("YYYY-MM-DD") +
          " 00:00:00";
      }
      if ((this.drugObj.endcreateDate || "") != "") {
        endCreatTime =
          moment(this.drugObj.endcreateDate).format("YYYY-MM-DD") + " 23:59:59";
      }
    }
    indexApi
      .adviserGetDrug({
        adviserId: row.adviserId,
        page: this.drugObj.page,
        pageSize: this.drugObj.pageSize,
        startcreateDate: startCreatTime,
        endcreateDate: endCreatTime
      })
      .then(res => {
        this.loading = false;
        this.drugObj.model = true;
        if (res["retCode"]) {
          this.drugObj.DrugInfo = res.data.DrugInfo;
          this.drugObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }
  adviserCount = 0;
  getAdviserCount() {
    indexApi.getAdviserCount({}).then(res => {
      if (res["retCode"]) {
        this.adviserCount = res.data.num;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
      }
    });
  }

  getWeek() {
    //按周日为一周的最后一天计算
    var date = new Date();

    //今天是这周的第几天
    var today = date.getDay();

    //上周日距离今天的天数（负数表示）
    var stepSunDay = -today + 1;

    // 如果今天是周日
    if (today == 0) {
      stepSunDay = -7;
    }

    // 周一距离今天的天数（负数表示）
    var stepMonday = 7 - today;

    var time = date.getTime();

    var monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
    var sunday = new Date(time + stepMonday * 24 * 3600 * 1000);

    //本周一的日期 （起始日期）
    var startDate = this.transferDate(monday); // 日期变换

    return startDate + " 00:00:00";
  }

  getToday() {
    return moment(new Date()).format("YYYY-MM-DD") + " 00:00:00";
  }
  getMonth1() {
    // 获取当前月的第一天
    var start = new Date();
    start.setDate(1);
    var startDate = this.transferDate(start);
    return startDate + " 00:00:00";
  }
  transferDate(date) {
    // 年
    var year = date.getFullYear();
    // 月
    var month = date.getMonth() + 1;
    // 日
    var day = date.getDate();

    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }

    var dateString = year + "-" + month + "-" + day;

    return dateString;
  }
  fontType = "";
  /**
  排序
 */
  sortChange({ column, prop, order }) {
    let desc = "";
    if (order == "descending") {
      desc += " desc";
    }

    // 管理医生数量 doctor_num 、
    // 总订单数量 order_num 、
    // 总订单金额 order_money 、
    // 总处方数量 prescription_num 、
    // 药品种类数量 drug_num 。
    switch (prop) {
      case "doctorNum":
        this.orderByStr = "doctor_num" + desc;
        break;
      case "orderNum":
        this.orderByStr = "order_num" + desc;
        break;
      case "orderMoney":
        this.orderByStr = "order_money" + desc;
        break;
      case "prescriptionNum":
        this.orderByStr = "prescription_num" + desc;
        break;
      case "drugNum":
        this.orderByStr = "drug_num" + desc;
        break;
      default:
        this.orderByStr = "";
        break;
    }
    this.getConsultantList(true);
  }

  mounted() {

if(this.$route.path === '/consultant'){
    this.date = [
      this.getMonth1(),
      moment(new Date()).format("YYYY-MM-DD") + " 23:59:59"
    ];
}


    window["mmvue"] = this;
    this.getAdviserCount();
    this.getConsultantList();
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
.fontfilter {
  height: 26px;
  width: 40px;
  border: 1px rgb(229, 229, 229) solid;
  border-radius: 5px;
  text-align: center;
  line-height: 26px;
  margin-right: 15px;
}
.fontfilter:hover {
  color: rgb(255, 0, 0);
  border-color: rgb(255, 0, 0);
  cursor: pointer;
}
.filtercheck {
  color: rgb(255, 0, 0);
  border-color: rgb(255, 0, 0);
}
</style>