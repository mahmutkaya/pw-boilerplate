import { isJSON, formatJson } from '../../../src/helpers/json';

describe('Verify isJSON() method', () => {
  test('Should return false if string is not a JSON file', () => {
    expect(isJSON('string')).toBe(false);
  });

  test('Should return false if string is not valid JSON file', () => {
    const string =
      '{\n  "id": "a0d0E00001XQi8ZQAT",\n  "interestRate": 0.015,\n  "minimumDeposit": 5000,\n  "maximumDeposit": 500000,\n  "minimumBalance": null,\n  "configurationProductId": "nl_ftd",\n  "term": "9",\n  "startDate": null,\n  "endDate": null,\n  "productType": "Deposit account",\n  "documentUrl": null,\n  "countryCode":}';
    expect(isJSON(string)).toBe(false);
  });

  test('Should return true if string is valid JSON file', () => {
    const string =
      '{\n  "id": "a0d0E00001XQi8ZQAT",\n  "interestRate": 0.015,\n  "minimumDeposit": 5000,\n  "maximumDeposit": 500000,\n  "minimumBalance": null,\n  "configurationProductId": "nl_ftd",\n  "term": "9",\n  "startDate": null,\n  "endDate": null,\n  "productType": "Deposit account",\n  "documentUrl": null,\n  "countryCode": "NL"\n}';
    expect(isJSON(string)).toBe(true);
  });

  test('Should return false if string is number', () => {
    const string = '1234567890';
    expect(isJSON(string)).toBe(false);
  });
});

describe('Verify formatJson() method', () => {
  test('Should return formatted JSON', () => {
    const string = { a: 'apple', b: 'banana', c: { d: 'decrypto', e: 'elephant' } };
    expect(formatJson(string)).toMatchInlineSnapshot(`
      "{
        \\"a\\": \\"apple\\",
        \\"b\\": \\"banana\\",
        \\"c\\": {
          \\"d\\": \\"decrypto\\",
          \\"e\\": \\"elephant\\"
        }
      }"
    `);
  });

  test('Should return formatted string', () => {
    const string = { c: 'circle' };
    expect(formatJson(string)).toMatchInlineSnapshot(`
      "{
        \\"c\\": \\"circle\\"
      }"
    `);
  });
});
