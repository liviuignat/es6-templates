import * as React from 'react';
import ComponentBase from './../../../ComponentBase';
import { RaisedButton, TextField, AppTextField, Card } from './../../../common/index';
import { Link } from 'react-router';
import { TextFieldData } from './../../../../utils/FormFieldData';
import { RequiredStringValidator, formValidator } from './../../../../utils/Validators';

import { loginAction } from './../../../../actions/index';

class LoginPage extends ComponentBase<any, any> {

  static contextTypes: React.ValidationMap<any> = {
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

  onFormSubmit(event: any) {
    const user = this.state;
    const validatorResponse = formValidator.validate(user);
    const formData = validatorResponse.formData;
    const isValid = validatorResponse.isValid;

    this.setState(formData);

    if (isValid) {
      loginAction
        .execute(user.username.value, user.password.value)
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

  handleUsernameChange(event: any) {
    const value = event.target.value;
    this.setState({
      username: this.state.username.setValue(value)
    });
  }

  handlePasswordChange(event: any) {
    const value = event.target.value;
    this.setState({
      password: this.state.password.setValue(value)
    });
  }

  render() {
    return (
      <div className='LoginPage'>
        <div>
          <Card>
            <form className='LoginPage-content' onSubmit={this.onFormSubmit.bind(this)}>
              <span className='LoginPage-title'>Login</span>

              <div>
                <AppTextField
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
                  onChange={this.handlePasswordChange.bind(this)}
                  type='password'
                  hintText='Your password'
                  floatingLabelText='Your password' />
              </div>

              <div className='LoginPage-loginButtonContainer'>
                <RaisedButton
                  primary={true}
                  type='submit'
                  label='Login' />
              </div>

              <div>
                <Link className='LoginPage-signUpLink' to={`/auth/signup`}>Create a new account</Link>
                <Link className='LoginPage-resetPasswordLink' to={`/auth/resetpassword`}>I forgot my password</Link>
                <div className='clearfix'/>
              </div>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}

export default LoginPage;
