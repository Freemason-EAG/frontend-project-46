export const isPrimitiveData = data => data === null || typeof (data) === 'string' || typeof (data) === 'boolean' || typeof (data) === 'number'

export const makeIndent = (depth, leftShift = 0, spacesCount = 4, replacer = ' ') => {
  return replacer.repeat(spacesCount * depth - leftShift)
}
