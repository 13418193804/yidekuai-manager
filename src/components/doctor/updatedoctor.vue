<template>
    <div >
        <!-- 增加医生 -->
        <el-dialog title="增加医生" :visible.sync="dialogFormVisible" @close="addcancel('formLabelAlign')" :close-on-click-modal="false">
        <el-form  label-width="140px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
        <el-form-item label="登录帐号" prop="phone">
            <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="医生姓名" prop="name">
            <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="所属医院" prop="hospitalId">
            <el-select v-model="formLabelAlign.hospitalId" placeholder="请选择医院" :disabled="true" clearable style="width:380px;">
                    <el-option
                    v-for="item in selecthospitallist"
                    :key="item.hospitalCode"
                    :label="item.hospitalName"
                    :value="item.hospitalCode"
                    >
                    </el-option>
            </el-select>
            <el-button type="primary" @click="select_hospital()">选择医院</el-button>
        </el-form-item>
        <el-form-item label="所在科室" prop="departmentId">
            <el-cascader
            v-model="formLabelAlign.departmentId"
            :options="tableTree"
            @change="changedepartmentId()"
            change-on-select
            clearable
            ></el-cascader>
        </el-form-item>
        <el-form-item label="职称" prop="doctorTitle">  
            <el-select v-model="formLabelAlign.doctorTitle" placeholder="请选择职称" clearable>
                    <el-option
                    v-for="item in doctortitlelist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                    </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="医生所属" prop="doctorTitle">  
            <el-select v-model="formLabelAlign.ydkFlag">
                    <el-option
                    v-for="item in flaglist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                    </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="医生擅长" prop="doctorGood">
            <el-input type="textarea" autosize v-model="formLabelAlign.doctorGood"></el-input>
        </el-form-item>
        <el-form-item label="医生简介">
            <el-input type="textarea" autosize v-model="formLabelAlign.doctorBrief"></el-input>
        </el-form-item>
        <el-form-item label="咨询价格" prop="consultingFee">
            <el-input v-model="formLabelAlign.consultingFee"></el-input>
        </el-form-item>
        <el-form-item label="医生备注">
            <el-input v-model="formLabelAlign.remark"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
            <el-input v-model="formLabelAlign.idCard"></el-input>
        </el-form-item>
        <div class="flex">
            <div class="flex flex-1">
                <div style="width:140px;text-align:right;font-size:14px;color:#606266;line-height:100px;padding-right:12px;box-sizing:border-box;">身份证正面</div>
                <el-upload
                    class="avatar-uploader"
                    :action="g_news_url"
                    :show-file-list="false"
                    list-type="picture"
                    :on-success="idCardFrontSuccess">
                    <img v-if="idCardFrontUrl" :src="idCardFrontUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div v-if="idCardFrontUrl" @click="delUrl('idCardFrontUrl')" style="font-size:14px;color:#ff0000;line-height:100px;padding-left:15px;">删除图片</div>
            </div>
            <div class="flex flex-1">
                <div style="width:140px;text-align:right;font-size:14px;color:#606266;line-height:100px;padding-right:12px;box-sizing:border-box;">身份证背面</div>
            <el-upload
                class="avatar-uploader"
                :action="g_news_url"
                :show-file-list="false"
                :on-success="idCardBackSuccess">
                <img v-if="idCardBackUrl" :src="idCardBackUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div v-if="idCardBackUrl" @click="delUrl('idCardBackUrl')" style="font-size:14px;color:#ff0000;line-height:100px;padding-left:15px;">删除图片</div>
            </div>
        </div>
        <el-form-item label="医师资格证号">
            <el-input v-model="formLabelAlign.pharmacistCertificateNum"></el-input>
        </el-form-item>
        <div class="flex">
            <div style="width:140px;text-align:right;font-size:14px;color:#606266;line-height:100px;padding-right:12px;box-sizing:border-box;">医师资格证</div>
        <el-upload
            class="avatar-uploader"
            :action="g_news_url"
            :show-file-list="false"
            :on-success="pharmacistCertificateFrontSuccess">
            <img v-if="pharmacistCertificateFrontUrl" :src="pharmacistCertificateFrontUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div v-if="pharmacistCertificateFrontUrl" @click="delUrl('pharmacistCertificateFrontUrl')" style="font-size:14px;color:#ff0000;line-height:100px;padding-left:15px;">删除图片</div>
        </div>
        <el-form-item label="医师执业证号">
            <el-input v-model="formLabelAlign.qualificationCertificateNum"></el-input>
        </el-form-item>
        <div class="flex">
            <div style="width:140px;text-align:right;font-size:14px;color:#606266;line-height:100px;padding-right:12px;box-sizing:border-box;">医师执业证</div>
        <el-upload
            class="avatar-uploader"
            :action="g_news_url"
            :show-file-list="false"
            :on-success="qualificationCertificateFrontSuccess">
            <img v-if="qualificationCertificateFrontUrl" :src="qualificationCertificateFrontUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div v-if="qualificationCertificateFrontUrl" @click="delUrl('qualificationCertificateFrontUrl')" style="font-size:14px;color:#ff0000;line-height:100px;padding-left:15px;">删除图片</div>
        </div>
        <div class="flex">
            <div class="flex flex-1">
                <div style="width:140px;text-align:right;font-size:14px;color:#606266;line-height:100px;padding-right:12px;box-sizing:border-box;">医生头像：</div>
                <el-upload
                    class="avatar-uploader"
                    :action="g_news_url"
                    :show-file-list="false"
                    :on-success="pictureSuccess">
                    <img v-if="pictureUrl" :src="pictureUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div v-if="pictureUrl" @click="delUrl('pictureUrl')" style="font-size:14px;color:#ff0000;line-height:100px;padding-left:15px;">删除图片</div>
            </div>
        </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addcancel('formLabelAlign')">取 消</el-button>
            <el-button type="primary" @click="adddoctorrules('formLabelAlign')" :disabled="loading">确 定</el-button>
        </div>
        </el-dialog>



        <!-- 医生编辑 -->
        <el-dialog title="医生编辑" :visible.sync="dialogFormVisible1" @close="updatecancel('formLabelAlign1')" :close-on-click-modal="false" top="5vh">
        <div v-bouncing="updateloading">
        <el-form  label-width="140px" :model="formLabelAlign1" :rules="rules" ref="formLabelAlign1">
        <el-form-item label="医生姓名" prop="name">
            <el-input v-model="formLabelAlign1.name"></el-input>
        </el-form-item>
        <el-form-item label="所属医院" prop="hospitalId">
            <el-select v-model="formLabelAlign1.hospitalId" placeholder="请选择医院" :disabled="true" style="width:380px;">
                    <el-option
                    v-for="item in selecthospitallist"
                    :key="item.hospitalCode"
                    :label="item.hospitalName"
                    :value="item.hospitalCode"
                    >
                    </el-option>
            </el-select>
            <el-button type="primary" @click="select_hospital()">选择医院</el-button>
        </el-form-item>
        <el-form-item label="所在科室" prop="departmentId">  
            <el-cascader
            v-model="formLabelAlign1.departmentId"
            :options="tableTree"
            @change="changeupdatedepartmentId()"
            change-on-select
            clearable
            ></el-cascader>
        </el-form-item>
        <el-form-item label="职称" prop="doctorTitle">  
            <el-select v-model="formLabelAlign1.doctorTitle" placeholder="请选择职称" clearable>
                    <el-option
                    v-for="item in doctortitlelist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                    </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="医生所属" prop="doctorTitle">  
            <el-select v-model="formLabelAlign1.ydkFlag">
                    <el-option
                    v-for="item in flaglist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                    </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="医生擅长" prop="doctorGood">
            <el-input type="textarea" autosize v-model="formLabelAlign1.doctorGood"></el-input>
        </el-form-item>
        <el-form-item label="医生简介">
            <el-input type="textarea" autosize v-model="formLabelAlign1.doctorBrief"></el-input>
        </el-form-item>
        <el-form-item label="咨询价格" prop="consultingFee">
            <el-input v-model="formLabelAlign1.consultingFee"></el-input>
        </el-form-item>
        <el-form-item label="医生备注">
            <el-input v-model="formLabelAlign1.remark"></el-input>
        </el-form-item>
        <el-form-item label="身份证"> 
            <el-input v-model="formLabelAlign1.idCard"></el-input>
        </el-form-item>
        <div class="flex">
            <div class="flex flex-1">
                <div style="width:140px;text-align:right;font-size:14px;color:#606266;line-height:100px;padding-right:12px;box-sizing:border-box;">身份证正面</div>
                <el-upload
                    class="avatar-uploader"
                    :action="g_news_url"
                    :show-file-list="false"
                    :on-success="idCardFrontSuccess">
                    <img v-if="idCardFrontUrl" :src="idCardFrontUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div v-if="idCardFrontUrl" @click="delUrl('idCardFrontUrl')" style="font-size:14px;color:#ff0000;line-height:100px;padding-left:15px;">删除图片</div>
            </div>
            <div class="flex flex-1">
                <div style="width:140px;text-align:right;font-size:14px;color:#606266;line-height:100px;padding-right:12px;box-sizing:border-box;">身份证背面</div>
            <el-upload
                class="avatar-uploader"
                :action="g_news_url"
                :show-file-list="false"
                :on-success="idCardBackSuccess">
                <img v-if="idCardBackUrl" :src="idCardBackUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div v-if="idCardBackUrl" @click="delUrl('idCardBackUrl')" style="font-size:14px;color:#ff0000;line-height:100px;padding-left:15px;">删除图片</div>
            </div>
        </div>
        <el-form-item label="医师资格证号">
            <el-input v-model="formLabelAlign1.pharmacistCertificateNum"></el-input>
        </el-form-item>
        <div class="flex">
            <div style="width:140px;text-align:right;font-size:14px;color:#606266;line-height:100px;padding-right:12px;box-sizing:border-box;">医师资格证</div>
        <el-upload
            class="avatar-uploader"
            :action="g_news_url"
            :show-file-list="false"
            :on-success="pharmacistCertificateFrontSuccess">
            <img v-if="pharmacistCertificateFrontUrl" :src="pharmacistCertificateFrontUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div v-if="pharmacistCertificateFrontUrl" @click="delUrl('pharmacistCertificateFrontUrl')" style="font-size:14px;color:#ff0000;line-height:100px;padding-left:15px;">删除图片</div>
        </div>
        <el-form-item label="医师执业证号">
            <el-input v-model="formLabelAlign1.qualificationCertificateNum"></el-input>
        </el-form-item>
        <div class="flex">
            <div style="width:140px;text-align:right;font-size:14px;color:#606266;line-height:100px;padding-right:12px;box-sizing:border-box;">医师执业证</div>
        <el-upload
            class="avatar-uploader"
            :action="g_news_url"
            :show-file-list="false"
            :on-success="qualificationCertificateFrontSuccess">
            <img v-if="qualificationCertificateFrontUrl" :src="qualificationCertificateFrontUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div v-if="qualificationCertificateFrontUrl" @click="delUrl('qualificationCertificateFrontUrl')" style="font-size:14px;color:#ff0000;line-height:100px;padding-left:15px;">删除图片</div>
        </div>

        <div class="flex">
                <div style="width:140px;text-align:right;font-size:14px;color:#606266;line-height:100px;padding-right:12px;box-sizing:border-box;">医生头像：</div>
                <el-upload
                    class="avatar-uploader"
                    :action="g_news_url"
                    :show-file-list="false"
                    :on-success="pictureSuccess">
                    <img v-if="pictureUrl" :src="pictureUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div v-if="pictureUrl" @click="delUrl('pictureUrl')" style="font-size:14px;color:#ff0000;line-height:100px;padding-left:15px;">删除图片</div>
        </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="updatecancel('formLabelAlign1')">取 消</el-button>
            <el-button type="primary" @click="updatedoctorrules('formLabelAlign1')" :disabled="loading">确 定</el-button>
        </div>
        </div>
        </el-dialog>


        <el-dialog title="查询医院" :visible.sync="hospitalDialog" @close="hospitalDialogcancel()" :close-on-click-modal="false" width="80%" top="5vh">
        <div v-bouncing="hospitalloading">
        <div style="height:500px;overflow-y: auto;">
            <div style="padding-bottom:20px;">
                <el-row :gutter="10">
                    <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
                        <el-input placeholder="请输入医院名称" style="margin-top:20px;" v-model="keyname" clearable></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
                        <el-select v-model="province" placeholder="请选择省" style="margin-top:20px;" @change="provincechange()" clearable @clear="provincechange()">
                        <el-option
                        v-for="item in provincelist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        >
                        </el-option>
                        </el-select>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
                        <el-select v-model="city" placeholder="请选择市" style="margin-top:20px;" @change="citychange()" clearable @clear="citychange()">
                        <el-option
                        v-for="item in citylist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                        </el-select>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
                        <el-select v-model="country" placeholder="请选择区" style="margin-top:20px;" clearable>
                        <el-option
                        v-for="item in countrylist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                        </el-select>
                    </el-col>
                
                <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
                    <el-button type="primary" icon="el-icon-search"  style="margin-top:20px;" @click="clearcurrentPage()">查询</el-button>
                </el-col>
                </el-row>
            </div>
            <div class="flex flex-pack-center  flex-align-center" style="height:100%" v-if="nohospitallist">
                <i class="iconfont icon-shangxin" style="font-size:90px"></i>
                <div>
                    <div>搜索不到医院</div>
                    <div style=" color: #8492a6; font-size: 13px">请去添加医院吧~</div>
                </div>
            </div>
            <div class="flex flex-warp-justify">
                <div v-for="(item,index) in hospitallist" :key="index" class="flex hospitalCard textLabel" @click="clickhospital(item)">
                    <img src="../../assets/yiyuan.png" style="height: 80px;width: 80px;margin: 5px 10px;"/>
                    <div  style="line-height: 20px;" class="textLabel">
                        <div class="textLabel">{{item.hospitalName}}</div>
                        <div class="textLabel">{{item.hospitalCode}}</div>
                        <div class="textLabel">{{item.locatedProvince?item.locatedProvince:''}} {{item.locatedCity?item.locatedCity:''}} {{item.locatedArea?item.locatedArea:''}}</div>
                        <div class="textLabel" v-if="item.hospitalAddress">{{item.hospitalAddress}}</div>
                    </div>
                </div>
            </div>

            <el-col :span="24" class="toolbar">
                <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="onPageChange">
                </el-pagination>
            </el-col>
        </div>
        </div>


        
        </el-dialog>

    </div>
    
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as doctorApi from "../../api/doctorApi";
import * as hospitalApi from "../../api/hospitalApi";
import * as departmentApi from "../../api/departmentApi";
import * as indexApi from "../../api/indexApi";
import  prescriptioninfo from "../transmit/prescriptioninfo";
import  remindertable from "../order/remindertable";
import { Prop } from "vue-property-decorator";
import  * as  confUrl from "../../api/conf";

@Component({
  props: {},
  components: {
    prescriptioninfo,remindertable
  }
})
export default class doctor extends Vue {

  @Prop({ required: false })
  tableTree: any;
    @Prop({ required: false })
hospitallist: any;
g_news_url:any='';
checkconsultingFee = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('咨询费用不能为空'));
        }
        setTimeout(() => {
            let c:any = value
            let b = c>=0
            if (!b) {
              callback(new Error('请输入正确的咨询费'));
            } else {
              callback();
            }
        }, 1000);
      };
checkidcard = (rule, value, callback)=>{
    if(value){
        let c:any = value
        doctorApi.checkidcard(c).then(res => {
        if (res["retCode"]) {
            callback();
        } else {
            callback(new Error('请输入正确的身份证'));
            // if(!res['islogin']){this.$alert(res["message"]);}
            console.error("数据查询错误");
        }
        });
    }
};
rules={
    phone: [
        { required: true, message: '请填写登录帐号', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请填写医生姓名', trigger: 'blur' }
    ],
    hospitalId:[
        { required: true, message: '请选择医院', trigger: 'change' }
    ],
    departmentId:[
        { required: true, message: '请选择科室', trigger: 'change' }
    ],
    doctorGood:[
        { required: true, message: '请填写擅长', trigger: 'blur' }
    ],
    // doctorBrief:[
    //     { required: true, message: '请填写简介', trigger: 'blur' }
    // ],
    doctorTitle:[
        { required: true, message: '请选择职称', trigger: 'blur' }
    ],
    consultingFee:[
        { required: true,validator: this.checkconsultingFee, trigger: 'blur' }
    ],
    // idCard:[
    //     {validator: this.checkidcard,trigger: 'blur'}
    // ]
}
hospitalDialog=false;
dialogFormVisible=false
dialogFormVisible1=false;
updateloading=false;
           update='';
    
    formLabelAlign1:any ={
          name: '',
          phone: '',
          hospitalId:'',
          hspCode:'',
          hospitalName: '',
          hospitalDepartment: '',
          departmentId:[],
          departmentName:'',
          doctorBrief: '',
          doctorGood: '',
          consultingFee: '',
          prescriptionNum:'',
          orderNum:'',
          orderMoney:'',
          doctorPatientNum:'',
          remark:'',
          doctorTitle:'',
                    idCard:'',
          pharmacistCertificateNum:'',
          qualificationCertificateNum:'',
          sex:'',
          age:'',
          picture:'',
          ydkFlag:'',
}
// ASSISTANT_PHYSICIAN,//住院医师
//     ATTENDING_DOCTOR,//主治医师
//     DEPUTY_CHIEF_PHYSICIAN,//副主任医师
//     CHIEF_PHYSICIAN,//主任医师
doctortitlelist:any=[
    {id:'ASSISTANT_PHYSICIAN',name:'住院医师'},
    {id:'ATTENDING_DOCTOR',name:'主治医师'},
    {id:'DEPUTY_CHIEF_PHYSICIAN',name:'副主任医师'},
    {id:'CHIEF_PHYSICIAN',name:'主任医师'}
]
flaglist:any=[
    {id:'1',name:'医德快'},
    {id:'0',name:'痔得快'},
]
addshow(){
    this.dialogFormVisible=true
}

updatedoctorrules(formLabelAlign1){
    let a:any = this.$refs.formLabelAlign1
      a.validate((valid) => {
      if (valid) {    
          if(this.update=='update'){
              this.updatedoctor();
          }
        if(this.update=='notPassUpdate'){
              this.notPassupdatedoctor();
          }
        return true;
      } else {
        console.log('error submit!!');
        return false;
      }
    });
}
loading=false;

updatedoctor(){
          let a = this.selecthospitallist.filter(item => {return (item.hospitalCode == this.formLabelAlign1.hospitalId);});
        console.log(a)
        this.loading = true
          let hospital = []
          hospital['hospitalCode']=a[0].hospitalCode;
          hospital['hospitalName']=a[0].hospitalName;
          let department = [];
          let departmentindex = this.formLabelAlign1.departmentId.length - 1
          department['departmentName']=this.formLabelAlign1.departmentName;
          department['departmentId']=this.formLabelAlign1.departmentId[departmentindex];
          if(this.formLabelAlign1.idCard){
              doctorApi.checkidcard(this.formLabelAlign1.idCard).then(res => {
                if (res["retCode"]) {
                    console.log(res.data)
                    this.formLabelAlign1.sex=res.data.sex
                    this.formLabelAlign1.age=res.data.age
                    doctorApi.updatedoctor(this.formLabelAlign1,hospital,department,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl,this.pictureUrl).then(res => {
                        this.loading=false
                    if (res["retCode"]) {
                        this.dialogFormVisible1 = false;
                        this.updateloading=false;
                        // this.getdoctorList();
                        this.$emit('getdoctorList')
                                this.$message('保存成功')
                    } else {
                        if(!res['islogin']){this.$alert(res["message"]);}
                        console.error("数据查询错误");
                    }
                    });
                } else {
                    this.loading=false
                    if(!res['islogin']){this.$alert(res["message"]);}
                    console.error("数据查询错误");
                }
                });
          }else{
              doctorApi.updatedoctor(this.formLabelAlign1,hospital,department,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl,this.pictureUrl).then(res => {
                    this.loading=false
                if (res["retCode"]) {
                    this.dialogFormVisible1 = false;
                    this.updateloading=false;
                    // this.getdoctorList();
                    this.$emit('getdoctorList')
                            this.$message('保存成功')
                } else {
                    if(!res['islogin']){this.$alert(res["message"]);}
                    console.error("数据查询错误");
                }
                });
          }
    
}
notPassupdatedoctor(){
          let a = this.selecthospitallist.filter(item => {return (item.hospitalCode == this.formLabelAlign1.hospitalId);});
          this.loading = true
          let hospital = []
          console.log('1111',a)
          hospital['hospitalCode']=a[0].hospitalCode;
          hospital['hospitalName']=a[0].hospitalName;
          let department = [];
          let departmentindex = this.formLabelAlign1.departmentId.length - 1
          department['departmentName']=this.formLabelAlign1.departmentName;
          department['departmentId']=this.formLabelAlign1.departmentId[departmentindex];
          if(this.formLabelAlign1.idCard){
              doctorApi.checkidcard(this.formLabelAlign1.idCard).then(res => {
                if (res["retCode"]) {
                    console.log(res.data)
                    this.formLabelAlign1.sex=res.data.sex
                    this.formLabelAlign1.age=res.data.age
                    doctorApi.notPassupdatedoctor(this.formLabelAlign1,hospital,department,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl,this.pictureUrl).then(res => {
                            this.loading=false
                        if (res["retCode"]) {
                            this.dialogFormVisible1 = false;
                            this.updateloading=false;
                            this.$emit('getDoctorExamineList')
                            this.$message('修改成功')
                        } else {
                            if(!res['islogin']){this.$alert(res["message"]);}
                            console.error("数据查询错误");
                        }
                        });
                } else {
                    this.loading=false
                    if(!res['islogin']){this.$alert(res["message"]);}
                    console.error("数据查询错误");
                }
                });
          }else{
              doctorApi.notPassupdatedoctor(this.formLabelAlign1,hospital,department,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl,this.pictureUrl).then(res => {
                this.loading=false
            if (res["retCode"]) {
                this.dialogFormVisible1 = false;
                this.updateloading=false;
                this.$emit('getDoctorExamineList')
                this.$message('修改成功')
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
          }
            
        }
        selecthospitallist=[];
        handleEdit(index, row,state) {
            this.update=state;
            this.dialogFormVisible1=true;
            this.updateloading=true;
            this.formLabelAlign1.doctorId=row.doctorId;
            this.formLabelAlign1.phone=row.phone;
            this.formLabelAlign1.hospitalId=row.hspCode;
            this.formLabelAlign1.hspCode=row.hspCode;
            this.formLabelAlign1.name=row.name
            this.formLabelAlign1.doctorGood=row.doctorGood
            this.formLabelAlign1.doctorBrief=row.doctorBrief
            this.formLabelAlign1.remark=row.remark
            this.formLabelAlign1.consultingFee=row.consultingFee
            this.formLabelAlign1.doctorTitle=row.doctorTitle
            this.idCardFrontUrl=row.idCardFront
          this.idCardBackUrl=row.idCardBack
          this.pharmacistCertificateFrontUrl=row.pharmacistCertificateFront
          this.qualificationCertificateFrontUrl=row.qualificationCertificateFront
                    this.formLabelAlign1.idCard=row.idCard
          this.formLabelAlign1.pharmacistCertificateNum=row.pharmacistCertificateNum
          this.formLabelAlign1.qualificationCertificateNum=row.qualificationCertificateNum
          this.pictureUrl=row.picture
          this.selecthospitallist=[{hospitalCode:row.hspCode,hospitalName:row.hospitalName}]
          this.formLabelAlign1.ydkFlag=row.ydkFlag
            if(row.consultingFee==0){
                this.formLabelAlign1['consultingFee']='0';
            }
            this.finddeptree(row.departmentId)
        }

        finddeptree(departmentId){
     departmentApi.finddeptree(departmentId).then(res => {
            if (res["retCode"]) {


       let a = []

           res.data.forEach((item,index)=>{
             if(item[0]){
               a.push(item[0].departmentId)
             }
           })
  a.push(departmentId)
  this.formLabelAlign1['departmentId'] = a
  console.log('departmentId',this.formLabelAlign1.departmentId)
  this.changeupdatedepartmentId();
            } else {
              this.$alert(res["message"]);
              console.error("数据查询错误");
            }
          });
}
      changeupdatedepartmentId(){
            if(this.formLabelAlign1.departmentId.length>0){
                let anum = this.formLabelAlign1.departmentId.length - 1;
                doctorApi.getdepartmentlist(this.formLabelAlign1.departmentId[anum]).then(res => {
                console.log(res);
                if (res["retCode"]) {
                    this.formLabelAlign1.departmentName = res.data[0].departmentName;
            console.log('departmentName',this.formLabelAlign1.departmentName)    
            this.updateloading=false;           
                } else {
                    this.$alert(res["message"]);
                    console.error("数据查询错误");
                }
                });
            }
        }
            updatecancel(formName){
        let a:any=this.$refs[formName];
        a.resetFields();
        this.dialogFormVisible1 = false;
        this.updateloading=false;
        this.formLabelAlign1={name: '',phone: '',hospitalId:'',hospitalName: '',hospitalDepartment: '',departmentId:[],departmentName:'',doctorBrief: '',doctorGood: '',consultingFee: '',prescriptionNum:'',orderNum:'',orderMoney:'',doctorPatientNum:'',remark:'',doctorTitle:'',idCard:'',pharmacistCertificateNum:'',qualificationCertificateNum:'',ydkFlag:'',}
        }

        idCardFrontUrl='';
        idCardBackUrl='';
        pharmacistCertificateFrontUrl='';
        qualificationCertificateFrontUrl='';
        pictureUrl='';
        idCardFrontSuccess(res, file) {
            this.idCardFrontUrl = res.data.filename;
        }
        idCardBackSuccess(res, file) {
            this.idCardBackUrl = res.data.filename;    
        }
        pharmacistCertificateFrontSuccess(res, file) {
            this.pharmacistCertificateFrontUrl = res.data.filename;        
        }
        qualificationCertificateFrontSuccess(res, file) {
            this.qualificationCertificateFrontUrl = res.data.filename;        
        }
        pictureSuccess(res, file) {
            this.pictureUrl = res.data.filename;        
        }
        delUrl(del){
            if(del=='idCardFrontUrl'){
                this.idCardFrontUrl=''
            }
            if(del=='idCardBackUrl'){
                this.idCardBackUrl=''
            }
            if(del=='pharmacistCertificateFrontUrl'){
                this.pharmacistCertificateFrontUrl=''
            }
            if(del=='qualificationCertificateFrontUrl'){
                this.qualificationCertificateFrontUrl=''
            }
            if(del=='pictureUrl'){
                this.pictureUrl=''
            }
        }
    province= '';
    city= '';
    country='';
    provincelist=[];
    citylist=[];
    countrylist=[];
    provincechange(){
        this.city='';
        this.country='';
        this.citylist=[];
        this.countrylist=[];
        if(this.province){
                hospitalApi.getcity(this.province).then(res => {
            if (res["retCode"]) {
                this.citylist = res.data.region;
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
        }
    }
    citychange(){
        this.country='';
        this.countrylist=[];
        if(this.city){
                hospitalApi.getcountry(this.city).then(res => {
            if (res["retCode"]) {
                this.countrylist = res.data.region;
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
        }
    }
    countrychange(){
        if(this.country){
                doctorApi.findHospitalByArea(this.country).then(res => {
            if (res["retCode"]) {
                this.hospitallist = res.data;
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
        }
    }

    getprovince(){
        hospitalApi.getprovince().then(res => {
      if (res["retCode"]) {
        this.provincelist = res.data.region;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
    }

    select_hospital(){
        this.hospitalDialog=true;
    }

    keyname='';
    pageSize=10;
    total=0;
    currentPage=0;
    nohospitallist=false
    clearcurrentPage(){
        this.total = 0;
        this.currentPage = 0;
        this.nohospitallist=false
        this.gethospitalList();
    }
    hospitalloading = false;
    gethospitalList(){
        this.hospitalloading = true;
        this.nohospitallist=false
        hospitalApi.queryHospitalList(this.currentPage,this.pageSize, this.keyname,this.province,this.city,this.country).then(res => {
    if (res["retCode"]) {
        this.hospitalloading = false;
        this.hospitallist = res.data.hosipitalList;
        if(res.data.hosipitalList.length==0){
           this.nohospitallist=true 
        }
        this.total = res.data.page.total
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
    }
    onPageChange(page) {
        this.currentPage = page - 1;
        this.gethospitalList();
    }

    clickhospital(item){
        this.selecthospitallist=[{hospitalCode:item.hospitalCode,hospitalName:item.hospitalName}];
        this.formLabelAlign1.hospitalId=item.hospitalCode;
        this.formLabelAlign.hospitalId=item.hospitalCode;
        this.hospitalDialog=false;
    }

    hospitalDialogcancel(){
        this.hospitallist=[];
        this.keyname='';
        this.province= '';
        this.city= '';
        this.country='';
        this.citylist=[];
        this.countrylist=[];
        this.total=0;
        this.currentPage=0;
        this.nohospitallist=false
    }


    formLabelAlign:any={
          name: '',
          phone: '',
          hospitalId:'',
          hospitalName: '',
          hospitalDepartment: '',
          departmentId:[],
          departmentName:'',
          doctorBrief: '',
          doctorGood: '',
          consultingFee: '',
          prescriptionNum:'',
          orderNum:'',
          orderMoney:'',
          doctorPatientNum:'',
          remark:'',
          resource:'',
          adviserPhone:'',
          adviserName:'',
          doctorTitle:'',
          idCard:'',
          pharmacistCertificateNum:'',
          qualificationCertificateNum:'',
                                  sex:'',
                        age:'',
        ydkFlag:'1',
        };

    adddoctor(){
          let a = this.selecthospitallist.filter(item => {return (item.hospitalCode == this.formLabelAlign.hospitalId);});
          if(a.length==0){
            this.$alert('请选择所属医院')
            return
          }
          this.loading = true
          let hospital = [];
          console.log('1111',a)
          hospital['hospitalCode']=a[0].hospitalCode;
          hospital['hospitalName']=a[0].hospitalName;
          let department = [];
          let departmentindex = this.formLabelAlign.departmentId.length - 1
          department['departmentName']=this.formLabelAlign.departmentName;
          department['departmentId']=this.formLabelAlign.departmentId[departmentindex];
          if(this.formLabelAlign.idCard){
              doctorApi.checkidcard(this.formLabelAlign.idCard).then(res => {
                if (res["retCode"]) {
                    console.log(res.data)
                    this.formLabelAlign.sex=res.data.sex
                    this.formLabelAlign.age=res.data.age
                    doctorApi.adddoctor(this.formLabelAlign,hospital,department,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl,this.pictureUrl).then(res => {
                    this.loading=false
                    if (res["retCode"]) {
                        this.formLabelAlign={
                        name: '',
                        phone: '',
                        hospitalName: '',
                        hospitalId:'',
                        hospitalDepartment: '',
                        departmentId:[],
                        departmentName:'',
                        doctorBrief: '',
                        doctorGood: '',
                        consultingFee: '',
                        prescriptionNum:'',
                        orderNum:'',
                        orderMoney:'',
                        doctorPatientNum:'',
                        remark:'',
                        resource:'',
                        adviserPhone:'',
                        adviserName:'',
                        doctorTitle:'',
                                    idCard:'',
                        pharmacistCertificateNum:'',
                        qualificationCertificateNum:'',
                        sex:'',
                        age:'',
                        };
                        this.idCardFrontUrl='';
                        this.idCardBackUrl='';
                        this.pharmacistCertificateFrontUrl='';
                        this.qualificationCertificateFrontUrl='';
                        this.pictureUrl='';
                        this.dialogFormVisible = false;
                        this.$emit('getdoctorList');
                        this.$emit('getdoctorcount');
                                this.$message('添加成功')
                    } else {
                        if(!res['islogin']){this.$alert(res["message"]);}
                        console.error("数据查询错误");
                    }
                    });
                } else {
                    this.loading=false
                    if(!res['islogin']){this.$alert(res["message"]);}
                    console.error("数据查询错误");
                }
                });
          }else{
              doctorApi.adddoctor(this.formLabelAlign,hospital,department,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl,this.pictureUrl).then(res => {
              this.loading=false
            if (res["retCode"]) {
                this.formLabelAlign={
                name: '',
                phone: '',
                hospitalName: '',
                hospitalId:'',
                hospitalDepartment: '',
                departmentId:[],
                departmentName:'',
                doctorBrief: '',
                doctorGood: '',
                consultingFee: '',
                prescriptionNum:'',
                orderNum:'',
                orderMoney:'',
                doctorPatientNum:'',
                remark:'',
                resource:'',
                adviserPhone:'',
                adviserName:'',
                doctorTitle:'',
                            idCard:'',
                pharmacistCertificateNum:'',
                qualificationCertificateNum:'',
                                        sex:'',
                        age:'',
                        ydkFlag:'1',
                };
                this.idCardFrontUrl='';
                this.idCardBackUrl='';
                this.pharmacistCertificateFrontUrl='';
                this.qualificationCertificateFrontUrl='';
                this.pictureUrl='';
                this.dialogFormVisible = false;
                this.$emit('getdoctorList');
                        this.$emit('getdoctorcount');
                        this.$message('添加成功')
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
          }
          
      }

      addcancel(formName){
        let a:any=this.$refs[formName];
        a.resetFields();
        this.dialogFormVisible = false;
        this.formLabelAlign={name: '',phone: '',hospitalId:'',hospitalName: '',hospitalDepartment: '',departmentId:[],departmentName:'',doctorBrief: '',doctorGood: '',consultingFee: '',prescriptionNum:'',orderNum:'',orderMoney:'',doctorPatientNum:'',remark:'',resource:'',adviserPhone:'',adviserName:'',doctorTitle:'',idCard:'',pharmacistCertificateNum:'',qualificationCertificateNum:'',sex:'',age:'',ydkFlag:'1',};
        this.idCardFrontUrl='';
        this.idCardBackUrl='';
        this.pharmacistCertificateFrontUrl='';
        this.qualificationCertificateFrontUrl='';
        this.pictureUrl='';
    }

    changedepartmentId(){
            if(this.formLabelAlign.departmentId.length>0){
                let anum = this.formLabelAlign.departmentId.length - 1;
                doctorApi.getdepartmentlist(this.formLabelAlign.departmentId[anum]).then(res => {
                console.log(res);
                if (res["retCode"]) {
                    this.formLabelAlign.departmentName = res.data[0].departmentName;
                } else {
                    this.$alert(res["message"]);
                    console.error("数据查询错误");
                }
                });
            }
        }

        adddoctorrules(formLabelAlign){
          let a:any = this.$refs.formLabelAlign
      a.validate((valid) => {
      if (valid) {    
        this.adddoctor();
        return true;
      } else {
        console.log('error submit!!');
        return false;
      }
    });
      }

mounted(){
    this.g_news_url=confUrl.g_news_url
    this.getprovince();
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
.hospitalCard {
  width: 460px;
  margin: 0 10px 10px 0;
  border: 1px #e5e5e5 dashed;
  border-radius: 5px;
  padding: 5px 0;
  cursor: pointer;
}
.textLabel {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>