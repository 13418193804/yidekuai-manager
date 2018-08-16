
import axios from 'axios';

import * as Config from './conf';


import * as Api from './api';

let base = Config.g_base_url;

export const querytree = () => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    return Api.requestForm2('/department/querytree', params)
        .then(res => res);
}

export const adddepartment = (name,parentid,parentName) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        name: name,
        parentid: parentid,
        parentName: parentName,
    }
    return Api.requestForm2('/department/add', params)
        .then(res => res);
}

export const getdepartmentcount = () => {

    let params = {

    }
    return Api.requestForm2('/department/count', params)
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

export const delectdepartment = (departmentId) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        deptId:departmentId,
    }
    return Api.requestForm2('/department/delect', params)
        .then(res => res);
}

export const updatedepartment = (departmentId,name,parentid,parentName) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        departmentId:departmentId,
        name: name,
        parentid: parentid,
        parentName: parentName,
    }
    return Api.requestForm2('/department/update', params)
        .then(res => res);
}

export const finddeptree = (departmentId) => {
    
        let params = {
            token: sessionStorage.getItem("token"),
            userid: sessionStorage.getItem("userId"),
            deptId:departmentId
        }
        
        return Api.requestForm2('/department/finddeptree', params)
            .then(res => res);
    }
    
