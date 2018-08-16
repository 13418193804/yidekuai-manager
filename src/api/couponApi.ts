
import axios from 'axios';

import * as Config from './conf';


import * as Api from './api';

let base = Config.g_base_url;


export const queryCouponList = (page,obj) => {

    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        page:page,
        pageSize:20
    }
    Object.assign(params,obj)
    console.log(params)
    return Api.requestForm2('/coupon/list', params)
        .then(res => res);
}



export const addCoupinItem = (obj) => {
        let params = {
            token: sessionStorage.getItem("token"),
            merchantUserId: sessionStorage.getItem("userId")
        }
        Object.assign(params,obj);
        return Api.requestForm2('/coupon/add', params)
            .then(res => res);
    }
    

    export const updateCoupinItem = (obj) => {
        let params = {
            token: sessionStorage.getItem("token"),
            merchantUserId: sessionStorage.getItem("userId")
        }
        Object.assign(params,obj);
        return Api.requestForm2('/coupon/update', params)
            .then(res => res);
    }
    export const deleteCouponItem = (obj) => {
        let params = {
            token: sessionStorage.getItem("token"),
            merchantUserId: sessionStorage.getItem("userId")
        }
        Object.assign(params,obj);
        return Api.requestForm2('/coupon/delete', params)
            .then(res => res);
    }
    
    