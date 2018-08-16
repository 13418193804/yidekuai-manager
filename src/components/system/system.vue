<template>
    <div>
      <!-- <ul>
    <li  v-scroll-to="'#element'">section 1</li>
  
</ul>

     <div style="margin-top:1000px;"  id="element">111</div> -->
           <el-input v-model="name"
  placeholder="权限"  
  clearable>
</el-input>

    <el-button size="small" type="primary" @click="doaddSubmit()">新增一个权限</el-button>
{{dohavePermission('1')}}
      
<el-table border
    :data="AuthorityList"
    stripe 
    style="width: 100%;min-height:500px">

  <el-table-column
      prop="permissionId"
      label="权限ID" width="210">
   </el-table-column>

  <el-table-column
      prop="name"
      label="权限名" width="210">
   </el-table-column>
   
   <el-table-column label="操作" fixed="right" >
      <template slot-scope="scope">

 
        <el-button
          size="mini"
          type="text"
          @click="dodelete(scope.$index, scope.row)" >删除</el-button>
        </template>
    </el-table-column>

</el-table>

    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as systemApi from "../../api/systemApi1";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {

mounted(){
this.getList()
}
AuthorityList = []
name = ''
doaddSubmit(){
    systemApi.doaddSubmit({
      name:this.name,
      resourceType:'menu'
      }).then(res => {
      if (res["retCode"]) {
     this.getList()
} else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
}
dodelete(index,row){

 systemApi.doDelete({
   permissionId:row.permissionId
 }).then(res => {
      if (res["retCode"]) {
      this.getList()
} else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });

}
getList(){
    systemApi.queryPrimms({}).then(res => {
      if (res["retCode"]) {
        console.log(res.data)
        this.AuthorityList = res.data.AuthorityList
} else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
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