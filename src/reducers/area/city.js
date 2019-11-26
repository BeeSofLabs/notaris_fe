/* @flow */
import fp from 'lodash/fp';
import type { AreaCity, Action } from '../../types';

type State = AreaCity;

export default (state: State = {}, action: Action): State => {
  switch (action.type) {
    case 'AREA_CITY_REQUESTING':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_CITY_REQUESTING',
          info: action.param
        }
      });
    case 'AREA_CITY_FAILURE':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_CITY_FAILURE',
          err: action.err
        }
      });
    case 'AREA_CITY_SUCCESS':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_CITY_SUCCESS',
          info: action.data
        }
      });
    default:
      return state;
  }
};
