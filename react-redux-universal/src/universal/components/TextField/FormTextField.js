import React, { Component, PropTypes } from 'react';

export default class FormTextField extends Component {
  static propTypes = {
    type: PropTypes.string,
    field: PropTypes.object.isRequired
  };

  render() {
    const {
      field
    } = this.props;

    return (
      <div className="form-group">
        <div className="col-sm-8">
          <input {...this.props}
                 className="form-control" {...field} />
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
          <div>
            {field.dirty && <span title="Dirty">D</span>}
            {field.active && <span title="Active">A</span>}
            {field.visited && <span title="Visited">V</span>}
            {field.touched && <span title="Touched">T</span>}
          </div>
        </div>
      </div>
    );
  }
}
