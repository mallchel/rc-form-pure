'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var TextField = (function(_React$PureComponent) {
  _inherits(TextField, _React$PureComponent);

  function TextField() {
    _classCallCheck(this, TextField);

    return _possibleConstructorReturn(
      this,
      (TextField.__proto__ || Object.getPrototypeOf(TextField)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(TextField, [
    {
      key: 'render',
      value: function render() {
        var _props = this.props,
          value = _props.value,
          type = _props.type,
          error = _props.error,
          _onChange = _props.onChange,
          required = _props.required,
          validator = _props.validator;

        console.log(value, type, error, required, validator);

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', {
            key: type,
            value: value,
            onChange: function onChange(e) {
              return _onChange(e.target.value);
            },
          }),
          error
        );
      },
    },
  ]);

  return TextField;
})(_react2.default.PureComponent);

exports.default = {
  firstName: {
    rules: [
      { required: true, message: 'Please fill this field' },
      {
        validator: function validator(rules, value, callback) {
          setTimeout(function() {
            callback('Error validator!!');
          }, 500);
        },
      },
    ],
    children: function children(props) {
      return _react2.default.createElement(TextField, props);
    },
  },
  lastName: {
    children: function children(props) {
      return _react2.default.createElement(TextField, props);
    },
  },
  email: {
    rules: [
      { required: true, message: 'Please fill this field' },
      { type: 'email', message: 'incorrect email' },
    ],
    children: function children(props) {
      return _react2.default.createElement(TextField, props);
    },
  },
  password: {
    rules: [
      { required: true, message: 'Please fill this field' },
      { len: 10, message: 'string length must be equal 10' },
    ],
    children: function children(props) {
      return _react2.default.createElement(TextField, props);
    },
  },
};
