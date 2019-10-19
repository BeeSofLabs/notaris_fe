/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';

import config from '../config';
// Import your global styles here
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-select-me/lib/ReactSelectMe.css';
import 'normalize.css/normalize.css'; // eslint-disable-line import/first
import '../theme/styles.scss';

type Props = { route: Object };

const App = ({ route }: Props) => (
  <div className="app">
    <Helmet {...config.app} />
    {/* Child routes won't render without this */}
    {renderRoutes(route.routes)}
  </div>
);

export default hot(module)(App);
