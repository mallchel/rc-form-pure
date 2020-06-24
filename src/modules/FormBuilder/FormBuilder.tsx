import React, { SyntheticEvent } from 'react';

import Form from '../Form';
import {
  IField,
  IFields,
  FormBuilderPropTypes,
  StateTypes,
  IFormContext,
  IFieldsToSubmit,
  OnChangeType,
  RegisterFieldType,
} from '../types';
import { checkUnTouchedFields, checkValidFieldsAndForm, callValidateFunctions } from '../helpers';

export const FormContext = React.createContext<IFormContext>({} as IFormContext);

export default class FormBuilder extends React.Component<FormBuilderPropTypes, StateTypes> {
  static defaultProps = {
    validateOnBlur: false,
  };

  state: StateTypes = {
    isFieldsTouched: false,
    fields: {},
    invalidFields: new Set(''),
    valid: true,
    submitting: false,
  };

  // /* helpers for external API

  setFields = (updates: Record<string, Partial<IField>>) => {
    this.setState(state => {
      const nextFields = { ...state.fields };

      Object.keys(updates).forEach(fieldKey => {
        if (nextFields[fieldKey]) {
          const { validate, errorMessage } = nextFields[fieldKey];
          const { value } = updates[fieldKey];

          nextFields[fieldKey] = {
            ...nextFields[fieldKey],
            error: callValidateFunctions({ value, validate, errorMessage }),
            ...updates[fieldKey],
          };
        }
      });
      return {
        fields: nextFields,
        ...checkValidFieldsAndForm(nextFields, state.invalidFields),
      };
    });
  };

  setFieldsValue = (updates: Record<string, any>) => {
    const data = Object.keys(updates).reduce((acc, key) => {
      acc[key] = { value: updates[key] };
      return acc;
    }, {} as Record<string, Pick<IField, 'value'>>);
    this.setFields(data);
  };

  getFieldsValue = (fieldKey?: string): IFieldsToSubmit | any => {
    const { fields } = this.state;

    if (fieldKey) {
      return fields[fieldKey]?.value;
    }

    const values: IFieldsToSubmit = {} as IFieldsToSubmit;
    Object.keys(fields).forEach(name => (values[name] = fields[name].value));

    return values;
  };

  // */

  onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event && event.preventDefault && event.preventDefault();

    const { fields, valid } = this.state;

    if (!valid) {
      return;
    }

    this.toggleSubmitting(true);
    const { fieldsToSubmit, fieldsWithError, validFormAfterValidateUntouchedFields } = checkUnTouchedFields(fields);

    if (!validFormAfterValidateUntouchedFields) {
      this.setState(state => ({
        valid: validFormAfterValidateUntouchedFields,
        fields: {
          ...state.fields,
          ...(fieldsWithError || {}),
        },
        submitting: false,
      }));
    }

    const promise = this.props.onSubmit(fieldsToSubmit, fieldsWithError);

    return promise && promise.finally(() => this.toggleSubmitting(false));
  };

  toggleSubmitting = (submitting: boolean) => this.setState({ submitting });

  registerField = ({ name, ...field }: RegisterFieldType) => {
    this.setState(state => ({
      fields: {
        ...state.fields,
        [name]: {
          name,
          ...field,
          value: this.props.initialValues?.[name] || field.value,
          touched: false,
          error: this.props.errors ? this.props.errors[name] : null,
        },
      },
    }));
  };

  unregister = ({ name }: { name: string }) => {
    this.setState(state => {
      const { [name]: removed, ...restFields } = state.fields;

      return {
        fields: { ...restFields },
        valid: true,
      };
    });
  };

  private onChange = ({ name, ...updates }: OnChangeType) => {
    const prevField: IField = this.state.fields[name];
    const nextField = { ...prevField, ...updates, touched: true };
    const nextFields: IFields = {
      ...this.state.fields,
      [name]: nextField,
    };

    this.setState(
      state => {
        return {
          fields: nextFields,
          ...checkValidFieldsAndForm(nextFields, state.invalidFields),
        };
      },
      () => {
        const { onChangeFields } = this.props;

        if (onChangeFields) {
          if (typeof onChangeFields === 'function') {
            return onChangeFields(nextFields, { [name]: nextField });
          }

          const onChangeCallback = onChangeFields[name];
          if (onChangeCallback) {
            onChangeCallback(nextField, nextFields);
          }
        }
      }
    );
  };

  render() {
    const {
      withForm,
      renderForm = withForm ? Form : ({ children: childrenProp }: { children: React.ReactChild }) => childrenProp,
      children,
    } = this.props;
    return (
      <FormContext.Provider
        value={{
          registerField: this.registerField,
          unregister: this.unregister,
          onChange: this.onChange,
          onSubmit: this.onSubmit,
          fields: this.state.fields,
          isFieldsTouched: this.state.isFieldsTouched,
        }}
      >
        {renderForm({
          onSubmit: this.onSubmit,
          children,
        })}
      </FormContext.Provider>
    );
  }
}
