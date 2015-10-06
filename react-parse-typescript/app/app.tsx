import React from 'react';
import HomePage from './components/HomePage';

window.React = React;
const mountNode = window.document.getElementById('app');

React.render(<HomePage />, mountNode);