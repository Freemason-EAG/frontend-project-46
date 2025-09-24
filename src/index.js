import path from 'path'
import fs from 'fs'
import parser from './parser.js'

export default (filepath1, filepath2) => {
  const path1 = path.resolve(filepath1)
  const path2 = path.resolve(filepath2)

  const content1 = fs.readFileSync(path1, 'utf-8')
  const content2 = fs.readFileSync(path2, 'utf-8')

  console.log(parser(content1, filepath1))
  console.log(parser(content2, filepath2))
}
