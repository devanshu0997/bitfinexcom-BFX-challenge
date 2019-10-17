class OfferKey {
  // Add validation for each field
  constructor({ offer_id, keys, hash, sequence = 1 }) {
    this.offer_id = offer_id;
    this.keys = keys;
    this.hash = hash;
  }
}

module.exports = OfferKey
