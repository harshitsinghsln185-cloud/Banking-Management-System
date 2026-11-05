/**
 * Money utilities:
 * Money is represented as an integer number of paise everywhere.
 */

/**
 * Asserts that the value is a safe non-negative integer representing paise.
 * Throws an Error unless n is a safe non-negative integer.
 */
export function assertValidPaise(n: unknown): asserts n is number {
  if (typeof n !== "number" || !Number.isSafeInteger(n) || n < 0) {
    throw new Error(`Invalid paise amount: ${String(n)}. Must be a safe non-negative integer.`);
  }
}

/**
 * Converts a rupee amount safely to paise.
 * Rounds safely using Math.round(rupees * 100).
 */
export function toPaise(rupees: number): number {
  if (typeof rupees !== "number" || isNaN(rupees) || !isFinite(rupees) || rupees < 0) {
    throw new Error(`Invalid rupees amount: ${String(rupees)}. Must be a non-negative number.`);
  }
  const paise = Math.round(rupees * 100);
  assertValidPaise(paise);
  return paise;
}

/**
 * Converts paise to rupees.
 */
export function toRupees(paise: number): number {
  assertValidPaise(paise);
  return paise / 100;
}

/**
 * Formats paise using Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).
 */
export function formatINR(paise: number): string {
  assertValidPaise(paise);
  const rupees = toRupees(paise);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(rupees);
}
