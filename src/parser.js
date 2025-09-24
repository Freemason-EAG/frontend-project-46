import path from 'path'

export default (data, filename) => {
  const format = path.extname(filename).toLowerCase()
  if (format === '.json') return JSON.parse(data)
  if (format === '.yaml' || format === '.yml') throw new Error('the format is not processed yet')
  else {
    throw new Error(`${format} is wrong format`)
  }
}
