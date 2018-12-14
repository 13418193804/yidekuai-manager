<template>
    <div >

<div class="wrapper" style="min-width:500px;    min-width: 500px;
    position: relative;">
<vuecropper style="height: 60vh;min-width:100%;"
	ref="cropper" 
	:img="option.img"
	:outputSize="option.size"
	:outputType="option.outputType"
	:info="true"
	:full="option.full"
	:canMove="option.canMove"
	:canMoveBox="option.canMoveBox"
	:fixedBox="option.fixedBox"
	:original="option.original"
	>
  </vuecropper>
<div style="position: absolute;
    bottom: 70px;
    right: 20px;">

<span v-if="preImageList.length > 0">
  <span style="    font-size: 28px;">{{preIndex+1}}</span>/<span style="">{{preImageList.length}}</span>
</span>
<span v-else style="font-weight: 600;color: #666;">暂无图片</span>

</div>
<div style="width:100%;background-color:#f7f7f7;display:flex;    justify-content: space-around;align-items: center;">
  <div class="iconcropper" @click="changeScale(1)">
<i class="iconfont icon-fangda" style="font-size:24px;" ></i>
  </div>
 <div class="iconcropper" @click="changeScale(-1)">
<i class="iconfont icon-suoxiao-"  style="font-size:28px;"  ></i>
  </div>

<div class="iconcropper" @click="rotateLeft">
<i class="iconfont icon-llfilterrotate"  style="font-size:31px;" ></i>
  </div>
<div class="iconcropper" @click="rotateRight">
<i class="iconfont icon-youxuanzhuan"  style="font-size:28px;" ></i>
  </div>

  <div class="iconcropper" @click="rotateDetele()" v-if="haveDetele && !notHaveAdd" v-promiss.edit>
<i class="iconfont icon-iconfontshanchu3"  style="font-size:24px;" :style="(temporary &&  !preImageList[preIndex].temporary) || preImageList.length==0 ?'opacity: 0.2;':''"></i>
  </div>

  <div class="iconcropper" @click="rotateSave()" v-if="haveSave && !notHaveAdd" v-promiss.edit>
             <!-- <el-tooltip class="item" effect="dark" content="保存所有暂存图片" placement="top-start" > -->
<i class="iconfont icon-49"  style="font-size:28px;" :style="allTemporary ?'':'opacity: 0.2;'"></i>
    <!-- </el-tooltip> -->
  </div>
</div>
	</div>


<div style="width:100%;display: flex;margin:10px 0;align-items: center;overflow: auto; " >
    <div  v-for="(item,index) in preImageList" :key="index" style="display: flex;margin-right:20px;    position: relative;    border-radius: 3px;" @click="changePreImageUrl(index)" class="" :class="preIndex == index ?'selectImage':'noselect'" >
          <img :src="item.presImageUrl" style="width:100px;height:100px;"/>
             <!-- <el-tooltip class="item" effect="dark" content="暂未保存" placement="top-start" v-if="item.temporary">
     <i class="iconfont icon--"  style="font-size: 24px;
    color: #f4c542;
    position: absolute;
    right: 0;line-height: initial;
    top: -1px;
    border-radius: 3px;" ></i>
    </el-tooltip> -->
    </div>

    <div  @click="doClick()" class="el-upload el-upload--picture-card" style="height: 100px;width: 100px;" v-if="!notHaveAdd" >
      <div style="margin-right: 20px;height: 100px;width: 100px;display: flex;justify-content: center;align-items: center;">
     <i class="el-icon-plus" style="font-size:21px;"></i>
     </div>
    </div>
        <input type="file" ref="logo" id="logo" style="display:none;" @change="isSizeClear();" />

</div>
  
<!-- 
<div v-if="presId">
<div style="width:100%;display: flex;margin:10px 0;      overflow: auto; ">
  <el-upload  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"  :action="fileUploadUrl" list-type="picture-card" ref="upload" :before-upload="beforeUpload" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList">
      <i class="el-icon-plus"></i>
    </el-upload>
</div>
<div>
  <el-button type="primary" @click="pictureUploadPre()" >上传图片</el-button>
</div>
</div> -->


<el-dialog :close-on-click-modal="false"  :append-to-body="true"
  title="警告"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <div style="    text-align: center;
    height: 300px;
    overflow: hidden;
    width: 300px;
    margin: auto;"  class="flex flex-align-center flex-pack-center">
      
          <img :src="option.img" style="width:100%"/>

  </div>
  <div style="text-align: center;
    margin-bottom: -20px;
    margin-top: 15px;
    color: #666;
    font-size: 15px;">是否删除当前选中的图片？</div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="warning" size="small" @click="doDetele()">确 定</el-button>
  </span>
</el-dialog>


    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Prop } from "vue-property-decorator";
import * as indexApi from "../../api/indexApi";
import * as Api from "../../api/api";

import filterdrug from "../drug/filterdrug";
import * as Config from "../../api/conf";
import vuecropper from "vue-cropper";
// import prescriptioninfo from "../transmit/prescriptioninfo";
@Component({
  props: {},
  components: {
    filterdrug,
    vuecropper
    // prescriptioninfo
  }
})
export default class AddGoods extends Vue {
  @Prop({ required: false })
  preImageList: any;

  @Prop({ required: false })
  presId: any;

  @Prop({ required: false })
  haveDetele: boolean;

  @Prop({ required: false })
  haveSave: boolean;

  //true 不可以删除已有图片
  //false 全部图片可以删除
  @Prop({ required: false })
  temporary: boolean;
  @Prop({ required: false })
  notHaveAdd: boolean;

  get allTemporary() {
    let a = this.preImageList.filter(item => {
      return item.temporary;
    });
    return a.length > 0;
  }

  centerDialogVisible = false;
  changePreImageUrl(index) {
    setTimeout(() => {
      this.preIndex = index;
      this.option.img = this.preImageList[this.preIndex].presImageUrl;
    }, 100);
  }
  crap = false;
  previews = {};
  option = {
    img: "",
    size: 1,
    full: false,
    outputType: "jpg",
    canMove: true,
    fixedBox: false,
    original: true,
    canMoveBox: false
  };
  downImg = "#";
  changeScale(value) {
    let a: any = this.$refs.cropper;
    a.changeScale(value);
  }

  rotateRight() {
    let a: any = this.$refs.cropper;
    a.rotateRight();
  }
  rotateLeft() {
    let a: any = this.$refs.cropper;
    a.rotateLeft();
  }
  rotateDetele() {
    if (
      (this.temporary && !this.preImageList[this.preIndex].temporary) ||
      this.preImageList.length == 0
    ) {
      return;
    }
    this.centerDialogVisible = true;
  }
  doDetele() {
    this.preImageList.splice(this.preIndex, 1);
    if (this.preImageList.length > 0) {
      if (this.preIndex !== 0) {
        this.preIndex -= 1;
      }
    } else {
      this.option.img = null;
    }
    this.changePreImageUrl(this.preIndex);
    this.centerDialogVisible = false;
  }
  doClick() {
    if ((<any>this.$refs.logo).files.length == 0) {
    } else {
      (<any>this.$refs.logo).value = "";
    }
    (<any>this.$refs.logo).click();
  }
  isSizeClear() {
    let form = new FormData();
    let logo = (<any>this.$refs.logo).files[0];
    if (!logo) {
      return;
    }
    form.append("file", logo);
    Api.uploadFile(form)
      .then(({ data }) => {
        console.log("data", data);
        if (data.status === 200) {
          let imgUrl = data.data.filename;
          this.preImageList.push({ presImageUrl: imgUrl, temporary: true });
          if (this.preImageList.length === 1) {
            this.changePreImageUrl(0);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  preIndex = 0;

  rotateSave() {
    if (!this.allTemporary) {
      return;
    }
    this.$confirm("保存所有暂存图片将立刻更改处方图片，是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      closeOnClickModal: false
    })
      .then(() => {
        let imguploadlist = this.preImageList.map(item => {
          return item.presImageUrl;
        });
        let updateForm = { presId: this.presId, pictureIds: imguploadlist };
        indexApi.updatePre(updateForm).then(res => {
          if (res["retCode"]) {
            this.$emit("getInfo");
            this.$message({
              type: "success",
              message: "保存成功!"
            });
          } else {
            if (!res["islogin"]) {
              this.$alert(res["message"]);
            }
            console.error("数据查询错误");
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消上传"
        });
      });
  }
  mounted() {}
}
</script>

<style  scoped>
.noselect {
  border: 1px #e5e5e5 solid;
}

.selectImage {
  cursor: pointer;
  border: 1px #409eff solid;
}
.noselect:hover {
  cursor: pointer;
  border: 1px #409eff solid;
}
.iconcropper {
  padding: 10px;
  cursor: pointer;
}
.iconcropper:active {
  opacity: 0.5;
}
</style>