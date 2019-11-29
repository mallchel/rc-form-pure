# rc-form-pure

library for creating forms that allows you to make your components pure

```
npm i rc-form-pure
```

[![npm](https://img.shields.io/npm/v/rc-form-pure.svg?style=flat-square)](https://www.npmjs.com/package/rc-form-pure)

Bundle size (and comparison with similar other) - https://bundlephobia.com/result?p=rc-form-pure@next

## [Demo](https://codesandbox.io/s/wonderful-cloud-l1utr)

## Install

```
  npm i rc-form-pure
```

## Usage

### Simple

```js
import { FormBuilder, FormItem, Validators, useValidators, ButtonSubmit } from 'rc-form-pure';

const TextField = props => {
  const { error, onChange } = props;

  return (
    <div>
      <input {...props} onChange={e => onChange(e.target.value)} />
      {error}
    </div>
  );
};

const onSubmit = values => {
  console.log('onSubmit', values);
};
const onChangeFields = updates => {
  console.log('onChangeFields', updates);
};

const TestFrom = () => {
  const [errors, setErrors] = useState(null);

  return (
    <React.Fragment>
      <FormBuilder onSubmit={onSubmit} errors={errors} withForm={true} onChangeFields={onChangeFields}>
        <FormItem
          name={'firstName'}
          component={TextField}
          validate={Validators.required}
          errorMessage={'Please fill this field'}
          formatter={newValue => newValue.toUpperCase()}
          value={123}
        />

        <FormItem name={'lastName'} component={TextField} validate={Validators.required} />
        <FormItem
          name={'my-profile-group.age'}
          component={TextField}
          validate={useValidators([Validators.required, Validators.min(18)])}
          validateOnBlur={true}
          errorMessage={['Field is required', 'Value is not valid']}
        />
        <FormItem name={'my-profile-group.someField'} component={TextField} />

        <button>onSubmit</button>
        <ButtonSubmit>Button submit without form tag</ButtonSubmit>
      </FormBuilder>
    </React.Fragment>
  );
};
```

## API

| Property       | Description                                                                      | Type                                                  | Default                                                                         |
| -------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| onSubmit       | Called when the form is submitted                                                | Function(formValues)                                  | -                                                                               |
| errors         | You can specify errors                                                           | object                                                | -                                                                               |
| renderForm     | You can specify a function that can return a custom form tag                     | Function({ onSubmit, children }) => ReactNode         | Function({ children }) => children                                              |
| withForm       | Specifies whether the form tag in the DOM                                        | boolean                                               | Function({ onSubmit, children }) => <form onSubmit={onSubmit}>{children}</form> |
| onChangeFields | Specify a function that will be called when the value of the field gets changed. | Function(updates) or { [nameField]: (updates) => {} } | -                                                                               |

## Validation Rules

| Property  | Description                                  | Type                            | Default |
| --------- | -------------------------------------------- | ------------------------------- | ------- |
| len       | validate an exact length of a field          | number                          | -       |
| type      | built-in validation type ('email', 'number') | string                          | -       |
| validator | custom validate function                     | function(rule, value, callback) | -       |
