<template>
    <div v-bouncing="loading">

        <div style="border-bottom:1px #e5e5e5 solid;">
          <h3>职位管理
          </h3>
           <div style="margin:10px 0;">
平台职位数量统计：{{allCount}}             
            </div>   
          <div style="padding-bottom:20px;">

<el-row :gutter="10">
  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="4">

  <el-cascader change-on-select
  :options="options"
  v-model="departmentId" style="margin-top:20px;"
></el-cascader>
  </el-col>


  <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5" >
   <el-input
  placeholder="请输入职位名称" style="margin-top:20px;" v-model="keyword"
  clearable>
</el-input>
  </el-col>
  <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2" style="min-width:100px;">
<el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="getRoleList(true)">查询</el-button>
  </el-col>
  
             <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
 <el-button
          type="primary"
          @click="changeModel('add')" style="margin-top:20px;" >添加职位</el-button>
 </el-col>

</el-row>
</div>
</div>




<el-table border
    :data="roleList"
    stripe
    style="width: 100%;min-height:500px;">
  <!-- <el-table-column
      prop="name"
      label="部门名称">
   </el-table-column>


  <el-table-column
      prop="parentName"
      label="上级部门">
   </el-table-column> -->
  <el-table-column  fixed="left"
      prop="roleName"
      label="职位名称">
   </el-table-column>
  
  <el-table-column
      prop="userNum"
      label="用户数量">
   </el-table-column>
   
  <el-table-column
      label="职位状态">
      <template slot-scope="scope">
       <el-tag :type="scope.row.roleAvailable ?'success':'info'">
               {{scope.row.roleAvailable ?"启用中":"已停用"}}</el-tag>
      </template>

   </el-table-column>

 
    <el-table-column
      prop="roleDescription"
      label="职位描述"   width="500" >
   </el-table-column>


   <el-table-column label="操作" fixed="right"  width="250">
      <template slot-scope="scope">


   <el-button
          size="mini"
          type="primary"
          @click="showRolePrimss(scope.row)">角色权限</el-button>

          <el-button
          size="mini"
          type="primary"
          @click="changeModel('edit',scope.row)">编辑</el-button>
          

          <el-button
          size="mini"
          type="text"
         @click="handleDelete(scope.$index, scope.row)">删除</el-button>


      </template>
    </el-table-column>
</el-table>
		<el-col :span="24" class="toolbar">

			<el-pagination layout="prev, pager, next" :current-page="page+1" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>


  <el-dialog  :visible.sync="primssModel" width="1050px" center size="tiny"  title="角色权限" :close-on-click-modal="false" top="40px">
    <div style="min-height:500px;" v-bouncing="primssLoading">
      <div>
<div v-for="item in AuthorityList">
    <h4 style="margin: 0;">{{item.name}}</h4>
  <el-checkbox-group v-model="checkboxGroup6" size="small">
      <el-checkbox  v-for="items in item.ButtonPermissionList" :label="items.permissionId" :checked="items.haveFlag">{{items.name}}</el-checkbox>
    </el-checkbox-group>
   </el-checkbox-group>
</div>
</div>

    </div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="primssModel = false">取 消</el-button>
				<el-button type="primary" @click="roleBindPrimss">确 定</el-button>
			</span>
  </el-dialog>


  <el-dialog :visible.sync="model" width="1050px" center size="tiny"  :title="modelType =='add' ?'添加职位':'编辑职位'" :close-on-click-modal="false" top="40px">

 <el-form label-width="120px">

				<el-form-item label="职位名称">
					<el-input v-model="roleForm.role" style="max-width:400px;"></el-input>
				</el-form-item>

				<el-form-item label="职位描述">
					<el-input v-model="roleForm.description" style="max-width:400px;"></el-input>
				</el-form-item>

</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="model = false">取 消</el-button>
				<el-button type="primary" @click="doSubmit">确 定</el-button>
			</span>
  </el-dialog>
    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as indexApi from "../../api/indexApi";
import { Watch } from "vue-property-decorator";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
    @Watch("filterText")
  watchCount(newVal, oldVal) {
    console.log("newVal", newVal, "oldVal", oldVal);
    let a: any = this.$refs.tree2;
    a.filter(newVal);
  }
   filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      }
filterText=""
  loading=false
  handleDelete(index, row) {

if(row.userNum>0){
  this.$alert('不可删除有用户的职位');
  return
}


    this.$confirm("此操作将删除该职位, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        console.log(row);

        indexApi
          .deleteRoleModel({
            roleId: row.roleId
          })
          .then(res => {
            if (res["retCode"]) {
              this.$message("删除成功");
              this.getRoleList();
            } else {
              if(!res['islogin']){this.$alert(res["message"]);}
              console.error("数据查询错误");
            }
          });
        // role_id
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }

  roleForm = {};
checkboxGroup6 = []
  model = false;
  modelType = "add";

  handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      }
  changeModel(type, row) {


  
    this.modelType = type;
    this.roleForm = {};
    if (row) {
      let a = {};
      Object.assign(a, row);
      this.roleForm = a;
      this.roleForm["role"] = this.roleForm["roleName"];
      this.roleForm["description"] = this.roleForm["roleDescription"];
      this.roleForm["role_id"] = this.roleForm["roleId"];
    }

this.model =true
  }

  
  primssRow = {}
  showRolePrimss(row){

    this.primssLoading=true
    this.AuthorityList = []
    let a = {}
    Object.assign(a,row)
    this.primssRow = a
     this.checkboxGroup6 = []
    this.roleGetPrimss(row);
    this.primssModel = true;
  }

  primssLoading = false
primssModel = false
  roleGetPrimss(row){
indexApi.getRolePermission(
 {roleId: row.roleId}
).then(res => {
        this.primssLoading=false
        if (res["retCode"]) {
            this.AuthorityList = res.data.MenuButtonPermissionList
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
  
      });
// indexApi.roleGetPrimss(
//  {roleId: row.roleId}
// ).then(res => {
//         if (res["retCode"]) {
//           if(res.data.rolepermission.length>0){
//             this.checkboxGroup6 = res.data.permissionIdList
//           }
//         } else {
//           if(!res['islogin']){this.$alert(res["message"]);}
//           console.error("数据查询错误");
//         }
//         this.primssLoading=false
//       });

  }

roleBindPrimss(){
this.primssLoading = true
indexApi.roleBindPrimss(
 {roleId: this.primssRow['roleId'],
 permissionIdList:this.checkboxGroup6.join(',')
 }
).then(res => {
this.primssLoading = false
  
  console.log('更新权限',res)
        if (res["retCode"]) {
this.$message('保存成功');
this.primssModel = false  

} else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
}

  doSubmit() {
  if((this.roleForm['role']||'')==''){
this.$alert('请输入职位名称')
return
  }
  if((this.roleForm['description']||'')==''){
this.$alert('请输入职位描述')
    return
  }




    if (this.modelType == "add") {
      indexApi.addRoleModel(this.roleForm).then(res => {
        if (res["retCode"]) {
          this.$message("添加成功");
          this.getRoleList();
              // 更新权限问题
              this.roleForm['roleId'] =  res.data.roleId

          this.model = false;
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
    } else {
      indexApi.updateRoleModel(this.roleForm).then(res => {
        if (res["retCode"]) {
          this.$message("保存成功");
          this.getRoleList();
              // 更新权限问题

          this.model = false;
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
    
    }

  

  }
 defaultProps=  {
        children: "children",
        label: "name"
      }
  roleList = [];
  keyword = "";

  options = [];
  departmentId = "";

  page = 0;
  pageSize = 10;
  total = 0;
  onPageChange(page) {
    this.page = page - 1;
    this.getRoleList();
  }



  getRoleList(filter=null) {
    if(filter){
      this.page = 0
    }
    let departmentId = "";
    if (this.departmentId.length > 0) {
      departmentId = this.departmentId[this.departmentId.length - 1];
    }
    indexApi
      .queryRoleList({
        keyword: this.keyword,
        departmentId: departmentId,
        page: this.page,
        pageSize: this.pageSize
      })
      .then(res => {
        this.loading= false
        if (res["retCode"]) {
          this.roleList = res.data.roleList;
          this.total = res.data.page.total
        } else {
          if(!res['islogin']){this.$alert(res["message"]);}
          console.error("数据查询错误");
        }
      });
  }
  getDepartment() {
    indexApi.getDepartment({}).then(res => {
      console.log(res);
      if (res["retCode"]) {
        this.options = res.data.children;

        this.options.unshift({
          departmentId: "",
          label: "全部",
          name: "全部",
          value: ""
        });
        console.log("获取部门树", res.data);
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  allCount = 0;

  alloCount() {
    indexApi.allCountrole().then(res => {
      console.log(res);
      if (res["retCode"]) {
        this.allCount = res.data.num;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  AuthorityList = []
  getPermission() {
    indexApi.getPermission({}).then(res => {
      if (res["retCode"]) {
        this.AuthorityList = res.data.AuthorityList;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }

  mounted() {
    this.loading = true
    this.alloCount();
    this.getRoleList();
    this.getDepartment();

    // this.getPermission();
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