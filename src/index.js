import path from 'node:path'
import fs from 'node:fs'
import _ from 'lodash'
import parser from './parser.js'

const formatter = (obj1, obj2, arrKeys) => {
  return arrKeys.reduce((acc, key) => {
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      obj1[key] === obj2[key] ? acc.push(`  ${key}: ${obj1[key]}`) : acc.push(`- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`)
    }
    else if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      acc.push(`- ${key}: ${obj1[key]}`)
    }
    else if (Object.hasOwn(obj2, key) && !Object.hasOwn(obj1, key)) {
      acc.push(`+ ${key}: ${obj2[key]}`)
    }
    return acc
  }, [])
}

const genDiff = (filepath1, filepath2) => {
  const path1 = path.resolve(filepath1)
  const path2 = path.resolve(filepath2)

  const data1 = fs.readFileSync(path1, 'utf-8')
  const data2 = fs.readFileSync(path2, 'utf-8')

  if (data1.trim().length === 0 || data2.trim().length === 0) {
    throw new Error('empty file transferred')
  }
  const content1 = parser(data1, filepath1)
  const content2 = parser(data2, filepath2)

  const bothContentKeys = _.sortBy(_.union(Object.keys(content1), Object.keys(content2)))

  const structured = formatter(content1, content2, bothContentKeys)
  return `{\n${structured.join('\n')}\n}`
}

export default genDiff
