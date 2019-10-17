const _ = require('lodash')
const uuidv4 = require('uuid/v4')
const ed = require('ed25519-supercop')
const Offer = require('../models/Offer')
const OfferKey = require('../models/OfferKey')
const Responder = require('../../lib/expressResponder')
const OffersList = require('../services/OffersList')
const OffersKeyList = require('../services/OffersKeyList')
const { putMutable } = require('../services/dht/AddUpdateObject')
const { announce } = require('../util/announce')
const config = require('../../config/app')

class OfferController {
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

    putMutable({ seq: offer.sequence, v: JSON.stringify(offer) }, opts, (err, hash) => {
      const offerKey = new OfferKey({ offer_id: offer.id, keys, hash })

      OffersKeyList.addKey(offerKey)
      console.log('data saved to the DHT', err, hash)
      if (hash) {
        announce(`ADD_OFFER:${hash}`, () => { })
      }
    })

    Responder.success(res, offer)
  }
}

module.exports = new OfferController()
