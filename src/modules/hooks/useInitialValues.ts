import { useContext, useMemo } from 'react';
import { FormContextApi } from '../FormBuilder';

import { FieldNameType } from '../types';

export const useInitialValues = (fieldKey: FieldNameType) => {
  const context = useContext(FormContextApi);

  if (!Object.keys(context).length) {
    throw new Error('The useFieldsValue must be inside the FormBuilder');
  }

  const nextValue = useMemo(() => {
    const value = context.getInitialValues(fieldKey);
    return value;
  }, [fieldKey, context]);

  return nextValue;
};
