import { useMemo, useRef } from 'react';

import { IField, IFields } from '../types';
import { UNCONTROLLED_VALUES } from '../constants';

import { useWatchFields } from './useWatchFields';

function prepareValue(field: IField) {
  return field?.value;
}
function prepareValues(fields: IFields = {}) {
  return Object.values(fields).reduce((acc, field) => {
    acc[field.name] = field.value;
    return acc;
  }, {} as Record<string, any>);
}

export const useWatchValue = (fieldKey?: string, defaultValue?: any) => {
  const [fieldOrFields] = useWatchFields(fieldKey);
  const defaultValueRef = useRef(defaultValue);

  const parsedResult = useMemo(() => {
    if (fieldKey) {
      const value = prepareValue(fieldOrFields);
      return UNCONTROLLED_VALUES.includes(value) ? defaultValueRef.current : value;
    }

    return prepareValues(fieldOrFields);
  }, [fieldKey, fieldOrFields]);

  return parsedResult;
};
