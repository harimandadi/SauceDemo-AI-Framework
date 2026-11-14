import { test as setup, expect } from '../fixtures/baseTest';
import { credentials } from '../config/env';

const AUTH_FILE = 'playwright/.auth/user.json';

// Runs once before the logged-in projects; AI sessions also start from this saved session.
setup('log in once and save the session', async ({ loginPage, inventoryPage, page }) => {
  const { username, password } = credentials();
  await loginPage.open();
  await loginPage.login(username, password);
  await expect(inventoryPage.title).toHaveText('Products');
  await page.context().storageState({ path: AUTH_FILE });
});
