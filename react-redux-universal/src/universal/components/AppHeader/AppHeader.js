import React, { Component } from 'react';
import config from './../../../config';
import { Link } from 'react-router';

class AppHeader extends Component {
  static propTypes = {
    isLoggedIn: React.PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
  }

  getHomeLink() {
    return this.props.isLoggedIn ? '/app' : '/';
  }

  getNav() {
    const styles = require('./AppHeader.scss');

    return (
      <nav className="mdl-navigation">
        <Link className={styles['AppHeader-navigationLink'] + ' mdl-navigation__link'}
          to="/auth/login">Login</Link>
      </nav>
    );
  }

  render() {
    const { isLoggedIn } = this.props;
    const styles = require('./AppHeader.scss');

    return (
      <header className={ styles.AppHeader + ' mdl-layout__header' }>
        <div className="mdl-layout__header-row">
          <Link className={ styles['AppHeader-homeLink'] + ' mdl-layout-title' } to={ this.getHomeLink.call(this) }>{ config.app.title }</Link>
          <div className={ styles['AppHeader-navigationContainer'] }>
            { isLoggedIn ? <span /> : this.getNav() }
          </div>
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    );
  }
}

export default AppHeader;
