/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Select, Rate } from 'antd';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';
import queryString from 'query-string';

import { PageWrapper, Card, LoadingListSkeleton } from '../../../components/element';

import * as NotarisListAction from '../../../actions/notaris/List'
import * as AreaProvinceAction from '../../../actions/area/province';
import * as AreaCityAction from '../../../actions/area/city'
import * as AreaDistrictAction from '../../../actions/area/district';

import {
  ListNotaris as ListNotarisType,
  AreaProvince as AreaProvinceType,
  AreaCity as AreaCityType,
  AreaDistrict as AreaDistrictType, 
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
      renderPage: false,
      wilayah: '',
      range: '',
      lower: '',
      upper: '',
      provOptions: [],
      cityOptions: [],
      distOptions: [],
      showCity: false,
      showDist: false,
      prov: {},
      city: {},
      dist: {}
    };

    this.onChangeStar = this.onChangeStar.bind(this)
    this.handleList = this.handleList.bind(this)
    this.onChangeKota = this.onChangeKota.bind(this)
    this.onChangeProv = this.onChangeProv.bind(this)
    this.onChangeDist = this.onChangeDist.bind(this)
    this.onChangeRange = this.onChangeRange.bind(this)
    this.onChangeType = this.onChangeType.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillMount() {
    this.setState({
      search: queryString.parse(this.props.location.search).name || '',
      type: queryString.parse(this.props.location.search).type || '',
      renderPage: true
    })
  }

  componentDidMount() {
    const {
      fetchAreaProvinceIfNeeded,
      fetchListNotarisIfNeeded,
      match
    } = this.props
    const param = {
      name: this.state.search,
      area: '',
      doc_type: this.state.type,
      range_lower: '',
      range_higher: ''
    }
    fetchListNotarisIfNeeded(param)
    fetchAreaProvinceIfNeeded(match)
  }

  componentWillReceiveProps (nextProps) {
    const {
      listNotaris,
      areaProvince, 
      areaCity, 
      areaDistrict
    } = this.props

    const obj = {}
    if (listNotaris !== nextProps.listNotaris) {
      this.handleList(nextProps.listNotaris)
    }
    if (nextProps.areaCity[obj] !== areaCity[obj]) {
      this.areaCityData(nextProps.areaCity[obj]);
    }

    if (nextProps.areaProvince[obj] !== areaProvince[obj]) {
      this.areaProvinceData(nextProps.areaProvince[obj]);
    }

    if (nextProps.areaDistrict[obj] !== areaDistrict[obj]) {
      this.areaDistrictData(nextProps.areaDistrict[obj]);
    }
  }

  areaCityData = areaCity => {
    const getAreaCity = areaCity;
    if (!getAreaCity || getAreaCity.readyStatus === 'AREA_CITY_REQUESTING') {
      this.setState({
        cityOptions: []
      })
    } else if (getAreaCity.readyStatus === 'AREA_CITY_FAILURE') {
      return <p>Oops, Failed to load info!</p>;
    } else {
      let data = [];
      const listDropdown = _.map(getAreaCity.info.data.cities, key => {
        data = {
          label: key.city_name,
          value: key.id
        };
        return data;
      });
      listDropdown.unshift({
        label: 'All',
        value: 0
      })
      this.setState({
        cityOptions: listDropdown
      })
    }
  };

  areaDistrictData = areaDistrict => {
    const getAreaDistrict = areaDistrict;
    if (
      !getAreaDistrict ||
      getAreaDistrict.readyStatus === 'AREA_DISTRICT_REQUESTING'
    ) {
      this.setState({
        distOptions: []
      })
    } else if (getAreaDistrict.readyStatus === 'AREA_DISTRICT_FAILURE') {
      return <p>Oops, Failed to load info!</p>;
    } else {
      let data = [];
      const listDropdown = _.map(getAreaDistrict.info.data.districts, key => {
        data = {
          label: key.district_name,
          value: key.id
        };
        return data;
      });
      listDropdown.unshift({
        label: 'All',
        value: 0
      })
      this.setState({
        distOptions: listDropdown
      })
    }
  }

  areaProvinceData = areaProvince => {
    const getAreaProvince = areaProvince;

    if (
      !getAreaProvince ||
      getAreaProvince.readyStatus === 'AREA_PROVINCE_REQUESTING'
    ) {
      console.log('loading');
    } else if (getAreaProvince.readyStatus === 'AREA_PROVINCE_FAILURE') {
      console.log('failed');
    } else {
      let data = [];
      const listDropdown = _.map(
        getAreaProvince.info.data.provinces,
        key => {
          data = {
            label: key.province_name,
            value: key.id
          };
          return data;
        }
      );
      listDropdown.unshift({
        label: 'All',
        value: 0
      })
      this.setState({
        provOptions: listDropdown,
      });
    }
  };

  onChangeProv = (key) => {
    const {
      fetchAreaCityIfNeeded
    } = this.props;
    this.setState({
      distOptions: [],
      showCity: key.key === 0 ? false : true,
      showDist: false,
      prov: key,
      city: {},
      dist: {},
    })

    const params = {
      provId: key.key
    }

    if (key.key !== 0) {
      fetchAreaCityIfNeeded(params);
    } else {
      const { search, type, prov, lower, upper } = this.state
      const params = {
        name: search,
        area: "",
        doc_type: type,
        range_lower: lower,
        range_higher: upper
      }
      this.props.fetchListNotarisIfNeeded(params)
    }
  }

  onChangeDist = (key) => {
    const { search, type, prov, lower, upper, city } = this.state
    this.setState({
      dist: key,
      wilayah: key.key === 0 ? city.label : key.label
    })
    const params = {
      name: search,
      area: key.key !== 0 ? key.label : city.label,
      doc_type: type,
      range_lower: lower,
      range_higher: upper
    }
    this.props.fetchListNotarisIfNeeded(params)
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

  onChangeKota = (key) => {
    const {
      fetchAreaDistrictIfNeeded,
    } = this.props;
    const { prov } = this.state
    this.setState({
      showCity: true,
      showDist: key.key === 0 ? false : true,
      city: key,
      dist: {},
      wilayah: key.key === 0 ? prov.label : key.label
    })


    const params = {
      cityId: key.key
    }
    if (key.key !== 0) {
      fetchAreaDistrictIfNeeded(params);
    } else {
      const { search, type, prov, lower, upper } = this.state
      const params = {
        name: search,
        area: prov.label,
        doc_type: type,
        range_lower: lower,
        range_higher: upper
      }
      this.props.fetchListNotarisIfNeeded(params)
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

  onChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  onChangeKota(value) {
    this.setState({
      wilayah: value
    })
    const { search, type, wilayah, lower, upper } = this.state
    const params = {
      name: search,
      area: value,
      doc_type: type,
      range_lower: lower,
      range_higher: upper
    }
    this.props.fetchListNotarisIfNeeded(params)
  }

  onChangeRange(value) {
    const arr = value.split('-')
    this.setState({
      range: value,
      lower: arr[0],
      upper: arr[1]
    })
    const { search, type, wilayah} = this.state
    const params = {
      name: search,
      area: wilayah,
      doc_type: type,
      range_lower: arr[0],
      range_higher: arr[1]
    }
    this.props.fetchListNotarisIfNeeded(params)
  }

  onChangeType(value) {
    this.setState({
      type: value
    })
    const { search, wilayah, lower, upper } = this.state
    const params = {
      name: search,
      area: wilayah,
      doc_type: value,
      range_lower: lower,
      range_higher: upper
    }
    this.props.fetchListNotarisIfNeeded(params)
  }

  onChangeStar = value => {
    this.setState({
      star: value
    });
  };

  handleSearch (e) {
    e.preventDefault();
    const { search, type, wilayah, lower, upper } = this.state
    const params = {
      name: search,
      area: wilayah,
      doc_type: type,
      range_lower: lower,
      range_higher: upper
    }
    this.props.fetchListNotarisIfNeeded(params)
  }

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
    const { loadingList, error, list_notaris, provOptions } = this.state
    const { listNotaris } = this.props
    if (loadingList) {
      return <LoadingListSkeleton />
    }

    if (error) {
      return <h5 style={{color: 'red', textAlign: 'center'}}>Maaf ada masalah dengan server</h5>
    }

    if (!loadingList && !error && listNotaris.readyStatus === 'LIST_NOTARIS_SUCCESS') {
      if (list_notaris.length === 0) {
        return "Maaf data tidak ditemukan."
      }
      return (
        <Card>
          {
            list_notaris.map(key => {
              return (
                <div className="list-body-content" key={key.id}>
                  <div className="top-content">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="name-notaris">
                          <a href={`/notaris/${key.id}`}><h3>{key.name}</h3></a>
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
                    <div className="row">
                      <div className="col-md-5">
                        <div className="detail-address">
                          <p>Jl. Matraman No. 12</p>
                          <p>{key.notary_services.map(data => (
                            <li key={data.id}>{data.service_type} <span>{this.convertToRupiah(data.price)}</span></li>
                          ))}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          } 
        </Card>
      )
    }

    // return (
    //   <Card>
    //     <div className="list-body-content">
    //       <div className="top-content">
    //         <div className="row">
    //           <div className="col-md-6">
    //             <div className="name-notaris">
    //               <a href={`/notaris/1`}><h3>Zilmas</h3></a>
    //             </div>
    //           </div>
    //           <div className="col-md-6">
    //             {/* <div className="star">
    //               <h1>{star}</h1>
    //               <Rate
    //                 onChange={this.onChangeStar}
    //                 value={star}
    //                 allowHalf
    //               />
    //             </div> */}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="mid-content">
    //         <div className="address">
    //           <p>Depok, Kab Bogor, Kota Bogor</p>
    //         </div>
    //       </div>
    //       <div className="bottom-content">
    //         <div className="detail-address">
    //           <p>Jl. Matraman No. 12</p>
    //           <p>10.000000 - 20.0000000</p>
    //         </div>
    //       </div>
    //     </div>
    //   </Card>
    // )
  }

  render() {
    const { star, search, list_notaris, type, renderPage, provOptions, cityOptions, distOptions } = this.state;
    if (renderPage) {
      return (
        <PageWrapper>
          <div className="container">
            <div className="list-section">
              <div className="list-filter">
                <div className="row">
                  <div className="col-md-4">
                    <div className="search">
                      <label forHtml="search">
                        <form onSubmit={this.handleSearch}>
                          <input 
                            type="text"
                            value={search} 
                            placeholder="Cari ..."
                            onChange={this.onChange}
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
                  
                  <div className="col-md-4">
                    <div className="filter-harga">
                      <div className="wrapper-select">
                        <label>Type</label>
                        <Select
                          style={{ width: '80%' }}
                          // placeholder="smkht/apht/fidusia"
                          optionFilterProp="children"
                          onChange={this.onChangeType}
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
                          onChange={this.onChangeRange}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="0-5000000">0-5 Juta Rupiah</Option>
                          <Option value="5000000-15000000">5-15 Juta Rupiah</Option>
                          <Option value="15000000-25000000">15-25 Juta Rupiah</Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-body">
                <div className="filter-list">
                  <div className="row">
                    <div className="col-md-4">
                      <Select
                        style={{ width: '100%' }}
                        labelInValue
                        placeholder="Provinsi"
                        optionFilterProp="children"
                        onChange={this.onChangeProv}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {
                          provOptions.map(value => (
                            <Option value={value.value} key={value.value}>{value.label}</Option>
                          ))
                        }
                      </Select>
                    </div>
                    {this.state.showCity && <div className="col-md-4">
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Kota/Kabupaten"
                        optionFilterProp="children"
                        labelInValue
                        onChange={this.onChangeKota}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {
                          cityOptions.map(value => (
                            <Option value={value.value} key={value.value}>{value.label}</Option>
                          ))
                        }
                      </Select>
                    </div>}
                    {this.state.showDist && <div className="col-md-4">
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Kota/Kabupaten"
                        optionFilterProp="children"
                        labelInValue
                        onChange={this.onChangeDist}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {
                          distOptions.map(value => (
                            <Option value={value.value} key={value.value}>{value.label}</Option>
                          ))
                        }
                      </Select>
                    </div>}
                  </div>
                </div>
                
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
  listNotaris,
  areaProvince,
  areaDistrict,
  areaCity,
}: ReduxState) => ({
  listNotaris,
  areaProvince,
  areaDistrict,
  areaCity,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchListNotarisIfNeeded: (param: Object) =>
    dispatch(NotarisListAction.fetchListNotarisIfNeeded(param)),
  fetchAreaProvinceIfNeeded: (param: Object) =>
    dispatch(AreaProvinceAction.fetchAreaProvinceIfNeeded(param)),
  fetchAreaCityIfNeeded: (param: Object) =>
    dispatch(AreaCityAction.fetchAreaCityIfNeeded(param)),
  fetchAreaDistrictIfNeeded: (param: Object) =>
    dispatch(AreaDistrictAction.fetchAreaDistrictIfNeeded(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
