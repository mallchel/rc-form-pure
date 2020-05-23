import { IFields, IFieldsToSubmit } from './types';
import Validators, { ValidatorType, ReturnTypeValidator } from './Validators';

export const checkUnTouchedFields = (fields: IFields) => {
  const fieldsToSubmit: IFieldsToSubmit = {};
  let fieldsWithError: IFields | null = null;
  let validForm = true;

  Object.keys(fields).forEach(name => {
    const field = fields[name];

    fieldsToSubmit[name] = field.value;

    if (!field.touched) {
      const { validate, value, errorMessage } = field;
      const error = callValidateFunctions({ validate, value, errorMessage });

      if (invalidField(error)) {
        validForm = false;
        // initiate fieldsWithError
        if (!fieldsWithError) {
          fieldsWithError = {};
        }

        fieldsWithError[name] = {
          ...field,
          error,
        };
      }
    }

    return;
  });

  return { fieldsToSubmit, fieldsWithError, validFormAfterValidateUntouchedFields: validForm };
};

const invalidField = (error: any) => {
  // errorMessage prop isn't requirable
  // so it can be empty string
  if (error !== null) {
    return true;
  }

  return false;
};

export const checkValidFieldsAndForm = (
  nextFields: IFields,
  invalidFields: Set<string>
): { invalidFields: Set<string>; valid: boolean } => {
  const nextInvalidFields = new Set(invalidFields);

  Object.keys(nextFields).forEach(name => {
    if (invalidField(nextFields[name].error)) {
      return nextInvalidFields.add(name);
    }

    return nextInvalidFields.delete(name);
  });

  return {
    invalidFields: nextInvalidFields,
    valid: !nextInvalidFields.size,
  };
};

type CallValidateFunctionsType = {
  value: any;
  errorMessage?: string | string[];
  validate?: ValidatorType<any> | Array<ValidatorType<any>>;
};
export function callValidateFunctions({
  value,
  errorMessage = '',
  validate,
}: CallValidateFunctionsType): ReturnTypeValidator {
  if (!validate) {
    return null;
  }

  if (Array.isArray(validate)) {
    return Validators.composeValidators(validate)(value, errorMessage);
  }

  return validate(value, errorMessage);
}
