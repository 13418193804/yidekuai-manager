<template>
    <div v-bouncing="loading">
        <div style="border-bottom:1px #e5e5e5 solid;">
        <h3>医院管理</h3>
        <div style="border-bottom: 1px solid #E5E5E5;padding-bottom:20px;">平台医院数量统计：{{hospitalcount}}个</div>
        <div style="margin-top:20px;">
            <el-button type="primary" @click="dialogFormVisible = true">新增医院</el-button>
        </div>
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

        </div>

        <el-table border :data="hospitallist" stripe style="width: 100%">
            <el-table-column prop="hospitalCode" label="医院编码"></el-table-column>
            <el-table-column prop="hospitalName" label="医院名称"></el-table-column>
            <el-table-column prop="YdkDoctorNum" label="医生数量"></el-table-column>
            <el-table-column prop="PrescriptionNum" label="处方数量"></el-table-column>
            <el-table-column prop="OrderNum" label="订单数量"></el-table-column>
            <el-table-column prop="affiliatedHospital" label="院区"></el-table-column>
            <el-table-column prop="hospitalLevel" label="等级"></el-table-column>
            <el-table-column prop="locatedProvince" label="所在省"></el-table-column>
            <el-table-column prop="locatedCity" label="所在市"></el-table-column>
            <el-table-column prop="locatedArea" label="所在区"></el-table-column>
            <el-table-column prop="hospitalAddress" label="医院地址"></el-table-column>
            <el-table-column prop="contactInformation" width="120" label="联系电话"></el-table-column>
            <el-table-column prop="bak" label="备注"></el-table-column>

        <el-table-column label="操作" fixed="right"  width="200">
            <template slot-scope="scope">
                <el-button size="mini" type="text" @click="detailshospital(scope.$index, scope.row)">查看详情</el-button>
                <el-button size="mini" type="text" v-promiss.edit @click="edithospital(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="text" @click="delethospital(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="onPageChange">
			</el-pagination>
		</el-col>

        <el-dialog title="增加医院" :visible.sync="dialogFormVisible" width="60%" @close="addcancel('formLabelAlign')" :close-on-click-modal="false">
        <el-form  label-width="100px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
        <el-form-item label="医院编码" prop="hospitalCode">
            <el-input v-model="formLabelAlign.hospitalCode"></el-input>
        </el-form-item>
        <el-form-item label="医院名称" prop="hospitalName">
            <el-input v-model="formLabelAlign.hospitalName"></el-input>
        </el-form-item>
        <el-form-item label="所属院区">
            <el-input v-model="formLabelAlign.affiliatedHospital"></el-input>
        </el-form-item>
        <el-form-item label="医院类型">
            <el-input v-model="formLabelAlign.hospitalType"></el-input>
        </el-form-item>
        <el-form-item label="医院等级">
            <el-input v-model="formLabelAlign.hospitalLevel"></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
            <el-select v-model="addprovince" placeholder="请选择省" @change="addprovincechange()" clearable @clear="addprovincechange()">
                    <el-option
                    v-for="item in provincelist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                    </el-option>
            </el-select>
            <el-select v-model="addcity" placeholder="请选择市" @change="addcitychange()" clearable @clear="addcitychange()">
                    <el-option
                    v-for="item in addcitylist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
            </el-select>
            <el-select v-model="addcountry"  placeholder="请选择区" clearable>
                    <el-option
                    v-for="item in addcountrylist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="医院地址">
            <el-input v-model="formLabelAlign.hospitalAddress"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
            <el-input v-model="formLabelAlign.contactInformation"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="formLabelAlign.bak"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addcancel('formLabelAlign')">取 消</el-button>
            <el-button type="primary" @click="addhospitalrules('formLabelAlign')" :disabled="loading">确 定</el-button>
        </div>
        </el-dialog>

        <el-dialog title="编辑" :visible.sync="dialogFormVisible1" width="60%" @close="updatecancel('formLabelAlign1')" :close-on-click-modal="false">
        <el-form  label-width="100px" :model="formLabelAlign1" :rules="rules" ref="formLabelAlign1">
        <!-- <el-form-item label="医院编码" prop="hospitalCode">
            <el-input v-model="formLabelAlign1.hospitalCode"></el-input>
        </el-form-item> -->
        <el-form-item label="医院名称" prop="hospitalName">
            <el-input v-model="formLabelAlign1.hospitalName"></el-input>
        </el-form-item>
        <el-form-item label="院区">
            <el-input v-model="formLabelAlign1.affiliatedHospital"></el-input>
        </el-form-item>
        <el-form-item label="等级">
            <el-input v-model="formLabelAlign1.hospitalLevel"></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
            <el-select v-model="editprovince" placeholder="请选择省" @change="editprovincechange()" clearable @clear="editprovincechange()">
                    <el-option
                    v-for="item in provincelist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                    </el-option>
            </el-select>
            <el-select v-model="editcity" placeholder="请选择市" @change="editcitychange()" clearable @clear="editcitychange()">
                    <el-option
                    v-for="item in editcitylist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
            </el-select>
            <el-select v-model="editcountry" placeholder="请选择区" clearable>
                    <el-option
                    v-for="item in editcountrylist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="医院地址">
            <el-input v-model="formLabelAlign1.hospitalAddress"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input v-model="formLabelAlign1.contactInformation"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="formLabelAlign1.bak"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="updatecancel('formLabelAlign1')">取 消</el-button>
            <el-button type="primary" @click="updatehospitalrules('formLabelAlign')" :disabled="loading">确 定</el-button>
        </div>
        </el-dialog>
        

        <el-dialog width= "70vw" :close-on-click-modal="false" :visible.sync="detailsshow">
 <div style=" border: 1px #e5e5e5 solid;">
<h3 style="text-align:center">医院详情</h3>
	 <el-form label-width="100px" :inline="true" >

<el-row :gutter="24"  >
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item  label="医院名称：">
                 {{formLabeldetails.hospitalName}}
				</el-form-item>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="医生数量：">
                 {{formLabeldetails.YdkDoctorNum}}
				</el-form-item>
  </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="处方数量：">
                 {{formLabeldetails.PrescriptionNum}}
				</el-form-item>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="订单数量：">
                 {{formLabeldetails.OrderNum}}
				</el-form-item>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="所在省：">
                 {{formLabeldetails.locatedProvince}}
				</el-form-item>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="所在市：">
                 {{formLabeldetails.locatedCity}}
				</el-form-item>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="所在区：">
                 {{formLabeldetails.locatedArea}}
				</el-form-item>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="医院地址：">
                 {{formLabeldetails.hospitalAddress}}
				</el-form-item>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="院区：">
                 {{formLabeldetails.affiliatedHospital}}
				</el-form-item>
  </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="等级：">
                 {{formLabeldetails.hospitalLevel}}
				</el-form-item>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="联系电话：">
                 {{formLabeldetails.contactInformation}}
				</el-form-item>
  </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
     <el-form-item  label="备注：">
                 {{formLabeldetails.bak}}
				</el-form-item>
  </el-col>
</el-row>

</el-form>
    </div>

</el-dialog>



    </div>
    
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as hospitalApi from "../../api/hospitalApi";

@Component({
  props: {},
  components: {
    // categoryView,
  }
})
export default class hospital extends Vue {
    loading=false
keyname = '';
dialogFormVisible=false;
dialogFormVisible1=false;
detailsshow=false;
hospitallist=[];

formLabelAlign={
    hospitalCode:'',
          hospitalName: '',
          affiliatedHospital: '',
          hospitalType: '',
          hospitalLevel: '',
          locatedCity: '',
          hospitalAddress: '',
          contactInformation: '',
          bak:'',
          hospitalId:'',
          locatedProvince:'',
          locatedArea:'',
        };
        rules={
          hospitalCode: [
            { required: true, message: '请填写医院编码', trigger: 'blur' }
          ],
          hospitalName: [
            { required: true, message: '请填写医院名称', trigger: 'blur' }
          ]
        }
formLabelAlign1:any ={
        hospitalName: '',
          hospitalAddress: '',
          hospitalCode: '',
          bak: '',
          affiliatedHospital: '',
          hospitalType: '',
          hospitalLevel: '',
          locatedCity: '',
          contactInformation: '',
          hospitalId:'',
          locatedProvince:'',
          locatedArea:'',
}
formLabeldetails={};
        handleEdit(index, row) {
            this.dialogFormVisible1=true;
            this.formLabelAlign1=row.data;
        }

    pageSize = 10;
    total = 0;
    currentPage = 0;
    onPageChange(page) {
        this.currentPage = page - 1;
        this.gethospitalList();
    }
    clearcurrentPage(){
        this.total = 0;
        this.currentPage = 0;
        this.gethospitalList();
    }
    gethospitalList(){
        this.loading = true
        hospitalApi.queryHospitalList(this.currentPage,this.pageSize, this.keyname,this.province,this.city,this.country,).then(res => {
        this.loading = false
    if (res["retCode"]) {
        this.hospitallist = res.data.hosipitalList;
        this.total = res.data.page.total
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
    }
    addcancel(formName){
        let a:any=this.$refs[formName];
        a.resetFields();
        this.dialogFormVisible = false;
        this.formLabelAlign={hospitalCode:'',hospitalName: '',affiliatedHospital: '',hospitalType: '',hospitalLevel: '',locatedCity: '',hospitalAddress: '',contactInformation: '',bak:'',hospitalId:'',locatedProvince:'',locatedArea:'',};
    }
    addhospitalrules(formLabelAlign){
        let a:any = this.$refs.formLabelAlign
      a.validate((valid) => {
      if (valid) {    
        this.addhospital();
        return true;
      } else {
        console.log('error submit!!');
        return false;
      }
    });
    }
    addhospital(){
        this.loading = true
        let a = this.provincelist.filter(item => {return (item.id == this.addprovince);});
        let b = this.addcitylist.filter(item => {return (item.id == this.addcity);});
        let c = this.addcountrylist.filter(item => {return (item.id == this.addcountry);});
        let address = []
        address['provinceid']=this.addprovince;
        address['cityid']=this.addcity;
        address['countryid']=this.addcountry;
        if(a.length>0){
            address['provincename']=a[0].name;
        }
        if(b.length>0){
            address['cityname']=b[0].name;
        }
        if(c.length>0){
            address['countryname']=c[0].name;
        }
        hospitalApi.addHospital(this.formLabelAlign,address).then(res => {
            this.loading=false
      if (res["retCode"]) {
        this.dialogFormVisible = false;
        this.formLabelAlign={hospitalCode:'',hospitalName: '',affiliatedHospital: '',hospitalType: '',hospitalLevel: '',locatedCity: '',hospitalAddress: '',contactInformation: '',bak:'',hospitalId:'',locatedProvince:'',locatedArea:'',};
        this.addprovince = '';
        this.addcity= '';
        this.addcountry='';
        this.addcitylist=[];
        this.addcountrylist=[];
        this.gethospitalList();
        this.getHospitalCount();
        this.$message('添加成功');
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
    }

    delethospital(index,row){
    this.$confirm('是否删除该医院?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal:false
        }).then(() => {
                hospitalApi.delethospital(row.hospitalId).then(res => {
            if (res["retCode"]) {
                this.gethospitalList();
                this.getHospitalCount();
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }

    edithospital(index,row){
        this.dialogFormVisible1=true;
        let form = {}
        Object.assign(form,row);
        this.formLabelAlign1 = form
        this.editprovince=row.provinceId;
        this.editprovincechange();
        this.editcity=row.cityId;
        this.editcitychange();
        this.editcountry=row.areaId;
    }
    updatecancel(formName){
        let a:any=this.$refs[formName];
        a.resetFields();
        this.dialogFormVisible1 = false;
        this.formLabelAlign1={hospitalName: '',hospitalAddress: '',hospitalCode: '',bak: '',affiliatedHospital: '',hospitalType: '',hospitalLevel: '',locatedCity: '',contactInformation: '',hospitalId:'',locatedProvince:'',locatedArea:'',}
    }
    updatehospitalrules(formLabelAlign1){
        let a:any = this.$refs.formLabelAlign1
      a.validate((valid) => {
      if (valid) {    
        this.updatehospital();
        return true;
      } else {
        console.log('error submit!!');
        return false;
      }
    });
    }
    updatehospital(){
        this.loading = true
        let a = this.provincelist.filter(item => {return (item.id == this.editprovince);});
        let b = this.editcitylist.filter(item => {return (item.id == this.editcity);});
        let c = this.editcountrylist.filter(item => {return (item.id == this.editcountry);});
        let address = []
        address['provinceid']=this.editprovince;
        address['cityid']=this.editcity;
        address['countryid']=this.editcountry;
        if(a.length>0){
            address['provincename']=a[0].name;
        }
        if(b.length>0){
            address['cityname']=b[0].name;
        }
        if(c.length>0){
            address['countryname']=c[0].name;
        }
        hospitalApi.updatehospital(this.formLabelAlign1,address).then(res => {
            this.loading=false
      if (res["retCode"]) {
          this.dialogFormVisible1=false;
          this.formLabelAlign1={hospitalName: '',hospitalAddress: '',hospitalCode: '',bak: '',affiliatedHospital: '',hospitalType: '',hospitalLevel: '',locatedCity: '',contactInformation: '',hospitalId:'',locatedProvince:'',locatedArea:'',}
        this.gethospitalList();
        this.$message('保存成功');
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
    }

    detailshospital(index,row){
        this.detailsshow=true;
        this.formLabeldetails=row
    }
    province= '';
    city= '';
    country='';
    addprovince= '';
    addcity= '';
    addcountry='';
    editprovince= '';
    editcity= '';
    editcountry='';
    provincelist=[];
    citylist=[];
    countrylist=[];
    addcitylist=[];
    addcountrylist=[];
    editcitylist=[];
    editcountrylist=[];
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
    addprovincechange(){
        this.addcity='';
        this.addcountry='';
        this.addcitylist=[];
        this.addcountrylist=[];
        if(this.addprovince){
                hospitalApi.getcity(this.addprovince).then(res => {
            if (res["retCode"]) {
                this.addcitylist = res.data.region;
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
        }
    }
    editprovincechange(){
        this.editcity='';
        this.editcountry='';
        this.editcitylist=[];
        this.editcountrylist=[];
        if(this.editprovince){
                hospitalApi.getcity(this.editprovince).then(res => {
            if (res["retCode"]) {
                this.editcitylist = res.data.region;
            } else {
                this.$alert(res["message"]);
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
    addcitychange(){
        this.addcountry='';
        this.addcountrylist=[];
        if(this.addcity){
                hospitalApi.getcountry(this.addcity).then(res => {
            if (res["retCode"]) {
                this.addcountrylist = res.data.region;
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
        }
    }
    editcitychange(){
        this.editcountry='';
        this.editcountrylist=[];
        if(this.editcity){
                hospitalApi.getcountry(this.editcity).then(res => {
            if (res["retCode"]) {
                this.editcountrylist = res.data.region;
            } else {
                this.$alert(res["message"]);
                console.error("数据查询错误");
            }
            });
        }
    }
    hospitalcount=0;
    getHospitalCount(){
        hospitalApi.findHospitalCount().then(res => {
            if (res["retCode"]) {
                this.hospitalcount = res.data.total;
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
    }

mounted(){
  this.gethospitalList();
  this.getHospitalCount();
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
</style>