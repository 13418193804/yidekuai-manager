<template>
    <div v-bouncing="loading">

        <div style="">
          <h3>在线咨询管理
          </h3>
<!--           
 <div style="{{scope.row.intouttime}}0px;">
平台患者数量统计：{{userCount}} 人              
            </div> -->

<div style="padding-bottom:20px;">
<el-row :gutter="10">
  


  <el-col :xs="22" :sm="8" :md="8" :lg="8" :xl="5">
   <el-input
  placeholder="请输入关键字" style="margin-bottom:20px;" v-model="keystr"
  clearable>
</el-input>
  </el-col>

 <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="min-width:360px;">
   <el-date-picker style="margin-bottom:20px;"
      v-model="date"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-col>

    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
						<el-button type="primary" @click="queryOnlineList(true)">查询</el-button>
  </el-col>
            
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


   
       <!-- <el-table-column label="付款金额"   >
      <template slot-scope="scope">
{{scope.row.money}}
 </template>
    </el-table-column> -->

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
    <el-table-column width="100" property="money" label="咨询费">
      <template slot-scope="scope">
          <span>{{scope.row.money}}({{scope.row.isRefund == '1'?'退款':'支付'}})</span>
      </template>
    </el-table-column>
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


<div v-bouncing="moreObj.loading">
    <div style="text-align:center;">
      <span style="cursor: pointer;color: #5151f5;user-select:none;" v-if="!finished" @click="moreObj.onPageChange">加载更多</span>
      <span style="color: #a6a6be;user-select:none;" v-if="finished">没有更多消息</span>
    </div>
  <div v-for="(item,index) in moreObj.detailList"  style="margin-top:15px;">

<div style="padding-left: 50px;padding-bottom: 5px;font-size: 12px;color: #999;" v-if="item.newsType !== 'NOTICE'">{{item.createtime}}</div>
        <div class="flex" v-if="item.newsType !== 'NOTICE'">
          <div class="cricle flex  flex-align-center flex-pack-center" :style="item.inType == '会员'?'background:#37d8d5' :' background: #f00'">{{item.inType}}</div>
          <div class="content" :style="item.inType == '会员'?'background:#91e9f5' :' background: #e77e7e'">
            <div >
                <div v-if="(item.content||'')!==''">{{item.content}}</div>
                <div v-else>
                  <img  @click="viewBigIcon(item.imaglist)"  :src="item.imaglist" style="cursor: pointer;width:100px;heigth:100px;"/>
                </div>
            </div>
          </div>
      </div>
 <div v-if="item.newsType == 'NOTICE'">
             <el-alert v-if="item.noticeType == 'GIVE' && item.inType == '医生'" :title="item.createtime" :description="`医生向会员赠送1次问答机会,会员目前还剩${item.content}次。`"  type="success"  center  show-icon :closable="false"></el-alert>
             <el-alert v-if="item.noticeType == 'GIVE' && item.inType == '会员'" :title="item.createtime" :description="`会员收到医生赠送的1次问答机会,会员目前还剩${item.content}次。`"  type="success"  center  show-icon :closable="false"></el-alert>
             <el-alert v-if="item.noticeType == 'INQUIRY' && item.inType == '医生'" :title="item.createtime" :description="`医生收到会员提交的一次问答,会员目前还剩${item.content}次。`"  type="info"  center  show-icon :closable="false"></el-alert>
             <el-alert v-if="item.noticeType == 'INQUIRY' && item.inType == '会员'" :title="item.createtime" :description="`会员向医生提交一次问答,会员目前还剩${item.content}次。`"  type="info"  center  show-icon :closable="false"></el-alert>
    </div>
  </div>
</div>

<!-- 
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
		</el-col> -->
</el-dialog>

 <el-dialog  :visible.sync="viewBig" >
      <img :src="bigIcon" style="width:100%;" >
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
keystr=''
  date=[]
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

this.loading=true
    indexApi.queryOnlineList(
this.date && this.date.length>0? moment(this.date[0]).format("YYYY-MM-DD") + " 00:00:00":"",
this.date && this.date.length>0? moment(this.date[1]).format("YYYY-MM-DD") + " 23:59:59":"",
  this.page, this.pageSize ,this.keystr).then(res => {
this.loading=false
      if (res["retCode"]) {
            this.onlineList=res.data.list
            this.total = res.data.page.total
      } else { 
        if(!res['islogin']){this.$alert(res["message"]);}
      }
    });

  }
finished = false
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
   onPageChange: () => {

      if(!this.moreObj.loading){
      this.moreObj.pageSize += 10;
      }
    this.moreObj.loading = true;
      this.getInterrDetail(this.moreObj.row);

    },
}


cleangetInterrDetail(row){
  this.moreObj.pageSize = 10
  this.finished = false
      this.getInterrDetail(row);
}
getInterrDetail(row){

    this.moreObj.loading = true;
    this.moreObj.model = true;
    this.moreObj.row = row;
    console.log(this.moreObj.pageSize)
    indexApi
      .getInterrDetail({
         interrid :row.interrogationId,
        page: this.moreObj.page,
        pageSize: this.moreObj.pageSize
      })
      .then(res => {
        this.moreObj.loading = false;
        if (res["retCode"]) {
         
            if(res.data.list.length == this.moreObj.pageSize){
              this.finished = false 
            }else{
              this.finished = true
            }
          this.moreObj.detailList = res.data.list;
          this.moreObj.total = res.data.page.total;
        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
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
.cricle{
  user-select:none;
    height: 40px;
    min-width: 40px;
    border-radius: 30px;
    color: #fff;
}
.content{
    border-radius: 5px;
    padding: 10px;
    margin-left: 10px;
    color:#000;
}
</style>