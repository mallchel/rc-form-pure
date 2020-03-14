import React from 'react';
import { ComponentPropTypes } from '../../index';

export const TextField: ComponentPropTypes<{}> = props => {
  const { value, error, onChange } = props;

  return (
    <React.Fragment>
      <input value={value} onChange={e => onChange(e.target.value)} />
      {error}
    </React.Fragment>
  );
};
