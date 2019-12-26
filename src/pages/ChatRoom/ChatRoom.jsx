import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Modal } from 'antd'
import axios from 'axios'
import Constants from '../../helpers/constants';

import { CookieStorage } from 'cookie-storage'
import { decompressFromEncodedURIComponent, compressToEncodedURIComponent } from 'lz-string'
import { PageWrapper, Card, Button } from '../../components/element'

const cookieStorage = new CookieStorage();


class ChatRoom extends Component {
  constructor(props) {
    super(props)

    this.state ={
      detailAssgin: {
        status: 'Loading',
        data: {}
      },
      akun: '',
      visible: false,
      listChat: {
        status: 'Loading',
        items: []
      }
    }

    this.handleSign = this.handleSign.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
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
      console.log('asd', res)
      this.getChat(res.data.order.chat_room.id)
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

    // setTimeout(() => {
    //   Privy.init({
    //     merchantKey: 'ZI3212',
    //   })
    //   Privy.openDoc('6c251be8f8f3fffa8f9fc59f56a52e91d0ebade4c4c9e386472d456d6c067651', {
    //     dev      : true,
    //     container: '.privy-document',
    //     privyId  : 'ZI3212', //Autofill privyID
    //     signature: {
    //       page : 2,
    //       x    : 130,
    //       y    : 468,
    //       fixed: false
    //     }
    //   })
    //   .on('after-action', (data) => {
    //     // Redirecti after sign/review doc
    //     // location.href = '//www.google.com'
    //   })
    //   .on('after-sign', (data) => {
    //     console.log('jalan')
    //     // Redirecti after sign doc
    //     // location.href = '//www.aftersign.com' // After sign doc
    //   })
    //   .on('after-review', (data) => {
    //     // location.href = '//www.afterreview.com' // After review doc
    //   })
    // }, 2000)
    
  }

  getChat(id) {
    axios.defaults.headers.common.Authorization = `Token ${Constants.TOKEN}`;


    axios.get(`${Constants.API}/api/v1/chats?chat_room_id=${id}`).then(res => {
      console.log('asd', res)
      return this.setState({
        listChat: {
          status: 'Success',
          items: res.data.chat_room.chats
        }
      })
    }).catch(err => {
      this.setState({
        listChat: {
          status: 'Failed',
          items: []
        }
      })
    })
  }

  handleCancel() {
    this.setState({
      visible: !this.state.visible
    })
  }

  renderChat() {
    const { listChat } = this.state
    
    if (listChat.status === 'Loading') {
      return 'Loading ...'
    }
    
    if (listChat.status === 'Success') {
      return "jalan"
    }
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
          <div className="row">
            <div className="col-md-8">
              {this.renderChat()}
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
    console.log('asd', detailAssgin)
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


export default ChatRoom