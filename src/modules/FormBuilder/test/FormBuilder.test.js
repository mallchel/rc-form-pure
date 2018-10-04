import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import fieldsConfig from './fieldsConfig';
import FormBuilder from '../FormBuilder';

it('renders all fields without crashing', () => {
  const result = TestRenderer.create(
    <FormBuilder onSubmit={() => {}} fieldsConfig={fieldsConfig} />
  );

  let tree = result.toJSON();
  expect(tree).toHaveLength(Object.keys(fieldsConfig).length);
});

it('test withForm', () => {
  const onSubmit = ({ values, errors }) => {};

  const result = TestRenderer.create(
    <FormBuilder
      onSubmit={onSubmit}
      withForm={true}
      fieldsConfig={fieldsConfig}
    />
  );

  const form = result.root.findByType('form');
  form.props.onSubmit();
});
