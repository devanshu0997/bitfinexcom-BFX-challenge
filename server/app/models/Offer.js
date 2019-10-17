class Offer {
  id;
  client_id;
  btc_quantity;
  offer_price;

  // Add validation for each field
  constructor({id, client_id, btc_quantity, offer_price}) {
    this.id = id;
    this.client_id = client_id;
    this.btc_quantity = btc_quantity;
    this.offer_price = offer_price;
  }
}
