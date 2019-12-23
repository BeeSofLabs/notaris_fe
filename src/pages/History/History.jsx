/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PageWrapper, Card, Button } from '../../components/element'
import { Checkbox, Icon } from 'antd'
import { CookieStorage } from 'cookie-storage'
import axios from 'axios'
import * as moment from 'moment';
import Constants from '../../helpers/constants' 

export class History extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      listOrder: {
        status: 'Loading',
        items: []
      }
    }
  }

  componentDidMount() {
    // var config = {
    //   headers: {'Authorization': "bearer " + Constants.TOKEN}
    // };

    axios.defaults.headers.common.Authorization = `Token ${Constants.TOKEN}`;

    
    axios.get(`${Constants.API}/api/v1/orders`, ).then(res => {
      console.log('asd', res)
      return this.setState({
        listOrder: {
          status: 'Success',
          items: res.data.order
        }
      })
    }).catch(err => {
      this.setState({
        listOrder: {
          status: 'Failed',
          items: []
        }
      })
    })
  }

  renderButton(status, id) {
    if (status === 'waiting_payment') {
      return <Button
        type="button"
        disabled={false}
        onClick={() => this.props.history.push(`/payment/${id}`)}
      >
        Bayar
      </Button>
    }

    if (status === 'approval') {
      return <Button
        type="button"
        disabled={false}
        onClick={() => this.props.history.push(`/assign/${id}`)}
      >
        Persetujuan
      </Button>
    }
  }

  render() {
    const { listOrder } = this.state
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
                    {
                      listOrder.items.map(key => (
                        <div className="list-body-content">
                          <div className="top-content">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="name-notaris">
                                  <a href={`/notaris/`}><h3>{key.document_type}</h3></a>
                                </div>
                                <div className="mid-content">
                                  <div className="address">
                                    <p>ID {key.id}</p>
                                  </div>
                                </div>
                                <div className="bottom-content">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="detail-address on-order-list">
                                        <p><Icon type="calendar" /> <span>{moment(new Date(key.created_at)).format("DD MMMM YYYY")}</span></p>
                                        <p><Icon type="user" /> <span>Ahmad Rojali - Kreditur</span></p>

                                        {/* <p>{key.notary_services.map(data => (
                                          <li key={data.id}>{data.service_type} <span>{this.convertToRupiah(data.price)}</span></li>
                                        ))}</p> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <label>Status</label>
                                <p>{(key.id%2) == 0 ? 'Menunggu Pembayaran' : 'Approve'}</p>
                                {/* <div className="star">
                                  <h1>{star}</h1>
                                  <Rate
                                    onChange={this.onChangeStar}
                                    value={star}
                                    allowHalf
                                  />
                                </div> */}
                              </div>
                              <div className="col-md-4">
                                <a href={`/history/${key.id}`} className="link-order"><Icon type="eye" /><span>Lihat detail </span></a>
                                <div className="bottom-content">
                                  {this.renderButton((key.id%2) == 0 ? 'waiting_payment' : 'approval', key.id)}
                                </div>
                              </div>
                            </div>
                          </div>
                         
                          
                        </div>
                  
                      ))
                    }
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