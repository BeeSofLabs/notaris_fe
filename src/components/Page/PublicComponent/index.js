/* eslint-disable */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { CookieStorage } from 'cookie-storage';
import { compressToEncodedURIComponent } from 'lz-string';
const cookieStorage = new CookieStorage();

export default function(ComposedComponent) {
  class RequireAuth extends React.Component {
    componentWillMount() {
      if (cookieStorage.getItem('auth_token')) {
        window.location = '/'
      } 
    }
    render() {
      if ( !cookieStorage.getItem('auth_token')) {
        return <ComposedComponent {...this.props} />;
      }
        return <Redirect to={{ pathname: `/` }} />;
    }
  }

  return RequireAuth;
};
/* eslint-enable */
