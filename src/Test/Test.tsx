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
  OnChangeFieldsType,
} from '../modules';

import styles from './styles.module.css';

type MyExtraPropTypes = {
  extraProps: boolean;
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
  const formRef = useRef<FormBuilder>(null);

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

export default TestFrom;
