import log from './logging/logging';
import { generateValue } from '../utils/tests/generate';
import { get } from 'lodash';

export const removeBrackets = (input: string) => {
  const regexp = /{{(.+?)}}/;
  const values = input.match(regexp);

  if (!input || values === null) {
    throw new Error(`There is no matching for: ${input}`);
  }
  const match: string = values[1].replace(/ /g, '');
  return match;
};

export const valuesToEvaluate = (input: string) => {
  const regexp = /{{(.+?)}}/g;

  if (!input.match(regexp)) {
    if (input.length === 0) {
      throw new Error('No value provided in input!');
    }
    return input;
  }

  const matchingGroups: Array<string> = [];
  Array.from(input.matchAll(regexp), (match) => {
    return matchingGroups.push(match[0]);
  });

  return matchingGroups;
};

export const getGeneratedValue = (keyword: string, match: string) => {
  const getMethodName: string = removeBrackets(match).replace(keyword, '');
  const generatedValue: string | number = generateValue(getMethodName);

  if (!generatedValue) {
    throw new Error(`Generator: ${getMethodName} not found`);
  }
  return generatedValue;
};

export const getValueFromObject = (object: object, value: string) => {
  const result: string | object = get(object, removeBrackets(value), null);

  if (result === null) {
    throw new Error(`Value ${value} doesn't exist in Object`);
  }

  if (typeof result === 'string' && !!valuesToEvaluate(result).length) {
    return getEvaluationValues(object, result);
  }

  if (typeof result === 'object') {
    return JSON.stringify(result, null, 2);
  }

  return result;
};

export const replaceInEvaluation = (evaluation: string, value: string, method: string) => {
  return evaluation.replace(value, method);
};

export const getEvaluationValues = (testObjects: object, evaluation: string) => {
  const values: string | string[] = valuesToEvaluate(evaluation);

  if (Array.isArray(values)) {
    const keyword = 'generate.';
    values.forEach((value) => {
      if (value.includes(keyword)) {
        evaluation = replaceInEvaluation(evaluation, value, getGeneratedValue(keyword, value));
        return evaluation;
      }
      evaluation = replaceInEvaluation(evaluation, value, getValueFromObject(testObjects, value));
      return evaluation;
    });
  }
  return evaluation;
};

export const evaluateParameters = (testObjects: object, evaluation: string) => {
  log.debug(`evaluateParameterIn  = ${evaluation}`);

  evaluation = getEvaluationValues(testObjects, evaluation);

  log.debug(`evaluateParameterOut  = ${evaluation}`);

  return evaluation;
};
