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
    <div  v-for="(item,index) in preImageList" style="display: flex;margin-right:20px;" @click="changePreImageUrl(index)" class="" :class="preIndex == index ?'selectImage':'noselect'" >
          <img :src="item.presImageUrl" style="width:100px;height:100px;"/>
    </div>
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
import vuecropper from 'vue-cropper'

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
  mounted() {
      console.log('初始化',this.preImageUrlFlag)
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