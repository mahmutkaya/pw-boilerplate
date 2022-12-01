import { ICustomWorld } from '../../../../support/customWorld';
import * as pageObject from '../functions/pageObject';
import { When, Then } from '@cucumber/cucumber';

When('I open the {string} page', function (this: ICustomWorld, page: pageObject.Pages) {
  return pageObject.iOpenPage(this, page);
});

When('I reload the page', function (this: ICustomWorld) {
  return pageObject.iReloadPage(this);
});

When('I click on the element named {string}', function (this: ICustomWorld, elementName: string) {
  return pageObject.iClickElement(this, elementName);
});

When('I double click on the element named {string}', function (this: ICustomWorld, elementName: string) {
  return pageObject.iDoubleClickElement(this, elementName);
});

When('I type in {string} in the element named {string}', function (this: ICustomWorld, text: string, elementName: string) {
  return pageObject.iTypeInInput(this, text, elementName);
});

When('I clear the input field {string}', function (this: ICustomWorld, elementName: string) {
  return pageObject.iClearInput(this, elementName);
});

When('I check the checkbox {string}', function (this: ICustomWorld, elementName: string) {
  return pageObject.iCheckCheckbox(this, elementName);
});

When('I uncheck the checkbox {string}', function (this: ICustomWorld, elementName: string) {
  return pageObject.iUncheckCheckbox(this, elementName);
});

When(
  'I select the isValueAttribute: {string} value {string} from the {string} dropdown select',
  function (this: ICustomWorld, isValueAttribute: string, text: string, elementName: string) {
    return pageObject.iSelectFromDropdown(this, isValueAttribute, text, elementName);
  },
);

When('I store the text from {string} element as {string}', function (this: ICustomWorld, elementName: string, saveAs: string) {
  return pageObject.iStoreTextFromElement(this, elementName, saveAs);
});

Then('the element {string} should contain {string}', function (this: ICustomWorld, elementName: string, text: string) {
  return pageObject.elementShouldContain(this, elementName, text);
});

Then('the element {string} should not contain {string}', function (this: ICustomWorld, elementName: string, text: string) {
  return pageObject.elementShouldNotContain(this, elementName, text);
});

Then('the element {string} should be visible', function (this: ICustomWorld, elementName: string) {
  return pageObject.elementShouldBeVisible(this, elementName);
});

Then('the element {string} should not be visible', function (this: ICustomWorld, elementName: string) {
  return pageObject.elementShouldBeNotVisible(this, elementName);
});

Then('the element {string} should be enabled', function (this: ICustomWorld, elementName: string) {
  return pageObject.elementShouldBeEnabled(this, elementName);
});

Then('the element {string} should be disabled', function (this: ICustomWorld, elementName: string) {
  return pageObject.elementShouldBeDisabled(this, elementName);
});

Then('the element {string} should be checked', function (this: ICustomWorld, elementName: string) {
  return pageObject.elementShouldBeChecked(this, elementName);
});

Then('the element {string} should not be checked', function (this: ICustomWorld, elementName: string) {
  return pageObject.elementShouldNotBeChecked(this, elementName);
});

Then('the element {string} should be hidden', function (this: ICustomWorld, elementName: string) {
  return pageObject.elementShouldHidden(this, elementName);
});

Then('the element {string} should not exist', function (this: ICustomWorld, elementName: string) {
  return pageObject.elementShouldNotExist(this, elementName);
});
