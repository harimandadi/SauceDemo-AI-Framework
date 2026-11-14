# 03 · Plan a feature (playwright-test-planner)

**When:** after exploring. **Tool:** the `playwright-test-planner` agent (created by `npm run agents:init`).
**Input:** specs/<feature>.facts.md from prompt 01 / 02.

```
Use the playwright-test-planner agent.
Follow CLAUDE.md. Create a test plan for "Checkout" on Swag Labs.
Seed: tests/user/seed-logged-in.spec.ts
Facts: specs/checkout.facts.md (confirm them on the live page; flag any difference)
Plan file: specs/checkout.plan.md
Cover: happy path with one product (cart badge, cart content, totals rule total = item total + tax,
final header), missing first name / last name / postal code (exact error texts, stays on step 1),
cancel from overview, empty cart.
Rules: exact expected texts; one scenario = one behaviour; give each scenario an id (1.1, 1.2 ...)
and a target file under tests/user/checkout/; put unknowns under "Open questions".
No test code. STOP after writing the plan and wait for my review.
```

**Output:** specs/checkout.plan.md
**Human check (mandatory):** texts correct? missing scenarios? open questions answered? Then commit.
