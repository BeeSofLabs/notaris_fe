/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import { InputFormik, DateInput, Card, Button, SelectFormik, Textarea } from '../../../components/element'
import * as Yup from 'yup'

import * as AreaProvinceAction from '../../../actions/area/province';
import * as AreaCityAction from '../../../actions/area/city'
import * as AreaDistrictAction from '../../../actions/area/district';
import * as AreaVillageAction from '../../../actions/area/village';
import * as moment from 'moment';

import type { 
  AuthRegister,
  AreaProvince as AreaProvinceType,
  AreaCity as AreaCityType,
  AreaDistrict as AreaDistrictType, 
  AreaVillage as AreaVillageType, 
  Dispatch, 
  ReduxState 
} from '../../../types';

export class FormTidakBergerak extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      provOptions: [],
      cityOptions: [],
      distOptions: [],
      villOptions: []
    }
  }

  componentDidMount() {
    const { 
      fetchAreaProvinceIfNeeded,
    } = this.props

    fetchAreaProvinceIfNeeded({});
  }

  componentWillReceiveProps(nextProps) {
    const { areaProvince, areaCity, areaDistrict, areaVillage } = this.props;
    const obj = {};
    if (nextProps.areaCity[obj] !== areaCity[obj]) {
      this.areaCityData(nextProps.areaCity[obj]);
    }

    if (nextProps.areaProvince[obj] !== areaProvince[obj]) {
      this.areaProvinceData(nextProps.areaProvince[obj]);
    }

    if (nextProps.areaDistrict[obj] !== areaDistrict[obj]) {
      this.areaDistrictData(nextProps.areaDistrict[obj]);
    }
    if (nextProps.areaVillage[obj] !== areaVillage[obj]) {
      this.areaVillageData(nextProps.areaVillage[obj]);
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

  areaVillageData = areaDistrict => {
    const getAreaDistrict = areaDistrict;
    if (
      !getAreaDistrict ||
      getAreaDistrict.readyStatus === 'AREA_VILLAGE_REQUESTING'
    ) {
      this.setState({
        villOptions: []
      })
    } else if (getAreaDistrict.readyStatus === 'AREA_VILLAGE_FAILURE') {
      return <p>Oops, Failed to load info!</p>;
    } else {
      let data = [];
      const listDropdown = _.map(getAreaDistrict.info.data.villages, key => {
        data = {
          label: key.village_name,
          value: key.id
        };
        return data;
      });
      this.setState({
        villOptions: listDropdown
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

  render() {
    const { options, provOptions, cityOptions, distOptions, villOptions } = this.state
    const SchemaDocument = Yup.object().shape({
      noBukti: Yup.string().required('Tidak boleh kosong.'),
      noSertifikat: Yup.string().required('Tidak boleh kosong.'),
      namaPemilik: Yup.string().required('Tidak boleh kosong.'),
      atasNama: Yup.string().required('Tidak boleh kosong.'),
      tanggalPenerbitan: Yup.string().required('Tidak boleh kosong.'),
      luasTanah: Yup.string().required('Tidak boleh kosong.'),
      no_gambar: Yup.string().required('Tidak boleh kosong.'),
      tanggalGSU: Yup.string().required('Tidak boleh kosong.'),
      no_identitas_bidang_tanah: Yup.string().required('Tidak boleh kosong.'),
      surat_pemberitahuan_pbb: Yup.string().required('Tidak boleh kosong.'),
      nop: Yup.string().required('Tidak boleh kosong.'),
      nilai_agunan: Yup.string().required('Tidak boleh kosong.'),
      provinsi: Yup.object().shape({
          label: Yup.string().required('Tidak boleh kosong.')
        }),
      kabupaten: Yup.object().shape({
        label: Yup.string().required('Tidak boleh kosong.')
      }),
      kecamatan: Yup.object().shape({
        label: Yup.string().required('Tidak boleh kosong.')
      }),
      kelurahan: Yup.object().shape({
        label: Yup.string().required('Tidak boleh kosong.')
      }),
      jalan: Yup.string().required('Tidak boleh kosong.'),
      nilai_pengikatan: Yup.string().required('Tidak boleh kosong.')
    })
    return (
      <div className="order-form">
        <Formik 
          initialValues={{
            noBukti: undefined,
            noSertifikat: '',
            namaPemilik: '',
            atasNama: '',
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
            kecamatan: '',
            kelurahan: '',
            alamat_lengkap: '',
            nilai_pengikatan: '',
            jalan: ''
          }}
          validationSchema={SchemaDocument}
          onSubmit={(value) => {
            const paramOrder = {
              collateral_type: "immovable",
              proof_of_ownership: value.noBukti,
              owner: value.namaPemilik,
              name_representative: value.atasNama,
              certificate_number: value.noSertifikat,
              publication_date: moment(new Date(value.tanggalPenerbitan)).format("DDMMYYYY"),
              province: value.provinsi.label,
              city: value.kabupaten.label,
              district: value.kecamatan.label,
              village: value.kelurahan.label,
              street: value.jalan,
              land_area: value.luasTanah,
              letter_of_measurement: value.no_gambar,
              gs_su_date: moment(new Date(value.tanggalGSU)).format("DDMMYYYY"),
              no_land_identity: value.no_identitas_bidang_tanah,
              letter_of_pbbtax: value.surat_pemberitahuan_pbb,
              nop: value.nop,
              binding_value: parseInt(value.nilai_pengikatan, 10),
              collateral_value: parseInt(value.nilai_agunan, 10)
            } 
            this.props.handleSubmit(paramOrder)
          }}
        >
          {({
            errors, touched, values, setFieldValue
          }) => {
            const onChangeSelect = (name, value) => {
              const {
                fetchAreaCityIfNeeded,
                fetchAreaDistrictIfNeeded,
                fetchAreaVillageIfNeeded
              } = this.props
              setFieldValue(name, value);
              if (name === 'provinsi') {
                const params = {
                  provId: value.value
                }
                setFieldValue('kabupaten', '')
                setFieldValue('kecamatan', '')
                fetchAreaCityIfNeeded(params)
                
              } else if (name === 'kabupaten') {
                const params = {
                  cityId: value.value
                }
                setFieldValue('kecamatan', '')
                fetchAreaDistrictIfNeeded(params)
              } else if (name === 'kecamatan') {
                const params = {
                  districtId: value.value
                }
                fetchAreaVillageIfNeeded(params)
              }
            };
            const onChangeTextarea = e => {
              setFieldValue(e.target.name, e.target.value);
            };
            const onChangeDate = (name ,date, dateString) => {
            setFieldValue(name, date);
          };
            return (
              <div className="surat-section">
                <h4>Form Agunan </h4>
                <Form className="form-surat-nah">
                  <div className="row">
                    <div className="col-md-4">
                      <InputFormik
                        name="noBukti"
                        label="No Bukti Kepemilikan"
                        placeholder="Masukan no bukti..."
                        error={errors.noBukti && touched.noBukti ? errors.noBukti : null}
                      />
                    </div>
                    <div className="col-md-4">
                      <InputFormik
                        name="noSertifikat"
                        label="No Sertifikat"
                        placeholder="Masukan no sertifikat..."
                        error={errors.noSertifikat && touched.noSertifikat ? errors.noSertifikat : null}
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
                        name="atasNama"
                        label="Atas Nama"
                        placeholder="Masukan nama pemilik..."
                        error={errors.atasNama && touched.atasNama ? errors.atasNama : null}
                      />
                    </div>
                    <div className="col-md-4">
                      <DateInput 
                        value={values.tanggalPenerbitan}
                        onChange={(date, dateString) => onChangeDate('tanggalPenerbitan', date, dateString)}
                        name="tanggalPenerbitan"
                        label="Tanggal Penerbitan"
                        placeholder="Pilih Tangal Penerbitan"
                        error={errors.tanggalPenerbitan && touched.tanggalPenerbitan ? errors.tanggalPenerbitan : null}
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
                          value={values.tanggalGSU}
                          onChange={(date, dateString) => onChangeDate('tanggalGSU', date, dateString)}
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
                          onChange={value => onChangeSelect('provinsi', value)}
                          options={provOptions}
                          value={values.provinsi}
                          error={errors.provinsi && touched.provinsi ? errors.provinsi.label : null}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectFormik
                          name="kabupaten"
                          label="Kabupatan"
                          placeholder="Kabupaten"
                          onChange={value => onChangeSelect('kabupaten', value)}
                          options={cityOptions}
                          value={values.kabupaten}
                          error={errors.kabupaten && touched.kabupaten ? errors.kabupaten.label : null}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectFormik
                          name="kecamatan"
                          label="Kecamatan"
                          placeholder="Kecamatan"
                          onChange={value => onChangeSelect('kecamatan', value)}
                          options={distOptions}
                          value={values.kecamatan}
                          error={errors.kecamatan && touched.kecamatan ? errors.kecamatan.label : null}
                        />
                      </div>
                      <div className="col-md-4">
                        <SelectFormik
                          name="kelurahan"
                          label="Kelurahan"
                          placeholder="Kelurahan"
                          onChange={value => onChangeSelect('kelurahan', value)}
                          options={villOptions}
                          value={values.kelurahan}
                          error={errors.kelurahan && touched.kelurahan ? errors.kelurahan.label : null}
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
              </div>
            )
          }}
        </Formik>
      </div>
    )
  }
}

const mapStateToProps = ({ 
  areaProvince,
  areaDistrict,
  areaCity,
  areaVillage }: ReduxState) => ({
  areaProvince,
  areaDistrict,
  areaCity,
  areaVillage
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAreaProvinceIfNeeded: (param: Object) =>
    dispatch(AreaProvinceAction.fetchAreaProvinceIfNeeded(param)),
  fetchAreaCityIfNeeded: (param: Object) =>
    dispatch(AreaCityAction.fetchAreaCityIfNeeded(param)),
  fetchAreaDistrictIfNeeded: (param: Object) =>
    dispatch(AreaDistrictAction.fetchAreaDistrictIfNeeded(param)),
  fetchAreaVillageIfNeeded: (param: Object) =>
    dispatch(AreaVillageAction.fetchAreaVillageIfNeeded(param)),

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormTidakBergerak);