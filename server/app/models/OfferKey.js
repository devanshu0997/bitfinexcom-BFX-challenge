class OfferKey {
  offer_id;
  keys;

  // Add validation for each field
  constructor({offer_id, keys}) {
    this.offer_id = offer_id;
    this.keys = keys;
  }
}
