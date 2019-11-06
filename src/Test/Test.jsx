import React from 'react';
import { FormBuilder, FormItem, Validators, useValidators, ButtonSubmit } from '../modules';

const TextField = props => {
  const { error, onChange } = props;

  return (
    <div>
      <input {...props} onChange={e => onChange(e.target.value)} />
      {error}
    </div>
  );
};

const state = {
  initialValues: {
    // data from server
    firstName: 'initial',
    lastName: 'initial',
    email: '',
    password: '',
  },
  values: { lastName: '' },
  errors: {
    firstName: 'asd',
  },
};
const onSubmit = formData => {
  console.log('onSubmit', formData);
};

// Optional
const renderForm = ({ onSubmit, children, values, errors, isFieldsTouched }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

const onChangeFields = updates => {
  console.log('onChangeFields', updates);
};

const TestFrom = () => {
  return (
    <React.Fragment>
      <FormBuilder
        validateOnBlur={true}
        // ref={node => (this.FormBuilder = node)}
        onSubmit={onSubmit}
        errors={state.errors}
        renderForm={renderForm}
        withForm={true}
        onChangeFields={onChangeFields}
      >
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

export default TestFrom;
