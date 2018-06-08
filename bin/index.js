#!/usr/bin/env node
const path = require('path')
const fork = require('child_process').fork
const argv = process.argv.slice(2)

fork(path.resolve(__dirname, '../src/index.js'), argv, {
  env: {
    NODE_NO_WARNINGS: 1
  }
})
