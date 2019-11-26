/* @flow */
import fp from 'lodash/fp';
import type { AreaDistrict, Action } from '../../types';

type State = AreaDistrict;

export default (state: State = {}, action: Action): State => {
  switch (action.type) {
    case 'AREA_DISTRICT_REQUESTING':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_DISTRICT_REQUESTING',
          info: action.param
        }
      });
    case 'AREA_DISTRICT_FAILURE':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_DISTRICT_FAILURE',
          err: action.err
        }
      });
    case 'AREA_DISTRICT_SUCCESS':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_DISTRICT_SUCCESS',
          info: action.data
        }
      });
    default:
      return state;
  }
};
