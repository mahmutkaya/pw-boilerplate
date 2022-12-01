import { ICustomWorld } from '../../../../support/customWorld';
import * as generic from '../functions/generic';
import { When } from '@cucumber/cucumber';

When('I wait for {int} seconds', async function (seconds: number) {
  return generic.iWaitSeconds(seconds);
});

When('I wait for {int} minutes', async function (minutes: number) {
  return generic.iWaitMinutes(minutes);
});

When('I wait for {int} milliseconds', async function (milliseconds: number) {
  return generic.iWaitMilliseconds(milliseconds);
});

When('I store {string} as {string}', function (this: ICustomWorld, value: string, key: string) {
  return generic.iStoreAs(this, value, key);
});

When('I calculate {string} and store it in {string}', function (this: ICustomWorld, evaluationStatement: string, key: string) {
  return generic.iCalculateAndStoreAs(this, evaluationStatement, key);
});

When('I import fixture file {string} as {string}', function (this: ICustomWorld, filePath: string, key: string) {
  generic.importFixtureFile(this, filePath, key);
});

// INFO:FIXME: Implement in SCA-288: Run over dataTable
// When(/^`(.+)` over table$/, (stepDef, dataTable) => {
//   dataTable.hashes().forEach((row) => {
//     var stepToRun = stepDef;
//     for (var propName in row) {
//       stepToRun = stepToRun.replace(`{{${propName}}}`, row[propName]);
//     }
//     RunStep(stepToRun);
//   });
// });

// INFO: FIXME: Implement in SCA-288: Run over dataTable
// Given(
//   /^I import fixture file '(.+)' and store as '(.+)':$/,
//   (fixtureFile, storeAs: string, dataTable) => {
//     getTestObject().then((testObjects) => {
//       cy.fixture(fixtureFile).then((fixtureObject) => {
//         let strFixtureObject: string = JSON.stringify(fixtureObject);

//         dataTable.hashes().forEach((item) => {
//           strFixtureObject = strFixtureObject.replace(
//             `{{${item.key}}}`,
//             item.value
//           );
//         });

//         strFixtureObject = evaluateParameters(testObjects, strFixtureObject);

//         if (isJSON(strFixtureObject)) {
//           strFixtureObject = JSON.parse(strFixtureObject)
//         }

//         testObjects[storeAs] = strFixtureObject;
//         wrapTestObject(testObjects);
//       });
//     });
//   }
// );
