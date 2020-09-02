import { Validators } from '../../index';

describe('Validators class', () => {
  const baseErrorMessage = 'error';

  test('required check', () => {
    const result1 = Validators.required('', baseErrorMessage);
    expect(result1).toBe(baseErrorMessage);

    const result2 = Validators.required('value', baseErrorMessage);
    expect(result2).toBe(null);
  });

  test('email check', () => {
    const result1 = Validators.email('', baseErrorMessage);
    expect(result1).toBe(null);

    const result2 = Validators.email('asd', baseErrorMessage);
    expect(result2).toBe(baseErrorMessage);

    const result3 = Validators.email('example@gmail.com', baseErrorMessage);
    expect(result3).toBe(null);
  });

  test('number check', () => {
    const result1 = Validators.number('', baseErrorMessage);
    expect(result1).toBe(baseErrorMessage);

    const result2 = Validators.number('asd', baseErrorMessage);
    expect(result2).toBe(baseErrorMessage);

    const result3 = Validators.number(1, baseErrorMessage);
    expect(result3).toBe(null);

    const result4 = Validators.number(NaN, baseErrorMessage);
    expect(result4).toBe(baseErrorMessage);
  });

  test('len check', () => {
    const lenValidator = Validators.len(5);

    const result1 = lenValidator('', baseErrorMessage);
    expect(result1).toBe(baseErrorMessage);

    const result2 = lenValidator(NaN, baseErrorMessage);
    expect(result2).toBe(baseErrorMessage);

    const result3 = lenValidator(123, baseErrorMessage);
    expect(result3).toBe(baseErrorMessage);

    const result4 = lenValidator(123456, baseErrorMessage);
    expect(result4).toBe(baseErrorMessage);

    const result5 = lenValidator(12345, baseErrorMessage);
    expect(result5).toBe(null);
  });

  test('min check', () => {
    const minValidator = Validators.min(5);

    const result1 = minValidator(1, baseErrorMessage);
    expect(result1).toBe(baseErrorMessage);

    const result2 = minValidator(NaN, baseErrorMessage);
    expect(result2).toBe(baseErrorMessage);

    const result3 = minValidator(-6, baseErrorMessage);
    expect(result3).toBe(baseErrorMessage);

    const result4 = minValidator(5, baseErrorMessage);
    expect(result4).toBe(null);

    const result5 = minValidator(6, baseErrorMessage);
    expect(result5).toBe(null);
  });
});
