const _ = require('lodash')
const sendBid = require('../services/p2p/SendBid')
const OffersList = require('../services/OffersList')
const Responder = require('../../lib/expressResponder')
const { putMutable } = require('./../services/dht/AddUpdateObject')
const { announce } = require('./../util/announce')
const Offer = require('./../models/Offer')
const OffersKeyList = require('./../services/OffersKeyList')

class BidController {
  create (req, res) {
    const { offer_id } = req.body

    const offer = OffersList.getOffer(offer_id)

    if (!offer) {
      return Responder.operationFailed(res, 'Offer Not Found')
    }

    sendBid(offer.client_id, { type: 'bid', offer_id }, () => {
      Responder.success(res, { result: 'Bid Successful' })
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

    link.get(keys.hash, (err, res) => {
      if (err) {
        return handler.reply(new Error('Offer Not Found or Already Processed!'))
      }

      const offerRaw = JSON.parse(res.v)
      const offer = new Offer(offerRaw)

      offer.availability = false
      offer.sequence += 1

      const opts = _.pick(keys, 'keys')

      putMutable({ seq: offer.sequence, v: JSON.stringify(offer) }, opts, (err, hash) => {
        if (err) {
          return handler.reply(new Error('Offer Not Found or Already Processed!'))
        }

        OffersKeyList.removeKey(payload.offer_id)

        logger.info('An Order Processed Successfully!')
        logger.info(`Order Id: ${offer.id}, DLT Hash: ${hash}`)
        logger.info('Announcing in Network about successful bid')

        announce(`REMOVE_OFFER:${hash}`, () => { })

        handler.reply(null, 'Bid Accepted Successfuly')
      })
    })
  }
}

module.exports = new BidController()
