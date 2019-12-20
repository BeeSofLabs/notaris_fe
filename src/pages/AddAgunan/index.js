/* @flow */
import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from '../../components';

const AddAgunan = loadable(() => import('./AddAgunan'), {
  fallback: <Loading />
});

export default (props: { props: Object }) => (
  <ErrorBoundary>
    <AddAgunan {...props} />
  </ErrorBoundary>
);
