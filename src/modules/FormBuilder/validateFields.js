const email = value => {
  // do something
  return value;
};

const validateByType = {
  email,
};

export default ({ type, value }) => {
  return validateByType[type] ? validateByType[type](value) : value;
};
