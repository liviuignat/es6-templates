import React from 'react';
import Parse from 'parse';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRouter from './components/AppRouter';
import AppHeader from './components/common/app-header/AppHeader';

window.React = React;
injectTapEventPlugin();
Parse.initialize('HrMPFQFNyOPjq8cR9i67xSyAzAggfJYwTetpDUwB', 'Pm8doOztn0N8iXfNzisX5RrV4r2y1wbbTKHxRoUr');

const appHeader = window.document.getElementById('app_header');
const appNode = window.document.getElementById('app');

React.render(<AppHeader />, appHeader);
React.render(<AppRouter />, appNode);