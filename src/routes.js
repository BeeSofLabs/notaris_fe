/* @flow */

import { usersAction, userAction } from './actions';
import App from './app';
import { asyncHome, asyncUserInfo, NotFound, List, Detail, Order } from './pages';

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
        component: NotFound
      }
    ]
  }
];
