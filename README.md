# rc-form-pure
library for creating forms that allows you to make your components pure

## Install
npm i rc-form-pure

## Usage
```js
import FormBuilder from 'rc-form-pure';

class TestFrom extends React.Component {
  state = {
    initialValues: {
      firstName: 'initial firstName',
      lastName: 'initial lastName',
    },
    errors: { lastName: 'something error text' },
    fieldsConfig: [
      {
        type: 'firstName',
        required: true,
        children: props => <TextField {...props} />,
      },
      {
        type: 'lastName',
        required: true,
        children: props => <TextField {...props} />,
      },
    ],
  };

  onSubmit = formData => {
    console.log('onSubmit', formData);
  };

  renderSubmitComponent = onSubmit => {
    return <button onClick={onSubmit}>Submit your form :)</button>;
  };

  render() {
    return (
      <FormBuilder
        onSubmit={this.onSubmit}
        fieldsConfig={this.state.fieldsConfig}
        initialValues={this.state.initialValues}
        errors={this.state.errors}
        withForm={true}
        submitComponent={this.renderSubmitComponent}
      />
    );
  }
}

const TextField = ({ value, type, valid, onChange }) => {
  return (
    <input
      key={type}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};
```

## API

| Property    | Description                              | Type       | Default |
|-----------|------------------------------------------|------------|---------|
| onSubmit | Called when the form is submitted | Function({ values, errors })) | - |
| fieldsConfig | Includes config for fields. [{ type: string, required: boolean, children: function(props) => ReactNode }] | object[] | [] |
| initialValues | You can specify initial values | object | - |
| values | You can replace values at any times | object | - |
| errors | You can specify errors | object | - |
| renderForm | You can specify a function that can return a custom form tag | Function({ onSubmit, children }) => ReactNode | Function({ children }) => children |
| withForm | Specifies whether the form tag in the DOM | boolean | Function({ onSubmit, children }) => <form onSubmit={onSubmit}>{children}</form>
| submitComponent | You can specify a function that can return a component for submitting your form | Function({ onSubmit, isFieldsTouched }) => ReactNode | - |
