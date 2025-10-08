import path from 'node:path'
import fs from 'node:fs'
import _ from 'lodash'
import parser from './parser.js'
import getAST from './AST-constructor.js'
import getFormat from './formatters/index.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
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

  const formatter = getFormat(format)

  return formatter(convertToAst)
}

export default genDiff
