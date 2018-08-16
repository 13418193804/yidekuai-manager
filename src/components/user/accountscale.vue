<template>
    <div>
    <h3 class="title">奖励金设置</h3>
        

        <div style="padding:20px;">


    <el-input placeholder="请输入内容" v-model="scale" class="input-with-select" style="width:250px">
    <el-button slot="prepend"> 推广奖励金</el-button>
    <el-button slot="append"> %</el-button>
  </el-input>

<el-button style="margin:0 30px;" @click="updateScale()">保存</el-button>
        </div>
    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as UserApi from "../../api/UserApi";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  scale = "0";
  updateScale() {
    
    UserApi.updateScale(this.scale).then(res => {
      if (res["retCode"]) {
        this.$message("保存成功");
        this.queryScale();
      } else {
        console.error("数据查询错误");
      }
    });
  }
  queryScale() {
    UserApi.queryScale().then(res => {
      if (res["retCode"]) {
        this.scale = res.data.scale;
      } else {
        console.error("数据查询错误");
      }
    });
  }
  mounted() {
    this.queryScale();
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