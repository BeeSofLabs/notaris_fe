/* @flow */
/* eslint-disable no-use-before-define */

import type { Store as ReduxStore } from 'redux';

import type { Reducers } from '../reducers';

// Reducers
export type Home = {
  +readyStatus: string,
  +err: any,
  +list: Array<Object>
};

export type UserInfo = {
  +[userId: string]: {
    +readyStatus: string,
    +err: any,
    +info: Object
  }
};

export type AuthRegister = {
  +[param: Object]: {
    +readyStatus: string,
    +err: any,
    +info: Object
  }
};

export type AuthLogin = {
  +[param: Object]: {
    +readyStatus: string,
    +err: any,
    +info: Object
  }
};

export type ListNotaris = {
  +readyStatus: string,
  +err: any,
  +list: Array<Object>
};

export type AreaProvince = {
  +[param: Object]: {
    +readyStatus: string,
    +err: any,
    +info: Object
  }
};

export type AreaCity = {
  +[param: Object]: {
    +readyStatus: string,
    +err: any,
    +info: Object
  }
};

export type AreaDistrict = {
  +[param: Object]: {
    +readyStatus: string,
    +err: any,
    +info: Object
  }
};

export type AreaVillage = {
  +[param: Object]: {
    +readyStatus: string,
    +err: any,
    +info: Object
  }
};


// State
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V; // eslint-disable-line no-undef
export type ReduxState = $ObjMap<Reducers, $ExtractFunctionReturn>; // eslint-disable-line no-undef

// Action
export type Action =
  | { type: 'USERS_REQUESTING' }
  | { type: 'USERS_SUCCESS', data: Array<Object> }
  | { type: 'USERS_FAILURE', err: any }
  | { type: 'USER_REQUESTING', userId: string }
  | { type: 'USER_SUCCESS', userId: string, data: Object }
  | { type: 'USER_FAILURE', userId: string, err: any }

  // AUTH LOGIN-------------------------------------
  | { type: 'LOGIN_REQUESTING', param: Object }
  | { type: 'LOGIN_SUCCESS', param: Object, data: Object }
  | { type: 'LOGIN_FAILURE', param: Object, err: any }

  // AUTH REGISTER-------------------------------------
  | { type: 'REGISTER_REQUESTING', param: Object }
  | { type: 'REGISTER_SUCCESS', param: Object, data: Object }
  | { type: 'REGISTER_FAILURE', param: Object, err: any }

  // LIST NOTARIS-------------------------------------
  | { type: 'LIST_NOTARIS_REQUESTING', param: Object }
  | { type: 'LIST_NOTARIS_SUCCESS', param: Object, data: Object }
  | { type: 'LIST_NOTARIS_FAILURE', param: Object, err: any }

  // AREA PROVINCE-------------------------------------
  | { type: 'AREA_PROVINCE_REQUESTING', param: Object }
  | { type: 'AREA_PROVINCE_SUCCESS', param: Object, data: Object }
  | { type: 'AREA_PROVINCE_FAILURE', param: Object, err: any }

  // AREA CITY-------------------------------------
  | { type: 'AREA_CITY_REQUESTING', param: Object }
  | { type: 'AREA_CITY_SUCCESS', param: Object, data: Object }
  | { type: 'AREA_CITY_FAILURE', param: Object, err: any }

  // AREA DISTRICT-------------------------------------
  | { type: 'AREA_DISTRICT_REQUESTING', param: Object }
  | { type: 'AREA_DISTRICT_SUCCESS', param: Object, data: Object }
  | { type: 'AREA_DISTRICT_FAILURE', param: Object, err: any }

  // AREA VILLAGE-------------------------------------
  | { type: 'AREA_VILLAGE_REQUESTING', param: Object }
  | { type: 'AREA_VILLAGE_SUCCESS', param: Object, data: Object }
  | { type: 'AREA_VILLAGE_FAILURE', param: Object, err: any };


export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
export type GetState = () => ReduxState;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

// Store
export type Store = ReduxStore<ReduxState, Action>;
