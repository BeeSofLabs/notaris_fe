/* @flow */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { PageWrapper, Card, Button, DashboardWrapper } from '../../components/element'
import { Checkbox } from 'antd'
import ListTables from './ListTables'
import SimpleTabs from './SimpleTabs'


export class Dashboard extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      zilmas: ''
    }
  }

  render() {
    return (
      <DashboardWrapper>
        <div className="title-section">
          <SimpleTabs />
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