import React from 'react';
import Parse from 'parse';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRouter from './components/AppRouter';
import { currentUserStore } from './stores';

window.React = React;
injectTapEventPlugin();
Parse.initialize('HrMPFQFNyOPjq8cR9i67xSyAzAggfJYwTetpDUwB', 'Pm8doOztn0N8iXfNzisX5RrV4r2y1wbbTKHxRoUr');
currentUserStore.init();

const appNode = window.document.getElementById('app');

React.render(<AppRouter />, appNode);