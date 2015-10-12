import { RaisedButton } from 'material-ui';
import { extend } from './utils';
import { raisedButton } from './../../styles';

const baseGetStyles = RaisedButton.prototype.getStyles;
RaisedButton.prototype.getStyles = function () {
  const baseStyles = baseGetStyles.call(this);
  return extend(baseStyles, raisedButton);
};

export default RaisedButton;