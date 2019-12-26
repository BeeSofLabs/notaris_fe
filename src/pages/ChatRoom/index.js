/* @flow */
import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from '../../components';

const ChatRoom = loadable(() => import('./ChatRoom'), {
  fallback: <Loading />
});

export default (props: { props: Object }) => (
  <ErrorBoundary>
    <ChatRoom {...props} />
  </ErrorBoundary>
);
