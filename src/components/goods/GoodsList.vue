<template>
    <div>
    <h3>商品列表查询</h3>


<div align="center">


<div style="width:-webkit-fill-available;background-color:#f7f7f7;padding:20px 40px;margin-bottom:20px;display:flex;    justify-content: space-between;    align-items: center;">
  
 <div  style="margin-right:20px;">
      	

    <el-button @click="changeGoodsStatus(1)" v-if="dohavePermission('商品上下架')">批量上架</el-button>
    <el-button @click="changeGoodsStatus(0)" v-if="dohavePermission('商品上下架')">批量下架</el-button>

    </div>

    <div style="margin-right:20px;display:flex;    align-items: center;">
      <el-input v-model="nameOrCode" placeholder="输入商品名称" style="margin-right:20px;"></el-input>
          <el-cascader style="width:300px;" placeholder="选择分类" v-model="dataCat" :options="treeData" filterable  @change="doSelect()"></el-cascader>
       <el-button @click="doQuery(true)">查询</el-button>
    </div>
     <!-- <div  style="margin-right:20px;">
       <el-select v-model="modelObj.roleId">
         <el-option  value="" label="全部"></el-option>
         
         <el-option v-for="n in roleList" :value="n.id" :label="n.roleName"></el-option>
       </el-select>
    </div> -->

<div>
                		<el-input style="width:247px;float:left;" >
     			<template slot="prepend" >
							<span>商品状态</span>
					</template>
					<el-select v-model="goodsStatus" slot="prefix" style="width:150px;margin-left:-5px" @change="doQuery">
							<el-option label="全部" :value="0"></el-option>
							<el-option label="上架的商品" :value="1"></el-option>
							<el-option label="下架的商品" :value="2"></el-option>
					</el-select>
        				</el-input>
  <el-button  type="primary" style="margin:0 10px 10px;" @click="doAddGoods" v-if="dohavePermission('添加商品')">添加新商品</el-button>
  </div>


<!-- 	
   <div style="display:flex;justify-content: space-between;width:90%">
<div> -->
  

  
  </div>

  <el-table
    :data="goodsList"
    border
    style="width:90%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="40">
		</el-table-column>
    <!-- <el-table-column prop="goodsId" label="商品id" width="100">
    </el-table-column> -->
      <el-table-column prop="goodsName" label="商品名称" width="180">
    </el-table-column>
    	<el-table-column prop="logo_url" label="商品图片" width="120">
				<template slot-scope="scope">
					<img :src="getImageUrl(scope.row.goodsImg)" style="width:80px;height:80px;">
				</template>
			</el-table-column>
  
    <el-table-column prop="catName" label="分类" width="120">
    </el-table-column>

    <el-table-column prop="marketPrice" label="销售价格" >
    </el-table-column>
    
    <el-table-column prop="storageNum" label="库存" >
    </el-table-column>
  <el-table-column  label="状态" >
    
    
				<template slot-scope="scope">
			{{scope.row.onlineStatus?'上架':'下架'}}
				</template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间">
    </el-table-column>


    	<el-table-column label="操作" width="300">
				<template slot-scope="scope">

					<el-button  size="mini"   @click="changegoodsStatus( scope.row)" v-if="dohavePermission('商品上下架')" :type="!scope.row.onlineStatus?'primary':'info'" plain>			{{!scope.row.onlineStatus?'上架':'下架'}}</el-button>
					<el-button size="mini" @click="doEdit(scope.$index, scope.row)" type="info" plain v-if="dohavePermission('编辑商品')">编辑</el-button>
				<!-- <el-button size="mini" @click="previewDetail(scope.$index, scope.row)" type="success" plain>预览</el-button> -->
						<el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)" plain v-if="dohavePermission('商品删除')">删除</el-button>
				</template>
			</el-table-column>
  </el-table> 

  <div style="margin-top:20px;margin-bottom:20px;">
    <el-pagination 
      @size-change="onPageSizeChange"
      @current-change="onPageChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 50,100]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total">
    </el-pagination>
    </div>
  </div>






	<el-dialog :visible.sync="previewModel" width="414" top="20px" :close-on-click-modal="false">


<iframe src="http://sr.cncloud.com/custom/#/productdetail?goodsId=GI5ae05cc05b065d7c3732319b&availWidth=414&availHeight=761" frameborder="0" width="414" height="736" style="border: 1px #e5e5e5 solid;box-sizing: border-box;"></iframe>


		</el-dialog>







   </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

import GoodsApi from "../../api/goods/GoodsApi";
import * as Api from "../../api/api";

@Component
export default class GoodsList extends Vue {
  goodsList = new Array<Object>();

  currentPage = 1;
  pageSize = 20;
  total = 100;
  goodsStatus = 0;
  multipleSelection = [];
  mounted() {
    this.loadData(this.currentPage - 1, this.pageSize);
    this.queryCategory();
  }
  previewModel = false;
  previewDetail(index, row) {
    this.previewModel = !this.previewModel;

    console.log(row.goodsId);
  }
  handleDelete(index, row) {
    console.log(row.id);
    Api.doConfirm(this, "是否需要删除该信息!").then(res => {
      if (res) {
        Api.requestDeleteGoods(row.goodsId).then(res => {
          this.doQuery();
        });
      }
    });
  }
  changegoodsStatus(row) {
    let params = {
      goodsIds: row.goodsId,
      onlineStatus: !row.onlineStatus
    };
    let goodsApi = new GoodsApi();
    goodsApi.changeGoodsStatus(params).then(res => {
      if (res.returnCode == 200) {
        this.loadData(this.currentPage - 1, this.pageSize);

        this.$message("修改成功");
      } else {
        console.error("数据查询错误");
      }
    });
  }
  changeGoodsStatus(status) {
    if (!this.multipleSelection || this.multipleSelection.length == 0) {
      this.$alert("未选择任何商品");
      return;
    }
    this.$confirm("批量操作商品？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    })
      .then(() => {
        let params = {
          goodsIds: "",
          onlineStatus: status
        };
        let goodsIds = [];
        this.multipleSelection.forEach((item, index) => {
          goodsIds.push(item.goodsId);
        });
        params.goodsIds = goodsIds.join(",");
        let goodsApi = new GoodsApi();
        goodsApi.changeGoodsStatus(params).then(res => {
          if (res.returnCode == 200) {
            this.loadData(this.currentPage - 1, this.pageSize);

            this.$message("修改成功");
          } else {
            console.error("数据查询错误");
          }
        });
      })
      .catch(() => {});
  }
  treeData = [];
  dataCat=["",""];
  catId ="";
doSelect(e){
this.catId =  this.dataCat[this.dataCat.length-1]
}
  queryCategory() {
    Api.requestQueryTree("COMMON").then(res => {
      if (res["retCode"]) {
        console.log(res);
        this.treeData = res["data"].children;
  this.treeData.unshift({
catId:"",catName:"全部",
label:"全部",value:""
  })

      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
      }
    });
  }
  handleSelectionChange(val) {
    this.multipleSelection = val;
    console.log(this.multipleSelection);
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;

    this.loadData(this.currentPage - 1, this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData(this.currentPage - 1, this.pageSize);
  }

  doAddGoods() {
    if ((sessionStorage.goodsId || "") != "") {
      sessionStorage.goodsId = "";
    }
    sessionStorage.activeName = "tab1";
    this.$router.push("/addgoods");
  }

  getImageUrl(url: string) {
    if (url == null) {
      return "";
    }
    let arrayUrl = url.split(",");
    if (arrayUrl.length > 0) {
      return arrayUrl[0];
    }

    return url;
  }
  doQuery(filter=null) {
    if(filter){
      this.currentPage = 1
    }
    this.loadData(this.currentPage - 1, this.pageSize);
  }
  nameOrCode = "";

  loadData(page: number, pageSize: number) {
    console.log(this.catId)
    let goodsApi = new GoodsApi();
    let params = {};
    goodsApi
      .queryGoods(params, page, pageSize, this.goodsStatus, this.nameOrCode,this.catId)
      .then(res => {
        if (res.returnCode == 200) {
          this.goodsList = res.data["goodsList"];

          this.total = res.data["page"]["total"];
        } else {
          console.error("数据查询错误");
        }
      });

    // goodsApi.queryGoods(params,0,20)
  }

  doEdit(index: number, row: object) {
    let goodsId = row["goodsId"];
    sessionStorage.goodsId = goodsId;
    this.$router.push({ name: "addgoodmodel", params: { goodsId: goodsId } });
    sessionStorage.activeName = "tab1";
  }

  doOffline() {}

  doListProduct() {}
}
</script>

<style  scoped>
</style>