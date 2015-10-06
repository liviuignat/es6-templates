import React from 'react';
import { Router, Route } from 'react-router';
import history from './../history';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/LoginPage';
import ResetPasswordPage from './pages/auth/reset-password/ResetPasswordPage';
import CreateUserPage from './pages/auth/create-user/CreateUserPage';

export default class extends React.Component<any, any> {
  render() {
    return (
      <Router history={history}>
        <Route path='/' component={HomePage} />
        <Route path='/auth/login' component={LoginPage} />
        <Route path='/auth/signup' component={CreateUserPage} />
        <Route path='/auth/resetpassword' component={ResetPasswordPage} />
        <Route path='*' component={HomePage} />
      </Router>
    );
  }
}
