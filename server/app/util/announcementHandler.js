const link = require('./link')
const Offer = require('../models/Offer')
const OffersList = require('../services/OffersList')

const handler = (message, _ih) => {
  // console.log('Receieved announcement', message)
  // [TODO] add offer in list and respond with ok
  if (message.startsWith('ADD_OFFER:')) {
    console.log('Receieved offer', message)
    link.get(message.replace('ADD_OFFER:', ''), (err, res) => {
      console.log('data requested to the DHT', err, res)

      const offerRaw = JSON.parse(res.v)
      console.log(offerRaw, '*************')

      const offer = new Offer(offerRaw)
      OffersList.addOffer(offer)
    })
  } else if (message.startsWith('REMOVE_OFFER:')) {
    link.get(message.replace('REMOVE_OFFER:', ''), (err, res) => {
      console.log('data requested to the DHT', err, res)

      const offerRaw = JSON.parse(res.v)
      console.log(offerRaw, '*************')

      OffersList.removeOffer(offerRaw.id)
    })
    console.log('Receieved offer', message)
  }
}

module.exports = handler
