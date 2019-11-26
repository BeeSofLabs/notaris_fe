/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../../types';
import Constants from '../../helpers/constants';

const API_URL = `${Constants.API}/api/v1/districts`;

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchAreaDistrict = (
  param: Object,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'AREA_DISTRICT_REQUESTING', param });

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
    if ('cityId' in param) {
      data = await axios.get(`${URL}/${param.cityId}`);
      data.correspondence = param.correspondence || false;
    }

    /* istanbul ignore next */
    dispatch({ type: 'AREA_DISTRICT_SUCCESS', param, data });
  } catch (err) {
    dispatch({ type: 'AREA_DISTRICT_FAILURE', param, err });
  }
};

/* istanbul ignore next */
const shouldFetchAreaDistrict = (state: ReduxState, param: Object): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const areaDistrict = state.areaDistrict[param];

  // Fetching data once in production
  // if (areaDistrict && areaDistrict.readyStatus === 'AREA_DISTRICT_SUCCESS')
  //   return false;

  return true;
};

/* istanbul ignore next */
export const fetchAreaDistrictIfNeeded = (param: Object): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchAreaDistrict(getState(), param)) {
    /* istanbul ignore next */
    return dispatch(fetchAreaDistrict(param));
  }

  /* istanbul ignore next */
  return null;
};
