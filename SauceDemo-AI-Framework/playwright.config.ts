import { defineConfig, devices } from '@playwright/test';
import { ENV } from './config/env';

const AUTH_FILE = 'playwright/.auth/user.json';
const CI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  failOnFlakyTests: CI,
  workers: CI ? 4 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: CI ? [['blob'], ['github'], ['junit', { outputFile: 'results/junit.xml' }]] : [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: ENV.baseURL,
    testIdAttribute: 'data-test',              // SauceDemo marks elements with data-test="..." → getByTestId('login-button')
    trace: 'retain-on-failure-and-retries',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },                                    // logs in once
    { name: 'guest', testDir: './tests/guest', use: { ...devices['Desktop Chrome'] } }, // logged-out pages, no setup
    {
      name: 'chromium', testDir: './tests/user', dependencies: ['setup'],              // start logged in
      use: { ...devices['Desktop Chrome'], storageState: AUTH_FILE },
    },
    {
      name: 'firefox', testDir: './tests/user', dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'], storageState: AUTH_FILE },
    },
    {
      name: 'webkit', testDir: './tests/user', dependencies: ['setup'],
      use: { ...devices['Desktop Safari'], storageState: AUTH_FILE },
    },
  ],
});
