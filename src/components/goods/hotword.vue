<template>
    <div>
    <h3 class="title" align="left" style="margin:20px;">热词管理</h3>
  
<div style="padding:10px;background-color:#f7f7f7;display:flex;">

					<el-button v-if="dohavePermission('添加热词')"  size="small" style="" type="primary" @click="changeModel('add',null)">添加热词</el-button>
    
</div>

      <el-table border
    ref="multipleTable"
    :data="hotwordList"
    tooltip-effect="dark"
    style="width: 70%"
    >
   
    <el-table-column
      label="热词" header-align="center">
      <template slot-scope="scope">{{ scope.row.word }}</template>
    </el-table-column>
   
	<el-table-column label="操作" width="380" header-align="center">
				<template slot-scope="scope">
					<el-button  @click="changeModel('edit',scope.row)"  size="mini" v-if="dohavePermission('编辑热词')">编辑</el-button>
					<el-button  @click="doDelete(scope.row)" size="mini" type="text" v-if="dohavePermission('删除热词')">删除</el-button>
        </template>
			</el-table-column>

  </el-table>



    


	<el-dialog :visible.sync="model" size="small" :title="type=='add'?'添加用户':'修改用户'" :close-on-click-modal="false">


      	 <el-form label-width="120px">
          

				<el-form-item label="热词" style="max-width:400px">
					<el-input placeholder="请输入热词" v-model="obj.word" maxlength="22"></el-input>
				</el-form-item>

</el-form>
			


			<span slot="footer" class="dialog-footer" >
				<el-button @click="model = false">取 消</el-button>
				<el-button type="primary" @click="doSubmit">{{type=='add'?'添加':'保存'}}</el-button>
			</span>

		</el-dialog>





    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as UserApi from "../../api/UserApi";
import * as Api from "../../api/api";
@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  hotwordList = [];
  obj = {};
  model = false;
  type = "add";
  changeModel(type, row) {
    if (type == "add") {
      this.obj = {};
      this.type = type;
    }
    if (type == "edit") {
      let a = {};
      Object.assign(a, row);
      this.obj = a;
      this.type = type;
    }
    this.model = !this.model;
  }

  queryList() {
    UserApi.getHotword().then(res => {
      if (res.status == 200) {
        console.log(res.data);
        this.hotwordList = res.data.data;
      } else {
        console.error("数据查询错误");
      }
    });
    console.log("查询列表");
  }
  doSubmit() {
    if ((this.obj["word"] || "") == "") {
      this.$message("请输入热词");
      return;
    }
    if (this.type == "add") {
      UserApi.addHotWord(this.obj).then(res => {
        if (res["retCode"]) {
          this.$message("添加成功");
          this.changeModel(null, null);
          this.queryList();
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
    }
    if (this.type == "edit") {
      UserApi.updateHotWord(this.obj).then(res => {
        if (res["retCode"]) {
          this.$message("更新成功");
          this.changeModel(null, null);
          this.queryList();
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
    }
  }
  doDelete(row) {
    Api.doConfirm(this, "是否删除该热词").then(res => {
      if (res) {
        UserApi.deleteHotWord({ id: row.id }).then(res => {
          if (res["retCode"]) {
            this.$message("删除成功");
            this.queryList();
          } else {
            if(!res['islogin']){this.$alert(res["message"]);}
            console.error("数据查询错误");
          }
        });
      }
    });
  }
  mounted() {
    this.queryList();
    console.log("页面加载");
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