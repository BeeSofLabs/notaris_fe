/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  PageWrapper,
  Card,
  InputFormik,
  Button
} from '../../components/element';

import * as AuthForgotPassword from '../../actions/auth/forgotPassword'

import type {
  ForgotPassword,
  Dispatch, 
  ReduxState 
} from '../../types'

export class Forgot extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      err: ''
    }
  }

  render() {
    const { err,loading } = this.state
    const { fetchAuthForgotPasswordIfNeeded } = this.props
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
              <h4>Lupa Password?</h4>
              <p>
              Silakan masukkan email Anda yang telah terdaftar di aplikasi NOTARIOUS
              </p>
            </div>
            <div className="body-login">
              <Card>
                <Formik
                  initialValues={{
                    email: '',
                  }}
                  onSubmit={value => {
                    fetchAuthForgotPasswordIfNeeded(value)
                    // this.handleLogin(value)
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
                                {loading ? 'Loading ...' : 'Reset Password'} 
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
                  Ingin masuk menggunakan akun anda?{' '} silahkan {' '}
                  <a href="/login">Login disini</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    )
  }
}

const mapStateToProps = ({
  forgotPassword
}: ReduxState) => ({
  forgotPassword
});

const mapDispatchToProps = (dispatch :Dispatch) => ({
  fetchAuthForgotPasswordIfNeeded: (param: Object) =>
    dispatch(AuthForgotPassword.fetchAuthForgotPasswordIfNeeded(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forgot);