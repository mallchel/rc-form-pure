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
  SetFieldsType,
  SetFieldsValueType,
  GetFieldsValueType,
  IFormContextApi,
} from '../types';
import { checkUnTouchedFields, checkValidFieldsAndForm, callValidateFunctions, callSubscriptions } from '../helpers';

export const FormContext = React.createContext<IFormContext>({} as IFormContext);
export const FormContextApi = React.createContext<IFormContextApi>({} as IFormContextApi);

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

  private formContextApiValue: IFormContextApi = {} as IFormContextApi;

  constructor(props: FormBuilderPropTypes) {
    super(props);

    this.formContextApiValue = {
      setInternalOnChanges: this.setInternalOnChanges,
      unsetInternalOnChanges: this.unsetInternalOnChanges,
      // external FromBuilder API
      setFields: this.setFields,
      setFieldsValue: this.setFieldsValue,
      getFieldsValue: this.getFieldsValue,
    };
  }

  // /* helpers for external API

  setFields: SetFieldsType = updates => {
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

  setFieldsValue: SetFieldsValueType = updates => {
    const data = Object.keys(updates).reduce((acc, key) => {
      acc[key] = { value: updates[key] };
      return acc;
    }, {} as Record<string, Pick<IField, 'value'>>);
    this.setFields(data);
  };

  getFieldsValue: GetFieldsValueType = fieldKey => {
    const { fields } = this.state;

    if (fieldKey) {
      return fields[fieldKey]?.value;
    }

    const values: IFieldsToSubmit = {} as IFieldsToSubmit;
    Object.keys(fields).forEach(name => (values[name] = fields[name].value));

    return values;
  };

  internalsOnChanges = new Map();
  setInternalOnChanges = (config: object) => {
    this.internalsOnChanges.set(config, config);
  };

  unsetInternalOnChanges = (config: object) => {
    this.internalsOnChanges.delete(config);
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

  private onChange = ({ name, onChangeFields: formItemOnChangeFields, ...updates }: OnChangeType) => {
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
        // subscriptions from FormItem props
        callSubscriptions({ onChangeCallback: formItemOnChangeFields, nextFields, nextField, name });

        const { onChangeFields: formBuilderOnChangeFields } = this.props;

        // subscriptions from FromBuilder props
        callSubscriptions({ onChangeCallback: formBuilderOnChangeFields, nextFields, nextField, name });

        const internalsOnChanges = [...this.internalsOnChanges.values()];

        internalsOnChanges.forEach(onChangeCallback =>
          callSubscriptions({ onChangeCallback, nextFields, nextField, name })
        );
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
        <FormContextApi.Provider value={this.formContextApiValue}>
          {renderForm({
            onSubmit: this.onSubmit,
            children,
          })}
        </FormContextApi.Provider>
      </FormContext.Provider>
    );
  }
}
