/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PageWrapper, Card, Button } from '../../components/element'
import { Checkbox, Icon } from 'antd'
import { CookieStorage } from 'cookie-storage'
import axios from 'axios'
import * as moment from 'moment';
import Constants from '../../helpers/constants' 

const staticData = [{
  id:2,
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'draft',
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:3,
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'submission',
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:4,
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'approval',
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:5,
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'waiting_payment',
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
},{
  id:6,
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'paid',
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:7,
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'covernote',
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:8,
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'claim',
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:9,
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'close_claim',
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:10,
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'completed',
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:11,
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'expired',
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:12,
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'cancel',
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}]

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

  handleStatus(status) {
    switch(status) {
      case 'draft':
        return 'draft';
      case 'submission': 
        return 'Submission';
      case 'approval': 
        return 'Approve';
      case 'waiting_payment':
        return 'Waiting Payment';
      case 'paid':
        return 'Paid';
      case 'covernote':
        return 'Covernote';;
      case 'claim': 
        return 'Claim';
      case 'close_claim':
          return 'Close Claim';
      case 'completed':
         return 'Completed';
      case 'expired':
        return 'Expired';
      case 'cancel': 
        return 'cancel';
      case 'deleted': 
        return 'cancel';
    }
  }

  renderButton(status, id, idNotaris) {
    if (status === 'draft') {
      return <Button
      type="button"
      disabled={false}
      onClick={() => this.props.history.push(`/notaris/${idNotaris}/order/${id}`)}
    >
      Draft
    </Button>
    }

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

    if (status === 'claim') {
      return <Button
        type="button"
        disabled={false}
        onClick={() => this.props.history.push(`/chat/${id}`)}
      >
        Chat
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
                                    <p>ID {key.no_request_order}</p>
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
                                <p>{this.handleStatus(key.status, key.id)}</p>
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
                                  {this.renderButton(key.status, key.id, key.notary_user.id)}
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