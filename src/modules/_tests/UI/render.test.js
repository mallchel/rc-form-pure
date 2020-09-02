import React from 'react';
import TestRenderer from 'react-test-renderer';

import { FormBuilder, FormItem, Validators } from '../../index';

import { TextField } from './config';
import useValidators from '../../hooks/useValidators';

describe('Render the FormBuilder', () => {
  test('renders all fields without crashing', () => {
    const Test = () => (
      <FormBuilder>
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
      </FormBuilder>
    );
    const result = TestRenderer.create(<Test />);
    const tree = result.toJSON();
    expect(tree).toHaveLength(4);
  });

  test('test withForm', () => {
    const mockOnSubmit = jest.fn(() => {});

    const result = TestRenderer.create(
      <FormBuilder withForm onSubmit={mockOnSubmit}>
        <FormItem name={'someField'} component={TextField} />
      </FormBuilder>
    );

    const form = result.root.findByType('form');
    form.props.onSubmit();
    expect(mockOnSubmit.mock.calls.length).toBe(1);
  });

  test('test validation onSubmit', () => {
    const mockOnSubmit = jest.fn(() => {});

    const result = TestRenderer.create(
      <FormBuilder withForm onSubmit={mockOnSubmit}>
        <FormItem name={'requiredField'} validate={Validators.required} component={TextField} />
      </FormBuilder>
    );
    const form = result.root.findByType('form');

    setTimeout(() => {
      form.props.onSubmit();
      expect(mockOnSubmit.mock.calls.length).toBe(0);
    });
  });
});
