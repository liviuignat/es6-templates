import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({user: state.auth.user}), {}
  )
export default class DashboardPage extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h2> Hi {user.firstName } </h2>
      </div>
    );
  }
}
