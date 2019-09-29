/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Dispatch, ReduxState } from 'types';
import { Select, Rate } from 'antd';
import Helmet from 'react-helmet';

import { PageWrapper, Card } from 'components/element';

const { Option } = Select;

type Props = {};

export class List extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      star: 2
    };

    this.onChangeStar = this.onChangeStar.bind(this);
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

  render() {
    const { star } = this.state;
    console.log('sd', star);
    return (
      <PageWrapper>
        <div className="container">
          <div className="list-section">
            <div className="list-filter">
              <div className="row">
                <div className="col-md-4">
                  <div className="search">
                    <label forHtml="search">
                      <input type="text" />
                      <img
                        src={require('app/assets/img/search.svg')}
                        alt="search"
                        className="icon-search"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <Select
                    style={{ width: '70%' }}
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
              <Card>
                <div className="list-body-content">
                  <div className="top-content">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="name-notaris">
                          <h3>Angelica Surjodiningrat</h3>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="star">
                          <h1>{star}</h1>
                          <Rate
                            onChange={this.onChangeStar}
                            value={star}
                            allowHalf
                          />
                        </div>
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
                <div className="list-body-content">
                  <div className="top-content">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="name-notaris">
                          <h3>Angelica Surjodiningrat</h3>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="star">
                          <h1>{star}</h1>
                          <Rate
                            onChange={this.onChangeStar}
                            value={star}
                            allowHalf
                          />
                        </div>
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
                <div className="list-body-content">
                  <div className="top-content">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="name-notaris">
                          <h3>Angelica Surjodiningrat</h3>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="star">
                          <h1>{star}</h1>
                          <Rate
                            onChange={this.onChangeStar}
                            value={star}
                            allowHalf
                          />
                        </div>
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
                <div className="list-body-content">
                  <div className="top-content">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="name-notaris">
                          <h3>Angelica Surjodiningrat</h3>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="star">
                          <h1>{star}</h1>
                          <Rate
                            onChange={this.onChangeStar}
                            value={star}
                            allowHalf
                          />
                        </div>
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
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
