/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import type { Dispatch, ReduxState } from '../../../types';
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
  Checkbox
} from 'antd';
import { CookieStorage } from 'cookie-storage'
import { compressToEncodedURIComponent } from 'lz-string'

const cookieStorage = new CookieStorage();

const { Step } = Steps;

const steps = [{
    title: 'Tipe Dokumen',
    content: 'Zero Content',
    icon: <Icon type="profile" />
  },
  {
    title: 'Detail Dokumen',
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
      document_type: ''
    }

    this.handleSubmitFirst = this.handleSubmitFirst.bind(this)
    this.handleSubmitFirst = this.handleSubmitSecond.bind(this)
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

  render() {
    const {
      current,
      document_type
    } = this.state

    const options = [{
      label: 'SHM',
      value: 0
    }, {
      label: 'APHT',
      value: 1
    }, {
      label: 'Fidusia',
      value: 2
    }]
    console.log(current)
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
                        onSubmit={(value) => {
                          console.log(value)
                          cookieStorage.setItem(
                            'tpy',
                            compressToEncodedURIComponent(value.document_type.label)
                          );
                          this.setState({
                            document_type: value.document_type.label
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
                                    error={errors.document_type && touched.document_type ? errors.document_type : null}
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
                ((current === 1) && document_type !== 'Fidusia') && <Card><div className="order-form"><div className="surat-section">
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
                ((current === 1) && document_type === 'Fidusia') && <Card><div className="order-form"><div className="surat-section">
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
              }
              {
                current === 2 && <Card><div className="order-form"><div className="kelengkapan-section">
                  <h4>Pilih Debitur</h4>
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
                          <Form>
                            <div className="row">
                              <div className="col-md-4">
                                <SelectFormik
                                  name="debitur"
                                  label="Kreditur"
                                  placeholder="Kreditur"
                                  onChange={onChangeSelect}
                                  options={options}
                                  value={values.debitur}
                                  error={errors.debitur && touched.debitur ? errors.debitur : null}
                                />
                              </div>
                            </div>
                            <hr />
                            <h4>Pilih Pemilik Agunan</h4>
                            <div className="row">
                              <div className="col-md-4">
                                <SelectFormik
                                  name="agunan"
                                  label="Pemilik Agunan"
                                  placeholder="Kreditur"
                                  onChange={onChangeSelect}
                                  options={options}
                                  value={values.agunan}
                                  error={errors.agunan && touched.agunan ? errors.agunan : null}
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
                </div></div></Card>
              }
              {
                current === 3 && <React.Fragment>
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