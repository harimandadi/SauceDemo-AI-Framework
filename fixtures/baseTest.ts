import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage, CheckoutOverviewPage, CheckoutCompletePage } from '../pages/CheckoutPages';
import { buildCustomer, Customer } from '../test-data/customers';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  customer: Customer;                                  // unique checkout data per test
};

/** ONE project-wide test: specs (human or AI written) import { test, expect } from here. */
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  inventoryPage: async ({ page }, use) => { await use(new InventoryPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  checkoutInfoPage: async ({ page }, use) => { await use(new CheckoutInfoPage(page)); },
  checkoutOverviewPage: async ({ page }, use) => { await use(new CheckoutOverviewPage(page)); },
  checkoutCompletePage: async ({ page }, use) => { await use(new CheckoutCompletePage(page)); },
  customer: async ({}, use) => { await use(buildCustomer()); },
});

export { expect } from '@playwright/test';
