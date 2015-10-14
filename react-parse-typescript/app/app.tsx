import * as React from 'react';
import * as Parse from 'parse';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRouter from './components/AppRouter';
import { currentUserStore } from './stores/index';
import { getCurrentUserAction } from './actions/index';

const appNode = window.document.getElementById('app');
const render = () => {
  React.render(<AppRouter />, appNode);
};

injectTapEventPlugin();
Parse.initialize('ivU6GsPnN0aXfBPsfmEpAkl3P1Lh57XufS3rWBnt', 'vSLeA3vsKyflN8OytBOPjExzwL45wAeC1gn7MXdT');

currentUserStore.initialize();
if (currentUserStore.getIsLoggedIn()) {
  getCurrentUserAction.execute().then(() => {
    render();
  });
} else {
  render();
}