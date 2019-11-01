/* @flow */
import fp from 'lodash/fp';
import type { ListNotaris, Action } from '../../types';

type State = ListNotaris;

const initialState = {
  readyStatus: 'LIST_NOTARIS_REQUESTING',
  err: null,
  list: []
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'LIST_NOTARIS_REQUESTING':
      return {
        ...state,
        readyStatus: 'LIST_NOTARIS_REQUESTING'
      }
    case 'LIST_NOTARIS_FAILURE':
      return {
        ...state,
        readyStatus: 'LIST_NOTARIS_FAILURE'
      };
    case 'LIST_NOTARIS_SUCCESS':
      return {
        ...state,
        readyStatus: 'LIST_NOTARIS_SUCCESS',
        list: action.data
      };
    default:
      return state;
  }
};
