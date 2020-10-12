import { FocusEvent } from 'react';

import { ValidatorType } from './Validators';

export type PickPropType<T, K extends keyof T> = T[K];

export type ErrorsType = Record<PickPropType<IField, 'name'>, string> | null;
export type OnChangeFieldsType =
  | ((
      allFields: Record<PickPropType<IField, 'name'>, IField>,
      updatedField: Record<PickPropType<IField, 'name'>, IField>
    ) => void)
  | Record<PickPropType<IField, 'name'>, (field: IField, allFields: IFields) => void>;

export type FieldsWithErrorType = IFields | null;

export type FormBuilderPropTypes = {
  errors?: ErrorsType;
  withForm?: boolean;
  renderForm?: Function;
  children?: React.ReactNode;
  onSubmit: (values: IFieldsToSubmit, fieldsWithError: FieldsWithErrorType) => Promise<any> | void;
  onChangeFields?: OnChangeFieldsType;
  validateOnBlur?: boolean;
  initialValues?: Record<PickPropType<IField, 'name'>, any>;
  extraFieldsProps?: Record<PickPropType<IField, 'name'>, any>;
};

export type StateTypes = {
  isFieldsTouched: boolean;
  fields: IFields;
  invalidFields: Set<string>;
  valid: boolean;
  submitting: boolean;
  mirroredErrors: PickPropType<FormBuilderPropTypes, 'errors'>;
  mirroredExtraFieldsProps?: PickPropType<FormBuilderPropTypes, 'extraFieldsProps'>;
};

export type GetFieldsType = (fieldKey?: string) => IField | IFields;
export type SetFieldsType = (updates: Record<string, Partial<IField>>) => void;
export type SetFieldsValueType = (updates: Record<string, any>) => void;
export type GetFieldsValueType = (fieldKey?: string) => IFieldsToSubmit | PickPropType<IField, 'value'>;

export interface IFormContext {
  registerField: (field: RegisterFieldType) => void;
  unregister: (args: { name: string }) => void;
  onChange: (field: OnChangeType) => void;
  onSubmit: (event: any) => void;
  fields: IFields;
  isFieldsTouched: boolean;
}

export interface IFormContextApi {
  setInternalOnChanges: Function;
  unsetInternalOnChanges: Function;
  // external FromBuilder API
  getFields: GetFieldsType;
  setFields: SetFieldsType;
  setFieldsValue: SetFieldsValueType;
  getFieldsValue: GetFieldsValueType;
}

export type IFieldsToSubmit = Record<PickPropType<IField, 'name'>, PickPropType<IField, 'value'>>;

export interface IFields {
  [name: string]: IField;
}

export interface IField {
  name: string;
  value?: any;
  error?: any;
  validate?: ValidateType;
  touched?: boolean;
  errorMessage?: ErrorMessageType;
  extraFieldProps?: any;
}

export type OnChangeType = {
  name: string;
  value: any;
  error?: any;
};

export type RegisterFieldType = {
  name: string;
  value: any;
  validate?: ValidateType;
  errorMessage?: ErrorMessageType;
  error?: any;
  componentProps: object;
};

export type ValidateType = ValidatorType<any> | Array<ValidatorType<any>>;
export type ErrorMessageType = string | string[];

type ComponentBasePropTypes = {
  name: string;
  value: any;
  onChange: (value: string) => void;
  error: any;
  onBlur?: (event: FocusEvent<any>) => void;
};

export type ComponentPropTypes<T> = React.ComponentType<T & ComponentBasePropTypes>;

export type CallValidateFunctionsType = {
  value: any;
  errorMessage?: string | string[];
  validate?: ValidatorType<any> | Array<ValidatorType<any>>;
};

export type CallSubscriptionsType = ({
  onChangeCallback,
  nextFields,
  nextField,
  name,
}: {
  onChangeCallback?: OnChangeFieldsType;
  nextFields: IFields;
  nextField: IField;
  name: PickPropType<IField, 'name'>;
}) => void;
