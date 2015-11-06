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
        <div className="">
          <input {...this.props} className="form-control" {...field} />
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
        </div>
      </div>
    );
  }
}

// import React, { Component, PropTypes } from 'react';
// import ReactDOM from 'react-dom';

// export default class FormTextField extends Component {
//   static propTypes = {
//     labelText: PropTypes.string.isRequired,
//     field: PropTypes.object.isRequired
//   };

//   componentDidMount() {
//     const domNode = ReactDOM.findDOMNode(this);
//     window.componentHandler.upgradeElement(domNode);
//   }

//   getLabelClassName() {
//     let css = 'mdl-textfield__label';
//     if (this.props.field.error) {
//       css += ' is-invalid';
//     }
//     return css;
//   }

//   getContainerClassName(styles) {
//     const css = styles.TextField + ' mdl-textfield mdl-js-textfield mdl-textfield--floating-label';
//     return css;
//   }

//   componentDidReceiveProps() {
//     const domNode = ReactDOM.findDOMNode(this);
//     window.componentHandler.upgradeElement(domNode);
//   }

//   render() {
//     const styles = require('./FormTextField.scss');

//     const {
//       labelText,
//       field
//     } = this.props;

//     return (
//       <div className={::this.getContainerClassName(styles)}>
//         <input {...this.props} {...field} className={'mdl-textfield__input'} />
//         <label className={::this.getLabelClassName()}>{labelText}</label>
//         {field.error && <span className="mdl-textfield__error">{field.error}</span>}
//       </div>
//     );
//   }
// }

