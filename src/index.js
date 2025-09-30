import path from 'node:path'
import fs from 'node:fs'
import _ from 'lodash'
import parser from './parser.js'

const isPrimitiveData = data => data === null || typeof (data) === 'string' || typeof (data) === 'boolean' || typeof (data) === 'number'

const getAST = (obj1, obj2, arrKeys) => {
  return arrKeys.map((key) => {
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (typeof (obj1[key]) === 'object' && typeof (obj2[key]) === 'object') {
        const bothContentKeys = _.sortBy(_.union(Object.keys(obj1[key]), Object.keys(obj2[key])))
        return { key, status: 'recursion', children: getAST(obj1[key], obj2[key], bothContentKeys) }
      }
      else if ((obj1[key] === obj2[key])) return { key, status: 'unchanged', value: obj1[key] }

      else return { key, status: 'changed', value1: obj1[key], value2: obj2[key] }
    }
    else if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return { key, status: 'deleted', value: obj1[key] }
    }
    else if (Object.hasOwn(obj2, key) && !Object.hasOwn(obj1, key)) {
      return { key, status: 'added', value: obj2[key] }
    }
    return null
  })
}

const stringify = (value, depth = 0) => {
  if (isPrimitiveData(value)) return String(value)
  const replacer = ' '
  const spacesCount = 4
  const spaces = replacer.repeat(spacesCount * depth)
  const nextSpace = replacer.repeat(spacesCount * (depth + 1))
  const result = Object.entries(value)
  const newResult = result.map(([key, val]) => `${nextSpace}${key}: ${stringify(val, depth + 1)}`)
  return `{\n${newResult.join('\n')}\n${spaces}}`
}

const formatter = (arrOfObjs) => {
  const iter = (objs, depth = 0) => {
    const replacer = ' '
    const spacesCount = 4
    const spaces = replacer.repeat(spacesCount * depth)
    const nextSpace = replacer.repeat(spacesCount * (depth + 1) - 2)
    return objs.flatMap((obj) => {
      if (obj.status === 'added') return `${nextSpace}+ ${obj.key}: ${stringify(obj.value, depth + 1)}`
      if (obj.status === 'deleted') return `${nextSpace}- ${obj.key}: ${stringify(obj.value, depth + 1)}`
      if (obj.status === 'changed') return [`${nextSpace}- ${obj.key}: ${stringify(obj.value1, depth + 1)}`, `${nextSpace}+ ${obj.key}: ${stringify(obj.value2, depth + 1)}`]
      if (obj.status === 'unchanged') return `${nextSpace}  ${obj.key}: ${stringify(obj.value, depth + 1)}`
      if (obj.status === 'recursion') {
        return [`${nextSpace}  ${obj.key}: {`, ...iter (obj.children, depth + 1), `${nextSpace}  }`]
      }
    })
  }
  return iter(arrOfObjs, 0)
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
  const convertToAst = getAST(content1, content2, bothContentKeys)

  const structured = formatter(convertToAst)
  return `{\n${structured.join('\n')}\n}`
}

export default genDiff
