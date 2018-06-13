const validateItem = ({
  rules,
  type,
  value,
  callback,
  error,
  onChangeError,
}) => {
  // in order of increasing priority
  let newError = null;
  let requiredError = null;
  let userValidatorExist = false;

  if (rules.length) {
    rules.forEach(({ builtInType, validator, message }) => {
      switch (builtInType) {
        case 'required':
          requiredError = validator({ value });
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
          : newError
            ? { type: 'type', message: newError }
            : null,
      });
    }
  }
};

export default validateItem;
