/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import type { Dispatch, ReduxState } from '../../../types';
import * as moment from 'moment';
import {
  Formik,
  Form,
} from 'formik'
import * as Yup from 'yup'
import { PageWrapper, Card, InputFormik, SelectFormik, DateInput, Button, DetailField, Status, Textarea } from '../../../components/element';
import { 
  Steps, 
  Popover, 
  Icon, 
  Checkbox,
  Radio
} from 'antd';
import { CookieStorage } from 'cookie-storage'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import Constants from '../../../helpers/constants';

import CheckboxList from './List';

const cookieStorage = new CookieStorage();

const { Step } = Steps;

const steps = [{
    title: 'Tipe Dokumen',
    content: 'Zero Content',
    icon: <Icon type="profile" />
  },
  {
    title: 'Form Dokumen',
    content: 'First-content',
    icon: <Icon type="profile" />
  }, 
  {
    title: 'Form Agunan',
    content: 'First-content',
    icon: <Icon type="profile" />
  },
  {
    title: 'Pihak Terkait',
    content: 'Second-content',
    icon: <Icon type="home" />
  },
  {
    title: 'Review Order',
    content: 'Last-content',
    icon: <Icon type="reconciliation" />
  },
];
type Props = {};

export class Order extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      document_type: '',
      valueAs: 1,
      search: '',
      listAgunan: {
        status: 'NOT',
        items: []
      },
      agunan: [],
      paramOrder: {},
      kreditur: null,
      debitur: null,
      user_id: null,
      notary_id: null,
      terkait: '',
      pemilikAgunan: null
    }

    this.handleSubmitFirst = this.handleSubmitFirst.bind(this)
    this.handleSubmitFirst = this.handleSubmitSecond.bind(this)
    this.onChangeRad = this.onChangeRad.bind(this)
    this.handleChangeSearchColleteral = this.handleChangeSearchColleteral.bind(this)
    this.handleGetAgunan = this.handleGetAgunan.bind(this)
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this)
    this.handleChangeSearchTerkait = this.handleChangeSearchTerkait.bind(this)
  }

  componentDidMount() {
    const cookieStorage = new CookieStorage()
    const dataProf = cookieStorage.getItem('prof')
    const data = JSON.parse(decompressFromEncodedURIComponent(dataProf))
    console.log('as', data.user_tipe)
    if (data.user_tipe === "debtor") {
      this.setState({
        user_id: data.id,
        debitur: data.id,
        notary_id: parseInt(this.props.match.params.id),
        terkait: 'kreditur'
      })
    } else {
      this.setState({
        user_id: data.id,
        kreditur: data.id,
        notary_id: parseInt(this.props.match.params.id),
        terkait: 'debitur'
      })
    }
  }

  handleSubmitOrder() {
    console.log(this.state)
    const order = {
      status: "submission", // draft, submission
      agunan_pokok: parseInt(this.state.paramOrder.agunan_pokok),
      angsuran_bunga: parseInt(this.state.paramOrder.angsuran_bunga),
      total_price: 5000000,
      no_perjanjian: this.state.paramOrder.no_perjanjian,
      plafond: parseInt(this.state.paramOrder.plafond),
      tgl_akad:moment(new Date(this.state.paramOrder.tanggal_akad)).format("DDMMYYYY"),
      jangka_waktu: parseInt(this.state.paramOrder.jangka_waktu),
      document_type: this.state.document_type,
      notary_id: this.state.notary_id,
      user_id: this.state.user_id,
      debtor_id: this.state.debitur,
      creditor_id: this.state.kreditur,
      collateral_owner_id: this.state.pemilikAgunan,
      immovable_collateral_ids: this.state.agunan,
    }
    console.log('order', order)
  }

  handleGetAgunan = (value) => {
    this.setState({
      agunan: value
    })
  }

  handleSubmitFirst (value) {
    return this.next()
  }

  handleSubmitSecond (value) {
    return this.next()
  }

  next = () => {
    const {
      current
    } = this.state

    this.setState({
      current: current + 1
    }, () => {
      window.scrollTo(0, 1000);
    })
  }

  handleChangeSearchTerkait = (sesi, value) => {
    console.log(sesi, value)
    this.setState({
      [sesi]: value.value
    })
  }

  handleChangeSearchColleteral = (value) => {
    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': 'example-of-custom-header',
      'Accept-Version': 1,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: Constants.TOKEN
    };

    this.setState({
      listAgunan: {
        status: 'LOADING',
        items:[]
      },
      pemilikAgunan: value.value
    })

    return axios.get(`${Constants.API}/api/v1/collateral?user_id=${value.value}`).then(res => {
      let data = []
      const { document_type } = this.state
      if (document_type === 'fidusia') {
        res.data.immovable_collaterals.map(key => {
          key.category = 'Tidak Bergerak';
          data.push(key)
        })
      } else {
        res.data.movable_collaterals.map(key => {
          key.category = 'Bergerak';
          data.push(key)
        })
      }
      this.setState({
        listAgunan: {
          status: 'SUCCESS',
          items: data
        }
      })
    })
  }

  filterData = (data) => {
    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': 'example-of-custom-header',
      'Accept-Version': 1,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: Constants.TOKEN
    };

    return axios.get(`${Constants.API}/api/v1/users/collateral?owner=${data}`).then((res) => {

      let dataTemp = res.data.collateral_owners;
      let dataRes = []
      dataTemp.forEach(key => {
        dataRes.push({
          label: key.name,
          value: key.id
        })
      });
      return dataRes
    })
  };

  filterDataDebitur = (data) => {
    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': 'example-of-custom-header',
      'Accept-Version': 1,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: Constants.TOKEN
    };

    return axios.get(`${Constants.API}/api/v1/users/debitor??owner=${data}`).then((res) => {

      let dataTemp = res.data.debitors;
      let dataRes = []
      dataTemp.forEach(key => {
        dataRes.push({
          label: key.name,
          value: key.id
        })
      });
      return dataRes
    })
  };

  filterDataKreditur = (data) => {
    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': 'example-of-custom-header',
      'Accept-Version': 1,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: Constants.TOKEN
    };

    return axios.get(`${Constants.API}/api/v1/users/creditor?owner=${data}`).then((res) => {

      let dataTemp = res.data.creditors;
      let dataRes = []
      dataTemp.forEach(key => {
        dataRes.push({
          label: key.name,
          value: key.id
        })
      });
      return dataRes
    })
  };

  promiseOptions = (sesi, data) => {
    if (sesi === 'agunan') {
      return new Promise(resolve => {
          setTimeout(() => {
          resolve(this.filterData(data));
        }, 1000);
      })
    }
    if (sesi === 'debitur') {
      return new Promise(resolve => {
          setTimeout(() => {
          resolve(this.filterDataDebitur(data));
        }, 1000);
      })
    }

    if (sesi === 'kreditur') {
      return new Promise(resolve => {
          setTimeout(() => {
          resolve(this.filterDataKreditur(data));
        }, 1000);
      })
    }
    return []
  }

  prev = () => {
    const {
      current
    } = this.state
    this.setState({
      current: current - 1
    }, () => {
      window.scrollTo(0, 1000);
    })
  }

  onChangeRad = (e) => {
    this.setState({
      valueAs: e.target.value
    })
  }

  renderListAgunan = () => {
    const { listAgunan } = this.state

    if (listAgunan.status === 'NOT') {
      return <p className="erorr">Cari data agunan</p>
    }

    if (listAgunan.status === 'LOADING') {
      return <p>Loading ...</p>
    }

    if (listAgunan.status === 'SUCCESS') {
      return <CheckboxList 
        listAgunan={listAgunan}
        handleGetAgunan={this.handleGetAgunan}
      />
    }
  }

  render() {
    const {
      current,
      document_type,
      search,
      listAgunan,
      paramOrder
    } = this.state
    const options = [{
      label: 'SKMHT',
      value: 'skmht'
    }, {
      label: 'APHT',
      value: 'apht'
    }, {
      label: 'Fidusia',
      value: 'fidusia'
    }]
    const SchemaDocumentType = Yup.object().shape({
      document_type: Yup.object().shape({
        label: Yup.string().required('Tidak boleh kosong.')
      })
    })

    const SchemaDocumentForm = Yup.object().shape({
      no_perjanjian: Yup.string().required('Tidak boleg kosong.'),
      plafond: Yup.string().matches(/^[0-9]*$/, 'Plafond berupa angka').required("Tidak boleh kosong."),
      tanggal_akad: Yup.string().required('Tidak boleh kosong.'),
      tgl_jatuh_tempo: Yup.string().required('Tidak boleh kosong'),
      tarif_bunga: Yup.string().required('Tidak boleh kosong.'),
      jangka_waktu: Yup.string().matches(/^[0-9]*$/, 'Plafond berupa angka').required("Tidak boleh kosong."),
      agunan_pokok: Yup.string().matches(/^[0-9]*$/, 'Plafond berupa angka').required("Tidak boleh kosong."),
      angsuran_bunga: Yup.string().matches(/^[0-9]*$/, 'Plafond berupa angka').required("Tidak boleh kosong.")
    })
    return (
      <PageWrapper>
        <div className="container">
          <div className="order-container">
            <div className="body-section">
              <div className="step-section">
                <Steps current={current}>
                  {steps.map(item => (
                    <Step key={item.title} title={item.title} icon={item.icon}/>
                  ))}
                </Steps>
              </div>
              {
                current === 0 && <Card><div className="order-form">
                    <div className="order-document">
                      <h4>Pilih Document Type</h4>
                      <Formik
                        initialValues={{
                          document_type: "",
                        }}
                        validationSchema={SchemaDocumentType}
                        onSubmit={(value) => {
                          cookieStorage.setItem(
                            'tpy',
                            compressToEncodedURIComponent(value.document_type.label)
                          );
                          this.setState({
                            document_type: value.document_type.value
                          })
                          this.handleSubmitFirst()
                        }}
                      >
                        {({
                          errors, touched, values, setFieldValue
                        }) => {
                          const onChangeSelect = (value) => {
                            setFieldValue('document_type', value)
                          }
            
                          return (
                            <Form className="form-surat-nah">
                              <div className="row">
                                <div className="col-md-4">
                                  <SelectFormik
                                    name="document_type"
                                    label="Dokumen Type"
                                    placeholder="Dokumen Type"
                                    onChange={onChangeSelect}
                                    options={options}
                                    value={values.document_type}
                                    error={errors.document_type && touched.document_type ? errors.document_type.label : null}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-3 offset-9">
                                  <div className="button-section">
                                    <Button
                                      className="button-left"
                                      type="submit"
                                      disabled={false}
                                    >
                                      Lanjut
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Form>
                          )
                        }}
                      </Formik>
                    </div>
                  </div>
                </Card>
              }
              {
                current === 1 && <Card>
                  <div className="order-form">
                    <h4>Pilih Document Type</h4>
                    <Formik
                      initialValues = {{
                        no_perjanjian: '',
                        plafond: '',
                        tanggal_akad: '',
                        tgl_jatuh_tempo: '',
                        tarif_bunga: '',
                        jangka_waktu: '',
                        agunan_pokok: '',
                        angsuran_bunga: ''
                      }}
                      onSubmit={(value) => {
                        this.setState({
                          paramOrder: value
                        })
                        this.handleSubmitFirst()
                      }}
                      // validationSchema={SchemaDocumentForm}
                    >
                      {({ errors, touched, values, setFieldValue }) => {
                        const onChangeDate = (name ,date, dateString) => {
                          setFieldValue(name, date);
                        };
                        return (
                          <Form className="form-surat-nah">
                            <div className="row">
                              <div className="col-md-4">
                                <InputFormik
                                  name="no_perjanjian"
                                  label="No Perjanjiant"
                                  placeholder="..."
                                  error={errors.no_perjanjian && touched.no_perjanjian ? errors.no_perjanjian : null}
                                />
                              </div>
                              <div className="col-md-4">
                                <InputFormik
                                  name="plafond"
                                  label="Plafond"
                                  placeholder="..."
                                  error={errors.plafond && touched.plafond ? errors.plafond : null}
                                />
                              </div>
                              
                              <div className="col-md-4">
                                <DateInput 
                                  name="tanggal_akad"
                                  label="Tanggal Akad"
                                  placeholder="Pilih Tangal Akad"
                                  value={values.tanggal_akad}
                                  onChange={(date, dateString) => onChangeDate('tanggal_akad', date, dateString)}
                                  error={errors.tanggal_akad && touched.tanggal_akad ? errors.tanggal_akad : null}
                                />
                              </div>
                              <div className="col-md-4">
                                <DateInput 
                                  name="tgl_jatuh_tempo"
                                  label="Tanggal Jatuh Tempo"
                                  placeholder="Pilih Tangal Jatuh Tempo"
                                  value={values.tgl_jatuh_tempo}
                                  onChange={(date, dateString) => onChangeDate('tgl_jatuh_tempo', date, dateString)}
                                  error={errors.tgl_jatuh_tempo && touched.tgl_jatuh_tempo ? errors.tgl_jatuh_tempo : null}
                                />
                              </div>
                              <div className="col-md-4">
                                <InputFormik
                                  name="tarif_bunga"
                                  label="Tarif Bunga"
                                  placeholder="..."
                                  error={errors.tarif_bunga && touched.tarif_bunga ? errors.tarif_bunga : null}
                                />
                              </div>
                              <div className="col-md-4">
                                <InputFormik
                                  name="jangka_waktu"
                                  label="Jangka Waktu"
                                  placeholder="..."
                                  error={errors.jangka_waktu && touched.jangka_waktu ? errors.jangka_waktu : null}
                                />
                              </div>
                              <div className="col-md-4">
                                <InputFormik
                                  name="agunan_pokok"
                                  label="Agunan Pokok"
                                  placeholder="..."
                                  error={errors.agunan_pokok && touched.agunan_pokok ? errors.agunan_pokok : null}
                                />
                              </div>
                              <div className="col-md-4">
                                <InputFormik
                                  name="angsuran_bunga"
                                  label="Angsuran Bunga"
                                  placeholder="..."
                                  error={errors.angsuran_bunga && touched.angsuran_bunga ? errors.angsuran_bunga : null}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3 offset-9">
                                <div className="button-section">
                                  <Button
                                    className="button-left"
                                    type="submit"
                                    disabled={false}
                                  >
                                    Lanjut
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Form>
                        )
                      }}
                    </Formik>
                  </div>
                </Card>
              }
              {
                current === 2 && <Card>
                  <div className="order-form form-search-pemilik">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="search-on-order">
                          <label forHtml="search">
                            Pemilik Agunan
                            <form onSubmit={this.handleSearch}>
                              {/* <input 
                                type="text"
                                value={search || ''} 
                                placeholder="Cari ..."
                              />
                              <button type="submit" className="icon-search">
                                <img
                                  src={require('../../../app/assets/img/search.svg')}
                                  alt="search"
                                />
                              </button> */}
                              <AsyncSelect 
                                cacheOptions 
                                defaultOptions 
                                onChange={this.handleChangeSearchColleteral}
                                loadOptions={(data) => this.promiseOptions('agunan', data)}
                                className="container-select"
                              />
                            </form>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="list-agunan">
                          <div className="title-section">
                            <h4>Pilih Agunan</h4>
                          </div>
                          {
                            this.renderListAgunan()
                          }
                            
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 offset-9">
                        <div className="button-section">
                          <Button
                            className="button-left"
                            type="submit"
                            disabled={false}
                            onClick={() => {this.handleSubmitFirst()}}
                          >
                            Lanjut
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </Card>
              }
              {/* {
                ((current === 2) && document_type !== 'Fidusia') && <Card><div className="order-form"><div className="surat-section">
                <h4>Surat Properti</h4>
                <Formik 
                initialValues={{
                  buktiKepemilikan: undefined,
                  noSertifikat: '',
                  namaPemilik: '',
                  tanggalPenerbitan: '',
                  luasTanah: '',
                  no_gambar: '',
                  tanggalGSU: '',
                  no_identitas_bidang_tanah: '',
                  surat_pemberitahuan_pbb: '',
                  nop: '',
                  nilai_agunan: '',
                  provinsi: '',
                  kabupaten: '',
                  kecematan: '',
                  kelurahan: '',
                  alamat_lengkap: '',
                  nilai_pengikatan: '',
                  jalan: ''
                }}
                onSubmit={(value) => {
                  this.handleSubmitFirst()
                }}
              >
                {({
                  errors, touched, values, setFieldValue
                }) => {
                  const onChangeSelect = (value) => {
                    setFieldValue('buktiKepemilikan', value)
                  }
                  const onChangeTextarea = e => {
                    setFieldValue(e.target.name, e.target.value);
                  };
                  return (
                    <Form className="form-surat-nah">
                      <div className="row">
                        <div className="col-md-4">
                          <SelectFormik
                            name="buktiKepemilikan"
                            label="Bukti Kepemilikan"
                            placeholder="Bukti Kepemilikan"
                            onChange={onChangeSelect}
                            options={options}
                            value={values.buktiKepemilikan}
                            error={errors.buktiKepemilikan && touched.buktiKepemilikan ? errors.buktiKepemilikan : null}
                          />
                        </div>
                        <div className="col-md-4">
                          <InputFormik
                            name="noSertifikat"
                            label="No Sertifikat"
                            placeholder="Masukan no sertifikat..."
                            error={errors.firstName && touched.firstName ? errors.firstName : null}
                          />
                        </div>
                        <div className="col-md-4">
                          <InputFormik
                            name="namaPemilik"
                            label="Nama Pemilik"
                            placeholder="Masukan nama pemilik..."
                            error={errors.namaPemilik && touched.namaPemilik ? errors.namaPemilik : null}
                          />
                        </div>
                        <div className="col-md-4">
                          <DateInput 
                            name="tanggalPenerbitan"
                            label="Tanggal Penerbitan"
                            placeholder="Pilih Tangal Penerbitan"
                            error={errors.firstName && touched.firstName ? errors.firstName : null}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="detil-agunan">
                        <h4>Detail Agunan</h4>
                        <div className="row">
                          <div className="col-md-4">
                            <InputFormik
                              name="luasTanah"
                              label="Luas Tanah"
                              placeholder="Masukan Luas Tanah"
                              error={errors.luasTanah && touched.luasTanah ? errors.luasTanah : null}
                            />
                          </div>
                          <div className="col-md-4">
                            <InputFormik
                              name="no_gambar"
                              label="No Gambar Situasi/Surat Ukur"
                              placeholder="Masukkan no surat ukur..."
                              error={errors.no_gambar && touched.no_gambar ? errors.no_gambar : null}
                            />
                          </div>
                          <div className="col-md-4">
                            <DateInput 
                              name="tanggalGSU"
                              label="Tanggal GS/SU"
                              placeholder="Pilih Tangal Penerbitan"
                              error={errors.tanggalGSU && touched.tanggalGSU ? errors.tanggalGSU : null}
                            />
                          </div>
                          <div className="col-md-4">
                            <InputFormik
                              name="no_identitas_bidang_tanah"
                              label="Nomor Identifikasi Bidang tanah"
                              placeholder="Masukkan no identifikasi bidang t..."
                              error={errors.no_identitas_bidang_tanah && touched.no_identitas_bidang_tanah ? errors.no_identitas_bidang_tanah : null}
                            />
                          </div>
                          <div className="col-md-4">
                            <InputFormik
                              name="surat_pemberitahuan_pbb"
                              label="Surat Pemberitahuan PBB"
                              placeholder="Masukkan surat PBB..."
                              error={errors.surat_pemberitahuan_pbb && touched.surat_pemberitahuan_pbb ? errors.surat_pemberitahuan_pbb : null}
                            />
                          </div>
                          <div className="col-md-4">
                            <InputFormik
                              name="nop"
                              label="Nomor objek pajak (NOP)"
                              placeholder="Masukkan no objek pajak..."
                              error={errors.nop && touched.nop ? errors.nop : null}
                            />
                          </div>
                          <div className="col-md-4">
                            <InputFormik
                              name="nilai_agunan"
                              label="Nilai Agunan"
                              placeholder="Masukkan nilai agunan..."
                              error={errors.nilai_agunan && touched.nilai_agunan ? errors.nilai_agunan : null}
                            />
                          </div>
                          <div className="col-md-4">
                            <InputFormik
                              name="nilai_pengikatan"
                              label="Nilai Pengikatan"
                              placeholder="Masukan nilai pengikatan..."
                              error={errors.nilai_pengikatan && touched.nilai_pengikatan ? errors.no_mesin : null}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-md-4">
                            <SelectFormik
                              name="provinsi"
                              label="Provinsi"
                              placeholder="Provinsi"
                              onChange={onChangeSelect}
                              options={options}
                              value={values.provinsi}
                              error={errors.provinsi && touched.provinsi ? errors.provinsi : null}
                            />
                          </div>
                          <div className="col-md-4">
                            <SelectFormik
                              name="kabupaten"
                              label="Kabupatan"
                              placeholder="Kabupaten"
                              onChange={onChangeSelect}
                              options={options}
                              value={values.kabupaten}
                              error={errors.kabupaten && touched.kabupaten ? errors.kabupaten : null}
                            />
                          </div>
                          <div className="col-md-4">
                            <SelectFormik
                              name="kecamatan"
                              label="Kecamatan"
                              placeholder="Kecamatan"
                              onChange={onChangeSelect}
                              options={options}
                              value={values.kecematan}
                              error={errors.kecamatan && touched.kecamatan ? errors.kecamatan : null}
                            />
                          </div>
                          <div className="col-md-4">
                            <SelectFormik
                              name="kelurahan"
                              label="Kelurahan"
                              placeholder="Kelurahan"
                              onChange={onChangeSelect}
                              options={options}
                              value={values.kelurahan}
                              error={errors.kelurahan && touched.kelurahan ? errors.kelurahan : null}
                            />
                          </div>
                          <div className="col-md-4">
                            <Textarea
                              rows="7"
                              name="jalan"
                              label="Jalan"
                              placeholder="Jalan"
                              value={values.jalan}
                              error={
                                errors.jalan && touched.jalan
                                  ? errors.jalan
                                  : null
                              }
                              onChange={onChangeTextarea}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-3 offset-9">
                          <div className="button-section">
                            <Button
                              className="button-left"
                              type="submit"
                              disabled={false}
                            >
                              Lanjut
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )
                }}
              </Formik>
              </div></div></Card>
              }
              {
                ((current === 2) && document_type === 'Fidusia') && <Card><div className="order-form"><div className="surat-section">
                      <h4>Surat Detail</h4>
                      <Formik
                        initialValues= {{
                          buktiKepemilikan: '',
                          namaPemilik: '',
                          atas_nama: '',
                          no_bukti: '',
                          tanggalPenerbitan: '',
                          no_mesin: '',
                          no_rangka: '',
                          warna: '',
                          tipe: '',
                          nilai_agunan:'',
                          nilai_pengikatan: ''
                        }}
                        onSubmit={(value) => {
                          this.handleSubmitFirst()
                        }}
                      >
                        {
                          ({ errors, touched, values, setFieldValue }) => {
                            const onChangeSelect = (value) => {
                              setFieldValue('buktiKepemilikan', value)
                            }
                            return  (
                              <Form className="form-surat-nah">
                                <div className="row">
                                  <div className="col-md-4">
                                    <SelectFormik
                                      name="buktiKepemilikan"
                                      label="Bukti Kepemilikan"
                                      placeholder="Bukti Kepemilikan"
                                      onChange={onChangeSelect}
                                      options={options}
                                      value={values.buktiKepemilikan}
                                      error={errors.buktiKepemilikan && touched.buktiKepemilikan ? errors.buktiKepemilikan : null}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <InputFormik
                                      name="atas_nama"
                                      label="Atas Nama"
                                      placeholder="Masukan nama..."
                                      error={errors.atas_nama && touched.atas_nama ? errors.atas_nama : null}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <InputFormik
                                      name="namaPemilik"
                                      label="Nama Pemilik"
                                      placeholder="Masukan nama pemilik..."
                                      error={errors.namaPemilik && touched.namaPemilik ? errors.namaPemilik : null}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <InputFormik
                                      name="no_bukti"
                                      label="Nama Bukti"
                                      placeholder="Masukan nomor bukti..."
                                      error={errors.no_bukti && touched.no_bukti ? errors.namaPemilik : null}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <DateInput 
                                      name="tanggalPenerbitan"
                                      label="Tanggal Penerbitan"
                                      placeholder="Pilih Tangal Penerbitan"
                                      error={errors.firstName && touched.firstName ? errors.firstName : null}
                                    />
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-md-4">
                                    <InputFormik
                                      name="no_mesin"
                                      label="Nomor Mesin"
                                      placeholder="Masukan nomor mesin..."
                                      error={errors.no_mesin && touched.no_mesin ? errors.no_mesin : null}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <InputFormik
                                      name="no_rangka"
                                      label="Nomor Rangka"
                                      placeholder="Masukan nomor rangka..."
                                      error={errors.no_rangka && touched.no_rangka ? errors.no_rangka : null}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <InputFormik
                                      name="warna"
                                      label="Warna"
                                      placeholder="Masukan warna..."
                                      error={errors.warna && touched.warna ? errors.warna : null}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <InputFormik
                                      name="tipe"
                                      label="Tipe/Seri"
                                      placeholder="Masukan tipe..."
                                      error={errors.tipe && touched.tipe ? errors.tipe : null}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <InputFormik
                                      name="nilai_agunan"
                                      label="Nilai Agunan"
                                      placeholder="Masukan nilai agunan..."
                                      error={errors.nilai_agunan && touched.nilai_agunan ? errors.nilai_agunan : null}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <InputFormik
                                      name="nilai_pengikatan"
                                      label="Nomor Pengikatan"
                                      placeholder="Masukan nilai pengikatan..."
                                      error={errors.nilai_pengikatan && touched.nilai_pengikatan ? errors.no_mesin : null}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-3 offset-9">
                                    <div className="button-section">
                                      <Button
                                        className="button-left"
                                        type="submit"
                                        disabled={false}
                                      >
                                        Lanjut
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Form>
                            )
                          }
                        }
                      </Formik>
                    </div>
                  </div>
                </Card>
              } */}
              {
                current === 3 && <Card><div className="order-form"><div className="kelengkapan-section">
                  <Formik
                    initialValues={{
                      debitur: "",
                      agunan: ''
                    }}
                    onSubmit={(value) => {
                      this.handleSubmitSecond()
                    }}
                  >
                    {
                      ({ errors, touched, values, setFieldValue }) => {
                        const onChangeSelect = (value) => {
                          setFieldValue('buktiKepemilikan', value)
                        }
                        return (
                          <Form className="form-pilih-debitur">
                            <Radio.Group onChange={this.onChangeRad} value={this.state.valueAs}>
                              {this.state.terkait === 'debitur' && <div className="group-choose">
                                <h4>Pilih Debitur
                                  {/* <Radio value={1}></Radio> */}
                                </h4>
                                <div className="row">
                                  <div className="col-md-4">
                                    <AsyncSelect 
                                      cacheOptions 
                                      defaultOptions 
                                      onChange={(value) => this.handleChangeSearchTerkait('debitur', value)}
                                      loadOptions={(data) => this.promiseOptions('debitur', data)}
                                      className="container-select"
                                    />
                                  </div>
                                </div>
                              </div>}
                              {this.state.terkait === 'kreditur' && <div className='group-choose'>
                                <h4>Pilih Kreditur
                                  {/* <Radio value={2}></Radio> */}
                                </h4>
                                <div className="row">
                                  <div className="col-md-4">
                                    <AsyncSelect 
                                      cacheOptions 
                                      defaultOptions 
                                      onChange={(value) => this.handleChangeSearchTerkait('kreditur', value)}
                                      loadOptions={(data) => this.promiseOptions('kreditur', data)}
                                      className="container-select"
                                    />
                                  </div>
                                </div>
                              </div>}
                            </Radio.Group>
                            <div className="row">
                              <div className="col-md-3 offset-9">
                                <div className="button-section">
                                  <Button
                                    className="button-left"
                                    type="submit"
                                    disabled={false}
                                  >
                                    Lanjut
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Form>
                        
                        )
                      }
                    }
                  </Formik>
                </div></div></Card>
              }
              {
                current === 4 && <React.Fragment>
                <Card>
                  <div className="order-form">
                    <div className="review-order">
                      <div className="title-section">
                        <h4>Surat Agunan</h4>
                      </div>
                      <div className="body-section">
                        <div className="row">
                          <div className="col-md-6">
                            <DetailField label="Bukti Kepemilikan" value="SHM" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="No. Sertifikat" value="1234901469806" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="Nama Pemilik" value="Ary Suryawan" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="Tanggal Penerbitan" value="03 Februari 1973" />
                          </div>
                        </div>
                        <hr />
                        <h4>Detail Agunan</h4>
                        <div className="row">
                          <div className="col-md-6">
                            <DetailField label="Luas Tanah" value="1028 m2" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="No Gambar Situasi/Surat Ukur" value="41238061" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="Tanggal GS/SU" value="12 September 1990" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="Nomor Identifikasi Bidang tanah" value="13248964" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="Surat Pemberitahuan PBB" value="9186-321" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="Nomor objek pajak (NOP)" value="32081803139410142" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="Nilai Agunan" value="Rp 1.000.000.000" />
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-md-6">
                            <DetailField label="Provinsi" value="DKI Jakarta" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="Kabupaten/Kota" value="Jakarta Selatan" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="Kecamatan" value="Pejaten" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="Kelurahan/Desa" value="Pejaten Barat" />
                          </div>
                          <div className="col-md-6">
                            <DetailField label="Alamat" value="Ruko Tendean Square Jalan Wolter Monginsidi No. 19 16 2, RT.16/RW.2, Petogogan, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12170" />
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="order-form notaris-review">
                    <div className="title-section">
                      <h4>Notaris</h4>
                    </div>
                    <div className="body-section">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="photo-profil">
                            <img src={require('../../../app/assets/img/photo-profil.jpg')} alt="photo profile" />
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="name-notaris">
                            <h5>Angelica Surjodiningrat S.H</h5>
                            <span>ID 10337</span>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <Status>
                            Menunggu
                          </Status>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="button-last">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="checkbox-section">
                        <Checkbox>
                          Data diatas sudah benar dan dapat dipertanggungjawabkan, dan saya telah menyetujui Syarat & Ketentuan yang berlaku
                        </Checkbox>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="button-section">
                        <Button
                          className="button-left"
                          type="submit"
                          disabled={false}
                          onClick={this.handleSubmitOrder}
                        >
                          Lanjut
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                </React.Fragment>
                }
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
)(Order)