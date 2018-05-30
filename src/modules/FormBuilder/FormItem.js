import React from 'react';
import PropTypes from 'prop-types';

import validateFields from './validateFields';

const checkRequired = (value = '') => {
  return !!value;
};

const computeRulesFromProps = ({ rules }) => {
  const { required, message } = rules.find(rule => 'required' in rule) || {};
  const { type } = rules.find(rule => 'type' in rule) || {};

  return {
    required: required ? { message } : undefined,
    type,
  };
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
    },
  };

  componentDidMount() {
    const rules = computeRulesFromProps(this.props);

    this.setState({
      rules,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.rules !== prevState.mirroredRules) {
      return {
        mirroredRules: nextProps.rules,
        rules: computeRulesFromProps(nextProps),
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
    });
  }
}
