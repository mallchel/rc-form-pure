import { useContext, useEffect, useState } from 'react';

import { OnChangeFieldsType } from '../types';
import { FormContextApi } from '../FormBuilder';

export const useWatchFields = (fieldKey?: string) => {
  const context = useContext(FormContextApi);

  if (!Object.keys(context).length) {
    throw new Error('The useFieldsValue must be inside the Form');
  }

  const [nextValue, setNextValue] = useState<any[]>([]);

  useEffect(() => {
    const onChangeFields: OnChangeFieldsType = fieldKey
      ? { [fieldKey]: (field, allFields) => setNextValue([field, allFields]) }
      : (allFields, updatedFields) => setNextValue([allFields, updatedFields]);

    context.setInternalOnChanges(onChangeFields);

    return () => context.unsetInternalOnChanges(onChangeFields);
  }, [fieldKey, context]);

  return nextValue;
};
