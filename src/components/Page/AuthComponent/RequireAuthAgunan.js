/* eslint-disable */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { CookieStorage } from 'cookie-storage';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

export default function(ComposedComponent) {
  class RequireAuth extends React.Component {
    render() {
      const cookieStorage = new CookieStorage();
      const { 
        match: { url }
      } = this.props;
        const dataProf = cookieStorage.getItem('prof')
        if (dataProf) { 
          const data = JSON.parse(decompressFromEncodedURIComponent(dataProf))
          if (
            data.user_tipe !== "collateral_owner"
          ) {
            const urlEncode = compressToEncodedURIComponent(url);
            return <Redirect to='/' />;
            return ''
          }
          else {
            return <ComposedComponent {...this.props} />;
          }
        } else {
          return <Redirect to='/' />;
          return ''
        }
    }
  }

  return RequireAuth;
};
/* eslint-enable */
