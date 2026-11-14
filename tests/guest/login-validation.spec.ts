import { test, expect } from '../../fixtures/baseTest';

// Texts below were captured live by the exploration step (no password needed for these cases).
test.describe('Login validation', { tag: ['@login', '@smoke'] }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('empty form shows "Username is required"', async ({ loginPage }) => {
    await loginPage.loginButton.click();
    await expect(loginPage.error).toHaveText('Epic sadface: Username is required');
  });

  test('username without password shows "Password is required"', async ({ loginPage }) => {
    await loginPage.username.fill('standard_user');
    await loginPage.loginButton.click();
    await expect(loginPage.error).toHaveText('Epic sadface: Password is required');
  });

  test('password field hides what is typed', async ({ loginPage }) => {
    await expect(loginPage.password).toHaveAttribute('type', 'password');
  });
});
