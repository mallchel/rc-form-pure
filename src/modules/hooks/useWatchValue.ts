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
  const [one, two] = useWatchFields(fieldKey);

  if (fieldKey) {
    return [prepareValue(one), prepareValues(two)];
  }

  return [prepareValues(one), prepareValues(two)];
};
