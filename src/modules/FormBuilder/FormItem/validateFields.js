const required = value => !!value;

const email = value => {
  const regexpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    typeof value === 'string' &&
    !!value.match(regexpEmail) &&
    value.length < 255
  );
};

const number = value => {
  if (isNaN(value)) {
    return false;
  }
  return typeof value === 'number';
};

const len = (value, length) =>
  typeof length === 'number' && value.length === length;

export const validateByType = {
  required,
  email,
  number,
  len,
};

export default type => (value, ...args) => {
  return validateByType[type] ? validateByType[type](value, ...args) : value;
};
