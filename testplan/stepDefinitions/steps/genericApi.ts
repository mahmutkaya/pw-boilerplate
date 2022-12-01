import { ICustomWorld } from '../../../../support/customWorld';
import * as apiSteps from '../functions/genericApi';
import { Given, Then, When } from '@cucumber/cucumber';

Given(
  'I prepare an API test object called {string} using fixture file {string}',
  function (this: ICustomWorld, objectName: string, fixtureFile: string) {
    apiSteps.creatApiObjectWithFixtureContent(this, objectName, fixtureFile);
  },
);

When('I add the headers {string} to the test object {string}', function (this: ICustomWorld, headers: string, objectName: string) {
  apiSteps.addHeaders(this, headers, objectName);
});

Given(
  'I add basic authentication username: {string} and password: {string} to the test object {string}',
  function (this: ICustomWorld, userName: string, password: string, objectName: string) {
    apiSteps.addBasicAuth(this, userName, password, objectName);
  },
);

Given('I remove authentication from the test object {string}', function (this: ICustomWorld, objectName: string) {
  apiSteps.deleteAuthSection(this, objectName);
});

Given('I add the form data {string} to the test object {string}', function (this: ICustomWorld, formData: string, objectName: string) {
  apiSteps.addFormData(this, formData, objectName);
});

Given('I add the content data {string} to the test object {string}', function (this: ICustomWorld, formData: string, objectName: string) {
  apiSteps.addContentData(this, formData, objectName);
});

When(
  'I perform a {requestTypes} to {string} using {string}',
  function (this: ICustomWorld, method: string, url: string, objectName: string) {
    return apiSteps.sendRequest(this, method, url, objectName);
  },
);

Then('the status code for {string} will be equal to {string}', function (this: ICustomWorld, objectName: string, statusCode: string) {
  apiSteps.checkStatusCode(this, objectName, statusCode);
});

Then('the content for {string} will be equal to {string}', function (this: ICustomWorld, objectName: string, expectedData: string) {
  apiSteps.objectEqual(this, objectName, expectedData);
});
