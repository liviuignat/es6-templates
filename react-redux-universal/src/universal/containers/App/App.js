import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { pushState } from 'redux-router';
import config from './../../../config';

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
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
