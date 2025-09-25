import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import parser from './parser.js'

export default (filepath1, filepath2) => {
  const path1 = path.resolve(filepath1)
  const path2 = path.resolve(filepath2)

  const content1 = parser(fs.readFileSync(path1, 'utf-8'), filepath1)
  const content2 = parser(fs.readFileSync(path2, 'utf-8'), filepath2)

  const bothContentKeys = _.sortBy(_.union(Object.keys(content1), Object.keys(content2)))

  const structured = bothContentKeys.reduce((acc, key) => {
    if (Object.hasOwn(content1, key) && Object.hasOwn(content2, key)) {
      content1[key] === content2[key] ? acc.push(`  ${key}: ${content1[key]}`) : acc.push(`- ${key}: ${content1[key]}\n+ ${key}: ${content2[key]}`)
    }
    else if (Object.hasOwn(content1, key) && !Object.hasOwn(content2, key)) {
      acc.push(`- ${key}: ${content1[key]}`)
    }
    else if (Object.hasOwn(content2, key) && !Object.hasOwn(content1, key)) {
      acc.push(`+ ${key}: ${content2[key]}`)
    }
    return acc
  }, [])
  return `{\n${structured.join('\n')}\n}`
}

//   for (const key of bothContentKeys) {
//     if (Object.hasOwn(content1, key) && Object.hasOwn(content2, key) && content1[key] === content2[key]) {
//       result.push(`  ${key}: ${content1[key]}`)
//     }
//     else if (Object.hasOwn(content1, key) && !Object.hasOwn(content2, key)) {
//       result.push(`- ${key}: ${content1[key]}`)
//     }
//     else if (Object.hasOwn(content2, key) && !Object.hasOwn(content1, key)) {
//       result.push(`+ ${key}: ${content2[key]}`)
//     }
//     else if (Object.hasOwn(content1, key) && Object.hasOwn(content2, key) && content1[key] !== content2[key]) {
//       result.push(`- ${key}: ${content1[key]}\n+ ${key}: ${content2[key]}`)
//     }
//   }
//   return `{\n${result.join('\n')}\n}`
// }
