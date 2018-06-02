import validateFields, { validateByType } from './validateFields';

const check = (value, message, validator, ...args) => {
  if (!validator(value, ...args)) {
    return message;
  }
  return null;
};

const builtInRules = {
  validator: {
    get: ({ validator = i => i }) => {
      if (!(typeof validator === 'function')) {
        console.error(new Error('validator must be a function'));
      }

      return {
        builtInType: 'validator',
        validator,
      };
    },
  },
  type: {
    get: ({
      type: typeField,
      message,
      validator = validateFields(typeField), // if provide custom validator
    }) => ({
      builtInType: 'type',
      validator: ({ value }) => check(value, message, validator),
    }),
  },
  len: {
    get: ({ len, message }) => ({
      builtInType: 'len',
      validator: ({ value }) => {
        check(value, message, validateByType['len'], len);
      },
    }),
  },
  required: {
    get: ({ message, validator = validateByType['required'] }) => ({
      builtInType: 'required',
      validator: ({ value }) => check(value, message, validator),
    }),
  },
};

export default builtInRules;
