class OffersKeyList {
  constructor(){
    this.keys = {}
  }

  getKey(offerId) {
    return this.keys[offerId]
  }

  addKey(offerKey) {
    this.keys[offerKey.offer_id] = offerKey.keys
  }

  removeKey(offerId) {
    delete this.keys[offerId]
  }
}

module.exports = new OffersKeyList()
