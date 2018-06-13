'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _validateFields = require('./validateFields');

var _validateFields2 = _interopRequireDefault(_validateFields);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var check = function check(_ref, value, callback, validator) {
  for (
    var _len = arguments.length,
      args = Array(_len > 4 ? _len - 4 : 0),
      _key = 4;
    _key < _len;
    _key++
  ) {
    args[_key - 4] = arguments[_key];
  }

  var message = _ref.message;

  if (!validator.apply(undefined, [value].concat(args))) {
    return callback(message);
  }
  return null;
};

// in order of decreasing priority
var builtInRules = [
  {
    builtInType: 'required',
    get: function get(_ref2) {
      var _ref2$validator = _ref2.validator,
        validator =
          _ref2$validator === undefined
            ? function() {
                for (
                  var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
                  _key2 < _len2;
                  _key2++
                ) {
                  args[_key2] = arguments[_key2];
                }

                return check.apply(
                  undefined,
                  args.concat([_validateFields.validateByType['required']])
                );
              }
            : _ref2$validator,
        message = _ref2.message;
      return {
        builtInType: 'required',
        validator: validator,
        message: message,
      };
    },
  },
  {
    builtInType: 'type',
    get: function get(_ref3) {
      var typeField = _ref3.type,
        message = _ref3.message,
        _ref3$validator = _ref3.validator,
        validator =
          _ref3$validator === undefined
            ? function() {
                for (
                  var _len3 = arguments.length, args = Array(_len3), _key3 = 0;
                  _key3 < _len3;
                  _key3++
                ) {
                  args[_key3] = arguments[_key3];
                }

                return check.apply(
                  undefined,
                  args.concat([(0, _validateFields2.default)(typeField)])
                );
              }
            : _ref3$validator;
      return {
        builtInType: 'type',
        validator: validator,
        message: message,
      };
    },
  },
  {
    builtInType: 'len',
    get: function get(_ref4) {
      var len = _ref4.len,
        message = _ref4.message;
      return {
        builtInType: 'len',
        validator: function validator() {
          for (
            var _len4 = arguments.length, args = Array(_len4), _key4 = 0;
            _key4 < _len4;
            _key4++
          ) {
            args[_key4] = arguments[_key4];
          }

          return check.apply(
            undefined,
            args.concat([_validateFields.validateByType['len'], len])
          );
        },
        message: message,
      };
    },
  },
  {
    builtInType: 'validator',
    get: function get(_ref5) {
      var _ref5$validator = _ref5.validator,
        validator =
          _ref5$validator === undefined
            ? function(i) {
                return i;
              }
            : _ref5$validator,
        message = _ref5.message;

      if (!(typeof validator === 'function')) {
        console.error(new Error('validator must be a function'));
      }

      return {
        builtInType: 'validator',
        validator: validator,
        message: message,
      };
    },
  },
];

exports.default = builtInRules;
