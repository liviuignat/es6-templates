import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import { appDispatcher } from './../../../appDispatcher';
import { authActions } from './../../../actions/auth/authActions';
import {AUTH_ACTION_TYPES} from './../../../actions/actionTypes';

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoggedIn: true
    };

    appDispatcher.register(this.onAppDispatch.bind(this));
  }

  onAppDispatch(data: IDispatcherPayload) {
    console.log(data);
    switch (data.type) {
      case AUTH_ACTION_TYPES.LOG_IN_SUCCESS:
        this.setState({
          isLoggedIn: true
        });
        break;

      case AUTH_ACTION_TYPES.LOG_OUT_SUCCESS:
        this.setState({
          isLoggedIn: false
        });
        break;

      default:
        break;
    }
  }

  logout() {
    authActions.logout();
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
