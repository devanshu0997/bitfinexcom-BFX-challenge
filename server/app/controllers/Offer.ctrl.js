const uuidv4 = require('uuid/v4')
const ed = require('ed25519-supercop')
const Offer = require('../models/Offer')
const OfferKey = require('../models/OfferKey')

class Offer {
  list(options) {
    
  }

  get(options) {

  }

  create(offerRequest) {
    const { btc_quantity, offer_price } = offerRequest
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
