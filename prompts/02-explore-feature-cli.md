# 02 · Explore with Playwright CLI (fewest tokens)

**When:** same as 01, but inside a coding agent / large repo. **Tool:** `npx playwright cli` + skill.
**Prereq (once):** `npm run cli:skills` (installs .claude/skills/playwright-cli) and
`npx playwright test --project=setup` (saves playwright/.auth/user.json).

```
Follow CLAUDE.md. Use the Playwright CLI (not MCP):
1. npx playwright cli open https://www.saucedemo.com/
2. npx playwright cli state-load playwright/.auth/user.json   (logged-in session; never type passwords)
3. npx playwright cli goto https://www.saucedemo.com/inventory.html
4. Use `find` to read only what you need; act on refs from the latest snapshot only
   (take a new snapshot after every navigation: refs expire).
5. Use `eval` to read data-test attributes when the snapshot has no names.
Collect the same facts as prompts/01 and save the table to specs/<feature>.facts.md.
Do NOT write test code. Close the browser at the end: npx playwright cli close
```

Real example (login page, run while building this project):
```
$ npx playwright cli open https://www.saucedemo.com/
$ npx playwright cli click e15            # Login with empty form
  await page.locator('[data-test="login-button"]').click();
$ npx playwright cli find "sadface"
  - text: "Epic sadface: Username is required"
```
