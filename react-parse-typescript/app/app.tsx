import React from 'react';
import Parse from 'parse';
import AppRouter from './components/AppRouter';

window.React = React;

Parse.initialize('HrMPFQFNyOPjq8cR9i67xSyAzAggfJYwTetpDUwB', 'Pm8doOztn0N8iXfNzisX5RrV4r2y1wbbTKHxRoUr');

const appNode = window.document.getElementById('app');
React.render(<AppRouter />, appNode);