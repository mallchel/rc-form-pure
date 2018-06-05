'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormItem = require('./FormItem');

var _FormItem2 = _interopRequireDefault(_FormItem);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
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

var FormBuilder = (function(_React$Component) {
  _inherits(FormBuilder, _React$Component);

  function FormBuilder() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormBuilder);

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        (_ref =
          FormBuilder.__proto__ ||
          Object.getPrototypeOf(FormBuilder)).call.apply(
          _ref,
          [this].concat(args)
        )
      )),
      _this)),
      _initialiseProps.call(_this),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  _createClass(
    FormBuilder,
    [
      {
        key: 'render',
        value: function render() {
          var _props = this.props,
            withForm = _props.withForm,
            _props$renderForm = _props.renderForm,
            renderForm =
              _props$renderForm === undefined
                ? withForm
                  ? _Form2.default
                  : function(_ref2) {
                      var children = _ref2.children;
                      return children;
                    }
                : _props$renderForm,
            submitComponent = _props.submitComponent,
            fieldsConfig = _props.fieldsConfig,
            layout = _props.layout;
          var _state = this.state,
            isFieldsTouched = _state.isFieldsTouched,
            stateValues = _state.stateValues,
            errors = _state.errors;

          var content = this.renderLayout(
            fieldsConfig,
            layout,
            stateValues,
            errors
          );

          return renderForm({
            onSubmit: this.onSubmit,
            isFieldsTouched: isFieldsTouched,
            errors: errors,
            values: stateValues,
            children: _react2.default.createElement(
              _react2.default.Fragment,
              null,
              content,
              submitComponent &&
                submitComponent({
                  onSubmit: this.onSubmit,
                  isFieldsTouched: isFieldsTouched,
                  values: stateValues,
                  errors: errors,
                })
            ),
          });
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
          var newState = {};

          if (nextProps.values !== prevState.mirroredValues) {
            newState.mirroredValues = nextProps.values;
            newState.stateValues = _extends(
              {},
              nextProps.initialValues,
              prevState.stateValues,
              nextProps.values
            );
            newState.isFieldsTouched = false;
          }

          if (nextProps.errors !== prevState.mirroredErrors) {
            newState.mirroredErrors = nextProps.errors;
            newState.errors = nextProps.errors;
          }

          return newState;
        },
      },
    ]
  );

  return FormBuilder;
})(_react2.default.Component);

FormBuilder.propTypes = {
  onSubmit: _propTypes2.default.func.isRequired,
  submitComponent: _propTypes2.default.func,
  fieldsConfig: _propTypes2.default.object,
  initialValues: _propTypes2.default.object,
  values: _propTypes2.default.object,
  errors: _propTypes2.default.object,
  renderForm: _propTypes2.default.func,
  withForm: _propTypes2.default.bool,
  layout: _propTypes2.default.array,
};
FormBuilder.defaultProps = {
  fieldsConfig: {},
  layout: [],
  errors: {},
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.state = {
    stateValues: {},
    mirroredValues: {},
    mirroredErrors: {},
    errors: {},
    isFieldsTouched: false,
  };

  this.onChangeError = function(_ref3) {
    var type = _ref3.type,
      error = _ref3.error;

    var newErrors = void 0;
    if (!error) {
      var _state$errors = _this2.state.errors,
        deletingError = _state$errors[type],
        restErrors = _objectWithoutProperties(_state$errors, [type]);

      newErrors = restErrors;
    } else {
      newErrors = _extends(
        {},
        _this2.state.errors,
        _defineProperty({}, type, error)
      );
    }
    _this2.setState({
      errors: newErrors,
    });
  };

  this.onChange = function(_ref4) {
    var type = _ref4.type,
      _ref4$value = _ref4.value,
      value =
        _ref4$value === undefined
          ? _this2.state.stateValues[type]
          : _ref4$value;

    _this2.setState({
      stateValues: _extends(
        {},
        _this2.state.stateValues,
        _defineProperty({}, type, value)
      ),
      isFieldsTouched: true,
    });
  };

  this.onSubmit = function(event) {
    event && event.preventDefault();

    _this2.props.onSubmit({
      values: _this2.state.stateValues,
      errors:
        Object.keys(_this2.state.errors).length === 0
          ? null
          : _this2.state.errors,
    });
  };

  this.mapperConfig = function(key, config, values, errors) {
    var value = values[key];
    var error = errors[key];

    return _react2.default.createElement(
      _FormItem2.default,
      _extends(
        {
          key: key,
          type: key,
        },
        config,
        {
          error: error,
          value: value,
          onChange: _this2.onChange,
          onChangeError: _this2.onChangeError,
        }
      )
    );
  };

  this.renderLayout = function(restConfigs, layout) {
    for (
      var _len2 = arguments.length,
        args = Array(_len2 > 2 ? _len2 - 2 : 0),
        _key2 = 2;
      _key2 < _len2;
      _key2++
    ) {
      args[_key2 - 2] = arguments[_key2];
    }

    var _restConfigs = restConfigs;

    var contentInLayout = layout.map(function(_ref5, index) {
      var _ref5$container = _ref5.container,
        Container =
          _ref5$container === undefined
            ? function(_ref6) {
                var children = _ref6.children;
                return children;
              }
            : _ref5$container,
        _ref5$items = _ref5.items,
        items = _ref5$items === undefined ? [] : _ref5$items;

      return _react2.default.createElement(Container, {
        key: index,
        children: items.map(function(key) {
          var _restConfigs2 = _restConfigs,
            currentConfig = _restConfigs2[key],
            configs = _objectWithoutProperties(_restConfigs2, [key]);

          _restConfigs = configs;

          return _this2.mapperConfig.apply(
            _this2,
            [key, currentConfig].concat(args)
          );
        }),
      });
    });

    var itemsWithoutLayout = Object.keys(_restConfigs);
    var otherContent = null;

    if (itemsWithoutLayout.length) {
      otherContent = itemsWithoutLayout.map(function(key) {
        return _this2.mapperConfig.apply(
          _this2,
          [key, _restConfigs[key]].concat(args)
        );
      });
    }

    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      contentInLayout,
      otherContent
    );
  };
};

exports.default = FormBuilder;
