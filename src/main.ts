// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Component from 'vue-class-component'
// import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// Vue.use(VueQuillEditor, /* { default global options } */)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'typeface-roboto'

Vue.use(ElementUI);
Vue.config.productionTip = false

setTimeout(() => {
  document.title = "医德快管理系统"
}, 1500)
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
])

//日志
router.beforeEach((to, from, next) => {
  console.log(`跳转页面提示:${to.name};当前地址:${window.location.origin}#${to.path}`)
  next()
})


//权限
Vue.prototype.PermissionList = sessionStorage.PermissionList ? sessionStorage.PermissionList.split(',') : [];
Vue.prototype.dohavePermission = PermissionItem => {
  if (sessionStorage.roleAdmin == 'centerroleAdminFormIdTextYIDEKUAI') {
    return true;
  }

  let a = Vue.prototype.PermissionList.filter((items, indexs) => {
    return items == PermissionItem;
  });

  if (a.length > 0) {
    return true;
  } else {
    return false;
  }
  // return true
};


// 注册一个全局自定义指令 `v-bouncing` 用于加载时
/**
        * .el-loading-mask {
        * position: absolute;
        * z-index: 2000;
        * background-color: rgba(255,255,255,.9);
        * margin: 0;
        * top: 0;
        * right: 0;
        * bottom: 0;
        * left: 0;
        * -webkit-transition: opacity .3s;
        *  transition: opacity .3s;
        * }
        */

        // v-bouncing 不可用在子组件template下的首级div
Vue.directive('bouncing', {
  bind: function (el, binding) {
    let bouncing_loader = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    bouncing_loader.className = 'flex  flex-align-center flex-pack-center el-loading-mask bouncing-loader ';
    bouncing_loader.appendChild(div1);
    bouncing_loader.appendChild(div2);
    bouncing_loader.appendChild(div3);
    el.appendChild(bouncing_loader)

  },
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding) {
    // el.style.opacity = binding.value?'0.2':'1'
  },
  update: function (el, binding) {
  },
  componentUpdated: function (el, binding) {

    if (!el.getElementsByClassName('bouncing-loader')[0]) {
      let bouncing_loader = document.createElement("div");
      let div1 = document.createElement("div");
      let div2 = document.createElement("div");
      let div3 = document.createElement("div");
      bouncing_loader.className = 'flex  flex-align-center flex-pack-center el-loading-mask bouncing-loader ';
      bouncing_loader.appendChild(div1);
      bouncing_loader.appendChild(div2);
      bouncing_loader.appendChild(div3);
      el.appendChild(bouncing_loader)
    }

    let bouncing_loader = el.getElementsByClassName('bouncing-loader')[0]

 let loader =  ()=>{
    if (binding.value) {
     
      if( el.className.indexOf('bouncing-position')===-1){
        el.className += ' bouncing-position'
      }
      if(bouncing_loader.className.indexOf('bouncing-none') !== -1){
        bouncing_loader.className = bouncing_loader.className.replace('bouncing-none', '').trim()
      }
    } else{
      bouncing_loader.className += ' bouncing-none'
      if(bouncing_loader.className.indexOf('bouncing-none') !== -1){
        el.className = el.className.replace('bouncing-position', '').trim()
      }
    
    }
   }
    loader();
  },
  unbind: function (el, binding) {

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
