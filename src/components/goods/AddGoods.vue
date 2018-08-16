<template>
    <el-form ref="goodsModel" :model="form" label-width="150px" @submit.prevent="onSubmit" style="margin:20px;width:90%;min-width:600px;">

      
       <div style="display:flex;justify-content:space-between;">
        <el-button  type="success" style="margin-bottom:10px;" @click="doGoBack">返回</el-button>
          <el-button  v-if="!goodsEditMode" type="primary" style="margin-bottom:10px;" @click="doAddGoods">保存继续</el-button>
          <el-button v-else type="primary" style="margin-bottom:10px;" @click="doUpdateGoods">保存商品</el-button>
       </div>

      
        <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
            <el-tab-pane label="商品基本信息" name="tab1" align="left">
                
                  <el-form-item label="商品类型">
                    <el-select v-model="form.goodsType" placeholder="商品类型">
                        <el-option label="普通商品" value="GOODS_TYPE_NORMAL"></el-option>
                        <el-option label="O2O商品" value="GOODS_TYPE_O2O"></el-option>
                        <el-option label="虚拟商品" value="GOODS_TYPE_VIRTUAL"></el-option>
                    </el-select>
                </el-form-item>
              
        
                <el-form-item label="商品标题">
                    <el-input v-model="form.goodsName"></el-input>
                </el-form-item>

                <el-form-item label="商品摘要">
                    <el-input v-model="form.jingle"></el-input>
                </el-form-item>

                <el-form-item label="商品自定编号">
                    <el-input v-model="form.goodsCode"></el-input>
                </el-form-item>

                <el-form-item label="商品重量">
                    <el-input v-model="form.weight"></el-input>
                </el-form-item>

                <el-form-item label="开售时间">
                    <el-date-picker v-model="form.beginSaleTime" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否单品">
                    <el-switch :disabled="goodsEditMode" v-model="form.singleStatus" ></el-switch>
                </el-form-item>

                <h2>价格库存信息</h2>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="标签价">
                            <el-input v-model="form.labelPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" style="margin-left:50px">
                        <el-form-item label="销售价">
                            <el-input v-model="form.marketPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                      <el-form-item label="供货价">
                          <el-input v-model="form.costPrice"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" style="margin-left:50px">
                      <el-form-item label="上架库存数量">
                          <el-input v-model="form.storageNum"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>

                <h2>封面轮播图片</h2>
                <picture-list ref="pictureList" > </picture-list>

        
            </el-tab-pane>

       
            <el-tab-pane label="商品规格" name="tab2" :disabled="!goodsEditMode||form.singleStatus">
              <skuItemEditer :skuItemEditerBootData='skuItemEditerBootData' @updateSuccess="onUpdateSuccess"></SkuItemEditer>
          
            </el-tab-pane>








            </el-tab-pane>
            <el-tab-pane label="商品详情" name="tab3">

                <editor ref="editor"></editor>

       
            </el-tab-pane>

            <el-tab-pane label="分类标签" name="tab4" :disabled="!goodsEditMode" >



 <el-button @click="doAdd">增加分类</el-button>

  <div style="margin-top:20px;" v-for="(item,index) in catList" :key="index">
  <!-- <el-tag type="info" size="mini" v-if="item.editStatus">未保存</el-tag> -->
    <span style="width:100px;"> 分类{{item.name}}：</span>
    <el-cascader style="width:300px;" placeholder="选择分类" v-model="item.option" :options="options" filterable @change="doSelect(item,index)"></el-cascader>

    <el-button style="margin-left:20px;" type="primary" plain @click="doDelete(item,index)">删除</el-button>

 
    <el-button style="margin-left:20px;"  v-if="item.editStatus" type="primary" plain @click="doUpdate(item,index)">确定</el-button>
  </div>



                <!-- <category-tabView :catIdOne="form.catId1" :catIdTwo="form.catId2" :catIdThree="form.catId3" @change="doChangeCategory"> </category-tabView> -->
        
            </el-tab-pane>
        </el-tabs>

    </el-form>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

import PictureList from "@/components/common/PictureList.vue";
// import categoryView from "./CategoryView.vue";
import SkuItemEditer from "./SkuItemEditer.vue";

import Editor from "@/components/common/Editor.vue";
import GoodsApi from "../../api/goods/GoodsApi";
import * as catApi from "../../api/catapi";
import * as Api from "../../api/api";
import * as Config from "../../api/conf";

import Utils from "../../utils/Utils";

class GoodsModel {
  goodsType = "GOODS_TYPE_NORMAL";
  goodsName: string;
  jingle: string;
  singleStatus = true;
  goodsImg: string;
  goodsCode: string;
  weight: number;
  beginSaleTime: string;
  labelPrice = 0.0;
  marketPrice = 0.0;
  costPrice = 0.0;
  storageNum = 9999;
  onlineStatus = true;
  goodsId: string;
}

@Component({
  props: {},
  components: {
    // categoryView,
    SkuItemEditer,
    "picture-list": PictureList,
    editor: Editor
  }
})
export default class AddGoods extends Vue {
  goodsEditMode = false;
  activeName = "tab1";
  form = new GoodsModel();
  goodsId: string;
             title=""
            disableStatus=false
     infoForm=    {
                skuId:'',
                storageNum: 0,
                marketPrice: 0,
                labelPrice: 0,
                costPrice: 0,
                barCode: '',
                remark: '',
                imageList: [],
                fileUploadUrl: '',
                title: '',
                attrs:{},
                attributeItems:[]
            }
  editMode= "edit"
      fileUploadUrl= ""

      skuId= "" //skuxian 项目的id
      showDialog= false
  
      content= ""
      showSkuDialog= false
      showAddSkuDialog= false
      showAddSkuValueDialog= false
      storageNum= 0
      costPrice= 0
      labelPrice= 0
      marketPrice= 0
      barCode= ""
      skuKeyName= ""
      dialogImageUrl= ""
      fileList= []
      detailList= ""
      dialogVisible= false
      remark= ""

      currentSkuKeyId= ""
      currentSkuKey= {}
      skuKeyValue= ""
      skuKeyList= []
      skuKeyListId= []
      inputVisible= []
      skuList= []
      skuListId= []

      inputValue= []

      inputValueSku= []

     
      skuItemEditerBootData={
        show:false,
        skuId:"",
        goodsId:'',
        specStatus:false,
        labelPrice: 0.0,
        marketPrice: 0.0,
        costPrice: 0.0,
        skuKeyList:[],
        toEditer:(row)=>{
          if(row==null){this.skuItemEditerBootData.skuId='';}
          else {this.skuItemEditerBootData.skuId=row.skuId;
          this.skuItemEditerBootData.goodsId=this.goodsId;
          this.skuItemEditerBootData.skuKeyList=this.skuKeyList;
          this.skuItemEditerBootData.specStatus=this.form['specStatus'];}
          if(this.skuItemEditerBootData.specStatus){
            this.skuItemEditerBootData.labelPrice=this.form.labelPrice;
            this.skuItemEditerBootData.marketPrice=this.form.marketPrice;
            this.skuItemEditerBootData.costPrice=this.form.costPrice;
          }
          console.log(this.skuItemEditerBootData)
         
          this.skuItemEditerBootData.show=true;
        }
      }
      editorOption= {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["link", "image"],
              ["clean"]
            ],

            handlers: {
              image: function() {
                document.getElementById("getFile").click();
              }
            }
          }
        }
      }
      rules={

      }









   updateImageList(imageList) {
            this.infoForm.imageList = imageList;
        }
        reset(){
            var infoForm={
                skuId:'',
                storageNum: 0,
                marketPrice: 0,
                labelPrice: 0,
                costPrice: 0,
                barCode: '',
                remark: '',
                imageList: [],
                skuImgUrl:'',
                fileUploadUrl: '',
                title: '',
                attrs:{},
                attributeItems:[]
            }
            for(let i in this.skuItemEditerBootData.skuKeyList){
                let key=this.skuItemEditerBootData.skuKeyList[i].skuKeyIdName;
                infoForm.attrs[key]="";
            }
            if(this.skuItemEditerBootData.specStatus){
                infoForm.labelPrice=this.skuItemEditerBootData.labelPrice;
                infoForm.marketPrice=this.skuItemEditerBootData.marketPrice;
                infoForm.costPrice=this.skuItemEditerBootData.costPrice;
            }
            this.infoForm=infoForm;
        }
        openEditer(){
            this.disableStatus=false;
            this.reset();
            if(this.skuItemEditerBootData)
            if(this.skuItemEditerBootData.skuId!=''){
                Api.requestSkuItemDetail(this.skuItemEditerBootData.goodsId,this.skuItemEditerBootData.skuId).then(
                    request=>{
                        var infoForm=request['data'];
                        let attrs={};
                        for(let i in infoForm.attrs){
                            attrs[infoForm.attrs[i].skuKeyName]=infoForm.attrs[i].skuValueName;
                        }
                        infoForm.attrs=attrs;
                        infoForm.imageList=infoForm.skuImgUrl.split(',');
                        this.infoForm=infoForm;
                        this.disableStatus=true;
                    }
                );
            }
        }
        doSubmit(){
            this.infoForm.attributeItems=[];
            for(var key in this.infoForm.attrs){
                var value=this.infoForm.attrs[key];
                if(value==''){
                    this.$alert("请选择"+key+"的属性值");
                    return;
                }else{
                    let item={};
                    item['key']=key;
                    item['value']=value;
                    this.infoForm.attributeItems.push(item);
                }
            }

            this.infoForm['skuImgUrl']=this.infoForm.imageList.join(',');

            if (this.skuItemEditerBootData.skuId=='') {
                this.submitAdd();
            } else {
                this.submitUpdate();
            }
        }
        submitAdd(){
          console.log(this.skuItemEditerBootData)
            Api.requestAddSkuItem(this.goodsId, this.infoForm).then(
                res => {
                    if (res['retCode']==true){
                        this.skuItemEditerBootData.show = false;
                        this.onUpdateSuccess();
                    }else{
                        this.$alert("数据添加失败:"+res['message']);
                    }
                }
            );
        }
        submitUpdate(){
            Api.requestUpdateSkuItem(this.infoForm).then(
                res => {
                    console.log(res)
                    if (res['retCode']) {
                        this.skuItemEditerBootData.show = false;
                        this.onUpdateSuccess();
                       
                    } else {
                       this.$alert("数据添加失败:"+res['message']);
                    }
                }
            );
        }






    handleImageAdded(){
        console.log()
    }
    showSkuItemDialog(mode) {
      this.editMode = mode;
      this.showDialog = true;
    }

    doChangeCategory(index, value) {
      console.log("index=" + index + " value=" + value);

      if (index == 1) {
        this.form['catId1'] = value;
      }

      if (index == 2) {
        this.form['catId2'] = value;
      }

      if (index == 3) {
        this.form['catId3'] = value;
      }
    }

    reloadSkuItem() {
      this.skuList = [];

      Api.requestSkuDetail(this.goodsId).then(res => {
        let attrs = res['data'].skuAttribute;
        this.skuKeyList= res['data'].skuAttribute;

        for (let i in attrs) {
          let keyName = attrs[i].skuKeyIdName;
          let id = attrs[i].skuKeyId;
          let values = attrs[i].values;
          let data = { key: keyName, id: id, value: [] };

          for (let j in values) {
            let valueData = {
              id: values[j].skuValueId,
              value: values[j].skuValueName
            };
            data.value.push(valueData);
          }
        }

        let items = res['data'].skuItem;

        for (let i in items) {
          let data = items[i];
          let attrs = items[i].attrs;
          for (let j in attrs) {
            let key = attrs[j].key;
            let value = attrs[j].value;
            data[key] = value;
          }

          this.skuList.push(data);
        }
      });
    }

    onUpdateSuccess() {
      this.reloadSkuItem();
    }

    onItemEditViewClose() {
      console.log("edit dialog close");
      this.showDialog = false;
    }

    editSkuItem(skuId, index) {
      this.skuId = skuId;

      this.showSkuItemDialog("edit");
    }

    onEditorChange({ editor, html, text }) {
      console.log({ editor, html, text })
      this.content = html;
    }

    uploadFunction(file, Editor, cursorLocation,resetUploader) {
      console.log(111)
      //you can get images data in e.target.files
      //an single example for using formData to post to server

      var form = new FormData();
      form.append("file1",file);

      Api.uploadFile(form).then(res => {
        let imgUrl = res.data.data.urllist[0];
        console.log("file upload url");

        // console.log(this.$refs.myEditor.quill)
        // console.log(this.$refs.myEditor)

        // let idx = this.$refs.myEditor.quill.getSelection().index;
 Editor.insertEmbed(cursorLocation, 'image', imgUrl);
        // this.$refs.myEditor.quill.insertEmbed(idx, "image", imgUrl);
  resetUploader();
        // quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER)   // 调用
        console.log(imgUrl);
      });

      //do your post
    }

    addSkuKeyValue(skuKey) {
      this.currentSkuKey = skuKey;
      this.skuKeyValue="";
      this.showAddSkuValueDialog = true;
    }
    addSkuKeyValueSubmit(attrValue) {
      if (this.goodsEditMode == false) {
        this.showAddSkuValueDialog = false;

        let valueData = { id: "", value: attrValue };

        this.currentSkuKey['value'].push(valueData);
      } else {
        var skuKey=this.currentSkuKey;
        Api.requestAddSkuValue(this.goodsId, this.currentSkuKey['skuKeyId'], attrValue).then(
          res => {
            skuKey['valueList'].push(res['data']);
            this.showAddSkuValueDialog = false;
          }
        ).catch(
          error => {
            console.log(error);
          }
        );
      }
    }

    doShowSkuAttr() {
      this.skuKeyName = "";
      this.skuKeyValue = "";
      this.showSkuDialog = true;
    }

    handleClick() {
      if (this.activeName == "tab2") {
        if (this.goodsEditMode == false) {
          this.switchAddGoods();
        }
      }
    }

    handleDelete(skuId, index) {
      console.log(skuId);

      this.$confirm("是发要删除该sku条目？", "注意", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          console.log("enter delete");

          if (this.goodsEditMode == true) {
            console.log("enter delete2");

            Api.requestDeleteSkuItem(this.goodsId, skuId).then(res => {
              console.log(res);

              this.skuList.splice(index, 1);
            });
          } else {
            this.skuList.splice(index, 1);
          }
        })
        .catch(() => {});
    }
    deleteSkuKey(skuKey, index) {
      this.$confirm("删除规格将删除所有的规格详情信息，是否继续？", "注意", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        Api.requestDeleteSkuKey(this.goodsId, skuKey.skuKeyId).then(
          res => {
            if(res.retCode){
              this.skuKeyList.splice(index, 1);
              this.skuList = [];
            }
          }
        );
      });
    }

    deleteSkuValue(skuKey, index) {
      if (this.goodsEditMode == true) {
        this.$confirm("删除规格项也将删除该库存的规格详情信息，是否继续删除？", "注意", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(res => {
            let value = skuKey.valueList[index];
            Api.requestDeleteSkuValue(this.goodsId, value.skuKeyId, value.skuValueId).then(
              res => {
                if (res['retCode']==true){
                  this.skuList=[];
                  let items = res['data'];
                  for (let i in items) {
                    let data = items[i];
                    let attrs = items[i].attrs;
                    for (let j in attrs) {
                      let key = attrs[j].key;
                      let value = attrs[j].value;
                      data[key] = value;
                    }
                    this.skuList.push(data);
                  }
                  skuKey.valueList.splice(index, 1);
                }else{
                  this.$alert("数据删除失败:"+res['message']);
                }
              }
            ).catch(e => {});
          })
          .catch(() => {});
      } else {
        skuKey.value.splice(index, 1);
      }
    }

    handleInputConfirm(skuKey, index) {
      let inputValue = this.inputValue[index];
      if (inputValue) {
        let data = { id: "", value: inputValue };
        skuKey.value.push(data);
      }
      this.inputVisible[index] = false;
      this.inputValue[index] = "";
    }

    addSkuItemSubmit() {
      this.showAddSkuDialog = false;
      let data = {
        costPrice: this.costPrice,
        storageNum: this.storageNum,
        labelPrice: this.labelPrice,
        marketPrice: this.marketPrice,
        remark: this.remark,
        barCode: this.barCode,
        attributeItems: []
      };

      let ct = 0;
      console.log(this.inputValueSku);
      for (let value in this.inputValueSku) {
        let skuKey = this.skuKeyList[ct];

        data[skuKey.key] = this.inputValueSku[ct];
        data.attributeItems.push({
          key: skuKey.key,
          value: this.inputValueSku[ct]
        });
        ct++;
      }

      console.log(data);

      if (this.goodsEditMode == true) {
        Api.requestAddSkuItem(this.goodsId, data).then(res => {
    
          this.skuList.push(data);
        });

        return;
      }

      this.skuList.push(data);
    }

    addSkuKeySubmit() {
      console.log(11111)
      if ((this.skuKeyName || "") == "") {
        this.$alert("属性名不能为空");
        return;
      }

      if (this.goodsEditMode == true) {
        Api.requestAddSkuKey(this.goodsId, this.skuKeyName,this.skuKeyValue).then(
          res => {
            if(res['retCode'])this.reloadSkuItem();
            else this.$alert(res['message']);
          }
        ).catch(
          error => {
            console.log(error);
          }
        );
        this.showSkuDialog = false;
      } else {
        this.showSkuDialog = false;
        let newValue = { key: this.skuKeyName, value: [] };
        this.skuKeyList.push(newValue);
      }
    }

    doSubmitGoods() {
      if (this.goodsEditMode == true) {
        this.eidtGoods();
      } else {
        this.addGoods();
      }
    }

    eidtGoods() {
      console.log("edit goods");

      let imageList = [];
      for (let f in this.fileList) {
        let url = this.fileList[f].url;
        imageList.push(url);
      }

      this.form.goodsImg = imageList.join(",");

      if(this.form.goodsImg.length>0){
        this.form['logoUrl'] = imageList[0];
      }

      console.log("SUBMI");

      Api.requestUpdateGoods(this.form)
        .then(res => {})
        .catch(error => {
          console.log(error);
        })
        .then(res => {
          console.log("update detail");
          console.log(this.content);

          Api.requestUpdateGoodsDetail(this.goodsId, this.content).then(res => {
            console.log("detail response");
            console.log(res);

            this.$router.replace("/goodslist");
          });
        });
    }

    switchAddGoods() {
      console.log("add goods");
      console.log()
      if(this.form.goodsName.trim()==''){
        this.$alert('商品标题不能为空');
        return;
      }

      let imageList = [];
      for (let f in this.fileList) {
        let url = this.fileList[f].url;
        imageList.push(url);
      }

      if(imageList.length==0){
        this.$alert('请至少上传一张商品图片');
        return;
      }

      this.form.goodsImg = imageList.join(",");

      if(imageList.length>0){
        this.form['logoUrl'] = imageList[0];
      }

      Api.requestAddGoods(this.form)
        .then(res => {

          return res['data'].id;
        })
        .catch(error => {
          console.log(error);
        })
        .then(goodsId => {
          this.goodsId = goodsId;

 
          this.goodsEditMode = true;

          Api.requestGoodsDetail(goodsId).then(res => {

            this.form = res['data'];

            this.fileList = []

            let imageList = res['data'].imageList.split(",");

            for (let f in imageList) {

              let dt = { name: "1.png", url: imageList[f] };
              this.fileList.push(dt);
            }
          });
        });
    }

    addGoods() {
      console.log("add goods");

      let imageList = [];
      for (let f in this.fileList) {
        let url = this.fileList[f].url;
        imageList.push(url);
      }

      this.form['imageList'] = imageList.join(",");

      if(imageList.length>0){
        this.form['logoUrl'] = imageList[0];
      }

      Api.requestAddGoods(this.form)
        .then(res => {
          console.log("add goods");
          console.log("res");
          console.log(res);
          console.log("========");

          console.log(res['data'].id);

          console.log("xxxxxxxxx");

          return res['data'].id;
        })
        .catch(error => {
          console.log(error);
        })
        .then(goodsId => {
          console.log(goodsId);

          let skuData = {
            goodsId: goodsId,
            skuAttributes: this.skuKeyList,
            skuItems: this.skuList
          };

          console.log(skuData);

          Api.requestAddSku(skuData).then(res => {
            console.log("sku response");
            console.log(res);

            this.$router.replace("/goodslist");
          });

          Api.requestUpdateGoodsDetail(goodsId, this.content).then(res => {
            console.log("detail response");
            console.log(res);

            this.$router.replace("/goodslist");
          });
        });
    }
    handleRemove(file, fileList) {
      for (let i in this.fileList) {
        let url = this.fileList[i].url;
        if (url == file.url) {
          console.log("find ...");
          // this.fileList.splice(i, 1);
          break;
        }
      }
    }
    beforeUpload(file) {
      console.log("before upload ...");
      console.log("fileList = " + this.$refs.logoUrlUpload['fileList'].length);
      if (this.$refs.logoUrlUpload['fileList'].length > 0) {
        // this.$refs.logoUrlUpload.clearFiles();
      }
    }

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }

    handleSuccess1(response, file, fileList) {
      let dt = {
        name: "1.png",
        url: response.data.filename
      };
      this.fileList.push(dt);
      console.log(this.fileList);
    }

    handleSuccess2(response, file, fileList) {
      this.fileList.push(response.data.filename);
      console.log(this.fileList);
    }




















  mounted() {
    console.log("add goods");
this.fileUploadUrl = Config.g_upload_url;

    let goodsId = this.$route.params["goodsId"];
    console.log(this.$route.params);
    console.log(goodsId);
    if ((goodsId || "") == "") {
      this.goodsEditMode = false;
    } else {
      this.goodsEditMode = true;
      this.goodsId = goodsId;
      console.log("enter edit mode:goodsId=" + this.goodsId);

      this.getGoods(this.goodsId);
         Api.requestQueryTree().then(res => {
      this.options = res['data'].children;
    });
      this.queryLink();
    }


  

    
      Api.requestSkuDetail(goodsId).then(res => {
        console.log('商品SKU',res['data'])
        this.skuKeyList= res['data'].skuAttribute;
        let items = res['data'].skuItem;
        for (let i in items) {
          let data = items[i];
          let attrs = items[i].attrs;
          for (let j in attrs) {
            let key = attrs[j].key;
            let value = attrs[j].value;
            data[key] = value;
          }
          this.skuList.push(data);
        }
      });









  }


  doSelect(item, index) {
    // let a = true;
    // if (typeof this.catList[index].category == "object") {
    //   a =this.catList[index].option[0] !==
    //       this.catList[index].category.parentId ||
    //     this.catList[index].option[1] !== this.catList[index].category.catId;
    // }
    // item.editStatus = a;
    item.editStatus = true;
  }

  doUpdate(item, index) {
    if (item.option.length < 1) {
      this.$alert("选择数据错误");
      return;
    }

    let catId = item.option[item.option.length - 1];
    if (!item.linkId) {
      catApi.addCatGoodsRela(this.goodsId, catId).then(res => {
        console.log(res);
        if (res['retCode'] == true) {
          this.queryLink();
          // console.log(res);

          // let len = this.catList.length;
          // len = len+1

          // let item = {
          //   name: len.toString(),
          //   id: res.data.id,
          //   catId:'',
          //   goodsId:this.goodsId,
          //   option:[],
          //   options: this.options,
          //   editStatus:false,
          // };

          // this.catList.push(item);
        } else {
          console.error("信息错误");
          console.error(res);
        }
      });
      return;
    }

    catApi.updateCatGoodsRela(item.linkId, this.goodsId, catId).then(res => {
      if (res.retCode == true) {
        this.$alert("修改成功！");
        item.editStatus = false;
      } else {
        this.$alert("修改失败");
      }
    });
  }

  doDisplay(item, index) {
    this.$alert(JSON.stringify(item.option));
  }

  doDelete(item, index) {
    Api.doConfirm(this, "是否删除该分类信息").then(res => {
      if (res == true) {
        catApi.deleteCatGoodsRela(this.goodsId, item.catId).then(res => {
          if (res.retCode) {
            this.catList.splice(index, 1);
          } else {
            this.$alert("删除出错");
          }
        });
      }
    });
  }
  queryLink() {
    catApi.queryGoodsRela(this.goodsId).then(res => {
      if (res.retCode == true) {
        this.catList = res.data;
        this.catList.forEach((item, index) => {
          item.option = [item.category.parentId, item.category.catId];
        });
      } else {
        console.error(res);
      }
    });
  }
  doAdd() {
    // let len = this.catList.length;
    // len = len + 1;

    // catApi.addCatGoodsRela(this.goodsId).then(res => {
    //   console.log(res)
    //   if (res.retCode == true) {
    //     console.log(res);

    //     let len = this.catList.length;
    //     len = len+1

    //     let item = {
    //       name: len.toString(),
    //       id: res.data.id,
    //       catId:'',
    //       goodsId:this.goodsId,
    //       option:[],
    //       options: this.options,
    //       editStatus:false,

    //     };

    //     this.catList.push(item);

    //   } else {
    //     console.error("信息错误");
    //     console.error(res);
    //   }
    // });
    this.catList.push(this.catItem);
    console.log(this.catList);
  }

catFormList = [];
  catList = [];
  catItem = {
    name: "1",
    options: [],
    editStatus: false
  };

  catIdList1 = [""];
  catIdList2 = [""];
  catIdList3 = [""];
  options = [
    { value: "111", label: "最新分类" },
    { value: "222", label: "最新分类2" },
    { value: "333", label: "最新分类333" }
  ];

  updated() {}
  activated() {}





  getGoods(goodsId: string) {
    let goodsApi = new GoodsApi();

    goodsApi.getGoods(goodsId).then(res => {
      if (res.returnCode == 200) {
        console.log("goodsinfo");
        console.log(res.data);

        this.form.goodsType = res.data["goodsType"];
        this.form.goodsName = res.data["goodsName"];
        this.form.goodsImg = res.data["goodsImg"];
        this.form.jingle = res.data["jingle"];
        this.form.goodsId = res.data["goodsId"];

        this.form.goodsCode = res.data["goodsCode"];

        this.form.marketPrice = res.data["marketPrice"];
        this.form.costPrice = res.data["costPrice"];
        this.form.labelPrice = res.data["labelPrice"];

        this.form.storageNum = res.data["storageNum"];

        this.form.singleStatus = res.data["singleStatus"];

        this.form.onlineStatus = res.data["onlineStatus"];

        let dt: any = this.$refs["pictureList"];

        dt.setImageList(this.form.goodsImg);

      



      }
    });

    goodsApi.getGoodsDetail(goodsId).then(res=>{

            if (res.returnCode == 200) {
                 console.log(res.data);

                let detail = res.data["detail"];
                let dt: any = this.$refs["editor"];

                dt.setContent(detail)
                



            }
  



    })
  }

  doAddGoods() {
    let goodsApi = new GoodsApi();

    console.log("do Add ");

    let dt: any = this.$refs["pictureList"];
    let imageList: any = dt.getImageList();
    console.log(imageList);
    this.form.goodsImg = imageList;

    goodsApi.addGoods(this.form).then(res => {
      if (res.returnCode == 200) {

          Utils.toastSuccess(this,"添加成功")
    
        this.$router.push("/goodslist");
      } else {


          Utils.toastError(this,res.message);


        }
    });
  }

  doGoBack() {
    this.$router.push("/goodslist");
  }

  doUpdateGoods() {
      
    if (Utils.isEmpty(this.form.goodsId)) {
      Utils.toastError(this, "goodsId不能为空");

      return;
    }
    let goodsApi = new GoodsApi();

  
 

    //获取全文编辑器信息
    let editor:any = this.$refs["editor"];

    let content = editor.getContent()



       //获取图表控件信息
    let dt: any = this.$refs["pictureList"];
    let imageList: any = dt.getImageList();

    this.form.goodsImg = imageList.join(",");

    console.log(this.form);


    //更新详情
      goodsApi.updateGoodsDetail(this.form.goodsId,content).then(res=>{
          if (res.returnCode == 200) {
                Utils.toastSuccess(this, "更新成功");

      } else {
        this["$message"]({
          type: "error",
          message: res.message
        });
      }


    //更新商品内容
    goodsApi.updateGoods(this.form).then(res => {
      if (res.returnCode == 200) {
        Utils.toastSuccess(this, "更新成功");

        this.$router.push("/goodslist");
      } else {
        this["$message"]({
          type: "error",
          message: res.message
        });
      }
    });





   


    })
  }

 
  handleTabClick() {
    console.log("handle click tab");
  }
}
</script>

<style scoped>
.sku-tag {
  margin-left: 20px;
  margin-top: 30px;
  height: 60px;
  border-bottom: 1px solid #ddd;
}

.sku-key {
  font-size: 16px;
  font-weight: 600;
  margin-right: 40px;
}

.sku-attr-layout {
  display: flex;
  width: 90%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 40px;
  align-items: center;
}

.sku-value-layout {
  height: 120px;
  width: 250px;
  padding-right: 100px;
}

.sku-header{
  width:100%;
  height:40px;
  font-size:16px;
  line-height: 40px;
  display: -webkit-flex;
  display: flex;
  background: rgb(242, 242, 242);
  justify-content:space-between;
}

.sku-header .el-button-group{
  display: flex;
  justify-content:space-between;
}


.sku-body{
  width:100%;
  line-height:50px;

}
</style>
