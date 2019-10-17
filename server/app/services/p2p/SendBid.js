const peer = require('./GetPeerConnection')
const logger = require('./../../../lib/logger')

const sendBid = (clientId, offerId) => {
  const payload = { type: 'bid', offer_id: offerId }
  const opts = { timeout: 100000 }

  peer.request(clientId, payload, opts, (error, result) => {
    if (error) {
      return logger.error(error)
    }
    logger.info(result)
  })
}

module.exports = sendBid
