# Prompt library: use in this order

## One-time setup (before any prompt)
```bash
npm install && npx playwright install
npx playwright test --project=setup     # saves playwright/.auth/user.json (needs env/.env.local)
npm run agents:init                     # creates the planner / generator / healer agents
npm run cli:skills                      # installs .claude/skills/playwright-cli
```

| # | File | Phase | Tool / agent to use | Output | Human check |
|---|------|-------|---------------------|--------|-------------|
| 00 | 00-framework-blueprint.md | Design | chat (no browser) | docs/decisions.md | architect decides |
| 01 | 01-explore-feature-mcp.md | Explore | Playwright MCP | specs/<feature>.facts.md | skim the facts |
| 02 | 02-explore-feature-cli.md | Explore (cheap) | Playwright CLI | specs/<feature>.facts.md | skim the facts |
| 03 | 03-plan-feature.md | Plan | `playwright-test-planner` | specs/<feature>.plan.md | review + commit |
| 04 | 04-page-objects.md | Build | coding agent + Playwright CLI | pages/*.ts + fixture lines | code review |
| 05 | 05-generate-scenario.md | Generate | `playwright-test-generator` | one spec per scenario | code review |
| 06 | 06-heal-failure.md | Heal | `playwright-test-healer` | minimal fix + root cause | test or app issue? |
| 07 | 07-review-tests.md | Review | coding agent (git diff) | findings table | reviewer decides |
| 08 | 08-coverage-chain.md | Whole feature | planner → generator → healer | plan + specs | review between steps |
| 09 | 09-flaky-investigation.md | Maintain | coding agent + CLI, then healer | cause + fix + evidence | approve fix |

Claude Code shortcuts: the same steps are slash commands in `.claude/commands/`
(`/explore`, `/plan-feature`, `/page-objects`, `/generate`, `/heal`, `/review-tests`).

## Rules for every prompt
1. Start with "Follow CLAUDE.md" (and name the agent when one is meant: "Use the playwright-test-planner agent").
2. Name the seed and the start page; never put credentials in a prompt.
3. Give exact expectations (texts, values, business rules), not "verify it works".
4. Name the output file(s); one scenario per session.
5. Define "done" (tsc + `--repeat-each=3` green) and ask for a report of what was run.
6. Fill every `<PLACEHOLDER>` before sending.
