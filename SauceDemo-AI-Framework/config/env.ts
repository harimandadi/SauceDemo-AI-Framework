import dotenv from 'dotenv';
import path from 'node:path';

// ONE switch (TEST_ENV) → ONE file (env/.env.<name>) → ONE typed object (ENV). CI secrets always win.
const TEST_ENV = process.env.TEST_ENV ?? 'local';
dotenv.config({ path: path.resolve(__dirname, `../env/.env.${TEST_ENV}`), quiet: true });

export const ENV = {
  name: TEST_ENV,
  baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
};

/** Credentials are read only when a test needs them, so guest tests run without any secrets. */
export function credentials(): { username: string; password: string } {
  const username = process.env.SAUCE_USERNAME;
  const password = process.env.SAUCE_PASSWORD;
  if (!username || !password) {
    throw new Error(`Set SAUCE_USERNAME and SAUCE_PASSWORD in env/.env.${TEST_ENV} or as CI secrets`);
  }
  return { username, password };
}
