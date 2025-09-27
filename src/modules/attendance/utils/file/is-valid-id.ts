// TO DO: Add testing and JSDoc.
export default function isValidId(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmedValue = value.trim();
  const idRegex = /^\d+$/; // Only numbers, no dots, commas, spaces or anything else.
  return idRegex.test(trimmedValue);
}