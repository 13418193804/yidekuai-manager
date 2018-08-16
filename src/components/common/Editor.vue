<template>
    <div>
        <quill-editor ref="myEditor" :content="content" :options="editorOption" @change="onEditorChange($event)" 
        style="width:90%;height:800px;margin-top:20px;">
        </quill-editor>
        <div style="display:none;"><input type="file" id="getFile" @change="uploadFunction($event)" /></div>
    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from 'axios';
import BaseApi from "../../api/baseapi";



@Component({
    props: {
    },
})
export default class Editor extends Vue {

    content=""
    editorOption = {
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


  
    mounted() {
        console.log("edit");
    }

  
  getContent(){
    return this.content;
  }
  setContent(html:string){

    this.content = html
  }

   onEditorChange({ editor, html, text }) {
      this.content = html;
    }

    uploadFunction(e) {
      //you can get images data in e.target.files
      //an single example for using formData to post to server

      let form = new FormData();
      form.append("file", e.target.files[0]);

      let baseApi = new BaseApi()

      baseApi.uploadFile(form).then(res => {

        let imgUrl = res.data["filename"];
        console.log("file upload url="+imgUrl);

        // console.log(this.$refs.myEditor.quill)
        // console.log(this.$refs.myEditor)


        let quill = this.$refs["myEditor"]["quill"] 
        let idx = quill.getSelection().index;
        quill.insertEmbed(idx, "image", imgUrl);
        idx = quill.getSelection().index;
        

        // quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER)   // 调用
        console.log(imgUrl);
      });

      //do your post
    }


   

 }
</script>

<style  scoped>
</style>