import React, { PureComponent } from 'react'
import axios from 'axios'
import { Spin, Modal } from 'antd'
import Constants from '../../helpers/constants';


class LoadingAssign extends PureComponent<> {
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

    const param = {
      order_id: this.props.match.params.id,
      approve: true
    }

    axios.post(`${Constants.API}//api/v1/document/approval`, param).then(res => {
      this.props.history.push(`/assign/${this.props.match.params.id}`)
    }).catch(() => {
      Modal.error({
        title: 'Error',
        content: 'Ada masalah dengan server.',
        cancelText: null,
        onOk: () => this.props.history.push(`/assign/${this.props.match.params.id}`)
      });
    })
  }

  render(){
    return (
      <div style={{ textAlign: 'center', marginTop: '200px'}}>
        <Spin tip="Loading..." size="large" />
      </div>
    )
  }
}

export default LoadingAssign