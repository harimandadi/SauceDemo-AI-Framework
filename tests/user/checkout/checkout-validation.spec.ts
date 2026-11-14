import { test, expect } from '../../../fixtures/baseTest';
import { missingFieldCases } from '../../../test-data/customers';

// Scenarios 2.1 – 2.3 of specs/checkout.plan.md (data-driven: one test per row)
test.describe('Checkout information validation', { tag: ['@checkout', '@regression'] }, () => {
  test.beforeEach(async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  for (const { field, customer, message } of missingFieldCases) {
    test(`missing ${field} shows "${message}"`, async ({ checkoutInfoPage, page }) => {
      await checkoutInfoPage.fillAndContinue(customer);
      await expect(checkoutInfoPage.error).toHaveText(message);
      await expect(page).toHaveURL(/checkout-step-one\.html$/);           // still on step 1
    });
  }
});
