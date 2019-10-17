class OffersList {
  constructor () {
    this.offers = {}
  }

  getOffersList () {
    return this.offers
  }

  getOffer (offerId) {
    return this.offers[offerId]
  }

  addOffer (offer) {
    this.offers[offer.id] = offer
  }

  removeOffer (offerId) {
    delete this.offers[offerId]
  }
}

module.exports = new OffersList()
