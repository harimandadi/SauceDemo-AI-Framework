import { Page } from '@playwright/test';

/** Shared by every page object: the tab and how to open the page. */
export abstract class BasePage {
  protected abstract readonly path: string;            // each page declares its own URL path

  constructor(protected readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(this.path);
  }
}
