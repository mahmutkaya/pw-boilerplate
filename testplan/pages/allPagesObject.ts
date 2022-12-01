import TestPage from './testPage';
import LoginPage from './channels-retail-web-app/loginPage';
import { Page, BrowserContext } from '@playwright/test';

export class AllPagesObject {
  testPage: TestPage;
  loginPage: LoginPage;

  constructor(public page: Page, public context: BrowserContext) {
    this.testPage = new TestPage(page, context);
    this.loginPage = new LoginPage(page, context);
  }
}
