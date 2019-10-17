const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const initRoutes = require('../app/routes')
const Responder = require('./expressResponder')

const app = express()

function initMiddleware () {
  app.use(methodOverride())

  app.use(cors())

  app.use(bodyParser.json({ limit: '50mb' }))

  app.use(morgan('combined', console.log))
}

function initPingURL () {
  app.get('/_ping', (req, res) => {
    Responder.success(res, { result: 'Ping Received!!!' })
  })
}

function catchNotFound () {
  app.use(Responder.notFound)
}

function catchErrorRoutes () {
  app.use((err, req, res, next) => {
    if (!err) return next()
    return Responder.operationFailed(res, err)
  })
}

function init () {
  // Initialize Middlewares
  initMiddleware()

  // Initialize Ping URL
  initPingURL()

  // Initialize API Routes
  initRoutes(app)

  // Initialize Not Found Route
  catchNotFound()

  // Initialize Error Routes
  catchErrorRoutes()

  return app
}

module.exports.init = init
