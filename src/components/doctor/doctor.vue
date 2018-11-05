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
                                <el-button type="text" v-if="scope.row.doctorStatus=='AUDIT_NOT_PASS'" @click="handleEdit(scope.$index, scope.row,'notPassUpdate')" v-promiss.edit>修改</el-button>
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
                    <el-button type="primary" @click="adddoctorshow()">新增医生</el-button>
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
                    <el-col :xs="5" :sm="5" :md="2" :lg="2" :xl="2">
                        <el-button type="primary" style="margin-top:20px;margin-left:15px;" @click="exportDoctorExcel()" v-promiss.export>导出医生文件</el-button>                        
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
                        <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row,'update')" v-promiss.edit>编辑</el-button>
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

        
        <el-dialog title="医生二维码" :visible.sync="dialogFormVisible5" :close-on-click-modal="false">
        <div style="display:flex;justify-content: center;flex-direction: column;align-items: center;">
            <!-- <div><img src="../../assets/qrcode.jpg" style="width:200px;height:200px;"></div> -->
            <div><img :src="formLabelAlign5.qrcode" style="width:200px;height:200px;"></div>
            <div>{{formLabelAlign5.hospitalName}}:{{formLabelAlign5.name}}</div>
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
<updatedoctor ref="updatedoctor" @getdoctorList="getdoctorList" @getDoctorExamineList="getDoctorExamineList" @getdoctorcount="getdoctorcount" :tableTree="tableTree" :hospitallist="hospitallist"></updatedoctor>


    </div>
    
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as doctorApi from "../../api/doctorApi";
import * as departmentApi from "../../api/departmentApi";
import * as hospitalApi from "../../api/hospitalApi";
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
formLabelAlign5={
    qrcode:'',
    hospitalName:'',
    name:'',
};
   
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
    

    exportDoctorExcel(){
        let urlkey = ''
        if(this.keyname&&this.state){
            urlkey='?keyWord='+this.keyname+'&status='+this.state
        }else if(this.keyname){
            urlkey='?keyWord='+this.keyname
        }else if(this.state){
            urlkey='?status='+this.state
        }
        let url = confUrl.g_base_url+'/api/doctor/exportDoctorExcel'+urlkey
        window.open(url);
    }

    provincelist=[];

    adddoctorshow(){
        (<any>this.$refs.updatedoctor).addshow()
    }



mounted(){
    this.g_news_url=confUrl.g_news_url
  this.getdoctorList()
  this.getdoctorcount()
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