import { evaluateParameters } from '../../../../helpers/evaluateParameters';
import log from '../../../../helpers/logging/logging';
import { ICustomWorld } from '../../../../support/customWorld';
import expect from 'expect';

function evaluateValues(customWorld: ICustomWorld, valueA: string, valueB: string) {
  const obj = customWorld.testObject;
  valueA = evaluateParameters(obj, valueA);
  valueB = evaluateParameters(obj, valueB);

  return { valueA, valueB };
}

export function compareTwoStrings(customWorld: ICustomWorld, firstValue: string, secondValue: string) {
  const { valueA, valueB } = evaluateValues(customWorld, firstValue, secondValue);
  log.info(`Assert string: '${valueA}' == '${valueB}'`);
  expect(valueA).toEqual(valueB);
}

export function compareTwoNumbers(customWorld: ICustomWorld, firstValue: string, secondValue: string) {
  const { valueA, valueB } = evaluateValues(customWorld, firstValue, secondValue);
  log.info(`Assert numbers: ${valueA} == ${valueB}`);
  expect(Number(valueA)).toEqual(Number(valueB));
}

export function stringContainsString(customWorld: ICustomWorld, firstValue: string, secondValue: string) {
  const { valueA, valueB } = evaluateValues(customWorld, firstValue, secondValue);
  log.info(`Assert string: '${valueA}' contains '${valueB}'`);
  expect(valueA).toContain(valueB);
}
