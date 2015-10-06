import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import HomePage from './pages/home/HomePage';

export default class extends React.Component<any, any> {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Route path='/' component={HomePage}></Route>
        <Route path='*' component={HomePage} />
      </Router>
    );
  }
}
