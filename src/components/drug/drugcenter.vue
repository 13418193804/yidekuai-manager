<template>
    <div>
      <p style="display: flex;align-items: center;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/drug' }" >药品库管理</el-breadcrumb-item>
  <el-breadcrumb-item >用法用量管理</el-breadcrumb-item>
</el-breadcrumb>
  <el-button  @click="chengModel()" size="mini" type="primary" style="margin-left:20px;">添加用法用量</el-button>
</p>
            <div style="padding:0 20px;">


<div>

</div>
</div>

    <el-table border
    :data="centerList"
    stripe height="500"
    style="width: 100%;">

 <el-table-column  fixed="left"
      prop="usages"
      label="用法">
   </el-table-column>
   
 <el-table-column
      prop="dosage"
      label="用量">
   </el-table-column>

  <el-table-column
      prop="frequency"
      label="频次">
   </el-table-column>

   <el-table-column label="操作" fixed="right"  width="200">
      <template slot-scope="scope">
  <el-button
          size="mini"
        type="primary" 
          @click="getDetail(scope.$index, scope.row)" >详情</el-button>
          
        <el-button
          size="mini"
        type="text" icon="el-icon-delete" 
          @click="deletePreDrug(scope.$index, scope.row)" >删除</el-button>
          
      
   </template>
    </el-table-column>

  </el-table>
	<el-col :span="24" class="toolbar">

			<el-pagination  :current-page="page+1"  layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>

	<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="drugModel"  title="添加用法用量">
    	 <el-form label-width="120px" ref="ruleForm" :model="addDrug"  :rules="rules">
				<el-form-item label="用法：" prop="usages">
              					<el-input v-model="addDrug.usages"  placeholder="请输入用法" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
                		<el-form-item label="用量：" prop="dosage">
              					<el-input v-model="addDrug.dosage"  placeholder="请输入用量" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
                   		<el-form-item label="频次：" prop="frequency">
              					<el-input v-model="addDrug.frequency"  placeholder="请输入频次" style="max-width:400px;min-width:200px" ></el-input>
				</el-form-item>	
        </el-form >
			<span slot="footer" class="dialog-footer" >
				<el-button @click="drugModel = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')" >确 定</el-button>
			</span>

</el-dialog>

	<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="drugDetailModel"  title="药品详情">
<div v-bouncing="drugDetailLoading">
<div class="flex flex-warp-justify" style="marign-left:20px;">
    <div v-for="(item,index) in detailInfo" class="flex">
        <div style="height:40px;line-height:40px;min-width:120px;">
            {{item.name}}：
        </div>
        <div style="height:40px;line-height:40px;min-width:240px;">
            {{drugDetail[item.key]}}
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
import filterdrug from "./filterdrug";

@Component({
  props: {},
  components: {
    filterdrug
  }
})


export default class AddGoods extends Vue {
    
    detailInfo =[
        {name:'通用名称',key:'commonName'},
        {name:'商品名称',key:'productName'},
        {name:'供应商',key:'partnerName'},

        {name:'用法',key:'usages'},
        {name:'用量',key:'dosage'},
        {name:'频次',key:'frequency'},
        
        {name:'药品规格',key:'specification'},
        {name:'厂家',key:'manufacturer'},
        {name:'剂型',key:'dosageforms'},
        {name:'批准文号',key:'hisCode'},
        {name:'单位',key:'dosage'},
        {name:'价格',key:'sellingPrice'}
    ]


    drugDetailModel= false
    drugDetailLoading=  false
drugDetail:any = {}
    getDetail(index,row){
        this.drugDetailLoading = true
        this.drugDetail = {}
             this.drugDetailModel=true
           indexApi
      .queryDrugCenterItem({
        id:row.id
      })
      .then(res => {
        this.drugDetailLoading = false
          
        if (res["retCode"]) {

            console.log(res.data)
            this.drugDetail = res.data
       
        } else {
             this.drugDetailModel=false
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
    }

    drugModel = false
    addDrug:any={}

    rules= {
         usages:[{ required: true, message: '请输入用法', trigger: 'blur' }],
         dosage:[{ required: true, message: '请输入用量', trigger: 'blur' }],
         frequency:[{ required: true, message: '请输入频次', trigger: 'blur' }],
        //  sellingPrice:[{ required: true, message: '请输入售价', trigger: 'blur' },{ type: 'number', message: '售价必须为数字值'}],
        //  productName:[{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        //  commonName:[{ required: true, message: '请输入通用名称', trigger: 'blur' }],
        //  manufacturer:[{ required: true, message: '请输入厂家', trigger: 'blur' }],
        //  preparations:[{ required: true, message: '请输入制剂类型', trigger: 'blur' }],
        //  dosage:[{ required: true, message: '请输入剂型', trigger: 'blur' }],
        }


insertDrugById(){

    //验证
if((this.addDrug.usages||'')==''){
    this.$alert('请输入用法')
    return 
}

if((this.addDrug.dosage||'')==''){
    this.$alert('请输入用量')
    return 
}

if((this.addDrug.frequency||'')==''){
    this.$alert('请输入频次')
    return 
}


Object.assign(this.addDrug,{id: this.drugCenterId,})
    indexApi
      .insertDrugById(this.addDrug)
      .then(res => {
        if (res["retCode"]) {
            console.log(res.data)
this.$message('添加成功')
            this.queryDrugCenterList()
this.drugModel = false
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });

}

   submitForm(formName) {
     let a:any =this.$refs[formName];
        a.validate((valid) => {
          if (valid) {
              this.insertDrugById()
            return false;
          } else {
    
            console.log('error submit!!');
            return false;
          }
        }).catch(error=>{
          console.log(error)
        });
        
      }

chengModel(){
    this.drugModel = true
    this.addDrug = {}
}

    deletePreDrug(index,row){

    this.$confirm("是否删除该条用法用量?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
         indexApi
      .deleteDrugCenterItem({
        id:row.id
      })
      .then(res => {
        if (res["retCode"]) {
            this.$message('删除成功')
            this.queryDrugCenterList()
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

page=0
  pageSize = 10;
  total = 100;
  onPageChange(page) {
    this.page = page - 1;
      this.queryDrugCenterList();
  }

  centerList = [];
  drugCenterId = "";
  queryDrugCenterList() {
    indexApi
      .queryDrugCenterList({
        id: this.drugCenterId
      })
      .then(res => {
        if (res["retCode"]) {
          this.centerList = res.data.list;
            this.total = res.data.page.total
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }
  mounted() {
    if (!sessionStorage.drugCenterId) {
      this.$router.replace("/drug");
    }
    this.drugCenterId = sessionStorage.drugCenterId;
    this.queryDrugCenterList();
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