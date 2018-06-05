import React from 'react';
import PropTypes from 'prop-types';

import builtInRules from './builtInRules';
import validateItem from './validateItem';

const findBuiltInRules = rules => {
  const newRulesToState = [];

  rules.forEach(rule => {
    for (let key in rule) {
      builtInRules[key] && newRulesToState.push(builtInRules[key].get(rule));
    }
  });

  return newRulesToState;
};

const computeRulesFromProps = rules => {
  return findBuiltInRules(rules);
};

export default class FormItem extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    validate: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    rules: PropTypes.array,
    onChange: PropTypes.func,
    onChangeError: PropTypes.func,
  };

  static defaultProps = {
    rules: [],
  };

  state = {
    mirroredRules: [],
    rules: [],
    required: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.rules !== prevState.mirroredRules) {
      return {
        mirroredRules: nextProps.rules,
        rules: computeRulesFromProps(nextProps.rules),
        required: nextProps.rules.find(({ required }) => !!required)
          ? true
          : false,
      };
    }

    return null;
  }

  validatorCallback = ({ type }, error) => {
    Promise.resolve().then(() =>
      this.props.onChangeError({
        type,
        error,
      })
    );
  };

  onChange = value => {
    const { type, error } = this.props;
    const { rules, mirroredRules } = this.state;
    const updates = {
      value,
      type,
    };

    this.props.onChange(updates);
    validateItem({
      value,
      type,
      rules,
      callback: (...args) => this.validatorCallback({ type }, ...args),
      mirroredRules,
      error,
      onChangeError: this.props.onChangeError,
    });
  };

  render() {
    const {
      children = i => console.error('children must be is function', i) || null,
      onChangeError,
      error: { message } = {},
      ...props
    } = this.props;

    return children({
      ...props,
      onChange: this.onChange,
      required: this.state.required,
      error: message || this.props.error, // user's errors (without right structure)
    });
  }
}
