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
  SelectFormik,
  DateInput,
  Textarea,
  Upload
} from '../../components/element'

const props = {
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      // message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      // message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export class Account extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      optionsRole: [{
        label: 'Debitur',
        value: 0
      }, {
        label: 'Kreditur',
        value: 1
      }, {
        label: 'Pemilik Agunan',
        value: 2
      }],
      optionsGender: [{
        label: 'Laki-Laki',
        value: 0
      }, {
        label: 'Perempuan',
        value: 1
      }]
    }
  }

  render() {
    const { optionsGender } = this.state

    return (
      <PageWrapper buttonLogin>
        <div className="register-page-background">
          <div className="container">
            <div className="account-container">
              <div className="title-login">
                <h4>Lengkapi Data Anda</h4>
                <p>Untuk melanjutkan proses order, Anda harus melengkapi form dibawah</p>
              </div>
              <div className="body-login">
                <Card>
                  <Formik
                    initialValues={{
                      nomorKtp: '',
                      jenis_kelamin: '',
                      tempat_lahir: '',
                      tanggal_lahir: '',
                      alamat_ktp: '',
                      longitude: '',
                      latitude: '',
                      ibu_kandung: '',
                      foto_ktp: '',
                      upload_foto_selfie: ''
                    }}
                    onSubmit={value => {}}
                  >
                    {({ errors, touched, values, setFieldValue }) => {
                      const onChangeSelect = (name ,value) => {
                        setFieldValue(name, value)
                      }
                      return (
                        <Form className="form-login">
                          <h3>Data Diri</h3>
                          <div className="row">
                            <div className="col-md-4">
                              <Upload 
                                name="foto_ktp"
                                label="Foto KTP"
                                options={props}
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="row">
                                <div className="col-md-6">
                                  <InputFormik
                                    name="no_ktp"
                                    label="Nomor KTP"
                                    placeholder="Nomor KTP"
                                    error={errors.no_ktp && touched.no_ktp ? errors.no_ktp : null}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <SelectFormik 
                                    name="jenis_kelamin"
                                    label="Jenis Kelamin"
                                    value={values.jenis_kelamin}
                                    options={optionsGender}
                                    onChange={(value) => onChangeSelect('jenis_kelamin', value)}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <InputFormik
                                    name="tempat_lahir"
                                    label="Tempat Lahir"
                                    placeholder="Tempat Lahir"
                                    error={errors.tempat_lahir && touched.tempat_lahir ? errors.tempat_lahir : null}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <DateInput 
                                    name="tanggal_lahir"
                                    label="Tanggal Lahir"
                                    placeholder="Pilih Tangal Lahir"
                                    error={errors.tanggal_lahir && touched.tanggal_lahir ? errors.tanggal_lahir : null}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                              <Textarea
                                rows="7"
                                name="alamat_ktp"
                                label="Alamat (Sesuai KTP)"
                                placeholder="Masukan alamat"
                                value={values.alamat_ktp}
                                error={errors.luasTanah && touched.luasTanah ? errors.luasTanah : null}
                              />
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-12">
                                  <InputFormik
                                    name="longitude"
                                    label="Masukan Longitude"
                                    placeholder="Masukan Luas Tanah"
                                    error={errors.luasTanah && touched.luasTanah ? errors.luasTanah : null}
                                  />
                                </div>
                                <div className="col-md-12">
                                  <InputFormik
                                    name="latitude"
                                    label="Masukan Latitude"
                                    placeholder="Masukan Latitude"
                                    error={errors.latitude && touched.latitude ? errors.latitude : null}
                                  />
                                </div>
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
                    <Link to="/login">Login Disini</Link>
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
)(Account);