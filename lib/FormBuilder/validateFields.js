"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var email = function email(value) {
  // do something
  return value;
};

var validateByType = {
  email: email
};

exports.default = function (type) {
  return function (value) {
    return validateByType[type] ? validateByType[type](value) : value;
  };
};