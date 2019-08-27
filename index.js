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
    d: 'diff'
  }
})

// show version
if (argv.v || argv.version || argv._[0] === 'version') {
  process.stdout.write(version)
} else if (argv.d || argv.diff || argv._[0] === 'diff') {
  const iPath = argv.d
  const util = new Utils()
  if (typeof iPath !== 'string' || !iPath) {
    throw new TypeError('path is not empty.')
  }
  util.getFile(iPath)
} else {
  process.stdout.write('invalid use lib.')
}
