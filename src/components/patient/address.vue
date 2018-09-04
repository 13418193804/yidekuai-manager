<template>
    <div>
<h2>收货地址</h2>
            <div style="padding:20px;">
<div>
  <el-button style="float:left;" @click="chengModel('add')" size="small" type="primary">添加地址</el-button>
</div>

<el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    style="width: 100%;" height="500" >
       <el-table-column label="是否默认" width="110">
  	<template slot-scope="scope">
      <el-tag type="info" v-if="scope.row.isdefault" size="small" >
        默认地址
               </el-tag>


				</template>
  
</el-table-column>

    <el-table-column
      property="contactName"
      label="联系人" width="110">
    </el-table-column>
 <el-table-column
      property="contactMobile"
      label="联系电话"  width="130">
    </el-table-column>
    <el-table-column
      label="地址"
       width="210">
      	<template slot-scope="scope">
				{{scope.row.province}}{{scope.row.city}}{{scope.row.country}}{{scope.row.address}}
				</template>
    </el-table-column>


	<el-table-column label="操作" width="280" fixed="right">
				<template slot-scope="scope">
					<el-button size="small"  @click="setDefault(scope.row)">设为默认</el-button>
					<el-button size="small" @click="deleteAddress(scope.row)">删除</el-button>
					<el-button size="small" @click="chengModel('update',scope.row)">修改</el-button>
				
        </template>
			</el-table-column>



  </el-table>
  

		<el-col :span="24" class="toolbar">

			<el-pagination :current-page="page+1" layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>
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

<el-row :gutter="24" >
  
  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" style="    margin-bottom: 22px;">
  
<el-select v-model="rowObject.provinceId" @change="queryCityList()">
<el-option v-for="(n,index) in provinceList" :key="index" :label="n.name" :value="n.id" ></el-option>
</el-select>
  </el-col>

  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" style="    margin-bottom: 22px;">


        <el-select v-model="rowObject.cityId" @change="queryCountryList()">
<el-option v-for="(n,index) in cityList" :key="index" :label="n.name" :value="n.id"></el-option>
</el-select>

  </el-col>

  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" style="    margin-bottom: 22px;">

        <el-select v-model="rowObject.countryId" >
<el-option v-for="(n,index) in countryList" :key="index" :label="n.name" :value="n.id"></el-option>
</el-select>
  </el-col>
</el-row>


		</div>
    		</el-form-item>


				<el-form-item label="联系地址">
					<el-input v-model="rowObject.address" maxlength="50"></el-input>
				</el-form-item>



<!-- <el-form-item label="是否默认">
<div style="float:left;">
    <el-switch
  v-model="rowObject.isDefault"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
</div>
</el-form-item> -->

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
  rowObject = {
userId:"",
    type: "add",
    addressId: "",
    showSendDialog: false,
    contactName: "",
    contactMobile: "",
    provinceId: null,
    cityId: null,
    countryId: null,
    address: "",
    isDefault: false,
    doSubmit: () => {
      console.log("提交");
      if ((this.rowObject.contactName || "") == "") {
        this.$alert("请填写收货联系人");
        return;
      }
      if ((this.rowObject.contactMobile || "") == "") {
        this.$alert("请填写收货联系号码");
        return;
      }
      if (
        (this.rowObject.provinceId || "") == "" ||
        (this.rowObject.cityId || "") == "" ||
        (this.rowObject.countryId || "") == ""
      ) {
        this.$alert("请选择地区");
        return;
      }
      if ((this.rowObject.address || "") == "") {
        this.$alert("请填写收货地址");
        return;
      }

      // this.rowObject.provinceId = parseInt(this.rowObject.provinceId);
      // this.rowObject.cityId = parseInt(this.rowObject.cityId);
      // this.rowObject.countryId = parseInt(this.rowObject.countryId);

      if (this.rowObject.type == "add") {
        ApiOrder.doAddAddress(this.rowObject).then(res => {
          this.$message("添加成功");
          this.rowObject.showSendDialog = false;
          this.queryAddress();

          console.log(res);
        });
      } else {
        ApiOrder.doUpdateAddress(this.rowObject).then(res => {
          this.$message("修改成功");
          this.rowObject.showSendDialog = false;
          this.queryAddress();

          console.log(res);
        });
      }
    }
  };

  provinceList = [];
  cityList = [];
  countryList = [];

  chengModel(type, row) {
    this.rowObject.type = type;
    if (this.rowObject.type == "add") {
      this.rowObject.contactName = "";
      this.rowObject.contactMobile = "";
      this.rowObject.provinceId = null;
      this.rowObject.cityId = null;
      this.rowObject.countryId = null;
      this.rowObject.address = "";
      this.rowObject.isDefault = false;
    } else {
      this.rowObject.isDefault = row.isdefault ? true : false;
      this.rowObject.addressId = row.addressId;
      this.rowObject.contactName = row.contactName;
      this.rowObject.contactMobile = row.contactMobile;
      this.rowObject.provinceId = row.provinceid;
      this.queryCityList();
      this.rowObject.cityId = row.cityid;
      this.queryCountryList();
      this.rowObject.countryId = row.countryid;
      this.rowObject.address = row.address;
    }
    this.rowObject.showSendDialog = true;
  }
  tableData = [];
  deleteAddress(row) {
    console.log("删除地址");
    Api.doConfirm(this, "是否要删除该地址").then(res => {
      if (res) {
        ApiOrder.deleteAddress(row.addressId).then(res => {
          this.queryAddress();
        });
      }
    });
  }
  setDefault(row) {
    ApiOrder.setDefault(row.addressId,this.rowObject.userId).then(res => {
      this.$message("设置成功");
      this.queryAddress();
    });
  }
  queryAddress() {
    ApiOrder.queryAddress(this.rowObject.userId,this.page,this.pageSize).then(res => {
      this.tableData = res.data.list;
      this.total = res.data.page.total
    });
  }
  queryCountryList() {
    this.rowObject.countryId = "";

    ApiOrder.queryCountryList(this.rowObject.cityId).then(res => {
      this.countryList = res.data.region;
    });
  }
  queryCityList() {
    this.rowObject.cityId = "";
    ApiOrder.queryCityList(this.rowObject.provinceId).then(res => {
      this.cityList = res.data.region;
    });
  }
  queryProvinceList() {
    ApiOrder.queryProvinceList().then(res => {
      this.provinceList = res.data.region;
    });
  }
 
  
page=0
  pageSize = 10;
  total = 100;
  onPageChange(page) {
    this.page = page - 1;
      this.queryAddress();
  }

  mounted() {
    if ((sessionStorage.member_id || "") != "") {
      this.rowObject.userId = sessionStorage.member_id;
    } else {
      this.$alert("找不到该患者");
      this.$router.go(-1);
      return;
    }
    this.queryAddress();
    this.queryProvinceList();
  }
}
</script>

<style  >
.el-table th div,
.el-table th > .cell {
  text-align: center;
}
</style>