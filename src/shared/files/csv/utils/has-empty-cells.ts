import type { FileRow } from '@/shared/files/csv/types';

/**
 * Checks if a list of row objects contains any empty cell.
 *
 * A cell is considered empty if its value is:
 * - `null` or `undefined`
 * - a string that is empty or only whitespace
 * - a number equal to `0` or `NaN`
 *
 * @param cells - Array of row objects, where each key can have a primitive value.
 * @returns {boolean} `true` if any cell is empty, otherwise `false`.
 *
 * @example
 * hasEmptyCells([
 *   { name: "Alice", age: 25 },
 *   { name: "", age: 30 }, // -> true (empty string)
 * ]);
 */
export default function hasEmptyCells(cells: FileRow[]): boolean {
  return cells.some((row) =>
    Object.values(row).some((value) => {
      if (value === null || value === undefined) return true;
      if (typeof value === 'string' && value.trim() === '') return true;
      if (typeof value === 'number' && Number.isNaN(value)) return true;
      return false;
    }),
  );
}
