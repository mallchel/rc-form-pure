import {
  IFields,
  IFieldsToSubmit,
  CallValidateFunctionsType,
  CallSubscriptionsType,
  ErrorsType,
  PickPropType,
  FormBuilderPropTypes,
} from './types';
import Validators, { ReturnTypeValidator } from './Validators';

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

      if (checkInvalidField(error)) {
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

const checkInvalidField = (error: any) => {
  // errorMessage prop isn't requirable
  // so it can be empty string
  if (error !== undefined && error !== null) {
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
    if (checkInvalidField(nextFields[name].error)) {
      return nextInvalidFields.add(name);
    }

    return nextInvalidFields.delete(name);
  });

  return {
    invalidFields: nextInvalidFields,
    valid: !nextInvalidFields.size,
  };
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

export const callSubscriptions: CallSubscriptionsType = ({ onChangeCallback, nextFields, nextField, name }): void => {
  if (onChangeCallback) {
    if (typeof onChangeCallback === 'function') {
      onChangeCallback(nextFields, { [name]: nextField });
      return;
    }

    const onChangeCallbackPerField = onChangeCallback[name];

    if (onChangeCallbackPerField) {
      onChangeCallbackPerField(nextField, nextFields);
    }
  }
};

export const setNewFieldsErrors = (errors: ErrorsType, fields: IFields) => {
  const nextFields = { ...fields };

  if (!errors) {
    return nextFields;
  }

  Object.keys(errors).forEach(fieldKey => {
    nextFields[fieldKey] = { ...fields[fieldKey], error: errors[fieldKey] };
  });

  return nextFields;
};

export const setExtraFieldsProps = (
  extraFieldsProps: PickPropType<FormBuilderPropTypes, 'extraFieldsProps'>,
  fields: IFields
) => {
  const nextFields = { ...fields };

  if (!extraFieldsProps) {
    return nextFields;
  }

  // prepare only fields that already exist in the form
  Object.keys(nextFields).forEach(fieldKey => {
    const { value, ...nonServiceExtraFieldsProps } = extraFieldsProps[fieldKey] || {};

    nextFields[fieldKey] = {
      ...nextFields[fieldKey],
      value: value || nextFields[fieldKey]?.value,
      extraFieldProps: nonServiceExtraFieldsProps,
    };
  });

  return nextFields;
};
