/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios'
import { CookieStorage } from 'cookie-storage'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import { Modal } from 'antd';

import { PageWrapper, Card, Button, DashboardWrapper } from '../../components/element'
import AuthAgunan from '../../components/Page/AuthComponent/AuthAgunan'
import { Checkbox } from 'antd'

import ListTables from './ListTables'
import SimpleTabs from './SimpleTabs'
import SimpleMenu from './SimpleMenu'

import Constants from '../../helpers/constants';


const row = ['Nama Pemilik', 'Bukti Kepemilikan', 'Kategori' ,'Action']

export class Dashboard extends PureComponent<> {
  constructor(props) {
    super(props)

    this.state = {
      listAgunan: {
        status: 'LOADING',
        items: []
      },
      visible: false
    }

    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel = e => {
    console.log('asd', e)
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
      const cookieStorage = new CookieStorage()
      const dataProf = cookieStorage.getItem('rolenot')
      const data = decompressFromEncodedURIComponent(dataProf)
      if (data !== 'collateral_owner' && dataProf === null)  {
        return this.props.history.push('/')
      }
    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': 'example-of-custom-header',
      'Accept-Version': 1,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: Constants.TOKEN
    };

    axios.get(`${Constants.API}/api/v1/collateral`).then(res => {
      let data = []
      res.data.immovable_collaterals.map(key => {
        key.category = 'Tidak Bergerak';
        data.push(key)
      })
      res.data.movable_collaterals.map(key => {
        key.category = 'Bergerak';
        data.push(key)
      })
      console.log('asd', data)
      this.setState({
        listAgunan: {
          status: 'SUCCESS',
          items: data
        }
      })
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { listAgunan, visible } = this.state
    return (
        <DashboardWrapper noMenu>
          <div className="title-section-agunan">
            {/* <SimpleTabs /> */}
            <h4>List Agunan</h4>
          </div>
          <div className="row">
           <div className="col-md-2">
              <Button onClick={this.showModal} disabled={false}>
                Tambah Agunan
              </Button>
              <Modal
                visible={this.state.visible}
                onCancel={this.handleCancel}
                closeIcon={null}
                closable={null}
                footer={null}
              >
                <div className="titleModal">
                  <h4>Pilih Jenis Agunan Yang Ingin <br/>ditambahkan</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <Button 
                        className="button-right" 
                        type="button"
                        disabled={false}
                        onClick={() => { this.props.history.push('/agunan/bergerak/add') }}
                      >
                        Bergerak
                      </Button>
                    </div>
                    <div className="col-md-6">
                      <Button 
                        className="button-right" 
                        type="button" 
                        disabled={false}
                        onClick={() => { this.props.history.push('/agunan/tidak-bergerak/add') }}
                      >
                        Tidak Bergerak
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          <div className="body-section-agunan">
            <ListTables headRow={row}>
              {
                listAgunan.items.map(key => (
                  <TableRow key={key.id}>
                    <TableCell component="th" scope="row">
                      {key.owner}
                    </TableCell>
                    <TableCell>
                      {key.proof_of_ownership}
                    </TableCell>
                    <TableCell>
                      {key.category}
                    </TableCell>
                    <TableCell>
                      hapus
                    </TableCell>
                  </TableRow>
                ))
              }
            </ListTables>
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
)(Dashboard);