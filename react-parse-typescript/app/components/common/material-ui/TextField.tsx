import TextField from 'material-ui/lib/text-field';
import { getExtendedStyles } from './utils';
import { textField } from './../../styles';

class AppTextField extends TextField {
  constructor(props, context) {
    super(props, context);
    this.getStyles = getExtendedStyles(this, super.getStyles(), textField);
  }
}

export default AppTextField;