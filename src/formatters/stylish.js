import { isPrimitiveData, makeIndent } from '../utils.js'

const stringify = (value, depth = 0) => {
  if (isPrimitiveData(value)) return String(value)
  const spaces = makeIndent(depth)
  const nextSpace = makeIndent(depth + 1)
  const result = Object.entries(value)
  const newResult = result.map(([key, val]) => `${nextSpace}${key}: ${stringify(val, depth + 1)}`)
  return `{\n${newResult.join('\n')}\n${spaces}}`
}

const stylish = (arrOfObjs) => {
  const iter = (objs, depth = 0) => {
    const nextSpace = makeIndent(depth + 1, 2)
    return objs.flatMap((obj) => {
      if (obj.status === 'added') return [`${nextSpace}+ ${obj.key}: ${stringify(obj.value, depth + 1)}`]
      if (obj.status === 'deleted') return [`${nextSpace}- ${obj.key}: ${stringify(obj.value, depth + 1)}`]
      if (obj.status === 'changed') return [`${nextSpace}- ${obj.key}: ${stringify(obj.value1, depth + 1)}`, `${nextSpace}+ ${obj.key}: ${stringify(obj.value2, depth + 1)}`]
      if (obj.status === 'unchanged') return [`${nextSpace}  ${obj.key}: ${stringify(obj.value, depth + 1)}`]
      if (obj.status === 'recursion') {
        return [`${nextSpace}  ${obj.key}: {`, ...iter (obj.children, depth + 1), `${nextSpace}  }`]
      }
    })
  }
  return `{\n${iter(arrOfObjs, 0).join('\n')}\n}`
}

export default stylish
