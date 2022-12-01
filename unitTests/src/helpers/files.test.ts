import { readFileFixture, removeFileIfOlderThen, readCsvToArray, readFixture } from '../../../src/helpers/files';
import mock from 'mock-fs';
import { DateTime } from 'luxon';

describe('Verify readFileFixture() mock method', () => {
  const path = 'path/to/fake/dir/some-file.txt';

  test('Should return expected file content when file exists - normal json', () => {
    mock({
      'path/to/fake/dir': {
        'some-file.txt': JSON.stringify({ settings: true }),
      },
    });
    const result = readFileFixture(path);
    mock.restore();
    expect(result).toMatchInlineSnapshot(`"{\\"settings\\":true}"`);
  });

  test('Should return expected file content when file exists - empty curly brackets', () => {
    mock({
      'path/to/fake/dir': {
        'some-file.txt': JSON.stringify({}),
      },
    });
    const result = readFileFixture(path);
    mock.restore();
    expect(result).toMatchInlineSnapshot(`"{}"`);
  });

  test('Should return expected file text if file exists - empty file', () => {
    mock({
      'path/to/fake/dir': {
        'some-file.txt': '',
      },
    });
    const result = readFileFixture(path);
    mock.restore();
    expect(result).toMatchInlineSnapshot(`""`);
  });

  test('Should return null value when file not exists', () => {
    expect(readFileFixture('notExistingJson.js')).toBe(null);
  });

  test('Should return expected file text if file exist - real example ', () => {
    expect(readFileFixture('jest.config.js')).toMatchInlineSnapshot(`
      "module.exports = {
        \\"roots\\": [
          \\"<rootDir>/unitTests\\"
        ],
        \\"transform\\": {
          \\"^.+\\\\\\\\.tsx?$\\": \\"ts-jest\\"
        },
      }"
    `);
  });
});

describe('Verify readFixture() method', () => {
  test('Should throw error when file not exist', () => {
    const fileName = 'generic.json';
    const filePath = `./projects/qa-automation-skyduck/fixtures/${fileName}`;
    expect(() => {
      readFixture(filePath);
    }).toThrow(`Fixture file: '${fileName}' doesn't exist !!!`);
  });

  test('Should return file content when file exist', () => {
    const filePath = 'path/to/fake/dir/some-file.txt';
    mock({
      'path/to/fake/dir': {
        'some-file.txt': JSON.stringify({ settings: true }),
      },
    });
    const result = readFixture(filePath);
    mock.restore();
    expect(result).toMatchInlineSnapshot(`"{\\"settings\\":true}"`);
  });
});

describe('Verify removeFileIfOlderThen() mock method', () => {
  const dateHoursBeforeToday = (hours: number) => DateTime.now().minus({ hours: hours }).toJSDate();
  test('Should return delete file and return false if file is older then 1 days', async () => {
    const hours: number = 24 * 1;

    mock({
      'example.json': mock.file({
        mtime: dateHoursBeforeToday(24 * 2),
      }),
    });

    const result = await removeFileIfOlderThen('example.json', hours);
    mock.restore();
    expect(result).toMatchInlineSnapshot(`false`);
  });

  test('Should return not delete file and return true if file is not older then 3 days', async () => {
    const hours: number = 24 * 3;

    mock({
      'example.json': mock.file({
        mtime: dateHoursBeforeToday(24 * 2),
      }),
    });

    const result = await removeFileIfOlderThen('example.json', hours);
    mock.restore();
    expect(result).toMatchInlineSnapshot(`true`);
  });

  test('Should return return null if does not exist', async () => {
    const hours = 24 * 1;
    const result = await removeFileIfOlderThen('notExisting.json', hours);
    expect(result).toMatchInlineSnapshot(`null`);
  });
});

describe('Verify readCsvToJson() method', () => {
  test('Should return Array from CSV file', async () => {
    const result = await readCsvToArray('qa-automation-skyduck/fixtures/test.csv');
    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "col1": "row11",
          "col2": "row12",
          "col3": "row13",
        },
        Object {
          "col1": "row21",
          "col2": "row22",
          "col3": "row23",
        },
        Object {
          "col1": "row31",
          "col2": "row32",
          "col3": "row33",
        },
      ]
    `);
  });
});
