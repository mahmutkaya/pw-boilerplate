import { updateByPath, sleep } from '../../../src/helpers/common';
import { formatJson } from '../../../src/helpers/json';

describe('Verify updateByPath() method', () => {
  test('Should add new nested property to object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: {
          f: 4,
        },
      },
    };

    updateByPath(obj, 'd.a.c', { d: 5 });
    expect(formatJson(obj)).toMatchInlineSnapshot(`
      "{
        \\"a\\": 1,
        \\"b\\": 2,
        \\"c\\": {
          \\"d\\": 3,
          \\"e\\": {
            \\"f\\": 4
          }
        },
        \\"d\\": {
          \\"a\\": {
            \\"c\\": {
              \\"d\\": 5
            }
          }
        }
      }"
    `);
  });

  test('Should add new property to object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: {
          f: 4,
        },
      },
    };

    updateByPath(obj, 'z', 10);
    expect(formatJson(obj)).toMatchInlineSnapshot(`
      "{
        \\"a\\": 1,
        \\"b\\": 2,
        \\"c\\": {
          \\"d\\": 3,
          \\"e\\": {
            \\"f\\": 4
          }
        },
        \\"z\\": 10
      }"
    `);
  });

  test('Should updated existing property in object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: {
          f: 4,
        },
      },
    };

    updateByPath(obj, 'a', 5);
    expect(formatJson(obj)).toMatchInlineSnapshot(`
      "{
        \\"a\\": 5,
        \\"b\\": 2,
        \\"c\\": {
          \\"d\\": 3,
          \\"e\\": {
            \\"f\\": 4
          }
        }
      }"
    `);
  });

  test('Should updated nested property in object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: {
          f: 4,
        },
      },
    };

    updateByPath(obj, 'c.d', 5);
    expect(formatJson(obj)).toMatchInlineSnapshot(`
      "{
        \\"a\\": 1,
        \\"b\\": 2,
        \\"c\\": {
          \\"d\\": 5,
          \\"e\\": {
            \\"f\\": 4
          }
        }
      }"
    `);
  });
});

describe('Verify sleep() method', () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');

  test('Waits 1 second before ending the sleep', () => {
    sleep(1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});
