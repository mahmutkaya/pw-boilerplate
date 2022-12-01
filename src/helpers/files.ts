import log from './logging/logging';
import { formatJson } from '../helpers/json';
import { DateTime } from 'luxon';
import csv from 'csvtojson';
import { promises as fsPromises, existsSync, readFileSync } from 'fs';
import path from 'path';

export const readFileFixture = (fileName: string) => {
  const pathName = path.resolve(fileName);
  if (existsSync(pathName)) {
    return readFileSync(pathName, 'utf8');
  }
  return null;
};

export function readFixture(filePath: string): string {
  const file = readFileFixture(filePath);
  const fileName = filePath.split('/').pop();

  if (file === null) {
    throw new Error(`Fixture file: '${fileName}' doesn't exist !!!`);
  }
  return file!;
}

export const removeFileIfOlderThen = async (fileName: string, hours: number) => {
  const pathName = path.resolve(fileName);

  if (!existsSync(pathName)) {
    log.warn(`File ${fileName} cannot be removed - file does not exist!`);
    return null;
  }

  const fileStats = await fsPromises.stat(pathName).then((stats) => {
    return stats;
  });

  const expectRangeDateTimestamp = DateTime.now().minus({ hours: hours }).toMillis();
  // INFO: we cannot use .birthtime - on linux it returns timestamp for 1970-01-01T00:00:00Z
  const fileModificationTime = fileStats.mtime;
  const fileModificationDateTimestamp = DateTime.fromJSDate(fileModificationTime).toMillis();

  if (expectRangeDateTimestamp > fileModificationDateTimestamp) {
    log.warn(`File ${fileName} is older then ${hours} hours`);
    await fsPromises.unlink(pathName);
    log.info(`File ${fileName} was deleted`);
    return false;
  }

  log.info(`File ${fileName} has less then ${hours} hours`);
  return true;
};

export async function readCsvToArray(csvFilePath: string) {
  // INFO: Keep in mind that the function will only reads from /projects/ folder!
  const pathName = path.resolve(__dirname, `../../projects/${csvFilePath}`);

  try {
    const data = await csv().fromFile(pathName);
    log.debug(formatJson(data));

    return data;
  } catch (error: unknown) {
    log.error(formatJson(error as Error));
    return error;
  }
}
