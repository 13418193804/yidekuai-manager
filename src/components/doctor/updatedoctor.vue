<template>
    <div v-loading="loading">
     
        <el-dialog title="医生编辑" :visible.sync="dialogFormVisible1" @close="updatecancel('formLabelAlign1')" :close-on-click-modal="false">
        <el-form  label-width="140px" :model="formLabelAlign1" :rules="rules" ref="formLabelAlign1">
        <el-form-item label="医生姓名" prop="name">
            <el-input v-model="formLabelAlign1.name"></el-input>
        </el-form-item>
        <el-form-item label="所属医院" prop="hospitalId">
            <el-select v-model="formLabelAlign1.hospitalId" placeholder="请选择医院" clearable>
                    <el-option
                    v-for="item in hospitallist"
                    :key="item.hospitalCode"
                    :label="item.hospitalName"
                    :value="item.hospitalCode"
                    >
                    </el-option>
            </el-select>
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
        <el-form-item label="医生擅长">
            <el-input type="textarea" autosize v-model="formLabelAlign1.doctorGood"></el-input>
        </el-form-item>
        <el-form-item label="医生简介" prop="doctorBrief">
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
        </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="updatecancel('formLabelAlign1')">取 消</el-button>
            <el-button type="primary" @click="updatedoctorrules('formLabelAlign1')" :disabled="loading">确 定</el-button>
        </div>
        </el-dialog>


     

    </div>
    
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as doctorApi from "../../api/doctorApi";
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
    // doctorGood:[
    //     { required: true, message: '请填写主治', trigger: 'blur' }
    // ],
    doctorBrief:[
        { required: true, message: '请填写简介', trigger: 'blur' }
    ],
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

dialogFormVisible1=false;
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

updatedoctorrules(formLabelAlign1){
    let a:any = this.$refs.formLabelAlign1
      a.validate((valid) => {
      if (valid) {    
          if(this.update=='update'){
              console.log(111111)
              this.updatedoctor();
          }
        if(this.update=='notPassUpdate'){
            console.log(222222)
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
console.log(this.hospitallist)
console.log(this.formLabelAlign1.hspCode)
          let a = this.hospitallist.filter(item => {return (item.hospitalCode == this.formLabelAlign1.hspCode);});
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
                    doctorApi.updatedoctor(this.formLabelAlign1,hospital,department,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl).then(res => {
                        this.loading=false
                    if (res["retCode"]) {
                        this.dialogFormVisible1 = false;
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
              doctorApi.updatedoctor(this.formLabelAlign1,hospital,department,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl).then(res => {
                    this.loading=false
                if (res["retCode"]) {
                    this.dialogFormVisible1 = false;
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
    console.log(this.hospitallist)
    console.log(this.formLabelAlign1.hspCode)
          let a = this.hospitallist.filter(item => {return (item.hospitalCode == this.formLabelAlign1.hspCode);});
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
                    doctorApi.notPassupdatedoctor(this.formLabelAlign1,hospital,department,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl).then(res => {
                            this.loading=false
                        if (res["retCode"]) {
                            this.dialogFormVisible1 = false;
                            // this.getDoctorExamineList();
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
              doctorApi.notPassupdatedoctor(this.formLabelAlign1,hospital,department,this.idCardFrontUrl,this.idCardBackUrl,this.pharmacistCertificateFrontUrl,this.qualificationCertificateFrontUrl).then(res => {
                this.loading=false
            if (res["retCode"]) {
                this.dialogFormVisible1 = false;
                // this.getDoctorExamineList();
                this.$emit('getDoctorExamineList')
                this.$message('修改成功')
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
          }
            
        }
        handleEdit(index, row,state) {
            this.update=state;
            this.dialogFormVisible1=true;
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
        this.formLabelAlign1={name: '',phone: '',hospitalId:'',hospitalName: '',hospitalDepartment: '',departmentId:[],departmentName:'',doctorBrief: '',doctorGood: '',consultingFee: '',prescriptionNum:'',orderNum:'',orderMoney:'',doctorPatientNum:'',remark:'',doctorTitle:'',idCard:'',pharmacistCertificateNum:'',qualificationCertificateNum:'',}
        }

        idCardFrontUrl='';
        idCardBackUrl='';
        pharmacistCertificateFrontUrl='';
        qualificationCertificateFrontUrl='';
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



mounted(){
    this.g_news_url=confUrl.g_news_url
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
</style>