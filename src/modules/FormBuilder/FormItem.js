import React from 'react';
import PropTypes from 'prop-types';

import validateFields from './validateFields';

const checkRequired = (value = '') => {
  return !!value;
};

const builtInRules = {
  required: ({ message }) => ({
    message,
  }),
  type: ({
    type: typeField,
    message,
    validator = validateFields(typeField), // if provide custom validator
  }) => ({
    message,
    validator,
  }),
  validator: ({ validator = i => i }) => {
    if (!(typeof validator === 'function')) {
      console.error(new Error('validator must be a function'));
    }

    return validator;
  },
};

const findBuiltInRules = rules => {
  const newRulesToState = {};

  for (let key in builtInRules) {
    const foundRule = rules.find(rule => !!rule[key]);
    foundRule && (newRulesToState[key] = builtInRules[key](foundRule));
  }

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
  };

  static defaultProps = {
    rules: [],
  };

  state = {
    mirroredRules: [],
    rules: {
      required: {},
      type: {},
      validator: {},
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.rules !== prevState.mirroredRules) {
      return {
        mirroredRules: nextProps.rules,
        rules: computeRulesFromProps(nextProps.rules),
      };
    }

    return null;
  }

  onChange = value => {
    const { type } = this.props;
    const updates = {
      value,
      type,
    };

    const { rules } = this.state;

    if (rules.required && !checkRequired(value)) {
      updates.error = { [type]: rules.required.message };
    }

    // TODO: add validation logic here
    // updates.error = rules.type && validateFields({ type, value });
    // validate
    //   ? validate({ type, value, required })
    //   : validateField({ type, value, required });

    this.props.onChange(updates);
  };

  render() {
    const { children, ...props } = this.props;

    return children({
      ...props,
      onChange: this.onChange,
      required: this.state.rules.required ? true : false,
    });
  }
}
