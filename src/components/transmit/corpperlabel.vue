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
  <span style="    font-size: 28px;">{{preIndex+1}}</span>/<span style="">{{preImageList.length}}</span>
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
</div>
	</div>


<div style="width:100%;display: flex;margin:10px 0;      overflow: auto; " >
    <div  v-for="(item,index) in preImageList" :key="index" style="display: flex;margin-right:20px;" @click="changePreImageUrl(index)" class="" :class="preIndex == index ?'selectImage':'noselect'" >
          <img :src="item.presImageUrl" style="width:100px;height:100px;"/>
    </div>
</div>
<!--  添加图片 -->
<div style="width:100%;display: flex;margin:10px 0;      overflow: auto; ">
  <el-upload  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"  :action="fileUploadUrl" list-type="picture-card" ref="upload" :before-upload="beforeUpload" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList">
      <i class="el-icon-plus"></i>
    </el-upload>
</div>
<!--  上传图片 -->
<div>
  <el-button type="primary" @click="pictureUploadPre()" >上传图片</el-button>
</div>



    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Prop } from "vue-property-decorator";
import * as indexApi from "../../api/indexApi";
import filterdrug from "../drug/filterdrug";
import * as Config from "../../api/conf";
import vuecropper from 'vue-cropper';

@Component({
  props: {},
  components: {
    filterdrug,vuecropper
  }
})
export default class AddGoods extends Vue {
  @Prop({ required: false })
  preImageList: any;
 
  @Prop({ required: false })
  preImageUrlFlag: any;

  @Prop({ required: false })
  presId: any;

changePreImageUrl(index){
    setTimeout(() => {
           this.preIndex =  index;
      this.option.img = this.preImageList[this.preIndex].presImageUrl
    }, 100);
    
}
            crap= false
			previews= {}
			option= {
				img: '',
				size: 1,
				full: false,
				outputType: 'jpg',
				canMove: true,
				fixedBox: false,
				original: true,
				canMoveBox: false
			}
      downImg= '#'
      changeScale(value){ 
        let a:any = this.$refs.cropper
a.changeScale(value)
      }

rotateRight(){
    let a:any = this.$refs.cropper
a.rotateRight()
}
rotateLeft(){
    let a:any = this.$refs.cropper
a.rotateLeft()
}
  preIndex = 0;
  fileUploadUrl = "";
  fileList: any = [];
  beforeUpload(file) {
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      this.$message.error("上传图片大小不能超过 5MB!");
    }
    return isLt5M;
  }
  handleSuccess(response, file, fileList) {
    let dt = {
      name: "1.png",
      url: response.data.filename
    };
    this.fileList.push(dt);
    console.log('this.fileList',this.fileList)
  }
  handleRemove(file, fileList) {
    for (let i in this.fileList) {
      let url = this.fileList[i].url;
      if (url == file.url) {
        console.log("find ...");
        this.fileList.splice(i, 1);
        break;
      }
    }
  }
  pictureUploadPre(){
    this.$confirm('是否给该处方上传图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal:false
        }).then(() => {
          let imguploadlist = []
          for(let i=0;i<this.preImageList.length;i++){
            imguploadlist.push(this.preImageList[i].presImageUrl)
          }
          for(let j=0;j<this.fileList.length;j++){
            imguploadlist.push(this.fileList[j].url)
          }
          console.log('imguploadlist',imguploadlist);
          let updateForm = {'presId':this.presId,"pictureIds":imguploadlist};
          console.log('updateForm',updateForm)
          indexApi.updatePre(updateForm).then(res => {
            if (res["retCode"]) {
              this.fileList=[];
              this.$emit('getInfo');
              this.$message({
                    type: 'success',
                    message: '上传成功!'
              });
            } else {
              if (!res["islogin"]) {
                this.$alert(res["message"]);
              }
              console.error("数据查询错误");
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上传'
          });          
        });
  }
  mounted() {
      console.log('初始化',this.preImageUrlFlag)
      this.fileUploadUrl = Config.g_upload_url;
  }
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
.iconcropper{
      padding: 10px;
    cursor: pointer;
}
.iconcropper:active{
  opacity: 0.5
}
</style>