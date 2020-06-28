import { AllHTMLAttributes } from 'react';

import { OnChangeType, RegisterFieldType, ValidateType, ErrorMessageType, ComponentPropTypes, IField } from '../types';

export type WrapperPropTypes = AllHTMLAttributes<any> &
  Record<string, any> & {
    name: string;
    component?: ComponentPropTypes<any>;
    formatter?: (value: any) => any;
    validateOnBlur?: boolean;
    validate?: ValidateType;
    errorMessage?: ErrorMessageType;
    initialValue?: any;
  };

export type PropTypesFormItem = Omit<WrapperPropTypes, 'onChange'> & {
  registerField: (field: RegisterFieldType) => void;
  unregister: ({ name }: { name: string }) => void;
  field: IField;
  onChange: (field: OnChangeType) => void;
};

export type FormItemContextType = Pick<WrapperPropTypes, 'name'> & {};
