import React, { Component } from 'react';
import config from './../../../config';
import { Link } from 'react-router';
import LogoutButton from './../LogoutButton/LogoutButton';

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

  render() {
    const { isLoggedIn } = this.props;
    const styles = require('./AppHeader.scss');

    return (
      <header className={ styles.AppHeader + ' mdl-layout__header' }>
        <div className="mdl-layout__header-row">
          <Link className={ styles['AppHeader-homeLink'] + ' mdl-layout-title' } to={ this.getHomeLink.call(this) }>{ config.app.title }</Link>
          <div className={ styles['AppHeader-navigationContainer'] }>
          <nav className="mdl-navigation">
            {
              !isLoggedIn && <Link className={styles['AppHeader-navigationLink'] + ' mdl-navigation__link'} to="/auth/login">Login</Link>
            }
            {
              isLoggedIn && <LogoutButton />
            }
           </nav>
          </div>
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    );
  }
}

export default AppHeader;
