import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isUserLoaded, loadUserAction } from './redux/reducers/auth';
import {
    AppContainer,
    HomePage,
    LoginPage,
    DashboardPage,
    NotFoundPage
  } from './containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isUserLoaded(store.getState())) {
      store.dispatch(loadUserAction()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomePage} />

      <Route path="/auth/login" component={LoginPage} />

      <Route onEnter={requireLogin}>
        <Route path="/app" component={DashboardPage} />
      </Route>

      <Route path="*" component={NotFoundPage} status={404} />
    </Route>
  );
};
