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
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'index',
          component: r => require.ensure([], () => r(require('@/components/index/index')), 'index')
        },


        { path: '/portal', component: Portal, name: '首页' },
        {
          path: '/hospital',
          name: 'hospital',
          component: r => require.ensure([], () => r(require('@/components/hospital/hospital')), 'hospital')
        },
        {
          path: '/department',
          name: 'department',
          component: r => require.ensure([], () => r(require('@/components/department/department')), 'department')
        },
        {
          path: '/doctor',
          name: 'doctor',
          component: r => require.ensure([], () => r(require('@/components/doctor/doctor')), 'doctor')
        },
        {
          path: '/patient',
          name: 'patient',
          component: r => require.ensure([], () => r(require('@/components/patient/patient')), 'patient')
        },
        {
          path: '/transmit',
          name: 'transmit',
          component: r => require.ensure([], () => r(require('@/components/transmit/transmit')), 'transmit')
        },
        {
          path: '/audit',
          name: 'audit',
          component: r => require.ensure([], () => r(require('@/components/audit/audit')), 'audit')
        },
        {
          path: '/prescription',
          name: 'prescription',
          component: r => require.ensure([], () => r(require('@/components/prescription/prescription')), 'prescription')
        },
        {
          path: '/role',
          name: 'role',
          component: r => require.ensure([], () => r(require('@/components/system/role')), 'role')
        },
        {
          path: '/user',
          name: 'user',
          component: r => require.ensure([], () => r(require('@/components/system/user')), 'user')
        },
        {
          path: '/drug',
          name: 'drug',
          component: r => require.ensure([], () => r(require('@/components/drug/drug')), 'drug')
        },
        {
          path: '/department1',
          name: 'department1',
          component: r => require.ensure([], () => r(require('@/components/system/department')), 'department1')
        },
        {
          path: '/online',
          name: 'online',
          component: r => require.ensure([], () => r(require('@/components/online/online')), 'online')
        },
        {
          path: '/address',
          name: 'address',
          component: r => require.ensure([], () => r(require('@/components/patient/address')), 'address')
        },

        {
          path: '/handleransmit',
          name: 'handleransmit',
          component: r => require.ensure([], () => r(require('@/components/transmit/handleransmit')), 'handleransmit')
        },
        {
          path: '/saveaudit',
          name: 'saveaudit',
          component: r => require.ensure([], () => r(require('@/components/audit/saveaudit')), 'saveaudit')
        },

        {
          path: '/reminder',
          name: 'reminder',
          component: r => require.ensure([], () => r(require('@/components/order/reminder')), 'reminder')
        },
        
        {
          path: '/afterorder',
          name: 'afterorder',
          component: r => require.ensure([], () => r(require('@/components/order/afterorder')), 'afterorder')
        },
        {
          path: '/updatepassword',
          name: 'updatepassword',
          component: r => require.ensure([], () => r(require('@/components/system/updatepassword')), 'updatepassword')
        },

        {
          path: '/system',
          name: 'system',
          component: r => require.ensure([], () => r(require('@/components/system/system')), 'system')
        },

        
        {
          path: '/drugcenter',
          name: 'drugcenter',
          component: r => require.ensure([], () => r(require('@/components/drug/drugcenter')), 'drugcenter')
        },

             
        {
          path: '/consultant',
          name: 'consultant',
          component: r => require.ensure([], () => r(require('@/components/consultant/consultant')), 'consultant')
        },
            
        {
          path: '/doctordata',
          name: 'doctordata',
          component: r => require.ensure([], () => r(require('@/components/consultant/doctordata')), 'doctordata')
        },
        
        {
          path: '/adviserdrug',
          name: 'adviserdrug',
          component: r => require.ensure([], () => r(require('@/components/consultant/adviserdrug')), 'adviserdrug')
        },
      ]
    },

    {
      path: '*',
      redirect: { path: '/login' }
    }

  ]
})
