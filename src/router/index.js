import Vue from 'vue'
import Router from 'vue-router'
import tutorial from '@/views/backstage/tutorial/tutorial'
import approve from '@/views/backstage/approve/approve'
import login from '@/views/login/login'
import member_approve from '@/views/backstage/approve/approves/member_approve'
import chairman_approve from '@/views/backstage/approve/approves/chairman_approve'
import leader_approve from '@/views/backstage/approve/approves/leader_approve'
import secretary_approve from '@/views/backstage/approve/approves/secretary_approve'

Vue.use(Router)

//解决编程式路由往同一地址跳转时会报错的情况
const originalReplace = Router.prototype.replace;
//replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'SHULogin',
      component: resolve=>require(['@/views/login/oauth'],resolve)
    },
    {
      path: '/login',
      name: 'login',
      // Vue 路由按需加载(路由懒加载)
      component: resolve=>require(['@/views/login/login'],resolve)
    },
    {
      path: '/backstage',
      name: 'backstage',
      component: resolve=>require(['@/views/backstage/bg'],resolve),
      redirect:{name:'tutorial'},
      children: [
      {
        path: 'permissionAssignment',
        name: 'permissionAssignment',
        component: resolve=>require(['@/views/backstage/permissionAssignment/permissionAssignment'],resolve)
      },
      {
        path: 'tutorial',
        name:'tutorial',
        component: resolve=>require(['@/views/backstage/tutorial/tutorial'],resolve)
      },
      {
        path: 'application',
        name:'application',
        component: resolve=>require(['@/views/backstage/apply/application'],resolve)
      },
      {
        path: 'approve',
        name:'approve',
        component: resolve=>require(['@/views/backstage/approve/approve'],resolve),
        children: [
        {
          path:'member_approve',
          name:'member_approve',
          component:resolve=>require(['@/views/backstage/approve/approves/member_table'],resolve)
        },
        {
          path:'chairman_approve',
          name:'chairman_approve',
          component:resolve=>require(['@/views/backstage/approve/approves/chairman_table'],resolve)
        },
        {
          path:'leader_approve',
          name:'leader_approve',
          component:resolve=>require(['@/views/backstage/approve/approves/leader_table'],resolve)
        },
        {
          path:'secretary_approve',
          name:'secretary_approve',
          component:resolve=>require(['@/views/backstage/approve/approves/secretary_table'],resolve)
        },
      ]
      },
      {
        path: 'applications',
        name:'applications',
        component: resolve=>require(['@/views/backstage/myapplications/applications'],resolve)
      },
      {
        path: 'myapplications/consent',
        name:'myapplications/consent',
        component: resolve=>require(['@/views/backstage/myapplications/consent'],resolve)
      },
    ]
    },
    {path: '*', component: resolve=>require(['@/views/404'],resolve)}
  ]
})
