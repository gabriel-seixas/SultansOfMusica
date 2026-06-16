/**
 * Converts a price given in cents (integer) to a formatted Brazilian Real string.
 * Example: 23285 → "R$ 232,85"
 */
export function formatPrice(cents: number): string {
	return "R$ " + (cents / 100).toFixed(2).replace(".", ",");
}
