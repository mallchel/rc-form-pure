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
    initialValues: {},
    values: {},
    errors: {},
  };

  state = {
    stateValues: { ...this.props.initialValues, ...this.props.values },
    mirroredValues: this.props.values,
    mirroredErrors: {},
    errors: {},
    isFieldsTouched: false,
  };

  refsValidateItem = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};

    if (nextProps.values !== prevState.mirroredValues) {
      newState.mirroredValues = nextProps.values;
      newState.stateValues = nextProps.values;
      newState.isFieldsTouched = false;
    }

    if (nextProps.errors !== prevState.mirroredErrors) {
      newState.mirroredErrors = nextProps.errors;
      newState.errors = nextProps.errors;
    }

    return newState;
  }

  onCheckError = ({ type, error, errors }) => {
    let newErrors;
    if (!error) {
      const { [type]: deletingError, ...restErrors } = errors;
      newErrors = restErrors;
    } else {
      newErrors = { ...errors, [type]: error };
    }

    return newErrors;
  };

  onChangeErrorToState = props => {
    this.setState({
      errors: this.onCheckError({ ...props, errors: this.state.errors }),
    });
  };

  setFieldValue = ({ type, value }) => {
    this.setState({
      stateValues: {
        ...this.state.stateValues,
        [type]: value,
      },
    });
  };

  onChange = ({ type, value }) => {
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

    const { fieldsConfig } = this.props;
    const { errors, stateValues } = this.state;
    let newErrors = { ...errors };

    const onErrorCb = result => {
      newErrors = this.onCheckError({ ...result, errors: newErrors });
    };

    Object.keys(fieldsConfig).forEach(type => {
      if (!([type] in errors)) {
        this.refsValidateItem[type]({
          value: stateValues[type],
          onChangeError: onErrorCb,
          callback: onErrorCb,
        });
      }
    });

    this.setState({
      errors: newErrors,
    });

    return this.props.onSubmit({
      values: this.state.stateValues,
      errors: Object.keys(newErrors).length === 0 ? null : newErrors,
    });
  };

  saveRefValidateItem = ({ type, onValidateItem }) => {
    this.refsValidateItem[type] = onValidateItem;
  };

  mapperConfig = (key, config, values, initialValues, errors) => {
    const value = values[key] || initialValues[key]; // to maintain control over the component
    const error = errors ? errors[key] : undefined;

    return (
      <FormItem
        saveRefValidateItem={this.saveRefValidateItem}
        key={key}
        type={key}
        {...config}
        error={error}
        value={value}
        onChange={this.onChange}
        onChangeError={this.onChangeErrorToState}
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
      initialValues,
    } = this.props;
    const { isFieldsTouched, stateValues, errors } = this.state;

    const content = this.renderLayout(
      fieldsConfig,
      layout,
      stateValues,
      initialValues,
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
