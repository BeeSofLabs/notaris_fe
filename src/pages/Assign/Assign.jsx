import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Modal } from 'antd'
import axios from 'axios'
import Constants from '../../helpers/constants';

import { CookieStorage } from 'cookie-storage'
import { decompressFromEncodedURIComponent, compressToEncodedURIComponent } from 'lz-string'
import { PageWrapper, Card, Button } from '../../components/element'

const cookieStorage = new CookieStorage();


class Assign extends Component {
  constructor(props) {
    super(props)

    this.state ={
      detailAssgin: {
        status: 'Loading',
        data: {}
      },
      akun: '',
      visible: false
    }

    this.handleSign = this.handleSign.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSignSubmit = this.handleSignSubmit.bind(this)
  }

  showModal() {
    this.setState({
      visible: !this.state.visible
    })
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
    const dataProf = cookieStorage.getItem('prof')
    const data = JSON.parse(decompressFromEncodedURIComponent(dataProf))
    if (data.user_tipe === "debtor") {
      this.setState({
        akun: 'debitur'
      })
    } else {
      this.setState({
        akun: 'kreditur'
      })
    }

    return axios.get(`${Constants.API}/api/v1/orders/show/${this.props.match.params.id}`).then(res => {
      this.setState({
        detailAssgin: {
          status: 'Success',
          data: res.data.order
        }
      })
    }).catch(err => {

    })
  }

  handleSign() {
    this.setState({
      visible: !this.state.visible
    })

    setTimeout(() => {
      Privy.init({
        merchantKey: 'ZI3212',
      })
      Privy.openDoc('6c251be8f8f3fffa8f9fc59f56a52e91d0ebade4c4c9e386472d456d6c067651', {
        dev      : true,
        container: '.privy-document',
        privyId  : 'ZI3212', //Autofill privyID
        signature: {
          page : 2,
          x    : 130,
          y    : 468,
          fixed: false
        }
      })
      .on('after-action', (data) => {
        // Redirecti after sign/review doc
        // location.href = '//www.google.com'
      })
      .on('after-sign', (data) => {
        this.props.location.history.push(`/assign/${this.props.match.params.id}/auth`)
        // Redirecti after sign doc
        // location.href = '//www.aftersign.com' // After sign doc
      })
      .on('after-review', (data) => {
        // location.href = '//www.afterreview.com' // After review doc
      })
    }, 2000)
  }

  handleCancel() {
    this.setState({
      visible: !this.state.visible
    })
  }

  handleSignSubmit() {
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
      order_id: this.props.match.params.id,
      submit: true
    }

    axios.post(`${Constants.API}//api/v1/document/approval`, param).then(res => {
      Modal.success({
        title: 'Success',
        content: 'Telah berhasil disubmit.',
        cancelText: null,
      });    
    }).catch(() => {
      Modal.error({
        title: 'Error',
        content: 'Ada masalah dengan server.',
        cancelText: null,
        onOk: () => this.props.history.push(`/assign/${this.props.match.params.id}`)
      });
    })
  }

  renderDetail() {
    const { detailAssgin, akun } = this.state
    if (detailAssgin.status === 'Loading') {
      return <div className="container">
        Loading ....
      </div>
    }

    if (detailAssgin.status === 'Success') {
      return (
        <div className="container">
          <Modal
            title=""
            closable={false}
            style={{ top: 20 }}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            forceRender={true}
          >
            <div className="privy-document"></div>
          </Modal>
          <div className="row">
            <div className="col-md-8">
              <Card>
                <div className="section-pihak-terkait">
                  <div calssName='title'>
                    <h4>Tanda Tangan Pihak Terkait</h4>
                  </div>
                  <div className="body">
                    <div className="row list-assign">
                      <div className="col-md-2">
                        <div className="photo-profil">
                          <img src={require('../../app/assets/img/photo-profil.jpg')} alt="photo profile" />
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="name-notaris">
                          <h5>{detailAssgin.data.creditor_user.name}</h5>
                          <span>ID {detailAssgin.data.creditor_user.id}</span><br/>
                          <span className="status-user">Kreditur</span>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="status-assign">
                          {
                            !detailAssgin.data.has_creditor_signed && <Icon type="close-circle" style={{ fontSize: '33px' }} theme="twoTone" twoToneColor="red" />
                          }
                          {
                           detailAssgin.data.has_creditor_signed && <Icon type="check-circle" style={{ fontSize: '33px' }} theme="twoTone" twoToneColor="#0c65e4"  />
                          }
                        </div>
                        <div className="button-assign">
                          {
                            akun === 'kreditur' && <button
                              onClick={this.handleSign}
                            >
                              Tanda tangan
                            </button>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="row list-assign">
                      <div className="col-md-2">
                        <div className="photo-profil">
                          <img src={require('../../app/assets/img/photo-profil.jpg')} alt="photo profile" />
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="name-notaris">
                          <h5>{detailAssgin.data.debtor_user.name}</h5>
                          <span>ID {detailAssgin.data.debtor_user.id}</span><br/>
                          <span className="status-user">Debitur</span>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="status-assign">
                          {
                            !detailAssgin.data.has_debtor_signed && <Icon type="close-circle" style={{ fontSize: '33px' }} theme="twoTone" twoToneColor="red" />
                          }
                          {
                           detailAssgin.data.has_debtor_signed && <Icon type="check-circle" style={{ fontSize: '33px' }} theme="twoTone" twoToneColor="#0c65e4"  />
                          }  
                        </div>
                        <div className="button-assign">
                          {
                            akun === 'debitur' && <button
                              onClick={this.handleSign}
                            >
                              Tanda tangan
                            </button>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="submission">
                <div className="row">
                  <div className="col-md-8">
                    <p className="info-text">Submission bisa di aktifkan ketika sudah di tanda tangani semua</p>
                  </div>
                  <div className="col-md-4">
                    <Button
                      type="button"
                      onClick={this.handleSignSubmit}
                      disabled={!( akun === 'kreditur' && detailAssgin.data.has_creditor_signed && detailAssgin.data.has_debtor_signed)}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
                  
              </div>
            </div>
            <div className="col-md-4">
              <Card>
                <div className="top-side">
                  <label>{detailAssgin.data.document_type}</label>
                  <p>ID Order {detailAssgin.data.no_request_order}</p>
                </div>
                <div className="bottom-side">
                  <label>Pembuat Order</label>
                  <p>{detailAssgin.data.creditor_user.name}</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    const { detailAssgin } = this.state
    return (
      <PageWrapper>
        <div className="assign-wrapper">  
          {this.renderDetail()}
        </div>
      </PageWrapper>
    )
  }

}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});


export default Assign