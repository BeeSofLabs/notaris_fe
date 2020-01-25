/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { DashboardWrapper, Card, Button, TableCom, SelectFormik } from '../../../components/element'
import { Checkbox } from 'antd'
import { Modal, Switch } from 'antd'
import { Row, Col, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import * as moment from 'moment';
import Constants from '../../../helpers/constants' 

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


export class Profile extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      zilmas: '',
      visible: false,
      detailNotaris: {
        status: 'Loading',
        data: {}
      }
    }

    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount() {
    axios.defaults.headers.common.Authorization = `Token ${Constants.TOKEN}`;

    
    axios.get(`${Constants.API}/api/v1/users/show`).then(res => {
      console.log('asd', res)
      return this.setState({
        detailNotaris: {
          status: 'Success',
          data: res.data
        }
      })
    }).catch(err => {
      this.setState({
        detailNotaris: {
          status: 'Failed',
          data: {}
        }
      })
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onChange(e) {

  }

  renderDetail() {
    const { detailNotaris } = this.state

    if (detailNotaris.status === 'Loading') {
      return <div className="body-dashboard">
        Loading ....
      </div>
    }
    console.log(detailNotaris)
    if (detailNotaris.status === 'Success') {
      return (
        <div className="body-dashboard">
          <Card>
            <div className="info-profile">
              <Row>
                <Col md="12">
                  <div className="image-profile">

                  </div>
                </Col>
                <Col md="9">
                  <div className="nama">
                    <h5>{detailNotaris.data.name}</h5>
                  </div>
                  <div className="city">
                    <p>{detailNotaris.data.indonesia_city.city_name}, {detailNotaris.data.indonesia_province.province_name}</p>
                  </div>
                  <div className="lokasi">
                    <p>{detailNotaris.data.address}</p>
                    <p>10.000.000 - 15.000.000 <button onClick={this.showModal}>Edit</button></p>
                  </div>
                  <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    closeIcon={null}
                    closable={null}
                    footer={null}
                  >
                    <div className="titleModal">
                      <h4>Ubah Harga Jasa</h4>
                      <div className="row">
                        <div className="col-md-6" style={{margin: '0 auto'}}>
                          <Button 
                            className="button-right" 
                            type="button" 
                            disabled={false}
                            onClick={() => { this.props.history.push('/agunan/tidak-bergerak/add') }}
                          >
                            Simpan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </Col>
                <Col md="12">
                  <div className="section-aktif">
                    <Switch defaultChecked /> <span>Dengan mengaktifkan switch, profile Anda dapat ditampilkan dalam pencarian sistem</span>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
          <Card>
              <div className="detail-body-content">
                <div className="row">
                  <div className="col-md-12">
                    <h3>Detail Profil Polis</h3>
                  </div>
                  <div className="col-md-6">
                    <div className="group-label">
                      <div className="title-group">
                        <h4>Nomor SK Notaris</h4>
                      </div>
                      <div className="deskripsi-group">
                        <p>{detailNotaris.data.no_sk_notaris}</p>
                      </div>
                    </div>

                    <div className="group-label">
                      <div className="title-group">
                        <h4>Nomor Akta</h4>
                      </div>
                      <div className="deskripsi-group">
                        <p>{detailNotaris.data.no_akta}</p>
                      </div>
                    </div>

                    <div className="group-label">
                      <div className="title-group">
                        <h4>Nomor Telpon</h4>
                      </div>
                      <div className="deskripsi-group">
                        <p>{detailNotaris.data.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-label">
                      <div className="title-group">
                        <h4>Tanggal SK Notaris</h4>
                      </div>
                      <div className="deskripsi-group">
                        <p>{detailNotaris.data.tgl_sk_notaris}</p>
                      </div>
                    </div>

                    <div className="group-label">
                      <div className="title-group">
                        <h4>Tanggal Akta</h4>
                      </div>
                      <div className="deskripsi-group">
                        <p>{detailNotaris.data.tgl_akta}</p>
                      </div>
                    </div>

                    <div className="group-label">
                      <div className="title-group">
                        <h4>Nomor Fax</h4>
                      </div>
                      <div className="deskripsi-group">
                        <p>{detailNotaris.data.fax}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
        </div>
      )
    }
  }

  render() {
    return (
      <DashboardWrapper page={["2"]}>
        <div className="title-dashboard">
          <h4>Profile saya</h4>
        </div>
        {this.renderDetail()}
      </DashboardWrapper>
    )
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);