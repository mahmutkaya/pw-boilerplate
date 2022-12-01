import env from '../environmentVariables';
import { DateTime } from 'luxon';
import chalk, { Chalk } from 'chalk';

const logLevels = {
  ERROR: 50000,
  WARN: 40000,
  TEST: 30000,
  INFO: 20000,
  DEBUG: 10000,
} as const;

type ILog = {
  level: keyof typeof logLevels;
  message: string;
  levelColor: Chalk;
  messageColor?: Chalk;
};

const log = ({ level, message, levelColor, messageColor = chalk.white }: ILog) => {
  logging(getOriginatorName(), level, message, levelColor, messageColor);
};

export type LogTypes = 'error' | 'warn' | 'test' | 'info' | 'debug';

function error(message: string) {
  log({ level: 'ERROR', message, levelColor: chalk.red });
}

function warn(message: string) {
  log({ level: 'WARN', message, levelColor: chalk.yellow });
}

function info(message: string) {
  log({ level: 'INFO', message, levelColor: chalk.green });
}

function debug(message: string) {
  log({ level: 'DEBUG', message, levelColor: chalk.cyan });
}

function test(message: string) {
  log({ level: 'TEST', message, levelColor: chalk.green });
}

function getSecretList(secretConfig: any, secretList: any) {
  for (const item in secretConfig) {
    if (typeof secretConfig[item] == 'object') {
      secretList = [...secretList, ...getSecretList(secretConfig[item], secretList)];
    } else {
      secretList.push(secretConfig[item]);
    }
  }
  return secretList;
}

const getSkynetConfiguration = () => {
  const enabled = Boolean(env.LOGGING_ENABLED) ?? true;
  const hideSecrets = Boolean(env.HIDE_SECRETS) ?? false;
  const logLevel = env.LOG_LEVEL.toUpperCase();

  if (!Object.keys(logLevels).includes(logLevel)) {
    throw new Error(`Provided log level ${env.LOG_LEVEL} in .env file is not valid. Valid values: ${Object.keys(logLevels)}`);
  }
  const level = logLevel as keyof typeof logLevels;

  return { enabled, hideSecrets, level };
};

const maskSecrets = (message: string, secretList: string[]) => {
  let tempMessage = message;
  secretList.forEach((secret) => {
    if (tempMessage.includes(secret)) {
      tempMessage = tempMessage.replace(secret, '******');
    }
  });
  return tempMessage;
};

const logging = async (
  originator: string,
  logLevel: keyof typeof logLevels = 'DEBUG',
  message: string,
  logTypeColor: Chalk = chalk.white,
  logMessageColor: Chalk = chalk.white,
) => {
  const { enabled, hideSecrets, level } = getSkynetConfiguration();

  if (enabled) {
    if (logLevels[logLevel] >= logLevels[level]) {
      const nextMessage = () =>
        // TODO: Rewrite to fs.readFile
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        // eslint-disable-next-line import/no-unresolved
        import('../../../configuration_cache.json')
          .then((configurationCache) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const secretList = getSecretList(configurationCache.secrets, []);
            return hideSecrets ? maskSecrets(message, secretList) : message;
          })
          .catch(() => {
            return message;
          });

      // eslint-disable-next-line no-console
      console.log(
        `${DateTime.now().toISO()} ${logTypeColor.bold(logLevel.padEnd(6, ' '))} ${chalk.yellow.bgGray.bold(
          originator.padEnd(30, ' '),
        )} ${logMessageColor(await nextMessage())} `,
      );
    }
  }
  return null;
};

function getOriginatorName() {
  const err = new Error();
  const fileName = err.stack!.split('\n')[4].split('/').pop()!.split(':');
  return `${fileName[0]}:${fileName[1]}`;
}

export default { error, info, warn, test, debug };
