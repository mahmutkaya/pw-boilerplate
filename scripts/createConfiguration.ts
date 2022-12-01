import { secrets as secretsJson } from './configuration/secrets';
import log from '../src/helpers/logging/logging';
import { getSecrets } from '../src/helpers/awsHandlers/secretsManager';
import { readFileFixture, removeFileIfOlderThen } from '../src/helpers/files';
import environmentJson from '../environment.json';
import env from '../src/helpers/environmentVariables';
import { set } from 'lodash';
import { resolve } from 'path';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

const fileName = 'configuration_cache.json';

type Configuration = {
  [key: string | symbol]: any;
};

const replaceAwsRoleInJson = (json: Configuration) => {
  if (env.USE_ENG_AWS_ROLE) {
    return JSON.parse(JSON.stringify(json).replace(/deploy-services/g, 'eng'));
  }
  return json;
};

const setEnvironmentVariables = (configurationObject: Configuration, environment: Configuration) => {
  const path = '/opt/skynet/src/projects';
  const projectList: string[] = readdirSync(path);

  for (const project of projectList) {
    // TODO: FIXME: Remove unsused config/config.json from qa-automation-skynet
    const projectConfig = readFileSync(resolve(`${path}/${project}/config/config.json`), 'utf8');

    configurationObject[project] = {
      config: {
        ...JSON.parse(projectConfig),
        ...environment[project],
      },
    };
  }
  return configurationObject;
};

const getAllSecrets = async (object: Configuration) => {
  const newObject = {};

  for (const key of Object.keys(object)) {
    const projectName = key;
    const roleArn = object[key].roleArn;
    const secretPath = object[key].secretPath;
    const keys = object[key].key;

    if (keys !== undefined) {
      for (const key of keys) {
        const value = key;
        const secretValue = await getSecrets(value, roleArn, secretPath);
        set(newObject, [projectName, value], secretValue);
      }
    }
  }
  return newObject;
};

const createConfigurationCache = async () => {
  let configuration: Configuration = {};

  configuration = setEnvironmentVariables(configuration, replaceAwsRoleInJson(environmentJson));
  configuration['secrets'] = await getAllSecrets(replaceAwsRoleInJson(secretsJson));

  // TODO: FIXME: Change the path after full migration
  writeFileSync(`${fileName}`, JSON.stringify(configuration, null, 2));

  log.info(`File ${fileName} was created successfully!`);

  return configuration;
};

(async () => {
  await removeFileIfOlderThen(fileName, 4);
  const textOrNull = readFileFixture(fileName);

  if (textOrNull === null) {
    log.info(`Creating ${fileName} file`);
    await createConfigurationCache();
  }
})();
