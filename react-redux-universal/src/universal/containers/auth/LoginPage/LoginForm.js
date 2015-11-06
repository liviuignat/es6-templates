import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { loginFormValidator } from './loginFormValidator';
import { FormTextField } from './../../../components';

@reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: loginFormValidator,
})
export default class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isLoggingIn: PropTypes.bool
  }

  render() {
    const {
      fields: {email, password},
      isLoggingIn,
      handleSubmit
    } = this.props;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <FormTextField field={email} type="email"/>
          <FormTextField field={password} type="password"/>

          <button disabled={isLoggingIn} onClick={handleSubmit}>Login</button>
        </form>
      </div>
    );
  }
}
