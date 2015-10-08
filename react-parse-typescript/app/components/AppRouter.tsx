import React from 'react';
import { Router, Route } from 'react-router';
import history from './../history';

import { currentUserStore } from './../stores';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/LoginPage';
import ResetPasswordPage from './pages/auth/reset-password/ResetPasswordPage';
import CreateUserPage from './pages/auth/create-user/CreateUserPage';

import AppHomePage from './pages/app/home/AppHomePage';

export default class extends React.Component<any, any> {
  requirePublic(nextState, replaceState) {
    if (currentUserStore.getIsLoggedIn()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/app');
    }
  };

  requireAuth(nextState, replaceState) {
    if (!currentUserStore.getIsLoggedIn()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/auth/login');
    }
  };

  render() {
    return (
      <Router history={history}>
        <Route path='/' component={HomePage} onEnter={this.requirePublic.bind(this)} />
        <Route path='/auth/login' component={LoginPage} onEnter={this.requirePublic.bind(this)} />
        <Route path='/auth/signup' component={CreateUserPage} onEnter={this.requirePublic.bind(this)} />
        <Route path='/auth/resetpassword' component={ResetPasswordPage} onEnter={this.requirePublic.bind(this)} />

        <Route path='/app' component={AppHomePage} onEnter={this.requireAuth.bind(this)} />

        <Route path='*' component={HomePage} />
      </Router>
    );
  }
}
