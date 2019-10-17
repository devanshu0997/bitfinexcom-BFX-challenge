const _ = require('lodash')
const logger = require('./../../lib/logger')
const link = require('../util/link')
const Offer = require('./../models/Offer')
const { announce } = require('./../util/announce')
const sendBid = require('../services/p2p/SendBid')
const OffersList = require('../services/OffersList')
const Responder = require('../../lib/expressResponder')
const OffersKeyList = require('./../services/OffersKeyList')
const { putMutable } = require('./../services/dht/AddUpdateObject')

class BidController {
  create (req, res) {
    if (!req.body.offer_id) {
      return Responder.operationFailed(res, 'Offer Id Required for placing a bid')
    }

    const offerId = req.body.offer_id

    const offer = OffersList.getOffer(offerId)

    if (!offer) {
      return Responder.operationFailed(res, 'Offer Not Found')
    }

    sendBid(offer.client_id, offerId, () => {
      Responder.created(res, { result: 'Bid Successful' })
    })
  }

  process (payload, handler) {
    if (!payload.offer_id) {
      return handler.reply(new Error('Offer Id Required'))
    }

    const keys = OffersKeyList.getKey(payload.offer_id)

    if (!keys) {
      return handler.reply(new Error('Offer Not Found or Already Processed!'))
    }

    link.get(keys.hash, (error, res) => {
      if (error) {
        return handler.reply(new Error('Offer Not Found or Already Processed!'))
      }

      const offerRaw = JSON.parse(res.v)
      const offer = new Offer(offerRaw)

      offer.availability = false
      offer.sequence += 1

      const opts = _.pick(keys, 'keys')

      putMutable({ seq: offer.sequence, v: JSON.stringify(offer) }, opts, (error, hash) => {
        if (error) {
          return handler.reply(new Error('Offer Not Found or Already Processed!'))
        }

        OffersKeyList.removeKey(payload.offer_id)

        logger.info('An Order Processed Successfully!')
        logger.info(`Order Id: ${offer.id}, DHT Hash: ${hash}`)
        logger.info('Announcing in Network about successful bid')

        announce(`REMOVE_OFFER:${hash}`, () => { })

        handler.reply(null, 'Bid Accepted Successfuly')
      })
    })
  }
}

module.exports = new BidController()
