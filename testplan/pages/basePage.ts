import log from '../../../helpers/logging/logging';
import { BrowserContext, Page, Browser, expect } from '@playwright/test';

export default class BasePage {
  page: Page;
  browser: Browser;
  context: BrowserContext;
  elements: Record<string, any>;
  url: string;
  baseUrl: string;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  // INFO: ACTIONS
  protected async basicAuthOpen(username: string, password: string) {
    this.context.setHTTPCredentials({ username: username, password: password });
    log.info(`Opening with basic authentication ${this.url} page`);
    await this.page.goto(this.url);
  }

  public async open() {
    log.info(`Opening ${this.url} page`);
    await this.page.goto(this.url);
  }

  public async reload() {
    log.info(`Reloading of ${this.url}`);
    await this.page.reload();
  }

  public async click(selectorKey: string) {
    log.info(`Clicking on ${selectorKey}`);
    await (await this.getElement(selectorKey)).click();
  }

  public async dbclick(selectorKey: string) {
    log.info(`Double clicking on ${selectorKey}`);
    await (await this.getElement(selectorKey)).dblclick();
  }

  public async typeIn(selectorKey: string, text: string) {
    log.info(`Typing into ${selectorKey} - '${text}'`);
    await (await this.getElement(selectorKey)).type(text);
  }

  public async clearField(selectorKey: string) {
    log.info(`Clearing ${selectorKey} field`);
    await (await this.getElement(selectorKey)).fill('');
  }

  public async check(selectorKey: string) {
    log.info(`Check ${selectorKey} checkbox`);
    await (await this.getElement(selectorKey)).check();
  }

  public async uncheck(selectorKey: string) {
    log.info(`Uncheck ${selectorKey} checkbox`);
    await (await this.getElement(selectorKey)).uncheck();
  }

  public async storeText(selectorKey: string) {
    log.info(`Store text from ${selectorKey} element`);
    return await (await this.getElement(selectorKey)).innerText();
  }

  public async selectFromDropDown(selectorKey: string, text: string, isValueAttribute: boolean) {
    log.info(`Select ${text} value from ${selectorKey} dropdown`);

    await this.getElement(selectorKey);
    isValueAttribute ? await this.page.selectOption(selectorKey, text) : await this.page.selectOption(selectorKey, { label: text });
  }

  // INFO: ASSERTIONS
  public async shouldContain(selectorKey: string, text: string) {
    log.info(`Element ${selectorKey} should contain text: ${text}`);
    const element = await this.getElement(selectorKey);

    if (selectorKey.toLowerCase().includes('input')) {
      const elementText = await element.inputValue();
      return await expect(elementText).toEqual(text);
    }

    return await expect(element).toContainText(text);
  }

  public async shouldNotContain(selectorKey: string, text: string) {
    log.info(`Element ${selectorKey} should contain text: ${text}`);
    const element = await this.getElement(selectorKey);

    if (selectorKey.toLowerCase().includes('input')) {
      const elementText = await element.inputValue();
      return await expect(elementText).not.toEqual(text);
    }

    return await expect(element).not.toContainText(text);
  }

  public async shouldBeVisible(selectorKey: string) {
    log.info(`Element ${selectorKey} should be visible`);
    await expect(await this.getElement(selectorKey)).toBeVisible();
  }

  public async shouldNotBeVisible(selectorKey: string) {
    log.info(`Element ${selectorKey} should not be visible`);
    await expect(await this.getElement(selectorKey, false)).not.toBeVisible();
  }

  public async shouldBeEnabled(selectorKey: string) {
    log.info(`Element ${selectorKey} should be enabled`);
    await expect(await this.getElement(selectorKey)).toBeEnabled();
  }

  public async shouldBeDisabled(selectorKey: string) {
    log.info(`Element ${selectorKey} should be disabled`);
    await expect(await this.getElement(selectorKey)).not.toBeEnabled();
  }

  public async shouldBeChecked(selectorKey: string) {
    log.info(`Element ${selectorKey} should be checked`);
    await expect(await this.getElement(selectorKey)).toBeChecked({ checked: true });
  }

  public async shouldNotBeChecked(selectorKey: string) {
    log.info(`Element ${selectorKey} should not be checked`);
    await expect(await this.getElement(selectorKey)).toBeChecked({ checked: false });
  }

  public async shouldBeHidden(selectorKey: string) {
    log.info(`Element ${selectorKey} should be hidden`);
    await expect(await this.getElement(selectorKey, false)).toBeHidden();
  }

  public async shouldNotExist(selectorKey: string) {
    log.info(`Element ${selectorKey} should not exist`);
    await expect(await this.getElement(selectorKey, false)).toHaveCount(0);
  }

  // INFO: HELPERS
  private getWrapper(elementName: string) {
    const [type, ...rest] = elementName.split(':');
    const name = rest.join(':');

    switch (type) {
      case 'TEXT': {
        log.info(`Selecting via text ${elementName} - exact`);
        return this.page.locator(`text="${name}"`);
      }

      case 'APPROX-TEXT': {
        log.info(`Selecting via text ${elementName} - non exact`);
        return this.page.locator(`text=${name}`);
      }

      default:
        if (elementName.includes('//')) {
          log.info(`Selecting via xpath ${elementName}`);
        } else {
          log.info(`Selecting via css ${elementName}`);
        }

        return this.page.locator(elementName);
    }
  }

  private selectorKeyWrapper(selectorKey: string) {
    // eslint-disable-next-line no-prototype-builtins
    if (this.elements.hasOwnProperty(selectorKey)) {
      return this.elements[selectorKey];
    }
    return selectorKey;
  }

  private async getElement(selectorKey: string, isDisplayed = true) {
    const element = this.getWrapper(this.selectorKeyWrapper(selectorKey));
    if (isDisplayed === true) {
      await element.scrollIntoViewIfNeeded();
    }
    return element;
  }
}
