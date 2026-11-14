import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import type { Customer } from '../test-data/customers';

/** Step 1: Your Information (/checkout-step-one.html). */
export class CheckoutInfoPage extends BasePage {
  protected readonly path = '/checkout-step-one.html';
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.error = page.getByTestId('error');
  }

  async fillAndContinue(customer: Customer): Promise<void> {
    await this.firstName.fill(customer.firstName);
    await this.lastName.fill(customer.lastName);
    await this.postalCode.fill(customer.postalCode);
    await this.continueButton.click();
  }
}

/** Step 2: Overview (/checkout-step-two.html). */
export class CheckoutOverviewPage extends BasePage {
  protected readonly path = '/checkout-step-two.html';
  readonly items: Locator;
  readonly subtotal: Locator;                           // "Item total: $29.99"
  readonly tax: Locator;                                // "Tax: $2.40"
  readonly total: Locator;                              // "Total: $32.39"
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.getByTestId('inventory-item');
    this.subtotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
  }

  /** Reads the three amounts as numbers, so tests can check the business rule total = subtotal + tax. */
  async amounts(): Promise<{ subtotal: number; tax: number; total: number }> {
    const money = async (label: Locator) => Number((await label.innerText()).split('$')[1]);
    return { subtotal: await money(this.subtotal), tax: await money(this.tax), total: await money(this.total) };
  }
}

/** Step 3: Complete (/checkout-complete.html). */
export class CheckoutCompletePage extends BasePage {
  protected readonly path = '/checkout-complete.html';
  readonly header: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.getByTestId('complete-header');
    this.backHomeButton = page.getByTestId('back-to-products');
  }
}
