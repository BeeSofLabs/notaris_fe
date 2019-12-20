/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { DashboardWrapper, PageWrapper, Card, Button } from '../../components/element'
import { Checkbox } from 'antd'
import Swal from 'sweetalert2/dist/sweetalert2'
import axios from 'axios'
import { CookieStorage } from 'cookie-storage';
import Constants from '../../helpers/constants';
import { decompressFromEncodedURIComponent } from 'lz-string' 

import FormTidakBergerak from './TipeAgunan/FormTidakBergerak'
import FormBergerak from './TipeAgunan/FormBergerak'


const cookieStorage = new CookieStorage({
  path: '/'
});
export class AddAgunan extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      zilmas: ''
    }
    this.handleSubmitAgunan = this.handleSubmitAgunan.bind(this)
  }

  handleSubmitAgunan(value) {
    let param = value;
    const dataProf = cookieStorage.getItem('prof')
    const data = JSON.parse(decompressFromEncodedURIComponent(dataProf))
    
    param.signed= data.name

    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': 'example-of-custom-header',
      'Accept-Version': 1,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: Constants.TOKEN
    };
    return axios.post(`${Constants.API}//api/v1/collateral`, { ...param }).then(res => {
      return Swal.fire({
        icon:'success',
        html: `<div class="text-popup"><h5>${res.data.message}</h5></div>`,
        confirmButtonText: 'Ok',
        customClass: {
          container: 'popup-container poptup-button-red',
        },
        width: '400px',
        preConfirm: () => {
          this.props.history.push('/agunan')
        },
        allowOutsideClick: false,
      })
    }).catch(err => {

    })
  }

  render() {

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

    return (
      <DashboardWrapper noMenu>
        <div className="payment-wrapper">
          <div className="container">
            <div className="page-section">
              <div className="title-section">
                <h4>Tambah Agunan</h4>
                {/* <p>Anda memiliki order yang telah dibuat. Untuk melanjutkan proses order,<br /> silakan pilih order yang Anda inginkan</p> */}
              </div>
              <div className="body-section">
                <div className="list-body list-body-history">
                  <Card>
                    {
                      (this.props.match.params.section === "tidak-bergerak") && <FormTidakBergerak options={options} handleSubmit={this.handleSubmitAgunan} />
                    }
                    {
                      (this.props.match.params.section === "bergerak") && <FormBergerak options={options} handleSubmit={this.handleSubmitAgunan} />
                    }
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardWrapper>
    )
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAgunan);