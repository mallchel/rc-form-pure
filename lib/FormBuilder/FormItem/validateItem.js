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

  // validation only the required fields if it is empty
  if (!value) {
    var requiredRule = rules.find(function(rule) {
      return rule.builtInType === 'required';
    });
    if (requiredRule) {
      requiredRule.validator({ message: requiredRule.message }, value, function(
        message
      ) {
        return (requiredError = message);
      });
    }

    return onChangeError({
      type: type,
      error: requiredError,
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
          validator({ message: message }, value, function(message) {
            return callback(message);
          });
          break;

        default:
          validator({ message: message }, value, function(message) {
            return (builtInTypeError = message);
          });
          break;
      }
    });

    // validate all rules
    // priority by required rules
    onChangeError({
      type: type,
      error: requiredError || builtInTypeError,
    });
  } else {
    return onChangeError({
      type: type,
      error: null,
    });
  }
};

exports.default = validateItem;
