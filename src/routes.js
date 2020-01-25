/* @flow */

import { usersAction, userAction } from './actions';
import App from './app';
import { asyncHome, asyncUserInfo, ChatRoom, DashboardHome, LoadingAssign, EditDocument, Assign, NotFound, List, Detail, Order,KlaimChat, Login, Register, Account, Forgot, Payment, PaymentDetail, History, Dashboard, DashboardListOrder, AddAgunan, DashboardProfile } from './pages';
import RequireAuth from './components/Page/PublicComponent/index'
import RequireAuthAgunan from './components/Page/AuthComponent/RequireAuthAgunan'

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
        path: '/notaris/:id/order/:idOrder',
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
        component: DashboardHome
      },
      {
        path: '/agunan',
        exact: true,
        component: Dashboard
      },
      {
        path: '/agunan/:section/add',
        exact: true,
        component: AddAgunan
      },
      {
        path: '/dashboard/list-order',
        exact: true,
        component: DashboardListOrder
      },
      {
        path: '/dashboard/profile',
        exact: true,
        component: DashboardProfile
      },
      {
        path: '/dashboard/chat-room/:id',
        exact: true,
        component: KlaimChat
      },
      {
        path: '/dashboard/edit-document/:id',
        exact: true,
        component: EditDocument,
        loadData: ({ params }: Object) => [
          userAction.fetchUserIfNeeded(params.id)
        ]
      },
      {
        path: '/assign/:id',
        exact: true,
        component: Assign
      },
      {
        path: '/chat-room/:id',
        exact: true,
        component: ChatRoom
      },
      {
        path: '/assign/:id/auth',
        exact: true,
        component: LoadingAssign
      },
      {
        component: NotFound
      }
    ]
  }
];
