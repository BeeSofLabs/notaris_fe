/* @flow */
import fp from 'lodash/fp';
import type { AuthRegister, Action } from '../../types';

type State = AuthRegister;

export default (state: State = {}, action: Action): State => {
  switch (action.type) {
    case 'REGISTER_REQUESTING':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'REGISTER_REQUESTING'
        }
      });
    case 'REGISTER_FAILURE':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'REGISTER_FAILURE',
          err: action.err
        }
      });
    case 'REGISTER_SUCCESS':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'REGISTER_SUCCESS',
          info: action.data
        }
      });
    default:
      return state;
  }
};
