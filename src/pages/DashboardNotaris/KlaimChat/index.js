/* @flow */
import React from 'react';
import loadable from '@loadable/component';
import { Loading, ErrorBoundary } from '../../../components';

const KlaimChat = loadable(() => import('./KlaimChat'), {
  fallback: <Loading />
});

export default (props: { props: Object }) => (
  <ErrorBoundary>
    <KlaimChat {...props} />
  </ErrorBoundary>
);
