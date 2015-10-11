import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import Colors from 'material-ui/lib/styles/colors';

import { Link } from 'react-router';
import { textFieldStyles } from './../../../materialStyles';
import { TextFieldData } from './../../../../utils/FormFieldData';
import { 
  RequiredStringValidator, 
  PasswordValidator, 
  formValidator 
} from './../../../../utils/Validators';

import { createUserAction } from './../../../../actions';


export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      email: new TextFieldData({
        validators: [ new RequiredStringValidator() ]
      }),
      password: new TextFieldData({
        validators: [ new PasswordValidator() ]
      })
    };
  }
  
  handleEmailChange(event) {
    const value = event.target.value;
    this.setState({
      email: this.state.email.setValue(value)
    });
  }
  
  handlePasswordChange(event) {
    const value = event.target.value;
    this.setState({
      password: this.state.password.setValue(value)
    });
  }
  
  onFormSubmit(event) {
    event.preventDefault();
    
    const validatorResponse = formValidator.validate(this.state);
    this.setState(validatorResponse.formData);
    
    if (validatorResponse.isValid) {
      const email = this.state.email.value;
      const password = this.state.password.value;
       
      createUserAction
        .execute(email, password)
        .then((a, b, c) => {
          console.log('success', a, b, c);
        })
        .catch((a, b, c) => {
          console.log('error', a, b, c);
        }); 
    }
  }

  render() {
    return (
      <div className='CreateUserPage'>
        <div>
          <Card>
            <form className='CreateUserPage-content' onSubmit={this.onFormSubmit.bind(this)}>
              <span className='CreateUserPage-title'>Sign up</span>
              
              <div>
                <TextField 
                  style={textFieldStyles}
                  value={this.state.email.value}
                  errorText={this.state.email.error}
                  onChange={this.handleEmailChange.bind(this)}
                  type='email'
                  hintText='Your email'
                  floatingLabelText='Your email'
                />       
              </div>
              
              <div>
                <TextField
                  style={textFieldStyles}
                  value={this.state.password.value}
                  errorText={this.state.password.error}
                  onChange={this.handlePasswordChange.bind(this)}
                  type='password'
                  hintText='Your new password'
                  floatingLabelText='Your new password'
                />
              </div>
              
              <div className='CreateUserPage-buttonContainer'>
                <RaisedButton
                  primary={true}
                  backgroundColor={Colors.green500}
                  style={{
                    width: '100%'
                  }}
                  type='submit'
                  label='Create new account' />
              </div>
              
              <div>
                  <Link className='CreateUserPage-loginLink' to={`/auth/login`}>Already have an account? Login</Link>
                  <Link className='CreateUserPage-resetPasswordLink' to={`/auth/resetpassword`}>I forgot my password</Link>
                  <div className='clearfix'/>
              </div>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}
