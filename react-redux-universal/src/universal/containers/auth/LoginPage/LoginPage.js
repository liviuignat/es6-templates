import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import { pushState } from 'redux-router';
import LoginForm from './LoginForm';
import { loginAction } from './../../../redux/reducers/auth';

@connect(
  state => ({user: state.auth.user}), {
    initialize,
    loginAction,
    pushState
  })
export default class LoginPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    initialize: PropTypes.func.isRequired,
    loginAction: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.initialize('login', {
      email: 'liviu@ignat.email'
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.pushState(null, '/app');
    }
  }

  handleSubmit(data) {
    this.props.loginAction(data.email, data.password);
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
