/* @flow */
import fp from 'lodash/fp';
import type { AreaProvince, Action } from '../../types';

type State = AreaProvince;

export default (state: State = {}, action: Action): State => {
  switch (action.type) {
    case 'AREA_PROVINCE_REQUESTING':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_PROVINCE_REQUESTING'
        }
      });
    case 'AREA_PROVINCE_FAILURE':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_PROVINCE_FAILURE',
          err: action.err
        }
      });
    case 'AREA_PROVINCE_SUCCESS':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_PROVINCE_SUCCESS',
          info: action.data
        }
      });
    default:
      return state;
  }
};
