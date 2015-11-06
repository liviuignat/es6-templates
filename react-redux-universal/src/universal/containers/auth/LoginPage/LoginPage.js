import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import { pushState } from 'redux-router';
import LoginForm from './LoginForm';
import { loginAction } from './../../../redux/reducers/auth';

@connect(
  state => ({
    user: state.auth.user,
    loggingIn: state.auth.loggingIn
  }), {
    initialize,
    loginAction,
    pushState
  })
export default class LoginPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    loggingIn: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    loginAction: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.initialize('login', {
      email: 'liviu@ignat.email',
      password: 'test123'
    });
  }

  handleSubmit(data) {
    this.props.loginAction(data.email, data.password);
    this.props.initialize('login', {});
  }

  render() {
    const {loggingIn} = this.props;

    return (
      <div>
        <LoginForm onSubmit={::this.handleSubmit} isLoggingIn={loggingIn || false} />
      </div>
    );
  }
}
