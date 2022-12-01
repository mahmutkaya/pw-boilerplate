import { ICustomWorld } from '../../../../support/customWorld';
import { storeValue, validateValue } from '../functions/testObject';
import { When } from '@cucumber/cucumber';

When('I want to add value to the testObject {string} {string}', async function (this: ICustomWorld, key: string, value: string) {
  return storeValue(this, key, value);
});

When(
  'I want to validate value {string} saved in testObject with {string}',
  async function (this: ICustomWorld, key: string, expectedValue: string) {
    return validateValue(this, key, expectedValue);
  },
);
