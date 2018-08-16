<template>
    <div>
    <h3 class="title">优惠券{{$route.params.id?'编辑':'添加'}}</h3>
  
<div style="padding:20px;">
<el-form label-width="180px">

                <el-form-item label="优惠券名称">
                    <el-input style="width:400px;float:left;" v-model="couponObj.couponName"></el-input>
                </el-form-item>

                <el-form-item label="优惠券面额（元）">
                    <el-input style="width:400px;float:left;" v-model="couponObj.couponDenomination" ></el-input>
                </el-form-item>  
                
                <el-form-item label="消费满额使用（元）">
                    <el-input style="width:400px;float:left;" v-model="couponObj.fullDenomination"></el-input>
                </el-form-item>



  <el-form-item label="有效期" style="display: flex;align-items: center;justify-content: flex-start;">

<div  style="text-align:left;margin-left:-180px;" >
<div style="margin:10px">
 <el-radio v-model="couponObj.validityType" label="RELATIVE_DATE" @change="changevalidityType"><span>自领取日起算</span>
 <el-input style="width:10em;margin:0 20px;" v-model="couponObj.days" :disabled="couponObj.validityType == 'ABSELUTE_DATE'"></el-input>天</el-radio>
</div>
  <div style="margin:10px">
 <el-radio v-model="couponObj.validityType" label="ABSELUTE_DATE" @change="changevalidityType"><span>指定有效日期</span> 
 <el-date-picker  type="date" placeholder="开始日期" v-model="couponObj.beginDate" :disabled="couponObj.validityType == 'RELATIVE_DATE'">
						</el-date-picker>
						<el-date-picker  type="date" placeholder="结束日期" v-model="couponObj.endDate" :disabled="couponObj.validityType == 'RELATIVE_DATE'">
						</el-date-picker>
 </el-radio>
</div>
</div>
                </el-form-item>





                
  <el-form-item label="使用范围" style="    display: flex;
    align-items: center;
    justify-content: flex-start;">

<div  style="text-align:left;margin-left:-180px;" >
<div style="margin:10px">
 <el-radio v-model="couponObj.rangeType" @change="changerangeType" label="ALL"><span>全商城通用</span></el-radio>
</div>
  <div style="margin:10px">
 <el-radio v-model="couponObj.rangeType" @change="changerangeType" label="CAT_TAG"><span>指定使用范围</span> 
  <span style="margin:0 20px " >
    已选：{{catObj.catName}}
</span>
<el-popover
  placement="right"
  width="400"
  trigger="click" title="指定范围" v-model="popoverModel">
<div style="max-height:400px;overflow: auto;">
  <el-tree style="width:380px;"   :data="treeData"  default-expand-all :props="defaultProps" :expand-on-click-node="false" 
  node-key="catId" ref="tree" highlight-current @node-click="doNodeClick" >
  </el-tree>
</div>
    <div style="padding:10px 10px 0 10px;  display: flex;
    align-items: center;
    justify-content:space-between;">


<span style=" ">
    已选：{{catObj.catName}}
</span>
<div>
        <el-button type="primary" size="text" @click="popoverModel = false">取消</el-button>
        <el-button type="primary" size="mini" @click="setCatId()">确定</el-button>
    </div>
    </div>
  <el-button slot="reference" :disabled="couponObj.rangeType=='ALL'">指定范围</el-button>
</el-popover>

 </el-radio>
</div>
</div>
                </el-form-item>




 <el-form-item label="领取条件" style="    display: flex;

    align-items: center;
    justify-content: flex-start;">

<div  style="text-align:left;margin-left:-180px;" >
<div style="margin:10px">
 <el-radio v-model="couponObj.conditionType" label="ALL_USER"><span>全部会员</span></el-radio>
</div>
  <div style="margin:10px">
 <el-radio v-model="couponObj.conditionType" label="NEW_USER"><span>新注册会员</span> 
 </el-radio>
</div>
</div>

                </el-form-item>
<el-form-item label="优惠券图片" style="    display: flex;align-items: center;
    justify-content: flex-start;">
<div style="text-align:left;margin-left:-180px;">
  <el-upload :before-upload="beforeUpload" :action="fileUploadUrl"   class="avatar-uploader" list-type="picture-card" :show-file-list="false"   :on-success="handleSuccess1" :file-list="fileList">
                  <img v-if="fileList[fileList.length-1]" :src="fileList[fileList.length-1]?fileList[fileList.length-1].url:''" class="avatar"/>
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
</div>
                </el-form-item>
    </el-form>
<div class="submit">
  <el-button type="primary" @click="submit()">提交</el-button>
</div>
</div>
    </div>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as couponApi from "../../api/couponApi";
import * as Api from "../../api/Api";
import * as Config from "../../api/conf";
import moment from "moment";

class coupon {
  couponName: string;
  couponType: string = "MONEY_OFF";
  couponDenomination: number;
  fullDenomination: number;
  validityType: string = "ABSELUTE_DATE";
  rangeType: string = "ALL";
  conditionType: string = "ALL_USER";
  couponImg: string;
  days;
  beginDate;
  endDate;
  catId: string;
  status;
}

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class AddGoods extends Vue {
  couponObj = new coupon();
  radio = "2";
  catObj = {
    catId: ""
  };
  treeData = [
    {
      catId: "0",
      catName: "分类",
      children: []
    }
  ];
  defaultProps = {
    children: "children",
    label: "catName"
  };
  popoverModel = false;
  fileUploadUrl = "";
  fileList = [];
  setCatId() {
    if (!this.catObj) {
      this.$message("未选择任何分类");
      return;
    }
    this.couponObj.catId = this.catObj.catId;
    this.popoverModel = !this.popoverModel;
  }
  handleSuccess1(response, file, fileList) {
    let dt = {
      name: "1.png",
      url: response.data.filename
    };
    this.fileList.push(dt);
  }
  doNodeClick(object, node, control) {
    console.log(object);
    if (object.levelNum == 1 || object.catId == "0") {
      this.$alert("请选择末级分类");
      return;
    }
    this.catObj = object;
  }
  changerangeType(e) {
    if (e == "ALL") {
      this.couponObj.catId = "";
      this.catObj = {
        catId: ""
      };
    }
    if (e == "CAT_TAG") {
    }
  }
  beforeUpload(file) {
    console.log(file);
    // console.log(this.$refs.upload)
    console.log("before upload ...");
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      this.$message.error("上传图片大小不能超过 5MB!");
    }
    return isLt5M;
  }

  changevalidityType(e) {
    // if (e == "ABSELUTE_DATE") {
    //   this.couponObj.days = "";
    // }
    // if (e == "RELATIVE_DATE") {
    //   this.couponObj.beginDate = "";
    //   this.couponObj.endDate = "";
    // }
  }
  submit() {

    
    if ((this.couponObj.couponName || "") == "") {
      this.$message("请填写优惠券名称");
      return;
    }

    if ((this.couponObj.couponDenomination || "") == "") {
      this.$message("请填写优惠券面额");
      return;
    }
    if ((this.couponObj.fullDenomination || "") == "") {
      this.$message("请填写满额使用");
      return;
    }
    if (
      this.couponObj.validityType == "RELATIVE_DATE" &&
      (this.couponObj.days || "") == ""
    ) {
      this.$message("请填写天数");
      return;
    }
    if (
      this.couponObj.validityType == "ABSELUTE_DATE" &&
      ((this.couponObj.beginDate || "") == "" ||
        (this.couponObj.endDate || "") == "")
    ) {
      this.$message("请指定有效日期");
      return;
    }
    if (
      this.couponObj.rangeType == "CAT_TAG" &&
      (this.catObj["catName"] || "") == ""
    ) {
      this.$message("请指定指定有效范围");
      return;
    }
    if (this.fileList.length == 0) {
      this.$message("请添加优惠券图片");
      return;
    }

    this.couponObj.couponImg = this.fileList[this.fileList.length - 1].url;

console.log(this.couponObj)

console.log(moment(this.couponObj.beginDate))

    if (this.couponObj.validityType == "ABSELUTE_DATE") {
      this.couponObj.days = "";
    this.couponObj.beginDate =   moment(this.couponObj.beginDate).format("YYYY-MM-DD")  + " 00:00:00";
    this.couponObj.endDate =   moment(this.couponObj.endDate).format("YYYY-MM-DD")  +  " 23:59:59";
    }
    if (this.couponObj.validityType == "RELATIVE_DATE") {
      this.couponObj.beginDate = "";
      this.couponObj.endDate = "";
    }

    if (this.$route.params.id) {
      couponApi.updateCoupinItem(this.couponObj).then(res => {
        if (res.retCode) {
          this.$message("保存成功");
          this.$router.push("/couponlist");
        } else {
          this.$alert("提交失败");
        }
      });
    } else {
      couponApi.addCoupinItem(this.couponObj).then(res => {
        console.log(res);
        if (res.retCode) {
          this.$message("添加成功");
          this.$router.push("/couponlist");
        } else {
          this.$alert("提交失败");
        }
      });
    }

    //  addCoupinItem
  }
  loadAll() {
    Api.requestQueryTree("COMMON").then(res => {
      if (res["retCode"]) {
        this.treeData[0].children = res["data"].children;
        if (this.$route.params.rangeType == "CAT_TAG") {
          let a;
          this.treeData[0].children.forEach((item, index) => {
            a = item.children.filter((items, indexs) => {
              return this.$route.params.catId == items.catId;
            });
            if (a.length > 0) {
              this.catObj = a[0];
              return;
            }
          });
        }
      } else {
        this.$alert("获取分类失败");
      }
    });
  }
  mounted() {
    this.loadAll();
    if (this.$route.params.id) {
      for (let n in this.$route.params) {
        this.couponObj[n] = this.$route.params[n];
      }
      this.fileList = [{ name: "1.png", url: this.$route.params.couponImg }];
    }

    this.fileUploadUrl = Config.g_upload_url;
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
.submit {
  text-align: left;
  padding: 10px;
  border-top: 1px #e5e5e5 solid;
}
</style>