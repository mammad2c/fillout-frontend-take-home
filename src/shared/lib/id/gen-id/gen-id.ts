/**
 * Generates a unique identifier string.
 * The identifier is composed of two parts, each generated using
 * a random number converted to a base-36 string and sliced to
 * create a substring of 13 characters.
 *
 * @returns {string} A unique identifier.
 */

export function genId(): string {
  return `${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
}
