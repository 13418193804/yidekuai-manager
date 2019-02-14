<template>
    <div v-bouncing="loading">
        <div style="">
          <h3>转方管理
          </h3>
 <div style="padding-bottom:20px;">
<span style="margin-right:20px;">平台处方数量统计：{{allprescription}} 个</span>             
<span style="margin-right:20px;">待转方数量：{{notCount}} 个</span>        
     <el-button
          size="small"
          type="primary"
          @click="addPrescription()"  >线下订单</el-button>
            </div>
        </div>
  <el-tabs v-model="prescriptionEnums1"  @tab-click="handleClick">
    <el-tab-pane  :label="'未转方（'+notCount+'）'" name="name1">
<div style="padding-bottom:20px;">
<el-row :gutter="10" style="padding-left:80px;">
  <el-col :xs="24" :sm="16" :md="8" :lg="6" :xl="6">
   <el-input
  placeholder="姓名/处方号/手机号" style="margin-top:20px;"  v-model="key"
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
      end-placeholder="结束日期">
    </el-date-picker>
  </el-col>



  <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getprescriptionList(true)">查询</el-button>
  </el-col>
</el-row>
</div>
<transmittable @getprescriptionList="getprescriptionList" ref="transmittable"  :table="prescriptionList"  :operationType="operationType">
</transmittable>
    </el-tab-pane>

    <el-tab-pane :label="`直接开方（${DOC_HANDWORK}）`" name="name3">
<div style="padding-bottom:20px;">

<el-row :gutter="10" style="margin-top:20px;">
	 <el-form label-width="80px" :inline="true" >
  <el-col :xs="24" :sm="14" :md="12" :lg="12" :xl="12">
                <el-form-item  label="状态"  style="margin:0">
  <el-select v-model="prescriptionEnums"  >
      <el-option value="" label="全部"></el-option>
      <el-option value="NOT_TRANSLATED_PRESCRIPTION" label="未转方"></el-option>
      <el-option value="ALREADY_TRANSLATED_PRESCRIPTION" label="已转方"></el-option>
            <el-option value="ALREADY_AUDIT_PRESCRIPTION" label="已审方"></el-option>
      <el-option value="REJECT_TRANSLATED_PRESCRIPTION" label="已驳回开方"></el-option>
      <el-option value="REJECT_AUDIT_PRESCRIPTION" label="审方退回"></el-option>
    </el-select>
				</el-form-item>

  </el-col>
        </el-form>
</el-row>





<el-row :gutter="10" style="padding-left:80px;">
  <el-col :xs="24" :sm="16" :md="8" :lg="6" :xl="6">
   <el-input
  placeholder="姓名/处方号/手机号" style="margin-top:20px;"  v-model="key"
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
      end-placeholder="结束日期">
    </el-date-picker>
  </el-col>

  <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getprescriptionList(true)">查询</el-button>
  </el-col>

</el-row>
</div>

<transmittable @getprescriptionList="getprescriptionList" ref="transmittable"  :table="prescriptionList" :operationType="operationType" >
</transmittable>

    </el-tab-pane>
    <el-tab-pane :label="'在线开方24h内（'+online+'）'" name="name2">

      <transmittable @getprescriptionList="getprescriptionList" ref="transmittable"  :table="prescriptionList" :operationType="operationType">
</transmittable>

    </el-tab-pane>
    <el-tab-pane :label="'全部（'+allprescription+'）'" name="name4">
<div style="padding-bottom:20px;">


<el-row :gutter="10" style="margin-top:20px;">
	 <el-form label-width="80px" :inline="true" >
  <el-col :xs="24" :sm="14" :md="12" :lg="12" :xl="12">
                <el-form-item  label="状态"  style="margin:0">
  <el-select v-model="prescriptionEnums"  >
      <el-option value="" label="全部"></el-option>
      <el-option value="NOT_TRANSLATED_PRESCRIPTION" label="未转方"></el-option>
      <el-option value="ALREADY_TRANSLATED_PRESCRIPTION" label="已转方"></el-option>
            <el-option value="ALREADY_AUDIT_PRESCRIPTION" label="已审方"></el-option>
      <el-option value="REJECT_TRANSLATED_PRESCRIPTION" label="已驳回开方"></el-option>
      <el-option value="REJECT_AUDIT_PRESCRIPTION" label="审方退回"></el-option>
    </el-select>
				</el-form-item>
  </el-col>
        </el-form>
</el-row>


<el-row :gutter="10" style="padding-left:80px;">
  <el-col :xs="24" :sm="16" :md="8" :lg="6" :xl="6">
   <el-input
  placeholder="姓名/处方号/手机号" style="margin-top:20px;"  v-model="key"
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
      end-placeholder="结束日期">
    </el-date-picker>
  </el-col>

  <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getprescriptionList(true)">查询</el-button>
  </el-col>

</el-row>
</div>

<transmittable @getprescriptionList="getprescriptionList" ref="transmittable"  :table="prescriptionList" :operationType="operationType">
</transmittable>
    </el-tab-pane>



  </el-tabs>
		<el-col :span="24" class="toolbar">
			<el-pagination   background layout="prev, pager, next" :current-page="page+1" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>


    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import transmittable from "./transmittable";
import moment from "moment";

@Component({
  props: {},
  components: {
    transmittable
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  addPrescription() {
    (<any>this.$refs.transmittable).addPrescription("add");
  }

  get notCount() {
    return this.countPreByStatuObj["data5"]
      ? this.countPreByStatuObj["data5"].count
      : 0;
  }

  get online() {
    return this.countPreByStatuObj["data6"]
      ? this.countPreByStatuObj["data6"].count
      : 0;
  }

  allprescription = 222;
  DOC_HANDWORK = 0;
  allPrescription() {
    indexApi.allPrescription().then(res => {
      if (res["retCode"]) {
        console.log(res.data);
        this.allprescription = res.data.All;
        this.DOC_HANDWORK = res.data.DOC_HANDWORK;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  countPreByStatuObj = {};
  countPreByStatu() {
    indexApi.countPreByStatu({}).then(res => {
      if (res["retCode"]) {
        this.countPreByStatuObj = res.data;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  page = 0;
  pageSize = 10;
  total = 100;
  onPageChange(page) {
    this.page = page - 1;
    this.getprescriptionList();
  }
  handleClick(e) {
    this.date = ["", ""];
    this.key = "";
    this.page = 0;

    if (this.prescriptionEnums1 !== "name1") {
      this.prescriptionEnums = "";
    }
    this.getprescriptionList();
  }

  prescriptionList = [];
  prescriptionEnums = "";
  prescriptionEnums1 = "name1";

  date = [];
  key = "";
  operationType = "Translators";
  loading = false;

  getprescriptionList(filter = null) {
    if (filter) {
      this.page = 0;
    }

    if (this.prescriptionEnums1 == "name1") {
      this.prescriptionEnums = "NOT_TRANSLATED_OR_REJECT_AUDIT_PRESCRIPTION";
    }

    let data = {
      prescriptionEnums: this.prescriptionEnums,
      key: this.key,
      startCreatTime:
        this.date && this.date.length > 0
          ? moment(this.date[0]).format("YYYY-MM-DD") + " 00:00:00"
          : "",
      endCreatTime:
        this.date && this.date.length > 0
          ? moment(this.date[1]).format("YYYY-MM-DD") + " 23:59:59"
          : ""
    };

    if (this.prescriptionEnums1 == "name2") {
      Object.assign(data, { onlineFlag: 1 });
    }

    if (this.prescriptionEnums1 == "name3") {
      data["preTypeEnum"] = "DOC_HANDWORK";
    }

    sessionStorage.tranObject = JSON.stringify(data);
    Object.assign(data, {
      page: this.page,
      pageSize: this.pageSize
    });

    this.loading = true;
    indexApi.findPrescriptionByType(data).then(res => {
      this.loading = false;
      // this.$emit("updateYdkPrescriptionStatusNum", "NEW_PRESCRIPTION");
      this.countPreByStatu();
      if (res["retCode"]) {
        this.prescriptionList = res.data.list;

        this.total = res.data.page.total;
      } else {
        if (!res["islogin"]) {
          this.$alert(res["message"]);
        }
        console.error("数据查询错误");
      }
    });
  }
  //  NOT_TRANSLATED_PRESCRIPTION,            //未转方
  // ALREADY_TRANSLATED_PRESCRIPTION,        //已转方
  // FAIL_TRANSLATED_PRESCRIPTION,        //转方失败
  // REJECT_TRANSLATED_PRESCRIPTION,        //转方退回
  // ALREADY_TRANSLATED_PRESCRIPTION,        //已转方

  // ALREADY_AUDIT_PRESCRIPTION,             //已审方
  // FAIL_AUDIT_PRESCRIPTION,             //审方失败
  // REJECT_AUDIT_PRESCRIPTION,//审方退回

  mounted() {
    this.allPrescription();
    this.getprescriptionList();
    // Vue.component(
    //   "transmittable",
    //   // 这个 `import` 函数会返回一个 `Promise` 对象。
    //   () => {
    //         console.log('return')
    //     return ({

    //     // 需要加载的组件 (应该是一个 `Promise` 对象)
    //     component: import("./transmittable.vue"),
    //     // 异步组件加载时使用的组件
    //     // loading: LoadingComponent,
    //     // 加载失败时使用的组件
    //     // error: ErrorComponent,
    //     // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    //     delay: 5000,
    //     // 如果提供了超时时间且组件加载也超时了，
    //     // 则使用加载失败时使用的组件。默认值是：`Infinity`
    //     timeout: 12000
    //   })}
    // );
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