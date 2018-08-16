
import axios from 'axios';

import * as Config from './conf';


import * as Api from './api';

let base = Config.g_base_url;


export const queryUserList = (pageSize, obj) => {

    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        page: pageSize,
        pageSize: 20
    }
    Object.assign(params, obj)
    return Api.requestForm2('/merchantuser/list', params)
        .then(res => res);
}
export const queryRoleList = () => {

    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
    }
    return Api.requestForm2('/merchant/role/list', params)
        .then(res => res);
}
export const doRoleAdd = (roleName) => {

    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        roleName: roleName
    }
    return Api.requestForm2('/merchant/role/add', params)
        .then(res => res);
}
export const doRoleUpdate = (obj) => {

    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, obj);
    params['roleId'] = params['id']
    return Api.requestForm2('/merchant/role/update', params)
        .then(res => res);
}

export const deleteUser = (obj) => {

    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        userId: obj.userId
    }

    return Api.requestForm2('/merchantuser/delete', params)
        .then(res => res);
}
export const addUser = (obj) => {

    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, obj);

    return Api.requestForm2('/merchantuser/add', params)
        .then(res => res);
}

export const updateUser = (obj) => {
    
        let params = {
            token: sessionStorage.getItem("token"),
            merchantUserId: sessionStorage.getItem("userId"),
        }
        Object.assign(params, obj);
    
        return Api.requestForm2('/merchantuser/update', params)
            .then(res => res);
    }

    export const deleteRole = (obj) => {
        
            let params = {
                token: sessionStorage.getItem("token"),
                merchantUserId: sessionStorage.getItem("userId"),
            }
            Object.assign(params, obj);
            
            return Api.requestForm2('/merchant/role/delete', params)
                .then(res => res);
        }
    
    export const changePermissionIds = (obj) => {
        
            let params = {
                token: sessionStorage.getItem("token"),
                merchantUserId: sessionStorage.getItem("userId"),
            }

            Object.assign(params, obj);

            return Api.requestForm2('/merchant/rolepermission/update', params)
                .then(res => res);
        }
        export const queryPermissionIds = (obj) => {
            
                let params = {
                    token: sessionStorage.getItem("token"),
                    merchantUserId: sessionStorage.getItem("userId"),
                }
    
                Object.assign(params, obj);
                
                return Api.requestForm2('/merchant/rolepermission/list', params)
                    .then(res => res);
            }
        
