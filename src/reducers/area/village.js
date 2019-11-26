/* @flow */
import fp from 'lodash/fp';
import type { AreaVillage, Action } from '../../types';

type State = AreaVillage;

export default (state: State = {}, action: Action): State => {
  switch (action.type) {
    case 'AREA_VILLAGE_REQUESTING':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_VILLAGE_REQUESTING',
          info: action.param
        }
      });
    case 'AREA_VILLAGE_FAILURE':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_VILLAGE_FAILURE',
          err: action.err
        }
      });
    case 'AREA_VILLAGE_SUCCESS':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'AREA_VILLAGE_SUCCESS',
          info: action.data
        }
      });
    default:
      return state;
  }
};
