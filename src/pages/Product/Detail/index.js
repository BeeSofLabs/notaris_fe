/* @flow */
import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from '../../../components';

const Detail = loadable(() => import('./Detail'), {
  fallback: <Loading />
});

export default (props: { props: Object }) => (
  <ErrorBoundary>
    <Detail {...props} />
  </ErrorBoundary>
);
