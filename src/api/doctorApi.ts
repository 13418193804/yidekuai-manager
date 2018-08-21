import axios from 'axios';

import * as Config from './conf';


import * as Api from './api';

let base = Config.g_base_url;

export const queryDoctorList = (page,pageSize, keyname,state) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        keyword: keyname,
        doctorEnums: state,
        page: page,
        pageSize: pageSize
    }
    return Api.requestForm2('/api/doctor/findDoctorList', params)
        .then(res => res);
}

export const setDoctorSTOPstatus = (doctorid) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        doctorid: doctorid,
        doctorEnums: 'STOP',
        source: 'weixin'
    }
    return Api.requestForm2('/api/doctor/setmemberstatus', params)
        .then(res => res);
}

export const setDoctorUSEstatus = (doctorid) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        doctorid: doctorid,
        doctorEnums: 'USE',
        source: 'weixin'
    }
    return Api.requestForm2('/api/doctor/setmemberstatus', params)
        .then(res => res);
}

export const setDoctorHIDEstatus = (doctorid) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        doctorid: doctorid,
        doctorEnums: 'HIDE',
        source: 'weixin'
    }
    return Api.requestForm2('/api/doctor/setmemberstatus', params)
        .then(res => res);
}

export const adddoctor = (form,hospital,department,idCardFront,idCardBack,pharmacistCertificateFront,qualificationCertificateFront) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        name: form.name,
        phone: form.phone,
        hospitalname: hospital.hospitalName,
        hospitalcode: hospital.hospitalCode,
        derpartname: department.departmentName,
        derpartnameid: department.departmentId,
        doctorbrief: form.doctorBrief,
        doctorgood: form.doctorGood,
        consultingfee: form.consultingFee,
        doctorEnums:'USE',
        remark:form.remark,
        doctortitle:form.doctorTitle,
        idCard:form.idCard,
        idCardFront:idCardFront,
        idCardBack:idCardBack,
        pharmacistCertificateFront:pharmacistCertificateFront,
        pharmacistCertificateNum:form.pharmacistCertificateNum,
        qualificationCertificateFront:qualificationCertificateFront,
        qualificationCertificateNum:form.qualificationCertificateNum,
        age:form.age,
        sex:form.sex,
    }
    return Api.requestForm2('/api/doctor/adddoctorother', params)
        .then(res => res);
}

export const updatedoctor = (form,hospital,department,idCardFront,idCardBack,pharmacistCertificateFront,qualificationCertificateFront) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        doctorid: form.doctorId,
        name: form.name,
        phone: form.phone,
        hospitalname: hospital.hospitalName,
        hospitalcode: hospital.hospitalCode,
        derpartname: department.departmentName,
        derpartnameid: department.departmentId,
        doctorbrief: form.doctorBrief,
        doctorgood: form.doctorGood,
        consultingfee: form.consultingFee,
        remark:form.remark,
        doctortitle:form.doctorTitle,
        idCard:form.idCard,
        idCardFront:idCardFront,
        idCardBack:idCardBack,
        pharmacistCertificateFront:pharmacistCertificateFront,
        pharmacistCertificateNum:form.pharmacistCertificateNum,
        qualificationCertificateFront:qualificationCertificateFront,
        qualificationCertificateNum:form.qualificationCertificateNum,
        sex:form.sex,
        age:form.age,
    }
    return Api.requestForm2('/api/doctor/updatedoctor', params)
        .then(res => res);
}

export const getdoctorcount = () => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    return Api.requestForm2('/api/doctor/getdoctorcount', params)
        .then(res => res);
}

export const queryHospitalList = () => {

    let params = {
        token: sessionStorage.getItem("token"),
    }
    return Api.requestForm2('/hospital/findHospitalByArea', params)
        .then(res => res);
}

export const querytree = () => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    return Api.requestForm2('/department/querytree', params)
        .then(res => res);
}

export const getdepartmentlist = (departmentId) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        departmentid:departmentId,
    }
    return Api.requestForm2('/department/find', params)
        .then(res => res);
}

export const doctoFindMyMemberr = (doctorid,page,pageSize) => {

    let params = {
        token: sessionStorage.getItem("token"),
        doctorid:doctorid,
        page: page,
        pageSize: pageSize
    }
    return Api.requestForm2('/api/doctor/doctoFindMyMemberr', params)
        .then(res => res);
}

//查询处方列表
export const docAndMemFindPre = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/api/doctor/docAndMemFindPre', params)
        .then(res => res);
}

//查询订单
export const docAndMemFindOrd = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/api/doctor/docAndMemFindOrd', params)
        .then(res => res);
}


export const findDoctorExamineList = (currentPage,pageSize) => {

    let params = {
        token: sessionStorage.getItem("token"),
        page: currentPage,
        pagesize: pageSize,
    }
    return Api.requestForm2('/api/doctor/findDoctorExamineList', params)
        .then(res => res);
}

export const passDoctor = (doctorId) => {

    let params = {
        token: sessionStorage.getItem("token"),
        doctorId: doctorId,
    }
    return Api.requestForm2('/api/doctor/passDoctor', params)
        .then(res => res);
}

export const notPassDoctor = (doctorId) => {

    let params = {
        token: sessionStorage.getItem("token"),
        doctorId: doctorId,
    }
    return Api.requestForm2('/api/doctor/notPassDoctor', params)
        .then(res => res);
}

export const notPassupdatedoctor = (form,hospital,department,idCardFront,idCardBack,pharmacistCertificateFront,qualificationCertificateFront) => {

    let params = {
        doctorid: form.doctorId,
        name: form.name,
        phone: form.phone,
        hospitalname: hospital.hospitalName,
        hospitalcode: hospital.hospitalCode,
        derpartname: department.departmentName,
        derpartnameid: department.departmentId,
        doctorbrief: form.doctorBrief,
        doctorgood: form.doctorGood,
        consultingfee: form.consultingFee,
        remark:form.remark,
        doctortitle:form.doctorTitle,
        idCard:form.idCard,
        idCardFront:idCardFront,
        idCardBack:idCardBack,
        pharmacistCertificateFront:pharmacistCertificateFront,
        pharmacistCertificateNum:form.pharmacistCertificateNum,
        qualificationCertificateFront:qualificationCertificateFront,
        qualificationCertificateNum:form.qualificationCertificateNum,
        sex:form.sex,
        age:form.age,
    }
    return Api.requestForm2('/api/doctor/adviserPerfectDoc', params)
        .then(res => res);
}


export const countDoctorExamineList = () => {

    let params = {
        token: sessionStorage.getItem("token"),
    }
    return Api.requestForm2('/api/doctor/countDoctorExamineList', params)
        .then(res => res);
}

export const checkidcard = (idcard) => {

    let params = {
        idcard: idcard,
    }
    return Api.requestForm2('/api/member/checkidcard', params)
        .then(res => res);
}

export const deleteYdkDoctorExamine = (doctorId) => {

    let params = {
        doctorId: doctorId,
    }
    return Api.requestForm2('/api/doctor/deleteYdkDoctorExamine', params)
        .then(res => res);
}