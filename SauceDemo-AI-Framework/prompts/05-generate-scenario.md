# 05 · Generate ONE scenario (playwright-test-generator)

**When:** per scenario of a COMMITTED plan, one session each, sequentially (they share the seed).
**Tool:** the `playwright-test-generator` agent (created by `npm run agents:init`).

```
Use the playwright-test-generator agent.
Follow CLAUDE.md. Generate scenario <ID, e.g. 1.1> of specs/checkout.plan.md
into <FILE from the plan, e.g. tests/user/checkout/checkout-happy-path.spec.ts>.
Seed: tests/user/seed-logged-in.spec.ts
- import test/expect from fixtures/baseTest; use the existing page objects and the `customer` fixture
- assert the exact texts/values from the plan; check total = item total + tax with toBeCloseTo(…, 2)
- tags from the plan (e.g. @checkout @smoke); test title starts with the scenario id
- no new locators in the spec; if one is missing, add it to the page object (verify it live first)
Done = npx tsc --noEmit passes AND
npx playwright test <FILE> --project=chromium --repeat-each=3 is green.
Report the commands you ran and their results. Generate ONLY this scenario.
```

Next session: "Generate scenarios 2.1–2.3 as ONE data-driven test using test-data/customers.ts".
**Human check:** code review in the PR.
