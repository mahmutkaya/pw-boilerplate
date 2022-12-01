import BasePage from '../basePage';
import environment from '../../../../../environment.json';
import { BrowserContext, Page } from '@playwright/test';

export type BasicAuthSecrets = {
  username: string;
  password: string;
};

export default class ChannelsBasePage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.baseUrl = environment['channels-retail-web-app']['baseurl'];
    this.url = `${this.baseUrl}/`;
  }

  public async basicAuth(object: BasicAuthSecrets) {
    await this.basicAuthOpen(object['username'], object['password']);
  }
}
