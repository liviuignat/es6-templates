import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import { textFieldStyles } from './../../../materialStyles';
import { authActions } from './../../../../actions/auth/authActions';
import { TextFieldData } from './../../../../utils/FormFieldData';
import { RequiredStringValidator, formValidator } from './../../../../utils/Validators';

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: new TextFieldData({
        validators: [ new RequiredStringValidator() ]
      }),
      password: new TextFieldData({
        validators: [ new RequiredStringValidator() ]
      })
    };
  }

  onFormSubmit(event) {
    const user = this.state;
    let validatorResponse = formValidator.validate(user);
    const formData = validatorResponse.formData;
    const isValid = validatorResponse.isValid;

    this.setState(formData);

    if (isValid) {
      authActions.login(user.username.value, user.password.value);
    }

    event.preventDefault();
  }

  handleUsernameChange(event) {
    const value = event.target.value;
    this.setState({
      username: this.state.username.setValue(value)
    });
  }

  handlePasswordChange(event) {
    const value = event.target.value;
    this.setState({
      password: this.state.password.setValue(value)
    });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit.bind(this)}>
        <h1>Login</h1>
        <div>
          <TextField
            style={textFieldStyles}
            value={this.state.username.value}
            errorText={this.state.username.error}
            onChange={this.handleUsernameChange.bind(this)}
            type='email'
            hintText='Your email'
            floatingLabelText='Your email' />
        </div>

        <div>
          <TextField
            value={this.state.password.value}
            errorText={this.state.password.error}
            style={textFieldStyles}
            onChange={this.handlePasswordChange.bind(this)}
            type='password'
            hintText='Your password'
            floatingLabelText='Your password' />
        </div>

        <RaisedButton
          type='submit'
          label='Login' />
      </form>
    );
  }
}
