<template>
    <div v-loading="loading">

        
<div style="padding-bottom:20px;border-bottom:1px #e5e5e5 solid;">
<el-row :gutter="10">
  <el-col :xs="16" :sm="12" :md="8" :lg="5" :xl="5">
   <el-input
  placeholder="请输入商品名称" style="margin-top:20px;" v-model="key"
  clearable>
</el-input>
  </el-col>

  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="min-width: 250px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getGrugList(true)">查询</el-button>
<el-button type="primary"  style="margin-top:20px;" @click="changeModel('add',false)">新增药品</el-button>
  </el-col>

  <!-- <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
<el-button type="primary" style="margin-top:20px;">导入药品</el-button>
  </el-col> -->

  
</el-row>
</div>
<el-table border 
    :data="drugList"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
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
         @click="changeModel('edit', scope.row)" >编辑</el-button>
 
        

                  <!-- <el-button
          size="mini"
        type="text" icon="el-icon-delete" 
          @click="deleteDrug(scope.$index, scope.row)" >删除</el-button> -->



      </template>
    </el-table-column>
</el-table> 
 	<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="page+1"   :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>
		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="drugModel"  :title="type=='add'?'添加药品':'编辑药品'">

	 <el-form label-width="120px" ref="ruleForm" :model="addDrug"  :rules="rules">
				<el-form-item label="商品名称：" prop="productName" >
              					<el-input v-model="addDrug.productName"  placeholder="请输入商品名称" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
        		<el-form-item label="通用名称：" prop="commonName">
              					<el-input v-model="addDrug.commonName"  placeholder="请输入通用名称" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
      	<el-form-item label="供应商：" prop="partnerName">
           <el-select v-model="addDrug.partnerId"   @change="changePartner" filterable placeholder="请选择供应商" style="max-width:400px;min-width:200px">
    <el-option
      v-for="item in partnerList"
      :key="item.partnerId"
      :label="item.partnerName"
      :value="item.partnerId"
      >
    </el-option>
  </el-select>
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

    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import * as doctorApi from "../../api/doctorApi";
import { Prop } from "vue-property-decorator";

@Component({
  props: {},
  components: {

    }
})

export default class AddGoods extends Vue {

    @Prop({ required: false })
    transmitType :boolean

    rules= {
         partnerName:[{ required: true, message: '请选择供应商', trigger: 'blur' }],
         hisCode:[{ required: true, message: '请输入批准文号', trigger: 'blur' }],
         sellingPrice:[{ required: true, message: '请输入售价', trigger: 'blur' },{ type: 'number', message: '售价必须为数字值'}],
         productName:[{ required: true, message: '请输入商品名称', trigger: 'blur' }],
         commonName:[{ required: true, message: '请输入通用名称', trigger: 'blur' }],
         specification:[{ required: true, message: '请输入药品规格', trigger: 'blur' }],
        //  packingUnit:[{ required: true, message: '请输入包装单位', trigger: 'blur' }],
        //  usage:[{ required: true, message: '请输入用法', trigger: 'blur' }],
         manufacturer:[{ required: true, message: '请输入生产厂家', trigger: 'blur' }],
        //  brands:[{ required: true, message: '请输入品牌', trigger: 'blur' }],
        // { required: true, message: '请输入指导价', trigger: 'blur' }
        //  guidance:[{ required: true, message: '请输入指导价', trigger: 'blur' }, { type: 'number', message: '指导价必须为数字值'}],
        //  store:[{ required: true, message: '请输入储存方式', trigger: 'blur' }],
         preparations:[{ required: true, message: '请输入制剂类型', trigger: 'blur' }],
        //  ingredient:[{ required: true, message: '请输入药品成分', trigger: 'blur' }],
         dosageforms:[{ required: true, message: '请输入剂型', trigger: 'blur' }],
        }

   pageSize = 10;
  total = 0;
  currentPage = 0;
  drugList = []

  key = ''
 row = {}
  loading = false
addDrug:any={}


drugModel = false

 changePartner(id){
  let a = this.partnerList.filter((item,index)=>{
     return id == item.partnerId
   })
  this.addDrug.partnerName =  a[0].partnerName
 }   

      deleteDrug(index,row){

  this.$confirm("是否删除该药品?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
     indexApi.deleteDrugStore({
   id:row.id
 }).then(res => {
      if (res["retCode"]) {
this.$message('删除成功')
this.getGrugList()
this.$emit('allDrug')
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
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
      gocenter(index,row){
      console.log(row)
      if(!row.id){
        this.$alert('找不到药品')
        return 
      }
      sessionStorage.drugCenterId = row.id
      this.$router.push('/drugcenter');

      }
    type ="add"
    changeModel(type,row){
      this.type = type
      this.addDrug = {}
      this.queryAllPartner()
      if(row){
              let a = {};
      Object.assign(a, row);
      this.addDrug = a;

      }
      this.drugModel = true
    }

    
   submitForm(formName) {
     let a:any =this.$refs[formName];
        a.validate((valid) => {
          if (valid) {
            this.doSubmit()
            return false;
          } else {
    
            console.log('error submit!!');
            return false;
          }
        }).catch(error=>{
          console.log(error)
        });
        
      }
changeStatus(item){

let row = {}
Object.assign(row,item);
row['packingunit']  = row['packingUnit'] 
  if(row['drugStatus'] == "USE"){
    row['drugStatus'] = "STOP"
  }else{
    row['drugStatus'] = "USE"
  }

 indexApi.updateDrugStore(row).then(res => {
      if (res["retCode"]) {

this.getGrugList()
this.$emit('allDrug')
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });



}
doSubmit(){

// 验证
if(!this.addDrug.sellingPrice ){
  this.$alert('请输入售价')
  return 
}
let a = this.addDrug.sellingPrice >0
if(!a){
  this.$alert('请输入正确的售价')
  return 
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


          this.loading=true

if(this.type=="add"){
 indexApi.addDrugStore(this.addDrug).then(res => {
this.loading=false
      if (res["retCode"]) {
this.$message('添加药品成功')
this.drugModel= false
this.getGrugList()
this.$emit('allDrug')
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
      }
if(this.type=="edit"){

this.addDrug['packingunit']  = this.addDrug['packingUnit'] 


 indexApi.updateDrugStore(this.addDrug).then(res => {
this.loading=false
      if (res["retCode"]) {
this.$message('保存成功')
this.drugModel= false
this.getGrugList()
this.$emit('allDrug')
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
      }

    
}
    getTbalerow(index,row){
    this.row = row
this.$emit('selectRow')
    }
    onPageChange(page) {
    this.currentPage = page - 1;
    this.getGrugList();
  }
  getGrugList(filter=null) {
    if(filter){
      this.currentPage = 0
    }
    let data = {}
    Object.assign(data,{
         page: this.currentPage,
         pageSize:this.pageSize
      })
      if((this.key||'')!==''){
        Object.assign(data,{ key :this.key})
      }
      this.loading = true
      indexApi.getGrugList1(data).then(res => {
      this.loading = false
      if (res["retCode"]) {
          this.drugList = res.data.list;
          this.total = res.data.page.total
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  partnerList= []
queryAllPartner(){
      indexApi.queryAllPartner({}).then(res => {
      if (res["retCode"]) {
        console.log(res.data)
this.partnerList = res.data
} else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
}
      tableTree=[];
    getdepartmenttree(){
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
  mounted() {
    // this.getdepartmenttree()
this.getGrugList();

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