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
  useFormApi,
} from 'rc-form-pure';

type MyExtraPropTypes = {
  extraProps: boolean,
};
const TextField: ComponentPropTypes<MyExtraPropTypes> = props => {
  const { name, error, onChange } = props;

  return (
    <div className={styles.textFieldContainer}>
      <label className={styles.label}>{name}</label>
      <input {...props} onChange={e => onChange(e.target.value)} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

const onSubmit = (formData: IFieldsToSubmit, fieldWithError: IFieldsToSubmit | null) => {
  console.log('onSubmit', formData, fieldWithError);
};

const renderForm = ({ onSubmit, children, values, errors, isFieldsTouched }: any) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};
const onChangeFields = (allFields: any, updatedFields: any) => {
  console.log('onChangeFields', allFields, updatedFields);
};
const errors: ErrorsType = {
  firstName: 'asd',
};
const withForm = true;
const validateOnBlur = true;

const FirstStepForm = () => {
  const onChangeFields: OnChangeFieldsType = (...args) => {
    console.log('My nested onChangeField callback on FormItem', ...args);
  };

  const { setFields, setFieldsValue, getFieldsValue } = useFormApi();

  console.log('External FormBuilder API', { setFields, setFieldsValue, getFieldsValue });

  return (
    <>
      <FormItem
        name={'fullName'}
        component={TextField}
        validate={Validators.required}
        errorMessage={'Please fill this field'}
        formatter={(newValue: string) => newValue.toUpperCase()}
        placeholder="Full Name"
        onChangeFields={onChangeFields}
      />

      <FormItem
        name={'lastName'}
        component={TextField}
        validate={Validators.required}
        formatter={(newValue: string) => newValue.toUpperCase()}
        placeholder="Last Name"
        initialValue="Leukhin"
      />

      <FormItem name={'my-profile-group'}>
        <FormItem
          name={'age'}
          component={TextField}
          validate={useValidators([Validators.required, Validators.min(18)])}
          type="number"
          // You can OVERRIDE global "validateOnBlur"
          validateOnBlur={false}
          placeholder="my-profile-group.age"
          errorMessage={['Field is required', 'Value should be more than 18']}
        />
        <FormItem name={'someField'} component={TextField} />
      </FormItem>
    </>
  );
};
const FinalStepForm = () => {
  return (
    <>
      <FormItem name={'my-profile-group.extraField'} component={TextField} />
    </>
  );
};
const formBySteps: { [key: string]: React.FunctionComponent } = {
  first: FirstStepForm,
  finalStep: FinalStepForm,
};
const props: FormBuilderPropTypes = {
  onSubmit,
  // Optional
  renderForm,
  onChangeFields,
  errors,
  withForm,
  validateOnBlur,
};
const TestFrom = () => {
  const [currentStep, changeStep] = useState('first');
  const FormFields = formBySteps[currentStep];
  const formRef = useRef < FormBuilder > null;

  return (
    <div className={styles.container}>
      <FormBuilder ref={formRef} {...props} initialValues={{ country: 'initial value from FromBuilder' }}>
        <FormItem
          name={'country'}
          component={TextField}
          validate={Validators.required}
          errorMessage={'Please fill this field'}
          placeholder="Your country"
        />

        <FormFields />

        <button type="button" onClick={() => changeStep(currentStep === 'first' ? 'finalStep' : 'first')}>
          Change form fields
        </button>
        <button type="button" onClick={() => console.log(formRef.current?.getFieldsValue())}>
          getFieldsValue: all fields
        </button>
        <button type="button" onClick={() => console.log(formRef.current?.getFieldsValue('country'))}>
          getFieldsValue: country field
        </button>
        <button
          type="button"
          onClick={() =>
            console.log(
              formRef.current?.setFieldsValue({
                fullName: 'set Full Name!!!!!!!!!!!!!!!!!!!',
                lastName: 'set new lastName',
              })
            )
          }
        >
          setFieldsValue to fullName and lastName
        </button>
        <button>onSubmit</button>
        <ButtonSubmit>Button submit without form tag</ButtonSubmit>
      </FormBuilder>
    </div>
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
