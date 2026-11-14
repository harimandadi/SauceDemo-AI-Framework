# 07 · AI-assisted review of test code

**When:** before a human review of a test PR. **Tool:** coding agent (it can run git) or chat with the diff pasted.

```
Follow CLAUDE.md. Review the test changes on this branch:
git diff main...HEAD -- tests pages fixtures test-data specs
Compare against CLAUDE.md and the plan in specs/<feature>.plan.md. Report findings as a table
(file:line, problem, suggested fix), most severe first:
- weak assertions (toBeVisible / toBeTruthy only) or missing exact texts from the plan
- waitForTimeout, retries or long timeouts added to make it pass
- locators outside page objects, XPath/CSS chains, nth() without reason
- shared or hard-coded data, dependency on another test, missing tags or scenario ids
- expected values that differ from the plan
- anything that leaks credentials or personal data
Do NOT change any file; list findings only.
```

**Human check:** the reviewer decides; AI findings are suggestions.
