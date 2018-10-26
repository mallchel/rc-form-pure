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
            SubmitComponent = _props.submitComponent,
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
            children: _react2.default.createElement(
              _react2.default.Fragment,
              null,
              content,
              SubmitComponent &&
                _react2.default.createElement(SubmitComponent, {
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
          var newState = null;

          if (nextProps.values !== prevState.mirroredValues) {
            newState = {
              mirroredValues: nextProps.values,
              stateValues: nextProps.values,
              isFieldsTouched: false,
              errors: null, // remove errors, when received new values
            };
          }

          if (nextProps.errors !== prevState.mirroredErrors) {
            var errorCount = 0;
            var nextErrors = Object.keys(nextProps.fieldsConfig).reduce(
              function(acc, fieldKey) {
                if (nextProps.errors[fieldKey]) {
                  errorCount++;
                  acc[fieldKey] = nextProps.errors[fieldKey];
                }

                return acc;
              },
              {}
            );

            newState = _extends({}, newState, {
              mirroredErrors: nextProps.errors,
              errors: errorCount ? nextErrors : null,
            });
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
  onChangeFields: _propTypes2.default.func,
};
FormBuilder.defaultProps = {
  fieldsConfig: {},
  layout: [],
  initialValues: {},
  values: {},
  errors: null,
  onChangeFields: function onChangeFields() {},
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.state = {
    stateValues: _extends({}, this.props.initialValues, this.props.values),
    mirroredValues: this.props.values,
    mirroredErrors: null,
    errors: null,
    isFieldsTouched: false,
  };
  this.refsValidateItem = {};

  this.onCheckError = function(_ref3) {
    var type = _ref3.type,
      error = _ref3.error,
      errors = _ref3.errors;

    var newErrors = null;
    if (!error) {
      var _ref4 = errors || {},
        deletingError = _ref4[type],
        restErrors = _objectWithoutProperties(_ref4, [type]);

      newErrors = Object.keys(restErrors).length ? restErrors : null;
    } else {
      newErrors = _extends({}, errors, _defineProperty({}, type, error));
    }

    return newErrors;
  };

  this.onChangeErrorToState = function(props) {
    _this2.setState({
      errors: _this2.onCheckError(
        _extends({}, props, { errors: _this2.state.errors })
      ),
    });
  };

  this.setFieldsValue = function(updates) {
    // save current isFieldsTouched
    _this2.onChange({
      updates: updates,
      isFieldsTouched: _this2.state.isFieldsTouched,
    });
  };

  this.getFieldsValue = function() {
    return _this2.state.stateValues;
  };

  this.onChange = function(_ref5) {
    var updates = _ref5.updates,
      _ref5$isFieldsTouched = _ref5.isFieldsTouched,
      isFieldsTouched =
        _ref5$isFieldsTouched === undefined ? true : _ref5$isFieldsTouched;

    _this2.setState(
      function(state) {
        return {
          stateValues: _extends({}, state.stateValues, updates),
          isFieldsTouched: isFieldsTouched,
        };
      },
      function() {
        return _this2.props.onChangeFields(updates, _this2.state.stateValues);
      }
    );
  };

  this.onSubmit = function(event) {
    event && event.preventDefault && event.preventDefault();

    var fieldsConfig = _this2.props.fieldsConfig;
    var _state2 = _this2.state,
      errors = _state2.errors,
      stateValues = _state2.stateValues;

    var newErrors = _extends({}, errors);

    var onErrorCb = function onErrorCb(result) {
      newErrors = _this2.onCheckError(
        _extends({}, result, { errors: newErrors })
      );
    };

    Object.keys(fieldsConfig).forEach(function(type) {
      if (!([type] in (newErrors || {}))) {
        _this2.refsValidateItem[type]({
          value: stateValues[type],
          onChangeError: onErrorCb,
          callback: onErrorCb,
        });
      }
    });

    newErrors = newErrors && Object.keys(newErrors).length ? newErrors : null;

    _this2.setState({
      errors: newErrors,
    });

    return _this2.props.onSubmit({
      values: _this2.state.stateValues,
      errors: newErrors,
    });
  };

  this.saveRefValidateItem = function(_ref6) {
    var type = _ref6.type,
      onValidateItem = _ref6.onValidateItem;

    _this2.refsValidateItem[type] = onValidateItem;
  };

  this.mapperConfig = function(key, config, values, errors) {
    var value = values[key];
    var error = errors ? errors[key] : undefined;

    return _react2.default.createElement(
      _FormItem2.default,
      _extends(
        {
          saveRefValidateItem: _this2.saveRefValidateItem,
          key: key,
          type: key,
        },
        config,
        {
          error: error,
          value: value,
          onChange: _this2.onChange,
          onChangeError: _this2.onChangeErrorToState,
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

    var contentInLayout = layout.map(function(_ref7, index) {
      var _ref7$container = _ref7.container,
        Container =
          _ref7$container === undefined
            ? function(_ref8) {
                var children = _ref8.children;
                return children;
              }
            : _ref7$container,
        _ref7$items = _ref7.items,
        items = _ref7$items === undefined ? [] : _ref7$items;

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
