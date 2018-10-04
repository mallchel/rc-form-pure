'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _fieldsConfig = require('./fieldsConfig');

var _fieldsConfig2 = _interopRequireDefault(_fieldsConfig);

var _FormBuilder = require('../FormBuilder');

var _FormBuilder2 = _interopRequireDefault(_FormBuilder);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

test('renders without crashing', function() {
  // const div = document.createElement('div');
  var res = _reactTestRenderer2.default.create(
    _react2.default.createElement(_FormBuilder2.default, {
      onSubmit: function onSubmit() {},
      fieldsConfig: _fieldsConfig2.default,
    })
  );
  console.log(111, res.toJSON());
  // ReactDOM.unmountComponentAtNode(div);
});
