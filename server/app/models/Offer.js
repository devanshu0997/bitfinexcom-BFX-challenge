class Offer {
  id;
  client_id;
  btc_quantity;
  offer_price;
  availabilty;

  // Add validation for each field
  constructor({id, client_id, btc_quantity, offer_price, availabilty}) {
    this.id = id;
    this.client_id = client_id;
    this.btc_quantity = btc_quantity;
    this.offer_price = offer_price;
    this.availabilty = availabilty;
  }
}

module.exports = Offer
