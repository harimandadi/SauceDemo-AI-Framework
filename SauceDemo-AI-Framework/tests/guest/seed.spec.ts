import { test, expect } from '../../fixtures/baseTest';

// SEED (logged out): where AI sessions for login features start.
test('seed: login page', async ({ loginPage }) => {
  await loginPage.open();
  await expect(loginPage.loginButton).toBeVisible();
});
