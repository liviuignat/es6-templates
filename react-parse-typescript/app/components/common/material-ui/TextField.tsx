import TextField from 'material-ui/lib/text-field';
import { extend } from './utils';
import { textField } from './../../styles';

class AppTextField extends TextField {
  constructor(props, context) {
    super(props, context);
    
    this.getStyles = () => extend(super.getStyles(), textField);
  }
}

export default AppTextField;