import React from 'react';
import PropTypes from 'prop-types';

import Form from './Form';
import FormItem from './FormItem';

export default class FormBuilder extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitComponent: PropTypes.func,
    fieldsConfig: PropTypes.object,
    initialValues: PropTypes.object,
    values: PropTypes.object,
    errors: PropTypes.object,
    renderForm: PropTypes.func,
    withForm: PropTypes.bool,
    layout: PropTypes.array,
  };

  static defaultProps = {
    fieldsConfig: {},
    layout: [],
    errors: {},
  };

  state = {
    stateValues: {},
    mirroredValues: {},
    mirroredErrors: {},
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

    if (nextProps.errors !== prevState.mirroredErrors) {
      newState.mirroredErrors = nextProps.errors;
      newState.errors = nextProps.errors;
    }

    return newState;
  }

  onChangeError = ({ type, error }) => {
    let newErrors;
    if (!error.message) {
      const { [type]: deletingError, ...restErrors } = this.state.errors;
      newErrors = restErrors;
    } else {
      newErrors = { ...this.state.errors, [type]: error };
    }
    this.setState({
      errors: newErrors,
    });
  };

  onChange = ({ type, value = this.state.stateValues[type] }) => {
    this.setState({
      stateValues: {
        ...this.state.stateValues,
        [type]: value,
      },
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

  mapperConfig = (key, config, values, errors) => {
    const value = values[key];
    const error = errors[key];

    return (
      <FormItem
        key={key}
        type={key}
        {...config}
        error={error}
        value={value}
        onChange={this.onChange}
        onChangeError={this.onChangeError}
      />
    );
  };

  renderLayout = (restConfigs, layout, ...args) => {
    let _restConfigs = restConfigs;

    const contentInLayout = layout.map(
      (
        { container: Container = ({ children }) => children, items = [] },
        index
      ) => {
        return (
          <Container
            key={index}
            children={items.map(key => {
              const { [key]: currentConfig, ...configs } = _restConfigs;
              _restConfigs = configs;

              return this.mapperConfig(key, currentConfig, ...args);
            })}
          />
        );
      }
    );

    const itemsWithoutLayout = Object.keys(_restConfigs);
    let otherContent = null;

    if (itemsWithoutLayout.length) {
      otherContent = itemsWithoutLayout.map(key => {
        return this.mapperConfig(key, _restConfigs[key], ...args);
      });
    }

    return (
      <React.Fragment>
        {contentInLayout}
        {otherContent}
      </React.Fragment>
    );
  };

  render() {
    const {
      withForm,
      renderForm = withForm ? Form : ({ children }) => children,
      submitComponent,
      fieldsConfig,
      layout,
    } = this.props;
    const { isFieldsTouched, stateValues, errors } = this.state;

    const content = this.renderLayout(
      fieldsConfig,
      layout,
      stateValues,
      errors
    );

    return renderForm({
      onSubmit: this.onSubmit,
      isFieldsTouched,
      errors,
      values: stateValues,
      children: (
        <React.Fragment>
          {content}
          {submitComponent &&
            submitComponent({
              onSubmit: this.onSubmit,
              isFieldsTouched,
              values: stateValues,
              errors,
            })}
        </React.Fragment>
      ),
    });
  }
}
