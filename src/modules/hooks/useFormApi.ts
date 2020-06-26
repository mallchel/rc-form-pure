import { useContext } from 'react';

import { FormContext } from '../FormBuilder';

export const useFormApi = () => {
  const context = useContext(FormContext);

  // TODO: replace with invariant
  if (!context.fields) {
    throw new Error('The FormItem must be inside the Form');
  }

  const { setFields, setFieldsValue, getFieldsValue } = context;

  return { setFields, setFieldsValue, getFieldsValue };
};
