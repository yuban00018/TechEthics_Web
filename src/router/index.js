import Vue from 'vue'
import Router from 'vue-router'
import tutorial from '@/views/backstage/tutorial/tutorial'
import approve from '@/views/backstage/approve/approve'
import apply_program from '@/views/backstage/apply/apply_program'
import apply_personal from '@/views/backstage/apply/apply_personal'
import apply_other from '@/views/backstage/apply/apply_other'
import myapplications from '@/views/backstage/myapplications/myapplications'
import login from '@/views/login/login'
import member_approve from '@/views/backstage/approve/approves/member_approve'
import chairman_approve from '@/views/backstage/approve/approves/chairman_approve'
import leader_approve from '@/views/backstage/approve/approves/leader_approve'
import secretary_approve from '@/views/backstage/approve/approves/secretary_approve'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '',
      name: 'login',
      component: resolve=>require(['@/views/login/login'],resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve=>require(['@/views/login/login'],resolve)
    },
    {
      path: '/backstage',
      name: 'backstage',
      component: resolve=>require(['@/views/backstage/bg'],resolve),
      redirect:{name:'tutorial'},
      children: [
      {
        path: 'tutorial',
        name:'tutorial',
        component: resolve=>require(['@/views/backstage/tutorial/tutorial'],resolve)
      },
      {
        path: 'apply_program',
        name:'apply_program',
        component: resolve=>require(['@/views/backstage/apply/apply_program'],resolve)
      },
      {
        path: 'apply_other',
        name:'apply_other',
        component: resolve=>require(['@/views/backstage/apply/apply_other'],resolve)
      },
      {
        path: 'apply_personal',
        name:'apply_personal',
        component: resolve=>require(['@/views/backstage/apply/apply_personal'],resolve)
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
        children: [{
          path:'member_approve',
          name:'member_approve',
          component:resolve=>require(['@/views/backstage/approve/approves/member_approve'],resolve)
        },
        {
          path:'chairman_approve',
          name:'chairman_approve',
          component:resolve=>require(['@/views/backstage/approve/approves/chairman_approve'],resolve)
        },
        {
          path:'leader_approve',
          name:'leader_approve',
          component:resolve=>require(['@/views/backstage/approve/approves/leader_approve'],resolve)
        },
        {
          path:'secretary_approve',
          name:'secretary_approve',
          component:resolve=>require(['@/views/backstage/approve/approves/secretary_approve'],resolve)
        },
      ]
      },
      {
        path: 'myapplications',
        name:'myapplications',
        component: resolve=>require(['@/views/backstage/myapplications/myapplications'],resolve)
      },
      {
        path: 'applications',
        name:'applications',
        component: resolve=>require(['@/views/backstage/myapplications/applications'],resolve)
      }
    ]
    },
    {path: '*', component: resolve=>require(['@/views/404'],resolve)}
  ]
})
