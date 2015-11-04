import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import LoginForm from './LoginForm';

@connect(() => ({}), {
  initialize
})
export default class LoginPage extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.props.initialize('login', {
      email: 'liviu@ignat.email'
    });
  }

  handleSubmit(data) {
    console.log(data);
    this.props.initialize('login', {});
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={::this.handleSubmit} />
      </div>
    );
  }
}
