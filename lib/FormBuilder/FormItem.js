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

var _validateFields = require('./validateFields');

var _validateFields2 = _interopRequireDefault(_validateFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var checkRequired = function checkRequired() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return !!value;
};

var computeRulesFromProps = function computeRulesFromProps(_ref) {
  var rules = _ref.rules;

  var _ref2 = rules.find(function (rule) {
    return 'required' in rule;
  }) || {},
      required = _ref2.required,
      message = _ref2.message;

  var _ref3 = rules.find(function (rule) {
    return 'type' in rule;
  }) || {},
      type = _ref3.type;

  return {
    required: required ? { message: message } : undefined,
    type: type
  };
};

var FormItem = function (_React$PureComponent) {
  _inherits(FormItem, _React$PureComponent);

  function FormItem() {
    var _ref4;

    var _temp, _this, _ret;

    _classCallCheck(this, FormItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref4 = FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call.apply(_ref4, [this].concat(args))), _this), _this.state = {
      rules: {
        required: {},
        type: {}
      }
    }, _this.onChange = function (_ref5) {
      var value = _ref5.value,
          type = _ref5.type;

      var updates = {
        value: value,
        type: type
      };

      var rules = _this.state.rules;


      if (rules.required && !checkRequired(value)) {
        updates.error = _defineProperty({}, type, rules.required.message);
      }

      // TODO: add validation logic here
      // updates.error = rules.type && validateFields({ type, value });
      // validate
      //   ? validate({ type, value, required })
      //   : validateField({ type, value, required });

      _this.props.onChange(updates);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FormItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var rules = computeRulesFromProps(this.props);

      this.setState({
        rules: rules
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['children']);

      return children(_extends({}, props, {
        onChange: this.onChange
      }));
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.rules !== prevState.mirroredRules) {
        return {
          mirroredRules: nextProps.rules,
          rules: computeRulesFromProps(nextProps)
        };
      }

      return null;
    }
  }]);

  return FormItem;
}(_react2.default.PureComponent);

FormItem.propTypes = {
  type: _propTypes2.default.string,
  validate: _propTypes2.default.func,
  error: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  rules: _propTypes2.default.array,
  onChange: _propTypes2.default.func
};
FormItem.defaultProps = {
  rules: [],
  mirroredRules: []
};
exports.default = FormItem;