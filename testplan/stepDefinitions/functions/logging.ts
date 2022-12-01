import { ICustomWorld } from '../../../../support/customWorld';
import { evaluateParameters } from '../../../../helpers/evaluateParameters';
import log, { LogTypes } from '../../../../helpers/logging/logging';
import { formatJson } from '../../../../helpers/json';

function printToConsole(logType: LogTypes, logInput: string | undefined, logOutput: string) {
  return log[logType](`LOG INPUT MSG = ${logInput},
    LOG OUTPUT MSG = ${logOutput}`);
}

export function iLog(customWorld: ICustomWorld, logType: LogTypes, logLine: string) {
  const regexp = /{{(.+?)}}/;
  const logGroups = logLine.match(regexp);

  if (logGroups === null) {
    if (logLine.includes('{{}}')) {
      // INFO: Prints whole testObject
      return printToConsole(logType, logLine, formatJson(customWorld.testObject));
    }

    // INFO: Prints input values
    logLine = evaluateParameters(customWorld.testObject, logLine);
    return printToConsole(logType, logLine, logLine);
  }

  // INFO: Prints evaluated values
  logLine = evaluateParameters(customWorld.testObject, logGroups[0]);
  return printToConsole(logType, logGroups.input, logLine);
}
