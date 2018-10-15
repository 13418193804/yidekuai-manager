<template>
    <div v-bouncing="loading">
        <div>
        <h3>科室管理</h3>
        <div style="border-bottom: 1px solid #E5E5E5;padding-bottom:20px;">平台科室数量统计：{{departmentcount}}个</div>
        <div style="padding:20px 0;">
            <el-button type="primary" @click="dialogFormVisible = true">新增科室</el-button>
        </div>
        </div>

        <el-row :gutter="24" style="margin: 10px;">
  <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="10">
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

  <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="14">
<el-table border
    :data="departmentlist"
    stripe
    style="width: 100%">
  <el-table-column  fixed="left"
      prop="departmentName"
      label="科室名称">
   </el-table-column>
  <el-table-column
      prop="superiorDepartmentName"
      label="上级科室">
   </el-table-column>
  <el-table-column
      prop="sumDepar"
      label="用户数量">
   </el-table-column>
   <el-table-column label="操作" fixed="right"  width="300">
      <template slot-scope="scope">
         <el-button
          size="mini"
          type="primary"
          @click="changeModel(scope.row)" style="margin-bottom:20px;"  v-promiss.edit>编辑</el-button>
          <el-button
          size="mini"
          type="text"
          @click="doDelete(scope.$index,scope.row)" style="margin-bottom:20px;">删除</el-button>
          
      </template>
    </el-table-column>
</el-table>

  </el-col>


</el-row>


        <el-dialog title="增加科室" :visible.sync="dialogFormVisible" @close="addcancel('departmentForm')" :close-on-click-modal="false">
        <el-form  label-width="100px" :model="departmentForm" :rules="rules" ref="departmentForm">
        <el-form-item label="新增科室" prop="departmentName">
            <el-input v-model="departmentForm.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="上级科室">
            <el-cascader clearable
            v-model="parentid"
            :options="tableTree"
            change-on-select
            @change="handleChange"
            ></el-cascader>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addcancel('departmentForm')">取 消</el-button>
            <el-button type="primary" @click="adddepartment('departmentForm')" :disabled="loading">确 定</el-button>
        </div>
        </el-dialog>
        
        <el-dialog title="修改科室" :visible.sync="dialogFormVisible1" @close="updatecancel('formLabelAlign1')" :close-on-click-modal="false">
        <div v-bouncing="updateloading">
        <el-form  label-width="100px" :model="formLabelAlign1" :rules="rules" ref="formLabelAlign1">
        <el-form-item label="科室名称" prop="departmentName">
            <el-input v-model="formLabelAlign1.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="上级科室">
            <el-cascader clearable
            v-model="updateparentid"
            :options="tableTree"
            change-on-select
            @change="updatehandleChange"

            ></el-cascader>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="updatecancel('formLabelAlign1')">取 消</el-button>
            <el-button type="primary" @click="updatedepartment('formLabelAlign1')" :disabled="loading">确 定</el-button>
        </div>
        </div>
        </el-dialog>

    </div>
    
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as departmentApi from "../../api/departmentApi";
import { Watch } from "vue-property-decorator";
@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class department extends Vue {
    @Watch("filterText")
  watchCount(newVal, oldVal) {
    console.log("newVal", newVal, "oldVal", oldVal);
    let a: any = this.$refs.tree2;
    a.filter(newVal);
  }

  loading= false
  filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
keyname = '';
dialogFormVisible=false;
dialogFormVisible1=false;
filterText = "";
tableTree = [];
departmentlist=[];
defaultProps = {
    children: "children",
    label: "label"
  };
departmentForm={
    departmentName:'',
};
        formLabelAlign1:any ={
        departmentName: '',
}
rules={
          departmentName: [
            { required: true, message: '请填写科室名', trigger: 'blur' }
          ],
        }
        getdepartmenttree(){
          this.loading = true
            departmentApi.querytree().then(res => {
          this.loading = false
      if (res["retCode"]) {
        this.tableTree = res.data.children;
        console.log("获取科室树", res.data);
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
        }

        doNodeClick(object) {
      //  console.log(object.departmentId);
        departmentApi.getdepartmentlist(object.departmentId).then(res => {
      console.log(res);
      if (res["retCode"]) {
        this.departmentlist = res.data;
        console.log("点击科室", res.data);
      } else {
        this.$alert(res["message"]);
        console.error("数据查询错误");
      }
    });
    }
    parentid:any="";
    updateparentid:any="";
    parentName='';
    updateparentName='';
    handleChange(value) {
        if(value.length>0){
                let parentnum = value.length - 1;
                departmentApi.getdepartmentlist(this.parentid[parentnum]).then(res => {
                console.log(res);
                if (res["retCode"]) {
                    this.parentName = res.data[0].departmentName;
                } else {
                    this.$alert(res["message"]);
                    console.error("数据查询错误");
                }
                });
            }else{
              this.parentName='';
            }
      }
      updatehandleChange(value) {
        if(value.length>0){
                let parentnum = value.length - 1;
                departmentApi.getdepartmentlist(this.updateparentid[parentnum]).then(res => {
                console.log(res);
                if (res["retCode"]) {
                    this.updateparentName = res.data[0].departmentName;
                } else {
                    this.$alert(res["message"]);
                    console.error("数据查询错误");
                }
                });
            }else{
              this.updateparentName='';
            }
      }
    adddepartment(departmentForm){
        
      let a:any = this.$refs.departmentForm
      a.validate((valid) => {

      if (valid) {


        this.loading = true
        let parentidnum = this.parentid.length - 1;
            departmentApi.adddepartment(this.departmentForm.departmentName,this.parentid[parentidnum],this.parentName).then(res=>{
              this.loading=false
              if (res["retCode"]) {
                      this.dialogFormVisible=false;
                      this.departmentForm={departmentName:'',};
                      this.parentid=[];
                      this.parentName='';
                      this.departmentlist=[];
                      this.getdepartmenttree();
          this.$message('添加成功')
                      
              } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
              }
            })
        return true;
        

      } else {

        console.log('error submit!!');

        return false;

      }

    });
            
    }
    
    departmentcount = 0;
      getdepartmentcount(){
          departmentApi.getdepartmentcount().then(res => {
      if (res["retCode"]) {
        this.departmentcount = res.data;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
      }
      addcancel(formName){
        let a:any=this.$refs[formName];
        a.resetFields();
        this.dialogFormVisible = false;
        this.departmentForm={
            departmentName:'',
        };
        this.parentid=[];
      }
      doDelete(index,row){
        this.$confirm('是否删除该科室?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal:false
        }).then(() => {
          departmentApi.delectdepartment(row.departmentId).then(res => {
            if (res["retCode"]) {
              this.departmentlist=[];
              this.getdepartmenttree();
            } else {
              this.$alert(res["message"]);
              console.error("数据查询错误");
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
      updatedepartmentId:any='';
      updateloading=false;
      changeModel(row){
        this.updateparentid = []
        this.dialogFormVisible1 = true;
        this.updateloading=true;
        let form = {}
        Object.assign(form,row);
        this.formLabelAlign1 = form
        this.updatedepartmentId=row.departmentId
if(row.superiorDepartmentId){
this.finddeptree(row.departmentId)
}
      }


finddeptree(departmentId){
     departmentApi.finddeptree(departmentId).then(res => {
            if (res["retCode"]) {
              
       let a = []
           res.data.forEach((item,index)=>{
             if(item[0]){
               a.push(item[0].departmentId)
             }
           })
  // a.push(departmentId)
  this.updateparentid = a;
  this.updateloading=false;
            } else {
              this.$alert(res["message"]);
              console.error("数据查询错误");
            }
          });
}

      updatecancel(formName){
        let a:any=this.$refs[formName];
        a.resetFields();
        this.dialogFormVisible1 = false;
        this.formLabelAlign1={
            departmentName:'',
        };
        this.updateparentid=[];
      }
      updatedepartment(formLabelAlign1){
        let a:any = this.$refs.formLabelAlign1
      a.validate((valid) => {

      if (valid) {
        //自己id不能跟自己id绑定
        let parentidnum = this.updateparentid.length - 1;
        if(this.updatedepartmentId == this.updateparentid[parentidnum]){
          this.$alert('不可绑定本科室为上级科室')
          return false
        }
        this.loading = true
        departmentApi.updatedepartment(this.updatedepartmentId,this.formLabelAlign1.departmentName,this.updateparentid[parentidnum],this.updateparentName).then(res => {
            this.loading=false
            if (res["retCode"]) {
              this.dialogFormVisible1=false;
              this.departmentlist=[];
              this.updatedepartmentId='';
              this.updateparentName='';
              this.updateparentid=[];
              this.getdepartmenttree();
          this.$message('保存成功')
              
            } else {
              this.$alert(res["message"]);
              console.error("数据查询错误");
            }
          });
        return true;
        

      } else {

        console.log('error submit!!');

        return false;

      }

    });
        
      }

mounted(){
  this.getdepartmenttree();
  this.getdepartmentcount();
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