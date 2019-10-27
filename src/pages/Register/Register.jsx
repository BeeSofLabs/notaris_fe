/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'

import {
  PageWrapper,
  Card,
  InputFormik,
  Button,
  SelectFormik
} from '../../components/element'

export class Register extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      optionsRole: [{
        label: 'Debitur',
        value: 'db'
      }, {
        label: 'Kreditur',
        value: 'kd'
      }, {
        label: 'Pemilik Agunan',
        value: 'pa'
      }, {
        label: 'Notaris',
        value: 'nt'
      }],
      optionsStatus: [{
        label: 'Perorangan',
        value: 0
      }]
    }
  }

  render() {
    const { optionsRole, optionsStatus } = this.state

    return (
      <PageWrapper buttonLogin>
        <div className="register-page-background">
          <div className="container">
            <div className="register-container">
              <div className="title-login">
                <h4>Silahkan Buat Akun Anda</h4>
                <p>Anda harus melengkapi formulir dibawah ini, untuk membuat akun</p>
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
                      confirm_password: ''
                    }}
                    onSubmit={value => {
                      window.location = `/account?role=${value.role.value}`
                    }}
                  >
                    {({ errors, touched, values, setFieldValue, onSubmit }) => {
                      const onChangeSelect = (name ,value) => {
                        setFieldValue(name, value)
                      }
                      return (
                        <Form className="form-login">
                          <div className="row">
                            <div className="col-md-6">
                              <SelectFormik 
                                name="role"
                                label="Mendaftar Sebagai"
                                value={values.role}
                                options={optionsRole}
                                onChange={(value) => onChangeSelect('role', value)}
                              />
                            </div>
                            <div className="col-md-6">
                              <SelectFormik 
                                name="status"
                                label="Status"
                                value={values.status}
                                options={optionsStatus}
                                onChange={(value) => onChangeSelect('status', value)}
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
                                error={errors.full_name && touched.full_name ? errors.full_name : null}
                              />
                            </div>
                            <div className="col-md-6">
                              <InputFormik
                                name="email"
                                label="Email"
                                placeholder="Email"
                                error={errors.email && touched.email ? errors.email : null}
                              />
                            </div>
                            <div className="col-md-6">
                              <InputFormik
                                name="nomor_hp"
                                label="Nomor Handphone"
                                placeholder="Nomor Handphone"
                                error={errors.nomor_hp && touched.nomor_hp ? errors.nomor_hp : null}
                              />
                            </div>
                            <div className="col-md-12">
                              <hr />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <InputFormik
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Password"
                                error={errors.password && touched.password ? errors.password : null}
                              />
                            </div>
                            <div className="col-md-6">
                              <InputFormik
                                type="password"
                                name="confirm_password"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                error={errors.confirm_password && touched.confirm_password ? errors.confirm_password : null}
                              />
                            </div>
                            <div className="col-md-12">
                              <div className="button-section">
                                <Button
                                  className="button-left"
                                  type="submit"
                                  disabled={false}
                                >
                                  Daftar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Form>
                      )
                    }}
                  </Formik>
                </Card>
                <div className="section-to-register">
                  <p>
                    Sudah memiliki akun? {' '}
                    <a href="/login">Login Disini</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    )
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);