<template>
    <div>
    <div style="padding:40px;font-size:14px;color:#666;">

        <h4>医德快平台</h4>

        <div v-for="message in Message">
        版本号V{{message.vs}}
        <div>更新内容</div>
        <div v-for="(item,index) in message.it">
          {{index+1}}. {{item}}
        </div>
        </div>
              </div>

    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
Message=[
  {
    vs:'1.0',
    it:[
      "修复 表头",
    ]
  },
   {
    vs:'1.1',
    it:[
      "修复 医生数据 - 医生职称",
    ]
  }
]
mounted(){

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