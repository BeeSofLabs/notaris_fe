/* @flow */

import axios from 'axios';
import Constants from '../../helpers/constants';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import { CookieStorage } from 'cookie-storage'
import { compressToEncodedURIComponent } from 'cookie-storage'

const cookieStorage = new CookieStorage();
const API_URL = `${Constants.API}/auth/login`;

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchLogin = (
  param: Object,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'LOGIN_REQUESTING', param });

  try {
    axios.defaults.headers.common = {
      Platform: 'website',
      'Content-Type': 'application/json; charset=utf-8'
    };

    let { data } = []
    const dataSend = {
      email: param.email,
      password: param.password
    }

    data = await axios.post(`${URL}`, dataSend);
    /* istanbul ignore next */
    dispatch({ type: 'LOGIN_SUCCESS', param, data });
  } catch (err) {
    /* istanbul ignore next */
    console.log(err)
    dispatch({ type: 'LOGIN_FAILURE', param, err: err.response.data.message });
  }
};

/* istanbul ignore next */
const shouldFetchLogin = (state: ReduxState, param: Object): boolean => {
  const authLogin = state.authLogin[param];

  if (authLogin && authLogin.readyStatus === 'LOGIN_SUCCESS') return false;

  return true;
};

/* istanbul ignore next */
export const fetchAuthLoginIfNeeded = (param: Object): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchLogin(getState(), param)) return dispatch(fetchLogin(param));

  /* istanbul ignore next */
  return null;
};
