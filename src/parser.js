import path from 'node:path'
import yaml from 'js-yaml'

const parser = (data, filename) => {
  const format = path.extname(filename).toLowerCase()
  switch (format) {
    case '.json':
      return JSON.parse(data)
    case '.yaml':
    case '.yml':
      return yaml.load(data)
    default:
      throw new Error(`${format} is wrong format`)
  }
}

export default parser
