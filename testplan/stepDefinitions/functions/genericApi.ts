import { iStoreAs } from './generic';
import { ICustomWorld } from '../../../../support/customWorld';
import { formatJson } from '../../../../helpers/json';
import { readFileFixture, readFixture } from '../../../../helpers/files';
import { evaluateParameters } from '../../../../helpers/evaluateParameters';
import log from '../../../../helpers/logging/logging';
import { set } from 'lodash';
import expect from 'expect';

export function creatApiObjectWithFixtureContent(customWorld: ICustomWorld, objectName: string, filePath: string) {
  const data = {
    requestConfig: JSON.parse(readFixture(filePath)),
    response: {},
  };
  iStoreAs(customWorld, formatJson(data), objectName);
}

export function addHeaders(customWorld: ICustomWorld, headers: string, objectName: string) {
  const obj = customWorld.testObject;
  const newHeaders = JSON.parse(evaluateParameters(obj, headers));
  objectName = evaluateParameters(obj, objectName);

  set(obj, `${objectName}.requestConfig.headers`, { ...obj[objectName].requestConfig.headers, ...newHeaders });
}

export function addBasicAuth(customWorld: ICustomWorld, username: string, password: string, objectName: string) {
  const obj = customWorld.testObject;
  username = evaluateParameters(obj, username);
  password = evaluateParameters(obj, password);

  const authData = {
    username: username,
    password: password,
  };
  set(obj, `${objectName}.requestConfig.auth`, authData);
}

export function deleteAuthSection(customWorld: ICustomWorld, objectName: string) {
  delete customWorld.testObject[objectName].requestConfig.auth;
}

export function addFormData(customWorld: ICustomWorld, formData: string, objectName: string) {
  const obj = customWorld.testObject;
  formData = evaluateParameters(obj, formData);
  const newData = JSON.parse(formData);
  addDataToRequestConfig(customWorld, objectName, newData);
  set(obj, `${objectName}.requestConfig`, { ...obj[objectName].requestConfig, form: true });
}

export function addContentData(customWorld: ICustomWorld, filePath: string, objectName: string) {
  const obj = customWorld.testObject;
  const fixtureData = readFileFixture(filePath);
  let content = {};

  if (fixtureData !== null) {
    content = JSON.parse(evaluateParameters(obj, fixtureData));
  } else {
    content = JSON.parse(filePath);
  }
  addDataToRequestConfig(customWorld, objectName, content);
}

export async function sendRequest(customWorld: ICustomWorld, method: string, url: string, objectName: string) {
  const obj = customWorld.testObject;
  const axios = customWorld.apiClient!;

  method = evaluateParameters(obj, method);
  url = evaluateParameters(obj, url);

  const body = (obj[objectName].requestConfig = {
    method: method,
    url: url,
    validateStatus: false,
    ...obj[objectName].requestConfig,
  });
  log.info(`Sending request ${method} to ${url}`);
  const response = await axios(body);
  set(obj, `${objectName}.response`, response);
}

export function checkStatusCode(customWorld: ICustomWorld, objectName: string, statusCode: string) {
  const obj = customWorld.testObject;
  objectName = evaluateParameters(obj, objectName);
  log.debug(`ASSERT STATUS CODE: ${Number(obj[objectName]['response'].status)} === ${statusCode}`);
  const responseStatus = obj[objectName]['response'].status;
  expect(responseStatus).toEqual(Number(statusCode));
}

export function objectEqual(customWorld: ICustomWorld, objectName: string, expectedData: string) {
  const obj = customWorld.testObject;
  expectedData = JSON.parse(expectedData);
  expect(obj[objectName].response.data).toEqual(expectedData);
}

function addDataToRequestConfig(customWorld: ICustomWorld, objectName: string, content: object) {
  const obj = customWorld.testObject;
  return set(obj, `${objectName}.requestConfig.data`, { ...obj[objectName].requestConfig.data, ...content });
}
