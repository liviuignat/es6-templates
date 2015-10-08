/// <reference path="./../defs/tsd.d.ts" />

interface IDispatcherPayload<T> {
  type: string;
  payload: T;
}

interface ITextFieldData {
  value?: string;
  error?: string;
  validators?: any[];
}

interface IValidator {
  message: string;
  getIsValid(value: any): boolean;
}

interface IFormValidatorResponse {
  isValid: boolean;
  formData: any;
}