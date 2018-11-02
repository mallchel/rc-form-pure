import React, { Component } from 'react';
import FormBuilder from '../modules/FormBuilder';

class TextField extends React.PureComponent {
  render() {
    const {
      value,
      type,
      error,
      onChange,
      required,
      validator,
      ...props
    } = this.props;

    return (
      <div>
        <input
          {...props}
          key={type}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {error}
      </div>
    );
  }
}

export default class TestFrom extends Component {
  state = {
    initialValues: {
      // data from server
      firstName: 'initial',
      lastName: 'initial',
      email: '',
      password: '',
    },
    values: { lastName: '' },
    // errors: { lastName: 'This lastName is already exists' },
    fieldsConfig: {
      firstName: {
        rules: [
          { required: true, message: 'Please fill this field' },
          {
            validator: (rules, value, callback) => {
              setTimeout(() => {
                callback('Error validator!!');
              }, 500);
            },
          },
        ],
        children: props => <TextField {...props} />,
      },
      lastName: {
        children: props => <TextField {...props} />,
      },
      email: {
        rules: [
          { required: true, message: 'Please fill in your email' },
          { type: 'email', message: 'Email incorrect' },
          {
            validator: (rules, value, callback) => {
              if (Number(value)) {
                callback(rules.message);
              }
            },
            message: 'Value must be a string',
          },
        ],
        validateOnBlur: false,
        children: props => <TextField {...props} />,
      },
      password: {
        rules: [
          { required: true, message: 'Please fill this field' },
          { len: 10, message: 'string length must be equal 10' },
        ],
        children: props => <TextField {...props} />,
      },
    },
  };

  onSubmit = formData => {
    console.log('onSubmit', formData);
  };

  renderForm = ({ onSubmit, children, values, errors, isFieldsTouched }) => {
    return <form onSubmit={onSubmit}>{children}</form>;
  };

  renderSubmitComponent = ({ onSubmit, isFieldsTouched, values, errors }) => {
    return (
      <button disabled={!isFieldsTouched} onClick={onSubmit}>
        Submit :)
      </button>
    );
  };

  onClickError = () => {
    this.setState({
      errors: { firstName: 'testError', email: 'testError' },
    });
  };

  onClickValues = () => {
    this.setState({
      values: {
        firstName: 'Новые данные',
      },
    });
  };

  renderContainer = ({ children }) => {
    return <div>{children}</div>;
  };

  onClickSetValue = () => {
    this.FormBuilder.setFieldsValue({ firstName: '11111', lastName: '312312' });
  };

  onChangeFields = (updates, fieldsValue) => {
    console.log(updates, fieldsValue);
  };

  onCleanErrors = () => {
    this.setState({
      errors: null,
    });
  };

  render() {
    return (
      <React.Fragment>
        <FormBuilder
          validateOnBlur={true}
          ref={node => (this.FormBuilder = node)}
          onSubmit={this.onSubmit}
          fieldsConfig={this.state.fieldsConfig}
          initialValues={this.state.initialValues}
          values={this.state.values}
          errors={this.state.errors}
          renderForm={this.renderForm}
          withForm={true}
          submitComponent={this.renderSubmitComponent}
          onChangeFields={this.onChangeFields}
          layout={[
            {
              container: this.renderContainer,
              items: ['firstName'],
            },
          ]}
        />
        <button onClick={this.onClickError}>get new Errors from server</button>
        <button onClick={this.onClickValues}>get new values</button>
        <button onClick={this.onClickSetValue}>
          set new value for firstName
        </button>
        <button onClick={this.onCleanErrors}>clean errors</button>
      </React.Fragment>
    );
  }
}
