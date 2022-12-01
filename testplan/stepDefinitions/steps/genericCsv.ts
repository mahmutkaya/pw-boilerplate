import { ICustomWorld } from '../../../../support/customWorld';
import { iReadCsvAndSaveAs } from '../functions/genericCsv';
import { Given } from '@cucumber/cucumber';

Given('I read the csv file {string} and save as {string}', async function (this: ICustomWorld, csvPath: string, key: string) {
  return iReadCsvAndSaveAs(this, csvPath, key);
});
