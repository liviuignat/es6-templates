import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  login() {
    const user = this.state;
    console.log(user);
  }

  handleUsernameChange(event) {
    const value = event.target.value;
    this.setState({ username: value });
  }

  handlePasswordChange(event) {
    const value = event.target.value;
    this.setState({ password: value });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>

        <div>
          <TextField
            value={this.state.username}
            onChange={this.handleUsernameChange.bind(this)}
            type='email'
            hintText='Your email'
            floatingLabelText='Your email' />
        </div>

        <div>
          <TextField
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
            type='password'
            hintText='Your password'
            floatingLabelText='Your password' />
        </div>

        <RaisedButton label='Login' onClick={this.login.bind(this)} />
      </div>
    );
  }
}
