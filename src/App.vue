<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class App extends Vue {
  mounted(){
    window['myvue'] = this;
      if(!sessionStorage.merchantUserId || !sessionStorage.token){
        this.$router.replace('/login');
      }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 }
*{
}
 aside{
   overflow: auto!important;
 }
 .menu-expanded{
   overflow: auto!important;
 }


 .menu-expanded{
    background-color:  #c30d23;
    color:#fff;
 }
 .el-menu{
    background-color:  #c30d23;
 }
 .el-menu-item{
       color: #fff;
    background-color:  #c30d23;
    
 }
 .el-menu-item i{
       color: #fff;
   
 }
 .el-submenu__title{
   background-color:#c30d23;
       color: #fff;
 }
  .el-menu-item:hover{
    background-color:  #981122!important;
 }
 .el-submenu__title:hover{
    background-color:  #981122!important;
 }

.el-menu-item.is-active{
  color:#EA8D03;
  background-color:#981122!important;
}
.menu-collapsed{
  background-color:#c30d23!important;
  
}
.el-step.is-simple .el-step__head{
  width: auto;
    font-size: inherit!important;
    padding-right: 10px;
}
.flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.flex-v {
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.flex-1 {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.flex-align-center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.flex-align-flex-end {
  -webkit-box-align: flex-end;
  -webkit-align-items: flex-end;
  -ms-flex-align: flex-end;
  align-items: flex-end;
}
.flex-pack-center {
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.flex-flex-start-center {
  -webkit-box-pack: flex-start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: flex-start;
  justify-content: flex-start;
}
.flex-pack-justify {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.flex-around-justify {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-around;
  -ms-flex-pack: justify;
  justify-content: space-around;
}
.flex-end-justify {
  -webkit-box-pack: flex-end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: flex-end;
  justify-content: flex-end;
}
.flex-warp-justify {
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
}
.flex-nowrap-justify {
  -webkit-flex-wrap: nowrap;
  -moz-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  -o-flex-wrap: nowrap;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px!important;
    height: 100px!important;
    line-height:100px!important;
    text-align: center!important;
  }
  .avatar {
    width: 100px!important;
    height: 100px!important;
    display: block;
  }
  
.send_box .el-dialog__body{
  padding:0!important;
  position:relative;
}
.send_box .el-dialog__header{
display:none;
}

</style>
