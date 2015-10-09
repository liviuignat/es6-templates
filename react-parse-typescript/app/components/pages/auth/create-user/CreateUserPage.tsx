import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import { TextFieldData } from './../../../../utils/FormFieldData';
import { RequiredStringValidator, formValidator } from './../../../../utils/Validators';

export default class extends React.Component<any, any> {
  standardActions = [
    { text: 'Cancel' },
    { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
  ];

  constructor(props: any) {
    super(props);
    
    this.state = {
      email: new TextFieldData({
        validators: [ new RequiredStringValidator() ]
      }),
      password: ''
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
      password: value
    });
  }
  
  createNewAccount() {
    const validatorResponse = formValidator.validate(this.state);
    console.log(validatorResponse);
    this.setState(validatorResponse.formData);
  }

  render() {
    return (
      <div>
        <h1>Create a new account</h1>
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
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
            type='password'
            hintText='Your new password'
            floatingLabelText='Your new password'
          />
        </div>
        
        <RaisedButton
          type='submit'
          label='Create new account'
          onClick={this.createNewAccount.bind(this)}/>
      </div>
    );
  }
}
