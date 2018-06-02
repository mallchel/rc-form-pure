'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _validateFields = require('./validateFields');

var _validateFields2 = _interopRequireDefault(_validateFields);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var check = function check(value, message, validator) {
  for (
    var _len = arguments.length,
      args = Array(_len > 3 ? _len - 3 : 0),
      _key = 3;
    _key < _len;
    _key++
  ) {
    args[_key - 3] = arguments[_key];
  }

  if (!validator.apply(undefined, [value].concat(args))) {
    return message;
  }
  return null;
};

var builtInRules = {
  validator: {
    get: function get(_ref) {
      var _ref$validator = _ref.validator,
        validator =
          _ref$validator === undefined
            ? function(i) {
                return i;
              }
            : _ref$validator;

      if (!(typeof validator === 'function')) {
        console.error(new Error('validator must be a function'));
      }

      return {
        builtInType: 'validator',
        validator: validator,
      };
    },
  },
  type: {
    get: function get(_ref2) {
      var typeField = _ref2.type,
        message = _ref2.message,
        _ref2$validator = _ref2.validator,
        _validator =
          _ref2$validator === undefined
            ? (0, _validateFields2.default)(typeField)
            : _ref2$validator;

      return {
        builtInType: 'type',
        validator: function validator(_ref3) {
          var value = _ref3.value;
          return check(value, message, _validator);
        },
      };
    },
  },
  len: {
    get: function get(_ref4) {
      var len = _ref4.len,
        message = _ref4.message;
      return {
        builtInType: 'len',
        validator: function validator(_ref5) {
          var value = _ref5.value;
          return check(
            value,
            message,
            _validateFields.validateByType['len'],
            len
          );
        },
      };
    },
  },
  required: {
    get: function get(_ref6) {
      var message = _ref6.message,
        _ref6$validator = _ref6.validator,
        _validator2 =
          _ref6$validator === undefined
            ? _validateFields.validateByType['required']
            : _ref6$validator;

      return {
        builtInType: 'required',
        validator: function validator(_ref7) {
          var value = _ref7.value;
          return check(value, message, _validator2);
        },
      };
    },
  },
};

exports.default = builtInRules;
