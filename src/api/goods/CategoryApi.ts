
import BaseApi from '../baseapi'
import ResponseObject from '../ResponseObject'



export default class CategoryApi extends BaseApi {

    responseObject: ResponseObject
 
    queryTree(params:Object) :Promise<ResponseObject> {

        params["merchantUserId"] =sessionStorage.getItem("userId")
        params["token"] =sessionStorage.getItem('token')
        return this.requestForm("/category/querytree", params).then(res => {

            return res;
        }).catch(error => {
            return error
        })

    
    
    };
    
    addCategory(params:Object) :Promise<ResponseObject> {

        params["merchantUserId"] =sessionStorage.getItem("userId")
        params["token"] =sessionStorage.getItem('token')
        return this.requestForm("/category/add", params).then(res => {

            return res;
        }).catch(error => {
            return error
        })

    
    
    };

    uploadCategory(params:Object) :Promise<ResponseObject> {

        params["merchantUserId"] =sessionStorage.getItem("userId")
        params["token"] =sessionStorage.getItem('token')
        return this.requestForm("/category/update", params).then(res => {

            return res;
        }).catch(error => {
            return error
        })

    
    
    };

    deleteCategory(params:Object) :Promise<ResponseObject> {

        params["merchantUserId"] =sessionStorage.getItem("userId")
        params["token"] =sessionStorage.getItem('token')
        return this.requestForm("/category/querytree", params).then(res => {

            return res;
        }).catch(error => {
            return error
        })

    
    
    };
  

}