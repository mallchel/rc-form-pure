'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var required = function required(value) {
  return !!value;
};

var email = function email(value) {
  var regexpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    typeof value === 'string' &&
    !!value.match(regexpEmail) &&
    value.length < 255
  );
};

var number = function number(value) {
  if (isNaN(value)) {
    return false;
  }
  return typeof value === 'number';
};

var len = function len(value, length) {
  return typeof length === 'number' && value.length === length;
};

var validateByType = (exports.validateByType = {
  required: required,
  email: email,
  number: number,
  len: len,
});

exports.default = function(type) {
  return function(value) {
    for (
      var _len = arguments.length,
        args = Array(_len > 1 ? _len - 1 : 0),
        _key = 1;
      _key < _len;
      _key++
    ) {
      args[_key - 1] = arguments[_key];
    }

    return validateByType[type]
      ? validateByType[type].apply(validateByType, [value].concat(args))
      : value;
  };
};
