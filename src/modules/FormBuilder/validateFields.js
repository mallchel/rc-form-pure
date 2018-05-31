const required = value => !!value;

const email = (rule, value) => {
  const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    typeof value === 'string' &&
    !!value.match(regexpEmail) &&
    value.length < 255
  );
};

const number = (rule, value) => {
  if (isNaN(value)) {
    return false;
  }
  return typeof value === 'number';
};

const len = (length, value) =>
  typeof length === 'number' && value.length === length;

export const validateByType = {
  required,
  email,
  number,
  len,
};

export default type => (rule, value) => {
  return validateByType[type] ? validateByType[type](rule, value) : value;
};
