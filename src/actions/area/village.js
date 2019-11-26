/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../../types';
import Constants from '../../helpers/constants';

const API_URL = `${Constants.API}/api/v1/villages`;

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchAreaVillage = (
  param: Object,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'AREA_VILLAGE_REQUESTING', param });

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
    if ('districtId' in param) {
      data = await axios.get(`${URL}/${param.districtId}`);
      data.correspondence = param.correspondence || false;
    }

    /* istanbul ignore next */
    dispatch({ type: 'AREA_VILLAGE_SUCCESS', param, data });
  } catch (err) {
    dispatch({ type: 'AREA_VILLAGE_FAILURE', param, err });
  }
};

/* istanbul ignore next */
const shouldFetchAreaVillage = (state: ReduxState, param: Object): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const areaVillage = state.areaVillage[param];

  // Fetching data once in production
  // if (areaVillage && areaVillage.readyStatus === 'AREA_VILLAGE_SUCCESS')
  //   return false;

  return true;
};

/* istanbul ignore next */
export const fetchAreaVillageIfNeeded = (param: Object): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchAreaVillage(getState(), param)) {
    /* istanbul ignore next */
    return dispatch(fetchAreaVillage(param));
  }

  /* istanbul ignore next */
  return null;
};
