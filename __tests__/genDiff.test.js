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

describe('genDiff: YAML nested structure test', () => {
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

describe('genDiff: Plain format check', () => {
  let firstJsonFile
  let secondJsonFile
  beforeEach(() => {
    firstJsonFile = path.join(__dirname, '..', '__fixtures__/file1.json')
    secondJsonFile = path.join(__dirname, '..', '__fixtures__/file2.json')
  })

  test('genDiff', () => {
    expect(genDiff(firstJsonFile, secondJsonFile, 'plain')).toEqual(
      `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
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

describe('genDiff: JSON format check', () => {
  let firstJsonFile
  let secondJsonFile
  beforeEach(() => {
    firstJsonFile = path.join(__dirname, '..', '__fixtures__/file1.json')
    secondJsonFile = path.join(__dirname, '..', '__fixtures__/file2.json')
  })

  test('genDiff', () => {
    expect(genDiff(firstJsonFile, secondJsonFile, 'json')).toEqual(
      `[
  {
    "key": "common",
    "status": "recursion",
    "children": [
      {
        "key": "follow",
        "status": "added",
        "value": false
      },
      {
        "key": "setting1",
        "status": "unchanged",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "status": "deleted",
        "value": 200
      },
      {
        "key": "setting3",
        "status": "changed",
        "value1": true,
        "value2": null
      },
      {
        "key": "setting4",
        "status": "added",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "status": "added",
        "value": {
          "key5": "value5"
        }
      },
      {
        "key": "setting6",
        "status": "recursion",
        "children": [
          {
            "key": "doge",
            "status": "recursion",
            "children": [
              {
                "key": "wow",
                "status": "changed",
                "value1": "",
                "value2": "so much"
              }
            ]
          },
          {
            "key": "key",
            "status": "unchanged",
            "value": "value"
          },
          {
            "key": "ops",
            "status": "added",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "status": "recursion",
    "children": [
      {
        "key": "baz",
        "status": "changed",
        "value1": "bas",
        "value2": "bars"
      },
      {
        "key": "foo",
        "status": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "status": "changed",
        "value1": {
          "key": "value"
        },
        "value2": "str"
      }
    ]
  },
  {
    "key": "group2",
    "status": "deleted",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "key": "group3",
    "status": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`,
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
