import { iLog } from '../functions/logging';
import { ICustomWorld } from '../../../../support/customWorld';
import { LogTypes } from '../../../../helpers/logging/logging';
import { Given } from '@cucumber/cucumber';

Given('I log {string} {string}', async function (this: ICustomWorld, logType: LogTypes, logLine: string) {
  return iLog(this, logType, logLine);
});
