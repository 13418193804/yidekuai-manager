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




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
