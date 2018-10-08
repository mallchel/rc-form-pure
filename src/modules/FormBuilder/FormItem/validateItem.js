const validateItem = ({
  rules,
  type,
  value,
  callback,
  error,
  onChangeError,
}) => {
  // in order of increasing priority
  let builtInTypeError = null;
  let requiredError = null;

  // validation only the required fields if it is empty
  if (!value) {
    const requiredRule = rules.find(rule => rule.builtInType === 'required');
    if (requiredRule) {
      requiredRule.validator(
        { message: requiredRule.message },
        value,
        message => (requiredError = message)
      );
    }

    return onChangeError({
      type,
      error: requiredError,
    });
  }

  if (rules.length) {
    rules.forEach(({ builtInType, validator, message }) => {
      switch (builtInType) {
        case 'required':
          validator({ message }, value, message => (requiredError = message));
          break;

        case 'validator':
          // user's validator
          validator({ message }, value, message => callback(message));
          break;

        default:
          validator(
            { message },
            value,
            message => (builtInTypeError = message)
          );
          break;
      }
    });

    // validate all rules
    // priority by required rules
    onChangeError({
      type,
      error: requiredError || builtInTypeError,
    });
  } else {
    return onChangeError({
      type,
      error: null,
    });
  }
};

export default validateItem;
