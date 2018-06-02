const validateItem = ({
  rules,
  type,
  value,
  callback,
  mirroredRules,
  error,
  onChangeError,
}) => {
  // in order of increasing priority
  let newError = null;
  let requiredError = null;
  let userValidatorExist = false;

  rules.forEach(({ builtInType, validator }) => {
    switch (builtInType) {
      case 'required':
        requiredError = validator({ value });
        break;

      case 'validator':
        validator(mirroredRules, value, message =>
          callback({ type: 'validator', message })
        ); // user's validator
        userValidatorExist = true;
        break;

      default:
        newError = validator({ value });
        break;
    }
  });

  if (userValidatorExist) {
    // validate only required field
    if (requiredError) {
      onChangeError({
        type,
        error: { type: 'required', message: requiredError },
      });
    } else if (error && error.type === 'required') {
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
        : { type: 'required', message: newError },
    });
  }
};

export default validateItem;
