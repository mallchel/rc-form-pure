import React, { Component } from 'react';
import FormBuilder from '../modules/FormBuilder';

class TextField extends React.PureComponent {
  render() {
    const { value, type, error, onChange, required } = this.props;
    console.log(value, type, error, required);
    return (
      <input
        key={type}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    );
  }
}

export default class TestFrom extends Component {
  state = {
    initialValues: {
      // data from server
      firstName: 'initial',
      lastName: 'initial',
    },
    values: { lastName: 'lastName' },
    errors: { lastName: 'This lastName is already exists' },
    fieldsConfig: {
      firstName: {
        rules: [
          { required: true, message: 'Please fill in this field' },
          {
            validator: (...args) => console.log(...args),
          },
        ],
        children: props => <TextField {...props} />,
      },
      lastName: {
        children: props => <TextField {...props} />,
      },
    },
  };

  onSubmit = formData => {
    console.log('onSubmit', formData);
  };

  renderForm = ({ onSubmit, children }) => {
    return <form onSubmit={onSubmit}>{children}</form>;
  };

  renderSubmitComponent = ({ onSubmit, isFieldsTouched }) => {
    return (
      <button disabled={!isFieldsTouched} onClick={onSubmit}>
        Submit :)
      </button>
    );
  };

  onClickError = () => {
    this.setState({
      errors: { firstName: 'test' },
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

  render() {
    return (
      <React.Fragment>
        <FormBuilder
          onSubmit={this.onSubmit}
          fieldsConfig={this.state.fieldsConfig}
          initialValues={this.state.initialValues}
          values={this.state.values}
          errors={this.state.errors}
          renderForm={this.renderForm}
          withForm={true}
          submitComponent={this.renderSubmitComponent}
          layout={[
            {
              container: this.renderContainer,
              items: ['firstName'],
            },
          ]}
        />
        <button onClick={this.onClickError}>get new Errors from server</button>
        <button onClick={this.onClickValues}>get new values</button>
      </React.Fragment>
    );
  }
}
