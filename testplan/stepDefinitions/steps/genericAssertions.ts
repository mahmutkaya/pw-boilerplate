import { ICustomWorld } from '../../../../support/customWorld';
import { compareTwoStrings, compareTwoNumbers, stringContainsString } from '../functions/genericAssertions';
import { Then } from '@cucumber/cucumber';

Then('The string {string} will be equal to the string {string}', function (this: ICustomWorld, valueA: string, valueB: string) {
  return compareTwoStrings(this, valueA, valueB);
});

Then('The number {string} will be equal to the number {string}', function (this: ICustomWorld, valueA: string, valueB: string) {
  return compareTwoNumbers(this, valueA, valueB);
});

Then('The string {string} will contain the string {string}', function (this: ICustomWorld, valueA: string, valueB: string) {
  return stringContainsString(this, valueA, valueB);
});

// TODO: FIXME: We don't use those steps currently in SKYNET. We need to think how to rewrite them in correct way.
/*
Then(/^the json (.+) will be equal to the json (.+)$/, (valueA, valueB) => {
  getTestObject().then((testObjects) => {
    valueA = evaluateParameters(testObjects, valueA);
    valueB = evaluateParameters(testObjects, valueB);
    expect(JSON.parse(valueA)).to.deep.equal(JSON.parse(valueB));
  });
});

Then(/^the json (.+) will be contained in the json (.+)$/, (valueA, valueB) => {
  getTestObject().then((testObjects) => {
    valueA = JSON.stringify(evaluateParameters(testObjects, valueA));
    valueB = JSON.stringify(evaluateParameters(testObjects, valueB));
    expect(JSON.parse(valueA)).to.nested.include(JSON.parse(valueB));
  });
});

Then(/^the type of (.+) will be a (.+)$/, (valueA, valueB) => {
  getTestObject().then((testObjects) => {
    valueA = typeof evaluateParameters(testObjects, valueA);
    valueB = evaluateParameters(testObjects, valueB);
    expect(valueA).to.equal(valueB);
  });
});
*/
