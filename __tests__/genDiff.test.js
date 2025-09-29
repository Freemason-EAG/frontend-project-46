import genDiff from '../src/index.js'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe('genDiff: JSON nested structure test', () => {
  let firstJsonFile
  let secondJsonFile
  beforeEach(() => {
    firstJsonFile = path.join(__dirname, '..', '__fixtures__/file1.json')
    secondJsonFile = path.join(__dirname, '..', '__fixtures__/file2.json')
  })

  test('genDiff', () => {
    expect(genDiff(firstJsonFile, secondJsonFile)).toEqual(
      `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
    )
  })

  test('type of result to be string', () => {
    expect(typeof (genDiff(firstJsonFile, secondJsonFile))).toBe('string')
  })

  test('transferred an empty file', () => {
    const emptyFile = path.join(__dirname, '..', '__fixtures__/emptyFile.json')
    expect(() => genDiff(emptyFile, secondJsonFile)).toThrow('empty file transferred')
  })
})

describe('genDiff: JSON nested structure test', () => {
  let firstYmlFile
  let secondYmlFile
  beforeEach(() => {
    firstYmlFile = path.join(__dirname, '..', '__fixtures__/file1.yml')
    secondYmlFile = path.join(__dirname, '..', '__fixtures__/file2.yaml')
  })

  test('genDiff', () => {
    expect(genDiff(firstYmlFile, secondYmlFile)).toEqual(
      `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
    )
  })

  test('type of result to be string', () => {
    expect(typeof (genDiff(firstYmlFile, secondYmlFile))).toBe('string')
  })

  test('transferred an empty file', () => {
    const emptyFile = path.join(__dirname, '..', '__fixtures__/emptyFile.yml')
    expect(() => genDiff(emptyFile, secondYmlFile)).toThrow('empty file transferred')
  })
})
