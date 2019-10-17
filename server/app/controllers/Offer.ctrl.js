const _ = require('lodash')
const uuidv4 = require('uuid/v4')
const app = require('./../../lib')
const ed = require('ed25519-supercop')
const Offer = require('../models/Offer')
const config = require('../../config/app')
const OfferKey = require('../models/OfferKey')
const { announce } = require('../util/announce')
const OffersList = require('../services/OffersList')
const Responder = require('../../lib/expressResponder')
const OffersKeyList = require('../services/OffersKeyList')
const { putMutable } = require('../services/dht/AddUpdateObject')

class OfferController {
  // TODO: Pagination
  list (req, res) {
    const offers = OffersList.getOffersList()
    Responder.success(res, _.values(offers))
  }

  get (req, res) {
    const offer = OffersList.getOffer(req.params.offerId)
    if (!offer) {
      return Responder.operationFailed(res, 'Offer Not Found')
    }
    Responder.success(res, offer)
  }

  // TODO: Validation for Request Input
  create (req, res) {
    const { btc_quantity, offer_price } = req.body
    const offer = new Offer({
      id: uuidv4(),
      client_id: config.get('app.name'),
      btc_quantity,
      offer_price,
      sequence: 1,
      availability: true
    })

    const keys = ed.createKeyPair(ed.createSeed())
    const opts = { keys }

    putMutable({ seq: offer.sequence, v: JSON.stringify(offer) }, opts, (error, hash) => {
      if (error) {
        return Responder.operationFailed(res, 'Error in Broadcasting the Offer')
      }
      const offerKey = new OfferKey({ offer_id: offer.id, keys, hash })

      OffersKeyList.addKey(offerKey)

      app.logger.info('An Order has been added to DHT!')
      app.logger.info(`Order Id: ${offer.id}, DHT Hash: ${hash}`)
      app.logger.info('Announcing in Network about new Order')

      announce(`ADD_OFFER:${hash}`, () => { })

      Responder.success(res, offer)
    })
  }
}

module.exports = new OfferController()
