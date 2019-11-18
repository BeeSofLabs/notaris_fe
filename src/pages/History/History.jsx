/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PageWrapper, Card, Button } from '../../components/element'
import { Checkbox } from 'antd'

export class History extends PureComponent<Props> {
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
                <h4>Order Anda</h4>
                <p>Anda memiliki order yang telah dibuat. Untuk melanjutkan proses order,<br /> silakan pilih order yang Anda inginkan</p>
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
                              <Checkbox><img src={require('../../app/assets/img/bca.png')} alt="bank bca" /><span className="text-checkbox">BCA</span></Checkbox>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="list-body-content">
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
                      </div>
                    </Card>
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
)(History);