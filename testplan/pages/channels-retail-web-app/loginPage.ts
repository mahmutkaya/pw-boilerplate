import ChannelsBasePage from './channelsBasePage';
import { BrowserContext, Page } from '@playwright/test';

export default class LoginPage extends ChannelsBasePage {
  url: string;
  elements = {
    emailField: '#email',
    passField: '#password',
    loginButton: 'button[type="submit"]',
    loginATBConnectButton: '[data-testid=atb-connect]',
    incorrectDataInfo: 'span.MuiTypography-root',
    forgotPassword: 'TEXT:Forgot password?',
  };

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.url = `${this.baseUrl}/login/`;
  }

  // amIOn() {
  //   this.shouldExist('emailField');
  //   this.shouldExist('passField');
  //   this.shouldExist('loginButton');
  //   this.shouldBeDisabled('loginButton');
  // }
}
