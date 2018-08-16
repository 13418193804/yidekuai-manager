<template>
    <div>
    <h3 class="title">角色管理</h3>

<div style="width:100%;background-color:#f7f7f7;padding:20px;display:flex;   ">
 

 <div  style="padding-right:40px;">
     <el-button type="primary" @click="changeModel('add')">添加后台角色</el-button>
    </div>

</div>



 <el-table border
    ref="multipleTable"
    :data="roleList"
    tooltip-effect="dark"
    style="width: 70%;min-height:500px;"
    >
   
    <el-table-column  fixed="left"
      label="角色名" header-align="center">
      <template slot-scope="scope">{{ scope.row.roleName }}</template>
    </el-table-column>
        <el-table-column
      label="人数" header-align="center">
      <template slot-scope="scope">{{ scope.row.userNum }}</template>
    </el-table-column>
       <el-table-column
      label="创建时间" header-align="center">
      <template slot-scope="scope">{{ scope.row.createTime }}</template>
    </el-table-column>

	<el-table-column label="操作" width="300" header-align="center">
				<template slot-scope="scope">
						<el-button size="mini" type="info" @click="changeModel('edit',scope.row)" plain :disabled="scope.row.status">编辑</el-button>
						<el-button size="mini" type="text" @click="doDelete(scope.row )" plain :disabled="scope.row.status">删除</el-button>
				</template>
			</el-table-column>

  </el-table>





<!-- <el-col :span="24" class="toolbar">

			<el-pagination layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col> -->





<!-- model -->


	<el-dialog :visible.sync="model" size="small" :title="type=='add'?'添加角色':'修改角色'" :close-on-click-modal="false">


      	 <el-form label-width="120px">
          


				<el-form-item label="角色名称" style="max-width:400px">
					<el-input placeholder="请输入角色名称" v-model="obj.roleName" ></el-input>
				</el-form-item>

</el-form>
			<div>



<div class="el-form-item__label">
  勾选后台角色可执行的后台操作：
</div>
      
<div style="    clear: both;"></div>
<div style="text-align:initial;padding:0 20px">


    <el-checkbox-group v-model="checkboxGroup5" size="small">
  
  <div style="margin-top: 20px">
      <el-checkbox label="页面管理" border ></el-checkbox>
  </div>

        <div style="margin-top: 20px">
      <el-checkbox label="商品查询" border ></el-checkbox>
      <el-checkbox label="添加商品" border></el-checkbox>
      <el-checkbox label="商品上下架" border></el-checkbox>
      <el-checkbox label="编辑商品" border></el-checkbox>
      <el-checkbox label="商品删除" border ></el-checkbox>
  </div>
        
       
         <div style="margin-top: 20px">
      <el-checkbox label="分类查询" border ></el-checkbox>
      <el-checkbox label="添加分类" border></el-checkbox>
      <el-checkbox label="编辑分类" border></el-checkbox>
      <el-checkbox label="删除分类" border ></el-checkbox>
  </div>


 <div style="margin-top: 20px">
      <el-checkbox label="栏目查询" border ></el-checkbox>
      <el-checkbox label="添加栏目" border></el-checkbox>
      <el-checkbox label="编辑栏目" border></el-checkbox>
      <el-checkbox label="删除栏目" border ></el-checkbox>
  </div>
  <div style="margin-top: 20px">
      <el-checkbox label="搜索热词" border ></el-checkbox>
      <el-checkbox label="添加热词" border></el-checkbox>
      <el-checkbox label="编辑热词" border></el-checkbox>
      <el-checkbox label="删除热词" border ></el-checkbox>
  </div>
 <div style="margin-top: 20px">
      <el-checkbox label="订单查询" border ></el-checkbox>
      <el-checkbox label="发货" border></el-checkbox>
      <el-checkbox label="处理退款/退货地址" border></el-checkbox>
      <el-checkbox label="审核评论" border ></el-checkbox>
  </div>


   <div style="margin-top: 20px">
      <el-checkbox label="会员管理" border ></el-checkbox>
      <el-checkbox label="意见反馈" border ></el-checkbox>
      <el-checkbox label="提现查询" border ></el-checkbox>
      <el-checkbox label="佣金设置" border ></el-checkbox>
      <el-checkbox label="提现审核" border ></el-checkbox>
  </div>


 <div style="margin-top: 20px">
      <el-checkbox label="优惠券查询" border ></el-checkbox>
      <el-checkbox label="添加优惠券" border ></el-checkbox>
      <el-checkbox label="编辑优惠券" border ></el-checkbox>
      <el-checkbox label="删除优惠券" border ></el-checkbox>
  </div>





    </el-checkbox-group>


        </div>

</div>

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
import * as sysApi from "../../api/sysApi";
import * as Api from "../../api/api";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  roleList = [];

  checked3 = true;
  checked4 = false;
  checked5 = false;
  checked6 = true;
  checkboxGroup5 = [];
  model = false;

  obj = {};
  type = "add";
  changeModel(type, row) {
    this.checkboxGroup5 = [];
    this.type = type;
    if (this.type == "add") {
      this.obj["roleName"] = "";
    } else {
      let a = {};
      Object.assign(a, row);
      this.obj = a;
      this.queryPermissionIds(this.obj["id"]);
    }
    this.model = !this.model;
  }
  doDelete(row) {
    Api.doConfirm(this, "是否需要删除该角色!").then(res => {
      if (res) {
        sysApi
          .deleteRole({
            roleId: row.id
          })
          .then(res => {
            if (res["retCode"]) {
              this.queryList();
              this.$message("删除成功");
            } else {
              if(!res['islogin']){this.$alert(res["message"]);}
              console.error("数据查询错误");
            }
          });
      }
    });
  }
  queryPermissionIds(roleId) {
    sysApi
      .queryPermissionIds({
        roleId: roleId
      })
      .then(res => {
        if (res["retCode"]) {
          console.log("查询角色权限", res.data);
          this.checkboxGroup5 = this.checkboxGroup5 ? this.checkboxGroup5 : [];
          res.data.forEach((item, index) => {
            this.checkboxGroup5.push(item.permissionId);
          });
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
  }
  changePermissionIds(roleId) {
    sysApi
      .changePermissionIds({
        roleId: roleId,
        permissionIds: this.checkboxGroup5.join(",")
      })
      .then(res => {
        if (res["retCode"]) {
          this.$message("权限配置已保存");
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
  }

  doSubmit() {
    if (this.type == "add") {
      sysApi.doRoleAdd(this.obj["roleName"]).then(res => {
        if (res["retCode"]) {
          console.log(res.data);
          this.changePermissionIds(res.data.id);
          this.$message("添加成功");
          this.model = !this.model;
          this.queryList();
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
    } else {
      sysApi.doRoleUpdate(this.obj).then(res => {
        if (res["retCode"]) {
          console.log();
          this.changePermissionIds(this.obj["id"]);
          this.$message("修改成功");
          this.model = !this.model;
          this.queryList();
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
        }
      });
    }
  }
  queryList() {
    sysApi.queryRoleList().then(res => {
      if (res["retCode"]) {
        console.log(res.data);
        this.roleList = res.data;
      } else {
        console.error("数据查询错误");
      }
    });
    console.log("查询列表");
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