
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








//新加药 

export const addYdkDrugNew = (model) => {

    let params = {
        token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userId")
    }
    Object.assign(params, model)
    return Api.requestForm2('/PYgenerate/addYdkDrugNew', params)
        .then(res => res);
}





//新编辑药 

export const updateYdkDrugNew = (model) => {
    
        let params = {
            token: sessionStorage.getItem("token"),
            userid: sessionStorage.getItem("userId")
        }
        Object.assign(params, model)
        return Api.requestForm2('/PYgenerate/updateYdkDrugNew', params)
            .then(res => res);
    }
    