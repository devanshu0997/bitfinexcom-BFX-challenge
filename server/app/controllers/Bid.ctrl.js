const OffersList = require('../services/OffersList')
const Responder = require('../../lib/expressResponder')

class BidController {
  create(req, res) {
    const { offer_id } = req.body

    const offer = OffersList.getOffer(offer_id)

    if(!offer) {
      return Responder.operationFailed(res, 'Offer Not Found')
    }

    // Add code to send P2P request for bid

    Responder.success(res, { result: 'Bid Successful' })
  }
}

module.exports = new BidController()
