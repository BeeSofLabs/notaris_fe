/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Rate } from 'antd';
import { CookieStorage } from 'cookie-storage';

import { PageWrapper, Card, Button } from '../../../components/element';

import * as NotarisDetailAction from '../../../actions/notaris/Detail'

import {
  DetailNotaris as DetailNotarisType,
  Dispatch,
  ReduxState
} from '../../../types'

type Props = {
  detailNotaris: DetailNotarisType,
  match: Object,
  fetchDetailNotarisIfNeeded: (param: Object) => void,
};

const cookieStorage = new CookieStorage({
  path: '/'
});

export class Detail extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      star: 2,
      detailNotaris: '',
      auth: false
    };

    this.onChangeStar = this.onChangeStar.bind(this);
  }

  componentWillMount() {
    const { fetchDetailNotarisIfNeeded, match } = this.props;

    const params = {
      id: match.params.id
    }

    if (cookieStorage.getItem('prof')) {
      this.setState({
        auth: true,
      });
    }

    fetchDetailNotarisIfNeeded(params)
  }

  convertToRupiah = val => {
    const numberString = val.toString();
    const sisa = numberString.length % 3;
    let rupiah = numberString.substr(0, sisa);
    const ribuan = numberString.substr(sisa).match(/\d{3}/g);
    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    return `Rp ${rupiah}`;
  };

  // componentWillReceiveProps(nextProps) { 
  //   const {
  //     detailNotaris
  //   } = this.props

  //   if (detailNotaris !== nextProps.detailNotaris) {
  //     this.handleDetail(nextProps.detailNotaris)
  //   }
  // }

  // handleDetail = (detailNotaris) => {
  //   if (!detailNotaris || detailNotaris.readyStatus === 'DETAIL_NOTARIS_REQUEST') {
  //     return this.setState({
  //       loadingList: true,
  //       error:false
  //     })
  //   }

  //   if (detailNotaris.readyStatus === 'DETAIL_NOTARIS_FAILURE') {
  //     console.log('sd')
  //     return this.setState({
  //       loadingList: false,
  //       error: true
  //     })
  //   }

  //   if (detailNotaris.readyStatus === 'DETAIL_NOTARIS_SUCCESS') {
  //     return this.setState({
  //       list_notaris: listNotaris.list.data,
  //       loadingList:false,
  //       error: false
  //     })
  //   }
  // }

  renderDetail() {
    const { detailNotaris } = this.props
    const { auth } = this.state

      if (!detailNotaris || detailNotaris.readyStatus === 'DETAIL_NOTARIS_REQUEST') {
        return 'Loading'
      }

      if (detailNotaris.readyStatus === 'DETAIL_NOTARIS_FAILURE') {
        return 'ada masalah'
      }

      if (detailNotaris.readyStatus === 'DETAIL_NOTARIS_SUCCESS') {
        console.log(detailNotaris)
        const data = detailNotaris.data.data[0]
        return (
          <>
            <Card>
              <div className="detail-body-content">
                <div className="name-notaris">
                  <h3>{data.name || "-"}</h3>
                </div>
                <div className="address">
                  <p>Depok, Kab Bogor, Kota Bogor</p>
                </div>
                <div className="bottom-content">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="detail-address">
                        <p>Jl. Matraman No. 12</p>
                        <p>{data.notary_services.map(key => (
                          <li key={key.id}>{key.service_type} <span>{this.convertToRupiah(key.price)}</span></li>
                        ))}</p>
                      </div>
                    </div>
                  </div>
                </div>
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

          </>
        )
      }
  }

  onChangeStar = value => {
    console.log(value);
    this.setState({
      star: value
    });
  };

  render() {
    const { star } = this.state;
    return (
      <PageWrapper>
        <div className="container">
          <div className="detail-section">
            <div className="row">
              <div className="col-md-12">
                {this.renderDetail()}
                {/* <Card>
                  <div className="detail-body-content">
                    <div className="name-notaris">
                      <h3>Angelica Surjodiningrat</h3>
                    </div>
                    <div className="address">
                      <p>Depok, Kab Bogor, Kota Bogor</p>
                    </div>
                    <div className="bottom-content">
                      <div className="detail-address">
                        <p>Jl. Matraman No. 12</p>
                        <p>10.000000 - 20.0000000</p>
                      </div>
                    </div>
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
                </Card> */}

                {/* <Card>
                  <div className="detail-body-content">
                    <div className="row">
                      <div className="col-md-12">
                        <h3>Review</h3>
                      </div>
                      <div className="col-md-4">
                        <div className="info-lengkap">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="star">
                                <h1>{star}</h1>
                                <Rate
                                  onChange={this.onChangeStar}
                                  value={star}
                                  allowHalf
                                  style={{ fontSize: 15 }}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <p>21 Orang</p>
                            </div>
                            <div className="col-md-6">
                              <a>Lihat Semua</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="info-komentar">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="list-komen">
                                <div className="title-komen">
                                  <div className="title-list">
                                    <h3>Michael Hordan</h3>
                                  </div>
                                  <div className="star">
                                    <h1>{star}</h1>
                                    <Rate
                                      onChange={this.onChangeStar}
                                      value={star}
                                      allowHalf
                                      style={{ fontSize: 12 }}
                                    />
                                  </div>
                                </div>
                                <div className="body-komen">
                                  <p>
                                    Pelayanan Cepat dan Transparan. Memiliki
                                    network yang baik sehingga mempermudah
                                    proses jual beli tanah.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="list-komen">
                                <div className="title-komen">
                                  <div className="title-list">
                                    <h3>Michael Hordan</h3>
                                  </div>
                                  <div className="star">
                                    <h1>{star}</h1>
                                    <Rate
                                      onChange={this.onChangeStar}
                                      value={star}
                                      allowHalf
                                      style={{ fontSize: 12 }}
                                    />
                                  </div>
                                </div>
                                <div className="body-komen">
                                  <p>
                                    Pelayanan Cepat dan Transparan. Memiliki
                                    network yang baik sehingga mempermudah
                                    proses jual beli tanah.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                 */}
              </div>
            </div>
          </div>
        </div>
        <div className="button-fix">
          <div className="container">
            <div className="wrapping-button">
              <div className="row">
                <div className="col-md-9">

                </div>
                <div className="col-md-3">
                  <Button 
                    type="button"
                    className="button-right"
                    onClick={() => window.location = `/notaris/${this.props.match.params.id}/order`}
                    disabled={false}
                  >
                    Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = ({
  detailNotaris
}: ReduxState) => ({
  detailNotaris
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchDetailNotarisIfNeeded: (param: Object) => 
    dispatch(NotarisDetailAction.fetchDetailNotarisIfNeeded(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
