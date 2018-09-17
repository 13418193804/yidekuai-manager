<template>
    <div v-loading="loading">

        <div style="border-bottom:1px #e5e5e5 solid;">
          <h3>在线咨询管理
          </h3>
<!--           
 <div style="{{scope.row.intouttime}}0px;">
平台患者数量统计：{{userCount}} 人              
            </div> -->

<div style="padding-bottom:20px;">
<el-row :gutter="10">
  


  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
   <el-input
  placeholder="请输入关键字" style="margin-bottom:20px;" v-model="keystr"
  clearable>
</el-input>
  </el-col>

	<el-date-picker v-model="startDate" type="date" placeholder="开始日期">
						</el-date-picker>
						<el-date-picker v-model="endDate" type="date" placeholder="结束日期">
						</el-date-picker>
						<el-button type="primary" @click="queryOnlineList(true)">查询</el-button>
<!-- //   <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">

// <el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getpatientList()">查询</el-button>
//   </el-col> -->

</el-row>
 
</div>

        </div>




<el-table border
    :data="onlineList"
    stripe
     style="width=100%;min-height:500px;">




   <el-table-column label="医院"  width="180"   fixed="left" >
      <template slot-scope="scope">
         {{scope.row.hospitalName}}
      </template>
    </el-table-column>


   <el-table-column label="医生账号"   width="150">
      <template slot-scope="scope">
{{scope.row.docterMobile}}
 </template>
    </el-table-column>

       <el-table-column label="医生姓名"   >
      <template slot-scope="scope">
{{scope.row.doctername}}

 </template>
    </el-table-column>

       <el-table-column label="医生手机号"  width="150" >
      <template slot-scope="scope">
{{scope.row.docterMobile}}

 </template>
    </el-table-column>

       <el-table-column label="患者姓名"   >
      <template slot-scope="scope">
{{scope.row.memberName}}

 </template>
    </el-table-column>
       <el-table-column label="患者手机号"  width="150" >
      <template slot-scope="scope">
{{scope.row.memberPhone
}}

 </template>
    </el-table-column>
       <el-table-column label="身份证号码"  width="180" >
      <template slot-scope="scope">
{{scope.row.idcard
}}

 </template>
    </el-table-column>
     
       <el-table-column label="患者性别"   >
      <template slot-scope="scope">
{{scope.row.
sex
}}

 </template>

    </el-table-column>


   
       <el-table-column label="付款金额"   >
      <template slot-scope="scope">
{{scope.row.money}}

 </template>
    </el-table-column>

       <el-table-column label="付款状态"   >
      <template slot-scope="scope">
{{scope.row.paystatus=='PAY_FREE'?'免费':''}}
 </template>
    </el-table-column>

       <el-table-column label="付款时间"  width="180"  >
      <template slot-scope="scope">
{{scope.row.paytime}}
 </template>
    </el-table-column>

 

       <el-table-column label="聊天内容"   width="300" >
     <template slot-scope="scope">
{{scope.row.desccontent}}
 </template>
    </el-table-column>


       <el-table-column label="更新时间"  width="180" >

     <template slot-scope="scope">
{{scope.row.updateTime}}
 </template>
    </el-table-column>

       <el-table-column label="创建时间"  width="180"  >
      <template slot-scope="scope">
{{scope.row.createtime}}
 </template>
    </el-table-column>
   <el-table-column fixed="right" label="操作" width="150">
      <template slot-scope="scope" >
        <el-button @click="cleangetInterrDetail(scope.row)" type="text" size="small">更多</el-button>
<el-popover
  placement="top"
  width="280"
  trigger="hover">
  <el-table :data="scope.row.itlist">
    <el-table-column width="100" property="money" label="咨询费"></el-table-column>
    <el-table-column width="180" property="paytime" label="支付时间"></el-table-column>
  </el-table>
  <el-button slot="reference" type="text" size="small">支付记录</el-button>
</el-popover>

      </template>
    </el-table-column>
 <!--  </el-table>
</template> -->
</el-table>
		<el-col :span="24" class="toolbar">

			<el-pagination :current-page="page+1" layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>
    <!-- <el-dialog :visible.sync="updateModel" width="{{scope.row.intouttime}}050px" center size="tiny"  title="编辑患者信息" :close-on-click-modal="false" top="40px">
  	 <el-form label-width="{{scope.row.intouttime}}20px" v-model="form">
	<el-form-item label="患者姓名" style="max-width:400px">
					<el-input placeholder="请输入患者姓名" v-model="form.name" ></el-input>
				</el-form-item>

	<el-form-item label="患者性别" style="max-width:400px">
      <el-radio v-model="form.sex" label="男">男</el-radio>
  <el-radio v-model="form.sex" label="女">女</el-radio>
  </el-form-item>

  
	<el-form-item label="患者身份证号" style="max-width:400px">
					<el-input placeholder="请输入患者身份证号" v-model="form.id_card" ></el-input>
  </el-form-item>
  
  
	<el-form-item label="患者年龄" style="max-width:400px">
					<el-input placeholder="请输入患者年龄" v-model="form.age" ></el-input>
  </el-form-item>
  
	<el-form-item label="患者手机号码" style="max-width:400px">
				{{form.phone}}
  </el-form-item>
		  
	<el-form-item label="患者备注" style="max-width:400px">
					<el-input placeholder="请输入患者备注" v-model="form.remark" ></el-input>
  </el-form-item>
</el-form>


		<span slot="footer" class="dialog-footer" >
				<el-button @click="updateModel = false">取 消</el-button>
				<el-button type="primary" @click="doSubmit">保存</el-button>
			</span>


      </el-dialog> -->
		<el-dialog width= "70vw" :close-on-click-modal="false"  :append-to-body="true" :visible.sync="moreObj.model"  title="更多聊天记录">
<el-table border
    :data="moreObj.detailList"
    stripe height="600"
    style="width: 100%;">



   <el-table-column  fixed="left"
      prop="inType"
      label="发送者"  >
     </el-table-column>


    <el-table-column  fixed="left"
      label="聊天记录"  >
     <template slot-scope="scope" >
        <div v-if="scope.row.inType == '会员' && scope.row.content ==''">
            <img  @click="viewBigIcon(scope.row.imaglist)"  :src="scope.row.imaglist" style="cursor: pointer;width:100px;heigth:100px;"/>
        </div>
        <div v-else>
{{scope.row.content}}
        </div>
      </template>
     </el-table-column>
     
   <el-table-column  fixed="left"
      prop="createtime"
      label="发送时间"  >
     </el-table-column>


</el-table> 
<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="moreObj.page+1" :page-size="moreObj.pageSize" :total="moreObj.total" @current-change="moreObj.onPageChange">
			</el-pagination>
		</el-col>
</el-dialog>

 <el-dialog  :visible.sync="viewBig" >
      <img :src="bigIcon" style="" >
    </el-dialog>

    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import { encode } from "querystring";
import moment from "moment";
@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
    viewBigIcon(qrcode) {
   this.bigIcon = qrcode;
    this.viewBig = true;
    }
      bigIcon = "";
  viewBig = false;
onlineList:any = []
  startDate:string = ""
endDate  = ""
keystr=''
  
page=0
  pageSize = 10;
  total = 0;
  onPageChange(page) {
    this.page = page - 1;
    this.queryOnlineList();
  }
loading = false
  queryOnlineList(filter=null) {
    if(filter){
      this.page = 0
    }
  let startDate =''
  let endDate =''
    if ((this.startDate|| "") != "") {
      startDate =
        moment(this.startDate).format("YYYY-MM-DD") + " 00:00:00";
    }

    if ((this.endDate || "") != "") {
endDate=
        moment(this.endDate).format("YYYY-MM-DD") + " 23:59:59";
    }
this.loading=true
    indexApi.queryOnlineList(
   startDate,endDate , this.page, this.pageSize ,this.keystr).then(res => {
this.loading=false
      if (res["retCode"]) {
            this.onlineList=res.data.list
            this.total = res.data.page.total
      } else { 
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });

  }

/**
 * moreObj
 */
moreObj={
  model:false,
  loading:false,
  page:0,
  pageSize:10,
  total:0,
  row:{},
  detailList:[],
   onPageChange: page => {
      this.moreObj.page = page - 1;
      this.getInterrDetail(this.moreObj.row);
    },
}


cleangetInterrDetail(row){
  this.moreObj.page = 0
      this.getInterrDetail(row);
}
getInterrDetail(row){

    this.moreObj.loading = true;
    this.moreObj.model = true;
    this.moreObj.row = row;
    indexApi
      .getInterrDetail({
         interrid :row.interrogationId,
        page: this.moreObj.page,
        pageSize: this.moreObj.pageSize
      })
      .then(res => {
        this.moreObj.loading = false;
        if (res["retCode"]) {
          console.log(res.data);
          this.moreObj.detailList = res.data.list;
          this.moreObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });


}





  mounted() {

this.queryOnlineList()

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