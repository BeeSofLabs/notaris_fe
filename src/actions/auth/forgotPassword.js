/* @flow */

import axios from 'axios';
import Constants from '../../helpers/constants';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';

const API_URL = `${Constants.API}/api/v1/users/forgot`;

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchForgotPassword = (
  param: Object,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'FORGOT_REQUESTING', param });

  try {
    axios.defaults.headers.common = {
      Platform: 'website',
      'Content-Type': 'application/json; charset=utf-8'
    };

    let { data } = []

    data = await axios.post(`${URL}`, param);
    /* istanbul ignore next */
    dispatch({ type: 'FORGOT_SUCCESS', param, data });
  } catch (err) {
    /* istanbul ignore next */
    console.log(err)
    dispatch({ type: 'FORGOT_FAILURE', param, err: err.response.data.message });
  }
};

/* istanbul ignore next */
const shouldFetchForgotPassword = (state: ReduxState, param: Object): boolean => {
  const forgotPassword = state.forgotPassword[param];

  if (forgotPassword && forgotPassword.readyStatus === 'FORGOT_SUCCESS') return false;

  return true;
};

/* istanbul ignore next */
export const fetchAuthForgotPasswordIfNeeded = (param: Object): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchForgotPassword(getState(), param)) return dispatch(fetchForgotPassword(param));

  /* istanbul ignore next */
  return null;
};
