# SauceDemo AI-first Playwright framework (practice reference)

Playwright + TypeScript test framework for **https://www.saucedemo.com** (Swag Labs demo shop),
designed and extended **with AI**: Playwright MCP, Playwright Test Agents (planner / generator / healer)
and the Playwright CLI.

This README explains **how every prompt and every instruction file is used to create the framework**:
what you type, which AI tool runs it, which files it reads, which framework files it creates, and who approves.

> **Golden rule:** AI proposes and drafts · the architect decides · the framework constrains · tests prove.
> Every AI step = **1 prompt file → 1 tool / agent → files written into the framework → 1 human gate**.

**Contents:**
[1 Quick start](#1-quick-start-no-ai-needed) ·
[2 Structure](#2-folder-structure) ·
[3 Instruction files](#3-the-instruction-files-what-the-ai-always-reads) ·
[4 One-time AI setup](#4-one-time-ai-setup) ·
[5 How to give a prompt](#5-how-to-give-a-prompt) ·
[6 Prompt by prompt](#6-how-each-prompt-builds-the-framework) ·
[7 Worked example](#7-worked-example-the-checkout-feature-end-to-end) ·
[8 Prompt map](#8-prompt-map) ·
[9 Writing good prompts](#9-how-to-write-a-good-prompt) ·
[10 New feature](#10-adding-a-new-feature) ·
[11 Scalability](#11-what-keeps-it-scalable) ·
[12 Troubleshooting](#12-troubleshooting) ·
[13 Status](#13-status-of-this-practice-project)

---

## 1. Quick start (no AI needed)

```bash
npm install
npx playwright install
npm run test:guest                       # 4 logged-out tests, no credentials needed
cp env/.env.example env/.env.local       # fill SAUCE_USERNAME / SAUCE_PASSWORD (shown on saucedemo's login page)
npx playwright test --project=chromium   # logs in once (setup project), then the checkout tests
npx playwright show-report               # HTML report with traces
```

| Script | What it runs |
|---|---|
| `npm test` | everything (setup · guest · chromium · firefox · webkit) |
| `npm run test:guest` | logged-out tests only (no credentials) |
| `npm run test:smoke` | tests tagged `@smoke` |
| `npm run test:checkout` | checkout tests on chromium |
| `npm run typecheck` | `tsc --noEmit` (Playwright itself does **not** type-check: a test with type errors still runs) |
| `npm run report` | open the last HTML report |
| `npm run agents:init` | AI setup: create the planner / generator / healer agents |
| `npm run cli:skills` | AI setup: install the Playwright CLI skill for the coding agent |

---

## 2. Folder structure

```
SauceDemo-AI-Framework/
├── CLAUDE.md                        AI rules (Claude Code loads it automatically)
├── .github/copilot-instructions.md  same rules for GitHub Copilot
├── .mcp.json · .vscode/mcp.json     Playwright MCP + Test MCP server for the AI tools
├── .claude/commands/                slash commands: /explore /plan-feature /page-objects /generate /heal /review-tests
├── prompts/                         the prompt library 00 … 09 + README (workflow order)
├── docs/                            decisions.md · SauceDemo-AI-Framework-Notes.pdf · AI-Usage-Diagram-and-Prompts.pdf
├── specs/                           <feature>.facts.md (exploration) · <feature>.plan.md (reviewed plans)
├── pages/                           page objects: BasePage, LoginPage, InventoryPage, CartPage, CheckoutPages
├── fixtures/baseTest.ts             ONE test object: page fixtures + customer data (specs import from here)
├── test-data/customers.ts           builders and data-driven cases
├── tests/auth.setup.ts              logs in once → playwright/.auth/user.json
├── tests/guest/                     logged-out tests + seed.spec.ts
├── tests/user/                      logged-in tests + seed-logged-in.spec.ts
├── config/env.ts · env/             typed settings; credentials only from env / CI secrets
├── playwright.config.ts             testIdAttribute data-test · projects · reporters
└── .github/workflows/playwright.yml · pull_request_template.md   CI (2 shards + merged report) · PR checklist
```

**Layers:** tests (WHAT) → fixtures (WITH WHAT) → pages / test-data (HOW) → config / CI (RUN).
Specs never use raw locators or import `@playwright/test` directly.

---

## 3. The instruction files: what the AI always reads

These files are **not prompts**. They are standing instructions that shape every AI session, so prompts can stay short.

| File | Read by | When | What it makes the AI do |
|---|---|---|---|
| `CLAUDE.md` | Claude Code | automatically, every session | follow 13 rules: code only in pages/ fixtures/ test-data/ tests/; `getByTestId` / `getByRole`; no `waitForTimeout`; exact texts from the plan; start from a seed; never type passwords; one scenario per session; never change expected values; done = tsc + 3/3; CLI for coding, MCP for exploring; verify locators live |
| `.github/copilot-instructions.md` | GitHub Copilot | automatically, every chat | the same rules, written in full (keep both files in sync) |
| `.mcp.json` | Claude Code | when the session starts | starts **Playwright MCP** (browser tools; `--isolated`, `--storage-state`, `--test-id-attribute=data-test`) and the **Test MCP server** (`run-test-mcp-server`) used by the 3 agents |
| `.vscode/mcp.json` | VS Code / Copilot agent mode | when agent mode starts | starts Playwright MCP for Copilot |
| `.claude/skills/playwright-cli/SKILL.md` (created by `npm run cli:skills`) | Claude Code | when a task needs the browser | teaches the `npx playwright cli` commands (open, find, click, eval, state-load …) |
| `.claude/agents/playwright-test-*.md` (created by `npm run agents:init`) | Claude Code | when a prompt says "Use the … agent" | role, allowed tools and steps of the planner / generator / healer |
| `.claude/commands/*.md` | Claude Code | when you type `/explore`, `/generate` … | expand a short command into "follow prompts/0X-….md for …" |
| `tests/*/seed*.spec.ts` + `playwright/.auth/user.json` | agents, MCP, CLI | at the start of a browser session | start logged in on a known page: the AI never sees a password |
| `docs/decisions.md` | humans + AI | when designing or extending | the architect's decisions (locators, auth, data, AI) the AI must respect |
| `.github/pull_request_template.md` | humans | every PR | AI-usage box + author checklist |

**How they work together:** instruction files say *how to work*, prompt files say *what to do now*,
seeds say *where to start*, and the human gates decide *what is accepted*.

---

## 4. One-time AI setup

```bash
npx playwright test --project=setup   # 1. saves playwright/.auth/user.json (needs env/.env.local)
npm run agents:init                   # 2. .claude/agents/playwright-test-{planner,generator,healer}.md + .claude/prompts/
npm run cli:skills                    # 3. .claude/skills/playwright-cli/SKILL.md (+ 10 reference files)
```

- `agents:init` = `playwright init-agents --loop=claude --project=chromium --prompts`. Re-run it after a Playwright upgrade;
  keep project rules in `CLAUDE.md`, not in the generated agent files.
- `cli:skills` = `playwright cli install --skills`.
- On Windows, if the MCP client can't start `npx`, use `"command": "cmd", "args": ["/c", "npx", ...]` in `.mcp.json`.

---

## 5. How to give a prompt

Prompt files never run by themselves. A person starts the AI tool and hands it the prompt:

| AI tool | How |
|---|---|
| **Claude Code** | run `claude` in the repo folder, then either `Follow prompts/04-page-objects.md for the Checkout feature` or the slash command `/page-objects Checkout` |
| **VS Code + Copilot** | Chat → switch to **Agent** mode → attach the file (`#prompts/04-page-objects.md`) → "Use this for the Checkout feature" |
| **Any chat (no tools)** | paste the prompt text; works for 00 (design) and 07 (review with a pasted diff) only |

Before sending: fill every `<PLACEHOLDER>` (feature name, scenario id, file, test title).
While it runs: approve the commands and file edits it asks for; read what it reports at the end.

---

## 6. How each prompt builds the framework

```
0 DESIGN → 1 EXPLORE → 2 PLAN → 3 BUILD → 4 GENERATE → 5 RUN·HEAL → 6 REVIEW → 7 CI
                                                 ↑                         │
                                                 └────── CI failure ───────┘
```

### Step 0 · Design: `prompts/00-framework-blueprint.md`
| | |
|---|---|
| **When** | day 1, empty repo |
| **Tool** | chat, no browser |
| **You type** | the prompt as is (application, constraints, 9 questions) |
| **AI does** | proposes folders, layers, fixtures, locator / auth / data strategy, CI plan, AI rules, risks, as tables; asks where a decision is yours |
| **Creates** | `docs/decisions.md`; from those decisions the architect writes `CLAUDE.md`, `playwright.config.ts`, `pages/BasePage.ts`, `fixtures/baseTest.ts`, `config/env.ts`, `tests/auth.setup.ts`, the seeds |
| **Human gate** | the architect decides every point; AI only proposes |

### Step 1 · Explore: `prompts/01-explore-feature-mcp.md` OR `prompts/02-explore-feature-cli.md`
| | |
|---|---|
| **When** | before planning a feature. **01** = MCP in a chat · **02** = CLI inside a coding agent (fewest tokens). Pick one. |
| **Shortcut** | `/explore Checkout` (uses 02) |
| **AI does** | opens the app already logged in, clicks through the feature, reads the accessibility snapshot, reads `data-test` ids with `eval`, records exact texts, amounts and oddities |
| **Reads** | `.mcp.json` or the CLI skill · `playwright/.auth/user.json` |
| **Creates** | `specs/<feature>.facts.md` |
| **Human gate** | skim the facts; surprises become open questions |
| **Real example** | login inputs have no `<label>`, every element has `data-test`, errors "Epic sadface: Username is required" / "…Password is required" → decision `testIdAttribute: 'data-test'` + `getByTestId` |

### Step 2 · Plan: `prompts/03-plan-feature.md`
| | |
|---|---|
| **Agent** | `playwright-test-planner` · **Shortcut** `/plan-feature Checkout` |
| **AI does** | runs the seed test, confirms the facts live, writes numbered scenarios (1.1, 2.1 …) with steps, exact expected texts, target files and open questions, then **stops** |
| **Reads** | `tests/user/seed-logged-in.spec.ts` · `specs/<feature>.facts.md` (optionally a Jira story snapshot `specs/stories/<KEY>.md`) |
| **Creates** | `specs/<feature>.plan.md` (example: `specs/checkout.plan.md`) |
| **Human gate** | **mandatory** review: texts, missing scenarios, open questions → `git commit` the plan |

### Step 3 · Build page objects: `prompts/04-page-objects.md`
| | |
|---|---|
| **Tool** | coding agent + Playwright CLI (**not** MCP) · **Shortcut** `/page-objects Checkout` |
| **AI does** | for each page in the plan: `npx playwright cli open → state-load → goto → find / eval`, then writes the locator; adds business methods (`fillAndContinue`, `amounts`) and one fixture per page |
| **Reads** | the plan · `pages/BasePage.ts` · existing pages and fixtures (reuse before create) |
| **Creates / updates** | `pages/CartPage.ts` · `pages/CheckoutPages.ts` · `fixtures/baseTest.ts` |
| **Done** | `npm run typecheck` passes; the agent lists every locator and the command that proved it |
| **Human gate** | code review: names, no duplicated locators, methods express business actions |

### Step 4 · Generate one scenario: `prompts/05-generate-scenario.md`
| | |
|---|---|
| **Agent** | `playwright-test-generator` · **Shortcut** `/generate specs/checkout.plan.md 1.1` |
| **AI does** | starts from the seed, writes ONLY that scenario into the file named in the plan, using fixtures, page objects, `test-data/` builders, exact texts and tags; runs it 3 times |
| **Creates** | `tests/user/checkout/checkout-happy-path.spec.ts` (1.1) · `checkout-validation.spec.ts` (2.1–2.3 as one data-driven test) |
| **Done** | `npm run typecheck` + `npx playwright test <file> --project=chromium --repeat-each=3` green |
| **Human gate** | code review in the PR; next scenario = new session (sequential, not parallel) |

### Step 5 · Run and heal: `prompts/06-heal-failure.md` (flaky: `prompts/09-flaky-investigation.md`)
| | |
|---|---|
| **Agent** | `playwright-test-healer` (+ CLI for flaky) · **Shortcut** `/heal "1.1 buy one product"` |
| **AI does** | reproduces, reads `test-results/**/error-context.md` and the trace, fixes the page object (never an expected value) or marks `test.fixme('BUG: …')`; for flaky: `--repeat-each=20 --workers=4`, assert a state not a moment, prove 20/20 |
| **Updates** | `pages/*.ts` (fix) or the spec (`test.fixme`) |
| **Human gate** | approve "test issue" vs "app issue"; app issue → ticket |

### Step 6 · Review: `prompts/07-review-tests.md`
| | |
|---|---|
| **Tool** | coding agent (runs `git diff main...HEAD`) · **Shortcut** `/review-tests checkout` |
| **AI does** | compares the diff with `CLAUDE.md` and the plan; lists findings only (weak assertions, waits, locators outside pages, shared data, secrets) |
| **Uses** | `.github/pull_request_template.md` (AI-usage box + checklist) |
| **Human gate** | the reviewer approves the PR |

### Step 7 · CI: `.github/workflows/playwright.yml` (no AI)
`npm ci` → `npx tsc --noEmit` (fails fast; tests are skipped on a type error) → `npx playwright test --shard=x/2`
→ blob reports → `merge-reports` → one HTML report. Secrets `SAUCE_USERNAME` / `SAUCE_PASSWORD` in GitHub Secrets.
**Gate:** no failures, no flaky tests. A failure goes back to step 5.

### Whole feature in one go: `prompts/08-coverage-chain.md`
planner once → **human review of the plan** → generator for each scenario, one after another → healer runs all and fixes failures.

---

## 7. Worked example: the Checkout feature end to end

| # | You type (Claude Code) | Files that change |
|---|---|---|
| 1 | `/explore Checkout` | `specs/checkout.facts.md` |
| 2 | `/plan-feature Checkout` → review → `git commit` | `specs/checkout.plan.md` (scenarios 1.1, 2.1–2.3, 3.x, open questions) |
| 3 | `/page-objects Checkout` | `pages/CartPage.ts`, `pages/CheckoutPages.ts`, `fixtures/baseTest.ts` |
| 4 | `/generate specs/checkout.plan.md 1.1` | `tests/user/checkout/checkout-happy-path.spec.ts` |
| 5 | new session: `/generate specs/checkout.plan.md 2.1-2.3` (data-driven) | `tests/user/checkout/checkout-validation.spec.ts`, `test-data/customers.ts` |
| 6 | if red: `/heal "<test title>"` | a page-object fix or `test.fixme('BUG: …')` |
| 7 | `/review-tests checkout`, then open the PR with the checklist | (findings only) |
| 8 | CI: tsc → 2 shards → merged report | PR status check |

What the result looks like (`tests/user/checkout/checkout-happy-path.spec.ts`):
```ts
test('1.1 buy one product: totals are correct and the order completes', { tag: ['@checkout', '@smoke'] },
  async ({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, checkoutCompletePage, customer }) => {
    await inventoryPage.open();
    const price = await inventoryPage.priceOf('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    // … cart → checkout → fillAndContinue(customer) …
    const { subtotal, tax, total } = await checkoutOverviewPage.amounts();
    expect(subtotal).toBe(price);
    expect(total).toBeCloseTo(subtotal + tax, 2);          // business rule from the plan
    await checkoutOverviewPage.finishButton.click();
    await expect(checkoutCompletePage.header).toHaveText('Thank you for your order!');
  });
```
Notice: imports from `fixtures/baseTest`, no raw locators, exact texts, a business rule instead of a hard-coded tax,
scenario id in the title, tags. Those come from `CLAUDE.md` + the plan + the prompt.

---

## 8. Prompt map

| # | Prompt file | Tool / agent | Shortcut | Reads | Writes | Human gate |
|---|---|---|---|---|---|---|
| 00 | 00-framework-blueprint.md | chat | - | requirements | docs/decisions.md | architect decides |
| 01 | 01-explore-feature-mcp.md | Playwright MCP | - | .mcp.json, storage state | specs/<f>.facts.md | skim facts |
| 02 | 02-explore-feature-cli.md | Playwright CLI | /explore | CLI skill, storage state | specs/<f>.facts.md | skim facts |
| 03 | 03-plan-feature.md | planner agent | /plan-feature | seed, facts | specs/<f>.plan.md | review + commit |
| 04 | 04-page-objects.md | coding agent + CLI | /page-objects | plan, BasePage | pages/*.ts, fixtures | code review |
| 05 | 05-generate-scenario.md | generator agent | /generate | plan, fixtures, test-data | tests/**/*.spec.ts | tsc + 3/3 green |
| 06 | 06-heal-failure.md | healer agent | /heal | error-context.md, trace | fix or test.fixme | test or app issue |
| 07 | 07-review-tests.md | coding agent | /review-tests | git diff, plan | findings | approve PR |
| 08 | 08-coverage-chain.md | planner → generator → healer | - | seed, story/facts | plan + specs | review between steps |
| 09 | 09-flaky-investigation.md | coding agent + CLI, healer | - | trace, error-context | cause + fix + evidence | approve fix |

Full details: [`prompts/README.md`](prompts/README.md) · visual overview: [`docs/AI-Usage-Diagram-and-Prompts.pdf`](docs/AI-Usage-Diagram-and-Prompts.pdf)
· step-by-step notes: [`docs/SauceDemo-AI-Framework-Notes.pdf`](docs/SauceDemo-AI-Framework-Notes.pdf).

---

## 9. How to write a good prompt

| Part | Write | Why |
|---|---|---|
| 1 Rules | "Follow CLAUDE.md." (+ "Use the playwright-test-… agent") | no repeated instructions; the right agent |
| 2 Start | seed test / storage state | logged in, right page, no passwords |
| 3 Goal | ONE feature or ONE scenario id | small context, fewer mistakes |
| 4 Steps | user-level steps ("add Sauce Labs Backpack") | the agent finds locators live |
| 5 Expected | exact texts, values, rules (total = item total + tax) | strong assertions |
| 6 Data | fixtures / builders, unique values | parallel-safe |
| 7 Output | exact file paths, page objects, tags | code lands IN the framework |
| 8 Done when | tsc passes + 3/3 green + report what you ran | the agent checks its own work |

❌ "Write a test for checkout and check it works." → guessed locators, weak asserts, code next to the framework.
✅ "Use the generator agent. Follow CLAUDE.md. Generate ONLY scenario 1.1 of specs/checkout.plan.md into its file. Seed: … Done = tsc + --repeat-each=3."

---

## 10. Adding a new feature

1. `/explore Cart` → `specs/cart.facts.md`
2. `/plan-feature Cart` → `specs/cart.plan.md` → **review + commit**
3. `/page-objects Cart` → extend `pages/CartPage.ts`, fixtures → code review
4. `/generate specs/cart.plan.md 1.1`, then 1.2 … (new session each) → `tests/user/cart/*.spec.ts`
5. `npm run typecheck` · `npx playwright test --grep @cart --repeat-each=3`
6. `/review-tests cart` → PR with the checklist → CI green → merge
7. The AI repeated a mistake? Add one line to `CLAUDE.md` **and** `.github/copilot-instructions.md`.

---

## 11. What keeps it scalable

- **Rules guide** (`CLAUDE.md`), **tooling enforces** (`tsc` in CI, `forbidOnly`, `failOnFlakyTests`, PR checklist),
  **architecture scales** (`docs/decisions.md`: layers, one fixture file, login once, unique data, projects, tags, shards).
- Exact assertions from the reviewed plan; never change an expected value to make a test pass.
- No passwords anywhere: `env/.env.local` locally (git-ignored), GitHub Secrets in CI, storage state for AI sessions.
- One scenario per AI session; every test tagged (`@smoke` / `@regression` + feature, optionally the Jira key).

---

## 12. Troubleshooting

| Symptom | Fix |
|---|---|
| `Set SAUCE_USERNAME and SAUCE_PASSWORD …` | create `env/.env.local` from `env/.env.example` |
| agent / MCP session lands on the login page | run `npx playwright test --project=setup` again (session expired) |
| MCP tools not listed in the AI tool | restart it; on Windows use the `cmd /c npx` form in `.mcp.json` |
| agent uses MCP although the prompt says CLI | run `npm run cli:skills`; keep "NOT MCP" in the prompt |
| CLI says `Ref eNN not found` | the page changed: take a new snapshot (`npx playwright cli snapshot`) |
| test passes locally, fails in CI sometimes | `prompts/09-flaky-investigation.md` |
| type error but the test still passed | Playwright does not type-check: run `npm run typecheck` (CI does) |

---

## 13. Status of this practice project

- Verified: `tsc` passes; the 4 guest tests pass against the live saucedemo.com.
- The logged-in checkout tests need your credentials; confirm the checkout texts with step 1 on the first run.
