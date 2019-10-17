const express = require('express')

const BidController = require('../controllers/Bid.ctrl')

function initBidRoutes () {
  const BidRouter = express.Router()

  BidRouter.post('/', BidController.create)

  return BidRouter
}

module.exports = initBidRoutes
