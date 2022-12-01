import dotenv from 'dotenv';
import path from 'path';

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these variables or not setup a .env file at all

interface ENV {
  ENV_NAME: string | undefined;
  USE_ENG_AWS_ROLE: string | boolean;
  HIDE_SECRETS: string | boolean;
  LOGGING_ENABLED: string | boolean;
  LOG_LEVEL: string;
}

interface Config {
  ENV_NAME: string;
  USE_ENG_AWS_ROLE: string;
  HIDE_SECRETS: string;
  LOGGING_ENABLED: string;
  LOG_LEVEL: string;
}
// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    ENV_NAME: process.env.ENV_NAME,
    USE_ENG_AWS_ROLE: process.env.USE_ENG_AWS_ROLE ?? false,
    HIDE_SECRETS: process.env.HIDE_SECRETS ?? true,
    LOGGING_ENABLED: process.env.LOGGING_ENABLED ?? true,
    LOG_LEVEL: process.env.LOG_LEVEL ?? 'INFO',
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
