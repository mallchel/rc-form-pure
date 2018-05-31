# rc-form-pure

library for creating forms that allows you to make your components pure

[![npm](https://img.shields.io/npm/v/rc-form-pure.svg?style=flat-square)](https://www.npmjs.com/package/rc-form-pure)

## Install

```
  npm i rc-form-pure
```

## Usage

```js
import FormBuilder from 'rc-form-pure';

class TestFrom extends Component {
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
        // ... something props for your fields
        rules: [{ required: true, message: 'Please fill in this field' }],
        children: props => <TextField {...props} />,
      },
      lastName: {
        // ... something props for your fields
        children: props => <TextField {...props} />,
      },
    },
  };

  onSubmit = formData => {
    console.log('onSubmit', formData);
  };

  // Optional
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

  renderContainer = ({ children }) => {
    return <div>{children}</div>;
  };

  render() {
    return (
      <FormBuilder
        onSubmit={this.onSubmit}
        fieldsConfig={this.state.fieldsConfig}
        initialValues={this.state.initialValues}
        errors={this.state.errors}
        // Optional
        renderForm={this.renderForm}
        // by default return form html
        withForm={true}
        submitComponent={this.renderSubmitComponent}
        // Optional, you can group your fields
        layout={[
          {
            container: this.renderContainer,
            items: ['firstName'],
          },
        ]}
      />
    );
  }
}

const TextField = ({ value, type, valid, onChange, required }) => {
  return (
    <input key={type} value={value} onChange={e => onChange(e.target.value)} />
  );
};
```

## API

| Property        | Description                                                                       | Type                                                 | Default                                                                         |
| --------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| onSubmit        | Called when the form is submitted                                                 | Function({ values, errors }))                        | -                                                                               |
| fieldsConfig    | Includes config for fields. { { type:{ children: function(props) => ReactNode } } | object{}                                             | []                                                                              |
| initialValues   | You can specify initial values                                                    | object                                               | -                                                                               |
| values          | You can replace values at any times                                               | object                                               | -                                                                               |
| errors          | You can specify errors                                                            | object                                               | -                                                                               |
| renderForm      | You can specify a function that can return a custom form tag                      | Function({ onSubmit, children }) => ReactNode        | Function({ children }) => children                                              |
| withForm        | Specifies whether the form tag in the DOM                                         | boolean                                              | Function({ onSubmit, children }) => <form onSubmit={onSubmit}>{children}</form> |
| submitComponent | You can specify a function that can return a component for submitting your form   | Function({ onSubmit, isFieldsTouched }) => ReactNode | -                                                                               |
| layout          | You can group your fields                                                         | object[]                                             | []                                                                              |
