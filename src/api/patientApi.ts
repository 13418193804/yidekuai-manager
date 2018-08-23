
import axios from 'axios';

import * as Config from './conf';


import * as Api from './api';

let base = Config.g_base_url;


export const queryUserList = (page,pageSize, keyname,orderByStr) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        keyname: keyname,
        page: page,
        pageSize: pageSize,
        orderByStr:orderByStr
    }
    return Api.requestForm2('/api/member/findmember', params)
        .then(res => res);
}

export const allUserCount = () => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    return Api.requestForm2('/api/member/getmembercount', params)
        .then(res => res);
}


export const saveUser = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        source:'web'
    }
    Object.assign(params, model);
    return Api.requestForm2('/api/member/savemember', params)
        .then(res => res);
}
export const updateUserStatus = (memberid, memstatus) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        memberid: memberid,
        memstatus: memstatus,
        source: 'web'
    }
    return Api.requestForm2('/api/member/setmemberstatus', params)
        .then(res => res);
}

