import React, { Component } from 'react';
import FormBuilder from '../modules/FormBuilder';

class TextField extends React.PureComponent {
  render() {
    const { value, type, valid, onChange } = this.props;

    return (
      <input
        key={type}
        value={value}
        onChange={e => onChange({ type, value: e.target.value })}
      />
    );
  }
}

export default class TestFrom extends Component {
  state = {
    initialValues: {
      // data from server
      firstName: 'initial firstName',
      lastName: 'initial lastName',
    },
    values: { lastName: 'Введите фамилию' },
    errors: { lastName: 'Такая фамилия уже существует' },
    fieldsConfig: [],
  };

  componentDidMount() {
    this.setState({
      fieldsConfig: this.state.fieldsConfig.concat(
        {
          type: 'firstName',
          required: true,
          children: props => <TextField {...props} />,
        },
        {
          type: 'lastName',
          required: true,
          children: props => <TextField {...props} />,
        }
      ),
    });
  }

  onSubmit = formData => {
    console.log('onSubmit', formData);
  };

  renderForm = ({ onSubmit, children }) => {
    return <form onSubmit={onSubmit}>{children}</form>;
  };

  renderSubmitComponent = onSubmit => {
    return <button onClick={onSubmit}>Submit :)</button>;
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
        />
        <button onClick={this.onClickError}>get new Errors from server</button>
        <button onClick={this.onClickValues}>get new values</button>
      </React.Fragment>
    );
  }
}
