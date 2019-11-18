/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PageWrapper, Card, Button } from '../../components/element'
import { Checkbox } from 'antd'


export class PaymentDetail extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      zilmas: ''
    }
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
                      <div className="detail-order">
                        <div className="top-content">
                          <div className="row">
                            <div className="col-md-7">
                              <div className="title">
                                <h4>Nomor Transaksi</h4>
                              </div>
                              <div className="body">
                                <p>INV91754109-01</p>
                              </div>
                            </div>
                            <div className="col-md-5">
                              <div className="title">
                                <h4>Batas Waktu Pembayaran</h4>
                              </div>
                              <div className="body">
                                <p>Kamis, 17 Mei 2019, 21:08 WIB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bottom-content">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="title">
                                <h4>Total Pembayaran</h4>
                              </div>
                              <div className="body">
                                <p>Rp 4.752.000</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  
                    <Card>
                      <div className="detail-payment">
                        <div className="row">
                          <div className="col-md-2 img-payment">
                          <img src={require('../../app/assets/img/bca.png')} alt="bank bca" />
                          </div>
                          <div className="col-md-10 info-payment">
                            <div className="title">
                              <h4>Bank BCA</h4>
                            </div>
                            <div className="sub-title">
                              <h5>Virtual Account</h5>
                            </div>
                            <div className="body">
                              <p>1983 7541 9023 8934</p>
                            </div>
                          </div>
                        </div>
                      </div>
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
                      onClick={() => window.location = `/notaris/${this.props.match.params.id}/order`}
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
)(PaymentDetail);