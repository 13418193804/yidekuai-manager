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
import './common/js/bouncing'
import * as indexApi from  './api/indexApi'

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
  if(sessionStorage.roleAdmin == 'centerroleAdminFormIdTextYIDEKUAI'){
    next()
  }else{
    indexApi.getButtonPermission({
      url: to.path
    }).then(res => {
      if (res["retCode"]) {
        Object.assign(to.meta, res['data'].ButtonPermissionHashMap)  
      } 
    });
    next()
  }
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




// 权限指令
/**
 *  v-promiss
 *  .edit 编辑权限
 *  任何区域指定指令将会根据权限判断是否显示
 * 
 */
Vue.directive('promiss', {
  bind: function (el, binding) {
    if(sessionStorage.roleAdmin == 'centerroleAdminFormIdTextYIDEKUAI'){
      return
    }
    for (let n in binding.modifiers) {
      if (!router.app._route.meta[n]) {
        el.style.display = 'none';
      }
    }
  },
  update: function (el, binding) {

  },
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding) {

  },
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  componentUpdated: function (el, binding) {

  }

})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
