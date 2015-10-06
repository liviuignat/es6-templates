class RequiredStringValidator implements IValidator<string> {
  constructor(public message: string = 'Field is required') {
  }
  
  isValid(value: string): boolean {
    return !!value;
  }
}

class PasswordValidator implements IValidator<string> {
  constructor(public message: string = 'Password is required') {
  }
  
  isValid(value: string): boolean {
    if (!new RequiredStringValidator().isValid(value)) {
      return false; 
    }
    
    if (value.length < 6) {
      this.message = 'Password should be greater than 6 characters';
      return false;
    }
    
    return true;
  }
}

class FormValidator {
  validate(formData: any) {
    let isValid = true;
    
    Object.keys(formData).forEach((key) => {
      const formFieldData: IValidators = formData[key];
      
      if (formFieldData && formFieldData.validators && formFieldData.validators.length) {
        
        formFieldData.validators.forEach((validator) => {
          if (!validator.isValid(formFieldData.value)) {
            formFieldData.error = validator.message;
            isValid = false;
          } else {
            formFieldData.error = '';
          }
        });
        
      }
    });
    
    return {
      isValid: isValid,
      formData: formData 
    };
  }
}

export default {
  RequiredStringValidator,
  PasswordValidator,
  formValidator: new FormValidator()
};