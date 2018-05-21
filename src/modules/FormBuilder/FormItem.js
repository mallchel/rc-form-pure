import React from 'react';
import PropTypes from 'prop-types';

const checkRequired = (value = '') => {
  return !!value;
};

const getRulesFromProps = ({ rules }) => {
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

  componentDidMount() {
    const rules = getRulesFromProps(this.props);

    this.setState({
      rules,
    });
  }

  state = {
    rules: {
      required: {},
      type: {},
    },
  };

  onChange = ({ value, type }) => {
    const updates = {
      value,
      type,
    };

    const { rules } = this.state;

    if (rules.required && !checkRequired(value)) {
      updates.error = { [type]: rules.required.message };
    }

    // TODO: add validation logic here
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
