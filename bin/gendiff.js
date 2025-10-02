#!/usr/bin/env node

import { Command } from "commander"
import genDiff from '../src/index.js'
import stylish from "../src/formatters/stylish.js"
import plain from '../src/formatters/plain.js'

const formats = { stylish, plain }

const program = new Command()

program
.name('gendiff')
.description('Compares two configuration files and shows a difference.')
.version('1.0.0')
.option('-f, --format [type]', 'output format', 'stylish')
.argument('<filepath1>')
.argument('<filepath2>')
.action((a, b) => {
    const selectedFormat = program.opts().format || 'stylish'
    const format = formats[selectedFormat] || stylish
    console.log(genDiff(a, b, format))
})

program.parse()