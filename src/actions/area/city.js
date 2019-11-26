/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../../types';
import Constants from '../../helpers/constants';

const API_URL = `${Constants.API}/api/v1/cities/`;

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchAreaCity = (
  param: Object,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'AREA_CITY_REQUESTING', param });

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
    if ('provId' in param) {
      data = await axios.get(`${URL}/${param.provId}`);
      data.correspondence = param.correspondence || false;
    }

    /* istanbul ignore next */
    dispatch({ type: 'AREA_CITY_SUCCESS', param, data });
  } catch (err) {
    dispatch({ type: 'AREA_CITY_FAILURE', param, err });
  }
};

/* istanbul ignore next */
const shouldFetchAreaCity = (state: ReduxState, param: Object): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const areaCity = state.areaCity[param];

  // Fetching data once in production
  // if (areaCity && areaCity.readyStatus === 'AREA_CITY_SUCCESS') return false;

  return true;
};

/* istanbul ignore next */
export const fetchAreaCityIfNeeded = (param: Object): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchAreaCity(getState(), param)) {
    /* istanbul ignore next */
    return dispatch(fetchAreaCity(param));
  }

  /* istanbul ignore next */
  return null;
};
