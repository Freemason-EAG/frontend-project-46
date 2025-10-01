#!/usr/bin/env node

import { Command } from "commander"
import genDiff from '../src/index.js'
import stylish from "../src/formatters/stylish.js"

const program = new Command()

const gendiff = program
.name('gendiff')
.description('Compares two configuration files and shows a difference.')
.version('1.0.0')
.option('-f, --format [type]', 'output format', 'stylish')
.argument('<filepath1>')
.argument('<filepath2>')
.action((a, b, options) => {
    let format
    if (options.format) {
        format = options.format
    }
    format = stylish
    console.log(genDiff(a, b, format))
})

program.parse()