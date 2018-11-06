<template>
    <div>

        <div style="">
          <h3>药品库管理
          </h3>
          
 <div style="10px;">
药品数量统计：{{alldrug}}              
            </div>

        </div>


      <filterdrug @allDrug="allDrug"></filterdrug>




    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import filterdrug from "./filterdrug";

@Component({
  props: {},
  components: {
filterdrug
    }
})
export default class AddGoods extends Vue {
  alldrug=0
 allDrug(){
      indexApi.allDrug().then(res => {
      if (res["retCode"]) {
          console.log(res.data)
          this.alldrug = res.data
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  
  mounted() {
      this.allDrug()
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