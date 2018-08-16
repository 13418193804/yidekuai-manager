
import BaseApi from '../baseapi'
import ResponseObject from '../ResponseObject'



export default class GoodsApi extends BaseApi {

    responseObject: ResponseObject

    addGoods(params: Object): Promise<ResponseObject> {

        params["merchantUserId"] = sessionStorage.getItem("userId")
        params["token"] = sessionStorage.getItem('token')

        return this.requestForm("/goods/manager/add", params).then(res => {

            return res;
        }).catch(error => {
            return error
        })


    }


    getGoods(goodsId: string): Promise<ResponseObject> {
        return this.requestGet("/goods/info/query?goodsId=" + goodsId, '').then(res => {

            return res;
        }).catch(error => {
            return error
        })


    }


    updateGoods(params: Object): Promise<ResponseObject> {


        params["merchantUserId"] = sessionStorage.getItem("userId")
        params["token"] = sessionStorage.getItem('token')

        return this.requestForm("/goods/manager/update", params).then(res => {

            return res;
        }).catch(error => {
            return error
        })





    }

    updateGoodsDetail(goodsId: string, content: string): Promise<ResponseObject> {

        let params = {
            goodsId: goodsId,
            content: content
        }

        return this.requestForm("/goods/detail/update", params).then(res => {

            return res;
        }).catch(error => {
            return error
        })


    }

    getGoodsDetail(goodsId: string): Promise<ResponseObject> {
        return this.requestGet("/goods/detail/query?goodsId=" + goodsId, '').then(res => {
            return res;
        }).catch(error => {
            return error
        })


    }


    queryGoods(params: Object, page: number, pageSize: number, goodsStatus: number,nameOrCode,catId:string): Promise<ResponseObject> {

        params["merchantUserId"] = sessionStorage.getItem("userId")
        params["token"] = sessionStorage.getItem('token')
        params["page"] = page
        params["goodsStatus"] = goodsStatus
        params["catId"] = catId
        if (pageSize > 0) {
            params["pageSize"] = pageSize
        }
        params['nameOrCode'] =nameOrCode
        return this.requestForm("/goods/manager/query", params).then(res => {

            return res;
        }).catch(error => {
            return error
        })


    }

    requestQueryTree(params: Object): Promise<ResponseObject> {

        params["merchantUserId"] = sessionStorage.getItem("userId")
        params["token"] = sessionStorage.getItem('token')
        return this.requestForm("/category/querytree", params).then(res => {

            return res;
        }).catch(error => {
            return error
        })



    };


    changeGoodsStatus(params: Object): Promise<ResponseObject> {
        params["merchantUserId"] = sessionStorage.getItem("userId")
        params["token"] = sessionStorage.getItem('token')


        return this.requestForm("/goods/manager/updatestatus", params).then(res => {

            return res;
        }).catch(error => {
            return error
        })



    };

}