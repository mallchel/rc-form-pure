'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormItem = require('./FormItem');

var _FormItem2 = _interopRequireDefault(_FormItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormBuilder = function (_PureComponent) {
  _inherits(FormBuilder, _PureComponent);

  function FormBuilder() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormBuilder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormBuilder.__proto__ || Object.getPrototypeOf(FormBuilder)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      stateValues: {},
      values: {},
      errors: {}
    }, _this.onChange = function (_ref2) {
      var value = _ref2.value,
          type = _ref2.type,
          error = _ref2.error;

      var newErrors = void 0;
      if (!error) {
        var _this$state$errors = _this.state.errors,
            deletingError = _this$state$errors[type],
            restErrors = _objectWithoutProperties(_this$state$errors, [type]);

        newErrors = restErrors;
      } else {
        newErrors = _extends({}, _this.state.errors, error);
      }

      _this.setState({
        stateValues: _extends({}, _this.state.stateValues, _defineProperty({}, type, value)),
        errors: newErrors
      });
    }, _this.onSubmit = function (event) {
      event && event.preventDefault();

      _this.props.onSubmit({
        values: _this.state.stateValues,
        errors: Object.keys(_this.state.errors).length === 0 ? null : _this.state.errors
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FormBuilder, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          withForm = _props.withForm,
          _props$renderForm = _props.renderForm,
          renderForm = _props$renderForm === undefined ? withForm ? _Form2.default : function (_ref3) {
        var children = _ref3.children;
        return children;
      } : _props$renderForm,
          submitComponent = _props.submitComponent;


      return renderForm({
        onSubmit: this.onSubmit,
        children: _react2.default.createElement(
          _react2.default.Fragment,
          null,
          this.props.fieldsConfig.map(function (_ref4) {
            var type = _ref4.type,
                config = _objectWithoutProperties(_ref4, ['type']);

            var value = _this2.state.stateValues[type];
            var valid = !_this2.state.errors[type];

            return _react2.default.createElement(_FormItem2.default, _extends({
              key: type,
              type: type
            }, config, {
              valid: valid,
              value: value,
              onChange: _this2.onChange
            }));
          }),
          submitComponent && submitComponent(this.onSubmit)
        )
      });
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var newState = {};

      if (nextProps.values !== prevState.values) {
        newState.values = nextProps.values;
        newState.stateValues = _extends({}, nextProps.initialValues, prevState.stateValues, nextProps.values);
      }

      if (nextProps.errors !== prevState.errors) {
        newState.errors = nextProps.errors;
      }

      return newState;
    }
  }]);

  return FormBuilder;
}(_react.PureComponent);

FormBuilder.propTypes = {
  onSubmit: _propTypes2.default.func.isRequired,
  submitComponent: _propTypes2.default.func,
  fieldsConfig: _propTypes2.default.array,
  initialValues: _propTypes2.default.object,
  values: _propTypes2.default.object,
  errors: _propTypes2.default.object,
  renderForm: _propTypes2.default.func,
  withForm: _propTypes2.default.bool
};
FormBuilder.defaultProps = {
  fieldsConfig: []
};
exports.default = FormBuilder;