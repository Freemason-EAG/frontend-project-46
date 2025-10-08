import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formats = { stylish, plain, json }

const getFormat = (formatName = 'stylish') => {
  if (!Object.hasOwn(formats, formatName)) {
    throw new Error(`'${formatName} is a non-existent format'`)
  }
  return formats[formatName]
}

export default getFormat
