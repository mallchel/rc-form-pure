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
      {error}
    </div>
  );
};

const onSubmit = (formData: IFieldsToSubmit, fieldWithError: IFieldsToSubmit) => {
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
  return (
    <>
      <FormItem
        name={'fullName'}
        component={TextField}
        validate={Validators.required}
        errorMessage={'Please fill this field'}
        formatter={newValue => newValue.toUpperCase()}
        placeholder="Full Name"
      />

      <FormItem
        name={'lastName'}
        component={TextField}
        validate={Validators.required}
        formatter={newValue => newValue.toUpperCase()}
        placeholder="Last Name"
        value="Leukhin"
      />
      <FormItem
        name={'my-profile-group.age'}
        component={TextField}
        validate={useValidators([Validators.required, Validators.min(18)])}
        // You can OVERRIDE global "validateOnBlur"
        validateOnBlur={false}
        placeholder="my-profile-group.age"
        errorMessage={['Field is required', 'Value is not valid']}
      />
      <FormItem name={'my-profile-group.someField'} component={TextField} />
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
      <FormBuilder ref={formRef} {...props}>
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
        <button>onSubmit</button>
        <ButtonSubmit>Button submit without form tag</ButtonSubmit>
      </FormBuilder>
    </div>
  );
};

export default TestFrom;
