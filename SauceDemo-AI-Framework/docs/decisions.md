# Framework decisions (output of prompt 00, decided by the QA architect)

| # | Decision | Chosen | Why | Date / owner |
|---|----------|--------|-----|--------------|
| 1 | Locators | `testIdAttribute: 'data-test'` + `getByTestId`; `getByRole` for buttons inside cards | exploration: every element has data-test, inputs have no labels | QA architect |
| 2 | Structure | pages · fixtures · test-data · tests/guest · tests/user · specs · prompts | clear places for humans and agents | QA architect |
| 3 | Auth | setup project + storageState; separate guest project | log in once; logged-out tests stay independent | QA architect |
| 4 | Test data | `buildCustomer()` unique by default; data-driven cases in test-data/ | parallel-safe; one place to change | QA architect |
| 5 | Assertions | exact texts + business rules (total = item total + tax) | strong tests that survive price changes | QA architect |
| 6 | Execution | projects per browser, tags, 2 CI shards + merged report | scales with the suite | QA architect |
| 7 | AI | CLAUDE.md + copilot-instructions, seeds, prompt library, PR checklist | AI writes INTO the framework | QA architect |

Change a decision only with a new row (what changed, why, date), so the history stays readable.
