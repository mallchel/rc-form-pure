import { IField, IFields } from '../types';

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

export const useWatchValue = (fieldKey?: string) => {
  const [fieldOrFields] = useWatchFields(fieldKey);

  if (fieldKey) {
    return prepareValue(fieldOrFields);
  }

  return prepareValues(fieldOrFields);
};
