import React from 'react';
import PropTypes from 'prop-types';

import Form from './Form';
import FormItem from './FormItem';

export default class FormBuilder extends React.Component {
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

  static defaultProps = {
    fieldsConfig: [],
    errors: {},
  };

  state = {
    stateValues: {},
    mirroredValues: {},
    errors: {},
    isFieldsTouched: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};

    if (nextProps.values !== prevState.mirroredValues) {
      newState.mirroredValues = nextProps.values;
      newState.stateValues = {
        ...nextProps.initialValues,
        ...prevState.stateValues,
        ...nextProps.values,
      };
      newState.isFieldsTouched = false;
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
      isFieldsTouched: true,
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
      submitComponent,
    } = this.props;

    return renderForm({
      onSubmit: this.onSubmit,
      children: (
        <React.Fragment>
          {this.props.fieldsConfig.map(({ type, ...config }) => {
            const value = this.state.stateValues[type];
            const error = this.state.errors[type];

            return (
              <FormItem
                key={type}
                type={type}
                {...config}
                error={error}
                value={value}
                onChange={this.onChange}
              />
            );
          })}

          {submitComponent &&
            submitComponent({
              onSubmit: this.onSubmit,
              isFieldsTouched: this.state.isFieldsTouched,
            })}
        </React.Fragment>
      ),
    });
  }
}
