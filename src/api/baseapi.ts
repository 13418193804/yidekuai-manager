
import axios from 'axios';
import querystring from 'querystring'
import ResponseObject from './ResponseObject'
import * as Config from './conf';


axios.interceptors.response.use(response => {
    // 系统报错
    if (response.data && response.data.err !== 0) {
        console.log('正常')
    }
    return response;
}, error => {
 
    if(!error.response){
        return Promise.resolve({
            data:{
                message:"网络连接失败，请检查网络。",
                status:404
            }
        })
    }
    return Promise.resolve(error.response)
})


export default class BaseApi{

    baseUrl:string=Config.g_base_url


    uploadFile(form:any):Promise<ResponseObject>{

        return axios.post(Config.g_upload_url, form,{
                                  method: 'post',
                                  headers: {'Content-Type': 'multipart/form-data'}
        })
        .then(res => {

            let  resp:ResponseObject = new ResponseObject()

            if(res.status!=200){
                console.error("http状态码错误")
                console.error(res)
                resp.returnCode=res.status
                resp.message=`http返回状态码错误，错误码是${res.status}`
                resp.data=res
                return resp;
            }else{

                if(res.data.status!=200){

                    console.error("请求代码正常，逻辑错误")
                    console.error(res);
                }

                resp.returnCode=res.data.status
                resp.message = res.data.message
                resp.data = res.data.data
                return resp

            }

        }).catch(error=>{

            let  resp:ResponseObject = new ResponseObject()


            let message=`requestForm 异常 u,error=${error}`
            console.error(message)

            resp.returnCode=500
            resp.message=message
            resp.data={}
            return resp;

         
        })

    }
   

    requestGet(path:string,params:Object):Promise<ResponseObject>{

        let apiUrl = `${this.baseUrl}/${path}`
        return axios.get(apiUrl).then(res=>{

            let  resp:ResponseObject = new ResponseObject()

            if(res.status!=200){

                resp.returnCode=res.status
                resp.message=`http返回状态码错误，错误码是${res.status}`
                resp.data=res
                return resp;
            }else{
                resp.returnCode=res.data.status
                resp.message = res.data.message
                resp.data = res.data.data
                return resp

            }

        }).catch(error=>{

            let  resp:ResponseObject = new ResponseObject()


            let message=`requestGet 异常 url=${apiUrl},error=${error}`
            console.error(message)

            resp.returnCode=500
            resp.message=message
            resp.data={}
            return resp;

         
        })


    }


    

    requestFormUrl(path:string,params:Object):Promise<ResponseObject>{

    
        return axios.post(path,
                querystring.stringify(params), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
            .then(res => {
                let  resp:ResponseObject = new ResponseObject()
                if(res.status!=200){


                    console.error("http状态码错误")
                    console.error(res)
    
                    resp.returnCode=res.status
                    resp.message=`http返回状态码错误，错误码是${res.status},请求参数是 ${params}`
                    resp.data=res
                    return resp;
                }else{

                    if(res.data.status!=200){

                        console.error("请求代码正常，逻辑错误")
                        console.error(res);
                    }
    
                    resp.returnCode=res.data.code
                    resp.message = res.data.message
                    resp.data = res.data.data
                    return resp
    
                }
    
            }).catch(error=>{
    
                let  resp:ResponseObject = new ResponseObject()
    
    
                let message=`requestForm 异常 url=${path},error=${error},params=${params}`
                console.error(message)
    
                resp.returnCode=500
                resp.message=message
                resp.data={}
                return resp;
    
             
            })
    
    
            
    }
  


    requestForm(path:string,params:Object):Promise<ResponseObject>{

        let apiUrl = `${this.baseUrl}${path}`
  
        return axios.post(apiUrl,
                querystring.stringify(params), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
            .then(res => {

                
                let  resp:ResponseObject = new ResponseObject()

                if(res.status!=200){

                    

                    console.error("http状态码错误")
                    console.error(res)
    
                    resp.returnCode=res.status
                    resp.message=`http返回状态码错误，错误码是${res.status},请求参数是 ${params}`
                    resp.data=res
                    return resp;
                }else{
                    if (res.data.status == 400) {
                        window['myvue'].$router.replace('/login');
                        return resp;
                    }
                    if(res.data.status!=200){

                        console.error("请求代码正常，逻辑错误")
                        console.error(res);
                    }
    
                    resp.returnCode=res.data.status
                    resp.message = res.data.message
                    resp.data = res.data.data
                    return resp
    
                }
    
            }).catch(error=>{
    
                let  resp:ResponseObject = new ResponseObject()
    
    
                let message=`requestForm 异常 url=${apiUrl},error=${error},params=${params}`
                console.error(message)
    
                resp.returnCode=500
                resp.message=message
                resp.data={}
                return resp;
    
             
            })
    
    
            
    }
    

  
    requestBody(path:string,params:Object){




    }



}