## What this PR covers
- Feature / plan scenario ids (e.g. specs/checkout.plan.md 1.1):

## AI usage
- [ ] No AI used
- [ ] AI used: tool (MCP / Test Agents / CLI / chat) + prompt file from /prompts: ______
- [ ] Plan reviewed and committed before generation

## Checklist
- [ ] I understand every line and can explain each assertion
- [ ] Imports from fixtures/baseTest; locators only in pages/; getByTestId / getByRole
- [ ] Exact texts and values asserted (from the plan); no waitForTimeout; no test.only
- [ ] Unique data; no dependency on other tests; tags added
- [ ] No credentials or personal data in code, prompts or screenshots
- [ ] `npx tsc --noEmit` passes; new tests pass 3x (`--repeat-each=3`)
- [ ] No expected value changed to make a test pass (bug → test.fixme + ticket)
