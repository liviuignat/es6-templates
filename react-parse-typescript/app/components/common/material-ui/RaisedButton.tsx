import RaisedButton from 'material-ui/lib/raised-button';
import { extend } from './utils';
import { raisedButton } from './../../styles';

class AppRaisedButton extends RaisedButton {
  constructor(props, context) {
    super(props, context);
    this.getStyles = () => extend(super.getStyles(), raisedButton);
  }
}

export default AppRaisedButton;