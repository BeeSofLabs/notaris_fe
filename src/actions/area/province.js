/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../../types';
import Constants from '../../helpers/constants';

const API_URL = `${Constants.API}/api/v1/provinces/all`;

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchAreaProvince = (
  param: Object,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'AREA_PROVINCE_REQUESTING', param });

  try {
    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': 'example-of-custom-header',
      'Accept-Version': 1,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8'
    };

    let { data } = [];
    data = await axios.get(`${URL}`);

    /* istanbul ignore next */
    dispatch({ type: 'AREA_PROVINCE_SUCCESS', param, data });
  } catch (err) {
    dispatch({ type: 'AREA_PROVINCE_FAILURE', param, err });
  }
};

/* istanbul ignore next */
const shouldFetchAreaProvince = (state: ReduxState, param: Object): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const areaProvince = state.areaProvince[param];

  // Fetching data once in production
  // if (areaProvince && areaProvince.readyStatus === 'AREA_PROVINCE_SUCCESS')
  //   return false;

  return true;
};

/* istanbul ignore next */
export const fetchAreaProvinceIfNeeded = (param: Object): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchAreaProvince(getState(), param)) {
    /* istanbul ignore next */
    return dispatch(fetchAreaProvince(param));
  }

  /* istanbul ignore next */
  return null;
};
