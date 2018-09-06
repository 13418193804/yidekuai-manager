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
          promissId: 'PER3ca7dae514ae42e9b37658ee48ef9165',
          icon: require('../assets/menu/商店.png'),
          select_icon: require('../assets/menu/医院.png'),
          name: '医院管理',
          component: r => require.ensure([], () => r(require('@/components/hospital/hospital')))
        },
        {
          path: '/department',
          promissId: 'PERc351e16134a645c0a4ef1ca0f2aab418',
          icon: require('../assets/menu/全科.png'),
          select_icon: require('../assets/menu/科室.png'),
          name: '科室管理',
          component: r => require.ensure([], () => r(require('@/components/department/department')))
        },
        {
          path: '/doctor',
          promissId: 'PER713760ecaf194ac7928b703eda25a119',
          icon: require('../assets/menu/医生 (2).png'),
          select_icon: require('../assets/menu/医生 (1).png'),
          name: '医生管理',
          component: r => require.ensure([], () => r(require('@/components/doctor/doctor')))
        },
        {
          path: '/patient',
          promissId: 'PER3ffb4a78d039460ba2e5637c6bfbfea7',
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
          promissId: 'PER71e6d509dd0c42a39603c381fd855f33',
          name: '转方管理',
          component: r => require.ensure([], () => r(require('@/components/transmit/transmit')))
        },
        {
          path: '/audit',
          promissId: 'PER7bc70b8eb9fe496f876ba8ee7c5ec841',
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
          promissId: 'PER79bc93beb8a44e8bb3c82d1a1a4771f6',
          name: '催单客服',
          component: r => require.ensure([], () => r(require('@/components/order/reminder')))
        },

        {
          path: '/afterorder',
          promissId: 'PERe9d8deb13d6641d4aeaf062588e28412',
          name: '售后客服',
          component: r => require.ensure([], () => r(require('@/components/order/afterorder')))
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
      name: '顾问管理',
      children: [
        {
          path: '/consultant',
          promissId: 'PERe23db0fb4a70444389e26ce3dc899da6',
          name: '顾问数据',
          component: r => require.ensure([], () => r(require('@/components/consultant/consultant')))
        },
        {
          path: '/adviserdrug',
          promissId: 'PERd710cce272da4a8c8c39aabcfa635e60',
          name: '药品数据',
          component: r => require.ensure([], () => r(require('@/components/consultant/adviserdrug')))
        },
        {
          path: '/doctordata',
          promissId: 'PER2d8b2d474b274da4b7c0a4d8d4a23b5c',
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
          promissId: 'PERecc2af8eb68a48fcb68bbc782bab1554',
          name: '药品库管理',
          component: r => require.ensure([], () => r(require('@/components/drug/drug')))
        },
        {
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
        // {
        //   path: '/drug',
        //   promissId: 'PERecc2af8eb68a48fcb68bbc782bab1554',
        //   icon: require('../assets/menu/药丸 (1).png'),
        //   select_icon: require('../assets/menu/药丸.png'),
        //   name: '药品库管理',
        //   component: r => require.ensure([], () => r(require('@/components/drug/drug')))
        // },
        // {
        //   path: '/requiredrug',
        //   name: '找药管理',
        //   component: r => require.ensure([], () => r(require('@/components/drug/requiredrug')))
        // },



        {
          path: '/online',
          promissId: 'PER296d2b20d79c4601bad1408e09f687b6',
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
