import React, { useContext } from 'react';

import { FormContext } from '../FormBuilder';

type PropTypes = {
  children: React.ReactChild;
};
const ButtonSubmit = ({ children }: PropTypes) => {
  const context = useContext(FormContext);

  if (!context.onSubmit) {
    throw new Error('The ButtonSubmit must be inside the Form');
  }

  return <button onClick={context.onSubmit}>{children}</button>;
};

export default ButtonSubmit;
