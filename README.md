# SauceDemo AI-first Playwright framework (practice reference)

## Quick start
```bash
npm install
npx playwright install
cp env/.env.example env/.env.local     # fill SAUCE_USERNAME / SAUCE_PASSWORD (shown on saucedemo's login page)
npm run test:guest                     # logged-out tests, no credentials needed
npx playwright test --project=chromium # logs in once (setup), then checkout tests
```

## AI setup (once)
```bash
npm run agents:init        # planner / generator / healer → .claude/agents, .claude/prompts
npm run cli:skills         # teaches your coding agent the Playwright CLI
npx playwright test --project=setup   # saves playwright/.auth/user.json for MCP and seeds
```
`.mcp.json` (Claude Code) and `.vscode/mcp.json` (Copilot) are committed.
On Windows use `"command": "cmd", "args": ["/c", "npx", ...]` if `npx` is not found.

## Workflow for a feature
prompts/README.md: 01/02 explore → 03 plan (review + commit) → 04 page objects → 05 generate one scenario
at a time → 06 heal → 07 review → PR with the checklist.
