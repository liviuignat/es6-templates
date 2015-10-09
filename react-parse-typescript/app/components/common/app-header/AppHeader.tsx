import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FontIcon from 'material-ui/lib/font-icon';
import { Colors } from 'material-ui/lib/styles';
import IconButton from 'material-ui/lib/icon-button';

import history from './../../../history';
import { logoutAction } from './../../../actions';
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
    logoutAction.execute()
      .then(() => {
        history.replaceState(null, '/');
      });
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
      return (
        <div>
          <IconButton tooltip='logout' onClick={this.logout.bind(this)}>
            <FontIcon className='material-icons' color={Colors.purple500}>power_settings_new</FontIcon>
          </IconButton>
        </div>
      );
    } else {
      return <a className='AppHeader-navigationLink' href='/auth/login'>Login</a>;
    }
  }
}
