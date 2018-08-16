<template>

<div v-loading="listLoading" style="text-align:-webkit-auto;padding:20px;">
   
  <h3 style="text-align:center;margin-top:-10px;">

   <el-select v-if="pageType !== 'category'" v-model="businessType" @change="changeBusinessType" style="float:left">
      <el-option value="MAIN" label="首页运营栏目"></el-option>
      <el-option value="CAT" label="分类运营栏目"></el-option>
    </el-select>
  <div style="    clear: both;">{{pageType == 'category' ?'商品分类':'运营栏目'}}</div>
</h3>
  <el-row>
    <el-col :span="8">
        <el-button type="primary" plain size="mini" @click="doAddCategory" :disabled="disableAdd" v-if="dohavePermission('添加'+formatName())">增加{{formatName()}}</el-button>
        <el-button  plain size="mini" @click="editCategory" v-if="dohavePermission('编辑'+formatName())">修改{{formatName()}}</el-button>
        <el-button type="text" plain size="mini" @click="doDeleteCategory" :disabled="currentObject.catId=='0'" v-if="dohavePermission('珊除'+formatName())">删除{{formatName()}}</el-button>
        <el-col :style='"margin-top:20px;border:1px teal solid;overflow-y:auto;padding:10px;height:75vh"'>
            <el-tree :data="treeData"  default-expand-all :props="defaultProps" :expand-on-click-node="false" 
            node-key="catId" ref="tree" highlight-current @node-click="doNodeClick" >
            
             <span class="custom-tree-node" slot-scope="{ node, data }" >
        <span>{{ node.label }}</span>
        <span v-if="data.catId != '0'">
          <el-button
            type="text"
            size="mini"
            :disabled="disableupGetItem(data)"
            @click.stop="() => upGETItem(node,data,'up')" >
            上移
          </el-button>
          <el-button
            type="text"
            size="mini"
            :disabled="disabledownGetItem(data)"
            
            @click.stop="() => upGETItem(node, data,'down')">
            下移
          </el-button>
        </span>
      </span>
            </el-tree>
        </el-col>
    </el-col>

    <el-col :span="16" style="padding-left:20px">
      <el-table border:data="goodsList" highlight-current-row>
        <!-- <el-table-column type="selection" width="50"></el-table-column> -->
        <el-table-column prop="logoUrl" label="商品图片" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.goodsImg ?scope.row.goodsImg.split(',')[0]:''" style="width:40px;height:40px;">
          </template>
        </el-table-column>

        <el-table-column prop="goodsName" label="商品名" min-width="200">
        </el-table-column>
        <el-table-column prop="marketPrice" label="销售价" min-width="100" sortable>
        </el-table-column>
              <el-table-column prop="saleNum" label="销量" min-width="100" sortable>
        </el-table-column>
              <el-table-column prop="storageNum" label="库存" min-width="100" sortable>
        </el-table-column>
            	<el-table-column label="操作" width="300" v-if="currentObject.catId  && currentObject.catId !== '0'">
				<template slot-scope="scope">
					<el-button :disabled="currentPage == 0 &&scope.$index==0" size="mini" @click="doSortProduct(goodsList[ scope.$index].linkId,goodsList[ scope.$index-1].linkId)" type="info" plain >上移</el-button>
					<el-button :disabled="(currentPage +1) == pageCount &&goodsList[ scope.$index].goodsId==goodsList[goodsList.length-1].goodsId" size="mini" @click="doSortProduct(goodsList[ scope.$index].linkId,goodsList[ scope.$index+1].linkId)" type="info" plain >下移</el-button>
				</template>
			</el-table-column>
      </el-table>
      
      <el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="page+1"  :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>
    </el-col>
  </el-row>


  <el-dialog :visible.sync="showDialog" :title="dialogType=='add'?'添加'+formatName()+'名称':'修改'+formatName()+'名称'">
    <el-form label-width="100px">
      <el-form-item :label="formatName()+'名称'">
        <el-input v-model="categoryName" style="width:80%"></el-input>
      </el-form-item>

        <el-form-item :label="formatName()+'类型'" v-if="!haveType">
        <el-select v-model="catType">
          <el-option label="首页标签" value="MAIN" v-if="pageType !== 'category' "></el-option>
          <el-option  label="分类标签"  value="CAT" v-if="pageType !== 'category' "></el-option>
          <el-option  :label="'标签'+formatName()"  value="COMMON" v-if="pageType == 'category' "></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div v-if="!haveIcon">
    <div class="el-form-item__label" style="width: 100px;">{{formatName()}}图片</div>  
           <el-upload :before-upload="beforeUpload" :action="fileUploadUrl"   class="avatar-uploader" list-type="picture-card" :show-file-list="false"  :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess1" :file-list="fileList">
                  <img v-if="fileList[fileList.length-1]" :src="fileList[fileList.length-1]?fileList[fileList.length-1].url:''" class="avatar"/>
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog=false">取 消</el-button>
      <el-button type="primary" @click="updateCategory">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog  :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
</div>
</template>

<script>
import util from "../../common/js/util";
import * as Api from "../../api/api";
import * as Config from "../../api/conf";

export default {
  data() {
    return {
      businessType: "MAIN",
      pageType: "category",
      fileUploadUrl: "",
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,

      handleRemove(file, fileList) {
        for (let i in this.fileList) {
          let url = this.fileList[i].url;
          if (url == file.url) {
            console.log("find ...");
            this.fileList.splice(i, 1);
            break;
          }
        }
      },
      beforeUpload(file) {
        console.log("before upload ...");
        console.log("fileList = " + this.$refs.logoUrlUpload.fileList.length);
        if (this.$refs.logoUrlUpload.fileList.length > 0) {
          this.$refs.logoUrlUpload.clearFiles();
        }
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      handleSuccess1(response, file, fileList) {
        let dt = {
          name: "1.png",
          url: response.data.filename
        };
        this.fileList.push(dt);
        console.log(this.fileList);
      },

      handleSuccess2(response, file, fileList) {
        this.fileList.push(response.data.filename);
        console.log(this.fileList);
      },
      pageSize: 10,
      currentPage: 0,
      total: 0,
      height: 700,
      goodsList: [],
      listLoading: false,
      showDialog: false,
      currentObject: {},
      dialogType: "add",
      categoryName: "",
      catType: "CAT",
      currentId: "",
      treeData: [
        {
          catId: "0",
          catName: "分类",
          children: []
        }
      ],

      defaultProps: {
        children: "children",
        label: "catName"
      },
      
      pageCount: 1,
      attrs: [],
      showDialogModel: false,
      storageNum: 0,
      marketPrice: 0,
      labelPrice: 0,
      costPrice: 0,
      barCode: "",
      remark: ""
    };
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      Object.assign(this.$data, this.$options.data());
      this.init();
    }
  },

  mounted() {
    this.init();
  },
  methods: {
    disabledownGetItem(data) {
      let a = false;

      this.treeData[0].children.forEach((item, index) => {
        if (
          data.catId == item.catId &&
          index == this.treeData[0].children.length - 1
        ) {
          a = true;
          return false;
        }
        if (item.children && data.levelNum == 2) {
          item.children.forEach((items, indexs) => {
            if (
              items.catId == data.catId &&
              indexs == item.children.length - 1
            ) {
              a = true;
              return false;
            }
          });
        }
      });
      return a;
    },
    disableupGetItem(data) {
      let a = false;
      this.treeData[0].children.forEach((item, index) => {
        if (data.catId == item.catId && index == 0) {
          a = true;
          return false;
        }
        if (item.children && data.levelNum == 2) {
          item.children.forEach((items, indexs) => {
            if (items.catId == data.catId && indexs == 0) {
              a = true;
              return false;
            }
          });
        }
      });
      return a;
    },
    formatName() {
      if (this.pageType == "category") {
        return "分类";
      } else {
        return "栏目";
      }
    },
    changeBusinessType(e) {
      console.log(e);
      this.businessType = e;
      this.loadAll();
    },
    init() {
      if (window.location.hash !== "#/goodscategory") {
        this.pageType = "business";
        this.catType = "CAT";
      } else {
        this.catType = "COMMON";
      }
      this.treeData[0].catName = this.pageType == "category" ? "分类" : "栏目";
      this.fileUploadUrl = Config.g_upload_url;

      this.listLoading = true;
      this.height = window.innerHeight - 150;
      window.onresize = () => {
        this.height = window.innerHeight - 150;
      };
      this.loadAll();
      this.loadAllProduct();
    },
    upGETItem(node, data, type) {
      let catId1 = data.catId;
      let catId2 = "";
      this.treeData[0].children.forEach((item, index) => {
        if (item.catId == data.catId && type == "up") {
          catId2 = this.treeData[0].children[index - 1].catId;
          return false;
        }
        if (item.catId == data.catId && type == "down") {
          catId2 = this.treeData[0].children[index + 1].catId;
          return false;
        }

        if (item.children && data.levelNum == 2) {
          item.children.forEach((items, indexs) => {
            if (items.catId == data.catId && type == "up") {
              catId2 = item.children[indexs - 1].catId;
              return false;
            }
            if (items.catId == data.catId && type == "down") {
              catId2 = item.children[indexs + 1].catId;
              return false;
            }
          });
        }
      });

      Api.sortCatgory({
        catId1: catId1,
        catId2: catId2
      }).then(res => {
        if (res["retCode"]) {
          this.loadAll();
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
        }
      });
    },

    loadAll() {
      let type = "";
      console.log(this.pageType);
      if (this.pageType == "business") {
        type = this.businessType;
      }
      if (this.pageType == "category") {
        type = "COMMON";
      }
      Api.requestQueryTree(type).then(res => {
        if (res["retCode"]) {
          this.treeData[0].children = res.data.children;
          console.log(this.treeData);
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
        }
      });
    },
    doSortProduct(linkId1, linkId2) {
      Api.sortProduct({
        linkId1: linkId1,
        linkId2: linkId2
      }).then(res => {
        if (!res["retCode"]) {
          this.$alert(res.message);
          return;
        }
        Api.requestQueryGoodsByCat(this.catId, this.currentPage, 20).then(
          res => {
            if (!res["retCode"]) {
              this.$alert(res.message);
              return;
            }
            this.goodsList = res.data.goodsList;
            this.total = res.data.page.total;
            this.pageCount = res.data.page.pageCount;
          }
        );
      });
    },
    loadAllProduct(a) {
      if (this.pageType == "business") {
        this.listLoading = false;
        return;
      }
      if (!a) {
        this.currentPage = 0;
      }
      let params = {
        page: this.currentPage,
        pageSize: 10
      };
      Api.requestQueryGoods(params).then(res => {
        if (res["retCode"]) {
          this.total = res.page.total;
          this.goodsList = res.data;
          this.pageCount = res.page.pageCount;
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
        }
        this.listLoading = false;
      });
    },

    updateCategory() {
      this.showDialog = false;

      let catId = this.currentObject.catId;
      let catName = this.currentObject.catName;
      let catIcon = this.fileList[this.fileList.length - 1]
        ? this.fileList[this.fileList.length - 1].url
        : "";
      console.log(this.dialogType);
      if (this.dialogType == "add") {
        if (catId == "0") {
          catId = "";
        }

        console.log(this.categoryName);
        console.log(catId);
        Api.requestAddCat(
          this.categoryName,
          "",
          catIcon,
          catId,
          this.catType
        ).then(res => {
          console.log(res);

          if (res.retCode == false) {
            this.$alert("添加" + this.formatName() + "错误");
            return;
          }

          let b = this.currentObject.hasOwnProperty("children");

          if (b == true) {
            console.log("in");
            if (!Array.isArray(this.currentObject.children)) {
              this.currentObject.children = [];
            }
            this.loadAll();
          } else {
            this.loadAll();
          }
        });
      }

      if (this.dialogType == "edit") {
        Api.requestEditCat(
          catId,
          this.categoryName,
          catIcon,
          this.catType
        ).then(res => {
          console.log(res);

          if (res.retCode == false) {
            this.$alert("修改" + this.formatName() + "错误");
            return;
          }

          this.currentObject.catName = this.categoryName;
        });
      }
    },
    beforeUpload(file) {
      console.log(file);
      // console.log(this.$refs.upload)
      console.log("before upload ...");
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isLt5M;
    },

    doAddCategory() {
      if ((this.currentObject.catId || "") == "") {
        this.$alert("请选择一个" + this.formatName());
        return;
      }
      this.fileList = [];
      this.dialogType = "add";
      this.showDialog = true;
    },

    onPageChange(currentPage) {
      this.currentPage = currentPage - 1;
      console.log(this.catId);
      if (!this.catId || this.catId == "0") {
        this.loadAllProduct(true);
        return;
      }

      Api.requestQueryGoodsByCat(this.catId, this.currentPage, 20).then(res => {
        if (!res["retCode"]) {
          this.$alert(res.message);
          return;
        }
        this.goodsList = res.data.goodsList;
        this.total = res.data.page.total;
        this.pageCount = res.data.page.pageCount;
      });
    },

    doNodeClick(object, node, control) {
      this.currentPage = 0;
      this.listLoading = true;
      this.currentObject = object;
      let catId = object.catId;
      this.catId = catId;
      if (catId == "0") {
        this.loadAllProduct();
        return;
      } else {
        Api.requestQueryGoodsByCat(catId, this.currentPage, 10).then(res => {
          if (!res["retCode"]) {
            this.$alert(res.message);
            return;
          }

          this.goodsList = res.data.goodsList;
          this.total = res.data.page.total;
          this.pageCount = res.data.page.pageCount;

          this.listLoading = false;
        });
      }
    },

    doDeleteCategory() {
      Api.doConfirm(this, "是否删除该" + this.formatName() + "?").then(ret => {
        if (ret == false) return;

        let catId = this.currentObject.catId;
        Api.requestDeleteCat(catId).then(res => {
          this.loadAll();
        });
      });
    },
    editCategory() {
      if ((this.currentObject.catId || "") == "") {
        this.$alert("请选择一个" + this.formatName());
        return;
      }
      this.fileList = [];

      this.dialogType = "edit";
      this.showDialog = true;
      this.categoryName = this.currentObject.catName;

      if ((this.currentObject.catIcon || "") !== "") {
        this.fileList[this.fileList.length - 1] = {
          name: "1.png",
          url: this.currentObject.catIcon
        };
      }
    }
  },
  computed: {
    disableAdd() {
      let cate = this.currentObject;
      if (cate.catId == "0") return false;
      if (cate.levelNum == 2) return true;
      else if (this.goodsList.length > 0) return true;
      return false;
    },
    haveIcon() {
      let cate = this.currentObject;
      if (cate.catId == "0") return true;

      if (cate.levelNum == 2) return false;
      else if (cate.levelNum == 1 && this.dialogType == "edit") return true;
      return false;
    },
    haveType() {
      let cate = this.currentObject;
      if (this.dialogType == "edit") return true;
      if (cate.levelNum == 2) return true;
      else if (cate.levelNum == 1 && this.dialogType == "add") return true;
      return false;
    }
  }
};
</script>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
