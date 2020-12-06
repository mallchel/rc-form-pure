import React, { useState, useRef } from 'react';
import {
  FormBuilder,
  FormItem,
  Validators,
  useValidators,
  ButtonSubmit,
  ComponentPropTypes,
  ErrorsType,
  IFieldsToSubmit,
  FormBuilderPropTypes,
  useFormApi,
  OnChangeFieldsType,
} from '../modules';

import styles from './styles.module.css';

type MyExtraPropTypes = {
  disabled: boolean;
};
const TextField: ComponentPropTypes<MyExtraPropTypes> = props => {
  const { name, error, onChange, disabled, value, commonGlobalConfig, ...restProps } = props;

  return (
    <div className={styles.textFieldContainer}>
      <label className={styles.label}>{name}</label>
      <input
        {...restProps}
        disabled={disabled || commonGlobalConfig?.globalFormReadonly}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
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
const onChangeFields: OnChangeFieldsType = (allFields, updatedFields) => {
  console.log('onChangeFields', allFields, updatedFields);
};
const serverErrors: ErrorsType = {
  firstName: 'asd',
};
const withForm = true;
const validateOnBlur = true;

const FirstStepForm = () => {
  const { setFields, setFieldsValue, getFieldsValue, useWatchFields, useWatchValue } = useFormApi();
  const [countryField] = useWatchFields('country');
  const [allFields] = useWatchFields();
  const countryValue = useWatchValue('country');
  const allValues = useWatchValue();

  console.log('countryField and allFields===>', countryField, allFields);
  console.log('countryValue and allValues===>', countryValue, allValues);
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
      />

      <FormItem
        name={'firstName'}
        component={TextField}
        formatter={(newValue: string) => newValue.toUpperCase()}
        placeholder="First Name"
        initialValue="SEBASTIAN"
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
          validate={useValidators([Validators.required, Validators.min(18)])}
          type="number"
          // You can OVERRIDE global "validateOnBlur"
          validateOnBlur={false}
          placeholder="my-profile-group.age"
          errorMessage={['Field is required', 'Value should be more than 18']}
          component={TextField}
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
  // errors,
  withForm,
  validateOnBlur,
};
const TestFrom = () => {
  const [currentStep, changeStep] = useState('first');
  const FormFields = formBySteps[currentStep];
  const formRef = useRef<FormBuilder>(null);
  const [errors, setServerErrors] = useState<ErrorsType>(null);
  const [extraFieldsProps, setExtraFieldsProps] = useState<Object>({});

  return (
    <div className={styles.container}>
      <FormBuilder
        ref={formRef}
        {...props}
        errors={errors}
        initialValues={{ country: 'initial value from FromBuilder', 'my-profile-group.age': 0 }}
        extraFieldsProps={extraFieldsProps}
      >
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
        <button type="button" onClick={() => setServerErrors(serverErrors)}>
          set errors from server
        </button>
        <button
          type="button"
          onClick={() =>
            setExtraFieldsProps({
              $all: {
                globalFormReadonly: true,
              },
              country: {
                value: 'new value',
                disabled: true,
              },
            })
          }
        >
          set extraFieldsProps
        </button>

        <button>onSubmit</button>
        <ButtonSubmit>Button submit without form tag</ButtonSubmit>
      </FormBuilder>
    </div>
  );
};

export default TestFrom;
