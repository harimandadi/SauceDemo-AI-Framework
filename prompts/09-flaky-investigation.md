# 09 · Investigate a flaky test

**When:** a test passes alone but fails sometimes in CI. **Tool:** coding agent + Playwright CLI; the
`playwright-test-healer` agent for the fix.

```
Follow CLAUDE.md. The test "<TEST TITLE>" in <FILE> is flaky in CI.
1. Reproduce under load: npx playwright test <FILE> --project=chromium --repeat-each=20 --workers=4
2. Read the failing run's error-context.md and trace (npx playwright show-trace <trace.zip>).
3. Classify the cause: timing assertion (asserting a moment instead of a state), shared data,
   order dependency, animation, network, environment.
4. Propose the smallest fix that asserts a STATE (web-first assertion, unique data, mock), not a wait;
   never add waitForTimeout, retries or longer timeouts.
5. Prove it: the same command is 20/20 green. Report cause, fix (file:line) and the evidence.
```

**Human check:** approve the fix; if the app itself is unstable, raise a ticket.
