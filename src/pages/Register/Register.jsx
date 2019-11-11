/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Modal } from 'antd';
import { CookieStorage } from 'cookie-storage';
import {
  PageWrapper,
  Card,
  InputFormik,
  Button,
  SelectFormik
} from '../../components/element';

import * as AuthRegisterAction from '../../actions/auth/register';
import type { AuthRegister, Dispatch, ReduxState } from '../../types';

export class Register extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      optionsRole: [
        {
          label: 'Debitur',
          value: 'db'
        },
        {
          label: 'Kreditur',
          value: 'kr'
        },
        {
          label: 'Pemilik Agunan',
          value: 'pa'
        },
        {
          label: 'Notaris',
          value: 'nt'
        }
      ],
      optionsStatus: [
        {
          label: 'Perorangan',
          value: 'pr'
        },
        {
          label: 'Badan Usaha',
          value: 'bu'
        }
      ],
      loading: false,
      err: ''
    };

    this.handleAuth = this.handleAuth.bind(this);
  }

  handleRegister(data) {
    const { fetchAuthRegisterIfNeeded } = this.props;
    console.log(data);
    fetchAuthRegisterIfNeeded(data);
  }

  componentWillReceiveProps(nextProps) {
    const { authRegister } = this.props;
    const obj = {};
    console.log('asds', authRegister, nextProps.authRegister);
    if (authRegister[obj] !== nextProps.authRegister[obj]) {
      console.log('asd', nextProps);
      this.handleAuth(nextProps.authRegister[obj]);
    }
  }

  handleAuth(data) {
    if (!data || data.readyStatus === 'REGISTER_REQUESTING') {
      return this.setState(
        {
          loading: true,
          err: ''
        },
        () => {
          this.forceUpdate();
        }
      );
    }

    if (!data || data.readyStatus === 'REGISTER_FAILURE') {
      return this.setState(
        {
          loading: false,
          err: data.err
        },
        () => {
          this.forceUpdate();
        }
      );
    }

    console.log('berhasil', data);
    Modal.success({
      content: data.info.data.message,
      onOk: () => (window.location = '/login')
    });
  }

  render() {
    const { optionsRole, loading, err } = this.state;
    console.log(this.props);
    const Schema = Yup.object().shape({
      role: Yup.object()
        .shape({
          label: Yup.string().required('Tidak boleh ksoong.')
        })
        .required('Tidak boleh kosong'),
      status: Yup.object()
        .shape({
          label: Yup.string().required('Tidak boleh ksoong.')
        })
        .required('Tidak boleh kosong.'),
      full_name: Yup.string().required('Tidak boleh ksoong.'),
      email: Yup.string().required('Tidak boleh ksoong.'),
      nomor_hp: Yup.string().required('Tidak boleh kosong.'),
      password: Yup.string().required('Tidak boleh ksoong.'),
      confirm_password: Yup.string().required('Tidak boleh ksoong.')
    });

    return (
      <PageWrapper buttonLogin showNav>
        <div className="register-page-background">
          <div className="container">
            <div className="register-container">
              <div className="title-login">
                <h4>Silahkan Buat Akun Anda</h4>
                <p>
                  Anda harus melengkapi formulir dibawah ini, untuk membuat akun
                </p>
              </div>
              <div className="body-login">
                <Card>
                  <Formik
                    initialValues={{
                      role: '',
                      status: '',
                      full_name: '',
                      email: '',
                      nomor_hp: '',
                      password: '',
                      confirm_password: '',
                      optionsStatus: [
                        {
                          label: 'Perorangan',
                          value: 'pr'
                        },
                        {
                          label: 'Badan Usaha',
                          value: 'bu'
                        }
                      ]
                    }}
                    validationSchema={Schema}
                    onSubmit={value => {
                      // this.handleRegister(value)
                      window.location = `/account?role=${value.role.value}&status=${value.status.value}`;
                    }}
                  >
                    {({ errors, touched, values, setFieldValue, onSubmit }) => {
                      
                      const onChangeSelect = (name, value) => {
                        if (value.value === 'nt' && name === 'role') {
                          const optionsStatus = [{
                            label: 'Perorangan',
                            value: 'pr'
                          }]
                          setFieldValue('optionsStatus', optionsStatus)

                        } else {
                          if (name === 'role') {
                            const optionsStatus = [
                              {
                                label: 'Perorangan',
                                value: 'pr'
                              },
                              {
                                label: 'Badan Usaha',
                                value: 'bu'
                              }
                            ]
                            setFieldValue('optionsStatus', optionsStatus)
                          }
                        }
                        setFieldValue(name, value);
                      };
                      return (
                        <Form className="form-login">
                          <div className="row">
                            <div className="col-md-6">
                              <SelectFormik
                                name="role"
                                label="Mendaftar Sebagai"
                                value={values.role}
                                options={optionsRole}
                                onChange={value =>
                                  onChangeSelect('role', value)
                                }
                                error={
                                  errors.role && touched.role
                                    ? errors.role.label
                                    : null
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <SelectFormik
                                name="status"
                                label="Status"
                                value={values.status}
                                options={values.optionsStatus}
                                onChange={value =>
                                  onChangeSelect('status', value)
                                }
                              />
                            </div>
                            <div className="col-md-12">
                              <hr />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <InputFormik
                                name="full_name"
                                label="Nama Lengkap"
                                placeholder="Nama Lengkap"
                                error={
                                  errors.full_name && touched.full_name
                                    ? errors.full_name
                                    : null
                                }
                              />
                            </div>

                            <div className="col-md-6">
                              <InputFormik
                                name="nomor_hp"
                                label="Nomor Handphone"
                                placeholder="Nomor Handphone"
                                error={
                                  errors.nomor_hp && touched.nomor_hp
                                    ? errors.nomor_hp
                                    : null
                                }
                              />
                            </div>
                            <div className="col-md-12">
                              <hr />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <InputFormik
                                name="email"
                                label="Email"
                                placeholder="Email"
                                error={
                                  errors.email && touched.email
                                    ? errors.email
                                    : null
                                }
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <InputFormik
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Password"
                                error={
                                  errors.password && touched.password
                                    ? errors.password
                                    : null
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <InputFormik
                                type="password"
                                name="confirm_password"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                error={
                                  errors.confirm_password &&
                                  touched.confirm_password
                                    ? errors.confirm_password
                                    : null
                                }
                              />
                            </div>
                            {err && <div className="error">{err}</div>}
                            <div className="col-md-12">
                              <div className="button-section">
                                <Button
                                  className="button-left"
                                  type="submit"
                                  disabled={loading}
                                >
                                  {loading ? 'Loading ...' : 'Lanjut'}
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
                    Sudah memiliki akun? <a href="/login">Login Disini</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = ({ authRegister }: ReduxState) => ({
  authRegister
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuthRegisterIfNeeded: (param: Object) =>
    dispatch(AuthRegisterAction.fetchAuthRegisterIfNeeded(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
