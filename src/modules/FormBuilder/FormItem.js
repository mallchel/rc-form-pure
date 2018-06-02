import React from 'react';
import PropTypes from 'prop-types';

import builtInRules from './builtInRules';

const findBuiltInRules = rules => {
  const newRulesToState = [];

  // save only to those with the highest priority
  builtInRules.find(({ builtInType }, index) => {
    const foundRule = rules.find(rule => !!rule[builtInType]);

    if (foundRule) {
      newRulesToState.push(builtInRules[index].get(foundRule));
      return true;
    }
    return false;
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

  validateItem = ({ rules, type, value, callback }) => {
    // get the rule with the highest priority
    rules[0] &&
      rules[0].validator({ rule: this.state.mirroredRules, value, callback });
  };

  validatorCallback = ({ type }, error) => {
    Promise.resolve().then(() =>
      this.props.onChangeError({
        type,
        error,
      })
    );
  };

  onChange = value => {
    const { type } = this.props;
    const { rules } = this.state;
    const updates = {
      value,
      type,
    };

    this.props.onChange(updates);
    this.validateItem({
      value,
      type,
      rules,
      callback: (...args) => this.validatorCallback({ type }, ...args),
    });
  };

  render() {
    const { children, onChangeError, ...props } = this.props;

    return children({
      ...props,
      onChange: this.onChange,
      required: this.state.required,
    });
  }
}
