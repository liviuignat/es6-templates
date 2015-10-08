import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import { currentUserActions } from './../../../actions';
import { currentUserStore } from './../../../stores';

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoggedIn: currentUserStore.getIsLoggedIn()
    };

    currentUserStore.addLoginListener(() => {
      this.setState({
        isLoggedIn: currentUserStore.getIsLoggedIn()
      });
    });

    currentUserStore.addLogoutListener(() => {
      this.setState({
        isLoggedIn: currentUserStore.getIsLoggedIn()
      });
    });
  }

  logout() {
    currentUserActions.logout();
  }

  render() {
    return (
      <header>
        <AppBar
          title={<a className='AppHeader-homeLink' href='/'>MATERIAL MAILS</a>}
          showMenuIconButton={false}
          iconElementRight={this.renderButtonsRight()}
          />
      </header>
    );
  }

  renderButtonsRight() {
    if (this.state.isLoggedIn) {
      return <span className='AppHeader-navigationLink' onClick={this.logout.bind(this)}>Logout</span>;
    } else {
      return <a className='AppHeader-navigationLink' href='/auth/login'>Login</a>;
    }
  }
}
