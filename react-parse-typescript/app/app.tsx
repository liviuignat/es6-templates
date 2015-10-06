import React from 'react';
import parseConfig from './config/parse.config';
import AppRouter from './components/AppRouter';

window.React = React;
parseConfig.init();

const appNode = window.document.getElementById('app');
React.render(<AppRouter />, appNode);