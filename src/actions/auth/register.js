/* @flow */

import axios from 'axios';
import Constants from '../../helpers/constants';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import { CookieStorage } from 'cookie-storage'
import { compressToEncodedURIComponent } from 'cookie-storage'

const cookieStorage = new CookieStorage();
const API_URL = `${Constants.API}/signup`;

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchRegister = (
  param: Object,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'REGISTER_REQUESTING', param });

  try {
    axios.defaults.headers.common = {
      Platform: 'website',
      'Content-Type': 'application/json; charset=utf-8'
    };

    let { data } = []
    const dataSend = {
      email: param.email,
      password: param.password,
      name: param.full_name,
      password_confirmation: param.confirm_password,
      address: param.address,
      phone: param.nomor_hp
    }
    console.log('asd', dataSend)

    data = await axios.post(`${URL}`, dataSend);
    /* istanbul ignore next */
    dispatch({ type: 'REGISTER_SUCCESS', param, data });
  } catch (err) {
    /* istanbul ignore next */
    console.log(err)
    dispatch({ type: 'REGISTER_FAILURE', param, err: err.response.data.message });
  }
};

/* istanbul ignore next */
const shouldFetchRegister = (state: ReduxState, param: Object): boolean => {
  const authLogin = state.authLogin[param];

  if (authLogin && authLogin.readyStatus === 'REGISTER_SUCCESS') return false;

  return true;
};

/* istanbul ignore next */
export const fetchAuthRegisterIfNeeded = (param: Object): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchRegister(getState(), param)) return dispatch(fetchRegister(param));

  /* istanbul ignore next */
  return null;
};
