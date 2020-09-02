import { callValidateFunctions } from '../../helpers';

describe('call callValidateFunctions', () => {
  test('empty validate', () => {
    const result = callValidateFunctions({ value: '' });

    expect(result).toBe(null);
  });

  test('validate is fn', () => {
    const errorMessage = 'error';
    const result = callValidateFunctions({ value: '', validate: () => errorMessage });

    expect(result).toBe(errorMessage);
  });

  test('validate is array of fn', () => {
    const errorMessage = 'error';

    const result1 = callValidateFunctions({ value: '', validate: [() => null] });
    const result2 = callValidateFunctions({ value: '', validate: [() => errorMessage, () => null] });
    const result3 = callValidateFunctions({ value: '', validate: [() => null, () => errorMessage] });
    const result4 = callValidateFunctions({ value: '', validate: [() => null, () => errorMessage, () => null] });

    expect(result1).toBe(null);
    expect(result2).toBe(errorMessage);
    expect(result3).toBe(errorMessage);
    expect(result4).toBe(errorMessage);
  });

  test('validate is array, check error message', () => {
    const errorMessages = ['required', 'error'];
    const validators = [() => null, (value, error) => error];

    const result = callValidateFunctions({ value: '', validate: validators, errorMessage: errorMessages });

    expect(result).toBe(errorMessages[1]);
  });
});
