import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Parse from 'parse';
import createHistory from 'history/lib/createBrowserHistory';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import {reduxReactRouter, ReduxRouter} from 'redux-router';

import getRoutes from './routes';
import makeRouteHooksSafe from './helpers/makeRouteHooksSafe';
import config from './../config';

Parse.initialize(config.parse.options.app_id, config.parse.options.js_key);
const client = new ApiClient();

const dest = document.getElementById('content');
const store = createStore(reduxReactRouter, makeRouteHooksSafe(getRoutes), createHistory, client, window.__data);

const component = (
  <ReduxRouter routes={getRoutes(store)} />
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__) {
  const { DevTools } = require('./containers');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
