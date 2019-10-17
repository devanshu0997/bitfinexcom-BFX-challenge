class OfferList {
  constructor(){
    this.offers = {}
  }

  getOffer(offerId) {
    return this.offers[offerId]
  }

  addOffer(offer) {
    this.offers[offer.id] = offer
  }

  removeOffer(offerId) {
    delete this.offers[offerId]
  }

}
