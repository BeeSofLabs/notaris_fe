/* @flow */
import fp from 'lodash/fp';
import type { ForgotPassword, Action } from '../../types';

type State = ForgotPassword;

export default (state: State = {}, action: Action): State => {
  switch (action.type) {
    case 'FORGOT_REQUESTING':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'FORGOT_REQUESTING'
        }
      });
    case 'FORGOT_FAILURE':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'FORGOT_FAILURE',
          err: action.err
        }
      });
    case 'FORGOT_SUCCESS':
      return fp.assign(state, {
        [action.param]: {
          readyStatus: 'FORGOT_SUCCESS',
          info: action.data
        }
      });
    default:
      return state;
  }
};
