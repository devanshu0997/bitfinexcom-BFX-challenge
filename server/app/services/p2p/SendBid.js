const peer = require('./GetPeerConnection')
const logger = require('./../../../lib/logger')

const sendBid = (clientId, offerId, callback) => {
  const payload = { type: 'bid', offer_id: offerId }
  const opts = { timeout: 100000 }

  peer.request(clientId, payload, opts, callback)
}

module.exports = sendBid
