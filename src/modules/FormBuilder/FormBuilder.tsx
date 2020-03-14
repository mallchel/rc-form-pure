import React, { SyntheticEvent } from 'react';
import _set from 'lodash.set';

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
import { checkUnTouchedFields, checkValidFieldsAndForm } from '../helpers';

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
  setFields = (updates: IFields) => {
    this.setState(state => {
      const nextFields = { ...state.fields, ...updates };
      return {
        fields: nextFields,
        ...checkValidFieldsAndForm(nextFields, state.invalidFields),
      };
    });
  };

  getFieldsValue = () => {
    const values: IFieldsToSubmit = {} as IFieldsToSubmit;
    const { fields } = this.state;
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
      return this.setState({
        valid: validFormAfterValidateUntouchedFields,
        fields: {
          ...this.state.fields,
          ...fieldsWithError,
        },
        submitting: false,
      });
    }

    const formattedFields = {};
    Object.keys(fieldsToSubmit).forEach(key => {
      _set(formattedFields, key, fieldsToSubmit[key]);
    });
    const promise = this.props.onSubmit(formattedFields);

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
          touched: false,
          error: this.props.errors ? this.props.errors[name] : null,
        },
      },
    }));
  };

  private onChange = ({ name, ...updates }: OnChangeType) => {
    const prevField: IField = this.state.fields[name];
    const nextField = { ...prevField, ...updates, touched: true };
    const nextFields: IFields = {
      ...this.state.fields,
      [name]: nextField,
    };

    this.setState(state => {
      return {
        fields: nextFields,
        ...checkValidFieldsAndForm(nextFields, state.invalidFields),
      };
    });

    const { onChangeFields } = this.props;

    if (onChangeFields) {
      if (typeof onChangeFields === 'function') {
        return onChangeFields(nextFields);
      }

      const onChangeCallback = onChangeFields[name];
      if (onChangeCallback) {
        onChangeCallback(nextField);
      }
    }
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
