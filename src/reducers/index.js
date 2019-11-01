/* @flow */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import home from './home';
import userInfo from './userInfo';
import authLogin from './auth/login'
import listNotaris from './notaris/List'
import authRegister from './auth/register'

const reducers = {
  home,
  userInfo,
  authLogin,
  listNotaris,
  authRegister
};

export type Reducers = typeof reducers;
export default (history: Object) =>
  combineReducers({ router: connectRouter(history), ...reducers });
