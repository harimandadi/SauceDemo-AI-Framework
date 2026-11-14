import { test, expect } from '../../fixtures/baseTest';

// SEED (logged in via storageState): where AI sessions for shopping and checkout start.
test('seed: products page, logged in', async ({ inventoryPage }) => {
  await inventoryPage.open();
  await expect(inventoryPage.title).toHaveText('Products');
});
