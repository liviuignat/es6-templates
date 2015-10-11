import React from 'react';
import { RaisedButton, TextField, Card } from './../../../common';
import { Link } from 'react-router';
import { TextFieldData } from './../../../../utils/FormFieldData';
import { RequiredStringValidator, formValidator} from './../../../../utils/Validators';

import { resetPasswordAction } from './../../../../actions';

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      showInfoMessage: false,
      email: new TextFieldData({
        validators: [ new RequiredStringValidator() ]
      })
    };
  }
  
  onFormSubmit(event) {
    event.preventDefault();
    
    const validatorResponse = formValidator.validate(this.state);
    this.setState(validatorResponse.formData);
    
    if (validatorResponse.isValid) {
      resetPasswordAction
        .execute(this.state.email.value)
        .then(() => {
          this.setState({
            showInfoMessage: true,
            email: this.state.email.reset()
          });
        })
        .catch((error) => {
          this.setState({
            email: this.state.email.setError(error.message)
          });
        });
    }
  }
  
  onEmailChange(event) {
    this.setState({
      showInfoMessage: false,
      email: this.state.email.setValue(event.target.value)
    });
  }
  
  render() {
    return (
      <div className='PasswordResetPage'>
        <div>
          <Card>
            <form className='PasswordReset-content' onSubmit={this.onFormSubmit.bind(this)}>
              <span className='PasswordReset-title'>Forgot your password?</span>
              
               <div>
                <TextField
                  onChange={this.onEmailChange.bind(this)}
                  value={this.state.email.value}
                  errorText={this.state.email.error}
                  type='email'
                  hintText='Your email'
                  floatingLabelText='Your email' />
               </div>
                  
               <div className='PasswordReset-buttonContainer'>
                <RaisedButton
                  primary={true}
                  type='submit'
                  label='Request Reset' />
                  
                  <span className='PasswordReset-infoMessage'>{ this.state.showInfoMessage ? `We have sent you an email with password reset instructions.` : `` }</span>
               </div>     
               
               <div>
                  <Link className='PasswordReset-loginLink' to={`/auth/login`}>Already have an account? Login</Link>
                  <div className='clearfix'/>
               </div>
            </form>
          </Card>  
      </div>
    </div>
    );
  }
}
