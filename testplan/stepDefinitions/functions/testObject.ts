import { ICustomWorld } from '../../../../support/customWorld';
import { evaluateParameters } from '../../../../helpers/evaluateParameters';
import { set } from 'lodash';
import expect from 'expect';

export function storeValue(customWorld: ICustomWorld, key: string, value: string) {
  const obj = customWorld.testObject;
  const evaluatedValue = evaluateParameters(obj, value);
  const evaluatedKey = evaluateParameters(obj, key);

  set(obj, evaluatedKey, evaluatedValue);
}

export function validateValue(customWorld: ICustomWorld, key: string, expectedValue: string) {
  const evaluatedValue = evaluateParameters(customWorld.testObject, key);
  expect(evaluatedValue).toBe(expectedValue);
}
