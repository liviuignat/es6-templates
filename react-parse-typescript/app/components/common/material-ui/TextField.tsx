import { TextField } from 'material-ui';
import { extend } from './utils';
import { textField } from './../../styles';

const baseGetStyles = TextField.prototype.getStyles;
TextField.getStyles = TextField.prototype.getStyles = function () {
  const baseStyles = baseGetStyles.call(this);
  return extend(baseStyles, textField);
};

export default TextField;