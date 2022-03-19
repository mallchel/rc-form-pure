import { useContext } from 'react';

import { FormContext } from '../FormBuilder';

export const useSubmit = () => {
  const context = useContext(FormContext);

  if (!context.onSubmit) {
    throw new Error('The useSubmit must be inside the FormBuilder');
  }

  return { onSubmit: context.onSubmit };
};
