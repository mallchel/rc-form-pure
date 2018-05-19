import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Form from './Form';
import FormItem from './FormItem';

export default class FormBuilder extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitComponent: PropTypes.func,
    fieldsConfig: PropTypes.array,
    initialValues: PropTypes.object,
    values: PropTypes.object,
    errors: PropTypes.object,
    renderForm: PropTypes.func,
    withForm: PropTypes.bool,
  };

  state = {
    stateValues: {},
    values: {},
    errors: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};

    if (nextProps.values !== prevState.values) {
      newState.values = nextProps.values;
      newState.stateValues = {
        ...nextProps.initialValues,
        ...prevState.stateValues,
        ...nextProps.values,
      };
    }

    if (nextProps.errors !== prevState.errors) {
      newState.errors = nextProps.errors;
    }

    return newState;
  }

  onChange = ({ value, type, error }) => {
    let newErrors;
    if (!error) {
      const { [type]: deletingError, ...restErrors } = this.state.errors;
      newErrors = restErrors;
    } else {
      newErrors = { ...this.state.errors, ...error };
    }

    this.setState({
      stateValues: {
        ...this.state.stateValues,
        [type]: value,
      },
      errors: newErrors,
    });
  };

  onSubmit = event => {
    event && event.preventDefault();

    this.props.onSubmit({
      values: this.state.stateValues,
      errors:
        Object.keys(this.state.errors).length === 0 ? null : this.state.errors,
    });
  };

  render() {
    const {
      withForm,
      renderForm = withForm ? Form : ({ children }) => children,
    } = this.props;

    return renderForm({
      onSubmit: this.onSubmit,
      children: (
        <React.Fragment>
          {this.props.fieldsConfig.map(({ type, ...config }) => {
            const value = this.state.stateValues[type];
            const valid = !this.state.errors[type];

            return (
              <FormItem
                key={type}
                type={type}
                {...config}
                valid={valid}
                value={value}
                onChange={this.onChange}
              />
            );
          })}

          {this.props.submitComponent(this.onSubmit)}
        </React.Fragment>
      ),
    });
  }
}
