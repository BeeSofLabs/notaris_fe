import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { CookieStorage } from 'cookie-storage'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

class AuthAgunan extends Component {
  render() {
    const cookieStorage = new CookieStorage()
    
      const dataProf = cookieStorage.getItem('rolenot')
      const data = decompressFromEncodedURIComponent(dataProf)
      if (data !== 'collateral_owner' && dataProf === null)  {
        return "<Redirect to='/' />";
      } else {
        return <>{this.props.children}</>
      }
  }
}

export default AuthAgunan