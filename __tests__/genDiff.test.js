import fs from 'fs'
import path from 'path'
import genDiff from '../src/index.js'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const getFixturePath = (file) => {
  return path.join(__dirname, '..', '__fixtures__', file)
}

const readFixture = (file) => {
  return fs.readFileSync(path.join(__dirname, '..', '__fixtures__', file), 'utf8')
}

describe('genDiff: JSON nested structure test', () => {
  const firstJsonFile = getFixturePath('file1.json')
  const secondJsonFile = getFixturePath('file2.json')

  test('genDiff', () => {
    expect(genDiff(firstJsonFile, secondJsonFile)).toEqual(
      readFixture('stylish-format-output.txt'),
    )
  })

  test('type of result to be string', () => {
    expect(typeof (genDiff(firstJsonFile, secondJsonFile))).toBe('string')
  })

  test('transferred an empty file', () => {
    const emptyFile = getFixturePath('emptyFile.json')
    expect(() => genDiff(emptyFile, secondJsonFile)).toThrow('empty file transferred')
  })
})

describe('genDiff: YAML nested structure test', () => {
  const firstYmlFile = getFixturePath('file1.yml')
  const secondYmlFile = getFixturePath('file2.yaml')

  test('genDiff', () => {
    expect(genDiff(firstYmlFile, secondYmlFile)).toEqual(
      readFixture('stylish-format-output.txt'),
    )
  })

  test('type of result to be string', () => {
    expect(typeof (genDiff(firstYmlFile, secondYmlFile))).toBe('string')
  })

  test('transferred an empty file', () => {
    const emptyFile = getFixturePath('emptyFile.yml')
    expect(() => genDiff(emptyFile, secondYmlFile)).toThrow('empty file transferred')
  })
})

describe('genDiff: Stylish format check', () => {
  const firstJsonFile = getFixturePath('file1.json')
  const secondJsonFile = getFixturePath('file2.json')

  test('genDiff', () => {
    expect(genDiff(firstJsonFile, secondJsonFile, 'stylish')).toEqual(
      readFixture('stylish-format-output.txt'),
    )
  })

  test('type of result to be string', () => {
    expect(typeof (genDiff(firstJsonFile, secondJsonFile))).toBe('string')
  })

  test('transferred an empty file', () => {
    const emptyFile = getFixturePath('emptyFile.json')
    expect(() => genDiff(emptyFile, secondJsonFile)).toThrow('empty file transferred')
  })
})

describe('genDiff: Plain format check', () => {
  const firstJsonFile = getFixturePath('file1.json')
  const secondJsonFile = getFixturePath('file2.json')

  test('genDiff', () => {
    expect(genDiff(firstJsonFile, secondJsonFile, 'plain')).toEqual(
      readFixture('plain-format-output.txt'),
    )
  })

  test('type of result to be string', () => {
    expect(typeof (genDiff(firstJsonFile, secondJsonFile))).toBe('string')
  })

  test('transferred an empty file', () => {
    const emptyFile = getFixturePath('emptyFile.json')
    expect(() => genDiff(emptyFile, secondJsonFile)).toThrow('empty file transferred')
  })
})

describe('genDiff: JSON format check', () => {
  const firstJsonFile = getFixturePath('file1.json')
  const secondJsonFile = getFixturePath('file2.json')

  test('genDiff', () => {
    expect(genDiff(firstJsonFile, secondJsonFile, 'json')).toEqual(
      readFixture('json-format-output.txt'),
    )
  })

  test('type of result to be string', () => {
    expect(typeof (genDiff(firstJsonFile, secondJsonFile))).toBe('string')
  })

  test('transferred an empty file', () => {
    const emptyFile = getFixturePath('emptyFile.json')
    expect(() => genDiff(emptyFile, secondJsonFile)).toThrow('empty file transferred')
  })
})
