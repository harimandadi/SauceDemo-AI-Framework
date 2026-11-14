import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Login page (/). Inputs have no <label> (found by exploration), so we use data-test ids. */
export class LoginPage extends BasePage {
  protected readonly path = '/';
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;                              // <h3 data-test="error">Epic sadface: ...</h3>

  constructor(page: Page) {
    super(page);
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.error = page.getByTestId('error');
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
