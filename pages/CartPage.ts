import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Cart (/cart.html). */
export class CartPage extends BasePage {
  protected readonly path = '/cart.html';
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
