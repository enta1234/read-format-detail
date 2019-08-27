#!/usr/bin/env node

/*!
 * read-format-detail
 * Copyright(c) 2019 Chantatha Polsamak <chantatha.p@gmail.com>
 * MIT Licensed
 */

'use strict'

const { version } = require('./package.json')
const Utils = require('./utils')

const argv = require('./node_modules/minimist')(process.argv.slice(2), {
  alias: {
    v: 'version',
    d: 'detail'
  }
})

// show version
if (argv.v || argv.version || argv._[0] === 'version') {
  process.stdout.write(version)
} else if (argv.d || argv.detail || argv._[0] === 'detail') {
  const iPath = argv.d
  const util = new Utils()
  if (typeof iPath !== 'string' || !iPath) {
    throw new TypeError('path is not empty.')
  }
  util.getFile(iPath)
} else {
  process.stdout.write('invalid conmand line.\n')
  process.stdout.write(`read-format-log version: ${version}\n`)
  process.stdout.write('please use "rfl [opting] <path/filename>"\n')
}
