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

export class FormBergerak extends PureComponent<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    const SchemaDocument = Yup.object().shape({
      noBukti: Yup.string().required('Tidak boleh kosong'),
      namaPemilik: Yup.string().required('Tidak boleh kosong'),
      atas_nama: Yup.string().required('Tidak boleh kosong'),
      no_bukti: Yup.string().required('Tidak boleh kosong'),
      tanggalPenerbitan: Yup.string().required('Tidak boleh kosong'),
      no_mesin: Yup.string().required('Tidak boleh kosong'),
      no_rangka: Yup.string().required('Tidak boleh kosong'),
      merek: Yup.string().required('Tidak boleh kosong'),
      warna: Yup.string().required('Tidak boleh kosong'),
      tipe: Yup.string().required('Tidak boleh kosong'),
      nilai_agunan:Yup.string().required('Tidak boleh kosong'),
      nilai_pengikatan: Yup.string().required('Tidak boleh kosong')
    })
    return (
      <div className="order-form">
        <Formik 
          initialValues={{
            noBukti: '',
            namaPemilik: '',
            atas_nama: '',
            no_bukti: '',
            tanggalPenerbitan: '',
            no_mesin: '',
            no_rangka: '',
            warna: '',
            tipe: '',
            nilai_agunan:'',
            nilai_pengikatan: '',
            merek: ''
          }}
          validationSchema={SchemaDocument}
          onSubmit={(value) => {
            const paramOrder = {
              collateral_type: "movable",
              proof_of_ownership: value.noBukti,
              owner: value.namaPemilik,
              no_evidence: value.no_bukti,
              name_representative: value.atas_nama,
              publication_date: moment(new Date(value.tanggalPenerbitan)).format("DDMMYYYY"),
              machine_number: value.no_mesin,
              chassis_number: value.no_rangka,
              brand: value.merek,
              classification: value.tipe,
              serial_number: value.no_rangka,
              color: value.color,
              binding_value: parseInt(value.nilai_pengikatan, 10),
              collateral_value: parseInt(value.nilai_agunan, 10)
            } 
            console.log('asd')
            this.props.handleSubmit(paramOrder)
          }}
        >
          {({
            errors, touched, values, setFieldValue
          }) => {
            console.log(errors)
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
                        name="merek"
                        label="Merek"
                        placeholder="Masukan merek..."
                        error={errors.merek && touched.merek ? errors.merek : null}
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
              </div>
            )
          }}
        </Formik>
      </div>
    )
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormBergerak);