/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { DashboardWrapper, Card, TableCom, SelectFormik } from '../../../../components/element'
import { Checkbox, Table } from 'antd'
import { Row, Col, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import * as moment from 'moment';
import Constants from '../../../../helpers/constants' 

const options = [{ value: 1, label: 'Label 1' }, { value: 2, label: 'Label 2' }]

const column = [
  '',
  'ID Region',
  'Nama Region',
  'Branch',
]

const rows = [{
  id: 12,
  nama_region: 'Jawa',
  nama_branch: 'Surabaya',
}, {
  id: 12,
  nama_region: 'Jawa',
  nama_branch: 'Surabaya',
}, {
  id: 13,
  nama_region: 'Jawa',
  nama_branch: 'Surabaya',
}]


const staticData = [{
  id:2,
  name: 'Angelina',
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'draft',
  creditor_user: {
    name: 'Andy'
  },
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:3,
  name: 'Angelina',
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'submission',
  creditor_user: {
    name: 'Andy'
  },
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:4,
  name: 'Angelina',
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'approval',
  creditor_user: {
    name: 'Andy'
  },
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:5,
  name: 'Angelina',
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'waiting_payment',
  creditor_user: {
    name: 'Andy'
  },
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
},{
  id:6,
  name: 'Angelina',
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'paid',
  creditor_user: {
    name: 'Andy'
  },
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:7,
  name: 'Angelina',
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'covernote',
  creditor_user: {
    name: 'Andy'
  },
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:8,
  name: 'Angelina',
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'claim',
  creditor_user: {
    name: 'Andy'
  },
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:9,
  name: 'Angelina',
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'close_claim',
  creditor_user: {
    name: 'Andy'
  },
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:10,
  name: 'Angelina',
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'completed',
  creditor_user: {
    name: 'Andy'
  },
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:11,
  name: 'Angelina',
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'expired',
  creditor_user: {
    name: 'Andy'
  },
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}, {
  id:12,
  name: 'Angelina',
  no_request_order: 'RK0001',
  document_type: 'SKMHT',
  created_at: "2019-12-26T17:11:13.176Z",
  status: 'cancel',
  creditor_user: {
    name: 'Andy'
  },
  chat_room: {
      id: 5,
      close_date: null,
      is_closed: false,
      open_date: "2019-12-26",
      order_id: 10
  }
}]





export class List extends PureComponent<Props> {
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
    axios.defaults.headers.common.Authorization = `Token ${Constants.TOKEN}`;

    
    axios.get(`${Constants.API}/api/v1/orders`, ).then(res => {
      console.log('asd', res)
      return this.setState({
        listOrder: {
          status: 'Success',
          items: staticData
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

  onChange(e) {

  }

  handleStatus(status) {
    console.log('asd', status)
    switch(status) {
      case 'draft':
        return (
        <>
          <span>draft</span>
          <button>Edit</button>
        </>
        );
      case 'submission': 
        return (
          <>
            <span>Submission</span>
            <button>Edit</button>
          </>
          );
      case 'approval': 
        return (
          <>
            <span>Approval</span>
            <button>Edit</button>
          </>
          );
      case 'waiting_payment':
        return (
          <>
            <span>Waiting Payment</span>
            <button>Edit</button>
          </>
          );
      case 'paid':
        return (
          <>
            <span>Paid</span>
            <button>Download document</button>
          </>
          );
      case 'covernote':
        return (
          <>
            <span>Covernote</span>
            <button>Edit</button>
          </>
          );
      case 'claim': 
        return (
          <>
            <button>Claim Chat</button>
          </>
          );
      case 'close_claim':
        return (
          <>
            <button>Claim Chat</button>
          </>
          );
      case 'completed':
        return (
          <>
            <span>Completed</span>
            <button>Edit</button>
          </>
          );
      case 'expired':
        return (
          <>
            <span>Expired</span>
            <button>Edit</button>
          </>
          );;
      case 'cancel': 
      return (
        <>
          <span>Cancel</span>
          <button>Edit</button>
        </>
        );
      case 'deleted': 
      return (
        <>
          <span>Cancel</span>
          <button>Edit</button>
        </>
        );
    }
  }

  renderList() {
    const {  listOrder } = this.state
    if (listOrder.status === 'Loading') {
      return (
        <div className="body-dashboard">
          Loading ...
        </div>
      )
    }

    let dataSource = [];
    console.log(listOrder)
    listOrder.items.map(key => {
      dataSource.push({
        key: key.id,
        id_order: key.no_request_order,
        type_order: key.document_type,
        tanggal: moment(new Date(key.created_at)).format("DD MMMM YYYY"),
        pemohon_order: key.creditor_user.name,
        status: key.status
      })
    })
    // const dataSource = [
    //   {
    //     key: '1',
    //     id_order: '992932',
    //     type_order: 'SKHMT',
    //     tanggal: '10 Downing Street',
    //     pemohon_order: 'sdsd',
    //     status: 'sdasd'
    //   },
    // ];
    const columns = [
      {
        title: 'ID Order',
        dataIndex: 'id_order',
        key: 'id_order',
      },
      {
        title: 'Jenis Order',
        dataIndex: 'type_order',
        key: 'type_order',
      },
      {
        title: 'Tanggal',
        dataIndex: 'tanggal',
        key: 'tanggal',
        render: tanggal => (
          <span>{tanggal}</span>
        )
      }, 
      {
        title: 'Pembuat Order',
        dataIndex: 'pemohon_order',
        key: 'pemohon_order',
      }, 
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => (
          <span className="status-list">{this.handleStatus(status)}</span>
        )
      }
    ];
    if (listOrder.status === 'Success') {
      return (
        <div className="body-dashboard">
          <Card>
            {/* <div className="filter">
              <Row>
                <Col md="5">
                  <div className="filter-by filter-by-regional">
                    <span>
                      Filter By :
                    </span>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic" bsPrefix="drodpown-filter">
                        All
                        <img src={require('../../../../app/assets/img/icon-dropdown.png')} className="icon-filter" alt="icon" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <form className="filter-choose">
                          <SelectFormik
                            name="reginona"
                            label="Parent"
                            placeholder="Choose Parent"
                            // onChange={onChangeSelect}
                            options={options}
                            // value={values.parentRegional}
                            // error={errors.parentRegional && touched.parentRegional ? errors.parentRegional : null}
                          />
                          <button
                            type="submit"
                            className="button-submit-filter-choose"
                          >
                            Apply
                          </button>
                        </form>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col>
                <Col md="3" />
                <Col md="4">
                  <div className="search-input-table">
                    <form>
                      <button type="submit">
                        <img src={require('../../../../app/assets/img/search-icon.svg')} alt="search icon" />
                      </button>
                      <input
                        type="text"
                        name="search"
                        placeholder="Search Branch"
                        className="input-search"
                        onChange={this.onChange}
                        // value={form.search || ''}
                      />
                    </form>
                  </div>
                </Col>
              </Row>
            </div>
            */}

            <div className="table-list-order">
              <Table dataSource={dataSource} columns={columns} pagination={false}/>
            </div>
          </Card> 
        </div>
      )
    }
  }

  render() {
    return (
      <DashboardWrapper>
        <div className="title-dashboard">
          <h4>List Order</h4>
        </div>
        {this.renderList()}
      </DashboardWrapper>
    )
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);