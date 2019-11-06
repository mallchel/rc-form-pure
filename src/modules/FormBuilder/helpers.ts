import { IFields, IFieldsToSubmit } from './types';
import Validators, { ValidatorType } from './Validators';

export const checkUnTouchedFields = (fields: IFields) => {
  const fieldsToSubmit: IFieldsToSubmit = {};
  const fieldsWithError: IFields = {};
  let validForm = true;

  Object.keys(fields).forEach(name => {
    const field = fields[name];

    fieldsToSubmit[name] = field.value;

    if (!field.touched) {
      const error = callValidateFunctions(field.validate, field.value, field.errorMessage);

      if (error) {
        validForm = false;
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

export const checkValidFieldsAndForm = (
  nextFields: IFields,
  invalidFields: Set<string>
): { invalidFields: Set<string>; valid: boolean } => {
  const nextInvalidFields = new Set(invalidFields);

  Object.keys(nextFields).forEach(name => {
    if (nextFields[name].error) {
      return nextInvalidFields.add(name);
    }

    return nextInvalidFields.delete(name);
  });

  return {
    invalidFields: nextInvalidFields,
    valid: !nextInvalidFields.size,
  };
};

export function callValidateFunctions(
  validate: ValidatorType<any> | Array<ValidatorType<any>>,
  value: any,
  errorMessage: string | string[]
) {
  if (Array.isArray(validate)) {
    return Validators.composeValidators(validate)(value, errorMessage);
  }

  return validate(value, errorMessage);
}
