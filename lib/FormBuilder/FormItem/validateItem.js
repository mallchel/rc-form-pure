'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var validateItem = function validateItem(_ref) {
  var rules = _ref.rules,
    type = _ref.type,
    value = _ref.value,
    callback = _ref.callback,
    mirroredRules = _ref.mirroredRules,
    error = _ref.error,
    onChangeError = _ref.onChangeError;

  // in order of increasing priority
  var newError = null;
  var requiredError = null;
  var userValidatorExist = false;

  rules.forEach(function(_ref2) {
    var builtInType = _ref2.builtInType,
      validator = _ref2.validator;

    switch (builtInType) {
      case 'required':
        requiredError = validator({ value: value });
        break;

      case 'validator':
        validator(mirroredRules, value, function(message) {
          return callback({ type: 'validator', message: message });
        }); // user's validator
        userValidatorExist = true;
        break;

      default:
        newError = validator({ value: value });
        break;
    }
  });

  if (userValidatorExist) {
    // validate only required field
    if (requiredError) {
      onChangeError({
        type: type,
        error: { type: 'required', message: requiredError },
      });
    } else if (error && error.type === 'required') {
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
        : { type: 'type', message: newError },
    });
  }
};

exports.default = validateItem;
