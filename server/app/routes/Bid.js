const express = require('express')

const BidController = require('../controllers/Bid.ctrl')

function initBidRoutes () {
  const BidRouter = express.Router()

  BidRouter.get('/', BidController.create)

  return BidRouter
}

module.exports = initBidRoutes
