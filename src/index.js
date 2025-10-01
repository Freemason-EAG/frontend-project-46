import path from 'node:path'
import fs from 'node:fs'
import _ from 'lodash'
import parser from './parser.js'
import formatter from './formatters/stylish.js'
import stylish from './formatters/stylish.js'

const getAST = (obj1, obj2, arrKeys) => {
  return arrKeys.map((key) => {
    const inFirstObj = Object.hasOwn(obj1, key)
    const inSecondObj = Object.hasOwn(obj2, key)
    const val1 = obj1[key]
    const val2 = obj2[key]
    if (inFirstObj && inSecondObj) {
      if (typeof (val1) === 'object' && typeof (val2) === 'object') {
        const bothContentKeys = _.sortBy(_.union(Object.keys(val1), Object.keys(val2)))
        return { key, status: 'recursion', children: getAST(val1, val2, bothContentKeys) }
      }
      else if ((val1 === val2)) return { key, status: 'unchanged', value: val1 }

      else return { key, status: 'changed', value1: val1, value2: val2 }
    }
    else if (inFirstObj && !inSecondObj) {
      return { key, status: 'deleted', value: val1 }
    }
    else if (inSecondObj && !inFirstObj) {
      return { key, status: 'added', value: val2 }
    }
    return null
  })
}

const genDiff = (filepath1, filepath2, format = stylish) => {
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
  const convertToAst = getAST(content1, content2, bothContentKeys)

  const structured = format(convertToAst)
  return `{\n${structured.join('\n')}\n}`
}

export default genDiff
