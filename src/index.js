import path from 'node:path'
import fs from 'node:fs'
import _ from 'lodash'
import parser from './parser.js'

const isPrimitiveData = data => data === null || typeof (data) === 'string' || typeof (data) === 'boolean' || typeof (data) === 'number'

const getInterRepresentation = (obj1, obj2, arrKeys) => {
  return arrKeys.map((key) => {
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return obj1[key] === obj2[key] ? { key, status: 'unchanged', value: obj1[key] } : { key, status: 'changed', value1: obj1[key], value2: obj2[key] }
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

// Вариант 2 функции getInterRepresentation
// const getInterRepresentation = (obj1, obj2, arrKeys) => {
//   return arrKeys.map((key) => {
//     if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
//       if (obj1[key] !== obj2[key]) return { key, status: 'changed', value1: obj1[key], value2: obj2[key] }
//       if (obj1[key] === obj2[key]) {
//         if (typeof (obj1[key]) === 'object' && typeof (obj2[key]) === 'object') {
//           const bothContentKeys = _.sortBy(_.union(Object.keys(obj1[key]), Object.keys(obj2[key])))
//           return getInterRepresentation(obj1[key], obj2[key], bothContentKeys)
//         }
//         else return { key, status: 'unchanged', value: obj1[key] }
//       }
//     }
//     else if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
//       return { key, status: 'deleted', value: obj1[key] }
//     }
//     else if (Object.hasOwn(obj2, key) && !Object.hasOwn(obj1, key)) {
//       return { key, status: 'added', value: obj2[key] }
//     }
//     return null
//   })
// }

const formatter = (obj1, obj2, arrKeys) => {
  const iter = (obj1, obj2, depth) => {
    const keysWithStatus = getInterRepresentation(obj1, obj2, arrKeys)
    const result = keysWithStatus.flatMap((obj) => {
      if (isPrimitiveData(obj.value)) {
        if (obj.status === 'unchanged') return `  ${obj.key}: ${obj.value}`
        else if (obj.status === 'deleted') return `- ${obj.key}: ${obj.value}`
        else if (obj.status === 'added') return `+ ${obj.key}: ${obj.value}`
      }
      else if (obj.status === 'changed') {
        if (typeof (obj.value1) === 'object' && typeof (obj.value2) === 'object') {
          return iter(obj.value1, obj.value2, depth + 1)
        }
        else return `- ${obj.key}: ${obj.value1}\n+ ${obj.key}: ${obj.value2}`
      }
    })
    return result
  }
  return iter(obj1, obj2, 0)
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
