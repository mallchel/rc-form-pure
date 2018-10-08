import React from 'react';

class TextField extends React.PureComponent {
  render() {
    const { value, type, error, onChange, required, validator } = this.props;

    return (
      <React.Fragment>
        <input
          key={type}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {error}
      </React.Fragment>
    );
  }
}

export default {
  firstName: {
    rules: [
      { required: true, message: 'Please fill firstName' },
      {
        validator: (rules, value, callback) => {
          callback('Error validator!!');
        },
      },
    ],
    children: props => <TextField {...props} />,
  },
  lastName: {
    children: props => <TextField {...props} />,
  },
  email: {
    rules: [
      { required: true, message: 'Please fill email' },
      { type: 'email', message: 'incorrect email' },
    ],
    children: props => <TextField {...props} />,
  },
  password: {
    rules: [
      { required: true, message: 'Please fill password' },
      { len: 10, message: 'string length must be equal 10' },
    ],
    children: props => <TextField {...props} />,
  },
};
