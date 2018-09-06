 
// export const g_base_url ='http://61.144.84.19:8032/api/'
// export const g_upload_url='http://61.144.84.19:8032/api//fileupload'



//export const g_base_url ='https://mapp.aisimob.com/tfj/'
//export const g_upload_url='https://mapp.aisimob.com/tfj/fileupload'

// export const g_base_url ='https://mapp.aisimob.com/yidekuai'
// export const g_upload_url='https://mapp.aisimob.com/yidekuai/fileupload'

// export const g_base_url ='https://m.yourhr.com.cn/zhongyi'
// export const g_upload_url='https://m.yourhr.com.cn/zhongyi/fileupload'

import Vue from 'vue';
 const manager:any = "manager";
// manager
export const g_base_url =  manager == 'test'?'http://203.195.236.254:8886/yidekuai':'https://aip.yidefine.com/yidekuai'
export const g_upload_url= manager == 'test'?'http://203.195.236.254:8886/yidekuai/fileupload':'https://aip.yidefine.com/yidekuai/fileupload'
export const g_news_url=   manager == 'test'?'http://203.195.236.254:8886/yidekuai/api/news':'https://aip.yidefine.com/yidekuai/api/news'
Vue.prototype.ydkManager = manager;
// export const g_base_url =manager == 'test'?'http://192.168.1.136:8886/yidekuai':'https://aip.yidefine.com/yidekuai'
// export const g_upload_url=manager == 'test'?'http://192.168.1.136:8886/yidekuai/fileupload':'https://aip.yidefine.com/yidekuai/fileupload'
// export const g_news_url=manager == 'test'?'http://192.168.1.136:8886/yidekuai/api/news':'https://aip.yidefine.com/yidekuai/api/news'


// export const g_base_url ='https://aip.yidefine.com/yidekuai'
// export const g_upload_url='https://aip.yidefine.com/yidekuai/fileupload'
// export const g_news_url='https://aip.yidefine.com/yidekuai/api/news'

// export const g_base_url ='https://hero.gzspark.net:9090'
// export const g_upload_url='https://hero.gzspark.net:9090/fileupload'

// export const g_base_url ='http://127.0.0.1:9090'
// export const g_upload_url='http://127.0.0.1:9090/fileupload'
