class TextFieldData implements ITextFieldData {
  public value = '';
  public error = '';
  public validators = [];
  
  constructor(data: ITextFieldData) {
    if (data) {
      this.value = data.value || this.value;
      this.error = data.error || this.error; 
      this.validators = data.validators || this.validators;
    }
  }
  
  setValue(value: string): TextFieldData {
    this.value = value;
    return this;
  }
}

export default {
  TextFieldData
};