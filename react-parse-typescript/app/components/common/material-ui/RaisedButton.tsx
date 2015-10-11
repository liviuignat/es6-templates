import RaisedButton from 'material-ui/lib/raised-button';
import { getExtendedStyles } from './utils';
import { raisedButton } from './../../styles';

class AppRaisedButton extends RaisedButton {
  constructor(props, context) {
    super(props, context);
    this.getStyles = getExtendedStyles(this, super.getStyles(), raisedButton);
  }
}

export default AppRaisedButton;