/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import { Upload, Icon, message } from 'antd';
import  queryString from 'query-string'

import {
  PageWrapper,
  Card,
  InputFormik,
  Button,
  SelectFormik,
  DateInput,
  Textarea,
  // Upload
} from '../../components/element'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

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
      }],
      optionKerja: [{
        label: "Bekasi",
        value: 1
      }, {
        label: "Jakarta",
        value: 0
      }],
      optionBank: [{
        label: 'BNI',
        value: 0
      }, {
        label: 'BRI',
        value: 1
      }, {
        label: 'Mandiri',
        value: 0
      }],
      role: '',
      showPendamping: true
    }
    
    this.changeButtonPendamping = this.changeButtonPendamping.bind(this)
  }

  componentWillMount () {
    try {
      this.setState({
        role: queryString.parse(this.props.location.search).role
      })
    } catch(e) {
      window.location = '/'
    }
  }

  handleChange = info => {
    console.log('asd', info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  changeButtonPendamping = () => {
    this.setState({
      showPendamping: false
    })
  }

  handleChangeB = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrlB =>
        this.setState({
          imageUrlB,
          loading: false,
        }),
      );
    }
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    getBase64(file, imageUrl =>
      this.setState({
        imageUrl,
        loading: false,
      })
    );
    return false
  }

  renderDebitur () {
    const  { optionsGender, imageUrl, imageUrlB, showPendamping } = this.state
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
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
          hubungan_pendamping: '',
          full_name_pendamping: '',
          nomorKtp_pendamping: '',
          jenis_kelamin_pedamping: '',
          alamat_lengkap_pendamping: ''
        }}
        onSubmit={value => {}}
      >
        {({ errors, touched, values, setFieldValue }) => {
          const onChangeSelect = (name ,value) => {
            setFieldValue(name, value)
          }
          const onChangeDate = (date, dateString) => {
            setFieldValue('tanggal_lahir', date)
          }

          const onChangeTextarea = (e) => {
            setFieldValue(e.target.name, e.target.value)
          }


          return (
            <Form className="form-login">
              <h3>Data Diri</h3>
              <div className="row">
                <div className="col-md-4">
                  <div className="group-input-formik">
                    <label>
                      Foto KTP
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                        showUploadList={false}
                      >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                      </Upload>
                    </label>
                  </div>
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
                        onChange={onChangeDate}
                        error={errors.tanggal_lahir && touched.tanggal_lahir ? errors.tanggal_lahir : null}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <Textarea
                    rows="7"
                    name="alamat_ktp"
                    label="Alamat (Sesuai KTP)"
                    placeholder="Masukan alamat"
                    value={values.alamat_ktp}
                    error={errors.luasTanah && touched.luasTanah ? errors.luasTanah : null}
                    onChange={onChangeTextarea}
                  />
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12">
                      <InputFormik
                        name="ibu_kandung"
                        label="Nama Ibu Kandung"
                        placeholder="Masukan nama ibu..."
                        error={errors.luasTanah && touched.luasTanah ? errors.luasTanah : null}
                      />
                    </div>
                  </div>
                </div>
              </div>  
              <hr />
              {showPendamping && <div className="col-md-4 mg-top-20"><Button
                className="button-left"
                type="button"
                disabled={false}
                onClick={this.changeButtonPendamping}
              >
                Tambah Pendamping
              </Button></div>}
              {!showPendamping && <div className="row mg-top-20">
                <div className="col-md-4">
                  <InputFormik
                    name="hubungan_pendamping"
                    label="Hubungan Pendamping"
                    placeholder="Masukan hubungan .."
                    error={errors.hubungan_pendamping && touched.hubungan_pendamping ? errors.hubungan_pendamping : null}
                  />
                </div>
                <div className="col-md-4">
                  <InputFormik
                    name="full_name_pendamping"
                    label="Nama Lengkap"
                    placeholder="Masukan nama lengkap"
                    error={errors.full_name_pendamping && touched.full_name_pendamping ? errors.full_name_pendamping : null}
                  />
                </div>
                <div className="col-md-4">
                  <InputFormik
                    name="nomorKtp_pendamping"
                    label="Nomor KtP"
                    placeholder="Masukan no ktp"
                    error={errors.nomorKtp_pendamping && touched.nomorKtp_pendamping ? errors.nomorKtp_pendamping : null}
                  />
                </div>
                <div className="col-md-4">
                  <SelectFormik 
                    name="jenis_kelamin_pendamping"
                    label="Jenis Kelamin"
                    value={values.jenis_kelamin_pedamping}
                    options={optionsGender}
                    onChange={(value) => onChangeSelect('jenis_kelamin_pendamping', value)}
                  />
                </div>
                <div className="col-md-4">
                  <Textarea
                    rows="7"
                    name="alamat_lengkap_pendamping"
                    label="Alamat (Sesuai KTP)"
                    placeholder="Masukan alamat"
                    value={values.alamat_lengkap_pendamping}
                    error={errors.alamat_lengkap_pendamping && touched.alamat_lengkap_pendamping ? errors.alamat_lengkap_pendamping : null}
                  />
                </div>
              </div>
              }
              <div className="button-section-form">
                <Button
                  className="button-left"
                  type="button"
                  disabled={false}
                >
                  lewati
                </Button>
                <Button
                  className="button-right"
                  type="submit"
                  disabled={false}
                >
                  Daftar
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    )
  }


  renderBpn () {
    const  { optionsGender, imageUrl, imageUrlB } = this.state
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
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
                  <div className="group-input-formik">
                    <label>
                      Foto KTP
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                      >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                      </Upload>
                    </label>
                  </div>
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
                  <div className="group-input-formik">
                    <label>
                      Foto KTP
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                      >
                        {imageUrlB ? <img src={imageUrlB} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                      </Upload>
                    </label>
                  </div>
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
    )
  }

  renderNotaris () {
    const { optionBank, optionKerja } = this.state;
    return (
      <Formik
        initialValues={{
          nomor_sk: '',
          tgl_sk: '',
          nomor_akta: '',
          tanggal_akta: '',
          tempat_lahir: '',
          tanggal_lahir: '',
          wilayah_kerja: '',
          no_telp_kantor: '',
          no_fax: '',
          alamat_kantor: '',
          no_rek: '',
          nama_bank: '',
        }}
        onSubmit={value => {}}
      >
        {
          ({errors, touched, values,setFieldValue,}) => {
            const onChangeSelect = (name ,value) => {
              setFieldValue(name, value)
            }
            return (
              <Form className="form-login">
                <div className="row">
                  <div className="col-md-4">
                    <InputFormik
                      name="no_ktp"
                      label="Nomor KTP"
                      placeholder="Nomor KTP"
                      error={errors.no_ktp && touched.no_ktp ? errors.no_ktp : null}
                    />
                  </div>
                  <div className="col-md-4">
                    <DateInput 
                      name="tgl_sk"
                      label="Tanggal SK"
                      placeholder="Pilih Tangal SK"
                      error={errors.tanggal_lahir && touched.tanggal_lahir ? errors.tanggal_lahir : null}
                    />
                  </div>
                  <div className="col-md-4">
                    <InputFormik
                      name="no_akta"
                      label="Nomor Akta"
                      placeholder="Nomor Akta"
                      error={errors.no_akta && touched.no_akta ? errors.no_akta : null}
                    />
                  </div>
                  <div className="col-md-4">
                    <DateInput 
                      name="tanggal_akta"
                      label="Tanggal Akta"
                      placeholder="Pilih Tangal Akta"
                      error={errors.tanggal_akta && touched.tanggal_akta ? errors.tanggal_akta : null}
                    />
                  </div>
                  <div className="col-md-4">
                    <InputFormik
                      name="tempat_lahir"
                      label="Tempat Lahir"
                      placeholder="Tempat Lahir"
                      error={errors.tempat_lahir && touched.tempat_lahir ? errors.tempat_lahir : null}
                    />
                  </div>
                  <div className="col-md-4">
                    <DateInput 
                      name="tanggal_lahir"
                      label="Tanggal Lahir"
                      placeholder="Pilih Tangal Lahir"
                      error={errors.tanggal_lahir && touched.tanggal_lahir ? errors.tanggal_lahir : null}
                    />
                  </div>
                  <div className="col-md-4">
                    <SelectFormik 
                      name="wilayah_kerja"
                      label="Wilayah Kerja"
                      value={values.wilayah_kerja}
                      options={optionKerja}
                      onChange={(value) => onChangeSelect('wilayah_kerja', value)}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4">
                    <InputFormik
                      name="no_telp_kantor"
                      label="Nomor Telpon Kantor"
                      placeholder="Masukan no telp"
                      error={errors.no_telp_kantor && touched.no_telp_kantor ? errors.no_telp_kantor : null}
                    />
                  </div>
                  <div className="col-md-4">
                    <InputFormik
                      name="no_fax"
                      label="Nomor Fax"
                      placeholder="Masukan no fax"
                      error={errors.no_fax && touched.no_fax ? errors.no_fax : null}
                    />
                  </div>
                  <div className="col-md-4">
                    <Textarea
                      rows="7"
                      name="alamat_kantor"
                      label="Alamat Kantor"
                      placeholder="Masukan alamat kantor"
                      value={values.alamat_kantor}
                      error={errors.alamat_kantor && touched.alamat_kantor ? errors.alamat_kantor : null}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4">
                    <InputFormik
                      name="no_rek"
                      label="Nomor Rekening"
                      placeholder="Masukan no rekiening"
                      error={errors.no_rek && touched.no_rek ? errors.no_rek : null}
                    />
                  </div>
                  <div className="col-md-4">
                    <SelectFormik 
                      name="nama_bank"
                      label="Nama Bank"
                      value={values.nama_bank}
                      options={optionBank}
                      onChange={(value) => onChangeSelect('nama_bank', value)}
                    />
                  </div>
                </div>
              </Form>
            )
          }
        }
      </Formik>
    )
  }

  render() {
    const { role } = this.state
    
    return (
      <PageWrapper buttonLogin showNav>
        <div className="register-page-background">
          <div className="container">
            <div className="account-container">
              <div className="title-login">
                <h4>Lengkapi Data Anda</h4>
                <p>Untuk melanjutkan proses order, Anda harus melengkapi form dibawah</p>
              </div>
              <div className="body-login">
                <Card>
                  {
                    role != "nt" && this.renderDebitur()
                  }
                  {
                    role == "nt" && this.renderNotaris()
                  }
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
)(Account);