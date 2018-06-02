import React from 'react';
import PropTypes from 'prop-types';

import validateFields, { validateByType } from './validateFields';

const check = (value, message, validator, cb) => {
  if (!validator(value)) {
    return cb(message);
  }
  return cb(null);
};

const builtInRules = [
  // in order of decreasing priority
  {
    builtInType: 'validator',
    get: ({ validator = i => i }) => {
      if (!(typeof validator === 'function')) {
        console.error(new Error('validator must be a function'));
      }

      return { validator };
    },
  },
  {
    builtInType: 'type',
    get: ({
      type: typeField,
      message,
      validator = validateFields(typeField), // if provide custom validator
    }) => ({
      message,
      validator: ({ value, callback }) =>
        check(value, message, validator, callback),
    }),
  },
  {
    builtInType: 'len',
    validator: ({ len, message }) => ({
      length: len,
      message,
    }),
  },
  {
    builtInType: 'required',
    get: ({ message, validator = validateByType['required'] }) => ({
      message,
      validator: ({ value, callback }) =>
        check(value, message, validator, callback),
    }),
  },
];

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
