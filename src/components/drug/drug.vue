<template>
    <div v-bouncing="loading">

        <div >
          <h3>药品库管理
          </h3>
          
 <div style="10px;">
药品数量统计：{{alldrug}}
            </div>
        </div>



  <el-tabs v-model="drugType"  @tab-click="handleClick">
    <!-- <el-tab-pane  label="原药品库" name="drug">
      <div style="padding-bottom:20px;">
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
</el-row>
</div>

      <filterdrug ref="filterdrug" @getGrugList="getGrugList" :drugList="drugList"  @allDrug="allDrug" :drugType="drugType"></filterdrug>
    </el-tab-pane> -->
   
    <el-tab-pane  label="西药" name="WESTERN">

 <div style="padding-bottom:20px;">
<el-row :gutter="10">
  <el-col :xs="16" :sm="12" :md="8" :lg="5" :xl="5">
   <el-input
  placeholder="请输入商品名称" style="margin-top:20px;" v-model="key"
  clearable>
</el-input>
  </el-col>

  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="min-width: 250px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getGrugList(true)">查询</el-button>
<el-button type="primary"  style="margin-top:20px;" @click="change_WESTERN_Model('add',false)">新增药品</el-button>
  </el-col>
</el-row>
</div>
      <!-- 去掉用法用量 -->
      <filterdrug ref="filterdrug" @getGrugList="getGrugList" :drugList2="drugList2" @allDrug="allDrug" :drugType="drugType"></filterdrug>
    </el-tab-pane>

    <el-tab-pane  label="中药" name="CHINESE">
  
     <div style="padding-bottom:20px;">
<el-row :gutter="10">
  <el-col :xs="16" :sm="12" :md="8" :lg="5" :xl="5">
   <el-input
  placeholder="请输入商品名称" style="margin-top:20px;" v-model="key"
  clearable>
</el-input>
  </el-col>

  <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="2" style="min-width: 250px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getGrugList(true)">查询</el-button>
<el-button type="primary"  style="margin-top:20px;" @click="change_CHINESE_Model('add',false)">新增药品</el-button>
  </el-col>
</el-row>
</div>
  <filterdrug ref="filterdrug" @getGrugList="getGrugList" :drugList1="drugList1"  @allDrug="allDrug" :drugType="drugType"></filterdrug>
    </el-tab-pane>
   
  </el-tabs>

<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="page+1"   :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>

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
  alldrug = 0;

  handleClick() {


      this.getGrugList(true);

 }
  
  drugType = "WESTERN";
  
  allDrug() {
    indexApi.allDrug({}).then(res => {
      if (res["retCode"]) {
        this.alldrug = res.data;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
changeModel(type, row){
  (<any>this.$refs.filterdrug).changeModel(type, row)
}
change_CHINESE_Model(type, row){
  (<any>this.$refs.filterdrug).change_CHINESE_Model(type, row)
  
}
change_WESTERN_Model(type, row){
  (<any>this.$refs.filterdrug).change_WESTERN_Model(type, row)
  
}

  key = "";
  loading = false;
  pageSize = 10;
  total = 0;
  currentPage = 0;
  drugList = [];
  drugList1 = [];
  drugList2 = [];
  onPageChange(page) {
    this.currentPage = page - 1;
    this.getGrugList();
  }

  getGrugList(filter = null) {
    if (filter) {
      this.currentPage = 0;
    }

    let data = {};
    Object.assign(data, {
      page: this.currentPage,
      pageSize: this.pageSize
    });
    if ((this.key || "") !== "") {
      Object.assign(data, { key: this.key });
    }
    let drugType = this.drugType == "drug" ? "" : this.drugType;
    Object.assign(data, { drugType: drugType });
    this.loading = true;
    indexApi.getGrugList1(data).then(res => {
      this.loading = false;
      if (res["retCode"]) {

            this.$nextTick(() => {
          if (this.drugType == "drug") {
            this.drugList = res.data.list;
          }
          if (this.drugType == "CHINESE") {
            this.drugList1 = res.data.list;
          }
          if (this.drugType == "WESTERN") {
            this.drugList2 = res.data.list;
          }
        });


        this.total = res.data.page.total;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }

  mounted() {
    this.allDrug();
    this.getGrugList(true)
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