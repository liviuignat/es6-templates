import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { pushState } from 'redux-router';
import config from './../../../config';

import { AppHeader } from './../../components';

@connect(
  state => ({user: state.auth.user}),
  { pushState }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const {user} = this.props;
    const isLoggedIn = !!user;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <DocumentMeta {...config.app} />

        <AppHeader isLoggedIn={isLoggedIn} />

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
