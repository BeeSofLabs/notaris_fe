/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PageWrapper, Card, Button } from '../../components/element'
import { Checkbox } from 'antd'
import { compressToEncodedURIComponent } from 'lz-string'
import Constants from '../../helpers/constants' 
import axios from 'axios'

export class Payment extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      detailOrder: {
        status: 'Loading',
        data: {}
      },
      dataBank: [{
        code: "014",
        name: "BANK BCA"
      }],
      checked: false
    }

    this.handleChangeChecked = this.handleChangeChecked.bind(this)
  }

  componentDidMount() {
    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': 'example-of-custom-header',
      'Accept-Version': 1,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: Constants.TOKEN
    };

    axios.get(`${Constants.API}/api/v1/orders/show/${this.props.match.params.idOrder}`).then(res => {
      return this.setState({
        detailOrder: {
          status: 'Success',
          detail: res.data.order
        }
      })
    }).catch(err => {
      this.setState({
        listOrder: {
          status: 'Failed',
          data: {}
        }
      })
    })
  }

  handleChangeChecked() {
    this.setState({ checked: !this.state.checked });
  }

  handleSubmitPayment() {
    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': 'example-of-custom-header',
      'Accept-Version': 1,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: Constants.TOKEN
    };

    const param = {
      order_id: this.props.match.params.idOrder,
      phone: "085697366188",
      bank_code: "008",
      bank_account: "08879987779879987",
      note: "bayar cash payment alfamart"
    }

    axios.post(`${Constants.API}/api/v1/payment/bank/transfer`, param).then(res => {
      console.log(res)
      const data = compressToEncodedURIComponent(JSON.stringify(res.data))
      return this.props.history.push(`/payment/detail/${data}`)
    }).catch(err => {
     console.log(err)
    })
  }

  render() {
    return (
      <PageWrapper>
        <div className="payment-wrapper">
          <div className="container">
            <div className="page-section">
              <div className="title-section">
                <h4>Pembayaran</h4>
                <p>Anda dapat memilih metode pembayara untuk menyelesaikan order dengan<br /> no ID FI89421486919-091</p>
              </div>
              <div className="body-section">
                <div className="row">
                  <div className="col-md-12">
                    <Card>
                      <div className="detail-body-content">
                        <div className="title">
                          <h3>SKMHT/APHT</h3>
                        </div>
                        <div className="number-order">
                          <p>ID FI89421486919-091</p>
                        </div>
                        <div className="bottom-content">
                          <p>12 September 2019</p>
                          <p>Rojali Ahmad - Kreditur</p>
                        </div>
                      </div>
                    </Card>
                  
                    <Card>
                      <div className="title-body-content">
                        <h3>Metode Pembayaran</h3>
                      </div>
                      <div className="list-body-content">
                        <div className="title-content">
                          <h3>Virtual Account</h3>
                        </div>
                        <div className="body-content">
                          <ul>
                            <li>
                              <Checkbox
                                checked={this.state.checked}
                                onChange={this.handleChangeChecked}
                              ><img src={require('../../app/assets/img/bca.png')} alt="bank bca" /><span className="text-checkbox">BCA</span></Checkbox>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* <div className="list-body-content">
                        <div className="title-content">
                          <h3>Credit Card</h3>
                        </div>
                        <div className="body-content">
                          <ul>
                            <li>
                              <Checkbox>Credit Card</Checkbox>
                            </li>
                          </ul>
                        </div>
                      </div> */}
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-fix">
            <div className="container">
              <div className="wrapping-button">
                <div className="row">
                  <div className="col-md-9">

                  </div>
                  <div className="col-md-3">
                    <Button 
                      type="button"
                      className="button-right"
                      onClick={() => this.handleSubmitPayment()}
                      disabled={false}
                    >
                      Lanjutkan Pembayaran
                    </Button>
                  </div>
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
)(Payment);