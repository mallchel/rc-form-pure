import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import FormBuilder from '../../FormBuilder';
import fieldsConfig from './fieldsConfig';

test('renders all fields without crashing', () => {
  // const result = TestRenderer.create(
  //   <FormBuilder onSubmit={() => {}} fieldsConfig={fieldsConfig} />
  // );
  // let tree = result.toJSON();
  // expect(tree).toHaveLength(Object.keys(fieldsConfig).length);
});

test('test withForm', () => {
  //   const onSubmit = ({ values, errors }) => {};
  //   const result = TestRenderer.create(
  //     <FormBuilder
  //       onSubmit={onSubmit}
  //       withForm={true}
  //       fieldsConfig={fieldsConfig}
  //     />
  //   );
  //   const form = result.root.findByType('form');
  //   form.props.onSubmit();
  // });
  // test('test validation onSubmit', () => {
  //   const expectedErrors = {
  //     firstName: 'Please fill firstName',
  //     email: 'Please fill email',
  //     password: 'Please fill password',
  //   };
  //   const onSubmit = ({ values, errors }) => {
  //     expect(Object.keys(errors).length).toEqual(Object.keys(errors).length);
  //     Object.keys(errors).forEach(errorKey => {
  //       expect(errors[errorKey]).toBe(expectedErrors[errorKey]);
  //     });
  //   };
  //   const result = TestRenderer.create(
  //     <FormBuilder
  //       onSubmit={onSubmit}
  //       withForm={true}
  //       fieldsConfig={fieldsConfig}
  //     />
  //   );
  //   const form = result.root.findByType('form');
  //   form.props.onSubmit();
});
