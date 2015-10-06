import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import { textFieldStyles } from './../../../materialStyles';
import { authActions } from './../../../../actions/auth/authActions';
import { TextFieldData } from './../../../../utils/FormFieldData';
import { RequiredStringValidator, PasswordValidator } from './../../../../utils/Validators';

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: new TextFieldData({
        validators: [ new RequiredStringValidator() ]
      }),
      password: new TextFieldData({
        validators: [ new PasswordValidator() ]
      })
    };
  }

  login() {
    const user = this.state;
    let isValid = true;
    
    let formData: any = this.state;
    
    Object.keys(formData).forEach((key) => {
      const formFieldData: IValidators = formData[key];
      if (formFieldData && formFieldData.validators && formFieldData.validators.length) {
        const validator = formFieldData.validators[0]; 
        if (!validator.isValid(formFieldData.value)) {
          formFieldData.error = validator.message;
          isValid = false;
        } else {
          formFieldData.error = '';
        }
      }
    });
    
    this.setState(formData);
    
    if (isValid) {
      authActions.login(user.username.value, user.password.value); 
    }
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
      <div>
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
          label='Login' 
          onClick={this.login.bind(this)} />
      </div>
    );
  }
}
