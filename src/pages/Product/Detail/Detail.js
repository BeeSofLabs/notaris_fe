/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Dispatch, ReduxState } from 'types';

type Props = {};

export class Detail extends PureComponent<Props> {
  render() {
    return <div>asd</div>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
