<template>
  <div>

      {{msg}}
   
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Axios from "axios"



@Component
export default class Main extends Vue {
  // 初始化数据
  msg = 123;
  aaa = "test";
  

  // 计算属性
  get computedMsg() {
    return "computed " + this.msg;
  }

  get count(){
    return 1
  }

  // 方法
  greet() {
    alert("greeting: " + this.msg);
  }
}
</script>