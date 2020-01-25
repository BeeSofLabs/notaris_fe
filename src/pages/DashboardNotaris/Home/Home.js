/* @flow */

import React, { PureComponent } from   'react';
import { connect } from 'react-redux';
import { DashboardWrapper, Card } from '../../../components/element';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Januari', skmht: 4000, apht: 2400,
  },
  {
    name: 'Febuari', skmht: 3000, apht: 1398,
  },
  {
    name: 'Maret', skmht: 2000, apht: 9800,
  },
  {
    name: 'April', skmht: 2780, apht: 3908,
  },
  {
    name: 'Mei', skmht: 1890, apht: 4800,
  },
  {
    name: 'Juni', skmht: 2390, apht: 3800,
  },
];
class DashboardHome extends PureComponent<Props> {
  constructor(props) {
    super(props);

  }

  renderChart() {
    return (
      <Card>
        <div className="dashboard-chart">
          <div className="title-dashboard-chart">
            <h3>Performance</h3>
          </div>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="skmht" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="apht" stroke="#82ca9d" />
          </LineChart>
        </div>
      </Card>
    )
  }

  render() {
    return (
      <DashboardWrapper page={["1"]}>
        <div className="title-dashboard">
          <h4>Dashboard</h4>
        </div>
        <div className="body-dashboard">
          <div className="row">
            <div className="col-md-8">
              {this.renderChart()}
            </div>
          </div>
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
)(DashboardHome);
