<template>
    <div>
        图片文件上传
        <el-upload   accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"  :before-upload="beforeUpload" :action="fileUploadUrl" 
        list-type="picture-card" :on-preview="onPreview" 
        :on-remove="onRemove" :on-success="onSuccess"
         :file-list="imageList">
            <i class="el-icon-plus"></i>
        </el-upload>

               <el-dialog v-model="dialogVisible" :modal="modelStatus" >
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
     

    </div>
</template>

<script>

import * as Config from '../api/conf'

export default {
    data() {
        return {
            imageList: [],
            dialogVisible:false,
            dialogImageUrl:'',
            modelStatus:false,
            fileUploadUrl:''

        }
    },
    props:["imageUrlList"],

   
    watch: {

        imageUrlList(fileList) {

            this.imageList=[]
            

            for(let i in fileList){

                let dt = {
                name: i+".png",
                url: fileList[i]
                }
                this.imageList.push(dt)
       
            }

         

        }
        },

    mounted() {

        this.fileUploadUrl = Config.g_upload_url

    },
    methods: {

        onPreview(file) {

            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
     
        },
    beforeUpload(file) {
      console.log(file);
      // console.log(this.$refs.upload)
      console.log("before upload ...");
         const isLt5M = file.size / 1024 / 1024 < 5;
         if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return  isLt5M;
    },

        onRemove(file, fileList) {
            for (let i in this.imageList) {
                let url = this.imageList[i].url
                if (url == file.url) {
                    console.log("delete url="+url)
                    this.imageList.splice(i, 1)
                    break;
                }
            }
            let imageUrlList = this.makeImageUrlList(this.imageList)
            this.$emit('updateImageList',imageUrlList)
   

        },

        onSuccess(response, file, fileList) {

            let dt = {
                name: "1.png",
                url: response.data.filename
            }
            this.imageList.push(dt)

            
            let imageUrlList = this.makeImageUrlList(this.imageList)
            this.$emit('updateImageList',imageUrlList)
   

        },

        makeImageUrlList(imageList){

            let imgUrlList=[]
            for(let i in imageList){
                imgUrlList.push(imageList[i].url);
            }

            console.log(imgUrlList)
            return imgUrlList;



        }




    }
}





</script>


<style scoped>

</style>