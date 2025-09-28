import genDiff from '../src/index.js'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe('genDiff for JSON', () => {
  let firstJsonFile
  let secondJsonFile
  beforeEach(() => {
    firstJsonFile = path.join(__dirname, '..', '__fixtures__/file1.json')
    secondJsonFile = path.join(__dirname, '..', '__fixtures__/file2.json')
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
    const emptyFile = path.join(__dirname, '..', '__fixtures__/emptyFile.json')
    expect(() => genDiff(emptyFile, secondJsonFile)).toThrow('empty file transferred')
  })
})

describe('genDiff for YML', () => {
  let firstYmlFile
  let secondYmlFile
  beforeEach(() => {
    firstYmlFile = path.join(__dirname, '..', '__fixtures__/file1.yml')
    secondYmlFile = path.join(__dirname, '..', '__fixtures__/file2.yaml')
  })

  test('genDiff', () => {
    expect(genDiff(firstYmlFile, secondYmlFile)).toEqual(
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
    expect(typeof (genDiff(firstYmlFile, secondYmlFile))).toBe('string')
  })

  test('transferred an empty file', () => {
    const emptyFile = path.join(__dirname, '..', '__fixtures__/emptyFile.yml')
    expect(() => genDiff(emptyFile, secondYmlFile)).toThrow('empty file transferred')
  })
})
