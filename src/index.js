import path from 'node:path'
import fs from 'node:fs'
import _ from 'lodash'
import parser from './parser.js'
import getAST from './AST-constructor.js'
import getFormat from './formatters/index.js'

const fileReader = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath), 'utf-8')
  if (data.trim().length === 0) {
    throw new Error(`empty file transferred`)
  }
  return data
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = fileReader(filepath1)
  const data2 = fileReader(filepath2)

  const content1 = parser(data1, filepath1)
  const content2 = parser(data2, filepath2)

  const bothContentKeys = _.sortBy(_.union(Object.keys(content1), Object.keys(content2)))
  const convertToAst = getAST(content1, content2, bothContentKeys)

  const formatter = getFormat(format)

  return formatter(convertToAst)
}

export default genDiff
