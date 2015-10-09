import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Card from 'material-ui/lib/card/card';

import { Link } from 'react-router';
import { textFieldStyles } from './../../../materialStyles';
import { TextFieldData } from './../../../../utils/FormFieldData';
import { RequiredStringValidator, formValidator } from './../../../../utils/Validators';

import { currentUserActions } from './../../../../actions';

class LoginPage extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  };

  constructor(props: any, context: any) {
    super(props, context);

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
      currentUserActions
        .login(user.username.value, user.password.value)
        .then(() => {
          this.setState({
            password: this.state.password.reset(),
            username: this.state.username.reset()
          });

          this.props.history.pushState(null, '/app');
        })
        .catch((error) => {
          this.setState({
            password: this.state.password.setError(error.message)
          });
        });
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
      <div>
        <Card>
          <form onSubmit={this.onFormSubmit.bind(this)}>
            <h2>Login </h2>
            
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
    
            <div>
              <RaisedButton
                type='submit'
                label='Login' />
            </div>
              
            <div>
              <Link className='LoginPage-signUpLink' to={`/auth/signup`}>Don't have an account yet? Sign Up!</Link>
            </div>
            
            <div>
              <Link className='LoginPage-resetPasswordLink' to={`/auth/resetpassword`}>Forgot your password?</Link>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
