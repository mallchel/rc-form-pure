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
  let userValidatorExist = false;

  // validation only the required fields if it is empty or if the value exists
  if (!value) {
    const requiredRule = rules.find(rule => rule.builtInType === 'required');
    requiredRule &&
      requiredRule.validator(
        { message: requiredRule.message },
        value,
        message => (requiredError = message)
      );

    return onChangeError({
      type,
      error: requiredError
        ? { type: 'required', message: requiredError }
        : null,
    });
  }

  if (rules.length) {
    rules.forEach(({ builtInType, validator, message }) => {
      switch (builtInType) {
        case 'required':
          validator({ message }, value, message => (requiredError = message));
          break;

        case 'validator':
          validator({ message }, value, message =>
            callback({
              type,
              error: message ? { type: 'validator', message } : null,
            })
          ); // user's validator
          userValidatorExist = true;
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

    if (userValidatorExist) {
      if (!requiredError && error && error.type === 'required') {
        // clear error
        onChangeError({
          type,
          error: null,
        });
      }
    } else {
      // validate all rules
      onChangeError({
        type,
        error: requiredError
          ? { type: 'required', message: requiredError }
          : builtInTypeError
            ? { type: 'type', message: builtInTypeError }
            : null,
      });
    }
  }
};

export default validateItem;
