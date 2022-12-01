import { ICustomWorld } from '../../../support/customWorld';
import expect from 'expect';
import { Given } from '@cucumber/cucumber';
import { AxiosResponse } from 'axios';

Given('A bored activity is recieved', async function (this: ICustomWorld) {
  const response: AxiosResponse | undefined = await this.apiClient?.get('https://swapi.dev/api/people/1');
  expect(response).toBeDefined();
});
