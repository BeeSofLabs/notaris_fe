import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Modal } from 'antd'
import axios from 'axios'
import Constants from '../../../helpers/constants';
import CKEditor from '@ckeditor/ckeditor5-react';
import Swal from 'sweetalert2/dist/sweetalert2'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { CookieStorage } from 'cookie-storage'
import { decompressFromEncodedURIComponent, compressToEncodedURIComponent } from 'lz-string'
import { PageWrapper, Card, Button, DashboardWrapper } from '../../../components/element'

const cookieStorage = new CookieStorage();


class EditDocument extends Component {
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
        data: {}
      },
      inputChat: '',
      id_room: null,
      valueEditor: ''
    }

    this.handleSign = this.handleSign.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChat = this.handleChat.bind(this)
    this.handleUploadDocument = this.handleUploadDocument.bind(this)
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
      this.getDocument(res.data.order.id, res.data.order.document_type)
      // this.setState({
      //   id_room: res.data.order.chat_room.id
      // })
      this.setState({
        detailAssgin: {
          status: 'Success',
          data: res.data.order
        }
      })
    }).catch(err => {
      console.log(err)
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

  getDocument(id, type) {
    axios.defaults.headers.common.Authorization = `Token ${Constants.TOKEN}`;

    axios.get(`${Constants.API}/api/v1/document?doctype=${type}&order_id=${id}`).then(res => {
      
      return this.setState({
        listChat: {
          status: 'Success',
          data: res.data
        }
      })
    }).catch(err => {
      this.setState({
        listChat: {
          status: 'Failed',
          data: {}
        }
      })
    })
  }

  handleUploadDocument() {
    const { valueEditor } = this.state;
    const param = {
      order_id: this.props.match.params.id,
      html_content: valueEditor
    }
    axios.post(`${Constants.API}/api/v1/document/upload`, param).then(res => {
      return Swal.fire({
        icon:'success',
        html: `<div class="text-popup"><h5>Order Telah berhasil di simpan</h5></div>`,
        confirmButtonText: 'Ok',
        customClass: {
          container: 'popup-container poptup-button-red',
        },
        width: '400px',
        preConfirm: () => {
          this.props.history.push('/dashboard/list-order')
        },
        allowOutsideClick: false,
      })
    }).catch(err => {
      
    })
  }

  handleCancel() {
    this.setState({
      visible: !this.state.visible
    })
  }

  renderChat() {
    const { listChat, akun, valueEditor } = this.state
    if (listChat.status === 'Loading') {
      return 'Loading ...'
    }
    
    if (listChat.status === 'Success' && window) {
      return <div className="document-editor">
        <CKEditor
            onInit={ editor => {
                console.log( 'Editor is ready to use!', editor );

                // Insert the toolbar before the editable area.
                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                );
            } }
            onChange={(event, editor) => { 
              this.setState({
                valueEditor: editor.getData()
              })
            }}
            editor={ DecoupledEditor }
            data={listChat.data.content ? listChat.data.content : listChat.data.template}
          />
      </div>
    }
  }

  // renderSubmitChat() {
  //   const { inputChat } = this.state
  //   return (
  //     <Card>
  //       <div className="box-input">
  //         <form onSubmit={this.handleChat}>
  //           <input 
  //             className="input-chat"
  //             placeholder="..."
  //             value={inputChat}
  //             onChange={(e) => this.setState({ inputChat: e.target.value })}
  //           />
  //           <button type="submit" className="button-chat">
  //             Kirim
  //           </button>
  //         </form>
  //       </div>
  //     </Card>
  //   )
  // }

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
    const { detailAssgin, akun, valueEditor } = this.state
    console.log(detailAssgin)
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
              {/* {this.renderSubmitChat()} */}
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
              <div className="button-upload">
                <Button
                  disabled={valueEditor ? false : true}
                  type="button"
                  onClick={this.handleUploadDocument}
                >Upload</Button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    const { detailAssgin } = this.state
    return (
      <DashboardWrapper>
        <div className="assign-wrapper">  
          {this.renderDetail()}
        </div>
      </DashboardWrapper>
    )
  }

}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});


export default EditDocument