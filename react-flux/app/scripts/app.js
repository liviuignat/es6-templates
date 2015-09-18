import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import HomePage from './components/home/HomePage';
import EmailsPage from './components/emails/EmailsPage';

window.React = React;
const mountNode = window.document.getElementById('app');

React.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={HomePage}></Route>
    <Route path="/emails" component={EmailsPage}></Route>
    <Route path="*" component={HomePage}/>
  </Router>
), mountNode);
