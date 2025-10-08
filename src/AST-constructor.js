import _ from 'lodash'

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

export default getAST
