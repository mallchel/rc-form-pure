import React, { ReactType, ReactElement, useEffect, useContext, useCallback } from 'react';

import { FormContext } from '../FormBuilder';
import { IField, OnChangeType, RegisterFieldType } from '../types';
import { callValidateFunctions } from '../helpers';

type PropTypes = IField & {
  component: ReactType<any>;
  children: ReactElement;
  formatter: (value: any) => any;
  validateOnBlur: boolean;
};

type PropTypesFormItem = PropTypes & {
  registerField: (field: RegisterFieldType) => void;
  onChange: (field: OnChangeType) => void;
  field: IField;
};

const WrapperItem = (props: PropTypes) => {
  const context = useContext(FormContext);

  if (!context.fields) {
    throw new Error('The FormItem must be inside the Form');
  }

  const { registerField, onChange, fields } = context;

  return (
    <FormItemMemo
      {...props}
      field={fields[props.name] || ({ value: props.value } as IField)}
      onChange={onChange}
      registerField={registerField}
    />
  );
};

const FormItem = (props: PropTypesFormItem) => {
  const {
    component: Component,
    formatter,
    validate,
    validateOnBlur,
    registerField,
    onChange: onChangeFromContext,
    field,
    errorMessage,
    name,
    value,
    ...nonServiceProps
  } = props;

  useEffect(() => {
    registerField({
      name,
      value,
      validate,
      errorMessage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = useCallback(
    (newValue: any, onBlurCall: boolean = false) => {
      const formattedValue = formatter(newValue);

      let error;
      if (!validateOnBlur || onBlurCall) {
        error = callValidateFunctions(validate, formattedValue, errorMessage);
      }

      onChangeFromContext({
        name,
        value: formattedValue,
        error,
      });
    },
    [onChangeFromContext, name, formatter, errorMessage, validate, validateOnBlur]
  );

  const onBlur = useCallback(() => {
    onChange(field.value, true);
  }, [field.value, onChange]);

  return (
    <Component
      {...nonServiceProps}
      name={name}
      value={field.value || ''}
      onChange={onChange}
      error={field.error}
      onBlur={validateOnBlur ? onBlur : undefined}
    />
  );
};

FormItem.defaultProps = {
  component: () => {
    throw new Error('Component is required');
  },
  validate: () => undefined,
  formatter: (i: any) => i,
};

const FormItemMemo = React.memo(FormItem);

export default WrapperItem;
