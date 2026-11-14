# 01 · Explore a feature with Playwright MCP

**When:** before planning or coding a feature, in a chat-style session. **Tool:** Playwright MCP (.mcp.json "playwright").
**Prereq (once):** `npx playwright test --project=setup` → saves playwright/.auth/user.json, which MCP loads
(`--storage-state`), so the session starts logged in.

```
Follow CLAUDE.md. Use the Playwright MCP browser tools (not the CLI) for this exploration.
You are already logged in via storage state; never type a password.
Open https://www.saucedemo.com/inventory.html.
Explore the <FEATURE, e.g. CHECKOUT> feature: add "Sauce Labs Backpack", open the cart, Checkout,
submit step 1 with every field empty, then fill it and continue to the overview, then Finish.
Report as a table:
- page URL, heading, every control with its data-test id and role/name
- every exact message and amount shown (errors, totals, final header)
- anything odd (missing labels, duplicate ids, unexpected behaviour)
Save the table to specs/<feature>.facts.md (e.g. specs/checkout.facts.md).
Do NOT write test code. Keep snapshots small (target the form, not the whole page).
```

**Output:** specs/<feature>.facts.md → input for the plan prompt (03).
**Human check:** skim; anything surprising becomes an Open question.
