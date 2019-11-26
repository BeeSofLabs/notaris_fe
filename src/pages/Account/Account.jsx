/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Upload, Icon, message } from 'antd';
import * as Yup from 'yup'
import queryString from 'query-string';
import moment from 'moment';
import { CookieStorage } from 'cookie-storage';
import { decompressFromEncodedURIComponent } from 'lz-string'
import * as AuthRegisterAction from '../../actions/auth/register';
import * as AreaProvinceAction from '../../actions/area/province';
import * as AreaCityAction from '../../actions/area/city'
import * as AreaDistrictAction from '../../actions/area/district';

import type { 
  AuthRegister,
  AreaProvince as AreaProvinceType,
  AreaCity as AreaCityType,
  AreaDistrict as AreaDistrictType, 
  Dispatch, 
  ReduxState 
} from '../../types';
import { Modal } from 'antd'
import {
  PageWrapper,
  Card,
  InputFormik,
  Button,
  SelectFormik,
  DateInput,
  Textarea
  // Upload
} from '../../components/element';

const cookieStorage = new CookieStorage({
  path: '/'
});

const dateFormat = 'YYYY/MM/DD';

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
    super(props);

    this.state = {
      optionsRole: [
        {
          label: 'Debitur',
          value: 0
        },
        {
          label: 'Kreditur',
          value: 1
        },
        {
          label: 'Pemilik Agunan',
          value: 2
        }
      ],
      optionsGender: [
        {
          label: 'Tn',
          value: 0
        },
        {
          label: 'Ny',
          value: 1
        }
      ],
      optionKerja: [
        {
          label: 'Bekasi',
          value: 1
        },
        {
          label: 'Jakarta',
          value: 0
        }
      ],
      optionBank: [
        {
          label: 'BNI',
          value: 0
        },
        {
          label: 'BRI',
          value: 1
        },
        {
          label: 'Mandiri',
          value: 0
        }
      ],
      optionsStatus: [
        {
          label: 'Suami',
          value: 0
        },
        {
          label: 'Istri',
          value: 1
        }
      ],
      role: '',
      status: '',
      showPendamping: true,
      imageKtpUrl: '',
      imageFotoUrl: '',
      loading: false,
      err: '',
      provOptions: [],
      cityOptions: [],
      distOptions: []
    };

    this.changeButtonPendamping = this.changeButtonPendamping.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  componentWillMount() {
    const {
      fetchAreaProvinceIfNeeded,
      match
    } = this.props
    try {
      this.setState({
        role: queryString.parse(this.props.location.search).role,
        status: queryString.parse(this.props.location.search).status
      });
    } catch (e) {
      window.location = '/';
    }
    fetchAreaProvinceIfNeeded(match);
  }

  componentWillReceiveProps(nextProps) {
    const { authRegister, areaProvince, areaCity, areaDistrict } = this.props;
    const obj = {};
    if (authRegister[obj] !== nextProps.authRegister[obj]) {
      this.handleAuth(nextProps.authRegister[obj])
    }

    if (nextProps.areaCity[obj] !== areaCity[obj]) {
      this.areaCityData(nextProps.areaCity[obj]);
    }

    if (nextProps.areaProvince[obj] !== areaProvince[obj]) {
      this.areaProvinceData(nextProps.areaProvince[obj]);
    }

    if (nextProps.areaDistrict[obj] !== areaDistrict[obj]) {
      this.areaDistrictData(nextProps.areaDistrict[obj]);
    }
  }

  areaCityData = areaCity => {
    const getAreaCity = areaCity;
    if (!getAreaCity || getAreaCity.readyStatus === 'AREA_CITY_REQUESTING') {
      this.setState({
        cityOptions: []
      })
    } else if (getAreaCity.readyStatus === 'AREA_CITY_FAILURE') {
      return <p>Oops, Failed to load info!</p>;
    } else {
      let data = [];
      const listDropdown = _.map(getAreaCity.info.data.cities, key => {
        data = {
          label: key.city_name,
          value: key.id
        };
        return data;
      });

      this.setState({
        cityOptions: listDropdown
      })
    }
  };

  areaDistrictData = areaDistrict => {
    const getAreaDistrict = areaDistrict;
    if (
      !getAreaDistrict ||
      getAreaDistrict.readyStatus === 'AREA_DISTRICT_REQUESTING'
    ) {
      this.setState({
        distOptions: []
      })
    } else if (getAreaDistrict.readyStatus === 'AREA_DISTRICT_FAILURE') {
      return <p>Oops, Failed to load info!</p>;
    } else {
      let data = [];
      const listDropdown = _.map(getAreaDistrict.info.data.districts, key => {
        data = {
          label: key.district_name,
          value: key.id
        };
        return data;
      });
      this.setState({
        distOptions: listDropdown
      })
    }
  }

  areaProvinceData = areaProvince => {
    const getAreaProvince = areaProvince;

    if (
      !getAreaProvince ||
      getAreaProvince.readyStatus === 'AREA_PROVINCE_REQUESTING'
    ) {
      console.log('loading');
    } else if (getAreaProvince.readyStatus === 'AREA_PROVINCE_FAILURE') {
      console.log('failed');
    } else {
      let data = [];
      const listDropdown = _.map(
        getAreaProvince.info.data.provinces,
        key => {
          data = {
            label: key.province_name,
            value: key.id
          };
          return data;
        }
      );

      this.setState({
        provOptions: listDropdown,
      });
    }
  };



  handleAuth(data) {
    if (!data || data.readyStatus === 'REGISTER_REQUESTING') {
      return this.setState(
        {
          loading: true,
        },
        () => {
          this.forceUpdate();
        }
      );
    }

    if (!data || data.readyStatus === 'REGISTER_FAILURE') {
      Modal.error({
        content: data.err,
        // onOk: () => (window.location = '/login')
      });
      return this.setState(
        {
          loading: false,
        },
        () => {
          this.forceUpdate();
        }
      );
    }

    Modal.success({
      content: data.info.data.message,
      onOk: () => (window.location = '/login')
    });
  }

  handleChange = info => {
    console.log('asd', info);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  changeButtonPendamping = () => {
    this.setState({
      showPendamping: false
    });
  };

  handleChangeB = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrlB =>
        this.setState({
          imageFotoUrl: imageUrlB,
          loading: false
        })
      );
    }
  };

  beforeUpload = file => {
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
        imageKtpUrl: imageUrl,
        loading: false
      })
    );
    return false;
  };

  beforeUploadB = file => {
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
        imageFotoUrl: imageUrl,
        loading: false
      })
    );
    return false;
  };

  renderDebitur() {
    let {
      optionsGender,
      imageFotoUrl,
      imageKtpUrl,
      showPendamping,
      optionsStatus,
      status,
      role,
      loading
    } = this.state;
    let Schema = Yup.object().shape({
      namaLengkap: Yup.string().required('Tidak boleh kosong.'),
      nomorKtp: Yup.string().required('Tidak boleh kosoong.'),
      jenis_kelamin: Yup.object().shape({
        label: Yup.string().required('Tidak boleh kosong.')
      }),
      tempat_lahir: Yup.string().required('Tidak boleh kosong.'),
      tanggal_lahir: Yup.string().required('Tidak boleh kosong.'),
      alamat_ktp: Yup.string().required('Tidak boleh kosong.'),
      longitude: Yup.string().required('Tidak boleh kosong.'),
      latitude: Yup.string().required('Tidak boleh kosong.')
    })

    if (status === 'badan_usaha') {
      Schema = Yup.object().shape({
        namaLengkap: Yup.string().required('Tidak boleh kosong.'),
        nomorKtp: Yup.string().required('Tidak boleh kosoong.'),
        jenis_kelamin: Yup.object().shape({
          label: Yup.string().required('Tidak boleh kosong.')
        }),
        tempat_lahir: Yup.string().required('Tidak boleh kosong.'),
        tanggal_lahir: Yup.string().required('Tidak boleh kosong.'),
        alamat_ktp: Yup.string().required('Tidak boleh kosong.'),
        longitude: Yup.string().required('Tidak boleh kosong.'),
        latitude: Yup.string().required('Tidak boleh kosong.'),
        jabatan: Yup.string().required('Tidak boleh kosong.'),
        komparisi: Yup.string().required('Tidak boleh kosong.'),
        nama_badan_usaha: Yup.string().required('Tidak boleh kosong.'),
      })
    }

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    if ((role === 'debitur') || (role === 'kreditur') || (role === 'collateral_owner') ) {
      optionsStatus = [
        {
          label: 'Suami',
          value: 0
        },
        {
          label: 'Istri',
          value: 1
        },
        {
          label: 'Ahli Waris',
          value: 2
        }
      ]
    }
    return (
      <Formik
        initialValues={{
          namaLengkap: '',
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
          alamat_lengkap_pendamping: '',
          jabatan: '',
          komparisi: '',
          nama_badan_usaha: '',
          longitude_pendamping: '',
          latitude_pendamping: '',
          status_pendamping: '',
          komparisi_pendamping: ''
        }}
        validationSchema={Schema}
        onSubmit={value => {
          const { fetchAuthRegisterIfNeeded } = this.props
          let params = JSON.parse(decompressFromEncodedURIComponent(cookieStorage.getItem('pR')));
          params.address = value.alamat_ktp;
          params.gender = value.jenis_kelamin.value || '';
          params.identity_number = parseInt(value.nomorKtp);
          params.dob = value.tanggal_lahir;
          params.lat = parseFloat(value.latitude);
          params.lng = parseFloat(value.longitude);
          params.identity_image = imageKtpUrl;
          params.selfie_image = imageFotoUrl;
          params.name_companion = value.full_name_pendamping;
          params.idcard_number_companion = parseInt(value.nomorKtp_pendamping);
          params.gender_companion = value.jenis_kelamin_pedamping.value || '';
          params.address_companion = value.alamat_lengkap_pendamping || '';
          params.lat_companion = parseFloat(value.latitude_pendamping) || '';
          params.lng_companion = parseFloat(value.longitude_pendamping) || '';
          params.status_companion = value.status_pendamping || '';

          if (status === 'badan_usaha') {
            params.occupation = value.jabatan;
            params.komparisi = value.komparisi;
            params.name_organization = value.nama_badan_usaha;
            params.komparisi_companion = value.komparisi_pendamping || '';
          }

          fetchAuthRegisterIfNeeded(params);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => {
          const onChangeSelect = (name, value) => {
            setFieldValue(name, value);
          };
          const onChangeDate = (date, dateString) => {
            setFieldValue('tanggal_lahir', date);
          };

          const onChangeTextarea = e => {
            setFieldValue(e.target.name, e.target.value);
          };
          console.log('asd', errors)
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
                        {imageKtpUrl ? (
                          <img
                            src={imageKtpUrl}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </label>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-6">
                      <InputFormik
                        name="namaLengkap"
                        label="Nama Lengkap"
                        placeholder="Nama lengkap"
                        error={
                          errors.namaLengkap && touched.namaLengkap ? errors.namaLengkap : null
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <InputFormik
                        name="nomorKtp"
                        label="Nomor KTP"
                        placeholder="Nomor KTP"
                        error={
                          errors.nomorKtp && touched.nomorKtp ? errors.no_ktp : null
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <SelectFormik
                        name="jenis_kelamin"
                        label="Jenis Kelamin"
                        value={values.jenis_kelamin}
                        options={optionsGender}
                        onChange={value =>
                          onChangeSelect('jenis_kelamin', value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <InputFormik
                        name="tempat_lahir"
                        label="Tempat Lahir"
                        placeholder="Tempat Lahir"
                        error={
                          errors.tempat_lahir && touched.tempat_lahir
                            ? errors.tempat_lahir
                            : null
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <DateInput
                        name="tanggal_lahir"
                        label="Tanggal Lahir"
                        placeholder="Pilih Tangal Lahir"
                        onChange={onChangeDate}
                        value={values.tanggal_lahir}
                        error={
                          errors.tanggal_lahir && touched.tanggal_lahir
                            ? errors.tanggal_lahir
                            : null
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="group-input-formik">
                    <label>
                      Foto Diri
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={this.beforeUploadB}
                        onChange={this.handleChange}
                      >
                        {imageFotoUrl ? (
                          <img
                            src={imageFotoUrl}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )}
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
                    error={
                      errors.luasTanah && touched.luasTanah
                        ? errors.luasTanah
                        : null
                    }
                    onChange={onChangeTextarea}
                  />
                </div>
                <div className="col-md-4">
                  <div className="row">
                    {/* <div className="col-md-12">
                      <InputFormik
                        name="ibu_kandung"
                        label="Nama Ibu Kandung"
                        placeholder="Masukan nama ibu..."
                        error={errors.luasTanah && touched.luasTanah ? errors.luasTanah : null}
                      />
                    </div> */}
                    <div className="col-md-12">
                      <InputFormik
                        name="longitude"
                        label="Longitude"
                        placeholder="..."
                        error={
                          errors.luasTanah && touched.luasTanah
                            ? errors.luasTanah
                            : null
                        }
                      />
                    </div>
                    <div className="col-md-12">
                      <InputFormik
                        name="latitude"
                        label="Latitude"
                        placeholder="Masukan Latitude"
                        error={
                          errors.latitude && touched.latitude
                            ? errors.latitude
                            : null
                        }
                      />
                    </div>
                  </div>
                </div>
                {status === 'badan_usaha' && (
                  <React.Fragment>
                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-md-12">
                          <InputFormik
                            name="jabatan"
                            label="Jabatan"
                            placeholder="Masukan Jabatan"
                            error={
                              errors.jabatan && touched.jabatan
                                ? errors.jabatan
                                : null
                            }
                          />
                        </div>
                        <div className="col-md-12">
                          <Textarea
                            rows="7"
                            name="komparisi"
                            label="Komparisi"
                            placeholder="Masukan komparisi"
                            value={values.komparisi}
                            error={
                              errors.komparisi &&
                              touched.komparisi
                                ? errors.komparisi
                                : null
                            }
                            onChange={onChangeTextarea}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <InputFormik
                        name="nama_badan_usaha"
                        label="Nama Badan Usaha"
                        placeholder="Masukan nama ..."
                        error={
                          errors.nama_badan_usaha && touched.nama_badan_usaha
                            ? errors.nama_badan_usaha
                            : null
                        }
                      />
                    </div>
                  </React.Fragment>
                )}
              </div>
              <hr />
              {(showPendamping) && (
                <div className="col-md-4 mg-top-20">
                  <Button
                    className="button-left"
                    type="button"
                    disabled={false}
                    onClick={this.changeButtonPendamping}
                  >
                    Tambah Pendamping
                  </Button>
                </div>
              )}
              {!showPendamping && (
                <div className="row mg-top-20">
                  {/* <div className="col-md-4">
                    <InputFormik
                      name="hubungan_pendamping"
                      label="Hubungan Pendamping"
                      placeholder="Masukan hubungan .."
                      error={
                        errors.hubungan_pendamping &&
                        touched.hubungan_pendamping
                          ? errors.hubungan_pendamping
                          : null
                      }
                    />
                  </div> */}
                  <div className="col-md-4">
                    <InputFormik
                      name="full_name_pendamping"
                      label="Nama Lengkap"
                      placeholder="Masukan nama lengkap"
                      error={
                        errors.full_name_pendamping &&
                        touched.full_name_pendamping
                          ? errors.full_name_pendamping
                          : null
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <InputFormik
                      name="nomorKtp_pendamping"
                      label="Nomor KTP"
                      placeholder="Masukan no ktp"
                      error={
                        errors.nomorKtp_pendamping &&
                        touched.nomorKtp_pendamping
                          ? errors.nomorKtp_pendamping
                          : null
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-12">
                        <SelectFormik
                          name="jenis_kelamin_pendamping"
                          label="Jenis Kelamin"
                          value={values.jenis_kelamin_pendamping}
                          options={optionsGender}
                          onChange={value =>
                            onChangeSelect('jenis_kelamin_pendamping', value)
                          }
                        />
                      </div>
                      <div className="col-md-12">
                        <SelectFormik
                          name="status_pendamping"
                          label="Status Pendamping"
                          value={values.status_pendamping}
                          options={optionsStatus}
                          onChange={value =>
                            onChangeSelect('status_pendamping', value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <Textarea
                      rows="7"
                      name="alamat_lengkap_pendamping"
                      label="Alamat (Sesuai KTP)"
                      placeholder="Masukan alamat"
                      value={values.alamat_lengkap_pendamping}
                      error={
                        errors.alamat_lengkap_pendamping &&
                        touched.alamat_lengkap_pendamping
                          ? errors.alamat_lengkap_pendamping
                          : null
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-12">
                        <InputFormik
                          name="longitude_pendamping"
                          label="Masukan Longitude"
                          placeholder="..."
                          error={
                            errors.luasTanah && touched.luasTanah
                              ? errors.luasTanah
                              : null
                          }
                        />
                      </div>
                      <div className="col-md-12">
                        <InputFormik
                          name="latitude_pendamping"
                          label="Masukan Latitude"
                          placeholder="Masukan Latitude"
                          error={
                            errors.latitude && touched.latitude
                              ? errors.latitude
                              : null
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {status === 'badan_usaha' && (
                    <div className="col-md-4">
                      <Textarea
                        rows="7"
                        name="komparisi_pendamping"
                        label="Komparisi Pendamping"
                        placeholder="Masukan komparisi"
                        value={values.komparisi_pendamping}
                        error={
                          errors.komparisi_pendamping &&
                          touched.komparisi_pendamping
                            ? errors.komparisi_pendamping
                            : null
                        }
                        onChange={onChangeTextarea}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="button-section-form">
                <Button 
                  className="button-right" 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? 'Loading ...' : 'Daftar'}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }

  renderBpn() {
    const { optionsGender, imageUrl, imageUrlB } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Formik
        initialValues={{
          nama_lengkap: '',
          nomorKtp: '',
          jenis_kelamin: '',
          tempat_lahir: '',
          tanggal_lahir: '',
          alamat_ktp: '',
          longitude: '',
          latitude: '',
          ibu_kandung: '',
          foto_ktp: '',
          upload_foto_selfie: '',
          email: '',
          alamat_terkini: '',
          wilayah_kota: ''
        }}
        onSubmit={value => {}}
      >
        {({ errors, touched, values, setFieldValue }) => {
          const onChangeSelect = (name, value) => {
            setFieldValue(name, value);
          };
          return (
            <Form className="form-login">
              <h3>Data Diri</h3>
              <div className="row">
                <div className="col-md-4">
                  <div className="group-input-formik">
                    <label>
                      Foto Diri
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </label>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-6">
                      <InputFormik
                        name="nama_lengkap"
                        label="Nama Lengkap"
                        placeholder="Nama Lengkap..."
                        error={
                          errors.nama_lengkap && touched.nama_lengkap ? errors.nama_lengkap : null
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <InputFormik
                        name="no_ktp"
                        label="Nomor KTP"
                        placeholder="Nomor KTP"
                        error={
                          errors.no_ktp && touched.no_ktp ? errors.no_ktp : null
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <SelectFormik
                        name="jenis_kelamin"
                        label="Jenis Kelamin"
                        value={values.jenis_kelamin}
                        options={optionsGender}
                        onChange={value =>
                          onChangeSelect('jenis_kelamin', value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <InputFormik
                        name="tempat_lahir"
                        label="Tempat Lahir"
                        placeholder="Tempat Lahir"
                        error={
                          errors.tempat_lahir && touched.tempat_lahir
                            ? errors.tempat_lahir
                            : null
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <DateInput
                        name="tanggal_lahir"
                        label="Tanggal Lahir"
                        placeholder="Pilih Tangal Lahir"
                        error={
                          errors.tanggal_lahir && touched.tanggal_lahir
                            ? errors.tanggal_lahir
                            : null
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <InputFormik
                        name="email"
                        label="Email Aktif"
                        placeholder="Email Aktif"
                        error={
                          errors.email && touched.email
                            ? errors.email
                            : null
                        }
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
                        {imageUrlB ? (
                          <img
                            src={imageUrlB}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )}
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
                    error={
                      errors.luasTanah && touched.luasTanah
                        ? errors.luasTanah
                        : null
                    }
                  />
                </div>
                <div className="col-md-4">
                  <Textarea
                    rows="7"
                    name="alamat_terkini"
                    label="Alamat (Sesuai KTP)"
                    placeholder="Masukan alamat"
                    value={values.alamat_terkini}
                    error={
                      errors.alamat_terkini && touched.alamat_terkini
                        ? errors.alamat_terkini
                        : null
                    }
                  />
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12">
                      <InputFormik
                        name="longitude"
                        label="Masukan Longitude"
                        placeholder="..."
                        error={
                          errors.luasTanah && touched.luasTanah
                            ? errors.luasTanah
                            : null
                        }
                      />
                    </div>
                    <div className="col-md-12">
                      <InputFormik
                        name="latitude"
                        label="Masukan Latitude"
                        placeholder="..."
                        error={
                          errors.latitude && touched.latitude
                            ? errors.latitude
                            : null
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <InputFormik
                    name="wilayah_kota"
                    label="Wilayah Kota"
                    placeholder="Wilayah Kota"
                    error={
                      errors.wilayah_kota && touched.wilayah_kota
                        ? errors.wilayah_kota
                        : null
                    }
                  />
                </div>
              </div>
              <div className="button-section-form">
                <Button className="button-right" type="submit" disabled={false}>
                  Daftar
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }

  renderNotaris() {
    const { optionBank, optionKerja, imageUrl, status, imageFotoUrl, imageKtpUrl, provOptions, cityOptions, distOptions } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    let Schema = Yup.object().shape({
      namaLengkap: Yup.string().required('Tidak boleh kosong.'),
      nomor_sk: Yup.string().required('Tidak boleh kosong.'),
      tgl_sk: Yup.string().required('Tidak boleh kosong.'),
      nomor_akta: Yup.string().required('Tidak boleh kosong.'),
      tanggal_akta: Yup.string().required('Tidak boleh kosong.'),
      // prov_kerja: Yup.string().required('Tidak boleh kosong.'),
      // kot_kerja: Yup.string().required('Tidak boleh kosong.'),
      // kec_kerja: Yup.string().required('Tidak boleh kosong.'),
      no_telp_kantor: Yup.string().required('Tidak boleh kosong.'),
      no_fax: Yup.string().required('Tidak boleh kosong.'),
      alamat_kantor: Yup.string().required('Tidak boleh kosong.'),
      no_rek: Yup.string().required('Tidak boleh kosong.'),
      nama_bank: Yup.object().shape({
        label: Yup.string().required('Tidak boleh kosong.')
      }),
      tempat_lahir: Yup.string().required('Tidak boleh kosong.'),
      tanggal_lahir: Yup.string().required('Tidak boleh kosong.'),
      longitude: Yup.string().required('Tidak boleh kosong.'),
      latitude: Yup.string().required('Tidak boleh kosong.')
    })

    if (status === 'badan_usaha') {
      let Schema = Yup.object().shape({
        namaLengkap: Yup.string().required('Tidak boleh kosong.'),
        nomor_sk: Yup.string().required('Tidak boleh kosong.'),
        tgl_sk: Yup.string().required('Tidak boleh kosong.'),
        nomor_akta: Yup.string().required('Tidak boleh kosong.'),
        tanggal_akta: Yup.string().required('Tidak boleh kosong.'),
        prov_kerja: Yup.string().required('Tidak boleh kosong.'),
        kot_kerja: Yup.string().required('Tidak boleh kosong.'),
        kec_kerja: Yup.string().required('Tidak boleh kosong.'),
        no_telp_kantor: Yup.string().required('Tidak boleh kosong.'),
        no_fax: Yup.string().required('Tidak boleh kosong.'),
        alamat_kantor: Yup.string().required('Tidak boleh kosong.'),
        no_rek: Yup.string().required('Tidak boleh kosong.'),
        nama_bank: Yup.object().shape({
          label: Yup.string().required('Tidak boleh kosong.')
        }),
        tempat_lahir: Yup.string().required('Tidak boleh kosong.'),
        tanggal_lahir: Yup.string().required('Tidak boleh kosong.'),
        longitude: Yup.string().required('Tidak boleh kosong.'),
        latitude: Yup.string().required('Tidak boleh kosong.'),
        komparisi: Yup.string().required('Tidak boleh kosong.'),
        nomor_ktp: Yup.string().required('Tidak boleh kosong')
      })
    }

    return (
      <Formik
        initialValues={{
          namaLengkap: '',
          nomor_sk: '',
          tgl_sk: '',
          nomor_akta: '',
          tanggal_akta: moment(new Date(), dateFormat),
          tempat_lahir: '',
          tanggal_lahir: '',
          prov_kerja: '',
          kot_kerja:'',
          kec_kerja: '',
          no_telp_kantor: '',
          no_fax: '',
          alamat_kantor: '',
          no_rek: '',
          nama_bank: '',
          komparisi: '',
          longitude: '',
          latitude: '',
          nomor_ktp: ''
        }}
        validationSchema={Schema}
        onSubmit={value => {
          const { fetchAuthRegisterIfNeeded } = this.props
          let params = JSON.parse(decompressFromEncodedURIComponent(cookieStorage.getItem('pR')));

          params.dob = value.tanggal_lahir;
          params.no_sk_notaris = value.nomor_sk;
          params.tgl_sk_notaris = value.tgl_sk;
          params.no_akta = value.nomor_akta;
          params.tgl_akta = value.tanggal_akta;
          params.office_address =value.alamat_kantor;
          params.fax = value.no_fax;
          params.bank_account_notaris = value.no_rek;
          params.bank_name = value.nama_bank;
          params.lat = value.latitude;
          params.lng = value.longitude;
          params.identity_image = imageKtpUrl;
          params.selfie_image = imageFotoUrl;
          params.identity_number = value.nomor_ktp;

          fetchAuthRegisterIfNeeded(params);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => {
          const onChangeSelect = (name, value) => {
            const {
              fetchAreaCityIfNeeded,
              fetchAreaDistrictIfNeeded
            } = this.props
            setFieldValue(name, value);
            if (name === 'prov_kerja') {
              const params = {
                provId: value.value
              }
              setFieldValue('kot_kerja', '')
              setFieldValue('kec_kerja', '')
              fetchAreaCityIfNeeded(params)
            } else if (name === 'kot_kerja') {
              const params = {
                cityId: value.value
              }
              setFieldValue('kec_kerja', '')
              fetchAreaDistrictIfNeeded(params)
            }
          };
          const onChangeTextarea = e => {
            setFieldValue(e.target.name, e.target.value);
          };
          const onChangeDate = (name ,date, dateString) => {
            console.log('asd', name, date)
            setFieldValue(name, date);
          };
          console.log('asd', errors)
          return (
            <Form className="form-login">
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
                        {imageKtpUrl ? (
                          <img
                            src={imageKtpUrl}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </label>
                  </div>
                  <div className="group-input-formik">
                    <label>
                      Foto Diri
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={this.beforeUploadB}
                        onChange={this.handleChange}
                      >
                        {imageFotoUrl ? (
                          <img
                            src={imageFotoUrl}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12">
                      <InputFormik
                        name="namaLengkap"
                        label="Nama Lengkap"
                        placeholder="Nama lengkap"
                        error={
                          errors.namaLengkap && touched.namaLengkap ? errors.namaLengkap : null
                        }
                      />
                    </div>      
                    <div className="col-md-12">
                      <InputFormik
                        name="nomor_ktp"
                        label="Nomor KTP"
                        placeholder="Nomor KTP"
                        error={
                          errors.nomor_ktp && touched.nomor_ktp ? errors.nomor_ktp : null
                        }
                      />
                    </div>
                    <div className="col-md-12">
                      <DateInput
                        name="tgl_sk"
                        label="Tanggal SK"
                        value={values.tgl_sk}
                        placeholder="Pilih Tangal SK"
                        onChange={(date, dateString) => onChangeDate('tgl_sk', date, dateString)}
                        error={
                          errors.tanggal_lahir && touched.tanggal_lahir
                            ? errors.tanggal_lahir
                            : null
                        }
                      />
                    </div>
                    {(status === 'badan_usaha') && <div className="col-md-12">
                      <InputFormik
                        name="komparisi"
                        label="Komparisi"
                        placeholder="Komparisi"
                        error={
                          errors.komparisi && touched.komparisi ? errors.komparisi : null
                        }
                      />
                    </div>}
                    <div className="col-md-12">
                      <InputFormik
                        name="nomor_akta"
                        label="Nomor Akta"
                        placeholder="Nomor Akta"
                        error={
                          errors.nomor_akta && touched.nomor_akta ? errors.no_akta : null
                        }
                      />
                    </div>
                    
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12">
                      <DateInput
                        name="tanggal_akta"
                        label="Tanggal Akta"
                        placeholder="Pilih Tangal Akta"
                        value={values.tanggal_akta}
                        onChange={(date, dateString) => onChangeDate('tanggal_akta', date, dateString)}
                        error={
                          errors.tanggal_akta && touched.tanggal_akta
                            ? errors.tanggal_akta
                            : null
                        }
                      />
                    </div>
                    <div className="col-md-12">
                      <InputFormik
                        name="tempat_lahir"
                        label="Tempat Lahir"
                        placeholder="Tempat Lahir"
                        error={
                          errors.tempat_lahir && touched.tempat_lahir
                            ? errors.tempat_lahir
                            : null
                        }
                      />
                    </div>
                    <div className="col-md-12">
                      <DateInput
                        name="tanggal_lahir"
                        label="Tanggal Lahir"
                        placeholder="Pilih Tangal Lahir"
                        value={values.tanggal_lahir}
                        onChange={(date, dateString) => onChangeDate('tanggal_lahir', date, dateString)}
                        error={
                          errors.tanggal_lahir && touched.tanggal_lahir
                            ? errors.tanggal_lahir
                            : null
                        }
                      />
                    </div>
                    <div className="col-md-12">
                      <InputFormik
                        name="nomor_sk"
                        label="Nomor SK"
                        placeholder="Nomor SK"
                        error={
                          errors.nomor_sk && touched.nomor_sk ? errors.nomor_sk : null
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-4">
                  <SelectFormik
                    name="prov_kerja"
                    label="Provinsi Wilayah Kerja"
                    value={values.prov_kerja}
                    options={provOptions}
                    onChange={value =>
                      onChangeSelect('prov_kerja', value)
                    }
                    error={
                      errors.prov_kerja && touched.prov_kerja ? errors.prov_kerja.label : null
                    }
                  />
                </div>
                <div className="col-md-4">
                  <SelectFormik
                    name="kot_kerja"
                    label="Kota/Kabupaten Wilayah Kerja"
                    value={values.kot_kerja}
                    options={cityOptions}
                    onChange={value =>
                      onChangeSelect('kot_kerja', value)
                    }
                    error={
                      errors.kot_kerja && touched.kot_kerja ? errors.kot_kerja.label : null
                    }
                  />
                </div>
                <div className="col-md-4">
                  <SelectFormik
                    name="kec_kerja"
                    label="Kecamatan Wilayah Kerja"
                    value={values.kec_kerja}
                    options={distOptions}
                    onChange={value =>
                      onChangeSelect('kec_kerja', value)
                    }
                    error={
                      errors.kec_kerja && touched.kec_kerja ? errors.kec_kerja.label : null
                    }
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
                    error={
                      errors.no_telp_kantor && touched.no_telp_kantor
                        ? errors.no_telp_kantor
                        : null
                    }
                  />
                </div>
                <div className="col-md-4">
                  <InputFormik
                    name="no_fax"
                    label="Nomor Fax"
                    placeholder="Masukan no fax"
                    error={
                      errors.no_fax && touched.no_fax ? errors.no_fax : null
                    }
                  />
                </div>
                <div className="col-md-4">
                  <Textarea
                    rows="7"
                    name="alamat_kantor"
                    label="Alamat Kantor"
                    placeholder="Masukan alamat kantor"
                    value={values.alamat_kantor}
                    error={
                      errors.alamat_kantor && touched.alamat_kantor
                        ? errors.alamat_kantor
                        : null
                    }
                    onChange={onChangeTextarea}
                  />
                </div>
                <div className="col-md-4">
                  <InputFormik
                    name="longitude"
                    label="Longitude"
                    placeholder="Masukan Luas Tanah"
                    error={
                      errors.luasTanah && touched.luasTanah
                        ? errors.luasTanah
                        : null
                    }
                  />
                </div>
                <div className="col-md-4">
                  <InputFormik
                    name="latitude"
                    label="Latitude"
                    placeholder="..."
                    error={
                      errors.latitude && touched.latitude
                        ? errors.latitude
                        : null
                    }
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
                    error={
                      errors.no_rek && touched.no_rek ? errors.no_rek : null
                    }
                  />
                </div>
                <div className="col-md-4">
                  <SelectFormik
                    name="nama_bank"
                    label="Nama Bank"
                    value={values.nama_bank}
                    options={optionBank}
                    onChange={value => onChangeSelect('nama_bank', value)}
                  />
                </div>
              </div>
              <div className="button-section-form">
                <Button className="button-right" type="submit" disabled={false}>
                  Daftar
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }

  render() {
    const { role } = this.state;
    // console.log(JSON.parse(decompressFromEncodedURIComponent(cookieStorage.getItem('pR'))))
    
    return (
      <PageWrapper buttonLogin showNav>
        <div className="register-page-background">
          <div className="container">
            <div className="account-container">
              <div className="title-login">
                <h4>Lengkapi Data Anda</h4>
                <p>
                  Untuk melanjutkan proses order, Anda harus melengkapi form
                  dibawah
                </p>
              </div>
              <div className="body-login">
                <Card>
                  {(role === 'debitur' || role === 'kreditur' || role === 'collateral_owner') && this.renderDebitur()}
                  {(role === 'notaris') && this.renderNotaris()}
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

const mapStateToProps = ({ 
  authRegister, 
  areaProvince,
  areaDistrict,
  areaCity, }: ReduxState) => ({
  authRegister,
  areaProvince,
  areaDistrict,
  areaCity,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuthRegisterIfNeeded: (param: Object) =>
    dispatch(AuthRegisterAction.fetchAuthRegisterIfNeeded(param)),
  fetchAreaProvinceIfNeeded: (param: Object) =>
    dispatch(AreaProvinceAction.fetchAreaProvinceIfNeeded(param)),
  fetchAreaCityIfNeeded: (param: Object) =>
    dispatch(AreaCityAction.fetchAreaCityIfNeeded(param)),
  fetchAreaDistrictIfNeeded: (param: Object) =>
    dispatch(AreaDistrictAction.fetchAreaDistrictIfNeeded(param)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
