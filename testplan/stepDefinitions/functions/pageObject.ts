import { iStoreAs } from './generic';
import { ICustomWorld } from '../../../../support/customWorld';
import { evaluateParameters } from '../../../../helpers/evaluateParameters';

export type Pages = 'testPage' | 'loginPage';

function getPageObject(customWorld: ICustomWorld) {
  const page: Pages = customWorld.testObject.currentPage;
  return customWorld.pagesObject![page];
}

export async function iOpenPage(customWorld: ICustomWorld, page: Pages) {
  await customWorld.pagesObject![page].open();
  customWorld.testObject['currentPage'] = page;
}

export async function iReloadPage(customWorld: ICustomWorld) {
  await getPageObject(customWorld).reload();
}

export async function iClickElement(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).click(elementName);
}

export async function iDoubleClickElement(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).dbclick(elementName);
}

export async function iTypeInInput(customWorld: ICustomWorld, text: string, elementName: string) {
  text = evaluateParameters(customWorld.testObject, text);
  await getPageObject(customWorld).typeIn(elementName, text);
}

export async function iClearInput(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).clearField(elementName);
}

export async function iCheckCheckbox(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).check(elementName);
}

export async function iUncheckCheckbox(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).uncheck(elementName);
}

export async function iSelectFromDropdown(customWorld: ICustomWorld, isValueAttribute: string, text: string, elementName: string) {
  text = evaluateParameters(customWorld.testObject, text);
  const isTrueSet = isValueAttribute === 'true';
  await getPageObject(customWorld).selectFromDropDown(elementName, text, isTrueSet);
}

export async function iStoreTextFromElement(customWorld: ICustomWorld, elementName: string, saveAs: string) {
  const text = await getPageObject(customWorld).storeText(elementName);
  iStoreAs(customWorld, text, saveAs);
}

export async function elementShouldContain(customWorld: ICustomWorld, elementName: string, text: string) {
  text = evaluateParameters(customWorld.testObject, text);
  await getPageObject(customWorld).shouldContain(elementName, text);
}

export async function elementShouldNotContain(customWorld: ICustomWorld, elementName: string, text: string) {
  text = evaluateParameters(customWorld.testObject, text);
  await getPageObject(customWorld).shouldNotContain(elementName, text);
}

export async function elementShouldBeVisible(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).shouldBeVisible(elementName);
}

export async function elementShouldBeNotVisible(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).shouldNotBeVisible(elementName);
}

export async function elementShouldBeEnabled(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).shouldBeEnabled(elementName);
}

export async function elementShouldBeDisabled(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).shouldBeDisabled(elementName);
}

export async function elementShouldBeChecked(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).shouldBeChecked(elementName);
}

export async function elementShouldNotBeChecked(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).shouldNotBeChecked(elementName);
}

export async function elementShouldHidden(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).shouldBeHidden(elementName);
}

export async function elementShouldNotExist(customWorld: ICustomWorld, elementName: string) {
  await getPageObject(customWorld).shouldNotExist(elementName);
}
