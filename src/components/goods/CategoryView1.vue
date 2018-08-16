<template>
<div >
  <el-row :gutter="10">
  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
    
    
  <div style="padding:20px;">
    
  <el-card shadow="hover">
      <div slot="header" class="clearfix">
    <span>首页运营栏目</span>
  <el-button style="float: right; padding: 3px 0"  type="text" @click="doAdd('main');">增加栏目</el-button>
  </div>
  <div v-if="catList.length==0" style="padding:20px;text-align:center;color:#666;font-size:14px;">
  暂无信息
</div>
  <div style="margin-top:20px;" v-for="(item,index) in catList" :key="index">
  <!-- <el-tag type="info" size="mini" v-if="item.editStatus">未保存</el-tag> -->
    <span style="width:100px;"> 栏目{{item.name}}：</span>
    <el-cascader style="width:300px;" placeholder="选择栏目" v-model="item.option" :options="options" filterable @change="doSelect(item,index,'main')"></el-cascader>

    <el-button style="margin-left:20px;" type="primary" plain @click="doDelete(item,index,'main')">删除</el-button>

    <!-- <el-button style="margin-left:20px;" type="primary" plain @click="doDisplay(item,index)">显示内容</el-button> -->
    <el-button style="margin-left:20px;"  v-if="item.editStatus" type="primary" plain @click="doUpdate(item,index,'main')">确定</el-button>
  </div>
    </el-card>
  </div>


  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
    
    <div style="padding:20px;">
    
  <el-card shadow="hover">

        <div slot="header" class="clearfix">
    <span>分类运营栏目</span>
  <el-button style="float: right; padding: 3px 0"  type="text" @click="doAdd('cat')">增加栏目</el-button>
  </div>

<div v-if="catList1.length==0" style="padding:20px;text-align:center;color:#666;font-size:14px;">
  暂无信息
</div>
  <div style="margin-top:20px;" v-for="(item,index) in catList1" :key="index">
  <!-- <el-tag type="info" size="mini" v-if="item.editStatus">未保存</el-tag> -->
    <span style="width:100px;"> 栏目{{item.name}}：</span>
    <el-cascader style="width:300px;" placeholder="选择栏目" v-model="item.option" :options="options1" filterable @change="doSelect(item,index,'cat')"></el-cascader>

    <el-button style="margin-left:20px;" type="primary" plain @click="doDelete(item,index,'cat')">删除</el-button>

    <!-- <el-button style="margin-left:20px;" type="primary" plain @click="doDisplay(item,index)">显示内容</el-button> -->
    <el-button style="margin-left:20px;"  v-if="item.editStatus" type="primary" plain @click="doUpdate(item,index,'cat')">确定</el-button>
  </div>
    </el-card>
  </div>

  </el-col>
</el-row>






</div>
</template>

<script>
import util from "../../common/js/util";
import Vue from "vue";
import * as Api from "../../api/api";
import * as catApi from "../../api/catapi";

export default {
  data() {
    return {
      catFormList: [],
      catList: [],
      catList1: [],

      catIdList1: [""],
      catIdList2: [""],
      catIdList3: [""],
      options: [
        { value: "111", label: "最新分类" },
        { value: "222", label: "最新分类2" },
        { value: "333", label: "最新分类333" }
      ],
      options1: [
        { value: "111", label: "最新分类" },
        { value: "222", label: "最新分类2" },
        { value: "333", label: "最新分类333" }
      ]
    };
  },

  updated() {},
  activated() {},
  mounted() {
    //
    this.getMain();
    this.getCat();
  },
  watch: {
    goodsId(goodsId) {
      this.queryLink();
    }
  },
  props: ["goodsId"],
  methods: {
    getMain() {
      Api.requestQueryTree("MAIN").then(res => {
        this.options = res.data.children;
      });
    },
    getCat() {
      Api.requestQueryTree("CAT").then(res => {
        this.options1 = res.data.children;
      });
    },
    doSelect(item, index, type) {
      if (type == "main") {
        let a = true;
        if (typeof this.catList[index].category == "object") {
          a =
            this.catList[index].option[0] !==
              this.catList[index].category.parentId ||
            this.catList[index].option[1] !==
              this.catList[index].category.catId;
        }
        item.editStatus = a;
        console.log(item.editStatus);
        this.catList.push();
      } else {
        let a = true;
        if (typeof this.catList1[index].category == "object") {
          a =
            this.catList1[index].option[0] !==
              this.catList1[index].category.parentId ||
            this.catList1[index].option[1] !==
              this.catList1[index].category.catId;
        }
        item.editStatus = a;
        console.log(item.editStatus);
        this.catList1.push();
      }
    },

    doUpdate(item, index, type) {
      if (item.option.length < 1) {
        this.$alert("选择数据错误");
        return;
      }

      let catId = item.option[item.option.length - 1];
      if (!item.linkId) {
        catApi.addCatGoodsRela(this.goodsId, catId).then(res => {
          console.log(res);
          if (res.retCode == true) {
            this.queryLink();
          } else {
            console.error("信息错误");
            console.error(res);
          }
        });
        return;
      }
      catApi.updateCatGoodsRela(item.linkId, this.goodsId, catId).then(res => {
        if (res.retCode == true) {
          this.$alert("修改成功！");
          item.editStatus = false;
          if (type == "main") {
            this.catList.push();
          } else {
            this.catList1.push();
          }
        } else {
          this.$alert("修改失败");
        }
      });
    },

    doDisplay(item, index) {
      this.$alert(JSON.stringify(item.option));
    },

    doDelete(item, index, type) {
      if (type == "main") {
        if (!item.catId) {
          this.catList.splice(index, 1);

          return;
        }

        Api.doConfirm(this, "是否删除该栏目信息").then(res => {
          if (res == true) {
            catApi.deleteCatGoodsRela(this.goodsId, item.catId).then(res => {
              if (res.retCode) {
                this.catList.splice(index, 1);
              } else {
                this.$alert("删除出错");
              }
            });
          }
        });
      } else {
        if (!item.catId) {
          this.catList1.splice(index, 1);

          return;
        }

        Api.doConfirm(this, "是否删除该栏目信息").then(res => {
          if (res == true) {
            catApi.deleteCatGoodsRela(this.goodsId, item.catId).then(res => {
              if (res.retCode) {
                this.catList1.splice(index, 1);
              } else {
                this.$alert("删除出错");
              }
            });
          }
        });
      }
    },

    queryLink() {
      catApi.queryGoodsRela(this.goodsId, "MAIN").then(res => {
        if (res.retCode == true) {
          console.log("main", res.data);
          this.catList = res.data;
          this.catList.forEach((item, index) => {
            item.option = [item.category.parentId, item.category.catId];
          });
        } else {
          console.error(res);
        }
      });

      catApi.queryGoodsRela(this.goodsId, "CAT").then(res => {
        if (res.retCode == true) {
          console.log("cat", res.data);
          this.catList1 = res.data;
          this.catList1.forEach((item, index) => {
            item.option = [item.category.parentId, item.category.catId];
          });
        } else {
          console.error(res);
        }
      });
    },
    doAdd(type) {
      if (type == "main") {
        this.catList.push({
          name: "",
          options: [],
          editStatus: false
        });
      } else {
        this.catList1.push({
          name: "",
          options1: [],
          editStatus: false
        });
      }
    }
  }
};
</script>

<style scoped>
.sku-attr-layout {
  display: flex;
  width: 90%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 40px;
  align-items: center;
}
</style>
