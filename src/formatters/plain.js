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
    const transformToPlain = objs.flatMap((obj) => {
      if (obj.status === 'added') {
        const newParents = buildPropertyPath(parents, obj.key)
        return `Property '${newParents}' was added with value: ${getTrueValue(obj.value)}`
      }
      if (obj.status === 'deleted') {
        const newParents = buildPropertyPath(parents, obj.key)
        return `Property '${newParents}' was removed`
      }
      if (obj.status === 'changed') {
        const newParents = buildPropertyPath(parents, obj.key)
        return `Property '${newParents}' was updated. From ${getTrueValue(obj.value1)} to ${getTrueValue(obj.value2)}`
      }
      if (obj.status === 'recursion') {
        const newParents = buildPropertyPath(parents, obj.key)
        return iter(obj.children, newParents)
      }
    })
    return transformToPlain.filter(Boolean)
  }
  return `${iter(arrOfObjs, '').join('\n')}`
}

export default plain
