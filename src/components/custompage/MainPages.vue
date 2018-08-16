<template>

    <div  style="width:100%;min-width:1101px;   display: flex;">
  <div style="display:flex;align-items:center;flex:1;justify-content: center;">
<!--The Main Thing-->
<div  style="    position: fixed;top:40px">

<div id="wrapper">
  <div class="phone view_3" id="phone_1">
    <iframe :src="iframeData()" id="i" name="ifr_1"  frameborder="0" width="100%" height="100%" style="box-sizing: border-box;"></iframe>
    <!-- <iframe src="http://www.jq22.com" id="frame_1" ></iframe> -->
  </div>
</div>



</div>

  </div>

       <div class="kongzhitai">
        <h2>页面列表 
          <el-button type="text" @click="changeAddModel()">添加</el-button>
        </h2>
      


          <el-table border:data="pageModel.pageList" row-key="pageId"  :expand-row-keys="expands" highlight-current-row @row-click="toggleRowExpansion"   style="width:500px">
             
              <el-table-column type="expand">
      <template slot-scope="props">
      
<div style="">








  <span class="el-form-item__label">页面名</span>   
   <el-input  style="width:200px;" v-model="pageModel.pageItem.pageName">    
              
 <el-button slot="append" @click="updatePage()">保存</el-button></el-input> 
                <div style="margin:20px 0;display:flex;">
             <div>  <span class="el-form-item__label">状态</span>
             <el-tag :type="pageModel.pageItem.pageStatus?'success':'info'"> {{pageModel.pageItem.pageStatus?"启用中":"已禁用"}}</el-tag>  
                <el-button type="text" @click="updatePage(true)"> {{pageModel.pageItem.pageStatus?'禁用':'启用'}}</el-button>
                </div>
                <div style="margin:0 20px">
<span  class="el-form-item__label">  <el-button size="mini" plain  @click="changeAddModelCompont()" :disabled="pageModel.addModel == true">加组件</el-button></span>
                </div>
                </div>


<div style="width:-webkit-fill-available;   background-color: #f7f7f7;
    padding: 20px;" v-if="pageModel.addModel">

       <el-form label-width="80px" size="small" v-model="pageModel.componentObj">
                    <el-form-item label="组件名称">
                        <el-input v-model="pageModel.componentObj.name"></el-input>
                    </el-form-item>

                    <el-form-item label="组件类型">
                        <el-select v-model="pageModel.componentObj.componentType" @change="pageModel.actionTypeChange">
                            <el-option   label="轮播广告" value="COMPONENT_TYPE_SCROLL_HEADER"></el-option>
                            <el-option   label="快速工具条" value="COMPONENT_TYPE_QUICK_BAR"></el-option>
                            <el-option   label="商品标签列" value="COMPONENT_TYPE_GOODS_TAG"></el-option>
                            <!-- <el-option   label="广告栏" value="COMPONENT_TYPE_ADV_BANNER"></el-option> -->
                        </el-select>
                    </el-form-item>
            

                    <div v-if="pageModel.componentObj.componentType === 'COMPONENT_TYPE_GOODS_TAG'">
                      <el-form-item label="首页商品数量">
                                <el-input v-model="pageModel.componentObj.itemMaxNum"></el-input>
                        </el-form-item>
                        <el-form-item label="商品展现形式">
                                <el-radio v-model="pageModel.componentObj.columnNum" :label="1">单列展示</el-radio>
                                <el-radio v-model="pageModel.componentObj.columnNum" :label="2">双列展示</el-radio>
                        </el-form-item>
                        <el-form-item label="商品来源类型">
                                <el-select v-model="pageModel.componentObj.dataSourceType" placeholder="请选择" @change="dataSourceTypeChange">
                                    <!-- <el-option label="最新商品" value="DATA_SOURCE_TYPE_NEW"></el-option> -->
                                    <el-option label="分类标签" value="DATA_SOURCE_TYPE_TAG"></el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item label="商品来源" v-if="pageModel.componentObj.dataSourceType=='DATA_SOURCE_TYPE_TAG'">
                                <el-cascader placeholder="请选择" @change="catSelectionChange" v-model="pageModel.componentObj.dataSource" :options="catOptions" filterable></el-cascader>
                        </el-form-item>
</div>

                          <el-button type="info" plain  @click="pageModel.addModel = false">取消</el-button>
                          <el-button type="primary" @click="pageModel.doAddSubmit">确 定</el-button>

                </el-form>
</div>
    <hr/>
 <el-collapse   accordion style="width:550px;"  @change="handleChange" v-if="!pageModel.addModel"> 
           <div  v-for="(item,index) in componentModel.componentList" >
            <el-collapse-item :name="index"  v-if="item.componentType === 'COMPONENT_TYPE_SCROLL_HEADER'||item.componentType === 'COMPONENT_TYPE_QUICK_BAR'||item.componentType == 'COMPONENT_TYPE_ADV_BANNER'">
           <div style="margin-top:10px;    display: flex;align-items: center;">
              <span class="el-form-item__label">组件名</span>    
              <el-input  style="width:200px;" v-model="componentModel.componentList[index].componentName">    
 <el-button slot="append" @click="doUpdateModel()">保存</el-button></el-input> 

             <el-button type="text" size="mini" icon="el-icon-delete" style="margin:15px;" @click="componentModel.deleteComponent(item)"></el-button>
             </div>
                <template slot="title">
                    <div class="collapse-item-title">
                      {{item.name}}</div>
                </template>
                <div class="collapse-item-body">
                    <el-table border:data="itemModel.itemList" highlight-current-row v-show="itemModel.itemList">
                       <el-table-column prop="itemImgUrl" label="广告图片" width="100">
                            <template slot-scope="scope">
                                <img :src="scope.row.itemImgUrl" style="width:40px;height:40px;">
                            </template>
                        </el-table-column>
                        <el-table-column prop="itemName" label="图片名称" width="100">

                        </el-table-column>
                        <el-table-column prop="actionType" label="点击跳转" width="100">
                            <template slot-scope="scope">
                                {{formatActionType(scope.row.actionType)}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="210">
                            <template slot-scope="scope">
                                <el-button  size="mini" plain @click="dialogModel.doEdit(scope.row)">修改</el-button>
                                <el-button size="mini" plain type="text" @click="dialogModel.doDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button  size="small" plain type="primary" icon="el-icon-plus" @click="dialogModel.doEdit()" style="margin-top:20px"> 增加内容 </el-button>
                </div>
            </el-collapse-item>


        <el-collapse-item :name="index"  v-if="item.componentType === 'COMPONENT_TYPE_GOODS_TAG'" >
              
                <div style="margin-top:10px;    display: flex;align-items: center;">
              <span class="el-form-item__label">组件名</span>    
              <el-input  style="width:200px;" v-model="componentModel.componentList[index].componentName">   </el-input> 

             <el-button type="text" size="mini" icon="el-icon-delete" style="margin:15px;" @click="componentModel.deleteComponent(item)"></el-button>
             </div>
             
               <template slot="title">
                    <div class="collapse-item-title">{{item.name}}</div>
                </template>
                <div class="collapse-item-body">  
                    <el-form label-width="100px"  v-model="componentModel" inline size="small">
                        <el-form-item label="首页商品数量">
                                <el-input v-model="item.itemMaxNum"></el-input>
                        </el-form-item>

                        <el-form-item label="商品展现形式">
                                <el-radio v-model="item.columnNum" :label="1">单列展示</el-radio>
                                <el-radio v-model="item.columnNum" :label="2">双列展示</el-radio>
                        </el-form-item>
                        <el-form-item label="商品来源类型">
                                <el-select v-model="item.dataSourceType" placeholder="请选择" @change="dataSourceTypeChange">
                                    <!-- <el-option label="最新商品" value="DATA_SOURCE_TYPE_NEW"></el-option> -->
                                    <el-option label="分类标签" value="DATA_SOURCE_TYPE_TAG"></el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item label="商品来源" v-if="item.dataSourceType=='DATA_SOURCE_TYPE_TAG'">
                                <el-cascader placeholder="请选择" @change="catSelectionChange" v-model="catSelection" :options="catOptions" filterable></el-cascader>
                        </el-form-item>
                    </el-form>

                    
                    <el-button type="primary" size="small" :disabled="item.itemMaxNum==componentList[2].itemMaxNum&&item.columnNum==componentList[2].columnNum&&item.dataSource==componentList[2].dataSource" @click="doUpdateModel()">确 定</el-button>
                </div>
            </el-collapse-item>
            </div>
        </el-collapse>











</div>


      </template>
    </el-table-column>

                        <el-table-column prop="itemImgUrl" label="页面名称" width="100" header-align="center" align="center">
                            <template slot-scope="scope">
                            {{scope.row.pageName}}
                            </template>
                        </el-table-column>
                           <el-table-column prop="itemImgUrl" label="状态" width="100"  header-align="center" align="center">
                            <template slot-scope="scope">
                            {{scope.row.pageStatus?"启用中":"已禁用"}}
                            </template>
                        </el-table-column>
                         <el-table-column label="操作" width="210"  header-align="center" align="center">
                            <template slot-scope="scope">
                                <!-- <el-button size="mini" plain type="info" @click="pageModel.selectPage(scope.row,scope.$index)">编辑</el-button> -->
                                <el-button size="mini" plain type="text" :disabled="scope.row.catId || scope.$index ==0" @click="newPageModel.doDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
    </div>
    
    
    <el-dialog :visible.sync="addpages" width="1050px" center size="tiny"  title="添加页面" :close-on-click-modal="false" top="40px">


    
<div style="padding:20px;max-width:30%;">
            <span class="el-form-item__label">添加页面</span>
            <el-input  style="width:200px;" v-model="newPageModel.pageName">    
              </el-input>
</div>
     <span slot="footer" class="dialog-footer">
            <el-button @click="addpages = false">取 消</el-button>
            <el-button type="primary" @click="doAddSubmit">确 定</el-button>
        </span>
    </el-dialog>


    <el-dialog :visible.sync="dialogModel.show" width="1050px" center size="tiny"  title="修改组件信息" :close-on-click-modal="false" top="40px">
        <div style="width:1010px;height:500px">
            <div style="width:350px;height:500px;float:left">
                <el-form label-width="80px" size="small">
                    <img v-if="dialogModel.itemImgUrl&&activeName=='0'" :src="dialogModel.itemImgUrl" style="width:350px;height:175px;">
                    <img v-else-if="dialogModel.itemImgUrl" :src="dialogModel.itemImgUrl" style="width:175px;height:175px;">
                    <el-upload :before-upload="beforeUpload"
                        :action="dialogModel.fileUploadUrl"
                        :on-success="dialogModel.uploadSuccess"
                        :show-file-list="false">
                        <el-button size="small" type="primary" style="margin-bottom:20px;">上传图片</el-button>
                    </el-upload>

                    <el-form-item label="分栏名称">
                        <el-input v-model="dialogModel.itemName"></el-input>
                    </el-form-item>

                    <el-form-item label="链接类型">
                        <el-select v-model="dialogModel.actionType" @change="actionTypeChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="链接内容">
                        <el-input v-model="dialogModel.actionValueTitle" :readonly="dialogModel.actionType!='ACTION_TYPE_URL'"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div style="width:560px;height:500px;margin-left:50px;padding:0px 20px;float:left;overflow-y:auto">
              	<section   v-if="dialogModel.actionType=='ACTION_TYPE_GOODSID'">
		<!--工具条-->
		<el-form :inline="true" :model="searchForm" size="mini">
			<el-form-item>
				<el-input v-model="searchForm.name" placeholder="商品名称"></el-input>
			</el-form-item>
			<!-- <el-form-item>
				<el-cascader style="width:150px;" placeholder="分类" v-model="searchForm.catIdList" :options="options"
					filterable  @change="doQueryByCat"></el-cascader>
			</el-form-item> -->
			<el-form-item>
				<el-button type="primary" size="small" plain @click="doQuery(true)">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="reset" size="small" plain @click="doResetQuery">重置</el-button>
			</el-form-item>
		</el-form>

		<!--列表-->
		<el-table border:data="goodsData" highlight-current-row v-loading="listLoading" size="mini" width="100%" max-height="410" @current-change="doSelectGoods">

			<!-- <el-table-column prop="id" label="商品ID" width="120" sortable></el-table-column> -->

			<el-table-column prop="logo_url" label="商品图片" width="80">
				<template slot-scope="scope">
					<img :src="scope.row.goodsImg?scope.row.goodsImg.split(',')[0]:''" style="width:40px;height:40px;">
				</template>
			</el-table-column>

			<el-table-column prop="goodsName" label="商品名" width="200" sortable>
			</el-table-column>
			<el-table-column prop="code" label="商品编码" width="100" sortable>
			</el-table-column>
			<el-table-column prop="storageNum" label="库存" width="70" sortable>
			</el-table-column>
			<el-table-column prop="labelPrice" label="标签价" width="80" sortable>
			</el-table-column>
		</el-table>
		<!--工具条-->
			<el-pagination layout="prev, pager, next" :current-page="page+1"
			:page-size="pageSize" :total="total"
			@current-change="onPageChange">
			</el-pagination>
		<!--编辑界面-->
		<!--新增界面-->
	</section>

<div v-if="dialogModel.actionType=='ACTION_TYPE_TAGID'">
  <el-tree style="width:380px;"   :data="treeData"  default-expand-all :props="defaultProps" :expand-on-click-node="false" 
  node-key="catId" ref="tree" highlight-current @node-click="doNodeClick" >
  </el-tree>
</div>
                <!-- <categoryCom @doSelectCat='doSelectCat' v-if="dialogModel.actionType=='ACTION_TYPE_TAGID'"></categoryCom> -->
        
        
        
            </div>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogModel.show = false">取 消</el-button>
            <el-button type="primary" @click="dialogModel.submitEdit(dialogModel)">确 定</el-button>
        </span>
    </el-dialog>
    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as portalApi from "../../api/portalapi";
import * as catApi from "../../api/catapi";
import * as Api from "../../api/api";
import * as Config from "../../api/conf";
import Analog from "../custompage/AnalogMobile3.vue";

@Component({})
export default class MainPages extends Vue {
  mounted() {
    console.log("load page");
    this.getAllPage();
    this.loadData();
    this.doQueryTree();
  }
  expands = [];
  toggleRowExpansion(row) {
    if (!row.pageStatus) {
      this.$message("页面已禁用,无法显示在模拟器中");
    }
    let a = this.expands[0];
    this.expands = [];
    if (a != row.pageId) {
      this.expands.push(row.pageId);
      this.pageModel.selectPage(row);
    }

    console.log(this.expands);
  }
  changeAddModelCompont() {
    this.pageModel.componentObj.name = "";
    this.pageModel.componentObj.componentType = "";

    this.pageModel.addModel = true;
  }
  iframeData() {
    let pageIndex = 0;
    let a = this.pageModel.pageList.filter((item, index) => {
      return item.pageStatus;
    });

    a.forEach((item, index) => {
      if (this.pageModel.pageId == item.pageId) {
        pageIndex = index;
      }
    });

    return (
      "http://sr.cncloud.com/custom/#/?availWidth=" +
      window.screen.availHeight * 0.34 +
      "&availHeight=" +
      window.screen.availHeight * 0.33 +
      "&active=" +
      pageIndex
    );
  }

  pageSize = 20;
  total = 100;
  currentPage = 0;

  searchForm = {
    name: "",
    goodsStatus: 1
  };

  goodsData = [];

  page = 1;
  listLoading = false;
  sels = []; //列表选中列

  editFormVisible = false; //编辑界面是否显示
  editLoading = false;
  editFormRules = {
    name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
  };

  currentCatId = "";
  currentCatName = "";
  treeData = [
    {
      catId: "0",
      catName: "分类",
      children: []
    }
  ];
  defaultProps = {
    children: "children",
    label: "catName"
  };
  attrs = [];

  getCatId() {
    return this.currentCatId;
  }
  getCatName() {
    return this.currentCatName;
  }
  loadAll() {
    Api.requestQueryTree("").then(res => {
      if (res["retCode"]) {
        this.treeData[0].children = res["data"].children;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
      }
    });
  }

  doNodeClick(object, node, control) {
    console.log(object);
    if (object.levelNum === 2) this.doSelectCat(object);
    else {
      this.doSelectCat(null);
      this.$message({ message: "请点击选择最末级分类", type: "warning" });
    }
  }
  onChangeCatId() {
    this.doQueryByCat();
  }
  doQueryByCat() {
    let pos = this.searchForm["catIdList"].length;
    if (pos > 0) {
      let catId = this.searchForm["catIdList"][pos - 1];
      Api.requestQueryGoodsByCat(catId, 0, 200).then(res => {
        if (res["retCode"]) {
          this.total = 100;
          this.goodsData = res["data"];
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
        }
      });
    }
  }
  onPageChange(page) {
    this.currentPage = page - 1;
    this.doQuery();
  }
  doResetQuery() {
    this.searchForm.name = "";
    //this.searchForm.catIdList=["",""]
    this.doQuery();
  }
  doQuery(filter=null) {
    if(filter){
      this.currentPage = 0
    }
    let params = {};
    if ((this.searchForm.name || "") != "") {
      params["nameOrCode"] = this.searchForm.name;
    }
    params["page"] = this.currentPage;
    Api.requestQueryGoods(params).then(res => {
      if (res["retCode"]) {
        this.total = res["page"].total;
        this.goodsData = res["data"];
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
      }
    });
  }

  addpages = false;
  doAddSubmit() {
    portalApi.addPage(this.newPageModel.pageName).then(res => {
      if (res.retCode) {
        this.addpages = !this.addpages;
        this.newPageModel.pageName = "";
        this.getAllPage();
        this.$message("添加成功");
      } else {
        this.$alert("添加页面失败");
      }
    });
  }
  changeAddModel() {
    this.newPageModel.pageName = "";
    this.addpages = true;
  }
  newPageModel = {
    changeModel: () => {
      this.addpages = !this.addpages;
    },
    pageName: "",

    doDelete: row => {
      this.$confirm("此操作将删除该页面和下面的组件元素, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          portalApi.deletePage(row.pageId).then(res => {
            if (res.retCode) {
              this.getAllPage();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$alert("删除页面失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  };
  activeName = "0";
  componentId = "";
  componentName = "";
  componentType = "";
  componentList = [{ items: [] }, { items: [] }, { items: [] }];
  items = [];
  options = [
    { value: "ACTION_TYPE_GOODSID", label: "商品详情" },
    { value: "ACTION_TYPE_TAGID", label: "商品分类" },
    { value: "ACTION_TYPE_URL", label: "自定义链接" }
  ];
  catOptions = [];
  catSelection = [];
  componentModel = {
    componentList: [],
    val: 0,
    deleteComponent: row => {
      this.$confirm("此操作将删除该组件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          portalApi.deleteComponent(row.id).then(res => {
            if (res.retCode) {
              this.pageModel.getComponentList(this.pageModel.pageId);

              document.getElementById("phone_1")[
                "innerHTML"
              ] = `<iframe data-v-7b1af702="" src="${this.iframeData()}" id="i" name="ifr_1" frameborder="0" width="100%" height="100%" style="box-sizing: border-box;"></iframe>`;

              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$alert("删除页面失败");
            }
          });
        })
        .catch(e => {
          console.log(e);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    getItemList: compId => {
      portalApi.getItemList(compId).then(res => {
        if (res.retCode) {
          this.itemModel.itemList = res.data;
          this.componentModel.componentList[
            this.componentModel.val
          ].componentName = this.componentModel.componentList[
            this.componentModel.val
          ].name;
        } else {
          this.$alert("获取元素失败");
        }
      });
    },

    itemMaxNum: 0,
    columnNum: 1,
    dataSourceType: "",
    dataSource: ""
  };
  itemModel = {
    itemList: []
  };
  pageModel = {
    pageId: "",
    componentObj: {
      pageId: "",
      name: "",
      columnNum: 1,
      itemMaxNum: 10,
      componentType: "",
      dataSourceType: "", //商品列表才有资源
      dataSource: ""
    },
    actionTypeChange(val) {},
    addModel: false,
    doAddSubmit: () => {
      console.log("加组件");
      this.pageModel.componentObj.pageId = this.pageModel.pageId;
      portalApi.addComponent(this.pageModel.componentObj).then(res => {
        if (res.retCode) {
          this.pageModel.addModel = false;
          this.pageModel.getComponentList(this.pageModel.pageId);
          console.log("添加", res.data);
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
        }
      });
    },
    pageList: [],
    pageItem: {},
    pageName: "",
    model: false,
    updatePage: () => {},
    selectPage: row => {
      this.pageModel.pageItem = row;
      this.pageModel.pageName = row.pageName;

      console.log("把组件查出来", this.pageModel);
      this.pageModel.getComponentList(row.pageId);
    },
    getComponentList: pageId => {
      portalApi.getComponentList(pageId).then(res => {
        if (res.retCode) {
          console.log("通过页面获取组件信息", res.data);
          this.componentModel.componentList = res.data;
          if (this.componentModel.componentList.length > 0) {
            this.componentModel.getItemList(
              this.componentModel.componentList[this.componentModel.val].id
            );
          }
          this.pageModel.pageId = pageId;
          this.expands = [];
          this.expands.push(pageId);
          // document.getElementById('i')['src']=this.iframeData();

          document.getElementById("phone_1")[
            "innerHTML"
          ] = `<iframe data-v-7b1af702="" src="${this.iframeData()}" id="i" name="ifr_1" frameborder="0" width="100%" height="100%" style="box-sizing: border-box;"></iframe>`;
          // for (
          //   var i = 0;
          //   i < this.componentModel.componentList.length;
          //   i++
          // ) {
          //   if (
          //     this.componentModel.componentList[i].componentType ==
          //
          //   ) {
          //     Object.assign(
          //       this.componentModel,
          //       this.componentModel.componentList[i]
          //     );
          //   }

          // }
        } else {
          this.$alert("获取组件失败");
        }
      });
    }
  };
    beforeUpload(file) {
      console.log(file);
      // console.log(this.$refs.upload)
      console.log("before upload ...");
         const isLt5M = file.size / 1024 / 1024 < 5;
         if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return  isLt5M;
    }

  dialogModel = {
    show: false,
    id: "",
    itemImgUrl: "",
    itemName: "",
    actionType: null,
    actionValue: "",
    actionValueTitle: "",
    fileUploadUrl: Config.g_upload_url,
    uploadSuccess: res => {
      console.log(res.data);
      this.dialogModel.itemImgUrl = res.data.filename;
    },
    doEdit: row => {
      this.dialogModel.id = "";
      this.dialogModel.itemImgUrl = "";
      this.dialogModel.itemName = "";
      this.dialogModel.actionType = null;
      this.dialogModel.actionValue = "";
      this.dialogModel.actionValueTitle = "";
      if (row != null) {
        (<any>Object).assign(this.dialogModel, row);
        if (this.dialogModel.actionType == "ACTION_TYPE_URL") {
          this.dialogModel.actionValueTitle = this.dialogModel.actionValue;
        } else if (this.dialogModel.actionType !== "ACTION_TYPE_TAGID") {
          this.dialogModel.actionValueTitle = row.itemName;
        }
      }

      this.loadAll();
      this.doQuery();
      this.dialogModel.show = true;
    },
    doAddSubmit: model => {
      console.log(model);
      model.compId = this.componentModel.componentList[
        this.componentModel.val
      ].id;
      catApi.addComponentItem(model).then(res => {
        if (res.retCode) {
          this.$alert("添加成功");
          this.dialogModel.show = false;
          this.dialogModel["componentId"] = this.componentId;
          this.componentModel.getItemList(
            this.componentModel.componentList[this.componentModel.val].id
          );

          document.getElementById("phone_1")[
            "innerHTML"
          ] = `<iframe data-v-7b1af702="" src="${this.iframeData()}" id="i" name="ifr_1" frameborder="0" width="100%" height="100%" style="box-sizing: border-box;"></iframe>`;
        } else {
          this.$alert("修改失败");
        }
      });
    },
    submitEdit: model => {
      console.log("this.dialogModel.actionValue", this.dialogModel.actionValue);
      if (this.dialogModel.actionType == "") {
        this.$alert("点击类型为空");
        return;
      }
      if (this.dialogModel.actionType == "ACTION_TYPE_URL") {
        this.dialogModel.actionValue = this.dialogModel.actionValueTitle;
      }
      if (this.dialogModel.actionValue == "") {
        this.$alert("变量值不能为空");
        return;
      }

      if (this.dialogModel.itemImgUrl == "") {
        this.$alert("图片不能为空");
        return;
      }
      if (this.dialogModel.id == "") {
        this.dialogModel.doAddSubmit(model);
        return;
      }

      catApi.updateComponentItem(model).then(res => {
        if (res.retCode) {
          this.$message("修改成功");
          this.dialogModel.show = false;

          document.getElementById("phone_1")[
            "innerHTML"
          ] = `<iframe data-v-7b1af702="" src="${this.iframeData()}" id="i" name="ifr_1" frameborder="0" width="100%" height="100%" style="box-sizing: border-box;"></iframe>`;

          //   this.loadData();
          //   this.queryItems();
          this.componentModel.getItemList(
            this.componentModel.componentList[this.componentModel.val].id
          );
        } else {
          this.$alert("修改失败");
        }
      });
    },
    doDelete: row => {
      Api.doConfirm(this, "是否需要删除该信息!").then(res => {
        if (res) {
          catApi.deleteComponentItem(row.id).then(res => {
            if (res.retCode) {
              // this.loadData();
              // this.queryItems();

              this.componentModel.getItemList(
                this.componentModel.componentList[this.componentModel.val].id
              );
            } else {
              this.$alert("删除出错！");
            }
          });
        }
      });
    }
  };
  value = -1;

  updatePage(status) {
    let model = this.pageModel.pageItem;

    if (status) {
      model["pageName"] = this.pageModel.pageName;
      this.pageModel.pageItem["pageStatus"] = !this.pageModel.pageItem[
        "pageStatus"
      ];
    }

    portalApi.updatePage(model).then(res => {
      if (res.retCode) {
        this.$message("更新成功!");

        this.getAllPage();
      } else {
        this.$alert("获取失败");
      }
    });
  }
  handleChange(val) {
    let self = this;
    let comfin = val + 1;
    if (typeof comfin != "string") {
      this.componentModel.val = val;
      this.componentModel.getItemList(
        this.componentModel.componentList[val].id
      );
      console.log("-----", this.catSelection);

      if (
        this.componentModel.componentList[this.componentModel.val]
          .componentType === "COMPONENT_TYPE_GOODS_TAG" &&
        this.componentModel.componentList.length > 0
      ) {
        this.catSelection = this.componentModel.componentList[
          this.componentModel.val
        ].dataSource.split(",");
      }
      console.log("-----", this.catSelection);
    }
  }
  getAllPage() {
    portalApi.getAllPage().then(res => {
      if (res.retCode) {
        console.log(res.data);
        this.pageModel.pageList = res.data;
        document.getElementById("phone_1")[
          "innerHTML"
        ] = `<iframe data-v-7b1af702="" src="${this.iframeData()}" id="i" name="ifr_1" frameborder="0" width="100%" height="100%" style="box-sizing: border-box;"></iframe>`;
      } else {
        this.$alert("获取失败");
      }
    });
  }
  doUpdateModel() {
    // console.log('this.componentModel',this.componentModel)
    this.componentModel.componentList[
      this.componentModel.val
    ].dataSource = this.catSelection.join(",");
    this.componentModel.componentList[
      this.componentModel.val
    ].name = this.componentModel.componentList[
      this.componentModel.val
    ].componentName;
    portalApi
      .updateComponent(
        this.componentModel.componentList[this.componentModel.val]
      )
      .then(res => {
        if (res.retCode) {
          this.$message("更新成功!");
          this.componentModel.componentList[
            this.componentModel.val
          ].name = this.componentModel.componentList[
            this.componentModel.val
          ].componentName;
          this.componentModel.getItemList(
            this.componentModel.componentList[this.componentModel.val].id
          );
        } else {
          this.$alert("更新商品组件参数失败");
        }
      });
  }
  formatComponentType(comType) {
    if (comType == "COMPONENT_TYPE_SCROLL_HEADER") {
      return "滚动广告栏";
    }
    if (comType == "COMPONENT_TYPE_QUICK_BAR") {
      return "工具栏";
    }
    if (comType == "COMPONENT_TYPE_GOODS_TAG") {
      return "商品列表设置";
    }
    return "";
  }
  formatActionType(actionType) {
    if (actionType == "ACTION_TYPE_GOODSID") {
      return "商品详情";
    }
    if (actionType == "ACTION_TYPE_TAGID") {
      return "商品列表";
    }
    if (actionType == "ACTION_TYPE_URL") {
      return "自定义链接";
    }
    return "未定义";
  }
  queryItems() {
    catApi.queryComponentItem(this.componentId).then(res => {
      if (res["retCode"]) {
        this.items = res.data;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
      }
    });
  }
  loadData() {
    portalApi.queryMainPortal().then(res => {
      console.log("", res);
      if (res.retCode == true) {
        this.componentList = res.data.component;
        for (var i = 0; i < this.componentList.length; i++) {
          if (
            this.componentList[i]["componentType"] == "COMPONENT_TYPE_GOODS_TAG"
          ) {
            (<any>Object).assign(this.componentModel, this.componentList[i]);
          }
        }
        if (this.componentModel.dataSource == null)
          this.componentModel.dataSource = "";
        this.catSelection = this.componentModel.dataSource.split(",");
      }
    });
  }
  doSelectCat(cat) {
    if (cat != null) {
      this.dialogModel.actionValue = cat.catId;
      this.dialogModel.actionValueTitle = cat.catName;
    }
  }
  doSelectGoods(goods) {
    this.dialogModel.actionValue = goods.goodsId;
    this.dialogModel.actionValueTitle = goods.goodsName;
  }
  actionTypeChange(val) {
    this.dialogModel.actionValue = "";
    this.dialogModel.actionValueTitle = "";
  }
  doQueryTree() {
    Api.requestQueryTree("").then(res => {
      if (res["retCode"]) {
        this.catOptions = res["data"].children;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
      }
    });
  }
  dataSourceTypeChange(val) {
    this.componentModel.dataSource = "";
    this.catSelection.splice(0, this.catSelection.length);
  }
  catSelectionChange(val) {
    console.log(val.toString());
    this.componentModel.dataSource = val.toString();
  }
}
</script>
<style>
.el-table__expand-icon {
  z-index: -1;
}
.el-table__row {
  cursor: pointer;
}
</style>

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
.moniqi {
  width: 40%;
  min-width: 450px;
  text-align: center;
  float: left;
}
.kongzhitai {
  overflow: auto;
  flex: 1;
  width: 50%;
  min-width: 600px;
  text-align: center;
  float: left;
  font-size: 14px;
  text-align: left;
  padding: 20px;
}
.collapse-item-title {
  font-size: 16px;
  width: 100%;
  padding-left: 20px;
  background: rgb(250, 250, 250);
}
.collapse-item-body {
  padding: 20px 20px 0px;
}

@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600,300);
body {
  font-family: "Open Sans", sans-serif;
  background-color: #fffaf6;
}
/*Basic Phone styling*/

.phone {
  border: 40px solid #ddd;
  border-width: 55px 7px;
  border-radius: 40px;
  margin: 50px auto;
  overflow: hidden;
  transition: all 0.5s ease;
  width: 40vh;
  height: 70vh;
}

.phone iframe {
  border: 0;
  width: 100%;
  height: 100%;
}
/*Different Perspectives*/

.phone.view_1 {
  transform: rotateX(50deg) rotateY(0deg) rotateZ(-50deg);
  box-shadow: -3px 3px 0 #bbb, -6px 6px 0 #bbb, -9px 9px 0 #bbb,
    -12px 12px 0 #bbb, -14px 10px 20px #666;
}

.phone.view_2 {
  transform: rotateX(0deg) rotateY(-60deg) rotateZ(0deg);
  box-shadow: 5px 1px 0 #bbb, 9px 2px 0 #bbb, 12px 3px 0 #bbb, 15px 4px 0 #bbb,
    0 7px 20px #999;
}

.phone.view_3 {
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  box-shadow: 0px 3px 0 #bbb, 0px 4px 0 #bbb, 0px 5px 0 #bbb, 0px 7px 0 #bbb,
    0px 10px 20px #666;
}
/*Controls*/

#controls {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 0.9em;
  color: #333;
}

#controls div {
  margin: 10px;
}

#controls div label {
  width: 120px;
  display: block;
  float: left;
}

#views {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 200px;
}

#views button {
  width: 198px;
  border: 1px solid #bbb;
  background-color: #fff;
  height: 40px;
  margin: 10px 0;
  color: #666;
  transition: all 0.2s;
}

#views button:hover {
  color: #444;
  background-color: #eee;
}

@media (max-width: 900px) {
  #wrapper {
    transform: scale(0.8, 0.8);
  }
}

@media (max-width: 700px) {
  #wrapper {
    transform: scale(0.6, 0.6);
  }
}

@media (max-width: 500px) {
  #wrapper {
    transform: scale(0.4, 0.4);
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>