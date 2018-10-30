
import axios from 'axios';

import * as Config from './conf';


import * as Api from './api';

let base = Config.g_base_url;




// axios.interceptors.response.use(
//     response => {
//         if(response.config && response.config.responseType == 'blob') {
//             const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
//             let filename = 'excel.xls';
//             if ('download' in document.createElement('a')) {
//                 const downloadElement = document.createElement('a');
//                 let href = ''; 
//                 if(window.URL) href = window.URL.createObjectURL(blob); 
//                 else href = window['webkitURL'].createObjectURL(blob); 
//             　　 downloadElement.href = href;
//             　　 downloadElement.download = filename; 
//             　　 document.body.appendChild(downloadElement);
//             　　 downloadElement.click(); 
//             　　 if(window.URL) window.URL.revokeObjectURL(href); 
//                 else window['webkitURL'].revokeObjectURL(href); 
//                 document.body.removeChild(downloadElement);
//             } else {
//                 navigator.msSaveBlob(blob, filename);
//             }
//             return Promise.resolve(response.data);

//         }
//         return Promise.resolve(response.data);

//     },
//     error => {
//         const { response } = error;
//         let message = '异常', status;
//         if(!response) message = '请求超时...';
//         else {
//             message = response.statusText;
//             status = response.status;
//         }
//         return Promise.reject({ message, status });
//     }
// )

// const defaultConfig = {
//     baseURL: '',
//     mode: 'cors',    
//     headers: {
//         "your-content": 'test....',
//         "Accept": "application/json",   
//         "Content-Type": "application/json;charset=utf-8"
//     }, 
//     responseType: 'json'
// }

// axios.defaults.timeout = 30000

// export const post = (url, data, config) => {
//     return axios.post(url, data, Object.assign({}, defaultConfig, config))
// }










//时间  查询统计
export const doQueryData = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId")
    }
    Object.assign(params, model)
    return Api.requestForm2('/countByTime', params)
        .then(res => res);
}
//统计处方数
export const allPrescription = () => {


    return Api.requestForm2('/sumPrescription', {})
        .then(res => res);
}

//统一处方 3种 处方数
export const countPreByStatu = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId")
    }
    Object.assign(params, model)

    return Api.requestForm2('/countPreByStatu', params)
        .then(res => res);
}



//统计药品数 
export const allDrug = () => {
    return Api.requestForm2('/sumDrug', {})
        .then(res => res);
}


//集合处方查询列表
export const findPrescriptionByType = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/findPrescriptionByType', params)
        .then(res => res);
}

//查询处方列表
export const prescriptionList = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),

    }
    Object.assign(params, model)
    return Api.requestForm2('/findPrescription', params)
        .then(res => res);
}



//查询平台用户数量
export const allCountuser = () => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),

    }
    return Api.requestForm2('/adminuser/countUserFWeb', params)
        .then(res => res);
}
//查询平台角色数量
export const allCountrole = () => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),

    }
    return Api.requestForm2('/authority/countRoleFWeb', params)
        .then(res => res);
}



//查询角色列表
export const getUserList = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),

    }
    Object.assign(params, model)
    return Api.requestForm2('/adminuser/getUserInfoFWeb', params)
        .then(res => res);
}

//查询药品列表
export const getGrugList = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }


    Object.assign(params, model)
    return Api.requestForm2('/findDrugByTranslated', params)
        .then(res => res);
}
//药品库
export const getGrugList1 = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }


    Object.assign(params, model)
    return Api.requestForm2('/findDrugByDrugStore', params)
        .then(res => res);
}

// 转方时查药
export const getGrugListZhuanFang = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }


    Object.assign(params, model)
    return Api.requestForm2('/findDrugList', params)
        .then(res => res);
}



//获取部门树
export const getDepartment = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }


    Object.assign(params, model)
    return Api.requestForm2('/authority/getalldepartmentnext', params)
        .then(res => res);
}

//查询在线咨询列表
export const queryOnlineList = (startDate, endDate, page, pageSize, keystr) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        keystr: keystr,
        startDate: startDate,
        endDate: endDate,
        page: page,
        pageSize: pageSize

    }

    return Api.requestForm2('/api/news/findinterrogationlist', params)
        .then(res => res);
}


//查询角色列表

export const queryRoleList = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/authority/getRoleByDIdFWeb', params)
        .then(res => res);
}




//新增角色

export const addRoleModel = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/authority/addrole', params)
        .then(res => res);
}



//编辑角色

export const updateRoleModel = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/authority/updaterole', params)
        .then(res => res);
}



//删除角色
export const deleteRoleModel = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/authority/deleterole', params)
        .then(res => res);
}



//添加部门

export const adddepartmentModel = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/authority/addDepartmentFWeb', params)
        .then(res => res);
}

//编辑部门

export const aupdatedepartmentModel = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/authority/updateDepartmentFWeb', params)
        .then(res => res);
}

//添加后台用户
export const addSystemUserModel = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/adminuser/addUserFWeb', params)
        .then(res => res);
}

//编辑后台用户
export const updateSystemUserModel = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/adminuser/updateUserFWeb', params)
        .then(res => res);
}

//删除后台用户
export const deleteSystemUserModel = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/adminuser/deleteUserFWeb', params)
        .then(res => res);
}

//生成临时处方药
export const docreateDrug = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/creatTemporaryPrescriptionDrug', params)
        .then(res => res);
}

//查询临时处方药
export const queryPresDrug = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/findTemporaryPrescriptionDrug', params)
        .then(res => res);
}

//查询临时处方药
export const deletePreDrug = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/deletTemporaryPrescriptionDrug', params)
        .then(res => res);
}

//查询处方药品列表
export const queryPresDrugback = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/findPreDrugByPreId', params)
        .then(res => res);
}



//查询处方图片
export const getPrePic = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/findPicByPreId', params)
        .then(res => res);
}



//转方
export const dotransmit = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/changePrescription', params)
        .then(res => res);
}


//处方ID查详情
export const queryPresDetatil = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/findPreById', params)
        .then(res => res);
}

//审方把处方退回给转方
export const doKillPreAudit = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/auditingTranslation', params)
        .then(res => res);
}


//转方把处方退回给开方医生
export const doKillPreTransmit = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/rejectTranslation', params)
        .then(res => res);
}

//通过转方
export const checkPre = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/checkPrescription', params)
        .then(res => res);
}

//查询所有权限
export const getPermission = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/authority/getlistpermission', params)
        .then(res => res);
}

//查询部门列表
export const deleteDepartment = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/authority/deleteDepartmentFWeb', params)
        .then(res => res);
}



//查询部门列表
export const getDepartmentAllList = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/authority/getDepartmentFWebByDId', params)
        .then(res => res);
}


//查询订单
export const gerOrderList = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/getYdkPrescription', params)
        .then(res => res);
}

//待开发票的订单
export const getYdkPrescriptionAndInvoice = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/getYdkPrescriptionAndInvoice', params).then(res => res);

}

//更新订单
export const updateOrder = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/updateYdkPrescription', params)
        .then(res => res);
}

//催单
export const reminderByPresId = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/reminderByPresIdTWeC', params)
        .then(res => res);
}

//催单更改状态
export const changeReminderStatus = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/changeYdkPrescriptionReminderFlag', params)
        .then(res => res);
}



//发货
export const doSend = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/ExpressSplit/addExpressSplit', params)
        .then(res => res);
}

//确认收货
export const dorecvGood = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/express/updateYdkOrderDetail', params)
        .then(res => res);
}

/**
 * 包裹列表
 * @param model 
 */
export const getExpressPackage = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/ExpressSplit/getExpressPackage', params)
        .then(res => res);
}
/**
 * 包裹查药品
 * @param model 
 */


export const getExpressPackageDrug = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/ExpressSplit/getExpressPackageDrug', params)
        .then(res => res);
}
//订单查数量
export const queryOrderCount = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/countYdkPrescription', params)
        .then(res => res);
}

//修改密码
export const updatePassword = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/adminuser/ModifyPassword', params)
        .then(res => res);
}


//查询订单详情
export const getOrderInfo = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/findOrderDetails', params)
        .then(res => res);
}

//角色授权
export const roleBindPrimss = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/authority/rolepergrantbatch', params)
        .then(res => res);
}

//角色获取权限
export const roleGetPrimss = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/authority/getroleper', params)
        .then(res => res);
}




//添加药品
export const addDrugStore = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/insertDrug', params)
        .then(res => res);
}


//修改药品
export const updateDrugStore = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/updateDrugByDrugStore', params)
        .then(res => res);
}



//删除药品
export const deleteDrugStore = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/deldrugbyid', params)
        .then(res => res);
}





//查询快递列表
export const queryShipList = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/express/getKuaibirdComTrans', params)
        .then(res => res);
}


//物流追踪
export const showShipInfo = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/express/getByKuaiBird', params)
        .then(res => res);
}



//释放处方
export const uncheckPrefor = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/unclockPre', params)
        .then(res => res);
}



//获取要导出订单的Url
export const getExcelUrl = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/jztey/getExcelExpoetUrl', params)
        .then(res => res);
}


//导出成功
export const orderDoResult = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/jztey/AftergetExcelExpoetUrl', params)
        .then(res => res);
}



//通过药品id查询药品规格列表
export const queryDrugCenterList = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/findprelistbyid', params)
        .then(res => res);
}




//通过药品id删除一条用法用量
export const deleteDrugCenterItem = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/deleteYdkDrug', params)
        .then(res => res);
}



//通过药品id删除一条用法用量
export const queryDrugCenterItem = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/finddrugbyid', params)
        .then(res => res);
}

//通过药品id新增一条用法用量
export const insertDrugById = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/insertDrugById', params)
        .then(res => res);
}




//查询所有供应商
export const queryAllPartner = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/partner/findPartnerAll', params)
        .then(res => res);
}



//通过某部门id查询到他所有父级id
export const queryDepartmentAtMySelf = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/authority/getDepartmentAndUpFWebList', params)
        .then(res => res);
}

//查询顾问
export const getConsultantList = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getYdkAdviserByKeyword', params)
        .then(res => res);
}


export const getConsultantList1 = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getAdviserByKeyword', params)
        .then(res => res);
}



//新增顾问
export const addConsultantItem = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/addYdkAdviser', params)
        .then(res => res);
}

//修改顾问
export const updateConsultantItem = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/updateYdkAdviser', params)
        .then(res => res);
}


//删除顾问
export const deleteConsultantItem = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/deleteYdkAdviser', params)
        .then(res => res);
}




//顾问查货架号
export const consultantItemShelf = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getShelfByNumber', params)
        .then(res => res);
}




//顾问查货架号
export const getDoctorList = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getDoctorByKeyword', params)
        .then(res => res);
}




//药品数据
export const getDrugByKeyword = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getDrugByKeyword', params)
        .then(res => res);
}



//药品查顾问
export const drugGetAdviser = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getAdviserByDrug', params)
        .then(res => res);
}


//药品查医生
export const drugGetDoctor = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getDoctorByDrug', params)
        .then(res => res);
}



//（通用名）统计药品数
export const countDrug = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/countAdvisersDrug', params)
        .then(res => res);
}

//查询医生数量 、绑定顾问的医生  所有医生
export const countDoctor = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/countAdvisersDoctor', params)
        .then(res => res);
}

//医生查药品
export const doctorGetDoctor = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getDrugByDocterId', params)
        .then(res => res);
}



//顾问查已绑定的医生
export const adviserGetDoctor = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getDoctorByAdviser', params)
        .then(res => res);
}




//手机号查询未绑定顾问的医生
export const notBindDoctor = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getNotAdviserDoctor', params)
        .then(res => res);
}



//顾问绑定医生
export const adviserBindDoctor = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/docAdviser/bindingAdviser', params)
        .then(res => res);
}




//顾问查药品列表
export const adviserGetDrug = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getDrugByKeyword', params)
        .then(res => res);
}

//顾问人数
export const getAdviserCount = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/countAdvisersAdviser', params)
        .then(res => res);
}



//医生查顾问
export const doctorGetAdviser = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getAdviserByDoctor', params)
        .then(res => res);
}


//取消绑定医生
export const adviserNotBindDoctor = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/unbindDoctorAdviser', params)
        .then(res => res);
}


//我的医生
export const memberGetDoctor = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/ship/findDoctorPatient', params)
        .then(res => res);
}


//顾问中心各种数量
/**
 * orderMoney 订单金额
prescriptionNum 处方数量
orderNum 订单数量 
allAdviserNum 全部顾问数量
drugNum 药品数量
 * @param model 
 */
export const ypStartcreateDate = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/GetToatlInfoForWeb', params)
        .then(res => res);
}

/**
 * 更多聊天记录
 */
export const getInterrDetail = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }

    Object.assign(params, model)
    return Api.requestForm2('/api/news/getInterrDetailLimit', params)
        .then(res => res);
}


/**
 * 弃单
 */
export const doGiveup = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/giveupPre', params)
        .then(res => res);
}



/**
 * 找药
 */
export const requireDrugList = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/getInquireDrugsRecordsByKeywordHavingP', params)
        .then(res => res);
}


/**
* 找药修改 （备注）
*/
export const updateInquireDrugsRecords = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/updateInquireDrugsRecords', params)
        .then(res => res);
}


/**
* 发票物流 （发货）
*/
export const invoicedDeliver = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/invoicedDeliver', params)
        .then(res => res);
}



/**
* 发票物流 （确认收货）
*/
export const invoicedSignInByid = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/invoicedSignInByid', params)
        .then(res => res);
}




/**
* 撤回包裹 （确认收货）
*/
export const recallGood = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/ExpressSplit/cancelExpressSplit', params)
        .then(res => res);
}

/**
* 查看是否有最新处方或订单
*/
export const getYdkPrescriptionStatusNum = (model) => {
    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/getYdkPrescriptionStatusNum', params)
        .then(res => res);
}



/**
* 更新订单条数
*/
export const updateYdkPrescriptionStatusNum = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/updateYdkPrescriptionStatusNum', params)
        .then(res => res);

}



/**
* 新建处方时查患者列表
*/
export const findmemberlike = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/api/member/findmemberlike', params)
        .then(res => res);
}


/**
* 新增处方( 直接开方 )
*/
export const createphotoprescription = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/api/prefront/createphotoprescription', params)
        .then(res => res);
}
/**
 * 添加处方
* 选择患者的时候 查询患者默认收货地址
*/
export const getMenberdefaultaddress = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/address/defaultaddress', params)
        .then(res => res);
}

/**
 * 完善处方
* 即  编辑处方
*/
export const updatePre = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/updatePre', params)
        .then(res => res);
}


/**
*角色查权限
*/
export const getRolePermission = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/authority/getRolePermission', params)
        .then(res => res);
}


/**
*路径查权限
*/
export const getButtonPermission = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/authority/getButtonPermission', params)
        .then(res => res);
}



/**
*没有绑过的顾问
*/
export const getUndistributedAdviser = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/getUndistributedAdviser', params)
        .then(res => res);
}

/**
*组长绑定顾问 update
*/
export const directorDistributeAdviser = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/api/adviser/directorDistributeAdviser', params)
        .then(res => res);
}

/**
 * 验证身份证
 */
export const checkidcard = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId"),
        userId: sessionStorage.getItem("userId"),
    }
    Object.assign(params, model)
    return Api.requestForm2('/api/member/checkidcard', params)
        .then(res => res);
}

/**
 * 删除顾问关系
 */

export const deleteAdviserDirector = (model) => {
    
        let params = {
            token: sessionStorage.getItem("token"),
            userid: sessionStorage.getItem("userId"),
            userId: sessionStorage.getItem("userId"),
        }
        Object.assign(params, model)
        return Api.requestForm2('/api/adviser/deleteAdviserDirector', params)
            .then(res => res);
    }
    
/**
 * 查供应商
 */

export const getDrugPartner = (model) => {
    
        let params = {
            token: sessionStorage.getItem("token"),
            userid: sessionStorage.getItem("userId"),
            userId: sessionStorage.getItem("userId"),
        }
        Object.assign(params, model)
        return Api.requestForm2('/PYgenerate/getDrugPartner', params)
            .then(res => res);
    }
    
    
/**
 * 添加供应商
 */

export const addDrugPartner = (model) => {
    
        let params = {
            token: sessionStorage.getItem("token"),
            userid: sessionStorage.getItem("userId"),
            userId: sessionStorage.getItem("userId"),
        }
        Object.assign(params, model)
        return Api.requestForm2('/PYgenerate/addDrugPartner', params)
            .then(res => res);
    }
    