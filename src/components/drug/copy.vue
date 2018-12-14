<template>
    <div >
<!-- v-bouncing="loading" -->



<el-table border v-if="drugType=='drug'"
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
         @click="changeModel('edit', scope.row)" v-promiss.edit>编辑</el-button>
      </template>
    </el-table-column>
</el-table> 






<el-table border 
    :data="drugList"
    stripe height="600"
    style="width: 100%;">

  <el-table-column  fixed="left"
      prop="commonName"
      :label="drugType=='CHINESE' ? '药材名称' :'通用名称'">
   </el-table-column>


  <el-table-column
      prop="productName"
      :label="drugType=='CHINESE' ? '别名' :'商品名称'">
   </el-table-column>


  <el-table-column
      prop="producingArea"
      label="产地"  v-if="drugType=='CHINESE'">
   </el-table-column>

<el-table-column
      prop="typeName"
      label="分类"  v-if="drugType=='CHINESE'">
   </el-table-column>

<el-table-column
      prop="specification"
      label="药品规格">
   </el-table-column>
   
<el-table-column
      prop="packingUnit"
      :label="drugType=='CHINESE' ? '单位' :'包装单位'">
   </el-table-column>

<el-table-column
      prop="takingUnit"
      label="计量单位" v-if="drugType =='WESTERN'">
   </el-table-column>


<el-table-column
      prop="partnerName"
      label="供应商" v-if="drugType!=='CHINESE'">
   </el-table-column>
   
   
<el-table-column
      prop="department"
      label="科室">
   </el-table-column>
<el-table-column
      prop="manufacturer"
      label="厂家" min-width="200" v-if="drugType!=='CHINESE'">
   </el-table-column>

<el-table-column
      prop="manufacturer"
      label="供应商" min-width="200" v-if="drugType==='CHINESE'">
   </el-table-column>

   <el-table-column
      prop="decoctingType"
      label="煎煮方式" v-if="drugType=='CHINESE'">
   </el-table-column>

<el-table-column
      prop="#"
      label="类型(普通、贵细、毒性)" v-if="drugType=='CHINESE'" min-width="200">
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
          @click="gocenter(scope.$index, scope.row)" v-if=" drugType !='WESTERN'">用法用量管理</el-button>
                             <el-button
          size="mini"
          type="text"
         @click="changeStatus(scope.row)" >{{scope.row.drugStatus == 'USE'?'停用':'启用'}}</el-button>

                <el-button
          size="mini"
          type="primary"
         @click="changeModel('edit', scope.row)" v-promiss.edit>编辑</el-button>
 
        

                  <!-- <el-button
          size="mini"
        type="text" icon="el-icon-delete" 
          @click="deleteDrug(scope.$index, scope.row)" >删除</el-button> -->



      </template>
    </el-table-column>
</el-table> 
 	
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
  components: {}
})
export default class AddGoods extends Vue {
  @Prop({ required: false })
  transmitType: boolean;

  @Prop({ required: false })
  drugType: string;
  @Prop({ required: false })
  drugList;
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
    //  packingUnit:[{ required: true, message: '请输入包装单位', trigger: 'blur' }],
    //  usage:[{ required: true, message: '请输入用法', trigger: 'blur' }],
    manufacturer: [
      { required: true, message: "请输入生产厂家", trigger: "blur" }
    ],
    //  brands:[{ required: true, message: '请输入品牌', trigger: 'blur' }],
    // { required: true, message: '请输入指导价', trigger: 'blur' }
    //  guidance:[{ required: true, message: '请输入指导价', trigger: 'blur' }, { type: 'number', message: '指导价必须为数字值'}],
    //  store:[{ required: true, message: '请输入储存方式', trigger: 'blur' }],
    preparations: [
      { required: true, message: "请输入制剂类型", trigger: "blur" }
    ],
    //  ingredient:[{ required: true, message: '请输入药品成分', trigger: 'blur' }],
    dosageforms: [{ required: true, message: "请输入剂型", trigger: "blur" }]
  };

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

  // getDrugPartner(filter = null){
  //  indexApi.getDrugPartner({}).then(res => {
  //       if (res["retCode"]) {

  //         this.partnerObjModel.list = res.data.DrugPartner

  //       } else {
  //         if(!res['islogin']){this.$alert(res["message"]);}
  //         console.error("数据查询错误");
  //       }
  //     });

  // }
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
    console.log(row);
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