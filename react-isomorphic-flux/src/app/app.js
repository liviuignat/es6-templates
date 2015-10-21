import * as React from 'react';
import * as Parse from 'parse';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { routes } from './components/routes';
import { currentUserStore } from './stores/index';
import { cookieService } from './services';

import client from 'react-engine/lib/client';

injectTapEventPlugin();
Parse.initialize('ivU6GsPnN0aXfBPsfmEpAkl3P1Lh57XufS3rWBnt', 'vSLeA3vsKyflN8OytBOPjExzwL45wAeC1gn7MXdT');

const render = (user) => {
  currentUserStore.initializeClient(user);

  const options = {
    routes
  };

  client.boot(options, () => {
  });
};

const initialize = () => {
  const cookieName = 'auth_token';
  const authToken = cookieService.getCookie(cookieName);

  if (authToken) {
    Parse.User.become(authToken).then((user) => {
      render(user);
    }, () => {
      cookieService.deleteCookie(cookieName);
      render();
    });
  } else {
    render();
  }
};

window.document.addEventListener('DOMContentLoaded', () => {
  initialize();
});
