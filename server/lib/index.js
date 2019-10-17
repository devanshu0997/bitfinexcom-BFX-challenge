const http = require('http')
const express = require('./express')
const logger = require('./logger')

async function start (port) {
  const app = express.init()

  http.createServer(app).listen(port)

  return `Server started at http://localhost:${port}.`
}

module.exports = { start, logger }
