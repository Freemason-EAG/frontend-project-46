import genDiff from '../src/index.js'

let firstJsonFile
let secondJsonFile
beforeEach(() => {
  firstJsonFile = '__fixtures__/file1.json'
  secondJsonFile = '__fixtures__/file2.json'
})

test('genDiff', () => {
  expect(genDiff(firstJsonFile, secondJsonFile)).toEqual(
    `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`,
  )
})

test('type of result to be string', () => {
  expect(typeof (genDiff(firstJsonFile, secondJsonFile))).toBe('string')
})

test('transferred an empty file', () => {
  expect(() => genDiff('__fixtures__/emptyFile.json', secondJsonFile)).toThrow('empty file transferred')
})
