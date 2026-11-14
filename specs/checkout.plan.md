# Checkout Test Plan (reviewed)

## Application Overview

Swag Labs (saucedemo.com) is a demo shop. A logged-in user adds products to the cart on
/inventory.html, opens /cart.html, enters name and postal code on /checkout-step-one.html,
checks the summary and totals on /checkout-step-two.html and finishes on /checkout-complete.html.
Elements carry `data-test` attributes (project uses testIdAttribute = data-test).

## Test Scenarios

### 1. Checkout - Happy path

**Seed:** `tests/user/seed-logged-in.spec.ts`

#### 1.1. buy-one-product

**File:** `tests/user/checkout/checkout-happy-path.spec.ts`

**Steps:**
  1. Open Products, add "Sauce Labs Backpack" to the cart
    - expect: cart badge shows "1"
  2. Open the cart
    - expect: exactly 1 item, "Sauce Labs Backpack"
  3. Click Checkout, enter first name, last name, postal code, Continue
    - expect: overview lists "Sauce Labs Backpack"
    - expect: item total equals the product price shown on Products
    - expect: total = item total + tax (2 decimals)
  4. Click Finish
    - expect: header is exactly "Thank you for your order!"

### 2. Checkout - Information validation

**Seed:** `tests/user/seed-logged-in.spec.ts`

#### 2.1. missing-first-name
**File:** `tests/user/checkout/checkout-validation.spec.ts`
**Steps:**
  1. With 1 item in the cart, go to Checkout step 1, leave First Name empty, Continue
    - expect: error "Error: First Name is required"; URL stays on checkout-step-one.html

#### 2.2. missing-last-name
**File:** `tests/user/checkout/checkout-validation.spec.ts`
**Steps:**
  1. Same, leave Last Name empty
    - expect: error "Error: Last Name is required"

#### 2.3. missing-postal-code
**File:** `tests/user/checkout/checkout-validation.spec.ts`
**Steps:**
  1. Same, leave Postal Code empty
    - expect: error "Error: Postal Code is required"

### 3. Checkout - Edge cases (not generated yet)

#### 3.1. checkout-with-empty-cart
  - Can a user reach checkout with an empty cart? (see Open questions)

#### 3.2. cancel-from-overview-keeps-cart
  - Cancel on step 2 returns to Products and the cart still has the item.

## Open questions

- 3.1: Checkout with an empty cart is possible in the demo. Is that a bug or accepted for this demo?
- Is tax a fixed percentage? The plan checks the rule total = item total + tax instead of a hard-coded tax value.

## Review log
- Login-page texts were captured live (logged out). The logged-in checkout texts in this plan are the
  expected values for the demo shop and MUST be confirmed with prompt 01 on your first logged-in run
  before the plan is treated as reviewed.
