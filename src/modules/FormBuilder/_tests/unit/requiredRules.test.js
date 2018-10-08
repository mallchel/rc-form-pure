import parseRules from '../../FormItem/parseRules';
import validateItem from '../../FormItem/validateItem';

test('required check', (...args) => {
  const type = 'firstName';
  const rules = [{ required: true, message: 'Please fill firstName' }];
  const requiredMessage = rules[0].message;
  const formattedRules = parseRules(rules);
  let nextError = null;

  validateItem({
    rules: formattedRules,
    type,
    value: '',
    error: null,
    onChangeError: error => (nextError = error),
  });
  expect(nextError.error).toBe(requiredMessage);
});

test('error without rules', (...args) => {
  const type = 'firstName';
  const rules = [];
  const requiredMessage = null;
  let nextError = null;

  validateItem({
    type,
    rules,
    value: '123',
    error: 'Error validator',
    onChangeError: error => (nextError = error),
  });
  expect(nextError.error).toBe(requiredMessage);
});

test('required rules with custom validator', (...args) => {
  const type = 'firstName';
  const requiredMessage = undefined;
  let nextError = null;

  const trimValidator = (rule, value = '', callback) => {
    if (!value.trim()) {
      return callback(rule.message);
    }
    return callback();
  };
  const rules = [
    {
      required: true,
      validator: trimValidator,
      message: 'Please fill in your first name',
    },
  ];
  const formattedRules = parseRules(rules);
  expect(formattedRules.length).toBe(1);

  validateItem({
    type,
    rules,
    value: 'Joe',
    onChangeError: error => (nextError = error),
  });
  expect(nextError.error).toBe(requiredMessage);

  // there will be an error with spaces
  validateItem({
    type,
    rules,
    value: '    ',
    onChangeError: error => (nextError = error),
  });
  expect(nextError.error).toBe(rules[0].message);
});
