import axios from 'axios';
import Vue from 'vue';

import * as Config from './conf';
import querystring from 'querystring';
let base = Config.g_base_url;
let upload = Config.g_upload_url;
axios.defaults.timeout =  120000;
let node_base = Config.g_node_url

//let base = 'http://127.0.0.1:9090';
// let base ='http://127.0.0.1:9090/';

// export const g_upload_url = Config.g_upload_url

export const requestLogin = params => { return axios.post(`/login`, params).then(res => res.data); };
export const requestCommon = (sql) => {
    return axios.post(`${base}/dict/commsql`,
        querystring.stringify({
            sql: sql
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(res => res)
        .catch(error => error);

};

export const requestBody = (url, body) => {




    return axios.post(`${base}${url}`, body
    )
        .then(res => res)
        .catch(error => error);

};


export const requestForm = (urlPath, params) => {
    return axios.post(`${base}${urlPath}`,
        querystring.stringify(params), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(res => res)
        .catch(error => error);
};


export const preViewApi = (presId)=>{
    window.open(`${node_base}/getpicture?presId=${presId}`)
}


export const requestForm2 = Vue.prototype.ydkManager=='test'? (urlPath, params) => {

    return axios.post(`${base}${urlPath}`,
        querystring.stringify(params), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(res => {
            if (res.status != 200) {
                // console.log(`响应请求:${urlPath}`,{
                //     reqUrl :`${base}${urlPath}`,
                //     params:params,
                //     httpStatus:res.status,
                // })
                return {
                    retCode: false,
                    message: "网络数据异常",
                    data: {}
                }
            }
            
            // console.log(`响应请求:${urlPath}`,{
            //     reqUrl :`${base}${urlPath}`,
            //     params:params,
            //     httpStatus:res.status,
            //     resStatus:res.data.status,
            //     message:`响应信息:${res.data.message}`
            // })

            if (res.data.status != 200) {

                if (res.data.status ==401 && res.data.message =="用户没有登录，请先登录") {
                    window['myvue'].$router.replace('/login');
                    return {
                        retCode: false,
                        islogin:true,
                        message: res.data.message
                    };
                }
                return {
                    retCode: false,
                    message: res.data.message,
                    data: {}
                }

            }
            return { retCode: true, message: '', data: res.data.data }
        })
        .catch(error => {
                // console.log(`捕捉错误:${urlPath}`,{
                //     reqUrl :`${base}${urlPath}`,
                //     params:params,
                //     error:error
                // })
            return {
                retCode: false,
                message: `网络请求异常 请求路径 ${urlPath},错误信息 ${error}`,
                data: {}
            }
        });
}:(urlPath, params) => {
        return axios.post(`${base}${urlPath}`,
            querystring.stringify(params), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(res => {
                if (res.status != 200) {
                    return {
                        retCode: false,
                        message: "网络数据异常",
                        data: {}
                    }
                }
                if (res.data.status != 200) {
                    if (res.data.status ==401 && res.data.message =="用户没有登录，请先登录") {
                        window['myvue'].$router.replace('/login');
                        return {
                            retCode: false,
                            islogin:true,
                            message: res.data.message
                        };
                    }
                    return {
                        retCode: false,
                        message: res.data.message,
                        data: {}
                    }
                }
                return { retCode: true, message: '', data: res.data.data }
            })
            .catch(error => {
                return {
                    retCode: false,
                    message: `网络请求异常 请求路径 ${urlPath},错误信息 ${error}`,
                    data: {}
                }
            });
    }


export const requestGet = (urlPath) => {



    console.log("enter get ")
    return axios.get(`${base}${urlPath}`)
        .then(res => res)
        .catch(error => error);

};

export const requestGoodsDetail = (goodsId) => {

    return requestGet('/goods/info/query?goodsId=' + goodsId)
        .then(res => {
            if (res.status == 200 && res.data.status == 200) {

                return { retCode: true, message: '', data: res.data.data }
            } else {
                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
                    ;

            }


        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });




};


export const requestSkuItemDetail = (goodsId, skuId) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem('userId'),
        goodsId: goodsId,
        skuId: skuId
    }

    return requestForm('/goods/sku/queryskuitem', data)
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

            console.error("requestSkuItemDetail")
            console.error(error)


        });




};

export const requestUpdateSkuItem = (data) => {

    data.token = sessionStorage.getItem('token');
    data.merchantUserId = sessionStorage.getItem("userId");



    return requestForm('/goods/sku/updateSkuItem', data)
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

            console.error("requestSkuItemDetail")
            console.error(error)


        });




};


export const requestGoodsInfoDetail = (goodsId) => {

    return requestGet('/goods/detail/query?goodsId=' + goodsId)
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

            console.error("requestGoodsInfoDetail")
            console.error(error)


        });




};


export const requestAddGoods = (goods) => {
    console.log('good', goods)
    goods.merchantUserId = sessionStorage.getItem("userId");
    goods.token = sessionStorage.getItem('token');
    return requestForm('/goods/manager/add', goods)
        .then(res => {
            console.log("xxxx")
            console.log(res)
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

            console.error("requestAddGoods")
            console.error(error)


        });



};

export const requestUpdateGoods = (goods) => {
    goods.merchantUserId = sessionStorage.getItem("userId");
    goods.token = sessionStorage.getItem('token');

    return requestForm('/goods/manager/update', goods)
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

            console.error("requestAddGoods")
            console.error(error)


        });


};

export const requestDeleteSkuKey = (goodsId, keyId) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem("userId"),
        goodsId: goodsId,
        attrId: keyId
    }

    return requestForm('/goods/sku/deleteskuvkey', data)
        .then(res => {
            console.log("xxxx")
            console.log(res)
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

            console.error("requestAddGoods")
            console.error(error)

            return {
                retCode: false,
                message: error,
                data: {}
            }



        });


};


export const requestUpdateGoodsDetail = (goodsId, content) => {

    let data = {
        goodsId: goodsId,
        content: content
    }
    return requestForm('/goods/detail/update', data)
        .then(res => {
            console.log(res)
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

            }


        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });




};


export const requestDeleteGoods = (goodsId) => {

    return requestForm('/goods/manager/delete', { goodsId: goodsId, token: sessionStorage.getItem('token'), merchantUserId: sessionStorage.getItem("userId") })
        .then(res => {
            console.log(res)
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

            console.error("requestAddGoods")
            console.error(error)


        });




};


export const requestOnlineGoods = (goodsId, onlineStatus) => {


    let data = {
        goodsIds: goodsId,
        online: onlineStatus,
        merchantUserId: sessionStorage.getItem("userId"),
        token: sessionStorage.getItem('token')
    }


    return requestForm('/goods/manager/online', data)
        .then(res => {
            console.log(res)
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

            console.error("requestAddGoods")
            console.error(error)


        });




};



export const uploadFile = (form) => {

    //https://mapp.aisimob.com/tfj/multiupload


    return axios.post(upload, form, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then(response => response)
        .catch(error => error);
};


export const requestAddSku = (data) => {


    return requestBody('/goods/sku/renewsku', data)
        .then(res => {
            console.log(res)
            if (res.status == 200 && res.data.status == 200) {

                return { retCode: true, message: '', data: res.data.data }
            } else {

                console.log(res.data)

                console.log(res.data.message)
                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                };

            }


        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });




};
export const requestAddSkuKey = (goodsId, attrName, valueName) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem('userId'),
        goodsId: goodsId,
        attrName: attrName,
        valueName: valueName
    }


    return requestForm('/goods/sku/addskukey', data)
        .then(res => {
            console.log(res)
            if (res.status == 200 && res.data.status == 200) {

                return { retCode: true, message: '', data: res.data.data }
            } else {

                console.log(res.data)

                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }


            }


        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });




};

export const requestAddSkuValue = (goodsId, attrId, attrValue) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem('userId'),
        goodsId: goodsId,
        attrId: attrId,
        keyValue: attrValue
    }


    return requestForm('/goods/sku/addskuvalue', data)
        .then(res => {
            console.log(res)
            if (res.status == 200 && res.data.status == 200) {

                return { retCode: true, message: '', data: res.data.data }
            } else {

                console.log(res.data)

                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }


            }


        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });




};
export const requestDeleteSkuValue = (goodsId, attrId, valueId) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem('userId'),
        goodsId: goodsId,
        attrId: attrId,
        valueId: valueId
    }


    return requestForm('/goods/sku/deleteskuvkeyvalue', data)
        .then(res => {
            console.log(res)
            if (res.status == 200 && res.data.status == 200) {

                return { retCode: true, message: '', data: res.data.data }
            } else {

                console.log(res.data)

                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }


            }


        })
        .catch(error => {

            console.error("requestDeleteSkuValue")
            console.error(error)


        });




};

export const requestDeleteSkuItem = (goodsId, skuId) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem('userId'),
        goodsId: goodsId,
        skuId: skuId
    }


    return requestForm('/goods/sku/deleteskuitem', data)
        .then(res => {
            console.log(res)
            if (res.status == 200 && res.data.status == 200) {

                return { retCode: true, message: '', data: res.data.data }
            } else {

                console.log(res.data)

                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }


            }


        })
        .catch(error => {

            console.error("requestDeleteSkuValue")
            console.error(error)


        });

};


export const requestAddSkuItem = (goodsId, data) => {



    let token = sessionStorage.getItem('token');
    let merchantUserId = sessionStorage.getItem('userId');

    let url = `/goods/sku/addskuitem?token=${token}&merchantUserId=${merchantUserId}&goodsId=${goodsId}`
    return requestBody(url, data)
        .then(res => {
            console.log(res)
            if (res.status == 200 && res.data.status == 200) {

                return { retCode: true, message: '', data: res.data.data }
            } else {

                console.log(res.data)

                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }


            }


        })
        .catch(error => {

            console.error("requestDeleteSkuValue")
            console.error(error)


        });




};




export const requestSkuDetail = (goodsId) => {



    return requestForm('/goods/sku/querySku', { token: sessionStorage.getItem('token'), merchantUserId: sessionStorage.getItem("userId"), goodsId: goodsId })
        .then(res => {
            console.log(res)
            if (res.status == 200 && res.data.status == 200) {

                return { retCode: true, message: '', data: res.data.data }
            } else {

                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
                    ;

            }


        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)
        });
};



export const requestQueryGoods = (params) => {

    params.token = sessionStorage.getItem('token')


    params.merchantUserId = sessionStorage.getItem("userId")



    return requestForm('/goods/manager/query', params)
        .then(res => {
            console.log(res)
            if (res.status == 200 && res.data.status == 200) {

                return {
                    retCode: true,
                    message: '',
                    data: res.data.data.goodsList,
                    page: res.data.data.page
                }
            } else {


                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
                    ;
            }


        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });
}


export const requestQueryGoodsByCat = (catId, page, pageSize) => {

    let params = {}

    params['merchantUserId'] = sessionStorage.getItem("userId")
    params['token'] = sessionStorage.getItem("token")
    params['catId'] = catId
    params['page'] = page
    params['pageSize'] = pageSize
    return requestForm('/cat/goods/query', params)
        .then(res => {
            if (res.status == 200 && res.data.status == 200) {
                console.log(111)
                let count = {
                    retCode: true,
                    message: '',
                    data: res.data.data,
                    page: res.data.data.page
                }
                console.log(count)

                return count
            } else {


                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
                    ;
            }


        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });
}

export const requestQueryTree = (type) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem("userId"),
        type: type
    }
    return requestForm('/category/querytree', data)
        .then(res => {
            if (res.status == 200 && res.data.status == 200) {
                return { retCode: true, message: '', data: res.data.data }
            } else {


                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
                    ;

            }
        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });



};

export const requestAddCat = (name, iconname, catIcon, parentId, catType) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem("userId"),
        catName: name,
        catIcon: catIcon,
        parentId: parentId,
        catType: catType
    }
    return requestForm('/category/add', data)
        .then(res => {
            if (res.status == 200 && res.data.status == 200) {
                return { retCode: true, message: '', data: res.data.data }
            } else {


                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
                    ;

            }
        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });



};

export const requestEditCat = (catId, name, catIcon, catType) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem("userId"),
        catName: name,
        catId: catId,
        catIcon: catIcon,
        catType: catType
    }
    return requestForm('/category/update', data)
        .then(res => {
            if (res.status == 200 && res.data.status == 200) {
                return { retCode: true, message: '', data: res.data.data }
            } else {


                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
                    ;

            }
        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });



};


export const requestDeleteCat = (catId) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem("userId"),
        catId: catId,
    }
    return requestForm('/category/delete', data)
        .then(res => {
            if (res.status == 200 && res.data.status == 200) {
                return { retCode: true, message: '', data: res.data.data }
            } else {


                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
                    ;

            }
        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });



};

export const sortCatgory = (params) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem("userId"),
    }
    Object.assign(data, params);

    return requestForm('/category/sort', data)
        .then(res => {
            if (res.status == 200 && res.data.status == 200) {
                return { retCode: true, message: '', data: res.data.data }
            } else {


                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
            }
        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)
        });
};

export const sortProduct = (params) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem("userId"),
    }
    Object.assign(data, params);

    return requestForm('/cat/goods/sort', data)
        .then(res => {
            if (res.status == 200 && res.data.status == 200) {
                return { retCode: true, message: '', data: res.data.data }
            } else {


                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
            }
        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)
        });
};

export const requestParenttCat = (catId) => {

    let data = {
        token: sessionStorage.getItem('token'),
        merchantUserId: sessionStorage.getItem("userId"),
        catId: catId,
    }
    return requestForm('/category/queryparenttree', data)
        .then(res => {
            if (res.status == 200 && res.data.status == 200) {
                return { retCode: true, message: '', data: res.data.data }
            } else {


                return {
                    retCode: false,
                    message: res.data.message,
                    data: res.data.data
                }
                    ;

            }
        })
        .catch(error => {

            console.error("requestAddGoods")
            console.error(error)


        });



};


export const doConfirm = (self, message) => {
    return self.$confirm(message, '注意', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
    }).
        then((res) => {

            return true;


        }).catch(error => {

            return false;



        });






}


