<template>
    <div v-loading="loading">

        <div style="border-bottom:1px #e5e5e5 solid;">
          <h3>部门管理
          </h3>


<el-row :gutter="24" style="margin: 20px 20px 0;min-width:180px" >
  <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="6">
              <el-button
          size="mini"
          type="primary"
          @click="changeModel('add')" style="margin-bottom:20px;">添加部门</el-button>
             
  </el-col>


</el-row>
          
</div>



<el-row :gutter="24" style="margin: 10px;">
  <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="10" style="margin-top:20px;">
<div style="border:solid 1px #e5e5e5; padding:10px;">

    
<el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</el-input>

<el-tree
  class="filter-tree"
  :data="tableTree" @node-click="doNodeClick"
  :props="defaultProps" :expand-on-click-node="false"
  default-expand-all  highlight-current
  :filter-node-method="filterNode"
  ref="tree2">
</el-tree>
</div>
  </el-col>

  <el-col style="margin-top:20px;" :xs="24" :sm="24" :md="24" :lg="15" :xl="14">
<el-table border
    :data="roleList"
    stripe
    style="width: 100%">

  <el-table-column  fixed="left"
      prop="name"
      label="部门名称" width="150">
   </el-table-column>


  <el-table-column
      prop="parentName"
      label="上级部门">
   </el-table-column>
  <el-table-column
    
      label="部门角色">
        <template slot-scope="scope">
        {{roletoString(scope.row.roleList)}}
      </template>
   </el-table-column>

  <el-table-column
      prop="TotalUserNum"
      label="用户数量">
   </el-table-column>

   <el-table-column label="操作" fixed="right"  width="170">
      <template slot-scope="scope">
         <el-button
          size="mini"
          type="primary"
          @click="changeModel('edit',scope.row)" style="margin-bottom:20px;" >编辑</el-button>
          <el-button
          size="mini"
          type="text"
          @click="doDelete(scope.$index,scope.row)" style="margin-bottom:20px;">删除</el-button>
          
      </template>
    </el-table-column>
</el-table>
  </el-col>
</el-row>

  <el-dialog :visible.sync="model" width="1050px" center size="tiny"   :title="modelType =='add' ?'添加部门':'编辑部门'"  :close-on-click-modal="false" top="40px">
 <el-form label-width="120px">
				<el-form-item label="部门名称">
					<el-input v-model="departmentForm.name"  style="max-width:400px;"></el-input>
				</el-form-item>
		<el-form-item label="上级部门">
    
  <el-cascader
  :options="tableTree"   change-on-select
  v-model="parentId"></el-cascader>
				</el-form-item>
		<el-form-item label="职位名称">
        <div >
    <el-checkbox-group v-model="checkboxGroup6" size="mini" >
      <el-checkbox v-for="(item,index) in options" :label="item.roleId" border>{{item.roleName}}</el-checkbox>
    </el-checkbox-group>
  </div>
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


  loading = false
    model = false;
    checkboxGroup6=[]
    parentId = []
departmentForm:any={
}
  modelType ='add'
  row = {}
changeModel(type,row) {
    this.modelType = type;
    this.departmentForm = {};
    this.checkboxGroup6 = [];
    this.parentId = []
    if (type=='edit') {
      let a = {};
      Object.assign(a,  row);
      this.departmentForm = a;
      this.row = row
      row.roleList.forEach((item,index)=>{
      this.checkboxGroup6.push( item.roleId)
      })

      if(row.parentId){
        this.queryDepartmentAtMySelf(row.parentId,res=>{
          if(res){
            console.log('附上去的角色list',res)
            
             this.parentId = res
             this.parentId.unshift("");
          }
        })
      }else{
             this.parentId = [""];
      }



    }
    this.model = true;
  }
getRoleList(departmentId) {
let data = {}
if(departmentId){
  Object.assign(data,{departmentId: departmentId})
}
    indexApi
      .queryRoleList(data)
      .then(res => {
        if (res["retCode"]) {
          if(departmentId){
let roleIdModel:any = []
            res.data.roleList.forEach((item,index)=>{
             roleIdModel.push( item.roleId)
            })
            this.checkboxGroup6 = roleIdModel
          }

        } else {
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });
  }
  queryDepartmentAtMySelf(departmentId,callback){
  indexApi.queryDepartmentAtMySelf({
    departmentId:departmentId
  }).then(res => {
            
        if (res["retCode"]) {
          callback(res.data.list)
        } else {
          callback(null)
          if (!res["islogin"]) {
            this.$alert(res["message"]);
          }
          console.error("数据查询错误");
        }
      });

}
  doDelete(index,row){
 this.$confirm("删除该部门？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
  
 indexApi.deleteDepartment({departmentId:row.departmentId}).then(res => {
      if (res["retCode"]) {
          this.$message('已删除一条部门记录')
          this.getDepartmentAllList(this.row['departmentId']);
    this.getDepartment();
          
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });


      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });


  }
doSubmit(){



  this.departmentForm['parentId'] = this.parentId[this.parentId.length-1]
     this.departmentForm['roleId'] =   this.checkboxGroup6.join(',');

  if(this.modelType =='add'){
  indexApi.adddepartmentModel(  this.departmentForm).then(res=>{
                if (res["retCode"]) {
                  this.$message('保存成功')
                  this.getDepartment();
                  this.getDepartmentAllList(this.row['departmentId'])
    this.model = false;
            } else {
              if(!res['islogin']){this.$alert(res["message"]);}
              console.error("数据查询错误");
            }
          })
  }else{
indexApi.aupdatedepartmentModel(  this.departmentForm).then(res=>{
                if (res["retCode"]) {
                  this.$message('保存成功')
                  this.getDepartment();
                  this.getDepartmentAllList(this.row['departmentId'])
    this.model = false;
            } else {
              if(!res['islogin']){this.$alert(res["message"]);}
              console.error("数据查询错误");
            }
          })



  }



}
  filterNode(value, data) {

    if (!value) return true;
    return data.label.indexOf(value) !== -1;
    
  }
  currentObject = {}

  doNodeClick(object, node, control) {
       
// object.departmentId
this.row = object
          this.getDepartmentAllList(object.departmentId);
          
    }

  filterText = "";
  tableTree = [
    {
      id: 1,
      label: "所有部门",
      value:'',
      children: {}
    }
  ];
  defaultProps = {
    children: "children",
    label: "label"
  };

  roleList = [];

    roletoString(list){
    let a = []
  list.forEach((item,index)=>{
    a.push(item.roleName)
    return 
  })
return a.join(',')
  }

  getDepartmentAllList(departmentId) {
    indexApi.getDepartmentAllList({
departmentId:departmentId
    }).then(res => {

      this.loading = false
      if (res["retCode"]) {
          this.roleList = res.data.department 
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
        this.tableTree[0].children = res.data.children;
        console.log("获取部门树", res.data);
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  options = []
    getallRoleList() {

    indexApi.queryRoleList({}).then(res => {
      if (res["retCode"]) {
        this.options = res.data.roleList 
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }
  mounted() {
      this.loading = true
    
    this.getDepartment();
    this.getallRoleList();
    this.getDepartmentAllList('')
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