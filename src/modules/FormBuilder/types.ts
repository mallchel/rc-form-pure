import { ValidatorType } from './Validators';

export type PropTypes = {
  errors: { [name: string]: string } | null;
  withForm: boolean;
  renderForm: Function;
  children: React.ReactChild;
  onSubmit: (values: IFieldsToSubmit) => Promise<any> | void;
  onChangeFields: Function | { [name: string]: (args: any) => void };
};

export type StateTypes = {
  isFieldsTouched: boolean;
  fields: IFields;
  invalidFields: Set<string>;
  valid: boolean;
  submitting: boolean;
};

export interface IFormContext {
  registerField: (field: RegisterFieldType) => void;
  onChange: (field: OnChangeType) => void;
  onSubmit: (event: any) => void;
  fields: IFields;
  isFieldsTouched: boolean;
}

export interface IFieldsToSubmit {
  [name: string]: any;
}

export interface IFields {
  [name: string]: IField;
}

export interface IField {
  name: string;
  value: any;
  error?: any;
  validate: ValidateType;
  touched: boolean;
  errorMessage: ErrorMessageType;
}

export type OnChangeType = {
  name: string;
  value: any;
  error?: any;
};

export type RegisterFieldType = {
  name: string;
  value: any;
  validate: ValidateType;
  errorMessage: ErrorMessageType;
  error?: any;
};

export type ValidateType = ValidatorType<any> | Array<ValidatorType<any>>;
export type ErrorMessageType = string | string[];
