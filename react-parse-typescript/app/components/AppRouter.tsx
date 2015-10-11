import React from 'react';
import { Router, Route } from 'react-router';
import history from './../history';

import { currentUserStore } from './../stores';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/LoginPage';
import ResetPasswordPage from './pages/auth/reset-password/ResetPasswordPage';
import CreateUserPage from './pages/auth/create-user/CreateUserPage';

import AppHomePage from './pages/app/home/AppHomePage';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import AppTheme from './theme';

class AppRouter extends React.Component<any, any> {
  
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };
  
  constructor(props, context) {
    super(props, context);
  }
  
  getChildContext() {
    const muiTheme = ThemeManager.getMuiTheme(AppTheme);
     
    return {
      muiTheme: muiTheme
    };
  }
  
  requirePublic(nextState, replaceState) {
    if (currentUserStore.getIsLoggedIn()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/app');
    }
  }

  requireAuth(nextState, replaceState) {
    if (!currentUserStore.getIsLoggedIn()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/auth/login');
    }
  }

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

export default AppRouter;
