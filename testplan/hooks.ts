import { ICustomWorld } from '../../support/customWorld';
import { readFileFixture } from '../../helpers/files';
import log from '../../helpers/logging/logging';
import { Before } from '@cucumber/cucumber';

Before(function (this: ICustomWorld) {
  const fileName = 'configuration_cache.json';
  const configuration = readFileFixture(fileName);

  if (configuration === null) {
    throw new Error(`File ${fileName} does not exist!`);
  }

  log.info(`Getting configuration form ${fileName}`);

  this.testObject = JSON.parse(configuration);
  this.testObject.creationTimestamp = new Date().getTime();
});
