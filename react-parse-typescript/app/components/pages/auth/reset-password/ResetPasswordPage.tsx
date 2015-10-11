import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import Colors from 'material-ui/lib/styles/colors';
import { textFieldStyles } from './../../../materialStyles';
import TextField from 'material-ui/lib/text-field';

import { Link } from 'react-router';
import { TextFieldData } from './../../../../utils/FormFieldData';
import { RequiredStringValidator, formValidator} from './../../../../utils/Validators';


export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      email: new TextFieldData({
        validators: [ new RequiredStringValidator() ]
      })
    };
  }
  
  onFormSubmit(event) {
    const validatorResponse = formValidator.validate(this.state);
    this.setState(validatorResponse.formData);
    
    event.preventDefault();
  }
  
  onEmailChange(event) {
    this.setState({
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
                  style={textFieldStyles}
                  errorText={this.state.email.error}
                  type='email'
                  hintText='Your email (your@email.com)'
                  floatingLabelText='Your email' />
               </div>
                  
               <div className='PasswordReset-buttonContainer'>
                 <RaisedButton
                  primary={true}
                  backgroundColor={Colors.green500}
                  style={{
                    width: '100%'
                  }}
                  type='submit'
                  label='Request Reset' />
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
