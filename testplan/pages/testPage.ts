import BasePage from './basePage';
import { BrowserContext, Page } from '@playwright/test';

export type BasicAuthSecrets = {
  username: string;
  password: string;
};

export default class TestPage extends BasePage {
  baseUrl: string;
  url: string;
  elements = {
    submitButton: '.action-form [type="submit"]',
    emailAddressInput: 'input[type="email"]',
    checkbox: '.action-checkboxes [value="checkbox1"]',
    select: 'select.action-select',
    visibilityInputButton: '.action-div',
    visibilityInput: '.action-input-hidden',
    enabledElement: '.form-group [type="email"]',
    disabledElement: '.form-control.action-disabled',
    notExistingElement: '.batman',
    elementExactTextMatch: 'TEXT:Email address',
    elementPartialTextMatch: 'APPROX-TEXT:being covered',
    elementXpath: '//button[text()="Click to toggle popover"]',
    elementCss: '.opacity-cover',
  };

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.baseUrl = 'https://example.cypress.io';
    this.url = `${this.baseUrl}/commands/actions`;
  }
}
