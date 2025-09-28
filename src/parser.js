import path from 'node:path'
import yaml from 'js-yaml'

const parser = (data, filename) => {
  const format = path.extname(filename).toLowerCase()
  if (format === '.json') return JSON.parse(data)
  if (format === '.yaml' || format === '.yml') return yaml.load(data)
  else {
    throw new Error(`${format} is wrong format`)
  }
}

export default parser
