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
                <div className="list-body list-body-history">
                  <Card>
                    <div className="list-body-content">
                      <div className="top-content">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="name-notaris">
                              <a href={`/notaris/`}><h3>sdasd</h3></a>
                            </div>
                          </div>
                          <div className="col-md-6">
                            {/* <div className="star">
                              <h1>{star}</h1>
                              <Rate
                                onChange={this.onChangeStar}
                                value={star}
                                allowHalf
                              />
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="mid-content">
                        <div className="address">
                          <p>Depok, Kab Bogor, Kota Bogor</p>
                        </div>
                      </div>
                      <div className="bottom-content">
                        <div className="row">
                          <div className="col-md-5">
                            <div className="detail-address">
                              <p>Jl. Matraman No. 12</p>
                              {/* <p>{key.notary_services.map(data => (
                                <li key={data.id}>{data.service_type} <span>{this.convertToRupiah(data.price)}</span></li>
                              ))}</p> */}
                            </div>
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