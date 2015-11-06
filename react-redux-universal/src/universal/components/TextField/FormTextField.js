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

    return (
      <TextField
        hintText={labelText}
        floatingLabelText={labelText}
        errorText={field.error}
        {...field}
        {...this.props} />
    );
  }
}
