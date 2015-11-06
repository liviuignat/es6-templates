import React, { Component, PropTypes } from 'react';
import {TextField} from 'material-ui';

export default class FormTextField extends Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired
  };

  render() {
    const {
      labelText,
      field
    } = this.props;

    const errorMessage =
      field.error && field.touched ? field.error : '';

    return (
      <TextField
        hintText={labelText}
        floatingLabelText={labelText}
        errorText={errorMessage}
        {...field}
        {...this.props} />
    );
  }
}
