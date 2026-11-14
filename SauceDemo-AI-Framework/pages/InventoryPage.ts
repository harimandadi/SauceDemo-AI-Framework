import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Products list (/inventory.html). */
export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';
  readonly title: Locator;
  readonly items: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');                         // "Products"
    this.items = page.getByTestId('inventory-item');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  /** One product card, found by its visible name. */
  item(name: string): Locator {
    return this.items.filter({ hasText: name });
  }

  async addToCart(name: string): Promise<void> {
    await this.item(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async priceOf(name: string): Promise<number> {
    const text = await this.item(name).getByTestId('inventory-item-price').innerText();   // "$29.99"
    return Number(text.replace('$', ''));
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
