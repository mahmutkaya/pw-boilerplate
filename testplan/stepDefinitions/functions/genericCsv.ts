import { ICustomWorld } from '../../../../support/customWorld';
import { evaluateParameters } from '../../../../helpers/evaluateParameters';
import { readCsvToArray } from '../../../../helpers/files';
import { set } from 'lodash';

export async function iReadCsvAndSaveAs(customWorld: ICustomWorld, csvPath: string, key: string) {
  const obj = customWorld.testObject;
  csvPath = evaluateParameters(obj, csvPath);
  key = evaluateParameters(obj, key);

  const csvData = await readCsvToArray(csvPath);

  return set(obj, key, csvData);
}
