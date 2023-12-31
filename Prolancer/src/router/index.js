import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'


const routes = [
  {
    path: '/',
    name: 'home',

    component: HomePage
  },
  {
    path: '/change',
    name: 'change',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ChangePasswordView.vue')

  },
  {
    path: '/uppro',
    name: 'uppro',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UpdateProfileView.vue')

  },
  {
    path: '/logout',
    name: 'logout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Logout.vue')

  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {

    path: '/register/:role',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterAccount.vue')

  }, 
  {

    path: '/register-person',
    name: 'register-person',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterPersonView.vue')

  }, 
  {

    path: '/register-company',
    name: 'register-company',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterCompanyView.vue')

  },
  {
    path: '/forget',
    name: 'forget',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ForgetPasswordView.vue')
  },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/ProfileView.vue')

  // },
  {
    path: '/gigdetail/:id',
    name: 'gigdetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/GigDetailView.vue')

  },
  {
    path: '/createorderdetail',
    name: 'createorderdetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateOrderDetailView.vue')

  },
  {

    path: '/seldash',
    name: 'seldash',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SellerDashBoardView.vue')
  },
  {
    path: '/manageorder',
    name: 'manageorder',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageOrderView.vue')

  },
  {

    path: '/creategig',
    name: 'creategig',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateGigView.vue')


  }, {
    path: '/updategig/:GigID',
    name: 'updategig',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UpdateGig.vue')


  },
  {
    path: '/changeStatus/:GigID/:Status',
    name: 'changegigstatus',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ChangeGigStatus.vue')
  },
  {

    path: '/giglist',
    name: 'giglist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/GigListView.vue')

  },
  {
    path: '/vieworderdetail/:id',
    name: 'vieworderdetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OrderDetailView.vue')

  },
  {
    path: '/managegigsel',
    name: 'managegigsel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this routes
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageGigSel.vue')

  }
  ,
  {
    path: '/managegigad',
    name: 'managegigad',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageGigAd.vue')

  }
  ,
  {
    path: '/manageinterview',
    name: 'manageinterview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageInterview.vue')

  }
  ,
  {
    path: '/manageinterviewsel',
    name: 'manageinterviewsel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageInterviewSel.vue')

  }
  ,
  {
    path: '/manageaccount/hirer',
    name: 'managehirer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageHirerAccount.vue')
  }
  ,
  {
    path: '/manageaccount/freelancer',
    name: 'managefreelancer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageFreelancerAccount.vue')
  }
  ,
  {
    path: '/becomesel',
    name: 'becomesel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BecomeSeller.vue')

  },
  {
    path: '/becomehire',
    name: 'becomehire',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BecomeHirer.vue')

  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue')

  },
  {
    path: '/skilltest',
    name: 'skilltest',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SkillTestManagement.vue')

  },
  {
    path: '/usermanage',
    name: 'usermanage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserManagement.vue')

  },
  {
    path: '/changeRole/:role',
    name: 'changeRole',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ChangeRole.vue')

  },
  {

    path: '/manageSkill',
    name: 'manageSkill',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageSkillScoreView.vue')
  },
  {
    path: '/redirect',
    name: 'redirect',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Redirectregister.vue')

  },
  {
    path: '/sendmessage',
    name: 'sendmessage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SendMessageView.vue')

  },
  {
    path: '/manageOrderRequest',
    name: 'manageOrderRequest',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageOrderRequestView.vue')

  },
  {
    path: '/manageChangeRequest',
    name: 'manageChangeRequest',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageChangeRequestView.vue')

  },
  {
    path: '/chartearning',
    name: 'chartearning',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/chartearning.vue')

  },{
    path: '/chartgig',
    name: 'chartgig',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/chartgigsuccess.vue')

  },
  {
    path: '/vieworderrequestdetail/:id',
    name: 'vieworderrequestdetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OrderRequestDetailView.vue')

  },
  {
    path: '/chat',
    name: 'chat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Chat.vue')
  },
  {
    path: '/error',
    name: 'error',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ErrorPageView.vue')

  },
  {
    path: '/earning',
    name: 'earning',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Earnings.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'error' } // Redirect to the 'error' route
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
