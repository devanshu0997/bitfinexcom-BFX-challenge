const uuidv4 = require('uuid/v4')
const ed = require('ed25519-supercop')
const Offer = require('../models/Offer')
const OfferKey = require('../models/OfferKey')
const Responder = require('../../lib/expressResponder')
const OffersList = require('../services/OffersList')

class OfferController {
  list(req, res) {
    const offers = OffersList.getOffersList()
    Responder.success(res, offers)
  }

  get(req, res) {
    const offer = OffersList.getOffer(req.params.offerId)
    if(!offer) {
      Responder.operationFailed(res, 'Offer Not Found')
    }
    Responder.success(res, offer)
  }

  create(req, res) {
    const { btc_quantity, offer_price } = req.body
    const offer = new Offer({
      id: uuidv4(),
      client_id: config.get('app.name'),
      btc_quantity,
      offer_price
    })
  
    const keys = ed.createKeyPair(ed.createSeed())

    const offerKey = new OfferKey({ offer_id: offer.id, keys })
  }
}

module.exports = new OfferController()
