const OffersList = require('../services/OffersList')
const Responder = require('../../lib/expressResponder')
const sendBid = require('../services/p2p/SendBid')

class BidController {
  create(req, res) {
    const { offer_id } = req.body

    const offer = OffersList.getOffer(offer_id)

    if(!offer) {
      return Responder.operationFailed(res, 'Offer Not Found')
    }


    sendBid(offer.client_id, { type: 'bid', offer_id }, console.log )

    Responder.success(res, { result: 'Bid Successful' })
  }
}

module.exports = new BidController()
