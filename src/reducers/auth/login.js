/* @flow */
import fp from 'lodash/fp';
import type { AuthLogin, Action } from '../../types';

type State = AuthLogin;

export default (state: State = {}, action: Action): State => {
  switch (action.type) {
    case 'LOGIN_REQUESTING':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'LOGIN_REQUESTING'
        }
      });
    case 'LOGIN_FAILURE':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'LOGIN_FAILURE',
          err: action.err
        }
      });
    case 'LOGIN_SUCCESS':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'LOGIN_SUCCESS',
          info: action.data
        }
      });
    default:
      return state;
  }
};
