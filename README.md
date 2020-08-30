<p align="center">
  <a href="https://github.com/mallchel/rc-form-pure/" target="blank">
    <img src="https://i.ibb.co/XkTNDRS/rc-form-pure-logo.png" width="100" alt="rc-form-pure logo">
  </a>
</p>

<h3 align="center">
  RC FORM PURE
</h3>

<p align="center">
  Declarative forms for <a href="https://facebook.github.io/react">React</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/rc-form-pure"><img src="https://img.shields.io/npm/v/rc-form-pure?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/rc-form-pure"><img src="https://img.shields.io/npm/dm/rc-form-pure?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/rc-form-pure"><img src="https://img.shields.io/github/stars/mallchel/rc-form-pure?style=flat-square"></a>
  <a href="https://github.com/mallchel/rc-form-pure/actions"><img src="https://github.com/mallchel/rc-form-pure/workflows/CI/badge.svg?style=flat-square"></a>
</p>

# rc-form-pure

Performant, flexible, lightweight and abstract library for creating React forms

Bundle size (and comparison with similar other) - https://bundlephobia.com/result?p=rc-form-pure

## [Demo](https://codesandbox.io/s/brave-ritchie-8zwvu)

## Install

```
npm i rc-form-pure
```

## Usage

### Example

```ts
import React from 'react';
import { FormBuilder, FormItem, Validators, ComponentPropTypes, IFieldsToSubmit } from 'rc-form-pure';

const TextField: ComponentPropTypes<{}> = props => {
  const { name, onChange, error, value } = props;

  return (
    <>
      <label>{name}</label>
      <input value={value} onChange={e => onChange(e.target.value)} />
      {error}
    </>
  );
};

const TestFrom = () => {
  const onSubmit = (formData: IFieldsToSubmit, fieldWithError: IFieldsToSubmit | null) => {
    console.log('onSubmit', formData, fieldWithError);
  };

  return (
    <FormBuilder onSubmit={onSubmit} withForm>
      <FormItem name="country" component={TextField} />

      <FormItem
        name="required-field"
        validate={Validators.required}
        errorMessage={'Please fill this field'}
        component={TextField}
      />

      <button>onSubmit</button>
    </FormBuilder>
  );
};

export default TestFrom;
```

## FormBuilder Props

```ts
type FormBuilderPropTypes = {
  // Object schema: { currency: 'Your error text' }
  errors?: Record<string, string | null>;

  // Determines if the form tag will be in the DOM
  withForm?: boolean;

  // You can specify a function that returns a custom wrapper of form
  renderForm?: Function;

  // Submit function will get values and errors
  onSubmit: (values: IFieldsToSubmit, fieldsWithError: IFields | null) => Promise<any> | void;

  // The top level listener for fields changes Function(allFields, updatedFields) or { [nameField]: (specificfield, allFields) => {}
  onChangeFields?: OnChangeFieldsType;

  // Validate after onBlur or after every change can be overridden in the FormItem props
  validateOnBlur?: boolean;

  // initial values
  initialValues?: Record<PickPropType<IField, 'name'>, any>;

  // extra props will be mixed with service IField properties
  extraFieldsProps?: Record<PickPropType<IField, 'name'>, any>;
};
```

## FormItem Props

```ts
type FormItemTypes = {
  // The field name in the FormBuilder state
  name: string;

  // Your component
  component?: ComponentPropTypes<any>;

  // The formatter will be called before being saved to the FormBuilder state
  formatter?: (value: any) => any;

  // Override global validateOnBlur for some field
  validateOnBlur?: boolean;

  // function type of (value: any, message: string | string[]) => null | string | string[]
  validate?: ValidateType;

  // The error message that will appear when validation fails
  errorMessage?: ErrorMessageType;

  // Override global initialValue
  initialValue?: any;
};
```

There are several [built-in Validators](#built-in-validators) for convenience

## API

### useFormApi

```ts
const { setFields, setFieldsValue, getFieldsValue, useWatchFields, useWatchValue } = useFormApi();
```

#### setFields `(updates: Record<string, Partial<IField>>) => void`

```ts
// resetting value and error:
setFields({
  [FIELDS_CONFIG.currency.key]: { value: '', error: null },
});
```

#### setFieldsValue `(updates: Record<string, any>) => void`

```ts
// setting a new value:
setFieldsValue({ [FIELDS_CONFIG.currency.key]: '$' });
```

#### getFieldsValue `(fieldKey?: string) => IFieldsToSubmit | PickPropType<IField, 'value'>`

```ts
// get all values:
const formFields: IFieldsToSubmit = getFieldsValue();

// get the value of a specific field:
const formFields: any = getFieldsValue(FIELDS_CONFIG.currency.key);
```

#### useWatchFields `(fieldKey?: string) => Array<specificField, allFields> | Array<allFields, updatedFields>`

```ts
// invoked when a specific field changes
const [countryField, allFields] = useWatchFields('country');

// invoked on any fields changes
const [allFields, updatedFields] = useWatchFields();
```

#### useWatchValue `(fieldKey?: string) => Record<string, any> | any`

```ts
// watch a specific field value
const countryValue = useWatchValue('country');

// watch all values
const allValues = useWatchValue();
```

### formRef

You can get the form external API on the form level via useRef

```ts
const formRef = useRef<FormBuilder>(null);

formRef.current?.setFields;
formRef.current?.setFieldsValue;
formRef.current?.getFields;
formRef.current?.getFieldsValue;
```

## ButtonSubmit component

If you don't have a \<form\> tag, put the ButtonSubmit component in the FormBuilder tag to trigger your form submission

```ts
<FormBuilder>
  <FormItem name={'country'} component={TextField} />

  <ButtonSubmit>Button submit without form tag</ButtonSubmit>
</FormBuilder>
```

## Built-in Validators

| type              | Description                                    | Input type | Default |
| ----------------- | ---------------------------------------------- | ---------- | ------- |
| required          | check that value exist                         |            | -       |
| email             | check valid emails                             | string     | -       |
| number            | check value type                               | any        | -       |
| len               | validate an exact length of a field            | number     | -       |
| min               | validate a min number                          | number     | -       |
| composeValidators | compose your validators (custom and built-ins) | function[] | -       |
