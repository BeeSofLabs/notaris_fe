/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { DashboardWrapper, Card, Button, TableCom, SelectFormik } from '../../../components/element'
import { Checkbox } from 'antd'
import { Modal } from 'antd'
import { Row, Col, Dropdown } from 'react-bootstrap'


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
      visible: false
    }

    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
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

  render() {
    return (
      <DashboardWrapper>
        <div className="title-dashboard">
          <h4>Profile saya</h4>
        </div>
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
                    <h5>Angelica Surjodiningrat S.H</h5>
                  </div>
                  <div className="city">
                    <p>Depok, Kab Bogor, Kota Bogor</p>
                  </div>
                  <div className="lokasi">
                    <p>Jl. Mataram No.61, RT.4/RW.1, Selong, Kec. Kby. Baru, Kota Jakarta Selatan, DKI Jakarta</p>
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
                        <p>9081523239293923/239923/2323</p>
                      </div>
                    </div>

                    <div className="group-label">
                      <div className="title-group">
                        <h4>Nomor Akta</h4>
                      </div>
                      <div className="deskripsi-group">
                        <p>908152323929</p>
                      </div>
                    </div>

                    <div className="group-label">
                      <div className="title-group">
                        <h4>Nomor Telpon</h4>
                      </div>
                      <div className="deskripsi-group">
                        <p>+62 232332323</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-label">
                      <div className="title-group">
                        <h4>Tanggal SK Notaris</h4>
                      </div>
                      <div className="deskripsi-group">
                        <p>19 Agustus 2016</p>
                      </div>
                    </div>

                    <div className="group-label">
                      <div className="title-group">
                        <h4>Tanggal Akta</h4>
                      </div>
                      <div className="deskripsi-group">
                        <p>19 Agustus 2016</p>
                      </div>
                    </div>

                    <div className="group-label">
                      <div className="title-group">
                        <h4>Nomor Fax</h4>
                      </div>
                      <div className="deskripsi-group">
                        <p>+62 2323232323</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
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
)(Profile);