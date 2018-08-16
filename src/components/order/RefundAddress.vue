<template>
    <div>
<h2>收货地址</h2>
            <div style="padding:20px;">
  
<div>
  <el-button style="float:left;" @click="chengModel('add')">添加地址</el-button>

</div>

<el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    style="width: 100%;">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="createTime"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      label="地址"
      width="320">
      	<template slot-scope="scope">
				{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.countryName}}{{scope.row.address}}
				</template>
    </el-table-column>
    <el-table-column
      property="contactName"
      label="联系人">
    </el-table-column>
 <el-table-column
      property="contactMobile"
      label="联系电话">
    </el-table-column>

<el-table-column label="是否默认">
  	<template slot-scope="scope">
				{{scope.row.isdefault ?'是':'否'}}
				</template>
  
</el-table-column>
	<el-table-column label="操作" width="380">
				<template slot-scope="scope">
					<el-button  @click="setDefault(scope.row)">设为默认</el-button>
					<el-button  @click="deleteAddress(scope.row)">删除</el-button>
					<el-button  @click="chengModel('update',scope.row)">修改</el-button>
				
        </template>
			</el-table-column>



  </el-table>
</div>


		<el-dialog :close-on-click-modal="false" :visible.sync="rowObject.showSendDialog" size="small" title="发货地址">

			 <el-form label-width="120px">
          


				<el-form-item label="联系人名称">
					<el-input v-model="rowObject.contactName" maxlength="10"></el-input>
				</el-form-item>




				<el-form-item label="联系人号码">
					<el-input v-model="rowObject.contactMobile" maxlength="20"></el-input>
				</el-form-item>


		<el-form-item label="地区">
<div style="    white-space: nowrap;overflow:hidden;">
<el-select v-model="rowObject.provinceId" @change="queryCityList()">
<el-option v-for="n in provinceList" :label="n.name" :value="n.id" ></el-option>
</el-select>

        <el-select v-model="rowObject.cityId" @change="queryCountryList()">
<el-option v-for="n in cityList" :label="n.name" :value="n.id"></el-option>
</el-select>
        <el-select v-model="rowObject.countryId" >
<el-option v-for="n in countryList" :label="n.name" :value="n.id"></el-option>
</el-select>
		</div>
    		</el-form-item>


				<el-form-item label="联系地址">
					<el-input v-model="rowObject.address" maxlength="50"></el-input>
				</el-form-item>



<el-form-item label="是否默认">
<div style="float:left;">
    <el-switch
  v-model="rowObject.isDefault"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
</div>
</el-form-item>

			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="rowObject.showSendDialog = false">取 消</el-button>
				<el-button type="primary" @click="rowObject.doSubmit">确 定</el-button>
			</span>

		</el-dialog>



    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as Api from "../../api/api";
import moment from "moment";

import * as ApiOrder from "../../api/orderapi";
@Component
export default class AddGoods extends Vue {


rowObject={
  type:'add',
  addressId:'',
  showSendDialog:false,
  contactName:'',
  contactMobile:'',
  provinceId:null,
  cityId:null,
  countryId:null,
  address:'',
  isDefault:false,
  doSubmit:()=>{
    console.log('提交')

    if((this.rowObject.contactName || '')==''){
this.$alert('请填写收货联系人')
return 
    }
 if((this.rowObject.contactMobile || '')==''){
this.$alert('请填写收货联系号码')
return 
    }
 if((this.rowObject.provinceId || '')=='' ||(this.rowObject.cityId || '')==''  ||(this.rowObject.countryId || '')==''){
this.$alert('请选择地区')
return 
    }
 if((this.rowObject.address || '')==''){
this.$alert('请填写收货地址')
return 
    }

this.rowObject.provinceId = parseInt(this.rowObject.provinceId)
this.rowObject.cityId = parseInt(this.rowObject.cityId)
this.rowObject.countryId = parseInt(this.rowObject.countryId)

if(this.rowObject.type== 'add'){
  

 ApiOrder.doAddAddress(this.rowObject).then(res => {
   this.$message('添加成功')
   this.rowObject.showSendDialog = false;
   this.queryAddress()

    console.log(res)
    });
}else{
ApiOrder.doUpdateAddress(this.rowObject).then(res => {
   this.$message('修改成功')
   this.rowObject.showSendDialog = false;
   this.queryAddress()

    console.log(res)
    });

}



  }

}

provinceList = []
cityList = []
countryList = []

chengModel(type,row){
  this.rowObject.type = type;
  if(this.rowObject.type== 'add'){
    
     this.rowObject.contactName=''
  this.rowObject.contactMobile=''
  this.rowObject.provinceId=null
  this.rowObject.cityId=null
  this.rowObject.countryId=null
  this.rowObject.address=''
  this.rowObject.isDefault=false
  }else{
    console.log(row)
  this.rowObject.isDefault=row.isdefault?true:false;
    this.rowObject.addressId=row.id;
     this.rowObject.contactName=row.contactName
  this.rowObject.contactMobile=row.contactMobile
  this.rowObject.provinceId=row.provinceId
  this.queryCityList()
  this.rowObject.cityId=row.cityId
  this.queryCountryList();
  this.rowObject.countryId=row.countryId;
  this.rowObject.address=row.address;
  }

      this.rowObject.showSendDialog = true;

}
  tableData = [];
  deleteAddress(row) {
    console.log('删除地址')
    Api.doConfirm(this, "是否要删除该地址").then(res => {
      console.log(res)
      if (res) {
        ApiOrder.deleteAddress(row.id).then(res => {
          this.queryAddress();
        });
      }
    });
  }
  setDefault(row){
        ApiOrder.setDefault(row.id).then(res => {
          this.$message('设置成功')
          this.queryAddress();
        });
  }
  queryAddress() {
    ApiOrder.queryAddress().then(res => {
      this.tableData = res.data;


    });
  }
  queryCountryList(){
this.rowObject.countryId =''
    
  ApiOrder.queryCountryList(this.rowObject.cityId).then(res => {
      this.countryList = res.data.region;
    });
  }
queryCityList(){
  console.log()

this.rowObject.cityId =''
ApiOrder.queryCityList(this.rowObject.provinceId).then(res => {
      this.cityList = res.data.region;
    });
}
  queryProvinceList(){
      ApiOrder.queryProvinceList().then(res => {
      this.provinceList = res.data.region;
    });
  }
  mounted() {
    this.queryAddress();
    this.queryProvinceList()
 }
}
</script>

<style  >
.el-table th div,
.el-table th > .cell {
  text-align: center;
}
</style>