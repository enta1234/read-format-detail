/*!
 * read-format-detail
 * Copyright(c) 2019 Chantatha Polsamak <chantatha.p@gmail.com>
 * MIT Licensed
 */

'use strict'

const fs = require('fs')

function Utils () {}

Utils.prototype.getFile = (rPath) => {
  let cFile = 0
  let cLine = []
  let errLine = []

  try {
    // console.log(rPath)
    fs.readdir(rPath, function (err, files) {
      // handling error
      if (err) {
        return process.stderr.write('Unable to scan directory: ' + err + '\n')
      }
      // listing all files using forEach
      files.forEach(function (file) {
        cFile++
        const getNameFile = file.split('.')
        if (getNameFile[getNameFile.length - 1] === 'detail') {
          const logPath = rPath + '/' + file

          fs.readFile(logPath, (err, data) => {
            // handling error
            if (err) {
              return process.stderr.write('Unable to scan directory: ' + err + '\n')
            }
            process.stdout.write('No.' + cFile + ' Validating: ' + getNameFile[0] + '...\n')
            process.stdout.write('--------------------\n')
            const rawDatas = ('' + data).replace(/\d.+\|/gm, ',').split(/,{/gm)
            for (const rawData of rawDatas) {
              if (rawData) {
                cLine++
                try {
                  var objData = JSON.parse('{' + rawData)
                } catch (error) {
                  errLine.push(cLine)
                  process.stderr.write('Line: ' + cLine + ' status: ' + '--------> invalid <--------\n')
                }
                if (objData.Input.length !== 1 && objData.Output.length !== 1) {
                  errLine.push(cLine)
                  process.stderr.write('Line: ' + cLine + ' status: ' + '--------> invalid <--------\n')
                }
              }
            }
            // summary
            process.stdout.write('====================\n')
            if (errLine.length === 0) {
              process.stdout.write('SUMMARY FILENAME:' + getNameFile[0])
              process.stdout.write(' = ALL SUCCESS.\n')
            } else {
              process.stdout.write('SUMMARY FILENAME:' + getNameFile[0])
              process.stdout.write(' = GOT ERROR.\n')
              process.stdout.write('Line:' + errLine + '\n')
            }
          })
        } else {
          process.stdout.write(file + ' is not detail. \n')
        }
      })
    })
  } catch (error) {
    console.error('error: ', error)
  }
}

module.exports = Utils
