/* @flow */

import axios from 'axios';
import Constants from '../../helpers/constants';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import { CookieStorage } from 'cookie-storage'
import { compressToEncodedURIComponent } from 'cookie-storage'

const cookieStorage = new CookieStorage();
const API_URL = `${Constants.API}/users/notaris`;

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchListNotaris = (
  param: Object,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'LIST_NOTARIS_REQUESTING' });

  try {
    axios.defaults.headers.common = {
      Platform: 'website',
      'Content-Type': 'application/json; charset=utf-8'
    };

    let { data } = []

    data = await axios.get(`${URL}`);
    /* istanbul ignore next */
    dispatch({ type: 'LIST_NOTARIS_SUCCESS', data });
  } catch (err) {
    /* istanbul ignore next */
    console.log(err)
    dispatch({ type: 'LIST_NOTARIS_FAILURE', err: err.response.data.message });
  }
};

/* istanbul ignore next */
const shouldFetchListNotaris = (state: ReduxState, param: Object): boolean => {
  const listNotaris = state.listNotaris[param];

  if (listNotaris && listNotaris.readyStatus === 'LIST_NOTARIS_SUCCESS') return false;

  return true;
};

/* istanbul ignore next */
export const fetchListNotarisIfNeeded = (param: Object): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchListNotaris(getState(), param)) return dispatch(fetchListNotaris(param));

  /* istanbul ignore next */
  return null;
};
