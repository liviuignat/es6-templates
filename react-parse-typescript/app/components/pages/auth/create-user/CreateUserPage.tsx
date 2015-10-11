import React from 'react';
import { RaisedButton, TextField, Card, Colors } from './../../../common';
import { Link } from 'react-router';
import { TextFieldData } from './../../../../utils/FormFieldData';
import { 
  RequiredStringValidator, 
  PasswordValidator, 
  formValidator 
} from './../../../../utils/Validators';

import { createUserAction } from './../../../../actions';

class CreateUserPage extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  };
  
  constructor(props: any, context: any) {
    super(props, context);
    
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
        .then(() => {
          this.setState({
            email: this.state.email.reset(),
            password: this.state.password.reset()
          });

          this.props.history.pushState(null, '/app');
        })
        .catch((error) => {
          this.setState({
            password: this.state.password.setError(error.message)
          });
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

export default CreateUserPage;