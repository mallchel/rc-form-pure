import { useMemo, useContext, useEffect, useState } from 'react';

import { IFields, IField } from '../types';
import { FormContext } from '../FormBuilder';
import { randomBytes } from 'crypto';

const useFieldsValue = (fieldKey?: string) => {
  const context = useContext(FormContext);

  if (!context.fields) {
    throw new Error('The useFieldsValue must be inside the Form');
  }

  const [nextValue, setNextValue] = useState<IFields | IField | undefined>();

  const config = useMemo(() => {
    return fieldKey
      ? { [fieldKey]: ({ value }: IField) => setNextValue(value) }
      : (fields: IFields) => setNextValue(fields);
  }, [fieldKey]);

  console.log(232323, nextValue);
  useEffect(() => {
    context.setInternalOnChanges(config);

    return () => context.unsetInternalOnChanges(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return nextValue;
};

export default useFieldsValue;
