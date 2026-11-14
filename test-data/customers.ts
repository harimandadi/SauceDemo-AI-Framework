export interface Customer {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/** Unique, valid customer by default; override only what a test is about. */
export function buildCustomer(overrides: Partial<Customer> = {}): Customer {
  const unique = Date.now().toString().slice(-6);
  return { firstName: `Test${unique}`, lastName: 'Buyer', postalCode: `9${unique.slice(-4)}`, ...overrides };
}

/** Data-driven validation cases for checkout step 1 (exact texts come from the reviewed plan). */
export const missingFieldCases = [
  { field: 'firstName', customer: buildCustomer({ firstName: '' }), message: 'Error: First Name is required' },
  { field: 'lastName', customer: buildCustomer({ lastName: '' }), message: 'Error: Last Name is required' },
  { field: 'postalCode', customer: buildCustomer({ postalCode: '' }), message: 'Error: Postal Code is required' },
] as const;
