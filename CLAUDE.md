# CLAUDE.md: rules for every AI session in this repo (keep it short)

## Project
Playwright + TypeScript tests for https://www.saucedemo.com (Swag Labs demo shop).
Workflow and prompts: prompts/README.md.

## Structure (put code ONLY here)
- pages/            page objects (extend BasePage; locators + business actions)
- fixtures/baseTest.ts   the ONLY place specs import test/expect from
- test-data/        builders and data-driven cases (unique data by default)
- tests/guest/      logged-out tests (project: guest)
- tests/user/       logged-in tests (projects: chromium, firefox, webkit; storageState)
- specs/            <feature>.facts.md (exploration) and <feature>.plan.md (reviewed plans)

## Rules
1. Import `test`/`expect` from `fixtures/baseTest`, never from `@playwright/test` in a spec.
2. Locators: `getByTestId` (testIdAttribute = data-test) or `getByRole`; no XPath, no CSS chains, no `nth()` without a reason.
3. Locators live in page objects; specs call page-object methods and assert.
4. Never use `waitForTimeout`; use web-first assertions (`toHaveText`, `toBeVisible`, `toHaveURL`).
5. Assert EXACT texts and values from the reviewed plan; never "visible only".
6. Start browser sessions from a seed: `tests/guest/seed.spec.ts` or `tests/user/seed-logged-in.spec.ts`.
7. Never type, print or commit passwords; credentials come from env (`config/env.ts`).
8. One scenario per generation session; tag every test (@smoke / @regression + feature tag).
9. Never change an expected value to make a test pass. App bug → `test.fixme('BUG: ...')` + say so.
10. Done = `npx tsc --noEmit` passes AND the new test passes 3x: `npx playwright test <file> --project=chromium --repeat-each=3`.
11. Browser tools: Playwright CLI (`npx playwright cli`) when editing code; Playwright MCP only for exploration chats.
12. Verify a locator on the live page before writing it; never guess one.
13. Keep the generated agent files (.claude/agents) as generated; project rules belong in this file.
