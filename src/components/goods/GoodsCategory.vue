<template>
    <div>
        <el-col :span="7" style="border:1px teal solid;">

            <div style="position:fixed;margin-left:10px;margin-top:10px;margin-bottom:20px;z-index:100;">
              <el-button type="primary" plain size="small" @click="doAdd">增加分类</el-button>
              <el-button  plain  size="small" @click="doEdit">修改分类</el-button>
              <el-button type="text" plain  size="small" @click="doDelete">删除分类</el-button>
            </div>
  
           
        
       
           <el-tree style="margin-top:60px;margin-left:20px;width:280px;align:center;z-index:10;" 
             :data="treeData" 
              default-expand-all 
              :props="defaultProps" 
              :expand-on-click-node="false" 
            node-key="catId" ref="tree"  @node-click="doSelect"
             highlight-current >
            </el-tree>
      
        </el-col>


          <el-dialog :visible.sync="dialog.showDialog" :title="dialog.title">

              <el-form>

                   <el-form-item label="上级分类" v-if="editType==0">
                    <el-input v-model="dialog.parentCatName" readonly="true"></el-input>
                </el-form-item>


                 <el-form-item label="分类名称">
                    <el-input v-model="dialog.catName"></el-input>
                </el-form-item>

                  <el-form-item label="分类头像" align="left">

                    <img :src="dialog.catIcon" height="120" width="120"  >

                        <input type="file"  id="getFile"  @change="uploadFile($event)" />

                </el-form-item>

              </el-form>

            
            
        
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.showDialog=false">取 消</el-button>
                <el-button type="primary" @click="doUpdateCategory">确 定</el-button>
            </span>

        </el-dialog>


    
     </div>
</template>





<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

import CategoryApi from "../../api/goods/CategoryApi";

import BaseApi from "../../api/baseapi";
import Utils from "../../utils/Utils";
import { immediateFileCommand } from "node-notifier/lib/utils";

enum EditType {
  ADD = 0,
  UPDATE
}

class CategoryDialog {
  showDialog = false;
  catId = "";
  catName = "";
  catIcon = "";
  title = "";
  parentCatName = "";
  parentId=""
  catType="CAT"
}

@Component
export default class AddGoods extends Vue {
  currentNode = {};
  currentCatId = "0";
  dialog = new CategoryDialog();

  editType = EditType.ADD;

  treeData = [
    {
      catId: "0",
      catName: "根",
      children: []
    }
  ];

  defaultProps = {
    children: "children",
    label: "catName"
  };

  mounted() {
    console.log("goods category");
    this.loadTree();
  }

  loadTree() {
    let catApi = new CategoryApi();
    let params = {};
    catApi.queryTree(params).then(res => {
      if (res.returnCode == 200) {
        this.treeData[0].children = res.data["children"];
      } else {
        Utils.toastError(this, "读取数据失败");
      }
    });
  }

  doSelect(object, node, control) {
    this.currentNode = object;
    this.currentCatId = object.catId;
    console.log("select cat id = " + this.currentCatId);
  }
  doAdd() {
    console.log(this.currentNode)
    if (this.currentNode["levelNum"]>='2'){
      Utils.toastError(this,"最多只能建立3层分类");
      return;
    }
    this.dialog.showDialog = true;
    this.dialog.title = "添加分类";
    this.editType = EditType.ADD;
    this.dialog.catName=""
    this.dialog.catIcon=""
    this.dialog.parentId = this.currentNode["catId"]
    this.dialog.parentCatName = this.currentNode["catName"]
  }
  doEdit() {
    this.dialog.catId = this.currentNode["catId"];
    this.dialog.catName = this.currentNode["catName"];
    this.dialog.catIcon = this.currentNode["catIcon"];
    this.dialog.title = "修改分类";
    this.editType = EditType.UPDATE;
    this.dialog.showDialog = true;
  }

  doDelete() {
    let catApi = new CategoryApi();
    catApi.uploadCategory({}).then(res => {});
    
  }
  doUpdateCategory() {

       if(Utils.isEmpty(this.dialog.catName)){
          Utils.toastError(this,"分类名字不能为空");

          return;

       }

      if(this.editType==EditType.ADD){

    
       if(this.dialog.parentId=="0"){
         this.dialog.parentId="";
       }

         let catApi = new CategoryApi();
        catApi.addCategory(this.dialog).then(res=>{
          if(res.returnCode==200){
              Utils.toastSuccess(this,"增加分类成功！");
              this.dialog.showDialog=false;
              this.loadTree()
          }else{
              Utils.toastError(this,"添加分类出错");
            
          }


        })


       

      }else{

        this.dialog.catId = this.currentNode["catId"]

        let catApi = new CategoryApi();

        let params={}
        params["catId"] = this.dialog.catId
        params["catName"] = this.dialog.catName
        params["catIcon"] = this.dialog.catIcon        




        catApi.uploadCategory(params).then(res=>{
        if(res.returnCode==200){
            this.loadTree()
    
            Utils.toastSuccess(this,"修改分类成功！");
            this.dialog.showDialog=false;
        }else{
            Utils.toastError(this,"修改分类出错");
          
        }


        })

        
        
      }




  }

  doListProduct() {}

  uploadFile(e) {
    //you can get images data in e.target.files
    //an single example for using formData to post to server

    let form = new FormData();
    form.append("file", e.target.files[0]);

    let baseApi = new BaseApi();

    baseApi.uploadFile(form).then(res => {
      let imgUrl = res.data["filename"];
      console.log("file upload url=" + imgUrl);

      this.dialog.catIcon = imgUrl
    });

    //do your post
  }
}
</script>

<style  scoped>

</style>