# rc-form-pure

Performant, flexible, lightweight and abstract library for creating React forms

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
import {
  FormBuilder,
  FormItem,
  Validators,
  useValidators,
  ButtonSubmit,
  ComponentPropTypes,
  ErrorsType,
  IFieldsToSubmit,
  OnChangeFieldsType,
  FormBuilderPropTypes,
} from 'rc-form-pure';

type MyExtraPropTypes = {
  extraProps: boolean,
};
const TextField: ComponentPropTypes<MyExtraPropTypes> = props => {
  const { error, onChange } = props;

  return (
    <div className={styles.textFieldContainer}>
      <input {...props} onChange={e => onChange(e.target.value)} />
      {error}
    </div>
  );
};

const onSubmit = values => {
  console.log('onSubmit', values);
};
const onChangeFields: OnChangeFieldsType = updates => {
  console.log('onChangeFields', updates);
};
// example
const errors: ErrorsType = {
  firstName: 'asd',
};

const TestFrom = (props: FormBuilderPropTypes) => {
  return (
    <React.Fragment>
      <FormBuilder onSubmit={onSubmit} errors={props.errors} withForm={true} onChangeFields={onChangeFields}>
        <FormItem
          name={'firstName'}
          component={TextField}
          validate={Validators.required}
          errorMessage={'Please fill this field'}
          formatter={newValue => newValue.toUpperCase()}
          value={123}
        />

        <FormItem name={'lastName'} component={TextField} validate={Validators.required} placeholder={'Last Name'} />

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

| Property               | Description                                                                      | Type                                                                                                                                  | Default                                                                         |
| ---------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| onSubmit               | Called when the form is submitted                                                | Function(formValues, fieldsWithErrors)                                                                                                | -                                                                               |
| errors                 | You can specify errors                                                           | object                                                                                                                                | -                                                                               |
| renderForm             | You can specify a function that can return a custom form tag                     | Function({ onSubmit, children }) => ReactNode                                                                                         | Function({ children }) => children                                              |
| withForm               | Specifies whether the form tag in the DOM                                        | boolean                                                                                                                               | Function({ onSubmit, children }) => <form onSubmit={onSubmit}>{children}</form> |
| onChangeFields         | Specify a function that will be called when the value of the field gets changed. | Function(updates) or { [nameField]: (updates) => {} }                                                                                 | -                                                                               |
| formRef.setFields      | set any data to your fields config                                               | formBuilderRef.setFields({ fieldKey: { value: 'new' } })                                                                              |
| formRef.getFieldsValue | get values from your fields config                                               | formBuilderRef.getFieldsValue() to get all values or use formBuilderRef.getFieldsValue(fieldKey) to get the value of a specific field |

## Built-in Validators

| type              | Description                                    | Input type | Default |
| ----------------- | ---------------------------------------------- | ---------- | ------- |
| required          | check that value exist                         |            | -       |
| email             | check valid emails                             | string     | -       |
| number            | check value type                               | any        | -       |
| len               | validate an exact length of a field            | number     | -       |
| min               | validate a min number                          | number     | -       |
| composeValidators | compose your validators (custom and built-ins) | function[] | -       |
