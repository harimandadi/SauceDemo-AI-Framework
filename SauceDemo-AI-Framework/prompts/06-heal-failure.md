# 06 · Heal a failing test (playwright-test-healer)

**When:** a test fails locally or in CI. **Tool:** the `playwright-test-healer` agent (created by `npm run agents:init`).
**Input:** the failing test + `test-results/**/error-context.md` (written by Playwright on failure) or the trace.
If you only have a CI failure, download its report artifact or reproduce it locally first.

```
Use the playwright-test-healer agent.
Follow CLAUDE.md. Fix the failing test "<TEST TITLE>" in <FILE>.
1. If there is no fresh error context, reproduce: npx playwright test <FILE> --project=chromium
2. Start from test-results/**/error-context.md (error + page snapshot); open the trace if needed:
   npx playwright show-trace <path to trace.zip>
Rules: fix locators/methods in the page object, not in the spec; never change an expected text or
value; no waitForTimeout, no extra retries, no longer timeouts.
If the APPLICATION is wrong: mark the test test.fixme('BUG: <one line>') and explain.
Done = npx playwright test <FILE> --project=chromium --repeat-each=3 is green (or the test is fixme'd).
Answer: root cause, the change (file:line), and "test issue" or "app issue".
```

**Human check:** approve the classification; app issue → ticket.
