import React, { useEffect, useContext, useCallback, useMemo } from 'react';

import { FormContext } from '../FormBuilder';
import { callValidateFunctions } from '../helpers';
import { IField } from '../types';

import { WrapperPropTypes, PropTypesFormItem, FormItemContextType } from './types';

const FormItemContext = React.createContext<FormItemContextType>({} as FormItemContextType);
const UNCONTROLLED_VALUES = [null, undefined];

const WrapperItem = (props: WrapperPropTypes) => {
  const context = useContext(FormContext);
  const formItemContext = useContext(FormItemContext);

  if (!context.fields) {
    throw new Error('The FormItem must be inside the Form');
  }

  const { name: parentName } = formItemContext;
  const { registerField, unregister, onChange, fields } = context;
  const { name: localName } = props;

  const localProps = useMemo(() => {
    const extraPropsLocal: { name: string } = { name: localName };

    if (parentName) {
      extraPropsLocal.name = `${parentName}.${localName}`;
    }

    return extraPropsLocal;
  }, [parentName, localName]);

  return (
    <FormItemMemo
      {...props}
      // overrides parent props
      {...localProps}
      field={fields[localProps.name]}
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
    field = { value: props.initialValue, error: null } as IField,
    errorMessage,
    name,
    initialValue,
    children,
    ...nonServiceOwnProps
  } = props;

  useEffect(() => {
    if (Component) {
      registerField({
        componentProps: nonServiceOwnProps,
        name,
        value: initialValue,
        validate,
        errorMessage,
      });

      return () => {
        unregister({
          name,
        });
      };
    }
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

  const valueContext = useMemo(() => {
    return {
      name,
    };
  }, [name]);

  const value = useMemo(() => {
    return UNCONTROLLED_VALUES.includes(field.value) ? '' : field.value;
  }, [field.value]);

  return (
    <FormItemContext.Provider value={valueContext}>
      {Component ? (
        <Component
          {...field.extraFieldProps}
          {...nonServiceOwnProps}
          name={name}
          value={value}
          onChange={onChange}
          error={field.error}
          onBlur={validateOnBlur ? onBlur : undefined}
        />
      ) : (
        children
      )}
    </FormItemContext.Provider>
  );
};

FormItem.defaultProps = {
  errorMessage: 'Error',
};
const FormItemMemo = React.memo(FormItem);

export default WrapperItem;
