<template>
    <div v-bouncing="loading">
        <!-- <div> -->
        <div style="border-bottom:1px #e5e5e5 solid;">
        <h3>医生管理</h3>
        <div style="padding-bottom:20px;">平台医生数量统计：{{doctotcount}}个</div>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <!-- 医生申请列表 -->
            <el-tab-pane :label="'申请列表（'+examinedoctorcount+'）'" name="first">
                <el-table border
                    :data="doctorExamineList"
                    stripe 
                    style="width: 100%;min-height:500px">
                <el-table-column prop="name" label="医生姓名" fixed></el-table-column>
                            <el-table-column prop="hospitalName" label="所属医院" width="120"></el-table-column>
                            <el-table-column prop="phone" label="账号" width="120"></el-table-column>
                            <el-table-column prop="doctorStatus" label="状态">
                                <template slot-scope="scope">
                                    <el-tag v-if="scope.row.doctorStatus=='UNANDITED'" type="success">待审核</el-tag>
                                    <el-tag v-if="scope.row.doctorStatus=='AUDIT_NOT_PASS'" type="text">未通过</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="resourceAdviserName" label="来源顾问"></el-table-column>
                            <el-table-column prop="resourceAdviserPhone" label="顾问手机"></el-table-column>
                            <el-table-column prop="hospitalDepartment" label="所在科室"></el-table-column>
                            <el-table-column prop="hspCode" label="医院机构代码" width="150"></el-table-column>
                            <el-table-column prop="doctorGood" label="医生擅长" width="120" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="doctorBrief" label="医生简介" width="120" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="consultingFee" label="咨询价格"></el-table-column>
                            <el-table-column prop="doctorTitle" label="职称">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.doctorTitle=='ASSISTANT_PHYSICIAN'">住院医师</span>
                                    <span v-if="scope.row.doctorTitle=='ATTENDING_DOCTOR'">主治医师</span>
                                    <span v-if="scope.row.doctorTitle=='DEPUTY_CHIEF_PHYSICIAN'">副主任医师</span>
                                    <span v-if="scope.row.doctorTitle=='CHIEF_PHYSICIAN'">主任医师</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark" label="备注"></el-table-column>
                            <el-table-column prop="age" label="年龄"></el-table-column>
                            <el-table-column prop="dsex" label="性别"></el-table-column>                            
                            <el-table-column prop="createrTime" label="医生注册时间" width="150"></el-table-column>
                        <el-table-column label="操作" fixed="right"  width="300">
                            <template slot-scope="scope">
                                <el-button type="text" @click="detailsdoctor(scope.$index, scope.row)">查看详情</el-button>                                
                                <el-button type="text" v-if="scope.row.doctorStatus=='UNANDITED'" @click="handlepassDoctor(scope.$index, scope.row)">通过</el-button>
                                <el-button type="text" v-if="scope.row.doctorStatus=='UNANDITED'"  @click="handlenotPassDoctor(scope.$index, scope.row)">不通过</el-button>
                                <el-button type="text" v-if="scope.row.doctorStatus=='AUDIT_NOT_PASS'" @click="handleEdit(scope.$index, scope.row,'notPassUpdate')">修改</el-button>
                                <el-button type="text" v-if="scope.row.doctorStatus=='AUDIT_NOT_PASS'"  @click="handlepassDoctor(scope.$index, scope.row)">再通过</el-button>
                                <el-button type="text"  @click="deleteDoctor(scope.$index, scope.row)">删除</el-button>
                            </template>
                            </el-table-column>
                </el-table>
                    <el-col :span="24" class="toolbar">
                            <el-pagination  :current-page="examinecurrentPage+1" layout="prev, pager, next" :page-size="examinepageSize" :total="examinepagetotal" @current-change="onexaminePageChange">
                            </el-pagination>
                        </el-col>
            </el-tab-pane>
            <el-tab-pane :label="'医生列表（'+doctotcount+'）'" name="second">
                <div class="flex flex-pack-justify" style="margin-top:20px;">
                    <el-button type="primary" @click="dialogFormVisible = true">新增医生</el-button>
        
                </div>
                <div style="padding-bottom:20px;">
                    <el-row :gutter="10">
                    <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
                    <el-input placeholder="请输入医院/科室/姓名/手机号码" style="margin-top:20px;" v-model="keyname" clearable></el-input>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
                    <el-select v-model="state" placeholder="状态查询" style="margin-top:20px;" clearable>
                            <el-option
                            v-for="item in statelist"
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
                <el-table border :data="doctorlist" stripe style="width: 100%">
            <el-table-column prop="name" label="医生姓名" fixed></el-table-column>
            <el-table-column prop="hospitalName" label="所属医院" width="120"></el-table-column>
            <el-table-column prop="phone" label="账号" width="120"></el-table-column>
            <el-table-column prop="hospitalDepartment" label="所在科室"></el-table-column>
            <el-table-column prop="doctorGood" label="医生擅长" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="doctorBrief" label="医生简介" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="consultingFee" label="咨询价格"></el-table-column>
            <el-table-column prop="prescriptionNum" label="医生处方数量"></el-table-column>
            <el-table-column prop="orderNum" label="医生订单数量"></el-table-column>
            <el-table-column prop="orderMoney" label="医生订单金额"></el-table-column>
            <el-table-column prop="doctorPatientNum" label="医生患者数量"></el-table-column>
            <el-table-column prop="createrTime" label="医生注册时间" width="150"></el-table-column>
            <el-table-column prop="passTime" label="通过时间" width="150"></el-table-column>
            <el-table-column prop="hspCode" label="医院机构代码" width="150"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="dsex" label="性别"></el-table-column>
            <el-table-column prop="doctorTitle" label="职称">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.doctorTitle=='ASSISTANT_PHYSICIAN'">住院医师</span>
                                    <span v-if="scope.row.doctorTitle=='ATTENDING_DOCTOR'">主治医师</span>
                                    <span v-if="scope.row.doctorTitle=='DEPUTY_CHIEF_PHYSICIAN'">副主任医师</span>
                                    <span v-if="scope.row.doctorTitle=='CHIEF_PHYSICIAN'">主任医师</span>
                                </template>
            </el-table-column>
            <el-table-column prop="resourceAdviserName" label="来源顾问"></el-table-column>
            <el-table-column prop="resourceAdviserPhone" label="顾问手机"></el-table-column>
            <el-table-column prop="resource" label="来源">
                <template slot-scope="scope">
                    <span v-if="scope.row.resource=='H5'">医生注册</span>
                    <span v-if="scope.row.resource=='yjkexport'">平台录入</span>
                    <span v-if="scope.row.resource=='other'">平台录入</span>
                </template>
            </el-table-column>
            <el-table-column prop="doctorStatus" label="使用状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.doctorStatus=='DINI'" type="primary">测试</el-tag>
                    <el-tag v-if="scope.row.doctorStatus=='USE'" type="success">可用</el-tag>
                    <el-tag v-if="scope.row.doctorStatus=='STOP'" type="text">停用</el-tag>
                </template>
            </el-table-column>

                <el-table-column label="操作" fixed="right"  width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handlegenerate(scope.$index, scope.row)">二维码</el-button>
                        <el-button size="mini" type="text" @click="doctordetails(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="text" @click="lookpatient(scope.$index, scope.row)">查看患者</el-button>
                        <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row,'update')">编辑</el-button>
                        <el-button size="mini" type="text" @click="doSubmitStatus(scope.$index, scope.row)">{{scope.row.doctorStatus =='USE' ?'停用':''}}{{scope.row.doctorStatus =='STOP' ?'启用':''}}</el-button>
                    </template>
                    </el-table-column>
                </el-table>

                <el-col :span="24" class="toolbar">
                    <el-pagination :current-page="page+1" layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="onPageChange">
                    </el-pagination>
                </el-col>
            </el-tab-pane>
            
        </el-tabs>
        
        

        </div>

        

        

        <el-dialog title="增加医生" :visible.sync="dialogFormVisible" @close="addcancel('formLabelAlign')" :close-on-click-modal="false">
        <el-form  label-width="140px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
        <el-form-item label="登录帐号" prop="phone">
            <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="医生姓名" prop="name">
            <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="所属医院" prop="hospitalId">
            <el-select v-model="formLabelAlign.hospitalId" placeholder="请选择医院" clearable>
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
        <el-form-item label="医生擅长">
            <el-input type="textarea" autosize v-model="formLabelAlign.doctorGood"></el-input>
        </el-form-item>
        <el-form-item label="医生简介" prop="doctorBrief">
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
        
        <el-dialog title="医生二维码" :visible.sync="dialogFormVisible5" :close-on-click-modal="false">
        <div style="display:flex;justify-content: center;flex-direction: column;align-items: center;">
            <!-- <div><img src="../../assets/qrcode.jpg" style="width:200px;height:200px;"></div> -->
            <div><img :src="formLabelAlign5.qrcode" style="width:200px;height:200px;"></div>
            <div>{{formLabelAlign5.hospitalName}}:{{formLabelAlign5.name}}</div>
        </div>

        </el-dialog>

        <el-dialog title="医生编辑" :visible.sync="dialogFormVisible1" @close="updatecancel('formLabelAlign1')" :close-on-click-modal="false">
        <el-form  label-width="120px" :model="formLabelAlign1" :rules="rules" ref="formLabelAlign1">
        <el-form-item label="医生姓名" prop="name">
            <el-input v-model="formLabelAlign1.name"></el-input>
        </el-form-item>
        <el-form-item label="所属医院" prop="hospitalId">
            <el-select v-model="formLabelAlign1.hospitalId" placeholder="请选择医院" clearable>
                    <el-option
                    v-for="item in hospitallist"
                    :key="item.hospitalId"
                    :label="item.hospitalName"
                    :value="item.hospitalId"
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
        <el-form-item label="医生主治" prop="doctorGood">
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
        <!-- <el-form-item label="状态">
            <el-input v-model="formLabelAlign1.h"></el-input>
        </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="updatecancel('formLabelAlign1')">取 消</el-button>
            <el-button type="primary" @click="updatedoctorrules('formLabelAlign1')" :disabled="loading">确 定</el-button>
        </div>
        </el-dialog>


        <el-dialog :visible.sync="relationshipshow" width="1050px" center size="tiny"  :title="relationshipdoctor" :close-on-click-modal="false" top="40px">
  	
<el-table border
    :data="relationshiplist"
    stripe 
    style="width: 100%;min-height:500px">

  <el-table-column
      prop="name"
      label="患者姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="患者电话"
      width="150">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="患者性别"
      width="90">
    </el-table-column>
    <el-table-column
      prop="age"
      label="患者年龄"
      width="90">
    </el-table-column>
    <el-table-column
      prop="idCard"
      label="患者身份证">
    </el-table-column>

   <el-table-column label="操作" fixed="right"  width="240">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          @click="changePreModel(scope.$index, scope.row)">查看处方</el-button>
          <el-button
          size="mini"
          type="text"
          @click="changeOrderModel(scope.$index, scope.row)">查看订单</el-button>

         </template>
    </el-table-column>
</el-table>
	<el-col :span="24" class="toolbar">
			<el-pagination :current-page="relationshippage+1" layout="prev, pager, next" :page-size="relationshippageSize" :total="relationshiptotal" @current-change="onrelationshipPageChange">
			</el-pagination>
		</el-col>
      </el-dialog>

        <!-- 未审核医生详情 -->
      <el-dialog width= "60%" :close-on-click-modal="false" :visible.sync="detailsshow">
            <div style=" border: 1px #e5e5e5 solid;">
            <div class="min_title">医生详情</div>
                <div style="display:flex;margin:15px;">
                    <div style="min-width:220px;text-align:center;height: 100%;overflow: hidden;min-height: 385px;position: relative;border: 1px dashed rgb(204, 171, 171);border-radius: 11px;">
                        <i class="iconfont icon-yisheng" style="font-size: 36px;position: absolute;top: 6px;left: 0;"></i>
                        <img v-if="formLabeldetails.picture" :src="formLabeldetails.picture" style="height:110px;width: 110px;margin: 5px 10px;">
                        <img v-else  src="../../assets/876218396590085506.png" style="height:110px;width: 110px;margin: 5px 10px;">
                        <div>{{formLabeldetails.name}}</div>
                        <div>{{formLabeldetails.phone}}</div>
                        <div style="text-align:left;">医院：<span style=" color: #8492a6; font-size: 13px">{{formLabeldetails.hospitalName}}</span></div>
                        <div style="text-align:left;">科室：<span style=" color: #8492a6; font-size: 13px">{{formLabeldetails.hospitalDepartment}}</span></div>
                        <div v-if="formLabeldetails.doctorTitle=='ASSISTANT_PHYSICIAN'" style="text-align:left;">职称：<span style=" color: #8492a6; font-size: 13px">住院医师</span></div>
                        <div v-if="formLabeldetails.doctorTitle=='ATTENDING_DOCTOR'" style="text-align:left;">职称：<span style=" color: #8492a6; font-size: 13px">主治医师</span></div>
                        <div v-if="formLabeldetails.doctorTitle=='DEPUTY_CHIEF_PHYSICIAN'" style="text-align:left;">职称：<span style=" color: #8492a6; font-size: 13px">副主任医师</span></div>
                        <div v-if="formLabeldetails.doctorTitle=='CHIEF_PHYSICIAN'" style="text-align:left;">职称：<span style=" color: #8492a6; font-size: 13px">主任医师</span></div>
                        <div style="text-align:left;">咨询价格：<span style=" color: #8492a6; font-size: 13px">{{formLabeldetails.consultingFee?formLabeldetails.consultingFee:'0'}}元</span></div>
                        <div v-if="formLabeldetails.age" style="text-align:left;">年龄：<span style=" color: #8492a6; font-size: 13px">{{formLabeldetails.age}}</span></div>
                        <div v-if="formLabeldetails.dsex" style="text-align:left;">性别：<span style=" color: #8492a6; font-size: 13px">{{formLabeldetails.dsex}}</span></div>
                    </div>

                    <div style="width:100%;height: 100%;overflow: hidden;min-height: 385px;margin-left:15px;position: relative;border: 1px dashed rgb(204, 171, 171);border-radius: 11px;">
                        <div v-if="formLabeldetails.doctorGood" style="display: flex;flex-direction: column;">
                            <div style="padding:10 0px;min-width:60px;background-color:#409eff;color:#fff;text-align: center;">擅长：</div>
                            <div style="text-indent:2em;">{{formLabeldetails.doctorGood}}</div>
                        </div>
                        <div v-if="formLabeldetails.doctorBrief" style="display: flex;flex-direction: column;">
                            <div style="padding:10 0px;min-width:60px;background-color:#409eff;color:#fff;text-align: center;">简介：</div>
                            <div style="text-indent:2em;">{{formLabeldetails.doctorBrief}}</div>
                        </div>
                        <div v-if="formLabeldetails.remark" style="display: flex;flex-direction: column;">
                            <div style="padding:10 0px;min-width:60px;background-color:#409eff;color:#fff;text-align: center;">备注：</div>
                            <div style="text-indent:2em;">{{formLabeldetails.remark}}</div>
                        </div>
                    </div>
                </div>

                <div class="min_title">来源顾问</div>
                <div v-if="formLabeldetails.resourceAdviserName" style="padding-left:30px;">
                    <div style="padding:5px 0;">来源顾问：{{formLabeldetails.resourceAdviserName}}</div>
                    <div style="padding:5px 0;">顾问手机：{{formLabeldetails.resourceAdviserPhone}}</div>
                </div>

                <div class="min_title" v-if="formLabeldetails.idCard||formLabeldetails.idCardFront||formLabeldetails.idCardBack||formLabeldetails.pharmacistCertificateNum||formLabeldetails.pharmacistCertificateFront||formLabeldetails.qualificationCertificateNum||formLabeldetails.qualificationCertificateFront">证件信息</div>
                <div v-if="formLabeldetails.idCard||formLabeldetails.idCardFront||formLabeldetails.idCardBack" style="padding:0 30px;display: flex;justify-content: space-between;">
                    <div v-if="formLabeldetails.idCard" style="padding:5px 0;">身份证号：{{formLabeldetails.idCard}}</div>
                    <img v-if="formLabeldetails.idCardFront" :src="formLabeldetails.idCardFront" style="height:110px;width: 110px;margin: 5px 10px;">
                    <img v-if="formLabeldetails.idCardBack" :src="formLabeldetails.idCardBack" style="height:110px;width: 110px;margin: 5px 10px;">
                </div>
                <div v-if="formLabeldetails.pharmacistCertificateNum||formLabeldetails.pharmacistCertificateFront" style="padding:0 30px;display: flex;justify-content: space-between;">
                    <div v-if="formLabeldetails.pharmacistCertificateNum" style="padding:5px 0;">资格证号：{{formLabeldetails.pharmacistCertificateNum}}</div>
                    <img v-if="formLabeldetails.pharmacistCertificateFront" :src="formLabeldetails.pharmacistCertificateFront" style="height:110px;width: 110px;margin: 5px 10px;">
                </div>
                <div v-if="formLabeldetails.qualificationCertificateNum||formLabeldetails.qualificationCertificateFront" style="padding:0 30px;display: flex;justify-content: space-between;">
                    <div v-if="formLabeldetails.qualificationCertificateNum" style="padding:5px 0;">执业证号：{{formLabeldetails.qualificationCertificateNum}}</div>
                    <img v-if="formLabeldetails.qualificationCertificateFront" :src="formLabeldetails.qualificationCertificateFront" style="height:110px;width: 110px;margin: 5px 10px;">
                </div>

            </div>

            </el-dialog>

            <!-- 医生详情 -->
      <el-dialog width= "60%" :close-on-click-modal="false" :visible.sync="detailsshow1">
            <div style=" border: 1px #e5e5e5 solid;">
            <div class="min_title">医生详情</div>
                <div style="display:flex;margin:15px;">
                    <div style="min-width:220px;text-align:center;height: 100%;overflow: hidden;min-height: 385px;position: relative;border: 1px dashed rgb(204, 171, 171);border-radius: 11px;">
                        <i class="iconfont icon-yisheng" style="font-size: 36px;position: absolute;top: 6px;left: 0;"></i>
                        <img v-if="formLabeldetails1.picture" :src="formLabeldetails1.picture" style="height:110px;width: 110px;margin: 5px 10px;">
                        <img v-else  src="../../assets/876218396590085506.png" style="height:110px;width: 110px;margin: 5px 10px;">
                        <div>{{formLabeldetails1.name}}</div>
                        <div>{{formLabeldetails1.phone}}</div>
                        <div style="text-align:left;">医院：<span style=" color: #8492a6; font-size: 13px">{{formLabeldetails1.hospitalName}}</span></div>
                        <div style="text-align:left;">科室：<span style=" color: #8492a6; font-size: 13px">{{formLabeldetails1.hospitalDepartment}}</span></div>
                        <div v-if="formLabeldetails1.doctorTitle=='ASSISTANT_PHYSICIAN'" style="text-align:left;">职称：<span style=" color: #8492a6; font-size: 13px">住院医师</span></div>
                        <div v-if="formLabeldetails1.doctorTitle=='ATTENDING_DOCTOR'" style="text-align:left;">职称：<span style=" color: #8492a6; font-size: 13px">主治医师</span></div>
                        <div v-if="formLabeldetails1.doctorTitle=='DEPUTY_CHIEF_PHYSICIAN'" style="text-align:left;">职称：<span style=" color: #8492a6; font-size: 13px">副主任医师</span></div>
                        <div v-if="formLabeldetails1.doctorTitle=='CHIEF_PHYSICIAN'" style="text-align:left;">职称：<span style=" color: #8492a6; font-size: 13px">主任医师</span></div>
                        <div v-if="formLabeldetails1.resource=='H5'" style="text-align:left;">来源：<span style=" color: #8492a6; font-size: 13px">医生注册</span></div>
                        <div v-if="formLabeldetails1.resource=='yjkexport'" style="text-align:left;">来源：<span style=" color: #8492a6; font-size: 13px">平台录入</span></div>
                        <div v-if="formLabeldetails1.resource=='other'" style="text-align:left;">来源：<span style=" color: #8492a6; font-size: 13px">平台录入</span></div>
                        <div style="text-align:left;">咨询价格：<span style=" color: #8492a6; font-size: 13px">{{formLabeldetails1.consultingFee?formLabeldetails1.consultingFee:'0'}}元</span></div>
                        <div v-if="formLabeldetails1.age" style="text-align:left;">年龄：<span style=" color: #8492a6; font-size: 13px">{{formLabeldetails1.age}}</span></div>
                        <div v-if="formLabeldetails1.dsex" style="text-align:left;">性别：<span style=" color: #8492a6; font-size: 13px">{{formLabeldetails1.dsex}}</span></div>
                    </div>

                    <div style="width:100%;height: 100%;overflow: hidden;min-height: 385px;margin-left:15px;position: relative;border: 1px dashed rgb(204, 171, 171);border-radius: 11px;">
                        <div v-if="formLabeldetails1.doctorGood" style="display: flex;flex-direction: column;">
                            <div style="padding:10 0px;min-width:60px;background-color:#409eff;color:#fff;text-align: center;">擅长：</div>
                            <div style="text-indent:2em;">{{formLabeldetails1.doctorGood}}</div>
                        </div>
                        <div v-if="formLabeldetails1.doctorBrief" style="display: flex;flex-direction: column;">
                            <div style="padding:10 0px;min-width:60px;background-color:#409eff;color:#fff;text-align: center;">简介：</div>
                            <div style="text-indent:2em;">{{formLabeldetails1.doctorBrief}}</div>
                        </div>
                        <div v-if="formLabeldetails1.remark" style="display: flex;flex-direction: column;">
                            <div style="padding:10 0px;min-width:60px;background-color:#409eff;color:#fff;text-align: center;">备注：</div>
                            <div style="text-indent:2em;">{{formLabeldetails1.remark}}</div>
                        </div>
                    </div>
                </div>

                <div class="min_title">数量统计</div>
                <div style="padding-left:30px;">
                    <div style="padding:5px 0;">医生处方数量：{{formLabeldetails1.prescriptionNum}}</div>
                    <div style="padding:5px 0;">医生订单数量：{{formLabeldetails1.orderNum}}</div>
                    <div style="padding:5px 0;">医生订单金额：{{formLabeldetails1.orderMoney}}</div>
                    <div style="padding:5px 0;">医生患者数量：{{formLabeldetails1.doctorPatientNum}}</div>
                </div>

                <div class="min_title">来源顾问</div>
                <div v-if="formLabeldetails1.resourceAdviserName" style="padding-left:30px;">
                    <div style="padding:5px 0;">来源顾问：{{formLabeldetails1.resourceAdviserName}}</div>
                    <div style="padding:5px 0;">顾问手机：{{formLabeldetails1.resourceAdviserPhone}}</div>
                </div>

                <div class="min_title" v-if="formLabeldetails1.idCard||formLabeldetails1.idCardFront||formLabeldetails1.idCardBack||formLabeldetails1.pharmacistCertificateNum||formLabeldetails1.pharmacistCertificateFront||formLabeldetails1.qualificationCertificateNum||formLabeldetails1.qualificationCertificateFront">证件信息</div>
                <div v-if="formLabeldetails1.idCard||formLabeldetails1.idCardFront||formLabeldetails1.idCardBack" style="padding:0 30px;display: flex;justify-content: space-between;">
                    <div v-if="formLabeldetails1.idCard" style="padding:5px 0;">身份证号：{{formLabeldetails1.idCard}}</div>
                    <img v-if="formLabeldetails1.idCardFront" :src="formLabeldetails1.idCardFront" style="height:110px;width: 110px;margin: 5px 10px;">
                    <img v-if="formLabeldetails1.idCardBack" :src="formLabeldetails1.idCardBack" style="height:110px;width: 110px;margin: 5px 10px;">
                </div>
                <div v-if="formLabeldetails1.pharmacistCertificateNum||formLabeldetails1.pharmacistCertificateFront" style="padding:0 30px;display: flex;justify-content: space-between;">
                    <div v-if="formLabeldetails1.pharmacistCertificateNum" style="padding:5px 0;">资格证号：{{formLabeldetails1.pharmacistCertificateNum}}</div>
                    <img v-if="formLabeldetails1.pharmacistCertificateFront" :src="formLabeldetails1.pharmacistCertificateFront" style="height:110px;width: 110px;margin: 5px 10px;">
                </div>
                <div v-if="formLabeldetails1.qualificationCertificateNum||formLabeldetails1.qualificationCertificateFront" style="padding:0 30px;display: flex;justify-content: space-between;">
                    <div v-if="formLabeldetails1.qualificationCertificateNum" style="padding:5px 0;">执业证号：{{formLabeldetails1.qualificationCertificateNum}}</div>
                    <img v-if="formLabeldetails1.qualificationCertificateFront" :src="formLabeldetails1.qualificationCertificateFront" style="height:110px;width: 110px;margin: 5px 10px;">
                </div>

            </div>

            </el-dialog>

        <!-- 医生申请列表 -->
        <!-- <el-dialog :visible.sync="applyVisible" width="90%" center size="tiny"  title="医生申请列表" :close-on-click-modal="false" top="40px">

      </el-dialog> -->


      <el-dialog :visible.sync="preModel" width="1050px" center size="tiny"  title="患者处方" :close-on-click-modal="false" top="40px">
  	
          
<el-table border
    :data="prescriptionList"
    stripe 
    style="width: 100%;min-height:500px">

   <el-table-column
      label="状态" width="150">
      <template slot-scope="scope">
      {{handleStatus(scope.row.presState)}}
      </template>
   </el-table-column>

  <el-table-column
      prop="createDate"
      label="开方时间"  width="170">
   </el-table-column>

   <el-table-column
      prop="docterName"
      label="开方医生" width="150">
   </el-table-column>

   <el-table-column
      prop="doctorMobile"
      label="开方医生手机号" width="170">
   </el-table-column>

   
      <el-table-column
      prop="hospitalName"
      label="医院"  width="150">
   </el-table-column>

      <el-table-column
      prop="docterDept"
      label="科室"  width="150">
   </el-table-column>


   <el-table-column
      prop="memberName"
      label="患者姓名"  width="150">
   </el-table-column>
    <el-table-column
      prop="patientSex"
      label="患者性别"  width="150">
   </el-table-column>
 <el-table-column
      prop="memberAge"
      label="患者年龄">
   </el-table-column>
  <el-table-column
      prop="memberPhone"
      label="患者手机号" width="170">
   </el-table-column>
     <el-table-column
      prop="consigneeAddress"
      label="患者地址">
   </el-table-column>


  <el-table-column
      prop="patientRemake"
      label="医生给患者备注"  width="170">
   </el-table-column>

   <el-table-column
      prop="remark"
      label="医生给转方备注"  width="170">
   </el-table-column>


   <el-table-column
      prop="transDocName"
      label="转方医生">
   </el-table-column>
   <el-table-column
      prop="transDate"
      label="转方时间" width="170">
   </el-table-column>
  <el-table-column
      prop="transRemark"
      label="转方备注" width="220">
   </el-table-column>
  <el-table-column
      prop="auditingName"
      label="审方医生">
   </el-table-column>
  <el-table-column 
      prop="auditingDate"
      label="审方时间" width="170">
   </el-table-column>
  <!-- <el-table-column
      prop="auditingRemake"
      label="审方备注" width="220">
   </el-table-column> -->


  <el-table-column
      prop="presId"
      label="处方编号" width="210">
   </el-table-column>
   <el-table-column label="操作" fixed="right"  width="120">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          @click="getprescriptioninfo(scope.$index, scope.row)" >处方详情</el-button>

         </template>
    </el-table-column>
</el-table>
	<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" :current-page="prepage+1"  :page-size="prepageSize" :total="pretotal" @current-change="onprePageChange">
			</el-pagination>
		</el-col>
      </el-dialog>

<prescriptioninfo ref="prescriptioninfo" :row="prescriptioninfoObj" ></prescriptioninfo>

        <el-dialog :visible.sync="orderModel" width="1050px" center size="tiny"  title="患者订单" :close-on-click-modal="false" top="40px">

<remindertable ref="remindertable" :orderList="patientOrderList" @getOrderList="getOrderList"  pagetype="patient"></remindertable>

			<el-pagination layout="prev, pager, next" :current-page="orderpage+1"  :page-size="orderageSize" :total="ordertotal" @current-change="onorderPageChange">
			</el-pagination>


      </el-dialog>
<updatedoctor ref="updatedoctor" @getdoctorList="getdoctorList" @getDoctorExamineList="getDoctorExamineList" :tableTree="tableTree" :hospitallist="hospitallist"></updatedoctor>


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

import  updatedoctor from "./updatedoctor";
import  * as  confUrl from "../../api/conf";

@Component({
  props: {},
  components: {
    prescriptioninfo,
    remindertable,
    updatedoctor
  }
})
export default class doctor extends Vue {
    g_news_url:any='';
activeName2="first"
keyname = '';
dialogFormVisible=false;
dialogFormVisible1=false;
dialogFormVisible5=false;
applyVisible=false;
doctorlist=[];
state='';
statelist=[{name:'可用',id:'USE'},{name:'停用',id:'STOP'},]
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
        };
        formLabelAlign1:any ={
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
}
handleClick(tab, event) {
        if(tab.index==0){
            this.getDoctorExamineList();
            this.countExaminedoctor();
        }else{
            this.getdoctorList();
            this.getdoctorcount();
            this.countExaminedoctor();
        } 
      }
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
    //     { required: true, message: '请填写擅长', trigger: 'blur' }
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
    //     {required: false,validator: this.checkidcard,trigger: 'blur'}
    // ]
}
formLabelAlign5={
    qrcode:'',
    hospitalName:'',
    name:'',
};
doctortitlelist:any=[
    {id:'ASSISTANT_PHYSICIAN',name:'住院医师'},
    {id:'ATTENDING_DOCTOR',name:'主治医师'},
    {id:'DEPUTY_CHIEF_PHYSICIAN',name:'副主任医师'},
    {id:'CHIEF_PHYSICIAN',name:'主任医师'}
]    
doSubmitStatus(index,row){
    if(row.doctorStatus =='USE'){
this.handleSTOP(index,row)
    }
      if(row.doctorStatus =='STOP'){
this.handleUSE(index,row)
    }
}             
        update='';
        handleEdit(index, row,state) {
            (<any>this.$refs.updatedoctor).handleEdit(index, row,state)
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

handlegenerate(index, row){
    this.dialogFormVisible5=true
    this.formLabelAlign5=row
}
    pageSize = 10;
    total = 0;
    currentPage = 0;

    onPageChange(page) {
        this.currentPage = page - 1;
        this.getdoctorList();
    }
    clearcurrentPage(){
        this.total = 0;
        this.currentPage = 0;        
        this.getdoctorList();
    }
    addcancel(formName){
        let a:any=this.$refs[formName];
        a.resetFields();
        this.dialogFormVisible = false;
        this.formLabelAlign={name: '',phone: '',hospitalId:'',hospitalName: '',hospitalDepartment: '',departmentId:[],departmentName:'',doctorBrief: '',doctorGood: '',consultingFee: '',prescriptionNum:'',orderNum:'',orderMoney:'',doctorPatientNum:'',remark:'',resource:'',adviserPhone:'',adviserName:'',doctorTitle:'',idCard:'',pharmacistCertificateNum:'',qualificationCertificateNum:'',sex:'',age:'',};
        this.idCardFrontUrl='';
        this.idCardBackUrl='';
        this.pharmacistCertificateFrontUrl='';
        this.qualificationCertificateFrontUrl='';
        this.pictureUrl='';
    }
    updatecancel(formName){
        let a:any=this.$refs[formName];
        a.resetFields();
        this.dialogFormVisible1 = false;
        this.formLabelAlign1={name: '',phone: '',hospitalId:'',hospitalName: '',hospitalDepartment: '',departmentId:[],departmentName:'',doctorBrief: '',doctorGood: '',consultingFee: '',prescriptionNum:'',orderNum:'',orderMoney:'',doctorPatientNum:'',remark:'',}
    }
    loading =false

  getdoctorList() {
      this.loading = true
    doctorApi.queryDoctorList(this.currentPage,this.pageSize, this.keyname, this.state).then(res => {
      this.loading = false
      if (res["retCode"]) {
        this.doctorlist = res.data.list;
        this.total = res.data.page.total
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
  }

  handleSTOP(index,row){
      this.$confirm('是否停用该医生?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal:false
        }).then(() => {
            doctorApi.setDoctorSTOPstatus(row.doctorId).then(res => {
            if (res["retCode"]) {
                this.getdoctorList();
                this.$message({
                    type: 'success',
                    message: '停用成功!'
                });
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停用'
          });          
        });
      }

      handleUSE(index,row){
      this.$confirm('是否启用该医生?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal:false
        }).then(() => {
            doctorApi.setDoctorUSEstatus(row.doctorId).then(res => {
            if (res["retCode"]) {
                this.getdoctorList()
                this.$message({
                    type: 'success',
                    message: '启用成功!'
                });
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          });          
        });
      }


      handleHIDE(index,row){
      this.$confirm('是否隐藏该医生?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal:false
        }).then(() => {
            doctorApi.setDoctorHIDEstatus(row.doctorId).then(res => {
            if (res["retCode"]) {
                this.getdoctorList()
                this.$message({
                    type: 'success',
                    message: '隐藏成功!'
                });
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消隐藏'
          });          
        });
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
      adddoctor(){
          let a = this.hospitallist.filter(item => {return (item.hospitalCode == this.formLabelAlign.hospitalId);});
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
                        this.dialogFormVisible = false;
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
                        this.getdoctorList();
                        this.getdoctorcount()
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
                this.dialogFormVisible = false;
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
                this.getdoctorList();
                this.getdoctorcount()
                        this.$message('添加成功')
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
          }
          
      }
      doctotcount = 0;
      getdoctorcount(){
          doctorApi.getdoctorcount().then(res => {
      if (res["retCode"]) {
        this.doctotcount = res.data.count;
      } else {
        if(!res['islogin']){this.$alert(res["message"]);}
        console.error("数据查询错误");
      }
    });
      }
      hospitallist=[];
    gethospitalList(){
        doctorApi.queryHospitalList().then(res => {
      if (res["retCode"]) {
        this.hospitallist = res.data;
      } else {
        this.$alert(res["message"]);
        console.error("数据查询错误");
      }
    });
    }

    tableTree=[];
    getdepartmenttree(){
            doctorApi.querytree().then(res => {
      console.log(res);
      if (res["retCode"]) {
        this.tableTree = res.data.children;
        console.log("获取科室树", res.data);
      } else {
        this.$alert(res["message"]);
        console.error("数据查询错误");
      }
    });
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
        changeupdatedepartmentId(){
            console.log('22222222',this.formLabelAlign1.departmentId)
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
        relationshipshow=false;
        relationshipdoctorId='';
        relationshiplist=[];
        relationshipdoctor="";
        lookpatient(index,row){
            this.relationshipdoctorId = row.doctorId
            this.relationshipdoctor = row.name + "的患者"
            this.relationshipshow = true
            this.getrelationshiplist();
        }

        getrelationshiplist(){
            let page=this.relationshippage;
            let pageSize=this.relationshippageSize;
            doctorApi.doctoFindMyMemberr(this.relationshipdoctorId,page,pageSize).then(res => {
            if (res["retCode"]) {
                console.log('relationshiplist',res)
                this.relationshiplist = res.data.members
                this.relationshiptotal = res.data.page.total
                console.log('relationshiplist11111',this.relationshiplist)                
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
        }
        relationshippage=0
        relationshippageSize = 10;
        relationshiptotal = 0;
        onrelationshipPageChange(page){
            this.relationshippage = page - 1;
            this.getrelationshiplist();
        }

        preModel= false
        prescriptionList = []
        prepage=0
        prepageSize = 10;
        pretotal = 0;
        onprePageChange(page) {
            this.prepage = page - 1;
            this.getPrescription();
        }
        prescriptionItem = {};
        changePreModel(index,row){
            this.prescriptionItem = row
            this.preModel = true
            this.getPrescription();
        }
        getPrescription(){
        //查询患者处方
        doctorApi.docAndMemFindPre({
        doctorid : this.relationshipdoctorId,
        memberid : this.prescriptionItem['memberId'],
        page : this.prepage,
        pageSize: this.prepageSize
        }).then(res => {
            if (res["retCode"]) {
                console.log('prescriptionList',res)
                this.prescriptionList = res.data.prescriptionList
                console.log('prescriptionList111111',this.prescriptionList)
                this.pretotal = res.data.page.total
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
        }
        prescriptioninfoObj = {}
        getprescriptioninfo(index,row){
        this.prescriptioninfoObj = row
        let a:any = this.$refs.prescriptioninfo
        a.getInfo();
        }

        orderModel=false;
        patientOrderList= [];
        orderpage=0;
        orderageSize = 10;
        ordertotal = 0;
        onorderPageChange(page) {
            this.orderpage = page - 1;
            this.getOrderList();
        }
        orderItem = {};
        changeOrderModel(index,row){
            this.orderModel = true
            this.orderItem = row
            this.getOrderList();
        }
        getOrderList() {
            doctorApi.docAndMemFindOrd({
            doctorid : this.relationshipdoctorId,
            memberid : this.orderItem['memberId'],
            page : this.prepage,
            pageSize: this.prepageSize
        })
        .then(res => {
            if (res["retCode"]) {
                this.patientOrderList = res.data.prescriptionList;
                this.ordertotal = res.data.page.total;
                console.log('patientOrderList',this.patientOrderList)
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
        }   

        handleStatus(status) {
            switch (status) {
            case "NOT_TRANSLATED_PRESCRIPTION":
                return "未转方";
            case "ALREADY_TRANSLATED_PRESCRIPTION":
                return "已转方";
            case "FAIL_TRANSLATED_PRESCRIPTION":
                return "转方失败";
            case "REJECT_TRANSLATED_PRESCRIPTION":
                return "已驳回开方";
            case "ALREADY_AUDIT_PRESCRIPTION":
                return "已审方";
            case "FAIL_AUDIT_PRESCRIPTION":
                return "审方失败";
            case "REJECT_AUDIT_PRESCRIPTION":
                return "已驳回转方";
            default:
                return "";
            }
        }

        
        getapplyVisible(){
            this.applyVisible=true;
            this.getDoctorExamineList();
        }
        doctorExamineList=[];
        examinecurrentPage=0;
        examinepageSize=10;
        examinepagetotal=0;
            onexaminePageChange(page) {
        this.examinecurrentPage = page - 1;
        this.getDoctorExamineList();
    }
        getDoctorExamineList(){
            this.loading=true;
            doctorApi.findDoctorExamineList(this.examinecurrentPage,this.examinepageSize).then(res => {
            if (res["retCode"]) {
                this.doctorExamineList=res.data.doctorExamines;
                this.examinepagetotal=res.data.page.total;
                this.countExaminedoctor();
                this.loading=false;
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
        }
        handlepassDoctor(index, row){
            this.$confirm('是否让该医生通过?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                closeOnClickModal:false
                }).then(() => {
                    doctorApi.passDoctor(row.doctorId).then(res => {
                        if (res["retCode"]) {
                            this.getDoctorExamineList();
                            this.$message({
                                type: 'success',
                                message: '成功通过!'
                            });
                        } else {
                            if(!res['islogin']){this.$alert(res["message"]);}
                            console.error("数据查询错误");
                        }
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消通过'
                });          
            });
        }
        deleteDoctor(index, row){
            this.$confirm('是否让该医生删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                closeOnClickModal:false
                }).then(() => {
                    doctorApi.deleteYdkDoctorExamine(row.doctorId).then(res => {
                        if (res["retCode"]) {
                            this.getDoctorExamineList();
                            this.$message({
                                type: 'success',
                                message: '成功删除!'
                            });
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
        handlenotPassDoctor(index, row){     
            this.$confirm('是否让该医生不通过?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                closeOnClickModal:false
                }).then(() => {
                    doctorApi.notPassDoctor(row.doctorId).then(res => {
                    if (res["retCode"]) {
                        this.getDoctorExamineList();
                        this.$message({
                            type: 'success',
                            message: '成功不通过!'
                        });
                    } else {
                        if(!res['islogin']){this.$alert(res["message"]);}
                        console.error("数据查询错误");
                    }
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消不通过'
                });          
            });
        }
        examinedoctorcount=0;
        countExaminedoctor(){
            doctorApi.countDoctorExamineList().then(res => {
            if (res["retCode"]) {
                this.examinedoctorcount=res.data;
            } else {
                if(!res['islogin']){this.$alert(res["message"]);}
                console.error("数据查询错误");
            }
            });
        }
        detailsshow=false;
        detailsshow1=false;
        formLabeldetails:any={};
        formLabeldetails1:any={};
        detailsdoctor(index,row){
            this.formLabeldetails={}
            this.detailsshow=true;
            this.formLabeldetails=row
        }
        doctordetails(index,row){
            this.formLabeldetails1={}            
            this.detailsshow1=true;
            this.formLabeldetails1=row
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
    
    
mounted(){
    this.g_news_url=confUrl.g_news_url
  this.getdoctorList()
  this.getdoctorcount()
  this.gethospitalList();
  this.getdepartmenttree();
  this.getDoctorExamineList();
  this.countExaminedoctor();
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