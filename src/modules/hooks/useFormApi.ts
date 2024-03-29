import { useContext } from 'react';

import { FormContextApi } from '../FormBuilder';
import { useInitialValues } from './useInitialValues';

import { useWatchFields } from './useWatchFields';
import { useWatchValue } from './useWatchValue';
import { useSubmit } from './useSubmit';

export const useFormApi = () => {
  const context = useContext(FormContextApi);

  // TODO: replace with invariant
  if (!Object.keys(context).length) {
    throw new Error('The useFormApi must be inside the FormBuilder');
  }

  const { setFields, setFieldsValue, getFieldsValue, getFields } = context;

  return {
    setFields,
    setFieldsValue,
    getFields,
    getFieldsValue,
    useWatchFields,
    useWatchValue,
    useInitialValues,
    useSubmit,
  };
};
