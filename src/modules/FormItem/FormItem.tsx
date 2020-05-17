import React, { useEffect, useContext, useCallback, AllHTMLAttributes } from 'react';

import { FormContext } from '../FormBuilder';
import { IField, OnChangeType, RegisterFieldType, ValidateType, ErrorMessageType, ComponentPropTypes } from '../types';
import { callValidateFunctions } from '../helpers';

type WrapperPropTypes = AllHTMLAttributes<any> & {
  name: string;
  component: ComponentPropTypes<any>;
  formatter?: (value: any) => any;
  validateOnBlur?: boolean;
  validate?: ValidateType;
  errorMessage?: ErrorMessageType;
};

type PropTypesFormItem = Omit<WrapperPropTypes, 'onChange'> & {
  registerField: (field: RegisterFieldType) => void;
  unregister: ({ name }: { name: string }) => void;
  field: IField;
  onChange: (field: OnChangeType) => void;
};

const WrapperItem = (props: WrapperPropTypes) => {
  const context = useContext(FormContext);

  if (!context.fields) {
    throw new Error('The FormItem must be inside the Form');
  }

  const { registerField, unregister, onChange, fields } = context;

  return (
    <FormItemMemo
      {...props}
      field={fields[props.name] || ({ value: props.value } as IField)}
      onChange={onChange}
      registerField={registerField}
      unregister={unregister}
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
    unregister,
    onChange: onChangeFromContext,
    field,
    errorMessage,
    name,
    value,
    ...nonServiceProps
  } = props;

  useEffect(() => {
    registerField({
      componentProps: nonServiceProps,
      name,
      value,
      validate,
      errorMessage,
    });

    return () => {
      unregister({
        name,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = useCallback(
    (newValue: any, onBlurCall: boolean = false) => {
      const formattedValue = formatter ? formatter(newValue) : newValue;

      let error;
      if (!validateOnBlur || onBlurCall) {
        error = callValidateFunctions({ validate, value: formattedValue, errorMessage });
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
  errorMessage: 'Error',
};
const FormItemMemo = React.memo(FormItem);

export default WrapperItem;
