import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

@reduxForm({
  form: 'login',
  fields: ['email', 'password']
})
export default class LoginForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    dirty: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {email, password},
      handleSubmit
    } = this.props;

    const renderInput = (field) =>
      <div className="form-group">
        <input type="text" className="form-control" id={field.name} {...field}/>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(email, 'Email')}
          {renderInput(password, 'Password', true)}

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
