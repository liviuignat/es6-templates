/// <reference path="./../defs/tsd.d.ts" />

interface ITextFieldData {
  value?: string;
  error?: string;
  validators?: any[];
}

interface IValidator<T> {
  message: string;
  isValid(value: T): boolean;
}