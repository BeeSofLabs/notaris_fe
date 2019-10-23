/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Select, Rate } from 'antd';
import Helmet from 'react-helmet';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';

import {
  PageWrapper,
  Card,
  InputFormik,
  Button
} from '../../components/element';

export class Login extends PureComponent<Props> {
  render() {
    return (
      <PageWrapper buttonLogin>
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
                  onSubmit={value => {}}
                >
                  {({ errors, touched, values, setFieldValue }) => {
                    return (
                      <Form className="form-login">
                        <div className="row">
                          <div className="col-md-12">
                            <InputFormik
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
                              <Link to="/forgot">forgot password</Link>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="button-section">
                              <Button
                                className="button-left"
                                type="submit"
                                disabled={false}
                              >
                                Login
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
                  <Link to="/register">Register Akun Baru</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
