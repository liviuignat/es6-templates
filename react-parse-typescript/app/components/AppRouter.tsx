import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import CreateUserPage from './pages/auth/CreateUserPage';

export default class extends React.Component<any, any> {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Route path='/' component={HomePage} />
        <Route path='/auth/login' component={LoginPage} />
        <Route path='/auth/signup' component={CreateUserPage} />
        <Route path='/auth/resetpassword' component={ResetPasswordPage} />
        <Route path='*' component={HomePage} />
      </Router>
    );
  }
}
