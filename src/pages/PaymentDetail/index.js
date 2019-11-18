/* @flow */
import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from '../../components';

const Payment = loadable(() => import('./PaymentDetail'), {
  fallback: <Loading />
});

export default (props: { props: Object }) => (
  <ErrorBoundary>
    <Payment {...props} />
  </ErrorBoundary>
);
