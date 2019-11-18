/* @flow */
import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from '../../components';

const Dashboard = loadable(() => import('./Dashboard'), {
  fallback: <Loading />
});

export default (props: { props: Object }) => (
  <ErrorBoundary>
    <Dashboard {...props} />
  </ErrorBoundary>
);
