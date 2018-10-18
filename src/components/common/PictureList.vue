<template>
    <div>
        <el-upload   accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"  :before-upload="beforeUpload"  action="http://sr.cncloud.com/qichang/fileupload" list-type="picture-card"
                    :file-list="imageFileList"
                 :on-preview="onPreview" :on-remove="onRemove" :on-success="onUploadSuccess"
                  >
                  <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog  :visible.sync="pictureDialogModel">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from 'axios';

@Component({
    props: {
        imageStringList:String
    },
  
})

export default class PictureList extends Vue {

    imageFileList=new Array();
    imageStringList:string





    pictureDialogModel=false
    dialogImageUrl=""
    


    mounted() {
        console.log("PictureList");
        console.log("params:"+this.imageStringList)

        if ((this.imageStringList||'')!=''){

            let imgList = this.imageStringList.split(",")

            console.log(imgList)
            for(let item of imgList){
                let dt = {name:item,url:item}
                this.imageFileList.push(dt)

            }


        }
    }
        beforeUpload(file) {
      console.log(file);
      // console.log(this.$refs.upload)
      console.log("before upload ...");
         const isLt5M = file.size / 1024 / 1024 < 5;
         if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return  isLt5M;
    }

    onPreview(file){
    console.log(file)
    this.dialogImageUrl  =  file.url
    this.pictureDialogModel=true
        
    }

    setImageList(imageStringList:string){

        let imgList = imageStringList.split(",")

        console.log(imgList)
        for(let item of imgList){
            let dt = {name:item,url:item}
            this.imageFileList.push(dt)

        }

    }

    getImageList(){
        let imgList=new Array();

        for (let item of this.imageFileList) {

            console.log(item)

            imgList.push(item["url"])
        }
        return imgList;
    }

   onRemove(file, fileList) {
      let pos=0;
      for (let item of this.imageFileList) {
        let url = item["url"];
        if (url == file.url) {
          console.log("remove url:"+url);
          this.imageFileList.splice(pos, 1);
          break;
        }
        pos++;
      }
    }


    onUploadSuccess(response, file, fileList){

       let dt = {
        name: "1.png",
        url: response.data.filename
      };
      this.imageFileList.push(dt);
        
    }


 }
</script>

<style  scoped>
</style>