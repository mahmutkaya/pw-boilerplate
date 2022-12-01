import { ICustomWorld } from '../../../../support/customWorld';
import log from '../../../../helpers/logging/logging';
// import { formatJson } from '../../../../helpers/json';
import { When } from '@cucumber/cucumber';
import { request, expect } from '@playwright/test';

// !!!!!!!!
// INFO: FIXME: THIS FILE IS STILL WIP DON'T WASTE TIME ON IT...
// !!!!!!!!
When('I perform grapql query', async function (this: ICustomWorld) {
  const sampleQuery = `{
    getCityByName(name:"New York") {
      name
      country
      coord {
        lon
        lat
      }
    }
  }`;

  const url = 'https://graphql-weather-api.herokuapp.com';
  const context = await request.newContext({
    baseURL: url,
  });

  const response = await context.post('/', {
    data: {
      query: sampleQuery,
    },
  });

  // INFO: don't use text to expect
  // const responseDataText = await response.text();
  const responseDataJson = await response.json();

  log.info((await response.body()).toString());

  expect(response.status()).toBe(200);

  expect(responseDataJson).toEqual({
    data: {
      getCityByName: { coord: { lat: 40.7143, lon: -74.006 }, country: 'US', name: 'New York' },
    },
  });

  expect(JSON.stringify(responseDataJson)).toBe(
    '{"data":{"getCityByName":{"name":"New York","country":"US","coord":{"lon":-74.006,"lat":40.7143}}}}',
  );

  expect(responseDataJson).toMatchObject({
    data: {
      getCityByName: { coord: { lat: 40.7143, lon: -74.006 }, country: 'US', name: 'New York' },
    },
  });
});

When('I test interception', async function (this: ICustomWorld) {
  const page = this.page!;

  // INFO: interception example
  page.on('request', (request) => {
    if (request.url().includes('v1/graphql')) {
      // eslint-disable-next-line no-console
      console.log('>> request url:', request.url());
      // eslint-disable-next-line no-console
      console.log('>> request data:', request.postDataJSON());
    }
  });

  page.on('response', async (response) => {
    if (response.url().includes('v1/graphql')) {
      const resp = await response.text();
      // eslint-disable-next-line no-console
      console.log('  >> response url:', response.url());
      // eslint-disable-next-line no-console
      console.log('  >> response json:', resp);
    }
  });

  await page.route('**/v1/graphql', async (route, request) => {
    if (request.postDataJSON().operationName === 'vote') {
      // eslint-disable-next-line no-console
      console.log('In the route');
    }

    await route.continue();
  });

  await page.goto('https://realtime-poll.demo.hasura.io/');
  await page.locator('text="Vue"').click();
  await page.locator('text=🗳 Vote').click();

  log.info('BEFORE ROUTE');

  // INFO: Waiting for request I
  // await page.locator('text=🗳 Vote').click();
  // const response = await page.waitForResponse('https://realtime-poll.hasura.app/v1/graphql');
  // log.info(formatJson(response.json()));

  // INFO: Waiting for request II
  // const [response] = await Promise.all([
  //   // Waits for the next response matching some conditions
  //   page.waitForResponse(
  //     (response) =>
  //       response.url() === 'https://realtime-poll.hasura.app/v1/graphql' &&
  //       response.status() === 200,
  //   ),
  //   // Triggers the response
  //   page.locator('text=🗳 Vote').click(),
  // ]);

  // log.info(formatJson(response));
});

//async

//async function isFinished(response) {
// return response.url().includes('https://services/url') && response.status() === 200 && (await response.json()).response === 'Completed'
// }

// const response = await page.waitForResponse(async (response) => await isFinished(response));
