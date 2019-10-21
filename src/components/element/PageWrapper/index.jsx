import React from 'react';
import { Header, Footer } from '../index.js';

const PageWrapper = props => (
  <div className="body-app">
    <Header {...props} />
    {props.children}
    {props.footerShow ? (
      <Footer />
    ) : ''}
  </div>
);

export default PageWrapper;
