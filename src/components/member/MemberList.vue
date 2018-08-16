<template>
    <div>
    <h3>会员列表</h3>
    <p>
        会员列表
    </p>
    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from 'axios';

@Component
export default class AddGoods extends Vue {
  mounted() {
    console.log("add goods");
  }


  doListProduct(){
  
  
  }
}
</script>

<style  scoped>
</style>