/* @flow */
import fp from 'lodash/fp';
import type { DetailNotaris, Action } from '../../types';

type State = ListNotaris;

const initialState = {
  readyStatus: 'DETAIL_NOTARIS_REQUESTING',
  err: null,
  data: {}}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'DETAIL_NOTARIS_REQUESTING':
      return {
        ...state,
        readyStatus: 'DETAIL_NOTARIS_REQUESTING'
      }
    case 'DETAIL_NOTARIS_FAILURE':
      return {
        ...state,
        readyStatus: 'DETAIL_NOTARIS_FAILURE'
      };
    case 'DETAIL_NOTARIS_SUCCESS':
      return {
        ...state,
        readyStatus: 'DETAIL_NOTARIS_SUCCESS',
        data: action.data
      };
    default:
      return state;
  }
};
