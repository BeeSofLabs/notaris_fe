/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { DashboardWrapper, Card, TableCom, SelectFormik } from '../../../../components/element'
import { Checkbox } from 'antd'
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


export class List extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      zilmas: ''
    }
  }

  onChange(e) {

  }

  render() {
    return (
      <DashboardWrapper>
        <div className="title-list">
          <h4>List Order</h4>
        </div>
        <div className="body-section">
          <Card>
            <div className="filter">
              <Row>
                <Col md="5">
                  <div className="filter-by filter-by-regional">
                    <span>
                      Filter By :
                    </span>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic" bsPrefix="drodpown-filter">
                        All
                        <img src={require('../../../../app/assets/img/icon-dropdown.png')} className="icon-filter" alt="icon" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <form className="filter-choose">
                          <SelectFormik
                            name="reginona"
                            label="Parent"
                            placeholder="Choose Parent"
                            // onChange={onChangeSelect}
                            options={options}
                            // value={values.parentRegional}
                            // error={errors.parentRegional && touched.parentRegional ? errors.parentRegional : null}
                          />
                          <button
                            type="submit"
                            className="button-submit-filter-choose"
                          >
                            Apply
                          </button>
                        </form>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col>
                <Col md="3" />
                <Col md="4">
                  <div className="search-input-table">
                    <form>
                      <button type="submit">
                        <img src={require('../../../../app/assets/img/search-icon.svg')} alt="search icon" />
                      </button>
                      <input
                        type="text"
                        name="search"
                        placeholder="Search Branch"
                        className="input-search"
                        onChange={this.onChange}
                        // value={form.search || ''}
                      />
                    </form>
                  </div>
                </Col>
              </Row>
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
)(List);