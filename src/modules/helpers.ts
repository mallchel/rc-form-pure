import {
  IFields,
  IFieldsToSubmit,
  CallValidateFunctionsType,
  CallSubscriptionsType,
  ErrorsType,
  PickPropType,
  FormBuilderPropTypes,
  FieldsWithErrorType,
  IField,
  FieldNameType,
} from './types';
import Validators, { ReturnTypeValidator } from './Validators';

export const checkUnTouchedFields = (fields: IFields) => {
  const fieldsToSubmit: IFieldsToSubmit = {};
  let fieldsWithError: FieldsWithErrorType = null;
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

export const callSubscriptions: CallSubscriptionsType = ({ onChangeCallback, nextFields, name }): void => {
  if (!onChangeCallback) {
    return;
  }

  const changedFields = {} as IFields;

  if (Array.isArray(name)) {
    name.forEach(n => {
      changedFields[n] = nextFields[n];
    });
  } else {
    changedFields[name] = nextFields[name];
  }

  if (typeof onChangeCallback === 'function') {
    onChangeCallback(nextFields, changedFields);
    return;
  }

  const callChangeCallbackByName = (name: FieldNameType) => {
    const onChangeCallbackPerField = onChangeCallback[name];

    if (onChangeCallbackPerField) {
      onChangeCallbackPerField(nextFields[name], nextFields);
    }
  };

  if (Array.isArray(name)) {
    name.forEach(n => {
      callChangeCallbackByName(n);
    });
  } else {
    callChangeCallbackByName(name);
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

  // Prepare only fields that already exist in the form
  // It doesn't miss configs set before mounting field,
  // Because registerField will call the setExtraFieldProps
  Object.keys(nextFields).forEach(fieldKey => {
    nextFields[fieldKey] = setExtraFieldProps(extraFieldsProps, nextFields[fieldKey]);
  });

  return nextFields;
};

export const setExtraFieldProps = (
  extraFieldsProps: PickPropType<FormBuilderPropTypes, 'extraFieldsProps'> = {},
  field: IField
) => {
  const commonGlobalConfig = extraFieldsProps.$all;
  const { value, ...nonServiceExtraFieldsProps } = extraFieldsProps?.[field.name] || {};

  return {
    ...field,
    value: value !== null && value !== undefined ? value : field?.value,
    extraFieldProps: { commonGlobalConfig, ...nonServiceExtraFieldsProps },
  };
};
