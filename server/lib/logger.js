const winston = require('winston')

winston.emitErrs = true

const transports = [
  new winston.transports.Console({
    level: process.env.LOG_LEVEL,
    handleExceptions: true,
    json: false,
    colorize: true
  })
]

const logger = new winston.Logger({
  transports,
  exitOnError: false
})

module.exports = logger
