/* @flow */

import axios from 'axios';
import Constants from '../../helpers/constants';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import { CookieStorage } from 'cookie-storage'
import { compressToEncodedURIComponent } from 'cookie-storage'

const cookieStorage = new CookieStorage();
const API_URL = `${Constants.API}/api/v1/users/notaris_detail`;

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchDetailNotaris = (
  param: Object,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DETAIL_NOTARIS_REQUESTING' });

  try {
    axios.defaults.headers.common = {
      Platform: 'website',
      'Content-Type': 'application/json; charset=utf-8'
    };

    let { data } = []

    data = await axios.get(`${URL}/${param.id}`);
    /* istanbul ignore next */
    dispatch({ type: 'DETAIL_NOTARIS_SUCCESS', data });
  } catch (err) {
    /* istanbul ignore next */
    console.log(err)
    dispatch({ type: 'DETAIL_NOTARIS_FAILURE', err: err.response.data.message });
  }
};

/* istanbul ignore next */
const shouldFetchDetailNotaris = (state: ReduxState, param: Object): boolean => {
  const detailNotaris = state.detailNotaris[param];

  if (detailNotaris && detailNotaris.readyStatus === 'DETAIL_NOTARIS_SUCCESS') return false;

  return true;
};

/* istanbul ignore next */
export const fetchDetailNotarisIfNeeded = (param: Object): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchDetailNotaris(getState(), param)) return dispatch(fetchDetailNotaris(param));

  /* istanbul ignore next */
  return null;
};
