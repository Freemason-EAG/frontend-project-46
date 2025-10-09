import { isPrimitiveData } from '../utils.js'

const buildPropertyPath = (parents, key) => {
  if (parents.length === 0) return key
  else return `${parents}.${key}`
}

const getTrueValue = (value) => {
  if (typeof (value) === 'string') return `'${value}'`
  if (isPrimitiveData(value)) return value
  else return '[complex value]'
}

const plain = (arrOfObjs) => {
  const iter = (objs, parents = '') => {
    return objs
      .flatMap((obj) => {
        const newParents = buildPropertyPath(parents, obj.key)
        switch (obj.status) {
          case 'added':
            return `Property '${newParents}' was added with value: ${getTrueValue(obj.value)}`
          case 'deleted':
            return `Property '${newParents}' was removed`
          case 'changed':
            return `Property '${newParents}' was updated. From ${getTrueValue(obj.value1)} to ${getTrueValue(obj.value2)}`
          case 'recursion':
            return iter(obj.children, newParents)
          default:
            return []
        }
      })
  }
  return `${iter(arrOfObjs, '').join('\n')}`
}

export default plain
