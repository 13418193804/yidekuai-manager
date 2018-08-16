
import axios from 'axios';

import * as Config from './conf';


import * as Api from './api';

let base = Config.g_base_url;



//新增权限
export const doaddSubmit = (model) => {
    
        let params = {
            token: sessionStorage.getItem("token"),
            userid: sessionStorage.getItem("userId")
        }
        Object.assign(params, model)
        return Api.requestForm2('/authority/addpermission', params)
            .then(res => res);
    }
    
    
//删除权限
export const doDelete = (model) => {
    
        let params = {
            token: sessionStorage.getItem("token"),
            userid: sessionStorage.getItem("userId")
        }
        Object.assign(params, model)
        return Api.requestForm2('/authority/deletepermission', params)
            .then(res => res);
    }
    
    
//查询权限
export const queryPrimms = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId")
    }
    Object.assign(params, model)
    return Api.requestForm2('/authority/getlistpermission', params)
        .then(res => res);
}



