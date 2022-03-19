import {
  ComponentPropTypes as ComponentPropTypesBase,
  ErrorsType as ErrorsTypeBase,
  IFieldsToSubmit as IFieldsToSubmitBase,
  OnChangeFieldsType as OnChangeFieldsTypeBase,
  FormBuilderPropTypes as FormBuilderPropTypesBase,
} from './types';
export type ComponentPropTypes<T> = ComponentPropTypesBase<T>;
export type ErrorsType = ErrorsTypeBase;
export type IFieldsToSubmit = IFieldsToSubmitBase;
export type OnChangeFieldsType = OnChangeFieldsTypeBase;
export type FormBuilderPropTypes = FormBuilderPropTypesBase;

export { default as FormBuilder } from './FormBuilder/FormBuilder';
export { default as FormItem } from './FormItem';
export { default as Validators } from './Validators';
export { default as useValidators } from './hooks/useValidators';
export { useWatchFields } from './hooks/useWatchFields';
export { useWatchValue } from './hooks/useWatchValue';
export { useInitialValues } from './hooks/useInitialValues';
export { useFormApi } from './hooks/useFormApi';
export { useSubmit } from './hooks/useSubmit';
