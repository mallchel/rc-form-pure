import validateFields, { validateByType } from './validateFields';

const check = (value, message, validator, cb) => {
  if (!validator(value)) {
    return cb(message);
  }
  return cb(null);
};

const builtInRules = [
  // in order of decreasing priority
  {
    builtInType: 'validator',
    get: ({ validator = i => i }) => {
      if (!(typeof validator === 'function')) {
        console.error(new Error('validator must be a function'));
      }

      return { validator };
    },
  },
  {
    builtInType: 'type',
    get: ({
      type: typeField,
      message,
      validator = validateFields(typeField), // if provide custom validator
    }) => ({
      message,
      validator: ({ value, callback }) =>
        check(value, message, validator, callback),
    }),
  },
  {
    builtInType: 'len',
    get: ({ len, message }) => ({
      length: len,
      message,
    }),
  },
  {
    builtInType: 'required',
    get: ({ message, validator = validateByType['required'] }) => ({
      message,
      validator: ({ value, callback }) =>
        check(value, message, validator, callback),
    }),
  },
];

export default builtInRules;
