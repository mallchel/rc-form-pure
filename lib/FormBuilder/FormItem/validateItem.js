'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var validateItem = function validateItem(_ref) {
  var rules = _ref.rules,
    type = _ref.type,
    value = _ref.value,
    callback = _ref.callback,
    error = _ref.error,
    onChangeError = _ref.onChangeError;

  // in order of increasing priority
  var builtInTypeError = null;
  var requiredError = null;
  var userValidatorExist = false;

  // validation only the required fields if it is empty or if the value exists
  if (!value) {
    var requiredRule = rules.find(function(rule) {
      return rule.builtInType === 'required';
    });
    requiredRule &&
      requiredRule.validator({ message: requiredRule.message }, value, function(
        message
      ) {
        return (requiredError = message);
      });

    return onChangeError({
      type: type,
      error: requiredError
        ? { type: 'required', message: requiredError }
        : null,
    });
  }

  if (rules.length) {
    rules.forEach(function(_ref2) {
      var builtInType = _ref2.builtInType,
        validator = _ref2.validator,
        message = _ref2.message;

      switch (builtInType) {
        case 'required':
          validator({ message: message }, value, function(message) {
            return (requiredError = message);
          });
          break;

        case 'validator':
          // user's validator
          validator(
            { message: message },
            value,
            function(message) {
              return callback(
                message
                // {
                // type,
                // error: message,
                // }
              );
            },
            error
          );
          userValidatorExist = true;
          break;

        default:
          validator({ message: message }, value, function(message) {
            return (builtInTypeError = message);
          });
          break;
      }
    });

    if (userValidatorExist) {
      if (!requiredError && error && error.type === 'required') {
        // clear error
        onChangeError({
          type: type,
          error: null,
        });
      }
    } else {
      // validate all rules
      onChangeError({
        type: type,
        error: requiredError
          ? { type: 'required', message: requiredError }
          : builtInTypeError
            ? { type: 'type', message: builtInTypeError }
            : null,
      });
    }
  } else {
    onChangeError({
      type: type,
      error: null,
    });
  }
};

exports.default = validateItem;
