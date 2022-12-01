import { generateUuid, generateValue, generateSentence, getParameterValue } from '../../../../src/utils/tests/generate';
import { validateIban } from '../../../../src/helpers/ibanValidator';
import env from '../../../../src/helpers/environmentVariables';
import { DateTime } from 'luxon';

describe('Verify generateUuid() method', () => {
  test('Should verify that generateUuid() is matching regexp', () => {
    const regexp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    expect(generateUuid()).toMatch(regexp);
  });
});

describe('Verify getParameterValue() method', () => {
  test('Should verify that getParameterValue("method(10)") will return parameter value', () => {
    expect(getParameterValue('method(10)')).toBe('10');
  });

  test('Should verify that getParameterValue("method") will return input', () => {
    expect(getParameterValue('method')).toBe('method');
  });
});

describe('Verify generateSentence() method', () => {
  test('Should verify that generateSentence(10) will return string of length 10', () => {
    expect(generateSentence(10).length).toBe(10);
  });

  test('Should verify that generateSentence(0) will return string of length 0', () => {
    expect(generateSentence(0).length).toBe(0);
  });

  test('Should verify that getParameterValue("method") will return input', () => {
    expect(getParameterValue('method')).toBe('method');
  });
});

describe('Verify getEnvironmentValue() method', () => {
  test('Should return dev variable', async () => {
    env.ENV_NAME = 'development';

    const getEnvironmentValue = (await import('../../../../src/utils/tests/generate')).getEnvironmentValue;

    expect(getEnvironmentValue()).toBe('dev');
  });

  test('Should return acc variable', async () => {
    env.ENV_NAME = 'acceptance';

    const getEnvironmentValue = (await import('../../../../src/utils/tests/generate')).getEnvironmentValue;

    expect(getEnvironmentValue()).toBe('acc');
  });
});

describe('Verify generateValue(value) method', () => {
  test('Should verify that generated "randomUuid" is defined and is typeof string', () => {
    expect.assertions(3);
    expect(generateValue('randomUuid')).toBeDefined();
    expect(typeof generateValue('randomUuid')).toBe('string');
    expect(generateValue('randomPhoneNumber')).toBeTruthy();
  });

  test('Should verify that generated "timestamp" is greater then expected', () => {
    const timestamp = new Date().getTime();
    expect(Number(generateValue('timestamp'))).toBeGreaterThanOrEqual(timestamp);
  });

  test('Should verify that generated "randomEmail" is valid email', () => {
    const regexp = /test_(.*?)@atbank.nl/;
    expect(generateValue('randomEmail')).toMatch(regexp);
  });

  test('Should verify that generated "randomFirstName" is defined', () => {
    expect.assertions(2);
    expect(generateValue('randomFirstName')).toBeDefined();
    expect(generateValue('randomPhoneNumber')).toBeTruthy();
  });

  test('Should verify that generated "randomPhoneNumber" is defined', () => {
    expect.assertions(2);
    expect(generateValue('randomPhoneNumber')).toBeDefined();
    expect(generateValue('randomPhoneNumber')).toBeTruthy();
  });

  test('Should verify that generated "randomLastName" is defined', () => {
    expect.assertions(2);
    expect(generateValue('randomLastName')).toBeDefined();
    expect(generateValue('randomLastName')).toBeTruthy();
  });

  test('Should verify that generated "randomBirthDate" is matching regexp', () => {
    const regexp = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    expect(generateValue('randomBirthDate')).toMatch(regexp);
  });

  test('Should verify that generated "todayBirthDate" is defined', () => {
    const todayDate = DateTime.now().toFormat('yyyy-MM-dd');
    expect(generateValue('todayBirthDate')).toBe(todayDate);
  });

  test('Should verify that generated "randomIban" is returning valid Iban', () => {
    expect(validateIban(generateValue('randomIban'))).toBe(true);
  });

  test('Should verify that generated "randomBic" is matching regexp', () => {
    const regexp = /[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}/;
    expect(generateValue('randomBic')).toMatch(regexp);
  });

  test('Should verify that generated "getTestingBic" is equal expected value', () => {
    expect.assertions(2);
    expect(generateValue('getTestingBic')).toBeDefined();
    expect(generateValue('getTestingBic')).toEqual('ABNANL5A');
  });

  test('Should verify that generated "getTestingIban" is equal expected value', () => {
    expect.assertions(2);
    expect(generateValue('getTestingIban')).toBeDefined();
    expect(generateValue('getTestingIban')).toEqual('NL66ATBA6321207233');
  });

  test('Should verify that generated "randomCompanyName" is matching regexp', () => {
    expect.assertions(2);
    expect(generateValue('randomCompanyName')).toBeDefined();
    expect(generateValue('randomCompanyName')).toBeTruthy();
  });

  test('Should verify that generated "randomStringOfLength" is matching expected number', () => {
    const result = generateValue('randomStringOfLength(10)');
    expect(result.length).toBe(10);
  });

  test('Should verify that generated "currentISOTimestamp" is matching expected number', () => {
    expect.assertions(3);
    const regexp =
      /^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\.[0-9]{3}Z$/;
    expect(generateValue('currentISOTimestamp')).toBeDefined();
    expect(generateValue('currentISOTimestamp')).toBeTruthy();
    expect(generateValue('currentISOTimestamp')).toMatch(regexp);
  });
});
