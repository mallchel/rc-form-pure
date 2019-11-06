import { useMemo } from 'react';

import { ValidatorType } from '../Validators';

const useValidators = (validators: Array<ValidatorType<any>>) => {
  return useMemo(
    () => validators,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export default useValidators;
