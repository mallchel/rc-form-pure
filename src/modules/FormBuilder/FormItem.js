import React from 'react';
import PropTypes from 'prop-types';

const checkRequired = (value = '') => {
  return !!value;
};

export default class FormItem extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    validate: PropTypes.func,
    valid: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
  };

  onChange = ({ value, type }) => {
    const updates = {
      value,
      type,
    };

    if (this.props.required && !checkRequired(value)) {
      updates.error = { [type]: true };
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
