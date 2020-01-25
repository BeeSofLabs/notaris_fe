import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Modal } from 'antd'
import axios from 'axios'
import Constants from '../../../helpers/constants';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { CookieStorage } from 'cookie-storage'
import { decompressFromEncodedURIComponent, compressToEncodedURIComponent } from 'lz-string'
import { PageWrapper, Card, Button, DashboardWrapper } from '../../../components/element'

const cookieStorage = new CookieStorage();


class KlaimChat extends Component {
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
      },
      inputChat: '',
      id_room: null
    }

    this.handleSign = this.handleSign.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChat = this.handleChat.bind(this)
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
    this.setState({
      akun: data.name
    })

    return axios.get(`${Constants.API}/api/v1/orders/show/${this.props.match.params.id}`).then(res => {
      this.getChat(res.data.order.chat_room.id)
      this.setState({
        id_room: res.data.order.chat_room.id
      })
      this.setState({
        detailAssgin: {
          status: 'Success',
          data: res.data.order
        }
      })
    }).catch(err => {
      this.setState({
        detailAssgin: {
          status: 'Failed',
        }
      })
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
    const { listChat, akun } = this.state
    
    if (listChat.status === 'Loading') {
      return 'Loading ...'
    }
    
    if (listChat.status === 'Success') {
      return <Card>
        <div className="section-chat">
          <div className="container-chat">
            <div className="box-chat">
              {
                listChat.items.map(key => {
                  if (key.username === akun) {
                    return (
                      <div className="row-chat" key={key.id}>
                        <div className="item-box item-box-me">
                          <div className="item-title">
                            <h4>Saya</h4>
                          </div>
                          <div className="item-body">
                            <p>{key.content}</p>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div className="row-chat" key={key.id}>
                      <div className="item-box">
                        <div className="item-title">
                          <h4>{key.username} - <span>Pemohon Order</span></h4>
                        </div>
                        <div className="item-body">
                          <p>{key.content}</p>
                        </div>
                      </div>
                    </div>
                  ) 
                })
              }
            </div>
          </div>
        </div>
      </Card>
    }
  }

  renderSubmitChat() {
    const { inputChat } = this.state
    return (
      <Card>
        <div className="box-input">
          <form onSubmit={this.handleChat}>
            <input 
              className="input-chat"
              placeholder="..."
              value={inputChat}
              onChange={(e) => this.setState({ inputChat: e.target.value })}
            />
            <button type="submit" className="button-chat">
              Kirim
            </button>
          </form>
        </div>
      </Card>
    )
  }

  handleChat(e) {
    e.preventDefault()
    const { inputChat, listChat, id_room } = this.state

    if (inputChat) {
      axios.defaults.headers.common.Authorization = `Token ${Constants.TOKEN}`;

      const params = {
        chats: {
          content: inputChat,
		      chat_room_id: id_room
        }
      }
      return axios.post(`${Constants.API}/api/v1/chats`, params).then(res => {
        this.setState({
          listChat: {
            status: 'Success',
            items: res.data.chat_room.chats
          },
          inputChat: ''
        })
      }).catch(err => {
        
      })
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
              {this.renderSubmitChat()}
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
      <DashboardWrapper page={["3"]}>
        <div className="assign-wrapper">  
          {this.renderDetail()}
        </div>
      </DashboardWrapper>
    )
  }

}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});


export default KlaimChat