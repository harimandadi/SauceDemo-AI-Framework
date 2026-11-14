# Copilot instructions (same rules as CLAUDE.md; keep both files in sync)

Project: Playwright + TypeScript tests for https://www.saucedemo.com. Workflow and prompts: prompts/README.md.

Where code goes: pages/ (page objects, extend BasePage) · fixtures/baseTest.ts (the only test/expect import)
· test-data/ (builders) · tests/guest (logged out) · tests/user (logged in) · specs/ (facts + reviewed plans).

Rules:
1. Specs import `test`/`expect` from `fixtures/baseTest`, never from `@playwright/test`.
2. Locators: `getByTestId` (data-test) or `getByRole`, only inside page objects; no XPath / CSS chains.
3. No `waitForTimeout`; web-first assertions with EXACT texts and values from the reviewed plan.
4. Start from a seed test; never type, print or commit passwords (credentials come from env).
5. One scenario per session; tag every test (@smoke / @regression + feature tag).
6. Never change an expected value to make a test pass; app bug → `test.fixme('BUG: ...')`.
7. Done = `npx tsc --noEmit` passes and the new test passes 3x (`--project=chromium --repeat-each=3`).
8. Verify every locator on the live page before writing it.
