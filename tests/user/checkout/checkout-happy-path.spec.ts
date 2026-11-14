import { test, expect } from '../../../fixtures/baseTest';

// Scenario 1.1 of specs/checkout.plan.md
test('1.1 buy one product: totals are correct and the order completes', { tag: ['@checkout', '@smoke'] },
  async ({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, checkoutCompletePage, customer }) => {
    const product = 'Sauce Labs Backpack';

    await inventoryPage.open();
    const price = await inventoryPage.priceOf(product);
    await inventoryPage.addToCart(product);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.items).toContainText(product);
    await cartPage.checkout();

    await checkoutInfoPage.fillAndContinue(customer);

    await expect(checkoutOverviewPage.items).toContainText(product);
    const { subtotal, tax, total } = await checkoutOverviewPage.amounts();
    expect(subtotal).toBe(price);                                        // item total = product price
    expect(total).toBeCloseTo(subtotal + tax, 2);                        // business rule: total = subtotal + tax

    await checkoutOverviewPage.finishButton.click();
    await expect(checkoutCompletePage.header).toHaveText('Thank you for your order!');
  });
