
import axios from 'axios';

import * as Config from './conf';


import * as Api from './api';

let base = Config.g_base_url;


export const queryUserList = (page) => {

    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        page: page,
        pageSize: 20
    }
    return Api.requestForm2('/merchant/user/list', params)
        .then(res => res);
}

export const queryScale = () => {
    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),

    }
    return Api.requestForm2('/merchant/account/query', params)
        .then(res => res);
}


export const updateScale = (scale) => {
    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        scale: parseInt(scale)
    }
    return Api.requestForm2('/merchant/account/update', params)
        .then(res => res);
}


export const queryUserAddress = (data) => {



    return Api.requestForm2('/address/list', data)
        .then(res => res);
}


export const queryFav = (data) => {


    return Api.requestForm2('/fav/query', data)
        .then(res => res);
}

export const queryFeedBack = (currentPage, keyword,beginDate,endDate) => {
    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        beginDate:beginDate,
        endDate:endDate,
        page: currentPage,
        pageSize: 20,
        keyword: keyword
    }
    return Api.requestForm2('/feedback/query', params)
}



export const getRecordList = (pageSize, status) => {
    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        page: pageSize,
        pageSize: 10,
        status: status
    }
    return Api.requestForm2('/withdraw/record/listbymerchant', params)
}
export const doAccpset = (recordIds, status) => {
    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        recordIds: recordIds,
        status: status
    }
    return Api.requestForm2('/withdraw/record/update', params)
}

export const getHotword = () => {

    return Api.requestGet('/hotword/query')
}

//新增热词
export const addHotWord = (obj) => {
    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, obj);
    return Api.requestForm2('/hotword/add', params)
}

//修改热词
export const updateHotWord = (obj) => {
    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, obj);
    return Api.requestForm2('/hotword/update', params)
}



//删除热词
export const deleteHotWord = (obj) => {
    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, obj);
    return Api.requestForm2('/hotword/delete', params)
}
