import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

@reduxForm({
  form: 'login',
  fields: ['email', 'password']
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

    const renderInput = (field) => {
      return (
        <div className="form-group">
          <input type="text" className="form-control" {...field}/>
        </div>
      );
    };

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(email)}
          {renderInput(password)}

          <button type="submit" disabled={isLoggingIn}>Login</button>
        </form>
      </div>
    );
  }
}
