/* @flow */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import home from './home';
import userInfo from './userInfo';
import authLogin from './auth/login'
import listNotaris from './notaris/List'
import authRegister from './auth/register'
import areaProvince from './area/province'
import areaVillage from './area/village'
import areaDistrict from './area/district'
import areaCity from './area/city'

const reducers = {
  home,
  userInfo,
  authLogin,
  listNotaris,
  authRegister,
  areaProvince,
  areaVillage,
  areaCity,
  areaDistrict
};

export type Reducers = typeof reducers;
export default (history: Object) =>
  combineReducers({ router: connectRouter(history), ...reducers });
