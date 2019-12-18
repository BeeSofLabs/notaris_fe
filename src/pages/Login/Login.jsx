/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Select, Rate } from 'antd';
import Helmet from 'react-helmet';
import { Formik, Form } from 'formik';
import { CookieStorage } from 'cookie-storage';
import { compressToEncodedURIComponent } from 'lz-string'

import * as AuthLoginAction from '../../actions/auth/login';

import type {
  AuthLogin as AuthLoginType,
  Dispatch,
  ReduxState
} from '../../types';

import {
  PageWrapper,
  Card,
  InputFormik,
  Button
} from '../../components/element';

const cookieStorage = new CookieStorage({
  path: '/'
});

type Props = {
  authLogin: AuthLoginType,
  match: Object,
  fetchAuthLoginIfNeeded: (param: Object) => void,
};

export class Login extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      err: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
  }

  componentWillMount () {
    if (cookieStorage.getItem('auth_token')) {
      this.props.history.push('/')
    }
  }

  handleLogin (data) {
    const { 
      fetchAuthLoginIfNeeded
    } = this.props

    fetchAuthLoginIfNeeded(data)
  }

  componentWillReceiveProps(nextProps) {
    const {
      authLogin
    } = this.props
    const obj ={}
    if (authLogin[obj] !== nextProps.authLogin[obj]) {
      this.handleAuth(nextProps.authLogin[obj]);
    }
  }

  handleAuth (data) {
    if (!data || data.readyStatus === "LOGIN_REQUESTING") {
      return this.setState({
        loading: true,
        err: ''
      }, () => {
        this.forceUpdate()
      })
    }

    if (data.readyStatus === "LOGIN_FAILURE") {
      return this.setState({
        err: data.err,
        loading: false
      })
    }
    const dataProfile = JSON.stringify(data.info.data.user)
    console.log()
    cookieStorage.setItem('prof',
      compressToEncodedURIComponent(dataProfile)
    )
    cookieStorage.setItem('rolenot',
      compressToEncodedURIComponent(data.info.data.user.user_tipe)
    )
    cookieStorage.setItem(
      'auth_token',
      compressToEncodedURIComponent(data.info.data.auth_token)
    );
    // if (data.info.data.user.user_tipe === "collateral_owner") {
    //   window.location = '/agunans'
    // }
    window.location = "/"
  }

  render() {
    const { loading, err } = this.state

    return (
      <PageWrapper buttonLogin showNav>
        <div className="login-page-background">
          <img
            src={require('../../app/assets/img/banner-home.svg')}
            alt="banner-home"
            className="background-cover"
          />
        </div>
        <div className="container">
          <div className="login-container">
            <div className="title-login">
              <h4>Silakan Masuk </h4>
              <p>
                Untuk melanjutkan proses order notaris, silakan masuk
                menggunakan akun Anda terlebih dahulu
              </p>
            </div>
            <div className="body-login">
              <Card>
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  onSubmit={value => {
                    this.handleLogin(value)
                  }}
                >
                  {({ errors, touched, values, setFieldValue }) => {
                    return (
                      <Form className="form-login">
                        <div className="row">
                          <div className="col-md-12">
                            <InputFormik
                              type="email"
                              name="email"
                              label="Email"
                              placeholder="Masukan email"
                              error={
                                errors.email && touched.email
                                  ? errors.email
                                  : null
                              }
                            />
                          </div>
                          <div className="col-md-12">
                            <InputFormik
                              name="password"
                              label="Password"
                              type="password"
                              placeholder="Masukan email"
                              error={
                                errors.email && touched.email
                                  ? errors.email
                                  : null
                              }
                            />
                          </div>
                          
                          <div className="col-md-12">
                            <div className="forgot-button">
                              <a href="/forgot">forgot password</a>
                            </div>
                          </div>
                          {
                            err && <div className="error">{err}</div>
                          }
                          <div className="col-md-12">
                            <div className="button-section">
                              <Button
                                className="button-left"
                                type="submit"
                                disabled={loading}
                              >
                                {loading ? 'Loading ...' : 'Login'} 
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Card>
              <div className="section-to-register">
                <p>
                  Belum memiliki akun? Silakan{' '}
                  <a href="/register">Register Akun Baru</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = ({
  authLogin
}: ReduxState) => ({
  authLogin
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuthLoginIfNeeded: (param: Object) =>
    dispatch(AuthLoginAction.fetchAuthLoginIfNeeded(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
