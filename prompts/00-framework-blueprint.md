# 00 · Framework blueprint (architect + AI, before any test)

**When:** day 1, empty repo. **Tool:** chat, no browser. **Owner:** QA architect.

```
You are helping a QA architect design a Playwright + TypeScript test framework.
Application: https://www.saucedemo.com (demo shop: login, products, cart, 3-step checkout).
Constraints: UI tests only for now, 3 browsers, CI on GitHub Actions, AI agents (Playwright MCP,
Test Agents, Playwright CLI) will generate tests, so the structure must be easy for agents to follow.

Propose (do NOT write tests yet):
1. Folder structure with one sentence per folder.
2. Layers and their rules (what may import what).
3. Fixture design (which fixtures, scopes).
4. Locator strategy (the app uses data-test attributes; inputs have no labels).
5. Authentication strategy (log in once).
6. Test data strategy (unique, cleanup).
7. Projects / tags / CI sharding plan.
8. What goes in CLAUDE.md for AI agents (max 12 rules).
9. Risks of this design and how to mitigate them.
Answer as a table per point. Ask me questions where a decision is mine.
```

**Human check:** the architect accepts, changes or rejects each point and records the decisions
(e.g. in docs/decisions.md). AI proposes, the architect decides.
