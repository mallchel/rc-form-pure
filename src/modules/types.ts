import { FocusEvent } from 'react';

import { ValidatorType } from './Validators';

export type PickPropType<T, K extends keyof T> = T[K];

export type FieldNameType = PickPropType<IField, 'name'>;

export type ErrorsType = Record<FieldNameType, string> | null;
export type OnChangeFieldsType =
  | ((allFields: Record<FieldNameType, IField>, updatedField: Record<FieldNameType, IField>) => void)
  | Record<FieldNameType, (field: IField, allFields: IFields) => void>;

export type FieldsWithErrorType = IFields | null;

type InitialValuesType = Record<FieldNameType, any>;
export type FormBuilderPropTypes = {
  errors?: ErrorsType;
  withForm?: boolean;
  renderForm?: Function;
  children?: React.ReactNode;
  onSubmit: (values: IFieldsToSubmit, fieldsWithError: FieldsWithErrorType) => Promise<any> | void;
  onChangeFields?: OnChangeFieldsType;
  validateOnBlur?: boolean;
  initialValues?: InitialValuesType;
  extraFieldsProps?: Record<FieldNameType, any>;
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

type SetFieldsOptionsType = { changeEvent: boolean };
export type GetFieldsType = (fieldKey?: FieldNameType) => IField | IFields;
export type SetFieldsType = (updates: Record<FieldNameType, Partial<IField>>, options?: SetFieldsOptionsType) => void;
export type SetFieldsValueType = (updates: Record<FieldNameType, any>, options?: SetFieldsOptionsType) => void;
export type GetFieldsValueType = (fieldKey?: FieldNameType) => IFieldsToSubmit | PickPropType<IField, 'value'>;
export type GetInitialValuesType = (fieldKey?: FieldNameType) => any;

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
  getInitialValues: GetInitialValuesType;
}

export type IFieldsToSubmit = Record<FieldNameType, PickPropType<IField, 'value'>>;

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
  commonGlobalConfig: any;
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
  name,
}: {
  onChangeCallback?: OnChangeFieldsType;
  nextFields: IFields;
  name: FieldNameType | FieldNameType[];
}) => void;
