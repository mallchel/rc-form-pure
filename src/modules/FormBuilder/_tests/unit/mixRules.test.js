import parseRules from '../../FormItem/parseRules';
import validateItem from '../../FormItem/validateItem';

test('test required field with validator', (...args) => {
  const type = 'firstName';
  const rules = [
    { required: true, message: 'Please fill firstName' },
    { type: 'email', message: 'Email incorrect' },
    {
      validator: (rules, value, callback) => {
        if (Number(value)) {
          callback(rules.message);
        }
      },
      message: 'Value must be a string',
    },
  ];
  const requiredMessage = rules[0].message;
  const typeMessage = rules[1].message;
  const validatorMessage = rules[2].message;
  const formattedRules = parseRules(rules);
  let nextError = null;
  let resolver;
  const callback = new Promise(resolve => {
    resolver = resolve;
  });

  // for required
  validateItem({
    rules: formattedRules,
    type,
    value: '',
    error: null,
    onChangeError: error => (nextError = error),
  });
  expect(nextError.error).toBe(requiredMessage);

  // for type
  validateItem({
    rules: formattedRules,
    type,
    value: 'my@m.r',
    error: null,
    onChangeError: error => (nextError = error),
  });
  expect(nextError.error).toBe(typeMessage);

  // for validator (async validator)
  validateItem({
    rules: formattedRules,
    type,
    value: 1,
    callback: error => resolver(error),
    error: null,
    onChangeError: error => (nextError = error),
  });

  return callback.then(errorMessage =>
    expect(errorMessage).toBe(validatorMessage)
  );
});
