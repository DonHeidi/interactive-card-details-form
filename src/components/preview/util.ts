/**
 * creates a string of a given length with a given origin. The origin is placed at the beginning of the string and the rest is filled with 0s.
 * @param length - the length of the string to be created
 * @param origin - the string to be placed at the beginning of the created string
 * @returns the created string
 * @example
 * createDisplayValue(16, '1234') // returns '1234000000000000'
 */
export function createDisplayValue(length: number, origin?: string, ignoreWhiteSpace: boolean = true): string {
  if (ignoreWhiteSpace) {
    origin = origin?.replace(/\s/g, '')
  }

  const placeHolderLength = length - (origin?.length || 0)
  const displayValue = (origin || '') + Array.from({ length: placeHolderLength }, () => '0').join('')
  return displayValue
}
