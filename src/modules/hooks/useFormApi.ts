import { useContext } from 'react';

import { FormContextApi } from '../FormBuilder';

import { useWatchFields } from './useWatchFields';
import { useWatchValue } from './useWatchValue';

export const useFormApi = () => {
  const context = useContext(FormContextApi);

  // TODO: replace with invariant
  if (!Object.keys(context).length) {
    throw new Error('The useFormApi must be inside the Form');
  }

  const { setFields, setFieldsValue, getFieldsValue } = context;

  return { setFields, setFieldsValue, getFieldsValue, useWatchFields, useWatchValue };
};
