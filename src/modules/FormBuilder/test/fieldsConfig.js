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
      { required: true, message: 'Please fill this field' },
      {
        validator: (rules, value, callback) => {
          setTimeout(() => {
            callback('Error validator!!');
          }, 500);
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
      { required: true, message: 'Please fill this field' },
      { type: 'email', message: 'incorrect email' },
    ],
    children: props => <TextField {...props} />,
  },
  password: {
    rules: [
      { required: true, message: 'Please fill this field' },
      { len: 10, message: 'string length must be equal 10' },
    ],
    children: props => <TextField {...props} />,
  },
};
