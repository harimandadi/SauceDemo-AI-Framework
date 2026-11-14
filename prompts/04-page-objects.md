# 04 · Page objects for a feature (coding agent)

**When:** after the plan is committed, before generating specs. **Tool:** coding agent + Playwright CLI.
**Prereq (once):** `npm run cli:skills` (installs .claude/skills/playwright-cli) and
`npx playwright test --project=setup` (saves playwright/.auth/user.json).

```
Follow CLAUDE.md. Using specs/checkout.plan.md and the explored facts, create or extend page objects:
- pages/CartPage.ts, pages/CheckoutPages.ts (CheckoutInfoPage, CheckoutOverviewPage, CheckoutCompletePage)
- each extends BasePage, declares `path`, uses getByTestId (data-test) or getByRole only
- business methods: fillAndContinue(customer), amounts() returning numbers
- add one fixture per page in fixtures/baseTest.ts
- verify every locator on the live page with the Playwright CLI (npx playwright cli), NOT MCP:
    1. npx playwright cli open https://www.saucedemo.com/
    2. npx playwright cli state-load playwright/.auth/user.json      (logged in; never type a password)
    3. npx playwright cli goto <page URL from the plan>
    4. npx playwright cli find "<text>"  /  npx playwright cli --raw eval "() => ..."   (read data-test ids)
    5. take a new snapshot after every navigation (refs expire), then write the locator
    6. npx playwright cli close when done
No specs yet. Done = npx tsc --noEmit passes. List every locator you verified and the command that proved it.
```

**Human check:** code review: naming, no duplicated locators, methods express business actions.
