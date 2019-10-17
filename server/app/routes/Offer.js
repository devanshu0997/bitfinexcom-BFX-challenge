const express = require('express')

const OfferController = require('../controllers/Offer.ctrl')

function initOfferRoutes () {
  const OfferRouter = express.Router()

  OfferRouter.get('/', OfferController.list)
  OfferRouter.get('/:offerId', OfferController.get)
  OfferRouter.post('/', OfferController.create)

  return OfferRouter
}

module.exports = initOfferRoutes
