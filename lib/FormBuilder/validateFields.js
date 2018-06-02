'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var required = function required(value) {
  return !!value;
};

var email = function email(rule, value) {
  var regexpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    typeof value === 'string' &&
    !!value.match(regexpEmail) &&
    value.length < 255
  );
};

var number = function number(rule, value) {
  if (isNaN(value)) {
    return false;
  }
  return typeof value === 'number';
};

var len = function len(rule, value) {
  return typeof rule.len === 'number' && value.length === rule.len;
};

var validateByType = (exports.validateByType = {
  required: required,
  email: email,
  number: number,
  len: len,
});

exports.default = function(type) {
  return function(rule, value) {
    return validateByType[type] ? validateByType[type](rule, value) : value;
  };
};
