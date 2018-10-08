import validateFields, { validateByType } from './validateFields';

const check = ({ message }, value, callback, validator, ...args) => {
  if (!validator(value, ...args)) {
    return callback(message);
  }
  return callback(null);
};

// in order of decreasing priority
const builtInRules = [
  {
    builtInType: 'required',
    get: ({
      validator = (...args) => check(...args, validateByType['required']),
      message,
    }) => ({
      builtInType: 'required',
      validator,
      message,
    }),
  },
  {
    builtInType: 'type',
    get: ({
      type: typeField,
      message,
      validator = (...args) => check(...args, validateFields(typeField)), // if provide custom validator
    }) => ({
      builtInType: 'type',
      validator,
      message,
    }),
  },
  {
    builtInType: 'len',
    get: ({ len, message }) => ({
      builtInType: 'len',
      validator: (...args) => check(...args, validateByType['len'], len),
      message,
    }),
  },
  {
    builtInType: 'validator',
    get: ({ validator = i => i, message }) => {
      if (!(typeof validator === 'function')) {
        console.error(new Error('validator must be a function'));
      }

      return {
        builtInType: 'validator',
        validator,
        message,
      };
    },
  },
];

export default (rules = []) => {
  const newRulesToState = [];

  // right sequence
  rules.forEach(rule => {
    builtInRules.find(({ builtInType }, index) => {
      if (rule[builtInType]) {
        newRulesToState.push(builtInRules[index].get(rule));
        return true;
      }
      return false;
    });
  });

  return newRulesToState;
};
