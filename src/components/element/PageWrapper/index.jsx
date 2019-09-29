import React from 'react';
import { Header, Footer } from 'components/element';

const PageWrapper = props => (
  <div className="body-app">
    <Header {...props} />
    {props.children}
    <Footer />
  </div>
);

export default PageWrapper;
