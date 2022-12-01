import {
  removeBrackets,
  valuesToEvaluate,
  getGeneratedValue,
  getValueFromObject,
  replaceInEvaluation,
  getEvaluationValues,
  evaluateParameters,
} from '../../../src/helpers/evaluateParameters';

describe('Verify removeBrackets() method', () => {
  const match = 'match';

  test('Should return matching from full input', () => {
    expect(removeBrackets(`Some message: {{ ${match} }}`)).toBe(match);
  });

  test('Should return matching from matcher with spaces', () => {
    expect(removeBrackets(`{{ ${match} }}`)).toBe(match);
  });

  test('Should return matching from matcher without spaces', () => {
    expect(removeBrackets(`{{${match}}}`)).toBe(match);
  });

  test('Should return matching from matcher with space at beginning', () => {
    expect(removeBrackets(`{{ ${match}}}`)).toBe(match);
  });

  test('Should return matching from matcher with space at end', () => {
    expect(removeBrackets(`{{${match} }}`)).toBe(match);
  });

  test('Should Throw Error for invalid match', () => {
    expect(() => {
      removeBrackets(match);
    }).toThrow(`There is no matching for: ${match}`);
  });

  test('Should Throw Error for invalid match with :', () => {
    const matcher = ` ${match}: ${match}`;
    expect(() => {
      removeBrackets(matcher);
    }).toThrow(`There is no matching for: ${matcher}`);
  });

  test('Should Throw Error for invalid match with {{', () => {
    const matcher = `{{ ${match}`;
    expect(() => {
      removeBrackets(matcher);
    }).toThrow(`There is no matching for: ${matcher}`);
  });
});

describe('Verify valuesToEvaluate() method', () => {
  const match = 'match';

  test('Should return matching group with one element from full input', () => {
    const matcher = `{{ ${match} }}`;
    expect(valuesToEvaluate(`Some message: ${matcher}`)).toEqual([`${matcher}`]);
  });

  test('Should return matching group with two elements from full input', () => {
    const matcher = `{{ ${match} }}`;
    expect(valuesToEvaluate(`Some message: ${matcher} {{match2}}`)).toEqual([`${matcher}`, '{{match2}}']);
  });

  test('Should return input if no matcher appears', () => {
    const matcher = `Something ${match}`;
    expect(valuesToEvaluate(matcher)).toEqual(matcher);
  });

  test('Should Throw Error for invalid match', () => {
    expect(() => {
      valuesToEvaluate(``);
    }).toThrow('No value provided in input!');
  });
});

describe('Verify getGeneratedValue() method', () => {
  const generate = 'generate.';

  test('Should verify that generated "randomEmail" is valid email for full input', () => {
    const regexp = /test_(.*?)@atbank.nl/;
    expect(getGeneratedValue(generate, `Some input: {{ ${generate}randomEmail }}`)).toMatch(regexp);
  });

  test('Should return generated random string value for full input', () => {
    const stringLength = 256;
    expect(getGeneratedValue(generate, `Some input: {{ ${generate}randomStringOfLength(${stringLength}) }}`).length).toBe(stringLength);
  });

  test('Should verify that generated "randomEmail" is valid email', () => {
    const regexp = /test_(.*?)@atbank.nl/;
    expect(getGeneratedValue(generate, `{{ ${generate}randomEmail }}`)).toMatch(regexp);
  });

  test('Should return generated random string value', () => {
    const stringLength = 256;
    expect(getGeneratedValue(generate, `{{ ${generate}randomStringOfLength(${stringLength}) }}`).length).toBe(stringLength);
  });

  test('Should Throw Error for missing generator', () => {
    const method = 'NotExist';
    expect(() => {
      getGeneratedValue(generate, `{{ ${generate}${method} }}`);
    }).toThrow(`Generator: ${method} not found`);
  });

  test('Should Throw Error for incorrect usage generator', () => {
    const method = 'NotExist';
    const matcher = `${generate}${method}`;
    expect(() => {
      getGeneratedValue(generate, matcher);
    }).toThrow(`There is no matching for: ${matcher}`);
  });

  test('Should Throw Error for incorrect usage generator', () => {
    const method = '';
    const matcher = `${generate}${method}`;
    expect(() => {
      getGeneratedValue(generate, matcher);
    }).toThrow(`There is no matching for: ${matcher}`);
  });
});

describe('Verify getValueFromObject() method', () => {
  const object = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3,
        'f-z': 4,
        g: 0,
      },
    },
  };

  test('Should return expected value using dot notation', () => {
    expect(getValueFromObject(object, '{{ b.d.e }}')).toBe(3);
  });

  test('Should return expected value for 0 case', () => {
    expect(getValueFromObject(object, '{{ b.d.g }}')).toBe(0);
  });

  test('Should return expected value using bracket notation', () => {
    expect(getValueFromObject(object, '{{ ["b"]["d"]["e"] }}')).toBe(3);
  });

  test('Should return expected value using bracket notation with "-" case ', () => {
    expect(getValueFromObject(object, '{{["b"]["d"]["f-z"]}}')).toBe(4);
  });

  test('Should Throw Error for not existing value', () => {
    const value = '{{a.b.c}}';
    expect(() => {
      getValueFromObject(object, value);
    }).toThrow(`Value ${value} doesn't exist in Object`);
  });

  test('Should Throw Error for false value', () => {
    const value = '{{ false }}';
    expect(() => {
      getValueFromObject(object, value);
    }).toThrow(`Value ${value} doesn't exist in Object`);
  });

  test('Should Throw Error for not provided value', () => {
    expect(() => {
      getValueFromObject(object, '');
    }).toThrow('There is no matching for: ');
  });
});

describe('Verify replaceInEvaluation() method', () => {
  const generate = 'generate.';
  const object = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3,
        'f-z': 4,
      },
    },
  };

  test('Should replace value with generated one full input', () => {
    const generateMethodName = 'randomEmail';
    const value = `{{ ${generate}${generateMethodName} }}`;
    const evaluationInput = `Something ${value}`;
    const evaluationOutput = /Something test_(.*?)@atbank.nl/;
    expect(replaceInEvaluation(evaluationInput, value, getGeneratedValue(generate, value))).toMatch(evaluationOutput);
  });

  test('Should replace value with generated one', () => {
    const generateMethodName = 'randomEmail';
    const value = `{{ ${generate}${generateMethodName} }}`;
    const evaluationInput = `${value}`;
    const evaluationOutput = /test_(.*?)@atbank.nl/;
    expect(replaceInEvaluation(evaluationInput, value, getGeneratedValue(generate, value))).toMatch(evaluationOutput);
  });

  test('Should throw error for missing generator', () => {
    const generateMethodName = 'NotExist';
    const value = `{{ ${generate}${generateMethodName} }}`;
    const evaluationInput = `${value}`;
    expect(() => {
      replaceInEvaluation(evaluationInput, value, getGeneratedValue(generate, value));
    }).toThrow(`Generator: ${generateMethodName} not found`);
  });

  test('Should return expected value using dot notation', () => {
    const value = `{{ b.d.e }}`;
    const evaluationInput = `Some : ${value}`;
    const evaluationOutput = 'Some : 3';
    expect(replaceInEvaluation(evaluationInput, value, getValueFromObject(object, value))).toEqual(evaluationOutput);
  });

  test('Should return expected value using bracket notation', () => {
    const value = `{{ ["b"]["d"]["e"] }}`;
    const evaluationInput = `Some : ${value}`;
    const evaluationOutput = 'Some : 3';
    expect(replaceInEvaluation(evaluationInput, value, getValueFromObject(object, value))).toEqual(evaluationOutput);
  });

  test('Should return expected value using bracket notation with "-" case ', () => {
    const value = `{{["b"]["d"]["f-z"]}}`;
    const evaluationInput = `Some : ${value}`;
    const evaluationOutput = 'Some : 4';
    expect(replaceInEvaluation(evaluationInput, value, getValueFromObject(object, value))).toEqual(evaluationOutput);
  });

  test('Should Throw Error for not existing value', () => {
    const value = '{{a.b.c}}';
    const evaluationInput = `Some : ${value}`;
    expect(() => {
      replaceInEvaluation(evaluationInput, value, getValueFromObject(object, value));
    }).toThrow(`Value ${value} doesn't exist in Object`);
  });

  test('Should Throw Error for not provided value', () => {
    const value = '{{}}';
    const evaluationInput = `Some : ${value}`;
    expect(() => {
      replaceInEvaluation(evaluationInput, value, getValueFromObject(object, value));
    }).toThrow(`There is no matching for: ${value}`);
  });
});

describe('Verify getEvaluationValues() method', () => {
  const generate = 'generate.';
  const object = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3,
        'f-z': 4,
        f: '{{c}}',
      },
    },
    c: '{{generate.timestamp}}',
  };

  test('Should replace value with generated one full input', () => {
    const generateMethodName = 'randomEmail';
    const value = `{{ ${generate}${generateMethodName} }}`;
    const evaluationInput = `Something ${value}`;
    const evaluationOutput = /Something test_(.*?)@atbank.nl/;
    expect(getEvaluationValues(object, evaluationInput)).toMatch(evaluationOutput);
  });

  test('Should return expected value for nested evaluation', () => {
    const evaluationInput = `{{ b.d.f }}`;
    const evaluationOutput = new Date().getTime();
    const result = getEvaluationValues(object, evaluationInput);
    expect(Number(result)).toBeGreaterThanOrEqual(evaluationOutput);
  });

  test('Should replace value with generated one', () => {
    const generateMethodName = 'randomEmail';
    const value = `{{ ${generate}${generateMethodName} }}`;
    const evaluationInput = `${value}`;
    const evaluationOutput = /test_(.*?)@atbank.nl/;
    expect(getEvaluationValues(object, evaluationInput)).toMatch(evaluationOutput);
  });

  test('Should throw error for missing generator', () => {
    const generateMethodName = 'NotExist';
    const value = `{{ ${generate}${generateMethodName} }}`;
    const evaluationInput = `${value}`;
    expect(() => {
      getEvaluationValues(object, evaluationInput);
    }).toThrow(`Generator: ${generateMethodName} not found`);
  });

  test('Should return expected value using dot notation', () => {
    const value = `{{ b.d.e }}`;
    const evaluationInput = `Some : ${value}`;
    const evaluationOutput = 'Some : 3';
    expect(getEvaluationValues(object, evaluationInput)).toEqual(evaluationOutput);
  });

  test('Should return expected value using bracket notation', () => {
    const value = `{{ ["b"]["d"]["e"] }}`;
    const evaluationInput = `Some : ${value}`;
    const evaluationOutput = 'Some : 3';
    expect(getEvaluationValues(object, evaluationInput)).toEqual(evaluationOutput);
  });

  test('Should return expected value using bracket notation with "-" case ', () => {
    const value = `{{["b"]["d"]["f-z"]}}`;
    const evaluationInput = `Some : ${value}`;
    const evaluationOutput = 'Some : 4';
    expect(getEvaluationValues(object, evaluationInput)).toEqual(evaluationOutput);
  });

  test('Should Throw Error for not existing value', () => {
    const value = '{{a.b.c}}';
    const evaluationInput = `Some : ${value}`;
    expect(() => {
      getEvaluationValues(object, evaluationInput);
    }).toThrow(`Value ${value} doesn't exist in Object`);
  });

  test('Should Throw Error for not provided value', () => {
    const value = '{{ }}';
    const evaluationInput = `Some : ${value}`;
    expect(() => {
      getEvaluationValues(object, evaluationInput);
    }).toThrow(`Value ${value} doesn't exist in Object`);
  });

  test('Should Throw Error for not provided value', () => {
    const value = '{{ }}';
    const evaluationInput = `Some : ${value}`;
    expect(() => {
      getEvaluationValues(object, evaluationInput);
    }).toThrow(`Value ${value} doesn't exist in Object`);
  });

  test('Should return expected full input', () => {
    const evaluationInput = `Some : 3`;
    const evaluationOutput = 'Some : 3';
    expect(getEvaluationValues(object, evaluationInput)).toEqual(evaluationOutput);
  });

  test('Should throw error for missing input', () => {
    const evaluationInput = ``;
    expect(() => {
      getEvaluationValues(object, evaluationInput);
    }).toThrow(`No value provided in input!`);
  });
});

describe('Verify evaluateParameters() method', () => {
  const generate = 'generate.';
  const object = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3,
        'f-z': 4,
      },
    },
  };

  test('Should replace value with generated one full input', () => {
    const generateMethodName = 'randomEmail';
    const value = `{{ ${generate}${generateMethodName} }}`;
    const evaluationInput = `Something ${value}`;
    const evaluationOutput = /Something test_(.*?)@atbank.nl/;
    expect(evaluateParameters(object, evaluationInput)).toMatch(evaluationOutput);
  });

  test('Should replace value with generated one', () => {
    const generateMethodName = 'randomEmail';
    const value = `{{ ${generate}${generateMethodName} }}`;
    const evaluationInput = `${value}`;
    const evaluationOutput = /test_(.*?)@atbank.nl/;
    expect(evaluateParameters(object, evaluationInput)).toMatch(evaluationOutput);
  });

  test('Should throw error for missing generator', () => {
    const generateMethodName = 'NotExist';
    const value = `{{ ${generate}${generateMethodName} }}`;
    const evaluationInput = `${value}`;
    expect(() => {
      evaluateParameters(object, evaluationInput);
    }).toThrow(`Generator: ${generateMethodName} not found`);
  });

  test('Should return expected value using dot notation', () => {
    const value = `{{ b.d.e }}`;
    const evaluationInput = `Some : ${value}`;
    const evaluationOutput = 'Some : 3';
    expect(evaluateParameters(object, evaluationInput)).toEqual(evaluationOutput);
  });

  test('Should return expected value using bracket notation', () => {
    const value = `{{ ["b"]["d"]["e"] }}`;
    const evaluationInput = `Some : ${value}`;
    const evaluationOutput = 'Some : 3';
    expect(evaluateParameters(object, evaluationInput)).toEqual(evaluationOutput);
  });

  test('Should return expected value using bracket notation with "-" case ', () => {
    const value = `{{["b"]["d"]["f-z"]}}`;
    const evaluationInput = `Some : ${value}`;
    const evaluationOutput = 'Some : 4';
    expect(evaluateParameters(object, evaluationInput)).toEqual(evaluationOutput);
  });

  test('Should Throw Error for not existing value', () => {
    const value = '{{a.b.c}}';
    const evaluationInput = `Some : ${value}`;
    expect(() => {
      evaluateParameters(object, evaluationInput);
    }).toThrow(`Value ${value} doesn't exist in Object`);
  });

  test('Should Throw Error for not provided value', () => {
    const value = '{{ }}';
    const evaluationInput = `Some : ${value}`;
    expect(() => {
      evaluateParameters(object, evaluationInput);
    }).toThrow(`Value ${value} doesn't exist in Object`);
  });

  test('Should Throw Error for not provided value', () => {
    const value = '{{ }}';
    const evaluationInput = `Some : ${value}`;
    expect(() => {
      evaluateParameters(object, evaluationInput);
    }).toThrow(`Value ${value} doesn't exist in Object`);
  });

  test('Should return expected full input', () => {
    const evaluationInput = `Some : 3`;
    const evaluationOutput = 'Some : 3';
    expect(evaluateParameters(object, evaluationInput)).toEqual(evaluationOutput);
  });

  test('Should throw error for missing input', () => {
    const evaluationInput = ``;
    expect(() => {
      evaluateParameters(object, evaluationInput);
    }).toThrow(`No value provided in input!`);
  });
});
