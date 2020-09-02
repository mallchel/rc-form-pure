import { ErrorMessageType } from './types';

export type ReturnTypeValidator = null | ErrorMessageType;
export type ValidatorType<T> = (value: T, message: ErrorMessageType) => ReturnTypeValidator;

export default class Validators {
  static required: ValidatorType<any> = (value, message) => (!!value ? null : message);

  static email: ValidatorType<string> = (value, message) => {
    const regexpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value) {
      return typeof value === 'string' && !!value.match(regexpEmail) && value.length < 255 ? null : message;
    }

    return null;
  };

  static number: ValidatorType<any> = (value, message) => {
    if (isNaN(value)) {
      return message;
    }
    return typeof value === 'number' ? null : message;
  };

  static len = (length: number): ValidatorType<any> => (value, message) => {
    const isNumber = !Validators.number(value, message);
    return isNumber && String(value).length === length ? null : message;
  };

  static min = (min: number): ValidatorType<number> => (value, message) => {
    return min <= value ? null : message;
  };

  static composeValidators = (validators: Array<ValidatorType<any>>): ValidatorType<any> => (
    value,
    message
  ): ReturnTypeValidator => {
    let result = null;

    validators.find((validator, index) => {
      result = validator(value, message[index]);
      return result;
    });

    return result;
  };
}
