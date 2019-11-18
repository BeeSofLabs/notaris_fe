/* @flow */

import { usersAction, userAction } from './actions';
import App from './app';
import { asyncHome, asyncUserInfo, NotFound, List, Detail, Order, Login, Register, Account, Forgot, Payment, PaymentDetail, History, Dashboard, DashboardListOrder } from './pages';
import RequireAuth from './components/Page/PublicComponent/index'

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncHome, // Add your route here
        loadData: () => [
          usersAction.fetchUsersIfNeeded()
          // Add other pre-fetched actions here
        ]
      },
      {
        path: '/UserInfo/:id',
        component: asyncUserInfo,
        loadData: ({ params }: Object) => [
          userAction.fetchUserIfNeeded(params.id)
        ]
      },
      {
        path: '/notaris',
        exact: true,
        component: List,
        loadData: ({ params }: Object) => [
          // userAction.fetchUserIfNeeded(params.id)
        ]
      },
      {
        path: '/notaris/:id',
        exact: true,
        component: Detail,
        loadData: ({ params }: Object) => [
          // userAction.fetchUserIfNeeded(params.id)
        ]
      },{
        path: '/notaris/:id/order',
        exact: true,
        component: Order,
      },
      {
        path: '/login',
        exact: true,
        component: Login
      },
      {
        path: '/register',
        exact: true,
        component: Register
      },
      {
        path: '/account',
        exact: true,
        component: Account
      },
      {
        path: '/forgot',
        exact: true,
        component: Forgot
      },
      {
        path: '/payment/:idOrder',
        exact: true,
        component: Payment
      },
      {
        path: '/payment/detail/:idPayment',
        axact: true,
        component: PaymentDetail
      },
      {
        path: '/history',
        exact: true,
        component: History
      },
      {
        path: '/dashboard',
        exact: true,
        component: Dashboard
      },
      {
        path: '/dashboard/list-order',
        exact: true,
        component: DashboardListOrder
      },
      {
        component: NotFound
      }
    ]
  }
];
