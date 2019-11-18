/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Select, Rate } from 'antd';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';
import queryString from 'query-string';

import { PageWrapper, Card, LoadingListSkeleton } from '../../../components/element';

import * as NotarisListAction from '../../../actions/notaris/List'

import {
  ListNotaris as ListNotarisType,
  Dispatch,
  ReduxState
} from '../../../types'

const { Option } = Select;

type Props = {
  listNotaris: ListNotarisType,
  match: Object,
  fetchListNotarisIfNeeded: (param: Object) => void,
};


export class List extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      star: 2,
      search: '',
      list_notaris: [],
      loadingList: false,
      type: '',
      error: false,
      renderPage: false
    };

    this.onChangeStar = this.onChangeStar.bind(this)
    this.handleList = this.handleList.bind(this)
  }

  componentWillMount() {
    this.setState({
      search: queryString.parse(this.props.location.search).name,
      type: queryString.parse(this.props.location.search).type,
      renderPage: true
    })
  }

  componentDidMount() {
    this.props.fetchListNotarisIfNeeded();
  }

  componentWillReceiveProps (nextProps) {
    const {
      listNotaris
    } = this.props

    const obj = {}
    if (listNotaris !== nextProps.listNotaris) {
      this.handleList(nextProps.listNotaris)
    }
  }

  handleList (listNotaris) {
    if (!listNotaris || listNotaris.readyStatus === 'LIST_NOTARIS_REQUEST') {
      return this.setState({
        loadingList: true,
        error:false
      })
    }

    if (listNotaris.readyStatus === 'LIST_NOTARIS_FAILURE') {
      console.log('sd')
      return this.setState({
        loadingList: false,
        error: true
      })
    }

    if (listNotaris.readyStatus === 'LIST_NOTARIS_SUCCESS') {
      return this.setState({
        list_notaris: listNotaris.list.data,
        loadingList:false,
        error: false
      })
    }
  }

  onChange(value) {
    console.log(`selected ${value}`);
  }

  onChangeStar = value => {
    console.log(value);
    this.setState({
      star: value
    });
  };

  onBlur() {
    console.log('blur');
  }

  onFocus() {
    console.log('focus');
  }

  onSearch(val) {
    console.log('search:', val);
  }

  renderListNotaris() {
    const { loadingList, error, list_notaris } = this.state
    const { listNotaris } = this.props
    if (loadingList) {
      return <LoadingListSkeleton />
    }

    // if (error) {
    //   return <h5 style={{color: 'red', textAlign: 'center'}}>Maaf ada masalah dengan server</h5>
    // }

    // if (!loadingList && !error && listNotaris.readyStatus === 'LIST_NOTARIS_SUCCESS') {
    //   return (
    //     <Card>
          
    //       {/* {
    //         list_notaris.map(key => {
    //           return (
    //             <div className="list-body-content" key={key.id}>
    //               <div className="top-content">
    //                 <div className="row">
    //                   <div className="col-md-6">
    //                     <div className="name-notaris">
    //                       <a href={`/notaris/${key.id}`}><h3>{key.name}</h3></a>
    //                     </div>
    //                   </div>
    //                   <div className="col-md-6">
    //                     {/* <div className="star">
    //                       <h1>{star}</h1>
    //                       <Rate
    //                         onChange={this.onChangeStar}
    //                         value={star}
    //                         allowHalf
    //                       />
    //                     </div> */}
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="mid-content">
    //                 <div className="address">
    //                   <p>Depok, Kab Bogor, Kota Bogor</p>
    //                 </div>
    //               </div>
    //               <div className="bottom-content">
    //                 <div className="detail-address">
    //                   <p>Jl. Matraman No. 12</p>
    //                   <p>10.000000 - 20.0000000</p>
    //                 </div>
    //               </div>
    //             </div>
    //           )
    //         })
    //       } */}
    //     </Card>
    //   )
    // }

    return (
      <Card>
        <div className="list-body-content">
          <div className="top-content">
            <div className="row">
              <div className="col-md-6">
                <div className="name-notaris">
                  <a href={`/notaris/1`}><h3>Zilmas</h3></a>
                </div>
              </div>
              <div className="col-md-6">
                {/* <div className="star">
                  <h1>{star}</h1>
                  <Rate
                    onChange={this.onChangeStar}
                    value={star}
                    allowHalf
                  />
                </div> */}
              </div>
            </div>
          </div>
          <div className="mid-content">
            <div className="address">
              <p>Depok, Kab Bogor, Kota Bogor</p>
            </div>
          </div>
          <div className="bottom-content">
            <div className="detail-address">
              <p>Jl. Matraman No. 12</p>
              <p>10.000000 - 20.0000000</p>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  render() {
    const { star, search, list_notaris, type, renderPage } = this.state;
    if (renderPage) {
      return (
        <PageWrapper>
          <div className="container">
            <div className="list-section">
              <div className="list-filter">
                <div className="row">
                  <div className="col-md-3">
                    <div className="search">
                      <label forHtml="search">
                        <form onSubmit={this.handleSearch}>
                          <input 
                            type="text"
                            value={search} 
                            placeholder="Cari ..."
                          />
                          <button type="submit" className="icon-search">
                            <img
                              src={require('../../../app/assets/img/search.svg')}
                              alt="search"
                            />
                          </button>
                        </form>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Seluruh Indonesia"
                      optionFilterProp="children"
                      onChange={this.onChange}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="Jakarta">Jakarta</Option>
                      <Option value="Bekasi">Bekasi</Option>
                      <Option value="Bandung">Bandung</Option>
                    </Select>
                  </div>
                  <div className="col-md-3">
                    <div className="filter-harga">
                      <div className="wrapper-select">
                        <label>Type</label>
                        <Select
                          style={{ width: '80%' }}
                          placeholder="smkht/apht/fidusia"
                          optionFilterProp="children"
                          onChange={this.onChange}
                          defaultValue={type}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="skmht">SKMHT</Option>
                          <Option value="apht">APHT</Option>
                          <Option value="fidusia">FIDUSIA</Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="filter-harga">
                      <div className="wrapper-select">
                        <label>Range</label>
                        <Select
                          style={{ width: '80%' }}
                          placeholder="0-5 Juta Rupiah"
                          optionFilterProp="children"
                          onChange={this.onChange}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Jakarta">0-5 Juta Rupiah</Option>
                          <Option value="Bekasi">5-15 Juta Rupiah</Option>
                          <Option value="Bandung">15-25 Juta Rupiah</Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-body">
                {this.renderListNotaris()}
                {/*  */}
              </div>
            </div>
          </div>
        </PageWrapper>
      );
    }
  }
}

const mapStateToProps = ({
  listNotaris
}: ReduxState) => ({
  listNotaris
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchListNotarisIfNeeded: (param: Object) =>
    dispatch(NotarisListAction.fetchListNotarisIfNeeded(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
