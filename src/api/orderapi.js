import axios from 'axios';

import * as Config from './conf';


import * as Api from './api';

let base = Config.g_base_url;


export const requestOrderList = (params) => {

    params.token = sessionStorage.getItem("token")
    params.merchantUserId = sessionStorage.getItem("userId")


    return Api.requestForm2('/order/manager/queryorder', params)
        .then(res => res);

};

export const querytransport = (com, nu) => {



    return Api.requestForm2('/transport/info', {
        com: com,
        nu: nu
    })
        .then(res => res);

};

export const requestOrderDetail = (orderId) => {

    let data = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        orderId: orderId
    }

    return Api.requestForm('/order/manager/queryorderdetail', data)
        .then(res => {
            if (res.status == 200 && res.data.status == 200) {

                return { retCode: true, message: '', data: res.data.data }
            } else {

                console.log(res.data)

                console.log(res.data.message)
                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
                    ;

            }

        })
        .catch(error => {

            console.error("requestOrderList")
            console.error(error)


        });


};
export const queryTransport = () => {



    return Api.requestForm2('/transport/cominfo')
        .then(res => res)

};
export const requestSendGoods = (orderId, transName, transCode, transNo, transMobile) => {

    let data = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        orderId: orderId,
        transName: transName,
        transCode: transCode,
        transMobile: transMobile,
        transNo: transNo
    }

    return Api.requestForm2('/order/manager/sendgoods', data)
        .then(res => res)

};

export const requestCancelOrder = (orderId) => {

    let data = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        orderId: orderId
    }

    return Api.requestForm2('/order/manager/cancel', data)
        .then(res => res)

};


export const acceptRefund = (refundId, addressId, remark) => {

    let data = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        refundId: refundId,
        addressId: addressId,
        remark: remark
    }
    return Api.requestForm2('/order/refund/accept', data)
        .then(res => res)
};
export const refuseRefund = (refundId, remark) => {
    let data = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        refundId: refundId,
        remark: remark
    }
    return Api.requestForm2('/order/refund/refuse', data)
        .then(res => res)
};
export const recvgoodsRefund = (refundId) => {
    let data = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        refundId: refundId
    }
    return Api.requestForm2('/order/refund/recvgoods', data)
        .then(res => res)
};



export const queryAddress = (userId,page,pageSize) => {
    let data = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        userId:userId,
        memberid:userId,
        page:page,
        pageSize:pageSize
    }
    return Api.requestForm2('/address/list', data)
        .then(res => res)
};


export const deleteAddress = (addressId,userId) => {
    let data = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        addressId: addressId,
        userId:userId
    }
    return Api.requestForm2('/address/delete', data)
        .then(res => res)
};
export const setDefault = (addressId,userId) => {
    let data = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        addressId: addressId,
        userId:userId
    }
    return Api.requestForm2('/address/setdefault', data)
        .then(res => res)
};

export const queryProvinceList = () => {
   
    return Api.requestForm2('/address/queryprovince')
        .then(res => res)
};

export const queryCityList = (provinceId) => {
    
     return Api.requestForm2('/address/querycity',{
        provinceId:provinceId
     })
         .then(res => res)
 };
 export const queryCountryList = (cityId) => {
      return Api.requestForm2('/address/querycountry',{
        cityId:cityId
      })
          .then(res => res)
  };
  export const doAddAddress = (data) => {

        data['token'] = sessionStorage.getItem("token"),
        data['merchantUserId'] =  sessionStorage.getItem("userId")
        data['isDefault'] = data['isDefault']?1:0; 
        
        return Api.requestForm2('/address/add',data)
        .then(res => res)
};


export const doUpdateAddress = (data) => {
    data['token'] = sessionStorage.getItem("token"),
    data['merchantUserId'] =  sessionStorage.getItem("userId")
    data['isDefault'] = data['isDefault']?1:0; 
    return Api.requestForm2('/address/update',data)
    .then(res => res)
};
export const queryComment = (orderDetailId) => {
    
    return Api.requestForm2('/comment/query',{orderDetailId:orderDetailId})
    .then(res => res)
};
export const checkComment = (commentIds,checkStatus) => {
  
    let params = {
        token: sessionStorage.getItem("token"),
        merchantUserId: sessionStorage.getItem("userId"),
        commentIds:commentIds,
        checkStatus:checkStatus
    }


    return Api.requestForm2('/comment/update',params)
    .then(res => res)
};

export const dohaveOrder = () => {
    
      let params = {
          token: sessionStorage.getItem("token"),
          merchantUserId: sessionStorage.getItem("userId"),
      }
  
  
      return Api.requestForm2('/hint/list',params)
      .then(res => res)
  };



