class RequiredStringValidator implements IValidator {
  constructor(public message: string = 'Field is required') {
  }

  getIsValid(value: any): boolean {
    return !!value;
  }
}

class PasswordValidator implements IValidator {
  constructor(public message: string = 'Password is required') {
  }

  getIsValid(value: string): boolean {
    if (!new RequiredStringValidator().getIsValid(value)) {
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
      const formFieldData = formData[key];
      
      if (!formFieldData) { return; }
      if (!formFieldData.validators) { return; } 
      if (!formFieldData.validators.length) { return; }
      
      formFieldData.error = '';
    
      for (var index: number = 0; index < formFieldData.validators.length; index++) {
        var validator: IValidator  = <IValidator> formFieldData.validatorss[index];
        if (typeof(validator.getIsValid) !== undefined && !validator.getIsValid(formFieldData.value)) {
          formFieldData.error = validator.message;
          isValid = false;
        } 
     };
    });
  
    return {
      isValid: isValid,
      formData: formData
    };
  }
}

export default {
  RequiredStringValidator: RequiredStringValidator,
  PasswordValidator: PasswordValidator,
  formValidator: new FormValidator()
};