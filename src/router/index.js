import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Main from '@/components/Main'
import Portal from '@/components/Portal'
import PictureList from '@/components/common/PictureList'
import RefundAddress from '@/components/order/RefundAddress'
import sysuser from '@/components/sys/user'
import sysrole from '@/components/sys/role'
import changepassword from '@/components/sys/changepassword'





Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      component: Home,
      position: 'menu',
      menu_grade: 1,
      children: [
        {
          path: '/',
          icon: require('../assets/menu/首页.png'),
          select_icon: require('../assets/menu/首页 (1).png'),
          name: '主页',
          component: r => require.ensure([], () => r(require('@/components/index/index')))
        },
        {
          path: '/hospital',
          promissId: 'PER91c119290f1c401e8be4d02b3fc5a704',
          icon: require('../assets/menu/商店.png'),
          select_icon: require('../assets/menu/医院.png'),
          name: '医院管理',
          component: r => require.ensure([], () => r(require('@/components/hospital/hospital')))
        },
        {
          path: '/department',
          promissId: 'PER95260d386704485cb90824d0c439b146',
          icon: require('../assets/menu/全科.png'),
          select_icon: require('../assets/menu/科室.png'),
          name: '科室管理',
          component: r => require.ensure([], () => r(require('@/components/department/department')))
        },
        {
          path: '/doctor',
          promissId: 'PERb671c5710d24440094eb85b07f7a21c3',
          icon: require('../assets/menu/医生 (2).png'),
          select_icon: require('../assets/menu/医生 (1).png'),
          name: '医生管理',
          component: r => require.ensure([], () => r(require('@/components/doctor/doctor')))
        },
        {
          path: '/patient',
          promissId: 'PERc63031a20d12438299bddd0f339572ef',
          icon: require('../assets/menu/我的.png'),
          select_icon: require('../assets/menu/患者.png'),
          name: '患者管理',
          component: r => require.ensure([], () => r(require('@/components/patient/patient')))
        },
      ]
    },
    {
      path: '1',
      icon: require('../assets/menu/处方2.png'),
      select_icon: require('../assets/menu/处方.png'),
      name: '处方管理',
      component: Home,
      position: 'menu',
      menu_grade: 2,
      children: [
        {
          path: '/transmit',
          promissId: 'PERe43eed7612e84c32bec028cb27962e6e',
          name: '转方管理',
          component: r => require.ensure([], () => r(require('@/components/transmit/transmit')))
        },
        {
          path: '/audit',
          promissId: 'PER6beb4afa30674c8eb92bfc7e648ccd50',
          name: '审方管理',
          component: r => require.ensure([], () => r(require('@/components/audit/audit')))
        }]
    },
    {
      path: '2',
      icon: require('../assets/menu/订单.png'),
      select_icon: require('../assets/menu/订单 (1).png'),
      component: Home,
      position: 'menu',
      menu_grade: 2,
      name: '订单管理',
      children: [
        {
          path: '/reminder',
          promissId: 'PER20ff2e7848ed46e88b92127c8b8eadc3',
          name: '催单客服',
          component: r => require.ensure([], () => r(require('@/components/order/reminder')))
        },

        {
          path: '/afterorder',
          promissId: 'PER3e1f859d89ab40b589d402027ef8c526',
          name: '售后客服',
          component: r => require.ensure([], () => r(require('@/components/order/afterorder')))
        },
      ]
    },

    {
      path: '/',
      component: Home,
      position: 'menu',
      menu_grade: 1,
      children: [
        {
          path: '/consultant-manager',
          promissId: 'PER4c5ecb8c13c34a7195a0e8bdfa65991c',
          icon: require('../assets/menu/guwen.png'),
          select_icon: require('../assets/menu/guwen_select.png'),
          name: '顾问管理',
          component: r => require.ensure([], () => r(require('@/components/consultant/consultant')))
        },
      
      ]
    },

    {
      path: '3',
      icon: require('../assets/menu/处方2.png'),
      select_icon: require('../assets/menu/处方.png'),
      component: Home,
      position: 'menu',
      menu_grade: 2,
      name: '数据统计',
      children: [
        {
          path: '/consultant',
          promissId: 'PERa287380fb59c47b4928b1f91bec8cddd',
          name: '顾问数据',
          component: r => require.ensure([], () => r(require('@/components/consultant/consultant')))
        },
        {
          path: '/adviserdrug',
          promissId: 'PERb2b295741b414d6eabb05f88d846f15b',
          name: '药品数据',
          component: r => require.ensure([], () => r(require('@/components/consultant/adviserdrug')))
        },
        {
          path: '/doctordata',
          promissId: 'PER9162198b10f249ab98af0977af9b28e5',
          name: '医生数据',
          component: r => require.ensure([], () => r(require('@/components/consultant/doctordata')))
        },
      ]
    },
    {
      path: '4',
      icon: require('../assets/menu/账户 (2).png'),
      select_icon: require('../assets/menu/账户.png'),
      component: Home,
      position: 'menu',
      menu_grade: 2,
      name: '账户管理',
      children: [
        // {
        //   path: '/system',
        //   name: '权限',
        //   component: r => require.ensure([], () => r(require('@/components/system/system')))
        // },
        {
          path: '/department1',
          name: '部门管理',
          component: r => require.ensure([], () => r(require('@/components/system/department')))
        },
        {
          path: '/role',
          name: '职位管理',
          component: r => require.ensure([], () => r(require('@/components/system/role')))
        },
        {
          path: '/user',
          name: '用户管理',
          component: r => require.ensure([], () => r(require('@/components/system/user')))
        },
      ]
    },
    {
      path: '5',
      icon: require('../assets/menu/药丸 (1).png'),
      select_icon: require('../assets/menu/药丸.png'),
      component: Home,
      position: 'menu',
      menu_grade: 2,
      name: '药品管理',
      children: [
        {
          path: '/drug',
          promissId: 'PER128b6e20354e46bd9c5822cbb43c2656',
          name: '药品库管理',
          component: r => require.ensure([], () => r(require('@/components/drug/drug')))
        },
        {
          promissId: 'PERa09fba11fa164d088ca00b5e93643b3e',
          path: '/requiredrug',
          name: '找药管理',
          component: r => require.ensure([], () => r(require('@/components/drug/requiredrug')))
        },
      ]
    },
    {
      path: '/',
      component: Home,
      position: 'menu',
      menu_grade: 1,
      children: [
   


        {
          path: '/online',
          promissId: 'PER4807652e18e84b8993e4db1ca1274c3a',
          icon: require('../assets/menu/询问 (1).png'),
          select_icon: require('../assets/menu/咨询.png'),
          name: '在线咨询管理',
          component: r => require.ensure([], () => r(require('@/components/online/online')))
        },
      ]
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/address',
          name: 'address',
          component: r => require.ensure([], () => r(require('@/components/patient/address')))
        },
        {
          path: '/handleransmit',
          name: 'handleransmit',
          component: r => require.ensure([], () => r(require('@/components/transmit/handleransmit')))
        },
        {
          path: '/saveaudit',
          name: 'saveaudit',
          component: r => require.ensure([], () => r(require('@/components/audit/saveaudit')))
        },
        {
          path: '/updatepassword',
          name: 'updatepassword',
          component: r => require.ensure([], () => r(require('@/components/system/updatepassword')))
        },
        {
          path: '/drugcenter',
          name: 'drugcenter',
          component: r => require.ensure([], () => r(require('@/components/drug/drugcenter')))
        },
        {
          path: '/prescirptionOrderInfo',
          name: 'prescirptionOrderInfo',
          component: r => require.ensure([], () => r(require('@/components/common/prescirptionOrderInfo')))
        },
        

        { path: '/portal', component: Portal, name: '首页' },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: { path: '/login' }
    }

  ]
})
